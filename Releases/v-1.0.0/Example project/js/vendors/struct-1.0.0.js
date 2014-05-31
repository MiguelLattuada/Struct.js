'use strict';
/*
    Def: Get the primitive type of any element and return it as a numeric value.
    Returns:
        1, if type is numeric,
        2, if type is string,
        3, if type is array,
        4, if type is function,
        5, in any other case.
*/
Object.prototype.typeof = function( ){
        var type = typeof this;
        switch ( type ){
            case 'number': return 1;
            case 'string': return 2;
            case 'array': return 3;
            case 'function': return 4;
            default: return 5;
        }
    };

/*
    Def: Verify the type of any object by passing the numeric value of a primitive type.
    Parameters:
        typeInt [,Numeric], value to compare must be the correspond numeric value of a primitive type otherwise the comparation will fail.
    Returns:
        true, the value in the parameter is the object type.
        false, the value in the parameter is not the object type.
*/
Object.prototype.typeVerify = function( typeInt ){ return this.typeof( ) == typeInt; };

/*
    Def: Compare element in a very basic way.
    Parameters:
        comparer [,Object], the object to compare.
    Returns:
        true, if the comparer is equals to the object.
        false, if the comparer is not equals to the object.
*/
Object.prototype.equals = function( comparer ){ return this == comparer; };

/*
    Def: The base object that will contain the ArrayList class.
    Type: [,Object]
*/
var Struct;

/*
    Def: A closed scope to define the ArrayList class.
    Type: [,Function]
*/
(function(s){

    /*
        Def: The definition of the ArrayList class.
        Type: [,Function]
    */
    s.ArrayList = function( properties ){
        
        //Def: check if properties is defined.
        if( !!properties ){

            //Def: check if properties type is 5.
            if ( properties.typeVerify(5) ) {
                
                //Def: current abstact object.
                var _this = this;

                //Def: attributes initialization.
                var init = function( ){
                    
                    //Def: the type of the elements to be stored, by default it will be 5.
                    _this.type = properties.type || 5;

                    //Def: support for duplicate values, by default it won't support.
                    _this.ducplicate = properties.duplicate || false;
                    
                    //Def: special properties for element type = 5.
                    if( _this.type == 5 ){
                        //Def: the base class for the objects.
                        _this.baseClass = properties.baseClass || undefined;
                        //Def: the key to identify objects.
                        _this.key = properties.key || undefined;
                    }
                    
                    //Def: the array behind the scene, not a public member since first release.
                    _this.data = new Array(0);
                    
                    //Def: current elements count.
                    _this.count = 0;
                        
                    return _this;
                };

                /*
                    Def: Insert elements by index or at the end of the ArrayList.
                    Parameters:
                        item [,Object], the item that will be inserted. No type exception.
                        index [,Numeric], optional. The position of the ArrayList that you want to insert the item.
                    Returns:
                        true, if item was added.
                        false, if item was not added.
                    Notes:
                        Inserting elements by index will not override the element in that index.
                */
                _this.add = function( item, index ){
                    
                    if ( !!item && _this.isProperItem( item ) ){
                        if( _this.verifyDuplication( item ) ){

                            if ( !!index ){
                                if ( indexRangeCheck( index ) ){
                                    reorderAndInsert( item, index );
                                }else{
                                    return false;
                                }
                            }else{
                                _this.data.push(item);
                            }

                            assignGUID( item );

                            ++_this.count;
                            return true;
                        }
                    }
                    return false;
                };
                
                /*
                    Def: verify items before insert them.
                    Parameters:
                        item [,Object], the object to verify. No type exception.
                    Returns:
                        true, if the object is propertly to be inserted.
                        false, if the object is not propertly to be inserted.
                    Notes:
                        add method already uses it to insert items.
                */
                _this.isProperItem = function( item ){
                    if( !!_this.baseClass ){
                        if( item.typeVerify( _this.type ) && item instanceof _this.baseClass ) return true;
                    }else if( item.typeVerify( _this.type ) ){
                        return true;
                    }
                    return false;
                };

                /*
                    Def: verify items if they are already in the ArrayList.
                    Parameters:
                        item [,Obejct], the object to verify. No type exception.
                    Returns:
                        true, the element is not duplicated.
                        false, the element is duplicated.
                    Notes:
                        add method already uses it to insert items.
                */
                _this.verifyDuplication = function( item ){
                    if( _this.duplicate ){
                        return true;
                    }
                    return _this.find( item ).equals(-1);
                };

                /*
                    Def: get an element by index.
                    Parameters:
                        index [,Numeric], the position of the element on the ArrayList.
                    Returns:
                        [,Object], the element in the index position.
                        null, if the index provided is out of range.
                */
                _this.get = function( index ){
                    if( indexRangeCheck( index ) )
                        return _this.data[index];
                    return null
                };

                /*
                    Def: get a property of an element in a certain position.
                    Parameters:
                        index [,Numeric], the position of the element on the ArrayList.
                        propertyName [,String], the property name of the element.
                    Returns:
                        [,Object], if the property exists.
                        undefined, if the property does not exists or its value is undefined.
                        null, if the index provided is out of range.
                */
                _this.getPropertyValue = function( index, propertyName ){
                    if( indexRangeCheck( index ) ){
                        return _this.data[index][propertyName];
                    }
                    return null;
                };

                /*
                    Def: get elements by filtering them with properties values.
                    Parameters:
                        filterOptions [,Object], the object with the properties name and values.
                    Returns:
                        [,Array], empty or populated with the elements matching the filter properties.
                        null, if the filterOptions parameter is not an object.
                */
                _this.getBy = function( filterOptions ){

                    if(filterOptions.typeVerify( 5 )){
                        //Get the attributes behind properties
                        var attr = [];
                        for( var k in filterOptions ) attr.push( k );

                        //Filter elements with the properties
                        var result = [];

                        _this.data.filter(function(element, index){
                            var r = 0;
                            attr.forEach(function(e,i){
                                if( filterOptions[e] == element[e] ) r++;
                            });
                            if(r.equals(attr.length)) result.push( element );
                        });

                        return result;                    
                    }

                    return null;
                };

                /*
                    Def: get the element by the key property value.
                    Parameters:
                        keyValue [,Object], the value of the key attribute for your object.
                    Returns:
                        [,Object], the object matching the sentence.
                    Notes
                        Still does not work.
                */
                _this.take = function( keyValue ){
                    var filterOptions = {};
                    filterOptions[_this.key] = keyValue;
                    return _this.getBy(filterOptions)[0];
                };

                /*
                    Def: get the last element of the ArrayList.
                    Returns:
                        [,Object], the last item of the ArrayList
                */
                _this.last = function( ){
                    return _this.get( _this.count - 1 );
                };

                /*
                    Def: get the first element of the ArrayList.
                    Returns:
                        [,Object], the first item of the ArrayList
                */
                _this.first = function( ){
                    return _this.get(0);
                }

                /*
                    Def: replace the element in a certain position with another.
                    Parameters:
                        index [,Numeric], the position of the element on the ArrayList.
                        item [,Object], the item that will be inserted. No type exception.
                    Returns:
                        true, the value was set to the given position.
                        false, the index was out of range.
                */
                _this.set = function( index, item ){
                    if( indexRangeCheck( index )){
                        if( isProperItem( item ) ) {
                            _this.data[index] = item;
                            return true;
                        }
                    }
                    return false
                };

                /*
                    Def: change the value of a propery on a certain object placed on the index position.
                    Parameters:
                        index [,Numeric], the position of the element on the ArrayList.
                        propertyName [,String], the property name of the element.
                        propertyValue [,Object], the new property value.
                    Returns:
                        [,Object], if it could change the value.
                        null, if the element was not found.
                    Notes:
                        If the propertyName does not exists JavaScript will create a new and assign the propertyValue as value.
                */
                _this.setPropertyOf = function( index, propertyName, propertyValue ){
                    var item = _this.get( index );
                    if( !!item && item.typeVerify( 5 ) ){
                        item[propertyName] = propertyValue;
                        return item;
                    }
                    return null;
                }
                
                /*
                    Def: get the element by itself and return the position in the ArrayList.
                    Parameters:
                        item [,Object], the item that will be searched. No type exception.
                    Returns:
                        position, if the element was found.
                        -1, if the element was not found.
                    Notes:
                        This method is deprecated when ArrayList is used with duplicate set to true.
                */
                _this.find = function( item ){

                    if( _this.ducplicate )
                        return null;

                    var result = -1;
                    _this.data.filter( 
                            function( element, index ){ 
                                if( item.typeVerify(5) ){
                                    if( !!_this.key ){
                                        if( element[_this.key].equals(item[_this.key]) ) result = index;
                                    }else{
                                        if( element.GUID.equals(item.GUID) ) result = index;
                                    }
                                }else{
                                    if( item.equals( element ) ) result = index
                                }
                            }
                        );

                    return result;
                };

                /*
                    Def: delete the item in the given position.
                    Parameters:
                        index [,Numeric], the position of the element on the ArrayList.
                    Returns:
                        true, the element was deleted.
                        false, the element was not deleted the index provided was out of range.
                */
                _this.delete = function( index ){

                    if( indexRangeCheck( index ) ){
                        deleteAndReorder( index );
                        --_this.count;
                        return true;
                    }

                    return false;

                };

                /*
                    Def: delete the element by passing itself as argument.
                    Parameters:
                        item [,Object], the item that will be deleted. No type exception.
                    Returns:
                        true, if the element was deleted.
                        false, if the index is out of range.
                */
                _this.deleteObject = function( item ){
                    var index = _this.find( item );
                    return _this.delete( index );
                };

                /*
                    Def: delete a range of items.
                    Parameters:
                        from [,Numeric], the position of the ArrayList to start deletion.
                        to [,Numeric], the position of the ArrayList to end deletion.
                    Returns:
                        true, if the range was deleted.
                        false, if the index is out of range or from index < to index.
                */
                _this.deleteRange = function( from, to ){
                    if( indexRangeCheck( from ) && indexRangeCheck( to )){
                        if( from < to ){
                            _this.data.splice( from, to );
                            _this.count = _this.data.length;
                            return true;
                        }
                    }
                    return false;
                };

                //Def: remove all elements from the ArrayList.
                _this.clear = function( ){
                    _this.data = new Array(0);
                    _this.count = 0;
                };

                /*
                    Def: clone the current ArrayList to the parameter referenced.
                    Parameters:
                        reference [,ArrayList], the ArrayList you want to clone the data to. Must be the same type and the same baseClass.
                    Returns:
                        true, the clone operation was succesfull,
                        false, the clone operation failed.
                */
                _this.clone = function( reference ){
                    if( !!_this.baseClass && !!reference.baseClass ){
                        if(reference instanceof Struct.ArrayList && reference.type.equals( _this.type ) && reference.baseClass.equals( _this.baseClass ) ){
                            reference.data = _this.data;
                            reference.count = _this.count;
                            return true;
                        }
                    }else{
                        if( reference instanceof Struct.ArrayList && reference.type.equals( _this.type ) ){
                            reference.data = _this.data;
                            reference.count = _this.count;
                            return true;
                        }
                    }
                    
                    return false;
                };

                /*
                    Def: determinate is the ArrayList is empty.
                    Returns:
                        true, the ArrayList is empty.
                        false, the ArrayList is not empty.
                */
                _this.empty = function( ){
                    return _this.count.equals(0);
                };
                
                /*
                    Def: return the ArrayList as an Array.
                    Returns:
                        [,Array], representing the data.
                */
                _this.toArray = function( ){
                    return _this.data;
                };

                /*
                    Def: create a sub ArrayList from the current one.
                    Parameters:
                        from [,Numeric], the position of the ArrayList to start deletion.
                        to [,Numeric], the position of the ArrayList to end deletion.
                    Returns:
                        [,ArrayList], representing the data specified.
                        null, if the index is out of range or from index < to index.
                */
                _this.subArrayList = function( from, to ){
                    if( indexRangeCheck( from ) && indexRangeCheck( to )){
                        if( from < to ){
                            var result = _this;
                            result.data.deleteRange( from, to );
                            result.count = result.data.length;
                            return result;
                        }
                    }
                    return null;
                };

                /*
                    Def: convert the ArrayList to string data.
                    Retirns:
                        [,String], the data represented as string,
                    Notes
                        You must override toString method on type 5 objects.
                */
                _this.toString = function( ){
                    return _this.data.toString();
                };

                /*
                    Def: conver the ArrayList to a JSON string.
                    Returns:
                        [,String], the data represented as JSON string.
                */
                _this.toJSON = function( ){
                    return JSON.stringify(_this.data);
                };

                //PRIVATE MEMBERS
                
                /*
                    Def: validate a given index of the ArrayList.
                    Parameters:
                        index [,Numeric], position to check.
                    Returns:
                        true, the index is in the range of ArrayList positioning.
                        false, the index is out the range of ArrayList positioning.
                */
                var indexRangeCheck = function( index ){
                    return ( index >= 0 && index < _this.count && index.typeVerify(1) );
                };
                
                /*
                    Def: create a new Array with more space, using the data on the current one.
                    Parameters:
                        oldArray [,Array], the current Array.
                        newSize [,Numeric], the new size of the Array.
                    Returns:
                        [,Array], representing the new Array with the data copied.
                    Notes:
                        Out of use.
                */
                //var arrayCopy = function( oldArray, newSize ){
                //    var newArray = new Array( newSize );
                //    for( var i = 0; i < oldArray.length; i++ ){ newArray[i] = oldArray[i]; }
                //    return newArray;
                //};
                
                /*
                    Def: redorder the Array before insert item.
                    Parameters:
                        item [,Object], the item that will be inserted. No type exception.
                        index [,Numeric], position of the ArrayList that the item will be inserted.
                    Notes:
                        add method uses it for insertion.
                */
                var reorderAndInsert = function( item, index ){
                    if( index.equals(0) ){
                        _this.data.unshift( item );
                    }else{
                        var result = _this.data.slice( 0, index );
                        result.push( item );
                        result = result.concat( _this.data.slice( index, _this.data.length ) );
                        _this.data = result;
                    }
                };

                /*
                    Def: delete the specified item and reorder the array to avoid empty spaces.
                    Parameters:
                        index [,Numeric], position of the ArrayList that the item will be deleted.
                    Notes:
                        delete method uses it for deletion
                */
                var deleteAndReorder = function( index ){
                    if( index.equals(0) ){
                        _this.data.shift();
                    }else if( index.equals( _this.count - 1 ) ){
                        _this.data.pop();
                    }else{
                        var result = _this.data.splice( index, _this.data.length );
                        result.shift();
                        _this.data.concat( result );
                    }
                };

                /*
                    Create GUID to identify objects, be aware this code has been tested and collisions has been part of the result.
                    Let's take use of it until to get a new solution for the problem.
                    Taken from: http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/
                */
                var createGUID = function( ){
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                };

                /*
                    Def: assign a GUID identifier when the property key is not set.
                    Patameters:
                        item [,Object], the item thath will recieved the GUID.
                    Notes:
                        add method uses it for insertion.
                */
                var assignGUID = function( item ){
                    if( item.typeVerify( 5 ) && _this.key == undefined ){
                        item.GUID = createGUID( );
                    }
                };
                
                //Returns the init method for default settings.
                return init( );  
            }
        }
        return null;
    }

})(Struct || ( Struct = {} ));