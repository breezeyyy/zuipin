define(() => {
    return function(CART) {
        let {
            goods,
            goodsBox,
            headCheckBox,
            footCheckBox,
            selectNum
        } = CART;

        let all = goods.reduce((prev, val) => prev + val.num, 0);

        let count = 0;
        Array.from(goodsBox.children).forEach((element, index) => {
            element.children[0].children[0].className.includes("checked") && (count += goods[index].num);
        })
        // console.log(all, count);
        headCheckBox.className = all === count ? "checkbox checked" : "checkbox";
        footCheckBox.className = all === count ? "checkbox checked" : "checkbox";
        selectNum.innerHTML = count;
    }
})