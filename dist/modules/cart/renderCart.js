"use strict";define(function(){return function(n){var t=n.response,i=n.goods,n=n.goodsBox,s="";i.forEach(function(c,n){var o=t.find(function(n){return n.ID===c.goodID});s+='<dd class="goodItem clearfix" goodID="'.concat(o.ID,'">\n                        <div class="checkInfo clearfix">\n                            <div class="checkbox checked"></div>\n                        </div>\n                        <div class="nameInfo">\n                            <a href="').concat(i[n].link,'">\n                                <ul class="clearfix">\n                                    <li><img src="./images/list/').concat(o.img_main,'" alt=""></li>\n                                    <li>\n                                        <p title="').concat(o.good_title,'">').concat(o.good_title,'</p>\n                                    </li>\n                                </ul>\n                            </a>\n                        </div>\n                        <div class="priceInfo">\n                            <p>￥').concat(o.nowPrice,'</p>\n                        </div>\n                        <div class="numInfo">\n                            <button class="jian">-</button>\n                            <input type="text" value="').concat(c.num,'">\n                            <button class="plus">+</button>\n                        </div>\n                        <div class="countInfo">\n                            <p>￥<span class="count">').concat(c.num*Number(c.nowPrice),'</span></p>\n                        </div>\n                        <div class="doInfo">\n                            <button class="delBtn"></button>\n                        </div>\n                    </dd>')}),n.innerHTML=s}});