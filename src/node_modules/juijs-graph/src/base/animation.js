import JUI from "./base.js"
import JUIBuilder from "./builder"

export default {
    name: "chart.animation",
    extend: "core",
    component: function () {
        const _ = JUI.include("util.base");
        const builder = JUI.include("chart.builder");

        const UI = function() {
            let interval,
                animateSeq = -1,
                prevTime = 0,
                startTime = 0;

            this.init = function() {
                const opts = this.options;

                // 차트 빌더는 interval 옵션을 사용하지 않기 때문에 삭제함
                interval = opts.interval;
                delete opts.interval;

                if(opts.axis.length && opts.axis.length > 1)
                    throw new Error("JUI_CRITICAL_ERR: the real-time module allows only a single axes");

                this.builder = builder(this.selector, opts);
            }

            this.run = function(callback) {
                const self = this;
                const currentTime = Date.now();

                if(startTime == 0) {
                    startTime = currentTime;
                }

                if(currentTime - prevTime > interval || interval == 0){
                    let tpf = (currentTime - prevTime) / 1000;
                    if(tpf > 1) tpf = 1;

                    this.builder.setCache("tpf", tpf);
                    this.builder.setCache("fps", (1.0 / tpf));

                    if(typeof(callback) == "function") {
                        callback.call(this, currentTime - startTime);
                    }

                    this.render();
                    prevTime = currentTime;
                }

                animateSeq = requestAnimationFrame(function() {
                    self.run(callback);
                });
            }

            this.stop = function() {
                if(animateSeq != -1) {
                    cancelAnimationFrame(animateSeq);
                    animateSeq = -1;
                }
            }

            this.set = function(type, value, isReset) {
                this.builder.axis(0).set(type, value, isReset);
            }

            this.update = function(data) {
                this.builder.axis(0).update(data);
            }

            this.render = function(isAll) {
                this.builder.render(isAll);
            }
        }

        UI.setup = function() {
            return _.extend({
                render: false,
                canvas: true,
                interval: 0
            }, JUIBuilder.component().setup(), true);
        }

        return UI;
    }
}