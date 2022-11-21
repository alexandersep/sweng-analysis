import jui from "./base.js"
import dom from "../util/dom.js"
import manager from "./manager.js"
import collection from "./collection.js"

jui.use(dom, manager, collection);

export default {
    name: "core",
    extend: null,
    component: function () {
        var _ = jui.include("util.base");
        var $ = jui.include("util.dom");
        var UIManager = jui.include("manager");
        var UICollection = jui.include("collection");

        var UICore = function() {

            /**
             * @method emit
             * Generates a custom event. The first parameter is the type of a custom event. A function defined as an option or on method is called
             *
             * @param {String} type Event type
             * @param {Function} args Event Arguments
             * @return {Mixed}
             */
            this.emit = function(type, args) {
                if(!_.typeCheck("string", type)) return;
                var result;

                for(var i = 0; i < this.event.length; i++) {
                    var e = this.event[i];

                    if(e.type == type.toLowerCase()) {
                        var arrArgs = _.typeCheck("array", args) ? args : [ args ];
                        result = e.callback.apply(this, arrArgs);
                    }
                }

                return result;
            }

            /**
             * @method on
             * A callback function defined as an on method is run when an emit method is called
             *
             * @param {String} type Event type
             * @param {Function} callback
             */
            this.on = function(type, callback) {
                if(!_.typeCheck("string", type) || !_.typeCheck("function", callback)) return;
                this.event.push({ type: type.toLowerCase(), callback: callback, unique: false  });
            }

            /**
             * @method off
             * Removes a custom event of an applicable type or callback handler
             *
             * @param {String} type Event type
             */
            this.off = function(type) {
                var event = [];

                for(var i = 0; i < this.event.length; i++) {
                    var e = this.event[i];

                    if ((_.typeCheck("function", type) && e.callback != type) ||
                        (_.typeCheck("string", type) && e.type != type.toLowerCase())) {
                        event.push(e);
                    }
                }

                this.event = event;
            }

            /**
             * @method setOption
             * Dynamically defines the options of a UI
             *
             * @param {String} key
             * @param {Mixed} value
             */
            this.setOption = function(key, value) {
                if(_.typeCheck("object", key)) {
                    for(var k in key) {
                        this.options[k] = key[k];
                    }
                } else {
                    this.options[key] = value;
                }
            }

            /**
             * @method destroy
             * Removes all events set in a UI obejct and the DOM element
             *
             */
            this.destroy = function() {
                if(this.__proto__) {
                    for (var key in this.__proto__) {
                        delete this.__proto__[key];
                    }
                }
            }
        };

        UICore.build = function(UI) {

            return function(selector, options) {
                var list = [],
                    elemList = [];

                if(_.typeCheck("string", selector)) {
                    elemList = $.find(selector);
                } else if(_.typeCheck("object", selector)) {
                    elemList.push(selector);
                } else {
                    elemList.push(document.createElement("div"));
                }

                for(var i = 0, len = elemList.length; i < len; i++) {
                    list[i] = jui.createUIObject(UI, selector, i, elemList[i], options);
                }

                // UIManager에 데이터 입력
                UIManager.add(new UICollection(UI.type, selector, options, list));

                // 객체가 없을 경우에는 null을 반환 (기존에는 빈 배열을 반환)
                if(list.length == 0) {
                    return null;
                } else if(list.length == 1) {
                    return list[0];
                }

                return list;
            }
        }

        UICore.init = function(UI) {
            var uiObj = null;

            if(typeof(UI) === "object") {
                uiObj = UICore.build(UI);
                UIManager.addClass({ type: UI.type, "class": uiObj });
            }

            return uiObj;
        }

        UICore.setup = function() {
            return {
                /**
                 * @cfg {Object} [event={}]
                 * Defines a DOM event to be used in a UI
                 */
                event: {}
            }
        }

        return UICore;
    }
}