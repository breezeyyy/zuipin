"use strict";

define(function () {
  return function (_ref) {
    var goodID = _ref.goodID,
        price = _ref.price,
        _ref$num = _ref.num,
        num = _ref$num === void 0 ? 1 : _ref$num,
        from = _ref.from,
        link = _ref.link;
    var goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
    var item = goods.find(function (val) {
      return val.goodID === goodID;
    }); // console.log(item);

    if (goods.length && item) {
      item.num += num;
    } else {
      goods.push({
        goodID: goodID,
        num: num,
        price: price,
        from: from,
        link: link
      });
    } // console.log(goods);


    setCookie("goods", JSON.stringify(goods), {
      expires: 3
    });
  };
});