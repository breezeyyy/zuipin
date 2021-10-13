define(() => {
    return function ({
        goodID,
        price,
        num = 1,
        from,
        link
    }) {
        const goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];

        const item = goods.find(val => val.goodID === goodID);
        // console.log(item);
        if (goods.length && item) {
            item.num += num;
        } else {
            goods.push({
                goodID: goodID,
                num: num,
                price: price,
                from: from,
                link: link
            })
        }
        // console.log(goods);
        setCookie("goods", JSON.stringify(goods), {
            expires: 3
        });
    }
})