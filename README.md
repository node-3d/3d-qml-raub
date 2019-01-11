# Node.js 3D QML

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://nodei.co/npm/3d-qml-raub.png?compact=true)](https://www.npmjs.com/package/3d-qml-raub)

[![Build Status](https://api.travis-ci.com/node-3d/3d-qml-raub.svg?branch=master)](https://travis-ci.com/node-3d/3d-qml-raub)
[![CodeFactor](https://www.codefactor.io/repository/github/node-3d/3d-qml-raub/badge)](https://www.codefactor.io/repository/github/node-3d/3d-qml-raub)

> npm i -s 3d-qml-raub


## Synopsis

QML 2D graphics plugin for Node.js 3D Core

![Example](examples/screenshot.jpg)

> Note: compilation tools must be in place on your system.
For Windows, use **ADMIN PRIVELEGED** command line:
\`npm i -g windows-build-tools\`.
Also **Windows** needs **vcredist 2013** to be installed.


## Usage

As any Node3D plugin, `3d-qml-raub` exports a single function. Given a Node3D
object this function extends with `qml` property. Now this property holds
whatever this plugin offers.

```
const core3d = require('3d-core-raub');
const qml3d = require('3d-qml-raub');

qml3d(core3d);

const { three, qml, Image, doc } = core3d;
const { Material, Overlay, OverlayMaterial, Rect } = qml;

// ...
```

See examples for quick start.

> Note: **IMPORTANT**, using QML, keep in mind it has its own OpenGL context, so
when you use yours, be aware it might be not the current one.
Use `document.makeCurrent()` or `release()` (see exported below).


## Exports

See docs of [qml-raub](https://github.com/node-3d/qml-raub). This plugin
reexports those as is.

Additionally there are few classes specific for this plugin:
* Rect - scene-space Three.js rectangle designed to display QML GUI.
* Material - Three.js material for scene-space texturing with QML GUI.
* Overlay - fullscreen Three.js overlay to display QML GUI.
* OverlayMaterial - Three.js material for fullscreen overlay with QML GUI.
* release() - switch OpenGL context to that of the default `document`. 
