module.exports = (function() {
    var

        getNode = function(astProperty, estraverse, ast, name, type) {
            return new Promise(
                function(resolve, reject) {
                    estraverse.traverse(ast, {
                        enter: function(node, parent) {
                            _enter(this, astProperty, node, parent, name, type, resolve);
                        },
                        leave: function(node, parent) {
                            if (!parent) {
                                resolve(null);
                            }
                        }
                    });
                })
        },

        _enter = function(estravese, astProperty, node, parent, name, type, resolve) {

            if (node.type === type) {
                if (type === 'Property') {
                    if (astProperty.getName(node) === name) {
                        resolve(node);
                        straverse.break();
                    }
                }
            }
        };

    return {
        getNode: getNode,
        _enter: _enter
    };
}());
