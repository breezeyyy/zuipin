"use strict";

define(function () {
  return function (goodID, price) {
    var num = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
    var item = goods.find(function (val) {
      return val.goodID === goodID;
    });
    console.log(item);

    if (goods.length && item) {
      item.num++;
    } else {
      goods.push({
        goodID: goodID,
        num: num,
        price: price
      });
    }

    console.log(goods);
    setCookie("goods", JSON.stringify(goods), {
      expires: 3
    });
  };
});