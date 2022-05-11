### **TS 代码比编译使用什么编译器？**

> 推介使用 Ts 自带的 compiler

#### **Bable 和 tsc 编译有什么区别？**

1. **tsc 的编译流程：**

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85851ebe6f2d41a28ca3885d91beb969~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

<!--
	sourcemap 的作用：
		映射源码和目标代码的位置，这样调试的时候打断点可以定位到相应的源码，线上报错的时候也可以根据sourcemap定位到源码报错的位置。
 -->

- tsc 生成的 AST 可以用 [ https://astexplorer.net/ ]: astexplorer.net 可视化的查看：
- 生成的目标代码和 d.ts 和报错信息也可以用[https://www.typescriptlang.org/play]: ts playground 来直接查看：

2.  **Bable 的编译流程：**
    ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b515ccf55fe4706a128ad38b50b1c24~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

- [https://www.babeljs.cn/repl]: bable repl

<!--
	对比两者的编译流程，会发现 babel 除了不会做类型检查和生成类型声明文件外，tsc 能做的事情，babel 都能做。
	但是两者实现这些功能是有区别的。
 -->

3. **两者生成代码的区别：**

- tsc 生成的代码没有做 polyfill 的处理，需要全量引入 core-js，而 babel 则可以用 @babel/preset-env 根据 targets 的配置来按需引入 core-js 的部分模块，所以生成的代码体积更小。
- babel 不支持 const enum（会作为 enum 处理），不支持 namespace 的跨文件合并，导出非 const 的值，不支持过时的 export = import = 的模块语法。
