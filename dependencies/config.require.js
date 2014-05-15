require.config({
    paths: {
        'QUnit': 'dependencies/qunit-1.14.0',
        'Struct': 'lib/struct',
        'ObjectPrototypeTests': 'tests/ObjectPrototypeTests',
        'ArrayListTests': 'tests/ArrayListTests'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       } 
    }
});