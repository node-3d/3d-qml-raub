'use strict';

const node3d = require('./index');

const camera = new node3d.three.PerspectiveCamera( 75, node3d.canvas.width / node3d.canvas.height, 1, 1000 );
camera.position.z = 500;

const scene = new node3d.three.Scene();

node3d.qml.init({
	three   : node3d.three,
	document: node3d.doc,
	canvas  : node3d.canvas,
	gl      : node3d.gl,
	renderer: node3d.renderer,
	scene   : scene,
	overlay : true,
});

const ui = node3d.qml.used({file:'gui.qml'});

const geometry = new node3d.three.IcosahedronGeometry(200, 1);
const material =  new node3d.three.MeshLambertMaterial({
	color: 0xffffff,
});
const mesh = new node3d.three.Mesh(geometry, material);
scene.add( mesh );

const pointLight = new node3d.three.PointLight(0xFFFFFF, 1, 100000);
scene.add( pointLight );
pointLight.position.x = 200;
pointLight.position.y = 2000;
pointLight.position.z = 500;


function animation() {
	
	mesh.rotation.x = Date.now() * 0.00005;
	mesh.rotation.y = Date.now() * 0.0001;
	
	ui.update();
	qml.release();
	node3d.renderer.render(scene, camera);
	
}

while (1){
	node3d.frame(animation);
}
