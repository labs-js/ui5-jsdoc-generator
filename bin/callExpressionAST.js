module.exports = (function() {

    var
        getArguments = function(node) {
            return node.arguments;
        }, 
        getFirstArgument = function(node){
            return node.arguments[0]; 
        };
    return {
        getArguments: getArguments, 
        getFirstArgument: getFirstArgument
    }

}());
