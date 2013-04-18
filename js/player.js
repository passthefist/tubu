ojs.player = (function() {
    return function(queue, node) {
        var song = {};
        var q = queue;
        var n = node;
        var self = this;
        var playing = false;
        var ytplayer = null;

        this.start = function() {
            if (!playing) {
                this.playNext();
            }
        }

        this.playNext = function() {

            playing = true;
            song = q.next();

            if (ytplayer) {
                ytplayer.loadVideoById(song.id)
            } else {
                var params = { allowScriptAccess: "always" };
                var atts = { id: "movie" };
                swfobject.embedSWF("http://www.youtube.com/v/"+song.id+"?enablejsapi=1&playerapiid=ytplayer&version=3",
                       "movie", 400, 300, "8", null, null, params, atts);

                ytplayer = document.getElementById('movie');
            }
        };

        function loadError() {
            self.playNext();
        }

        function onPlayerReady(evt) {
            console.log('onPlayerReady', evt);
            evt.target.playVideo();
        }

        function onPlayerStateChange(evt) {
            console.log('onPlayerStateChange', evt);
            if (evt.data == YT.PlayerState.ENDED) {
                self.playNext();
            }
        }
    };
})();
