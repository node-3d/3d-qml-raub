'use strict';

const core3d = require('3d-core-raub');
const qml3d = require('3d-qml-raub');

qml3d(core3d);


const { qml, Screen, loop, gl, Points, doc } = core3d;
const { View, Overlay, Method, Property } = qml;

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
// const updateTree = new Method({ view: ui, name: 'dynamic-tree', key: 'update' });
// const clearTree = new Method({ view: ui, name: 'dynamic-tree', key: 'clear' });

doc.on('mousedown', ui.mousedown.bind(ui));
doc.on('mouseup', ui.mouseup.bind(ui));
doc.on('mousemove', ui.mousemove.bind(ui));
doc.on('keydown', ui.keydown.bind(ui));
doc.on('keyup', ui.keyup.bind(ui));

new Overlay({ screen, view: ui });


// Tree preset
const theTree = [
	{
		uid     : 'uid-1',
		title   : 'Root 1',
		kind    : 'fold',
		isOpen  : true,
		subtree : [
			{
				uid     : 'uid-2',
				title   : 'Child 1',
				kind    : 'value',
				value   : 1,
				subtree : [
					{
						uid   : 'uid-3',
						title : 'Subvalue 1',
						kind  : 'value',
						value : 2,
					},
					{
						uid   : 'uid-4',
						title : 'Subvalue 2',
						kind  : 'value',
						value : 3,
					},
				],
			},
			{
				uid     : 'uid-5',
				title   : 'Child 2',
				kind    : 'fold',
				subtree : [],
			},
		],
	},
	{
		uid     : 'uid-6',
		title   : 'Root 2',
		kind    : 'value',
		value   : 0,
		subtree : [
			{
				uid     : 'uid-7',
				title   : 'Child 1',
				kind    : 'fold',
				subtree : [
					{
						uid   : 'uid-8',
						title : 'Subvalue 1',
						kind  : 'value',
						value : 4,
					},
					{
						uid   : 'uid-9',
						title : 'Subvalue 2',
						kind  : 'value',
						value : 5,
					},
				],
			},
		],
	},
	{
		uid   : 'uid-10',
		title : 'Value',
		kind  : 'value',
		value : 6,
	},
];

// Set initial value
const tree  = new Property({ view: ui, name: 'dynamic-tree', key: 'tree', value: theTree });
const ioSet = new Method({ view: ui, name: 'dynamic-tree', key: 'ioSet' });

ui.on('tree-clicked', e => console.log('tree-clicked', e));


const connect = item => {
	
	if (item.kind !== 'value') {
		return null;
	}
	
	return new Property({
		view : ui,
		name : item.uid,
		key  : 'value',
		value: item.value,
		setJs: v => {
			item.value = v;
		},
		getJs: () => {
			return item.value;
		},
		send() {
			if (this.canSend() && this.value !== null) {
				ioSet.call({ uid: this.name, value: this.value });
			}
		}
	});
	
};

(function _recurse(subtree) {
	subtree.forEach(item => {
		if (item.subtree) {
			_recurse(item.subtree);
		}
		connect(item);
	});
})(theTree);
