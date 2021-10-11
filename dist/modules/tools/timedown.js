"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function () {
  "use strict";

  var TimeDown = /*#__PURE__*/function () {
    function TimeDown() {
      var _this = this;

      _classCallCheck(this, TimeDown);

      this.end = document.querySelectorAll(".timer");
      this.day = document.querySelectorAll(".days");
      this.hours = document.querySelectorAll(".hours");
      this.minute = document.querySelectorAll(".minute");
      this.seconds = document.querySelectorAll(".seconds");
      setInterval(function () {
        _this.getInterval();
      }, 1000);
    }

    _createClass(TimeDown, [{
      key: "getInterval",
      value: function getInterval() {
        for (var i = 0; i < this.end.length; i++) {
          var interval = new Date(this.end[i].getAttribute("endtime")).getTime() - Date.now();
          interval /= 1000;
          this.day[i].innerHTML = "".concat(parseInt(interval / 60 / 60 / 24), "\u5929");
          this.hours[i].innerHTML = this.add0(parseInt(interval / 60 / 60 % 24));
          this.minute[i].innerHTML = this.add0(parseInt(interval / 60 % 60));
          this.seconds[i].innerHTML = this.add0(parseInt(interval % 60));
        }
      }
    }, {
      key: "add0",
      value: function add0(value) {
        return value < 10 ? "0".concat(value) : value;
      }
    }]);

    return TimeDown;
  }();

  window.createTimeDown = function () {
    new TimeDown();
  };
})();