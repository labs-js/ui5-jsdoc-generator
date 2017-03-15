var controlParser = require('./controlParser');
var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');
var templater = require('./templater');
var propertyAST = require('./propertyAST');
var fsp = require('fs-promise');
var astQuery = require('ast-query');
var extractFileName = require('./extractFileName');
var variableDeclaratorAST = require('./variableDeclaratorAST');
var callExpressionAST = require('./callExpressionAST');
var memberExpressionAST = require('./memberExpressionAST');
var literalAST = require('./literalAST');
var writefile = require('writefile');
var fileHandler = require('./fileHandler');
var mkdirp = require("mkdirp");

module.exports = function(filePath, input, output) {
    var fileName = extractFileName.extract(filePath);
    //filePath file
    var file = fs.readFileSync(filePath, 'UTF8');
    //Get ast 
    var ast = esprima.parse(file);

    var data = {
        metadata: null,
        properties: null,
        aggreagations: null,
        events: null,
        ui5JSDoc: null,
        description: null,
        author: null,
        version: null,
        baseClass: null,
        controlName: null,
    };
    //Parse js
    controlParser.getNode(variableDeclaratorAST, estraverse, ast, fileName, 'VariableDeclarator')
        .then(function(controlVariableDeclarator) {
            return controlParser.getNode(memberExpressionAST, estraverse, controlVariableDeclarator, 'extend', 'MemberExpression')
        })
        .then(function(controlCallExpressionNode) {
            if(controlCallExpressionNode){
                data.controlName = callExpressionAST.getFirstArgument(controlCallExpressionNode)
                };
            return controlParser.getNode(propertyAST, estraverse, ast, 'metadata', 'Property')
        })
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
            return fsp.readFile('templates/template.HTML', {
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
            var controlNameWildcard = templater.getWildcard("controlName");
            result = templater.list(propertyAST, template, data.properties, propWildcard);
            result = templater.list(propertyAST, result, data.aggregations, aggreWildcard);
            result = templater.list(propertyAST, result, data.events, eventsWildcard);
            result = templater.word(propertyAST, result, data.description, descriptionWildcard);
            result = templater.word(propertyAST, result, data.author, authorWildcard);
            result = templater.word(propertyAST, result, data.version, versionWildcard);
            result = templater.word(propertyAST, result, data.baseClass, baseWildcard);
            result = templater.word(literalAST, result, data.controlName, controlNameWildcard);
            result = templater.clean(result);

            result = templater.transformToComment(result);


            //Replace comment @ui5JSDoc with template
            var newFile = templater.insertJSDocComment(file, result);
            return fileHandler.create(fs, mkdirp, newFile, filePath, input, output);
        })
        .then(function(filePath) {
            console.log('jsdoc data automatically created:', filePath);
        })
        .catch(function(err) {
            console.log(err);
        })
};
