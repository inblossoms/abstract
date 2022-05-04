// 函数重载的三种方法:
// 1. 声明两个同名函数达到重载的目的 也就是说同名的函数可以有多种类型的定义。

declare function func(name: string): string
declare function func(name: any): any

// func()// Test

// 2. 函数可以用interface的方式声明，同样也可以用interface的方式声明函数重载
interface Func {
  (name: any): any
  (name: string): string
}
declare const func1: Func
// func1() // Test

// 3. 函数可以去交叉类型，也就是多种类型都可以；可用于函数重载
type Func2 = ((name: string) => string) & ((name: any) => any)

declare const func2: Func2
// func2() // Test

// 复杂类型实例：
// UnionToTuple : 联合类型转元组 'a'|'b"|'c'  => ['a','b','c']

