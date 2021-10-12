"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require.config({
  baseUrl: "./modules/cart",
  paths: {
    gg: "../tools/getGoodsData",
    rc: "renderCart",
    an: "allNum",
    ap: "allPrice",
    rsl: "resetLocalData",
    init: "init",
    ca: "checkAll",
    ds: "delSelect"
  }
});

require(["gg", "rc", "an", "ap", "rsl", "init", "ca", "ds"], function (getGoodsData, renderCart, allNum, allPrice, resetLocalData, init, checkAll, delSelect) {
  document.querySelector(".header-bottom").className += " hide";
  setTimeout(function () {
    var CART = {};
    CART.url = "http://localhost:3000/api";
    CART.cart = document.querySelector("#cart");
    CART.emptyCart = document.querySelector(".emptyCart");
    CART.goodsBox = document.querySelector(".goodsBox");
    CART.selectNum = document.querySelector(".selectNum");
    CART.allPrice = document.querySelector(".allPrice");
    CART.headCheckBox = document.querySelector("dt .checkbox");
    CART.footCheckBox = document.querySelector(".cartSum .checkbox");
    CART.yunfei = document.querySelector(".yunfei");
    CART.priceTip = document.querySelector(".priceTip");
    CART.delSelect = document.querySelector(".delSelect");
    CART.goods = [];
    init(CART); // console.log(CART.goods);

    if (CART.goods.length) {
      getGoodsData(CART.url, "goods_data", function (response) {
        // console.log(response);
        response.code && renderCart(_objectSpread(_objectSpread({}, CART), {}, {
          response: response.data
        }));
        allNum(CART);
        allPrice(CART);
        var numInput = document.querySelectorAll(".numInfo input");
        numInput.forEach(function (element) {
          addEvent(element, "input", function () {
            element.value = element.value.replace(/[^\d]/g, "");
            CART.goods.find(function (val) {
              return val.goodID === element.parentElement.parentElement.getAttribute("goodID");
            }).num = Number(element.value);
            setCookie("goods", JSON.stringify(CART.goods), {
              expires: 3
            });
            allNum(CART);
            allPrice(CART);
          });
          addEvent(element, "blur", function () {
            element.value || (element.value = 1);
            CART.goods.find(function (val) {
              return val.goodID === element.parentElement.parentElement.getAttribute("goodID");
            }).num = Number(element.value);
            setCookie("goods", JSON.stringify(CART.goods), {
              expires: 3
            });
            allNum(CART);
            allPrice(CART);
          });
        });
      });
    }

    addEvent(CART.goodsBox, "click", function (event) {
      var target = getTarget(event);
      var goodItem = target.parentElement.parentElement;

      if (target.className === "delBtn") {
        var id = goodItem.getAttribute("goodID");
        goodItem.remove(); // console.log(id);

        resetLocalData(CART.goods, id);
        init(CART);

        if (CART.goods.length) {
          allNum(CART);
          allPrice(CART);
        }
      } else if (target.className.includes("checkInfo")) {
        target.children[0].className = target.children[0].className.includes("checked") ? "checkbox" : "checkbox checked";
        allNum(CART);
        allPrice(CART);
      } else if (target.className.includes("checkbox")) {
        target.className = target.className.includes("checked") ? "checkbox" : "checkbox checked";
        allNum(CART);
        allPrice(CART);
      } else if (target.className === "jian") {
        var num = target.nextElementSibling;
        num.value = num.value - 1 < 1 ? 1 : num.value - 1;
        CART.goods.find(function (val) {
          return val.goodID === goodItem.getAttribute("goodID");
        }).num = Number(num.value);
        setCookie("goods", JSON.stringify(CART.goods), {
          expires: 3
        });
        allNum(CART);
        allPrice(CART);
      } else if (target.className === "plus") {
        var _num = target.previousElementSibling;
        _num.value++;
        CART.goods.find(function (val) {
          return val.goodID === goodItem.getAttribute("goodID");
        }).num = Number(_num.value);
        setCookie("goods", JSON.stringify(CART.goods), {
          expires: 3
        });
        allNum(CART);
        allPrice(CART);
      }
    });
    addEvent(CART.cart, "click", function (event) {
      var target = getTarget(event);

      if (target.className.includes("checkInfo")) {
        if (target.children[1]) {
          checkAll(CART);
          allNum(CART);
          allPrice(CART);
        }
      } else if (target.className.includes("checkbox")) {
        if (target.nextElementSibling) {
          checkAll(CART);
          allNum(CART);
          allPrice(CART);
        }
      } else if (target.className.includes("checklabel")) {
        checkAll(CART);
        allNum(CART);
        allPrice(CART);
      }
    });
    addEvent(CART.delSelect, "click", function () {
      delSelect(CART);
      init(CART);

      if (CART.goods.length) {
        allNum(CART);
        allPrice(CART);
      }
    });
  }, 30);
});