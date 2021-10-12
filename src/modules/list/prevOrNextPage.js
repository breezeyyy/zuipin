define(["gg"], (getGoodsData) => {
    return function(LIST) {
        let {
            url,
            pageIndex,
            nav,
            flag,
            renderGoods
        } = LIST;
        nav[pageIndex].className = "";
        flag === "prev" ? LIST.pageIndex-- : LIST.pageIndex++;
        pageIndex = LIST.pageIndex;

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