'use strict';

const qml = require('node-qml-raub');

const { View, Variable } = qml;


module.exports = core => {
	
	const { glfw, loop } = core;
	
	const _cc = glfw.GetCurrentContext();
	const wnd = glfw.PlatformWindow(_cc);
	const ctx = glfw.PlatformContext(_cc);
	
	const release = () => glfw.MakeContextCurrent(_cc);
	
	qml.init(wnd, ctx);
	release();
	
	
	Object.assign(core.qml, {
		
		context : qml,
		
		View,
		Variable,
		
		loop : cb => loop(() => {
			release();
			cb();
		}),
		
	});
	
	
	require('./material')(core);
	require('./rect')(core);
	require('./overlay-material')(core);
	require('./overlay')(core);
	
};
