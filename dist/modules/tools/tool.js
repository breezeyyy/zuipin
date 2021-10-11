"use strict";
"ust strict";
/**
 * 获取指定元素的指定属性值的兼容处理
 * @param {object} element 要获取属性值的元素名
 * @param {string} attribute 要获取值的属性名 
 * @returns string
 */

function getStyle(element, attribute) {
  return getComputedStyle ? getComputedStyle(element)[attribute] : element.currentStyle[attribute];
}
/**
 * 监听式绑定事件的兼容处理
 * @param {object} element 事件源
 * @param {string} eventType 要添加的事件类型
 * @param {function} callback 回调函数
 * @param {boolean} [flowOfEvent] 事件流的状态，默认 事件冒泡 false
 */


function addEvent(element, eventType, callback, flowOfEvent) {
  flowOfEvent = flowOfEvent ? true : false;
  element.attachEvent ? element.attachEvent("on" + eventType, callback) : element.addEventListener(eventType, callback, flowOfEvent);
}
/**
 * 监听式删除事件的兼容处理
 * @param {object} element 事件源
 * @param {string} eventType 要删除的事件类型
 * @param {function} callback 回调函数
 * @param {boolean} [flowOfEvent] 事件流的状态，默认 事件冒泡 false
 */


function removeEvent(element, eventType, callback, flowOfEvent) {
  flowOfEvent = flowOfEvent ? true : false;
  element.detachEvent ? element.detachEvent("on" + eventType, callback) : element.removeEventListener(eventType, callback, flowOfEvent);
}
/**
 * 获取当前事件对象的兼容处理
 * @param {object} event 当前事件对象
 * @returns object
 */


function getEvent(event) {
  return event || window.event;
}
/**
 * 获取当前事件目标的兼容处理
 * @param {object} event 当前事件对象
 * @returns object
 */


function getTarget(event) {
  return getEvent(event).target || getEvent(event).srcElement;
}
/**
 * 赋值式事件阻止冒泡的兼容处理
 * @param {object} event 事件对象
 */


function stopBubble(event) {
  getEvent(event).stopPropagation ? getEvent(event).stopPropagation() : getEvent(event).cancelBubble = true;
}
/**
 * 阻止默认事件的兼容处理
 * @param {object} event 事件对象
 */


function stopDefault(event) {
  getEvent(event).preventDefault ? getEvent(event).preventDefault() : getEvent(event).returnValue = false;
}
/**
 * 返回一个指定区间的随机数
 * @param {number} start 随机数区间开始
 * @param {number} end 随机数区间结束
 * @returns number
 */


function random(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}
/**
 * 随机返回一个RGB颜色
 * @returns string
 */


function randomColor() {
  return "RGB(".concat(random(0, 255), ", ").concat(random(0, 255), ", ").concat(random(0, 255), ")");
}
/**
 * 判断参数是否是一个纯object
 * @param {object} val 任意
 * @returns boolean
 */


function isObject(val) {
  return val.__proto__.__proto__ === null;
}
/**
 * 判断参数是否是一个数组
 * @param {object} val 任意
 * @returns boolean
 */


function isArray(val) {
  return Array.prototype.isPrototypeOf(val);
}
/**
 * 判断参数是否是一个string
 * @param {object} val 任意
 * @returns boolean
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * 判断参数是否是一个number
 * @param {object} val 任意
 * @returns boolean
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * 判断参数是否是一个boolean
 * @param {object} val 任意
 * @returns boolean
 */


function isBoolean(val) {
  return typeof val === 'boolean';
}
/**
 * 判断参数是否是一个函数
 * @param {object} val 任意
 * @returns boolean
 */


function isFunction(val) {
  return typeof val === 'function';
}