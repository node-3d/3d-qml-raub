import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
	interface GLTFLoader {
		load(url: string, onLoad: (gltf: GLTF) => void): void;
	}
}
