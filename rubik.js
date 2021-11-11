import Swal from 'sweetalert'
import { getArrayRandomElement } from "./utils";
import "./style.css";

//canvas
var element = document.getElementById("scene");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    20,
    element.offsetWidth / element.offsetHeight,
    0.1,
    2000
  );
var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setClearColor(0x008080, 1.0);
renderer.setSize(element.offsetWidth, element.offsetHeight);

camera.position.set(-30, 40, 30);
camera.lookAt(scene.position);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);

// scene.add(new THREE.AxisHelper(20));
scene.add(new THREE.AmbientLight(0xffffff));
element.append(renderer.domElement);

//Cube geometry
var cubeSize = 3;
var dimensions = 3;
var spacing = 0.5;

//Cube materials
var colours = [0xc41e3a, 0x009e60, 0x0051ba, 0xff5800, 0xffd500, 0xffffff],
  faceMaterials = colours.map(function (c) {
    return new THREE.MeshLambertMaterial({ color: c, ambient: c });
  });
var cubeMaterials = new THREE.MeshFaceMaterial(faceMaterials);

//Cube construction
var allCubes = [];
var pivot = new THREE.Object3D();

function newCube(x, y, z) {
  var cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
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

//Possible directions
const counterClockwise = -Math.PI / 10;
const clockwise = Math.PI / 10;

const undoList = []

//Move all cubes with value 'v' on axis 'axis'
function move(v, axis, direction) {
  var activeCubes = [];

  allCubes.forEach(function (cube) {
    var cubePosition = cube.position.clone();
    if (Math.abs(cubePosition[axis] - v) < 0.0001) activeCubes.push(cube);
  });

  pivot.rotation.set(0, 0, 0);
  pivot.updateMatrixWorld();
  scene.add(pivot);

  activeCubes.forEach(function (cube) {
    THREE.SceneUtils.attach(cube, scene, pivot);
  });

  pivot.rotation[axis] = direction;
  pivot.updateMatrixWorld();
  activeCubes.forEach(function (cube) {
    cube.updateMatrixWorld();
    THREE.SceneUtils.detach(cube, pivot, scene);
  });

  render();
}

//Render the initial state
render();

//User actions
function animateMovement(v, axis, direction, isDoingUndo) {
  for (let i = 0; i < 5; i++) {
    setTimeout(function () {
      move(v, axis, direction);
    }, 20 * i);
  }
  if(!isDoingUndo){
    undoList.push({v, axis, direction: direction * -1 })
  }else{
    undoList.shift()
  }
}

function undo(v, axis, direction, duration, totalDuration) {
  setTimeout(() => {
    handleChangeCounter(false)
    animateMovement(
      v,
      axis,
      direction,
      true
    )
    if(duration === totalDuration-1){
      handleChangeBackgroundColor(true)
      disableAndEnableAllButtons(false)
      document.getElementById('info').innerHTML = ""
      Swal(
        "Good job!",
        `You solved the button in ${totalDuration} steps!`,
        "success",
      );
    }
  }, 200 * duration);
}



function shuffle() {
  let labelInfo = document.getElementById('info')
  labelInfo.innerHTML = "Shuffling..."
  disableAndEnableAllButtons(true)
  const axis = ["x", "y", "z"];
  const v = [-3.5, 0, 3.5];
  const direction = [clockwise, counterClockwise];

  for (let i = 0; i < 20; i++) {
    setTimeout(function () {
      handleChangeBackgroundColor(false)
      handleChangeCounter(true)
      animateMovement(
        getArrayRandomElement(v),
        getArrayRandomElement(axis),
        getArrayRandomElement(direction),
        false
      );
      if(i === 19){
        disableAndEnableAllButtons(false)
        labelInfo.innerHTML = ""
      }
    }, 200 * i);
  }
}

function handleChangeCounter(incrementValue){
  const counter = document.getElementById('counter')
  var value = parseInt(counter.innerHTML);

    if(incrementValue){
      counter.innerHTML = ++value;
    }else{
      counter.innerHTML = --value;
    }
}

function handleChangeBackgroundColor(isCounterEqualZero) {
  var body = document.getElementsByTagName("body")[0]
  var html = document.getElementsByTagName("html")[0]

  if(isCounterEqualZero){
    body.style = 'background: #008080'
    html.style = 'background: #008080'
    renderer.setClearColor(0x008080, 1.0);
  }else{
    body.style = 'background: #3f51b5'
    html.style = 'background: #3f51b5'
    renderer.setClearColor(0x3f51b5, 1.0);
  }
}

function animateOneMovement(v, axis, direction, duration) {
  handleChangeCounter(true)
  handleChangeBackgroundColor(false)
  disableAndEnableAllButtons(true)
  animateMovement(v, axis, direction, duration)
  disableAndEnableAllButtons(false)
}

//Y
document
  .getElementById("moveY0")
  .addEventListener("click", () => animateOneMovement(3.5, "y", clockwise, false));
document
  .getElementById("moveY1")
  .addEventListener("click", () => animateOneMovement(0, "y", clockwise, false));
document
  .getElementById("moveY2")
  .addEventListener("click", () => animateOneMovement(-3.5, "y", clockwise, false));
//X
document
  .getElementById("moveX0")
  .addEventListener("click", () => animateOneMovement(3.5, "x", clockwise, false));
document
  .getElementById("moveX1")
  .addEventListener("click", () => animateOneMovement(0, "x", clockwise, false));
document
  .getElementById("moveX2")
  .addEventListener("click", () => animateOneMovement(-3.5, "x", clockwise, false));
//Z
document
  .getElementById("moveZ0")
  .addEventListener("click", () => animateOneMovement(3.5, "z", clockwise, false));
document
  .getElementById("moveZ1")
  .addEventListener("click", () => animateOneMovement(0, "z", clockwise, false));
document
  .getElementById("moveZ2")
  .addEventListener("click", () => animateOneMovement(-3.5, "z", clockwise, false));

//Suffle & Solve
document.getElementById("shuffle").addEventListener("click", () => shuffle());
document.getElementById("solve").addEventListener("click", function () {
  if(undoList.length > 0) {
    let labelInfo = document.getElementById('info')
    labelInfo.innerHTML = "Solving..."
    disableAndEnableAllButtons(true)
    let duration = 0;
    for (var i = undoList.length - 1; i >= 0; i--) {
      undo(
        undoList[i].v,
        undoList[i].axis,
        undoList[i].direction,
        duration,
        undoList.length
      )
      duration++
    }
  }
});

function disableAndEnableAllButtons(bool) {
  var elements = document.getElementsByClassName('button_slide');
  for(var i = 0; i < elements.length; i++){
    elements[i].disabled = bool;
  }
}
