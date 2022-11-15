export default {
    name: "chart.widget.canvas.core",
    extend: "chart.widget.core",
    component: function () {
        var CanvasCoreWidget = function() {
            this.drawAfter = function(obj) {
            }
        }

        return CanvasCoreWidget;
    }
}