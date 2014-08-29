// This controller is used switch presentation slides.

function PresentationController() {

    // Private

    var currentSlide = 0; // 0-index

    function updateView () {
        hideAllSlides();
        showCurrentSlide();
        window.scrollTo(0, 0);
    }

    function hideAllSlides() {
        $(".slide").each(function()  {
            $(this).removeClass("slide-active");
        })
    }

    function showCurrentSlide() {
        $(".slide").eq(currentSlide).addClass("slide-active");
    }

    function fixIFrames() {
        // Reduce iframe width to window width
        $("iframe").each(function() {
            if ($(window).width() < $(this).width()) {
                $(this).attr("width", $(window).width() - $(".slide").css("padding-right"));
            }
        })
    }

    function addWindowSizeListener() {
        $(window).resize(function() {
            fixIFrames();
        });
    }

    // Public

    this.nextSlide = function() {
        currentSlide++;

        if (currentSlide + 1 > $(".slide").length) {
            currentSlide = 0;
        }

        updateView();
    };

    this.previousSlide = function() {
        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = $(".slide").length - 1;
        }

        updateView();
    };

    this.initializeController = function() {
        // Activate the first slide
        $(".slide").eq(0).addClass("slide-active");

        fixIFrames();
        addWindowSizeListener();
    }
}