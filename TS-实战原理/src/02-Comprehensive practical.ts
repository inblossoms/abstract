// 函数重载的三种方法:
// 1. 声明两个同名函数达到重载的目的 也就是说同名的函数可以有多种类型的定义。

declare function func(name: string): string;
declare function func(name: any): any;

// func()// Test

// 2. 函数可以用interface的方式声明，同样也可以用interface的方式声明函数重载
interface Func {
  (name: any): any;
  (name: string): string;
}
declare const func1: Func;
// func1() // Test

// 3. 函数可以去交叉类型，也就是多种类型都可以；可用于函数重载
type Func2 = ((name: string) => string) & ((name: any) => any);

declare const func2: Func2;
// func2() // Test

// 复杂类型实例：
// NOTICE 取重载函数的ReturnType返回的是最后一个重载的返回值类型
// UnionToTuple : 联合类型转元组 'a'|'b"|'c'  => ['a','b','c']

type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToFuncIntersection<T> = UnionToIntersection<
  T extends any ? () => T : never
>;
// 返回交叉类型 达到函数重载的目的
type UnionToFuncIntersectionRes = UnionToFuncIntersection<'zhang' | 'san'>;
// 通过 ReturnType 取返回值类型
type ReturnTypeRes = ReturnType<UnionToFuncIntersectionRes>;
// 获取到最后一个类型，通过Exclude从联合类型中将其去掉，然后通过同样的方式获取‘最后一个值’，构成元组类型返回。
type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer ReturnType
  ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
  : [];
type UnionToTupleRes = UnionToTuple<'a' | 'b' | 'c'>;
