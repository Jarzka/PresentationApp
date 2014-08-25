// This controller is used to add additional functionality to individual presentation slides.

function SlideController() {

    // Private

    // Public

    this.initializeController = function() {
        $("#theme-default").click(function(e) {
            e.preventDefault();
            $("#presentation-theme").attr("href", "themes/theme_default.css");
        });

        $("#theme-basic").click(function(e) {
            e.preventDefault();
            $("#presentation-theme").attr("href", "themes/theme_basic.css");
        });

        $("#theme-green").click(function(e) {
            e.preventDefault();
            $("#presentation-theme").attr("href", "themes/theme_green.css");
        });

        $("#theme-love").click(function(e) {
            e.preventDefault();
            $("#presentation-theme").attr("href", "themes/theme_love.css");
        });
    }
}