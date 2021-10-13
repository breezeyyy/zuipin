require.config({
    baseUrl: "./modules/cart",
    paths: {
        gg: "../tools/getGoodsData",
        rc: "renderCart",
        an: "allNum",
        ap: "allPrice",
        rsl: "resetLocalData",
        init: "init",
        ca: "checkAll",
        ds: "delSelect",
        upd: "updataCart"
    }
})

require(["gg", "rc", "rsl", "init", "ca", "ds", "upd"], function (getGoodsData, renderCart, resetLocalData, init, checkAll, delSelect, updataCart) {

    document.querySelector(".header-bottom").className += " hide";

    setTimeout(() => {
        const CART = {};
        CART.url = "http://localhost:3000/api";
        CART.cart = document.querySelector("#cart");
        CART.emptyCart = document.querySelector(".emptyCart");
        CART.goodsBox = document.querySelector(".goodsBox");
        CART.selectNum = document.querySelector(".selectNum");
        CART.allPrice = document.querySelector(".allPrice");
        CART.headCheckBox = document.querySelector("dt .checkbox");
        CART.footCheckBox = document.querySelector(".cartSum .checkbox")
        CART.yunfei = document.querySelector(".yunfei");
        CART.priceTip = document.querySelector(".priceTip");
        CART.delSelect = document.querySelector(".delSelect");
        CART.cartSum = document.querySelector(".cartSum");
        CART.cartNum = document.querySelector(".cartNum");
        CART.goods = [];

        init(CART);
        // console.log(CART.goods);


        if (CART.goods.length) {
            getGoodsData(CART.url, "goods_data", (response) => {
                // console.log(response);
                response.code && renderCart({
                    ...CART,
                    response: response.data
                });
                updataCart(CART);

                const numInput = document.querySelectorAll(".numInfo input");
                numInput.forEach(element => {
                    addEvent(element, "input", function() {
                        element.value = element.value.replace(/[^\d]/g, "");
                        CART.goods.find(val => val.goodID === element.parentElement.parentElement.getAttribute("goodID")).num = Number(element.value);
                        setCookie("goods", JSON.stringify(CART.goods), {
                            expires: 3
                        });
                        updataCart(CART);
                    })

                    addEvent(element, "blur", function () {
                        Number(element.value) || (element.value = 1);
                        CART.goods.find(val => val.goodID === element.parentElement.parentElement.getAttribute("goodID")).num = Number(element.value);
                        setCookie("goods", JSON.stringify(CART.goods), {
                            expires: 3
                        });
                        updataCart(CART);
                    })
                })
            })
        }

        addEvent(CART.goodsBox, "click", function (event) {
            const target = getTarget(event);
            const goodItem = target.parentElement.parentElement;
            if (target.className === "delBtn") {
                const id = goodItem.getAttribute("goodID");
                goodItem.remove();
                resetLocalData(CART.goods, id);
                init(CART);
                CART.goods.length ? updataCart(CART) : (CART.cartNum.innerHTML = 0);
            } else if (target.className.includes("checkInfo")) {
                target.children[0].className = target.children[0].className.includes("checked") ? "checkbox" : "checkbox checked";
                updataCart(CART);
            } else if (target.className.includes("checkbox")) {
                target.className = target.className.includes("checked") ? "checkbox" : "checkbox checked";
                updataCart(CART);
            } else if (target.className === "jian") {
                const num = target.nextElementSibling;
                num.value = num.value - 1 < 1 ? 1 : num.value - 1;
                CART.goods.find(val => val.goodID === goodItem.getAttribute("goodID")).num = Number(num.value);
                setCookie("goods", JSON.stringify(CART.goods), {
                    expires: 3
                });
                updataCart(CART);
            } else if (target.className === "plus") {
                const num = target.previousElementSibling;
                num.value++;
                CART.goods.find(val => val.goodID === goodItem.getAttribute("goodID")).num = Number(num.value);
                setCookie("goods", JSON.stringify(CART.goods), {
                    expires: 3
                });
                updataCart(CART);
            }
        })

        addEvent(CART.cart, "click", function (event) {
            const target = getTarget(event);
            if (target.className.includes("checkInfo")) {
                if (target.children[1]) {
                    checkAll(CART);
                    updataCart(CART);
                }
            } else if (target.className.includes("checkbox")) {
                if (target.nextElementSibling) {
                    checkAll(CART);
                    updataCart(CART);
                }
            } else if (target.className.includes("checklabel")) {
                checkAll(CART);
                updataCart(CART);
            }
        })

        addEvent(CART.delSelect, "click", function () {
            delSelect(CART);
            init(CART);
            // console.log(CART.goods);
            CART.goods.length ? updataCart(CART) : (CART.cartNum.innerHTML = 0);
        })

    }, 30);
})