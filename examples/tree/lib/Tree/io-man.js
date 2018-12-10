'use strict';

// JS Classes are likely unsupported in QML JS


function IoMan() {
	
	this._ioPaths = {};
	this._ioCache = {};
	
}

IoMan.prototype = {
	
	
	drop: function (opts) {
		
		delete this._ioPaths[opts.uid];
		
		if (opts.value !== undefined) {
			this._ioCache[opts.uid] = opts.value;
		}
		
	},
	
	
	reg: function (opts) {
		
		this._ioPaths[opts.uid] = { setter: opts.setter, getter: opts.getter };
		
		if ( this._ioCache[opts.uid] !== undefined && this._ioPaths[opts.uid].setter ) {
			this._ioPaths[opts.uid].setter(this._ioCache[opts.uid]);
		}
		
	},
	
	
	set: function (opts) {
		
		this._ioCache[opts.uid] = opts.value;
		
		if ( this._ioPaths[opts.uid] && this._ioPaths[opts.uid].setter ) {
			this._ioPaths[opts.uid].setter(opts.value);
		}
		
	},
	
	
	get: function (opts) {
		
		if ( this._ioPaths[opts.uid] && this._ioPaths[opts.uid].getter ) {
			this._ioCache[opts.uid] = this._ioPaths[opts.uid].getter();
		}
		
		return this._ioCache[opts.uid] || 0;
		
	},
	
	
};
