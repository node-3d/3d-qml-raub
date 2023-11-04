'use strict';


const _init = ({ gl, three }) => {
	if (!three) {
		console.error('Can\'t init QmlOverlayMaterial with no `three`.');
		return null;
	}
	
	const fromId = (id, renderer) => {
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
	
	class QmlOverlayMaterial extends three.ShaderMaterial {
		constructor(opts = {}) {
			super({
				...opts,
				side: opts.side || three.CullFaceFront,
				uniforms: {
					...(opts.uniforms || null),
					t: { value: null },
				},
				depthWrite: opts.depthWrite || false,
				depthTest: opts.depthTest || false,
				transparent: opts.transparent || false,
				lights: opts.lights || false,
				vertexShader: opts.vertexShader || `
					out vec2 tc;
					void main() {
						tc = uv;
						gl_Position = vec4(position, 1.0);
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
				this._texture = fromId(this._textureId, renderer);
				this.uniforms.t.value = this._texture;
			}
			this._renderer = renderer;
		}
		
		get textureId() { return this._textureId; }
		set textureId(texId) {
			this._textureId = texId;
			
			if (this._renderer && this._textureId) {
				this._texture = fromId(this._textureId, this._renderer);
				this.uniforms.t.value = this._texture;
			}
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
