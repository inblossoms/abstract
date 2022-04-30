/**
 * 特殊类型的特性：
 * 1. any never union
 * 2. 类的public、protected、private
 * 3. 具体索引：可选和非可选索引
 * 		索引签名：
*/

// isAny
type IsAny<T> = "Data for testing" extends (T & "Data for testing") ? true : false

type isany = IsAny<any>
type isany1 = IsAny<"aaa">

// isEqual
type isEqual<x, y> =
	(<T>() => T extends x ? 1 : 2) extends
	(<T>() => T extends y ? 1 : 2)
	? true : false

type isequal = isEqual<"a", "b">
type isequal1 = isEqual<'a', any>
type isequal2 = isEqual<[], []>

// isUnion
type isUnionType<
	x, y = x
	> =
	x extends x ?
	[y] extends [x] ? false : true
	: never

// isNever : 在条件类型中如果条件类型左边是类型参数且传入的是never，直接返回never
type IsNever<T> = [T] extends [never] ? true : false
type isNever = IsNever<never>

type testAnyRes = IsNever<any>

// isTuple: 每个元素都是只读的
type arrLen = [1, 2, 3, 4, 5, 6]["length"]
type tupleLen = string[]["length"]

type IsTuple<T> = T extends [...args: infer args]
	? NotEqual<args['length'], number>
	: false
type NotEqual<x, y> = (<T>() => T extends x ? 1 : 2) extends (<T>() => T extends y ? 1 : 2) ? false : true

type isTuple = IsTuple<[1, 2, 3]>

/**  
 * // NOTICE 
	类型之间存在父子关系，更为具体的那个是子类型。比如；x和y的交叉类型x&y就是联合类型x|y的子类型，因为其更具体。
	1. 如果允许父类型赋值给子类型，就叫做逆变
	2. 如果允许子类型赋值给父类型，就叫做协变
*/
// unionToIntersection : TS中 函数参数是逆变性质的，也就是如果参数可能是多个类型，参数类型会变成他们的交叉类型
type UnionToIntersection<U> =
	(U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
	? R : never

// NOTICE 函数参数的逆变性质一般在联合类型转交叉类型会使用。
type unionToIntersection = UnionToIntersection<{ X: 1 } | { Y: 2 }>
type unionToIntersection1 = UnionToIntersection<'a' | 'b'>


// getoptional（获取可选索引）： 
// NOTICE 可选索引的特性：可选索引的值为undefined和值类型的联合类型
type GetOptional<obj extends Record<string, any>> =
	{
		[
		k in keyof obj as {} extends Pick<obj, k> ? k : never
		]: obj[k]
	}

// 思路: 通过映射语法重新构造索引类型，通过as对索引做过滤(单独取出该索引，判断空对象是否是其子类型)。
type getOptional = GetOptional<{ name: string; age?: number }>


// Pick 是ts提供的内置高级类型，就是取出某个key构造新的索引类型
type pick<T, K extends keyof T> = { [P in K]: T[P] }
type Obj = {
	name: string,
	age?: number
}

type res5 = pick<Obj, 'age'>

// getRequired 过滤所有非可选的索引构造成新的索引
type isRequired<k extends keyof obj, obj> =
	{} extends Pick<obj, k> ? never : k

type GetRequired<obj extends Record<string, any>> = {
	[k in keyof obj as isRequired<k, obj>]: obj[k]
}

type getRequired = GetRequired<{
	name: string,
	age?: number
}>


// removeIndexSignatrue
type instance = {
	[key: string]: any;
	sleep(): void;
}

type RemoveIndexSignatrue<obj extends Record<string, any>> = {
	[
	k in keyof obj as k extends `${infer Str}` ? Str : never
	]: obj[k]
}

type removeIndexSignatrue = RemoveIndexSignatrue<instance>

// classPublicProps: 由于class类上的关于属性的声明特性使keyof只能获取到public标记后的属性，而private和protected的索引会被忽略
type publicKeys = keyof instance1

class instance1 {
	public name: string;
	protected age: number;
	private hobbies: string[];

	constructor() {
		this.name = "zhangsan";
		this.age = 99;
		this.hobbies = ["study", "watch the move"]
	}
}

type ClassPublicProps<obj extends Record<string, any>> = {
	[k in keyof obj]: obj[k]
}

type classPublicProps = ClassPublicProps<instance1>


// NOTICE
// any 类型与任何类型的交叉都是any，例如：1 & any结果是any，可以用这个特性判断any类型.
// 联合类型作为类型参数出现在条件类型左侧时，会被分散成单个类型传入，最后合并
// never 作为类型参数出现在条件类型左侧时，会直接返回never
// any 作为类型参数出现在条件类型左侧时，会直接返回trueType 和 falseType的联合类型
// 元组类型也是数组类型，但每个元素都是只读的，并且length是数字字面量，而数组的length是number。可以用来判断元组类型。
// 函数参数处会发生逆变，可以用来实现联合类型转交叉类型。
// 可选索引的值为 undefined 和 值类型的联合类型。可以用来过滤可选索引，反过来也可以过滤非可选索引。
// 索引类型的索引位字符串字面量类型，而可索引签名不是。可以利用这个特性过滤掉可索引签名。
// keyof 只能拿到class的public的索引，可以用来过滤出public的属性。
