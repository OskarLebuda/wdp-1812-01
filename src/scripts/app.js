(function () {

    var containerState = {};
    var starContainers = document.getElementsByClassName('stars');
    var stars = document.querySelectorAll('.stars a');

    // function saves stars state when entering container or on save of new state
    // the state is later used to rollback state changes that occure on mouse hover
    var saveStarsState = function (e) {
        if (e.target.tagName === 'A') {
            var container = e.target.parentNode;
        } else if (e.target.tagName === 'DIV') {
            var container = e.target;
        }

        if (container && container.classList.contains('voted')) {
            containerState.voted = true;
        } else {
            containerState.voted = false;
        }

        if (container) {
            for (var i = 0; i < container.childElementCount; i++) {
                containerState['star' + i] = container.children[i].classList.contains('full');
            }
        }
    };

    // fills stars on the left from clicked (original) star
    // empties stars on the right from clicked (original) star
    var letStarsShine = function (originalStar) {
        var star = originalStar;
        do {
            star.classList.add('full');
            star = star.previousElementSibling;
        }
        while (star);

        var star = originalStar.nextElementSibling;
        if (star) {
            do {
                star.classList.remove('full');
                star = star.nextElementSibling;
            }
            while (star);
        }
    };

    // when star is clicked, function adjusts stars state and saves it
    var setVotedStars = function (e) {
        e.target.parentElement.classList.add('voted');
        letStarsShine(e.target);
        saveStarsState(e);
    };

    // when star is hovered, function adjusts stars state
    var hoverOverStar = function (e) {
        e.target.parentElement.classList.add('voted');
        letStarsShine(e.target);
    };

    // when mouse leaves the star, whole star container goes back to original state
    // I had to use this function name :)
    var whenHoverIsOver = function (e) {

        var container = e.target.parentNode;

        if (containerState.voted === true) {
            container.classList.add('voted')
        } else {
            container.classList.remove('voted')
        }

        for (var i = 0; i < container.childElementCount; i++) {
            if (containerState['star' + i] === true) {
                container.children[i].classList.add('full');
            } else {
                container.children[i].classList.remove('full');
            }
        }
    };

    // finally, add event listeners to adequate objects
    for (var i = 0; i < starContainers.length; i++) {
        starContainers[i].addEventListener('click', setVotedStars);
        starContainers[i].addEventListener('mouseenter', saveStarsState);
    }

    for (var i = 0; i < stars.length; i++) {
        stars[i].addEventListener('mouseenter', hoverOverStar);
        stars[i].addEventListener('mouseleave', whenHoverIsOver);
    }

})();
