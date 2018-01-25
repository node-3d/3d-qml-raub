'use strict';

const qml = require('node-qml-raub');

const { View, Variable } = qml;


module.exports = core => {
	
	const { glfw, loop } = core;
	
	const _cc = glfw.getCurrentContext();
	const wnd = glfw.platformWindow(_cc);
	const ctx = glfw.platformContext(_cc);
	
	const release = () => glfw.makeContextCurrent(_cc);
	
	qml.init(wnd, ctx);
	release();
	
	core.loop = cb => loop(() => {
		release();
		cb();
	});
	
	Object.assign(core.qml, {
		
		context : qml,
		
		release,
		
		View,
		Variable,
		
	});
	
	
	require('./material')(core);
	require('./rect')(core);
	require('./overlay-material')(core);
	require('./overlay')(core);
	
};
