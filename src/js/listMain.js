require.config({
    baseUrl: "./modules/list",
    paths: {
        gg: "getGoodsData",
        lrb: "renderBanner",
        lrg: "renderGoods",
        lpod: "listPullOrDown",
        sd: "setDisable",
        cd: "clearDisable",
        pon: "prevOrNextPage",
        cp: "changePage"
    }
})

require(["gg", "lrb", "lrg", "lpod"], function (getGoodsData, renderListBanner, renderGoods, listPullOrDown) {

    setTimeout(() => {
        const LIST = {};
        LIST.url = "http://localhost:3000/api";
        LIST.goodList = document.querySelector(".good-list");
        LIST.imageBoxMain = document.querySelector(".bannerImg");
        LIST.bannerNavMain = document.querySelector(".bannerNav");
        LIST.goodsListBox = document.querySelector(".good_list_box");
        LIST.pageBox = document.querySelector(".pageBox");
        LIST.nav = null;
        LIST.navGoInput = null;
        LIST.pageIndex = 0;
        LIST.renderGoods = renderGoods;
        LIST.tabList = document.querySelector(".tab_list");
        LIST.upOrDown = document.querySelector(".upOrDown");

        LIST.goodList.className += " list_html";

        getGoodsData(LIST.url, "list_data", (response) => {
            response.code && renderListBanner({
                ...LIST,
                response: response.data
            })
        })

        getGoodsData(LIST.url, "goods_data", (response) => {
            // console.log(response);
            response.code && renderGoods({
                ...LIST,
                response: response.data
            })
        })

        listPullOrDown(LIST);


        addEvent(LIST.pageBox, "selectstart", function (event) {
            stopDefault(event);
        })


    }, 100);


})