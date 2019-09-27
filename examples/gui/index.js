'use strict';

const init = require('3d-core-raub');
const qml3d = require('../..');


const { qml, Screen, loop, gl, Points, doc } = init({ plugins: [qml3d] });
const { View, Overlay } = qml;

const screen = new Screen();
loop(() => screen.draw());


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


const VBO_SIZE = 10000;

const vertices = [];
const colors = [];
for (let i = VBO_SIZE * 3; i > 0; i--) {
	vertices.push( Math.random() * 2000 - 1000 );
	colors.push( Math.random() );
}

const pos = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, pos);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

const rgb = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, rgb);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

const points = new Points({
	
	screen,
	
	count: VBO_SIZE,
	
	attrs: {
		
		position: {
			vbo: pos,
			items: 3,
		},
		
		color: {
			vbo: rgb,
			items: 3,
		},
		
	},
	
});


const ui = new View({ width: screen.w, height: screen.h, file: `${__dirname}/qml/gui.qml` });

doc.on('mousedown', ui.mousedown.bind(ui));
doc.on('mouseup', ui.mouseup.bind(ui));
doc.on('mousemove', ui.mousemove.bind(ui));
doc.on('keydown', ui.keydown.bind(ui));
doc.on('keyup', ui.keyup.bind(ui));
doc.on('wheel', ui.wheel.bind(ui));

new Overlay({ screen, view: ui });


let isRotating = false;
let mouse = { x: 0, y: 0 };

ui.on('mousedown', () => isRotating = true);
ui.on('mouseup', () => isRotating = false);

ui.on('mousedown', e => console.log('[>mousedown]', e));
ui.on('mouseup', e => console.log('[>mouseup]', e));
// ui.on('mousemove', e => console.log('[mousemove]', e));
ui.on('keydown', e => console.log('[>keydown]', e));
ui.on('keyup', e => console.log('[>keyup]', e));
ui.on('wheel', e => console.log('[>wheel]', e));


ui.on('mousemove', e => {
	
	const dx = mouse.x - e.x;
	const dy = mouse.y - e.y;
	
	mouse.x = e.x;
	mouse.y = e.y;
	
	if ( ! isRotating ) {
		return;
	}
	
	points.mesh.rotation.y += dx * 0.001;
	points.mesh.rotation.x += dy * 0.001;
	
});


ui.on('ohai', data => {
	console.log('RECV', data);
	ui.set('myButton1', 'text', `${Date.now()}`);
});
