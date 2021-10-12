"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require.config({
  baseUrl: "./modules/list",
  paths: {
    gg: "getGoodsData",
    lrb: "renderBanner",
    lrg: "renderGoods",
    lpod: "listPullOrDown",
    sd: "setDisable",
    cd: "clearDisable",
    pon: "prevOrNextPage",
    cp: "changePage"
  }
});

require(["gg", "lrb", "lrg", "lpod"], function (getGoodsData, renderListBanner, renderGoods, listPullOrDown) {
  setTimeout(function () {
    var LIST = {};
    LIST.url = "http://localhost:3000/api";
    LIST.goodList = document.querySelector(".good-list");
    LIST.imageBoxMain = document.querySelector(".bannerImg");
    LIST.bannerNavMain = document.querySelector(".bannerNav");
    LIST.goodsListBox = document.querySelector(".good_list_box");
    LIST.pageBox = document.querySelector(".pageBox");
    LIST.nav = null;
    LIST.navGoInput = null;
    LIST.pageIndex = 0;
    LIST.renderGoods = renderGoods;
    LIST.tabList = document.querySelector(".tab_list");
    LIST.upOrDown = document.querySelector(".upOrDown");
    LIST.goodList.className += " list_html";
    getGoodsData(LIST.url, "list_data", function (response) {
      response.code && renderListBanner(_objectSpread(_objectSpread({}, LIST), {}, {
        response: response.data
      }));
    });
    getGoodsData(LIST.url, "goods_data", function (response) {
      // console.log(response);
      response.code && renderGoods(_objectSpread(_objectSpread({}, LIST), {}, {
        response: response.data
      }));
    });
    listPullOrDown(LIST);
    addEvent(LIST.pageBox, "selectstart", function (event) {
      stopDefault(event);
    });
  }, 100);
});