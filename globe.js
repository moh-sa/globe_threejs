import gsap from "gsap";
import * as THREE from "three";
import atomsphereFragment from "./shaders/atomsphereFragment.glsl";
import atomsphereVertex from "./shaders/atomsphereVertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

const wrapper = document.getElementById("canvasContainer");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  wrapper.offsetWidth / wrapper.offsetHeight,
  0.1,
  1000
);
const render = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById("globe"),
  alpha: true,
});

render.setSize(wrapper.offsetWidth, wrapper.offsetHeight);
render.setPixelRatio(window.devicePixelRatio);

//Create a sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load("./img/globe.jpg"),
      },
    },
  })
);

//create atomsphere sphere
const atomsphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atomsphereVertex,
    fragmentShader: atomsphereFragment,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  })
);

atomsphere.scale.set(1.1, 1.1, 1.1);
scene.add(atomsphere);

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

camera.position.z = 15;

const mouse = {
  x: undefined,
  y: undefined,
};

function animate() {
  requestAnimationFrame(animate);
  render.render(scene, camera);
  sphere.rotation.y += 0.001;
  gsap.to(group.rotation, {
    y: mouse.x * 0.5,
    duration: 2,
  });
}
animate();

addEventListener("load", () => {
  mouse.x = 0.05;
  mouse.y = 0.05;
});

addEventListener("mousemove", () => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = (event.clientY / innerHeight) * 2 + 1;
});
