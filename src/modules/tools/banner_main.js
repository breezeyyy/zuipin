;
(function () {
    "use strict";

    class Banner_main {
        constructor({
            imgList,
            btns
        }) {
            this.imgList = imgList;
            this.imgBox = this.imgList[0].parentElement;
            this.btns = btns;
            this.nowIndex = 0;
            this.show();
            // console.log(this.imgW);
            this.btnsEvent();
            this.imgInterval();
            this.imgHoverEvent();
        }

        btnsEvent() {
            const that = this;
            this.btns.forEach((element, index) => {
                addEvent(element, "mouseover", function () {
                    if (index != that.nowIndex) {
                        that.changeImg(index);
                    }
                })
            })
        }

        imgHoverEvent() {
            const that = this;

            addEvent(this.imgBox, "mouseenter", function () {
                clearInterval(that.intervalIndex);
            })

            addEvent(this.imgBox, "mouseleave", function () {
                that.imgInterval();
            })
        }

        imgInterval() {
            clearInterval(this.intervalIndex);
            this.intervalIndex = setInterval(() => {
                this.changeImg(this.nowIndex + 1 === this.imgList.length ? 0 : this.nowIndex + 1)
            }, 3000);
        }

        changeImg(index) {
            this.btns[this.nowIndex].className = "";
            this.hide();
            this.nowIndex = index;
            this.btns[this.nowIndex].className = "bannerOn";
            this.show();
        }

        show() {
            this.imgList[this.nowIndex].style.zIndex = "1000";
            this.imgList[this.nowIndex].style.opacity = "1";
        }

        hide() {
            this.imgList[this.nowIndex].style.zIndex = "0";
            this.imgList[this.nowIndex].style.opacity = "0";
        }

        setDelay(func, timoDelay) {
            clearTimeout(this.timeOutIndex);
            this.timeOutIndex = setTimeout(func, timoDelay);
        }
    }

    window.createBannerMain = function (obj) {
        new Banner_main(obj);
    }
})();