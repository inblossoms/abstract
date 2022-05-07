"use strict";
/** @format */
// 栈结构：先进后出，后进先出
// NOTICE 数组本身就实现了一部分栈的特性，通过数组的方式快速实现站对象。
class Stack {
    constructor() {
        this._stack = [];
    }
    push(node) {
        this._stack.push(node);
    }
    pop() {
        this._stack.pop();
    }
    peek() {
        return this._stack[this._stack.length - 1];
    }
    isEmpty() {
        return this._stack.length === 0;
    }
    clear() {
        this._stack = [];
    }
}
const stack = new Stack();
stack.push({ name: 'zhangsan', mex: 'male' });
console.log(stack);
