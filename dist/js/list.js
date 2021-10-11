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
      this.imageBoxMain = document.querySelector(".bannerImg");
      this.bannerNavMain = document.querySelector(".bannerNav");
      this.goodsListBox = document.querySelector(".good_list_box");
      this.pageBox = document.querySelector(".pageBox");
      this.pageIndex = 0; // console.log();

      this.init();
      this.addPageNavEvent();
    }

    _createClass(DocumentInit, [{
      key: "init",
      value: function init() {
        this.goodList.className += " list_html";
        this.getGoodsData("list_banner", "renderer_list_banner");
        this.refreshPageContent();
      }
    }, {
      key: "addPageNavEvent",
      value: function addPageNavEvent() {
        var that = this;
        addEvent(this.pageBox, "click", function (event) {
          var target = getTarget(event);

          if (target.className === "prev") {
            that.prevPage();
          } else if (target.className === "next") {
            that.nextPage();
          } else if (target.className === "go") {
            that.pageGo(); // console.log(target.className);
          } else if (!target.className) {
            that.changePage(parseInt(target.innerHTML));
          }
        });
        addEvent(this.pageBox, "selectstart", function (event) {
          stopDefault(event);
        });
      }
    }, {
      key: "addNavInputGoEvent",
      value: function addNavInputGoEvent() {
        var that = this;

        this.navGoInput.oninput = function () {
          this.value = this.value.replace(/[^\d]/g, "");
        };
      }
      /**
       * 获取数据库图片数据
       */

    }, {
      key: "getGoodsData",
      value: function getGoodsData(type, renderer) {
        var _this = this;

        ajax({
          type: "GET",
          url: "http://localhost:3000/api",
          success: function success(response) {
            if (response.code) _this[renderer](response.data);
          },
          error: function error(status) {
            console.log(status);
          },
          search: {
            type: type
          }
        });
      }
    }, {
      key: "refreshPageContent",
      value: function refreshPageContent() {
        this.getGoodsData("list_goods", "renderer_list_goods");
      }
    }, {
      key: "renderer_list_banner",
      value: function renderer_list_banner(response) {
        var _this2 = this;

        var data = "";
        response.forEach(function (value) {
          data += "<li><a href=\"\"><img src=\"./images/list/".concat(value, "\" alt=\"\"></a></li>");
          var option = document.createElement("li");
          option.appendChild(document.createElement("span"));

          _this2.bannerNavMain.appendChild(option);
        });
        this.imageBoxMain.innerHTML = data;
        this.bannerNavMain.children[0].className = "bannerOn";
      }
    }, {
      key: "renderer_list_goods",
      value: function renderer_list_goods(response) {
        var data = "";

        for (var i = this.pageIndex * 20; i < this.pageIndex * 20 + 20 && i < response.length; i++) {
          data += "<li class=\"item\">";
          response[i].tejia && (data += "<div class=\"tag_img\"><img src=\"./images/list/zp_label_tejia_pc.png\"></div>");
          data += "<a href=\"./details.html\" target=\"_blank\">\n                                <img src=\"./images/list/".concat(response[i].img, "\">\n                            </a>\n                            <p class=\"item_desc\" title=\"").concat(response[i].desc, "\">").concat(response[i].desc, "</p>\n                            <p class=\"item_info\" title=\"").concat(response[i].info, "\">").concat(response[i].info, "</p>\n                            <p class=\"price\">").concat(response[i].price, "</p>\n                            <p class=\"praise\">").concat(response[i].praise, "+\u4EBA\u597D\u8BC4</p>\n                            <button class=\"addCart\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                        </li>");
        }

        this.goodsListBox.innerHTML = data;
        data = "<li class=\"prev\">\u4E0A\u4E00\u9875</li>";

        for (var _i = 1; _i <= Math.ceil(response.length / 20); _i++) {
          data += "<li>".concat(_i, "</li>");
        }

        this.pageBox.innerHTML = data + "<li class=\"next\">\u4E0B\u4E00\u9875</li>\n                                            <li class=\"all\">\u5171".concat(Math.ceil(response.length / 20), "\u9875</li>\n                                            <li class=\"goto\">\n                                                \u5230\u7B2C\n                                                <input type=\"text\" class=\"gotoIndex\">\n                                                \u9875\n                                                <button  class=\"go\">\u786E\u5B9A</button>\n                                            </li>");
        this.nav = Array.from(this.pageBox.children).slice(1, this.pageBox.children.length - 3);
        this.navGoInput = this.pageBox.lastChild.children[0];
        this.setDisable();
        this.addNavInputGoEvent();
        this.nav[this.pageIndex].className = "active";
      }
    }, {
      key: "prevPage",
      value: function prevPage() {
        this.nav[this.pageIndex].className = "";
        this.pageIndex--;
        this.refreshPageContent();
        this.toStart();
      }
    }, {
      key: "nextPage",
      value: function nextPage() {
        this.nav[this.pageIndex].className = "";
        this.pageIndex++;
        this.refreshPageContent();
        this.toStart();
      }
    }, {
      key: "pageGo",
      value: function pageGo() {
        if (this.navGoInput.value) this.changePage(this.navGoInput.value);
      }
    }, {
      key: "changePage",
      value: function changePage(index) {
        this.nav[this.pageIndex].className = "";

        if (index > this.nav.length - 1) {
          this.pageIndex = this.nav.length - 1;
        } else if (index < 1) {
          this.pageIndex = 0;
        } else {
          this.pageIndex = index - 1;
        }

        this.refreshPageContent();
        this.toStart();
      }
    }, {
      key: "setDisable",
      value: function setDisable() {
        this.clearDisable();

        if (this.pageIndex === 0) {
          this.nav[0].previousElementSibling.className += " disable";
        } else if (this.pageIndex === this.nav.length - 1) {
          this.nav[this.nav.length - 1].nextElementSibling.className += " disable";
        } else {
          this.clearDisable();
        }
      }
    }, {
      key: "clearDisable",
      value: function clearDisable() {
        this.pageBox.children[0].className = "prev";
        this.pageBox.children[this.pageBox.children.length - 3].className = "next";
      }
    }, {
      key: "toStart",
      value: function toStart() {
        elementAnimation(document.documentElement, {
          scrollTop: 700
        });
      }
    }]);

    return DocumentInit;
  }();

  var PullOrDown = /*#__PURE__*/function () {
    function PullOrDown() {
      _classCallCheck(this, PullOrDown);

      this.box = document.querySelector(".tab_list");
      this.btn = document.querySelector(".upOrDown");
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

  setTimeout(function () {
    new DocumentInit();
    setTimeout(function () {
      window.createBannerMain({
        imgList: document.querySelectorAll(".bannerImg li"),
        btns: document.querySelectorAll(".bannerNav li")
      });
      new PullOrDown();
      new ListOptions();
    }, 100);
  }, 80);
})();