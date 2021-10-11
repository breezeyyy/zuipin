"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function () {
  "use strict";

  var Suspension = /*#__PURE__*/function () {
    function Suspension(susp, target) {
      _classCallCheck(this, Suspension);

      this.susp = susp;
      this.target = target;
      this.suspAddEvent();
    }

    _createClass(Suspension, [{
      key: "suspAddEvent",
      value: function suspAddEvent() {
        var that = this;
        addEvent(document, "scroll", function () {
          document.documentElement.scrollTop >= that.target ? that.show() : that.hide();
        });
      }
    }, {
      key: "show",
      value: function show() {
        var _this = this;

        this.susp.style.display = "block";
        this.setDelay(function () {
          _this.susp.style.opacity = "1";
        }, 20);
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this2 = this;

        this.susp.style.opacity = "0";
        this.setDelay(function () {
          _this2.susp.style.display = "none";
        }, 400);
      }
    }, {
      key: "setDelay",
      value: function setDelay(func, timoDelay) {
        clearTimeout(this.timeOutIndex);
        this.timeOutIndex = setTimeout(func, timoDelay);
      }
    }]);

    return Suspension;
  }();

  window.createSuspension = function (susp, target) {
    new Suspension(susp, target);
  };
})();