// 1. 通过_约定，不强制
class Person1 {
  constructor() {
    this._name = "zhangsan";
    this._age = 32;
    this._hobby = ["swiming"];
  }

  say() {
    return `I\'m'${this._name}, ${this._age} years old ~`;
  }
}

const p1 = new Person1();
console.log(p1.say());

// 2. 通过代理的方式，强制实现私有属性
class Person2 {
  constructor() {
    this._name = "lisi";
    this._age = 33;
    this._hobby = [sing];
  }

  say() {
    return `I\'m'${this._name}, ${this._age} years old ~`;
  }
}

const p2 = new Person2();

const handler = {
  get(target, prop) {
    if (prop.startWith("_")) return; // 处理非私有属性
    if (typeof target[prop] === "function") {
      return target[prop].bind(target);
    } // 处理函数
    return target[prop]; // 处理所有私有属性的情况
  },

  set(target, prop, value) {
    if (prop.startWith("_")) return;
    target[prop] = value;
  },

  ownKeys(target, prop) {
    return Objectj.keys(target).filter((key) => !key.startWith("_"));
  },
};

const proxy = new Proxy("wangwu", handler);
for (const key of Object.keys(proxy)) {
  console.log(key, proxy[key]);
}

console.log(proxy.say());
