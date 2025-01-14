'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');
const three = require('three');

// const { screenshot } = require('./screenshot');
const inited = require('./init')();
// const { window, QmlOverlay, loop, doc, Image } = inited;
const { window, loop } = inited;

const renderer = new three.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 2;
const scene = new three.Scene();
// const overlay = new QmlOverlay({ file: `${__dirname}/test.qml` });
const loadPromise = Promise.race([
	new Promise((res) => { setTimeout(() => res(false), 5000); }),
	// new Promise((res) => overlay.on('load', () => res(true))),
]);
// const texturePromise = Promise.race([
// 	new Promise((res) => { setTimeout(() => res(null), 5000); }),
// 	// new Promise((res) => overlay.on('reset', (id) => res(id))),
// ]);
// scene.add(overlay.mesh);


const tested = describe('Screenshots', () => {
	it('matches ui screenshot', async () => {
		const loaded = await loadPromise;
		assert.strictEqual(loaded, false);
		// const texture = await texturePromise;
		// assert.ok(texture);
		
		await new Promise((res) => setTimeout(res, 100));
		renderer.render(scene, camera);
		
		// assert.ok(await screenshot('ui', doc, Image));
	});
});


(async () => {
	const stop = loop(() => {
		renderer.render(scene, camera);
	});
	await tested;
	stop();
	window.destroy();
	setTimeout(() => undefined, 500);
})();
