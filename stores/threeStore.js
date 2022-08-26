import create from 'zustand'

// import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import {TWEEN} from "three/examples/jsm/libs/tween.module.min";
import fonts from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { Raycaster, Vector2, MeshStandardMaterial, Mesh, WebGLRenderer, PerspectiveCamera, RectAreaLight, Scene, sRGBEncoding, BoxGeometry } from 'three';

// This file Contains the CANVAS values for 3JS and saves them to the store for global access
let isInit = false
let totalAnimationTime = 3.5

// general scene variables
let camera, controls, scene, renderer;
let group, textMesh1, invisMesh, meshTextMirrored, textGeo;
let rectLight1, rectLight2, rectLight3
let text = 'ADDRX', font = undefined
let rectLightHelper1, rectLightHelper2, rectLightHelper3

// variables for moving the camera
let originalX, originalY, originalZ
let targetX, targetY, targetZ // each target has to have dif var to control speed of animation along each axis
let animStartTime
const animDurationTranslate = 1.5

// variables for mouse intersecting
var raycaster = new Raycaster();
var mouse = new Vector2(1, 1);
const objects = [];


function onClickHanld(x = Math.random() * 15, y = Math.random() * 15, z = Math.random() * 15) {
    targetX = x
    targetY = y
    targetZ = z
}

function onMouseMove(e, set) {
	e.preventDefault();
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );

    // controls light for Rect 1 (rightmost)
    const rectLight1Mesh = scene.getObjectByName( 'rectLightHelper1' );
    var intersects = []
    var intersects2 = []
    var intersects3 = []
    if (rectLight1Mesh && rectLight1 && intersects2.length === 0 && intersects3.length === 0) {
        intersects = raycaster.intersectObjects( [rectLight1Mesh], true );
        if (intersects.length > 0) {
            console.log('interects', rectLight1Mesh)
            rectLight1.color.set('#00FFFF')
            if (document.body.style.cursor !== 'pointer') document.body.style.cursor = 'pointer'
        } else {    
            const hs = rectLight1.color.getHexString()
            if (hs !== 'ff0000') rectLight1.color.set('#FF0000')
            if (document.body.style.cursor !== 'default') document.body.style.cursor = 'default'
        }
    }

    // controls light for Rect 2 (middle)
    const rectLight2Mesh = scene.getObjectByName( 'rectLightHelper2' );
    if (rectLight2Mesh && rectLight2 && intersects.length === 0 && intersects3.length === 0) {
        intersects2 = raycaster.intersectObjects( [rectLight2Mesh], true );
        if (intersects2.length > 0) {
            console.log('interects', rectLight2Mesh)
            rectLight2.color.set('#ffd300')
            if (document.body.style.cursor !== 'pointer') document.body.style.cursor = 'pointer'
        } else {    
            const hs = rectLight2.color.getHexString()
            if (hs !== 'ff0000') rectLight2.color.set('#FF0000')
            if (document.body.style.cursor !== 'default') document.body.style.cursor = 'default'
        }
    }

    // controls light for Rect 2 (middle)
    const rectLight3Mesh = scene.getObjectByName( 'rectLightHelper3' );
    if (rectLight3Mesh && rectLight3 && intersects.length === 0 && intersects2.length === 0) {
        intersects3 = raycaster.intersectObjects( [rectLight3Mesh], true );
        if (intersects3.length > 0) {
            console.log('interects', rectLight3Mesh)
            rectLight3.color.set('#FF1493')
            if (document.body.style.cursor !== 'pointer') document.body.style.cursor = 'pointer'
        } else {    
            const hs = rectLight3.color.getHexString()
            if (hs !== 'ff0000') rectLight3.color.set('#FF0000')
            if (document.body.style.cursor !== 'default') document.body.style.cursor = 'default'
        }
    }
}

function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = ( window.innerWidth / window.innerHeight );
    camera.updateProjectionMatrix();
}
function animation( time, set ) {

    const mesh = scene.getObjectByName( 'meshText' );

    // raycaster.setFromCamera(mouse, camera);
    // intersects = raycaster.intersectObject(mesh);

    // console.log('animation', { camera })
    const timeSeconds = time / 1000
    mesh.rotation.y = timeSeconds;

    const delay = 1.5 // in seconds
    const animationDurationIntensity = 2 // in s
    const totalIntensity = 5

    const animationDurationHeight = .25 // in s
    const totalHeight = 75

    if (rectLight1 && timeSeconds >= delay && timeSeconds <= animationDurationIntensity) {
        const intensity = totalIntensity * ((timeSeconds - delay)/animationDurationIntensity) 
        rectLight1.intensity = intensity
        rectLight2.intensity = intensity
        rectLight3.intensity = intensity

        // const height = (timeSeconds - delay) * 10
        const height = totalHeight * ((timeSeconds - delay)/animationDurationHeight) 

        rectLight1.height = height
        rectLight2.height = height
        rectLight3.height = height
    }

    if (targetX && targetY && targetZ) {
        if (!animStartTime) {
            animStartTime = timeSeconds
            originalX = camera.position.x
            originalY = camera.position.y
            originalZ = camera.position.z
        }

        const timeElapsed = timeSeconds - animStartTime

        const percentageDone = (timeElapsed/animDurationTranslate) // percentage done in seconds
        console.log({ timeElapsed, animDurationTranslate, percentageDone })

        // assumes we start from 0 since percentage makes it 0 at start
        const currX = ((targetX - originalX) * percentageDone) + originalX 
        const currY = ((targetY - originalY) * percentageDone) + originalY
        const currZ = ((targetZ - originalZ) * percentageDone) + originalZ


        console.log({ currX, currY, currZ }, percentageDone, {originalX, originalY, originalZ})

        camera.position.set(currX, currY, currZ)
        controls.update();

        // const reachedTarget = camera.position.x - currX <= .01
        // console.log('targetView', timeSeconds, timeSinceStartAnim, {targetX, targetY, targetZ}, {currX, currY, currZ}, camera.position, reachedTarget)

        if (percentageDone >= 1) {
            animStartTime = undefined
            targetX = undefined
            targetY = undefined
            targetZ = undefined
        }
    }

    renderer.render( scene, camera );
}
function loadFont() {
    const fon = new FontLoader().parse(fonts);
    font = fon
    refreshText();
}
function refreshText() {
    // if (group) group.remove( textMesh1 );
    if ( ! text ) return;

    createText();
}
function createText() {
    // creating the geometry for the text + mats
    textGeo = new TextGeometry(text, {
        font: font,
        size: 1,
        height: .5,
        curveSegments: 12,
        bevelThickness: 0,
        bevelSize: 1,
        bevelEnabled: false
    } );
    textGeo.computeBoundingBox();
    const matKnot = new MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness: 0.5 } );


    // coords for the TEXT OBJECT
    let rotX = 0
    let rotY = Math.PI * 2
    let posX = 0;
    let posY = 5;
    let postZ = 0

    // combo of text geo + mat
    const meshText = new Mesh( textGeo, matKnot );
    meshText.geometry.center()
    meshText.name = 'meshText';

    // settings coords of text
    meshText.rotation.x = rotX;
    meshText.rotation.y = rotY;
    
    meshText.position.set(posX, posY, postZ);

    // adding things to things in canvas
    // group.add( meshText );
    scene.add( meshText );

    controls.target.copy( meshText.position );
    controls.update();
    // controls.enabled = false
}
function init(_, set) {
    // boilerplate
    renderer = new WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop((h) => animation(h, set) );
    renderer.outputEncoding = sRGBEncoding;
    document.body.appendChild( renderer.domElement );

    // CAMERA
    camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 5, - 15 );
    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // SCENE
    scene = new Scene();

    // Rect Area Light
    RectAreaLightUniformsLib.init();

    rectLight1 = new RectAreaLight( '#FF0000', 0, 4, 0 );
    rectLight2 = new RectAreaLight( '#FF0000', 0, 4, 0 );
    rectLight3 = new RectAreaLight( '#FF0000', 0, 4, 0 );

    rectLight1.position.set( - 5, 0, 5 );
    rectLight2.position.set( 0, 0, 5 );
    rectLight3.position.set( 5, 0, 5 );

    scene.add( rectLight1 );
    scene.add( rectLight2 );
    scene.add( rectLight3 );

    rectLightHelper1 = new RectAreaLightHelper( rectLight1 )
    rectLightHelper1.name = 'rectLightHelper1';
    rectLightHelper2 = new RectAreaLightHelper( rectLight2 )
    rectLightHelper2.name = 'rectLightHelper2';
    rectLightHelper3 = new RectAreaLightHelper( rectLight3 )
    rectLightHelper3.name = 'rectLightHelper3';

    scene.add( rectLightHelper1 );
    scene.add( rectLightHelper2 );
    scene.add( rectLightHelper3 );

    // FLOOR
    const geoFloor = new BoxGeometry( 2000, 0.1, 2000 );
    const matStdFloor = new MeshStandardMaterial( { color: '#21353C', roughness: 0.1, metalness: 0 } );
    const mshStdFloor = new Mesh( geoFloor, matStdFloor );
    scene.add( mshStdFloor );

    // adds group for easier grouping of objects (unused currently)
    // group = new THREE.Group();
    // group.position.y = 100;
    // scene.add( group );

    loadFont();
    window.addEventListener( 'resize', onWindowResize );
    window.addEventListener( 'mousemove', (e) => onMouseMove(e, set), false );
    window.addEventListener( 'click', () => onClickHanld(48, 1.85, 3.90) );

    set(state =>
        ({
            ...state,
            isInit: true
        })
    )
}

// combo of state vars + their accessors
export const useStore = create(set => ({
    totalAnimationTime,
    isInit,
    
    init: (_) => init(_, set)
}))


