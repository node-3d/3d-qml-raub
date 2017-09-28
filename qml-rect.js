'use strict';

const node3d = require('node-3d-ready-raub');


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


module.exports = QmlRect;
