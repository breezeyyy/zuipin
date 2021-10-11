"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function () {
  "use strict";

  var Banner_multiEle = /*#__PURE__*/function () {
    function Banner_multiEle(_ref) {
      var imgBox = _ref.imgBox,
          together = _ref.together,
          btns = _ref.btns;

      _classCallCheck(this, Banner_multiEle);

      this.imgBox = imgBox;
      this.together = together;
      this.btns = btns;
      this.imgList = this.imgBox.children;
      this.imgW = this.imgBox.offsetWidth / this.together;
      this.createPos();
      this.nowItems = _toConsumableArray(this.pos.keys()); // console.log(this.imgBox.parentElement);
      // console.log(this.nowItems);

      this.init();
    }

    _createClass(Banner_multiEle, [{
      key: "createPos",
      value: function createPos() {
        var _this = this;

        this.pos = new Array(this.together).fill(0);
        this.pos.forEach(function (value, index) {
          _this.pos[index] = _this.imgW * index;
        }); // console.log(this.pos);

        this.imgInterval();
        this.imgHoverEvent();
      }
    }, {
      key: "init",
      value: function init() {
        var _this2 = this;

        this.nowItems.forEach(function (val) {
          _this2.imgList[val].style.left = "".concat(_this2.pos[val], "px");
          _this2.imgList[val].style.zIndex = "100";
        }); // console.log(this.btns);

        this.btnAddEvent();
      }
    }, {
      key: "imgHoverEvent",
      value: function imgHoverEvent() {
        var that = this;
        addEvent(this.imgBox.parentElement, "mouseenter", function () {
          clearInterval(that.intervalIndex);
        });
        addEvent(this.imgBox.parentElement, "mouseleave", function () {
          that.imgInterval();
        });
      }
    }, {
      key: "imgInterval",
      value: function imgInterval() {
        var _this3 = this;

        clearInterval(this.intervalIndex);
        this.intervalIndex = setInterval(function () {
          _this3.prev();
        }, 3000);
      }
    }, {
      key: "btnAddEvent",
      value: function btnAddEvent() {
        var that = this;
        addEvent(this.btns[0], "click", function () {
          that.next();
        });
        addEvent(this.btns[1], "click", function () {
          that.prev();
        });
        addEvent(this.btns[0].parentElement, "mouseenter", function () {
          clearInterval(that.intervalIndex);
        });
        addEvent(this.btns[1].parentElement, "mouseenter", function () {
          clearInterval(that.intervalIndex);
        });
        addEvent(this.btns[0].parentElement, "mouseleave", function () {
          that.imgInterval();
        });
        addEvent(this.btns[1].parentElement, "mouseleave", function () {
          that.imgInterval();
        });
      }
    }, {
      key: "prev",
      value: function prev() {
        var _this4 = this;

        this.nowItems.forEach(function (value, index) {
          _this4.imgList[value].style.zIndex = "10";

          _this4.setMovePos(_this4.imgList[value], _this4.pos[index], true);

          _this4.nowItems[index] = value + 1 >= _this4.imgList.length ? 0 : value + 1;
        }); // console.log(this.nowItems);

        this.nowItems.forEach(function (value, index) {
          _this4.imgList[value].style.zIndex = "100";

          _this4.setMovePos(_this4.imgList[value], _this4.pos[index] + _this4.imgW, true);
        });
      }
    }, {
      key: "next",
      value: function next() {
        var _this5 = this;

        this.nowItems.forEach(function (value, index) {
          _this5.imgList[value].style.zIndex = "10";

          _this5.setMovePos(_this5.imgList[value], _this5.pos[index], false);

          _this5.nowItems[index] = value - 1 < 0 ? _this5.imgList.length - 1 : value - 1;
        }); // console.log(this.nowItems);

        this.nowItems.forEach(function (value, index) {
          _this5.imgList[value].style.zIndex = "100";

          _this5.setMovePos(_this5.imgList[value], _this5.pos[index] - _this5.imgW, false);
        });
      }
    }, {
      key: "setMovePos",
      value: function setMovePos(target, value, calcFlag) {
        target.style.left = "".concat(value, "px"); // console.log(`${value}px`);

        this.move(target, calcFlag ? value - this.imgW : value + this.imgW);
      }
    }, {
      key: "move",
      value: function move(target, value) {
        // console.log(value);
        elementAnimation(target, {
          left: value
        });
      }
    }]);

    return Banner_multiEle;
  }();

  window.createBannerMultiEle = function (obj) {
    new Banner_multiEle(obj);
  };
})();