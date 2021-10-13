"use strict";

define(function () {
  return function (CART) {
    var cartSum = CART.cartSum;
    console.log(cartSum.getBoundingClientRect().top);
  };
});