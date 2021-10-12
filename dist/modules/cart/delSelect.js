"use strict";

define(["rsl"], function (resetLocalData) {
  return function (CART) {
    var goods = CART.goods,
        goodsBox = CART.goodsBox;
    Array.from(goodsBox.children).forEach(function (element) {
      if (element.children[0].children[0].className.includes("checked")) {
        var id = element.getAttribute("goodID");
        element.remove();
        resetLocalData(goods, id);
      }
    });
  };
});