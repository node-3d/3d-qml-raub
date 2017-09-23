'use strict';

const glfw   = require('node-glfw-raub');
const node3d = require('node-3d-ready-raub');
const qml    = require('node-qml-raub');


const _cc = glfw.GetCurrentContext();
const wnd = glfw.Win32Window(_cc);
const ctx = glfw.Win32Context(_cc);

qml.release = () => glfw.MakeContextCurrent(_cc);

qml.init(wnd, ctx);
qml.release();


class QmlMaterial extends node3d.three.ShaderMaterial {
	
	constructor(opts) {
		
		super({
			
			blending    : node3d.three.AdditiveBlending,
			depthTest   : opts.depthTest || false,
			transparent : opts.transparent || true,
			
			side        : opts.side || node3d.three.DoubleSide,
			
			uniforms    : { t: { type: 't', value: opts.texture } },
			
			vertexShader: `
				varying vec2 tc;
				void main() {
					tc = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
				}
			`,
			
			fragmentShader: `
				varying vec2 tc;
				uniform sampler2D t;
				void main() {
					gl_FragColor = texture2D(t, tc);
				}
			`,
			
		});
		
	}
	
	get texture() { return this._mesh.material.uniforms.t.value; }
	set texture(tex) { this._mesh.material.uniforms.t.value = tex; }
	
}
node3d.QmlMaterial = QmlMaterial;



class QmlRect extends node3d.Rect {
	
	constructor(opts) {
		
		if ( ! opts.view ) {
			throw new Error('The opts.view property is required.');
		}
		
		super(Object.assign({
			texture : opts.view.textureId !== undefined ?
				node3d.textureFromId(opts.view.textureId, opts.screen.renderer) :
				null,
		}, opts));
		
		this._view = opts.view;
		this._textureId = this._view.textureId;
		
		console.log('RECT id', this._textureId);
		this._view.on('reset', texId => {
			this._textureId = texId;
			this._mesh.material.texture = this._textureId !== undefined ?
				node3d.textureFromId(this._textureId, opts.screen.renderer) :
				null;
		});
		
	}
	
	
	_mat(opts) {
		
		return new node3d.QmlMaterial(opts);
		
	}
	
	get textureId() { return this._textureId; }
	set textureId(id) { this._textureId = id; }
	
	
}
node3d.QmlRect = QmlRect;


node3d.qml = qml;

module.exports = node3d;
