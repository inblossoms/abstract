// TS 中有三中可以用于申明任意类型的关键字：type infer 类型参数(他们在严格意义上不能被称为变量，因为他们不能被赋值)

// type： 类型别名 通过type申明一个变量来存储某个类型
type t = Promise<number>

// infer： 类型提取 然后存到一个变量里，等同于局部变量
type getVal<P> = P extends Promise<infer value>
	? value
	: never

// 类型参数 用于接受具体的类型，在类型运算中也想当于局部变量
type isTwo<T> = T extends 2 ? true : false


// 重新构造
// 数组类型的重新构造
// push
type tuple = [1, 2, 3]
// 类型变量不支持修改，通过构造新的元组类型
type Push<Arr extends unknown[], e> = [...Arr, e]
type pushRes = Push<[4, 5, 6], 1>

// Unshift
type Unshift<Arr extends unknown[], e> = [...Arr, e]
type unshift = Unshift<[1, 2, 3], 5>

// zip
type Zip<One extends unknown, Other extends unknown> =
	One extends [infer OneFirst, ...infer OneSecond]
	? Other extends [infer OtherFirst, ...infer OtherSecond]
	? [[OneFirst, OtherFirst], ...Zip<OneSecond, OtherSecond>] : []
	: [];

type zip = Zip<["a", "b", "c", "d"], [1, 2, 3, 4, 5]>

// 字符串类型 
// caplitalizeStr
type CaplitalizeStr<Str extends string> =
	Str extends `${infer first}${infer Res}${infer Other}` ?
	`${Uppercase<first>}${Res}-${Other}` : Str

type caplitalizeStr = CaplitalizeStr<"adfasfasfd">


// camelCase
// a_bc_de -- > aBcDe
type CamleCase<Str extends string> =
	Str extends `${infer left}_${infer right}${infer Res}`
	? `${left}${Uppercase<right>}${CamleCase<Res>} `
	: Str

type camelCase = CamleCase<"a_bc_de">


// dropSubStr
type DropSubStr<Str extends string, subStr extends string> =
	Str extends `${infer pre}${subStr}${infer Res}`
	? `${pre}${DropSubStr<Res, subStr>}`
	: Str

type dropSubStr = DropSubStr<"day day up!!!~", "~">

// 函数类型
// appendArgument
type AppendArgument<F extends Function, arg> =
	F extends (...arg: infer Args) => infer RetType
	? (...arg: [...Args, arg]) => RetType : never

type appendArgument = AppendArgument<(name: string) => unknown, number>

// 索引类型
// uppercaseKey
type UppercaseKey<obj extends object> = {
	[k in keyof obj as Uppercase<k & string>]: obj[k]
}

type uppercaseKey = UppercaseKey<{ a: 12, b: 34 }>

// record  TS内置的高级指令 Record 用于创建索引类型
// type record<k extends string | number | symbol, T> = { [i in k]: T; }

type UppercaseKey1<obj extends Record<string, any>> = {
	[k in keyof obj as Uppercase<k & string>]: obj[k]
}

// toReadonly: 将对象内部的所有属性转换成只读属性
type ToReadonly<T> = {
	readonly [k in keyof T]: T[k]
}

type toReadonly = ToReadonly<{
	name: "luky",
	age: 23
}>

// toPartial
type ToPartial<T> = {
	[k in keyof T]?: T[k]
}

type toPartial = ToPartial<{
	name: string,
	age: number
}>

// toMutable
type ToMutable<T> = {
	-readonly [k in keyof T]: T[k]
}

type toMutable = ToMutable<{
	readonly name: "lay",
	readonly age: 22
}>

// toReauired
type ToRequired<T> = {
	[k in keyof T]-?: T[k]
}

type toRequired = ToRequired<{
	name?: string,
	age?: number
}>


// filterByValueType
type FilterByValueType<obj extends Record<string, any>, valType> = {
	[k in keyof obj
	as obj[k] extends valType
	? k
	: never]: obj[k]
}

interface Person {
	age: number,
	sex: string,
	hobby: string[]
}
type filterByValueType = FilterByValueType<Person, string | number>