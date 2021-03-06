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
const TYPE_LIST = {
    DBData: ["common_data", "index_data", "list_data", "goods_data"],
    funcHandle: ["createGoodID", "login", "register", "writeCartData", "changeUserPsd"]
};
// const NOT_ALLOW_ACCESS = ["/common.html", "/details.html"]
const handler = {};

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
    // console.log(resData.type);
    if (TYPE_LIST.DBData.includes(resData.type)) {
        handler.getDBData(req, res, resData);
    } else if (TYPE_LIST.funcHandle.includes(resData.type)) {
        // console.log(111, resData);
        handler[resData.type](req, res, resData);
    } else {
        handler.error(req, res, resData);
    }
}

handler.getDBData = (req, res, resData) => {
    fs.readFile(`./database/${resData.type}.json`, "UTF-8", (err, data) => {
        const answer = {
            code: err ? 0 : 1,
            title: err ? "数据请求失败！" : "数据请求成功！",
            data: err ? [] : (data ? JSON.parse(data) : [])
        };
        answer.code && resData.good && (answer.data = (resData.dataKey ? answer.data[resData.dataKey][resData.dataModName] : answer.data).find(val => val.ID === resData.goodID))
        res.write(JSON.stringify(answer), () => {
            res.end();
        });
    })
}

handler.createGoodID = (req, res, resData) => {
    fs.readFile(`./database/list/list_goods.json`, "UTF-8", (err, data) => {
        const answer = {
            code: err ? 0 : 1,
            title: err ? "数据请求失败！" : "数据请求成功！"
        };
        if (err) {
            answer.data = [];
            res.write(JSON.stringify(answer), () => {
                res.end();
            });
        } else {
            data = JSON.parse(data);
            data.forEach(element => {
                element.ID = Date.now() + Math.random().toString().slice(2);
            });
            const dataBackup = [...data];
            fs.writeFile("./database/list/list_goods.json", JSON.stringify(data), err => {
                answer.alt = err ? "添加ID失败" : "添加ID成功";
                answer.data = err ? dataBackup : data;
                res.write(JSON.stringify(answer), () => {
                    res.end();
                });
            })
        }

    })
}

handler.login = (req, res, resData) => {
    fs.readFile("./database/user_data.json", "utf-8", (err, data) => {
        const userData = err ? [] : (data ? JSON.parse(data) : []);
        const answer = {};
        const flag = userData.find(val => val.username === resData.username);
        if (flag) {
            if (flag.password === resData.password) {
                answer.code = 0;
                answer.title = "登录成功";
                answer.data = flag;
            } else {
                answer.code = 1;
                answer.title = "登录失败，密码不符";
                answer.data = "NOTFOUND";
            }
        } else {
            answer.code = 2;
            answer.title = "登录失败，账号不存在";
            answer.data = "NOTFOUND";
        }
        res.write(JSON.stringify(answer), () => {
            res.end();
        });
    })
}

handler.register = (req, res, resData) => {
    fs.readFile("./database/user_data.json", "utf-8", (err, data) => {
        const userData = err ? [] : (data ? JSON.parse(data) : []);
        const answer = {};
        if (userData.find(val => val.username === resData.username)) {
            answer.code = 3;
            answer.title = "注册失败，账号重复";
            answer.data = "NOTFOUND";
            res.write(JSON.stringify(answer), () => {
                res.end();
            });
        } else {
            answer.data = {
                username: resData.username,
                password: resData.password,
                cartData: []
            };
            userData.push(answer.data)
            fs.writeFile("./database/user_data.json", JSON.stringify(userData), err => {
                answer.code = 0;
                answer.title = "注册成功";
                res.write(JSON.stringify(answer), () => {
                    res.end();
                });
            })
        }
    })
}

handler.writeCartData = (req, res, resData) => {
    // console.log(11111111);
    fs.readFile("./database/user_data.json", "utf-8", (err, data) => {
        let answer = {};
        const userData = JSON.parse(data);
        userData.find(val => val.username === resData.username).cartData = JSON.parse(resData.cartData);
        // console.log();
        fs.writeFile("./database/user_data.json", JSON.stringify(userData), err => {
            answer.code = 1;
            answer.title = "写入用户购物车数据成功";
            answer.data = userData;
            res.write(JSON.stringify(answer), () => {
                res.end();
            });
        })
    })
}

handler.changeUserPsd = (req, res, resData) => {
    fs.readFile("./database/user_data.json", "utf-8", (err, data) => {
        const userData = err ? [] : (data ? JSON.parse(data) : []);
        const answer = {};
        const userIndex = userData.findIndex(val => val.username === resData.username)
        // console.log(userIndex, userData[userIndex]);
        if (userData[userIndex].password !== resData.oldP) {
            answer.code = 1;
            answer.title = "旧密码错误，密码修改失败";
            answer.data = "NOTFOUND";
            res.write(JSON.stringify(answer), () => {
                res.end();
            });
        } else {
            userData[userIndex].password = resData.newP;
            fs.writeFile("./database/user_data.json", JSON.stringify(userData), err => {
                answer.code = 0;
                answer.title = "密码修改成功";
                res.write(JSON.stringify(answer), () => {
                    res.end();
                });
            })
        }
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
    fs.readFile('./dist' + location.pathname, (err, data) => {
        // console.log(location.pathname);
        // 利用文件模块读文件，将读取到的文件响应给前端
        //  || NOT_ALLOW_ACCESS.includes(location.pathname)
        if (err) {
            res.write("NOT FOUND");
        } else {
            res.write(data);
        }
        res.end();
    })
}