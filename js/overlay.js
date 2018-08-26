'use strict';

module.exports = core => {
	
	if (core.qml.Overlay) {
		return;
	}
	
	require('./rect')(core);
	require('./overlay-material')(core);
	
	const { qml } = core;
	const { release, Rect, OverlayMaterial } = qml;
	
	class Overlay extends Rect {
		
		constructor(opts) {
			
			opts.size = [2, 2];
			
			super(opts);
			
			this._mesh.frustumCulled = false;
			
			opts.screen.on('resize', ({width, height}) => opts.view.wh = [width, height]);
			
			release();
			
		}
		
		
		_mat(opts) {
			
			return new OverlayMaterial(opts);
			
		}
		
		get textureId() { return this._textureId; }
		set textureId(id) { this._textureId = id; }
		
		
	}
	
	qml.Overlay = Overlay;
	
};
