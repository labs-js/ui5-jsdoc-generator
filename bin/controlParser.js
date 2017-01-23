module.exports = (function() {
    var

        getNode = function(astElement, estraverse, ast, name, type) {
            return new Promise(
                function(resolve, reject) {
                    estraverse.traverse(ast, {
                        enter: function(node, parent) {
                            _enter(this, astElement, node, parent, name, type, resolve);
                        },
                        leave: function(node, parent) {
                            if (!parent) {
                                resolve(null);
                            }
                        }
                    });
                })
        },

        _enter = function(estravese, astElement, node, parent, name, type, resolve) {

            if (node.type === type) {
                if (type === 'Property') {
                    if (astElement.getName(node) === name) {
                        resolve(node);
                        straverse.break();
                    }
                }
                if (type === 'VariableDeclarator') {
                    if (astElement.getName(node) === name) {
                        resolve(node);
                        straverse.break();
                    }
                }
				if (type === 'MemberExpression') {
                    if (astElement.getName(node) === name) {
                        resolve(parent);
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
