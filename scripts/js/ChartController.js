// This controller is used construct charts.

function ChartController() {

    // Private

    function constructChart() {
        // Convert bar chart to standard HTML / CSS
        $("pa-barchart").each(function() {
            $(this).replaceWith("<div class='chart bar-chart'>" + this.innerHTML + "</div>");
        });

        // Convert bars to standard HTML / CSS

        $("pa-bar").each(function() {
            var barChartStandard = $("<div class='chart-bar'></div>");
            barChartStandard.attr("value", $(this).attr("value"));
            barChartStandard.attr("name", $(this).attr("name"));
            barChartStandard.attr("color", $(this).attr("color"));
            $(this).replaceWith(barChartStandard);
        });
    }

    function positionCharts() {
        bars = $(".chart-bar");

        function positionChartsX() {
            // Position bars on the x-axis.
            bars.each(function(index) {
                $(this).css("left", index * 100 + 25);
            });
        }

        function setBarHeights() {
            var highestBarHeight = 270;

            // Find the chart bar with the highest value and set it's height to 100%.

            var highestBar = {};
            var highestBarIndex = 0;
            bars.each(function(index) {
                if (index == 0) {
                    highestBar = $(this);
                } else {
                    if ($(this).attr("value") > highestBar.attr("value")) {
                        highestBarIndex = index;
                        highestBar = $(this);
                    }
                }
            });
            highestBar.css("height", highestBarHeight);

            // All other chart height values are set relative to the highest bar value.
            bars.each(function(index) {
                if (index != highestBarIndex) {
                    $(this).css("height", ($(this).attr("value") / highestBar.attr("value")) * highestBarHeight);
                }
            });
        }

        function setBarAreaSize() {
            $(".chart-area").css("width", bars.length * 100)
        }

        function addLabels() {
            bars.each(function(index) {
                var label = $("<p>" + $(this).attr("name") + "</p>");
                $(".chart-area").append(label);
            });
        }

        if (bars.length > 0) {
            positionChartsX();
            setBarHeights();
            setBarAreaSize();
            addLabels();
        }
    }

    function colorCharts() {
        $(".chart-bar").each(function() {
            $(this).css("background-color", $(this).attr("color"));
        });
    }

    // Public

    this.initializeController = function() {
        constructChart();
        positionCharts();
        colorCharts();
    }
}