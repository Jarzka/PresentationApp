// This controller is used switch presentation slides.

function PresentationController() {

    // Private

    var currentSlide = 0; // 0-index

    var updateView = function() {
        hideAllSlides();
        showCurrentSlide();
        window.scrollTo(0, 0);
    };

    var hideAllSlides = function() {
        $(".slide").each(function()  {
            $(this).removeClass("slide-active");
        })
    };

    var showCurrentSlide = function() {
        $(".slide").eq(currentSlide).addClass("slide-active");
    };

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
    }
}