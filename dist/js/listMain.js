"use strict";

require.config({
  baseUrl: "./",
  paths: {
    jq: "./libs/jquery",
    gg: "./modules/list/getGoodsData",
    lrb: "./modules/list/renderBanner",
    lpod: "./modules/list/listPullOrDown"
  }
});

require(["jq", "gg", "rlb", "lpod"], function (_, getGoodsData, renderListBanner, listPullOrDown) {
  $(".myHeader").load("http://localhost:3000/public/common.html .headerBox");
  $(".myOffsideNav").load("http://localhost:3000/public/common.html .fixNavBox");
  $(".myFooter").load("http://localhost:3000/public/common.html .footerBox");
  setTimeout(function () {
    var url = "http://localhost:3000/api";
    var goodList = document.querySelector(".good-list");
    var imageBoxMain = document.querySelector(".bannerImg");
    var bannerNavMain = document.querySelector(".bannerNav");
    var goodsListBox = document.querySelector(".good_list_box");
    var pageBox = document.querySelector(".pageBox");
    var pageIndex = 0;
    goodList.className += " list_html";
    getGoodsData(url, "list_banner", function (response) {
      // console.log(response);
      response.code && renderListBanner({
        response: response.data,
        bannerNavMain: bannerNavMain,
        imageBoxMain: imageBoxMain
      });
    });
    listPullOrDown(document.querySelector(".tab_list"), document.querySelector(".upOrDown")); // getGoodsData(url, "list_goods", (response) => {
    // if (response.code)
    //     this[renderer](response.data);
    // })
  }, 50);
});