'use strict';


const _init = ({ textureFromId, three }) => {
	if (!three) {
		console.error('Can\'t init QmlOverlayMaterial with no `three`.');
		return null;
	}
	
	class QmlMaterial extends three.ShaderMaterial {
		constructor(opts = {}) {
			super({
				...opts,
				side: opts.side || three.CullFaceBack,
				uniforms: {
					...(opts.uniforms || null),
					t: { value: null },
				},
				transparent: opts.transparent || false,
				lights: opts.lights || false,
				vertexShader: opts.vertexShader || `
					out vec2 tc;
					void main() {
						tc = uv;
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: opts.fragmentShader || `
					uniform sampler2D t;
					in vec2 tc;
					out vec4 fragColor;
					void main() {
						fragColor = texture(t, tc);
					}
				`,
				glslVersion: opts.glslVersion || '300 es',
			});
			this._textureId = null;
			this._texture = null;
			this._renderer = null;
		}
		
		onBeforeCompile(_shaderobject, renderer) {
			if (!this._renderer && this._textureId) {
				this._texture = textureFromId(this._textureId, renderer);
				this.uniforms.t.value = this._texture;
			}
			this._renderer = renderer;
		}
		
		get textureId() { return this._textureId; }
		set textureId(texId) {
			this._textureId = texId;
			
			if (this._renderer && this._textureId) {
				this._texture = textureFromId(this._textureId, this._renderer);
				this.uniforms.t.value = this._texture;
			}
		}
	}
	
	return QmlMaterial;
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
