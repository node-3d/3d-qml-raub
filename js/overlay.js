'use strict';

module.exports = core => {
	
	if (core.qml.Overlay) {
		return;
	}
	
	require('./rect')(core);
	require('./overlay-material')(core);
	
	const { three, qml } = core;
	const { Texture } = three;
	const { release, Rect, OverlayMaterial } = qml;
	
	class Overlay extends Rect {
		
		constructor(opts) {
			
			opts.size = [2, 2];
			
			super(opts);
			
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
