"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.onload = function () {
  "use strict";

  var Search = /*#__PURE__*/function () {
    function Search() {
      _classCallCheck(this, Search);

      this.nowIndex;
      this.li;
      this.closeFlag = false;
      this.searchBox = document.querySelector(".search");
      this.search = document.querySelector(".search-cont");
      this.text = document.querySelector("#text");
      this.options = document.querySelector(".search .options");
      this.button = document.querySelector(".search-cont button");
      this.url = "https://suggest.taobao.com/sug";
      this.classAddEvent();
    }
    /**
     * 为对象添加事件
     */


    _createClass(Search, [{
      key: "classAddEvent",
      value: function classAddEvent() {
        var that = this; // 输入框输入事件

        addEvent(this.text, "input", function () {
          if (that.text.value) {
            that.closeFlag = true;
            that.nowValue = that.text.value;
            that.getDatas();
          } else {
            that.closeFlag = false;
            that.listHide();
          }
        }); // 整个页面单击事件

        addEvent(document, "click", function (event) {
          var target = getTarget(event);

          if (target.nodeName === "INPUT" && target.parentElement.className.includes("search-cont")) {
            that.text.focus();
            if (that.nowValue) that.getDatas();
          } else if (target.nodeName === "LI" && target.parentElement.className === "options") {
            that.nowValue = that.li[that.nowIndex].innerHTML;
            that.changeTextValue(that.li[that.nowIndex].innerHTML);
            that.listHide();
          } else if (target.nodeName !== "UL" && target.nodeName !== "BUTTON") {
            that.lostFocus();
          }
        }); // 输入框获取焦点事件

        addEvent(this.text, "focus", function () {
          that.getFocus();
          if (that.nowValue) that.getDatas();
        }); // 按钮鼠标进入事件

        addEvent(this.button, "mouseenter", function () {
          // console.log(document.hasFocus());
          that.search.className = "search-cont search-active";
        }); // 按钮鼠标离开事件

        addEvent(this.button, "mouseleave", function () {
          if (that.text !== document.activeElement) that.search.className = "search-cont";
        });
      }
      /**
       * 当产生下拉菜单时所添加的事件
       */

    }, {
      key: "liAddEvent",
      value: function liAddEvent() {
        var that = this;
        this.li = this.options.children;
        Array.from(this.li).forEach(function (element, index) {
          addEvent(element, "mouseenter", function () {
            that.clearPrevOptionStyle();
            that.optionActive(index);
          });
          addEvent(element, "mouseleave", function () {
            that.clearPrevOptionStyle();
          });
        });
      }
      /**
       * 整个页面的键盘按下事件
       */

    }, {
      key: "documentAddKeyEvent",
      value: function documentAddKeyEvent() {
        var that = this;

        document.onkeydown = function (event) {
          var oEve = getEvent(event);
          var code = oEve.keycode || oEve.which;

          if (code === 38) {
            that.keyPrev();
          } else if (code === 40) {
            that.keyNext();
          } else if (code === 13) {
            that.nowValue = that.li[that.nowIndex].innerHTML;
            that.listHide(); // this.nowIndex = undefined;
          }
        };
      }
      /**
       * 删除页面键盘按下事件
       */

    }, {
      key: "documentRemovekeyEvent",
      value: function documentRemovekeyEvent() {
        document.onkeydown = null;
      }
      /**
       * 使用jsonp向接口获取数据
       */

    }, {
      key: "getDatas",
      value: function getDatas() {
        var _this = this;

        jsonp(this.url, function (response) {
          _this.optionInit(response.result);
        }, {
          code: "utf-8",
          q: this.nowValue,
          callback: "callback",
          fieldName: "callback"
        });
      }
      /**
       * 获取数据后的页面初始化
       */

    }, {
      key: "optionInit",
      value: function optionInit(data) {
        if (data.length) {
          var str = '';

          for (var i = 0; i < data.length; i++) {
            str += "<li>".concat(data[i][0], "</li>");
          }

          this.options.innerHTML = str;
          this.listShow();
          this.liAddEvent();
        } else {
          this.listHide();
        }
      }
      /**
       * 输入框获得焦点后执行
       */

    }, {
      key: "getFocus",
      value: function getFocus() {
        this.search.className = "search-cont search-active";
      }
      /**
       * 输入框失去焦点后执行
       */

    }, {
      key: "lostFocus",
      value: function lostFocus() {
        this.nowValue = this.text.value;
        this.search.className = "search-cont"; // this.text.className = "";

        this.options.style.display = 'none';
      }
      /**
       * 下拉列表显示
       */

    }, {
      key: "listShow",
      value: function listShow() {
        if (this.closeFlag) {
          // this.text.className = "focusinp";
          // this.search.className = "search focus display";
          this.options.style.display = 'block';
          this.documentAddKeyEvent();
        }
      }
      /**
       * 下拉列表隐藏
       */

    }, {
      key: "listHide",
      value: function listHide() {
        this.nowIndex = undefined; // this.text.className = "";
        // this.search.className = "search focus";

        this.options.style.display = 'none';
        this.documentRemovekeyEvent();
      }
      /**
       * 设置当前选项为active样式
       */

    }, {
      key: "optionActive",
      value: function optionActive(index) {
        this.nowIndex = index;
        this.li[this.nowIndex].className = "active";
      }
      /**
       * 清除上次的active样式
       */

    }, {
      key: "clearPrevOptionStyle",
      value: function clearPrevOptionStyle() {
        if (!isNaN(this.nowIndex) && this.nowIndex !== -1 && this.nowIndex !== this.li.length) this.li[this.nowIndex].className = "";
      }
      /**
       * 根据目标值改变当前输入框的值
       */

    }, {
      key: "changeTextValue",
      value: function changeTextValue(value) {
        this.text.value = value;
      }
      /**
       * 方向键上  上一个选项
       */

    }, {
      key: "keyPrev",
      value: function keyPrev() {
        this.clearPrevOptionStyle();

        if (isNaN(this.nowIndex) || this.nowIndex === -1) {
          this.optionActive(this.li.length - 1);
        } else if (this.nowIndex === 0) {
          this.nowIndex = this.li.length;
        } else {
          this.optionActive(this.nowIndex - 1);
        }

        if (this.nowIndex !== this.li.length) this.changeTextValue(this.li[this.nowIndex].innerHTML);else this.changeTextValue(this.nowValue);
      }
      /**
       * 方向键下  下一个选项
       */

    }, {
      key: "keyNext",
      value: function keyNext() {
        this.clearPrevOptionStyle();

        if (isNaN(this.nowIndex) || this.nowIndex === this.li.length) {
          this.optionActive(0);
        } else if (this.nowIndex === this.li.length - 1) {
          this.nowIndex = -1;
        } else {
          this.optionActive(this.nowIndex + 1);
        }

        if (this.nowIndex !== -1) this.changeTextValue(this.li[this.nowIndex].innerHTML);else this.changeTextValue(this.nowValue);
      }
    }]);

    return Search;
  }();

  var Menu3 = /*#__PURE__*/function () {
    function Menu3() {
      _classCallCheck(this, Menu3);

      this.nav = document.querySelector(".good-list");
      this.navAddEvent();
    }

    _createClass(Menu3, [{
      key: "navAddEvent",
      value: function navAddEvent() {
        var that = this;
        addEvent(this.nav, "mouseenter", function (event) {
          that.show(this);
          Array.from(this.lastElementChild.children).forEach(function (val) {
            val.onmouseenter = function () {
              that.show(this);
            };
          });
          Array.from(this.lastElementChild.children).forEach(function (val) {
            val.onmouseleave = function () {
              that.hide(this);
            };
          });
        });
        addEvent(this.nav, "mouseleave", function (event) {
          if (this.className.includes("list_html")) that.hide(this);
        });
      }
    }, {
      key: "show",
      value: function show(target) {
        target.lastElementChild.style.display = "block";
      }
    }, {
      key: "hide",
      value: function hide(target) {
        target.lastElementChild.style.display = "none";
      }
    }]);

    return Menu3;
  }();

  var AsideTop = /*#__PURE__*/function () {
    function AsideTop() {
      _classCallCheck(this, AsideTop);

      this.top = document.querySelector(".toTop");
      this.judgeStatus();
      this.topAddEvent();
    }

    _createClass(AsideTop, [{
      key: "topAddEvent",
      value: function topAddEvent() {
        var that = this;
        addEvent(document, "scroll", function () {
          that.judgeStatus();
        });
        addEvent(this.top, "click", function () {
          elementAnimation(document.documentElement, {
            scrollTop: 0
          });
        });
      }
    }, {
      key: "judgeStatus",
      value: function judgeStatus() {
        document.documentElement.scrollTop >= 500 ? this.show() : this.hide();
      }
    }, {
      key: "show",
      value: function show() {
        var _this2 = this;

        this.top.style.display = "block";
        this.setDelay(function () {
          _this2.top.style.opacity = "1";
        }, 20);
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this3 = this;

        this.top.style.opacity = "0";
        this.setDelay(function () {
          _this3.top.style.display = "none";
        }, 400);
      }
    }, {
      key: "setDelay",
      value: function setDelay(func, timoDelay) {
        clearTimeout(this.timeOutIndex);
        this.timeOutIndex = setTimeout(func, timoDelay);
      }
    }]);

    return AsideTop;
  }();

  var DocumentInit = /*#__PURE__*/function () {
    function DocumentInit() {
      _classCallCheck(this, DocumentInit);

      this.imageBox = document.querySelectorAll(".item-desc");
      this.getImageData();
      addEvent(document.querySelector(".cart"), "click", function () {
        location.href = "./cart.html";
      });
    }
    /**
     * 获取数据库图片数据
     */


    _createClass(DocumentInit, [{
      key: "getImageData",
      value: function getImageData() {
        var _this4 = this;

        ajax({
          type: "GET",
          url: "http://localhost:3000/api",
          success: function success(response) {
            if (response.code) // console.log(response);
              _this4.renderer(response.data);
          },
          error: function error(status) {
            console.log(status);
          },
          search: {
            type: "common_data"
          }
        });
      }
      /**
       * 根据获取的数据将图片添加到页面中并初始化
       * @param {array} response 获取的图片数据
       */

    }, {
      key: "renderer",
      value: function renderer(response) {
        var index = 0;

        for (var key in response) {
          var data = "<ul>";
          response[key].forEach(function (value) {
            data += "<li><img src=\"./images/common/".concat(value.img, "\"><span>").concat(value.info, "</span></li>");
          });
          this.imageBox[index++].innerHTML = data + "</ul>";
        }
      }
    }]);

    return DocumentInit;
  }();

  setTimeout(function () {
    new DocumentInit();
    new AsideTop();
    new Menu3();
    new Search();
  }, 200);
};