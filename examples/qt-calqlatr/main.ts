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
	isGles3: true, isWebGL2: true, autoEsc: true, vsync: true,
});

addThreeHelpers(three, gl);

const { QmlOverlay, loop } = initQml({ doc, gl, cwd: __dirname, three });

const icon = new Img(__dirname + '/../qml.png');
icon.on('load', () => { doc.icon = (icon as unknown as typeof doc.icon); });
doc.title = 'Calqlatr';


const scene = new three.Scene();
const cameraPerspective = new three.PerspectiveCamera(90, doc.w / doc.h, 1, 1000);
cameraPerspective.position.z = 9;

const renderer = new three.WebGLRenderer();
renderer.setPixelRatio(doc.devicePixelRatio);
renderer.setSize(doc.w, doc.h);

doc.on('resize', () => {
	cameraPerspective.aspect = doc.w / doc.h;
	cameraPerspective.updateProjectionMatrix();
	renderer.setSize(doc.w, doc.h);
});

const overlay = new QmlOverlay({ file: `${__dirname}/calqlatr/Main.qml` });
// const overlay = new QmlOverlay({ file: `${__dirname}/itemswitcher/qml/main.qml` });
scene.add(overlay.mesh);

const update = () => {
	renderer.render(scene, cameraPerspective);
};

loop(() => update());
