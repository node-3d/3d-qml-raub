'use strict';


module.exports = core => {
	
	if (core.qml) {
		return;
	}
	
	core.qml = {};
	
	require('./js')(core);
	
};
