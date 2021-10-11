;
(function () {
    class DocumentInit {
        constructor() {
            this.goodList = document.querySelector(".good-list");

            this.init();
        }

        init() {
            this.goodList.className += " list_html";
        }
    }

    class Magnifying {
        constructor() {
            this.sBox = document.querySelector(".smallBox");
            this.sBoxW = parseInt(getStyle(this.sBox, "width"));
            this.sBoxH = parseInt(getStyle(this.sBox, "height"));
            this.oSpan = document.querySelector(".smallBox span");
            this.bBox = document.querySelector(".bigBox");
            this.bBoxImg = this.bBox.firstElementChild;

            this.MagnifyingAddEvent();
        }

        // 初始化
        oSpanInit() {
            this.oSpanLine = this.sBoxW * this.ratio;
            this.oSpan.style.width = this.oSpanLine + 'px';
            this.oSpan.style.height = this.oSpanLine + 'px';
        }

        // 添加事件
        MagnifyingAddEvent() {
            const that = this;
            // 鼠标进入事件
            addEvent(this.sBox, "mouseenter", () => {
                that.show();
            })
            // 鼠标离开事件
            addEvent(this.sBox, "mouseleave", () => {
                that.hide();
            })
            // 鼠标移动事件
            addEvent(this.sBox, "mousemove", (event) => {
                const oEve = getEvent(event);
                that.refreshSpan({
                    x: oEve.offsetX,
                    y: oEve.offsetY
                });
            })
        }

        // 显示遮罩
        show() {
            this.oSpan.style.display = "block";
            this.bBox.style.display = "block";
            this.ratio = this.bBox.offsetWidth / this.bBoxImg.offsetWidth;
            this.oSpanInit();
        }

        // 隐藏遮罩
        hide() {
            this.oSpan.style.display = "none";
            this.bBox.style.display = "none";
        }

        // 刷新遮罩位置
        refreshSpan(pos) {
            let l = pos.x - this.oSpanLine / 2,
                t = pos.y - this.oSpanLine / 2;
            if (l < 0) l = 0;
            if (t < 0) t = 0;
            if (pos.x > this.sBoxW - this.oSpanLine / 2) l = this.sBoxW - this.oSpanLine;
            if (pos.y > this.sBoxH - this.oSpanLine / 2) t = this.sBoxH - this.oSpanLine;
            this.oSpan.style.left = l + 'px';
            this.oSpan.style.top = t + 'px';
            this.refreshBBoxImg(l / this.ratio, t / this.ratio);
        }

        // 刷新大盒子图片位置
        refreshBBoxImg(l, t) {
            this.bBoxImg.style.left = -l + 'px';
            this.bBoxImg.style.top = -t + 'px';
        }
    }

    class Navimage {
        constructor() {
            this.sBox = document.querySelector(".smallBox");
            this.sBoxImg = document.querySelector(".smallBox img");
            this.bBox = document.querySelector(".bigBox");
            this.bBoxImg = document.querySelector(".bigBox img");
            this.nav = document.querySelector(".nav");
            this.aLi = document.querySelectorAll(".nav li");
            this.btns = document.querySelectorAll(".picNav button");
            this.navImgs = Array.from(this.nav.children).map(element => element.firstElementChild.src.replace(/http:\/\/localhost:3000/, "."));
            this.nowIndex = 0;

            // console.log(this.navImgs);
            this.NavAddEvnet();
        }

        NavAddEvnet() {
            const that = this;

            this.aLi.forEach((element, index) => {
                addEvent(element, "click", function() {
                    that.clearNavStyle(index);
                    that.addNavStyle();
                    that.replaceImg();
                })
            })

            this.btns.forEach((element, index) => {
                addEvent(element, "click", function() {

                    index ? that.nextImg() : that.prevImg();
                    that.addNavStyle();
                    that.replaceImg();
                })
            })

            addEvent(document, "scroll", function(event) {
                console.log(event.target);
            })

            addEvent(document, "selectstart", function(event) {
                stopDefault(getEvent(event));
            })
        }

        // 上一张
        prevImg() {
            this.clearNavStyle(this.nowIndex === 0 ? 0 : this.nowIndex - 1);
        }

        // 下一张
        nextImg() {
            this.clearNavStyle(this.nowIndex === this.aLi.length - 1 ? this.aLi.length - 1 : this.nowIndex + 1);
        }

        // 清除样式
        clearNavStyle(index) {
            this.aLi[this.nowIndex].className = "";
            this.nowIndex = index;
        }

        // 添加样式
        addNavStyle() {
            this.aLi[this.nowIndex].className = "on"
        }

        // 切换图片
        replaceImg() {
            this.sBoxImg.src = this.navImgs[this.nowIndex];
            this.bBoxImg.src = this.navImgs[this.nowIndex];
        }
    }

    class FixedTab {
        constructor() {
            this.susp = document.querySelector(".suspension");

            this.fixedAddEvent();
        }

        fixedAddEvent() {
            const that = this;

            this.judge();
            addEvent(document, "scroll", function () {
                that.judge();
            })
        }

        judge() {
            document.documentElement.scrollTop >= 800 ? this.show() : this.hide();
        }

        show() {
            this.susp.className += " fixed";
            elementAnimation(this.susp, {
                top: 0
            })
        }

        hide() {
            elementAnimation(this.susp, {
                top: -60
            })
            this.susp.className = "suspension";
        }
    }

    setTimeout(() => {
        new DocumentInit();
        new FixedTab();
        new Magnifying();
        new Navimage();
    }, 30);
})();