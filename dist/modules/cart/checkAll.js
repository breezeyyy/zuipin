"use strict";

define(function () {
  return function (CART) {
    var goodsBox = CART.goodsBox,
        headCheckBox = CART.headCheckBox;
    Array.from(goodsBox.children).forEach(function (element) {
      element.children[0].children[0].className = headCheckBox.className.includes("checked") ? "checkbox" : "checkbox checked";
    });
  };
});