export default {
    name: "util.svg.element.poly",
    extend: "util.svg.element.transform",
    component: function () {
        var PolyElement = function() {
            var orders = [];

            this.point = function(x, y) {
                orders.push(x + "," + y);
                return this;
            }

            this.join = function() {
                if(orders.length > 0) {
                    // Firefox 처리
                    var start = orders[0];
                    orders.push(start);

                    // 폴리곤 그리기
                    this.attr({ points: orders.join(" ") });
                    orders = [];
                }
            }
        }

        return PolyElement;
    }
}