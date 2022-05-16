function registerScrollAnimationClass(class_name, setup, anim, scroll_offset=100) {
    setup();

    const elementInView = (el, offset = 100) => {
        // https://webdesign.tutsplus.com/tutorials/animate-on-scroll-with-javascript--cms-36671
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            ((window.innerHeight || document.documentElement.clientHeight) - offset)
        );
    };

    const handleScrollAnimation = () => {
        const scrollElement = $("." + class_name);

        if (scrollElement.length == 0) {
            window.removeEventListener("scroll", handleScrollAnimation);
        }
        else {
            $.each(scrollElement, function(i, val) {
                if (elementInView(val, scroll_offset)) {
                    anim();
                    $(val).removeClass(class_name);
                }
            });
        }
    }
    window.addEventListener('scroll', handleScrollAnimation);
}

$(document).ready(function() {
    let move_in_offset = 1000;
    registerScrollAnimationClass(
        "scroll-in",
        () => {
            $(".scroll-in").css("opacity", 0);
            $(".scroll-in").css("transform", "translateX(" + move_in_offset + "px)");
        },
        () => {
            $(".scroll-in").css("opacity", 1);
            anime.timeline({})
            .add({
                targets: ".scroll-in",
                duration: 1000,
                translateX: 0
            });
        },
        50
    );

    registerScrollAnimationClass(
        "scroll-appear",
        () => {
            $(".scroll-appear").css("opacity", 0);
            $(".scroll-appear").css("transform", "translateX(-" + move_in_offset + "px)");
        },
        () => {
            anime.timeline({})
            .add({
                targets: ".scroll-appear",
                duration: 2000,
                opacity: [0, 1],
                translateX: 0
            });
        },
        50
    );

    registerScrollAnimationClass(
        "scroll-opacity",
        () => {
            $(".scroll-opacity").css("opacity", 0);
        },
        () => {
            anime.timeline({})
            .add({
                targets: ".scroll-opacity",
                duration: 6000,
                opacity: [0, 1],
            });
        },
        50
    );

    let title_image = $("#title-image");
    anime.timeline({})
    .add({
        targets: "#title-image",
        duration: 1000,
        update: function(anim) {
            title_image.css({"filter": 'blur(' +  anim.progress / 10  + 'px)'})
        }
    })
    .add({
        targets: ".title-text",
        easing: "easeInOutQuad",
        duration: 1000,
        opacity: [0, 1]
    });

    let beginTime = new Date("5/16/2022");
    let timer = $(".timer");
    let updateTimer = () => {
        let endTime = Date.now();
        let timeDiff = endTime - beginTime;
        timeDiff /= 1000;

        let minConvert = 60;
        let hourConvert = minConvert * 60;
        let dayConvert = hourConvert * 24;

        let days = Math.floor(timeDiff / dayConvert);
        let hours = Math.floor(timeDiff / hourConvert- days * 24)
        let mins = Math.floor(timeDiff / minConvert - days * 24 * 60 - hours * 60 );
        let seconds = Math.round(timeDiff - days * dayConvert - hours * hourConvert - minConvert *mins);

        let addS = (val) => {
            return val > 1 ? "s" : "";
        }

        let outputStr = days + " Day" + addS(days);
        outputStr += " " + hours + " Hour" + addS(hours);
        outputStr += " " + mins + " Min" + addS(mins);
        outputStr += " " + seconds + " Second" + addS(seconds);
        timer.html(outputStr);

        setTimeout(updateTimer, 900);
    };
    setTimeout(updateTimer, 900);
});
