window.Serializer = (function(){
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
    
    return {
        stringify: serialize
    };
})();