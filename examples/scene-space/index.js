'use strict';

const core3d = require('3d-core-raub');
const qml3d = require('3d-qml-raub');

qml3d(core3d);


const { qml, Screen, loop, Surface, gl, Points, doc } = core3d;
const { View, Rect } = qml;


const VBO_SIZE = 10000;

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


const surface = new Surface({ screen });

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
	
	screen: surface,
	
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


const ui  = new View({ width: 400, height: 400, file: 'qml/first.qml' });
const surface2 = new Rect({ screen, size: [400, 400], pos: [-100,100], view: ui });

const ui2 = new View({ width: 500, height: 500, file: 'qml/second.qml' });
const surface3 = new Rect({ screen, size: [500, 500], pos: [100,-100], view: ui2 });


// let isMoving = false;
let isRotating = false;
let mouse = { x: 0, y: 0 };

doc.on('mousedown', () => isRotating = true);
doc.on('mouseup', () => isRotating = false);

doc.on('mousemove', e => {
	
	const dx = mouse.x - e.x;
	const dy = mouse.y - e.y;
	
	mouse.x = e.x;
	mouse.y = e.y;
	
	if ( ! isRotating ) {
		return;
	}
	
	points.mesh.rotation.y += dx * 0.001;
	points.mesh.rotation.x += dy * 0.001;
	
	surface.pos = surface.pos.plused([-dx, dy]);
	surface2.pos = surface2.pos.plused([dx, -dy]);
	surface3.pos = surface3.pos.plused([dx, dy]);
	
});
