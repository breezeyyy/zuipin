;
(function () {
    "use strict";

    class Banner_multiEle {
        constructor({
            imgBox,
            together,
            btns
        }) {
            this.imgBox = imgBox;
            this.together = together;
            this.btns = btns;
            this.imgList = this.imgBox.children;
            this.imgW = this.imgBox.offsetWidth / this.together;
            this.createPos();
            this.nowItems = [...this.pos.keys()];
            // console.log(this.imgBox.parentElement);
            // console.log(this.nowItems);
            this.init();
        }

        createPos() {
            this.pos = new Array(this.together).fill(0);
            this.pos.forEach((value, index) => {
                this.pos[index] = this.imgW * index;
            })
            // console.log(this.pos);
            this.imgInterval();
            this.imgHoverEvent();
        }

        init() {
            this.nowItems.forEach(val => {
                this.imgList[val].style.left = `${this.pos[val]}px`;
                this.imgList[val].style.zIndex = "100";
            })

            // console.log(this.btns);
            this.btnAddEvent();

        }

        imgHoverEvent() {
            const that = this;

            addEvent(this.imgBox.parentElement, "mouseenter", function () {
                clearInterval(that.intervalIndex);
            })

            addEvent(this.imgBox.parentElement, "mouseleave", function () {
                that.imgInterval();
            })
        }

        imgInterval() {
            clearInterval(this.intervalIndex);
            this.intervalIndex = setInterval(() => {
                this.prev();
            }, 3000);
        }

        btnAddEvent() {
            const that = this;

            addEvent(this.btns[0], "click", function () {
                that.next();
            })

            addEvent(this.btns[1], "click", function () {
                that.prev();
            })

            addEvent(this.btns[0].parentElement, "mouseenter", function () {
                clearInterval(that.intervalIndex);
            })

            addEvent(this.btns[1].parentElement, "mouseenter", function () {
                clearInterval(that.intervalIndex);
            })

            addEvent(this.btns[0].parentElement, "mouseleave", function () {
                that.imgInterval();
            })

            addEvent(this.btns[1].parentElement, "mouseleave", function () {
                that.imgInterval();
            })

        }

        prev() {
            this.nowItems.forEach((value, index) => {
                this.imgList[value].style.zIndex = "10";
                this.setMovePos(this.imgList[value], this.pos[index], true);
                this.nowItems[index] = value + 1 >= this.imgList.length ? 0 : value + 1;
            })
            // console.log(this.nowItems);
            this.nowItems.forEach((value, index) => {
                this.imgList[value].style.zIndex = "100";
                this.setMovePos(this.imgList[value], this.pos[index] + this.imgW, true);
            })
        }

        next() {
            this.nowItems.forEach((value, index) => {
                this.imgList[value].style.zIndex = "10";
                this.setMovePos(this.imgList[value], this.pos[index], false);
                this.nowItems[index] = value - 1 < 0 ? this.imgList.length - 1 : value - 1;
            })
            // console.log(this.nowItems);
            this.nowItems.forEach((value, index) => {
                this.imgList[value].style.zIndex = "100";
                this.setMovePos(this.imgList[value], this.pos[index] - this.imgW, false);
            })
        }

        setMovePos(target, value, calcFlag) {
            target.style.left = `${value}px`;
            // console.log(`${value}px`);
            this.move(target, calcFlag ? value - this.imgW : value + this.imgW);
        }

        move(target, value) {
            // console.log(value);
            elementAnimation(target, {
                left: value
            })
        }
    }

    window.createBannerMultiEle = function (obj) {
        new Banner_multiEle(obj);
    }
})();