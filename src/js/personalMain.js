require.config({
    baseUrl: "./modules/personal",
    paths: {
        jls: "judgeLoginStatus",
        cp: "changePsd"
    }
})

require(["jls", "cp"], function (judgeLoginStatus, changePsd) {

    document.querySelector(".header-bottom").className += " hide";

    setTimeout(() => {
        const PERSONAL = {
            url: "http://localhost:3000/api",
            menuCont: document.querySelectorAll(".menuCont"),
            menu: document.querySelectorAll(".menuMod ul li a"),
            pageIndex: 0,
            oldPsd: document.querySelector("#oldPsd"),
            newPsd: document.querySelector("#newPsd"),
            repeatPsd: document.querySelector("#repeatPsd"),
            submit: document.querySelector(".alterPsd button"),
            errorInfo: document.querySelectorAll(".alterPsd p"),
            loginout: document.querySelector(".loginout"),
            btnFlags: false,
            psdReg: /^.{6,16}$/
        };

        PERSONAL.menu.forEach((element, index) => {
            addEvent(element, "click", function () {
                PERSONAL.menu[PERSONAL.pageIndex].className = "";
                PERSONAL.menuCont[PERSONAL.pageIndex].style.display = "none";
                PERSONAL.pageIndex = index;
                PERSONAL.menuCont[PERSONAL.pageIndex].style.display = "block";
                this.className = "active";
            })
        })

        addEvent(PERSONAL.oldPsd, "input", function () {
            this.value ? PERSONAL.psdReg.test(this.value) ? hideErrInfo(0) : showErrInfo(0, 1) : hideErrInfo(0);
            judgeLoginStatus(PERSONAL);
        })

        addEvent(PERSONAL.newPsd, "input", function () {
            if (this.value) {
                if (PERSONAL.psdReg.test(this.value)) {
                    if (PERSONAL.oldPsd.value === this.value || !PERSONAL.oldPsd.value) {
                        showErrInfo(1, 3)
                    } else if (PERSONAL.repeatPsd.value === this.value || !PERSONAL.repeatPsd.value) {
                        hideErrInfo(1);
                        hideErrInfo(2)
                    } else {
                        showErrInfo(1, 0);
                    }
                } else {
                    showErrInfo(1, 1);
                }
            } else {
                hideErrInfo(1);
            }
            judgeLoginStatus(PERSONAL);
        })

        addEvent(PERSONAL.repeatPsd, "input", function () {
            if (this.value) {
                if (PERSONAL.psdReg.test(this.value)) {
                    if (PERSONAL.newPsd.value === this.value || !PERSONAL.newPsd.value) {
                        hideErrInfo(2);
                        hideErrInfo(1);
                    } else {
                        showErrInfo(2, 0);
                    }
                } else {
                    showErrInfo(2, 1);
                }
            } else {
                hideErrInfo(2);
            }
            judgeLoginStatus(PERSONAL);
        })

        addEvent(PERSONAL.submit, "click", function () {
            if (PERSONAL.btnFlags) {
                changePsd({
                    oldP: PERSONAL.oldPsd.value,
                    newP: PERSONAL.newPsd.value,
                    url: PERSONAL.url,
                    success: (res) => {
                        if (res.code) {
                            showErrInfo(0, 2);
                            PERSONAL.oldPsd.focus();
                        } else {
                            alert("密码修改成功，即将重新登陆");
                            PERSONAL.loginout.click();
                        }
                    }
                });
            }
        })

        function showErrInfo(index, flag) {
            const tipText = ["您输入的两次密码不一致", "您输入的密码格式有误，密码长度为6-16位", "旧密码错误", "新密码不能和旧密码相同"]
            PERSONAL.errorInfo[index].innerHTML = tipText[flag];
        }

        function hideErrInfo(index) {
            PERSONAL.errorInfo[index].innerHTML = "";
        }

    }, 50);
})