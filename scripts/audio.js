var tmp = [];
var freqByteData1 = [];
setInterval( function() {
  tmp = freqByteData1;
}, 30);

var player = {
  audio: new Audio(),
  drums: new Audio(),
  currend: 0,
  list: [],
  source: false,
  context: new webkitAudioContext(),
  analyser: false,
  volumeLevel: 0,
  analInt: 0,
  bitData: [],
  analyserProcessor: function() {
    var freqByteData = new Uint8Array(player.analyser.frequencyBinCount);
    player.analyser.getByteFrequencyData(freqByteData);
    player.bitData = freqByteData;

    const SPACER_WIDTH = 1;
    const numBars = 2024;
      
    freqByteData1 = freqByteData;

    if (tmp.length>0) {
      var sum = 0;
      for (var i = 0; i < 2; ++i) {
        var d = freqByteData1[i] - tmp[i];
        sum += d;
      }
      if (sum>50) console.log('BUM!');

      sum = 0;
      for (var i = 0; i < 1; ++i) {
        var d = freqByteData1[i] - tmp[i];
        sum += d;
      }
      if (sum<50 & sum>10 ) {
        console.log('bemc!');
        m2.play = Math.round(Math.random() + 2);
      }

      sum = 0;
      for (var i = 20 - 5; i < 20; ++i) {
        var d = freqByteData1[i] - tmp[i];
        sum += Math.abs(d);
      }
      if (sum<55 && sum>45) {
        console.log('dzinj!');
        m2.play = 1;
      }
    }
  },
  time: function() {
    var t = Math.round(player.audio.currentTime);
    var min = Math.floor(t / 60);
    var sec = (t % 60>9) ? t % 60: '0' + t % 60;
    $('.time').html( min + ':' + sec );
    $('.progress').css( 'width', 100 * (t/player.audio.duration) + '%' );
  },
  play: function() {
    if (player.audio.src === '') {
      var url = $($('.list tr')[0]).attr('url');
      player.audio.src = url;
      /*setTimeout( function() {*/ player.audio.play(); //}, 4000 );

      player.drums.src = '/resources/audio/u2/u2_drums.ogg';
      
      /*setTimeout( function() {*/ player.drums.play(); //}, 1000);

      player.audio.addEventListener( 'timeupdate', player.time );

      setTimeout( function() {
        player.source = player.context.createMediaElementSource(player.drums);
        player.analyser = player.context.createAnalyser(),
        player.analyser.smoothingTimeConstant = 0.4;
        player.source.connect(player.analyser);
        player.analInt = setInterval(player.analyserProcessor, 35);
        $('.playBtn').css('background-image', 'url("/resources/img/pause.png")');
        setTimeout( function() { band.tune(); }, 1);
      }, 30 );

      return;
    }

    /*if (!player.audio.paused) {
      $('.playBtn').css('background-image', 'url("/resources/img/play.png")');
      player.audio.pause();
    } else {
      $('.playBtn').css('background-image', 'url("/resources/img/pause.png")');
      player.audio.play();
    }*/

  },
  playTrack: function() {

  },
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

    $('.playBtn').click(player.play);

    $('.list tr').click(player.playTrack);

  }
}