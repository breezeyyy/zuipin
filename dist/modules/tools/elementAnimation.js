"use strict";

var noPx = ["scrollTop"];
/**
 * 为元素添加DOM动画，满足多元素、多属性、链式运动
 * @param {object} element 需要添加DOM动画的元素
 * @param {object} attributes 该元素需要进行变换的属性值，键值对方式保存在对象中
 * @param {function} callback 回调函数，当前动画执行结束后需要进行的功能
 */

function elementAnimation(element, attributes, callback) {
  // 清除已有计时器
  clearInterval(element.intervalIndex);
  element.intervalIndex = setInterval(function () {
    // 默认全部属性已完成
    var finishFlag = true;

    for (var attr in attributes) {
      // 获取当前值
      var nowElementAttribute = noPx.includes(attr) ? element[attr] : parseInt(getStyle(element, attr)); // 计算步长

      var speed = (attributes[attr] - nowElementAttribute) / 5; // 步长不满1px时的取整判断

      speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed); // 变换元素相应属性值
      // console.log(element[attr], speed);

      noPx.includes(attr) ? element[attr] += speed : element.style[attr] = nowElementAttribute + speed + 'px'; // 若不满足目标值则结束标记为false

      if (attributes[attr] !== nowElementAttribute + speed) finishFlag = false;
    } // 如果结束标记为真，清除当前计时器，并根据参数进行后续操作（链式运动）


    if (finishFlag) {
      clearInterval(element.intervalIndex);
      callback && callback();
    }
  }, 30);
}