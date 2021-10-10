/**
 * 设定指定的cookie键值，值为空则删除
 * @param {string} key 要设定的cookie的键
 * @param {object} [value = null] 要设定的该键对应的值
 * @param {object} [parameter = {}] 设置cookie的属性，默认为{}
 * @param {string} [parameter.path = '/'] cookie的路径，默认为 /
 * @param {number} [parameter.expires = value === '' ? -1 : 0] cookie的有效期天数，默认会话级
 */
function setCookie(
    key,
    value = null, {
        path = '/',
        expires = value ? 0 : -1
    } = {}) {
    document.cookie = `${key}=${value};path=${path};expires=${expires ? new Date(Date.now() + 1000 * 3600 * 24 * expires) : expires}`;
}

/**
 * 获取指定key的cookie值
 * @param {string} key 获取指定key的cookie值
 * @returns {string} 获取失败返回null
 */
function getCookie(key) {
    return document.cookie.includes(key) ? document.cookie.split(`${key}=`)[1].split('; ')[0] : null;
}