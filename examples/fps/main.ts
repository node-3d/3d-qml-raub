// Based on https://threejs.org/examples/?q=fps#games_fps
'use strict';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as three from 'three';
import { init, addThreeHelpers } from '3d-core-raub';
import { init as initQml } from '3d-qml-raub';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Octree } from 'three/addons/math/Octree.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';
import { Capsule } from 'three/addons/math/Capsule.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

const {
	doc, Image: Img, gl, glfw,
} = init({
	isGles3: true,
	isWebGL2: true,
});

addThreeHelpers(three, gl);

doc.setPointerCapture();

const { QmlOverlay, Property, loop, release } = initQml({ doc, gl, cwd: __dirname, three });

const icon = new Img(__dirname + '/../qml.png');
icon.on('load', () => { doc.icon = icon; });
doc.title = 'QML FPS';

const clock = new three.Clock();

const scene = new three.Scene();
scene.background = new three.Color(0x88ccee);
scene.fog = new three.Fog(0x88ccee, 0, 50);

const overlay = new QmlOverlay({ file: `${__dirname}/qml/Hud.qml` });
scene.add(overlay.mesh);

overlay.on('custom-esc', (event) => {
    release();
    if (event.button === 'resume') {
        hudState = 'hud';
        propHudMode.value = hudState;
        doc.setPointerCapture();
    }
    if (event.button === 'quit') {
        process.exit(0)
    }
});

type THudState = 'hud' | 'esc';
let hudState: THudState = 'hud';

const propHudMode = new Property<THudState>({
    view: overlay, name: 'hud', key: 'mode', value: hudState,
});

const camera = new three.PerspectiveCamera(95, doc.w / doc.h, 0.1, 1000);
camera.rotation.order = 'YXZ';

const fillLight1 = new three.HemisphereLight(0x8dc1de, 0x00668d, 1.5);
fillLight1.position.set(2, 1, 1);
scene.add(fillLight1);

const directionalLight = new three.DirectionalLight(0xffffff, 2.5);
directionalLight.position.set(-5, 25, -1);
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = 0.01;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.right = 30;
directionalLight.shadow.camera.left = -30;
directionalLight.shadow.camera.top	= 30;
directionalLight.shadow.camera.bottom = -30;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.radius = 4;
directionalLight.shadow.bias = -0.00006;
scene.add(directionalLight);

const renderer = new three.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(doc.w, doc.h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = three.VSMShadowMap;
renderer.toneMapping = three.ACESFilmicToneMapping;

const GRAVITY = 30;
const NUM_SPHERES = 100;
const SPHERE_RADIUS = 0.2;
const STEPS_PER_FRAME = 5;

const sphereGeometry = new three.IcosahedronGeometry(SPHERE_RADIUS, 5);
const sphereMaterial = new three.MeshLambertMaterial({ color: 0xdede8d });

type TSphere = {
    mesh: three.Mesh,
    collider: three.Sphere,
    velocity: three.Vector3
};
const spheres: TSphere[] = [];
let sphereIdx = 0;

for (let i = 0; i < NUM_SPHERES; i ++) {
    const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    
    scene.add(sphere);
    
    spheres.push({
        mesh: sphere,
        collider: new three.Sphere(new three.Vector3(0, - 100, 0), SPHERE_RADIUS),
        velocity: new three.Vector3(),
    });
}

const worldOctree = new Octree();
const playerCollider = new Capsule(new three.Vector3(0, 0.35, 0), new three.Vector3(0, 1, 0), 0.35);
const playerVelocity = new three.Vector3();
const playerDirection = new three.Vector3();
let playerOnFloor = false;
let mouseTime = 0;
const keyStates: Record<string, boolean> = {};
const vector1 = new three.Vector3();
const vector2 = new three.Vector3();
const vector3 = new three.Vector3();


doc.on('keydown', (e) => {
    release();
    if (hudState !== 'hud') {
        return;
    }
    keyStates[e['keyCode']] = true;
});


doc.on('keyup', (e) => {
    release();
    keyStates[e['keyCode']] = false;
    if (e['keyCode'] === glfw.extraCodes[glfw.KEY_ESCAPE]) {
        hudState = hudState === 'hud' ? 'esc' : 'hud';
        if (hudState === 'hud') {
            doc.setPointerCapture();
        } else {
            doc.releasePointerCapture();
        }
        propHudMode.value = hudState;
    }
});


doc.on('mousedown', () => {
    if (hudState !== 'hud') {
        return;
    }
    release();
    mouseTime = Date.now();
});


doc.on('mouseup', () => {
    if (hudState !== 'hud') {
        return;
    }
    release();
    throwBall();
});

const pitchLimitRad: number = Math.PI * 0.5 - 0.05;

doc.on('mousemove', (event) => {
    if (hudState !== 'hud') {
        return;
    }
    release();
    
    const newYaw: number = camera.rotation.y - event['movementX'] * 0.001;
    const newPitch: number = camera.rotation.x - event['movementY'] * 0.001;
    
    camera.rotation.y = newYaw;
    camera.rotation.x = Math.min(pitchLimitRad, Math.max(-pitchLimitRad, newPitch));
});

doc.on('resize', () => {
    release();
    camera.aspect = doc.w / doc.h;
    camera.updateProjectionMatrix();
    renderer.setSize(doc.w, doc.h);
});


const throwBall = () => {
    if (!mouseTime) {
        return;
    }
    
    const sphere = spheres[sphereIdx];
    camera.getWorldDirection(playerDirection);
    sphere.collider.center.copy(playerCollider.end).addScaledVector(playerDirection, playerCollider.radius * 1.5);
    
    // throw the ball with more force if we hold the button longer, and if we move forward
    const impulse = 5 + 50 * (1 - Math.exp((mouseTime - Date.now()) * 0.001));
    mouseTime = 0;
    
    sphere.velocity.copy(playerDirection).multiplyScalar(impulse);
    sphere.velocity.addScaledVector(playerVelocity, 2);
    
    sphereIdx = (sphereIdx + 1) % spheres.length;
};


const playerCollisions = () => {
    const result = worldOctree.capsuleIntersect(playerCollider);
    
    playerOnFloor = false;
    
    if (result) {
        playerOnFloor = result.normal.y > 0;
        
        if (!playerOnFloor) {
            playerVelocity.addScaledVector(result.normal, - result.normal.dot(playerVelocity));
        }
        
        playerCollider.translate(result.normal.multiplyScalar(result.depth));
    }
};


const updatePlayer = (deltaTime: number) => {
    let damping = Math.exp(-4 * deltaTime) - 1;
    
    if (!playerOnFloor) {
        playerVelocity.y -= GRAVITY * deltaTime;
        // small air resistance
        damping *= 0.1;
    }
    
    playerVelocity.addScaledVector(playerVelocity, damping);
    
    const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);
    playerCollider.translate(deltaPosition);
    
    playerCollisions();
    
    camera.position.copy(playerCollider.end);
};


const playerSphereCollision = (sphere: TSphere): void => {
    const center = vector1.addVectors(playerCollider.start, playerCollider.end).multiplyScalar(0.5);
    const sphere_center = sphere.collider.center;
    const r = playerCollider.radius + sphere.collider.radius;
    const r2 = r * r;
    
    // approximation: player = 3 spheres
    
    for (const point of [playerCollider.start, playerCollider.end, center]) {
        const d2 = point.distanceToSquared(sphere_center);
        
        if ( d2 < r2 ) {
            const normal = vector1.subVectors(point, sphere_center).normalize();
            const v1 = vector2.copy(normal).multiplyScalar(normal.dot(playerVelocity));
            const v2 = vector3.copy(normal).multiplyScalar(normal.dot(sphere.velocity));
            
            playerVelocity.add(v2).sub(v1);
            sphere.velocity.add(v1).sub(v2);
            
            const d = (r - Math.sqrt(d2)) / 2;
            sphere_center.addScaledVector(normal, -d);
        }
    }
};


const spheresCollisions = () => {
    for (let i = 0, length = spheres.length; i < length; i++) {
        const s1 = spheres[i];
        
        for (let j = i + 1; j < length; j++) {
            const s2 = spheres[ j ];
            
            const d2 = s1.collider.center.distanceToSquared(s2.collider.center);
            const r = s1.collider.radius + s2.collider.radius;
            const r2 = r * r;
            
            if (d2 < r2) {
                const normal = vector1.subVectors(s1.collider.center, s2.collider.center).normalize();
                const v1 = vector2.copy(normal).multiplyScalar(normal.dot(s1.velocity));
                const v2 = vector3.copy(normal).multiplyScalar(normal.dot(s2.velocity));
                
                s1.velocity.add(v2).sub(v1);
                s2.velocity.add(v1).sub(v2);
                
                const d = (r - Math.sqrt(d2)) / 2;
                
                s1.collider.center.addScaledVector(normal, d);
                s2.collider.center.addScaledVector(normal, -d);
            }
        }
    }
};


const updateSpheres = (deltaTime: number) => {
    spheres.forEach((sphere) => {
        sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);
        
        const result = worldOctree.sphereIntersect(sphere.collider);
        
        if (result) {
            sphere.velocity.addScaledVector(result.normal, - result.normal.dot(sphere.velocity) * 1.5);
            sphere.collider.center.add(result.normal.multiplyScalar(result.depth));
        } else {
            sphere.velocity.y -= GRAVITY * deltaTime;
        }
        
        const damping = Math.exp(-1.5 * deltaTime) - 1;
        sphere.velocity.addScaledVector(sphere.velocity, damping);
        
        playerSphereCollision(sphere);
    });
    
    spheresCollisions();
    
    for (const sphere of spheres) {
        sphere.mesh.position.copy(sphere.collider.center);
    }
};


const getForwardVector = () => {
    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    
    return playerDirection;
};


const getSideVector = () => {
    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    playerDirection.cross(camera.up);
    
    return playerDirection;
};


const controls = (deltaTime: number) => {
    // gives a bit of air control
    const speedDelta = deltaTime * (playerOnFloor ? 25 : 8);
    
    if (keyStates[glfw.KEY_W]) {
        playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));
    }
    
    if (keyStates[glfw.KEY_S]) {
        playerVelocity.add(getForwardVector().multiplyScalar(-speedDelta));
    }
    
    if (keyStates[glfw.KEY_A]) {
        playerVelocity.add(getSideVector().multiplyScalar(-speedDelta));
    }
    
    if (keyStates[glfw.KEY_D]) {
        playerVelocity.add(getSideVector().multiplyScalar(speedDelta));
    }
    
    if (playerOnFloor) {
        if (keyStates[glfw.KEY_SPACE]) {
            playerVelocity.y = 15;
        }
    }
};


const loader = new GLTFLoader().setPath(`${__dirname}/models/`);

loader.load('collision-world.glb', (gltf) => {
    scene.add(gltf.scene);
    worldOctree.fromGraphNode(gltf.scene);
    gltf.scene.traverse((child: (three.Object3D | three.Mesh)) => {
        if (!(child instanceof three.Mesh)) {
            return;
        }
        
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material.map) {
            child.material.map.anisotropy = 4;
        }
    });
    
    const helper = new OctreeHelper(worldOctree);
    helper.visible = false;
    scene.add(helper);
});


const teleportPlayerIfOob = () => {
    if (camera.position.y > -25) {
        return;
    }
    
    playerCollider.start.set(0, 0.35, 0);
    playerCollider.end.set(0, 1, 0);
    playerCollider.radius = 0.35;
    camera.position.copy(playerCollider.end);
    camera.rotation.set(0, 0, 0);
};


const animate = () => {
    const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;
    
    // we look for collisions in substeps to mitigate the risk of
    // an object traversing another too quickly for detection.
    
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
        controls(deltaTime);
        updatePlayer(deltaTime);
        updateSpheres(deltaTime);
        teleportPlayerIfOob();
    }
    
    renderer.render(scene, camera);
};

loop(animate);
