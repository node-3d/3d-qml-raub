'use strict';

const { View } = require('qml-raub');

const QmlOverlayMaterial = require('./qml-overlay-material')();


const _init = ({ doc, three }) => {
	if (!doc) {
		console.error('Can\'t init QmlOverlayMaterial with no `three`.');
		return null;
	}
	
	if (!three) {
		console.error('Can\'t init QmlOverlayMaterial with no `three`.');
		return null;
	}
	
	const release = () => doc.makeCurrent();
	
	class QmlOverlay extends View {
		constructor(opts) {
			release();
			
			const optsFinal = {
				...opts,
				width: doc.w,
				height: doc.h,
			};
			
			super(optsFinal);
			
			release();
			
			this._isVisible = true;
			this._isDisabled = false;
			this._mat = new QmlOverlayMaterial();
			this._mesh = new three.Mesh(new three.PlaneGeometry(2, 2), this._mat);
			this._mesh.frustumCulled = false;
			this._mesh.renderOrder = Infinity;
			
			doc.on('resize', ({ width, height }) => { this.wh = [width, height]; });
			
			this._mat.textureId = this.textureId;
			this.on('reset', (textureId) => {
				release();
				this._mat.textureId = textureId;
			});
			
			doc.on('mousedown', (e) => this._routeEvent('mousedown', e));
			doc.on('mouseup', (e) => this._routeEvent('mouseup', e));
			doc.on('mousemove', (e) => this._routeEvent('mousemove', e));
			doc.on('keydown', (e) => this._routeEvent('keydown', e));
			doc.on('keyup', (e) => this._routeEvent('keyup', e));
			doc.on('wheel', (e) => this._routeEvent('wheel', e));
		}
		
		_routeEvent(name, e) {
			if (!this._isVisible || this.isDisabled) {
				this.emit(name, e);
				return;
			}
			this[name](e);
		}
		
		get isVisible() { return this._isVisible; }
		set isVisible(value) {
			this._isVisible = value;
		}
		
		
		get isDisabled() { return this._isDisabled; }
		set isDisabled(value) {
			this._isDisabled = value;
		}
		
		
		get material() { return this._mat; }
		
		get mesh() { return this._mesh; }
	}
	
	return QmlOverlay;
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
