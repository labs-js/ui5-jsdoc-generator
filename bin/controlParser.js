module.exports = (function() {
    var self = this,
        getNamedKey = function(estraverse, ast, namedKey, type) {
            estraverse.traverse(ast, {
                enter: this._getProperty
            })
        },

        _getProperty = function(node, parent, namedKey, type) {
            if (node.type === type && node.key.name === name) {
                return node;
            }
        },

        getNode = function(estraverse, ast) {
            estraverse.traverse(ast, {
                enter: this._enter
            })
        }.bind(this),

        _enter = function(node, parent) {
            if (node.type === 'ObjectExpression') {
                return node;
            }
        };

    return {
        getNode: getNode,
        _enter: _enter,
        getNamedKey: getNamedKey
    };
}());
