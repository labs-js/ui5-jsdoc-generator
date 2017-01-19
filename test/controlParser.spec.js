var controlParser = require('../bin/controlParser');
var ast = require('./dummySrc/ast.json');

describe('controlParser', function() {
    var obj, estraverse;

    describe('getNode', function() {
        beforeEach(function() {
            obj = {
                enter: function() {}
            }
            estraverse = {
                traverse: function(ast, obj) {}
            }
        });

        /*it.skip('enter is called', function() {*/
        //spyOn(obj, 'enter');

        //var result = controlParser.getNode(estraverse, ast);

        //expect(obj.enter).toHaveBeenCalled();

        /*});*/
        it('estraverse is called', function() {

            spyOn(estraverse, 'traverse');

            var result = controlParser.getNode(estraverse, ast);

            expect(estraverse.traverse).toHaveBeenCalled();
        });

    });

    describe('getNamedKey', function() {
        it('traverse is called', function() {
            var estraverse = {
                traverse: function(ast, {}) {}
            }
            spyOn(estraverse, 'traverse');

            var result = controlParser.getNamedKey(estraverse, ast);

            expect(estraverse.traverse).toHaveBeenCalled();
        });

        it('enter is called', function() {
            var obj = {
                enter: function() {
				}
            }
            var estraverse = {
                traverse: function(ast, obj) {}
            }

			
            spyOn(obj, 'enter');
			spyOn(estraverse, 'traverse').andCallFake(obj.enter); 

            var result = 
				controlParser.getNamedKey(estraverse, ast, 'test', 'Property');

			expect(obj.enter).toHaveBeenCalled();
        })
    });

    describe('_enter', function() {

        it('return node with object expression', function() {
            var node = {
                type: 'ObjectExpression'
            }

            var result = controlParser._enter(node, null);

            expect(result).toBe(node);
        })
    });
})
