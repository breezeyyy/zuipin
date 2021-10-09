;
(function () {
    "use strict";

    class Suspension {
        constructor() {
            this.susp = document.querySelector(".suspension");

            this.suspAddEvent();
        }

        suspAddEvent() {
            const that = this;

            addEvent(document, "scroll", function () {
                document.documentElement.scrollTop >= 500 ? that.show() : that.hide();
            })
        }

        show() {
            this.susp.style.display = "block";
            this.setDelay(() => {
                this.susp.style.opacity = "1";
            }, 20);
        }

        hide() {
            this.susp.style.opacity = "0";
            this.setDelay(() => {
                this.susp.style.display = "none";
            }, 400);
        }

        setDelay(func, timoDelay) {
            clearTimeout(this.timeOutIndex);
            this.timeOutIndex = setTimeout(func, timoDelay);
        }
    }

    class DocumentInit {
        constructor() {
            this.imageBoxMain = document.querySelector(".bannerImg");
            this.bannerNavMain = document.querySelector(".bannerNav");
            this.imageBoxTejia = document.querySelector(".tejia .specialbanner");
            this.imageBoxMiaosha = document.querySelector(".miaosha .specialbanner");
            this.drinkBox = document.querySelector("#self .drink_content");
            this.giftBox = document.querySelector("#gift .drink_content");
            this.teaBox = document.querySelector("#tea .drink_content");
            this.hotBox = document.querySelector(".hot .hot_content>ul");
            this.newsBox = document.querySelector(".news_content");


            this.init();
        }

        init() {
            this.getImageData("banner_main", "renderer_banner_main");
            this.getImageData("banner_tejia", "renderer_banner_tejia");
            this.getImageData("banner_miaosha", "renderer_banner_miaosha");
            this.getImageData("drink_data", "renderer_drink");
            this.getImageData("gift_data", "renderer_gift");
            this.getImageData("tea_data", "renderer_tea");
            this.getImageData("banner_hot", "renderer_banner_hot");
            this.getImageData("news_data", "renderer_news");
        }

        /**
         * 获取数据库图片数据
         */
        getImageData(type, renderer) {
            ajax({
                type: "GET",
                url: "http://localhost:3000/api",
                success: (response) => {
                    if (response.data !== [])
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

        /**
         * 根据获取的数据将图片添加到页面中并初始化
         * @param {array} response 获取的图片数据
         */
        renderer_banner_main(response) {
            let data = ``;
            response.forEach(value => {
                data += `<li><a href=""><img src="./images/index/${value}" alt=""></a></li>`;
                const option = document.createElement("li");
                option.appendChild(document.createElement("span"));
                this.bannerNavMain.appendChild(option);
            })
            this.imageBoxMain.innerHTML = data;
            this.bannerNavMain.children[0].className = "bannerOn";
        }

        renderer_banner_tejia(response) {
            let data = ``;
            response.forEach(value => {
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
            let data = ``;
            response.forEach(value => {
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

        renderer_drink(response) {
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

        renderer_gift(response) {
            const newFlag = [5];
            let data = `<div class="drink_left">
                    <a href="" class="tag_card card_hover"><img src="./images/index/${response.left}" alt=""></a>
                    <a href="" class="more_card card_hover">
                        <h2>送礼助手</h2>
                        <p class="more_text">为您用心推荐每一份礼物</p>
                        <img src="./images/index/more.png" alt="">
                    </a>
                </div>
                <div class="drink_center">`;
            response.center.forEach((value, index) => {
                data += `<a href="" target="_blank" class="card_hover">`;
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

        renderer_tea(response) {
            const newFlag = [];
            let data = `<div class="drink_left">`;
            response.left.forEach(value => {
                data += `<a href="" class="tag_card card_hover"><img src="./images/index/${value}" alt=""></a>`
            })
            data += `</div>
                    <div class="drink_center">`;
            response.center.forEach((value, index) => {
                data += `<a href="" target="_blank" class="card_hover">`;
                newFlag.includes(index + 1) && (data += `<div class="tag_img">
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
            response.forEach(value => {
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

        renderer_news(response) {
            let data = ``;
            response.forEach(value => {
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

    class Banner_main {
        constructor() {
            this.imgBox = document.querySelector(".bannerImg");
            this.imgList = document.querySelectorAll(".bannerImg li");
            this.btns = document.querySelectorAll(".bannerNav li");
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
            this.imgList[this.nowIndex].style.opacity = "1";
        }

        hide() {
            this.imgList[this.nowIndex].style.opacity = "0";
        }

        setDelay(func, timoDelay) {
            clearTimeout(this.timeOutIndex);
            this.timeOutIndex = setTimeout(func, timoDelay);
        }
    }

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
                that.prev();
            })

            addEvent(this.btns[1], "click", function () {
                that.next();
            })

            addEvent(this.btns[0].parentElement, "mouseenter", function () {
                clearInterval(that.intervalIndex);
            })

            addEvent(this.btns[1].parentElement, "mouseenter", function () {
                clearInterval(that.intervalIndex);
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

    class TimeDown {
        constructor() {
            this.end = document.querySelector(".timer");
            this.day = document.querySelectorAll(".days");
            this.hours = document.querySelectorAll(".hours");
            this.minute = document.querySelectorAll(".minute");
            this.seconds = document.querySelectorAll(".seconds");

            setInterval(() => {
                console.log(1);
                this.getInterval();
            }, 1000);
        }

        getInterval() {
            let interval = new Date(this.end.getAttribute("endtime")).getTime() - Date.now();
            interval /= 1000;
            for(let i = 0; i < this.day.length; i++) {
                this.day[i].innerHTML = `${parseInt(interval / 60 / 60 / 24)}天`;
                this.hours[i].innerHTML = parseInt(interval / 60 / 60 % 24);
                this.minute[i].innerHTML = parseInt(interval / 60 % 60);
                this.seconds[i].innerHTML = parseInt(interval % 60);
            }
        }
    }

    new TimeDown();
    new DocumentInit();
    setTimeout(() => {
        new Suspension()
        new FloorNav();
        new Banner_main();
        new Banner_multiEle({
            imgBox: document.querySelector(".tejia .specialbanner"),
            btns: document.querySelectorAll(".tejia .specialBtns div"),
            together: 2
        });
        new Banner_multiEle({
            imgBox: document.querySelector(".miaosha .specialbanner"),
            btns: document.querySelectorAll(".miaosha .specialBtns div"),
            together: 2
        });
        new Banner_multiEle({
            imgBox: document.querySelector(".hot_content ul"),
            btns: document.querySelectorAll(".hot_btns div"),
            together: 4
        });
    }, 200);
})();