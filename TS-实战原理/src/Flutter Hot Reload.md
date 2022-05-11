## 原理篇

> - Ts 给 Js 添加了一套静态类型系统为了保证类型安全，也就是保证变量只能赋同类型的值，对象只能访问它包含的属性类和方法。

### 类型安全和型变

> - 由于类型安全限制不能太死板，部分时候需要变通，例如：子类型是可以赋值给父类型的变量的，可以完全当成父类型使用，也就是‘型变’。

#### 协变：子类型可以赋值给父类型 covariant

```Ts
interface Person {
  name: string;
  age: number;
}

interface ZhangSan {
  name: string;
  age: number;
  hobbies: string[];

// ZhangSan 作为 Person 的子类型更为具体，那么 zhangsan 类项变量就可以赋值给 Person
let person: Person = {
	name: '',
	age: 20
}
let zhangsan: ZhangSan = {
	name: 'zhangSan',
	age: 22,
	hobbies: ['play game','writing']
}
person = zhangsan
```

#### 逆变：父类型可以赋值给子类型 contravariant

```ts
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
printName = printHobbies;

// NOTICE 在TS2.x之前支持这种方式的赋值，也就是父类型可以赋值给子类型，子类型可以赋值给父类型，及逆变又协变：叫做 双向协变。
```

#### **在类型编程中这种逆变性质的作用：**

```ts
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToIntersectionRes = UnionToIntersection<{ x: 1 } | { y: 2 }>;

/**
 * 这里通过构造多个函数类型，然后模式提取参数类型的方式来实现联合转交叉，这就是因为：函数是逆变的，会返回联合类型的几个类型的子类型，也就是更为具体的交叉类型。
 */
```

#### **不变：非父子类型之间不会发生型变，只要类型不同就会报错 invariant**

```ts
interface P {
  name: string;
  age: number;
}

const p: P = {
  name: 'lisi',
  age: false,
};

zhangsan = p; // 类型不一
```

#### **类型父子关系的判断**

> 像 java 里面的类型都是通过 extends 继承的，如果 A extends B，那 A 就是 B 的子类型。这种叫做名义类型系统（nominal type）。
> 而 ts 里不看这个，只要结构上是一致的，那么就可以确定父子关系，这种叫做结构类型系统（structual type）。

```ts
// 引用协变的例子
...
person = zhangsan
// NOTICE person 和zhangsan 怎样确认的父子关系（并没有extends） 的？
// 通过结构：更具体的那个是子类型。
```
