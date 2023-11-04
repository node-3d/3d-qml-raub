'use strict';


'use strict';

import three from 'three';
import { init, addThreeHelpers } from '3d-core-raub';
import { init as initQml } from '3d-qml-raub';

const {
	doc, Image: Img, gl,
} = init({
	isGles3: true,
	isWebGL2: true,
	autoEsc: true,
	autoFullscreen: true,
});

addThreeHelpers(three, gl);

console.log('ini', !!doc, !!doc?.getContext('webgl'));
const { QmlOverlay, loop } = initQml({ doc, gl, cwd: process.cwd(), three });

const icon = new Img(__dirname + '/../qml.png');
icon.on('load', () => { doc.icon = (icon as unknown as typeof doc.icon); });
doc.title = 'Qt Dashboard';


const scene = new three.Scene();
const cameraPerspective = new three.PerspectiveCamera(90, doc.w / doc.h, 1, 1000);
cameraPerspective.position.z = 9;

const renderer = new three.WebGLRenderer();
renderer.setPixelRatio(doc.devicePixelRatio);
renderer.setSize(doc.w, doc.h);
// renderer.debug.checkShaderErrors = false;

doc.on('resize', () => {
	cameraPerspective.aspect = doc.w / doc.h;
	cameraPerspective.updateProjectionMatrix();
	renderer.setSize(doc.w, doc.h);
});

const overlay = new QmlOverlay({ file: `${__dirname}/qml/dashboard.qml` });
scene.add(overlay.mesh);

const render = () => {
	renderer.render(scene, cameraPerspective);
};

loop(() => render());
