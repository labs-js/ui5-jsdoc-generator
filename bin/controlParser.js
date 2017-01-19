module.exports = (function() {
    var

        getNode = function(estraverse, ast, name, type) {
            return new Promise(
                function(resolve, reject) {
                    estraverse.traverse(ast, {
                        enter: function(node, parent) {
                            _enter(node, parent, name, type, resolve);
                        }
                    })
                });
        },

        _enter = function(node, parent, name, type, resolve) {
            if (node.type === type) {
                if (node.properties.length > 0 &&
                    type === 'ObjectExpression' &&
                    node.properties[0].key.name === name) {
                    resolve(node);
                }
            }
        };

    return {
        getNode: getNode,
        _enter: _enter
    };
}());
