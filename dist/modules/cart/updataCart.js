"use strict";

define(function () {
  return function (CART) {
    var goods = CART.goods,
        allPrice = CART.allPrice,
        goodsBox = CART.goodsBox,
        yunfei = CART.yunfei,
        priceTip = CART.priceTip,
        headCheckBox = CART.headCheckBox,
        footCheckBox = CART.footCheckBox,
        selectNum = CART.selectNum,
        cartNum = CART.cartNum;
    var all = goods.reduce(function (prev, val) {
      return prev + val.num;
    }, 0);
    cartNum.innerHTML = goods.length ? all : 0;
    var count = 0;
    Array.from(goodsBox.children).forEach(function (element, index) {
      element.children[0].children[0].className.includes("checked") && (count += goods[index].num);
    }); // console.log(all, count);

    headCheckBox.className = all === count ? "checkbox checked" : "checkbox";
    footCheckBox.className = all === count ? "checkbox checked" : "checkbox";
    selectNum.innerHTML = count;
    all = 0;
    Array.from(goodsBox.children).forEach(function (element, index) {
      element.children[4].children[0].children[0].innerHTML = goods[index].num * goods[index].price;
      element.children[0].children[0].className.includes("checked") && (all += goods[index].num * goods[index].price);
    }); // console.log(all);

    allPrice.innerHTML = all < 59 && all != 0 ? all + 10 : all;
    yunfei.innerHTML = all < 59 && all != 0 ? "含运费" : "不含运费";
    priceTip.innerHTML = all < 59 ? "未满足满59包邮" : "已满足满59包邮";
  };
});