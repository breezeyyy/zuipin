require.config({
    baseUrl: "./modules/list",
    paths: {
        gg: "../tools/getGoodsData",
        lrb: "renderBanner",
        lrg: "renderGoods",
        lpod: "listPullOrDown",
        sd: "setDisable",
        cd: "clearDisable",
        pon: "prevOrNextPage",
        cp: "changePage",
        sl: "setLocalData",
        los: "listOptions"
    }
})

require(["gg", "lrb", "lrg", "lpod", "sl", "los"], function (getGoodsData, renderListBanner, renderGoods, listPullOrDown, setLocalData, listOptions) {

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
        LIST.tabOptions = document.querySelectorAll(".tab_option .options li");

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
        listOptions(LIST);

        addEvent(LIST.pageBox, "selectstart", function (event) {
            stopDefault(event);
        })

        addEvent(LIST.goodsListBox, "click", function(event) {
            const target = getTarget(event);
            if (target.className === "addCart") {
                const goodID = target.parentElement.getAttribute("goodID");
                const price = target.parentElement.children[3].innerHTML.slice(1);
                const addCartTip = document.querySelector(".addCartTip");
                addCartTip.style.display = "block";
                setTimeout(() => {
                    addCartTip.style.display = "none";
                }, 1000);
                setLocalData(goodID, price);
            }
        })


    }, 100);


})