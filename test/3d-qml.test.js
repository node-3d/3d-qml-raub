'use strict';


const assert = require('node:assert').strict;
const { describe, it } = require('node:test');
const three = require('three');
const { init, addThreeHelpers } = require('3d-core-raub');
const { init: initQml } = require('..');

const {
	doc, gl,
} = init({
	isGles3: true, isWebGL2: true,
});

addThreeHelpers(three, gl);

const inited = initQml({ doc, gl, cwd: __dirname, three });

const {
	QmlOverlay, QmlMaterial, QmlOverlayMaterial, View,
} = inited;

const initResults = [
	'QmlOverlay', 'QmlMaterial', 'QmlOverlayMaterial',
	'Property', 'Method', 'View',
	'loop', 'release', 'textureFromId',
];

const initedClasses = {
	QmlOverlay: {
		create() {
			return new QmlOverlay({ file: `${__dirname}/qml/Hud.qml` });
		},
		props: ['isVisible', 'isDisabled', 'material', 'mesh'],
	},
	QmlMaterial: {
		create() {
			return new QmlMaterial();
		},
		props: ['textureId'],
	},
	QmlOverlayMaterial: {
		create() {
			return new QmlOverlayMaterial();
		},
		props: ['textureId'],
	},
};


const tested = describe('Qml 3D Inited', () => {
	it('returns all init results', () => {
		initResults.forEach(
			(name) => assert.strictEqual(
				typeof inited[name],
				'function',
				`Init field "${name}" is missing.`,
			),
		);
	});
	
	Object.keys(initedClasses).forEach((c) => {
		it(`exports class "${c}"`, () => {
			assert.strictEqual(typeof inited[c], 'function');
		});
		
		const current = initedClasses[c];
		const instance = current.create();
		
		it(`is valid instance of ${c}`, () => {
			assert.ok(
				instance instanceof inited[c],
				`Can't instantiate class "${c}".`,
			);
		});
		
		it(`exposes properties of "${c}"`, () => {
			current.props.forEach((prop) => {
				assert.ok(
					typeof instance[prop] !== 'undefined',
					`Property "${c}.${prop}" not found.`,
				);
			});
		});
	});
});

(async () => {
	const interv = setInterval(View.update, 15);
	await tested;
	clearInterval(interv);
})();
