#!/usr/bin/env node

var argumentParser = require('./argumentParser');
var controlParser = require('./controlParser');
var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');
var templater = require('./templater');
var propertyAST = require('./propertyAST');

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
    controlParser.getNode(estraverse, ast, 'metadata', 'ObjectExpression')
        .then(function(metadata) {
            return controlParser.getNode(estraverse, metadata, 'properties', 'ObjectExpression');
        })
        .then(function(properties) {
            //get template
            fs.readFile('../templates/template.HTML', 'UTF8', function(err, data) {
                if (err) throw err;
                
                var result = templater.replace(
                    propertyAST, 
                    data, 
                    properties.value.properties, 
                    "#__PROPERTIES__#"
                );

                console.log(result);
            });
        });

})();
