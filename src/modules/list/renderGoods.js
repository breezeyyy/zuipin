define(["sd", "pon", "cp"], (setDisable, prevOrNextPage, changePage) => {
    return function(LIST) {
        let {
            response,
            pageIndex,
            goodsListBox,
            pageBox,
            nav,
            navGoInput
        } = LIST;
        let data = ``;
        for (let i = pageIndex * 20; i < pageIndex * 20 + 20 && i < response.length; i++) {
            data += `<li class="item" goodID="${response[i].ID}">`;
            response[i].tejia && (data += `<div class="tag_img"><img src="./images/list/zp_label_tejia_pc.png"></div>`)
            data += `<a href="./details.html?goodID=${response[i].ID}&type=goods_data&good=true" target="_blank">
                                <img src="./images/list/${response[i].img_main}">
                            </a>
                            <p class="item_desc" title="${response[i].good_title}">${response[i].good_title}</p>
                            <p class="item_info" title="${response[i].info}">${response[i].info}</p>
                            <p class="price">￥${response[i].nowPrice}</p>
                            <p class="praise">${response[i].praise}+人好评</p>
                            <button class="addCart">加入购物车</button>
                        </li>`;
        }
        goodsListBox.innerHTML = data;
        data = `<li class="prev">上一页</li>`;
        for (let i = 1; i <= Math.ceil(response.length / 20); i++) {
            data += `<li>${i}</li>`
        }
        pageBox.innerHTML = data + `<li class="next">下一页</li>
                                            <li class="all">共${Math.ceil(response.length / 20)}页</li>
                                            <li class="goto">
                                                到第
                                                <input type="text" class="gotoIndex">
                                                页
                                                <button  class="go">确定</button>
                                            </li>`;
        nav = Array.from(pageBox.children).slice(1, pageBox.children.length - 3);
        navGoInput = pageBox.lastChild.children[0];

        LIST.nav = nav;
        
        setDisable(LIST);

        navGoInput.oninput = function () {
            this.value = this.value.replace(/[^\d]/g, "");
        }
        
        nav[pageIndex].className = "active";

        pageBox.onclick = function (event) {
            const target = getTarget(event);
            if (target.className === "prev") {
                prevOrNextPage({
                    ...LIST,
                    flag: "prev"
                });
            } else if (target.className === "next") {
                prevOrNextPage({
                    ...LIST,
                    flag: "next"
                });
            } else if (target.className === "go") {
                if (navGoInput.value)
                    changePage({
                        ...LIST,
                        index: navGoInput.value
                    });
            } else if (!target.className) {
                changePage({
                    ...LIST,
                    index: parseInt(target.innerHTML)
                });
            }
        }
    }
})