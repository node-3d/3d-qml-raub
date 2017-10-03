'use strict';

const node3d  = require('../../index');

const screen = new node3d.Screen();

const ui  = new node3d.qml.View({ width: 400, height: 400, file: 'qml/first.qml' });
const surface2 = new node3d.QmlOverlay({ screen, view: ui });
node3d.qml.release();


function animation() {
	
	screen.draw();
	node3d.frame(animation);
	
}

node3d.frame(animation);
