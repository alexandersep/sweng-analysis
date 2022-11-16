import jui from "../base/base.js"
import core from "./core.js"

jui.use(core);

export default {
    name: "chart.polygon.cube",
    extend: "chart.polygon.core",
    component: function () {
        var CubePolygon = function(x, y, z, w, h, d) {
            this.vertices = [
                new Float32Array([ x,       y,      z,      1 ]),
                new Float32Array([ x + w,   y,      z,      1 ]),
                new Float32Array([ x + w,   y,      z + d,  1 ]),
                new Float32Array([ x,       y,      z + d,  1 ]),

                new Float32Array([ x,       y + h,  z,      1 ]),
                new Float32Array([ x + w,   y + h,  z,      1 ]),
                new Float32Array([ x + w,   y + h,  z + d,  1 ]),
                new Float32Array([ x,       y + h,  z + d,  1 ]),
            ];

            this.faces = [
                [ 0, 1, 2, 3 ],
                [ 3, 2, 6, 7 ],
                [ 0, 3, 7, 4 ],
                [ 1, 2, 6, 5 ],
                [ 0, 1, 5, 4 ],
                [ 4, 5, 6, 7 ]
            ];

            this.vectors = [];
        }

        return CubePolygon;
    }
}