"use strict";
/** @format
 * auth: lrx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = void 0;
// 引用类型的实践场景
// 1. 纯函数
// 2. 拷贝和比较
// ckone
/**
 * auth: lrx
 * desc: 判断一个值的具体数据类型
 */
function type(value) {
    return Object.prototype.toString
        .call(value)
        .split(' ')[1]
        .slice(0, -1)
        .replace(/^[A-Z]{1}/, (i) => i.toLowerCase());
}
/**深拷贝*/
function deepClone(target) {
    let res = null;
    if (type(target) === 'array') {
        res = [];
        target.forEach((e) => {
            res.push(type(e));
        });
    }
    if (type(target) === 'object') {
        res = {};
        Object.keys(target).forEach((e) => {
            res[e] = deepClone(target[e]);
        });
    }
    //  如果需要完善后运用于生产环境，则需要在继续分别考虑各种其他数据类型，例如基础数据类型，函数，Map，并分别处理等
    return (res = target);
}
exports.deepClone = deepClone;
// 不可变数据集
// 我们在函数式编程的实践中，往往期望引用数据类型也具备基础数据类型不可变的特性，这样能使开发变得更加简单，状态可回溯，测试也更加友好。因此在开发中探索不可变数据集，是必不可少的行为。
// NOTICE 思考：基础数据类型为何是不可变数据
