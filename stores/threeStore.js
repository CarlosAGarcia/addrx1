import create from 'zustand'

// import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import fonts from 'three/examples/fonts/helvetiker_regular.typeface.json';
import {SpotLightHelper, Group, SpotLight, Raycaster, Vector2, MeshStandardMaterial, Mesh, WebGLRenderer, PerspectiveCamera, RectAreaLight, Scene, sRGBEncoding, BoxGeometry, MathUtils } from 'three';
import { get, isNumber } from 'lodash'

// This file Contains the CANVAS values for 3JS and saves them to the store for global access
let isInit = false
let totalAnimationTime = 3.5


// general scene variables
let camera, controls, scene, renderer;
let group, textMesh1, textGeo;
let rectLight1, rectLight2, rectLight3, rectLight4, rectLight5
var intersects = []
var intersects2 = []
var intersects3 = []
var intersects4 = []
let text = 'ADDRX', font = undefined
let rectLightHelper1, rectLightHelper2, rectLightHelper3, rectLightHelper4, rectLightHelper5
let planeHeight = 2
let planeWidth = 2
let planeDepth = .001
// variables for creating secondary text (dynamic amount)
const delayToLoadSecondaryTextsMs = 3000 // 1000 = 1 second
const textObj = { isLoaded: false, text: '', geometry: null, material: null, mesh: null }
let secondaryTexts = [
    { ...textObj, text: 'WHY IS ADDRX' },
    { ...textObj, text: 'WHAT IS ADDRX' },
    { ...textObj, text: 'WHO IS ADDRX' },
]
let isAllSecondaryTextsLoaded = !!secondaryTexts.find(text => text.isLoaded) // more complicated way of saying 'false'


// variables for moving the camera
const initX = 0 // initial X,Y,Z values for camera (needed to come back to this spot)
const initY = 5
const initZ = -25
const initialRotationX = -180
const initialRotationY = 0
const initialRotationZ = 180
let originalX, originalY, originalZ, originalRotX, originalRotY, originalRotZ // relative position of camera at start of animations for tracking animation speeds
let targetX, targetY, targetZ, targetRotateX, targetRotateY, targetRotateZ // each target has to have dif var to control speed of animation along each axis
let animStartTime
const animDurationTranslate = .5
const maxZoomOutCamera = 50
const maxCamPanUp = MathUtils.degToRad(90)
const maxCamPanDown = MathUtils.degToRad(-90)
const maxCamPanLeft = (Math.PI) / 2.1 // one entire rotation (360 degrees / 4)
const maxCamPanRight = -1 * (Math.PI / 2.1)
let isInitHeightSet = false

// variables for mouse intersecting
var raycaster = new Raycaster();
var mouse = new Vector2(1, 1);
const objects = [];
let spotLightHelper
let spotLightHelper2

let isCameraLocked = false
let isResetAnimation = false

let planesGroup = null
const goToLightPosition = (lightIntersectionClicked) => {
    const targetPos = get(lightIntersectionClicked, `[0].object.parent.cameraOnClickPosition`, null) // caution: fragile pathing.
    if (targetPos) {
        // goes to target pos/random spot 
        const { x, y, z, rotateX, rotateY, rotateZ } = targetPos
        if (x) targetX = x
        if (y) targetY = y
        if (z) targetZ = z
        if (rotateX) targetRotateX = rotateX
        if (rotateY) targetRotateY = rotateY
        if (rotateZ) targetRotateZ = rotateZ
    }
}

const resetCameraControls = () => {
    targetX = initX
    targetY = initY
    targetZ = initZ
    // targetRotateX = initialRotationX
    // targetRotateY = initialRotationY
    targetRotateZ = initialRotationZ
    isResetAnimation = true
}

// either goes to specific x/y/z coord, finds the light clicked and goes to that light, or randomly goes to a position
function onClickHanld(x, y, z) {
    // if the camera is already set on a position and the user clicks to 'exit' the controlled view, we throw them to the initial position
    if (isCameraLocked) {
        resetCameraControls()

    } else {
        const lightIntersectionClicked = [ intersects, intersects2, intersects3, intersects4 ].find(lightIntersection => lightIntersection.length > 0)
        if (lightIntersectionClicked) {
            // goToLightPosition(lightIntersectionClicked)
        } else {
            targetX = x
            targetY = y
            targetZ = z
        }        
    }
}

function onMouseMove(e, set) {
	e.preventDefault();
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );

    const changeCursorIfNeed = () => {
        if (intersects.length === 0 && intersects2.length === 0 && intersects3.length === 0 && intersects4.length === 0) {
            if (document.body.style.cursor !== 'default') document.body.style.cursor = 'default'
        } else if (document.body.style.cursor !== 'pointer') document.body.style.cursor = 'pointer'
    }

    const changeColors = (interectArr, rectLightNum, changeColor) => {
        const currColour = `#${rectLightNum.color.getHexString()}`.toUpperCase()
        if (interectArr.length > 0) {
            if (currColour !== `${changeColor}`.toUpperCase()) rectLightNum.color.set(changeColor)
        }
        else if (currColour !== 'ff0000') rectLightNum.color.set('#FF0000')
    }

    // controls light for Rect 1 (rightmost)
    const rectLight1Mesh = scene.getObjectByName( 'rectLightHelper1' );
    if (rectLight1Mesh) {
        intersects = raycaster.intersectObjects( [rectLight1Mesh], true );
        changeColors(intersects, rectLight1, '#00FFFF')
    }

    const rectLight2Mesh = scene.getObjectByName( 'rectLightHelper2' );
    if (rectLight2Mesh) {
        intersects2 = raycaster.intersectObjects( [rectLight2Mesh], true );
        changeColors(intersects2, rectLight2, '#ffd300')
    }
    const rectLight3Mesh = scene.getObjectByName( 'rectLightHelper3' );
    if (rectLight3Mesh) {
        intersects3 = raycaster.intersectObjects( [rectLight3Mesh], true );
        changeColors(intersects3, rectLight3, '#FF1493')
    }
    const rectLight4Mesh = scene.getObjectByName( 'rectLightHelper4' );
    if (rectLight4Mesh) {
        intersects4 = raycaster.intersectObjects( [rectLight4Mesh], true );
        changeColors(intersects4, rectLight4, '#29fc12')
    }

    // changeCursorIfNeed()
}

function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = ( window.innerWidth / window.innerHeight );
    camera.updateProjectionMatrix();
}
function animation( time, set ) {
    const mesh = scene.getObjectByName( 'meshText' );
    if (spotLightHelper) spotLightHelper.update()
    if (spotLightHelper2) spotLightHelper2.update()

    if (planesGroup) planesGroup.rotation.y = time / 1000
    // loads link texts once delay is over if it hasn't loaded
    // if (!isAllSecondaryTextsLoaded && time >= delayToLoadSecondaryTextsMs) {
    //     console.log('y')
    // }

    // console.log('animation', { camera })
    const timeSeconds = time / 1000
    mesh.rotation.y = timeSeconds;

    const delay = 1.5 // in seconds
    const animationDurationIntensity = 2 // in s
    const totalIntensity = 10

    const animationDurationHeight = .25 // in s
    const totalHeight = 14.899

    if (rectLight1 && (timeSeconds >= delay) && (timeSeconds <= animationDurationIntensity)) {
        const intensity = totalIntensity * ((timeSeconds - delay)/animationDurationIntensity) 
        rectLight1.intensity = intensity
        rectLight2.intensity = intensity
        rectLight3.intensity = intensity
        rectLight4.intensity = intensity
        // rectLight5.intensity = intensity

        // const height = (timeSeconds - delay) * 10
        const height = totalHeight * ((timeSeconds - delay)/animationDurationHeight) 

        rectLight1.height = height - .003
        rectLight2.height = height
        rectLight3.height = height
        rectLight4.height = 7.68 * ((timeSeconds - delay)/animationDurationHeight) 
        // rectLight5.height = height
    } else if (!isInitHeightSet && timeSeconds > animationDurationIntensity) {
        console.log('FINISHEDDDD')
        // set the height after animation duraiton is done to ensure proper exact height
        rectLight1.height = 29.28
        rectLight2.height = 29.3
        rectLight3.height = 29.3
        rectLight4.height = 15
        isInitHeightSet = true
        set(state =>
            ({
                ...state,
                isInit: true
            })
        )
    }

    // camera.rotation.z = MathUtils.degToRad(135) 
    // detects any target change in camera position/rotation
    if (targetX || targetY || targetZ || targetRotateZ) {
        // we disable controls for the duration of the animation + until later when user clicks out of where we take them
        isCameraLocked = true
        // controls.enabled = false

        console.log('cam 1', { camRotation: camera.rotation })
        // console.log('cam 2', { targetX, targetY, targetZ, targetRotateX, targetRotateY, targetRotateZ  })

        // saves the initial state of camera
        if (!animStartTime) {
            animStartTime = timeSeconds
            originalX = camera.position.x
            originalY = camera.position.y
            originalZ = camera.position.z

            originalRotX = MathUtils.radToDeg(camera.rotation.x)
            originalRotY = MathUtils.radToDeg(camera.rotation.y)
            originalRotZ = MathUtils.radToDeg(camera.rotation.z) //initialRotationZ
        }

        const timeElapsed = timeSeconds - animStartTime

        const percentageDone = (timeElapsed/animDurationTranslate) // percentage done in seconds
        // console.log({ timeElapsed, animDurationTranslate, percentageDone })
       
        // MOVING CAMERA
        // assumes we start from 0 since percentage makes it 0 at start
        // if no target, doesnt change anything and keeps that position at curr
        const currX = isNumber(targetX) ? ((targetX - originalX) * percentageDone) + originalX : originalX
        const currY = isNumber(targetY) ?  ((targetY - originalY) * percentageDone) + originalY : originalY
        const currZ = isNumber(targetZ) ? ((targetZ - originalZ) * percentageDone) + originalZ : originalZ
        camera.position.set(currX, currY, currZ)


        // if (camera) camera.rotation.z = 45
        // controls.update(); // Automatically pivots view to look at the target object
        
        // ROTATING CAMERA // Note: original 0degrees of turn === MathUtils.degToRad(180)
        // let currRotX
        // let currRotY
        let currRotZ
        // if (targetRotateX) {
        //     currRotX = ((targetRotateX - originalRotX) * percentageDone) + originalRotX // currRot === -10 ? camera.rotation.z : (((targetRotateZ - originalRotZ) * percentageDone) + originalRotZ) // (((targetRotateZ - originalRotZ) * percentageDone) + originalRotZ)
        //     camera.rotation.x = MathUtils.degToRad(currRotX) //90 * Math.PI / 180 // currRot
        // }
        // if (targetRotateY) {
        //     currRotY = ((targetRotateY - originalRotY) * percentageDone) + originalRotY // currRot === -10 ? camera.rotation.z : (((targetRotateZ - originalRotZ) * percentageDone) + originalRotZ) // (((targetRotateZ - originalRotZ) * percentageDone) + originalRotZ)
        //     camera.rotation.y = MathUtils.degToRad(currRotY) //90 * Math.PI / 180 // currRot
        // }
        if (targetRotateZ) {
            currRotZ = ((targetRotateZ - originalRotZ) * percentageDone) + originalRotZ // currRot === -10 ? camera.rotation.z : (((targetRotateZ - originalRotZ) * percentageDone) + originalRotZ) // (((targetRotateZ - originalRotZ) * percentageDone) + originalRotZ)
            camera.rotation.z = MathUtils.degToRad(currRotZ) //90 * Math.PI / 180 // currRot
        }
    
        console.log('cam 3', { targ_orig: targetRotateZ - originalRotZ, targetRotateZ, originalRotZ, percentageDone, currRotZ, camRotation: camera.rotation })
        console.log({ originalX, originalY, originalZ }, { targetX, targetY, targetZ }, { currX, currY, currZ }, { originalRotX, originalRotY, originalRotZ }, { targetRotateZ }, { currRotX: MathUtils.radToDeg(camera.rotation.x), currRotY: MathUtils.radToDeg(camera.rotation.y), currRotZ: MathUtils.radToDeg(camera.rotation.z) }, percentageDone, )

        // RESETS VARS
        if (percentageDone >= 1) {
            // camera.position.set(targetX, targetY, targetZ)
            if (targetRotateZ) camera.rotation.z = MathUtils.degToRad(targetRotateZ) 
            animStartTime = undefined
            targetX = undefined
            targetY = undefined
            targetZ = undefined
            // targetRotateX = undefined
            // targetRotateY = undefined
            targetRotateZ = undefined
            if (isResetAnimation) {
                isResetAnimation = false
                isCameraLocked = false
                // controls.enabled = false
        
            }
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
    // ROTATING ADDRX text
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
    const matKnot = new MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness: .5 } );

    // coords for the TEXT OBJECT
    let rotX = 0
    let rotY = Math.PI * 2
    let posX = 0;
    let posY = 7;
    let postZ = 0

    // combo of text geo + mat
    const meshText = new Mesh( textGeo, matKnot );
    meshText.geometry.center()
    meshText.name = 'meshText';

    // settings coords of text
    meshText.rotation.x = rotX;
    meshText.rotation.y = rotY;
    meshText.position.set(posX, posY, postZ);

    scene.add( meshText );

    // The Planes/content
    const boxGeo = new BoxGeometry(planeHeight, planeWidth, planeDepth)

    // const matNor = new MeshNormalMaterial()
    const planeAbout = new Mesh( boxGeo, matKnot )
    const planeContact = new Mesh( boxGeo, matKnot )
    const planeWork = new Mesh( boxGeo, matKnot )
    const planeWork2 = new Mesh( boxGeo, matKnot )

    const planeTop = new Mesh( boxGeo, matKnot )
    const planeBot = new Mesh( boxGeo, matKnot )

    planesGroup = new Group();
    planesGroup.position.set(0, 5, 0)

    planesGroup.add(planeAbout) //.add(planeAbout)
    planesGroup.add(planeWork)
    planesGroup.add(planeContact)
    planesGroup.add(planeWork2)
    planesGroup.add(planeTop)
    planesGroup.add(planeBot)


    // plane positions/rotation
    planeAbout.rotation.y = MathUtils.degToRad(90)
    planeAbout.position.x += planeWidth/2

    planeContact.rotation.y = MathUtils.degToRad(90)
    planeContact.position.x -= planeWidth/2

    planeWork.position.z -= planeWidth/2
    planeWork2.position.z += planeWidth/2

    planeTop.rotation.x = MathUtils.degToRad(90)
    planeTop.position.y += planeWidth/2
    planeBot.rotation.x = MathUtils.degToRad(90)
    planeBot.position.y -= planeWidth/2

    scene.add(planesGroup)


    // LIGHTS
    const spotLight = new SpotLight( '#FF0000' , 1, 8, MathUtils.degToRad(19));
    spotLight.position.set( 4, .1, -5 );
    spotLight.shadowMapVisible = true;
    spotLight.power = 3
    spotLight.target = planesGroup

    const spotLight2 = new SpotLight( '#FF0000' , 1, 8, MathUtils.degToRad(19));
    spotLight2.shadowMapVisible = true;
    spotLight2.position.set( -4, .1, -5 );
    spotLight2.power = 3
    spotLight2.target = planesGroup

    // adding things to things in canvas
    scene.add( spotLight )
    scene.add( spotLight2 )

    // // UNCOMMENT TO VIEW SPOTLIGHT LINES
    // spotLightHelper = new SpotLightHelper( spotLight );
    // scene.add( spotLightHelper );
    // spotLightHelper2 = new SpotLightHelper( spotLight2 );
    // scene.add( spotLightHelper2 );


    // FINAL
    controls.target.copy( planesGroup.position );
    controls.update();
    // controls.target = null

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
    camera.position.set( initX, initY, initZ );
    // camera.rotation.set(0, 0, 45)

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // sets up control limitations
    controls.minAzimuthAngle = maxCamPanLeft
    controls.maxAzimuthAngle = maxCamPanRight
    controls.minPolarAngle = maxCamPanDown
    controls.maxPolarAngle = maxCamPanUp
    controls.maxDistance = maxZoomOutCamera

    // SCENE
    scene = new Scene();

    // Rect Area Light
    RectAreaLightUniformsLib.init();

    rectLight1 = new RectAreaLight( '#FF0000', 0, 1, 0 )
    rectLight2 = new RectAreaLight( '#FF0000', 0, 1, 0 );
    rectLight3 = new RectAreaLight( '#FF0000', 0, 1, 0 );
    rectLight4 = new RectAreaLight( '#FF0000', 0, 1, 0 );

    rectLight1.position.set( - 10, 0, 5 );
    rectLight1.rotation.z = MathUtils.degToRad(-45) //90 * Math.PI / 180 // currRot

    rectLight2.position.set( 0, 0, 4.99 );
    rectLight2.rotation.z = MathUtils.degToRad(45) //90 * Math.PI / 180 // currRot

    rectLight3.position.set( 10, 0, 4.99 );
    rectLight3.rotation.z = MathUtils.degToRad(45) //90 * Math.PI / 180 // currRot

    rectLight4.position.set( 0, 0, 5 );
    rectLight4.rotation.z = MathUtils.degToRad(-45) //90 * Math.PI / 180 // currRot

    scene.add( rectLight1 );
    scene.add( rectLight2 );
    scene.add( rectLight3 );
    scene.add( rectLight4 );

    // Blue light \ right
    rectLightHelper1 = new RectAreaLightHelper( rectLight1 )
    rectLightHelper1.name = 'rectLightHelper1';
    rectLightHelper1.cameraOnClickPosition = { x: initX + 10, y: initY + 9, z: initZ + 15, rotateZ: 135 } // X/Y difference results in translate along 45degree, Y positive add results in downward shift img upside down rendered

    // Yellow light /  right
    rectLightHelper2 = new RectAreaLightHelper( rectLight2 )
    rectLightHelper2.name = 'rectLightHelper2';
    rectLightHelper2.cameraOnClickPosition = { x: initX - 15, y: initY + 4, z: initZ + 15, rotateZ: 225 }

    // Pink light / left
    rectLightHelper3 = new RectAreaLightHelper( rectLight3 )
    rectLightHelper3.name = 'rectLightHelper3';
    rectLightHelper3.cameraOnClickPosition = { x: initX - 11, y: initY + 10, z: initZ + 15, rotateZ: 225 }

    // Green light \ left
    rectLightHelper4 = new RectAreaLightHelper( rectLight4 )
    rectLightHelper4.name = 'rectLightHelper4';
    rectLightHelper4.cameraOnClickPosition = { x: initX + 15, y: initY + 4, z: initZ + 15, rotateZ: 135 }

    scene.add( rectLightHelper1 );
    scene.add( rectLightHelper2 );
    scene.add( rectLightHelper3 );
    scene.add( rectLightHelper4 );

    // FLOOR
    const geoFloor = new BoxGeometry( 2000, 0.1, 2000 );
    const matStdFloor = new MeshStandardMaterial( { color: '#2B2029', roughness: 0.3, metalness: 1 } );
    const mshStdFloor = new Mesh( geoFloor, matStdFloor );
    scene.add( mshStdFloor );

    // adds group for easier grouping of objects (unused currently)
    // group = new THREE.Group();
    // group.position.y = 100;
    // scene.add( group );

    loadFont();
    window.addEventListener( 'resize', onWindowResize );
    window.addEventListener( 'mousemove', (e) => onMouseMove(e, set), false );
    window.addEventListener( 'click', () => onClickHanld() );
}

// combo of state vars + their accessors
export const useStore = create(set => ({
    totalAnimationTime,
    isInit,
    
    init: (_) => init(_, set)
}))


