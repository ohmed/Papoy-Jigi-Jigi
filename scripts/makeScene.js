var modelLoader;
var scene;
var camera;
var lights = [];
var minions = [];

var m1, m2, m3, m4, d1, d2;

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
  mesh.position.set(5, 21, 20);
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

/* model of m1`s microphone */
  model = modelLoader.get('m1-microphone');
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0x000000, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(5, 21, 20);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.doubleSided = true;
  m1m = mesh;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added m1`s guitar');

/* model of m2 */
  model = modelLoader.get('m2');
  model.geometry.materials[ 0 ].morphTargets = true;
  model.geometry.materials[ 4 ].morphTargets = true;
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0xaaaaaa, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(-25, 22, -10);
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
  mesh.position.set(-25, 22, -10);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  scene.add(mesh);
  m2d = mesh;
  if (DEBUG) console.log('[scene]: added m2`s drums');

/* model of m3 */
  model = modelLoader.get('m3');
  for (var i = 0; i<model.geometry.materials.length; i++)
    model.geometry.materials[ i ].morphTargets = true;
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0xaaaaaa, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(-50, 20, 12);
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
  mesh.position.set(-50, 20, 12);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.doubleSided = true;
  m1g = mesh;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added m3`s bass-guitar');


/* model of m4 */
  model = modelLoader.get('m4');
  for (var i = 0; i<model.geometry.materials.length; i++)
    model.geometry.materials[ i ].morphTargets = true;
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0xaaaaaa, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(40, 20, 3);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.duration = 600;
  mesh.frames = [0, 5];
  mesh.start = 0;
  mesh.keyframes = mesh.frames[ mesh.frames.length - 1 ];
  mesh.lastKeyframe = 5;
  mesh.currentKeyframe = 0;
  mesh.play = 0;
  scene.add(mesh);
  m4 = mesh;
  if (DEBUG) console.log('[scene]: added m4');

/* model of m4`s guitar */
  model = modelLoader.get('m4-guitar');
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0x000000, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(40, 20, 3);
  mesh.scale.set(8, 8, 8);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.doubleSided = true;
  m4g = mesh;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added m4`s guitar');

/* model of left dynamic */
  model = modelLoader.get('dynamics');
  model.geometry.materials[ 0 ].morphTargets = true;
  model.geometry.materials[ 1 ].morphTargets = true;
  model.geometry.materials[ 2 ].morphTargets = true;
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0x000000, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(-65, 10, 25);
  mesh.rotation.set(0, 3.6, 0);
  mesh.scale.set(7, 7, 7);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.doubleSided = true;
  mesh.duration = 200;
  mesh.frames = [0, 10];
  mesh.start = 0;
  mesh.keyframes = mesh.frames[ mesh.frames.length - 1 ];
  mesh.lastKeyframe = 10;
  mesh.currentKeyframe = 0;
  mesh.play = 0;
  d1 = mesh;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added left dynamic');

/* model of right dynamic */
  model = modelLoader.get('dynamics');
  model.geometry.materials[ 0 ].morphTargets = true;
  model.geometry.materials[ 1 ].morphTargets = true;
  model.geometry.materials[ 2 ].morphTargets = true;
  mesh = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial({ color: 0xffffff, specular : 0x000000, ambient : 0xffffff, shininess : 1, shading: THREE.SmoothShading }) );
  mesh.position.set(65, 10, 25);
  mesh.rotation.set(0, 2.3, 0);
  mesh.scale.set(7, 7, 7);
  mesh.receiveShadow = false;
  mesh.castShadow = true;
  mesh.doubleSided = true;
  mesh.duration = 200;
  mesh.frames = [0, 10];
  mesh.start = 0;
  mesh.keyframes = mesh.frames[ mesh.frames.length - 1 ];
  mesh.lastKeyframe = 10;
  mesh.currentKeyframe = 0;
  mesh.play = 0;
  d2 = mesh;
  scene.add(mesh);
  if (DEBUG) console.log('[scene]: added right dynamic');

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
  modelLoader.totalObjects = 9;
  modelLoader.load( { name: 'm1', model: 'resources/models/m1.js' } );
  modelLoader.load( { name: 'm1-microphone', model: 'resources/models/microphone.js' } );
  modelLoader.load( { name: 'm2', model: 'resources/models/m2.js' } );
  modelLoader.load( { name: 'm2-drums', model: 'resources/models/drums.js' } );
  modelLoader.load( { name: 'm3', model: 'resources/models/m3.js' } );
  modelLoader.load( { name: 'm3-guitar', model: 'resources/models/bass-guitar.js' } );
  modelLoader.load( { name: 'm4', model: 'resources/models/m4.js' } );
  modelLoader.load( { name: 'm4-guitar', model: 'resources/models/guitar.js' } );
  modelLoader.load( { name: 'dynamics', model: 'resources/models/dynamics.js' } );

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

/* adding fog */
  scene.fog = new THREE.Fog( 0xffffff, 140, 210 );

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