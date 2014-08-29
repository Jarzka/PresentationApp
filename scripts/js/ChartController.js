// This controller is used construct charts.
// Dependencies: BarChartController.

function ChartController() {

    // Private

    var barChartController = new BarChartController();

    // Public

    this.initializeController = function() {
        barChartController.initializeController();
    }
}