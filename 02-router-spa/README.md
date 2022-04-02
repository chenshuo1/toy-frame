#《手写 Umi 二：路由和 SPA》

## 本文为「手写 Umi」的第二篇，课程大纲见 <a class="link-of-topic" href="https://t.zsxq.com/EYR3bYN" title="https://t.zsxq.com/EYR3bYN" target="_blank">https://t.zsxq.com/EYR3bYN</a> 。

先上 DEMO<<<a class="link-of-topic" href="https://stackblitz.com/edit/toy-umi-2" title="https://stackblitz.com/edit/toy-umi-2" target="_blank">https://stackblitz.com/edit/toy-umi-2</a>>>，在的前一篇的基础上增加了路由功能，基于成熟方案 react-router@6，添加 About 路由组件，让应用成为 SPA（Single Page Application）。

关键代码是这么几行，
```
import { HashRouter, Route, Routes, Outlet, Link } from 'react-router-dom';

ReactDOM.render((
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<App />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </HashRouter>
), document.getElementById('root'));

// 布局组件
function Layout() {
  return (
    <div>
      <div>
        <Link to="/">Home</Link> /
        <Link to="/about">About</Link>
      </div>
      <Outlet />
    </div>
  )
}
```
### 在上一节的基础上，我们讲 ReactDOM.render 渲染的根组件换成了 HashRouter 等，内部有一个 <Layout /> 的全局布局组件，然后用 <App />（上一节的 Todos App）渲染 / 路径，用 <About /> 渲染 /about 路径。

### 看到这代码，初学者可能会有很多问题❓

1. react-router 和 react-router-dom 是什么关系？
2. HashRouter、Routes 和 Route 的关系是啥？
3. HashRouter 啥意思？
4. Outlet 什么用？
5. 为啥用 Link 不用 a 标签？
6. ...

### react-router-dom 基于 react-router，就像 react-dom 和 react 的关系一样，之所以这样拆分，是因为他们除了支持 browser 环境，还会支持其他的，比如 react 通过 react-native 支持 iOS 开发，而 react-router 则通过 react-router-native 支持 react-native。
---
### react-router-dom 有 export 很多 API。其中 HashRouter 基于 Router，此外还有 BrowserRouter、StaticRouter、MemoryRouter 等。Router 不负责渲染，通过 context provider 提供数据，包括 location、basename、action 等；Routes 和 Route 负责渲染，Route 可以想象成 if 语句，<Route path="about" element={<About />} /> 即如果 path 是 about，用 <About /> 渲染，Routes 的角色是在 url（location）变更时，遍历子节点的所有 <Route />，找到最匹配的来做渲染。
---
### HashRouter 是相对于 BrowserRouter 而言的，差异在于浏览器的 url 处理上。比如渲染 path 为 /about 的路由，BrowserRouter 会用 /about，而 HashRouter 会用 /#/about。选 HashRouter 通常是因为部署环境的限制，比如这个 demo 就是用的 HashRouter，如果大家能找到使用 BrowserRouter 的方法，欢迎告诉我。
---
### Outlet 意为出口，其用途是渲染子路由。<a class="link-of-topic" href="https://github.com/remix-run/react-router/blob/8ccac66d08185477b8d7fb7480a9487d6d2f1665/packages/react-router/index.tsx#L987" title="react-router/index.tsx at 8ccac66d08185477b8d7fb74..." target="_blank">react-router/index.tsx at 8ccac66d08185477b8d7fb74...</a>

### 用 Link 而不用 a 标签的原因是，SPA 应用是基于路由跳转，而不是 A 标签跳转，A 标签会让页面刷新，而路由跳转不会，只是修改 url 并通知更新。Link 会阻止 A 或 Button 等元素的默认行为，进行路由跳转。<a class="link-of-topic" href="https://github.com/remix-run/react-router/blob/30f803d5d268f1093eea4331fb5393c1681fa485/packages/react-router-dom/index.tsx#L368" title="react-router/index.tsx at 30f803d5d268f1093eea4331..." target="_blank">react-router/index.tsx at 30f803d5d268f1093eea4331...</a>
---
### 关于 react-router 的更多介绍，可以参考其官网，<a class="link-of-topic" href="https://reactrouter.com/docs/en/v6" title="React Router | Docs Home" target="_blank">React Router | Docs Home</a> 。
---
### One More Thing. 如果大家足够细心，会发现这个 Demo 中有一行奇怪的代码，
---
```
<script>
  globalThis.process = { env: { NODE_ENV: 'development' } };
</script>
```
### 这行代码是为 react-router-dom 加的补丁，react-router-dom 会根据 process.env.NODE_ENV 决定加载不同代码，而我们的 Demo 是不经过编译直接跑在浏览器中，浏览器没有 process 全局变量，所以需要上述补丁。<a class="link-of-topic" href="https://github.com/remix-run/react-router/blob/67334e57fe2b5a298133fa2b83fef836a265f7d2/packages/react-router-dom/node-main.js#L3" title="react-router/node-main.js at 67334e57fe2b5a298133f..." target="_blank">react-router/node-main.js at 67334e57fe2b5a298133f...</a>