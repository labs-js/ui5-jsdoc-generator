module.exports = (function() {

    var
        getName = function(ast) {
            return ast.key.name
        },
        getValues = function(ast) {
            return ast.value.properties
        }


    return {
        getName: getName,
        getValues: getValues,
    }

}())
