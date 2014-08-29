// This controller is used construct bar charts.
/* First this controller converts the non-standard bar chart HTML code to standard HTML.
 * The style_global.css defines base values for all charts. However, not all values are possible
 * to present in CSS so this controller fixes that.
 */

function BarChartController() {

    // Private

    var bars = {};
    var highestBar = {};
    var highestBarIndex = 0;
    var lowestBar = {};
    var highestBarHeightPx = 270;

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

    function findHighestAndLowestBars() {
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

        bars.each(function(index) {
            if (index == 0) {
                lowestBar = $(this);
            } else {
                if ($(this).attr("value") < lowestBar.attr("value")) {
                    lowestBar = $(this);
                }
            }
        });
    }

    function positionChartsOnXAxis() {
        // Position bars on the x-axis.
        bars.each(function(index) {
            $(this).css("left", index * 100 + 25);
        });
    }

    function setBarHeights() {
        // Set highest bar value.
        highestBar.css("height", highestBarHeightPx);

        // All other chart height values are set relative to the highest bar value.
        bars.each(function(index) {
            if (index != highestBarIndex) {
                $(this).css("height", ($(this).attr("value") / highestBar.attr("value")) * highestBarHeightPx);
            }
        });
    }

    function setBarChartSize() {
        $(".bar-chart").css("width", bars.length * 100 + 100);
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

    /** If the bar is very low in height, move the number above the bar*/
    function fixLowBarNumbers() {
        bars.each(function() {
            if ($(this).height() <= 20) {
                $(this).children(".value").each(function() {
                   $(this).css("top", -30);
                });
            }
        });
    }

    function addAxes() {
        var barCharts = $(".bar-chart");
        var axisHighestValue = $("<p class='axis'>" + highestBar.attr("value") + "</p>");
        var axisMiddleValue = $("<p class='axis'>" + (highestBar.attr("value") / 2) + "</p>");
        var axisLowestValue = $("<p class='axis'>" + 0 + "</p>");
        barCharts.append(axisHighestValue);
        barCharts.append(axisMiddleValue);
        barCharts.append(axisLowestValue);

        axisHighestValue.css("left", 10);
        axisHighestValue.css("top", 3);
        axisMiddleValue.css("left", 10);
        axisMiddleValue.css("top", 132); // TODO HARDCODED VALUE
        axisLowestValue.css("left", 10);
        axisLowestValue.css("top", 266); // TODO HARDCODED VALE
    }

    function constructBarCharts() {
        convertBarChartsToStandardHTML();
        bars = $(".bar-chart .bar");

        if (bars.length > 0) {
            findHighestAndLowestBars();
            positionChartsOnXAxis();
            setBarHeights();
            setBarChartSize();
            colorBarChartBars();
            addLabels();
            addBarNumbers();
            fixLowBarNumbers();
            addAxes();
        }
    }

    // Public

    this.initializeController = function() {
        constructBarCharts();
    }
}