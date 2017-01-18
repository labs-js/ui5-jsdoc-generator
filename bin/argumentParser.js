module.exports = (function() {
    var getArgument = function(arguments, argument) {
        return arguments
            .filter(function(arg) {
                return arg.substring(2, 2 + argument.length) === argument;
            })
            .map(function(value) {
                return value.slice(value.indexOf('=') + 1);
            });
    };

    return {
        getArgument: getArgument
    }

}());
