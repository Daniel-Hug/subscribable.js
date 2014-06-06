Subscribable.js
===============

A tiny extendable JS constructor for custom event listening. Use it in the browser or in node:

## Install

```
npm install subscribable.js
```
**OR**
```
bower install subscribable.js
```


## Simple usage

```js
var Daniel = new Subscribable();

Daniel.on('puke', function(event, msg) {
	console.log('Eeeww! ' + msg);
});

Daniel.trigger('puke', 'That was gross!');
//=> Eeeww! That was gross!
```


## Add events to any constructor

This example uses the `Obj.extend` function from [object-subscribe](https://github.com/Daniel-Hug/object-subscribe) to make a `Person` contructor inherit event subscribing features from `Subscribable`:

```js
var Person = function(name) {
	// add properties from `new Subscribable()` to `this`:
	Obj.extend(new Subscribable(), this);
	this.name = name;
};

Person.prototype = Obj.extend(Subscribable.prototype, {
	sayName: function() {
		console.log('Hi! I\'m ' + this.name + '.');
	}
});

var Daniel = new Person('Daniel');

Daniel.sayName();
//=> Hi! I'm Daniel.

Daniel.on('smile', function showTeeth(event, numTeeth) {
	console.log('Oh look! ' + this.name + ' has ' + numTeeth + ' teeth.');
});

Daniel.trigger('smile', 30);
//=> Oh look! Daniel has 30 teeth.
```


## Extend

Add your own methods to the `Subscribable` prototype:

```
Subscribable.prototype.once = function(event, fn) {
	var t = this;
	this.on(event, function() {
		fn.apply(this, arguments);
		t.off(event, fn);
	});
};
```