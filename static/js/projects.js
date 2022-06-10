$(document).ready(function() {
    $.each($(".project-display"), function(i, val) {
        // Grab display text.
        let displayText = $(val).children(".text-img-centered");
        displayText = $(displayText[0]).children(".project-display-name")
        displayText = displayText[0];
        $(displayText).css("opacity", 0);

        // Grab display background.
        let img = $($(val).children(".project-image")[0]);
        let animationSpeed = 200;

        $(val).hover(
            (metadata) => {
                anime.timeline({})
                .add({
                    targets: img,
                    duration: animationSpeed,
                    update: function(anim) {
                        img.css({"filter": 'blur(' +  anim.progress / 10  + 'px)'})
                    }
                })
                .add({
                    targets: displayText,
                    duration: animationSpeed + 100,
                    opacity: [0, 1]
                }, "-=" + animationSpeed);
            },
            (metadata) => {
                anime.timeline({})
                .add({
                    targets: img,
                    duration: animationSpeed,
                    update: function(anim) {
                        img.css({"filter": 'blur(' +  (10 - anim.progress / 10)  + 'px)'})
                    }
                })
                .add({
                    targets: displayText,
                    duration: animationSpeed + 100,
                    opacity: [1, 0]
                }, "-=" + animationSpeed);
            }
        );
    });
});
