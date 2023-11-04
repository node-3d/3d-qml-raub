'use strict';

const qml = require('qml-raub');


const _init = (opts = {}) => {
	const optsFinal = {
		...opts,
		cwd: opts.cwd || process.cwd(),
	};
	
	const { doc, gl, cwd, three } = optsFinal;
	const { View, Property, Method } = qml;

	const release = () => doc.makeCurrent();
	
	View.init(cwd, doc.platformWindow, doc.platformContext, doc.platformDevice);
	release();
	
	const loop = (cb) => {
		let i = 0;
		
		const animation = () => {
			doc.requestAnimationFrame(animation);
			
			View.update();
			release();
			
			cb(i++);
		};
		
		doc.requestAnimationFrame(animation);
	};
	
	const QmlOverlayMaterial = require('./qml-overlay-material')({ gl, three });
	const QmlOverlay = require('./qml-overlay')({ doc, three });
	
	return {
		View, Property, Method,
		release, loop,
		QmlOverlay, QmlOverlayMaterial,
	};
};

let inited = null;
const init = (optsFinal) => {
	if (inited) {
		return inited;
	}
	inited = _init(optsFinal);
	return inited;
};

module.exports = { init };
