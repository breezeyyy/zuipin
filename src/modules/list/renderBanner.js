define(() => {
    return function ({
            response,
            bannerNavMain,
            imageBoxMain
        }) {
        let data = ``;
        response.forEach(value => {
            data += `<li><a href=""><img src="./images/list/${value}" alt=""></a></li>`;
            const option = document.createElement("li");
            option.appendChild(document.createElement("span"));
            bannerNavMain.appendChild(option);
        })
        imageBoxMain.innerHTML = data;
        bannerNavMain.children[0].className = "bannerOn";
        window.createBannerMain({
            imgList: document.querySelectorAll(".bannerImg li"),
            btns: document.querySelectorAll(".bannerNav li")
        });
    }
})