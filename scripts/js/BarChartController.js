// This controller is used construct bar charts.
/* First this controller converts the non-standard bar chart HTML code to standard HTML.
 * The style_global.css defines base values for all charts. However, not all values are possible
 * to present in CSS so this controller fixes that.
 */

function BarChartController() {

    // Private

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

        $(".bar-chart .bar").each(function() {
            var parentChartContent = $(this).parents(".bar-chart").children(".chart-content");
            $(this).detach().appendTo(parentChartContent);
        });
    }

    /** @param bars jQuery DOM object presenting bars */
    function findHighestBar(bars) {
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

    function positionChartsOnXAxis() {
        $(".chart-content").each(function() {
            // Position bars on the x-axis.
            $(this).children(".bar").each(function(index) {
                $(this).css("left", index * 100 + 25);
            });
        })
    }

    function setBarHeights() {
        $(".chart-content").each(function() {
            // Set highest bar value.
            var highestBar = findHighestBar($(this).children(".bar"));
            highestBar.css("height", highestBarHeightPx);

            // Set all other bar heights relative to the highest bar value.
            $(this).children(".bar").each(function(index) {
                if (index != highestBarIndex) {
                    if ($(this).attr("value") >= 0) {
                        $(this).css("height", ($(this).attr("value") / highestBar.attr("value")) * highestBarHeightPx);
                    } else {
                        // Currently there is no good support for negative values. Hide the bar.
                        $(this).css("height", 0);
                    }
                }
            });
        });

    }

    function setBarChartSize() {
        $(".bar-chart").each(function() {
            var barsInThisChart = $(this).find(".bar");
            $(this).css("width", barsInThisChart.length * 100 + 100); // TODO HARDCODED VALUES
        });
    }

    function colorBarChartBars() {
        $(".bar").each(function() {
            $(this).css("background-color", $(this).attr("color"));
        });
    }

    function addLabels() {
        $(".bar-chart").each(function() {
            $(this).find(".bar").each(function(index) {
                var label = $("<p class='label'>" + $(this).attr("name") + "</p>");
                label.css("left", index * 100 + 110); // TODO HARDOCDED VALUES
                $(this).parents(".bar-chart").append(label);
            });
        })

    }

    function addBarNumbers() {
        $(".bar").each(function(index) {
            var label = $("<p class='value'>" + $(this).attr("value") + "</p>");
            $(this).append(label);
        });
    }

    /** If the bar is very low in height, move the number above the bar*/
    function fixLowBarNumbers() {
        $(".bar").each(function() {
            if ($(this).height() <= 30) {
                $(this).children(".value").each(function() {
                   $(this).css("top", -30);
                });
            }
        });
    }

    /** Set the bar chart height so that all labels are shown. */
    function fixBarChartHeight() {
        $(".bar-chart").each(function() {
            // Find the label with the highest height.
            var highestLabel = {};
            $(this).find(".label").each(function(index) {
                if (index == 0) {
                    highestLabel = $(this);
                } else {
                    if ($(this).height() > highestLabel.height()) {
                        highestLabel = $(this);
                    }
                }
            });

            $(this).css("height", $(this).height() + highestLabel.height());
        });
    }

    function addAxes() {
        $(".bar-chart").each(function() {
            var highestBar = findHighestBar($(this).find(".bar"));
            var axisHighestValue = $("<p class='axis'>" + highestBar.attr("value") + "</p>");
            var axisMiddleValue = $("<p class='axis'>" + (highestBar.attr("value") / 2) + "</p>");
            var axisLowestValue = $("<p class='axis'>" + 0 + "</p>");
            $(this).append(axisHighestValue);
            $(this).append(axisMiddleValue);
            $(this).append(axisLowestValue);

            axisHighestValue.css("left", 10);
            axisHighestValue.css("top", 3);
            axisMiddleValue.css("left", 10);
            axisMiddleValue.css("top", 132); // TODO HARDCODED VALUE
            axisLowestValue.css("left", 10);
            axisLowestValue.css("top", 266); // TODO HARDCODED VALE
        });
    }

    function constructBarCharts() {
        convertBarChartsToStandardHTML();
        bars = $(".bar-chart .bar");

        if (bars.length > 0) {
            positionChartsOnXAxis();
            setBarHeights();
            setBarChartSize();
            colorBarChartBars();
            addLabels();
            fixBarChartHeight();
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