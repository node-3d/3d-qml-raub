'use strict';

const core3d = require('3d-core-raub');
const qml3d = require('3d-qml-raub');

qml3d(core3d);


const { qml, Screen, loop, doc, Image } = core3d;
const { View, Overlay } = qml;


const screen = new Screen();
loop(() => screen.draw());

const icon = new Image();
icon.src = __dirname + '/../qml.png';
icon.on('load', () => doc.icon = icon);

doc.title = 'Qt Dashboard';


const F_KEY = 70;

doc.on('keydown', e => {
	if (e.keyCode === F_KEY && e.ctrlKey && e.shiftKey) {
		screen.mode = 'windowed';
	} else if (e.keyCode === F_KEY && e.ctrlKey && e.altKey) {
		screen.mode = 'fullscreen';
	} else if (e.keyCode === F_KEY && e.ctrlKey) {
		screen.mode = 'borderless';
	}
});


const ui = new View({ width: screen.w, height: screen.h, file: 'qml/dashboard.qml' });

new Overlay({ screen, view: ui });
