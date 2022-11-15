import jui from "../base/base.js"
import core from "./core.js"

jui.use(core);

export default {
    name: "chart.polygon.line",
    extend: "chart.polygon.core",
    component: function () {
        var LinePolygon = function(x1, y1, d1, x2, y2, d2) {
            this.vertices = [
                new Float32Array([ x1, y1, d1, 1 ]),
                new Float32Array([ x2, y2, d2, 1 ])
            ];

            this.vectors = [];
        }

        return LinePolygon;
    }
}