var modelLoader;
var scene;
var camera;
var lights = [];
var minions = [];

function addObjects() {

  addLights();
}

function addLights() {

}

function preparations() {

  /* load models */
  modelLoader = new ModelLoader( addObjects );

  /* add scene object */
  scene = new THREE.Scene();

  /* add camera */
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.set(0, 5, 0);
  camera.rotation.set(0, 0, 0);
  scene.add( camera );

  // render stat
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
  document.body.appendChild( renderer.domElement );

  /* star rendering */
  render();

}

function start() {
  $('.startBtn').animate( {'width': '0px', 'left': '150px', 'opacity': '0'}, 300, function() {
    $(this).css('display', 'none');
    $('.player').css('display', 'block');
    setTimeout( function() { $('.player').animate({'opacity': '1'}, 1300); }, 1000);
    preparations();
  } );
  $('body').css( { 'background-color': '#fff' } );
}