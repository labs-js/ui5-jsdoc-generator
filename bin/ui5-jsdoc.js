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
    var data = {
        metadata: null,
        properties: null,
        aggreagations: null,
        events: null,
        ui5JSDoc: null,
        description: null,
        author: null,
        version: null,
		baseClass: null
    };

    //Parse js
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
            data.events = events;
            return controlParser.getNode(propertyAST, estraverse, data.metadata, 'ui5JSDoc', 'Property');

        })
        .then(function(ui5JSDoc) {
            data.ui5JSDoc = ui5JSDoc;
            return controlParser.getNode(propertyAST, estraverse, data.ui5JSDoc, 'description', 'Property');
        })
        .then(function(description) {
            data.description = description;
            return controlParser.getNode(propertyAST, estraverse, data.ui5JSDoc, 'author', 'Property');
        })
        .then(function(author) {
            data.author = author;
            return controlParser.getNode(propertyAST, estraverse, data.ui5JSDoc, 'version', 'Property');
        })
        .then(function(version) {
            data.version = version;
            return controlParser.getNode(propertyAST, estraverse, data.ui5JSDoc, 'baseClass', 'Property');
        })
        .then(function(baseClass) {
            data.baseClass = baseClass;
            return fsp.readFile('../templates/template.HTML', {
                encoding: 'utf8'
            });
        })
        .then(function(template) {
            var propWildcard = templater.getWildcard("properties");
            var aggreWildcard = templater.getWildcard("aggregations");
            var eventsWildcard = templater.getWildcard("events");
            var descriptionWildcard = templater.getWildcard("controlDescription");
            var authorWildcard = templater.getWildcard("author");
            var versionWildcard = templater.getWildcard("version");
            var baseWildcard = templater.getWildcard("baseClass");
            result = templater.list(propertyAST, template, data.properties, propWildcard);
            result = templater.list(propertyAST, result, data.aggregations, aggreWildcard);
            result = templater.list(propertyAST, result, data.events, eventsWildcard);
            result = templater.word(propertyAST, result, data.description, descriptionWildcard);
            result = templater.word(propertyAST, result, data.author, authorWildcard);
            result = templater.word(propertyAST, result, data.version, versionWildcard);
            result = templater.word(propertyAST, result, data.baseClass, baseWildcard);
            //result = templater.clean(result);
            //result = templater.clean(result);

            console.log(result);


        })

})();
