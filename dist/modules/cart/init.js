"use strict";

define(function () {
  return function (CART) {
    var cart = CART.cart,
        emptyCart = CART.emptyCart;
    CART.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
    cart.className = CART.goods.length ? "" : "hide";
    emptyCart.className = CART.goods.length ? "emptyCart hide" : "emptyCart";
  };
});