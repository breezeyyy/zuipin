define(() => {
    return function(goods, id) {
        // console.log(goods, id);
        goods.splice(goods.findIndex(val => val.goodID === id), 1);
        // console.log(goods);
        setCookie("goods", JSON.stringify(goods), {
            expires: 3
        });
    }
})