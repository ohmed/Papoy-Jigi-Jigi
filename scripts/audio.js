var player = {
  init: function() {
    
    /* setting handlers */
    $('.player .title').click( function() {
      if ($(this).attr('state') === 'closed') {
        $('.player').animate({'height': '150px'}, 400);
        $(this).attr('state', 'opened');
        $(this).html('Close controls');
        $(this).css( 'border-radius', '10px 10px 0px 0px');
      } else {
        $('.player').animate({'height': '30px'}, 400);
        $(this).attr('state', 'closed');
        $(this).html('Open controls');
        $(this).css( 'border-radius', '10px 10px 10px 10px');
      }
    });

  }
}