declare module "3d-qml-raub" {
	type TQml = typeof import('qml-raub');
	type TThree = typeof import('three');
	type TWebgl = typeof import('webgl-raub');
	type RawShaderMaterial = typeof import('three').RawShaderMaterial;
	type Mesh = typeof import('three').Mesh;
	type TOptsView = import('qml-raub').TOptsView;
	type View = typeof import('qml-raub').View;
	type Document = import('glfw-raub').Document;
	type WebGLTexture = typeof import('webgl-raub').WebGLTexture;
	
	type TUnknownObject = Readonly<{ [id: string]: unknown }>;
	
	type TLoop = (cb: (i: number) => void) => void;
	
	type RawShaderMaterialInstance = InstanceType<RawShaderMaterial>;
	type OptsMaterialInstance = ConstructorParameters<RawShaderMaterial>[0];
	
	type TOpt<T, P extends string> = T extends { [id: string]: unknown } ? T[P] : undefined;
	
	type TOptsQmlOverlayMaterial = Readonly<Partial<{
		side: TOpt<OptsMaterialInstance, 'side'>;
		uniforms: TOpt<OptsMaterialInstance, 'uniforms'>;
		depthWrite: TOpt<OptsMaterialInstance, 'depthWrite'>;
		depthTest: TOpt<OptsMaterialInstance, 'depthTest'>;
		transparent: TOpt<OptsMaterialInstance, 'transparent'>;
		lights: TOpt<OptsMaterialInstance, 'lights'>;
		vertexShader: TOpt<OptsMaterialInstance, 'vertexShader'>;
		fragmentShader: TOpt<OptsMaterialInstance, 'fragmentShader'>;
		glslVersion: TOpt<OptsMaterialInstance, 'glslVersion'>;
	}>>;
	
	interface TNewableQmlOverlayMaterial extends RawShaderMaterial {
		new(opts: TOptsQmlOverlayMaterial): TNewableQmlOverlayMaterial;
		
		/**
		 * QML Texture for fullscreen rendering.
		*/
		texture: WebGLTexture;
	}
	
	interface TNewableQmlOverlay extends View {
		new(opts: TOptsView): TNewableQmlOverlay;
		
		/**
		 * Overlay mesh visibility state.
		 * 
		 * A hidden overlay does not process events.
		*/
		isVisible: boolean;
		
		/**
		 * Overlay disabled state.
		 * 
		 * A disabled overlay does not process events.
		*/
		isDisabled: boolean;
		
		/**
		 * Three.js material for overlay.
		*/
		material: TNewableQmlOverlayMaterial;
		
		/**
		 * Three.js mesh for overlay. Add it to the scene.
		*/
		mesh: InstanceType<Mesh>;
	}
	
	type TQml3D = TQml & {
		/**
		 * Switch back to the original OpenGL context.
		 * 
		 * Equivalent of `doc.makeCurrent()`.
		 */
		release: () => void;
		
		/**
		 * Adjusted frame-loop helper, calls `release` automatically.
		 */
		loop: TLoop,
		
		/**
		 * Fullscreen QML overlay.
		 * 
		 * Loads and displays a QML file as fullscreen overlay.
		*/
		QmlOverlay: TNewableQmlOverlay,
		
		/**
		 * Fullscreen QML overlay material.
		 * 
		 * Loads and displays a QML file as fullscreen overlay.
		*/
		QmlOverlayMaterial: TNewableQmlOverlayMaterial,
	};
	
	type TInitOpts = Readonly<{
		gl: TWebgl,
		doc: Document,
		cwd?: string | null,
		three: TThree,
	}>;
	
	/**
	 * Initialize Qml3D.
	 * 
	 * This function can be called repeatedly, but will ignore further calls.
	 * The return value is cached and will be returned immediately for repeating calls.
	 */
	export const init: (opts?: TInitOpts) => TQml3D;
}
