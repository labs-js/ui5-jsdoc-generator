#!/usr/bin/env node

(function() {

    var
        fs = require('fs'),
        argumentParser = require('./argumentParser'),
        getAllJSFiles = require('get-all-js-files'),
        arguments = process.argv,
        input = argumentParser.getArgument(arguments, "input"),
        output = argumentParser.getArgument(arguments, "output");

    getAllJSFiles({
        directory: input,
        filesCb: function() {},
        contentCb: function(filePath, fileContent) {
            addJSDocComments = require('./addJSDocComments')(filePath,input,output); 
        }
    })


}());
