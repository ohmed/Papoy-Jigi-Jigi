var modelLoader;
var scene;
var camera;
var lights = [];
var minions = [];

var m1, m2, m3;

function addObjects() {

  var mesh;

/* ground */
  var geometry  = new THREE.CubeGeometry( 10, 0.5, 10);
  mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial( { color: 0xffffff, specular : 0x888888, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading} ) );
  mesh.position.set(0, 5, 0);
  mesh.scale.set(15, 20, 7);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added ground');

/* scene */
  var geometry  = new THREE.CubeGeometry( 10, 0.5, 10);
  mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial( { color: 0xffffff, specular : 0x888888, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading } ) );
  mesh.position.set(0, 0, 0);
  mesh.scale.set(40, 1, 20);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added scene');

/* model of m1 */
  model = modelLoader.get('m1');
  model.geometry.materials[ 0 ].morphTargets = true;
  model.geometry.materials[ 4 ].morphTargets = true;
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0xaaaaaa, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(0, 21, 12);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.duration = 600;
  mesh.frames = [0, 6/*30*/];
  mesh.start = 0;
  mesh.keyframes = mesh.frames[ mesh.frames.length - 1 ];
  mesh.lastKeyframe = 5;//29;
  mesh.currentKeyframe = 0;
  mesh.play = 0;
  m1 = mesh;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added m1');

/* model of m1`s guitar */
  model = modelLoader.get('m1-guitar');
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0x000000, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(0, 21, 12);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.doubleSided = true;
  m1g = mesh;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added m1`s guitar');

/* model of m2 */
  model = modelLoader.get('m2');
  model.geometry.materials[ 0 ].morphTargets = true;
  model.geometry.materials[ 4 ].morphTargets = true;
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0xaaaaaa, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(-40, 22, 0);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.duration = 600;
  mesh.frames = [0, 6];
  mesh.start = 0;
  mesh.keyframes = mesh.frames[ mesh.frames.length - 1 ];
  mesh.lastKeyframe = 5;
  mesh.currentKeyframe = 0;
  mesh.play = 0;
  scene.add(mesh);
  m2 = mesh;
  if (DEBUG) console.log('[scene]: added m2');

/* model of m2`s drums */
  model = modelLoader.get('m2-drums');
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0xaaaaaa, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(-40, 22, 0);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  scene.add(mesh);
  m2d = mesh;
  if (DEBUG) console.log('[scene]: added m2`s drums');

/* model of m3 */
  model = modelLoader.get('m3');
  model.geometry.materials[ 0 ].morphTargets = true;
  model.geometry.materials[ 4 ].morphTargets = true;
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0xaaaaaa, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(35, 20, 12);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.duration = 600;
  mesh.frames = [0, 6];
  mesh.start = 0;
  mesh.keyframes = mesh.frames[ mesh.frames.length - 1 ];
  mesh.lastKeyframe = 5;
  mesh.currentKeyframe = 0;
  mesh.play = 0;
  scene.add(mesh);
  m3 = mesh;
  if (DEBUG) console.log('[scene]: added m3');

/* model of m3`s bass-guitar */
  model = modelLoader.get('m3-guitar');
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0x000000, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(35, 20, 12);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.doubleSided = true;
  m1g = mesh;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added m3`s bass-guitar');


  addLights();
}

function addLights() {

  var light = new THREE.SpotLight(0xffffff, 2, 1000 );
  light.target.position.set( 0, 0, 0 );
  // set its position
  light.position.x = 100;
  light.position.y = 320;
  light.position.z = 300;
  light.shadowBias = 0.0001;
  light.shadowDarkness = 0.3;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 1024;
  //light.shadowCameraVisible = true;
  light.castShadow = true;

  scene.add(light);
  console.log( '[scene]: added light {1}' );

}

function loadModels() {

/* load models */
  modelLoader = new ModelLoader( preparations );
  modelLoader.totalObjects = 6;
  modelLoader.load( { name: 'm1', model: 'resources/models/m1.js' } );
  modelLoader.load( { name: 'm1-guitar', model: 'resources/models/guitar.js' } );
  modelLoader.load( { name: 'm2', model: 'resources/models/m2.js' } );
  modelLoader.load( { name: 'm2-drums', model: 'resources/models/drums.js' } );
  modelLoader.load( { name: 'm3', model: 'resources/models/m3.js' } );
  modelLoader.load( { name: 'm3-guitar', model: 'resources/models/bass-guitar.js' } );

}

function preparations() {

/* add scene object */
  scene = new THREE.Scene();

/* add camera */
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.set(2, 50, 110);
  camera.rotation.set(-0.2, 0, 0);
  scene.add( camera );

/* adding models to scene */
  addObjects();

/* render stat */
  var container = document.createElement( 'div' );
  document.body.appendChild( container );
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild( stats.domElement );
   
  /* set WebGL rendering */
  renderer = new THREE.WebGLRenderer( { clearColor: 0xffffff, clearAlpha: 1, antialias: false } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.id = 'renderArea';
  renderer.shadowMapDarkness = 0.25;
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  document.body.appendChild( renderer.domElement );

  /* star rendering */
  render();

}

function start() {
  $('.startBtn').animate( {'width': '0px', 'left': '150px', 'opacity': '0'}, 300, function() {
    $(this).css('display', 'none');
    $('.player').css('display', 'block');
    setTimeout( function() { $('.player').animate({'opacity': '1'}, 1300); }, 1000);
    player.init();
    loadModels();
  } );
  $('body').css( { 'background-color': '#fff' } );
}