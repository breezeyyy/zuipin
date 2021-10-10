;(function() {
    class Login {
        constructor() {
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

            addEvent(this.accountInput[0], "input", function() {
                this.value = this.value.replace(/[^\d]/g, '');
                this.value ? (that.telReg.test(this.value) ? that.hideErrInfo(0) : that.showErrInfo(0)) : that.hideErrInfo(0);
            })

            addEvent(this.accountInput[1], "input", function() {
                this.value ? (that.telReg.test(this.value) || that.emailReg.test(this.value) ? that.hideErrInfo(1) : that.showErrInfo(1)) : that.hideErrInfo(1);
            })
        }

        showErrInfo(index) {
            this.errorInfo[index].style.display = "block";
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