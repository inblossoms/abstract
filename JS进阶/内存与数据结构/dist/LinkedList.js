"use strict";
/** @format */
// 从性能的角度去考虑，访问某个成员数组远远由于链表，而如果新增、删除元素，链表远远优于数组（因为空间的不连续性，新建节点不需要任何成员让位置）。
// 单向链表: 引入索引位置的概念实现链表的部分功能
// NOTICE 一旦涉及到位置信息，都需要进行遍历处理，这也是链表在索引位置上的弊端 （双向链表的实现在单向的基础上 额外多处理一个prev的引用）
class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null; // 链表首部节点
    }
    // 约定此时的节点格式
    createNode(number) {
        return {
            num: Number,
            next: null,
        };
    }
    push(number) {
        const node = this.createNode(number);
        if (!this.head) {
            this.head = node;
            this.length++;
            return node;
        }
        let current = this.head;
        // 此处的节点处理是关键，从头部开始遍历，只要还能找到下一个，说明就还不是最后一个，直到最后找不到了，就表示 current 指向了最后的节点
        while (current.next) {
            current = current.next;
        }
        current.next = node;
        this.length++;
        return node;
    }
    // 根据索引位置，插入新节点：默认此处传入的 idx 值>=0,小于length
    insert(idx, number) {
        const node = this.createNode(number);
        let current = this.head, curIdx = 0, prevNode = null;
        if (idx === 0) {
            // 处理当前索引可能为首部节点的情况
            node.next = current;
            this.head = node;
            return node;
        }
        // 找到 idx 对应的节点
        while (current++ < idx) {
            prevNode = current;
            current = current.next;
        }
        // 当前节点指向新增节点
        node.next = current;
        //  新增节点指向下一个节点
        prevNode.next = node;
        this.length++;
        return node;
    }
    // 找到节点所在位置
    indexOf(number) {
        let index = -1, curIdx = -1, current = this.head;
        //直到找到最后一个节点
        while (current) {
            index++;
            if (current.num === number) {
                curIdx = index;
                break;
            }
            current = current.next; // 循环中不存在是 置于末尾
        }
        return curIdx; // 返回的是 找到后或者是循环结束后没有找到 最后的得到的位置
    }
    // 根据索引位置，删除节点，默认值idx值是合理的
    remove(idx) {
        let prevNode = null, current = this.head, curIdx = 0;
        if (idx === 0) {
            const rmNode = current;
            this.head = current.next;
            return rmNode;
        }
        // 寻找目标
        while (curIdx++ < idx) {
            prevNode = current;
            current = current.next;
        }
        // 被删除的节点
        const rmNode = current;
        prevNode.next = current.next;
        this.length--;
        return rmNode;
    }
}
// NOTICE 思考：需要排序的应用场景「例如我之前章节中实现的二叉堆」，适合用链表来实现吗？为什么？
