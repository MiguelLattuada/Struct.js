'use strict';

define(['Struct'], function( struct ){
    
    //Array list data structure testing
    
    /*
        
        in this case 1 = 'numeric'
    */

    //Deploy on console
    window.struct = struct;

    //Some variable to work with
    window.N_LIST = new struct.ArrayList({ type: 1 });
    var _m = 'Assertion passed ',
        runner = {};
    
    runner.tests = [];

    /*Example of a custom object*/
    window.Cat = function(name, age, color){
        this.name = name;
        this.age = age;
        this.color = color;
    };

    /*ArrayList custom object based*/
    //visible from console
    window.CAT_LIST = new struct.ArrayList({ type: 5, baseClass: Cat });

    /*
        If you want to use ArrayList class to store custom classes you must provide the constructor function
        to the ArrayList baseClass property and the type 5
        Otherwise if just the type is provided any kind of 'object' will be stored,
        'object' in Struct will mean every variable pointing to brackets {}

        Do not get confused and think 'ALMOST ALL IS AN OBJECT IN JAVASCRIPT'
    */
    
    runner.tests.push(
        function( ){ test('ArrayList method testing', function( ){

            ok( N_LIST.empty(), _m + 'the ArrayList is empty' );
            strictEqual( N_LIST.count, 0, _m + '0 is the ArrayList elements count' );
            
            //Adding and keep testing
            ok( N_LIST.add( 12 ), _m + 'adding element to ArrayList' );
            
            //Index insertion test
            ok( N_LIST.add( 11, 0 ), _m + 'adding element by index to ArrayList' );
            
            //Checking size and count after insretion
            strictEqual( N_LIST.count, 2, _m + '2 is the ArrayList elements count' );

        })
    });

    runner.tests.push(
        function( ){ test('ArrayList for custom object', function( ){

            //testing type
            ok( CAT_LIST.type == 5, _m + 'the arraylist of type object' );
            ok( CAT_LIST.baseClass == Cat, _m + 'the arraylist baseclass is Cat');

        })
    });
    
    runner.start = function( ){
        for( var i in this.tests ) this.tests[i]();
    }
    
    return { runner: runner };
    
});