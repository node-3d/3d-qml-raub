'use strict';

const { expect } = require('chai');


const core3d = require('3d-core-raub');
const qml3d = require('3d-qml-raub');

qml3d(core3d);


const { qml, Screen, three } = core3d;
const {
	View,
	Rect, Material,
	Overlay, OverlayMaterial,
} = qml;

const loop = cb => {
	const timer = setInterval(cb, 16);
	return () => clearInterval(timer);
};

const screen = new Screen();


const ui = new View({ width: screen.w, height: screen.h, file: `${__dirname}/test.qml` });

const classes = {
	
	Rect: {
		create() {
			return new Rect({ screen, view: ui });
		},
		props: ['textureId'],
		methods: [],
	},
	
	Overlay: {
		create() {
			return new Overlay({ screen, view: ui });
		},
		props: ['textureId'],
		methods: [],
	},
	
	Material: {
		create() {
			return new Material({ screen, view: ui, texture: new three.Texture() });
		},
		props: ['texture'],
		methods: [],
	},
	
	OverlayMaterial: {
		create() {
			return new OverlayMaterial({ screen, view: ui, texture: new three.Texture() });
		},
		props: ['texture'],
		methods: [],
	},
	
};


describe('Node.js 3D QML', function () {
	
	let l;
	before(() => { l = loop(() => screen.draw()); });
	after(() => { l(); l = null; });
	
	this.timeout(10000);
	
	it('exports an function', () => {
		expect(qml3d).to.be.a('function');
	});
	
	it('extends the core', () => {
		expect(core3d).to.have.property('qml');
	});
	
	it('is an object', () => {
		expect(qml).to.be.an('object');
	});
	
	Object.keys(classes).forEach(
		c => {
			it(`${c} is exported`, () => {
				expect(qml).to.respondTo(c);
			});
		}
	);
	
	Object.keys(classes).forEach(c => describe(c, () => {
		
		const current = classes[c];
		const instance = current.create();
		
		it('can be created', () => {
			expect(instance).to.be.an.instanceOf(qml[c]);
		});
		
		
		current.props.forEach(prop => {
			it(`#${prop} property exposed`, () => {
				expect(instance).to.have.property(prop);
			});
		});
		
		current.methods.forEach(method => {
			it(`#${method}() method exposed`, () => {
				expect(instance).to.respondTo(method);
			});
		});
		
	}));
	
});
