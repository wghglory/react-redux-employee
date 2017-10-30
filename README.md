# react redux starter kit

林先生您好！感谢您花时间阅读我的代码，我很期待能得到您的意见！

我使用 starter kit 做了一个简单的员工管理页面。这里重点是 starter kit 的一些特点以及我如何去组织一个项目。

## 我在开发一个新项目需前端方面考虑的

以下说的较为通用，具体还要结合需求进行技术选型

* 编辑器（不重要）
  * vscode, atom, sublime, webstorm
  * 所需插件
  * built in terminal?
  * **Editor config**（保证大家即使用不同编辑器也能有相同的效果，当然还要配合其他 lint 工具）
* 模块化方案
  * ES6(👌)，AMD, CMD, etc
* 开发 server
  * http-server, express, webpack devServer, browserSync
* HTML 生成
  * 是否需要 minify
  * 不同环境下是否注入不同内容
  * 使用模板嘛？我这里用 ejs
* Transpiling
  * 使用 experimental features 嘛
  * 不同环境下配置
  * Babel 还是 Typescript
* 打包
  * Webpack（最主流）, Browserify, Rollup（较新、兼容性）...
* Linting
  * 用哪个？eslint, jshint, csslint, stylelint
  * 使用那些 rules？这些规则对应 Warning or error?
  * 使用什么插件
  * 使用 preset 嘛?
* Testing
  * Framework? Mocha, Jasmine, QUnit, Jest...
  * 断言库? expect, chai, should.js
  * Helpers? cheerio, jsdom
  * 文件存放位置？和被测试文件放在一起（👌），单独放到一个 test 文件夹
  * 命名？spec 还是 test 后缀
  * 运行环境？Karma, PhantomJS, JSDOM?
  * Code Coverage 怎么做
  * 持续集成
* 项目结构
  * 大型项目安 feature，小型就如同该项目
  * 是否有个 centralized 的 api
* HTTP
  * Library? axios/fetch
  * Mock schema format, json server 等
  * Mock data generation
  * Mock server
* 生产环境
  * 压缩
  * Sourcemaps
  * code/Bundle splitting，提取 css，提取大 image 资源等
  * Cache busting
  * 错误追踪
  * 部署

## 本 starter-kit 特点

1. **反馈迅速** - 每次保存文件时候进行 热加载、lint、自动化测试，_使用 npm scripts 不需要 gulp, grunt_
1. **控制台显示程序当前运行信息** - 所有反馈，比如 lint error 都会显示在控制台
1. **可以自动化 build** - `npm run build`
1. `npm run open:cover` 查看 code coverage。我在 components, reducers, store, selectors 等文件夹最少写一个测试作为例子
1. 很容易后续添加 部署 命令

## 快速开始

1. **安装 package**：`npm install`
1. **运行**：`npm start -s` 会自动构建、启动服务器、浏览器中打开程序。每次保存文件会重新构建、lint、运行自动化测试。
1. 之后请尝试运行 `npm run build`, `npm run open:cover`, 最后 `npm run analyze-bundle` 查看分析。

## 使用主要技术

react, react router, redux, babel, webpack, browserSync, trackJS, ESlint, sass, postCss, Jest, npm scripts 做自动化

## 项目结构

```
├── .babelrc                  # 配置 Babel
├── .travis.yml               # 配置 持续集成
├── appveyor.yml              # 配置 持续集成
├── .editorconfig             # 配置 editor 规则
├── .eslintrc.json            # 配置 ESLint
├── .gitignore                # git 忽略文件
├── dist                      # 生产模式下打包最终文件夹
├── package.json              # 配置
├── src                       # 源码目录
│   ├── actions               # redux action 文件夹
│   ├── components            # React 组件
│   ├── constants             # redux 每个 action 使用的常量
│   ├── containers            # 负责状态的容器组件
│   ├── index.ejs             # 首页模板
│   ├── index.js              # 入口文件
│   ├── reducers              # reducers，根据之前 state 和 action 计算新的 state
│   ├── selectors             # redux mapStateToProps, mapDispatchToProps 计算用
│   ├── store                 # Redux store  配置
│   ├── styles                # 样式文件家
│   └── utils                 # 工具类，纯 js
├── tools                     # npm 用于 build 相关的文件夹
│   ├── build.js              # 以生产模式打包
│   ├── chalkConfig.js        # 配置控制台输出颜色
│   ├── distServer.js         # 开启生产模式的 web 服务器
│   ├── nodeVersionCheck.js   # 检查 node 版本
│   ├── srcServer.js          # 开发环境服务器启动，支持热加载
│   ├── startMessage.js       # 提醒信息
│   └── analyzeBundle.js      # webpack 打包分析
├── webpack.config.dev.js     # 配置开发模式下的 webpack
└── webpack.config.prod.js    # 配置生产模式下的 webpack
```

### SASS 生成 CSS

这里我对 dev 和 prod 模式处理不同。

dev 模式下运行 `npm start`: sass-loader 把 Sass 编译成 CSS; webpack 把 css 打包到 bundle.js。 支持热加载，但问题就是 js 没被解析完之前会出现 FOUC

prod 模式下运行 `npm run build`: 使用了 `extract-text-webpack-plugin` 提取单独的 css

## 技术选型

### 没有选用 gulp, grunt 的原因？

* npm scripts 只需要运行命令就可以实现 压缩、编译、测试 等功能，比 gulp 更简单。比如 `npm run build` 实际上完成了 清空 dist目录、校验 lint、运行测试、打包、最终在 production 模式下运行 等一系列操作
* 不依赖第三方插件
* 生态环境也比 gulp 更强大

### 使用 scss 而不是 less

这里不去比较二者区别，而重点说为何我用 scss。scss 功能更强大。

1. Less 没有输出设置，Sass 提供4中输出选项：nested, compact, compressed 和 expanded。

    输出样式的风格可以有四种选择，默认为nested

    * nested：嵌套缩进的css代码
    * expanded：展开的多行css代码
    * compact：简洁格式的css代码
    * compressed：压缩后的css代码

1. Sass支持条件语句，可以使用`if{} else{}, for{}`循环等等。而Less不支持。

1. 我发现 bootstrap 4 也放弃 less，开始使用 scss

### webpack + browserSync

我没有使用 http-server, express, webpack dev server。使用了 browserSync 做 devServer，因为我很喜欢 browserSync 能够多设备同步这一点，结合 webpack 做热加载。

### 为何不在 react 官方 cli -- create-react-app 基础上直接开发？

react 提供的 cli 是学习 react 过程中必不可少的。它没有暴露给我们太多配置信息，我们如果更改一些配置很不方便，虽然可以通过 `eject` 处理。不同的项目也有不同的需求，没有什么 starter-kit 能适用于所有的场合。自己写一套 starter kit 能得到锻炼。

### 测试

这里使用 jest，对 react 支持很友好。当然也可以选择 mocha。选测试 framework 我觉得就像选个健身房，重要的是锻炼，锻炼的方式差别不大。在 employee 文件夹中我分别使用了 ReactTestUtils 和 Enzyme 对 EmployeeForm 组件进行测试，显而易见，Enzyme 更清晰简单。

有些人命名是 spec 后缀，也有很多是 test 后缀。

### 为何在每个文件夹单独包含 test 文件而不是单独有个 test 文件夹里面写各种 test.js?

* 测试文件我认为是重要的资源，包含了被测试文件核心内容。放在一起方便打开、查看。很容易知道某个文件是否写了测试文件
* path 引入简单方便

当然也有人喜欢放到 __test__ 文件夹。

---

## 不满意的地方

我在 index.js 从 node_modules 引入了 toastr and bootstrap。这种方式让我很不舒服，webpack loader 中我不得不暂时注释掉 `exclude: node_modules`, 请林先生指点。

```javascript
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.scss';
```

---

### npm scripts 介绍

| **Script** | **目的** |
|----------|-------|
| prestart | 调用 remove-dist |
| start | 运行测试, lints, 开启开发环境服务器, 在默认浏览器中打开程序 |
| clean-dist | dist 文件夹清空 |
| remove-dist | 删除 dist 文件夹 |
| create-dist | 创建 dist 文件夹和子文件夹 |
| prebuild | 清空 dist 文件夹, 生成 html 和 scss |
| build | webpack 打包到 dist 文件夹 |
| test | 用 jest 进行测试，每次保存的时候检测文件变化并重新运行测试 |
| test:cover | 运行测试并生成 coverage 报告到 /coverage/index.html |
| test:cover:travis | 运行上述代码测试和 code coverage 报告, 并把结构发送给 Coveralls. 只在 travis build 情况下运行 |
| analyze-bundle | 生产模式下分析 webpack 打包情况，从而后续可以减少文件大小、哪些模块真正被使用了 |

### 依赖介绍

| **依赖** | **目的** |
|----------|-------|
|autoprefixer | 自动增加 prefix |
|object-assign | Polyfill: Object.assign |
|babel-preset-latest|Babel preset for ES2015, ES2016, ES2017|
|babel-preset-react-hmre|babel 热加载 preset |
|babel-preset-react| 增加 jsx 支持|
|browser-sync| 多设备同布 |
|chalk| 控制台输出带颜色 |
|connect-history-api-fallback  | 避免直接访问路由错误 |
|coveralls| 通过 Coveralls.io 显示 code coverage 信息 |
|cross-env| 跨平台处理变量 |
|css-loader| webpack loader 之一|
|enzyme| React 测试库 |
|eslint|Lints JavaScript |
|eslint-loader| Wepback eslint 支持 |
|eslint-plugin-import|检查规则中加入 es6 import|
|eslint-plugin-react| 检查规则加入 react |
|eslint-watch| 检测文件变化时能够 lint |
|extract-text-webpack-plugin| 提取 css |
|file-loader| webpack loader 之一 |
|html-webpack-plugin|生成 html|
|identity-obj-proxy|Mocks webpack imports 因为 Jest 不懂得 image 和 CSS imports|
|jest|测试 framework|
|node-sass| webpack 支持 SASS |
|npm-run-all| 多个脚本同时运行 |
|open|默认浏览器打开应用|
|postcss-loader|  webpack 支持 PostCSS |
|redux-immutable-state-invariant| 如果state 对象 mutate，提醒|
|react-test-renderer|渲染 React components 为 pure JavaScript 对象，不用依赖 DOM|
|redux-thunk|异步请求可以 dispatch function 作为 action |
|replace| 跨平台重命名文件|
|rimraf|跨平台删除文件 |
|webpack-bundle-analyzer| 打包分析器 |
|webpack-dev-middleware| 把 Webpack 集成到 Browser-sync |
|webpack-hot-middleware| Webpack 热加载集成到 Browser-sync |
|webpack-md5-hash| Hash bundles，内容改变时才会输出新的文件|

## 混淆之处

这里 common 文件夹并不是真正意义上对组件的封装，而是对 demo 中一些多个页面公用的部分如 Header 进行提取。