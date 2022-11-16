import jui from "../base/base.js"

export default {
    name: "chart.grid.panel",
    extend: "chart.grid.core",
    component: function () {
        var _ = jui.include("util.base");

        var PanelGrid = function() {

            this.custom = function(g) {
                var obj = this.scale(0);

                obj.x -= this.axis.area("x");
                obj.y -= this.axis.area("y");

                g.append(this.chart.svg.rect(_.extend(obj, {
                    fill : "transparent",
                    stroke : "transparent"
                })));
            }

            this.drawBefore = function() {
                this.scale = (function(axis) {
                    return function(i) {

                        return {
                            x : axis.area("x"),
                            y : axis.area("y"),
                            width : axis.area("width"),
                            height : axis.area("height")
                        }
                    }
                })(this.axis);
            }

            this.draw = function() {
                this.grid.hide = true;
                return this.drawGrid("panel");
            }
        }

        return PanelGrid;
    }
}