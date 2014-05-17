'use strict';

define(function( ){

    var Struct = {};
    
    Object.prototype.typeof = function( ){
        var type = typeof this;
        switch ( type ){
            case 'number': return 1;
            case 'string': return 2;
            case 'array': return 3;
            case 'function': return 4;
            default: return 5;
        }
    }
       
    Object.prototype.typeVerify = function( typeInt ){ return this.typeof( ) == typeInt; };

    Object.prototype.equals = function( comparer ){ return this == comparer; };
    
    Struct.ArrayList = function( properties ){
        
        if ( properties.typeVerify(5) ) {
            
            var _this = this;
            /*
                Atributes initialization
            */
            var init = function( ){
                
                /*Define default properties*/
                _this.type = properties.type || 5;
                _this.ducplicate = properties.duplicate || false;
                _this.key = properties.key || undefined;
                
                if( _this.type == 5 ){
                    _this.baseClass = properties.baseClass || undefined;
                }
                
                /*The data*/
                _this.data = new Array(0);
                
                /*Count elements*/
                _this.count = 0;
                    
                return _this;
            };

            /*Insert element by index or at the end*/
            /*If index is provided the element to be inserted will not remove the element in that place*/
            _this.add= function( item, index ){
                
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
            
            /*Verify item before insert it*/
            _this.isProperItem = function( item ){
                if( !!_this.baseClass ){
                    if( item.typeVerify( _this.type ) && item instanceof _this.baseClass ) return true;
                }else if( item.typeVerify( _this.type ) ){
                    return true;
                }
                return false;
            }

            /*Verify an item if it's duplicated return true not duplicated false duplicated*/
            _this.verifyDuplication = function( item ){
                if( _this.duplicate ){
                    return true;
                }
                return _this.find( item ).equals(-1);
            }

            /*Get the element by index*/
            _this.get = function( index ){
                if( indexRangeCheck( index ) )
                    return _this.data[index];
                return null
            };

            /*Get elements by properties*/
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

            /*Change value in a certain index*/
            _this.set = function( index, item ){
                if( indexRangeCheck( index )){
                    if( isProperItem( item ) ) {
                        _this.data[index] = item;
                        return true;
                    }
                }
                return false
            };

            /*Change model state adding or setting properties values*/
            _this.setPropertyOf = function( index, property, propertyValue ){
                var item = _this.get( index );
                if( !!item ){
                    item[property] = propertyValue;
                    return item;
                }
                return null;
            }
            
            /*Get the element by itself and return the position*/
            /*No enable when duplicate is set to true*/
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

            /*Delete element by index*/
            _this.delete = function( index ){

                if( index.typeVerify(1) ){
                    if( indexRangeCheck( index ) ){
                        deleteAndReorder( index );
                        --_this.count;
                        return true;
                    }
                }

                return false;

            };

            /*Delete element by itself*/
            _this.deleteObject = function( item ){
                var index = _this.find( item );
                return _this.delete( index );
            };

            /*Delete a range of items*/
            _this.deleteRange = function( from, to ){
                if( indexRangeCheck( from ) && indexRangeCheck( to )){
                    _this.data.splice( from, to );
                    _this.count = _this.data.length;
                    return true;
                }
                return false;
            }

            /*remove all elements*/
            _this.clear = function( ){
                _this.data = new Array(0);
                _this.count = 0;
            };

            /*clone the data to another arraylist of type*/
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

            /*List has no elements*/
            _this.empty = function( ){
                return _this.count.equals(0);
            };
            
            /*Returns the arraylist as an array*/
            _this.toArray = function( ){
                return _this.data;
            };

            /*Returns an arraylist of selected items*/
            _this.subArrayList = function( from, to ){
                if( indexRangeCheck( from ) && indexRangeCheck( to )){
                    var result = _this;
                    result.data.deleteRange( from, to );
                    result.count = result.data.length;
                    return result;
                }
                return null;
            };

            /*Convert data to string, if the array list type is equals to 5, you must override toString on yout objects*/
            _this.toString = function( ){
                return _this.data.toString();
            };

            /*Convert data to JSON string*/
            _this.toJSON = function( ){
                return JSON.stringify(_this.data);
            };

            //PRIVATE MEMBERS
            
            /*Check for valid index*/
            var indexRangeCheck = function( index ){
                return ( index >= 0 && index < _this.count );
            };
            
            /*Array copy*/
            var arrayCopy = function( oldArray, newSize ){
                var newArray = new Array( newSize );
                for( var i = 0; i < oldArray.length; i++ ){ newArray[i] = oldArray[i]; }
                return newArray;
            };
            
            /*Reorder array and insert*/
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

            /*Delete and reorder array*/
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

            /*Assign GUID just when key property is not defined*/
            var assignGUID = function( item ){
                if( item.typeVerify( 5 ) && _this.key == undefined ){
                    item.GUID = createGUID( );
                }
            };
            
            return init( );
            
        }

        return null;
        
    }

    return Struct;
    
});