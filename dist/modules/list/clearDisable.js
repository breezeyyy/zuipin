"use strict";

define(function () {
  return function (_ref) {
    var pageBox = _ref.pageBox;
    pageBox.children[0].className = "prev";
    pageBox.children[pageBox.children.length - 3].className = "next";
  };
});