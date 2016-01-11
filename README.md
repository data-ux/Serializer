# Serializer
A serializer for Javascript objects that supports internal cross-references. Serialization format is a subset of JSON.

**Benefits compared to basic `JSON.stringify()`:**

1. Preserves all object references
  * Self-references and circular references supported
  * Great for serializing graphs, linked lists etc.
2. Stores referenced objects only once

**Caveats**

1. Worst case serialization performance is quadratic O(n<sup>2</sup>)
2. In some cases serialized output string can be longer than corresponding JSON.stringify() output