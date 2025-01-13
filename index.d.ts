declare module "3d-qml-raub" {
	type TQml = typeof import('qml-raub');
	type TThree = typeof import('three');
	type TWebgl = typeof import('webgl-raub');
	type ShaderMaterial = typeof import('three').ShaderMaterial;
	type WebGLRenderer = typeof import('three').WebGLRenderer;
	type Texture = typeof import('three').Texture;
	type Mesh = typeof import('three').Mesh;
	type TOptsView = import('qml-raub').TOptsView;
	type View = typeof import('qml-raub').View;
	type Document = import('glfw-raub').Document;
	
	type WebGLRendererInstance = InstanceType<WebGLRenderer>;
	type TextureInstance = InstanceType<Texture>;
	type ShaderMaterialInstance = InstanceType<ShaderMaterial>;
	type OptsMaterialInstance = ConstructorParameters<ShaderMaterial>[0];
	
	type TMaterialInstance = ShaderMaterialInstance & {
		/**
		 * QML Texture ID.
		*/
		textureId: number | null;
	};
	
	interface TNewableQmlMaterial extends ShaderMaterial {
		new(opts: OptsMaterialInstance): TMaterialInstance;
		
	}
	
	interface TNewableQmlOverlayMaterial extends TNewableQmlMaterial {
		new(opts: OptsMaterialInstance): TMaterialInstance;
		
	}
	
	type TViewInstance = InstanceType<View>;
	
	type TOverlayInstance = TViewInstance & {
		
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
	};
	
	interface TNewableQmlOverlay extends View {
		new(opts: TOptsView): TOverlayInstance;
	}
	
	type TQml3D = TQml & {
		/**
		 * Switch back to the original OpenGL context.
		 * 
		 * Equivalent of `doc.makeCurrent()`.
		 */
		release: () => void;
		
		/**
		 * Create a `THREE.Texture` from a raw OpenGL resource ID.
		 * 
		 * Wraps ID into a `WebGLTexture` and then wraps that into a `THREE.Texture`.
		 * Some special hacks provide that the THREE's texture lookup works properly.
		 */
		textureFromId: (id: number | null, renderer: WebGLRendererInstance) => TextureInstance;
		
		/**
		 * Adjusted frame-loop helper, calls `doc.makeCurrent()` automatically.
		 */
		loop: (cb: () => void) => void,
		
		/**
		 * Fullscreen QML overlay.
		 * 
		 * Loads and displays a QML file as fullscreen overlay.
		*/
		QmlOverlay: TNewableQmlOverlay,
		
		/**
		 * QML basic material.
		 * 
		 * Basic unlit material with a QML texture on it.
		*/
		QmlMaterial: TNewableQmlMaterial,
		
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
	export const init: (opts: TInitOpts) => TQml3D;
}
