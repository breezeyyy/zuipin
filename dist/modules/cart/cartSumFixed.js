"use strict";

define(function () {
  return function (CART) {
    var cartSum = CART.cartSum;
    console.log(cartSum.getBoundingClientRect().top, document.documentElement.scrollTop);
    cartSum.className = document.documentElement.scrollTop < 641.6 ? "cartSum clearfix fixed" : "cartSum clearfix";
  };
});