// 模式匹配
type p = Promise<"promise">
type GetValueType<P> = P extends Promise<infer Value> ? Value : never

type GetValueResult = GetValueType<Promise<"promise">>

// 模式匹配的应用
// 数组类型：提取数组的第一个元素
type arr = [1, 2, 3]
type getItem<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never

type ary = getItem<arr>
type ary1 = getItem<[]>

// popArr
type PopArr<Arr extends unknown[]> =
	Arr extends []
	? []
	: Arr extends [...infer R, unknown]
	? R
	: never

type Ary = PopArr<arr> // 截取出去原数组最后一个值所剩内容组成的数组
type Ary1 = PopArr<[]>

// shiftArr
type ShiftArr<Arr extends unknown[]> =
	Arr extends []
	? []
	: Arr extends [unknown, ...infer R]
	? R
	: never

type Ary3 = ShiftArr<arr>

// 字符串类型
// startWith
type StartWith<Str extends string, Perfix extends string> =
	Str extends `${Perfix}${string}` ? true : false

type startWithRes = StartWith<"day day up!", "day">
type startWithRes1 = StartWith<"day day up!", "asd">


// replace 实现字符串替换部分
type ReplaceStr<
	Str extends string,
	from extends string,// 替换对象
	to extends string //替换内容
	> =
	Str extends
	`${infer Perfix}${from}${infer Suffix}`
	? `${Perfix}${to}${Suffix}`
	: Str;

// 匹配时
type ReplaceRes = ReplaceStr<"day day up! day day up!", "up", "study">
// 不匹配时
type ReplaceRes1 = ReplaceStr<"day day up! day day up!", "study", "up">

//  Trim
// TrimRight

type TrimStrRight<Str extends string> =
	Str extends `${infer R}${" " | "\n" | "\t"}`
	? TrimStrRight<R>
	: Str

type trimStrRight = TrimStrRight<"gogo   ">

// TrimLeft
type TrimStrLeft<Str extends string> =
	Str extends `${" " | "\n" | "\t"}${infer R}`
	? TrimStrLeft<R>
	: Str

type trimStrLeft = TrimStrLeft<"   gogo">

// Trim
type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<Str>>

type trimStr = TrimStr<"  go go  ">


// 函数
// getParameter
type GetParameters<Func extends Function> =
	Func extends (...args: infer Args) => unknown ? Args : never

type parametersRes = GetParameters<(name: "zhangsan", age: 99) => string | number>

// getReturnType
type GetReturnType<Func extends Function> =
	Func extends (...arg: any[]) => infer R
	? R
	: never


type getResType = GetReturnType<() => string>

// getThisParameterType
type GetThisParameterType<T>
	= T extends (this: infer ThisType, ...args: any[]) => any
	? ThisType
	: unknown
let obj1 = {
	name: "asdf"
}

class One {
	name: string
	constructor() {
		this.name = "zhangsan"
	}

	say(this: One) {
		return `hello ${this.name}`
	}
}

type getThisParameterType = GetThisParameterType<typeof obj1.name>

const per = new One()
per.name
per.say()

type getThisParameterType1 =
	GetThisParameterType<typeof per.say>

// 构造器
// getInstenceType
interface Person {
	name: string
}
interface PersonInstance {
	new(name: string): Person
}

type GetInstenceType<ConstructorType extends new (...args: any[]) => any>
	= ConstructorType extends new (...args: any[]) => infer InstanceType
	? InstanceType
	: never
// 取出构造器对应的实例类型
type getInstenceType = GetInstenceType<PersonInstance>

// getConstructorParameters
type GetConstructorParameters<ConstructorType extends new (...arg: any) => any> =
	ConstructorType extends new (...args: infer ParametersType) => any
	? ParametersType
	: never

type getConstructorParameters = GetConstructorParameters<PersonInstance>
