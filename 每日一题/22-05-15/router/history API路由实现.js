class Routers {
	constructor() {
		this.routes = {};
		// 在初始化时监听popstate事件
		this._bindPopState();
	}
	// 初始化路由
	init(path) {
		history.replaceState({ path: path }, null, path);
		this.routes[path] && this.routes[path]();
	}
	// 将路径和对应回调函数加入hashMap储存
	route(path, callback) {
		this.routes[path] = callback || function () { };
	}

	// 触发路由对应回调
	go(path) {
		history.pushState({ path: path }, null, path);
		this.routes[path] && this.routes[path]();
	}
	// 监听popstate事件
	_bindPopState() {
		window.addEventListener('popstate', e => {
			const path = e.state && e.state.path;
			this.routes[path] && this.routes[path]();
		});
	}
}

window.Router = new Routers();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');
function changeBgColor(color) {
	content.style.backgroundColor = color;
}

Router.route('/', function () {
	changeBgColor('yellow');
});
Router.route('/blue', function () {
	changeBgColor('skyblue');
});
Router.route('/green', function () {
	changeBgColor('green');
});

ul.addEventListener('click', e => {
	if (e.target.tagName === 'A') {
		e.preventDefault();
		Router.go(e.target.getAttribute('href'));
	}
});
