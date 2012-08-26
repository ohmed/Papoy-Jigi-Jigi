(function(){

  var tabs = {
    'guitar': [[],[],[],[],[],[]],
    'bass': [[],[],[],[]],
    'vocals': [[],[],[],[],[],[]]
  };

  var music = {
    'guitar': [],
    'bass': [],
    'vocals': [],
    'tactNum': 0
  }

  var raws = {
    'guitar': null,
    'bass': null,
    'vocals': null,
    'lyrics': null,
    'loaded': 0,

    _filePath: {
      'ac_dc': '/resources/audio/ac_dc/',
      'u2' : '/resources/audio/u2/',
      'oasis' : '/resources/audio/oasis/'
    },

    load: function (song) {
      song = song || 'ac_dc';
      var self = this;
      $.ajax({
        url: self._filePath[song] + 'bass.txt',
        success: function (data) {
          self.bass = data.replace(/\r\n\r\n/g,'$')
                            .replace(/\r\n/g,'%')
                            .replace(/\$\%/g,'$')
                            .replace(/\|\%/g,'%')
                            .replace(/\|\$/g,'$');
          self.loaded += 1;
        }
      });
      $.ajax({
        url: self._filePath[song] + 'guitar.txt',
        success: function (data) {
          self.guitar = data.replace(/\r\n\r\n/g,'$')
                            .replace(/\r\n/g,'%')
                            .replace(/\$\%/g,'$')
                            .replace(/\|\%/g,'%')
                            .replace(/\|\$/g,'$');
          self.loaded += 1;
        }
      });
      $.ajax({
        url: self._filePath[song] + 'lyrics.txt',
        success: function (data) {
          self.lyrics = data;
          self.loaded += 1;          
          var lyricsTemp = self.lyrics;
          self.lyrics = [];
          for (var i = 0; i < lyricsTemp.length; i++) {
            if (/[aeiouy]/.test(lyricsTemp[i])) {
              self.lyrics.push(lyricsTemp[i]);
            }
          }
        }
      });
      $.ajax({
        url: self._filePath[song] + 'vocals.txt',
        success: function (data) {
          self.vocals = data.replace(/\r\n\r\n/g,'$')
                            .replace(/\r\n/g,'%')
                            .replace(/\$\%/g,'$')
                            .replace(/\|\%/g,'%')
                            .replace(/\|\$/g,'$')
                            .replace(/[Lsg]/g, '-');
          self.loaded += 1;
        }
      });
    }
  };

  //raws.load('oasis');
  //raws.load('u2');
  raws.load('ac_dc');
  
  music.compose = function (callback) {

    var instruments = ['guitar', 'bass', 'vocals'];

    for (var _i in instruments) {
      var instrument = instruments[_i];
      var parts = raws[ instrument ].split('$');
      for (var i = 0; i < parts.length; i++) {
        var strings = parts[i].split('%');
        for (var j = 0; j < strings.length; j++) {
          var _new = tabs[ instrument ][j].concat(strings[j].split('|'));
          tabs[ instrument ][j] = _new;
        }
      }
    }

    music.tactNum = tabs.guitar[5].length;

    for (var _i in instruments) {
      var instrument = instruments[_i];
      music[ instrument ] = tabs[ instrument ][0];
    }

    for (var _i in instruments) {
      var instrument = instruments[_i];
      for (var i = 0; i < music.bass.length - 1; i++) {
        music[instrument][i] = music[instrument][i].split('');
      }
    }

    for (var _i in instruments) {
      var instrument = instruments[_i];
      for (var i = 0; i < tabs[instrument].length; i++) {
        for (var j = 0; j < music.bass.length - 1; j++) {
          for (var k = 0; k < tabs[instrument][i][j].length; k++) {
            if (music[ instrument ][j][k] === '-' && tabs[instrument][i][j][k] !== '-') {
              music[ instrument ][j][k] = tabs[instrument][i][j][k];
            }
          }
        }
      }
    }

    for (var i = 0; i < music.vocals.length; i++) {
      for (var j = 0; j < music.vocals[i].length; j++) {
        if (music.vocals[i][j] !== '-' ) {
          music.vocals[i][j] = raws.lyrics.pop() || 'o';
        }
      }
    }

    callback();
  }

  music.raws = raws;

  var intervalID = setInterval(function () {
    if (raws.loaded === 4) {
      window.band.music = music;
      clearInterval(intervalID);
    }
  }, 500);  

}());