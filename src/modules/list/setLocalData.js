define(() => {
    return function (goodID, price, num = 1) {
        const goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];

        const item = goods.find(val => val.goodID === goodID);

        if (goods.length && item) {
            item.num++;
        } else {
            goods.push({
                goodID: goodID,
                num: num,
                price: price
            })
        }
        
        setCookie("goods", JSON.stringify(goods), {
            expires: 3
        });
    }
})