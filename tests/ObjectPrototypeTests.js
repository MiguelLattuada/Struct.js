'use strict';

define(['Struct'], function( struct ){
    
    //Object prototype testing, with native struct
    var num = 12,
        _m = 'Assertion passed ',
        runner = {};
    
    runner.tests = [];
    
    runner.tests.push(
        function( ){ test('Object prototype (equals method testing): Numeric values', function( ){
            ok( !num.equals(4), _m + 'Number 12 != 4' );
            ok( num.equals(12), _m + 'Numer 12 = 12' );
        })
    });
    
    runner.tests.push(
        function( ){ test('Object prototype (typeof / typeVerify methods testing): Numeric values', function( ){
            ok( num.typeof( ) == num.typeVerify(1), _m + 'Variable num type = 1 (Numeric)' );
            ok( !num.typeof( ) == num.typeVerify(2), _m + 'Varbiale num type != 2 (String)' );
        })
    });
    
    runner.start = function( ){
        for( var i in this.tests ) this.tests[i]();
    }
    
    return { runner: runner };
    
});