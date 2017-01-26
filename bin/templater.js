module.exports = (function() {
    var
        wildcards = {
            properties: "#__PROPERTIES__#",
            aggregations: "#__AGGREGATIONS__#",
            events: "#__EVENTS__#",
            associations: "#__ASSOCIATIONS__#",
            controlName: "#__CONTROL_NAME__#",
            controlDescription: "#__CONTROL_DESCRIPTION__#",
            baseClass: "#__BASE_CLASS__#",
            author: "#__AUTHOR__#",
            version: "#__VERSION__#"

        },
        primitiveTypes = ["int", "string", "boolean", "float", "any"],
        getWildcard = function(key) {
            return wildcards[key];
        },
        list = function(astHandler, template, node, wildcard) {
            if (!node) {
                return template;
            }

            var list = _createHTMLList(astHandler, node);

            if (!list) { //when node doesnt have any properties inside
                return template;
            }
            return _replace(template, list, wildcard);
        },
        word = function(astHandler, template, node, wildcard) {

            if (!node) {
                return template;
            }

            return template =
                template.replace(new RegExp(wildcard, 'g'), astHandler.getValue(node));
        },

        clean = function(template) {
            for (key in wildcards) {
                var wildcard = wildcards[key];
                template = template.replace(new RegExp(wildcard, 'g'), 'no value');
            }

            return template;
        },

        transformToComment = function(str) {
            var lines = str.split('\n');

            var transformedLines = lines.map(function(line) {
                return '*' + ' ' + line;
            });
            transformedLines = transformedLines.join('\n');
            transformedLines = '/** \n' + transformedLines + '\n**/';

            return transformedLines;
        },

        insertJSDocComment = function(file, comments) {
            return file.replace(new RegExp('\/\/.*@ui5JSDoc', 'gm'), comments);
        },

        _createHTMLList = function(astHandler, node) {
            var li = "",
                values = astHandler.getValues(node);

            values.forEach(function(property) {

                li += '<li>' + astHandler.getName(property);

                var subProperties = astHandler.getValues(property);

                if (subProperties && subProperties.length > 0) {
                    var sublist = subProperties.reduce(function(strList, subProp) {
							if(subProp.key.name === 'type' && primitiveTypes.indexOf(subProp.value.value)===-1){
								return 	strList += '<li>' 
									+ subProp.key.name 
									+ ': {@link ' 
									+ subProp.value.value 
									+ ' }'
									+ '</li>';
							}
                        	return strList += '<li>' + subProp.key.name + ': ' + subProp.value.value + '</li>';
                    }, "<ul>");
                    li += sublist + '</ul>'
                }

                li += '</li>';
            })
            return li;
        },

        _replace = function(template, list, wildcard) {
            return template.replace(new RegExp(wildcard, 'g'), list);
        };

    return {
        list: list,
        word: word,
        getWildcard: getWildcard,
        clean: clean,
        transformToComment: transformToComment,
        insertJSDocComment: insertJSDocComment,
        _replace: _replace,
        _createHTMLList: _createHTMLList
    }
}());
