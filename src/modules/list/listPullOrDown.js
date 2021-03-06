define(() => {

    class PullOrDown {
        constructor({
                tabList,
                upOrDown
            }) {
            this.box = tabList;
            this.btn = upOrDown;
            this.icon = this.btn.children;
            this.nowIndex = 0;

            this.btnAddEvent();
        }

        btnAddEvent() {
            const that = this;

            addEvent(this.btn, "click", function () {
                that.changeIconStyle();
            })
        }

        changeIconStyle() {
            this.icon[this.nowIndex].style.display = "none";
            this.box.style.height = this.nowIndex ? "120px" : "300px";
            this.nowIndex = Number(!this.nowIndex);
            this.icon[this.nowIndex].style.display = "block";
        }
    }

    return function (LIST) {
        new PullOrDown(LIST);
    }
})