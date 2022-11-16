export default {
    name: "chart.widget.polygon.core",
    extend: "chart.widget.core",
    component: function () {
        var PolygonCoreWidget = function() {
            this.drawAfter = function(obj) {
            }
        }

        return PolygonCoreWidget;
    }
}