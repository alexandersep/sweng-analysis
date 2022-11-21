import jui from "../../base/base.js"

export default {
    name: "util.svg.element.transform",
    extend: "util.svg.element",
    component: function () {
        var _ = jui.include("util.base");

        var TransElement = function() {
            var orders = {
                translate: null,
                scale: null,
                rotate: null,
                skew: null,
                matrix: null
            };

            function applyOrders(self) {
                var orderArr = [];

                for(var key in orders) {
                    if(orders[key]) orderArr.push(orders[key]);
                }

                self.attr({ transform: orderArr.join(" ") });
            }

            function getStringArgs(args) {
                var result = [];

                for(var i = 0; i < args.length; i++) {
                    result.push(args[i]);
                }

                return result.join(",");
            }

            this.translate = function() {
                orders["translate"] = "translate(" + getStringArgs(arguments) + ")";
                applyOrders(this);

                return this;
            }

            this.rotate = function(angle, x, y) {
                if(arguments.length == 1) {
                    var str = angle;
                } else if(arguments.length == 3) {
                    var str = angle + " " + x + "," + y;
                }

                orders["rotate"] = "rotate(" + str + ")";
                applyOrders(this);

                return this;
            }

            this.scale = function() {
                orders["scale"] = "scale(" + getStringArgs(arguments) + ")";
                applyOrders(this);

                return this;
            }

            this.skew = function() {
                orders["skew"] = "skew(" + getStringArgs(arguments) + ")";
                applyOrders(this);

                return this;
            }

            this.matrix = function() {
                orders["matrix"] = "matrix(" + getStringArgs(arguments) + ")";
                applyOrders(this);

                return this;
            }

            this.data = function(type) {
                var text = this.attr("transform"),
                    regex = {
                        translate: /[^translate()]+/g,
                        rotate: /[^rotate()]+/g,
                        scale: /[^scale()]+/g,
                        skew: /[^skew()]+/g,
                        matrix: /[^matrix()]+/g
                    };

                if(_.typeCheck("string", text)) {
                    return text.match(regex[type])[0];
                }

                return null;
            }
        }

        return TransElement;
    }
}