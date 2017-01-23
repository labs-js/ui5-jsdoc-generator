module.exports = (function() {

    var
        getArguments = function(node) {
            return node.arguments;
        }

    return {
        getArguments: getArguments
    }

}())
