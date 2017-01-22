#!/usr/bin/env node

var argumentParser = require('./argumentParser');
var controlParser = require('./controlParser');
var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');
var templater = require('./templater');
var propertyAST = require('./propertyAST');
var fsp = require('fs-promise');
var astQuery = require('ast-query');

(function() {
    var arguments = process.argv;

    //Reading input folder to get every js file
    var input = argumentParser.getArgument(arguments, "input");
    //var output = argumentParser.getArgument(arguments, "output");
    //input file
    var inputFile = fs.readFileSync(input, 'UTF8');
    //Get ast 
    var ast = esprima.parse(inputFile);
    //Parse js
    var data = {
        metadata: null,
        properties: null,
        aggreagations: null,
        events: null
    };
    controlParser.getNode(propertyAST, estraverse, ast, 'metadata', 'Property')
        .then(function(metadata) {
            data.metadata = metadata;
            return controlParser.getNode(propertyAST, estraverse, data.metadata, 'properties', 'Property');
        })
        .then(function(properties) {
            data.properties = properties;
            return controlParser.getNode(propertyAST, estraverse, data.metadata, 'aggregations', 'Property');
        })
        .then(function(aggregations) {
            data.aggregations = aggregations;
            return controlParser.getNode(propertyAST, estraverse, data.metadata, 'events', 'Property');
        })
        .then(function(events) {
            return fsp.readFile('../templates/template.HTML', {
                encoding: 'utf8'
            });
        })
        .then(function(template) {
            var propWildcard = templater.getWildcard("properties");
			var aggreWildcard = templater.getWildcard("aggregations");
			var eventsWildcard = templater.getWildcard("events");
            var result = templater.replace(propertyAST, template, data.properties, propWildcard);
            result = templater.replace(propertyAST, result, data.aggregations, aggreWildcard);
            result = templater.replace(propertyAST, result, data.events, eventsWildcard);
			console.log(result);
			result = templater.clean(result);
            console.log(result);

        })

    /*//get template*/
    //return fsp('../templates/template.HTML', {
    //encoding: 'UTF8'
    //});
    /*var result = templater.replace(propertyAST, data, properties.value.properties, "#__PROPERTIES__#");*/
})();
