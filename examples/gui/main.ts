'use strict';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as three from 'three';
import { init, addThreeHelpers } from '3d-core-raub';
import { init as initQml } from '3d-qml-raub';


const __dirname = dirname(fileURLToPath(import.meta.url));

const {
	doc, Image: Img, gl,
} = init({
	isGles3: true,
	isWebGL2: true,
	autoEsc: true,
	autoFullscreen: true,
});

addThreeHelpers(three, gl);

const { QmlOverlay, loop } = initQml({ doc, gl, cwd: __dirname, three });

const icon = new Img(__dirname + '/../qml.png');
icon.on('load', () => { doc.icon = (icon as unknown as typeof doc.icon); });
doc.title = 'QML Tree';


const scene = new three.Scene();
scene.fog = new three.FogExp2( 0x000000, 0.0007 );

const cameraPerspective = new three.PerspectiveCamera(90, doc.w / doc.h, 1, 2000);
cameraPerspective.position.z = 1000;

const renderer = new three.WebGLRenderer();
renderer.setPixelRatio(doc.devicePixelRatio);
renderer.setSize(doc.w, doc.h);
// renderer.debug.checkShaderErrors = false;

doc.on('resize', () => {
	cameraPerspective.aspect = doc.w / doc.h;
	cameraPerspective.updateProjectionMatrix();
	renderer.setSize(doc.w, doc.h);
});

const overlay = new QmlOverlay({ file: `${__dirname}/qml/gui.qml` });
scene.add(overlay.mesh);

const geo = new three.BufferGeometry();
geo.computeBoundingSphere = (() => {
	geo.boundingSphere = new three.Sphere(undefined, Infinity);
});
geo.computeBoundingSphere();
geo.setDrawRange(0, 0);

const CLOUD_SIZE = 20000;

const vertices = [];
for (let i = 0; i < CLOUD_SIZE; i++) {
	vertices.push(Math.random() * 2000 - 1000);
	vertices.push(Math.random() * 2000 - 1000);
	vertices.push(Math.random() * 2000 - 1000);
}
const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
const posAttr = new three.GLBufferAttribute(vbo, gl.FLOAT, 3, 4, CLOUD_SIZE);
geo.setAttribute('position', posAttr as unknown as three.BufferAttribute);
geo.setDrawRange(0, CLOUD_SIZE);

const getTimeHue = (): number => {
	const within360 = Math.floor(Date.now() * 0.01) % 360;
	return within360 / 360;
};

const material = new three.PointsMaterial({ size: 5 });
material.color.setHSL(getTimeHue(), 1, 0.5);
const particles = new three.Points(geo, material);
scene.add(particles);

const update = () => {
	material.color.setHSL(getTimeHue(), 1, 0.5);
	particles.rotation.y = Date.now() * 0.00005;
	
	renderer.render(scene, cameraPerspective);
};

loop(() => update());
