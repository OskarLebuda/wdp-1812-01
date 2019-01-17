(function () {

    var starContainers = document.getElementsByClassName('stars');

    var setVotedStars = function(e) {
        e.target.parentElement.classList.add('voted');
        if (e.target.tagName === 'A') {
            var origStar = e.target;
            var star = origStar;
            do {
                star.classList.add('full');
                star = star.previousElementSibling;
            }
            while (star);
            var star = origStar.nextElementSibling;
            if (star) {
                do {
                    star.classList.remove('full');
                    star = star.nextElementSibling;
                }
                while (star);
            }
        }
    };

    for (var i = 0; i < starContainers.length; i++) {
        starContainers[i].addEventListener('click', setVotedStars);
    }


})();
