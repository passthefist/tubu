ojs.youtuple = (function() {
    return function(
        id,
        thumb,
        title,
        rating,
        raters
    ) {
        this.id = id;
        this.thumb = thumb;
        this.title = title;
        this.rating = rating;
        this.raters = raters;

        this.score = rating*rating + Math.log(raters)/Math.E;
    }
})();
