var band = band || {};

band.interval = false;

band.play = function () {
  var tempo = player.duration / band.music.tactNum;
  var self = this;
  var i = 0;
  band.interval = setInterval(function () { 

    band.guitar.play(band.music.guitar[i]);

    band.bass.play(band.music.bass[i]);

    band.vocals.play(band.music.vocals[i], tempo);
    
    i++; 

    if (i >= band.music.tactNum) {
      band.finish();
      clearInterval(intervalID);
    }

  }, ( tempo ) * 1000 );

};

band.tune = function () {
  var intervalID = setInterval(function () {
    console.log('tuning');
    if (typeof band.music !== 'undefined') {
      parser.compose(band.play);
      clearInterval(intervalID);
    }
  }, 500);
};

band.finish = function () {
  console.log('finish');
};

band.vocals = {
  play: function (chars, tempo) {
    chars = chars || [];
    if (chars.length === 0) return;
    var self = this;
    var j = 0;
    var intervalID = setInterval(function () {
      self._animateMouth[chars[j]]();
      j++; 
      if (chars[j] !== '-') {
        m1.duration = (tempo / chars.length) * 3000;
      }
      if(j >= chars.length) 
        clearInterval(intervalID);
    }, (tempo / chars.length) * 1000);
  },
  _animateMouth: {
    'a': function () {
      console.log('a');
      if (!m1.play)
        m1.play = 3;
    },
    'e': function () {
      console.log('e');
      if (!m1.play)
        m1.play = 3;
    },
    'i': function () {
      console.log('i');
      if (!m1.play)
        m1.play = 5;
    },
    'o': function () {
      console.log('o');
      if (!m1.play)
        m1.play = 2;
    }, 
    'u': function () {
      console.log('u');
      if (!m1.play)
        m1.play = 4;
    },
    'y': function () {
      console.log('y');
      // m1.play = 5;//
    },
    '-': function () {
    }
  }
};

band.drums = {
  play: function () {

  }
};

band.guitar = {
  play: function (notes) {
    console.log('guitar-play ' + notes);
    var tactDuration = 2000 * player.duration / band.music.tactNum + 4000;
    m4.duration = Math.round( ( tactDuration / notes.length ) ) + 30;
    var inter = 0;
    for (var i = 0; i<notes.length; i++) {
      if ( notes[i] !== '-' ) {
        setTimeout( function() {
          if (m4.play === 0) {
            m4.play = 1;
          }
        }, inter);
        inter += m4.duration + 30;
      } else {
        inter += m4.duration - 20;
      }
    }
  }
};

band.bass = {
  play: function (notes) {
    console.log('bass-play ' + notes);
    var tactDuration = 5000 * player.duration / band.music.tactNum;
    m3.duration = Math.round( ( tactDuration / notes.length ) ) + 30;
    var inter = 0;
    for (var i = 0; i<notes.length; i++) {
      if ( notes[i] !== '-' ) {
        setTimeout( function() {
          if (m3.play === 0) {
            m3.play = Math.round( Math.random() ) + 1;
          }
        }, inter);
        inter += m3.duration + 30;
      } else {
        inter += m3.duration - 20;
      }
    }
  }
};
