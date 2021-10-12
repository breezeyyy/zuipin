define(() => {
    return function (goodID, price) {
        const goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];

        const item = goods.find(val => val.goodID === goodID);

        if (goods.length && item) {
            item.num++;
        } else {
            goods.push({
                goodID: goodID,
                num: 1,
                price: price
            })
        }
        
        setCookie("goods", JSON.stringify(goods), {
            expires: 3
        });
    }
})