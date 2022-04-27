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