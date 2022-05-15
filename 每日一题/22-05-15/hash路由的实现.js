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
		this.history = [] // 记录历史hash

		this.currentIndex = this.history.length - 1 // 作为指针 默认指向this.history的末尾，根据后退前进指向history中不同的hash

		// 添加 监听对应事件
		this.refresh = this.refresh.bind(this)
		this.backOff = this.backOff.bind(this)

		// 后退操作默认为false
		this.isBack = false

		window.addEventListener('load', this.refresh, false)
		window.addEventListener('hashchange', this.refresh, false)
	}

	route(path, callback) {
		this.routes[path] = callback || function () { }
	} // 将path路径与对应的callback函数存储

	refresh() {
		this.currentUrl = location.hash.slice(1) || '/' // 获取当前URL的hash路径

		if (!this.isBack) {
			// 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
			// 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
			// 避免再次造成指针的不匹配,我们直接截取指针之前的数组
			// 此操作同时与浏览器自带后退功能的行为保持一致
			if (this.currentIndex < this.history.length - 1) {
				this.history = this.history.slice(0, this.currentIndex + 1)
			}
			this.history.push(this.currentUrl)
			this.currentIndex++
		}

		this.history.push(this.currentUrl) // 将当前的hash路由推入数组存储
		this.currentIndex++ // 指针加一
		this.routes[this.currentUrl]() // 执行当前hash路径的callback函数
	} // 刷新

	backOff() {
		this.isBack = true // 后退时 设置为true
		// 如果指针指向小于0，说明不存在对应的hash路由，因此可以将当前指针锁定在 0 即可
		this.currentIndex <= 0
			? (this.currentIndex = 0)
			: (this.currentIndex = this.currentIndex - 1)

		// 随着后退 location.hash也应该随之变化
		location.hash = `#${this.history[this.currentIndex]}`
		// 执行指针目前指向hash路由对应callback
		this.routes[this.history[this.currentIndex]]()
	}
}
