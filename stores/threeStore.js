import create from 'zustand'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import fonts from 'three/examples/fonts/helvetiker_regular.typeface.json';

// This file Contains the CANVAS values for 3JS and saves them to the store for global access
let camera, scene, renderer;
let group, textMesh1, meshTextMirrored, textGeo;
let rectLight1, rectLight2, rectLight3
let text = 'ADDRX', font = undefined

const mirror = true;
function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = ( window.innerWidth / window.innerHeight );
    camera.updateProjectionMatrix();
}
function animation( time ) {
    const mesh = scene.getObjectByName( 'meshText' );
    console.log('animation', { camera })
    const timeSeconds = time / 1000
    mesh.rotation.y = timeSeconds;

        const delay = 1.5 // in seconds
        const animationDuration = 2 // in s
        const totalIntensity = 5

        const animationDurationHeight = .25 // in s
        const totalHeight = 75

        if (rectLight1 && timeSeconds >= delay && timeSeconds <= animationDuration) {
            const intensity = totalIntensity * ((timeSeconds - delay)/animationDuration) 
            rectLight1.intensity = intensity
            rectLight2.intensity = intensity
            rectLight3.intensity = intensity

            // const height = (timeSeconds - delay) * 10
            const height = totalHeight * ((timeSeconds - delay)/animationDurationHeight) 

            rectLight1.height = height
            rectLight2.height = height
            rectLight3.height = height

        }

    renderer.render( scene, camera );
}
function loadFont() {
    const fon = new FontLoader().parse(fonts);
    font = fon
    refreshText();
}
function refreshText() {
    if (group) group.remove( textMesh1 );
    if ( mirror && group) group.remove( meshTextMirrored );
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
    const matKnot = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness: 0 } );

    // coords for the TEXT OBJECT
    let rotX = 0
    let rotY = Math.PI * 2
    let posX = 0;
    let posY = 5;
    let postZ = 0

    // combo of text geo + mat
    const meshText = new THREE.Mesh( textGeo, matKnot );
    meshText.geometry.center()
    meshText.name = 'meshText';

    // settings coords of text
    meshText.rotation.x = rotX;
    meshText.rotation.y = rotY;
    
    meshText.position.set(posX, posY, postZ);

    // adding things to things in canvas
    group.add( meshText );
    scene.add( meshText );

    // creating controls that copy position of newly created text to always center the view on it
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.copy( meshText.position );
    controls.update();
    controls.enabled = false
}
function init() {
    // boilerplate
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );

    // CAMERA
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 5, - 15 );

    // SCENE
    scene = new THREE.Scene();

    // Rect Area Light
    RectAreaLightUniformsLib.init();

    rectLight1 = new THREE.RectAreaLight( '#FF0000', 0, 4, 0 );
    rectLight2 = new THREE.RectAreaLight( '#FF0000', 0, 4, 0 );
    rectLight3 = new THREE.RectAreaLight( '#FF0000', 0, 4, 0 );

    rectLight1.position.set( - 5, 0, 5 );
    rectLight2.position.set( 0, 0, 5 );
    rectLight3.position.set( 5, 0, 5 );

    scene.add( rectLight1 );
    scene.add( rectLight2 );
    scene.add( rectLight3 );

    scene.add( new RectAreaLightHelper( rectLight1 ) );
    scene.add( new RectAreaLightHelper( rectLight2 ) );
    scene.add( new RectAreaLightHelper( rectLight3 ) );

    // FLOOR
    const geoFloor = new THREE.BoxGeometry( 2000, 0.1, 2000 );
    const matStdFloor = new THREE.MeshStandardMaterial( { color: '#21353C', roughness: 0.1, metalness: 0 } );
    const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
    scene.add( mshStdFloor );

    // adds group for easier grouping of objects (unused currently)
    group = new THREE.Group();
    group.position.y = 100;
    scene.add( group );

    loadFont();
    window.addEventListener( 'resize', onWindowResize );
}

// combo of state vars + their accessors
export const useStore = create(set => ({
    init
}))


