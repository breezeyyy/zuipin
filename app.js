// 引入服务器模块
const http = require("http");
// 引入文件模块
const fs = require("fs");
// 引入工具模块
const qs = require("querystring");
// 声明服务器地址
const MY_SERVER_PORT = 3000;
const MY_SERVER_URL = `http://localhost:${MY_SERVER_PORT}`;
// 功能路由对象
const handler = {};
let DBSrc;

// 创建服务器
http.createServer((req, res) => {
    // 根据当前请求创建url类
    const location = new URL(req.url, MY_SERVER_URL);
    // 路由判断
    if (location.pathname.includes("/api")) {
        // 数据请求
        dataHandle(req, res, location);
    } else {
        // 静态资源请求
        staticHandle(req, res, location);
    }

    // 挂载到指定端口
}).listen(3000, () => {
    console.log(`服务器已启动：${MY_SERVER_URL}`);
})

// 响应请求到客户端
function resposeToClient(req, res, resData) {
    // 获取到（不分get或post）数据
    // 在根据数据中隐藏的信息，决定执行不同的功能（登录，注册等等等等...）
    console.log(resData);
    const typeList = {
        common: ["common_data"],
        index: ["banner_main", "banner_tejia", "banner_miaosha", "banner_hot", "drink_data", "gift_data", "tea_data", "news_data"],
        funcHandle: []
    };
    if (typeList.common.includes(resData.type)) {
        DBSrc = "./database/common/";
        handler.getDBData(req, res, resData);
    } else if (typeList.index.includes(resData.type)) {
        DBSrc = "./database/index/";
        handler.getDBData(req, res, resData);
    } else if (typeList.funcHandle.includes(resData.type)) {
        handler[resData.type](req, res, resData);
    } else {
        handler.error(req, res, resData);
    }
}

handler.getDBData = (req, res, resData) => {
    fs.readFile(`${DBSrc}${resData.type}.json`, "UTF-8", (err, data) => {
        let answer = {
            title: err ? "数据请求失败！" : "数据请求成功！",
            data: err ? [] : JSON.parse(data)
        };
        res.write(JSON.stringify(answer), () => {
            res.end();
        });
    })
}

handler.error = (req, res, resData) => {
    res.write("Forbidden\nYou don't have permission to access this resource.", () => {
        res.end();
    });
}

// 数据请求
function dataHandle(req, res, location) {
    // 判断请求方式，不同的请求方式，有不同的解析数据的方式
    if (req.method === "GET") {
        resposeToClient(req, res, qs.parse(location.search.slice(1)));
    } else if (req.method === "POST") {
        let data = '';
        // 通过data事件配合end事件获取post携带的数据
        req.on("data", (fragment) => {
            // 在地址后拼接，利用工具模块解析地址后的数据
            data += fragment;
        })
        // data事件结束后会触发end事件
        req.on("end", () => {
            resposeToClient(req, res, qs.parse(data));
        })
    }
}

// 静态资源请求
function staticHandle(req, res, location) {
    fs.readFile('./src' + location.pathname, (err, data) => {
        // 利用文件模块读文件，将读取到的文件响应给前端
        if (err) {
            res.write("NOT FOUND");
        } else {
            res.write(data);
        }
        res.end();
    })
}