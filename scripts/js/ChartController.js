// This controller is used construct charts.

function ChartController() {

    // Private

    function convertBarChartsToStandardHTML() {
        // Convert bar chart to standard HTML / CSS
        $("pa-barchart").each(function() {
            $(this).replaceWith("<div class='chart bar-chart'>" + this.innerHTML + "</div>");
        });

        // Convert bars to standard HTML / CSS

        $("pa-bar").each(function() {
            var barStandard = $("<div class='bar'></div>");
            barStandard.attr("value", $(this).attr("value"));
            barStandard.attr("name", $(this).attr("name"));
            barStandard.attr("color", $(this).attr("color"));
            $(this).replaceWith(barStandard);
        });

        // Create chart content area and move bars there

        var chartContent = $("<div class='chart-content'></div>");
        $(".bar-chart").append(chartContent);
        $(".bar-chart .bar").detach().appendTo(".bar-chart .chart-content");
    }

    function positionBarChart() {
        bars = $(".bar-chart .bar");

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
            $(".bar-chart").css("width", bars.length * 100 + 100);
        }

        if (bars.length > 0) {
            positionChartsX();
            setBarHeights();
            setBarAreaSize();
        }
    }

    function colorBarChartBars() {
        $(".bar").each(function() {
            $(this).css("background-color", $(this).attr("color"));
        });
    }

    function addLabels() {
        bars.each(function(index) {
            var label = $("<p class='label'>" + $(this).attr("name") + "</p>");
            $(this).append(label);
        });
    }

    function addBarNumbers() {
        bars.each(function(index) {
            var label = $("<p class='value'>" + $(this).attr("value") + "</p>");
            $(this).append(label);
        });
    }

    function constructBarCharts() {
        convertBarChartsToStandardHTML();
        positionBarChart();
        colorBarChartBars();
        addLabels();
        addBarNumbers();
    }

    // Public

    this.initializeController = function() {
        constructBarCharts();
    }
}