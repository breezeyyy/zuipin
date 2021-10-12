;
(function () {
    "use strict";

    class DocumentInit {
        constructor() {
            this.imageBoxMain = document.querySelector(".bannerImg");
            this.bannerNavMain = document.querySelector(".bannerNav");
            this.imageBoxTejia = document.querySelector(".tejia .specialbanner");
            this.imageBoxMiaosha = document.querySelector(".miaosha .specialbanner");
            this.specialTimer = document.querySelectorAll(".timer");
            this.drinkBox = document.querySelector("#self .drink_content");
            this.giftBox = document.querySelector("#gift .drink_content");
            this.teaBox = document.querySelector("#tea .drink_content");
            this.hotBox = document.querySelector(".hot .hot_content>ul");
            this.newsBox = document.querySelector(".news_content");

            this.getDBData("index_data");
        }

        init(response) {
            for(let key in response) {
                this[`renderer_${key}`](response[key]);
            }
            this.aClickEvent()
        }

        aClickEvent() {
            const that = this;

            this.links = document.querySelectorAll(".link");
            this.links.forEach(element => {
                addEvent(element, "click", function() {
                    setCookie("details_data");
                    setCookie("details_data", JSON.stringify({
                        goodID: this.getAttribute("goodID"),
                        dataDB: "index_data",
                        dataKey: "banner_main"
                    }))
                    location.href = "./details.html";
                    // setCookie("a", "1");
                    // setCookie("a");
                    // console.log(getCookie("details_data"));
                })
            })
        }

        /**
         * 获取数据库数据
         */
        getDBData(type) {
            ajax({
                type: "GET",
                url: "http://localhost:3000/api",
                success: (response) => {
                    if (response.code)
                        this.init(response.data);
                },
                error: (status) => {
                    console.log(status);
                },
                search: {
                    type: type
                }
            })
        }

        /**
         * 根据获取的数据将图片添加到页面中并初始化
         * @param {array} response 获取的图片数据
         */
        renderer_banner_main(response) {
            let data = ``;
            response.data.forEach(value => {
                data += `<li><img `;
                value.goods && (data += `class="link" goodID="${value.ID}"`);
                data += ` src="./images/index/${value.img_main}" alt=""></li>`;
                const option = document.createElement("li");
                option.appendChild(document.createElement("span"));
                this.bannerNavMain.appendChild(option);
            })
            this.imageBoxMain.innerHTML = data;
            this.bannerNavMain.children[0].className = "bannerOn";
        }

        renderer_banner_tejia(response) {
            this.specialTimer[0].setAttribute("endtime", response.endtime);
            let data = ``;
            response.items.forEach(value => {
                data += `<li>
                            <a href="">
                                <div class="item_img"><img src="./images/index/${value.img}" alt="">
                                </div>
                                <div class="item_desc">
                                    <p class="item_title" title="${value.desc}">${value.desc}</p>
                                    <p class="item_info" title="${value.info}">${value.info}</p>
                                    <p class="item_price"><img src="./images/index/zp_label_xsj.png" alt=""><span
                                            class="now_price">${value.newPrice}</span><span class="old_price">${value.oldPrice}</span></p>
                                </div>
                                <div class="tagimg">
                                    <img src="./images/index/time-limit.png" alt="">
                                </div>
                            </a>
                        </li>`;
            })
            this.imageBoxTejia.innerHTML = data;
        }

        renderer_banner_miaosha(response) {
            this.specialTimer[1].setAttribute("endtime", response.endtime);
            let data = ``;
            response.items.forEach(value => {
                data += `<li>
                            <a href="">
                                <div class="item_img"><img src="./images/index/${value.img}" alt="">
                                </div>
                                <div class="item_desc">
                                    <p class="item_title" title="${value.desc}">${value.desc}</p>
                                    <p class="item_info" title="${value.info}">${value.info}</p>
                                    <div class="meter">
                                        <div class="meterBar">
                                            <span class = "nowMeter"
                                            style = "width: ${parseInt(value.remainNum / value.allNum * 100)}%" >
                                            </span>
                                        </div>
                                        <span class="remainNum">还剩 ${value.remainNum} 件</span>
                                    </div>
                                    <p class="item_price"><img src="./images/index/zp_label_msj.png" alt=""><span
                                            class="now_price"><em class="now-price-icon">￥</em>${value.newPrice}</span><span
                                            class="old_price">${value.oldPrice}</span></p>
                                </div>
                                <div class="tagimg">
                                    <img src="./images/index/zp_label_xlm.png" alt="">
                                </div>
                            </a>
                        </li>`;
            })
            this.imageBoxMiaosha.innerHTML = data;
        }

        renderer_drink_data(response) {
            const newFlag = [];
            let data = `<div class="drink_left">
                            <a href="" class="tag_card card_hover"><img src="./images/index/${response.left}" alt=""></a>
                            <a href="" class="more_card card_hover">
                                <h2>自饮助手</h2>
                                <p class="more_text">自己喝的茶</p>
                                <p class="more_text">包装不用太复杂</p>
                                <img src="./images/index/more.png" alt="">
                            </a>
                        </div>
                        <div class="drink_center">`;
            response.center.forEach((value, index) => {
                data += `<a href="" target="_blank" class="card_hover">`
                newFlag.includes(index + 1) && (data += `<div class="tag_img">
                                                        <img src="./images/index/2021-03-22_1616395321.png">
                                                    </div>`)
                data += `<div class="item_img"><img src="./images/index/${value.img}"></div>
                            <p class="item_img_desc" title="${value.desc}">${value.desc}</p>
                            <p class="item_img_info" title="${value.info}">${value.info}</p>
                            <p class="item_price">${value.price}</p>
                        </a>`;
            })
            data += `</div>
                    <div class="drink_right">
                        <div class="news_list">
                            <span class="news_head">自饮锦囊</span>
                            <div class="news_content">`;
            response.right.forEach(value => {
                data += `<a href="" target="_blank" class="news_item">
                                <p class="news_title" title="${value.title}">${value.title}</p>
                                <div class="news_artical clearfix">
                                    <img src="./images/index/${value.img}">
                                    <p title="${value.desc}">${value.desc}</p>
                                </div>
                            </a>`
            })
            this.drinkBox.innerHTML = data += `</div>
                                            </div>
                                            <a href="" class="more_card card_hover">
                                                <h2>浏览更多</h2>
                                                <p class="more_text">想要喝茶，不知如何选</p>
                                                <p class="more_text">这里有一只锦囊！</p>
                                                <img src="./images/index/more.png" alt="">
                                            </a>
                                        </div>`;
        }

        renderer_gift_data(response) {
            let data = `<div class="drink_left">
                    <a href="" class="tag_card card_hover"><img src="./images/index/${response.left}" alt=""></a>
                    <a href="" class="more_card card_hover">
                        <h2>送礼助手</h2>
                        <p class="more_text">为您用心推荐每一份礼物</p>
                        <img src="./images/index/more.png" alt="">
                    </a>
                </div>
                <div class="drink_center">`;
            response.center.forEach(value => {
                data += `<a href="" target="_blank" class="card_hover">`;
                value.new && (data += `<div class="tag_img">
                                                        <img src="./images/index/2021-03-22_1616395321.png">
                                                    </div>`)
                data += `<div class="item_img"><img src="./images/index/${value.img}"></div>
                            <p class="item_img_desc" title="${value.desc}">${value.desc}</p>
                            <p class="item_img_info" title="${value.info}">${value.info}</p>
                            <p class="item_price">${value.price}</p>
                        </a>`;
            })
            data += `</div>
                    <div class="drink_right">
                        <div class="news_list">
                            <span class="news_head">自饮锦囊</span>
                            <div class="news_content">`;
            response.right.forEach(value => {
                data += `<a href="" target="_blank" class="news_item">
                                <p class="news_title" title="${value.title}">${value.title}</p>
                                <div class="news_artical clearfix">
                                    <img src="./images/index/${value.img}">
                                    <p title="${value.desc}">${value.desc}</p>
                                </div>
                            </a>`
            })
            this.giftBox.innerHTML = data += `</div>
                                            </div>
                                            <a href="" class="more_card card_hover">
                                                <h2>浏览更多</h2>
                                                <p class="more_text">想要喝茶，不知如何选</p>
                                                <p class="more_text">这里有一只锦囊！</p>
                                                <img src="./images/index/more.png" alt="">
                                            </a>
                                        </div>`;
        }

        renderer_tea_data(response) {
            let data = `<div class="drink_left">`;
            response.left.forEach(value => {
                data += `<a href="" class="tag_card card_hover"><img src="./images/index/${value}" alt=""></a>`
            })
            data += `</div>
                    <div class="drink_center">`;
            response.center.forEach((value, index) => {
                data += `<a href="" target="_blank" class="card_hover">`;
                value.new && (data += `<div class="tag_img">
                                                        <img src="./images/index/2021-03-22_1616395321.png">
                                                    </div>`)
                data += `<div class="item_img"><img src="./images/index/${value.img}"></div>
                            <p class="item_img_desc" title="${value.desc}">${value.desc}</p>
                            <p class="item_img_info" title="${value.info}">${value.info}</p>
                            <p class="item_price">${value.price}</p>
                        </a>`;
            })
            this.teaBox.innerHTML = data += `<div class="add_item">
                                                <a href="" target="_blank" class="samll_box card_hover">
                                                    <p class="samll_box_text" title="${response.right.desc}">${response.right.desc}</p>
                                                    <p class="samll_box_price">${response.right.price}</p>
                                                    <img src="./images/index/${response.right.img}">
                                                </a>
                                                <a href="" target="_blank" class="more_card card_hover">
                                                    <h2>浏览更多</h2>
                                                    <p class="more_text">茶道配件</p>
                                                    <img src="./images/index/more.png" alt="查看更多">
                                                </a>
                                            </div>
                                        </div>`;
        }

        renderer_banner_hot(response) {
            let data = ``;
            response.data.forEach(value => {
                data += `<li>
                            <a href="" target="_blank" class="hot_box">
                                <div class="hot_img">
                                    <img src="./images/index/${value.img}">
                                </div>
                                <p class="hot_text" title="${value.desc}">${value.desc}</p>
                                <p class="hot_people" title="来自${value.userName}的评价">来自${value.userName}的评价</p>
                                <p class="hot_descr clearfix">
                                    <span title="${value.info}">${value.info}</span>
                                    <span></span>
                                    <span>${value.price}</span>
                                </p>
                            </a>
                        </li>`
            })
            this.hotBox.innerHTML = data;
        }

        renderer_news_data(response) {
            let data = ``;
            response.data.forEach(value => {
                data += `<a class="card_hover">
                            <div class="news_img">
                                <img src="./images/index/${value.img}">
                            </div>
                            <p class="news_text" title="${value.desc}">${value.desc}</p>
                            <p class="news_desc" title="${value.info}">${value.info}</p>
                        </a>`
            })
            this.newsBox.innerHTML = data;
        }
    }

    class FloorNav {
        constructor() {
            this.nav = document.querySelector(".floor_nav");
            this.tejia = document.querySelector(".itemSpecial");
            this.drink = document.querySelector("#self");
            this.gift = document.querySelector("#gift");
            this.tea = document.querySelector("#tea");
            this.hot = document.querySelector(".hot");
            this.news = document.querySelector(".news");
            // this.topValue = [700, 1200, 2000, 2700, 3500, 4000];
            this.topValue = [4000, 3500, 2700, 2000, 1200, 700];
            this.topTo = [...this.topValue].reverse();

            // this.boxList = [this.tejia, this.drink, this.gift, this.tea, this.hot, this.news]
            // this.topValue = this.boxList.reduce((result, element) => [...result, element.offsetTop], [])
            // console.log(this.topValue);
            // 683
            // 790
            // 878
            // 966
            // 1054
            // 1556

            // 700
            // 1200
            // 2000
            // 2700
            // 3500
            // 4000
            // console.log(this.topValue);
            this.judgeStatus();
            this.navScrollEvent();
        }

        navClickEvent() {
            const that = this;
            this.li.forEach((element, index) => {
                element.onclick = function () {
                    that.removeScrollEvent();
                    that.clearClassName();
                    that.li[index].className = "on";
                    elementAnimation(document.documentElement, {
                        scrollTop: that.topTo[index]
                    }, that.navScrollEvent.bind(that))
                }
            })
        }

        navScrollEvent() {
            const that = this;

            document.onscroll = function () {
                that.judgeStatus();
            }
        }

        removeScrollEvent() {
            document.onscroll = null;
        }

        clearClassName() {
            this.li.forEach(element => {
                element.className = "";
            })
        }

        judgeStatus() {
            document.documentElement.scrollTop >= 700 ? this.show() : this.hide();
        }

        changeNav() {
            const index = Math.abs(this.topValue.findIndex(val => document.documentElement.scrollTop >= val) - this.li.length + 1) % this.li.length;
            this.li[index].className = "on";
        }

        show() {
            this.nav.style.display = "block";
            this.setDelay(() => {
                this.nav.style.opacity = "1";
            }, 20);
            this.li = document.querySelectorAll(".floor_nav li");
            this.navClickEvent();
            this.clearClassName();
            this.changeNav();
        }

        hide() {
            this.nav.style.opacity = "0";
            this.setDelay(() => {
                this.nav.style.display = "none";
            }, 400);
        }

        setDelay(func, timoDelay) {
            clearTimeout(this.timeOutIndex);
            this.timeOutIndex = setTimeout(func, timoDelay);
        }
    }

    new DocumentInit();
    setTimeout(() => {
        new FloorNav();
        window.createTimeDown();
        window.createSuspension(document.querySelector(".suspension"), 500);
        window.createBannerMain({
            imgList: document.querySelectorAll(".bannerImg li"),
            btns: document.querySelectorAll(".bannerNav li")
        });
        window.createBannerMultiEle({
            imgBox: document.querySelector(".tejia .specialbanner"),
            btns: document.querySelectorAll(".tejia .specialBtns div"),
            together: 2
        });
        window.createBannerMultiEle({
            imgBox: document.querySelector(".miaosha .specialbanner"),
            btns: document.querySelectorAll(".miaosha .specialBtns div"),
            together: 2
        });
        window.createBannerMultiEle({
            imgBox: document.querySelector(".hot_content ul"),
            btns: document.querySelectorAll(".hot_btns div"),
            together: 4
        });
    }, 300);
})();