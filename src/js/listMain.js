require.config({
    baseUrl: "./",
    paths: {
        jq: "./libs/jquery",
        gg: "./modules/list/getGoodsData",
        lrb: "./modules/list/renderBanner",
        lpod: "./modules/list/listPullOrDown"
    }
})

require(["jq", "gg", "rlb", "lpod"], function (_, getGoodsData, renderListBanner, listPullOrDown) {
    $(".myHeader").load("http://localhost:3000/public/common.html .headerBox");
    $(".myOffsideNav").load("http://localhost:3000/public/common.html .fixNavBox");
    $(".myFooter").load("http://localhost:3000/public/common.html .footerBox");

    setTimeout(() => {
        const url = "http://localhost:3000/api";
        const goodList = document.querySelector(".good-list");
        const imageBoxMain = document.querySelector(".bannerImg");
        const bannerNavMain = document.querySelector(".bannerNav");
        const goodsListBox = document.querySelector(".good_list_box");
        const pageBox = document.querySelector(".pageBox");
        let pageIndex = 0;

        goodList.className += " list_html";

        getGoodsData(url, "list_banner", (response) => {
            // console.log(response);
            response.code && renderListBanner({
                response: response.data,
                bannerNavMain: bannerNavMain,
                imageBoxMain: imageBoxMain
            })
        })

        listPullOrDown(document.querySelector(".tab_list"), document.querySelector(".upOrDown"))

        

        // getGoodsData(url, "list_goods", (response) => {
        // if (response.code)
        //     this[renderer](response.data);
        // })
    }, 50);


})