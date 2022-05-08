"use strict";
/** @format */
let queue = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
};
//  队列对象的基本代码结构如下：
class Queue {
    constructor() {
        this.length = 0;
        this.queue = {};
    }
    // 从队列尾巴入队
    push(node) {
        this.queue[this.length] = node;
        this.length++;
        return this.queue;
    }
    // 从队列头部出队
    shift() {
        const target = this.queue[0];
        for (let i = 0; i < this.length - 1; i++) {
            this.queue[i] = this.queue[i + 1];
        }
        delete this.queue[this.length - 1]; // 出队后，所有值前移 所以末位值需要去掉
        this.length--;
        return target;
    }
    // 特殊情况的插队处理，在 idx 位置前插入
    insert(idx, node) {
        this.length++;
        for (let k = this.length - 1; k > idx; k--) {
            this.queue[k] = this.queue[k - 1];
        }
        this.queue[idx] = node;
        return this.queue;
    }
    // 特殊情况的离队处理，可以在队列的任意位置离队
    out(idx) {
        const target = this.queue[idx];
        this.length--;
        for (let k = idx; k < this.length; k++) {
            this.queue[k] = this.queue[k + 1];
        }
        delete this.queue[this.length - 1]; // 当参数离队后 数据前移 删除末位
        this.length--;
        return target;
    }
    // 清空队列
    clear() {
        this.length = 0;
        this.queue = {};
    }
}
/***
 * 运用到实践中时，可能还会新增更多额外的处理方式，例如：
 * - 判断某个成员书否在队列内
 * - 由于紧急情况，成员需要在队列中处于挂起状态去处理别的事情，激活之后不需要重新排队，而是直接处于队列的原有位置「如果队列往前移动了，也跟着移动，始终不出队」
 * - 按照优先级排队，始终让优先级最高的队列成员，处于队首。因此这种情况之下，任何队列成员的变动都需要重新排序，确保队首的成员优先级最高，我们上一章节学习过的二叉堆，就可以实现这种优先级队列
*/
// 思考：
// 10 个员工处理 1000+ 个来访客户的业务。这 1000+ 个客户会在一天内的不同时间陆续来访。那么如何利用队列的思维，来保证来访者的公平性「先到先处理」，以及保证来访任务的相对合理分配?
