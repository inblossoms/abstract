// 分布式条件类型：当类型参数为联合类型且在条件类型左边对其进行了直接引用的时候，TS会将每一个元素单独的传入来做类型运算最后合并成联合类型，这种语法叫做分布式条件类型。
type union = "a" | "b" | "c"
type UppercaseA<i> = i extends "a" ? Uppercase<i> : i

type res = UppercaseA<union>


// 处理字符串类型
// camelcaseUnion
type Camelcase<str extends string> =
	str extends `${infer first}_${infer target}${infer args}`
	? `${first}${Uppercase<target>}${CamleCase<args>}`
	: str;

type camelcaseUnionT = CamleCase<"a_bs_dfg">

// camelcseArr
type CamelcaseArr<
	Arr extends unknown[] = []
	> =
	Arr extends [infer str, ...infer args]
	? [CamleCase<str & string>, ...CamelcaseArr<args>]
	: Arr;

type camelcaseArr = CamelcaseArr<["a_sd_asdf", "h_jlk_sa"]>

// camelcaseUnion
type CamelcaseUnion<i extends string> =
	i extends `${infer one}_${infer second}${infer args}`
	? `${one}${Uppercase<second>}${CamelcaseUnion<args>}`
	: i;

type camelcaseUnion = CamelcaseUnion<"a_sd_asdf" | "h_jlk_sa">


// isUnion
type IsUnion<A, B = A> =
	A extends A
	? [B] extends [A]
	? false : true
	: never

type isUnion = IsUnion<'a' | 'b' | 'c'>
type isUnion2 = IsUnion<['a' | 'b' | 'c']>


// BEM : css 命名规范，用block_element-modifier的形式来描述某个区块下面的某个元素的某个状态的样式。
type test = BEM<
	"main",
	["div", "span"],
	['class= btn', 'style: background-color: yellow']>

// 数组转联合类型
type arrToUnion = ["aaa", "bbb"][number]

type BEM<
	block extends string,
	element extends string[],
	modifiers extends string[]
	> = `${block}_${element[number]}——${modifiers[number]}`


// combination
type Combination<A extends string, B extends string>
	= A | B | `${A}${B}` | `${B}${A}`

type combination = Combination<"a", "b">

// allCombinations
type AllCombinations<
	A extends string,
	B extends string = A
	> =
	A extends A
	? Combination<A, AllCombinations<Exclude<B, A>>>
	: never

type allCombinations = AllCombinations<'a' | 'b' | 'c'>