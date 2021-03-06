

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
    - [开发前的配置要求](#开发前的配置要求)
    - [**安装步骤**](#安装步骤)
    - [快速入门](#快速入门)
    - [页面](#页面)
    - [已实现的功能](#已实现的功能)
    - [模块化和SASS源文件](#模块化和sass源文件)
    - [文件目录说明](#文件目录说明)
    - [部署](#部署)
    - [使用到的框架](#使用到的框架)
    - [如何参与开源项目](#如何参与开源项目)
    - [版本控制](#版本控制)
    - [作者](#作者)
    - [版权说明](#版权说明)
    - [写在最后想说的话](#写在最后想说的话)


### 开发前的配置要求

- Node 14或以上版本
  - 使用的第三方node模块请查阅package.json
- jQuery 2.0以上版本
  - 仅使用jQuery的load方法动态加载html，JS代码纯原生
- require 第三方模块化
  
### **安装步骤**

**Clone这个地址： `git clone https://github.com/breezeyyy/zuipin.git`**

### 快速入门

使用node启动app.js，访问本地3000端口的html文件。

### 页面

1. 全局页面：**`http://localhost:3000/common.html`**
    - 使用JQuery的load动态加载HTML结构
    - 具体有头部、三级菜单、右侧导航。
    - 不可直接通过url进行访问。
2. 首页：http://localhost:3000/index.html
    - 默认情况登录后自动回到首页。
3. 商品列表：http://localhost:3000/list.html
    - 点击首页三级菜单**红茶**即可进入列表页。
4. 商品详情页：**`http://localhost:3000/details.html`**
    - 商品详情页不可直接进行访问。
    - 点击商品进入详情页，目前包括首页主轮播图的两个商品、商品详情页的前四个商品，动态渲染。
5. 登录/注册页：http://localhost:3000/login.html
    - 默认为登录，点击对应选项切换登录注册
    - 信息无误时方可点击登录/注册
6. 个人中心页：**`http://localhost:3000/personal.html`**
    - 登录后首页点击**我的账户**，进入个人中心
    - 左栏菜单进行选项卡切换，已完成修改密码功能
7. 购物车页：**`http://localhost:3000/cart.html`**
    - 登录后点击**购物车**进入购物车页面，读取用户购物车数据进行商品渲染

### 已实现的功能

1. **三级菜单**(首页)
2. **轮播图**(首页)
3. **倒计时**(首页)
4. **楼层跳转**(首页)
5. **选项卡切换**(个人中心页)
6. **搜索下拉菜单**(搜索框，使用jsonp请求，淘宝的接口)
7. **分页**(列表页)
8. **放大镜**(详情页)
9. **登录守卫**(敏感操作时)
10. **购物车增，删，改，查，单选框双向绑定，合计，总价，批量删除，商品跳转详情**
11. **右侧导航回到顶部**
12. **登录/注册，修改密码**
13. 全页面**购物车商品数量实时更新**
14. **购物车数据同步后端，不同账户数据不同**
15. **列表页选项卡隐藏/显示**

### 模块化和SASS源文件

- 模块化
  - src/modules/
    - cart (购物车页)
    - list (列表页)
    - porsonal (个人中心页)
- SASS
  - src/sass

### 文件目录说明
eg:

```
filetree 
├── .gitignore
├── app.js
├── gulpfile.js
├── LICENSE.txt
├── package.json
├── README.md
├─database
├─dist
│  ├─css
│  ├─font
│  ├─font_color
│  ├─images
│  │  ├─cart
│  │  ├─common
│  │  ├─details
│  │  ├─index
│  │  ├─list
│  │  ├─login
│  │  └─personal
│  ├─js
│  ├─libs
│  └─modules
│      ├─cart
│      ├─list
│      ├─personal
│      └─tools
└─src
    ├─font
    ├─font_color
    ├─images
    │  ├─cart
    │  ├─common
    │  ├─details
    │  ├─index
    │  ├─list
    │  ├─login
    │  └─personal
    ├─js
    ├─libs
    ├─modules
    │  ├─cart
    │  ├─list
    │  ├─personal
    │  └─tools
    └─sass
```


### 部署

暂无

### 使用到的框架

暂无

### 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。


1. Fork这个项目
2. 创建您的单独分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 上传到您的分支中 (`git push origin feature/AmazingFeature`)
5. 打开拉去请求



### 版本控制

该项目使用Git进行版本管理。您可以在repository参看当前可用版本。

### 作者

breezeye@foxmail.com

qq:2806626008  

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/shaojintian/Best_README_template/blob/master/LICENSE.txt)

### 写在最后想说的话

&emsp;&emsp;第一个做一个完整的项目，经验不够，开始时完全没有搭建项目环境的意识，以致于项目进行到中途，需要进行环境的重构，花费了不必要的时间。  

&emsp;&emsp;在版本管理方面，在主分支与开发分支的处理上仍需加强。  

&emsp;&emsp;遗憾的是，项目进行到一半，才学习了SASS编写CSS和模块化方式，现如今仍有两三个页面的CSS代码没有完全使用SASS编写，JS代码仍使用的是类的方式来处理。包括部分自己封装的工具函数/类，正因为有部分页面是通过标签引入的，导致后续在后续模块化时，需要用到这部分工具，仍然使用了标签引入，如果将原封装更改为模块化方式，之前那部分未模块化的页面修改起来较为麻烦。  

&emsp;&emsp;这个项目暂时要告一段落了，可惜的是仍然有我想要添加的功能还未实现，之前的动态渲染方式也处理的不到位，还有觉得当前存储数据的JSON文件，数据存储的方式不够完善，同时代码中仍有大量冗余可以进行修缮，当前编写的SASS代码只用到了嵌套结构，并没有发挥出SASS完整的实力，太多太多……

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



