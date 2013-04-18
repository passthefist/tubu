ojs.search = (function() {
    return function() {

        //private
        var url = 'https://gdata.youtube.com/feeds/api/videos?format=5&category=music&alt=json&q=';
        var limit = 4;

        var parseQueryResults = function(result) {
            var songs = [];

            _.each(result.feed.entry, function(entry) {
                if (!entry.gd$rating) {
                    return;
                }

                var info = {};

                info.thumb = entry.media$group.media$thumbnail[0].url;
                info.title = entry.title.$t;
                info.rating = entry.gd$rating.average;
                info.raters = entry.gd$rating.numRaters;

                for(i in result.feed.entry[0].link) {
                    if (!entry.link[i]) {
                        continue;
                    }
                    var id = entry.link[i].href.split('/').pop();
                    if(id.match('^[a-z_A-Z0-9-]{10}')) {
                        info.id = id;
                    }
                };

                if(!info.id) {
                    return;
                }

                var value = new ojs.youtuple(
                    info.id,
                    info.thumb,
                    info.title,
                    info.rating,
                    info.raters
                );

                songs.push(value);
            });

            songs.sort(function(a,b) {
                return b.score - a.score;
            });

            return songs.slice(0,limit);
        };

        //public
        this.query = function(query,callback) {
            $.getJSON(url+query, function(result) {

                var value = parseQueryResults(result);

                callback(value);
            });
        }
    }
})();

