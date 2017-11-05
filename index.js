'use strict';

const glfw   = require('node-glfw-raub');
const node3d = require('node-3d-ready-raub');
const qml    = require('node-qml-raub');

node3d.QmlMaterial = require('./qml-material');
node3d.QmlRect     = require('./qml-rect');

node3d.QmlOverlayMaterial = require('./qml-overlay-material');
node3d.QmlOverlay         = require('./qml-overlay');


const _cc = glfw.GetCurrentContext();
const wnd = glfw.Win32Window(_cc);
const ctx = glfw.Win32Context(_cc);

qml.release = () => glfw.MakeContextCurrent(_cc);

qml.init(wnd, ctx);
qml.release();

node3d.qml = qml;


node3d.loop = screen => {
	
	const animation = () => {
		
		node3d.qml.release();
		screen.draw();
		node3d.frame(animation);
		
	};
	
	node3d.frame(animation);
	
};


module.exports = node3d;
