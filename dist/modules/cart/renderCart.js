"use strict";

define(function () {
  return function (CART) {
    var response = CART.response,
        goods = CART.goods,
        cart = CART.cart,
        emptyCart = CART.emptyCart,
        goodsBox = CART.goodsBox; // console.log(goods, response);

    cart.className = goods.length ? "" : "hide";
    emptyCart.className = goods.length ? "emptyCart hide" : "emptyCart";
    var data = "";
    goods.forEach(function (element) {
      var value = response.find(function (val) {
        return val.ID === element.goodID;
      }); // console.log(value);

      data += "<dd class=\"goodItem clearfix\" goodID=\"".concat(value.ID, "\">\n                        <div class=\"checkInfo clearfix\">\n                            <div class=\"checkbox checked\"></div>\n                        </div>\n                        <div class=\"nameInfo\">\n                            <ul class=\"clearfix\">\n                                <li><img src=\"./images/list/").concat(value.img, "\" alt=\"\"></li>\n                                <li>\n                                    <p title=\"").concat(value.desc, "\">").concat(value.desc, "</p>\n                                </li>\n                            </ul>\n                        </div>\n                        <div class=\"priceInfo\">\n                            <p>").concat(value.price, "</p>\n                        </div>\n                        <div class=\"numInfo\">\n                            <button class=\"jian\">-</button>\n                            <input type=\"text\" value=\"").concat(element.num, "\">\n                            <button class=\"plus\">+</button>\n                        </div>\n                        <div class=\"countInfo\">\n                            <p>\uFFE5<span class=\"count\">").concat(element.num * Number(element.price), "</span></p>\n                        </div>\n                        <div class=\"doInfo\">\n                            <button class=\"delBtn\"></button>\n                        </div>\n                    </dd>");
      goodsBox.innerHTML = data;
    });
  };
});