# Serializer
A serializer for Javascript objects that supports internal cross-references. Serialization format is a subset of JSON.

**Benefits compared to basic `JSON.stringify()`:**

1. Preserves all object references
  * Self-references and circular references supported
  * Allows serialization of non-hierarchical data structures like graphs, linked lists etc.
2. Stores referenced objects only once

**Caveats**

1. Worst case serialization performance is quadratic O(n<sup>2</sup>)
2. In some cases serialized output string can be longer than corresponding JSON.stringify() output

## Example
```javascript
var a = {}, b = {}, c = {};
a.next = b;
b.next = c;
c.next = a;

Serializer.stringify(a);
// returns: [{"next":[1]},{"next":[2]},{"next":[0]}]
Serializer.parse('[{"next":[1]},{"next":[2]},{"next":[0]}]');
```