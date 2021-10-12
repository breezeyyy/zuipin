"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(function () {
  var ListOptions = /*#__PURE__*/function () {
    function ListOptions() {
      _classCallCheck(this, ListOptions);

      this.tabOptions = document.querySelectorAll(".tab_option .options li");
      this.priceSortImg = ["url('../images/list/shang.jpg')", "url('../images/list/xia.jpg')"];
      this.priceSortImgIndex = 1;
      this.optionAddEvent();
    }

    _createClass(ListOptions, [{
      key: "optionAddEvent",
      value: function optionAddEvent() {
        var that = this;
        this.tabOptions.forEach(function (element, index) {
          addEvent(element, "click", function () {
            that.clearTabOptionClass();
            element.className = "red";

            if (index === 2) {
              that.priceSortImgIndex = Number(!that.priceSortImgIndex);
              element.style.backgroundImage = that.priceSortImg[that.priceSortImgIndex];
            }
          });
        });
      }
    }, {
      key: "clearTabOptionClass",
      value: function clearTabOptionClass() {
        this.tabOptions.forEach(function (element) {
          element.className = "";
        });
      }
    }]);

    return ListOptions;
  }();

  return function () {
    new ListOptions();
  };
});