'use strict';

const node3d = require('node-3d-ready-raub');


class QmlOverlayMaterial extends node3d.three.ShaderMaterial {
	
	constructor(opts) {
		
		super({
			
			blending    : node3d.three.NormalBlending,
			depthTest   : opts.depthTest || false,
			transparent : opts.transparent || true,
			
			side        : opts.side || node3d.three.DoubleSide,
			
			uniforms    : { t: { type: 't', value: opts.texture } },
			
			vertexShader: `
				varying vec2 tc;
				void main() {
					tc = uv;
					gl_Position = vec4(position - vec3(1.0, 1.0, 0.0), 1.0);
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
	
	get texture() { return this._mesh.material.uniforms.t.value; }
	set texture(tex) { this._mesh.material.uniforms.t.value = tex; }
	
}

module.exports = QmlOverlayMaterial;
