var templater = require('../bin/templater');

describe('templater', function() {

    it('_createHTMLList', function() {

        var properties = [{
            "type": "Property",
            "key": {
                "type": "Identifier",
                "name": "width"
            },
            "computed": false,
            "value": {
                "type": "ObjectExpression",
                "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "type"
                        },
                        "computed": false,
                        "value": {
                            "type": "Literal",
                            "value": "string",
                            "raw": "\"string\""
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    },

                ]

            }
        }, {
            "type": "Property",
            "key": {
                "type": "Identifier",
                "name": "height"
            },
            "computed": false,
            "value": {
                "type": "ObjectExpression",
                "properties": [{
                    "type": "Property",
                    "key": {
                        "type": "Identifier",
                        "name": "type"
                    },
                    "computed": false,
                    "value": {
                        "type": "Literal",
                        "value": "string",
                        "raw": "\"string\""
                    },
                    "kind": "init",
                    "method": false,
                    "shorthand": false
                }]
            },
            "kind": "init",
            "method": false,
            "shorthand": false
        }, ];

        var astHandler = {
            getName: function() {
                return 'testValue'
            }
        }

        var result = templater._createHTMLList(astHandler, properties);

        expect(result).toBe("<li>testValue</li><li>testValue</li>");
    });

    describe('_replace', function() {

        var wildcard = "#__PROPERTIES__#",
            template = "<ul>" + wildcard + "</ul>",
            list = "this is a list"

        var result = templater._replace(template, list, wildcard)

        expect(result).toBe("<ul>" + list + "</ul>");
    })

})
