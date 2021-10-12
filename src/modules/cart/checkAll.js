define(() => {
    return function(CART) {
        let {
            goodsBox,
            headCheckBox
        } = CART;
        Array.from(goodsBox.children).forEach(element => {
            element.children[0].children[0].className = headCheckBox.className.includes("checked") ? "checkbox" : "checkbox checked";
        })
    }
})