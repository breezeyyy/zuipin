;(function() {
    class Login {
        constructor() {
            this.url = "http: //localhost:3000/api";
            this.tabs = document.querySelectorAll(".login_tab li");
            this.accountInput = document.querySelectorAll(".phone");
            this.loginBox = document.querySelectorAll(".login_method li");
            this.infoBox = document.querySelector(".infoBox").children;
            this.account = this.accountInput[1];
            this.errorInfo = document.querySelectorAll(".phoneTip");
            this.psdInp = document.querySelectorAll(".psd");
            this.btns = document.querySelector(".login_btn");
            this.telReg = /^1[3456789]\d{9}$/;
            this.emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

            this.addLoginEvent();
        }

        addLoginEvent() {
            const that = this;

            this.tabs.forEach((element, index) => {
                addEvent(element, "click", function() {
                    that.clearTabClass();
                    element.className = "on";
                    that.loginBox[index].className = "on";
                    that.infoBox[index].style.display = "block";
                })
            })

            this.accountInput.forEach((element, index) => {
                addEvent(element, "input", function () {
                    this.value ? (that.telReg.test(this.value) || that.emailReg.test(this.value) ? that.hideErrInfo(index) : that.showErrInfo(index)) : that.hideErrInfo(index);
                })
            })

            addEvent(this.infoBox[0], "click", function() {
                that.tabs[1].click();
            })

            addEvent(this.psdInp[1], "input", function() {
                this.value ? that.psdInp[0].value === this.value ? that.hideErrInfo(0, false) : that.showErrInfo(0, false) : that.hideErrInfo(0, false);
            })

            addEvent(this.btns[0], "click", function() {

            })
        }

        showErrInfo(index, flag = true) {
            this.errorInfo[index].style.display = "block";
            this.errorInfo[index].children[1].innerHTML = flag ? "您输入的账号格式有误，请核实后重新输入" : "两次密码不一致";
        }

        hideErrInfo(index) {
            this.errorInfo[index].style.display = "none";
        }

        clearTabClass() {
            this.tabs.forEach((element, index) => {
                element.className = "";
                this.loginBox[index].className = "";
                this.infoBox[index].style.display = "none";
            })
        }
    }

    new Login();
})();