// Define global variable or "namespace" for the application
var presentationApp = {};

$(document).ready(function() {
    // Load presentation theme
    $.getScript("presentations/" + presentationName + "/presentation.js", function() {
        $("#presentation-theme").attr("href", "themes/" + theme + "/style.css");
    });

    // Load presentation slides
    $(".slides").load( "presentations/" + presentationName + "/slides.html", function() {
        // Load & initialize controllers
        presentationApp.presentationController = new PresentationController();
        presentationApp.presentationController.initializeController();

        presentationApp.inputController = new InputController();
        presentationApp.inputController.initializeController();

        presentationApp.charController = new ChartController();
        presentationApp.charController.initializeController();

        $.getScript("presentations/" + presentationName + "/scripts/js/SlideController.js", function() {
            presentationApp.slideController = new SlideController();
            presentationApp.slideController.initializeController();
        });

        // Set presentation slide styles
        $("#presentation-slide-style").attr("href", "presentations/" + presentationName + "/style/slides.css");


        // Fix relative image and video urls
        $("[src]").each(function() {
            if ($(this).attr("src").indexOf("media/", 0) != -1) {
                $(this).attr("src", "presentations/" + presentationName + "/" + $(this).attr("src"));
            }

        });
    });
});