import jui from "../base/base.js"
import core from "./core.js"

jui.use(core);

export default {
    name: "chart.polygon.grid",
    extend: "chart.polygon.core",
    component: function () {
        var GridPolygon = function(type, width, height, depth, x, y) {
            x = x || 0;
            y = y || 0;
            width = x + width;
            height = y + height;

            var matrix = {
                center: [
                    new Float32Array([ x, y, depth, 1 ]),
                    new Float32Array([ width, y, depth, 1 ]),
                    new Float32Array([ width, height, depth, 1 ]),
                    new Float32Array([ x, height, depth, 1 ])
                ],
                horizontal: [
                    new Float32Array([ x, height, 0, 1 ]),
                    new Float32Array([ width, height, 0, 1 ]),
                    new Float32Array([ width, height, depth, 1 ]),
                    new Float32Array([ x, height, depth, 1 ])
                ],
                vertical: [
                    new Float32Array([ width, y, 0, 1 ]),
                    new Float32Array([ width, height, 0, 1 ]),
                    new Float32Array([ width, height, depth, 1 ]),
                    new Float32Array([ width, y, depth, 1 ])
                ]
            };

            this.vertices = matrix[type];

            this.vectors = [];
        }

        return GridPolygon;
    }
}