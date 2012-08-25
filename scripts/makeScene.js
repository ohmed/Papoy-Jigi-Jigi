function addObjects() {

}

function addLights() {

}

function start() {
  $('.startBtn').animate( {'width': '0px', 'left': '150px', 'opacity': '0'}, 300, function() {
    $(this).css('display', 'none');
    $('.player').css('display', 'block');
    setTimeout( function() { $('.player').animate({'opacity': '1'}, 1300); }, 1000);
  } );
  $('body').css( { 'background-color': '#fff' } );
}