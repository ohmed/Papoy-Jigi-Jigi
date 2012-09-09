var DEBUG = true;

function init () {

  if (typeof webkitAudioContext !== "function") {
    $('.startBtn').html('поки лише у хромі :(');
    $('.startBtn').css( { 'width': '220px', 'left': '10px' } );
  } else {
    $('.startBtn').click( start );
  }

  function active() {
    $('.startBtn').animate( { 'boxShadowBlur': '20px' }, 700, disactive);
  }

  function disactive() {
    $('.startBtn').animate( { 'boxShadowBlur': '50px' }, 700, active);
  }

  disactive(); 

}

$(document).ready( init );