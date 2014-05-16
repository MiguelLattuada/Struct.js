#API Documentation. <small>beta</small>
----------
##Initialization.
**New instance:** *create a new instance of the ArrayList class.*

Example:

```
var myArrayList = new ArrayList([,Object properties]);
```
##
**Properties:** [PlainObject](), *required argument for the ArrayList class constructor.*

Values: *values are not obligatory.*

- type: [Numeric](), *define the type of the ArrayList.*
	- values: `1[,Numeric], 2[,String], 3[,Array], 4[,Function], 5[,Object]`
	- default: `5`.
- baseClass: [Function](), *define the base class for the ArrayList in case you want to work with custom classes.*
	- values: `[,Function]`, *the constructor of the class you want to work with.*
	- default: `undefined`.
- duplicate: [Boolean](), *define if the ArrayList accepts or not duplicate elements.*
	- values: `[true, false]`
	- default: `false`.
##
##Public Members, Elements aimed.
**Methods:** *public methods of the ArrayList.*

- `add([,Object Element])`: [Function](), __return__: [Boolean](), *add an object to the ArrayList in the last position.*
- `add([,Object Element], [,Numeric Index])`: [Function](), __return__: [Boolean](), *add an object to the ArrayList in a certain position.*
- `get([,Numeric Index])`: [Function](), __return__: [Object](), *get the element in a certain position.*
- `set([,Numeric Index], [,Object Element])`: [Function](), __return__: [Boolean](), *replace the element on a certain position.*
- `find([,Object Element])`: [Function](), __return__: [Numeric](), *get the position of an element in the ArrayList.*
- `delete([,Numeriof an elemenc Index])`: [Function](), __return__: [Boolean](), *delete the element on the given position.*
- `deleteObject([,Object Element])`: [Function](), __return__: [Boolean](), *delete the given object.*
- `isProperItem([,Object Element])`: [Function](), __return__: [Boolean](), *define if an element can be added to the ArrayList, add method already use it.*
- `verifyDuplication([,Object Element])`: [Function](), __return__: [Boolean](), *define if an element is already in the ArrayList based on the GUID property, also add method use it.*
##
##Public Members, ArrayList aimed.
**Attributes:** *public attributes of the ArrayList.*

- `type`: [Numeric](), *type of the ArrayList.*
- `ducplicate`: [Boolean](), *ArrayList duplicate acception.*
- `baseClass`: [Function](), *base class of the elements in the ArrayList.*
- `data`: [Array](), *ArrayList data behind.*
- `count`: [Numeric](), *integer the elements count inside the ArrayList.*

**Methods:** *public methods of the ArrayList.*

- `empty()`: [Function](), __return__: [Boolean](), *return true if the ArrayList contains no Elements.*
- `clone([,ArrayList])`: [Function](), __return__: [Boolean](), *clone the current ArrayList to the referenced by the method argument.*
- `clear()`: [Function](), __return__: none, *delete all the elements from the ArrayList.*
- `deleteRange([,Numeric IndexFrom], [,Numeric IndexTo])`: [Function](), __return__: [Boolean](), *delete a range of elements defined by the parameters.*
- `toArray()`: [Function](), __return__: [Array](), *return the Array behind the ArrayList.*
- `toString()`: [Function](), __return__: [String](), *return a string of the ArrayList, toString() method on every object must be overridden.*
- `subArrayList([,Numeric IndexFrom], [,Numeric IndexTo])`: [Function](), __return__: [ArrayList](), *create a sub ArrayList.*