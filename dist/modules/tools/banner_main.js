"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function () {
  "use strict";

  var Banner_main = /*#__PURE__*/function () {
    function Banner_main(_ref) {
      var imgList = _ref.imgList,
          btns = _ref.btns;

      _classCallCheck(this, Banner_main);

      this.imgList = imgList;
      this.imgBox = this.imgList[0].parentElement;
      this.btns = btns;
      this.nowIndex = 0;
      this.show(); // console.log(this.imgW);

      this.btnsEvent();
      this.imgInterval();
      this.imgHoverEvent();
    }

    _createClass(Banner_main, [{
      key: "btnsEvent",
      value: function btnsEvent() {
        var that = this;
        this.btns.forEach(function (element, index) {
          addEvent(element, "mouseover", function () {
            if (index != that.nowIndex) {
              that.changeImg(index);
            }
          });
        });
      }
    }, {
      key: "imgHoverEvent",
      value: function imgHoverEvent() {
        var that = this;
        addEvent(this.imgBox, "mouseenter", function () {
          clearInterval(that.intervalIndex);
        });
        addEvent(this.imgBox, "mouseleave", function () {
          that.imgInterval();
        });
      }
    }, {
      key: "imgInterval",
      value: function imgInterval() {
        var _this = this;

        clearInterval(this.intervalIndex);
        this.intervalIndex = setInterval(function () {
          _this.changeImg(_this.nowIndex + 1 === _this.imgList.length ? 0 : _this.nowIndex + 1);
        }, 3000);
      }
    }, {
      key: "changeImg",
      value: function changeImg(index) {
        this.btns[this.nowIndex].className = "";
        this.hide();
        this.nowIndex = index;
        this.btns[this.nowIndex].className = "bannerOn";
        this.show();
      }
    }, {
      key: "show",
      value: function show() {
        this.imgList[this.nowIndex].style.opacity = "1";
      }
    }, {
      key: "hide",
      value: function hide() {
        this.imgList[this.nowIndex].style.opacity = "0";
      }
    }, {
      key: "setDelay",
      value: function setDelay(func, timoDelay) {
        clearTimeout(this.timeOutIndex);
        this.timeOutIndex = setTimeout(func, timoDelay);
      }
    }]);

    return Banner_main;
  }();

  window.createBannerMain = function (obj) {
    new Banner_main(obj);
  };
})();