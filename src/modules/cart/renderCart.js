define(() => {
    return function (CART) {
        let {
            response,
            goods,
            goodsBox
        } = CART;

        // console.log(goods, response);
        let data = ``;
        // console.log(goods);
        goods.forEach((element, index) => {
            const value = response.find(val => val.ID === element.goodID)
            // console.log(value);
            data += `<dd class="goodItem clearfix" goodID="${value.ID}">
                        <div class="checkInfo clearfix">
                            <div class="checkbox checked"></div>
                        </div>
                        <div class="nameInfo">
                            <a href="${goods[index].link}">
                                <ul class="clearfix">
                                    <li><img src="./images/list/${value.img_main}" alt=""></li>
                                    <li>
                                        <p title="${value.good_title}">${value.good_title}</p>
                                    </li>
                                </ul>
                            </a>
                        </div>
                        <div class="priceInfo">
                            <p>￥${value.nowPrice}</p>
                        </div>
                        <div class="numInfo">
                            <button class="jian">-</button>
                            <input type="text" value="${element.num}">
                            <button class="plus">+</button>
                        </div>
                        <div class="countInfo">
                            <p>￥<span class="count">${element.num * Number(element.nowPrice)}</span></p>
                        </div>
                        <div class="doInfo">
                            <button class="delBtn"></button>
                        </div>
                    </dd>`;

        });
        goodsBox.innerHTML = data;
    }
})