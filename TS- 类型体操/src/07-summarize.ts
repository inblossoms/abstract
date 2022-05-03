// 模式匹配做提取 对于字符串类型可以通过正则提取子串一样，TS可以通过匹配
// 提取函数类型的返回值
type getFunToType<fn extends Function> =
	fn extends () => infer RetType ? RetType : never

type fnType = getFunToType<() => string>

// 重新构造做变换：TS通过type声明变量，通过infer声明局部变量，类型参数在类型编程中也相当于局部变量，但类型参数不可修改，想对类型做变换需要构造一个新的类型，在构造过程中做过滤和转换。
// 把索引变成大写
type UppercaseKeyType<obj extends Record<string, any>> =
	{
		[k in keyof obj as Uppercase<k & string>]: obj[k]
	}

type uppercaseKeyType = UppercaseKeyType<{
	name: "zhangsan",
	age: 99
}>


// 递归复用做循环
// 遇到数量不确定的问题就要条件反射的想到通过递归的方式每次值处理一个类型，直到满足结束条件。
// 将长度不确定的字符串类型转换成联合类型
type StrToUnion<Str extends string> =
	Str extends `${infer first}${infer args}`
	? first | StrToUnion<args>
	: never

type strToUnion = StrToUnion<'asdf'>

// 数组长度做计数
// TS中没有加减乘除运算符，可以通过构造不同的数组再获取数组的长度来得到响应的结果。目的：将数值运算转换为数组类型的构造和提取。
// 实现减法
type BuildAry<
	Length extends number,
	e = unknown,
	RetAry extends unknown[] = []
	> =
	RetAry['length'] extends Length
	? RetAry : BuildAry<Length, e, [...RetAry, e]>

type Subtract1<x extends number, y extends number> =
	BuildAry<x> extends [...X: BuildAry<y>, ...Y: infer result] ? result['length'] : never

type subtract1 = Subtract1<33, 22>


// 联合分散化简
// Ts对于联合类型：1. 当遇到字符串的时候或者作为类型参数出现在条件类型左边时，会分散成单个的类型传入计算，最后把计算结果合并为联合类型。
type union1 = 'a' | 'b' | 'c'
type UppercaseC<i extends string> =
	i extends 'c' ? Uppercase<i> : i

type uppercaseToC = UppercaseC<union1>

// 特殊特性要记清
// 1. any 和任意类型交叉都为 any，可以用于判断是否any类型：
type IsAny1<T> = 'asdf' extends ("agfhd" & T) ? true : false
type isAny1 = IsAny1<any>

type IsIndexSignatrue<obj extends Record<string, any>> =
	{
		[k in keyof obj
		as k extends `${infer Str}` ? Str : never
		]: obj[k]
	}

type isIndexSignatrue = IsIndexSignatrue<{
	[key: string]: any
	sleep(): void
	fn?: Function
}>

// 基础扎实套路熟，类型体操可通关
// parseQueryString 的类型例子，用来说明类型编程的复杂度。
type res1 = ParsequeryString<"a=1&b=2&c=3">
type res2 = ParsequeryString<'adsf'>


type ParsequeryString<Str extends string> =
	Str extends `${infer first}&${infer args}`
	? MergerParams<ParseParam<first>, ParsequeryString<args>>
	: ParseParam<Str>

type ParseParam<Str extends string> =
	Str extends `${infer key}=${infer value}`
	? {
		[k in key]: value
	} : Record<string, any>
type parseParam = ParseParam<'z=1'> // 测试

type MergerParams<
	obj extends Record<string, any>,
	retObj extends Record<string, any>
	> =
	{
		readonly [
		key in keyof obj | keyof retObj
		]:
		key extends keyof obj
		? key extends keyof retObj ? MergeValues<obj[key], retObj[key]> : obj[key]
		: key extends keyof retObj ? retObj[key] : never
	}
type mergerParams = MergerParams<
	{ a: 1 }, { b: 2 }
>

type MergeValues<o, ret> =
	o extends ret
	? o
	: ret extends unknown[] ? [o, ...ret] : [o, ret]
type merge = MergeValues<{ a: 1 }, { a: 1 }> // 测试
