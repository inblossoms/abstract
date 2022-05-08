/** @format */

// NOTICE 队列：先进先出
/***
 * 队列实践：
 * 1. 从队列最后入队
 * 2. 从队列头部出队
 * 3. 从队列任意位置离队（其他事情）
 * 4. 从队列任意位置插队（特殊权利）
 * 5. 清空队列
 */
type queue = {
  0: string
  1: string
  2: string
  3: string
}

let queue: queue = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
}

//  队列对象的基本代码结构如下：
class Queue {
  queue: Record<number, any>
  length: number
  constructor() {
    this.length = 0
    this.queue = {}
  }

  // 从队列尾巴入队
  push(node: unknown) {
    this.queue[this.length] = node
    this.length++
    return this.queue
  }
  // 从队列头部出队
  shift() {
    const target = this.queue[0]
    for (let i = 0; i < this.length - 1; i++) {
      this.queue[i] = this.queue[i + 1]
    }
    delete this.queue[this.length - 1] // 出队后，所有值前移 所以末位值需要去掉
    this.length--
    return target
  }
  // 特殊情况的插队处理，在 idx 位置前插入
  insert(idx: any, node: any) {
    this.length++
    for (let k = this.length - 1; k > idx; k--) {
      this.queue[k] = this.queue[k - 1]
    }
    this.queue[idx] = node
    return this.queue
  }
  // 特殊情况的离队处理，可以在队列的任意位置离队
  out(idx: number) {
    const target = this.queue[idx]
    this.length--
    for (let k = idx; k < this.length; k++) {
      this.queue[k] = this.queue[k + 1]
    }
    delete this.queue[this.length - 1]
    this.length--
    return target
  }

  // 清空队列
  clear() {
    this.length = 0
    this.queue = {}
  }
}
