"use strict";
// TS 常见内置高级类型
function test() {
    console.log(this.name);
}
function t(age) {
    console.log(this.name);
    return this.name + " " + age + "years old";
}
