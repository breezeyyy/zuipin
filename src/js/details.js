;
(function () {
    class DocumentInit {
        constructor() {
            this.goodList = document.querySelector(".good-list");
            this.pageList = document.querySelector(".nowPage");
            this.navImg = document.querySelector(".nav");
            this.goodDesc = document.querySelector(".goodDesc");
            this.goodItem = document.querySelector(".goodItem");
            this.switchTab = document.querySelector(".switchTab");
            this.xqBox = document.querySelector(".xqms dt ul");
            this.xqImgBox = document.querySelector(".xqms dd p");

            this.xq = {
                gg: "规格",
                cd: "产地",
                scnf: "生产年份",
                ccff: "储藏方法",
                bzq: "保质期",
                dj: "等级",
                bzgg: "包装规格"
            }


            this.init();
        }

        init() {
            this.goodList.className += " list_html";
            this.urlData = this.urlParse();
            this.getDBData(this.urlData)
        }

        urlParse() {
            return location.href.split("?")[1].split("&").reduce((result, value) => ({...result, [value.split("=")[0]]: value.split("=")[1]}), {});
        }

        getDBData(search) {
            ajax({
                type: "GET",
                url: "http://localhost:3000/api",
                success: (response) => {
                    if (response.code)
                        this.renderer_details(response.data);
                },
                error: (status) => {
                    console.log(status);
                },
                search: search
            })
        }

        renderer_details(value) {
            document.title = value.good_title;
            let data = `<li><a href="./index.html">首页</a></li>`;
            value.tags.forEach(val => {
                data += `<li>/</li>
                        <li><a href="javascript:;">${val}</a></li>`;
            })
            this.pageList.innerHTML = data + `<li>/</li>
                                                <li><a href="javascript:;">${value.good_title}</a></li>`;
            data = ``;
            value.img_list.forEach((val, index) => {
                data += `<li`;
                data += index ? `>` : ` class="on">`;
                data += `<img src="./images/details/${val}" alt=""></li>`;
            })
            this.navImg.innerHTML = data;
            this.goodDesc.innerHTML = `<h1 class="title">${value.good_title}</h1>
                                        <p class="info">${value.info || ""}</p>
                                        <div class="line"></div>
                                        <div class="goodDescList">
                                            <div class="scj">市场价<span>￥<em>${value.oldPrice}.00</em></span></div>
                                            <div class="zpj">醉品价<span>￥<em>${value.nowPrice}.00</em></span></div>
                                            <div class="cx">促销
                                                <div class="cxTag">
                                                    <div class="tagInfo">包邮</div>
                                                    <div class="tagDesc">全场在线支付满59元免运费</div>
                                                </div>
                                                <div class="cxTag">
                                                    <div class="tagInfo">直降</div>
                                                    <div class="tagDesc">已优惠<i class="youhui">${value.youhui}</i>元</div>
                                                </div>
                                            </div>
                                            <div class="line"></div>
                                            <ul class="pp clearfix">
                                                <li><span class="ppK">品牌</span><span class="ppV">${value.pinpai}</span></li>
                                                <li><span class="ppK">净含量</span><span class="ppV">${value.jhl}</span></li>
                                                <li><span class="ppK">商品编号</span><span class="ppV">${value.ID}</span></li>
                                            </ul>
                                            <div class="line"></div>
                                            <div class="sl">数量
                                                <button class="jian">-</button>
                                                <input type="text" value="1">
                                                <button class="plus">+</button>
                                            </div>
                                            <button class="addCart">加入购物车</button>
                                            <div class="line"></div>
                                            <ul class="fw clearfix">
                                                <li>服务</li>
                                                <li>90天商品保价</li>
                                                <li>30天无理由退货</li>
                                                <li>10分钟极速退款</li>
                                            </ul>
                                        </div>`
            this.goodItem.innerHTML = `<img src="./images/details/${value.img_list[0]}" alt="">
                <div class="itemInfo">
                    <div class="itemDesc">${value.good_title}</div>
                    <div class="itemPrice">￥${value.nowPrice}</div>
                </div>`
            this.switchTab.innerHTML = `<li>详情描述</li>
                                        <li>评论晒单(<span class="plNum"> ${value.praise} </span>)</li>`;
            data = ``;
            for (let key in value.xqms.xqms_tags) {
                data += `<li title="${this.xq[key]}：${value.xqms.xqms_tags[key]}">
                            <span class="xqK">${this.xq[key]}：</span>
                            <span class="xqV">${value.xqms.xqms_tags[key]}</span>
                        </li>`
            }
            this.xqBox.innerHTML = data;
            data = ``;
            value.xqms.xqms_imgs.forEach(val => {
                data += `<img src="./images/details/${val}">`
            })
            this.xqImgBox.innerHTML = data;
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
            this.sBoxImg.src = this.aLi[0].firstChild.src;
            this.bBoxImg.src = this.aLi[0].firstChild.src;



            this.NavAddEvnet();
        }

        NavAddEvnet() {
            const that = this;

            this.aLi.forEach((element, index) => {
                addEvent(element, "click", function () {
                    that.clearNavStyle(index);
                    that.addNavStyle();
                    that.replaceImg();
                })
            })

            this.btns.forEach((element, index) => {
                addEvent(element, "click", function () {

                    index ? that.nextImg() : that.prevImg();
                    that.addNavStyle();
                    that.replaceImg();
                })
            })

            // addEvent(document, "scroll", function (event) {
            //     console.log(event.target);
            // })

            addEvent(document, "selectstart", function (event) {
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
            !this.susp.className.includes("fixed") && (this.susp.className += " fixed");
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
        setTimeout(() => {
            new FixedTab();
            new Navimage();
            new Magnifying();
        }, 100);
    }, 50);
})();