'use strict';

const node3d = require('node-3d-ready-raub');
const QmlRect = require('./qml-rect');


class QmlOverlay extends QmlRect {
	
	constructor(opts) {
		
		opts.size = [2, 2];
		
		super(opts);
		
		node3d.qml.release();
		
	}
	
	
	_mat(opts) {
		
		return new node3d.QmlOverlayMaterial(opts);
		
	}
	
	get textureId() { return this._textureId; }
	set textureId(id) { this._textureId = id; }
	
	
}


module.exports = QmlOverlay;
