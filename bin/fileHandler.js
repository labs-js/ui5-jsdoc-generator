module.exports = (function() {
    var
        create = function(fs, mkdirp, file, filePath, input, output) {
            /*
             *   filePath = User/admin/folder/Control.js
             *   input = folder
             *   output = newFolder
             *
             */

            var path = require('path'); 
            input = path.normalize(input);
            filePath = path.normalize(filePath);

            // relativeFolder should be folder/Control.js
            var relativeFolder =
                filePath.substring(filePath.indexOf(input), filePath.length);
            var outputFile = output + path.sep + relativeFolder;
            var outputFolder = outputFile.substring(0, outputFile.lastIndexOf(path.sep));


            var createFile = function() {
                return new Promise(function(resolve, reject) {
                    fs.writeFile(outputFile, file, 'utf8', function(err) {
                        if (err) reject(path.sep);
                        resolve(outputFile);
                    });
                });
            }
            if (!fs.existsSync(outputFolder)) {
                //create the whole folder structure first 
                mkdirp(outputFolder, function(err) {
                    if (err) console.log(err);
                    return createFile();
                })
            }else{
                return createFile(); 
            }

        };


    return {
        create: create
    }

}());
