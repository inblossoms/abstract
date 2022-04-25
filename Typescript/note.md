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
>