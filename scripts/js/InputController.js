// This controller is used to capture user inputs
// Dependencies: PresentationController

function InputController() {

    // Private

    var isSwipeEnabled = true;

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

        $("html").swipeleft(function() {
            if (isSwipeEnabled) {
                $.publish("/forward", []);
            }
        });

        $("html").swiperight(function() {
            if (isSwipeEnabled) {
                $.publish("/backward", []);
            }
        });

        $("html").keydown(function(e) {
            if(e.keyCode == 83) { // s
                if (isSwipeEnabled) {
                    toastr.info("Swiping disabled.");
                    isSwipeEnabled = false;
                } else {
                    toastr.info("Swiping enabled.");
                    isSwipeEnabled = true;
                }
            }

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