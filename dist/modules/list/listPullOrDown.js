"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(function () {
  var PullOrDown = /*#__PURE__*/function () {
    function PullOrDown(box, btn) {
      _classCallCheck(this, PullOrDown);

      this.box = box;
      this.btn = btn;
      this.icon = this.btn.children;
      this.nowIndex = 0;
      this.btnAddEvent();
    }

    _createClass(PullOrDown, [{
      key: "btnAddEvent",
      value: function btnAddEvent() {
        var that = this;
        addEvent(this.btn, "click", function () {
          that.changeIconStyle();
        });
      }
    }, {
      key: "changeIconStyle",
      value: function changeIconStyle() {
        this.icon[this.nowIndex].style.display = "none";
        this.box.style.height = this.nowIndex ? "120px" : "300px";
        this.nowIndex = Number(!this.nowIndex);
        this.icon[this.nowIndex].style.display = "block";
      }
    }]);

    return PullOrDown;
  }();

  return function (box, btn) {
    new PullOrDown(box, btn);
  };
});