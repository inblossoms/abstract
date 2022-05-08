"use strict";
/** @format */
// 堆结构是树的一种，日常中我们相对来说更常用二叉堆（二叉堆能够实现优先级队列）。
// 父节点和左右子节点的对应管事是：若：父节点当前行为K 那么左右子节点可分别用 2K+1 和 2K+2来表示
class BinaryHeap {
    constructor(compare, array) {
        this.compare = compare;
        if (array) {
            this.heap = array;
            this.size = this.heap.length;
            this.buildHeap();
        }
    }
    // 判断是否为空
    isEmpty() {
        return this.size == 0;
    }
    // 通过子节点下标，获取节点的父节点
    parentIndex(i) {
        return Math.floor((i - 1) / 2);
    }
    parent(i) {
        return this.heap[this.parentIndex(i)];
    }
    leftIndex(i) {
        return 2 * i + 1;
    }
    // 通过父节点下标，获取父节点的左边子节点
    left(i) {
        return this.heap[this.leftIndex(i)];
    }
    rightIndex(i) {
        return 2 * i + 2;
    }
    // 通过父节点获取父节点的右边子节点
    right(i) {
        return this.heap[this.rightIndex(i)];
    }
    // 节点交换换
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    // 插入节点
    push(node) {
        if (this.size === 0) {
            this.size++;
            this.heap[0] = node;
            return;
        }
        this.size++;
        let i = this.size - 1;
        this.heap[i] = node;
        // 当数据存在并且满足小顶堆的情况下 进行节点交换，并记录当前节点行位置
        while (i != 0 && this.compare(this.heap[i], this.parent(i))) {
            this.swap(i, this.parentIndex(i));
            i = this.parentIndex(i);
        }
    }
    // 无论是删除元素，或者说构建二叉堆，都需要重新排序，封装统一的方法来支持排序过程，
    // 叶子节点不会调用此方法
    // 向下调整
    heapify(i) {
        // 找到最小的元素
        const l = this.leftIndex(i);
        const r = this.rightIndex(i);
        const prv = this.heap[i], lv = this.heap[i], rv = this.heap[i];
        let small = i;
        if (l < this.size && this.compare(lv, prv))
            small = l;
        if (r < this.size && this.compare(rv, this.heap[small]))
            small = r;
        if (small != i) {
            this.swap(i, small);
            this.heapify(small);
        }
    }
    // 删除堆顶元素
    pop() {
        if (this.size <= 0) {
            return null;
        }
        if (this.size == 1) {
            let node = this.heap[this.size - 1];
            this.size--;
            this.heap.length = this.size;
            return node;
        }
        const root = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.size--;
        this.heap.length = this.size;
        this.heapify(0);
        return root;
    }
    // 获取堆顶元素
    top() {
        return this.heap[0];
    }
    // 构建堆，从最后一个非叶子节点开始遍历构建
    buildHeap() {
        for (let i = this.parentIndex(this.size - 1); i >= 0; i--) {
            this.heapify(i);
        }
    }
}
// 比较函数：小顶堆
function compare(a, b) {
    return a < b;
}
var heap = new BinaryHeap(compare);
heap.push(1);
heap.push(2);
heap.push(3);
heap.push(4);
heap.push(5);
console.log(heap.heap); // [1, 2, 3, 4, 5]
heap.pop();
console.log(heap.heap); // [2, 4, 3, 5]
var array = [150, 80, 40, 30, 10, 70, 110, 100, 20, 90, 60, 50, 120, 140, 130];
var h = new BinaryHeap(compare, array);
console.log(h.heap); // [10, 20, 40, 30, 60, 50, 110, 100, 150, 90, 80, 70, 120, 140, 130]
// 除此之外在实践中，参与比较的可能并非节点本身，而是节点的某个字段
const ary = [
    { name: 'Jake', id: 29 },
    { name: 'Toms', id: 22 },
    { name: 'Jone', id: 40 },
];
function _compare(a, b) {
    return a.id > b.id;
}
