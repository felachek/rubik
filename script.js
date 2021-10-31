import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//canvas
var element = document.getElementById("scene");

var scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(
    20,
    element.offsetWidth / element.offsetHeight,
    0.1,
    2000
  ),
  renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setClearColor(0xeeeeee, 1.0);
renderer.setSize(element.offsetWidth, element.offsetHeight);

camera.position.set(-30, 40, 30);
camera.lookAt(scene.position);
// var controls = new OrbitControls(camera, renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);

scene.add(new THREE.AxisHelper(20));
scene.add(new THREE.AmbientLight(0xffffff));
element.append(renderer.domElement);

//Cube geometry
var cubeSize = 3,
  dimensions = 3,
  spacing = 0.5;

//Cube materials
var colours = [0xc41e3a, 0x009e60, 0x0051ba, 0xff5800, 0xffd500, 0xffffff],
  faceMaterials = colours.map(function (c) {
    return new THREE.MeshLambertMaterial({ color: c, ambient: c });
  });
var cubeMaterials = new THREE.MeshFaceMaterial(faceMaterials);

//Cube construction
var allCubes = [],
  pivot = new THREE.Object3D();

function newCube(x, y, z) {
  var cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize),
    //   var cubeGeometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize),
    cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
  cube.position.set(x, y, z), scene.add(cube);
  allCubes.push(cube);
}

//Create the cubes
var increment = cubeSize + spacing;
for (var i = 0; i < dimensions; i++) {
  for (var j = 0; j < dimensions; j++) {
    for (var k = 0; k < dimensions; k++) {
      var x = (i - 1) * increment,
        y = (j - 1) * increment,
        z = (k - 1) * increment;
      newCube(x, y, z);
    }
  }
}

function render() {
  renderer.render(scene, camera);
}

//Move all cubes with value 'v' on axis 'axis'
function move(v, axis, rotation) {
  var activeCubes = [];

  allCubes.forEach(function (cube) {
    var cubePosition = cube.position.clone();

    if (Math.abs(cubePosition[axis] - v) < 0.0001) activeCubes.push(cube);
  });

  pivot.rotation.set(0, 0, 0);
  pivot.updateMatrixWorld();
  console.log(pivot);

  activeCubes.forEach(function (cube) {
    THREE.SceneUtils.attach(cube, scene, pivot);
    // pivot.add(cube);
    // scene.add(pivot);
  });

  pivot.rotation[axis] = rotation;
  pivot.updateMatrixWorld();
  //   pivot.children = []
  //   pivot.clear()
  activeCubes.forEach(function (cube) {
    cube.updateMatrixWorld();
    THREE.SceneUtils.detach(cube, pivot, scene);
    // scene.remove(pivot);
    // pivot.remove(cube);
  });

  render();
}

//Render the initial state
render();

const counterClockwise = -Math.PI / 2;
const clockwise = Math.PI / 2;

//Pre-canned demo moves
document.getElementById("moveY0").addEventListener("click", function () {
  move(3.5, "y", clockwise);
});
document.getElementById("moveY1").addEventListener("click", function () {
  move(0, "y", clockwise);
});
document.getElementById("moveY2").addEventListener("click", function () {
  move(-3.5, "y", clockwise);
});
document.getElementById("moveX0").addEventListener("click", function () {
  move(3.5, "x", clockwise);
});
document.getElementById("moveX1").addEventListener("click", function () {
  move(0, "x", clockwise);
});
document.getElementById("moveX2").addEventListener("click", function () {
  move(-3.5, "x", clockwise);
});
document.getElementById("moveZ0").addEventListener("click", function () {
  move(3.5, "z", clockwise);
});
document.getElementById("moveZ1").addEventListener("click", function () {
  move(0, "z", clockwise);
});
document.getElementById("moveZ2").addEventListener("click", function () {
  move(-3.5, "z", clockwise);
});

//shuffle part
function getArrayRandomElement(arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
function shuffle(v, axis, rotation, i) {
  setTimeout(function () {
    move(v, axis, rotation);
  }, 200 * i);
}
document.getElementById("shuffle").addEventListener("click", function () {
  const axis = ["x", "y", "z"];
  const v = [-3.5, 0, 3.5];
  const rotation = [clockwise, counterClockwise];
  for (let i = 0; i < 20; i++) {
    shuffle(
      getArrayRandomElement(v),
      getArrayRandomElement(axis),
      getArrayRandomElement(rotation),
      i
    );
  }
});

document.getElementById("solve").addEventListener("click", function () {
  move(-3.5, "z", counterClockwise);
});
