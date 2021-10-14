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
      this.psdInp = document.querySelectorAll(".psd"); // console.log(this.psdInp);

      this.btns = document.querySelectorAll(".login_btn");
      this.btnFlags = [false, false];
      this.emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      this.telReg = /^1[3-9]\d{9}$/;
      this.psdReg = /^.{6,16}$/;
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
            that.accountInput[index].focus();
          });
        });
        this.accountInput.forEach(function (element, index) {
          addEvent(element, "input", function () {
            this.value ? that.telReg.test(this.value) || that.emailReg.test(this.value) ? that.hideErrInfo(index) : that.showErrInfo(index, 0) : that.hideErrInfo(index);
            that.judgeLoginStatus(index);
          });
        });
        addEvent(this.infoBox[0], "click", function () {
          that.tabs[1].click();
        });
        addEvent(this.psdInp[0], "input", function () {
          if (this.value) {
            if (that.psdReg.test(this.value)) {
              if (that.psdInp[1].value === this.value || !that.psdInp[1].value) {
                that.hideErrInfo(0);
              } else {
                that.showErrInfo(0, 1);
              }
            } else {
              that.showErrInfo(0, 2);
            }
          } else {
            that.hideErrInfo(0);
          }

          that.judgeLoginStatus(0);
        });
        addEvent(this.psdInp[1], "input", function () {
          if (this.value) {
            if (that.psdReg.test(this.value)) {
              if (that.psdInp[0].value === this.value || !that.psdInp[0].value) {
                that.hideErrInfo(0);
              } else {
                that.showErrInfo(0, 1);
              }
            } else {
              that.showErrInfo(0, 2);
            }
          } else {
            that.hideErrInfo(0);
          }

          that.judgeLoginStatus(0);
        });
        addEvent(this.psdInp[2], "input", function () {
          if (this.value) {
            if (that.psdReg.test(this.value)) {
              that.hideErrInfo(1);
            } else {
              that.showErrInfo(1, 2);
            }
          } else {
            that.hideErrInfo(1);
          }

          that.judgeLoginStatus(1);
        });
        addEvent(this.btns[0], "click", function () {
          if (that.btnFlags[0]) {
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
          if (that.btnFlags[1]) {
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
                type: "login",
                username: that.accountInput[1].value,
                password: that.psdInp[2].value
              }
            });
          }
        });
      }
    }, {
      key: "judgeLoginStatus",
      value: function judgeLoginStatus(index) {
        if (index) {
          if ((this.telReg.test(this.accountInput[1].value) || this.emailReg.test(this.accountInput[1].value)) && this.psdReg.test(this.psdInp[2].value)) {
            this.btnFlags[index] = true;
            this.btns[index].className = "login_btn right";
          } else {
            this.btnFlags[index] = false;
            this.btns[index].className = "login_btn";
          }
        } else {
          if ((this.telReg.test(this.accountInput[0].value) || this.emailReg.test(this.accountInput[0].value)) && this.psdReg.test(this.psdInp[0].value) && this.psdReg.test(this.psdInp[1].value) && this.psdInp[0].value === this.psdInp[1].value) {
            this.btnFlags[index] = true;
            this.btns[index].className = "login_btn right";
          } else {
            this.btnFlags[index] = false;
            this.btns[index].className = "login_btn";
          }
        }
      }
    }, {
      key: "login",
      value: function login(res) {
        if (res.code === 0) {
          setCookie("isLogin", "ok", {
            expires: 3
          });
          setCookie("username", res.data.username, {
            expires: 3
          });
          setCookie("goods", JSON.stringify(res.data.cartData), {
            expires: 3
          });
          var href = getCookie("href");
          setCookie("href");
          location.href = href ? href : "./index.html";
        } else if (res.code === 1) {
          alert("密码不符，请重新输入");
          this.psdInp[2].value = "";
          this.psdInp[2].focus();
        } else if (res.code === 2) {
          if (confirm("账号不存在，是否前往注册该账号？")) {
            this.tabs[0].click();
            this.accountInput[0].value = this.accountInput[1].value; // this.accountInput[0].focus();

            this.psdInp[0].value = "";
            this.psdInp[0].focus();
            this.psdInp[1].value = "";
          } else {
            this.accountInput[1].value = "";
            this.accountInput[1].focus();
          }
        } else if (res.code === 3) {
          alert("注册失败，账号重复");
          this.accountInput[0].value = "";
          this.accountInput[0].focus();
        }
      }
    }, {
      key: "showErrInfo",
      value: function showErrInfo(index, flag) {
        var tipText = ["您输入的账号格式有误，请核实后重新输入", "您输入的两次密码不一致", "您输入的密码格式有误，密码长度为6-16位"];
        this.errorInfo[index].style.display = "block";
        this.errorInfo[index].children[1].innerHTML = tipText[flag];
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