'use strict';

module.exports = core => {
	
	if (core.qml.Material) {
		return;
	}
	
	const { three, qml } = core;
	const { Texture, ShaderMaterial } = three;
	const { release } = qml;
	
	class Material extends ShaderMaterial {
		
		constructor(opts) {
			
			super({
				
				blending    : three.NormalBlending,
				depthTest   : opts.depthTest || false,
				transparent : opts.transparent || true,
				
				side        : opts.side || three.DoubleSide,
				
				uniforms    : { t: { type: 't', value: opts.texture } },
				
				vertexShader: `
					varying vec2 tc;
					void main() {
						tc = uv;
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}
				`,
				
				fragmentShader: `
					varying vec2 tc;
					uniform sampler2D t;
					void main() {
						vec2 coord = vec2(tc.x, 1.0 - tc.y);
						gl_FragColor = texture2D(t, coord);
					}
				`,
				
			});
			
		}
		
		get texture() { return this.uniforms.t.value; }
		set texture(tex) { this.uniforms.t.value = tex; }
		
	}
	
	qml.Material = Material;
	
};
