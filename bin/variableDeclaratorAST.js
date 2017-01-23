module.exports = (function() {

    var
        getName = function(node) {
            return node.id.name
        };

    return {
        getName: getName
    }

}());
