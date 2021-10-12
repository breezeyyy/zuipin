"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(["gg"], function (getGoodsData) {
  return function (LIST) {
    var url = LIST.url,
        pageIndex = LIST.pageIndex,
        nav = LIST.nav,
        renderGoods = LIST.renderGoods,
        index = LIST.index;
    nav[pageIndex].className = "";

    if (index > nav.length - 1) {
      pageIndex = nav.length - 1;
    } else if (index < 1) {
      pageIndex = 0;
    } else {
      pageIndex = index - 1;
    }

    LIST.pageIndex = pageIndex;
    getGoodsData(url, "goods_data", function (response) {
      // console.log(response);
      response.code && renderGoods(_objectSpread(_objectSpread({}, LIST), {}, {
        response: response.data
      }));
    });
    elementAnimation(document.documentElement, {
      scrollTop: 700
    });
    nav[pageIndex].className = "active";
  };
});