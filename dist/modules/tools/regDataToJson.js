"use strict";

(function () {
  "use strict"; // 图片数据抓取

  var threeNavImg = document.querySelectorAll(".goods-list .item");
  console.log(threeNavImg); // console.log(threeNavImg[0].children[0].children[0]);
  // console.log(threeNavImg[0].src.match(/.+\/(.+)$/)[1]);
  // console.log(threeNavImg[0].children[0].children[0].src);

  var result = Array.from(threeNavImg).map(function (value) {
    // 图文对象
    return {
      img: value.children[0].children[0].src.split("?")[0].match(/.+\/(.+)$/)[1],
      desc: value.children[1].innerHTML,
      info: value.children[2].innerHTML
    }; // 纯图片
    // return value.src.match(/.+\/(.+)$/)[1];
    // console.log(value.src.match(/.+\/(.+)$/)[1]);
  }); // console.log(result);

  console.log(JSON.stringify(result)); // ajax({
  //     type: "GET",
  //     url: "http://localhost:3000/api",
  //     success: response => {
  //         console.log(response);
  //     },
  //     fail: status => {
  //         console.log(status);
  //     },
  //     search: {
  //         type: "writeJsonData",
  //         data: result
  //     }
  // });
})();