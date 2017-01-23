module.exports = (function() {

    var
        getName = function(node) {
            return node.key.name
        },
		getValue = function(node){
			console.log(node);
			return node.value.value
		},
        getValues = function(node) {
            return node.value.properties
        };

    return {
        getName: getName,
		getValue: getValue,
        getValues: getValues,
    }

}())
