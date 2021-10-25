import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

var cubeSize = 3,
  dimensions = 3,
  spacing = 0.5;

var colours = [
  0xfffa41, //yellow
  0x8541ff, //purple
  0xff9800, //orange
  0x00c3ff, //blue
  0xfd0096, //pink
  0x49ff00, //green
];
var faceMaterials = colours.map(function (c) {
  return new THREE.MeshLambertMaterial({ color: c, emissive: c });
});

var cubeGeometry = new THREE.BoxBufferGeometry(
  cubeSize,
  cubeSize,
  cubeSize
).toNonIndexed();

function createCube(x, y, z) {
  var cube = new THREE.Mesh(cubeGeometry, faceMaterials);
  cube.castShadow = true;
  cube.name = x + "-" + y + "-" + z;
  console.log(x + "-" + y + "-" + z)
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  scene.add(cube);
}

//create cubes
var increment = cubeSize + spacing;

for (var i = 0; i < dimensions; i++) {
  for (var j = 0; j < dimensions; j++) {
    for (var k = 0; k < dimensions; k++) {
      createCube(i * increment, j * increment, k * increment);
    }
  }
}

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  80,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.x = 15;
camera.position.y = 10;
camera.position.z = 15;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
//size of canvas
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Orbital Controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  // console.log(scene)
  // mesh.rotation.x = Math.PI / 2;

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

function buttonFunction() {
  scene.traverse(function(child) {
      let name = child.name.split('-')
      console.log(name[0])
    if (name[0] === "0") {
      child.rotation.x += Math.PI / 2
    }
  });
}


var params = {
  ClickMe: buttonFunction
};

var folder = gui.addFolder('Rotation');

folder.add(params, 'ClickMe');

folder.open();