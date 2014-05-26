'use strict';

//Create an id manual counter.
var idCounter = 0;

//Creating a new custom class.
var Person = function( name, last, age ){ 
	this.name = name;
	this.last = last;
	this.age = age;
	this.id = idCounter++;
	return this;
};

//Creating a new instance of ArrayList.
var People = new Struct.ArrayList({
	type: 5/*object type*/,
	baseClass: Person/*base class for objects inside*/,
	key: 'id' /*primary key like*/
});

//Event type.
var Type = { add: 'type.add', delete: 'type.delete', get: 'type.get' };

//Create an event custom class.
var Event = function( type, result ){
	this.type = type;
	this.result = result;
	this.toString = function(){ return this.GUID + " [ " + this.type + " ] : " + this.result; };
};

//Create an event logger.
var EventLogger = new Struct.ArrayList({
	type: 5,
	baseClass: Event
});