"use strict";

define(function () {
  return function (_ref) {
    var response = _ref.response,
        bannerNavMain = _ref.bannerNavMain,
        imageBoxMain = _ref.imageBoxMain;
    var data = "";
    response.forEach(function (value) {
      data += "<li><a href=\"\"><img src=\"./images/list/".concat(value, "\" alt=\"\"></a></li>");
      var option = document.createElement("li");
      option.appendChild(document.createElement("span"));
      bannerNavMain.appendChild(option);
    });
    imageBoxMain.innerHTML = data;
    bannerNavMain.children[0].className = "bannerOn";
    window.createBannerMain({
      imgList: document.querySelectorAll(".bannerImg li"),
      btns: document.querySelectorAll(".bannerNav li")
    });
  };
});