'use strict';

const core3d = require('3d-core-raub');
const qml3d = require('3d-qml-raub');

qml3d(core3d);


const { qml, Screen, loop, gl, Points, doc } = core3d;
const { View, Overlay, Method } = qml;

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

View.libs(`${__dirname}/lib`);
const ui = new View({ width: screen.w, height: screen.h, file: `${__dirname}/qml/gui.qml` });
const updateTree = new Method({ view: ui, name: 'dynamic-tree', key: 'update' });
const clearTree = new Method({ view: ui, name: 'dynamic-tree', key: 'clear' });

doc.on('mousedown', ui.mousedown.bind(ui));
doc.on('mouseup', ui.mouseup.bind(ui));
doc.on('mousemove', ui.mousemove.bind(ui));
doc.on('keydown', ui.keydown.bind(ui));
doc.on('keyup', ui.keyup.bind(ui));

new Overlay({ screen, view: ui });


// ----------- KINJUTSU: Dynamic QML Tree

// Tree presets
const tree1 = [
	{ title: 'line1' },
	{
		title: 'line2',
		subtree: [
			{ title: 'child1' },
			{ title: 'child2' },
		],
	},
	{ title: 'line3' },
];

const tree2 = [
	{ title: 'line1' },
	{ title: 'line2' },
	{
		title: 'line3',
		subtree: [
			{ title: 'child1' },
		],
	},
];

let activeTree = tree1;

const randomize = tree => {
	tree.forEach(item => {
		item.title = Math.floor(Math.random() * 1e9).toString(16);
		if (item.subtree) {
			randomize(item.subtree);
		}
	});
};

ui.on('tree-clicked', e => console.log('tree-clicked', e.title));

ui.on('tree-randomize', e => {
	randomize(activeTree);
	updateTree.call(activeTree);
});

ui.on('tree-switch', e => {
	activeTree = (activeTree === tree1) ? tree2 : tree1;
	updateTree.call(activeTree);
});

updateTree.call(activeTree);
