"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require.config({
  baseUrl: "./modules/",
  paths: {
    sl: "./list/setLocalData"
  }
});

require(["sl"], function (setLocalData) {
  // console.log(setLocalData);
  var DocumentInit = /*#__PURE__*/function () {
    function DocumentInit() {
      _classCallCheck(this, DocumentInit);

      this.goodList = document.querySelector(".good-list");
      this.pageList = document.querySelector(".nowPage");
      this.navImg = document.querySelector(".nav");
      this.goodDesc = document.querySelector(".goodDesc");
      this.goodItem = document.querySelector(".goodItem");
      this.switchTab = document.querySelector(".switchTab");
      this.xqBox = document.querySelector(".xqms dt ul");
      this.xqImgBox = document.querySelector(".xqms dd p");
      this.xq = {
        gg: "规格",
        cd: "产地",
        scnf: "生产年份",
        ccff: "储藏方法",
        bzq: "保质期",
        dj: "等级",
        bzgg: "包装规格"
      };
      this.init();
    }

    _createClass(DocumentInit, [{
      key: "init",
      value: function init() {
        this.goodList.className += " list_html";
        this.urlData = this.urlParse();
        this.getDBData(this.urlData);
      }
    }, {
      key: "urlParse",
      value: function urlParse() {
        return _objectSpread(_objectSpread({}, location.href.split("?")[1].split("&").reduce(function (result, value) {
          return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, value.split("=")[0], value.split("=")[1]));
        }, {})), {}, {
          type: "goods_data"
        });
      }
    }, {
      key: "getDBData",
      value: function getDBData(search) {
        var _this = this;

        ajax({
          type: "GET",
          url: "http://localhost:3000/api",
          success: function success(response) {
            if (response.code) _this.renderer_details(response.data);
          },
          error: function error(status) {
            console.log(status);
          },
          search: search
        });
      }
    }, {
      key: "renderer_details",
      value: function renderer_details(value) {
        // console.log(value);
        document.title = value.good_title;
        var data = "<li><a href=\"./index.html\">\u9996\u9875</a></li>";
        value.tags.forEach(function (val) {
          data += "<li>/</li>\n                        <li><a href=\"javascript:;\">".concat(val, "</a></li>");
        });
        this.pageList.innerHTML = data + "<li>/</li>\n                                                <li><a href=\"javascript:;\">".concat(value.good_title, "</a></li>");
        data = "";
        value.img_list.forEach(function (val, index) {
          data += "<li";
          data += index ? ">" : " class=\"on\">";
          data += "<img src=\"./images/details/".concat(val, "\" alt=\"\"></li>");
        });
        this.navImg.innerHTML = data;
        this.goodDesc.innerHTML = "<h1 class=\"title\">".concat(value.good_title, "</h1>\n                                        <p class=\"info\">").concat(value.info || "", "</p>\n                                        <div class=\"line\"></div>\n                                        <div class=\"goodDescList\">\n                                            <div class=\"scj\">\u5E02\u573A\u4EF7<span>\uFFE5<em>").concat(value.oldPrice, ".00</em></span></div>\n                                            <div class=\"zpj\">\u9189\u54C1\u4EF7<span>\uFFE5<em>").concat(value.nowPrice, ".00</em></span></div>\n                                            <div class=\"cx\">\u4FC3\u9500\n                                                <div class=\"cxTag\">\n                                                    <div class=\"tagInfo\">\u5305\u90AE</div>\n                                                    <div class=\"tagDesc\">\u5168\u573A\u5728\u7EBF\u652F\u4ED8\u6EE159\u5143\u514D\u8FD0\u8D39</div>\n                                                </div>\n                                                <div class=\"cxTag\">\n                                                    <div class=\"tagInfo\">\u76F4\u964D</div>\n                                                    <div class=\"tagDesc\">\u5DF2\u4F18\u60E0<i class=\"youhui\">").concat(value.youhui, "</i>\u5143</div>\n                                                </div>\n                                            </div>\n                                            <div class=\"line\"></div>\n                                            <ul class=\"pp clearfix\">\n                                                <li><span class=\"ppK\">\u54C1\u724C</span><span class=\"ppV\">").concat(value.pinpai, "</span></li>\n                                                <li><span class=\"ppK\">\u51C0\u542B\u91CF</span><span class=\"ppV\">").concat(value.jhl, "</span></li>\n                                                <li><span class=\"ppK\">\u5546\u54C1\u7F16\u53F7</span><span class=\"ppV\">").concat(value.ID, "</span></li>\n                                            </ul>\n                                            <div class=\"line\"></div>\n                                            <div class=\"sl\">\u6570\u91CF\n                                                <button class=\"jian\">-</button>\n                                                <input type=\"text\" value=\"1\">\n                                                <button class=\"plus\">+</button>\n                                            </div>\n                                            <button class=\"addCart\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                                            <div class=\"line\"></div>\n                                            <ul class=\"fw clearfix\">\n                                                <li>\u670D\u52A1</li>\n                                                <li>90\u5929\u5546\u54C1\u4FDD\u4EF7</li>\n                                                <li>30\u5929\u65E0\u7406\u7531\u9000\u8D27</li>\n                                                <li>10\u5206\u949F\u6781\u901F\u9000\u6B3E</li>\n                                            </ul>\n                                        </div>");
        this.goodItem.innerHTML = "<img src=\"./images/details/".concat(value.img_list[0], "\" alt=\"\">\n                <div class=\"itemInfo\">\n                    <div class=\"itemDesc\">").concat(value.good_title, "</div>\n                    <div class=\"itemPrice\">\uFFE5").concat(value.nowPrice, "</div>\n                </div>");
        this.switchTab.innerHTML = "<li>\u8BE6\u60C5\u63CF\u8FF0</li>\n                                        <li>\u8BC4\u8BBA\u6652\u5355(<span class=\"plNum\"> ".concat(value.praise, " </span>)</li>");
        data = "";

        for (var key in value.xqms.xqms_tags) {
          data += "<li title=\"".concat(this.xq[key], "\uFF1A").concat(value.xqms.xqms_tags[key], "\">\n                            <span class=\"xqK\">").concat(this.xq[key], "\uFF1A</span>\n                            <span class=\"xqV\">").concat(value.xqms.xqms_tags[key], "</span>\n                        </li>");
        }

        this.xqBox.innerHTML = data;
        data = "";
        value.xqms.xqms_imgs.forEach(function (val) {
          data += "<img src=\"./images/details/".concat(val, "\">");
        });
        this.xqImgBox.innerHTML = data;
        addEvent(document.querySelector(".sl"), "click", function (event) {
          var target = getTarget(event);

          if (target.className === "jian") {
            target.nextElementSibling.value > 1 && target.nextElementSibling.value--;
          } else if (target.className === "plus") {
            target.previousElementSibling.value++;
          }
        });
        addEvent(document.querySelector(".sl").children[1], "input", function () {
          this.value = this.value.replace(/[^\d]/g, "");
        });
        addEvent(document.querySelector(".sl").children[1], "blur", function () {
          Number(this.value) || (this.value = 1);
        });
        addEvent(document.querySelector(".addCart"), "click", function () {
          if (getCookie("isLogin") === "ok") {
            var addCartTip = document.querySelector(".addCartTip");
            addCartTip.style.display = "block";
            setTimeout(function () {
              addCartTip.style.display = "none";
            }, 1000);
            setLocalData({
              goodID: value.ID,
              price: value.nowPrice,
              num: Number(document.querySelector(".sl").children[1].value) // ,from: "goods_data"

            });
            var goods = JSON.parse(getCookie("goods"));
            var cartNum = document.querySelector(".cartNum");
            cartNum.innerHTML = goods.reduce(function (result, val) {
              return result + val.num;
            }, 0);
          } else {
            setCookie("href", location.href);
            location.href = "./login.html";
          }
        });
        addEvent(document.querySelector(".suspAddCart"), "click", function () {
          if (getCookie("isLogin") === "ok") {
            var addCartTip = document.querySelector(".addCartTip");
            addCartTip.style.display = "block";
            setTimeout(function () {
              addCartTip.style.display = "none";
            }, 1000);
            setLocalData({
              goodID: value.ID,
              price: value.nowPrice,
              num: Number(document.querySelector(".sl").children[1].value),
              from: "goods_data",
              link: location.href
            });
            var goods = JSON.parse(getCookie("goods"));
            var cartNum = document.querySelector(".cartNum");
            cartNum.innerHTML = goods.reduce(function (result, val) {
              return result + val.num;
            }, 0);
          } else {
            setCookie("href", location.href);
            location.href = "./login.html";
          }
        });
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

      this.sBoxImg.src = this.aLi[0].firstChild.src;
      this.bBoxImg.src = this.aLi[0].firstChild.src;
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
        }); // addEvent(document, "scroll", function (event) {
        //     console.log(event.target);
        // })

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
        !this.susp.className.includes("fixed") && (this.susp.className += " fixed");
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
    setTimeout(function () {
      new FixedTab();
      new Navimage();
      new Magnifying();
    }, 100);
  }, 50);
});