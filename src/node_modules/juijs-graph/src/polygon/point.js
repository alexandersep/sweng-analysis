import jui from "../base/base.js"
import core from "./core.js"

jui.use(core);

export default {
    name: "chart.polygon.point",
    extend: "chart.polygon.core",
    component: function () {
        var PointPolygon = function(x, y, d) {
            this.vertices = [
                new Float32Array([ x, y, d, 1 ])
            ];

            this.vectors = [];
        }

        return PointPolygon;
    }
}