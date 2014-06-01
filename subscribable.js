var Subscribable = function() {
	this.subscribers = {
		change: []
	};
};

Subscribable.prototype = {
	// Subscribe a function to an event (if the event doesn't exist, create it):
	on: function(event, fn) {
		if (!this.subscribers[event]) this.subscribers[event] = [];
		this.subscribers[event].push(fn);
	},

	// Pass an event and a function to unsubscribe a specific function from an event,
	// pass just an event to unsubscribe all functions from that event,
	// or don't pass any arguments to cancel all subscriptions.
	off: function (event, fn) {
		if (event) {
			if (fn) {
				var fnIndex = this.subscribers[event].indexOf(fn);
				if (fnIndex >= 0) this.subscribers[event].splice(fnIndex, 1);
			} else {
				this.subscribers[event] = [];
			}
		} else {
			for (event in this.subscribers) {
				this.subscribers[event] = [];
			}
		}
	},

	// notify all subscribers to an event:
	trigger: function(event) {
		var args = [].slice.call(arguments, 1);
		var t = this;
		var fn = function(fn) {
			fn.apply(t, args);
		};
		(this.subscribers[event] || []).forEach(fn);
		if (event !== 'change') this.subscribers.change.forEach(fn);
	}
};