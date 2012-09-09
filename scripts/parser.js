var parser = {

  callback: function() {

  },

  tabs: {
    'guitar': [[],[],[],[],[],[]],
    'bass': [[],[],[],[]],
    'vocals': [[],[],[],[],[],[]]
  },

  music: {
    'guitar': [],
    'bass': [],
    'vocals': [],
    'tactNum': 0
  },

  clear: function() {
    this.raws.loaded = 0;
    this.tabs = {'guitar': [[],[],[],[],[],[]],'bass': [[],[],[],[]],'vocals': [[],[],[],[],[],[]]};
    this.music = {'guitar': [],'bass': [],'vocals': [],'tactNum': 0};
  },

  raws: {
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

          if (self.loaded === 4) parser.finish();
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

          if (self.loaded === 4) parser.finish();

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
          if (self.loaded === 4) parser.finish();
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

          if (self.loaded === 4) parser.finish();
        }
      });
    }
  },
  
  compose: function(callback) {

    var instruments = ['guitar', 'bass', 'vocals'];

    for (var _i in instruments) {
      var instrument = instruments[_i];
      var parts = this.raws[ instrument ].split('$');
      for (var i = 0; i < parts.length; i++) {
        var strings = parts[i].split('%');
        for (var j = 0; j < strings.length; j++) {
          var _new = this.tabs[ instrument ][j].concat(strings[j].split('|'));
          this.tabs[ instrument ][j] = _new;
        }
      }
    }

    this.music.tactNum = this.tabs.guitar[5].length;

    for (var _i in instruments) {
      var instrument = instruments[_i];
      this.music[ instrument ] = this.tabs[ instrument ][0];
    }

    for (var _i in instruments) {
      var instrument = instruments[_i];
      for (var i = 0; i < this.music.bass.length - 1; i++) {
        this.music[instrument][i] = this.music[instrument][i].split('');
      }
    }

    for (var _i in instruments) {
      var instrument = instruments[_i];
      for (var i = 0; i < this.tabs[instrument].length; i++) {
        for (var j = 0; j < this.music.bass.length - 1; j++) {
          for (var k = 0; k < this.tabs[instrument][i][j].length; k++) {
            if (this.music[ instrument ][j][k] === '-' && this.tabs[instrument][i][j][k] !== '-') {
              this.music[ instrument ][j][k] = this.tabs[instrument][i][j][k];
            }
          }
        }
      }
    }

    this.raws.lyrics = this.raws.lyrics.reverse();

    for (var i = 0; i < this.music.vocals.length; i++) {
      for (var j = 0; j < this.music.vocals[i].length; j++) {
        if (this.music.vocals[i][j] !== '-' ) {
          this.music.vocals[i][j] = this.raws.lyrics.pop() || 'o';
        }
      }
    }

    callback();
  },

  finish: function() {
    window.band.music = parser.music;
    this.callback();
  }

}