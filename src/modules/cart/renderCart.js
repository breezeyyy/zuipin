define(() => {
    return function(CART) {
        let {
            response,
            goods,
            cart,
            emptyCart,
            goodsBox
        } = CART;

        // console.log(goods, response);
        let data = ``;
        goods.forEach(element => {
            const value = response.find(val => val.ID === element.goodID)
            // console.log(value);
            data += `<dd class="goodItem clearfix" goodID="${value.ID}">
                        <div class="checkInfo clearfix">
                            <div class="checkbox checked"></div>
                        </div>
                        <div class="nameInfo">
                            <ul class="clearfix">
                                <li><img src="./images/list/${value.img}" alt=""></li>
                                <li>
                                    <p title="${value.desc}">${value.desc}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="priceInfo">
                            <p>${value.price}</p>
                        </div>
                        <div class="numInfo">
                            <button class="jian">-</button>
                            <input type="text" value="${element.num}">
                            <button class="plus">+</button>
                        </div>
                        <div class="countInfo">
                            <p>￥<span class="count">${element.num * Number(element.price)}</span></p>
                        </div>
                        <div class="doInfo">
                            <button class="delBtn"></button>
                        </div>
                    </dd>`;
            goodsBox.innerHTML = data;
        });

    }
})