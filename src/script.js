import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'

import vertShader from "./shaders/vertShader.glsl"
import fragShader from "./shaders/fragShader.glsl"

import {loadModel} from "./glbLoader.js"

import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';


function main() {

// DISABLE RIGHT CLICK

document.addEventListener('contextmenu', event => event.preventDefault(),false);


// ROLL THE SCENE			

var scene = new THREE.Scene({ antialias: true });
// scene.background = new THREE.Color( 0x1c1c1c );


// CAMERA SETUP

var camera = new THREE.PerspectiveCamera( 53, window.innerWidth / window.innerHeight, 0.25, 2000 );
camera.position.set(0.,0.,8.);

// RENDERER SETUP

var renderer = new THREE.WebGLRenderer({antialias: false});
// renderer.getContext("webgl").getExtension('EXT_shader_texture_lod');
// console.log(renderer);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.outputEncoding = THREE.sRGBEncoding;

const container = document.createElement( 'div' );
document.body.appendChild( container );
container.appendChild( renderer.domElement );

var canvas = renderer.domElement;

// canvas.onclick = function() {
//   // canvas.requestPointerLock();
//   if (canvas.requestFullscreen) {
//         canvas.requestFullscreen();
//       } else if (canvas.mozRequestFullScreen) { /* Firefox */
//         canvas.mozRequestFullScreen();
//       } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
//         canvas.webkitRequestFullscreen();
//       } else if (canvas.msRequestFullscreen) { /* IE/Edge */
//         canvas.msRequestFullscreen();
//       }
// }

//ORBIT CONTROL

const controls = new OrbitControls( camera, renderer.domElement );
// const controls = new TrackballControls( camera, renderer.domElement );
controls.update();
// controls.dynamicDampingFactor = 0.01;
// controls.rotateSpeed = 2.;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
// controls.maxPolarAngle = Infinity;

// RESIZE

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width/height;
    camera.updateProjectionMatrix();

    renderer.setSize( width,height);
}

// LOAD OBJECTS

const manager = new THREE.LoadingManager();

const loader = new GLTFLoader(manager);
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'three/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

var objHolder = {mesh: null};
loadModel(loader,objHolder,scene,renderer);

let pngCubeRenderTarget, exrCubeRenderTarget;
let pngBackground, exrBackground;


// RENDER LOOP
var iter = 0;

function render(time)
{   

    var t = time*0.001;
    if(objHolder.mesh){
       objHolder.mesh.material.uniforms.iTime.value = t;
    }
    controls.update();

    renderer.render(scene,camera);
    requestAnimationFrame ( render );
}

requestAnimationFrame ( render );

}

main();




