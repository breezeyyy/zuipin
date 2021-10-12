define(["gg"], (getGoodsData) => {
    return function(LIST) {
        let {
            url,
            pageIndex,
            nav,
            renderGoods,
            index
        } = LIST;
        nav[pageIndex].className = "";
        if (index > nav.length - 1) {
            pageIndex = nav.length - 1;
        } else if (index < 1) {
            pageIndex = 0;
        } else {
            pageIndex = index - 1;
        }
        LIST.pageIndex = pageIndex;

        getGoodsData(url, "goods_data", (response) => {
            // console.log(response);
            response.code && renderGoods({
                ...LIST,
                response: response.data
            })
        });

        elementAnimation(document.documentElement, {
            scrollTop: 700
        })
        nav[pageIndex].className = "active";
    }
})