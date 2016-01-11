(function(global){
    "use strict";
    var queue;
    
	function getObjectIndex(obj){
		var len = queue.length;
		for(var i = 0; i < len; i++){ // in some browsers faster than Array.indexOf()
			if(queue[i] === obj){
				return i;
			}
		}
		queue.push(obj);
		return len;
	}
    
    function replacer(key, value){
        if(value !== null && typeof value === "object" && key.length !== 0){
            return [ getObjectIndex(value) ];
		}
        return value;
    }
    
	function stringifyObject(obj){
		return JSON.stringify(obj, replacer);
	}
    
	function serialize(data){
        var output = [];
        queue = [];
		getObjectIndex(data); // initialize queue

		for(var i = 0; i < queue.length; i++){
            output.push( stringifyObject(queue[i]) );
		}
        return "[" + output.join(",") + "]";
	}
    
    function deserialize(str){
        var list = JSON.parse(str),
            obj,
            index;
        if( !Array.isArray(list) ) throw new SyntaxError("Outermost element must be Array");
        if( list.length === 0) throw new SyntaxError("No objects to parse");
        
        for(var i = 0; i < list.length; i++){
            obj = list[i];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && Array.isArray(obj[prop])){
                    index = obj[prop][0];
                    if(typeof index !== "number" || index % 1 !== 0) throw new SyntaxError("Invalid object reference");
                    if(index >= list.length) throw new SyntaxError("Object reference out of bounds");
                    obj[prop] = list[index];
                }
            }
		}
        
        return list[0];
    }
    
    global.Serializer = {
        stringify: serialize,
        parse: deserialize
    };
})(this);