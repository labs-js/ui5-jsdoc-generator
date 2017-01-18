module.exports = (function() {
    var getArgument = function(arguments, argument) {
        var result = arguments
                            .find(function(arg) {
                                return arg.substring(2, 2 + argument.length) === argument;
                            });
            return result.slice(result.indexOf('=') + 1);
    };

    return {
        getArgument: getArgument
    }

}());
