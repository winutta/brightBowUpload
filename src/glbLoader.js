import {ShaderMaterial,MeshStandardMaterial, SmoothShading, PMREMGenerator, FloatType} from 'three'
import * as THREE from 'three'
import vertShader from "./shaders/vertShader.glsl"
import fragShader from "./shaders/fragShader.glsl"

import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

function loadModel(loader,objHolder,scene, renderer){
	loader.load(
		// objectPath,
		// "./object.glb",
		// "./hand.glb",
		// "./handSmooth.glb",
		"./blueBrightBows.glb",
		// "./rotateApplied.glb",
		function(gltf){

			// let pngCubeRenderTarget, exrCubeRenderTarget;
			// let pngBackground, exrBackground;


				var blurTex = null;
				var exrTex = null;
				var bbTex = null;

				const manager = new THREE.LoadingManager();
				manager.onLoad = function(){
						var mat = new ShaderMaterial({
					        uniforms:{
					            iTime: {value: 0},
					            // envMap: {value: exrBackground},
					            // envMap: {value: texture},
					            envMapBlur: {value: blurTex},
					            envMapClear: {value: exrTex},
					            bbTex: {value: bbTex},
					        },
					        vertexShader: vertShader,
					        fragmentShader: fragShader,
					        transparent: true,
					        // envMap: exrBackground,
					    });

					    let material = new MeshStandardMaterial( {
					    	metalness: 0.,
					    	roughness: 0.0,
					    	envMapIntensity: 1.0,
					    	// shading: SmoothShading,
					    } );
					    let obj = gltf.scene.children[0];
					    obj.position.set(0,-1,0);
						obj.material = mat;
						// obj.material = material;
						scene.add(obj);
						objHolder.mesh = obj;
				}

				
				var texLoader = new THREE.TextureLoader(manager)
				    // .setDataType(THREE.UnsignedByteType )
				texLoader.load( 
					'envTexBlur.png',
					// "envTexBlurM100G50G100.png",
					 function ( texture ) {
				    	console.log(texture);
				    	texture.minFilter = texture.magFilter = THREE.LinearFilter;
				    	blurTex = texture;
				    } );

				texLoader.load( 
					// "tex.png",
					// "denoiseTex.png",
					"texDenoise2.png",
					 function ( texture ) {
					 	texture.flipY = false;
					 	texture.minFilter = texture.magFilter = THREE.LinearFilter;
				    	bbTex = texture;
				    } );



				// texLoader.load

				new EXRLoader(manager)
				    // .setDataType(THREE.UnsignedByteType )
				    .load( 'envTexEXR.exr', function ( texture ) {
				    	console.log(texture);
				    	texture.minFilter = texture.magFilter = THREE.LinearFilter;
				    	// texture.encoding = THREE.sRGBEncoding;
				    	exrTex = texture;
				    	// scene.background = texture;
				    	scene.background = pmremGenerator.fromEquirectangular( texture ).texture;
				    	// scene.background.encoding = THREE.sRGBEncoding;
				    } );
			
			    const pmremGenerator = new THREE.PMREMGenerator( renderer );
			    pmremGenerator.compileEquirectangularShader();

		}
	);

}


export {loadModel}