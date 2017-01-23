module.exports = (function(){
    var 
        getValue = function(node){
            return node.value; 
        }; 

        return {
            getValue: getValue 
        }
}());
