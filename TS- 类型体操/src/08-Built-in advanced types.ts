// TS 常见内置高级类型

// parameters 用于提取函数类型的参数类型
type parameters<
	Fn extends (...arg: any) => any
	> =
	Fn extends (...args: infer T) => any
	? T : never

// retuenType
type returnType<
	Fn extends (...args: any) => any
	> =
	Fn extends () => infer T ? T : never

//constructorParameter 获取构造函数的参数类型
type constructorParameter<
	T extends abstract new (...args: any) => any
	> =
	T extends abstract new (...args: infer ret) => any
	? ret : never

interface PersonConsttructor {
	new(name: string, age: number): Person
}
type constructorParameterRes = constructorParameter<PersonConsttructor>

// instanceType
type instanceType<
	Fn extends abstract new (...args: any) => any
	> =
	Fn extends abstract new () => infer T
	? T : never

type instanceTypeRes = InstanceType<PersonConsttructor>

// thisParameterType 提取函数内部的this的类型
type per = {
	name: 'zhangsan'
}
function test(this: per) {
	console.log(this.name);
}

// test.call({})

type ThisParameterTypeRes = ThisParameterType<typeof test>

type thisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;
type thisParameterTypeRes = thisParameterType<typeof test>

// omitThisParameter 提取出this的类型，可以构造出一个新的类型，比如删除this的类型。
type omitThisParameter<T> =
	unknown extends thisParameterType<T>
	? T
	: T extends (...args: infer Args) => infer R ? (...args: Args) => R : T

function t(this: Person, age: number) {
	console.log(this.name);
	return this.name + " " + age + "years old"
}

type omitThisParameterRes = omitThisParameter<typeof t>
type OmitThisParameterRes = OmitThisParameter<typeof t>


// partial 索引类型可以通过映射类型的语法做修改，比如把索引变为可选
type partial<T> = {
	[k in keyof T]?: T[k]
}
type partialRes = partial<{
	name: string,
	age: number
}>

// required 可以把索引变为可选同样可以去掉可选（也就是required类型）
type required<T> = {
	[k in keyof T]-?: T[k]
}
type requiredRes = required<{
	name?: string,
	age?: number
}>


// readonly  为属性添加只读属性
type Readonly1<T> = {
	readonly [k in keyof T]: T[k]
}
type readonlyRes = Readonly1<{
	name: string
}>

// pick 映射类型的语法用于构造新的索引类型，在构造的过程中可以对索引和值做一些修改或过滤。
type pick1<T, k extends keyof T> = {
	[p in k]: T<p>
}
type pickRes = pick1<{
	name: 'zhangsan',
	age: 33,
	hobby: ["study"]
}, 'hobby' | 'name'>

// record 用于创建索引类型，传入key和值的类型
type record<k extends keyof any, T> = {
	[p in k]: T;
}

type recordRes = record<'a' | 'b', number>
// 当传入的是string|number|symbol，name创建的是有可索引签名的索引类型
type recordRes1 = record<number, string>


// exclude 当想从一个联合类型中去掉一部分类型的时，可以用exclude类型
type exclude<T, U> = T extends U ? never : T// 取差集

type excludeRes = exclude<'a' | 'b' | 'c', 'a' | 'c'>

// extract 与exclude相反，去交集
type extract<T, U> = T extends U ? T : never


// omit pick可以取出索引类型的部分索引构造新的索引类型，反过来就是去掉这部分索引构造成新的索引类型
