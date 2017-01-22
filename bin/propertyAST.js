module.exports = (function() {

    var
        getName = function(node) {
            return node.key.name
        },
        getValues = function(node) {
            return node.value.properties
        };

    return {
        getName: getName,
        getValues: getValues,
    }

}())
