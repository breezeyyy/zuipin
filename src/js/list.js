;
(function () {
    class DocumentInit {
        constructor() {
            this.goodList = document.querySelector(".good-list");
            this.imageBoxMain = document.querySelector(".bannerImg");
            this.bannerNavMain = document.querySelector(".bannerNav");
            this.goodsListBox = document.querySelector(".good_list_box");
            this.pageBox = document.querySelector(".pageBox");
            this.pageIndex = 0;

            // console.log();
            this.init();
            this.addPageNavEvent();
        }

        init() {
            this.goodList.className += " list_html";
            this.getGoodsData("list_banner", "renderer_list_banner");
            this.refreshPageContent();
        }

        addPageNavEvent() {
            const that = this;

            addEvent(this.pageBox, "click", function (event) {
                const target = getTarget(event);
                if (target.className === "prev") {
                    that.prevPage();
                } else if (target.className === "next") {
                    that.nextPage();
                } else if (target.className === "go") {
                    that.pageGo();
                    // console.log(target.className);
                } else if (!target.className) {
                    that.changePage(parseInt(target.innerHTML));
                }
            })

            addEvent(this.pageBox, "selectstart", function (event) {
                stopDefault(event);
            })
        }

        addNavInputGoEvent() {
            const that = this;
            
            this.navGoInput.oninput = function() {
                this.value = this.value.replace(/[^\d]/g, "");
            }
        }

        /**
         * 获取数据库图片数据
         */
        getGoodsData(type, renderer) {
            ajax({
                type: "GET",
                url: "http://localhost:3000/api",
                success: (response) => {
                    if (response.code)
                        this[renderer](response.data);
                },
                error: (status) => {
                    console.log(status);
                },
                search: {
                    type: type
                }
            })
        }

        refreshPageContent() {
            this.getGoodsData("list_goods", "renderer_list_goods");
        } 

        renderer_list_banner(response) {
            let data = ``;
            response.forEach(value => {
                data += `<li><a href=""><img src="./images/list/${value}" alt=""></a></li>`;
                const option = document.createElement("li");
                option.appendChild(document.createElement("span"));
                this.bannerNavMain.appendChild(option);
            })
            this.imageBoxMain.innerHTML = data;
            this.bannerNavMain.children[0].className = "bannerOn";
        }

        renderer_list_goods(response) {
            let data = ``;
            for (let i = this.pageIndex * 20; i < this.pageIndex * 20 + 20 && i < response.length; i++) {
                data += `<li class="item">`;
                response[i].tejia && (data += `<div class="tag_img"><img src="./images/list/zp_label_tejia_pc.png"></div>`)
                data += `<a href="./details.html" target="_blank">
                                <img src="./images/list/${response[i].img}">
                            </a>
                            <p class="item_desc" title="${response[i].desc}">${response[i].desc}</p>
                            <p class="item_info" title="${response[i].info}">${response[i].info}</p>
                            <p class="price">${response[i].price}</p>
                            <p class="praise">${response[i].praise}+人好评</p>
                            <button class="addCart">加入购物车</button>
                        </li>`;
            }
            this.goodsListBox.innerHTML = data;
            data = `<li class="prev">上一页</li>`;
            for (let i = 1; i <= Math.ceil(response.length / 20); i++) {
                data += `<li>${i}</li>`
            }
            this.pageBox.innerHTML = data + `<li class="next">下一页</li>
                                            <li class="all">共${Math.ceil(response.length / 20)}页</li>
                                            <li class="goto">
                                                到第
                                                <input type="text" class="gotoIndex">
                                                页
                                                <button  class="go">确定</button>
                                            </li>`;
            this.nav = Array.from(this.pageBox.children).slice(1, this.pageBox.children.length - 3);
            this.navGoInput = this.pageBox.lastChild.children[0];
            this.setDisable();
            this.addNavInputGoEvent();
            this.nav[this.pageIndex].className = "active";
        }

        prevPage() {
            this.nav[this.pageIndex].className = "";
            this.pageIndex--;
            this.refreshPageContent();
            this.toStart();
        }

        nextPage() {
            this.nav[this.pageIndex].className = "";
            this.pageIndex++;
            this.refreshPageContent();
            this.toStart();
        }

        pageGo() {
            if (this.navGoInput.value)
                this.changePage(this.navGoInput.value);
        }

        changePage(index) {
            this.nav[this.pageIndex].className = "";
            if (index > this.nav.length - 1) {
                this.pageIndex = this.nav.length - 1;
            } else if (index < 1) {
                this.pageIndex = 0;
            } else {
                this.pageIndex = index - 1;
            }
            this.refreshPageContent();
            this.toStart();
        }

        setDisable() {
            this.clearDisable();
            if (this.pageIndex === 0) {
                this.nav[0].previousElementSibling.className += " disable";
            } else if (this.pageIndex === this.nav.length - 1) {
                this.nav[this.nav.length - 1].nextElementSibling.className += " disable";
            } else {
                this.clearDisable();
            }
        }

        clearDisable() {
            this.pageBox.children[0].className = "prev";
            this.pageBox.children[this.pageBox.children.length - 3].className = "next";
        }

        toStart() {
            elementAnimation(document.documentElement, {
                scrollTop: 700
            })
        }

    }

    class PullOrDown {
        constructor() {
            this.box = document.querySelector(".tab_list");
            this.btn = document.querySelector(".upOrDown");
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

    class ListOptions {
        constructor() {
            this.tabOptions = document.querySelectorAll(".tab_option .options li");
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

    setTimeout(() => {
        new DocumentInit();
        setTimeout(() => {
            window.createBannerMain({
                imgList: document.querySelectorAll(".bannerImg li"),
                btns: document.querySelectorAll(".bannerNav li")
            });
            new PullOrDown();
            new ListOptions();
        }, 100);
    }, 80);
})();