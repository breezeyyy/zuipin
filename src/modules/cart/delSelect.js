define(["rsl"], (resetLocalData) => {
    return function(CART) {
        let {
            goods,
            goodsBox
        } = CART;

        Array.from(goodsBox.children).forEach(element => {
            if (element.children[0].children[0].className.includes("checked")) {
                const id = element.getAttribute("goodID");
                element.remove();
                resetLocalData(goods, id);
            }
        })
    }
})