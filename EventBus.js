class EventBus {
	constructor() {
		// 用于存储事件和回调之间的对应关系
		this.handlers = new Map()
	}

	on(eventName, callback) {
		const event = this.handlers[eventName]
		!event ? event = [] : event.push(callback)
	}

	emit(eventName, ...args) {
		if (this.handlers[eventName]) {
			const events = this.handlers[eventName].slice()
			events.forEach(e => void e(...args))
		}
	}

	off(eventName, callback) {
		if (arguments.length === 0) {
			this.handlers = {}
		} else if (arguments.length === 1) {
			this.handlers[eventName] = []
		} else if (arguments.length === 2) {
			const event = this.handlers[eventName]
			if (!event) return
			const index = event.indexOf(callback)
			if (index !== 1) event.splice(index, 1)
		}
	}

	once(eventName, callback) {

		const wrapper = (...args) => {
			callback(...args)
			this.off(eventName, wrapper)
		}

		this.on(eventName, wrapper)
	}
}



export const event = new EventBus()