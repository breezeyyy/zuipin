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

  var DocumentInit = /*#__PURE__*/function () {
    function DocumentInit() {
      _classCallCheck(this, DocumentInit);

      this.imageBoxMain = document.querySelector(".bannerImg");
      this.bannerNavMain = document.querySelector(".bannerNav");
      this.imageBoxTejia = document.querySelector(".tejia .specialbanner");
      this.imageBoxMiaosha = document.querySelector(".miaosha .specialbanner");
      this.specialTimer = document.querySelectorAll(".timer");
      this.drinkBox = document.querySelector("#self .drink_content");
      this.giftBox = document.querySelector("#gift .drink_content");
      this.teaBox = document.querySelector("#tea .drink_content");
      this.hotBox = document.querySelector(".hot .hot_content>ul");
      this.newsBox = document.querySelector(".news_content");
      this.getDBData("index_data");
    }

    _createClass(DocumentInit, [{
      key: "init",
      value: function init(response) {
        for (var key in response) {
          this["renderer_".concat(key)](response[key]);
        }
      }
      /**
       * 获取数据库数据
       */

    }, {
      key: "getDBData",
      value: function getDBData(type) {
        var _this = this;

        ajax({
          type: "GET",
          url: "http://localhost:3000/api",
          success: function success(response) {
            // console.log(response.data);
            if (response.code) _this.init(response.data);
          },
          error: function error(status) {
            console.log(status);
          },
          search: {
            type: type
          }
        });
      }
      /**
       * 根据获取的数据将图片添加到页面中并初始化
       * @param {array} response 获取的图片数据
       */

    }, {
      key: "renderer_banner_main",
      value: function renderer_banner_main(response) {
        var _this2 = this;

        var data = "";
        response.items.forEach(function (value) {
          data += "<li><a href=";
          data += value.ID ? "\"./details.html?goodID=".concat(value.ID, "&type=index_data&dataKey=banner_main&dataModName=items&good=true\"") : "javascript:;";
          data += "><img src=\"./images/index/".concat(value.img_main, "\" alt=\"\"></a></li>");
          var option = document.createElement("li");
          option.appendChild(document.createElement("span"));

          _this2.bannerNavMain.appendChild(option);
        });
        this.imageBoxMain.innerHTML = data;
        this.bannerNavMain.children[0].className = "bannerOn";
      }
    }, {
      key: "renderer_banner_tejia",
      value: function renderer_banner_tejia(response) {
        this.specialTimer[0].setAttribute("endtime", response.endtime);
        var data = "";
        response.items.forEach(function (value) {
          data += "<li>\n                            <a href=\"\">\n                                <div class=\"item_img\"><img src=\"./images/index/".concat(value.img, "\" alt=\"\">\n                                </div>\n                                <div class=\"item_desc\">\n                                    <p class=\"item_title\" title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                                    <p class=\"item_info\" title=\"").concat(value.info, "\">").concat(value.info, "</p>\n                                    <p class=\"item_price\"><img src=\"./images/index/zp_label_xsj.png\" alt=\"\"><span\n                                            class=\"now_price\">").concat(value.newPrice, "</span><span class=\"old_price\">").concat(value.oldPrice, "</span></p>\n                                </div>\n                                <div class=\"tagimg\">\n                                    <img src=\"./images/index/time-limit.png\" alt=\"\">\n                                </div>\n                            </a>\n                        </li>");
        });
        this.imageBoxTejia.innerHTML = data;
      }
    }, {
      key: "renderer_banner_miaosha",
      value: function renderer_banner_miaosha(response) {
        this.specialTimer[1].setAttribute("endtime", response.endtime);
        var data = "";
        response.items.forEach(function (value) {
          data += "<li>\n                            <a href=\"\">\n                                <div class=\"item_img\"><img src=\"./images/index/".concat(value.img, "\" alt=\"\">\n                                </div>\n                                <div class=\"item_desc\">\n                                    <p class=\"item_title\" title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                                    <p class=\"item_info\" title=\"").concat(value.info, "\">").concat(value.info, "</p>\n                                    <div class=\"meter\">\n                                        <div class=\"meterBar\">\n                                            <span class = \"nowMeter\"\n                                            style = \"width: ").concat(parseInt(value.remainNum / value.allNum * 100), "%\" >\n                                            </span>\n                                        </div>\n                                        <span class=\"remainNum\">\u8FD8\u5269 ").concat(value.remainNum, " \u4EF6</span>\n                                    </div>\n                                    <p class=\"item_price\"><img src=\"./images/index/zp_label_msj.png\" alt=\"\"><span\n                                            class=\"now_price\"><em class=\"now-price-icon\">\uFFE5</em>").concat(value.newPrice, "</span><span\n                                            class=\"old_price\">").concat(value.oldPrice, "</span></p>\n                                </div>\n                                <div class=\"tagimg\">\n                                    <img src=\"./images/index/zp_label_xlm.png\" alt=\"\">\n                                </div>\n                            </a>\n                        </li>");
        });
        this.imageBoxMiaosha.innerHTML = data;
      }
    }, {
      key: "renderer_drink_data",
      value: function renderer_drink_data(response) {
        var newFlag = [];
        var data = "<div class=\"drink_left\">\n                            <a href=\"\" class=\"tag_card card_hover\"><img src=\"./images/index/".concat(response.left, "\" alt=\"\"></a>\n                            <a href=\"\" class=\"more_card card_hover\">\n                                <h2>\u81EA\u996E\u52A9\u624B</h2>\n                                <p class=\"more_text\">\u81EA\u5DF1\u559D\u7684\u8336</p>\n                                <p class=\"more_text\">\u5305\u88C5\u4E0D\u7528\u592A\u590D\u6742</p>\n                                <img src=\"./images/index/more.png\" alt=\"\">\n                            </a>\n                        </div>\n                        <div class=\"drink_center\">");
        response.center.forEach(function (value, index) {
          data += "<a href=\"\" target=\"_blank\" class=\"card_hover\">";
          newFlag.includes(index + 1) && (data += "<div class=\"tag_img\">\n                                                        <img src=\"./images/index/2021-03-22_1616395321.png\">\n                                                    </div>");
          data += "<div class=\"item_img\"><img src=\"./images/index/".concat(value.img, "\"></div>\n                            <p class=\"item_img_desc\" title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                            <p class=\"item_img_info\" title=\"").concat(value.info, "\">").concat(value.info, "</p>\n                            <p class=\"item_price\">").concat(value.price, "</p>\n                        </a>");
        });
        data += "</div>\n                    <div class=\"drink_right\">\n                        <div class=\"news_list\">\n                            <span class=\"news_head\">\u81EA\u996E\u9526\u56CA</span>\n                            <div class=\"news_content\">";
        response.right.forEach(function (value) {
          data += "<a href=\"\" target=\"_blank\" class=\"news_item\">\n                                <p class=\"news_title\" title=\"".concat(value.title, "\">").concat(value.title, "</p>\n                                <div class=\"news_artical clearfix\">\n                                    <img src=\"./images/index/").concat(value.img, "\">\n                                    <p title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                                </div>\n                            </a>");
        });
        this.drinkBox.innerHTML = data += "</div>\n                                            </div>\n                                            <a href=\"\" class=\"more_card card_hover\">\n                                                <h2>\u6D4F\u89C8\u66F4\u591A</h2>\n                                                <p class=\"more_text\">\u60F3\u8981\u559D\u8336\uFF0C\u4E0D\u77E5\u5982\u4F55\u9009</p>\n                                                <p class=\"more_text\">\u8FD9\u91CC\u6709\u4E00\u53EA\u9526\u56CA\uFF01</p>\n                                                <img src=\"./images/index/more.png\" alt=\"\">\n                                            </a>\n                                        </div>";
      }
    }, {
      key: "renderer_gift_data",
      value: function renderer_gift_data(response) {
        var data = "<div class=\"drink_left\">\n                    <a href=\"\" class=\"tag_card card_hover\"><img src=\"./images/index/".concat(response.left, "\" alt=\"\"></a>\n                    <a href=\"\" class=\"more_card card_hover\">\n                        <h2>\u9001\u793C\u52A9\u624B</h2>\n                        <p class=\"more_text\">\u4E3A\u60A8\u7528\u5FC3\u63A8\u8350\u6BCF\u4E00\u4EFD\u793C\u7269</p>\n                        <img src=\"./images/index/more.png\" alt=\"\">\n                    </a>\n                </div>\n                <div class=\"drink_center\">");
        response.center.forEach(function (value) {
          data += "<a href=\"\" target=\"_blank\" class=\"card_hover\">";
          value["new"] && (data += "<div class=\"tag_img\">\n                                                        <img src=\"./images/index/2021-03-22_1616395321.png\">\n                                                    </div>");
          data += "<div class=\"item_img\"><img src=\"./images/index/".concat(value.img, "\"></div>\n                            <p class=\"item_img_desc\" title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                            <p class=\"item_img_info\" title=\"").concat(value.info, "\">").concat(value.info, "</p>\n                            <p class=\"item_price\">").concat(value.price, "</p>\n                        </a>");
        });
        data += "</div>\n                    <div class=\"drink_right\">\n                        <div class=\"news_list\">\n                            <span class=\"news_head\">\u81EA\u996E\u9526\u56CA</span>\n                            <div class=\"news_content\">";
        response.right.forEach(function (value) {
          data += "<a href=\"\" target=\"_blank\" class=\"news_item\">\n                                <p class=\"news_title\" title=\"".concat(value.title, "\">").concat(value.title, "</p>\n                                <div class=\"news_artical clearfix\">\n                                    <img src=\"./images/index/").concat(value.img, "\">\n                                    <p title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                                </div>\n                            </a>");
        });
        this.giftBox.innerHTML = data += "</div>\n                                            </div>\n                                            <a href=\"\" class=\"more_card card_hover\">\n                                                <h2>\u6D4F\u89C8\u66F4\u591A</h2>\n                                                <p class=\"more_text\">\u60F3\u8981\u559D\u8336\uFF0C\u4E0D\u77E5\u5982\u4F55\u9009</p>\n                                                <p class=\"more_text\">\u8FD9\u91CC\u6709\u4E00\u53EA\u9526\u56CA\uFF01</p>\n                                                <img src=\"./images/index/more.png\" alt=\"\">\n                                            </a>\n                                        </div>";
      }
    }, {
      key: "renderer_tea_data",
      value: function renderer_tea_data(response) {
        var data = "<div class=\"drink_left\">";
        response.left.forEach(function (value) {
          data += "<a href=\"\" class=\"tag_card card_hover\"><img src=\"./images/index/".concat(value, "\" alt=\"\"></a>");
        });
        data += "</div>\n                    <div class=\"drink_center\">";
        response.center.forEach(function (value, index) {
          data += "<a href=\"\" target=\"_blank\" class=\"card_hover\">";
          value["new"] && (data += "<div class=\"tag_img\">\n                                                        <img src=\"./images/index/2021-03-22_1616395321.png\">\n                                                    </div>");
          data += "<div class=\"item_img\"><img src=\"./images/index/".concat(value.img, "\"></div>\n                            <p class=\"item_img_desc\" title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                            <p class=\"item_img_info\" title=\"").concat(value.info, "\">").concat(value.info, "</p>\n                            <p class=\"item_price\">").concat(value.price, "</p>\n                        </a>");
        });
        this.teaBox.innerHTML = data += "<div class=\"add_item\">\n                                                <a href=\"\" target=\"_blank\" class=\"samll_box card_hover\">\n                                                    <p class=\"samll_box_text\" title=\"".concat(response.right.desc, "\">").concat(response.right.desc, "</p>\n                                                    <p class=\"samll_box_price\">").concat(response.right.price, "</p>\n                                                    <img src=\"./images/index/").concat(response.right.img, "\">\n                                                </a>\n                                                <a href=\"\" target=\"_blank\" class=\"more_card card_hover\">\n                                                    <h2>\u6D4F\u89C8\u66F4\u591A</h2>\n                                                    <p class=\"more_text\">\u8336\u9053\u914D\u4EF6</p>\n                                                    <img src=\"./images/index/more.png\" alt=\"\u67E5\u770B\u66F4\u591A\">\n                                                </a>\n                                            </div>\n                                        </div>");
      }
    }, {
      key: "renderer_banner_hot",
      value: function renderer_banner_hot(response) {
        var data = "";
        response.items.forEach(function (value) {
          data += "<li>\n                            <a href=\"\" target=\"_blank\" class=\"hot_box\">\n                                <div class=\"hot_img\">\n                                    <img src=\"./images/index/".concat(value.img, "\">\n                                </div>\n                                <p class=\"hot_text\" title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                                <p class=\"hot_people\" title=\"\u6765\u81EA").concat(value.userName, "\u7684\u8BC4\u4EF7\">\u6765\u81EA").concat(value.userName, "\u7684\u8BC4\u4EF7</p>\n                                <p class=\"hot_descr clearfix\">\n                                    <span title=\"").concat(value.info, "\">").concat(value.info, "</span>\n                                    <span></span>\n                                    <span>").concat(value.price, "</span>\n                                </p>\n                            </a>\n                        </li>");
        });
        this.hotBox.innerHTML = data;
      }
    }, {
      key: "renderer_news_data",
      value: function renderer_news_data(response) {
        var data = "";
        response.data.forEach(function (value) {
          data += "<a class=\"card_hover\">\n                            <div class=\"news_img\">\n                                <img src=\"./images/index/".concat(value.img, "\">\n                            </div>\n                            <p class=\"news_text\" title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                            <p class=\"news_desc\" title=\"").concat(value.info, "\">").concat(value.info, "</p>\n                        </a>");
        });
        this.newsBox.innerHTML = data;
      }
    }]);

    return DocumentInit;
  }();

  var FloorNav = /*#__PURE__*/function () {
    function FloorNav() {
      _classCallCheck(this, FloorNav);

      this.nav = document.querySelector(".floor_nav");
      this.tejia = document.querySelector(".itemSpecial");
      this.drink = document.querySelector("#self");
      this.gift = document.querySelector("#gift");
      this.tea = document.querySelector("#tea");
      this.hot = document.querySelector(".hot");
      this.news = document.querySelector(".news"); // this.topValue = [700, 1200, 2000, 2700, 3500, 4000];

      this.topValue = [4000, 3500, 2700, 2000, 1200, 700];
      this.topTo = _toConsumableArray(this.topValue).reverse(); // this.boxList = [this.tejia, this.drink, this.gift, this.tea, this.hot, this.news]
      // this.topValue = this.boxList.reduce((result, element) => [...result, element.offsetTop], [])
      // console.log(this.topValue);
      // 683
      // 790
      // 878
      // 966
      // 1054
      // 1556
      // 700
      // 1200
      // 2000
      // 2700
      // 3500
      // 4000
      // console.log(this.topValue);

      this.judgeStatus();
      this.navScrollEvent();
    }

    _createClass(FloorNav, [{
      key: "navClickEvent",
      value: function navClickEvent() {
        var that = this;
        this.li.forEach(function (element, index) {
          element.onclick = function () {
            that.removeScrollEvent();
            that.clearClassName();
            that.li[index].className = "on";
            elementAnimation(document.documentElement, {
              scrollTop: that.topTo[index]
            }, that.navScrollEvent.bind(that));
          };
        });
      }
    }, {
      key: "navScrollEvent",
      value: function navScrollEvent() {
        var that = this;

        document.onscroll = function () {
          that.judgeStatus();
        };
      }
    }, {
      key: "removeScrollEvent",
      value: function removeScrollEvent() {
        document.onscroll = null;
      }
    }, {
      key: "clearClassName",
      value: function clearClassName() {
        this.li.forEach(function (element) {
          element.className = "";
        });
      }
    }, {
      key: "judgeStatus",
      value: function judgeStatus() {
        document.documentElement.scrollTop >= 700 ? this.show() : this.hide();
      }
    }, {
      key: "changeNav",
      value: function changeNav() {
        var index = Math.abs(this.topValue.findIndex(function (val) {
          return document.documentElement.scrollTop >= val;
        }) - this.li.length + 1) % this.li.length;
        this.li[index].className = "on";
      }
    }, {
      key: "show",
      value: function show() {
        var _this3 = this;

        this.nav.style.display = "block";
        this.setDelay(function () {
          _this3.nav.style.opacity = "1";
        }, 20);
        this.li = document.querySelectorAll(".floor_nav li");
        this.navClickEvent();
        this.clearClassName();
        this.changeNav();
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this4 = this;

        this.nav.style.opacity = "0";
        this.setDelay(function () {
          _this4.nav.style.display = "none";
        }, 400);
      }
    }, {
      key: "setDelay",
      value: function setDelay(func, timoDelay) {
        clearTimeout(this.timeOutIndex);
        this.timeOutIndex = setTimeout(func, timoDelay);
      }
    }]);

    return FloorNav;
  }();

  new DocumentInit();
  setTimeout(function () {
    document.querySelector(".selectTea").style.display = "block";
    document.querySelector(".good-item").style.display = "block";
    new FloorNav();
    window.createTimeDown();
    window.createSuspension(document.querySelector(".suspension"), 500);
    window.createBannerMain({
      imgList: document.querySelectorAll(".bannerImg li"),
      btns: document.querySelectorAll(".bannerNav li")
    });
    window.createBannerMultiEle({
      imgBox: document.querySelector(".tejia .specialbanner"),
      btns: document.querySelectorAll(".tejia .specialBtns div"),
      together: 2
    });
    window.createBannerMultiEle({
      imgBox: document.querySelector(".miaosha .specialbanner"),
      btns: document.querySelectorAll(".miaosha .specialBtns div"),
      together: 2
    });
    window.createBannerMultiEle({
      imgBox: document.querySelector(".hot_content ul"),
      btns: document.querySelectorAll(".hot_btns div"),
      together: 4
    });
  }, 300);
})();