"use strict";

;

(function () {
  getCookie("isLogin") !== "ok" && (location.href = "./login.html");
})();