"use strict";

define(function () {
  return function (goodID, price) {
    var goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
    var item = goods.find(function (val) {
      return val.goodID === goodID;
    });

    if (goods.length && item) {
      item.num++;
    } else {
      goods.push({
        goodID: goodID,
        num: 1,
        price: price
      });
    }

    setCookie("goods", JSON.stringify(goods), {
      expires: 3
    });
  };
});