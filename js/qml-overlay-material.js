'use strict';


const QmlMaterial = require('./qml-material')();

const _init = ({ three }) => {
	if (!three) {
		console.error('Can\'t init QmlOverlayMaterial with no `three`.');
		return null;
	}
	
	class QmlOverlayMaterial extends QmlMaterial {
		constructor(opts = {}) {
			super({
				...opts,
				side: opts.side || three.CullFaceFront,
				depthWrite: opts.depthWrite || false,
				depthTest: opts.depthTest || false,
				transparent: opts.transparent || true,
				vertexShader: opts.vertexShader || `
					out vec2 tc;
					void main() {
						tc = uv;
						gl_Position = vec4(position, 1.0);
					}
				`,
			});
		}
	}
	
	return QmlOverlayMaterial;
};


let inited = null;
const init = (opts) => {
	if (inited) {
		return inited;
	}
	inited = _init(opts);
	return inited;
};

module.exports = init;
