/*! LICENSE: index.js.LICENSE.txt */
import { Method, Property, View } from "@node-3d/qml";
import "node:path";
import "node:url";
import { promisify } from "node:util";
import { exec as external_node_child_process_exec } from "node:child_process";
import "node:fs";
import "node:fs/promises";
const nameWindows = 'windows';
const platformAndArch = `${process.platform}-${process.arch}`;
const platformNames = {
    'win32-x64': nameWindows,
    'linux-x64': 'linux',
    'darwin-x64': 'osx',
    'linux-arm64': 'aarch64'
};
platformNames[platformAndArch];
global.AddonTools ??= {};
const loggers = {};
const logger_levels = [
    null,
    'error',
    'warn',
    'info',
    'log',
    'debug'
];
let currentLevel = 'log';
const levelIdx = {};
for(let i = 0; i < logger_levels.length; i++)levelIdx[logger_levels[i] ?? 'null'] = i;
const wrapOutput = (outputFn, level)=>(...args)=>{
        const outputLevel = levelIdx[level] ?? 0;
        const activeLevel = levelIdx[currentLevel ?? 'null'] ?? 0;
        if (outputLevel > activeLevel) return;
        outputFn(...args);
    };
const isLoggerLevel = (value)=>'error' === value || 'warn' === value || 'info' === value || 'log' === value || 'debug' === value;
const assignMethods = (logger, methods)=>{
    for (const [k, v] of Object.entries(methods))if (isLoggerLevel(k) && v) logger.replace(k, v);
};
const createLogger = (opts)=>{
    const prev = loggers[opts.name];
    if (prev) {
        assignMethods(prev, opts);
        return prev;
    }
    const newLogger = {
        debug: console.debug,
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error,
        replace: (level, fn)=>{
            if (levelIdx[level]) newLogger[level] = wrapOutput(fn || console.log, level);
        }
    };
    assignMethods(newLogger, opts);
    loggers[opts.name] = newLogger;
    return newLogger;
};
const getLogger = (name)=>loggers[name] || createLogger({
        name
    });
if (!global.AddonTools.log) global.AddonTools.log = (name, level, ...args)=>{
    const logger = loggers[name];
    if (!logger) return;
    logger[level](...args);
};
createLogger({
    name: 'addon-tools'
});
promisify(external_node_child_process_exec);
getLogger('addon-tools');
getLogger('addon-tools');
getLogger('addon-tools');
getLogger('addon-tools');
promisify(external_node_child_process_exec);
getLogger('addon-tools');
globalThis.AddonTools ??= {};
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */ const REVISION = '174';
const FrontSide = 0;
const NormalBlending = 1;
const AddEquation = 100;
const SrcAlphaFactor = 204;
const OneMinusSrcAlphaFactor = 205;
const LessEqualDepth = 3;
const UVMapping = 300;
const RepeatWrapping = 1000;
const ClampToEdgeWrapping = 1001;
const MirroredRepeatWrapping = 1002;
const LinearFilter = 1006;
const LinearMipmapLinearFilter = 1008;
const UnsignedByteType = 1009;
const RGBAFormat = 1023;
const InterpolateDiscrete = 2300;
const InterpolateLinear = 2301;
const InterpolateSmooth = 2302;
const ZeroCurvatureEnding = 2400;
const ZeroSlopeEnding = 2401;
const WrapAroundEnding = 2402;
const NoColorSpace = '';
const SRGBColorSpace = 'srgb';
const LinearSRGBColorSpace = 'srgb-linear';
const LinearTransfer = 'linear';
const SRGBTransfer = 'srgb';
const KeepStencilOp = 7680;
const AlwaysStencilFunc = 519;
const WebGLCoordinateSystem = 2000;
const WebGPUCoordinateSystem = 2001;
class EventDispatcher {
    addEventListener(type, listener) {
        if (void 0 === this._listeners) this._listeners = {};
        const listeners = this._listeners;
        if (void 0 === listeners[type]) listeners[type] = [];
        if (-1 === listeners[type].indexOf(listener)) listeners[type].push(listener);
    }
    hasEventListener(type, listener) {
        const listeners = this._listeners;
        if (void 0 === listeners) return false;
        return void 0 !== listeners[type] && -1 !== listeners[type].indexOf(listener);
    }
    removeEventListener(type, listener) {
        const listeners = this._listeners;
        if (void 0 === listeners) return;
        const listenerArray = listeners[type];
        if (void 0 !== listenerArray) {
            const index = listenerArray.indexOf(listener);
            if (-1 !== index) listenerArray.splice(index, 1);
        }
    }
    dispatchEvent(event) {
        const listeners = this._listeners;
        if (void 0 === listeners) return;
        const listenerArray = listeners[event.type];
        if (void 0 !== listenerArray) {
            event.target = this;
            const array = listenerArray.slice(0);
            for(let i = 0, l = array.length; i < l; i++)array[i].call(this, event);
            event.target = null;
        }
    }
}
const _lut = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '0a',
    '0b',
    '0c',
    '0d',
    '0e',
    '0f',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '1a',
    '1b',
    '1c',
    '1d',
    '1e',
    '1f',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '2a',
    '2b',
    '2c',
    '2d',
    '2e',
    '2f',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '3a',
    '3b',
    '3c',
    '3d',
    '3e',
    '3f',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '4a',
    '4b',
    '4c',
    '4d',
    '4e',
    '4f',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '5a',
    '5b',
    '5c',
    '5d',
    '5e',
    '5f',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '6a',
    '6b',
    '6c',
    '6d',
    '6e',
    '6f',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '7a',
    '7b',
    '7c',
    '7d',
    '7e',
    '7f',
    '80',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '8a',
    '8b',
    '8c',
    '8d',
    '8e',
    '8f',
    '90',
    '91',
    '92',
    '93',
    '94',
    '95',
    '96',
    '97',
    '98',
    '99',
    '9a',
    '9b',
    '9c',
    '9d',
    '9e',
    '9f',
    'a0',
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'a8',
    'a9',
    'aa',
    'ab',
    'ac',
    'ad',
    'ae',
    'af',
    'b0',
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'b6',
    'b7',
    'b8',
    'b9',
    'ba',
    'bb',
    'bc',
    'bd',
    'be',
    'bf',
    'c0',
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
    'ca',
    'cb',
    'cc',
    'cd',
    'ce',
    'cf',
    'd0',
    'd1',
    'd2',
    'd3',
    'd4',
    'd5',
    'd6',
    'd7',
    'd8',
    'd9',
    'da',
    'db',
    'dc',
    'dd',
    'de',
    'df',
    'e0',
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
    'e8',
    'e9',
    'ea',
    'eb',
    'ec',
    'ed',
    'ee',
    'ef',
    'f0',
    'f1',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
    'f8',
    'f9',
    'fa',
    'fb',
    'fc',
    'fd',
    'fe',
    'ff'
];
function generateUUID() {
    const d0 = 0xffffffff * Math.random() | 0;
    const d1 = 0xffffffff * Math.random() | 0;
    const d2 = 0xffffffff * Math.random() | 0;
    const d3 = 0xffffffff * Math.random() | 0;
    const uuid = _lut[0xff & d0] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' + _lut[0xff & d1] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' + _lut[0x3f & d2 | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] + _lut[0xff & d3] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];
    return uuid.toLowerCase();
}
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
function euclideanModulo(n, m) {
    return (n % m + m) % m;
}
function lerp(x, y, t) {
    return (1 - t) * x + t * y;
}
class Vector2 {
    constructor(x = 0, y = 0){
        Vector2.prototype.isVector2 = true;
        this.x = x;
        this.y = y;
    }
    get width() {
        return this.x;
    }
    set width(value) {
        this.x = value;
    }
    get height() {
        return this.y;
    }
    set height(value) {
        this.y = value;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setComponent(index, value) {
        switch(index){
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    getComponent(index) {
        switch(index){
            case 0:
                return this.x;
            case 1:
                return this.y;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }
    clone() {
        return new this.constructor(this.x, this.y);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    addScalar(s) {
        this.x += s;
        this.y += s;
        return this;
    }
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }
    addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    subScalar(s) {
        this.x -= s;
        this.y -= s;
        return this;
    }
    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    applyMatrix3(m) {
        const x = this.x, y = this.y;
        const e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6];
        this.y = e[1] * x + e[4] * y + e[7];
        return this;
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }
    clamp(min, max) {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        return this;
    }
    clampScalar(minVal, maxVal) {
        this.x = clamp(this.x, minVal, maxVal);
        this.y = clamp(this.y, minVal, maxVal);
        return this;
    }
    clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    angle() {
        const angle = Math.atan2(-this.y, -this.x) + Math.PI;
        return angle;
    }
    angleTo(v) {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (0 === denominator) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        return Math.acos(clamp(theta, -1, 1));
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        const dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        return this;
    }
    equals(v) {
        return v.x === this.x && v.y === this.y;
    }
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        return this;
    }
    rotateAround(center, angle) {
        const c = Math.cos(angle), s = Math.sin(angle);
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }
    random() {
        this.x = Math.random();
        this.y = Math.random();
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}
class Matrix3 {
    constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33){
        Matrix3.prototype.isMatrix3 = true;
        this.elements = [
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
        ];
        if (void 0 !== n11) this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
    }
    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        const te = this.elements;
        te[0] = n11;
        te[1] = n21;
        te[2] = n31;
        te[3] = n12;
        te[4] = n22;
        te[5] = n32;
        te[6] = n13;
        te[7] = n23;
        te[8] = n33;
        return this;
    }
    identity() {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this;
    }
    copy(m) {
        const te = this.elements;
        const me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        return this;
    }
    extractBasis(xAxis, yAxis, zAxis) {
        xAxis.setFromMatrix3Column(this, 0);
        yAxis.setFromMatrix3Column(this, 1);
        zAxis.setFromMatrix3Column(this, 2);
        return this;
    }
    setFromMatrix4(m) {
        const me = m.elements;
        this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
        return this;
    }
    multiply(m) {
        return this.multiplyMatrices(this, m);
    }
    premultiply(m) {
        return this.multiplyMatrices(m, this);
    }
    multiplyMatrices(a, b) {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;
        const a11 = ae[0], a12 = ae[3], a13 = ae[6];
        const a21 = ae[1], a22 = ae[4], a23 = ae[7];
        const a31 = ae[2], a32 = ae[5], a33 = ae[8];
        const b11 = be[0], b12 = be[3], b13 = be[6];
        const b21 = be[1], b22 = be[4], b23 = be[7];
        const b31 = be[2], b32 = be[5], b33 = be[8];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;
        return this;
    }
    multiplyScalar(s) {
        const te = this.elements;
        te[0] *= s;
        te[3] *= s;
        te[6] *= s;
        te[1] *= s;
        te[4] *= s;
        te[7] *= s;
        te[2] *= s;
        te[5] *= s;
        te[8] *= s;
        return this;
    }
    determinant() {
        const te = this.elements;
        const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];
        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    }
    invert() {
        const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
        if (0 === det) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
        const detInv = 1 / det;
        te[0] = t11 * detInv;
        te[1] = (n31 * n23 - n33 * n21) * detInv;
        te[2] = (n32 * n21 - n31 * n22) * detInv;
        te[3] = t12 * detInv;
        te[4] = (n33 * n11 - n31 * n13) * detInv;
        te[5] = (n31 * n12 - n32 * n11) * detInv;
        te[6] = t13 * detInv;
        te[7] = (n21 * n13 - n23 * n11) * detInv;
        te[8] = (n22 * n11 - n21 * n12) * detInv;
        return this;
    }
    transpose() {
        let tmp;
        const m = this.elements;
        tmp = m[1];
        m[1] = m[3];
        m[3] = tmp;
        tmp = m[2];
        m[2] = m[6];
        m[6] = tmp;
        tmp = m[5];
        m[5] = m[7];
        m[7] = tmp;
        return this;
    }
    getNormalMatrix(matrix4) {
        return this.setFromMatrix4(matrix4).invert().transpose();
    }
    transposeIntoArray(r) {
        const m = this.elements;
        r[0] = m[0];
        r[1] = m[3];
        r[2] = m[6];
        r[3] = m[1];
        r[4] = m[4];
        r[5] = m[7];
        r[6] = m[2];
        r[7] = m[5];
        r[8] = m[8];
        return this;
    }
    setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
        const c = Math.cos(rotation);
        const s = Math.sin(rotation);
        this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
        return this;
    }
    scale(sx, sy) {
        this.premultiply(_m3.makeScale(sx, sy));
        return this;
    }
    rotate(theta) {
        this.premultiply(_m3.makeRotation(-theta));
        return this;
    }
    translate(tx, ty) {
        this.premultiply(_m3.makeTranslation(tx, ty));
        return this;
    }
    makeTranslation(x, y) {
        if (x.isVector2) this.set(1, 0, x.x, 0, 1, x.y, 0, 0, 1);
        else this.set(1, 0, x, 0, 1, y, 0, 0, 1);
        return this;
    }
    makeRotation(theta) {
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        this.set(c, -s, 0, s, c, 0, 0, 0, 1);
        return this;
    }
    makeScale(x, y) {
        this.set(x, 0, 0, 0, y, 0, 0, 0, 1);
        return this;
    }
    equals(matrix) {
        const te = this.elements;
        const me = matrix.elements;
        for(let i = 0; i < 9; i++)if (te[i] !== me[i]) return false;
        return true;
    }
    fromArray(array, offset = 0) {
        for(let i = 0; i < 9; i++)this.elements[i] = array[i + offset];
        return this;
    }
    toArray(array = [], offset = 0) {
        const te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        return array;
    }
    clone() {
        return new this.constructor().fromArray(this.elements);
    }
}
const _m3 = /*@__PURE__*/ new Matrix3();
Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array;
function createElementNS(name) {
    return document.createElementNS('http://www.w3.org/1999/xhtml', name);
}
const LINEAR_REC709_TO_XYZ = /*@__PURE__*/ new Matrix3().set(0.4123908, 0.3575843, 0.1804808, 0.2126390, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322);
const XYZ_TO_LINEAR_REC709 = /*@__PURE__*/ new Matrix3().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function createColorManagement() {
    const ColorManagement = {
        enabled: true,
        workingColorSpace: LinearSRGBColorSpace,
        spaces: {},
        convert: function(color, sourceColorSpace, targetColorSpace) {
            if (false === this.enabled || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) return color;
            if (this.spaces[sourceColorSpace].transfer === SRGBTransfer) {
                color.r = SRGBToLinear(color.r);
                color.g = SRGBToLinear(color.g);
                color.b = SRGBToLinear(color.b);
            }
            if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {
                color.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);
                color.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);
            }
            if (this.spaces[targetColorSpace].transfer === SRGBTransfer) {
                color.r = LinearToSRGB(color.r);
                color.g = LinearToSRGB(color.g);
                color.b = LinearToSRGB(color.b);
            }
            return color;
        },
        fromWorkingColorSpace: function(color, targetColorSpace) {
            return this.convert(color, this.workingColorSpace, targetColorSpace);
        },
        toWorkingColorSpace: function(color, sourceColorSpace) {
            return this.convert(color, sourceColorSpace, this.workingColorSpace);
        },
        getPrimaries: function(colorSpace) {
            return this.spaces[colorSpace].primaries;
        },
        getTransfer: function(colorSpace) {
            if (colorSpace === NoColorSpace) return LinearTransfer;
            return this.spaces[colorSpace].transfer;
        },
        getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {
            return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);
        },
        define: function(colorSpaces) {
            Object.assign(this.spaces, colorSpaces);
        },
        _getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {
            return targetMatrix.copy(this.spaces[sourceColorSpace].toXYZ).multiply(this.spaces[targetColorSpace].fromXYZ);
        },
        _getDrawingBufferColorSpace: function(colorSpace) {
            return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;
        },
        _getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {
            return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;
        }
    };
    const REC709_PRIMARIES = [
        0.640,
        0.330,
        0.300,
        0.600,
        0.150,
        0.060
    ];
    const REC709_LUMINANCE_COEFFICIENTS = [
        0.2126,
        0.7152,
        0.0722
    ];
    const D65 = [
        0.3127,
        0.3290
    ];
    ColorManagement.define({
        [LinearSRGBColorSpace]: {
            primaries: REC709_PRIMARIES,
            whitePoint: D65,
            transfer: LinearTransfer,
            toXYZ: LINEAR_REC709_TO_XYZ,
            fromXYZ: XYZ_TO_LINEAR_REC709,
            luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
            workingColorSpaceConfig: {
                unpackColorSpace: SRGBColorSpace
            },
            outputColorSpaceConfig: {
                drawingBufferColorSpace: SRGBColorSpace
            }
        },
        [SRGBColorSpace]: {
            primaries: REC709_PRIMARIES,
            whitePoint: D65,
            transfer: SRGBTransfer,
            toXYZ: LINEAR_REC709_TO_XYZ,
            fromXYZ: XYZ_TO_LINEAR_REC709,
            luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
            outputColorSpaceConfig: {
                drawingBufferColorSpace: SRGBColorSpace
            }
        }
    });
    return ColorManagement;
}
const three_core_ColorManagement = /*@__PURE__*/ createColorManagement();
function SRGBToLinear(c) {
    return c < 0.04045 ? 0.0773993808 * c : Math.pow(0.9478672986 * c + 0.0521327014, 2.4);
}
function LinearToSRGB(c) {
    return c < 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 0.41666) - 0.055;
}
let _canvas;
class ImageUtils {
    static getDataURL(image) {
        if (/^data:/i.test(image.src)) return image.src;
        if ("u" < typeof HTMLCanvasElement) return image.src;
        let canvas;
        if (image instanceof HTMLCanvasElement) canvas = image;
        else {
            if (void 0 === _canvas) _canvas = createElementNS('canvas');
            _canvas.width = image.width;
            _canvas.height = image.height;
            const context = _canvas.getContext('2d');
            if (image instanceof ImageData) context.putImageData(image, 0, 0);
            else context.drawImage(image, 0, 0, image.width, image.height);
            canvas = _canvas;
        }
        return canvas.toDataURL('image/png');
    }
    static sRGBToLinear(image) {
        if ("u" > typeof HTMLImageElement && image instanceof HTMLImageElement || "u" > typeof HTMLCanvasElement && image instanceof HTMLCanvasElement || "u" > typeof ImageBitmap && image instanceof ImageBitmap) {
            const canvas = createElementNS('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);
            const imageData = context.getImageData(0, 0, image.width, image.height);
            const data = imageData.data;
            for(let i = 0; i < data.length; i++)data[i] = 255 * SRGBToLinear(data[i] / 255);
            context.putImageData(imageData, 0, 0);
            return canvas;
        }
        if (image.data) {
            const data = image.data.slice(0);
            for(let i = 0; i < data.length; i++)if (data instanceof Uint8Array || data instanceof Uint8ClampedArray) data[i] = Math.floor(255 * SRGBToLinear(data[i] / 255));
            else data[i] = SRGBToLinear(data[i]);
            return {
                data: data,
                width: image.width,
                height: image.height
            };
        }
        console.warn('THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.');
        return image;
    }
}
let _sourceId = 0;
class Source {
    constructor(data = null){
        this.isSource = true;
        Object.defineProperty(this, 'id', {
            value: _sourceId++
        });
        this.uuid = generateUUID();
        this.data = data;
        this.dataReady = true;
        this.version = 0;
    }
    set needsUpdate(value) {
        if (true === value) this.version++;
    }
    toJSON(meta) {
        const isRootObject = void 0 === meta || 'string' == typeof meta;
        if (!isRootObject && void 0 !== meta.images[this.uuid]) return meta.images[this.uuid];
        const output = {
            uuid: this.uuid,
            url: ''
        };
        const data = this.data;
        if (null !== data) {
            let url;
            if (Array.isArray(data)) {
                url = [];
                for(let i = 0, l = data.length; i < l; i++)if (data[i].isDataTexture) url.push(serializeImage(data[i].image));
                else url.push(serializeImage(data[i]));
            } else url = serializeImage(data);
            output.url = url;
        }
        if (!isRootObject) meta.images[this.uuid] = output;
        return output;
    }
}
function serializeImage(image) {
    if ("u" > typeof HTMLImageElement && image instanceof HTMLImageElement || "u" > typeof HTMLCanvasElement && image instanceof HTMLCanvasElement || "u" > typeof ImageBitmap && image instanceof ImageBitmap) return ImageUtils.getDataURL(image);
    if (image.data) return {
        data: Array.from(image.data),
        width: image.width,
        height: image.height,
        type: image.data.constructor.name
    };
    console.warn('THREE.Texture: Unable to serialize Texture.');
    return {};
}
let _textureId = 0;
class Texture extends EventDispatcher {
    constructor(image = Texture.DEFAULT_IMAGE, mapping = Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = Texture.DEFAULT_ANISOTROPY, colorSpace = NoColorSpace){
        super();
        this.isTexture = true;
        Object.defineProperty(this, 'id', {
            value: _textureId++
        });
        this.uuid = generateUUID();
        this.name = '';
        this.source = new Source(image);
        this.mipmaps = [];
        this.mapping = mapping;
        this.channel = 0;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.magFilter = magFilter;
        this.minFilter = minFilter;
        this.anisotropy = anisotropy;
        this.format = format;
        this.internalFormat = null;
        this.type = type;
        this.offset = new Vector2(0, 0);
        this.repeat = new Vector2(1, 1);
        this.center = new Vector2(0, 0);
        this.rotation = 0;
        this.matrixAutoUpdate = true;
        this.matrix = new Matrix3();
        this.generateMipmaps = true;
        this.premultiplyAlpha = false;
        this.flipY = true;
        this.unpackAlignment = 4;
        this.colorSpace = colorSpace;
        this.userData = {};
        this.version = 0;
        this.onUpdate = null;
        this.renderTarget = null;
        this.isRenderTargetTexture = false;
        this.pmremVersion = 0;
    }
    get image() {
        return this.source.data;
    }
    set image(value = null) {
        this.source.data = value;
    }
    updateMatrix() {
        this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
        this.name = source.name;
        this.source = source.source;
        this.mipmaps = source.mipmaps.slice(0);
        this.mapping = source.mapping;
        this.channel = source.channel;
        this.wrapS = source.wrapS;
        this.wrapT = source.wrapT;
        this.magFilter = source.magFilter;
        this.minFilter = source.minFilter;
        this.anisotropy = source.anisotropy;
        this.format = source.format;
        this.internalFormat = source.internalFormat;
        this.type = source.type;
        this.offset.copy(source.offset);
        this.repeat.copy(source.repeat);
        this.center.copy(source.center);
        this.rotation = source.rotation;
        this.matrixAutoUpdate = source.matrixAutoUpdate;
        this.matrix.copy(source.matrix);
        this.generateMipmaps = source.generateMipmaps;
        this.premultiplyAlpha = source.premultiplyAlpha;
        this.flipY = source.flipY;
        this.unpackAlignment = source.unpackAlignment;
        this.colorSpace = source.colorSpace;
        this.renderTarget = source.renderTarget;
        this.isRenderTargetTexture = source.isRenderTargetTexture;
        this.userData = JSON.parse(JSON.stringify(source.userData));
        this.needsUpdate = true;
        return this;
    }
    toJSON(meta) {
        const isRootObject = void 0 === meta || 'string' == typeof meta;
        if (!isRootObject && void 0 !== meta.textures[this.uuid]) return meta.textures[this.uuid];
        const output = {
            metadata: {
                version: 4.6,
                type: 'Texture',
                generator: 'Texture.toJSON'
            },
            uuid: this.uuid,
            name: this.name,
            image: this.source.toJSON(meta).uuid,
            mapping: this.mapping,
            channel: this.channel,
            repeat: [
                this.repeat.x,
                this.repeat.y
            ],
            offset: [
                this.offset.x,
                this.offset.y
            ],
            center: [
                this.center.x,
                this.center.y
            ],
            rotation: this.rotation,
            wrap: [
                this.wrapS,
                this.wrapT
            ],
            format: this.format,
            internalFormat: this.internalFormat,
            type: this.type,
            colorSpace: this.colorSpace,
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            anisotropy: this.anisotropy,
            flipY: this.flipY,
            generateMipmaps: this.generateMipmaps,
            premultiplyAlpha: this.premultiplyAlpha,
            unpackAlignment: this.unpackAlignment
        };
        if (Object.keys(this.userData).length > 0) output.userData = this.userData;
        if (!isRootObject) meta.textures[this.uuid] = output;
        return output;
    }
    dispose() {
        this.dispatchEvent({
            type: 'dispose'
        });
    }
    transformUv(uv) {
        if (this.mapping !== UVMapping) return uv;
        uv.applyMatrix3(this.matrix);
        if (uv.x < 0 || uv.x > 1) switch(this.wrapS){
            case RepeatWrapping:
                uv.x = uv.x - Math.floor(uv.x);
                break;
            case ClampToEdgeWrapping:
                uv.x = uv.x < 0 ? 0 : 1;
                break;
            case MirroredRepeatWrapping:
                if (1 === Math.abs(Math.floor(uv.x) % 2)) uv.x = Math.ceil(uv.x) - uv.x;
                else uv.x = uv.x - Math.floor(uv.x);
                break;
        }
        if (uv.y < 0 || uv.y > 1) switch(this.wrapT){
            case RepeatWrapping:
                uv.y = uv.y - Math.floor(uv.y);
                break;
            case ClampToEdgeWrapping:
                uv.y = uv.y < 0 ? 0 : 1;
                break;
            case MirroredRepeatWrapping:
                if (1 === Math.abs(Math.floor(uv.y) % 2)) uv.y = Math.ceil(uv.y) - uv.y;
                else uv.y = uv.y - Math.floor(uv.y);
                break;
        }
        if (this.flipY) uv.y = 1 - uv.y;
        return uv;
    }
    set needsUpdate(value) {
        if (true === value) {
            this.version++;
            this.source.needsUpdate = true;
        }
    }
    set needsPMREMUpdate(value) {
        if (true === value) this.pmremVersion++;
    }
}
Texture.DEFAULT_IMAGE = null;
Texture.DEFAULT_MAPPING = UVMapping;
Texture.DEFAULT_ANISOTROPY = 1;
class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 1){
        Vector4.prototype.isVector4 = true;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    get width() {
        return this.z;
    }
    set width(value) {
        this.z = value;
    }
    get height() {
        return this.w;
    }
    set height(value) {
        this.w = value;
    }
    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }
    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        this.w = scalar;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setZ(z) {
        this.z = z;
        return this;
    }
    setW(w) {
        this.w = w;
        return this;
    }
    setComponent(index, value) {
        switch(index){
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            case 3:
                this.w = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    getComponent(index) {
        switch(index){
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }
    clone() {
        return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = void 0 !== v.w ? v.w : 1;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }
    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        this.w += s;
        return this;
    }
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this;
    }
    addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        this.w += v.w * s;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    }
    subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        this.w -= s;
        return this;
    }
    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    applyMatrix4(m) {
        const x = this.x, y = this.y, z = this.z, w = this.w;
        const e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
        this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
        return this;
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        this.w /= v.w;
        return this;
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    setAxisAngleFromQuaternion(q) {
        this.w = 2 * Math.acos(q.w);
        const s = Math.sqrt(1 - q.w * q.w);
        if (s < 0.0001) {
            this.x = 1;
            this.y = 0;
            this.z = 0;
        } else {
            this.x = q.x / s;
            this.y = q.y / s;
            this.z = q.z / s;
        }
        return this;
    }
    setAxisAngleFromRotationMatrix(m) {
        let angle, x, y, z;
        const epsilon = 0.01, epsilon2 = 0.1, te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
        if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
            if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
                this.set(1, 0, 0, 0);
                return this;
            }
            angle = Math.PI;
            const xx = (m11 + 1) / 2;
            const yy = (m22 + 1) / 2;
            const zz = (m33 + 1) / 2;
            const xy = (m12 + m21) / 4;
            const xz = (m13 + m31) / 4;
            const yz = (m23 + m32) / 4;
            if (xx > yy && xx > zz) if (xx < epsilon) {
                x = 0;
                y = 0.707106781;
                z = 0.707106781;
            } else {
                x = Math.sqrt(xx);
                y = xy / x;
                z = xz / x;
            }
            else if (yy > zz) if (yy < epsilon) {
                x = 0.707106781;
                y = 0;
                z = 0.707106781;
            } else {
                y = Math.sqrt(yy);
                x = xy / y;
                z = yz / y;
            }
            else if (zz < epsilon) {
                x = 0.707106781;
                y = 0.707106781;
                z = 0;
            } else {
                z = Math.sqrt(zz);
                x = xz / z;
                y = yz / z;
            }
            this.set(x, y, z, angle);
            return this;
        }
        let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12));
        if (Math.abs(s) < 0.001) s = 1;
        this.x = (m32 - m23) / s;
        this.y = (m13 - m31) / s;
        this.z = (m21 - m12) / s;
        this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
        return this;
    }
    setFromMatrixPosition(m) {
        const e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        this.w = e[15];
        return this;
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        this.w = Math.min(this.w, v.w);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        this.w = Math.max(this.w, v.w);
        return this;
    }
    clamp(min, max) {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        this.z = clamp(this.z, min.z, max.z);
        this.w = clamp(this.w, min.w, max.w);
        return this;
    }
    clampScalar(minVal, maxVal) {
        this.x = clamp(this.x, minVal, maxVal);
        this.y = clamp(this.y, minVal, maxVal);
        this.z = clamp(this.z, minVal, maxVal);
        this.w = clamp(this.w, minVal, maxVal);
        return this;
    }
    clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        this.w = Math.floor(this.w);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        this.w = Math.ceil(this.w);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        this.w = Math.round(this.w);
        return this;
    }
    roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.z = Math.trunc(this.z);
        this.w = Math.trunc(this.w);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        this.w += (v.w - this.w) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;
        this.w = v1.w + (v2.w - v1.w) * alpha;
        return this;
    }
    equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
    }
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        this.w = attribute.getW(index);
        return this;
    }
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        this.w = Math.random();
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
}
class Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 1){
        this.isQuaternion = true;
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
        let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
        const x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
        if (0 === t) {
            dst[dstOffset + 0] = x0;
            dst[dstOffset + 1] = y0;
            dst[dstOffset + 2] = z0;
            dst[dstOffset + 3] = w0;
            return;
        }
        if (1 === t) {
            dst[dstOffset + 0] = x1;
            dst[dstOffset + 1] = y1;
            dst[dstOffset + 2] = z1;
            dst[dstOffset + 3] = w1;
            return;
        }
        if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
            let s = 1 - t;
            const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1, dir = cos >= 0 ? 1 : -1, sqrSin = 1 - cos * cos;
            if (sqrSin > Number.EPSILON) {
                const sin = Math.sqrt(sqrSin), len = Math.atan2(sin, cos * dir);
                s = Math.sin(s * len) / sin;
                t = Math.sin(t * len) / sin;
            }
            const tDir = t * dir;
            x0 = x0 * s + x1 * tDir;
            y0 = y0 * s + y1 * tDir;
            z0 = z0 * s + z1 * tDir;
            w0 = w0 * s + w1 * tDir;
            if (s === 1 - t) {
                const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
                x0 *= f;
                y0 *= f;
                z0 *= f;
                w0 *= f;
            }
        }
        dst[dstOffset] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
    }
    static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
        const x0 = src0[srcOffset0];
        const y0 = src0[srcOffset0 + 1];
        const z0 = src0[srcOffset0 + 2];
        const w0 = src0[srcOffset0 + 3];
        const x1 = src1[srcOffset1];
        const y1 = src1[srcOffset1 + 1];
        const z1 = src1[srcOffset1 + 2];
        const w1 = src1[srcOffset1 + 3];
        dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
        dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
        dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
        dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
        return dst;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._onChangeCallback();
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._onChangeCallback();
    }
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this._onChangeCallback();
    }
    get w() {
        return this._w;
    }
    set w(value) {
        this._w = value;
        this._onChangeCallback();
    }
    set(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        this._onChangeCallback();
        return this;
    }
    clone() {
        return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(quaternion) {
        this._x = quaternion.x;
        this._y = quaternion.y;
        this._z = quaternion.z;
        this._w = quaternion.w;
        this._onChangeCallback();
        return this;
    }
    setFromEuler(euler, update = true) {
        const x = euler._x, y = euler._y, z = euler._z, order = euler._order;
        const cos = Math.cos;
        const sin = Math.sin;
        const c1 = cos(x / 2);
        const c2 = cos(y / 2);
        const c3 = cos(z / 2);
        const s1 = sin(x / 2);
        const s2 = sin(y / 2);
        const s3 = sin(z / 2);
        switch(order){
            case 'XYZ':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'YXZ':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'ZXY':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'ZYX':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'YZX':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'XZY':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            default:
                console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order);
        }
        if (true === update) this._onChangeCallback();
        return this;
    }
    setFromAxisAngle(axis, angle) {
        const halfAngle = angle / 2, s = Math.sin(halfAngle);
        this._x = axis.x * s;
        this._y = axis.y * s;
        this._z = axis.z * s;
        this._w = Math.cos(halfAngle);
        this._onChangeCallback();
        return this;
    }
    setFromRotationMatrix(m) {
        const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1.0);
            this._w = 0.25 / s;
            this._x = (m32 - m23) * s;
            this._y = (m13 - m31) * s;
            this._z = (m21 - m12) * s;
        } else if (m11 > m22 && m11 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this._w = (m32 - m23) / s;
            this._x = 0.25 * s;
            this._y = (m12 + m21) / s;
            this._z = (m13 + m31) / s;
        } else if (m22 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this._w = (m13 - m31) / s;
            this._x = (m12 + m21) / s;
            this._y = 0.25 * s;
            this._z = (m23 + m32) / s;
        } else {
            const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this._w = (m21 - m12) / s;
            this._x = (m13 + m31) / s;
            this._y = (m23 + m32) / s;
            this._z = 0.25 * s;
        }
        this._onChangeCallback();
        return this;
    }
    setFromUnitVectors(vFrom, vTo) {
        let r = vFrom.dot(vTo) + 1;
        if (r < Number.EPSILON) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                this._x = -vFrom.y;
                this._y = vFrom.x;
                this._z = 0;
                this._w = r;
            } else {
                this._x = 0;
                this._y = -vFrom.z;
                this._z = vFrom.y;
                this._w = r;
            }
        } else {
            this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
            this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
            this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
            this._w = r;
        }
        return this.normalize();
    }
    angleTo(q) {
        return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
    }
    rotateTowards(q, step) {
        const angle = this.angleTo(q);
        if (0 === angle) return this;
        const t = Math.min(1, step / angle);
        this.slerp(q, t);
        return this;
    }
    identity() {
        return this.set(0, 0, 0, 1);
    }
    invert() {
        return this.conjugate();
    }
    conjugate() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this._onChangeCallback();
        return this;
    }
    dot(v) {
        return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
        let l = this.length();
        if (0 === l) {
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._w = 1;
        } else {
            l = 1 / l;
            this._x = this._x * l;
            this._y = this._y * l;
            this._z = this._z * l;
            this._w = this._w * l;
        }
        this._onChangeCallback();
        return this;
    }
    multiply(q) {
        return this.multiplyQuaternions(this, q);
    }
    premultiply(q) {
        return this.multiplyQuaternions(q, this);
    }
    multiplyQuaternions(a, b) {
        const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
        const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
        this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        this._onChangeCallback();
        return this;
    }
    slerp(qb, t) {
        if (0 === t) return this;
        if (1 === t) return this.copy(qb);
        const x = this._x, y = this._y, z = this._z, w = this._w;
        let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
        if (cosHalfTheta < 0) {
            this._w = -qb._w;
            this._x = -qb._x;
            this._y = -qb._y;
            this._z = -qb._z;
            cosHalfTheta = -cosHalfTheta;
        } else this.copy(qb);
        if (cosHalfTheta >= 1.0) {
            this._w = w;
            this._x = x;
            this._y = y;
            this._z = z;
            return this;
        }
        const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;
        if (sqrSinHalfTheta <= Number.EPSILON) {
            const s = 1 - t;
            this._w = s * w + t * this._w;
            this._x = s * x + t * this._x;
            this._y = s * y + t * this._y;
            this._z = s * z + t * this._z;
            this.normalize();
            return this;
        }
        const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
        const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
        const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        this._w = w * ratioA + this._w * ratioB;
        this._x = x * ratioA + this._x * ratioB;
        this._y = y * ratioA + this._y * ratioB;
        this._z = z * ratioA + this._z * ratioB;
        this._onChangeCallback();
        return this;
    }
    slerpQuaternions(qa, qb, t) {
        return this.copy(qa).slerp(qb, t);
    }
    random() {
        const theta1 = 2 * Math.PI * Math.random();
        const theta2 = 2 * Math.PI * Math.random();
        const x0 = Math.random();
        const r1 = Math.sqrt(1 - x0);
        const r2 = Math.sqrt(x0);
        return this.set(r1 * Math.sin(theta1), r1 * Math.cos(theta1), r2 * Math.sin(theta2), r2 * Math.cos(theta2));
    }
    equals(quaternion) {
        return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
    }
    fromArray(array, offset = 0) {
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        this._onChangeCallback();
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._w;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this._x = attribute.getX(index);
        this._y = attribute.getY(index);
        this._z = attribute.getZ(index);
        this._w = attribute.getW(index);
        this._onChangeCallback();
        return this;
    }
    toJSON() {
        return this.toArray();
    }
    _onChange(callback) {
        this._onChangeCallback = callback;
        return this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x;
        yield this._y;
        yield this._z;
        yield this._w;
    }
}
class Vector3 {
    constructor(x = 0, y = 0, z = 0){
        Vector3.prototype.isVector3 = true;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    set(x, y, z) {
        if (void 0 === z) z = this.z;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setZ(z) {
        this.z = z;
        return this;
    }
    setComponent(index, value) {
        switch(index){
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    getComponent(index) {
        switch(index){
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }
    clone() {
        return new this.constructor(this.x, this.y, this.z);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    }
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    }
    addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
    }
    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    multiplyVectors(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    }
    applyEuler(euler) {
        return this.applyQuaternion(_quaternion$4.setFromEuler(euler));
    }
    applyAxisAngle(axis, angle) {
        return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));
    }
    applyMatrix3(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    }
    applyNormalMatrix(m) {
        return this.applyMatrix3(m).normalize();
    }
    applyMatrix4(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
        return this;
    }
    applyQuaternion(q) {
        const vx = this.x, vy = this.y, vz = this.z;
        const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
        const tx = 2 * (qy * vz - qz * vy);
        const ty = 2 * (qz * vx - qx * vz);
        const tz = 2 * (qx * vy - qy * vx);
        this.x = vx + qw * tx + qy * tz - qz * ty;
        this.y = vy + qw * ty + qz * tx - qx * tz;
        this.z = vz + qw * tz + qx * ty - qy * tx;
        return this;
    }
    project(camera) {
        return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
    }
    unproject(camera) {
        return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
    }
    transformDirection(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;
        return this.normalize();
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    }
    clamp(min, max) {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        this.z = clamp(this.z, min.z, max.z);
        return this;
    }
    clampScalar(minVal, maxVal) {
        this.x = clamp(this.x, minVal, maxVal);
        this.y = clamp(this.y, minVal, maxVal);
        this.z = clamp(this.z, minVal, maxVal);
        return this;
    }
    clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }
    roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.z = Math.trunc(this.z);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;
        return this;
    }
    cross(v) {
        return this.crossVectors(this, v);
    }
    crossVectors(a, b) {
        const ax = a.x, ay = a.y, az = a.z;
        const bx = b.x, by = b.y, bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    }
    projectOnVector(v) {
        const denominator = v.lengthSq();
        if (0 === denominator) return this.set(0, 0, 0);
        const scalar = v.dot(this) / denominator;
        return this.copy(v).multiplyScalar(scalar);
    }
    projectOnPlane(planeNormal) {
        _vector$c.copy(this).projectOnVector(planeNormal);
        return this.sub(_vector$c);
    }
    reflect(normal) {
        return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }
    angleTo(v) {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (0 === denominator) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        return Math.acos(clamp(theta, -1, 1));
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }
    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
    setFromSpherical(s) {
        return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
    }
    setFromSphericalCoords(radius, phi, theta) {
        const sinPhiRadius = Math.sin(phi) * radius;
        this.x = sinPhiRadius * Math.sin(theta);
        this.y = Math.cos(phi) * radius;
        this.z = sinPhiRadius * Math.cos(theta);
        return this;
    }
    setFromCylindrical(c) {
        return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
    }
    setFromCylindricalCoords(radius, theta, y) {
        this.x = radius * Math.sin(theta);
        this.y = y;
        this.z = radius * Math.cos(theta);
        return this;
    }
    setFromMatrixPosition(m) {
        const e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        return this;
    }
    setFromMatrixScale(m) {
        const sx = this.setFromMatrixColumn(m, 0).length();
        const sy = this.setFromMatrixColumn(m, 1).length();
        const sz = this.setFromMatrixColumn(m, 2).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this;
    }
    setFromMatrixColumn(m, index) {
        return this.fromArray(m.elements, 4 * index);
    }
    setFromMatrix3Column(m, index) {
        return this.fromArray(m.elements, 3 * index);
    }
    setFromEuler(e) {
        this.x = e._x;
        this.y = e._y;
        this.z = e._z;
        return this;
    }
    setFromColor(c) {
        this.x = c.r;
        this.y = c.g;
        this.z = c.b;
        return this;
    }
    equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z;
    }
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        return this;
    }
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        return this;
    }
    randomDirection() {
        const theta = Math.random() * Math.PI * 2;
        const u = 2 * Math.random() - 1;
        const c = Math.sqrt(1 - u * u);
        this.x = c * Math.cos(theta);
        this.y = u;
        this.z = c * Math.sin(theta);
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}
const _vector$c = /*@__PURE__*/ new Vector3();
const _quaternion$4 = /*@__PURE__*/ new Quaternion();
class Box3 {
    constructor(min = new Vector3(Infinity, Infinity, Infinity), max = new Vector3(-1 / 0, -1 / 0, -1 / 0)){
        this.isBox3 = true;
        this.min = min;
        this.max = max;
    }
    set(min, max) {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    }
    setFromArray(array) {
        this.makeEmpty();
        for(let i = 0, il = array.length; i < il; i += 3)this.expandByPoint(_vector$b.fromArray(array, i));
        return this;
    }
    setFromBufferAttribute(attribute) {
        this.makeEmpty();
        for(let i = 0, il = attribute.count; i < il; i++)this.expandByPoint(_vector$b.fromBufferAttribute(attribute, i));
        return this;
    }
    setFromPoints(points) {
        this.makeEmpty();
        for(let i = 0, il = points.length; i < il; i++)this.expandByPoint(points[i]);
        return this;
    }
    setFromCenterAndSize(center, size) {
        const halfSize = _vector$b.copy(size).multiplyScalar(0.5);
        this.min.copy(center).sub(halfSize);
        this.max.copy(center).add(halfSize);
        return this;
    }
    setFromObject(object, precise = false) {
        this.makeEmpty();
        return this.expandByObject(object, precise);
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(box) {
        this.min.copy(box.min);
        this.max.copy(box.max);
        return this;
    }
    makeEmpty() {
        this.min.x = this.min.y = this.min.z = Infinity;
        this.max.x = this.max.y = this.max.z = -1 / 0;
        return this;
    }
    isEmpty() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(target) {
        return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(target) {
        return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
    }
    expandByPoint(point) {
        this.min.min(point);
        this.max.max(point);
        return this;
    }
    expandByVector(vector) {
        this.min.sub(vector);
        this.max.add(vector);
        return this;
    }
    expandByScalar(scalar) {
        this.min.addScalar(-scalar);
        this.max.addScalar(scalar);
        return this;
    }
    expandByObject(object, precise = false) {
        object.updateWorldMatrix(false, false);
        const geometry = object.geometry;
        if (void 0 !== geometry) {
            const positionAttribute = geometry.getAttribute('position');
            if (true === precise && void 0 !== positionAttribute && true !== object.isInstancedMesh) for(let i = 0, l = positionAttribute.count; i < l; i++){
                if (true === object.isMesh) object.getVertexPosition(i, _vector$b);
                else _vector$b.fromBufferAttribute(positionAttribute, i);
                _vector$b.applyMatrix4(object.matrixWorld);
                this.expandByPoint(_vector$b);
            }
            else {
                if (void 0 !== object.boundingBox) {
                    if (null === object.boundingBox) object.computeBoundingBox();
                    _box$4.copy(object.boundingBox);
                } else {
                    if (null === geometry.boundingBox) geometry.computeBoundingBox();
                    _box$4.copy(geometry.boundingBox);
                }
                _box$4.applyMatrix4(object.matrixWorld);
                this.union(_box$4);
            }
        }
        const children = object.children;
        for(let i = 0, l = children.length; i < l; i++)this.expandByObject(children[i], precise);
        return this;
    }
    containsPoint(point) {
        return point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y && point.z >= this.min.z && point.z <= this.max.z;
    }
    containsBox(box) {
        return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
    }
    getParameter(point, target) {
        return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
    }
    intersectsBox(box) {
        return box.max.x >= this.min.x && box.min.x <= this.max.x && box.max.y >= this.min.y && box.min.y <= this.max.y && box.max.z >= this.min.z && box.min.z <= this.max.z;
    }
    intersectsSphere(sphere) {
        this.clampPoint(sphere.center, _vector$b);
        return _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
    }
    intersectsPlane(plane) {
        let min, max;
        if (plane.normal.x > 0) {
            min = plane.normal.x * this.min.x;
            max = plane.normal.x * this.max.x;
        } else {
            min = plane.normal.x * this.max.x;
            max = plane.normal.x * this.min.x;
        }
        if (plane.normal.y > 0) {
            min += plane.normal.y * this.min.y;
            max += plane.normal.y * this.max.y;
        } else {
            min += plane.normal.y * this.max.y;
            max += plane.normal.y * this.min.y;
        }
        if (plane.normal.z > 0) {
            min += plane.normal.z * this.min.z;
            max += plane.normal.z * this.max.z;
        } else {
            min += plane.normal.z * this.max.z;
            max += plane.normal.z * this.min.z;
        }
        return min <= -plane.constant && max >= -plane.constant;
    }
    intersectsTriangle(triangle) {
        if (this.isEmpty()) return false;
        this.getCenter(_center);
        _extents.subVectors(this.max, _center);
        _v0$2.subVectors(triangle.a, _center);
        _v1$7.subVectors(triangle.b, _center);
        _v2$4.subVectors(triangle.c, _center);
        _f0.subVectors(_v1$7, _v0$2);
        _f1.subVectors(_v2$4, _v1$7);
        _f2.subVectors(_v0$2, _v2$4);
        let axes = [
            0,
            -_f0.z,
            _f0.y,
            0,
            -_f1.z,
            _f1.y,
            0,
            -_f2.z,
            _f2.y,
            _f0.z,
            0,
            -_f0.x,
            _f1.z,
            0,
            -_f1.x,
            _f2.z,
            0,
            -_f2.x,
            -_f0.y,
            _f0.x,
            0,
            -_f1.y,
            _f1.x,
            0,
            -_f2.y,
            _f2.x,
            0
        ];
        if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) return false;
        axes = [
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
        ];
        if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) return false;
        _triangleNormal.crossVectors(_f0, _f1);
        axes = [
            _triangleNormal.x,
            _triangleNormal.y,
            _triangleNormal.z
        ];
        return satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents);
    }
    clampPoint(point, target) {
        return target.copy(point).clamp(this.min, this.max);
    }
    distanceToPoint(point) {
        return this.clampPoint(point, _vector$b).distanceTo(point);
    }
    getBoundingSphere(target) {
        if (this.isEmpty()) target.makeEmpty();
        else {
            this.getCenter(target.center);
            target.radius = 0.5 * this.getSize(_vector$b).length();
        }
        return target;
    }
    intersect(box) {
        this.min.max(box.min);
        this.max.min(box.max);
        if (this.isEmpty()) this.makeEmpty();
        return this;
    }
    union(box) {
        this.min.min(box.min);
        this.max.max(box.max);
        return this;
    }
    applyMatrix4(matrix) {
        if (this.isEmpty()) return this;
        _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
        _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
        _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
        _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
        _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
        _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
        _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
        _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);
        this.setFromPoints(_points);
        return this;
    }
    translate(offset) {
        this.min.add(offset);
        this.max.add(offset);
        return this;
    }
    equals(box) {
        return box.min.equals(this.min) && box.max.equals(this.max);
    }
}
const _points = [
    /*@__PURE__*/ new Vector3(),
    /*@__PURE__*/ new Vector3(),
    /*@__PURE__*/ new Vector3(),
    /*@__PURE__*/ new Vector3(),
    /*@__PURE__*/ new Vector3(),
    /*@__PURE__*/ new Vector3(),
    /*@__PURE__*/ new Vector3(),
    /*@__PURE__*/ new Vector3()
];
const _vector$b = /*@__PURE__*/ new Vector3();
const _box$4 = /*@__PURE__*/ new Box3();
const _v0$2 = /*@__PURE__*/ new Vector3();
const _v1$7 = /*@__PURE__*/ new Vector3();
const _v2$4 = /*@__PURE__*/ new Vector3();
const _f0 = /*@__PURE__*/ new Vector3();
const _f1 = /*@__PURE__*/ new Vector3();
const _f2 = /*@__PURE__*/ new Vector3();
const _center = /*@__PURE__*/ new Vector3();
const _extents = /*@__PURE__*/ new Vector3();
const _triangleNormal = /*@__PURE__*/ new Vector3();
const _testAxis = /*@__PURE__*/ new Vector3();
function satForAxes(axes, v0, v1, v2, extents) {
    for(let i = 0, j = axes.length - 3; i <= j; i += 3){
        _testAxis.fromArray(axes, i);
        const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
        const p0 = v0.dot(_testAxis);
        const p1 = v1.dot(_testAxis);
        const p2 = v2.dot(_testAxis);
        if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) return false;
    }
    return true;
}
const _box$3 = /*@__PURE__*/ new Box3();
const _v1$6 = /*@__PURE__*/ new Vector3();
const _v2$3 = /*@__PURE__*/ new Vector3();
class Sphere {
    constructor(center = new Vector3(), radius = -1){
        this.isSphere = true;
        this.center = center;
        this.radius = radius;
    }
    set(center, radius) {
        this.center.copy(center);
        this.radius = radius;
        return this;
    }
    setFromPoints(points, optionalCenter) {
        const center = this.center;
        if (void 0 !== optionalCenter) center.copy(optionalCenter);
        else _box$3.setFromPoints(points).getCenter(center);
        let maxRadiusSq = 0;
        for(let i = 0, il = points.length; i < il; i++)maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
        this.radius = Math.sqrt(maxRadiusSq);
        return this;
    }
    copy(sphere) {
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        return this;
    }
    isEmpty() {
        return this.radius < 0;
    }
    makeEmpty() {
        this.center.set(0, 0, 0);
        this.radius = -1;
        return this;
    }
    containsPoint(point) {
        return point.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(point) {
        return point.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(sphere) {
        const radiusSum = this.radius + sphere.radius;
        return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
    }
    intersectsBox(box) {
        return box.intersectsSphere(this);
    }
    intersectsPlane(plane) {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(point, target) {
        const deltaLengthSq = this.center.distanceToSquared(point);
        target.copy(point);
        if (deltaLengthSq > this.radius * this.radius) {
            target.sub(this.center).normalize();
            target.multiplyScalar(this.radius).add(this.center);
        }
        return target;
    }
    getBoundingBox(target) {
        if (this.isEmpty()) {
            target.makeEmpty();
            return target;
        }
        target.set(this.center, this.center);
        target.expandByScalar(this.radius);
        return target;
    }
    applyMatrix4(matrix) {
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        return this;
    }
    translate(offset) {
        this.center.add(offset);
        return this;
    }
    expandByPoint(point) {
        if (this.isEmpty()) {
            this.center.copy(point);
            this.radius = 0;
            return this;
        }
        _v1$6.subVectors(point, this.center);
        const lengthSq = _v1$6.lengthSq();
        if (lengthSq > this.radius * this.radius) {
            const length = Math.sqrt(lengthSq);
            const delta = (length - this.radius) * 0.5;
            this.center.addScaledVector(_v1$6, delta / length);
            this.radius += delta;
        }
        return this;
    }
    union(sphere) {
        if (sphere.isEmpty()) return this;
        if (this.isEmpty()) {
            this.copy(sphere);
            return this;
        }
        if (true === this.center.equals(sphere.center)) this.radius = Math.max(this.radius, sphere.radius);
        else {
            _v2$3.subVectors(sphere.center, this.center).setLength(sphere.radius);
            this.expandByPoint(_v1$6.copy(sphere.center).add(_v2$3));
            this.expandByPoint(_v1$6.copy(sphere.center).sub(_v2$3));
        }
        return this;
    }
    equals(sphere) {
        return sphere.center.equals(this.center) && sphere.radius === this.radius;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
const _vector$a = /*@__PURE__*/ new Vector3();
const _segCenter = /*@__PURE__*/ new Vector3();
const _segDir = /*@__PURE__*/ new Vector3();
const _diff = /*@__PURE__*/ new Vector3();
const _edge1 = /*@__PURE__*/ new Vector3();
const _edge2 = /*@__PURE__*/ new Vector3();
const _normal$1 = /*@__PURE__*/ new Vector3();
class Ray {
    constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)){
        this.origin = origin;
        this.direction = direction;
    }
    set(origin, direction) {
        this.origin.copy(origin);
        this.direction.copy(direction);
        return this;
    }
    copy(ray) {
        this.origin.copy(ray.origin);
        this.direction.copy(ray.direction);
        return this;
    }
    at(t, target) {
        return target.copy(this.origin).addScaledVector(this.direction, t);
    }
    lookAt(v) {
        this.direction.copy(v).sub(this.origin).normalize();
        return this;
    }
    recast(t) {
        this.origin.copy(this.at(t, _vector$a));
        return this;
    }
    closestPointToPoint(point, target) {
        target.subVectors(point, this.origin);
        const directionDistance = target.dot(this.direction);
        if (directionDistance < 0) return target.copy(this.origin);
        return target.copy(this.origin).addScaledVector(this.direction, directionDistance);
    }
    distanceToPoint(point) {
        return Math.sqrt(this.distanceSqToPoint(point));
    }
    distanceSqToPoint(point) {
        const directionDistance = _vector$a.subVectors(point, this.origin).dot(this.direction);
        if (directionDistance < 0) return this.origin.distanceToSquared(point);
        _vector$a.copy(this.origin).addScaledVector(this.direction, directionDistance);
        return _vector$a.distanceToSquared(point);
    }
    distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
        _segCenter.copy(v0).add(v1).multiplyScalar(0.5);
        _segDir.copy(v1).sub(v0).normalize();
        _diff.copy(this.origin).sub(_segCenter);
        const segExtent = 0.5 * v0.distanceTo(v1);
        const a01 = -this.direction.dot(_segDir);
        const b0 = _diff.dot(this.direction);
        const b1 = -_diff.dot(_segDir);
        const c = _diff.lengthSq();
        const det = Math.abs(1 - a01 * a01);
        let s0, s1, sqrDist, extDet;
        if (det > 0) {
            s0 = a01 * b1 - b0;
            s1 = a01 * b0 - b1;
            extDet = segExtent * det;
            if (s0 >= 0) if (s1 >= -extDet) if (s1 <= extDet) {
                const invDet = 1 / det;
                s0 *= invDet;
                s1 *= invDet;
                sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
            } else {
                s1 = segExtent;
                s0 = Math.max(0, -(a01 * s1 + b0));
                sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
            }
            else {
                s1 = -segExtent;
                s0 = Math.max(0, -(a01 * s1 + b0));
                sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
            }
            else if (s1 <= -extDet) {
                s0 = Math.max(0, -(-a01 * segExtent + b0));
                s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
            } else if (s1 <= extDet) {
                s0 = 0;
                s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
                sqrDist = s1 * (s1 + 2 * b1) + c;
            } else {
                s0 = Math.max(0, -(a01 * segExtent + b0));
                s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
            }
        } else {
            s1 = a01 > 0 ? -segExtent : segExtent;
            s0 = Math.max(0, -(a01 * s1 + b0));
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
        }
        if (optionalPointOnRay) optionalPointOnRay.copy(this.origin).addScaledVector(this.direction, s0);
        if (optionalPointOnSegment) optionalPointOnSegment.copy(_segCenter).addScaledVector(_segDir, s1);
        return sqrDist;
    }
    intersectSphere(sphere, target) {
        _vector$a.subVectors(sphere.center, this.origin);
        const tca = _vector$a.dot(this.direction);
        const d2 = _vector$a.dot(_vector$a) - tca * tca;
        const radius2 = sphere.radius * sphere.radius;
        if (d2 > radius2) return null;
        const thc = Math.sqrt(radius2 - d2);
        const t0 = tca - thc;
        const t1 = tca + thc;
        if (t1 < 0) return null;
        if (t0 < 0) return this.at(t1, target);
        return this.at(t0, target);
    }
    intersectsSphere(sphere) {
        return this.distanceSqToPoint(sphere.center) <= sphere.radius * sphere.radius;
    }
    distanceToPlane(plane) {
        const denominator = plane.normal.dot(this.direction);
        if (0 === denominator) {
            if (0 === plane.distanceToPoint(this.origin)) return 0;
            return null;
        }
        const t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;
        return t >= 0 ? t : null;
    }
    intersectPlane(plane, target) {
        const t = this.distanceToPlane(plane);
        if (null === t) return null;
        return this.at(t, target);
    }
    intersectsPlane(plane) {
        const distToPoint = plane.distanceToPoint(this.origin);
        if (0 === distToPoint) return true;
        const denominator = plane.normal.dot(this.direction);
        if (denominator * distToPoint < 0) return true;
        return false;
    }
    intersectBox(box, target) {
        let tmin, tmax, tymin, tymax, tzmin, tzmax;
        const invdirx = 1 / this.direction.x, invdiry = 1 / this.direction.y, invdirz = 1 / this.direction.z;
        const origin = this.origin;
        if (invdirx >= 0) {
            tmin = (box.min.x - origin.x) * invdirx;
            tmax = (box.max.x - origin.x) * invdirx;
        } else {
            tmin = (box.max.x - origin.x) * invdirx;
            tmax = (box.min.x - origin.x) * invdirx;
        }
        if (invdiry >= 0) {
            tymin = (box.min.y - origin.y) * invdiry;
            tymax = (box.max.y - origin.y) * invdiry;
        } else {
            tymin = (box.max.y - origin.y) * invdiry;
            tymax = (box.min.y - origin.y) * invdiry;
        }
        if (tmin > tymax || tymin > tmax) return null;
        if (tymin > tmin || isNaN(tmin)) tmin = tymin;
        if (tymax < tmax || isNaN(tmax)) tmax = tymax;
        if (invdirz >= 0) {
            tzmin = (box.min.z - origin.z) * invdirz;
            tzmax = (box.max.z - origin.z) * invdirz;
        } else {
            tzmin = (box.max.z - origin.z) * invdirz;
            tzmax = (box.min.z - origin.z) * invdirz;
        }
        if (tmin > tzmax || tzmin > tmax) return null;
        if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
        if (tzmax < tmax || tmax !== tmax) tmax = tzmax;
        if (tmax < 0) return null;
        return this.at(tmin >= 0 ? tmin : tmax, target);
    }
    intersectsBox(box) {
        return null !== this.intersectBox(box, _vector$a);
    }
    intersectTriangle(a, b, c, backfaceCulling, target) {
        _edge1.subVectors(b, a);
        _edge2.subVectors(c, a);
        _normal$1.crossVectors(_edge1, _edge2);
        let DdN = this.direction.dot(_normal$1);
        let sign;
        if (DdN > 0) {
            if (backfaceCulling) return null;
            sign = 1;
        } else {
            if (!(DdN < 0)) return null;
            sign = -1;
            DdN = -DdN;
        }
        _diff.subVectors(this.origin, a);
        const DdQxE2 = sign * this.direction.dot(_edge2.crossVectors(_diff, _edge2));
        if (DdQxE2 < 0) return null;
        const DdE1xQ = sign * this.direction.dot(_edge1.cross(_diff));
        if (DdE1xQ < 0) return null;
        if (DdQxE2 + DdE1xQ > DdN) return null;
        const QdN = -sign * _diff.dot(_normal$1);
        if (QdN < 0) return null;
        return this.at(QdN / DdN, target);
    }
    applyMatrix4(matrix4) {
        this.origin.applyMatrix4(matrix4);
        this.direction.transformDirection(matrix4);
        return this;
    }
    equals(ray) {
        return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
class Matrix4 {
    constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44){
        Matrix4.prototype.isMatrix4 = true;
        this.elements = [
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1
        ];
        if (void 0 !== n11) this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
    }
    set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        const te = this.elements;
        te[0] = n11;
        te[4] = n12;
        te[8] = n13;
        te[12] = n14;
        te[1] = n21;
        te[5] = n22;
        te[9] = n23;
        te[13] = n24;
        te[2] = n31;
        te[6] = n32;
        te[10] = n33;
        te[14] = n34;
        te[3] = n41;
        te[7] = n42;
        te[11] = n43;
        te[15] = n44;
        return this;
    }
    identity() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    clone() {
        return new Matrix4().fromArray(this.elements);
    }
    copy(m) {
        const te = this.elements;
        const me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        te[9] = me[9];
        te[10] = me[10];
        te[11] = me[11];
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        te[15] = me[15];
        return this;
    }
    copyPosition(m) {
        const te = this.elements, me = m.elements;
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        return this;
    }
    setFromMatrix3(m) {
        const me = m.elements;
        this.set(me[0], me[3], me[6], 0, me[1], me[4], me[7], 0, me[2], me[5], me[8], 0, 0, 0, 0, 1);
        return this;
    }
    extractBasis(xAxis, yAxis, zAxis) {
        xAxis.setFromMatrixColumn(this, 0);
        yAxis.setFromMatrixColumn(this, 1);
        zAxis.setFromMatrixColumn(this, 2);
        return this;
    }
    makeBasis(xAxis, yAxis, zAxis) {
        this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
        return this;
    }
    extractRotation(m) {
        const te = this.elements;
        const me = m.elements;
        const scaleX = 1 / _v1$5.setFromMatrixColumn(m, 0).length();
        const scaleY = 1 / _v1$5.setFromMatrixColumn(m, 1).length();
        const scaleZ = 1 / _v1$5.setFromMatrixColumn(m, 2).length();
        te[0] = me[0] * scaleX;
        te[1] = me[1] * scaleX;
        te[2] = me[2] * scaleX;
        te[3] = 0;
        te[4] = me[4] * scaleY;
        te[5] = me[5] * scaleY;
        te[6] = me[6] * scaleY;
        te[7] = 0;
        te[8] = me[8] * scaleZ;
        te[9] = me[9] * scaleZ;
        te[10] = me[10] * scaleZ;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    }
    makeRotationFromEuler(euler) {
        const te = this.elements;
        const x = euler.x, y = euler.y, z = euler.z;
        const a = Math.cos(x), b = Math.sin(x);
        const c = Math.cos(y), d = Math.sin(y);
        const e = Math.cos(z), f = Math.sin(z);
        if ('XYZ' === euler.order) {
            const ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = -c * f;
            te[8] = d;
            te[1] = af + be * d;
            te[5] = ae - bf * d;
            te[9] = -b * c;
            te[2] = bf - ae * d;
            te[6] = be + af * d;
            te[10] = a * c;
        } else if ('YXZ' === euler.order) {
            const ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce + df * b;
            te[4] = de * b - cf;
            te[8] = a * d;
            te[1] = a * f;
            te[5] = a * e;
            te[9] = -b;
            te[2] = cf * b - de;
            te[6] = df + ce * b;
            te[10] = a * c;
        } else if ('ZXY' === euler.order) {
            const ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce - df * b;
            te[4] = -a * f;
            te[8] = de + cf * b;
            te[1] = cf + de * b;
            te[5] = a * e;
            te[9] = df - ce * b;
            te[2] = -a * d;
            te[6] = b;
            te[10] = a * c;
        } else if ('ZYX' === euler.order) {
            const ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = be * d - af;
            te[8] = ae * d + bf;
            te[1] = c * f;
            te[5] = bf * d + ae;
            te[9] = af * d - be;
            te[2] = -d;
            te[6] = b * c;
            te[10] = a * c;
        } else if ('YZX' === euler.order) {
            const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = bd - ac * f;
            te[8] = bc * f + ad;
            te[1] = f;
            te[5] = a * e;
            te[9] = -b * e;
            te[2] = -d * e;
            te[6] = ad * f + bc;
            te[10] = ac - bd * f;
        } else if ('XZY' === euler.order) {
            const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = -f;
            te[8] = d * e;
            te[1] = ac * f + bd;
            te[5] = a * e;
            te[9] = ad * f - bc;
            te[2] = bc * f - ad;
            te[6] = b * e;
            te[10] = bd * f + ac;
        }
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    }
    makeRotationFromQuaternion(q) {
        return this.compose(_zero, q, _one);
    }
    lookAt(eye, target, up) {
        const te = this.elements;
        _z.subVectors(eye, target);
        if (0 === _z.lengthSq()) _z.z = 1;
        _z.normalize();
        _x.crossVectors(up, _z);
        if (0 === _x.lengthSq()) {
            if (1 === Math.abs(up.z)) _z.x += 0.0001;
            else _z.z += 0.0001;
            _z.normalize();
            _x.crossVectors(up, _z);
        }
        _x.normalize();
        _y.crossVectors(_z, _x);
        te[0] = _x.x;
        te[4] = _y.x;
        te[8] = _z.x;
        te[1] = _x.y;
        te[5] = _y.y;
        te[9] = _z.y;
        te[2] = _x.z;
        te[6] = _y.z;
        te[10] = _z.z;
        return this;
    }
    multiply(m) {
        return this.multiplyMatrices(this, m);
    }
    premultiply(m) {
        return this.multiplyMatrices(m, this);
    }
    multiplyMatrices(a, b) {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;
        const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
        const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
        const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
        const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
        const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
        return this;
    }
    multiplyScalar(s) {
        const te = this.elements;
        te[0] *= s;
        te[4] *= s;
        te[8] *= s;
        te[12] *= s;
        te[1] *= s;
        te[5] *= s;
        te[9] *= s;
        te[13] *= s;
        te[2] *= s;
        te[6] *= s;
        te[10] *= s;
        te[14] *= s;
        te[3] *= s;
        te[7] *= s;
        te[11] *= s;
        te[15] *= s;
        return this;
    }
    determinant() {
        const te = this.elements;
        const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
        const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
        const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
        const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
        return n41 * (n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
    }
    transpose() {
        const te = this.elements;
        let tmp;
        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;
        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;
        return this;
    }
    setPosition(x, y, z) {
        const te = this.elements;
        if (x.isVector3) {
            te[12] = x.x;
            te[13] = x.y;
            te[14] = x.z;
        } else {
            te[12] = x;
            te[13] = y;
            te[14] = z;
        }
        return this;
    }
    invert() {
        const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15], t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44, t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44, t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44, t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
        const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
        if (0 === det) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        const detInv = 1 / det;
        te[0] = t11 * detInv;
        te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
        te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
        te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
        te[4] = t12 * detInv;
        te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
        te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
        te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
        te[8] = t13 * detInv;
        te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
        te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
        te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
        te[12] = t14 * detInv;
        te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
        te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
        te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
        return this;
    }
    scale(v) {
        const te = this.elements;
        const x = v.x, y = v.y, z = v.z;
        te[0] *= x;
        te[4] *= y;
        te[8] *= z;
        te[1] *= x;
        te[5] *= y;
        te[9] *= z;
        te[2] *= x;
        te[6] *= y;
        te[10] *= z;
        te[3] *= x;
        te[7] *= y;
        te[11] *= z;
        return this;
    }
    getMaxScaleOnAxis() {
        const te = this.elements;
        const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
        return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    }
    makeTranslation(x, y, z) {
        if (x.isVector3) this.set(1, 0, 0, x.x, 0, 1, 0, x.y, 0, 0, 1, x.z, 0, 0, 0, 1);
        else this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
        return this;
    }
    makeRotationX(theta) {
        const c = Math.cos(theta), s = Math.sin(theta);
        this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationY(theta) {
        const c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationZ(theta) {
        const c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationAxis(axis, angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const t = 1 - c;
        const x = axis.x, y = axis.y, z = axis.z;
        const tx = t * x, ty = t * y;
        this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
        return this;
    }
    makeScale(x, y, z) {
        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
        return this;
    }
    makeShear(xy, xz, yx, yz, zx, zy) {
        this.set(1, yx, zx, 0, xy, 1, zy, 0, xz, yz, 1, 0, 0, 0, 0, 1);
        return this;
    }
    compose(position, quaternion, scale) {
        const te = this.elements;
        const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
        const x2 = x + x, y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;
        const sx = scale.x, sy = scale.y, sz = scale.z;
        te[0] = (1 - (yy + zz)) * sx;
        te[1] = (xy + wz) * sx;
        te[2] = (xz - wy) * sx;
        te[3] = 0;
        te[4] = (xy - wz) * sy;
        te[5] = (1 - (xx + zz)) * sy;
        te[6] = (yz + wx) * sy;
        te[7] = 0;
        te[8] = (xz + wy) * sz;
        te[9] = (yz - wx) * sz;
        te[10] = (1 - (xx + yy)) * sz;
        te[11] = 0;
        te[12] = position.x;
        te[13] = position.y;
        te[14] = position.z;
        te[15] = 1;
        return this;
    }
    decompose(position, quaternion, scale) {
        const te = this.elements;
        let sx = _v1$5.set(te[0], te[1], te[2]).length();
        const sy = _v1$5.set(te[4], te[5], te[6]).length();
        const sz = _v1$5.set(te[8], te[9], te[10]).length();
        const det = this.determinant();
        if (det < 0) sx = -sx;
        position.x = te[12];
        position.y = te[13];
        position.z = te[14];
        _m1$2.copy(this);
        const invSX = 1 / sx;
        const invSY = 1 / sy;
        const invSZ = 1 / sz;
        _m1$2.elements[0] *= invSX;
        _m1$2.elements[1] *= invSX;
        _m1$2.elements[2] *= invSX;
        _m1$2.elements[4] *= invSY;
        _m1$2.elements[5] *= invSY;
        _m1$2.elements[6] *= invSY;
        _m1$2.elements[8] *= invSZ;
        _m1$2.elements[9] *= invSZ;
        _m1$2.elements[10] *= invSZ;
        quaternion.setFromRotationMatrix(_m1$2);
        scale.x = sx;
        scale.y = sy;
        scale.z = sz;
        return this;
    }
    makePerspective(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem) {
        const te = this.elements;
        const x = 2 * near / (right - left);
        const y = 2 * near / (top - bottom);
        const a = (right + left) / (right - left);
        const b = (top + bottom) / (top - bottom);
        let c, d;
        if (coordinateSystem === WebGLCoordinateSystem) {
            c = -(far + near) / (far - near);
            d = -2 * far * near / (far - near);
        } else if (coordinateSystem === WebGPUCoordinateSystem) {
            c = -far / (far - near);
            d = -far * near / (far - near);
        } else throw new Error('THREE.Matrix4.makePerspective(): Invalid coordinate system: ' + coordinateSystem);
        te[0] = x;
        te[4] = 0;
        te[8] = a;
        te[12] = 0;
        te[1] = 0;
        te[5] = y;
        te[9] = b;
        te[13] = 0;
        te[2] = 0;
        te[6] = 0;
        te[10] = c;
        te[14] = d;
        te[3] = 0;
        te[7] = 0;
        te[11] = -1;
        te[15] = 0;
        return this;
    }
    makeOrthographic(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem) {
        const te = this.elements;
        const w = 1.0 / (right - left);
        const h = 1.0 / (top - bottom);
        const p = 1.0 / (far - near);
        const x = (right + left) * w;
        const y = (top + bottom) * h;
        let z, zInv;
        if (coordinateSystem === WebGLCoordinateSystem) {
            z = (far + near) * p;
            zInv = -2 * p;
        } else if (coordinateSystem === WebGPUCoordinateSystem) {
            z = near * p;
            zInv = -1 * p;
        } else throw new Error('THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ' + coordinateSystem);
        te[0] = 2 * w;
        te[4] = 0;
        te[8] = 0;
        te[12] = -x;
        te[1] = 0;
        te[5] = 2 * h;
        te[9] = 0;
        te[13] = -y;
        te[2] = 0;
        te[6] = 0;
        te[10] = zInv;
        te[14] = -z;
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[15] = 1;
        return this;
    }
    equals(matrix) {
        const te = this.elements;
        const me = matrix.elements;
        for(let i = 0; i < 16; i++)if (te[i] !== me[i]) return false;
        return true;
    }
    fromArray(array, offset = 0) {
        for(let i = 0; i < 16; i++)this.elements[i] = array[i + offset];
        return this;
    }
    toArray(array = [], offset = 0) {
        const te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];
        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];
        return array;
    }
}
const _v1$5 = /*@__PURE__*/ new Vector3();
const _m1$2 = /*@__PURE__*/ new Matrix4();
const _zero = /*@__PURE__*/ new Vector3(0, 0, 0);
const _one = /*@__PURE__*/ new Vector3(1, 1, 1);
const _x = /*@__PURE__*/ new Vector3();
const _y = /*@__PURE__*/ new Vector3();
const _z = /*@__PURE__*/ new Vector3();
const _matrix$2 = /*@__PURE__*/ new Matrix4();
const _quaternion$3 = /*@__PURE__*/ new Quaternion();
class Euler {
    constructor(x = 0, y = 0, z = 0, order = Euler.DEFAULT_ORDER){
        this.isEuler = true;
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._onChangeCallback();
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._onChangeCallback();
    }
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this._onChangeCallback();
    }
    get order() {
        return this._order;
    }
    set order(value) {
        this._order = value;
        this._onChangeCallback();
    }
    set(x, y, z, order = this._order) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
        this._onChangeCallback();
        return this;
    }
    clone() {
        return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(euler) {
        this._x = euler._x;
        this._y = euler._y;
        this._z = euler._z;
        this._order = euler._order;
        this._onChangeCallback();
        return this;
    }
    setFromRotationMatrix(m, order = this._order, update = true) {
        const te = m.elements;
        const m11 = te[0], m12 = te[4], m13 = te[8];
        const m21 = te[1], m22 = te[5], m23 = te[9];
        const m31 = te[2], m32 = te[6], m33 = te[10];
        switch(order){
            case 'XYZ':
                this._y = Math.asin(clamp(m13, -1, 1));
                if (Math.abs(m13) < 0.9999999) {
                    this._x = Math.atan2(-m23, m33);
                    this._z = Math.atan2(-m12, m11);
                } else {
                    this._x = Math.atan2(m32, m22);
                    this._z = 0;
                }
                break;
            case 'YXZ':
                this._x = Math.asin(-clamp(m23, -1, 1));
                if (Math.abs(m23) < 0.9999999) {
                    this._y = Math.atan2(m13, m33);
                    this._z = Math.atan2(m21, m22);
                } else {
                    this._y = Math.atan2(-m31, m11);
                    this._z = 0;
                }
                break;
            case 'ZXY':
                this._x = Math.asin(clamp(m32, -1, 1));
                if (Math.abs(m32) < 0.9999999) {
                    this._y = Math.atan2(-m31, m33);
                    this._z = Math.atan2(-m12, m22);
                } else {
                    this._y = 0;
                    this._z = Math.atan2(m21, m11);
                }
                break;
            case 'ZYX':
                this._y = Math.asin(-clamp(m31, -1, 1));
                if (Math.abs(m31) < 0.9999999) {
                    this._x = Math.atan2(m32, m33);
                    this._z = Math.atan2(m21, m11);
                } else {
                    this._x = 0;
                    this._z = Math.atan2(-m12, m22);
                }
                break;
            case 'YZX':
                this._z = Math.asin(clamp(m21, -1, 1));
                if (Math.abs(m21) < 0.9999999) {
                    this._x = Math.atan2(-m23, m22);
                    this._y = Math.atan2(-m31, m11);
                } else {
                    this._x = 0;
                    this._y = Math.atan2(m13, m33);
                }
                break;
            case 'XZY':
                this._z = Math.asin(-clamp(m12, -1, 1));
                if (Math.abs(m12) < 0.9999999) {
                    this._x = Math.atan2(m32, m22);
                    this._y = Math.atan2(m13, m11);
                } else {
                    this._x = Math.atan2(-m23, m33);
                    this._y = 0;
                }
                break;
            default:
                console.warn('THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order);
        }
        this._order = order;
        if (true === update) this._onChangeCallback();
        return this;
    }
    setFromQuaternion(q, order, update) {
        _matrix$2.makeRotationFromQuaternion(q);
        return this.setFromRotationMatrix(_matrix$2, order, update);
    }
    setFromVector3(v, order = this._order) {
        return this.set(v.x, v.y, v.z, order);
    }
    reorder(newOrder) {
        _quaternion$3.setFromEuler(this);
        return this.setFromQuaternion(_quaternion$3, newOrder);
    }
    equals(euler) {
        return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
    }
    fromArray(array) {
        this._x = array[0];
        this._y = array[1];
        this._z = array[2];
        if (void 0 !== array[3]) this._order = array[3];
        this._onChangeCallback();
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._order;
        return array;
    }
    _onChange(callback) {
        this._onChangeCallback = callback;
        return this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x;
        yield this._y;
        yield this._z;
        yield this._order;
    }
}
Euler.DEFAULT_ORDER = 'XYZ';
class Layers {
    constructor(){
        this.mask = 1;
    }
    set(channel) {
        this.mask = 1 << channel >>> 0;
    }
    enable(channel) {
        this.mask |= 1 << channel;
    }
    enableAll() {
        this.mask = -1;
    }
    toggle(channel) {
        this.mask ^= 1 << channel;
    }
    disable(channel) {
        this.mask &= ~(1 << channel);
    }
    disableAll() {
        this.mask = 0;
    }
    test(layers) {
        return (this.mask & layers.mask) !== 0;
    }
    isEnabled(channel) {
        return (this.mask & 1 << channel) !== 0;
    }
}
let _object3DId = 0;
const _v1$4 = /*@__PURE__*/ new Vector3();
const _q1 = /*@__PURE__*/ new Quaternion();
const _m1$1 = /*@__PURE__*/ new Matrix4();
const _target = /*@__PURE__*/ new Vector3();
const _position$3 = /*@__PURE__*/ new Vector3();
const _scale$2 = /*@__PURE__*/ new Vector3();
const _quaternion$2 = /*@__PURE__*/ new Quaternion();
const _xAxis = /*@__PURE__*/ new Vector3(1, 0, 0);
const _yAxis = /*@__PURE__*/ new Vector3(0, 1, 0);
const _zAxis = /*@__PURE__*/ new Vector3(0, 0, 1);
const _addedEvent = {
    type: 'added'
};
const _removedEvent = {
    type: 'removed'
};
const _childaddedEvent = {
    type: 'childadded',
    child: null
};
const _childremovedEvent = {
    type: 'childremoved',
    child: null
};
class Object3D extends EventDispatcher {
    constructor(){
        super();
        this.isObject3D = true;
        Object.defineProperty(this, 'id', {
            value: _object3DId++
        });
        this.uuid = generateUUID();
        this.name = '';
        this.type = 'Object3D';
        this.parent = null;
        this.children = [];
        this.up = Object3D.DEFAULT_UP.clone();
        const position = new Vector3();
        const rotation = new Euler();
        const quaternion = new Quaternion();
        const scale = new Vector3(1, 1, 1);
        function onRotationChange() {
            quaternion.setFromEuler(rotation, false);
        }
        function onQuaternionChange() {
            rotation.setFromQuaternion(quaternion, void 0, false);
        }
        rotation._onChange(onRotationChange);
        quaternion._onChange(onQuaternionChange);
        Object.defineProperties(this, {
            position: {
                configurable: true,
                enumerable: true,
                value: position
            },
            rotation: {
                configurable: true,
                enumerable: true,
                value: rotation
            },
            quaternion: {
                configurable: true,
                enumerable: true,
                value: quaternion
            },
            scale: {
                configurable: true,
                enumerable: true,
                value: scale
            },
            modelViewMatrix: {
                value: new Matrix4()
            },
            normalMatrix: {
                value: new Matrix3()
            }
        });
        this.matrix = new Matrix4();
        this.matrixWorld = new Matrix4();
        this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE;
        this.matrixWorldAutoUpdate = Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE;
        this.matrixWorldNeedsUpdate = false;
        this.layers = new Layers();
        this.visible = true;
        this.castShadow = false;
        this.receiveShadow = false;
        this.frustumCulled = true;
        this.renderOrder = 0;
        this.animations = [];
        this.userData = {};
    }
    onBeforeShadow() {}
    onAfterShadow() {}
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(matrix) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        this.matrix.premultiply(matrix);
        this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(q) {
        this.quaternion.premultiply(q);
        return this;
    }
    setRotationFromAxisAngle(axis, angle) {
        this.quaternion.setFromAxisAngle(axis, angle);
    }
    setRotationFromEuler(euler) {
        this.quaternion.setFromEuler(euler, true);
    }
    setRotationFromMatrix(m) {
        this.quaternion.setFromRotationMatrix(m);
    }
    setRotationFromQuaternion(q) {
        this.quaternion.copy(q);
    }
    rotateOnAxis(axis, angle) {
        _q1.setFromAxisAngle(axis, angle);
        this.quaternion.multiply(_q1);
        return this;
    }
    rotateOnWorldAxis(axis, angle) {
        _q1.setFromAxisAngle(axis, angle);
        this.quaternion.premultiply(_q1);
        return this;
    }
    rotateX(angle) {
        return this.rotateOnAxis(_xAxis, angle);
    }
    rotateY(angle) {
        return this.rotateOnAxis(_yAxis, angle);
    }
    rotateZ(angle) {
        return this.rotateOnAxis(_zAxis, angle);
    }
    translateOnAxis(axis, distance) {
        _v1$4.copy(axis).applyQuaternion(this.quaternion);
        this.position.add(_v1$4.multiplyScalar(distance));
        return this;
    }
    translateX(distance) {
        return this.translateOnAxis(_xAxis, distance);
    }
    translateY(distance) {
        return this.translateOnAxis(_yAxis, distance);
    }
    translateZ(distance) {
        return this.translateOnAxis(_zAxis, distance);
    }
    localToWorld(vector) {
        this.updateWorldMatrix(true, false);
        return vector.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(vector) {
        this.updateWorldMatrix(true, false);
        return vector.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
    }
    lookAt(x, y, z) {
        if (x.isVector3) _target.copy(x);
        else _target.set(x, y, z);
        const parent = this.parent;
        this.updateWorldMatrix(true, false);
        _position$3.setFromMatrixPosition(this.matrixWorld);
        if (this.isCamera || this.isLight) _m1$1.lookAt(_position$3, _target, this.up);
        else _m1$1.lookAt(_target, _position$3, this.up);
        this.quaternion.setFromRotationMatrix(_m1$1);
        if (parent) {
            _m1$1.extractRotation(parent.matrixWorld);
            _q1.setFromRotationMatrix(_m1$1);
            this.quaternion.premultiply(_q1.invert());
        }
    }
    add(object) {
        if (arguments.length > 1) {
            for(let i = 0; i < arguments.length; i++)this.add(arguments[i]);
            return this;
        }
        if (object === this) {
            console.error('THREE.Object3D.add: object can\'t be added as a child of itself.', object);
            return this;
        }
        if (object && object.isObject3D) {
            object.removeFromParent();
            object.parent = this;
            this.children.push(object);
            object.dispatchEvent(_addedEvent);
            _childaddedEvent.child = object;
            this.dispatchEvent(_childaddedEvent);
            _childaddedEvent.child = null;
        } else console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
        return this;
    }
    remove(object) {
        if (arguments.length > 1) {
            for(let i = 0; i < arguments.length; i++)this.remove(arguments[i]);
            return this;
        }
        const index = this.children.indexOf(object);
        if (-1 !== index) {
            object.parent = null;
            this.children.splice(index, 1);
            object.dispatchEvent(_removedEvent);
            _childremovedEvent.child = object;
            this.dispatchEvent(_childremovedEvent);
            _childremovedEvent.child = null;
        }
        return this;
    }
    removeFromParent() {
        const parent = this.parent;
        if (null !== parent) parent.remove(this);
        return this;
    }
    clear() {
        return this.remove(...this.children);
    }
    attach(object) {
        this.updateWorldMatrix(true, false);
        _m1$1.copy(this.matrixWorld).invert();
        if (null !== object.parent) {
            object.parent.updateWorldMatrix(true, false);
            _m1$1.multiply(object.parent.matrixWorld);
        }
        object.applyMatrix4(_m1$1);
        object.removeFromParent();
        object.parent = this;
        this.children.push(object);
        object.updateWorldMatrix(false, true);
        object.dispatchEvent(_addedEvent);
        _childaddedEvent.child = object;
        this.dispatchEvent(_childaddedEvent);
        _childaddedEvent.child = null;
        return this;
    }
    getObjectById(id) {
        return this.getObjectByProperty('id', id);
    }
    getObjectByName(name) {
        return this.getObjectByProperty('name', name);
    }
    getObjectByProperty(name, value) {
        if (this[name] === value) return this;
        for(let i = 0, l = this.children.length; i < l; i++){
            const child = this.children[i];
            const object = child.getObjectByProperty(name, value);
            if (void 0 !== object) return object;
        }
    }
    getObjectsByProperty(name, value, result = []) {
        if (this[name] === value) result.push(this);
        const children = this.children;
        for(let i = 0, l = children.length; i < l; i++)children[i].getObjectsByProperty(name, value, result);
        return result;
    }
    getWorldPosition(target) {
        this.updateWorldMatrix(true, false);
        return target.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(target) {
        this.updateWorldMatrix(true, false);
        this.matrixWorld.decompose(_position$3, target, _scale$2);
        return target;
    }
    getWorldScale(target) {
        this.updateWorldMatrix(true, false);
        this.matrixWorld.decompose(_position$3, _quaternion$2, target);
        return target;
    }
    getWorldDirection(target) {
        this.updateWorldMatrix(true, false);
        const e = this.matrixWorld.elements;
        return target.set(e[8], e[9], e[10]).normalize();
    }
    raycast() {}
    traverse(callback) {
        callback(this);
        const children = this.children;
        for(let i = 0, l = children.length; i < l; i++)children[i].traverse(callback);
    }
    traverseVisible(callback) {
        if (false === this.visible) return;
        callback(this);
        const children = this.children;
        for(let i = 0, l = children.length; i < l; i++)children[i].traverseVisible(callback);
    }
    traverseAncestors(callback) {
        const parent = this.parent;
        if (null !== parent) {
            callback(parent);
            parent.traverseAncestors(callback);
        }
    }
    updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(force) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || force) {
            if (true === this.matrixWorldAutoUpdate) if (null === this.parent) this.matrixWorld.copy(this.matrix);
            else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
            this.matrixWorldNeedsUpdate = false;
            force = true;
        }
        const children = this.children;
        for(let i = 0, l = children.length; i < l; i++){
            const child = children[i];
            child.updateMatrixWorld(force);
        }
    }
    updateWorldMatrix(updateParents, updateChildren) {
        const parent = this.parent;
        if (true === updateParents && null !== parent) parent.updateWorldMatrix(true, false);
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (true === this.matrixWorldAutoUpdate) if (null === this.parent) this.matrixWorld.copy(this.matrix);
        else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
        if (true === updateChildren) {
            const children = this.children;
            for(let i = 0, l = children.length; i < l; i++){
                const child = children[i];
                child.updateWorldMatrix(false, true);
            }
        }
    }
    toJSON(meta) {
        const isRootObject = void 0 === meta || 'string' == typeof meta;
        const output = {};
        if (isRootObject) {
            meta = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {},
                nodes: {}
            };
            output.metadata = {
                version: 4.6,
                type: 'Object',
                generator: 'Object3D.toJSON'
            };
        }
        const object = {};
        object.uuid = this.uuid;
        object.type = this.type;
        if ('' !== this.name) object.name = this.name;
        if (true === this.castShadow) object.castShadow = true;
        if (true === this.receiveShadow) object.receiveShadow = true;
        if (false === this.visible) object.visible = false;
        if (false === this.frustumCulled) object.frustumCulled = false;
        if (0 !== this.renderOrder) object.renderOrder = this.renderOrder;
        if (Object.keys(this.userData).length > 0) object.userData = this.userData;
        object.layers = this.layers.mask;
        object.matrix = this.matrix.toArray();
        object.up = this.up.toArray();
        if (false === this.matrixAutoUpdate) object.matrixAutoUpdate = false;
        if (this.isInstancedMesh) {
            object.type = 'InstancedMesh';
            object.count = this.count;
            object.instanceMatrix = this.instanceMatrix.toJSON();
            if (null !== this.instanceColor) object.instanceColor = this.instanceColor.toJSON();
        }
        if (this.isBatchedMesh) {
            object.type = 'BatchedMesh';
            object.perObjectFrustumCulled = this.perObjectFrustumCulled;
            object.sortObjects = this.sortObjects;
            object.drawRanges = this._drawRanges;
            object.reservedRanges = this._reservedRanges;
            object.visibility = this._visibility;
            object.active = this._active;
            object.bounds = this._bounds.map((bound)=>({
                    boxInitialized: bound.boxInitialized,
                    boxMin: bound.box.min.toArray(),
                    boxMax: bound.box.max.toArray(),
                    sphereInitialized: bound.sphereInitialized,
                    sphereRadius: bound.sphere.radius,
                    sphereCenter: bound.sphere.center.toArray()
                }));
            object.maxInstanceCount = this._maxInstanceCount;
            object.maxVertexCount = this._maxVertexCount;
            object.maxIndexCount = this._maxIndexCount;
            object.geometryInitialized = this._geometryInitialized;
            object.geometryCount = this._geometryCount;
            object.matricesTexture = this._matricesTexture.toJSON(meta);
            if (null !== this._colorsTexture) object.colorsTexture = this._colorsTexture.toJSON(meta);
            if (null !== this.boundingSphere) object.boundingSphere = {
                center: object.boundingSphere.center.toArray(),
                radius: object.boundingSphere.radius
            };
            if (null !== this.boundingBox) object.boundingBox = {
                min: object.boundingBox.min.toArray(),
                max: object.boundingBox.max.toArray()
            };
        }
        function serialize(library, element) {
            if (void 0 === library[element.uuid]) library[element.uuid] = element.toJSON(meta);
            return element.uuid;
        }
        if (this.isScene) {
            if (this.background) {
                if (this.background.isColor) object.background = this.background.toJSON();
                else if (this.background.isTexture) object.background = this.background.toJSON(meta).uuid;
            }
            if (this.environment && this.environment.isTexture && true !== this.environment.isRenderTargetTexture) object.environment = this.environment.toJSON(meta).uuid;
        } else if (this.isMesh || this.isLine || this.isPoints) {
            object.geometry = serialize(meta.geometries, this.geometry);
            const parameters = this.geometry.parameters;
            if (void 0 !== parameters && void 0 !== parameters.shapes) {
                const shapes = parameters.shapes;
                if (Array.isArray(shapes)) for(let i = 0, l = shapes.length; i < l; i++){
                    const shape = shapes[i];
                    serialize(meta.shapes, shape);
                }
                else serialize(meta.shapes, shapes);
            }
        }
        if (this.isSkinnedMesh) {
            object.bindMode = this.bindMode;
            object.bindMatrix = this.bindMatrix.toArray();
            if (void 0 !== this.skeleton) {
                serialize(meta.skeletons, this.skeleton);
                object.skeleton = this.skeleton.uuid;
            }
        }
        if (void 0 !== this.material) if (Array.isArray(this.material)) {
            const uuids = [];
            for(let i = 0, l = this.material.length; i < l; i++)uuids.push(serialize(meta.materials, this.material[i]));
            object.material = uuids;
        } else object.material = serialize(meta.materials, this.material);
        if (this.children.length > 0) {
            object.children = [];
            for(let i = 0; i < this.children.length; i++)object.children.push(this.children[i].toJSON(meta).object);
        }
        if (this.animations.length > 0) {
            object.animations = [];
            for(let i = 0; i < this.animations.length; i++){
                const animation = this.animations[i];
                object.animations.push(serialize(meta.animations, animation));
            }
        }
        if (isRootObject) {
            const geometries = extractFromCache(meta.geometries);
            const materials = extractFromCache(meta.materials);
            const textures = extractFromCache(meta.textures);
            const images = extractFromCache(meta.images);
            const shapes = extractFromCache(meta.shapes);
            const skeletons = extractFromCache(meta.skeletons);
            const animations = extractFromCache(meta.animations);
            const nodes = extractFromCache(meta.nodes);
            if (geometries.length > 0) output.geometries = geometries;
            if (materials.length > 0) output.materials = materials;
            if (textures.length > 0) output.textures = textures;
            if (images.length > 0) output.images = images;
            if (shapes.length > 0) output.shapes = shapes;
            if (skeletons.length > 0) output.skeletons = skeletons;
            if (animations.length > 0) output.animations = animations;
            if (nodes.length > 0) output.nodes = nodes;
        }
        output.object = object;
        return output;
        function extractFromCache(cache) {
            const values = [];
            for(const key in cache){
                const data = cache[key];
                delete data.metadata;
                values.push(data);
            }
            return values;
        }
    }
    clone(recursive) {
        return new this.constructor().copy(this, recursive);
    }
    copy(source, recursive = true) {
        this.name = source.name;
        this.up.copy(source.up);
        this.position.copy(source.position);
        this.rotation.order = source.rotation.order;
        this.quaternion.copy(source.quaternion);
        this.scale.copy(source.scale);
        this.matrix.copy(source.matrix);
        this.matrixWorld.copy(source.matrixWorld);
        this.matrixAutoUpdate = source.matrixAutoUpdate;
        this.matrixWorldAutoUpdate = source.matrixWorldAutoUpdate;
        this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
        this.layers.mask = source.layers.mask;
        this.visible = source.visible;
        this.castShadow = source.castShadow;
        this.receiveShadow = source.receiveShadow;
        this.frustumCulled = source.frustumCulled;
        this.renderOrder = source.renderOrder;
        this.animations = source.animations.slice();
        this.userData = JSON.parse(JSON.stringify(source.userData));
        if (true === recursive) for(let i = 0; i < source.children.length; i++){
            const child = source.children[i];
            this.add(child.clone());
        }
        return this;
    }
}
Object3D.DEFAULT_UP = /*@__PURE__*/ new Vector3(0, 1, 0);
Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
const _v0$1 = /*@__PURE__*/ new Vector3();
const _v1$3 = /*@__PURE__*/ new Vector3();
const _v2$2 = /*@__PURE__*/ new Vector3();
const _v3$2 = /*@__PURE__*/ new Vector3();
const _vab = /*@__PURE__*/ new Vector3();
const _vac = /*@__PURE__*/ new Vector3();
const _vbc = /*@__PURE__*/ new Vector3();
const _vap = /*@__PURE__*/ new Vector3();
const _vbp = /*@__PURE__*/ new Vector3();
const _vcp = /*@__PURE__*/ new Vector3();
const _v40 = /*@__PURE__*/ new Vector4();
const _v41 = /*@__PURE__*/ new Vector4();
const _v42 = /*@__PURE__*/ new Vector4();
class Triangle {
    constructor(a = new Vector3(), b = new Vector3(), c = new Vector3()){
        this.a = a;
        this.b = b;
        this.c = c;
    }
    static getNormal(a, b, c, target) {
        target.subVectors(c, b);
        _v0$1.subVectors(a, b);
        target.cross(_v0$1);
        const targetLengthSq = target.lengthSq();
        if (targetLengthSq > 0) return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
        return target.set(0, 0, 0);
    }
    static getBarycoord(point, a, b, c, target) {
        _v0$1.subVectors(c, a);
        _v1$3.subVectors(b, a);
        _v2$2.subVectors(point, a);
        const dot00 = _v0$1.dot(_v0$1);
        const dot01 = _v0$1.dot(_v1$3);
        const dot02 = _v0$1.dot(_v2$2);
        const dot11 = _v1$3.dot(_v1$3);
        const dot12 = _v1$3.dot(_v2$2);
        const denom = dot00 * dot11 - dot01 * dot01;
        if (0 === denom) {
            target.set(0, 0, 0);
            return null;
        }
        const invDenom = 1 / denom;
        const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        return target.set(1 - u - v, v, u);
    }
    static containsPoint(point, a, b, c) {
        if (null === this.getBarycoord(point, a, b, c, _v3$2)) return false;
        return _v3$2.x >= 0 && _v3$2.y >= 0 && _v3$2.x + _v3$2.y <= 1;
    }
    static getInterpolation(point, p1, p2, p3, v1, v2, v3, target) {
        if (null === this.getBarycoord(point, p1, p2, p3, _v3$2)) {
            target.x = 0;
            target.y = 0;
            if ('z' in target) target.z = 0;
            if ('w' in target) target.w = 0;
            return null;
        }
        target.setScalar(0);
        target.addScaledVector(v1, _v3$2.x);
        target.addScaledVector(v2, _v3$2.y);
        target.addScaledVector(v3, _v3$2.z);
        return target;
    }
    static getInterpolatedAttribute(attr, i1, i2, i3, barycoord, target) {
        _v40.setScalar(0);
        _v41.setScalar(0);
        _v42.setScalar(0);
        _v40.fromBufferAttribute(attr, i1);
        _v41.fromBufferAttribute(attr, i2);
        _v42.fromBufferAttribute(attr, i3);
        target.setScalar(0);
        target.addScaledVector(_v40, barycoord.x);
        target.addScaledVector(_v41, barycoord.y);
        target.addScaledVector(_v42, barycoord.z);
        return target;
    }
    static isFrontFacing(a, b, c, direction) {
        _v0$1.subVectors(c, b);
        _v1$3.subVectors(a, b);
        return _v0$1.cross(_v1$3).dot(direction) < 0;
    }
    set(a, b, c) {
        this.a.copy(a);
        this.b.copy(b);
        this.c.copy(c);
        return this;
    }
    setFromPointsAndIndices(points, i0, i1, i2) {
        this.a.copy(points[i0]);
        this.b.copy(points[i1]);
        this.c.copy(points[i2]);
        return this;
    }
    setFromAttributeAndIndices(attribute, i0, i1, i2) {
        this.a.fromBufferAttribute(attribute, i0);
        this.b.fromBufferAttribute(attribute, i1);
        this.c.fromBufferAttribute(attribute, i2);
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(triangle) {
        this.a.copy(triangle.a);
        this.b.copy(triangle.b);
        this.c.copy(triangle.c);
        return this;
    }
    getArea() {
        _v0$1.subVectors(this.c, this.b);
        _v1$3.subVectors(this.a, this.b);
        return 0.5 * _v0$1.cross(_v1$3).length();
    }
    getMidpoint(target) {
        return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
    getNormal(target) {
        return Triangle.getNormal(this.a, this.b, this.c, target);
    }
    getPlane(target) {
        return target.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(point, target) {
        return Triangle.getBarycoord(point, this.a, this.b, this.c, target);
    }
    getInterpolation(point, v1, v2, v3, target) {
        return Triangle.getInterpolation(point, this.a, this.b, this.c, v1, v2, v3, target);
    }
    containsPoint(point) {
        return Triangle.containsPoint(point, this.a, this.b, this.c);
    }
    isFrontFacing(direction) {
        return Triangle.isFrontFacing(this.a, this.b, this.c, direction);
    }
    intersectsBox(box) {
        return box.intersectsTriangle(this);
    }
    closestPointToPoint(p, target) {
        const a = this.a, b = this.b, c = this.c;
        let v, w;
        _vab.subVectors(b, a);
        _vac.subVectors(c, a);
        _vap.subVectors(p, a);
        const d1 = _vab.dot(_vap);
        const d2 = _vac.dot(_vap);
        if (d1 <= 0 && d2 <= 0) return target.copy(a);
        _vbp.subVectors(p, b);
        const d3 = _vab.dot(_vbp);
        const d4 = _vac.dot(_vbp);
        if (d3 >= 0 && d4 <= d3) return target.copy(b);
        const vc = d1 * d4 - d3 * d2;
        if (vc <= 0 && d1 >= 0 && d3 <= 0) {
            v = d1 / (d1 - d3);
            return target.copy(a).addScaledVector(_vab, v);
        }
        _vcp.subVectors(p, c);
        const d5 = _vab.dot(_vcp);
        const d6 = _vac.dot(_vcp);
        if (d6 >= 0 && d5 <= d6) return target.copy(c);
        const vb = d5 * d2 - d1 * d6;
        if (vb <= 0 && d2 >= 0 && d6 <= 0) {
            w = d2 / (d2 - d6);
            return target.copy(a).addScaledVector(_vac, w);
        }
        const va = d3 * d6 - d5 * d4;
        if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
            _vbc.subVectors(c, b);
            w = (d4 - d3) / (d4 - d3 + (d5 - d6));
            return target.copy(b).addScaledVector(_vbc, w);
        }
        const denom = 1 / (va + vb + vc);
        v = vb * denom;
        w = vc * denom;
        return target.copy(a).addScaledVector(_vab, v).addScaledVector(_vac, w);
    }
    equals(triangle) {
        return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
    }
}
const _colorKeywords = {
    aliceblue: 0xF0F8FF,
    antiquewhite: 0xFAEBD7,
    aqua: 0x00FFFF,
    aquamarine: 0x7FFFD4,
    azure: 0xF0FFFF,
    beige: 0xF5F5DC,
    bisque: 0xFFE4C4,
    black: 0x000000,
    blanchedalmond: 0xFFEBCD,
    blue: 0x0000FF,
    blueviolet: 0x8A2BE2,
    brown: 0xA52A2A,
    burlywood: 0xDEB887,
    cadetblue: 0x5F9EA0,
    chartreuse: 0x7FFF00,
    chocolate: 0xD2691E,
    coral: 0xFF7F50,
    cornflowerblue: 0x6495ED,
    cornsilk: 0xFFF8DC,
    crimson: 0xDC143C,
    cyan: 0x00FFFF,
    darkblue: 0x00008B,
    darkcyan: 0x008B8B,
    darkgoldenrod: 0xB8860B,
    darkgray: 0xA9A9A9,
    darkgreen: 0x006400,
    darkgrey: 0xA9A9A9,
    darkkhaki: 0xBDB76B,
    darkmagenta: 0x8B008B,
    darkolivegreen: 0x556B2F,
    darkorange: 0xFF8C00,
    darkorchid: 0x9932CC,
    darkred: 0x8B0000,
    darksalmon: 0xE9967A,
    darkseagreen: 0x8FBC8F,
    darkslateblue: 0x483D8B,
    darkslategray: 0x2F4F4F,
    darkslategrey: 0x2F4F4F,
    darkturquoise: 0x00CED1,
    darkviolet: 0x9400D3,
    deeppink: 0xFF1493,
    deepskyblue: 0x00BFFF,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1E90FF,
    firebrick: 0xB22222,
    floralwhite: 0xFFFAF0,
    forestgreen: 0x228B22,
    fuchsia: 0xFF00FF,
    gainsboro: 0xDCDCDC,
    ghostwhite: 0xF8F8FF,
    gold: 0xFFD700,
    goldenrod: 0xDAA520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xADFF2F,
    grey: 0x808080,
    honeydew: 0xF0FFF0,
    hotpink: 0xFF69B4,
    indianred: 0xCD5C5C,
    indigo: 0x4B0082,
    ivory: 0xFFFFF0,
    khaki: 0xF0E68C,
    lavender: 0xE6E6FA,
    lavenderblush: 0xFFF0F5,
    lawngreen: 0x7CFC00,
    lemonchiffon: 0xFFFACD,
    lightblue: 0xADD8E6,
    lightcoral: 0xF08080,
    lightcyan: 0xE0FFFF,
    lightgoldenrodyellow: 0xFAFAD2,
    lightgray: 0xD3D3D3,
    lightgreen: 0x90EE90,
    lightgrey: 0xD3D3D3,
    lightpink: 0xFFB6C1,
    lightsalmon: 0xFFA07A,
    lightseagreen: 0x20B2AA,
    lightskyblue: 0x87CEFA,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xB0C4DE,
    lightyellow: 0xFFFFE0,
    lime: 0x00FF00,
    limegreen: 0x32CD32,
    linen: 0xFAF0E6,
    magenta: 0xFF00FF,
    maroon: 0x800000,
    mediumaquamarine: 0x66CDAA,
    mediumblue: 0x0000CD,
    mediumorchid: 0xBA55D3,
    mediumpurple: 0x9370DB,
    mediumseagreen: 0x3CB371,
    mediumslateblue: 0x7B68EE,
    mediumspringgreen: 0x00FA9A,
    mediumturquoise: 0x48D1CC,
    mediumvioletred: 0xC71585,
    midnightblue: 0x191970,
    mintcream: 0xF5FFFA,
    mistyrose: 0xFFE4E1,
    moccasin: 0xFFE4B5,
    navajowhite: 0xFFDEAD,
    navy: 0x000080,
    oldlace: 0xFDF5E6,
    olive: 0x808000,
    olivedrab: 0x6B8E23,
    orange: 0xFFA500,
    orangered: 0xFF4500,
    orchid: 0xDA70D6,
    palegoldenrod: 0xEEE8AA,
    palegreen: 0x98FB98,
    paleturquoise: 0xAFEEEE,
    palevioletred: 0xDB7093,
    papayawhip: 0xFFEFD5,
    peachpuff: 0xFFDAB9,
    peru: 0xCD853F,
    pink: 0xFFC0CB,
    plum: 0xDDA0DD,
    powderblue: 0xB0E0E6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xFF0000,
    rosybrown: 0xBC8F8F,
    royalblue: 0x4169E1,
    saddlebrown: 0x8B4513,
    salmon: 0xFA8072,
    sandybrown: 0xF4A460,
    seagreen: 0x2E8B57,
    seashell: 0xFFF5EE,
    sienna: 0xA0522D,
    silver: 0xC0C0C0,
    skyblue: 0x87CEEB,
    slateblue: 0x6A5ACD,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xFFFAFA,
    springgreen: 0x00FF7F,
    steelblue: 0x4682B4,
    tan: 0xD2B48C,
    teal: 0x008080,
    thistle: 0xD8BFD8,
    tomato: 0xFF6347,
    turquoise: 0x40E0D0,
    violet: 0xEE82EE,
    wheat: 0xF5DEB3,
    white: 0xFFFFFF,
    whitesmoke: 0xF5F5F5,
    yellow: 0xFFFF00,
    yellowgreen: 0x9ACD32
};
const _hslA = {
    h: 0,
    s: 0,
    l: 0
};
const _hslB = {
    h: 0,
    s: 0,
    l: 0
};
function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 0.5) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;
}
class Color {
    constructor(r, g, b){
        this.isColor = true;
        this.r = 1;
        this.g = 1;
        this.b = 1;
        return this.set(r, g, b);
    }
    set(r, g, b) {
        if (void 0 === g && void 0 === b) {
            const value = r;
            if (value && value.isColor) this.copy(value);
            else if ('number' == typeof value) this.setHex(value);
            else if ('string' == typeof value) this.setStyle(value);
        } else this.setRGB(r, g, b);
        return this;
    }
    setScalar(scalar) {
        this.r = scalar;
        this.g = scalar;
        this.b = scalar;
        return this;
    }
    setHex(hex, colorSpace = SRGBColorSpace) {
        hex = Math.floor(hex);
        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (255 & hex) / 255;
        three_core_ColorManagement.toWorkingColorSpace(this, colorSpace);
        return this;
    }
    setRGB(r, g, b, colorSpace = three_core_ColorManagement.workingColorSpace) {
        this.r = r;
        this.g = g;
        this.b = b;
        three_core_ColorManagement.toWorkingColorSpace(this, colorSpace);
        return this;
    }
    setHSL(h, s, l, colorSpace = three_core_ColorManagement.workingColorSpace) {
        h = euclideanModulo(h, 1);
        s = clamp(s, 0, 1);
        l = clamp(l, 0, 1);
        if (0 === s) this.r = this.g = this.b = l;
        else {
            const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
            const q = 2 * l - p;
            this.r = hue2rgb(q, p, h + 1 / 3);
            this.g = hue2rgb(q, p, h);
            this.b = hue2rgb(q, p, h - 1 / 3);
        }
        three_core_ColorManagement.toWorkingColorSpace(this, colorSpace);
        return this;
    }
    setStyle(style, colorSpace = SRGBColorSpace) {
        function handleAlpha(string) {
            if (void 0 === string) return;
            if (parseFloat(string) < 1) console.warn('THREE.Color: Alpha component of ' + style + ' will be ignored.');
        }
        let m;
        if (m = /^(\w+)\(([^\)]*)\)/.exec(style)) {
            let color;
            const name = m[1];
            const components = m[2];
            switch(name){
                case 'rgb':
                case 'rgba':
                    if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        handleAlpha(color[4]);
                        return this.setRGB(Math.min(255, parseInt(color[1], 10)) / 255, Math.min(255, parseInt(color[2], 10)) / 255, Math.min(255, parseInt(color[3], 10)) / 255, colorSpace);
                    }
                    if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        handleAlpha(color[4]);
                        return this.setRGB(Math.min(100, parseInt(color[1], 10)) / 100, Math.min(100, parseInt(color[2], 10)) / 100, Math.min(100, parseInt(color[3], 10)) / 100, colorSpace);
                    }
                    break;
                case 'hsl':
                case 'hsla':
                    if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        handleAlpha(color[4]);
                        return this.setHSL(parseFloat(color[1]) / 360, parseFloat(color[2]) / 100, parseFloat(color[3]) / 100, colorSpace);
                    }
                    break;
                default:
                    console.warn('THREE.Color: Unknown color model ' + style);
            }
        } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
            const hex = m[1];
            const size = hex.length;
            if (3 === size) return this.setRGB(parseInt(hex.charAt(0), 16) / 15, parseInt(hex.charAt(1), 16) / 15, parseInt(hex.charAt(2), 16) / 15, colorSpace);
            if (6 === size) return this.setHex(parseInt(hex, 16), colorSpace);
            console.warn('THREE.Color: Invalid hex color ' + style);
        } else if (style && style.length > 0) return this.setColorName(style, colorSpace);
        return this;
    }
    setColorName(style, colorSpace = SRGBColorSpace) {
        const hex = _colorKeywords[style.toLowerCase()];
        if (void 0 !== hex) this.setHex(hex, colorSpace);
        else console.warn('THREE.Color: Unknown color ' + style);
        return this;
    }
    clone() {
        return new this.constructor(this.r, this.g, this.b);
    }
    copy(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        return this;
    }
    copySRGBToLinear(color) {
        this.r = SRGBToLinear(color.r);
        this.g = SRGBToLinear(color.g);
        this.b = SRGBToLinear(color.b);
        return this;
    }
    copyLinearToSRGB(color) {
        this.r = LinearToSRGB(color.r);
        this.g = LinearToSRGB(color.g);
        this.b = LinearToSRGB(color.b);
        return this;
    }
    convertSRGBToLinear() {
        this.copySRGBToLinear(this);
        return this;
    }
    convertLinearToSRGB() {
        this.copyLinearToSRGB(this);
        return this;
    }
    getHex(colorSpace = SRGBColorSpace) {
        three_core_ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);
        return 65536 * Math.round(clamp(255 * _color.r, 0, 255)) + 256 * Math.round(clamp(255 * _color.g, 0, 255)) + Math.round(clamp(255 * _color.b, 0, 255));
    }
    getHexString(colorSpace = SRGBColorSpace) {
        return ('000000' + this.getHex(colorSpace).toString(16)).slice(-6);
    }
    getHSL(target, colorSpace = three_core_ColorManagement.workingColorSpace) {
        three_core_ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);
        const r = _color.r, g = _color.g, b = _color.b;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let hue, saturation;
        const lightness = (min + max) / 2.0;
        if (min === max) {
            hue = 0;
            saturation = 0;
        } else {
            const delta = max - min;
            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
            switch(max){
                case r:
                    hue = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                case g:
                    hue = (b - r) / delta + 2;
                    break;
                case b:
                    hue = (r - g) / delta + 4;
                    break;
            }
            hue /= 6;
        }
        target.h = hue;
        target.s = saturation;
        target.l = lightness;
        return target;
    }
    getRGB(target, colorSpace = three_core_ColorManagement.workingColorSpace) {
        three_core_ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);
        target.r = _color.r;
        target.g = _color.g;
        target.b = _color.b;
        return target;
    }
    getStyle(colorSpace = SRGBColorSpace) {
        three_core_ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);
        const r = _color.r, g = _color.g, b = _color.b;
        if (colorSpace !== SRGBColorSpace) return `color(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;
        return `rgb(${Math.round(255 * r)},${Math.round(255 * g)},${Math.round(255 * b)})`;
    }
    offsetHSL(h, s, l) {
        this.getHSL(_hslA);
        return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);
    }
    add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        return this;
    }
    addColors(color1, color2) {
        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;
        return this;
    }
    addScalar(s) {
        this.r += s;
        this.g += s;
        this.b += s;
        return this;
    }
    sub(color) {
        this.r = Math.max(0, this.r - color.r);
        this.g = Math.max(0, this.g - color.g);
        this.b = Math.max(0, this.b - color.b);
        return this;
    }
    multiply(color) {
        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;
        return this;
    }
    multiplyScalar(s) {
        this.r *= s;
        this.g *= s;
        this.b *= s;
        return this;
    }
    lerp(color, alpha) {
        this.r += (color.r - this.r) * alpha;
        this.g += (color.g - this.g) * alpha;
        this.b += (color.b - this.b) * alpha;
        return this;
    }
    lerpColors(color1, color2, alpha) {
        this.r = color1.r + (color2.r - color1.r) * alpha;
        this.g = color1.g + (color2.g - color1.g) * alpha;
        this.b = color1.b + (color2.b - color1.b) * alpha;
        return this;
    }
    lerpHSL(color, alpha) {
        this.getHSL(_hslA);
        color.getHSL(_hslB);
        const h = lerp(_hslA.h, _hslB.h, alpha);
        const s = lerp(_hslA.s, _hslB.s, alpha);
        const l = lerp(_hslA.l, _hslB.l, alpha);
        this.setHSL(h, s, l);
        return this;
    }
    setFromVector3(v) {
        this.r = v.x;
        this.g = v.y;
        this.b = v.z;
        return this;
    }
    applyMatrix3(m) {
        const r = this.r, g = this.g, b = this.b;
        const e = m.elements;
        this.r = e[0] * r + e[3] * g + e[6] * b;
        this.g = e[1] * r + e[4] * g + e[7] * b;
        this.b = e[2] * r + e[5] * g + e[8] * b;
        return this;
    }
    equals(c) {
        return c.r === this.r && c.g === this.g && c.b === this.b;
    }
    fromArray(array, offset = 0) {
        this.r = array[offset];
        this.g = array[offset + 1];
        this.b = array[offset + 2];
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.r = attribute.getX(index);
        this.g = attribute.getY(index);
        this.b = attribute.getZ(index);
        return this;
    }
    toJSON() {
        return this.getHex();
    }
    *[Symbol.iterator]() {
        yield this.r;
        yield this.g;
        yield this.b;
    }
}
const _color = /*@__PURE__*/ new Color();
Color.NAMES = _colorKeywords;
let _materialId = 0;
class three_core_Material extends EventDispatcher {
    constructor(){
        super();
        this.isMaterial = true;
        Object.defineProperty(this, 'id', {
            value: _materialId++
        });
        this.uuid = generateUUID();
        this.name = '';
        this.type = 'Material';
        this.blending = NormalBlending;
        this.side = FrontSide;
        this.vertexColors = false;
        this.opacity = 1;
        this.transparent = false;
        this.alphaHash = false;
        this.blendSrc = SrcAlphaFactor;
        this.blendDst = OneMinusSrcAlphaFactor;
        this.blendEquation = AddEquation;
        this.blendSrcAlpha = null;
        this.blendDstAlpha = null;
        this.blendEquationAlpha = null;
        this.blendColor = new Color(0, 0, 0);
        this.blendAlpha = 0;
        this.depthFunc = LessEqualDepth;
        this.depthTest = true;
        this.depthWrite = true;
        this.stencilWriteMask = 0xff;
        this.stencilFunc = AlwaysStencilFunc;
        this.stencilRef = 0;
        this.stencilFuncMask = 0xff;
        this.stencilFail = KeepStencilOp;
        this.stencilZFail = KeepStencilOp;
        this.stencilZPass = KeepStencilOp;
        this.stencilWrite = false;
        this.clippingPlanes = null;
        this.clipIntersection = false;
        this.clipShadows = false;
        this.shadowSide = null;
        this.colorWrite = true;
        this.precision = null;
        this.polygonOffset = false;
        this.polygonOffsetFactor = 0;
        this.polygonOffsetUnits = 0;
        this.dithering = false;
        this.alphaToCoverage = false;
        this.premultipliedAlpha = false;
        this.forceSinglePass = false;
        this.visible = true;
        this.toneMapped = true;
        this.userData = {};
        this.version = 0;
        this._alphaTest = 0;
    }
    get alphaTest() {
        return this._alphaTest;
    }
    set alphaTest(value) {
        if (this._alphaTest > 0 !== value > 0) this.version++;
        this._alphaTest = value;
    }
    onBeforeRender() {}
    onBeforeCompile() {}
    customProgramCacheKey() {
        return this.onBeforeCompile.toString();
    }
    setValues(values) {
        if (void 0 === values) return;
        for(const key in values){
            const newValue = values[key];
            if (void 0 === newValue) {
                console.warn(`THREE.Material: parameter '${key}' has value of undefined.`);
                continue;
            }
            const currentValue = this[key];
            if (void 0 === currentValue) {
                console.warn(`THREE.Material: '${key}' is not a property of THREE.${this.type}.`);
                continue;
            }
            if (currentValue && currentValue.isColor) currentValue.set(newValue);
            else if (currentValue && currentValue.isVector3 && newValue && newValue.isVector3) currentValue.copy(newValue);
            else this[key] = newValue;
        }
    }
    toJSON(meta) {
        const isRootObject = void 0 === meta || 'string' == typeof meta;
        if (isRootObject) meta = {
            textures: {},
            images: {}
        };
        const data = {
            metadata: {
                version: 4.6,
                type: 'Material',
                generator: 'Material.toJSON'
            }
        };
        data.uuid = this.uuid;
        data.type = this.type;
        if ('' !== this.name) data.name = this.name;
        if (this.color && this.color.isColor) data.color = this.color.getHex();
        if (void 0 !== this.roughness) data.roughness = this.roughness;
        if (void 0 !== this.metalness) data.metalness = this.metalness;
        if (void 0 !== this.sheen) data.sheen = this.sheen;
        if (this.sheenColor && this.sheenColor.isColor) data.sheenColor = this.sheenColor.getHex();
        if (void 0 !== this.sheenRoughness) data.sheenRoughness = this.sheenRoughness;
        if (this.emissive && this.emissive.isColor) data.emissive = this.emissive.getHex();
        if (void 0 !== this.emissiveIntensity && 1 !== this.emissiveIntensity) data.emissiveIntensity = this.emissiveIntensity;
        if (this.specular && this.specular.isColor) data.specular = this.specular.getHex();
        if (void 0 !== this.specularIntensity) data.specularIntensity = this.specularIntensity;
        if (this.specularColor && this.specularColor.isColor) data.specularColor = this.specularColor.getHex();
        if (void 0 !== this.shininess) data.shininess = this.shininess;
        if (void 0 !== this.clearcoat) data.clearcoat = this.clearcoat;
        if (void 0 !== this.clearcoatRoughness) data.clearcoatRoughness = this.clearcoatRoughness;
        if (this.clearcoatMap && this.clearcoatMap.isTexture) data.clearcoatMap = this.clearcoatMap.toJSON(meta).uuid;
        if (this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture) data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(meta).uuid;
        if (this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture) {
            data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(meta).uuid;
            data.clearcoatNormalScale = this.clearcoatNormalScale.toArray();
        }
        if (void 0 !== this.dispersion) data.dispersion = this.dispersion;
        if (void 0 !== this.iridescence) data.iridescence = this.iridescence;
        if (void 0 !== this.iridescenceIOR) data.iridescenceIOR = this.iridescenceIOR;
        if (void 0 !== this.iridescenceThicknessRange) data.iridescenceThicknessRange = this.iridescenceThicknessRange;
        if (this.iridescenceMap && this.iridescenceMap.isTexture) data.iridescenceMap = this.iridescenceMap.toJSON(meta).uuid;
        if (this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture) data.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(meta).uuid;
        if (void 0 !== this.anisotropy) data.anisotropy = this.anisotropy;
        if (void 0 !== this.anisotropyRotation) data.anisotropyRotation = this.anisotropyRotation;
        if (this.anisotropyMap && this.anisotropyMap.isTexture) data.anisotropyMap = this.anisotropyMap.toJSON(meta).uuid;
        if (this.map && this.map.isTexture) data.map = this.map.toJSON(meta).uuid;
        if (this.matcap && this.matcap.isTexture) data.matcap = this.matcap.toJSON(meta).uuid;
        if (this.alphaMap && this.alphaMap.isTexture) data.alphaMap = this.alphaMap.toJSON(meta).uuid;
        if (this.lightMap && this.lightMap.isTexture) {
            data.lightMap = this.lightMap.toJSON(meta).uuid;
            data.lightMapIntensity = this.lightMapIntensity;
        }
        if (this.aoMap && this.aoMap.isTexture) {
            data.aoMap = this.aoMap.toJSON(meta).uuid;
            data.aoMapIntensity = this.aoMapIntensity;
        }
        if (this.bumpMap && this.bumpMap.isTexture) {
            data.bumpMap = this.bumpMap.toJSON(meta).uuid;
            data.bumpScale = this.bumpScale;
        }
        if (this.normalMap && this.normalMap.isTexture) {
            data.normalMap = this.normalMap.toJSON(meta).uuid;
            data.normalMapType = this.normalMapType;
            data.normalScale = this.normalScale.toArray();
        }
        if (this.displacementMap && this.displacementMap.isTexture) {
            data.displacementMap = this.displacementMap.toJSON(meta).uuid;
            data.displacementScale = this.displacementScale;
            data.displacementBias = this.displacementBias;
        }
        if (this.roughnessMap && this.roughnessMap.isTexture) data.roughnessMap = this.roughnessMap.toJSON(meta).uuid;
        if (this.metalnessMap && this.metalnessMap.isTexture) data.metalnessMap = this.metalnessMap.toJSON(meta).uuid;
        if (this.emissiveMap && this.emissiveMap.isTexture) data.emissiveMap = this.emissiveMap.toJSON(meta).uuid;
        if (this.specularMap && this.specularMap.isTexture) data.specularMap = this.specularMap.toJSON(meta).uuid;
        if (this.specularIntensityMap && this.specularIntensityMap.isTexture) data.specularIntensityMap = this.specularIntensityMap.toJSON(meta).uuid;
        if (this.specularColorMap && this.specularColorMap.isTexture) data.specularColorMap = this.specularColorMap.toJSON(meta).uuid;
        if (this.envMap && this.envMap.isTexture) {
            data.envMap = this.envMap.toJSON(meta).uuid;
            if (void 0 !== this.combine) data.combine = this.combine;
        }
        if (void 0 !== this.envMapRotation) data.envMapRotation = this.envMapRotation.toArray();
        if (void 0 !== this.envMapIntensity) data.envMapIntensity = this.envMapIntensity;
        if (void 0 !== this.reflectivity) data.reflectivity = this.reflectivity;
        if (void 0 !== this.refractionRatio) data.refractionRatio = this.refractionRatio;
        if (this.gradientMap && this.gradientMap.isTexture) data.gradientMap = this.gradientMap.toJSON(meta).uuid;
        if (void 0 !== this.transmission) data.transmission = this.transmission;
        if (this.transmissionMap && this.transmissionMap.isTexture) data.transmissionMap = this.transmissionMap.toJSON(meta).uuid;
        if (void 0 !== this.thickness) data.thickness = this.thickness;
        if (this.thicknessMap && this.thicknessMap.isTexture) data.thicknessMap = this.thicknessMap.toJSON(meta).uuid;
        if (void 0 !== this.attenuationDistance && this.attenuationDistance !== 1 / 0) data.attenuationDistance = this.attenuationDistance;
        if (void 0 !== this.attenuationColor) data.attenuationColor = this.attenuationColor.getHex();
        if (void 0 !== this.size) data.size = this.size;
        if (null !== this.shadowSide) data.shadowSide = this.shadowSide;
        if (void 0 !== this.sizeAttenuation) data.sizeAttenuation = this.sizeAttenuation;
        if (this.blending !== NormalBlending) data.blending = this.blending;
        if (this.side !== FrontSide) data.side = this.side;
        if (true === this.vertexColors) data.vertexColors = true;
        if (this.opacity < 1) data.opacity = this.opacity;
        if (true === this.transparent) data.transparent = true;
        if (this.blendSrc !== SrcAlphaFactor) data.blendSrc = this.blendSrc;
        if (this.blendDst !== OneMinusSrcAlphaFactor) data.blendDst = this.blendDst;
        if (this.blendEquation !== AddEquation) data.blendEquation = this.blendEquation;
        if (null !== this.blendSrcAlpha) data.blendSrcAlpha = this.blendSrcAlpha;
        if (null !== this.blendDstAlpha) data.blendDstAlpha = this.blendDstAlpha;
        if (null !== this.blendEquationAlpha) data.blendEquationAlpha = this.blendEquationAlpha;
        if (this.blendColor && this.blendColor.isColor) data.blendColor = this.blendColor.getHex();
        if (0 !== this.blendAlpha) data.blendAlpha = this.blendAlpha;
        if (this.depthFunc !== LessEqualDepth) data.depthFunc = this.depthFunc;
        if (false === this.depthTest) data.depthTest = this.depthTest;
        if (false === this.depthWrite) data.depthWrite = this.depthWrite;
        if (false === this.colorWrite) data.colorWrite = this.colorWrite;
        if (0xff !== this.stencilWriteMask) data.stencilWriteMask = this.stencilWriteMask;
        if (this.stencilFunc !== AlwaysStencilFunc) data.stencilFunc = this.stencilFunc;
        if (0 !== this.stencilRef) data.stencilRef = this.stencilRef;
        if (0xff !== this.stencilFuncMask) data.stencilFuncMask = this.stencilFuncMask;
        if (this.stencilFail !== KeepStencilOp) data.stencilFail = this.stencilFail;
        if (this.stencilZFail !== KeepStencilOp) data.stencilZFail = this.stencilZFail;
        if (this.stencilZPass !== KeepStencilOp) data.stencilZPass = this.stencilZPass;
        if (true === this.stencilWrite) data.stencilWrite = this.stencilWrite;
        if (void 0 !== this.rotation && 0 !== this.rotation) data.rotation = this.rotation;
        if (true === this.polygonOffset) data.polygonOffset = true;
        if (0 !== this.polygonOffsetFactor) data.polygonOffsetFactor = this.polygonOffsetFactor;
        if (0 !== this.polygonOffsetUnits) data.polygonOffsetUnits = this.polygonOffsetUnits;
        if (void 0 !== this.linewidth && 1 !== this.linewidth) data.linewidth = this.linewidth;
        if (void 0 !== this.dashSize) data.dashSize = this.dashSize;
        if (void 0 !== this.gapSize) data.gapSize = this.gapSize;
        if (void 0 !== this.scale) data.scale = this.scale;
        if (true === this.dithering) data.dithering = true;
        if (this.alphaTest > 0) data.alphaTest = this.alphaTest;
        if (true === this.alphaHash) data.alphaHash = true;
        if (true === this.alphaToCoverage) data.alphaToCoverage = true;
        if (true === this.premultipliedAlpha) data.premultipliedAlpha = true;
        if (true === this.forceSinglePass) data.forceSinglePass = true;
        if (true === this.wireframe) data.wireframe = true;
        if (this.wireframeLinewidth > 1) data.wireframeLinewidth = this.wireframeLinewidth;
        if ('round' !== this.wireframeLinecap) data.wireframeLinecap = this.wireframeLinecap;
        if ('round' !== this.wireframeLinejoin) data.wireframeLinejoin = this.wireframeLinejoin;
        if (true === this.flatShading) data.flatShading = true;
        if (false === this.visible) data.visible = false;
        if (false === this.toneMapped) data.toneMapped = false;
        if (false === this.fog) data.fog = false;
        if (Object.keys(this.userData).length > 0) data.userData = this.userData;
        function extractFromCache(cache) {
            const values = [];
            for(const key in cache){
                const data = cache[key];
                delete data.metadata;
                values.push(data);
            }
            return values;
        }
        if (isRootObject) {
            const textures = extractFromCache(meta.textures);
            const images = extractFromCache(meta.images);
            if (textures.length > 0) data.textures = textures;
            if (images.length > 0) data.images = images;
        }
        return data;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
        this.name = source.name;
        this.blending = source.blending;
        this.side = source.side;
        this.vertexColors = source.vertexColors;
        this.opacity = source.opacity;
        this.transparent = source.transparent;
        this.blendSrc = source.blendSrc;
        this.blendDst = source.blendDst;
        this.blendEquation = source.blendEquation;
        this.blendSrcAlpha = source.blendSrcAlpha;
        this.blendDstAlpha = source.blendDstAlpha;
        this.blendEquationAlpha = source.blendEquationAlpha;
        this.blendColor.copy(source.blendColor);
        this.blendAlpha = source.blendAlpha;
        this.depthFunc = source.depthFunc;
        this.depthTest = source.depthTest;
        this.depthWrite = source.depthWrite;
        this.stencilWriteMask = source.stencilWriteMask;
        this.stencilFunc = source.stencilFunc;
        this.stencilRef = source.stencilRef;
        this.stencilFuncMask = source.stencilFuncMask;
        this.stencilFail = source.stencilFail;
        this.stencilZFail = source.stencilZFail;
        this.stencilZPass = source.stencilZPass;
        this.stencilWrite = source.stencilWrite;
        const srcPlanes = source.clippingPlanes;
        let dstPlanes = null;
        if (null !== srcPlanes) {
            const n = srcPlanes.length;
            dstPlanes = new Array(n);
            for(let i = 0; i !== n; ++i)dstPlanes[i] = srcPlanes[i].clone();
        }
        this.clippingPlanes = dstPlanes;
        this.clipIntersection = source.clipIntersection;
        this.clipShadows = source.clipShadows;
        this.shadowSide = source.shadowSide;
        this.colorWrite = source.colorWrite;
        this.precision = source.precision;
        this.polygonOffset = source.polygonOffset;
        this.polygonOffsetFactor = source.polygonOffsetFactor;
        this.polygonOffsetUnits = source.polygonOffsetUnits;
        this.dithering = source.dithering;
        this.alphaTest = source.alphaTest;
        this.alphaHash = source.alphaHash;
        this.alphaToCoverage = source.alphaToCoverage;
        this.premultipliedAlpha = source.premultipliedAlpha;
        this.forceSinglePass = source.forceSinglePass;
        this.visible = source.visible;
        this.toneMapped = source.toneMapped;
        this.userData = JSON.parse(JSON.stringify(source.userData));
        return this;
    }
    dispose() {
        this.dispatchEvent({
            type: 'dispose'
        });
    }
    set needsUpdate(value) {
        if (true === value) this.version++;
    }
    onBuild() {
        console.warn('Material: onBuild() has been removed.');
    }
}
function cloneUniforms(src) {
    const dst = {};
    for(const u in src){
        dst[u] = {};
        for(const p in src[u]){
            const property = src[u][p];
            if (property && (property.isColor || property.isMatrix3 || property.isMatrix4 || property.isVector2 || property.isVector3 || property.isVector4 || property.isTexture || property.isQuaternion)) if (property.isRenderTargetTexture) {
                console.warn('UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().');
                dst[u][p] = null;
            } else dst[u][p] = property.clone();
            else if (Array.isArray(property)) dst[u][p] = property.slice();
            else dst[u][p] = property;
        }
    }
    return dst;
}
function cloneUniformsGroups(src) {
    const dst = [];
    for(let u = 0; u < src.length; u++)dst.push(src[u].clone());
    return dst;
}
var default_vertex = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
var default_fragment = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
class ShaderMaterial extends three_core_Material {
    constructor(parameters){
        super();
        this.isShaderMaterial = true;
        this.type = 'ShaderMaterial';
        this.defines = {};
        this.uniforms = {};
        this.uniformsGroups = [];
        this.vertexShader = default_vertex;
        this.fragmentShader = default_fragment;
        this.linewidth = 1;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.fog = false;
        this.lights = false;
        this.clipping = false;
        this.forceSinglePass = true;
        this.extensions = {
            clipCullDistance: false,
            multiDraw: false
        };
        this.defaultAttributeValues = {
            color: [
                1,
                1,
                1
            ],
            uv: [
                0,
                0
            ],
            uv1: [
                0,
                0
            ]
        };
        this.index0AttributeName = void 0;
        this.uniformsNeedUpdate = false;
        this.glslVersion = null;
        if (void 0 !== parameters) this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.fragmentShader = source.fragmentShader;
        this.vertexShader = source.vertexShader;
        this.uniforms = cloneUniforms(source.uniforms);
        this.uniformsGroups = cloneUniformsGroups(source.uniformsGroups);
        this.defines = Object.assign({}, source.defines);
        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        this.fog = source.fog;
        this.lights = source.lights;
        this.clipping = source.clipping;
        this.extensions = Object.assign({}, source.extensions);
        this.glslVersion = source.glslVersion;
        return this;
    }
    toJSON(meta) {
        const data = super.toJSON(meta);
        data.glslVersion = this.glslVersion;
        data.uniforms = {};
        for(const name in this.uniforms){
            const uniform = this.uniforms[name];
            const value = uniform.value;
            if (value && value.isTexture) data.uniforms[name] = {
                type: 't',
                value: value.toJSON(meta).uuid
            };
            else if (value && value.isColor) data.uniforms[name] = {
                type: 'c',
                value: value.getHex()
            };
            else if (value && value.isVector2) data.uniforms[name] = {
                type: 'v2',
                value: value.toArray()
            };
            else if (value && value.isVector3) data.uniforms[name] = {
                type: 'v3',
                value: value.toArray()
            };
            else if (value && value.isVector4) data.uniforms[name] = {
                type: 'v4',
                value: value.toArray()
            };
            else if (value && value.isMatrix3) data.uniforms[name] = {
                type: 'm3',
                value: value.toArray()
            };
            else if (value && value.isMatrix4) data.uniforms[name] = {
                type: 'm4',
                value: value.toArray()
            };
            else data.uniforms[name] = {
                value: value
            };
        }
        if (Object.keys(this.defines).length > 0) data.defines = this.defines;
        data.vertexShader = this.vertexShader;
        data.fragmentShader = this.fragmentShader;
        data.lights = this.lights;
        data.clipping = this.clipping;
        const extensions = {};
        for(const key in this.extensions)if (true === this.extensions[key]) extensions[key] = true;
        if (Object.keys(extensions).length > 0) data.extensions = extensions;
        return data;
    }
}
class Curve {
    constructor(){
        this.type = 'Curve';
        this.arcLengthDivisions = 200;
        this.needsUpdate = false;
        this.cacheArcLengths = null;
    }
    getPoint() {
        console.warn('THREE.Curve: .getPoint() not implemented.');
    }
    getPointAt(u, optionalTarget) {
        const t = this.getUtoTmapping(u);
        return this.getPoint(t, optionalTarget);
    }
    getPoints(divisions = 5) {
        const points = [];
        for(let d = 0; d <= divisions; d++)points.push(this.getPoint(d / divisions));
        return points;
    }
    getSpacedPoints(divisions = 5) {
        const points = [];
        for(let d = 0; d <= divisions; d++)points.push(this.getPointAt(d / divisions));
        return points;
    }
    getLength() {
        const lengths = this.getLengths();
        return lengths[lengths.length - 1];
    }
    getLengths(divisions = this.arcLengthDivisions) {
        if (this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1 && !this.needsUpdate) return this.cacheArcLengths;
        this.needsUpdate = false;
        const cache = [];
        let current, last = this.getPoint(0);
        let sum = 0;
        cache.push(0);
        for(let p = 1; p <= divisions; p++){
            current = this.getPoint(p / divisions);
            sum += current.distanceTo(last);
            cache.push(sum);
            last = current;
        }
        this.cacheArcLengths = cache;
        return cache;
    }
    updateArcLengths() {
        this.needsUpdate = true;
        this.getLengths();
    }
    getUtoTmapping(u, distance = null) {
        const arcLengths = this.getLengths();
        let i = 0;
        const il = arcLengths.length;
        let targetArcLength;
        targetArcLength = distance ? distance : u * arcLengths[il - 1];
        let low = 0, high = il - 1, comparison;
        while(low <= high){
            i = Math.floor(low + (high - low) / 2);
            comparison = arcLengths[i] - targetArcLength;
            if (comparison < 0) low = i + 1;
            else if (comparison > 0) high = i - 1;
            else {
                high = i;
                break;
            }
        }
        i = high;
        if (arcLengths[i] === targetArcLength) return i / (il - 1);
        const lengthBefore = arcLengths[i];
        const lengthAfter = arcLengths[i + 1];
        const segmentLength = lengthAfter - lengthBefore;
        const segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
        const t = (i + segmentFraction) / (il - 1);
        return t;
    }
    getTangent(t, optionalTarget) {
        const delta = 0.0001;
        let t1 = t - delta;
        let t2 = t + delta;
        if (t1 < 0) t1 = 0;
        if (t2 > 1) t2 = 1;
        const pt1 = this.getPoint(t1);
        const pt2 = this.getPoint(t2);
        const tangent = optionalTarget || (pt1.isVector2 ? new Vector2() : new Vector3());
        tangent.copy(pt2).sub(pt1).normalize();
        return tangent;
    }
    getTangentAt(u, optionalTarget) {
        const t = this.getUtoTmapping(u);
        return this.getTangent(t, optionalTarget);
    }
    computeFrenetFrames(segments, closed = false) {
        const normal = new Vector3();
        const tangents = [];
        const normals = [];
        const binormals = [];
        const vec = new Vector3();
        const mat = new Matrix4();
        for(let i = 0; i <= segments; i++){
            const u = i / segments;
            tangents[i] = this.getTangentAt(u, new Vector3());
        }
        normals[0] = new Vector3();
        binormals[0] = new Vector3();
        let min = Number.MAX_VALUE;
        const tx = Math.abs(tangents[0].x);
        const ty = Math.abs(tangents[0].y);
        const tz = Math.abs(tangents[0].z);
        if (tx <= min) {
            min = tx;
            normal.set(1, 0, 0);
        }
        if (ty <= min) {
            min = ty;
            normal.set(0, 1, 0);
        }
        if (tz <= min) normal.set(0, 0, 1);
        vec.crossVectors(tangents[0], normal).normalize();
        normals[0].crossVectors(tangents[0], vec);
        binormals[0].crossVectors(tangents[0], normals[0]);
        for(let i = 1; i <= segments; i++){
            normals[i] = normals[i - 1].clone();
            binormals[i] = binormals[i - 1].clone();
            vec.crossVectors(tangents[i - 1], tangents[i]);
            if (vec.length() > Number.EPSILON) {
                vec.normalize();
                const theta = Math.acos(clamp(tangents[i - 1].dot(tangents[i]), -1, 1));
                normals[i].applyMatrix4(mat.makeRotationAxis(vec, theta));
            }
            binormals[i].crossVectors(tangents[i], normals[i]);
        }
        if (true === closed) {
            let theta = Math.acos(clamp(normals[0].dot(normals[segments]), -1, 1));
            theta /= segments;
            if (tangents[0].dot(vec.crossVectors(normals[0], normals[segments])) > 0) theta = -theta;
            for(let i = 1; i <= segments; i++){
                normals[i].applyMatrix4(mat.makeRotationAxis(tangents[i], theta * i));
                binormals[i].crossVectors(tangents[i], normals[i]);
            }
        }
        return {
            tangents: tangents,
            normals: normals,
            binormals: binormals
        };
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
        this.arcLengthDivisions = source.arcLengthDivisions;
        return this;
    }
    toJSON() {
        const data = {
            metadata: {
                version: 4.6,
                type: 'Curve',
                generator: 'Curve.toJSON'
            }
        };
        data.arcLengthDivisions = this.arcLengthDivisions;
        data.type = this.type;
        return data;
    }
    fromJSON(json) {
        this.arcLengthDivisions = json.arcLengthDivisions;
        return this;
    }
}
class EllipseCurve extends Curve {
    constructor(aX = 0, aY = 0, xRadius = 1, yRadius = 1, aStartAngle = 0, aEndAngle = 2 * Math.PI, aClockwise = false, aRotation = 0){
        super();
        this.isEllipseCurve = true;
        this.type = 'EllipseCurve';
        this.aX = aX;
        this.aY = aY;
        this.xRadius = xRadius;
        this.yRadius = yRadius;
        this.aStartAngle = aStartAngle;
        this.aEndAngle = aEndAngle;
        this.aClockwise = aClockwise;
        this.aRotation = aRotation;
    }
    getPoint(t, optionalTarget = new Vector2()) {
        const point = optionalTarget;
        const twoPi = 2 * Math.PI;
        let deltaAngle = this.aEndAngle - this.aStartAngle;
        const samePoints = Math.abs(deltaAngle) < Number.EPSILON;
        while(deltaAngle < 0)deltaAngle += twoPi;
        while(deltaAngle > twoPi)deltaAngle -= twoPi;
        if (deltaAngle < Number.EPSILON) deltaAngle = samePoints ? 0 : twoPi;
        if (true === this.aClockwise && !samePoints) if (deltaAngle === twoPi) deltaAngle = -twoPi;
        else deltaAngle -= twoPi;
        const angle = this.aStartAngle + t * deltaAngle;
        let x = this.aX + this.xRadius * Math.cos(angle);
        let y = this.aY + this.yRadius * Math.sin(angle);
        if (0 !== this.aRotation) {
            const cos = Math.cos(this.aRotation);
            const sin = Math.sin(this.aRotation);
            const tx = x - this.aX;
            const ty = y - this.aY;
            x = tx * cos - ty * sin + this.aX;
            y = tx * sin + ty * cos + this.aY;
        }
        return point.set(x, y);
    }
    copy(source) {
        super.copy(source);
        this.aX = source.aX;
        this.aY = source.aY;
        this.xRadius = source.xRadius;
        this.yRadius = source.yRadius;
        this.aStartAngle = source.aStartAngle;
        this.aEndAngle = source.aEndAngle;
        this.aClockwise = source.aClockwise;
        this.aRotation = source.aRotation;
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.aX = this.aX;
        data.aY = this.aY;
        data.xRadius = this.xRadius;
        data.yRadius = this.yRadius;
        data.aStartAngle = this.aStartAngle;
        data.aEndAngle = this.aEndAngle;
        data.aClockwise = this.aClockwise;
        data.aRotation = this.aRotation;
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.aX = json.aX;
        this.aY = json.aY;
        this.xRadius = json.xRadius;
        this.yRadius = json.yRadius;
        this.aStartAngle = json.aStartAngle;
        this.aEndAngle = json.aEndAngle;
        this.aClockwise = json.aClockwise;
        this.aRotation = json.aRotation;
        return this;
    }
}
class ArcCurve extends EllipseCurve {
    constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise){
        super(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
        this.isArcCurve = true;
        this.type = 'ArcCurve';
    }
}
function CubicPoly() {
    let c0 = 0, c1 = 0, c2 = 0, c3 = 0;
    function init(x0, x1, t0, t1) {
        c0 = x0;
        c1 = t0;
        c2 = -3 * x0 + 3 * x1 - 2 * t0 - t1;
        c3 = 2 * x0 - 2 * x1 + t0 + t1;
    }
    return {
        initCatmullRom: function(x0, x1, x2, x3, tension) {
            init(x1, x2, tension * (x2 - x0), tension * (x3 - x1));
        },
        initNonuniformCatmullRom: function(x0, x1, x2, x3, dt0, dt1, dt2) {
            let t1 = (x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1;
            let t2 = (x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2;
            t1 *= dt1;
            t2 *= dt1;
            init(x1, x2, t1, t2);
        },
        calc: function(t) {
            const t2 = t * t;
            const t3 = t2 * t;
            return c0 + c1 * t + c2 * t2 + c3 * t3;
        }
    };
}
const three_core_tmp = /*@__PURE__*/ new Vector3();
const three_core_px = /*@__PURE__*/ new CubicPoly();
const three_core_py = /*@__PURE__*/ new CubicPoly();
const pz = /*@__PURE__*/ new CubicPoly();
class CatmullRomCurve3 extends Curve {
    constructor(points = [], closed = false, curveType = 'centripetal', tension = 0.5){
        super();
        this.isCatmullRomCurve3 = true;
        this.type = 'CatmullRomCurve3';
        this.points = points;
        this.closed = closed;
        this.curveType = curveType;
        this.tension = tension;
    }
    getPoint(t, optionalTarget = new Vector3()) {
        const point = optionalTarget;
        const points = this.points;
        const l = points.length;
        const p = (l - (this.closed ? 0 : 1)) * t;
        let intPoint = Math.floor(p);
        let weight = p - intPoint;
        if (this.closed) intPoint += intPoint > 0 ? 0 : (Math.floor(Math.abs(intPoint) / l) + 1) * l;
        else if (0 === weight && intPoint === l - 1) {
            intPoint = l - 2;
            weight = 1;
        }
        let p0, p3;
        if (this.closed || intPoint > 0) p0 = points[(intPoint - 1) % l];
        else {
            three_core_tmp.subVectors(points[0], points[1]).add(points[0]);
            p0 = three_core_tmp;
        }
        const p1 = points[intPoint % l];
        const p2 = points[(intPoint + 1) % l];
        if (this.closed || intPoint + 2 < l) p3 = points[(intPoint + 2) % l];
        else {
            three_core_tmp.subVectors(points[l - 1], points[l - 2]).add(points[l - 1]);
            p3 = three_core_tmp;
        }
        if ('centripetal' === this.curveType || 'chordal' === this.curveType) {
            const pow = 'chordal' === this.curveType ? 0.5 : 0.25;
            let dt0 = Math.pow(p0.distanceToSquared(p1), pow);
            let dt1 = Math.pow(p1.distanceToSquared(p2), pow);
            let dt2 = Math.pow(p2.distanceToSquared(p3), pow);
            if (dt1 < 1e-4) dt1 = 1.0;
            if (dt0 < 1e-4) dt0 = dt1;
            if (dt2 < 1e-4) dt2 = dt1;
            three_core_px.initNonuniformCatmullRom(p0.x, p1.x, p2.x, p3.x, dt0, dt1, dt2);
            three_core_py.initNonuniformCatmullRom(p0.y, p1.y, p2.y, p3.y, dt0, dt1, dt2);
            pz.initNonuniformCatmullRom(p0.z, p1.z, p2.z, p3.z, dt0, dt1, dt2);
        } else if ('catmullrom' === this.curveType) {
            three_core_px.initCatmullRom(p0.x, p1.x, p2.x, p3.x, this.tension);
            three_core_py.initCatmullRom(p0.y, p1.y, p2.y, p3.y, this.tension);
            pz.initCatmullRom(p0.z, p1.z, p2.z, p3.z, this.tension);
        }
        point.set(three_core_px.calc(weight), three_core_py.calc(weight), pz.calc(weight));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.points = [];
        for(let i = 0, l = source.points.length; i < l; i++){
            const point = source.points[i];
            this.points.push(point.clone());
        }
        this.closed = source.closed;
        this.curveType = source.curveType;
        this.tension = source.tension;
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.points = [];
        for(let i = 0, l = this.points.length; i < l; i++){
            const point = this.points[i];
            data.points.push(point.toArray());
        }
        data.closed = this.closed;
        data.curveType = this.curveType;
        data.tension = this.tension;
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.points = [];
        for(let i = 0, l = json.points.length; i < l; i++){
            const point = json.points[i];
            this.points.push(new Vector3().fromArray(point));
        }
        this.closed = json.closed;
        this.curveType = json.curveType;
        this.tension = json.tension;
        return this;
    }
}
function CatmullRom(t, p0, p1, p2, p3) {
    const v0 = (p2 - p0) * 0.5;
    const v1 = (p3 - p1) * 0.5;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
}
function QuadraticBezierP0(t, p) {
    const k = 1 - t;
    return k * k * p;
}
function QuadraticBezierP1(t, p) {
    return 2 * (1 - t) * t * p;
}
function QuadraticBezierP2(t, p) {
    return t * t * p;
}
function QuadraticBezier(t, p0, p1, p2) {
    return QuadraticBezierP0(t, p0) + QuadraticBezierP1(t, p1) + QuadraticBezierP2(t, p2);
}
function CubicBezierP0(t, p) {
    const k = 1 - t;
    return k * k * k * p;
}
function CubicBezierP1(t, p) {
    const k = 1 - t;
    return 3 * k * k * t * p;
}
function CubicBezierP2(t, p) {
    return 3 * (1 - t) * t * t * p;
}
function CubicBezierP3(t, p) {
    return t * t * t * p;
}
function CubicBezier(t, p0, p1, p2, p3) {
    return CubicBezierP0(t, p0) + CubicBezierP1(t, p1) + CubicBezierP2(t, p2) + CubicBezierP3(t, p3);
}
class CubicBezierCurve extends Curve {
    constructor(v0 = new Vector2(), v1 = new Vector2(), v2 = new Vector2(), v3 = new Vector2()){
        super();
        this.isCubicBezierCurve = true;
        this.type = 'CubicBezierCurve';
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
    getPoint(t, optionalTarget = new Vector2()) {
        const point = optionalTarget;
        const v0 = this.v0, v1 = this.v1, v2 = this.v2, v3 = this.v3;
        point.set(CubicBezier(t, v0.x, v1.x, v2.x, v3.x), CubicBezier(t, v0.y, v1.y, v2.y, v3.y));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        this.v3.copy(source.v3);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v0 = this.v0.toArray();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        data.v3 = this.v3.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v0.fromArray(json.v0);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        this.v3.fromArray(json.v3);
        return this;
    }
}
class CubicBezierCurve3 extends Curve {
    constructor(v0 = new Vector3(), v1 = new Vector3(), v2 = new Vector3(), v3 = new Vector3()){
        super();
        this.isCubicBezierCurve3 = true;
        this.type = 'CubicBezierCurve3';
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
    getPoint(t, optionalTarget = new Vector3()) {
        const point = optionalTarget;
        const v0 = this.v0, v1 = this.v1, v2 = this.v2, v3 = this.v3;
        point.set(CubicBezier(t, v0.x, v1.x, v2.x, v3.x), CubicBezier(t, v0.y, v1.y, v2.y, v3.y), CubicBezier(t, v0.z, v1.z, v2.z, v3.z));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        this.v3.copy(source.v3);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v0 = this.v0.toArray();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        data.v3 = this.v3.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v0.fromArray(json.v0);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        this.v3.fromArray(json.v3);
        return this;
    }
}
class LineCurve extends Curve {
    constructor(v1 = new Vector2(), v2 = new Vector2()){
        super();
        this.isLineCurve = true;
        this.type = 'LineCurve';
        this.v1 = v1;
        this.v2 = v2;
    }
    getPoint(t, optionalTarget = new Vector2()) {
        const point = optionalTarget;
        if (1 === t) point.copy(this.v2);
        else {
            point.copy(this.v2).sub(this.v1);
            point.multiplyScalar(t).add(this.v1);
        }
        return point;
    }
    getPointAt(u, optionalTarget) {
        return this.getPoint(u, optionalTarget);
    }
    getTangent(t, optionalTarget = new Vector2()) {
        return optionalTarget.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(u, optionalTarget) {
        return this.getTangent(u, optionalTarget);
    }
    copy(source) {
        super.copy(source);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        return this;
    }
}
class LineCurve3 extends Curve {
    constructor(v1 = new Vector3(), v2 = new Vector3()){
        super();
        this.isLineCurve3 = true;
        this.type = 'LineCurve3';
        this.v1 = v1;
        this.v2 = v2;
    }
    getPoint(t, optionalTarget = new Vector3()) {
        const point = optionalTarget;
        if (1 === t) point.copy(this.v2);
        else {
            point.copy(this.v2).sub(this.v1);
            point.multiplyScalar(t).add(this.v1);
        }
        return point;
    }
    getPointAt(u, optionalTarget) {
        return this.getPoint(u, optionalTarget);
    }
    getTangent(t, optionalTarget = new Vector3()) {
        return optionalTarget.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(u, optionalTarget) {
        return this.getTangent(u, optionalTarget);
    }
    copy(source) {
        super.copy(source);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        return this;
    }
}
class QuadraticBezierCurve extends Curve {
    constructor(v0 = new Vector2(), v1 = new Vector2(), v2 = new Vector2()){
        super();
        this.isQuadraticBezierCurve = true;
        this.type = 'QuadraticBezierCurve';
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
    }
    getPoint(t, optionalTarget = new Vector2()) {
        const point = optionalTarget;
        const v0 = this.v0, v1 = this.v1, v2 = this.v2;
        point.set(QuadraticBezier(t, v0.x, v1.x, v2.x), QuadraticBezier(t, v0.y, v1.y, v2.y));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v0 = this.v0.toArray();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v0.fromArray(json.v0);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        return this;
    }
}
class QuadraticBezierCurve3 extends Curve {
    constructor(v0 = new Vector3(), v1 = new Vector3(), v2 = new Vector3()){
        super();
        this.isQuadraticBezierCurve3 = true;
        this.type = 'QuadraticBezierCurve3';
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
    }
    getPoint(t, optionalTarget = new Vector3()) {
        const point = optionalTarget;
        const v0 = this.v0, v1 = this.v1, v2 = this.v2;
        point.set(QuadraticBezier(t, v0.x, v1.x, v2.x), QuadraticBezier(t, v0.y, v1.y, v2.y), QuadraticBezier(t, v0.z, v1.z, v2.z));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v0 = this.v0.toArray();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v0.fromArray(json.v0);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        return this;
    }
}
class SplineCurve extends Curve {
    constructor(points = []){
        super();
        this.isSplineCurve = true;
        this.type = 'SplineCurve';
        this.points = points;
    }
    getPoint(t, optionalTarget = new Vector2()) {
        const point = optionalTarget;
        const points = this.points;
        const p = (points.length - 1) * t;
        const intPoint = Math.floor(p);
        const weight = p - intPoint;
        const p0 = points[0 === intPoint ? intPoint : intPoint - 1];
        const p1 = points[intPoint];
        const p2 = points[intPoint > points.length - 2 ? points.length - 1 : intPoint + 1];
        const p3 = points[intPoint > points.length - 3 ? points.length - 1 : intPoint + 2];
        point.set(CatmullRom(weight, p0.x, p1.x, p2.x, p3.x), CatmullRom(weight, p0.y, p1.y, p2.y, p3.y));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.points = [];
        for(let i = 0, l = source.points.length; i < l; i++){
            const point = source.points[i];
            this.points.push(point.clone());
        }
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.points = [];
        for(let i = 0, l = this.points.length; i < l; i++){
            const point = this.points[i];
            data.points.push(point.toArray());
        }
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.points = [];
        for(let i = 0, l = json.points.length; i < l; i++){
            const point = json.points[i];
            this.points.push(new Vector2().fromArray(point));
        }
        return this;
    }
}
function convertArray(array, type, forceClone) {
    if (!array || !forceClone && array.constructor === type) return array;
    if ('number' == typeof type.BYTES_PER_ELEMENT) return new type(array);
    return Array.prototype.slice.call(array);
}
function isTypedArray(object) {
    return ArrayBuffer.isView(object) && !(object instanceof DataView);
}
class Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        this.parameterPositions = parameterPositions;
        this._cachedIndex = 0;
        this.resultBuffer = void 0 !== resultBuffer ? resultBuffer : new sampleValues.constructor(sampleSize);
        this.sampleValues = sampleValues;
        this.valueSize = sampleSize;
        this.settings = null;
        this.DefaultSettings_ = {};
    }
    evaluate(t) {
        const pp = this.parameterPositions;
        let i1 = this._cachedIndex, t1 = pp[i1], t0 = pp[i1 - 1];
        validate_interval: {
            seek: {
                let right;
                linear_scan: {
                    forward_scan: if (!(t < t1)) {
                        for(let giveUpAt = i1 + 2;;){
                            if (void 0 === t1) {
                                if (t < t0) break forward_scan;
                                i1 = pp.length;
                                this._cachedIndex = i1;
                                return this.copySampleValue_(i1 - 1);
                            }
                            if (i1 === giveUpAt) break;
                            t0 = t1;
                            t1 = pp[++i1];
                            if (t < t1) break seek;
                        }
                        right = pp.length;
                        break linear_scan;
                    }
                    if (!(t >= t0)) {
                        const t1global = pp[1];
                        if (t < t1global) {
                            i1 = 2;
                            t0 = t1global;
                        }
                        for(let giveUpAt = i1 - 2;;){
                            if (void 0 === t0) {
                                this._cachedIndex = 0;
                                return this.copySampleValue_(0);
                            }
                            if (i1 === giveUpAt) break;
                            t1 = t0;
                            t0 = pp[--i1 - 1];
                            if (t >= t0) break seek;
                        }
                        right = i1;
                        i1 = 0;
                        break linear_scan;
                    }
                    break validate_interval;
                }
                while(i1 < right){
                    const mid = i1 + right >>> 1;
                    if (t < pp[mid]) right = mid;
                    else i1 = mid + 1;
                }
                t1 = pp[i1];
                t0 = pp[i1 - 1];
                if (void 0 === t0) {
                    this._cachedIndex = 0;
                    return this.copySampleValue_(0);
                }
                if (void 0 === t1) {
                    i1 = pp.length;
                    this._cachedIndex = i1;
                    return this.copySampleValue_(i1 - 1);
                }
            }
            this._cachedIndex = i1;
            this.intervalChanged_(i1, t0, t1);
        }
        return this.interpolate_(i1, t0, t, t1);
    }
    getSettings_() {
        return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(index) {
        const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset = index * stride;
        for(let i = 0; i !== stride; ++i)result[i] = values[offset + i];
        return result;
    }
    interpolate_() {
        throw new Error('call to abstract method');
    }
    intervalChanged_() {}
}
class CubicInterpolant extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
        this._weightPrev = -0;
        this._offsetPrev = -0;
        this._weightNext = -0;
        this._offsetNext = -0;
        this.DefaultSettings_ = {
            endingStart: ZeroCurvatureEnding,
            endingEnd: ZeroCurvatureEnding
        };
    }
    intervalChanged_(i1, t0, t1) {
        const pp = this.parameterPositions;
        let iPrev = i1 - 2, iNext = i1 + 1, tPrev = pp[iPrev], tNext = pp[iNext];
        if (void 0 === tPrev) switch(this.getSettings_().endingStart){
            case ZeroSlopeEnding:
                iPrev = i1;
                tPrev = 2 * t0 - t1;
                break;
            case WrapAroundEnding:
                iPrev = pp.length - 2;
                tPrev = t0 + pp[iPrev] - pp[iPrev + 1];
                break;
            default:
                iPrev = i1;
                tPrev = t1;
        }
        if (void 0 === tNext) switch(this.getSettings_().endingEnd){
            case ZeroSlopeEnding:
                iNext = i1;
                tNext = 2 * t1 - t0;
                break;
            case WrapAroundEnding:
                iNext = 1;
                tNext = t1 + pp[1] - pp[0];
                break;
            default:
                iNext = i1 - 1;
                tNext = t0;
        }
        const halfDt = (t1 - t0) * 0.5, stride = this.valueSize;
        this._weightPrev = halfDt / (t0 - tPrev);
        this._weightNext = halfDt / (tNext - t1);
        this._offsetPrev = iPrev * stride;
        this._offsetNext = iNext * stride;
    }
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, o1 = i1 * stride, o0 = o1 - stride, oP = this._offsetPrev, oN = this._offsetNext, wP = this._weightPrev, wN = this._weightNext, p = (t - t0) / (t1 - t0), pp = p * p, ppp = pp * p;
        const sP = -wP * ppp + 2 * wP * pp - wP * p;
        const s0 = (1 + wP) * ppp + (-1.5 - 2 * wP) * pp + (-0.5 + wP) * p + 1;
        const s1 = (-1 - wN) * ppp + (1.5 + wN) * pp + 0.5 * p;
        const sN = wN * ppp - wN * pp;
        for(let i = 0; i !== stride; ++i)result[i] = sP * values[oP + i] + s0 * values[o0 + i] + s1 * values[o1 + i] + sN * values[oN + i];
        return result;
    }
}
class LinearInterpolant extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset1 = i1 * stride, offset0 = offset1 - stride, weight1 = (t - t0) / (t1 - t0), weight0 = 1 - weight1;
        for(let i = 0; i !== stride; ++i)result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
        return result;
    }
}
class DiscreteInterpolant extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    interpolate_(i1) {
        return this.copySampleValue_(i1 - 1);
    }
}
class KeyframeTrack {
    constructor(name, times, values, interpolation){
        if (void 0 === name) throw new Error('THREE.KeyframeTrack: track name is undefined');
        if (void 0 === times || 0 === times.length) throw new Error('THREE.KeyframeTrack: no keyframes in track named ' + name);
        this.name = name;
        this.times = convertArray(times, this.TimeBufferType);
        this.values = convertArray(values, this.ValueBufferType);
        this.setInterpolation(interpolation || this.DefaultInterpolation);
    }
    static toJSON(track) {
        const trackType = track.constructor;
        let json;
        if (trackType.toJSON !== this.toJSON) json = trackType.toJSON(track);
        else {
            json = {
                name: track.name,
                times: convertArray(track.times, Array),
                values: convertArray(track.values, Array)
            };
            const interpolation = track.getInterpolation();
            if (interpolation !== track.DefaultInterpolation) json.interpolation = interpolation;
        }
        json.type = track.ValueTypeName;
        return json;
    }
    InterpolantFactoryMethodDiscrete(result) {
        return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), result);
    }
    InterpolantFactoryMethodLinear(result) {
        return new LinearInterpolant(this.times, this.values, this.getValueSize(), result);
    }
    InterpolantFactoryMethodSmooth(result) {
        return new CubicInterpolant(this.times, this.values, this.getValueSize(), result);
    }
    setInterpolation(interpolation) {
        let factoryMethod;
        switch(interpolation){
            case InterpolateDiscrete:
                factoryMethod = this.InterpolantFactoryMethodDiscrete;
                break;
            case InterpolateLinear:
                factoryMethod = this.InterpolantFactoryMethodLinear;
                break;
            case InterpolateSmooth:
                factoryMethod = this.InterpolantFactoryMethodSmooth;
                break;
        }
        if (void 0 === factoryMethod) {
            const message = 'unsupported interpolation for ' + this.ValueTypeName + ' keyframe track named ' + this.name;
            if (void 0 === this.createInterpolant) if (interpolation !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
            else throw new Error(message);
            console.warn('THREE.KeyframeTrack:', message);
            return this;
        }
        this.createInterpolant = factoryMethod;
        return this;
    }
    getInterpolation() {
        switch(this.createInterpolant){
            case this.InterpolantFactoryMethodDiscrete:
                return InterpolateDiscrete;
            case this.InterpolantFactoryMethodLinear:
                return InterpolateLinear;
            case this.InterpolantFactoryMethodSmooth:
                return InterpolateSmooth;
        }
    }
    getValueSize() {
        return this.values.length / this.times.length;
    }
    shift(timeOffset) {
        if (0.0 !== timeOffset) {
            const times = this.times;
            for(let i = 0, n = times.length; i !== n; ++i)times[i] += timeOffset;
        }
        return this;
    }
    scale(timeScale) {
        if (1.0 !== timeScale) {
            const times = this.times;
            for(let i = 0, n = times.length; i !== n; ++i)times[i] *= timeScale;
        }
        return this;
    }
    trim(startTime, endTime) {
        const times = this.times, nKeys = times.length;
        let from = 0, to = nKeys - 1;
        while(from !== nKeys && times[from] < startTime)++from;
        while(-1 !== to && times[to] > endTime)--to;
        ++to;
        if (0 !== from || to !== nKeys) {
            if (from >= to) {
                to = Math.max(to, 1);
                from = to - 1;
            }
            const stride = this.getValueSize();
            this.times = times.slice(from, to);
            this.values = this.values.slice(from * stride, to * stride);
        }
        return this;
    }
    validate() {
        let valid = true;
        const valueSize = this.getValueSize();
        if (valueSize - Math.floor(valueSize) !== 0) {
            console.error('THREE.KeyframeTrack: Invalid value size in track.', this);
            valid = false;
        }
        const times = this.times, values = this.values, nKeys = times.length;
        if (0 === nKeys) {
            console.error('THREE.KeyframeTrack: Track is empty.', this);
            valid = false;
        }
        let prevTime = null;
        for(let i = 0; i !== nKeys; i++){
            const currTime = times[i];
            if ('number' == typeof currTime && isNaN(currTime)) {
                console.error('THREE.KeyframeTrack: Time is not a valid number.', this, i, currTime);
                valid = false;
                break;
            }
            if (null !== prevTime && prevTime > currTime) {
                console.error('THREE.KeyframeTrack: Out of order keys.', this, i, currTime, prevTime);
                valid = false;
                break;
            }
            prevTime = currTime;
        }
        if (void 0 !== values) {
            if (isTypedArray(values)) for(let i = 0, n = values.length; i !== n; ++i){
                const value = values[i];
                if (isNaN(value)) {
                    console.error('THREE.KeyframeTrack: Value is not a valid number.', this, i, value);
                    valid = false;
                    break;
                }
            }
        }
        return valid;
    }
    optimize() {
        const times = this.times.slice(), values = this.values.slice(), stride = this.getValueSize(), smoothInterpolation = this.getInterpolation() === InterpolateSmooth, lastIndex = times.length - 1;
        let writeIndex = 1;
        for(let i = 1; i < lastIndex; ++i){
            let keep = false;
            const time = times[i];
            const timeNext = times[i + 1];
            if (time !== timeNext && (1 !== i || time !== times[0])) if (smoothInterpolation) keep = true;
            else {
                const offset = i * stride, offsetP = offset - stride, offsetN = offset + stride;
                for(let j = 0; j !== stride; ++j){
                    const value = values[offset + j];
                    if (value !== values[offsetP + j] || value !== values[offsetN + j]) {
                        keep = true;
                        break;
                    }
                }
            }
            if (keep) {
                if (i !== writeIndex) {
                    times[writeIndex] = times[i];
                    const readOffset = i * stride, writeOffset = writeIndex * stride;
                    for(let j = 0; j !== stride; ++j)values[writeOffset + j] = values[readOffset + j];
                }
                ++writeIndex;
            }
        }
        if (lastIndex > 0) {
            times[writeIndex] = times[lastIndex];
            for(let readOffset = lastIndex * stride, writeOffset = writeIndex * stride, j = 0; j !== stride; ++j)values[writeOffset + j] = values[readOffset + j];
            ++writeIndex;
        }
        if (writeIndex !== times.length) {
            this.times = times.slice(0, writeIndex);
            this.values = values.slice(0, writeIndex * stride);
        } else {
            this.times = times;
            this.values = values;
        }
        return this;
    }
    clone() {
        const times = this.times.slice();
        const values = this.values.slice();
        const TypedKeyframeTrack = this.constructor;
        const track = new TypedKeyframeTrack(this.name, times, values);
        track.createInterpolant = this.createInterpolant;
        return track;
    }
}
KeyframeTrack.prototype.TimeBufferType = Float32Array;
KeyframeTrack.prototype.ValueBufferType = Float32Array;
KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
class BooleanKeyframeTrack extends KeyframeTrack {
    constructor(name, times, values){
        super(name, times, values);
    }
}
BooleanKeyframeTrack.prototype.ValueTypeName = 'bool';
BooleanKeyframeTrack.prototype.ValueBufferType = Array;
BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
class ColorKeyframeTrack extends KeyframeTrack {
}
ColorKeyframeTrack.prototype.ValueTypeName = 'color';
class NumberKeyframeTrack extends KeyframeTrack {
}
NumberKeyframeTrack.prototype.ValueTypeName = 'number';
class QuaternionLinearInterpolant extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, alpha = (t - t0) / (t1 - t0);
        let offset = i1 * stride;
        for(let end = offset + stride; offset !== end; offset += 4)Quaternion.slerpFlat(result, 0, values, offset - stride, values, offset, alpha);
        return result;
    }
}
class QuaternionKeyframeTrack extends KeyframeTrack {
    InterpolantFactoryMethodLinear(result) {
        return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), result);
    }
}
QuaternionKeyframeTrack.prototype.ValueTypeName = 'quaternion';
QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
class StringKeyframeTrack extends KeyframeTrack {
    constructor(name, times, values){
        super(name, times, values);
    }
}
StringKeyframeTrack.prototype.ValueTypeName = 'string';
StringKeyframeTrack.prototype.ValueBufferType = Array;
StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
class VectorKeyframeTrack extends KeyframeTrack {
}
VectorKeyframeTrack.prototype.ValueTypeName = 'vector';
class LoadingManager {
    constructor(onLoad, onProgress, onError){
        const scope = this;
        let isLoading = false;
        let itemsLoaded = 0;
        let itemsTotal = 0;
        let urlModifier;
        const handlers = [];
        this.onStart = void 0;
        this.onLoad = onLoad;
        this.onProgress = onProgress;
        this.onError = onError;
        this.itemStart = function(url) {
            itemsTotal++;
            if (false === isLoading) {
                if (void 0 !== scope.onStart) scope.onStart(url, itemsLoaded, itemsTotal);
            }
            isLoading = true;
        };
        this.itemEnd = function(url) {
            itemsLoaded++;
            if (void 0 !== scope.onProgress) scope.onProgress(url, itemsLoaded, itemsTotal);
            if (itemsLoaded === itemsTotal) {
                isLoading = false;
                if (void 0 !== scope.onLoad) scope.onLoad();
            }
        };
        this.itemError = function(url) {
            if (void 0 !== scope.onError) scope.onError(url);
        };
        this.resolveURL = function(url) {
            if (urlModifier) return urlModifier(url);
            return url;
        };
        this.setURLModifier = function(transform) {
            urlModifier = transform;
            return this;
        };
        this.addHandler = function(regex, loader) {
            handlers.push(regex, loader);
            return this;
        };
        this.removeHandler = function(regex) {
            const index = handlers.indexOf(regex);
            if (-1 !== index) handlers.splice(index, 2);
            return this;
        };
        this.getHandler = function(file) {
            for(let i = 0, l = handlers.length; i < l; i += 2){
                const regex = handlers[i];
                const loader = handlers[i + 1];
                if (regex.global) regex.lastIndex = 0;
                if (regex.test(file)) return loader;
            }
            return null;
        };
    }
}
const DefaultLoadingManager = /*@__PURE__*/ new LoadingManager();
class Loader {
    constructor(manager){
        this.manager = void 0 !== manager ? manager : DefaultLoadingManager;
        this.crossOrigin = 'anonymous';
        this.withCredentials = false;
        this.path = '';
        this.resourcePath = '';
        this.requestHeader = {};
    }
    load() {}
    loadAsync(url, onProgress) {
        const scope = this;
        return new Promise(function(resolve, reject) {
            scope.load(url, resolve, onProgress, reject);
        });
    }
    parse() {}
    setCrossOrigin(crossOrigin) {
        this.crossOrigin = crossOrigin;
        return this;
    }
    setWithCredentials(value) {
        this.withCredentials = value;
        return this;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    setResourcePath(resourcePath) {
        this.resourcePath = resourcePath;
        return this;
    }
    setRequestHeader(requestHeader) {
        this.requestHeader = requestHeader;
        return this;
    }
}
Loader.DEFAULT_MATERIAL_NAME = '__DEFAULT';
const _RESERVED_CHARS_RE = '\\[\\]\\.:\\/';
const _reservedRe = new RegExp('[' + _RESERVED_CHARS_RE + ']', 'g');
const _wordChar = '[^' + _RESERVED_CHARS_RE + ']';
const _wordCharOrDot = '[^' + _RESERVED_CHARS_RE.replace('\\.', '') + ']';
const _directoryRe = /*@__PURE__*/ /((?:WC+[\/:])*)/.source.replace('WC', _wordChar);
const _nodeRe = /*@__PURE__*/ /(WCOD+)?/.source.replace('WCOD', _wordCharOrDot);
const _objectRe = /*@__PURE__*/ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace('WC', _wordChar);
const _propertyRe = /*@__PURE__*/ /\.(WC+)(?:\[(.+)\])?/.source.replace('WC', _wordChar);
const _trackRe = new RegExp("^" + _directoryRe + _nodeRe + _objectRe + _propertyRe + '$');
const _supportedObjectNames = [
    'material',
    'materials',
    'bones',
    'map'
];
class Composite {
    constructor(targetGroup, path, optionalParsedPath){
        const parsedPath = optionalParsedPath || PropertyBinding.parseTrackName(path);
        this._targetGroup = targetGroup;
        this._bindings = targetGroup.subscribe_(path, parsedPath);
    }
    getValue(array, offset) {
        this.bind();
        const firstValidIndex = this._targetGroup.nCachedObjects_, binding = this._bindings[firstValidIndex];
        if (void 0 !== binding) binding.getValue(array, offset);
    }
    setValue(array, offset) {
        const bindings = this._bindings;
        for(let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i)bindings[i].setValue(array, offset);
    }
    bind() {
        const bindings = this._bindings;
        for(let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i)bindings[i].bind();
    }
    unbind() {
        const bindings = this._bindings;
        for(let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i)bindings[i].unbind();
    }
}
class PropertyBinding {
    constructor(rootNode, path, parsedPath){
        this.path = path;
        this.parsedPath = parsedPath || PropertyBinding.parseTrackName(path);
        this.node = PropertyBinding.findNode(rootNode, this.parsedPath.nodeName);
        this.rootNode = rootNode;
        this.getValue = this._getValue_unbound;
        this.setValue = this._setValue_unbound;
    }
    static create(root, path, parsedPath) {
        if (!(root && root.isAnimationObjectGroup)) return new PropertyBinding(root, path, parsedPath);
        return new PropertyBinding.Composite(root, path, parsedPath);
    }
    static sanitizeNodeName(name) {
        return name.replace(/\s/g, '_').replace(_reservedRe, '');
    }
    static parseTrackName(trackName) {
        const matches = _trackRe.exec(trackName);
        if (null === matches) throw new Error('PropertyBinding: Cannot parse trackName: ' + trackName);
        const results = {
            nodeName: matches[2],
            objectName: matches[3],
            objectIndex: matches[4],
            propertyName: matches[5],
            propertyIndex: matches[6]
        };
        const lastDot = results.nodeName && results.nodeName.lastIndexOf('.');
        if (void 0 !== lastDot && -1 !== lastDot) {
            const objectName = results.nodeName.substring(lastDot + 1);
            if (-1 !== _supportedObjectNames.indexOf(objectName)) {
                results.nodeName = results.nodeName.substring(0, lastDot);
                results.objectName = objectName;
            }
        }
        if (null === results.propertyName || 0 === results.propertyName.length) throw new Error('PropertyBinding: can not parse propertyName from trackName: ' + trackName);
        return results;
    }
    static findNode(root, nodeName) {
        if (void 0 === nodeName || '' === nodeName || '.' === nodeName || -1 === nodeName || nodeName === root.name || nodeName === root.uuid) return root;
        if (root.skeleton) {
            const bone = root.skeleton.getBoneByName(nodeName);
            if (void 0 !== bone) return bone;
        }
        if (root.children) {
            const searchNodeSubtree = function(children) {
                for(let i = 0; i < children.length; i++){
                    const childNode = children[i];
                    if (childNode.name === nodeName || childNode.uuid === nodeName) return childNode;
                    const result = searchNodeSubtree(childNode.children);
                    if (result) return result;
                }
                return null;
            };
            const subTreeNode = searchNodeSubtree(root.children);
            if (subTreeNode) return subTreeNode;
        }
        return null;
    }
    _getValue_unavailable() {}
    _setValue_unavailable() {}
    _getValue_direct(buffer, offset) {
        buffer[offset] = this.targetObject[this.propertyName];
    }
    _getValue_array(buffer, offset) {
        const source = this.resolvedProperty;
        for(let i = 0, n = source.length; i !== n; ++i)buffer[offset++] = source[i];
    }
    _getValue_arrayElement(buffer, offset) {
        buffer[offset] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(buffer, offset) {
        this.resolvedProperty.toArray(buffer, offset);
    }
    _setValue_direct(buffer, offset) {
        this.targetObject[this.propertyName] = buffer[offset];
    }
    _setValue_direct_setNeedsUpdate(buffer, offset) {
        this.targetObject[this.propertyName] = buffer[offset];
        this.targetObject.needsUpdate = true;
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(buffer, offset) {
        this.targetObject[this.propertyName] = buffer[offset];
        this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_array(buffer, offset) {
        const dest = this.resolvedProperty;
        for(let i = 0, n = dest.length; i !== n; ++i)dest[i] = buffer[offset++];
    }
    _setValue_array_setNeedsUpdate(buffer, offset) {
        const dest = this.resolvedProperty;
        for(let i = 0, n = dest.length; i !== n; ++i)dest[i] = buffer[offset++];
        this.targetObject.needsUpdate = true;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(buffer, offset) {
        const dest = this.resolvedProperty;
        for(let i = 0, n = dest.length; i !== n; ++i)dest[i] = buffer[offset++];
        this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_arrayElement(buffer, offset) {
        this.resolvedProperty[this.propertyIndex] = buffer[offset];
    }
    _setValue_arrayElement_setNeedsUpdate(buffer, offset) {
        this.resolvedProperty[this.propertyIndex] = buffer[offset];
        this.targetObject.needsUpdate = true;
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer, offset) {
        this.resolvedProperty[this.propertyIndex] = buffer[offset];
        this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_fromArray(buffer, offset) {
        this.resolvedProperty.fromArray(buffer, offset);
    }
    _setValue_fromArray_setNeedsUpdate(buffer, offset) {
        this.resolvedProperty.fromArray(buffer, offset);
        this.targetObject.needsUpdate = true;
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(buffer, offset) {
        this.resolvedProperty.fromArray(buffer, offset);
        this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _getValue_unbound(targetArray, offset) {
        this.bind();
        this.getValue(targetArray, offset);
    }
    _setValue_unbound(sourceArray, offset) {
        this.bind();
        this.setValue(sourceArray, offset);
    }
    bind() {
        let targetObject = this.node;
        const parsedPath = this.parsedPath;
        const objectName = parsedPath.objectName;
        const propertyName = parsedPath.propertyName;
        let propertyIndex = parsedPath.propertyIndex;
        if (!targetObject) {
            targetObject = PropertyBinding.findNode(this.rootNode, parsedPath.nodeName);
            this.node = targetObject;
        }
        this.getValue = this._getValue_unavailable;
        this.setValue = this._setValue_unavailable;
        if (!targetObject) return void console.warn('THREE.PropertyBinding: No target node found for track: ' + this.path + '.');
        if (objectName) {
            let objectIndex = parsedPath.objectIndex;
            switch(objectName){
                case 'materials':
                    if (!targetObject.material) return void console.error('THREE.PropertyBinding: Can not bind to material as node does not have a material.', this);
                    if (!targetObject.material.materials) return void console.error('THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.', this);
                    targetObject = targetObject.material.materials;
                    break;
                case 'bones':
                    if (!targetObject.skeleton) return void console.error('THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.', this);
                    targetObject = targetObject.skeleton.bones;
                    for(let i = 0; i < targetObject.length; i++)if (targetObject[i].name === objectIndex) {
                        objectIndex = i;
                        break;
                    }
                    break;
                case 'map':
                    if ('map' in targetObject) {
                        targetObject = targetObject.map;
                        break;
                    }
                    if (!targetObject.material) return void console.error('THREE.PropertyBinding: Can not bind to material as node does not have a material.', this);
                    if (!targetObject.material.map) return void console.error('THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.', this);
                    targetObject = targetObject.material.map;
                    break;
                default:
                    if (void 0 === targetObject[objectName]) return void console.error('THREE.PropertyBinding: Can not bind to objectName of node undefined.', this);
                    targetObject = targetObject[objectName];
            }
            if (void 0 !== objectIndex) {
                if (void 0 === targetObject[objectIndex]) return void console.error('THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.', this, targetObject);
                targetObject = targetObject[objectIndex];
            }
        }
        const nodeProperty = targetObject[propertyName];
        if (void 0 === nodeProperty) {
            const nodeName = parsedPath.nodeName;
            console.error('THREE.PropertyBinding: Trying to update property for track: ' + nodeName + '.' + propertyName + ' but it wasn\'t found.', targetObject);
            return;
        }
        let versioning = this.Versioning.None;
        this.targetObject = targetObject;
        if (true === targetObject.isMaterial) versioning = this.Versioning.NeedsUpdate;
        else if (true === targetObject.isObject3D) versioning = this.Versioning.MatrixWorldNeedsUpdate;
        let bindingType = this.BindingType.Direct;
        if (void 0 !== propertyIndex) {
            if ('morphTargetInfluences' === propertyName) {
                if (!targetObject.geometry) return void console.error('THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.', this);
                if (!targetObject.geometry.morphAttributes) return void console.error('THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.', this);
                if (void 0 !== targetObject.morphTargetDictionary[propertyIndex]) propertyIndex = targetObject.morphTargetDictionary[propertyIndex];
            }
            bindingType = this.BindingType.ArrayElement;
            this.resolvedProperty = nodeProperty;
            this.propertyIndex = propertyIndex;
        } else if (void 0 !== nodeProperty.fromArray && void 0 !== nodeProperty.toArray) {
            bindingType = this.BindingType.HasFromToArray;
            this.resolvedProperty = nodeProperty;
        } else if (Array.isArray(nodeProperty)) {
            bindingType = this.BindingType.EntireArray;
            this.resolvedProperty = nodeProperty;
        } else this.propertyName = propertyName;
        this.getValue = this.GetterByBindingType[bindingType];
        this.setValue = this.SetterByBindingTypeAndVersioning[bindingType][versioning];
    }
    unbind() {
        this.node = null;
        this.getValue = this._getValue_unbound;
        this.setValue = this._setValue_unbound;
    }
}
PropertyBinding.Composite = Composite;
PropertyBinding.prototype.BindingType = {
    Direct: 0,
    EntireArray: 1,
    ArrayElement: 2,
    HasFromToArray: 3
};
PropertyBinding.prototype.Versioning = {
    None: 0,
    NeedsUpdate: 1,
    MatrixWorldNeedsUpdate: 2
};
PropertyBinding.prototype.GetterByBindingType = [
    PropertyBinding.prototype._getValue_direct,
    PropertyBinding.prototype._getValue_array,
    PropertyBinding.prototype._getValue_arrayElement,
    PropertyBinding.prototype._getValue_toArray
];
PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [
    [
        PropertyBinding.prototype._setValue_direct,
        PropertyBinding.prototype._setValue_direct_setNeedsUpdate,
        PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate
    ],
    [
        PropertyBinding.prototype._setValue_array,
        PropertyBinding.prototype._setValue_array_setNeedsUpdate,
        PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate
    ],
    [
        PropertyBinding.prototype._setValue_arrayElement,
        PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,
        PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
    ],
    [
        PropertyBinding.prototype._setValue_fromArray,
        PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,
        PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
    ]
];
new Float32Array(1);
if ("u" > typeof __THREE_DEVTOOLS__) __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('register', {
    detail: {
        revision: REVISION
    }
}));
if ("u" > typeof window) if (window.__THREE__) console.warn('WARNING: Multiple instances of Three.js being imported.');
else window.__THREE__ = REVISION;
const qml_material_logger = getLogger('plugin-qml');
let activeThree = null;
let activeTextureFromId = null;
const makeMaterialParams = (three, opts)=>({
        ...opts,
        side: opts.side || three.CullFaceBack,
        uniforms: {
            ...opts.uniforms,
            t: {
                value: null
            }
        },
        transparent: opts.transparent || false,
        lights: opts.lights || false,
        vertexShader: opts.vertexShader || `
		out vec2 tc;
		void main() {
			tc = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
        fragmentShader: opts.fragmentShader || `
		uniform sampler2D t;
		in vec2 tc;
		out vec4 fragColor;
		void main() {
			fragColor = texture(t, tc);
		}
	`,
        glslVersion: opts.glslVersion || '300 es'
    });
class QmlMaterialBase extends ShaderMaterial {
    _textureId = null;
    _texture = null;
    _renderer = null;
    constructor(opts = {}){
        if (!activeThree) throw new Error('QmlMaterial is not initialized.');
        super(makeMaterialParams(activeThree, opts));
    }
    onBeforeCompile(shaderObject, renderer) {
        super.onBeforeCompile(shaderObject, renderer);
        if (!activeTextureFromId) return;
        if (!this._renderer && this._textureId) {
            this._texture = activeTextureFromId(this._textureId, renderer);
            this.shaderUniforms.t.value = this._texture;
        }
        this._renderer = renderer;
    }
    get textureId() {
        return this._textureId;
    }
    set textureId(texId) {
        this._textureId = texId;
        if (this._renderer && this._textureId && activeTextureFromId) {
            this._texture = activeTextureFromId(this._textureId, this._renderer);
            this.shaderUniforms.t.value = this._texture;
        }
    }
    get shaderUniforms() {
        return this.uniforms;
    }
}
const initMaterial = ({ textureFromId, three })=>{
    if (!three) {
        qml_material_logger.error('Can\'t init QmlOverlayMaterial with no `three`.');
        return null;
    }
    activeThree = three;
    activeTextureFromId = textureFromId;
    return QmlMaterialBase;
};
let inited = null;
const qml_material_init = (opts)=>{
    if (inited) return inited;
    inited = initMaterial(opts);
    return inited;
};
const qml_material = qml_material_init;
const qml_overlay_material_logger = getLogger('plugin-qml');
let qml_overlay_material_activeThree = null;
class QmlOverlayMaterialBase extends QmlMaterialBase {
    constructor(opts = {}){
        if (!qml_overlay_material_activeThree) throw new Error('QmlOverlayMaterial is not initialized.');
        super({
            ...opts,
            side: opts.side || qml_overlay_material_activeThree.CullFaceFront,
            depthWrite: opts.depthWrite || false,
            depthTest: opts.depthTest || false,
            transparent: opts.transparent || true,
            vertexShader: opts.vertexShader || `
				out vec2 tc;
				void main() {
					tc = uv;
					gl_Position = vec4(position, 1.0);
				}
			`
        });
    }
}
const qml_overlay_material_initMaterial = (opts)=>{
    const { three } = opts;
    if (!three) {
        qml_overlay_material_logger.error('Can\'t init QmlOverlayMaterial with no `three`.');
        return null;
    }
    const QmlMaterial = qml_material(opts);
    if (!QmlMaterial) return null;
    qml_overlay_material_activeThree = three;
    return QmlOverlayMaterialBase;
};
let qml_overlay_material_inited = null;
const qml_overlay_material_init = (opts)=>{
    if (qml_overlay_material_inited) return qml_overlay_material_inited;
    qml_overlay_material_inited = qml_overlay_material_initMaterial(opts);
    return qml_overlay_material_inited;
};
const qml_overlay_material = qml_overlay_material_init;
const qml_overlay_logger = getLogger('plugin-qml');
const overlayEventNames = [
    'mousedown',
    'mouseup',
    'mousemove',
    'keydown',
    'keyup',
    'wheel'
];
const overlayEventRoutes = {
    mousedown: (view, event)=>view.mousedown(event),
    mouseup: (view, event)=>view.mouseup(event),
    mousemove: (view, event)=>view.mousemove(event),
    keydown: (view, event)=>view.keydown(event),
    keyup: (view, event)=>view.keyup(event),
    wheel: (view, event)=>view.wheel(event)
};
const routeVisibleEvent = (view, name, event)=>{
    overlayEventRoutes[name](view, event);
};
const initOverlay = (opts)=>{
    const { doc, three } = opts;
    if (!doc) {
        qml_overlay_logger.error('Can\'t init QmlOverlayMaterial with no `doc`.');
        return null;
    }
    if (!three) {
        qml_overlay_logger.error('Can\'t init QmlOverlayMaterial with no `three`.');
        return null;
    }
    const release = ()=>doc.makeCurrent();
    const QmlOverlayMaterial = qml_overlay_material(opts);
    if (!QmlOverlayMaterial) return null;
    const Material = QmlOverlayMaterial;
    const threeApi = three;
    class QmlOverlay extends View {
        _isVisible = true;
        _isDisabled = false;
        _mat;
        _mesh;
        constructor(opts = {}){
            release();
            super({
                ...opts,
                width: doc.w,
                height: doc.h
            });
            release();
            this._mat = new Material();
            this._mesh = new threeApi.Mesh(new threeApi.PlaneGeometry(2, 2), this._mat);
            this._mesh.frustumCulled = false;
            this._mesh.renderOrder = 1 / 0;
            doc.on('resize', ({ width, height })=>{
                this.wh = [
                    width,
                    height
                ];
            });
            this._mat.textureId = this.textureId;
            this.on('reset', (textureId)=>{
                release();
                this._mat.textureId = textureId;
            });
            this.on('error', ()=>{});
            for (const name of overlayEventNames)doc.on(name, (event)=>this._routeEvent(name, event));
        }
        _routeEvent(name, event) {
            if (!this._isVisible || this.isDisabled) return void this.emit(name, event);
            routeVisibleEvent(this, name, event);
        }
        get isVisible() {
            return this._isVisible;
        }
        set isVisible(value) {
            this._isVisible = value;
        }
        get isDisabled() {
            return this._isDisabled;
        }
        set isDisabled(value) {
            this._isDisabled = value;
        }
        get material() {
            return this._mat;
        }
        get mesh() {
            return this._mesh;
        }
    }
    return QmlOverlay;
};
let qml_overlay_inited = null;
const qml_overlay_init = (opts)=>{
    if (qml_overlay_inited) return qml_overlay_inited;
    qml_overlay_inited = initOverlay(opts);
    return qml_overlay_inited;
};
const qml_overlay = qml_overlay_init;
const initPlugin = (opts)=>{
    const optsFinal = {
        ...opts,
        cwd: opts.cwd || process.cwd()
    };
    const { doc, gl, cwd, three } = optsFinal;
    if (!three) throw new Error('Failed to initialize @node-3d/plugin-qml without three.');
    const release = ()=>doc.makeCurrent();
    View.init(cwd, doc.platformWindow, doc.platformContext, doc.platformDevice);
    View.style('Basic');
    release();
    const loop = (cb)=>{
        let next = null;
        const loopFunc = ()=>{
            View.update();
            doc.makeCurrent();
            cb();
            next = doc.requestAnimationFrame(loopFunc);
        };
        next = doc.requestAnimationFrame(loopFunc);
        return ()=>{
            if (null !== next) doc.cancelAnimationFrame(next);
        };
    };
    const textureFromId = (id, renderer)=>{
        const WebGLTexture = gl.WebGLTexture;
        const rawTexture = new WebGLTexture(id);
        const texture = new three.Texture();
        const properties = renderer.properties?.get(texture) ?? texture;
        properties['__webglTexture'] = rawTexture;
        properties['__webglInit'] = true;
        return texture;
    };
    const QmlMaterial = qml_material({
        textureFromId,
        three
    });
    const QmlOverlayMaterial = qml_overlay_material({
        textureFromId,
        three
    });
    const QmlOverlay = qml_overlay({
        doc,
        textureFromId,
        three
    });
    if (!QmlMaterial || !QmlOverlayMaterial || !QmlOverlay) throw new Error('Failed to initialize @node-3d/plugin-qml classes.');
    return {
        View: View,
        Property: Property,
        Method: Method,
        release,
        loop,
        textureFromId,
        QmlMaterial,
        QmlOverlayMaterial,
        QmlOverlay
    };
};
let ts_inited = null;
const ts_init = (opts)=>{
    if (ts_inited) return ts_inited;
    ts_inited = initPlugin(opts);
    return ts_inited;
};
const ts = {
    init: ts_init
};
export default ts;
export { ts_init as init };
