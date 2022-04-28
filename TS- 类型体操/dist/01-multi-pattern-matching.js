"use strict";
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
