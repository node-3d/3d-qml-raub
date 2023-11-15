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

const {
	QmlOverlay, loop, View, Property, Method,
} = initQml({ doc, gl, cwd: __dirname, three });

const icon = new Img(__dirname + '/../qml.png');
icon.on('load', () => { doc.icon = (icon as unknown as typeof doc.icon); });
doc.title = 'QML UI';


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

View.libs(`${__dirname}/lib`);
const overlay = new QmlOverlay({ file: `${__dirname}/qml/Gui.qml` });
scene.add(overlay.mesh);

// ui.on('error', () => {});
// const updateTree = new Method({ view: ui, name: 'dynamic-tree', key: 'update' });
// const clearTree = new Method({ view: ui, name: 'dynamic-tree', key: 'clear' });

type TTree = {
	uid: string,
	title: string,
	kind: 'fold' | 'value',
	value?: number,
	isOpen?: boolean,
	subtree?: TTree[],
};

// Tree preset
const theTree: TTree[] = [
	{
		uid: 'uid-1',
		title: 'Root 1',
		kind: 'fold',
		isOpen: true,
		subtree: [
			{
				uid: 'uid-2',
				title: 'Child 1',
				kind: 'value',
				value: 1,
				subtree: [
					{
						uid: 'uid-3',
						title: 'Subvalue 1',
						kind: 'value',
						value: 2,
					},
					{
						uid: 'uid-4',
						title: 'Subvalue 2',
						kind: 'value',
						value: 3,
					},
				],
			},
			{
				uid: 'uid-5',
				title: 'Child 2',
				kind: 'fold',
				subtree: [],
			},
		],
	},
	{
		uid: 'uid-6',
		title: 'Root 2',
		kind: 'value',
		value: 0,
		subtree: [
			{
				uid: 'uid-7',
				title: 'Child 1',
				kind: 'fold',
				subtree: [
					{
						uid: 'uid-8',
						title: 'Subvalue 1',
						kind: 'value',
						value: 4,
					},
					{
						uid: 'uid-9',
						title: 'Subvalue 2',
						kind: 'value',
						value: 5,
					},
				],
			},
		],
	},
	{
		uid: 'uid-10',
		title: 'Value',
		kind: 'value',
		value: 6,
	},
];

// Set initial value
new Property({ view: overlay, name: 'dynamic-tree', key: 'tree', value: theTree });
const ioSet = new Method({ view: overlay, name: 'dynamic-tree', key: 'ioSet' });

overlay.on('tree-clicked', e => console.log('tree-clicked', e));


const connect = (item: TTree) => {
	if (item.kind !== 'value') {
		return null;
	}
	
	return new Property({
		view : overlay,
		name : item.uid,
		key  : 'value',
		// value: item.value,
	});
};

const connectAll = (subtree: TTree[]) => {
	subtree.forEach((item: TTree) => {
		if (item.subtree) {
			connectAll(item.subtree);
		}
		connect(item);
	});
};

if (overlay.isLoaded) {
	connectAll(theTree);
} else {
	overlay.on('load', () => connectAll(theTree));
}



const update = () => {
	renderer.render(scene, cameraPerspective);
};

loop(() => update());
