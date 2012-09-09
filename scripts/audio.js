var tmp = [];
var freqByteData1 = [];
setInterval( function() {
  tmp = freqByteData1;
}, 30);

var player = {
  audio: new Audio(),
  drums: false,
  currend: 0,
  list: [],
  source: false,
  context: false,
  analyser: false,
  volumeLevel: 0,
  analInt: 0,
  bitData: [],
  currTrack: false,
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
      if (sum>50) {
        console.log('BUM!');
        d1.play = 1;
        d2.play = 1;
      }

      sum = 0;
      for (var i = 0; i < 1; ++i) {
        var d = freqByteData1[i] - tmp[i];
        sum += d;
      }
      if (sum<50 & sum>10 ) {
        console.log('bemc!');
        d1.play = 2;
        d2.play = 2;
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

    if (player.audio.duration === player.audio.currentTime) {
      clearInterval(band.interval);
      parser.clear();
      m1.play = 0;
      m1.currentKeyframe = 0;
      m2.play = 0;
      m2.currentKeyframe = 0;
      m3.play = 0;
      m3.currentKeyframe = 0;
      clearTimeout( m3.timeout );
      m4.play = 0;
      m4.currentKeyframe = 0;
      clearTimeout( m4.timeout );

      if (player.currTrack.split(':')[0] == 'u2') {
        theEnd();
        return;
      }

      var n = 1;
      if (player.currTrack == 'oasis') n = 2;
      player.play( $($('.list tr')[n]).attr('track') );

    }

    if (player.audio.buffered.end(0) <= Math.round( 100 * t/player.audio.duration) )
      this.pauseResumeVisual(true);

  },
  play: function( trackInf ) {

    var track;
    if (trackInf === undefined) {
      track = $($('.list tr')[0]).attr('track').split(':')[0];
    } else {
      track = trackInf.split(':')[0];
    }

    if (player.audio.src === '' || trackInf !== undefined) {

      player.currTrack = track;
      parser.clear();
      parser.raws.load( track );

      parser.callback = finish;

      m1.play = 0;
      m1.currentKeyframe = 0;
      m2.play = 0;
      m2.currentKeyframe = 0;
      m3.play = 0;
      m3.currentKeyframe = 0;
      clearTimeout( m3.timeout );
      m4.play = 0;
      m4.currentKeyframe = 0;
      clearTimeout( m4.timeout );

      function finish() {

        var url = '/resources/audio/' + track + '/' + track + '.ogg';
        player.duration = parseInt(trackInf.split(':')[1]);
        player.audio.src = url;

        player.audio.play();

        player.drums.src = '';
        player.drums = new Audio();
        player.drums.src = '/resources/audio/' + track + '/' + track + '_drums.ogg';
        
        player.drums.play();

        player.audio.addEventListener( 'timeupdate', player.time );

        setTimeout( function() {
          player.source = player.context.createMediaElementSource(player.drums);
          player.analyser = player.context.createAnalyser(),
          player.analyser.smoothingTimeConstant = 0.4;
          player.source.connect(player.analyser);
          try { clearInterval(player.analInt); } catch(e) {}
          player.analInt = setInterval(player.analyserProcessor, 35);
          $('.playBtn').css('background-image', 'url("/resources/img/pause.png")');
          band.tune();
        }, 30 );

        var n = 0;
        if (player.currTrack == 'oasis') n = 1;
        if (player.currTrack == 'u2') n = 2;
        $('tr span').html('');
        $($('tr span')[n]).html(' (ON)');
        
      }
      $('.playBtn').css('background-image', 'url("/resources/img/pause.png")');
      return;
    }

    if (!player.audio.paused) {
      $('.playBtn').css('background-image', 'url("/resources/img/play.png")');
      player.drums.pause();
      player.audio.pause();
      this.pauseResumeVisual(true);
    } else {
      $('.playBtn').css('background-image', 'url("/resources/img/pause.png")');
      player.audio.play();
      player.drums.play();
      this.pauseResumeVisual(false);
    }

  },
  pauseResumeVisual: function(state) {
    if (state) {
      m1.play = 0;
      m1.currentKeyframe = 0;
      m2.play = 0;
      m2.currentKeyframe = 0;
      m3.play = 0;
      m3.currentKeyframe = 0;
      clearTimeout( m3.timeout );
      m3.timeout = 'x';
      m4.play = 0;
      m4.currentKeyframe = 0;
      clearTimeout( m4.timeout );
      m4.timeout = 'x';
      clearInterval(band.interval);
    } else {
      band.play();
    }
  },
  playTrack: function() {
    clearInterval(band.interval);
    player.play( $(this).attr('track') );
  },
  init: function() {
    
    if (typeof webkitAudioContext === "function") {
      player.context = new webkitAudioContext();
    }

    /* setting handlers */
    $('.player .title').click( function() {
      if ($(this).attr('state') === 'closed') {
        $('.player').animate({'height': '150px'}, 400);
        $(this).attr('state', 'opened');
        $(this).html('Закрити, щоб не заважало');
        $(this).css( 'border-radius', '10px 10px 0px 0px');
      } else {
        $('.player').animate({'height': '30px'}, 400);
        $(this).attr('state', 'closed');
        $(this).html('Відкрийте, щоб почати');
        $(this).css( 'border-radius', '10px 10px 10px 10px');
      }
    });

    $('.playBtn').click( function() {
      if (player.audio.src === '') {
        player.play( $($('tr')[0]).attr('track') );
      } else {
        player.play();
      }
    } );

    $('.list tr').click(player.playTrack);

  }
}