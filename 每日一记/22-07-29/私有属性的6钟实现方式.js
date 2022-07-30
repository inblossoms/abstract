// 1. 通过_约定，不强制
class Person1 {
  constructor() {
    this._name = "zhangsan";
    this._age = 32;
    this._hobby = ["swiming"];
  }

  say() {
    return `I\'m ${this._name}, ${this._age} years old ~`;
  }
}

const p1 = new Person1();
console.log(p1.say());

// 2. 通过代理的方式，强制实现私有属性
class Person2 {
  constructor() {
    this._name = "lisi";
    this._age = 33;
    this._hobby = ["sing"];
  }

  say() {
    return `I\'m ${this._name}, ${this._age} years old ~`;
  }
}

const p2 = new Person2();
// console.log(p2);

const handler = {
  get(target, prop) {
    if (prop.startsWith("_")) return; // 处理访问属性为私有属性时将不可被访问
    if (typeof target[prop] === "function") {
      return target[prop].bind(target);
    } // 处理函数
    return target[prop]; // 处理其他属性的情况
  },

  set(target, prop, value) {
    if (prop.startWith("_")) return;
    target[prop] = value;
  },

  ownKeys(target, prop) {
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
};

const proxy = new Proxy(p2, handler);

for (const key of Object.keys(proxy)) {
  console.log(key, proxy[key]);
}

console.log(proxy._age); // 被约定的属性，被拦截处理后将不能被访问
console.log(proxy.say());

// 3. 通过symbol实现私有 （但也并非完全私有）
const nameSymbol = Symbol("name");
const ageSymbol = Symbol("age");

class Person3 {
  constructor() {
    this[nameSymbol] = "zhaoliu";
    this[ageSymbol] = 31;
    this._hobby = ["swiming"];
  }

  say() {
    return `I\'m ${this.nameSymbol}, ${this.ageSymbol} years old ~`;
  }
}

const p3 = new Person3();
console.log(Object.keys(p3));

// 我们可以通过一个Symbol相关的方法获取到被Symbol定义的属性
// console.log(Object.getOwnPropertySymbols(p3));
const [s1, s2] = Object.getOwnPropertySymbols(p3);
console.log(s1, s2);

// Tip 我们在通过symbol定义时是挂在this上被访问到的
// 4. 现在我们避免挂在this上，通过map的方式来实现一下
// const
