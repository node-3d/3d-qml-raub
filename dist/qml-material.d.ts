import { ShaderMaterial } from 'three';
import type * as THREE from 'three';
import type { TInitMaterialOpts, TMaterialOpts, TNewableQmlMaterial } from './types.ts';
export declare class QmlMaterialBase extends ShaderMaterial {
    private _textureId;
    private _texture;
    private _renderer;
    constructor(opts?: TMaterialOpts);
    onBeforeCompile(shaderObject: THREE.WebGLProgramParametersWithUniforms, renderer: THREE.WebGLRenderer): void;
    get textureId(): number | null;
    set textureId(texId: number | null);
    private get shaderUniforms();
}
declare const init: (opts: TInitMaterialOpts) => TNewableQmlMaterial | null;
export default init;
