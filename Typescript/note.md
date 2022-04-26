### TypeScript
> 类型断言  一下两中是等效的
- const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement
- const myCanvas =<HTMLCanvasElement> document.getElementById("main_canvas")

> 文字类型
testString : 可以表示任何可能类型的字符串 可以对同一变量重复定义
- eg: let testString = "Hello World";

constantString : 只能表示一个可能类型的字符串
- eg: const constantString = "Hello World"

```ts

function text(name: string, sxe: "male" | "female") {
	return {
		a: String
	}

}
text("zhagnsan", "female")

function numText(a: string, b: string): -1 | 0 | 1 {
	return a === b ? 0 : a > b ? 1 : -1
}

function handleRequest(url: string, method: "GET" | "POST") {

}
const req = {
	url: "https://baidu.com",
	method: "GET"
	// method: "GET" as "GET"
} as const

handleRequest(req.url, req.method)
```

> 枚举 ： （使用场景）确定数据需要被枚举 否则不需要使用他
- enum Direction {
	Up = 1,
	Down,
	Left,
	Right
}
console.log(Direction.Up) // 1

> 类型缩小： 常用于联合类型变量的场景
- funciton padLeft(padding: number|string, input: string): string{
}

> 使用类型谓词: pet is Fish -- parameterName is Type 通过函数的返回值判断是否为指定的类型谓词
- function isFish(pet: Fish | Bird): pet is Fish{
-  return (pet as Fish).swim !== undefined;
- }
```ts
type Fish = {
	name: string,
	swim: () => void
}

type Bird = {
	name: string,
	fly: () => void
}

function isFish(pet: Fish | Bird): pet is Fish {
	return (pet as Fish).swim !== undefined
}

function getSmallPet(): Fish | Bird {
	let fish: Fish = {
		name: "sharkey",
		swim: () => {

		}
	}

	let bird: Bird = {
		name: "sparrow",
		fly: () => {

		}
	}
	return true ? bird : fish;
}
```

> unions
- interface Circle {
	kind: "circle"
	radius? number;
}
- interface Square {
	kind: "square";
	sideLength? number
}
- type Shape = Circle | Square
- function getArea(shape: Shape){
  - switch(shape.kind){
    - case "circle":
		-	return Math.PI * shape.radius ** 2 

		- case "square":
		- return shape.sideLength ** 2
  - }
- }

> never 类型与穷尽性检查 -- never ： 不应该存在的状态

> 函数类型表达式
```ts
type GreetFun = (a: string) => void
function greeter(fn: GreetFun) {
	fn("hello world")
}// 参数fn：限定传进来的函数

function printToConsole(s: string) {
	console.log(s);
}

greeter(printToConsole)
```
> 调用签名
- type DescribableFunction = {
  - description: string;
  - (someArg: number): boolean;// 在参数列表和返回类型之间使用：而不是=>
- }

> 构造签名
- type SomeConstructor = {
  - new (s: string): Ctor; // 在参数列表和返回对象或者一个类前加一个new操作符，调用签名就变成了构造签名
- }
```ts
interface CallOrConstructor {
	new(s: string): Date
	(n?: number): number
}
function fun(date: CallOrConstructor) {
	let d = new date("2021-12-12")
	let n = date(2000)
}
```

> 泛型函数 两个值之间的对应关系,使输入和输出的值保持一致。
- function firstElement<Type>(arr: Type[]): Type | undefined {
	return arr[0]
}
```ts
function map<I, O>(arr: I[], fun: (arg: I) => O): O[] {
	return arr.map(fun)
}

const parsed = map(["1", "2", "3"], n => parseInt(n))
```

> 泛型函数- 限制条件
```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
	a.length >= b.length ? a : b
}

const longerArr = longest([1, 2, 3], [1, 2, 3, 3])
const longerStr = longest("asdf", "oiu")
const bad = longest(1, 2)
```
> 泛型函数- 指定类型参数
- const arr = Fun<string | number>([1,2,3], ["sads"]);

> 通用函数准则
> - 可能的情况下，使用类型参数本身，而不是对其进行约束
> - 尽可能少的使用类型参数
> - 如果一个类型的参数只出现在一个地方，就考虑是否真的需要该类型参数
> 回调中的可选参数
> - 当为回调写一个函数类型时，永远不要写一个可选参数，除非你打算在不传递该参数的情况下调用函数。

> 函数重载
> 在可能的情况下，我们应该总是倾向于使用联合类型的参数而不是重载参数。
- 重载签名 定义函数调用，并且在实现签名的函数中是不能调用重载签名里面的参数的，但实现时需要兼容
- function makeDate(timestamp: number): Date; 
- function makeDate(m: number, d: number, y: number): Date;
- 实现签名
- function makeDate(mOrtimestamp: number, d?: number, y?: number): Date{ .... }

> 其他类型
> - 基元类型：string number bigint boolean symbol null undefined
> - object: 指的是任何不是基元类型的值：不同于js中的{}、Object
> - unknown: 代表任何值，与any有些类似，但更安全。对未知unknown值做任何事情都是不合法的。
> - never: 表示永远都不会被观察到的值。当程序跑出一个错误时，那么该函数的返回值就是一个never类型。
> - Function: 全局性的类型的类型描述，定义了Function类型的值总是可以被调用，这些调用返回值的类型为： any

> 属性修改器
1. 可选属性  ?
2. 只读属性  readonly
3. 索引签名  interface idxName { [propsName: string]: string}

> 类型补充
1. 扩展类型 extends
2. 交叉类型 &

> 泛型对象类型
- interface Box<Type> { contents: Type }; -- let box: Box<string>
> 从类型中创建类型
- 泛型类型
  ```ts
  1. function identity<Type>(arg: Type): Type{ return arg } let output = identity<stirng>("myString")
  2. function identity<Type>(arg: Array<Type>): Type[]{ return arg } // 对泛型类型约束
	3. interface GenericIdentityFn{
		<Type>(arg: Type): Type;
	}
		 interface GenericIdentityFn<Type>{
			 (arg: Type): Type
		 }
		 let myIntentity: GenericIdentity<string> = identity
	```
- 泛型类
  ```ts
		class GenericNumber<NumType>{
			zeroValue: NumType;
			add: (x: NumType, y: NumType) => NumType;
		}

		const generic = new GenericNumber<string>()
		generic.zeroValue = "aaaa"
		generic.add = (a, b) => {
			return a + b
		}
	```
- 泛型约束
  ```ts
	interface lengthwise{
		length: number
	}
	function loggingIdentity<Type extends Lengthwise>(args: Type): Type{
		return arg.length
	}

	loggingIdenttity("adf")

	<!-- 泛型约束中使用类型参数 -->
	function getProp<T, K extends keyof T>(obj: T, key: K){
		return obj[key]
	}
	let obj = {
		name: "zhangsan",
		sex: "male",
		age: 99
	}

	getProp(obj, age)
	```
- 泛型中使用类类型
  ```ts
	function create<Type>(c: {new(): Type}): Type{
		return new c();
	}
	eg:
		class BeeKeeper {
			hasMask: boolean = true
		}
		class ZooKeeper {
			nameTag: string = "zhan"
		}
		class Animal {
			numlegs: number = 4
		}

		class Bee extends Animal {
			keeper: BeeKeeper = new BeeKeeper()
		}
		class Lion extends Animal {
			keeper: ZooKeeper = new ZooKeeper()
		}

		function createInstance<T extends Animal>(c: new () => T): T {
			return new c()
		}

		createInstance(Lion).keeper.nameTag
		createInstance(Bee).keeper.hasMask
		createInstance(Bee).numlegs
	```
- keyof类型操作符
  1. 
- typeof类型操作符
- 索引访问类型
- 条件类型
- 映射类型
- 模板字面量类型