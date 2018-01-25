'use strict';

const core3d = require('3d-core-raub');
const qml3d = require('3d-qml-raub');

qml3d(core3d);


const { qml, Screen, three, loop } = core3d;
const { View, Overlay } = qml;


const screen = new Screen();
loop(() => screen.draw());


const ui = new View({ width: screen.w, height: screen.h, file: 'qml/dashboard.qml' });

new Overlay({ screen, view: ui });


loop(screen);
