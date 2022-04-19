
let event = (() => {
    let eventObj = {}

    return {
        on: function (type, handler) {
            if (typeof type == "function") {
                throw new Error("参数类型错误！")
            }

            (eventObj[type] || (eventObj[type] = [])).push(handler)
            // 对事件进行收集，同一事件将回调用数组存储
        },

        off: (type, handler) => {
            if (arguments.length === 0) {
                eventObj = {}
            } else if (arguments.length === 1) {
                if (typeof (arguments[0] === "string")) eventObj[type] = []
            } else if (arguments.length === 2) {
                let _events = eventObj[type]
                if (!_events) return
                _events.forEach((ev, i) => {
                    if (ev === handler) ev.splice(i, 1)
                })
            }
        },

        emit: (type) => {
            let args = [].slice().call(arguments, 1)
                , event = eventObj[type];
            if (!event) return

            for (let i = 0; i < event.length; i++) {
                const element = event[i];
                element.apply(null, args)
            }
        }
    }
})()