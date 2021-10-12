"use strict";

define(function () {
  return function (url, type, success) {
    ajax({
      type: "GET",
      url: url,
      success: success,
      error: function error(status) {
        console.log(status);
      },
      search: {
        type: type
      }
    });
  };
});