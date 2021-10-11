window.onload = function () {
    "use strict"

    class Search {
        constructor() {
            this.nowIndex;
            this.li;
            this.closeFlag = false;
            this.searchBox = document.querySelector(".search");
            this.search = document.querySelector(".search-cont");
            this.text = document.querySelector("#text");
            this.options = document.querySelector(".search .options");
            this.button = document.querySelector(".search-cont button");
            this.url = "https://suggest.taobao.com/sug";

            this.classAddEvent();
        }

        /**
         * 为对象添加事件
         */
        classAddEvent() {
            const that = this;

            // 输入框输入事件
            addEvent(this.text, "input", function () {
                if (that.text.value) {
                    that.closeFlag = true;
                    that.nowValue = that.text.value;
                    that.getDatas();
                } else {
                    that.closeFlag = false;
                    that.listHide();
                }
            })

            // 整个页面单击事件
            addEvent(document, "click", function (event) {
                const target = getTarget(event);
                if (target.nodeName === "INPUT" && target.parentElement.className.includes("search-cont")) {
                    that.text.focus();
                    if (that.nowValue)
                        that.getDatas();
                } else if (target.nodeName === "LI" && target.parentElement.className === "options") {
                    that.nowValue = that.li[that.nowIndex].innerHTML;
                    that.changeTextValue(that.li[that.nowIndex].innerHTML);
                    that.listHide();
                } else if (target.nodeName !== "UL" && target.nodeName !== "BUTTON") {
                    that.lostFocus();
                }
            })

            // 输入框获取焦点事件
            addEvent(this.text, "focus", function () {
                that.getFocus();
                if (that.nowValue)
                    that.getDatas();
            })

            // 按钮鼠标进入事件
            addEvent(this.button, "mouseenter", function () {
                // console.log(document.hasFocus());
                that.search.className = "search-cont search-active";
            })

            // 按钮鼠标离开事件
            addEvent(this.button, "mouseleave", function () {
                if (that.text !== document.activeElement)
                    that.search.className = "search-cont";
            })
        }

        /**
         * 当产生下拉菜单时所添加的事件
         */
        liAddEvent() {
            const that = this;
            this.li = this.options.children;

            Array.from(this.li).forEach((element, index) => {
                addEvent(element, "mouseenter", function () {
                    that.clearPrevOptionStyle();
                    that.optionActive(index);
                })

                addEvent(element, "mouseleave", function () {
                    that.clearPrevOptionStyle();
                })
            });
        }

        /**
         * 整个页面的键盘按下事件
         */
        documentAddKeyEvent() {
            const that = this;

            document.onkeydown = function (event) {
                const oEve = getEvent(event);
                const code = oEve.keycode || oEve.which;
                if (code === 38) {
                    that.keyPrev();
                } else if (code === 40) {
                    that.keyNext();
                } else if (code === 13) {
                    that.nowValue = that.li[that.nowIndex].innerHTML;
                    that.listHide();
                    // this.nowIndex = undefined;
                }
            }
        }

        /**
         * 删除页面键盘按下事件
         */
        documentRemovekeyEvent() {
            document.onkeydown = null;
        }

        /**
         * 使用jsonp向接口获取数据
         */
        getDatas() {
            jsonp(this.url, (response) => {
                this.optionInit(response.result);
            }, {
                code: "utf-8",
                q: this.nowValue,
                callback: "callback",
                fieldName: "callback"
            })
        }

        /**
         * 获取数据后的页面初始化
         */
        optionInit(data) {
            if (data.length) {
                let str = '';
                for (let i = 0; i < data.length; i++) {
                    str += `<li>${data[i][0]}</li>`;
                }
                this.options.innerHTML = str;
                this.listShow();
                this.liAddEvent();
            } else {
                this.listHide();
            }
        }

        /**
         * 输入框获得焦点后执行
         */
        getFocus() {
            this.search.className = "search-cont search-active";
        }

        /**
         * 输入框失去焦点后执行
         */
        lostFocus() {
            this.nowValue = this.text.value;
            this.search.className = "search-cont";
            // this.text.className = "";
            this.options.style.display = 'none';
        }

        /**
         * 下拉列表显示
         */
        listShow() {
            if (this.closeFlag) {
                // this.text.className = "focusinp";
                // this.search.className = "search focus display";
                this.options.style.display = 'block';
                this.documentAddKeyEvent();
            }
        }

        /**
         * 下拉列表隐藏
         */
        listHide() {
            this.nowIndex = undefined;
            // this.text.className = "";
            // this.search.className = "search focus";
            this.options.style.display = 'none';
            this.documentRemovekeyEvent();
        }

        /**
         * 设置当前选项为active样式
         */
        optionActive(index) {
            this.nowIndex = index;
            this.li[this.nowIndex].className = "active";
        }

        /**
         * 清除上次的active样式
         */
        clearPrevOptionStyle() {
            if (!isNaN(this.nowIndex) && this.nowIndex !== -1 && this.nowIndex !== this.li.length)
                this.li[this.nowIndex].className = "";
        }

        /**
         * 根据目标值改变当前输入框的值
         */
        changeTextValue(value) {
            this.text.value = value;
        }

        /**
         * 方向键上  上一个选项
         */
        keyPrev() {
            this.clearPrevOptionStyle();
            if (isNaN(this.nowIndex) || this.nowIndex === -1) {
                this.optionActive(this.li.length - 1);
            } else if (this.nowIndex === 0) {
                this.nowIndex = this.li.length;
            } else {
                this.optionActive(this.nowIndex - 1);
            }
            if (this.nowIndex !== this.li.length)
                this.changeTextValue(this.li[this.nowIndex].innerHTML);
            else
                this.changeTextValue(this.nowValue);
        }

        /**
         * 方向键下  下一个选项
         */
        keyNext() {
            this.clearPrevOptionStyle();
            if (isNaN(this.nowIndex) || this.nowIndex === this.li.length) {
                this.optionActive(0);
            } else if (this.nowIndex === this.li.length - 1) {
                this.nowIndex = -1;
            } else {
                this.optionActive(this.nowIndex + 1);
            }
            if (this.nowIndex !== -1)
                this.changeTextValue(this.li[this.nowIndex].innerHTML);
            else
                this.changeTextValue(this.nowValue);
        }
    }

    class Menu3 {
        constructor() {
            this.nav = document.querySelector(".good-list");
            this.navAddEvent();
        }

        navAddEvent() {
            const that = this;

            addEvent(this.nav, "mouseenter", function (event) {
                that.show(this);
                Array.from(this.lastElementChild.children).forEach(val => {
                    val.onmouseenter = function () {
                        that.show(this);
                    }
                })
                Array.from(this.lastElementChild.children).forEach(val => {
                    val.onmouseleave = function () {
                        that.hide(this);
                    }
                })
            })

            addEvent(this.nav, "mouseleave", function (event) {
                if (this.className.includes("list_html"))
                    that.hide(this);

            })
        }

        show(target) {
            target.lastElementChild.style.display = "block";
        }

        hide(target) {
            target.lastElementChild.style.display = "none";
        }
    }

    class AsideTop {
        constructor() {
            this.top = document.querySelector(".toTop");
            this.judgeStatus();
            this.topAddEvent();
        }

        topAddEvent() {
            const that = this;

            addEvent(document, "scroll", function () {
                that.judgeStatus();
            })

            addEvent(this.top, "click", function () {
                elementAnimation(document.documentElement, {
                    scrollTop: 0
                })
            })
        }

        judgeStatus() {
            document.documentElement.scrollTop >= 500 ? this.show() : this.hide();
        }

        show() {
            this.top.style.display = "block";
            this.setDelay(() => {
                this.top.style.opacity = "1";
            }, 20);
        }

        hide() {
            this.top.style.opacity = "0";
            this.setDelay(() => {
                this.top.style.display = "none";
            }, 400);
        }

        setDelay(func, timoDelay) {
            clearTimeout(this.timeOutIndex);
            this.timeOutIndex = setTimeout(func, timoDelay);
        }
    }

    class DocumentInit {
        constructor() {
            this.imageBox = document.querySelectorAll(".item-desc");

            this.getImageData();
        }

        /**
         * 获取数据库图片数据
         */
        getImageData() {
            ajax({
                type: "GET",
                url: "http://localhost:3000/api",
                success: (response) => {
                    if (response.data !== [])
                        this.renderer(response.data);
                },
                error: (status) => {
                    console.log(status);
                },
                search: {
                    type: "common_data"
                }
            })
        }

        /**
         * 根据获取的数据将图片添加到页面中并初始化
         * @param {array} response 获取的图片数据
         */
        renderer(response) {
            let index = 0;
            for(let key in response) {
                let data = `<ul>`;
                response[key].forEach(value => {
                    data += `<li><img src="../images/common/${value.img}"><span>${value.info}</span></li>`
                })
                this.imageBox[index++].innerHTML = data + `</ul>`;
            }
        }
    }

    setTimeout(() => {
        new DocumentInit();
        new AsideTop();
        new Menu3();
        new Search();
    }, 200);
}