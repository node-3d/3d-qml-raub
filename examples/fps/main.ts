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
} = init({ isGles3: true, isWebGL2: true, mode: 'borderless', vsync: true });

addThreeHelpers(three, gl);

const {
    QmlOverlay, Property, View, loop, release, textureFromId,
} = initQml({ doc, gl, cwd: __dirname, three });

const icon = new Img(__dirname + '/../qml.png');
icon.on('load', () => { doc.icon = icon; });
doc.title = 'QML FPS';

const GRAVITY = 20;
const NUM_SPHERES = 100;
const NUM_ENEMIES = 10;
const SPHERE_RADIUS = 0.2;
const ENEMY_RADIUS = 2;
const SPHERE_TTL_SEC = 10;
const STEPS_PER_FRAME = 5;
const POS_SPHERE_HIDDEN = new three.Vector3(0, -100, 0);
const POS_PLAYER_START = new three.Vector3(0, 0.35, 0);
const POS_PLAYER_END = new three.Vector3(0, 1, 0);
const EXPLOSION_SPEED = 80;
const SPARK_SIZE = 0.2;
const SCALE_EXPLOSION_START = new three.Vector3(0.01, 0.01, 0.01);
const GUN_REFILL_RATE = 0.3;
const GUN_CHARGE_RATE = 0.7;
const SPEED_JUMP = 12;
const LAYER_WORLD = 0;
const LAYER_GUN = 1;

const sphereGeometry = new three.IcosahedronGeometry(SPHERE_RADIUS, 5);
const sphereMaterial = new three.MeshLambertMaterial({ color: 0xdede8d });

const worldOctree = new Octree();
const playerCollider = new Capsule(POS_PLAYER_START.clone(), POS_PLAYER_END.clone(), 0.35);
const playerVelocity = new three.Vector3();
const playerDirection = new three.Vector3();
let playerOnFloor = false;
let mouseTime = 0;
const keyStates: Record<string, boolean> = {};
const vector1 = new three.Vector3();
const vector2 = new three.Vector3();
const vector3 = new three.Vector3();

type THudState = 'start' | 'hud' | 'esc' | 'over';
let hudState: THudState = 'start';
let gameScore: number = 0;
let gunCharge: number = 0;
let gunFuel: number = 1;
let health: number = 100;

const clock = new three.Clock();

const renderer = new three.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(doc.w, doc.h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = three.VSMShadowMap;
renderer.toneMapping = three.ACESFilmicToneMapping;
renderer.autoClear = false;

const scene = new three.Scene();
scene.background = new three.Color(0x88ccee);
scene.fog = new three.Fog(0x88ccee, 0, 50);

// const sceneOverlay = new three.Scene();

const overlay = new QmlOverlay({ file: `${__dirname}/qml/Hud.qml` });
scene.add(overlay.mesh);
overlay.mesh.layers.enable(LAYER_GUN);
overlay.mesh.layers.disable(LAYER_WORLD);

const gun = new three.Object3D();
gun.visible = false;
scene.add(gun);
gun.layers.enable(LAYER_GUN);
gun.layers.disable(LAYER_WORLD);

const scoreView = new View({ file: `${__dirname}/qml/Score.qml` });
const materialScore = new three.SpriteMaterial();
materialScore.map = textureFromId(scoreView.textureId, renderer);
scoreView.on('reset', (textureId) => {
    release();
    materialScore.map = textureFromId(textureId, renderer);
});

const spriteScore = new three.Sprite(materialScore);
spriteScore.position.set(0, 5, 0);
spriteScore.scale.set(5, 5, 1);
scene.add(spriteScore);

const propScore = new Property<number>({
    view: scoreView, name: 'score', key: 'score', value: gameScore,
});

type TExplosion = {
    update: (dt: number) => void;
    explode: (pos: three.Vector3) => void;
};

const explosion: TExplosion = ((): TExplosion => {
    const material = new three.PointsMaterial({
        size: SPARK_SIZE,
        color: 0xFF000F,
    });
    
    const particles = new three.Points(sphereGeometry, material);
    particles.scale.copy(SCALE_EXPLOSION_START);
    particles.position.copy(POS_SPHERE_HIDDEN);
    particles.visible = false;
    scene.add(particles);
    
    let isVisible = true;
    let timeoutExplosion: NodeJS.Timeout | null = null;
    
    const update = (dt: number): void => {
        if (!isVisible) {
            return;
        }
        const ds = dt * EXPLOSION_SPEED;
        vector1.set(ds, ds, ds);
        particles.scale.add(vector1);
    };
    
    const explode = (pos: three.Vector3): void => {
        if (timeoutExplosion) {
            clearTimeout(timeoutExplosion);
            timeoutExplosion = null;
        }
        isVisible = true;
        timeoutExplosion = setTimeout(() => {
            timeoutExplosion = null;
            isVisible = false;
            particles.position.copy(POS_SPHERE_HIDDEN);
            particles.visible = false;
        }, 120);
        
        particles.scale.copy(SCALE_EXPLOSION_START);
        particles.position.copy(pos);
        particles.visible = true;
    };
    
    return {
        update,
        explode,
    };
})();


const cameraGun = new three.PerspectiveCamera(40, doc.w / doc.h, 0.001, 100);
cameraGun.rotation.order = 'YXZ';
cameraGun.layers.enable(LAYER_GUN);
cameraGun.layers.disable(LAYER_WORLD);

const camera = new three.PerspectiveCamera(95, doc.w / doc.h, 0.001, 100);
camera.rotation.order = 'YXZ';

// const hemiLight1 = new three.HemisphereLight(0x8dc1de, 0x00668d, 0.5);
// hemiLight1.position.set(2, 1, 1);
// hemiLight1.layers.enable(LAYER_GUN);

const ambientLight1 = new three.AmbientLight(0x88ccee, 1.0);
scene.add(ambientLight1);
ambientLight1.layers.enable(LAYER_GUN);

const fillLight1 = new three.DirectionalLight(0x88ccee, 0.5);
fillLight1.position.set(5, -25, 1);
scene.add(fillLight1);
fillLight1.layers.enable(LAYER_GUN);
// sceneOverlay.add(fillLight1.clone());

// const fillLight2 = new three.DirectionalLight(0x88ccee, 1.5);
// fillLight2.position.set(-25, 5, 1);
// scene.add(fillLight2);
// fillLight2.layers.disable(LAYER_WORLD);
// fillLight2.layers.enable(LAYER_GUN);

const directionalLight = new three.DirectionalLight(0xffffff, 2.0);
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
directionalLight.layers.enable(LAYER_GUN);
// sceneOverlay.add(directionalLight.clone());

type TActor = {
    ttl: number,
    isActive: boolean,
    mesh: three.Mesh,
    collider: three.Sphere,
    velocity: three.Vector3,
    mixer?: three.AnimationMixer | null,
};
const spherePool: TActor[] = [];

for (let i = 0; i < NUM_SPHERES; i++) {
    const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    
    scene.add(sphere);
    
    spherePool.push({
        ttl: -1,
        isActive: false,
        mesh: sphere,
        collider: new three.Sphere(POS_SPHERE_HIDDEN.clone(), SPHERE_RADIUS),
        velocity: new three.Vector3(),
    });
}

const resetPlayer = () => {
    playerVelocity.set(0, 0, 0);
    playerDirection.set(0, 0, 0);
    playerCollider.start.copy(POS_PLAYER_START);
    playerCollider.end.copy(POS_PLAYER_END);
    playerCollider.radius = 0.35;
    camera.position.copy(playerCollider.end);
    camera.rotation.set(0, 0, 0);
    cameraGun.position.copy(playerCollider.end);
    cameraGun.rotation.set(0, 0, 0);
    playerOnFloor = false;
    targetRotY = 0;
    targetRotX = 0;
};

const resetSpheres = () => {
    for (const sphere of spherePool) {
        sphere.mesh.visible = false;
        sphere.isActive = false;
        sphere.ttl = -1;
        sphere.collider.center.copy(POS_SPHERE_HIDDEN.clone());
    }
};

const propHudMode = new Property<THudState>({
    view: overlay, name: 'hud', key: 'mode',
});

const propHudCharge = new Property<number>({
    view: overlay, name: 'hud', key: 'charge',
});

const propHudFuel = new Property<number>({
    view: overlay, name: 'hud', key: 'fuel',
});

const propHudScore = new Property<number>({
    view: overlay, name: 'hud', key: 'score',
});

const propHudHealth = new Property<number>({
    view: overlay, name: 'hud', key: 'hp',
});

const restartGame = () => {
    resetPlayer();
    mouseTime = 0;
    resetSpheres();
    
    gameScore = 0;
    gunCharge = 0;
    gunFuel = 1;
    health = 100;
    hudState = 'hud';
    propHudMode.value = 'hud';
    
    propHudCharge.value = gunCharge;
    propHudFuel.value = gunFuel;
    propHudHealth.value = health;
    gun.visible = true;
    
    doc.setPointerCapture();
};

setInterval(
    () => {
        if (hudState !== 'hud') {
            return;
        }
        propHudCharge.value = gunCharge;
        propHudFuel.value = gunFuel;
        propHudHealth.value = health;
    },
    100,
);

overlay.on('custom-esc', (event) => {
    release();
    if (event.button === 'resume') {
        mouseTime = 0;
        hudState = 'hud';
        propHudMode.value = hudState;
        doc.setPointerCapture();
    }
    if (event.button === 'start') {
        restartGame();
    }
    if (event.button === 'restart') {
        restartGame();
    }
    if (event.button === 'leave') {
        gun.visible = false;
        hudState = 'over';
        propHudMode.value = hudState;
        doc.releasePointerCapture();
    }
    if (event.button === 'quit') {
        process.exit(0)
    }
});


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
        if (hudState !== 'hud' && hudState !== 'esc') {
            return;
        }
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
let targetRotY: number = camera.rotation.y;
let targetRotX: number = camera.rotation.x;

doc.on('mousemove', (event) => {
    if (hudState !== 'hud') {
        return;
    }
    release();
    
    const newYaw: number = targetRotY - event['movementX'] * 0.001;
    const newPitch: number = targetRotX - event['movementY'] * 0.001;
    
    targetRotY = newYaw;
    targetRotX = Math.min(pitchLimitRad, Math.max(-pitchLimitRad, newPitch));
});

doc.on('resize', () => {
    release();
    camera.aspect = doc.w / doc.h;
    camera.updateProjectionMatrix();
    cameraGun.aspect = doc.w / doc.h;
    cameraGun.updateProjectionMatrix();
    renderer.setSize(doc.w, doc.h);
});


const gunOffset = new three.Vector3();
const updateGunOffset = (vel: three.Vector3, dt: number) => {
    vector1.copy(vel);
    vector1.y = 0;
    
    if (vector1.lengthSq() < 1) {
        vector2.set(0, 0, 0);
    } else {
        const time = Date.now();
        const swingX = 0.0010 * Math.cos(time * 0.007);
        const swingY = 0.0005 * Math.sin(time * 0.014);
        vector2.set(swingX, swingY, 0);
    }
    
    gunOffset.lerp(vector2.addScaledVector(vel, -0.0001), 2 * dt);
};

const throwBall = () => {
    if (!mouseTime) {
        return;
    }
    
    const sphere = spherePool.find((sphere) => !sphere.isActive);
    if (!sphere) {
        return;
    }
    
    sphere.mesh.visible = true;
    sphere.isActive = true;
    sphere.ttl = SPHERE_TTL_SEC;
    
    camera.getWorldDirection(playerDirection);
    sphere.collider.center.copy(playerCollider.end).addScaledVector(playerDirection, playerCollider.radius * 1.5);
    
    vector1.copy(playerDirection);
    vector1.multiplyScalar(-0.001 * gunCharge);
    gunOffset.add(vector1);
    
    // throw the ball with more force if we hold the button longer, and if we move forward
    const impulse = 5 + 50 * gunCharge;
    mouseTime = 0;
    gunCharge = 0;
    
    sphere.velocity.copy(playerDirection).multiplyScalar(impulse);
    sphere.velocity.addScaledVector(playerVelocity, 2);
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
    // gun.position.copy(playerCollider.end);
    // gun.rotation.copy(camera.rotation);
};


const playerSphereCollision = (sphere: TActor): void => {
    const center = vector1.addVectors(playerCollider.start, playerCollider.end).multiplyScalar(0.5);
    const sphere_center = sphere.collider.center;
    const r = playerCollider.radius + sphere.collider.radius;
    const r2 = r * r;
    
    // approximation: player = 3 spherePool
    
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


const killEnenmy = (enemy: TActor) => {
    explosion.explode(enemy.collider.center);
    enemy.isActive = false;
    enemy.collider.center.copy(POS_SPHERE_HIDDEN);
    enemy.mesh.visible = false;
    
    gameScore += 10;
    propScore.value = gameScore;
    
    if (!enemyPool.some((enemy) => enemy.isActive)) {
        setTimeout(() => {
            spawnEnemy(1);
        }, 4000);
    }
};


const spheresCollisions = () => {
    const spherePoolSize = spherePool.length;
    const enemyPoolSize = enemyPool.length;
    
    for (let i = 0; i < spherePoolSize; i++) {
        const s1 = spherePool[i];
        if (!s1.isActive) {
            continue;
        }
        
        // Sphere vs Sphere
        for (let j = i + 1; j < spherePoolSize; j++) {
            const s2 = spherePool[j];
            if (!s2.isActive) {
                continue;
            }
            
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
        
        // Sphere vs Enemy
        for (let j = 0; j < enemyPoolSize; j++) {
            const s2 = enemyPool[j];
            if (!s2.isActive) {
                continue;
            }
            
            const d2 = s1.collider.center.distanceToSquared(s2.collider.center);
            const r = s1.collider.radius + s2.collider.radius;
            const r2 = r * r;
            
            if (d2 < r2) {
                killEnenmy(s2);
            }
        }
    }
};


const updateSpheres = (deltaTime: number) => {
    for (const sphere of spherePool) {
        if (!sphere.isActive) {
            continue;
        }
        if (sphere.ttl > 0) {
            sphere.ttl = Math.max(0, sphere.ttl - deltaTime);
        }
        
        if (sphere.ttl === 0) {
            sphere.isActive = false;
            sphere.collider.center.copy(POS_SPHERE_HIDDEN);
            sphere.mesh.visible = false;
            continue;
        }
        
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
    }
    
    spheresCollisions();
    
    for (const sphere of spherePool) {
        if (sphere.isActive) {
            sphere.mesh.position.copy(sphere.collider.center);
        }
    }
};

const enemyMovePatterns = [
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0001;
        collider.center.set(Math.sin(time) * 8, 5, Math.cos(time) * 8);
    },
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0002;
        collider.center.set(Math.sin(time) * 12, 5.5, 0);
    },
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0003;
        collider.center.set(Math.cos(time) * 8, 6, Math.sin(time) * 8 + 2 * Math.cos(time));
    },
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0001;
        collider.center.set(0, 11, Math.sin(time) * 12);
    },
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0002;
        collider.center.set(Math.sin(time) * 14, 6.5, Math.cos(time) * 12);
    },
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0003;
        collider.center.set(Math.sin(time) * 8, 7, Math.cos(time) * 8);
    },
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0001;
        collider.center.set(Math.sin(time) * 12, 7.5, 6);
    },
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0002;
        collider.center.set(Math.cos(time) * 8, 8, Math.sin(time) * 14);
    },
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0003;
        collider.center.set(0, 8 + 2 * Math.cos(time), Math.sin(time) * 10 + 2 * Math.cos(time));
    },
    (collider: three.Sphere) => {
        const time = Date.now() * 0.0001;
        collider.center.set(Math.sin(time) * 12, 6 + 2 * Math.sin(time), Math.cos(time) * 10);
    },
];
const enemyMoveCount = enemyMovePatterns.length;

const updateEnemies = (deltaTime: number) => {
    for (let i = 0; i < NUM_ENEMIES; i++) {
        const enemy: TActor = enemyPool[i];
        if (!enemy.isActive) {
            continue;
        }
        enemyMovePatterns[i % enemyMoveCount](enemy.collider);
        enemy.mesh.lookAt(enemy.collider.center);
        enemy.mesh.position.copy(enemy.collider.center);
        if (enemy.mixer) {
            enemy.mixer.update(deltaTime);
        }
    }
};

let enemyRate = 0.0005;
const spawnEnemy = (rate: number = 0) => {
    if (Math.random() > (rate || enemyRate)) {
        return;
    }
    
    const randEnemy = enemyPool[Math.floor(Math.random() * enemyPool.length)];
    if (randEnemy.isActive) {
        return;
    }
    
    randEnemy.isActive = true;
    randEnemy.mesh.visible = true;
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
            playerVelocity.y = SPEED_JUMP;
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

const enemyPool: TActor[] = [];

loader.load('Flamingo.glb', (gltf) => {
    const mesh = gltf.scene.children[0];
    
    if (!(mesh instanceof three.Mesh)) {
        return;
    }
    
    const s = 0.02;
    mesh.scale.set(s, s, s);
    mesh.position.copy(POS_SPHERE_HIDDEN);
    
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    for (let i = 0; i < NUM_ENEMIES; i++) {
        const meshClone = mesh.clone();
        scene.add(meshClone);
        
        const mixer = new three.AnimationMixer(meshClone);
        mixer.clipAction(gltf.animations[0]).setDuration(1).play();
        
        enemyPool.push({
            isActive: false,
            ttl: -1,
            mesh: meshClone,
            collider: new three.Sphere(POS_SPHERE_HIDDEN.clone(), ENEMY_RADIUS),
            velocity: new three.Vector3(),
            mixer,
        });
    }
    
    spawnEnemy(1);
});

loader.load('blasterG.glb', (gltf) => {
    const mesh = gltf.scene.children[0];
    
    gltf.scene.traverse((node) => {
        node.layers.enable(LAYER_GUN);
        node.layers.disable(LAYER_WORLD);
        if (node instanceof three.Mesh) {
            const mat = (node.material as three.MeshStandardMaterial);
            const newMat = new three.MeshStandardMaterial({ color: mat.color });
            // newMat.depthTest = false;
            node.material = newMat;
            node.castShadow = false;
            node.receiveShadow = true;
        }
    });
    
    const s = 0.003;
    mesh.scale.set(s, s, s);
    mesh.position.set(0.002, -0.002, -0.007);
    mesh.rotation.y = Math.PI + 0.1;
    mesh.rotation.x = 0.1;
    
    gun.add(mesh);
});


loader.load('targetB.glb', (gltf) => {
    const mesh = gltf.scene.children[0];
    
    gltf.scene.traverse((node) => {
        if (node instanceof three.Mesh) {
            const mat = (node.material as three.MeshStandardMaterial);
            const newMat = new three.MeshStandardMaterial({ color: mat.color });
            node.material = newMat;
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    
    const s = 3.0;
    mesh.scale.set(s, s, s);
    mesh.position.set(-2, 0.78, 0);
    mesh.rotation.z = Math.PI / 2;
    
    scene.add(mesh);
});


const teleportPlayerIfOob = () => {
    if (camera.position.y > -25) {
        return;
    }
    
    resetPlayer();
};

const animate = () => {
    if (!health && hudState !== 'over') {
        gun.visible = false;
        propHudScore.value = gameScore;
        hudState = 'over';
        propHudMode.value = 'over';
        propHudHealth.value = 0;
    }
    
    if (hudState === 'hud') {
        const deltaTime = Math.min(0.05, clock.getDelta());
        const deltaStep = deltaTime / STEPS_PER_FRAME;
        
        gunFuel = Math.min(1, gunFuel + deltaTime * GUN_REFILL_RATE);
        
        if (mouseTime) {
            const dc = Math.min(1 - gunCharge, gunFuel, deltaTime * GUN_CHARGE_RATE);
            gunFuel -= dc;
            gunCharge += dc;
        }
        
        // we look for collisions in substeps to mitigate the risk of
        // an object traversing another too quickly for detection.
        
        for (let i = 0; i < STEPS_PER_FRAME; i++) {
            controls(deltaStep);
            updatePlayer(deltaStep);
            updateSpheres(deltaStep);
            teleportPlayerIfOob();
        }
        
        updateEnemies(deltaTime);
        
        explosion.update(deltaTime);
        
        enemyRate += deltaTime * 0.00001;
        spawnEnemy();
        
        camera.rotation.y = targetRotY;
        camera.rotation.x = targetRotX;
        updateGunOffset(playerVelocity, deltaTime);
    }
    
    renderer.render(scene, camera);
    
    const _background = scene.background;
    const _fog = scene.fog;
    scene.background = null;
    scene.fog = null;
    
    if (hudState === 'hud') {
        cameraGun.position.copy(camera.position);
        cameraGun.rotation.copy(camera.rotation);
        gun.position.copy(camera.position).add(gunOffset);
        gun.rotation.copy(camera.rotation);
    }
    renderer.render(scene, cameraGun);
    
    scene.background = _background;
    scene.fog = _fog;
};

loop(animate);
