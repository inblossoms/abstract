/** @format */

// 栈结构：先进后出，后进先出

// NOTICE 数组本身就实现了一部分栈的特性，通过数组的方式快速实现站对象。
class Stack_Ary {
  protected _stack: any[]
  constructor() {
    this._stack = []
  }

  push(node: unknown) {
    this._stack.push(node)
  }
  pop() {
    this._stack.pop()
  }
  peek() {
    return this._stack[this._stack.length - 1]
  }
  isEmpty() {
    return this._stack.length === 0
  }
  clear() {
    this._stack = []
  }
}

const stack = new Stack_Ary()
stack.push({ name: 'zhangsan', mex: 'male' })
// console.log(stack)

// FIXME 类内部的原型属性类型问题未能解决
// 以对象字面量的方式来作为数据结构的基础：
interface Istack<T> {
  _data: Record<number, any>
  push(node: T): void
  pop(): T | undefined
  peak(): T
}

class Stack_Obj<T> implements Istack<T> {
  #length: number
  _data: symbol
  constructor() {
    this._data = Symbol('Stack')
    this[this._data][this.#length] = {}
    this.#length = 0
  }

  push(node: unknown) {
    this[this._data][this.#length] = node
    this.#length++
  }
  pop(): number {
    if (this.isEmpty()) return null
    this.#length--
    const res = this[this._data][this.#length]
    delete this[this._data][this.#length]
    return res
  }
  // 获取栈顶
  peek() {
    if (this.isEmpty()) return null
    return this[this._data][this.#length - 1]
  }
  isEmpty(): boolean {
    return this.#length === 0
  }
  clear() {
    this[this._data] = {}
    this.#length = 0
  }
}

// FIXME 模拟生成栈的函数的存在问题
// 以栈的方式 实现10进制直钻换为2 | 8 | 16 进制的函数
function converter(num: number, bs: number): number {
  const stack = new Stack_Ary()
  const digits = '01234567890ABCDEF'
  let res = ''

  while (num > 0) {
    stack.push(num % bs)

    num = Math.floor(num / bs)
  }

  while (!stack.isEmpty()) res += digits[stack.pop()]
  return res
}
