h = {};

h.thumb = "\
    <figure>\
        <img alt='missing' />\
        <figcaption></figcaption>\
    </figure>\
";

$(function() {
    var menu = $('.menu');
    var form = menu.find('.search');
    var input = menu.find('input');
    var submit = menu.find('button');
    var results = menu.find('.results');
    var movie = $('.movie');

    var s = new ojs.search();
    var q = new ojs.q();
    var p = new ojs.player(q,movie);

    submit.on('click',function() {
        s.query(input.val(), function(result) {
            _.each(result, function(song) {
                var item = $("<div>");
                item.append(h.thumb);

                item.find('img').attr('src',song.thumb);
                item.find('figcaption').text(song.title);

                results.append(item);

                item.on('click', function() {
                    q.add(song);
                   // menu.hide(function() {
                        results.empty();
                   // });
                });
            });
        });
    });

    q.onItem(function() {
        p.start();
    });

    $(window).on('mousemove', wake);
    $(window).on('keydown', wake);

    function wake() {
        menu.show();
    };
});
