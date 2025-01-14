'use strict';

const three = require('three');

const inited = require('./init')();
const { window, loop, QmlOverlay } = inited;

const renderer = new three.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 2;
const scene = new three.Scene();
const overlay = new QmlOverlay({ file: `${__dirname}/test.qml` });
const loadPromise = Promise.race([
	new Promise((res) => { setTimeout(() => res(false), 5000); }),
	new Promise((res) => overlay.on('load', () => res(true))),
]);

(async () => {
	const stop = loop(() => {
		renderer.render(scene, camera);
	});
	await loadPromise;
	await new Promise((res) => setTimeout(res, 1000));
	stop();
	window.destroy();
	setTimeout(() => undefined, 500);
})();
