module.exports = (function(){
    var 
        getName = function(node){
           return node.property.name;
        };

        return {
            getName: getName 
        }

}());
