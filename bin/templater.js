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
            vesrion: "#__VERSION__#"

        },
        getWildcard = function(key) {
            return wildcards[key];
        },
        replace = function(astHandler, template, node, wildcard) {
			console.log(wildcard);
            if (!node) {
                return template;
            }
            var list = _createHTMLList(astHandler, node);
            return _replace(template, list, wildcard);
        },

        _createHTMLList = function(astHandler, node) {
            var li = "",
                values = astHandler.getValues(node);

            values.forEach(function(property) {
                li += '<li>' + astHandler.getName(property) + '</li>'
            })

            return li;
        },

        _replace = function(template, list, wildcard) {
            return template.replace(wildcard, list);
        };

    return {
        replace: replace,
		getWildcard: getWildcard,
        _replace: _replace,
        _createHTMLList: _createHTMLList
    }
}());
