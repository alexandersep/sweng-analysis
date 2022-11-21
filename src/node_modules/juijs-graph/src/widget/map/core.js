export default {
    name: "chart.widget.map.core",
    extend: "chart.widget.core",
    component: function () {
        var MapCoreWidget = function(chart, axis, widget) {
        }

        MapCoreWidget.setup = function() {
            return {
                axis: 0
            }
        }

        return MapCoreWidget;
    }
}