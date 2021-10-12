define(() => {
    return function(CART) {
        let {
            cart,
            emptyCart
        } = CART;
        
        CART.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        cart.className = CART.goods.length ? "" : "hide";
        emptyCart.className = CART.goods.length ? "emptyCart hide" : "emptyCart";
    }
})