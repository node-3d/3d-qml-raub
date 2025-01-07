# Node.js 3D QML Helpers

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://badge.fury.io/js/3d-qml-raub.svg)](https://badge.fury.io/js/3d-qml-raub)
[![ESLint](https://github.com/node-3d/3d-qml-raub/actions/workflows/eslint.yml/badge.svg)](https://github.com/node-3d/3d-qml-raub/actions/workflows/eslint.yml)
[![Test](https://github.com/node-3d/3d-qml-raub/actions/workflows/test.yml/badge.svg)](https://github.com/node-3d/3d-qml-raub/actions/workflows/test.yml)

```console
npm i -s 3d-qml-raub
```

[QML](https://doc.qt.io/qt-6/qmlapplications.html)-rendering helpers for Node.js 3D Core.
The QML backend is **Qt 6.8.0**.

![Example](examples/screenshot.png)

> Note: **IMPORTANT**, QML has its own OpenGL context. Make sure to switch back.
Use `document.makeCurrent()` or `release()` (see exported below).

```typescript
import * as three from 'three';
import { init, addThreeHelpers } from '3d-core-raub';
import { init as initQml } from '3d-qml-raub';

// Standard Node3D init
const {
	doc, Image: Img, gl,
} = init({
	isGles3: true, isWebGL2: true, autoEsc: true,
});
addThreeHelpers(three, gl);

// Initialize QML and fetch the helpers
const {
	QmlOverlay, Property, Method, View, loop, release, textureFromId,
} = initQml({
	doc, gl, cwd: __dirname, three,
});
```

* See [TypeScript declarations](/index.d.ts) for more details.
* See [example](/examples/fps/main.ts) for a complete setup.

It is also possible to run [QtQuick examples](https://doc.qt.io/qt-6/qtquick-codesamples.html)
on Node.js with this renderer. But it will only work with `QtQuick` components, i.e.
not `QtMultimedia`, `QtNetwork`, etc. - because those libs are not included.
See [Dashboard](https://doc.qt.io/qt-5/qtquickextras-dashboard-example.html)
example being [copied](examples/qt-dashboard) as a proof of concept.


## QmlOverlay

A common use-case is full-screen overlay UI:

```typescript
// Loads QML and creates all threejs-related resources, e.g. `overlay.mesh` is `THREE.Mesh`
const overlay = new QmlOverlay({ file: `${__dirname}/qml/Test.qml` });
scene.add(overlay.mesh);

// QML property access shortcut
const propTest = new Property<string>({
	view: overlay, name: 'hud', key: 'testProp',
});

// A typed callable example
type TMethodTest = (arg0: number) => void;
const methodTest: TMethodTest = new Method({
	view: overlay, name: 'hud', key: 'testMethod',
});

// Listen to a user-defined event (could be any other name)
overlay.on('custom-event', (event) => {
	release();
	if (event.button === 'test') {
		console.log('test');
	}
	if (event.button === 'quit') {
		process.exit(0)
	}
});

propTest.value = 'test';
methodTest(123);
```

See [examples](examples) for more details.


## Any Material

Creating a threejs `Texture` from QML `View` is also supported.
Such textures may be used in arbitrary threejs materials of your choise.

```js
const testView = new View({ file: `${__dirname}/qml/Test.qml` });
const materialTest = new three.SpriteMaterial();

// If the view already has some texture - use it
materialTest.map = textureFromId(testView.textureId, renderer);

// If the view creates a new texture - update the material
testView.on('reset', (textureId) => {
	release();
	materialTest.map = textureFromId(textureId, renderer);
});
```
