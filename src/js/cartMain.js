require.config({
    baseUrl: "./modules/cart",
    paths: {
        gg: "../tools/getGoodsData",
        sl: "../tools/setLocalData",
        rc: "renderCart"
    }
})

require(["gg", "sl", "rc"], function (getGoodsData, setLocalData, renderCart) {

    setTimeout(() => {
        const CART = {};
        CART.url = "http://localhost:3000/api";
        CART.headerBottom = document.querySelector(".header-bottom");
        CART.cart = document.querySelector("#cart");
        CART.emptyCart = document.querySelector(".emptyCart");
        CART.goodsBox = document.querySelector(".goodsBox");
        CART.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];

        CART.headerBottom.className += " hide";

        getGoodsData(CART.url, "goods_data", (response) => {
            // console.log(response);
            response.code && renderCart({
                ...CART,
                response: response.data
            });
            
        })


        // console.log(CART.goods);
    }, 100);
})