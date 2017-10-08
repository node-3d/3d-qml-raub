'use strict';

const node3d  = require('../../index');

const screen = new node3d.Screen();

// node3d.qml.libs('C:/Users/blanco/_git/node-3d-qml/examples/controls/qml');
// node3d.qml.libs('E:/__git/__npm/node-3d-qml/examples/controls/qml');
// node3d.qml.libs('qml');
// const ui  = new node3d.qml.View({ width: screen.w, height: screen.h, file: 'E:/__git/__npm/node-3d-qml/examples/controls/qml/gui.qml' });
// const ui  = new node3d.qml.View({ width: screen.w, height: screen.h, file: 'qml/gui.qml' });
const ui  = new node3d.qml.View({ width: screen.w, height: screen.h, file: 'qml/dashboard.qml' });
const surface2 = new node3d.QmlOverlay({ screen, view: ui });
node3d.qml.release();


function animation() {
	
	node3d.qml.release();
	screen.draw();
	node3d.frame(animation);
	
}

node3d.frame(animation);
