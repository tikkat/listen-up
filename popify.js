var playingCssClass = 'playing',
    audioObject = null;

if (Meteor.isClient) {

  Session.setDefault('clickedSong', false);

  Template.result.helpers({
    'showResponse': function() {
      var response = Session.get('responseQuery');
      console.log(response);
      return response;
    },
    'clickedSong': function() {
      var clickedSong = this.id;
      var currentSong = Session.get('clickedSong');
      return (clickedSong == currentSong) ? 'add-song' : 'hidden';
    }
});

  Template.body.events({
    'submit': function (e) {
      e.preventDefault();
      searchTracks(document.getElementById('query').value);
      document.getElementById('query').value = '';
    }
  });

  Template.result.events({
    'click .cover': function (e) {
      var song = this.id;
      Session.set('clickedSong', song);
    }
  });

  document.addEventListener('click', function (e) {
      var target = e.target;
      if (target !== null && target.classList.contains('add-song')) {
          if (target.classList.contains(playingCssClass)) {
              audioObject.pause();
          } else {
              if (audioObject) {
                  audioObject.pause();
              }
              audioObject = new Audio(target.getAttribute('data-preview-url'));
              audioObject.play();
              target.classList.add(playingCssClass);
              audioObject.addEventListener('ended', function () {
                  target.classList.remove(playingCssClass);
              });
              audioObject.addEventListener('pause', function () {
                  target.classList.remove(playingCssClass);
              });
          }
      }
  });
}

var fetchTracks = function (albumId, callback) {
    $.ajax({
        url: 'https://api.spotify.com/v1/tracks/' + albumId,
        success: function (response) {
            callback(response);
        }
    });
};

var searchTracks = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track'
        },
        success: function (response) {
          Session.set('responseQuery', response);
        }
    });
};

var postTrack = function (query) {
  var userID      = 'tikkasaurus';
  var playlistID  = '1x3agKDiz9YBL5IbYMfH7a'; // listbuilder playlist
  var url = 'https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID + '/tracks';
  $.ajax(url, {
            type: "POST",
            data: JSON.stringify(tracks),
        		dataType: 'text',
        		headers: {
        			'Authorization': 'Bearer ' + g_access_token,
        			'Content-Type': 'application/json'
        		},
            success: function() {
                alert("Success");
            },
            error: function(xhr) {
                alert("fail");
            }
        });
};
