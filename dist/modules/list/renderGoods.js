"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(["sd", "pon", "cp"], function (setDisable, prevOrNextPage, changePage) {
  return function (LIST) {
    var response = LIST.response,
        pageIndex = LIST.pageIndex,
        goodsListBox = LIST.goodsListBox,
        pageBox = LIST.pageBox,
        nav = LIST.nav,
        navGoInput = LIST.navGoInput;
    var data = "";

    for (var i = pageIndex * 20; i < pageIndex * 20 + 20 && i < response.length; i++) {
      data += "<li class=\"item\" goodID=\"".concat(response[i].ID, "\">");
      response[i].tejia && (data += "<div class=\"tag_img\"><img src=\"./images/list/zp_label_tejia_pc.png\"></div>");
      data += "<a href=\"./details.html\" target=\"_blank\">\n                                <img src=\"./images/list/".concat(response[i].img, "\">\n                            </a>\n                            <p class=\"item_desc\" title=\"").concat(response[i].desc, "\">").concat(response[i].desc, "</p>\n                            <p class=\"item_info\" title=\"").concat(response[i].info, "\">").concat(response[i].info, "</p>\n                            <p class=\"price\">").concat(response[i].price, "</p>\n                            <p class=\"praise\">").concat(response[i].praise, "+\u4EBA\u597D\u8BC4</p>\n                            <button class=\"addCart\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                        </li>");
    }

    goodsListBox.innerHTML = data;
    data = "<li class=\"prev\">\u4E0A\u4E00\u9875</li>";

    for (var _i = 1; _i <= Math.ceil(response.length / 20); _i++) {
      data += "<li>".concat(_i, "</li>");
    }

    pageBox.innerHTML = data + "<li class=\"next\">\u4E0B\u4E00\u9875</li>\n                                            <li class=\"all\">\u5171".concat(Math.ceil(response.length / 20), "\u9875</li>\n                                            <li class=\"goto\">\n                                                \u5230\u7B2C\n                                                <input type=\"text\" class=\"gotoIndex\">\n                                                \u9875\n                                                <button  class=\"go\">\u786E\u5B9A</button>\n                                            </li>");
    nav = Array.from(pageBox.children).slice(1, pageBox.children.length - 3);
    navGoInput = pageBox.lastChild.children[0];
    LIST.nav = nav;
    setDisable(LIST);

    navGoInput.oninput = function () {
      this.value = this.value.replace(/[^\d]/g, "");
    };

    nav[pageIndex].className = "active";

    pageBox.onclick = function (event) {
      var target = getTarget(event);

      if (target.className === "prev") {
        prevOrNextPage(_objectSpread(_objectSpread({}, LIST), {}, {
          flag: "prev"
        }));
      } else if (target.className === "next") {
        prevOrNextPage(_objectSpread(_objectSpread({}, LIST), {}, {
          flag: "next"
        }));
      } else if (target.className === "go") {
        if (navGoInput.value) changePage(_objectSpread(_objectSpread({}, LIST), {}, {
          index: navGoInput.value
        }));
      } else if (!target.className) {
        changePage(_objectSpread(_objectSpread({}, LIST), {}, {
          index: parseInt(target.innerHTML)
        }));
      }
    };
  };
});