'use strict';

const qml = require('qml-raub');

const { View, Property, Method } = qml;


module.exports = core => {
	
	const { loop, doc } = core;
	
	const release = () => doc.makeCurrent();
	
	qml.View.init(process.cwd(), doc.platformWindow, doc.platformContext);
	release();
	
	
	if (process.platform === 'linux') {
		core.loop = cb => loop(() => {
			View.update();
			release();
			cb();
		});
	} else {
		core.loop = cb => loop(() => {
			release();
			cb();
		});
	}
	
	
	Object.assign(core.qml, {
		
		context : qml,
		
		release,
		
		View,
		Property,
		Method,
		
	});
	
	
	require('./material')(core);
	require('./rect')(core);
	require('./overlay-material')(core);
	require('./overlay')(core);
	
};
