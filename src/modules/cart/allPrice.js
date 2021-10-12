define(() => {
    return function(CART) {
        let {
            goods,
            allPrice,
            goodsBox,
            yunfei,
            priceTip
        } = CART;

        let all = 0;
        Array.from(goodsBox.children).forEach((element, index) => {
            element.children[4].children[0].children[0].innerHTML = goods[index].num * goods[index].price;
            element.children[0].children[0].className.includes("checked") && (all += goods[index].num * goods[index].price);
        })

        // console.log(all);
        allPrice.innerHTML = all < 59 && all != 0 ? all + 10 : all;
        yunfei.innerHTML = all < 59 && all != 0 ? "含运费" : "不含运费";
        priceTip.innerHTML = all < 59 ? "未满足满59包邮" : "已满足满59包邮";
    }
})