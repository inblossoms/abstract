// Tip: 有若干个用户参与，每个用户从1到10中选择一个数字作为幸运数字，而系统一秒钟随机产生一个1到10的数字，若这个数字和用户的幸运数字相同，则该用户胜出。

function defer() {
  // 注册回调，在外部控制promise状态
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

const _state = Symbol("state"); // 存储当前定时器发出的幸运数字
const _checkers = Symbol("checker"); // 保存用户给出的幸运数字

class Signal {
  constructor(initState) {
    this[_state] = initState;
    this[_checkers] = new Map();
  }

  get state() {
    return this[_state];
  }

  set state(value) {
    // 每次状态变化时，检查未结束的 defer 对象
    [...this[_checkers]].forEach(([promise, { type, deferred, state }]) => {
      if (
        (type === "while" && value !== state) || // 当信号状态改变时，while 信号结束
        (type === "until" && value === state) // 当信号状态改变为对应的 state 时，until 信号结束
      ) {
        deferred.resolve(value);
        this[_checkers].delete(promise);
      }
    });
    this[_state] = value;
  }

  // while(state) {
  //   const deferred = defer();
  //   if (state !== this[_state]) {
  //     // 如果当前状态不是 while 状态， while 的 deferred 结束
  //     deferred.resolve(this[_state]);
  //   } else {
  //     // 否则将它添加到 checkers 列表中等待后续检查
  //     this[_checkers].set(deferred.promise, { type: "while", deferred, state });
  //   }
  //   return deferred.promise;
  // }

  until(state) {
    const deferred = defer();
    if (state === this[_state]) {
      // 如果当前状态就是 until 状态， until 的 deferred 结束
      deferred.resolve(this[_state]);
    } else {
      // 否则将它添加到 checkers 列表中等待后续检查
      this[_checkers].set(deferred.promise, { type: "until", deferred, state });
    }
    return deferred.promise;
  }

  delete(promise) {
    this[_checkers].delete(promise);
  }

  deleteAll() {
    this[_checkers].clear();
  }
}
// 实现
const lucky = new Signal();

const timerID = setInterval(() => {
  const num = Math.ceil(Math.random() * 10);
  console.log(num);
  lucky.state = num;
}, 1000); // 模拟系统产生的幸运数字

async function addLuckyBoy(name, num) {
  await lucky.until(num);
  console.log(`${name} is lucky boy!`);
  clearInterval(timerID);
  lucky.deleteAll(); // 删除checkers中的所有promise对象
}

addLuckyBoy("张三", 3);
addLuckyBoy("李四", 5);
addLuckyBoy("王五", 7);

// 我们采用了until的信号模式：每个用户手持自己的幸运数字，直到其中一个用户的数字和系统给出的数字相符的时候，暂停定时器，并将这个用户的deferred对象resolve，同时将其他没有中签的用户的deferred对象从集合中删除。这样我们的幸运者就被选出
