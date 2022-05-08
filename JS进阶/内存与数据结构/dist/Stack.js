"use strict";
/** @format */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Stack_Obj_length;
// 栈结构：先进后出，后进先出
// NOTICE 数组本身就实现了一部分栈的特性，通过数组的方式快速实现站对象。
class Stack_Ary {
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
const stack = new Stack_Ary();
stack.push({ name: 'zhangsan', mex: 'male' });
class Stack_Obj {
    constructor() {
        _Stack_Obj_length.set(this, void 0);
        this._data = Symbol('Stack');
        this[this._data][__classPrivateFieldGet(this, _Stack_Obj_length, "f")] = {};
        __classPrivateFieldSet(this, _Stack_Obj_length, 0, "f");
    }
    push(node) {
        var _a;
        this[this._data][__classPrivateFieldGet(this, _Stack_Obj_length, "f")] = node;
        __classPrivateFieldSet(this, _Stack_Obj_length, (_a = __classPrivateFieldGet(this, _Stack_Obj_length, "f"), _a++, _a), "f");
    }
    pop() {
        var _a;
        if (this.isEmpty())
            return null;
        __classPrivateFieldSet(this, _Stack_Obj_length, (_a = __classPrivateFieldGet(this, _Stack_Obj_length, "f"), _a--, _a), "f");
        const res = this[this._data][__classPrivateFieldGet(this, _Stack_Obj_length, "f")];
        delete this[this._data][__classPrivateFieldGet(this, _Stack_Obj_length, "f")];
        return res;
    }
    // 获取栈顶
    peek() {
        if (this.isEmpty())
            return null;
        return this[this._data][__classPrivateFieldGet(this, _Stack_Obj_length, "f") - 1];
    }
    isEmpty() {
        return __classPrivateFieldGet(this, _Stack_Obj_length, "f") === 0;
    }
    clear() {
        this[this._data] = {};
        __classPrivateFieldSet(this, _Stack_Obj_length, 0, "f");
    }
}
_Stack_Obj_length = new WeakMap();
// FIXME 模拟生成栈的函数的存在问题
// 以栈的方式 实现10进制直钻换为2 | 8 | 16 进制的函数
function converter(num, bs) {
    const stack = new Stack_Ary();
    const digits = '01234567890ABCDEF';
    let res = '';
    while (num > 0) {
        stack.push(num % bs);
        num = Math.floor(num / bs);
    }
    while (!stack.isEmpty())
        res += digits[stack.pop()];
    return res;
}
