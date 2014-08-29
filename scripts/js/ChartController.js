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

        function findHighestBarValue() {
            var highestBar = {};
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

            return highestBar;
        }

        function setBarHeights() {
            var highestBarHeightPx = 270;

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
            highestBar.css("height", highestBarHeightPx);

            // All other chart height values are set relative to the highest bar value.
            bars.each(function(index) {
                if (index != highestBarIndex) {
                    $(this).css("height", ($(this).attr("value") / highestBar.attr("value")) * highestBarHeightPx);
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

    function addAxes() {
        var barCharts = $(".bar-chart");
        var axisHighestValue = $("<p class='axis'>" + "333" + "</p>");
        var axisMiddleValue = $("<p class='axis'>" + "222" + "</p>");
        var axisLowestValue = $("<p class='axis'>" + "-43" + "</p>");
        barCharts.append(axisHighestValue);
        barCharts.append(axisMiddleValue);
        barCharts.append(axisLowestValue);

        axisHighestValue.css("left", 10);
        axisHighestValue.css("top", 4);
        axisMiddleValue.css("left", 10);
        axisMiddleValue.css("top", 130); // TODO HARDCODED VALUE
        axisLowestValue.css("left", 10);
        axisLowestValue.css("top", 265); // TODO HARDCODED VALE
    }

    function constructBarCharts() {
        convertBarChartsToStandardHTML();
        positionBarChart();
        colorBarChartBars();
        addLabels();
        addBarNumbers();
        addAxes();
    }

    // Public

    this.initializeController = function() {
        constructBarCharts();
    }
}