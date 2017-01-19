module.exports = (function() {
    var
        replace = function(astHandler, template, properties, wildcard) {
            var list = _createHTMLList(astHandler, properties);
            return _replace(template, list, wildcard);
        },

        _createHTMLList = function(astHandler, properties) {
            var li = "";

            properties.forEach(function(property) {
                li += '<li>' + astHandler.getName(property) + '</li>'
            })

            console.log(li);
            return li;
        },

        _replace = function(template, list, wildcard) {
            return template.replace(wildcard, list);
        };

    return {
        replace: replace,
        _replace: _replace,
        _createHTMLList: _createHTMLList
    }
}());
