module.exports = (function() {
    var
        create = function(fs, file, filePath, input, output) {
            /*
             *   filePath = User/admin/folder/Control.js
             *   input = folder
             *   output = newFolder
             *
             */

            // relateiveFolder should be folder/Control.js
            var relativeFolder =
                filePath.substring(filePath.indexOf(input), filePath.length);

            var outputFile = output + '/' + relativeFolder;
            var outputFolder = outputFile.substring(0, outputFile.lastIndexOf("/"));
           
            if(!fs.existsSync(output)){
                console.log('entraaaaa');
                fs.mkdirSync("./"+output); 
            }

            if (!fs.existsSync(outputFolder)) {
                fs.mkdirSync(outputFolder);
            }
            return new Promise(function(resolve, reject) {
                fs.writeFile(outputFile, file, 'utf8', function(err) {
                    if (err) reject(err);
                    resolve(outputFile);
                });
            });

        };

    return {
        create: create
    }

}());
