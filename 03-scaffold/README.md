# 《手写 Umi 三：极简脚手架》

## 通过前面两节，我们已经知道了 react 的项目如何运行，以及路由和 SPA 的概念。这一节我们把文件拆开，利用模块化的方式进行代码组织，同时引入 esbuild 做构建，组成一个极简的脚手架。其最终呈现在浏览器上的效果和上一节相同。

上代码，[GitHub - sorrycc/toy-umi](https://github.com/sorrycc/toy-umi/tree/e9d92c463551c5002e568ecf8a45edcc305597d7)


```
.
├── dist
│    └── index.js
├── layout
│    └── index.jsx
├── pages
│    ├── about.jsx
│    └── index.jsx
├── index.html
├── index.jsx
└── package.json
```

### 以上是其文件树。我们将上节课中的 JavaScript 代码拆成 4 个文件，index.jsx、layout/index.jsx、pages/index.jsx 和 pages/about.jsx，index.jsx 是入口文件，其他都是路由组件；index.html 是入口 html，双击打开即可；package.json 用于保存依赖和运行命令。这就是个极简脚手架了，对于 demo 项目已够用。

### 使用这个仓库分三步：

1. 用 pnpm i 安装依赖
2. 执行 pnpm build
3. 双击打开 index.html

---

## 然后，大家可能会有些疑问，

1. pnpm build 做了啥？
2. 为何用 esbuild，以及如何用 esbuild？
3. 脚手架的意义和不足？
---
### pnpm build 做的事情可以打开 package.json 去找 scripts 里的 build，会发现实际运行的代码是 esbuild index.jsx --bundle --outfile=dist/index.js --target=chrome100。可以发现，这里用 esbuild 将 index.jsx 打包（bundle）输出到 dist/index.js，并适配到 chrome 100。
---
### 选择 esbuild 是出于简单和快的考虑，因为我们的标题是极简脚手架，备选的有 webpack、vite、rollup 等 bundle 工具。esbuild 有两种使用方式，cli 和 api，这里我们选择 cli 的方式。
---
### 现在已经拥有了脚手架。基于脚手架我们可以沉淀我们对 react 使用的理解，把各个环节认为最佳的使用方式（即最佳实践）放进去，包括目录结构、数据流、请求、UI 库、国际化、权限、icons 使用、css 方案等。这会让之后新建项目的启动变得更快，因为只要 copy 代码即可。
---
### 但脚手架也有明显的缺点，就是「直管生，不管养」。基于脚手架创建的项目，如果脚手架本身的最佳实践有更新，如何通知项目更新是个需要解的问题。这个问题的解是框架，下一小节我们会开始到框架的环节。