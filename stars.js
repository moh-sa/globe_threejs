import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const render = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById("stars"),
});

render.setSize(innerWidth, innerHeight);
render.setPixelRatio(window.devicePixelRatio);

//Create a sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0, 0, 0));

scene.add(sphere);

//Create stars background
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const starVertices = [];
for (let i = 0; i < 10_000; i++) {
  const x = (Math.random() - 0.5) * 2_000;
  const y = (Math.random() - 0.5) * 2_000;
  const z = -Math.random() * 2_000;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(stars);

camera.position.z = 15;

render.render(scene, camera);
