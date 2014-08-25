// This controller is used to capture user inputs
// Dependencies: PresentationController

function InputController() {

    // Private

    // Public

    this.initializeController = function() {

        // Show / hide navigation arrows

        $(".controls-area").mouseenter(function() {
            $(".control").css("opacity", "1");
        });

        $(".controls-area").mouseleave(function() {
            $(".control").css("opacity", "0");
        });

        // Event publishers

        $(".arrow-left").click(function() {
            $.publish("/backward", []);
        });

        $(".arrow-right").click(function() {
            $.publish("/forward", []);
        });

        if ($(window).width() < 520) { // Swipe support on mobile
            $("html").swipeleft(function() {
                $.publish("/forward", []);
            });

            $("html").swiperight(function() {
                $.publish("/backward", []);
            });
        }

        $("html").keydown(function(e) {
            if(e.keyCode == 37) { // left
                $.publish("/backward", []);
            }
            else if(e.keyCode == 39) { // right
                $.publish("/forward", []);
            }
            else if (e.keyCode == 32) { // space
                $.publish("/forward", []);
            }
        });

        // Event subscribers

        $.subscribe("/forward", function() {
            presentationApp.presentationController.nextSlide();
        });

        $.subscribe("/backward", function() {
            presentationApp.presentationController.previousSlide();
        });
    };
}