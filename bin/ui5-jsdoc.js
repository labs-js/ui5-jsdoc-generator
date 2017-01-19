#!/usr/bin/env node

var argumentParser = require('./argumentParser');
var controlParser = require('./controlParser');
var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');

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
        .then(function(result) {
            return controlParser.getNode(estraverse,result,'properties','ObjectExpression');
        })
        .then(function(result){
           console.log(result.properties); 
        });
        //get @ui5jsdoc:description this is a description string
        //read metadata
        //repace metadata in template

})();
