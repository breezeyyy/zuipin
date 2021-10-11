"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function () {
  var Login = /*#__PURE__*/function () {
    function Login() {
      _classCallCheck(this, Login);

      this.tabs = document.querySelectorAll(".login_tab li");
      this.accountInput = document.querySelectorAll(".phone");
      this.loginBox = document.querySelectorAll(".login_method li");
      this.infoBox = document.querySelector(".infoBox").children;
      this.account = this.accountInput[1];
      this.errorInfo = document.querySelectorAll(".phoneTip");
      this.telReg = /^1[3456789]\d{9}$/;
      this.emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      this.addLoginEvent();
    }

    _createClass(Login, [{
      key: "addLoginEvent",
      value: function addLoginEvent() {
        var that = this;
        this.tabs.forEach(function (element, index) {
          addEvent(element, "click", function () {
            that.clearTabClass();
            element.className = "on";
            that.loginBox[index].className = "on";
            that.infoBox[index].style.display = "block";
          });
        });
        addEvent(this.accountInput[0], "input", function () {
          this.value = this.value.replace(/[^\d]/g, '');
          this.value ? that.telReg.test(this.value) ? that.hideErrInfo(0) : that.showErrInfo(0) : that.hideErrInfo(0);
        });
        addEvent(this.accountInput[1], "input", function () {
          this.value ? that.telReg.test(this.value) || that.emailReg.test(this.value) ? that.hideErrInfo(1) : that.showErrInfo(1) : that.hideErrInfo(1);
        });
      }
    }, {
      key: "showErrInfo",
      value: function showErrInfo(index) {
        this.errorInfo[index].style.display = "block";
      }
    }, {
      key: "hideErrInfo",
      value: function hideErrInfo(index) {
        this.errorInfo[index].style.display = "none";
      }
    }, {
      key: "clearTabClass",
      value: function clearTabClass() {
        var _this = this;

        this.tabs.forEach(function (element, index) {
          element.className = "";
          _this.loginBox[index].className = "";
          _this.infoBox[index].style.display = "none";
        });
      }
    }]);

    return Login;
  }();

  new Login();
})();