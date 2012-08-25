var DEBUG = true;

function init () {
  
  function active() {
    $('.startBtn').animate( { 'boxShadowBlur': '20px' }, 700, disactive);
  }

  function disactive() {
    $('.startBtn').animate( { 'boxShadowBlur': '50px' }, 700, active);
  }

  disactive(); 
  $('.startBtn').click( start );
}


$(document).ready( init );