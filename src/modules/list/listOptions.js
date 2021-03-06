define(() => {
    class ListOptions {
        constructor({
                tabOptions
            }) {
            this.tabOptions = tabOptions;
            this.priceSortImg = ["url('../images/list/shang.jpg')", "url('../images/list/xia.jpg')"];
            this.priceSortImgIndex = 1;

            this.optionAddEvent();
        }

        optionAddEvent() {
            const that = this;

            this.tabOptions.forEach((element, index) => {
                addEvent(element, "click", function () {
                    that.clearTabOptionClass();
                    element.className = "red";
                    if (index === 2) {
                        that.priceSortImgIndex = Number(!that.priceSortImgIndex);
                        element.style.backgroundImage = that.priceSortImg[that.priceSortImgIndex]
                    }
                })
            })
        }

        clearTabOptionClass() {
            this.tabOptions.forEach(element => {
                element.className = "";
            })
        }
    }

    return function(LIST) {
        new ListOptions(LIST);
    }
})