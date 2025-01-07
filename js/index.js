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
	View.style('Basic');
	release();
	
	const loop = (cb) => {
		let next = null;
		const loopFunc = () => {
			View.update();
			doc.makeCurrent();
			cb();
			next = doc.requestAnimationFrame(loopFunc);
		};
		next = doc.requestAnimationFrame(loopFunc);
		return () => doc.cancelAnimationFrame(next);
	};
	
	const textureFromId = (id, renderer) => {
		const rawTexture = new gl.WebGLTexture(id);
		
		const texture = new three.Texture();
		
		let properties = null;
		if (!renderer.properties) {
			properties = texture;
		} else {
			properties = renderer.properties.get(texture); // !!!!
		}
		
		properties.__webglTexture = rawTexture;
		properties.__webglInit = true;
		
		return texture;
	};
	
	const QmlMaterial = require('./qml-material')({ textureFromId, three });
	const QmlOverlayMaterial = require('./qml-overlay-material')({ three });
	const QmlOverlay = require('./qml-overlay')({ doc, three });
	
	return {
		View, Property, Method,
		release, loop, textureFromId,
		QmlMaterial, QmlOverlayMaterial, QmlOverlay,
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
