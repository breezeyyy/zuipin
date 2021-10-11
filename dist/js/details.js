"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function () {
  var DocumentInit = /*#__PURE__*/function () {
    function DocumentInit() {
      _classCallCheck(this, DocumentInit);

      this.goodList = document.querySelector(".good-list");
      this.init();
    }

    _createClass(DocumentInit, [{
      key: "init",
      value: function init() {
        this.goodList.className += " list_html";
      }
    }]);

    return DocumentInit;
  }();

  var Magnifying = /*#__PURE__*/function () {
    function Magnifying() {
      _classCallCheck(this, Magnifying);

      this.sBox = document.querySelector(".smallBox");
      this.sBoxW = parseInt(getStyle(this.sBox, "width"));
      this.sBoxH = parseInt(getStyle(this.sBox, "height"));
      this.oSpan = document.querySelector(".smallBox span");
      this.bBox = document.querySelector(".bigBox");
      this.bBoxImg = this.bBox.firstElementChild;
      this.MagnifyingAddEvent();
    } // 初始化


    _createClass(Magnifying, [{
      key: "oSpanInit",
      value: function oSpanInit() {
        this.oSpanLine = this.sBoxW * this.ratio;
        this.oSpan.style.width = this.oSpanLine + 'px';
        this.oSpan.style.height = this.oSpanLine + 'px';
      } // 添加事件

    }, {
      key: "MagnifyingAddEvent",
      value: function MagnifyingAddEvent() {
        var that = this; // 鼠标进入事件

        addEvent(this.sBox, "mouseenter", function () {
          that.show();
        }); // 鼠标离开事件

        addEvent(this.sBox, "mouseleave", function () {
          that.hide();
        }); // 鼠标移动事件

        addEvent(this.sBox, "mousemove", function (event) {
          var oEve = getEvent(event);
          that.refreshSpan({
            x: oEve.offsetX,
            y: oEve.offsetY
          });
        });
      } // 显示遮罩

    }, {
      key: "show",
      value: function show() {
        this.oSpan.style.display = "block";
        this.bBox.style.display = "block";
        this.ratio = this.bBox.offsetWidth / this.bBoxImg.offsetWidth;
        this.oSpanInit();
      } // 隐藏遮罩

    }, {
      key: "hide",
      value: function hide() {
        this.oSpan.style.display = "none";
        this.bBox.style.display = "none";
      } // 刷新遮罩位置

    }, {
      key: "refreshSpan",
      value: function refreshSpan(pos) {
        var l = pos.x - this.oSpanLine / 2,
            t = pos.y - this.oSpanLine / 2;
        if (l < 0) l = 0;
        if (t < 0) t = 0;
        if (pos.x > this.sBoxW - this.oSpanLine / 2) l = this.sBoxW - this.oSpanLine;
        if (pos.y > this.sBoxH - this.oSpanLine / 2) t = this.sBoxH - this.oSpanLine;
        this.oSpan.style.left = l + 'px';
        this.oSpan.style.top = t + 'px';
        this.refreshBBoxImg(l / this.ratio, t / this.ratio);
      } // 刷新大盒子图片位置

    }, {
      key: "refreshBBoxImg",
      value: function refreshBBoxImg(l, t) {
        this.bBoxImg.style.left = -l + 'px';
        this.bBoxImg.style.top = -t + 'px';
      }
    }]);

    return Magnifying;
  }();

  var Navimage = /*#__PURE__*/function () {
    function Navimage() {
      _classCallCheck(this, Navimage);

      this.sBox = document.querySelector(".smallBox");
      this.sBoxImg = document.querySelector(".smallBox img");
      this.bBox = document.querySelector(".bigBox");
      this.bBoxImg = document.querySelector(".bigBox img");
      this.nav = document.querySelector(".nav");
      this.aLi = document.querySelectorAll(".nav li");
      this.btns = document.querySelectorAll(".picNav button");
      this.navImgs = Array.from(this.nav.children).map(function (element) {
        return element.firstElementChild.src.replace(/http:\/\/localhost:3000/, ".");
      });
      this.nowIndex = 0; // console.log(this.navImgs);

      this.NavAddEvnet();
    }

    _createClass(Navimage, [{
      key: "NavAddEvnet",
      value: function NavAddEvnet() {
        var that = this;
        this.aLi.forEach(function (element, index) {
          addEvent(element, "click", function () {
            that.clearNavStyle(index);
            that.addNavStyle();
            that.replaceImg();
          });
        });
        this.btns.forEach(function (element, index) {
          addEvent(element, "click", function () {
            index ? that.nextImg() : that.prevImg();
            that.addNavStyle();
            that.replaceImg();
          });
        });
        addEvent(document, "scroll", function (event) {
          console.log(event.target);
        });
        addEvent(document, "selectstart", function (event) {
          stopDefault(getEvent(event));
        });
      } // 上一张

    }, {
      key: "prevImg",
      value: function prevImg() {
        this.clearNavStyle(this.nowIndex === 0 ? 0 : this.nowIndex - 1);
      } // 下一张

    }, {
      key: "nextImg",
      value: function nextImg() {
        this.clearNavStyle(this.nowIndex === this.aLi.length - 1 ? this.aLi.length - 1 : this.nowIndex + 1);
      } // 清除样式

    }, {
      key: "clearNavStyle",
      value: function clearNavStyle(index) {
        this.aLi[this.nowIndex].className = "";
        this.nowIndex = index;
      } // 添加样式

    }, {
      key: "addNavStyle",
      value: function addNavStyle() {
        this.aLi[this.nowIndex].className = "on";
      } // 切换图片

    }, {
      key: "replaceImg",
      value: function replaceImg() {
        this.sBoxImg.src = this.navImgs[this.nowIndex];
        this.bBoxImg.src = this.navImgs[this.nowIndex];
      }
    }]);

    return Navimage;
  }();

  var FixedTab = /*#__PURE__*/function () {
    function FixedTab() {
      _classCallCheck(this, FixedTab);

      this.susp = document.querySelector(".suspension");
      this.fixedAddEvent();
    }

    _createClass(FixedTab, [{
      key: "fixedAddEvent",
      value: function fixedAddEvent() {
        var that = this;
        this.judge();
        addEvent(document, "scroll", function () {
          that.judge();
        });
      }
    }, {
      key: "judge",
      value: function judge() {
        document.documentElement.scrollTop >= 800 ? this.show() : this.hide();
      }
    }, {
      key: "show",
      value: function show() {
        this.susp.className += " fixed";
        elementAnimation(this.susp, {
          top: 0
        });
      }
    }, {
      key: "hide",
      value: function hide() {
        elementAnimation(this.susp, {
          top: -60
        });
        this.susp.className = "suspension";
      }
    }]);

    return FixedTab;
  }();

  setTimeout(function () {
    new DocumentInit();
    new FixedTab();
    new Magnifying();
    new Navimage();
  }, 30);
})();