"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function () {
  var Login = /*#__PURE__*/function () {
    function Login() {
      _classCallCheck(this, Login);

      this.url = "http: //localhost:3000/api";
      this.tabs = document.querySelectorAll(".login_tab li");
      this.accountInput = document.querySelectorAll(".phone");
      this.loginBox = document.querySelectorAll(".login_method li");
      this.infoBox = document.querySelector(".infoBox").children;
      this.account = this.accountInput[1];
      this.errorInfo = document.querySelectorAll(".phoneTip");
      this.psdInp = document.querySelectorAll(".psd");
      console.log(this.psdInp);
      this.btns = document.querySelectorAll(".login_btn");
      this.btnFlag = false;
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
        this.accountInput.forEach(function (element, index) {
          addEvent(element, "input", function () {
            this.value ? that.telReg.test(this.value) || that.emailReg.test(this.value) ? that.hideErrInfo(index) : that.showErrInfo(index) : that.hideErrInfo(index);
          });
        });
        addEvent(this.infoBox[0], "click", function () {
          that.tabs[1].click();
        });
        addEvent(this.psdInp[1], "input", function () {
          this.value ? that.psdInp[0].value === this.value ? that.hideErrInfo(0, false) : that.showErrInfo(0, false) : that.hideErrInfo(0, false);
        });
        addEvent(this.btns[0], "click", function () {
          // console.log(that.accountInput[0].value, that.psdInp[0].value);
          if ((that.telReg.test(that.accountInput[0].value) || that.emailReg.test(that.accountInput[0].value)) && that.psdInp[0].value === that.psdInp[1].value) {
            ajax({
              type: "GET",
              url: that.url,
              success: function success(res) {
                // console.log(res);
                that.login(res);
              },
              error: function error(status) {
                console.log(status);
              },
              search: {
                type: "register",
                username: that.accountInput[0].value,
                password: that.psdInp[0].value
              }
            });
          }
        });
        addEvent(this.btns[1], "click", function () {
          if (that.telReg.test(that.accountInput[1].value) || that.emailReg.test(that.accountInput[1].value)) {
            ajax({
              type: "GET",
              url: that.url,
              success: function success(res) {
                console.log(res);
                that.login(res);
              },
              error: function error(status) {
                console.log(status);
              },
              search: {
                type: "login",
                username: that.accountInput[1].value,
                password: that.psdInp[2].value
              }
            });
          }
        });
      }
    }, {
      key: "login",
      value: function login(res) {
        if (res.code === 0) {
          setCookie("isLogin", "ok");
          setCookie("username", res.data);
          location.href = getCookie("href") ? getCookie("href") : "./index.html";
        } else if (res.code === 1) {
          alert("密码不符，请重新输入");
          this.psdInp[2].value = "";
          this.psdInp[2].focus();
        } else if (res.code === 2) {
          alert("用户名不存在，请先注册");
          this.tabs[0].click();
          this.accountInput[0].value = "";
          this.accountInput[0].focus();
          this.psdInp[0].value = "";
          this.psdInp[1].value = "";
        }
      }
    }, {
      key: "showErrInfo",
      value: function showErrInfo(index) {
        var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        this.errorInfo[index].style.display = "block";
        this.errorInfo[index].children[1].innerHTML = flag ? "您输入的账号格式有误，请核实后重新输入" : "两次密码不一致";
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