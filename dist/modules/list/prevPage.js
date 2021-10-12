"use strict";

define(["gg", "lrg"], function (getGoodsData, renderGoods) {
  return function (_ref) {
    var pageIndex = _ref.pageIndex,
        goodsListBox = _ref.goodsListBox,
        pageBox = _ref.pageBox,
        nav = _ref.nav,
        navGoInput = _ref.navGoInput,
        flag = _ref.flag;
    nav[pageIndex].className = "";
    flag === "prev" ? pageIndex-- : this.pageIndex++;
    ;
    getGoodsData(url, "goods_data", function (response) {
      // console.log(response);
      response.code && renderGoods({
        response: response.data,
        pageIndex: pageIndex,
        goodsListBox: goodsListBox,
        pageBox: pageBox,
        nav: nav,
        navGoInput: navGoInput
      });
    });
    elementAnimation(document.documentElement, {
      scrollTop: 700
    });
  };
});