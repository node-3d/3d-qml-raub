'use strict';

const glfw   = require('node-glfw-raub');
const node3d = require('node-3d-ready-raub');
const qml    = require('node-qml-raub');


const _cc = glfw.GetCurrentContext();
const wnd = glfw.Win32Window(_cc);
const ctx = glfw.Win32Context(_cc);

qml.release = () => glfw.MakeContextCurrent(_cc);

qml.init(wnd, ctx);
qml.release();


node3d.qml = qml;

module.exports = node3d;
