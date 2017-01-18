var argumentParser = require('../bin/argumentParser');

describe('Argument parser', function() {

    it('getArgument', function() {

        var dummyArguments = [ '--input=folder', '--ignored'];
        var argument = 'input';
        var argumentValue = 'folder';

        var result = argumentParser.getArgument(dummyArguments, argument)[0];
        
        expect(result).toBe(argumentValue);
    });
});
