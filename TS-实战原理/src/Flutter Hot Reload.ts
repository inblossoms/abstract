// 协变
interface Persons {
  name: string;
  age: number;
}

interface ZhangSan {
  name: string;
  age: number;
  hobbies: string[];
}

let person: Persons = {
  name: '',
  age: 20,
};

let zhangsan: ZhangSan = {
  name: 'zhangSan',
  age: 22,
  hobbies: ['sun', 'water'],
};

person = zhangsan;

// 逆变

let printHobbies: (zhangsan: ZhangSan) => void;

printHobbies = (zhangsan) => {
  console.log(zhangsan.hobbies);
};

let printName: (person: Persons) => void;

printName = (person) => {
  console.log(person.name);
};

//NOTICE ZhangSan作为Person的子类型，这里是否可以将printHobbies 赋值给 printName ?

// 1. 函数调用时是按照ZhangSan来约束类型，但函数实际上只用到了父类型Person的属性和方法。
printHobbies = printName;
// 2. 函数的声明是通过Person来约束的，但调用的时候是按照ZhangSan的类型访问的属性和方法，类型就不安全了，所以会报错。
// printName = printHobbies;

// NOTICE 在TS2.x之前支持这种方式的赋值，也就是父类型可以赋值给子类型，子类型可以赋值给父类型，及逆变又协变：叫做 双向协变。

interface P {
  name: string;
  age: number;
}

const p: P = {
  name: 'lisi',
  age: 20,
};

// zhangsan = p; // 不变：类型不一
