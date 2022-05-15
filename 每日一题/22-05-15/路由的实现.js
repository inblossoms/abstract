/**
 * name: router
 * desc: 仅实现核心方法 
 */
// 1. hash 路由
// 1.1 初始化路由
// 1.2 实现路由hash存储与执行
// 1.3 监听对应事件
// 2. 增加回退功能
// 2.1 实现后退功能
// 2.2 完整实现hash Router
// 3. HTML5 新路由方案
// 3.1 History API
// 3.2 新标准下路由的实现
class Routers {
	constructor() {
		this.routes = new Map() // 以键值对的形式存储路由
		this.currentUrl = '' // 当前路由的URL

		// 添加 监听对应事件
		this.refresh = this.refresh.bind(this)
		window.addEventListener('load', this.refresh, false)
		window.addEventListener('hashchange', this.refresh, false)
	}

	route(path, callback) {
		this.routes[path] = callback || function () { }
	} // 将path路径与对应的callback函数存储

	refresh() {
		this.currentUrl = location.hash.slice(1) || '/' // 获取当前URL的hash路径
		this.routes[this.currentUrl]() // 执行当前hash路径的callback函数
	} // 刷新
}
