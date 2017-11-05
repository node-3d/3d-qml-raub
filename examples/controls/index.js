'use strict';

const node3d  = require('../../index');


const screen = new node3d.Screen();

const ui  = new node3d.qml.View({ width: screen.w, height: screen.h, file: 'qml/dashboard.qml' });
const surface2 = new node3d.QmlOverlay({ screen, view: ui });


node3d.loop(screen);
