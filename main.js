var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#0C0C0C");
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(1.5, 32, 32);
var moontexure = new THREE.TextureLoader().load("2k_mercury.jpg");
var material = new THREE.MeshBasicMaterial({ map: moontexure });
var sphere = new THREE.Mesh(geometry, material);

var particles = new THREE.Geometry(),
  pMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 20,
  });
var points;
initParticles();
scene.add(sphere);
scene.add(points);

// Functions
function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.001;
  points.position.y += 0.05;
  renderer.render(scene, camera);
}

// Particles
function initParticles() {
  var vertices = [];

  for (var i = 0; i < 10000; i++) {
    var x = THREE.Math.randFloatSpread(3000);
    var y = THREE.Math.randFloatSpread(3000);
    var z = THREE.Math.randFloatSpread(3000);

    vertices.push(x, y, z);
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  var pointsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    map: new THREE.TextureLoader().load("particle.png"),
    blending: THREE.AdditiveBlending,
    transparent: true,
  });

  points = new THREE.Points(geometry, pointsMaterial);

  scene.add(points);
}

renderer.render(scene, camera);

// Initialisation
addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});
animate();
