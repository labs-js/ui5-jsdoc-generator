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
            console.log('metadata', metadata);
            data.metadata = metadata;
            return controlParser.getNode(propertyAST, estraverse, data.metadata, 'properties', 'Property');
        })
        .then(function(properties) {
            console.log('properties:', properties);
            data.properties = properties;
            console.log('termina--------------------');
            return controlParser.getNode(propertyAST, estraverse, data.metadata, 'aggregations', 'Property');
        })
        .then(function(aggregations) {
            console.log('aggregations:', aggregations);
            data.aggregations = aggregations;
            return controlParser.getNode(propertyAST, estraverse, data.metadata, 'events', 'Property');
        })
        .then(function(events) {
            console.log('events:', events);
            data.events = events;
            return fsp('../templates/template.HTML', {
                encoding: 'UTF8'
            });
        })
        .then(function(data) {
            console.log(data);
            var result = templater.replace(propertyAST, data, properties.value.properties, "#__PROPERTIES__#");

            result = templater.replace(propertyAST, result, properties.value.properties, "#__AGGREGATIONS__#");
            result = templater.replace(propertyAST, result, properties.value.properties, "#__EVENTS__#");
            console.log(result);

        })

    /*//get template*/
    //return fsp('../templates/template.HTML', {
    //encoding: 'UTF8'
    //});
    /*var result = templater.replace(propertyAST, data, properties.value.properties, "#__PROPERTIES__#");*/
})();
