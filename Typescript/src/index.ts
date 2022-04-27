//  元组Tuple:  就是元素个数和类型固定的数组类型
type Tuple = [number, string]
const arr: Tuple = [1, "a"]// const arr: Tuple = [1, "a", 3, 4, "b"]

// 接口Interface： 可以描述函数、对象、构造器的结构
// 对象
interface IPerson {
	name: string,
	age: number
	readonly sex: string
}

class Person implements IPerson {
	name: string
	age: number
	sex: string
	constructor() {

	}
}

const obj: IPerson = {
	name: "zhangsan",
	age: 99,
	sex: "male"
}

// 函数
interface SayHello {
	(name: string): string
}

const func: SayHello = (name: string) => {
	return "hello " + name
}

// 构造器
interface PersonConstructor {
	new(name: string, age: number): IPerson
}

function createPerson(ctor: PersonConstructor): IPerson {
	return new ctor("zhangsan", 99)
}


// 索引签名
interface signatrue {
	[prop: string]: string | number
}
const Obj: signatrue = {}
Obj.name = "zhangsan"
console.log(Obj.age = 99)

// 枚举Enum：是一系列值的集合
enum Transpiler {
	name = "zhangsan",
	age = 88,
	sex = "male",
}
const transplier = Transpiler.name

// 字符串的字面量：模板字面量 - xx${string} 以 xx 开头的，后面是任意string的字符串字面量
function fun(str: `#${string}`) {
	return str
}

// console.log(fun("aaa"));
console.log(fun("#adf"));



// void：代表空，可以是null或者undefined，一般用于函数的返回值
// any： 任意类型，接受任意类型的赋值（除了never）
// unknown：未知类型, 接受任意类型的赋值，但不可以将该类型赋值给其他类型
// never: 不存在的类型


// 条件类型： extends ? :
type isBoolean<T> = T extends boolean ? true : never
type r = isBoolean<false>

// 推导：infer 提取类型的一部分
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? T : never

type res = First<[1, 3, 4, 1]>


// 联合： | 类似于js中的按位或运算符，但作用于类型（代表类型可以是多个类型之一）
type Union = string | number | boolean
const u: Union = 1


// 交叉： & 类似于js中的按位与运算符&，但作用于类型，导表对类型的合并。
type ObjType = { n: number } & { s: string }
type res1 = { n: number, s: string } extends ObjType ? true : false

type res2 = "asdf" & 1344
type res3 = 1234 & 3546

// 映射类型： 对索引类型做修改(object class 在ts中对应索引类型)
type MapType<T> = {
	[K in keyof T]?: T[K]
}
// keyof T 是查询索引类型中的所有索引： 叫做索引查询
// T[K] 索引类型某个索引值，叫做索引访问
// in 用于遍历联合类型的运算符
type mapType<T> = {
	[K in keyof T]: [T[K], T[K], T[K]]
}

type Res = mapType<{ a: 1, b: 2 }>


// 重映射：在值发生变化的基础上，索引也可以发生变化，用as运算符
type mapType1<T> = {
	[
	K in keyof T
	as `${K & string}-${K & string}`
	]: [T[K], T[K], T[K]]
}

type NewType = "11"

type Res1 = mapType1<{ a: 1, b: 2, [1]: NewType }>

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
