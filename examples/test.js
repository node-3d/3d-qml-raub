'use strict';

const node3d  = require('../index');


const VBO_SIZE = 10000;

const screen = new node3d.Screen();

const surface = new node3d.Surface({ screen });

const vertices = [];
const colors = [];
for (let i = VBO_SIZE * 3; i > 0; i--) {
	vertices.push( Math.random() * 2000 - 1000 );
	colors.push( Math.random() );
}

const pos = node3d.gl.createBuffer();
node3d.gl.bindBuffer(node3d.gl.ARRAY_BUFFER, pos);
node3d.gl.bufferData(node3d.gl.ARRAY_BUFFER, new Float32Array(vertices), node3d.gl.STATIC_DRAW);

const rgb = node3d.gl.createBuffer();
node3d.gl.bindBuffer(node3d.gl.ARRAY_BUFFER, rgb);
node3d.gl.bufferData(node3d.gl.ARRAY_BUFFER, new Float32Array(colors), node3d.gl.STATIC_DRAW);

const points = new node3d.Points({
	
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





const surface2 = new node3d.Surface({ screen });

node3d.qml.init({
	three   : surface2.three,
	document: surface2.doc,
	canvas  : surface2.canvas,
	gl      : surface2.context,
	renderer: surface2.renderer,
	scene   : surface2.scene,
	overlay : true,
});

const ui = node3d.qml.used({file:'qml/gui.qml'});








let isMoving = false;
let isRotating = false;
let mouse = { x: 0, y: 0 };

document.on('mousedown', e => isRotating = true);
document.on('mouseup', e => isRotating = false);

document.on('mousemove', e => {
	
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
	
});


function animation() {
	
	ui.update();
	node3d.qml.release();
	
	screen.draw();
	node3d.frame(animation);
	
}

node3d.frame(animation);
