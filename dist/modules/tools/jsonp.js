"use strict";

/**
 * 使用jsonp进行跨域请求，仅为GET方式
 * @param {string} url 要跨域请求的地址
 * @param {function} success 请求成功后的回调函数
 * @param {object} search 要拼接的查询字段对象
 * @param {string} search.fieldName 必填项 内容为后端返回的函数字段名
 */
function jsonp(url, success, search) {
  var script = document.createElement("script");
  document.body.appendChild(script);
  url += '?';

  for (var key in search) {
    url += "".concat(key, "=").concat(search[key], "&");
  }

  script.src = url.replace(/&$/, '');

  window[search[search.fieldName]] = function (response) {
    success(response);
  };
}