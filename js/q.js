ojs.q = (function() {
    var rate = .3;

    return function() {
        var q = [];

        this.add = function(item) {
            q.push(item);
            console.log('add',q);
            if(q.length == 1 && this.itemcb) {
                this.itemcb();
            }
        };

        this.next = function() {
            var index = 0;

            if(Math.random() < rate) {
                index = findBest();
            }

            var song = q[index];
            console.log('next',song);
            this.remove(index);
            return song;
        }

        this.remove = function(index) {
            console.log('remove',q);
            return q.splice(index, 1)[0];
        }

        this.onEmpty = function() {};

        this.onItem = function(callback) {
            this.itemcb = callback;
        };

        function findBest() {
            var best = 0;
            var found = -1;

            for(var i in q) {
                if (q[i].score > best) {
                    found = i;
                    best = q[i].score;
                }
            }

            return found;
        }
    }
})();
