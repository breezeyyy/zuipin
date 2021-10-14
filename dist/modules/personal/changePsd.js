"use strict";

define(function () {
  return function (_ref) {
    var oldP = _ref.oldP,
        newP = _ref.newP,
        url = _ref.url,
        _success = _ref.success;
    // console.log(oldP, newP);
    ajax({
      url: url,
      type: "GET",
      success: function success(res) {
        _success(res);
      },
      fail: function fail(status) {
        console.log(status);
      },
      search: {
        type: "changeUserPsd",
        oldP: oldP,
        newP: newP,
        username: getCookie("username")
      }
    });
  };
});