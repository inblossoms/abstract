// 综合案例一

// KebabCaseToCamelCase
type KebabCaseToCamelCaseRes = KebabCaseToCamelCase<'zhang-san'>

type KebabCaseToCamelCase<Str extends string> =
	Str extends `${infer first}-${infer res}`
	? `${first}${KebabCaseToCamelCase<Capitalize<res>>}`
	: Str


// CamelCaseToKebabCase
type CamelCaseToKebabCaseRes = CamelCaseToKebabCase<'zhangSan'>

type CamelCaseToKebabCase<Str extends string> =
	Str extends `${infer first}${infer res}`
	? first extends Lowercase<first> ? `${first}${CamelCaseToKebabCase<res>}` : `-${Lowercase<first>}${CamelCaseToKebabCase<res>}`
	: Str;


// Chunk
// 对数组做分组，比如 1、2、3、4、5 的数组，每两个为 1 组，那就可以分为 1、2 和 3、4 以及 5 这三个 Chunk
type Chunk<
	Ary extends unknown[],
	aryItem extends number,
	CurItem extends unknown[] = [],
	Res extends unknown[] = [],
	> = Ary extends [infer first, ...infer args]
	? CurItem['length'] extends aryItem ?
	Chunk<args, aryItem, [first], [...Res, CurItem]> :
	Chunk<args, aryItem, [...CurItem, first], Res>
	: [...Res, CurItem]

type ChunkRes = Chunk<[1, 2, 3, 4, 5, 6, 7], 3>


// TupleToNestedObject 
type TupleToNestedObject<
	Tuple extends unknown[],
	Value
	> = Tuple extends [infer first, ...infer args] ?
	{
		[key in first as key extends keyof any ? key : never]:
		args extends unknown[]
		? TupleToNestedObject<args, Value>
		: Value
	}
	: Value

type TupleToNestedObjectRes = TupleToNestedObject<['zhangsan', 'name', 'hobby', 'book'], 'TypeScript'>


type TupleToNestedObjectRes1 = TupleToNestedObject<['zhangsan', 'name', 'hobby', null], 1>


type TupleToNestedObjectRes2 = TupleToNestedObject<['zhangsan', 'name', 'hobby', number], 1>

// PartialObjectPropByKeys
interface Person {
	name: string
	age: number
	hobby: string[]
}

type pickRes = Pick<Person, 'name' | 'age'>
type OmitRes = Omit<Person, 'name' | 'age'>

// 交叉类型会把同类型的做合并，不同类型舍弃
type PartialObjectPropByKeys<
	Obj extends Record<string, any>,
	Key extends keyof any = keyof Obj
	> =
	Copy<Partial<Pick<Obj, Extract<keyof Obj, Key>>> & Omit<Obj, Key>>

type Copy<obj extends Record<string, any>> = {
	[key in keyof obj]: obj[key]
}

type PartialObjectPropByKeysRes = PartialObjectPropByKeys<Person, 'name' | 'age'>