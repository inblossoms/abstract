// NOTICE 实现一个 Storage

// 方式一：  静态版

// 定义Storage
class Storage {
	static getInstance() {
		// 判断是否已经new过1个实例
		if (!Storage.instance) {
			// 若这个唯一的实例不存在，那么先创建它
			Storage.instance = new Storage()
		}
		// 如果这个唯一的实例已经存在，则直接返回
		return Storage.instance
	}
	getItem(key) {
		return localStorage.getItem(key)
	}
	setItem(key, value) {
		return localStorage.setItem(key, value)
	}
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1.setItem('name', '李雷')
// 李雷
storage1.getItem('name')
// 也是李雷
storage2.getItem('name')

// 返回true
storage1 === storage2



// 实现方式二：   闭包版
function Storage() { }

Storage.prototype.getItem = (key) => {
	return localStorage.getItem(key)
}

Storage.prototype.setItem = (key, val) => {
	return localStorage.setItem(key, val)
}

let StorageInstance = (() => {
	let instance = null;
	return function () {
		instance || (instance = new Storage())
		return instance
	}
})()

// 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果 
const storage1 = new StorageInstance()
const storage2 = new StorageInstance()

storage1.setItem('name', '李雷')
// 李雷
storage1.getItem('name')
// 也是李雷
storage2.getItem('name')

// 返回true
storage1 === storage2
