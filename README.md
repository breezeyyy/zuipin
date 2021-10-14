

# 醉品茶城

醉品茶城是中国专业的正宗品牌茶叶,茶具,花茶购物商城,经营铁观音,大红袍,红茶,绿茶,普洱茶,西湖龙井,武夷岩茶,黄山毛峰等国内外原产地品牌茶叶,欢迎选购

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/breezeyyy/zuipin/">
    <img src="https://img1.zuipin.cn/new_pc/zuipinfw/20210901fw/logo.png" alt="Logo" width="190" height="90">
  </a>

  <h3 align="center">醉品茶城</h3>
  <p align="center">
    茶叶、茶具一站式网上购物商城
    <br />
    <a href="https://github.com/breezeyyy/zuipin"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/breezeyyy/zuipin">查看Demo</a>
    ·
    <a href="https://github.com/breezeyyy/zuipin/issues">报告Bug</a>
    ·
    <a href="https://github.com/breezeyyy/zuipin/issues">提出新特性</a>
  </p>

</p>


<br />

## 目录

- [醉品茶城](#醉品茶城)
  - [目录](#目录)
    - [上手指南](#上手指南)
          - [页面](#页面)
          - [前端交互功能](#前端交互功能)
          - [开发前的配置要求](#开发前的配置要求)
          - [**安装步骤**](#安装步骤)
    - [文件目录说明](#文件目录说明)
    - [开发的架构](#开发的架构)
    - [部署](#部署)
    - [使用到的框架](#使用到的框架)
    - [贡献者](#贡献者)
      - [如何参与开源项目](#如何参与开源项目)
    - [版本控制](#版本控制)
    - [作者](#作者)
    - [版权说明](#版权说明)


### 上手指南

使用node启动app.js，访问本地3000端口的html文件。

###### 页面

1. 全局页面：`http://localhost:3000/common.html`
    - 使用JQuery的load动态加载HTML结构
    - 具体有头部、三级菜单、右侧导航。
    - 不可直接通过url进行访问。
2. 首页：http://localhost:3000/index.html
    - 默认情况登录后自动回到首页。
3. 商品列表：http://localhost:3000/list.html
    - 点击首页三级菜单**红茶**即可进入列表页。
4. 商品详情页：`http://localhost:3000/details.html`
    - 商品详情页不可直接进行访问。
    - 点击商品进入详情页，目前包括首页主轮播图的两个商品、商品详情页的前四个商品，动态渲染。
5. 登录/注册页：http://localhost:3000/login.html
    - 默认为登录，点击对应选项切换登录注册
    - 信息无误时方可点击登录/注册
6. 个人中心页：`http://localhost:3000/personal.html`
    - 登录后首页点击**我的账户**，进入个人中心
    - 左栏菜单进行选项卡切换，已完成修改密码功能
7. 购物车页：`http://localhost:3000/cart.html`
    - 登录后点击**购物车**进入购物车页面，读取用户购物车数据进行商品渲染

###### 前端交互功能

1. 三级菜单
2. 轮播图
3. 楼层跳转
4. 选项卡切换
5. 搜索下拉菜单
6. 分页
7. 放大镜
8. 登录守卫：敏感页面或操作需要验证登录状态
9. 购物车增，删，改，查，单选框双向绑定，合计，总价，批量删除，商品跳转详情
10. 右侧导航回到顶部
11. 登录/注册，修改密码

###### 开发前的配置要求

需要Node 14或以上版本，请查看package.json以了解使用的第三方模块

###### **安装步骤**

1. Get a free API Key at [https://github.com/breezeyyy/zuipin/](https://github.com/breezeyyy/zuipin/)
2. Clone the repo

```sh
git clone https://github.com/breezeyyy/zuipin.git
```

### 文件目录说明
eg:

```
filetree 
├── app.js
├── ARCHITECTURE.md
├── LICENSE.txt
├── README.md
├── /database/
|  ├──/common/
|  ├──/index/
|  └──/list/
├── /src/
|  ├──/css/
|  ├──/font/
|  ├──/images/
|  ├──/js/
|  ├──/libs/
|  ├──/public/
└──└──/tools/

```





### 开发的架构 

请阅读[ARCHITECTURE.md](https://github.com/breezeyyy/zuipin/blob/master/ARCHITECTURE.md) 查阅为该项目的架构。

### 部署

暂无

### 使用到的框架

- [jquery](https://jquery.com)
- [gulp](https://gulpjs.com/)
- [sass](https://sass-lang.com/)

### 贡献者

请阅读**CONTRIBUTING.md** 查阅为该项目做出贡献的开发者。

#### 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。


1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



### 版本控制

该项目使用Git进行版本管理。您可以在repository参看当前可用版本。

### 作者

breezeye@foxmail.com

qq:2806626008  

 *您也可以在贡献者名单中参看所有参与该项目的开发者。*

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/shaojintian/Best_README_template/blob/master/LICENSE.txt)


<!-- links -->
[your-project-path]:breezeyyy/zuipin
[contributors-shield]: https://img.shields.io/github/contributors/breezeyyy/zuipin.svg?style=flat-square
[contributors-url]: https://github.com/breezeyyy/zuipin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/breezeyyy/zuipin.svg?style=flat-square
[forks-url]: https://github.com/breezeyyy/zuipin/network/members
[stars-shield]: https://img.shields.io/github/stars/breezeyyy/zuipin.svg?style=flat-square
[stars-url]: https://github.com/breezeyyy/zuipin/stargazers
[issues-shield]: https://img.shields.io/github/issues/breezeyyy/zuipin.svg?style=flat-square
[issues-url]: https://img.shields.io/github/issues/breezeyyy/zuipin.svg
[license-shield]: https://img.shields.io/github/license/breezeyyy/zuipin.svg?style=flat-square
[license-url]: https://github.com/breezeyyy/zuipin/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555



