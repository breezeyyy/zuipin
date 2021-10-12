"use strict";

define(function () {
  return function (CART) {
    var goods = CART.goods,
        goodsBox = CART.goodsBox,
        headCheckBox = CART.headCheckBox,
        footCheckBox = CART.footCheckBox,
        selectNum = CART.selectNum;
    var all = goods.reduce(function (prev, val) {
      return prev + val.num;
    }, 0);
    var count = 0;
    Array.from(goodsBox.children).forEach(function (element, index) {
      element.children[0].children[0].className.includes("checked") && (count += goods[index].num);
    }); // console.log(all, count);

    headCheckBox.className = all === count ? "checkbox checked" : "checkbox";
    footCheckBox.className = all === count ? "checkbox checked" : "checkbox";
    selectNum.innerHTML = count;
  };
});