'use strict';

module.exports = core => {
	
	if (core.qml.Rect) {
		return;
	}
	
	const { three, qml } = core;
	const { Texture } = three;
	const { release } = qml;
	
	class Rect extends core.Rect {
		
		constructor(opts) {
			
			if ( ! opts.view ) {
				throw new Error('The opts.view property is required.');
			}
			
			super(Object.assign({
				texture : opts.view.textureId !== undefined ?
					Texture.fromId(opts.view.textureId, opts.screen.renderer) :
					null,
			}, opts));
			
			this._view = opts.view;
			this._textureId = this._view.textureId;
			
			this._view.on('reset', texId => {
				
				release();
				
				this._textureId = texId;
				this._mesh.material.texture = this._textureId !== undefined ?
					Texture.fromId(this._textureId, opts.screen.renderer) :
					null;
				
			});
			
		}
		
		
		_mat(opts) {
			
			return new qml.Material(opts);
			
		}
		
		get textureId() { return this._textureId; }
		set textureId(id) { this._textureId = id; }
		
		
	}
	
	qml.Rect = Rect;
	
};
