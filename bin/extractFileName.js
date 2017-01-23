module.exports = (function() {
    var extract = function(path) {
        var aPath = path.split('/'),
            file = aPath[aPath.length - 1];
        return file.split('.')[0];
    };

    return {
        extract: extract
    }

}());
