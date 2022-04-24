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
