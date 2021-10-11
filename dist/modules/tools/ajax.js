"use strict";

/**
 * 使用ajax异步向服务器发出请求
 * @param {object} parameter ajax请求的属性
 * @param {string} [parameter.type] 请求方式 默认GET
 * @param {string} parameter.url 请求地址
 * @param {function} parameter.success 请求成功回调
 * @param {function} parameter.fail 请求失败回调
 * @param {object} [parameter.search] URL查询数据的对象 默认为空
 */
function ajax(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? "GET" : _ref$type,
      url = _ref.url,
      success = _ref.success,
      fail = _ref.fail,
      _ref$search = _ref.search,
      search = _ref$search === void 0 ? {} : _ref$search;
  // 拼接url的查询数据
  var query = '';

  for (var key in search) {
    query += "".concat(key, "=").concat(search[key], "&");
  } // 删除最后多出来的&


  query = query.replace(/&$/, '');
  url = type.toUpperCase() === 'GET' ? "".concat(url, "?").concat(query) : url;
  var xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
      success(xhr.response);
    } else {
      fail && fail(xhr.status);
    } // if (xhr.statusText === "OK") {
    //     success(xhr.response);
    // } else {
    //     fail && fail(xhr.statusText);
    // }

  }); // 将服务端响应格式设置为json

  xhr.responseType = "json";

  if (type.toUpperCase() === 'GET') {
    xhr.send();
  } else {
    // 将POST请求方式设置为普通表单
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // POST请求需在send方法中发送查询数据

    xhr.send(query);
  }
}