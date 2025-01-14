const three = require('three');
const { init, addThreeHelpers } = require('3d-core-raub');
// const { init: initQml } = require('..');

const initForTest = () => {
	const node3d = init({
		isGles3: true, isWebGL2: true,
		width: 200, height: 200,
	});

	const { doc, gl } = node3d;

	addThreeHelpers(three, gl);

	// const inited = initQml({ doc, gl, cwd: __dirname, three });
	// return { ...node3d, ...inited };
	return inited;
};

module.exports = initForTest;
