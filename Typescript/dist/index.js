"use strict";
const arr = [1, "a"]; // const arr: Tuple = [1, "a", 3, 4, "b"]
class Person {
    constructor() {
    }
}
const obj = {
    name: "zhangsan",
    age: 99,
    sex: "male"
};
const func = (name) => {
    return "hello " + name;
};
function createPerson(ctor) {
    return new ctor("zhangsan", 99);
}
const Obj = {};
Obj.name = "zhangsan";
console.log(Obj.age = 99);
// 枚举Enum：是一系列值的集合
var Transpiler;
(function (Transpiler) {
    Transpiler["name"] = "zhangsan";
    Transpiler[Transpiler["age"] = 88] = "age";
    Transpiler["sex"] = "male";
})(Transpiler || (Transpiler = {}));
const transplier = Transpiler.name;
// 字符串的字面量：模板字面量 - xx${string} 以 xx 开头的，后面是任意string的字符串字面量
function fun(str) {
    return str;
}
// console.log(fun("aaa"));
console.log(fun("#adf"));
const u = 1;
let obj1 = {
    name: "asdf"
};
class One {
    constructor() {
        this.name = "zhangsan";
    }
    say() {
        return `hello ${this.name}`;
    }
}
const per = new One();
per.name;
per.say();
