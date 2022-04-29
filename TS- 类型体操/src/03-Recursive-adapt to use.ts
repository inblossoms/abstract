// TS 类型系统中不支持循环，支持递归

// Promise 的递归调用
// deepPromiseValueType

type DeepPromiseValueType<P extends Promise<unknown>> =
	P extends Promise<infer valType>
	? valType extends Promise<unknown>
	? DeepPromiseValueType<valType>
	: valType
	: never

type promiseT = DeepPromiseValueType<Promise<Promise<Record<string, any>>>>

// 不约束参数类型
type DeepPromiseValueType1<T> =
	T extends Promise<infer valType>
	? DeepPromiseValueType1<valType>
	: T

type ResType = DeepPromiseValueType<Promise<Promise<string>>>

// 数组类型的递归
// reverseArr
type Reverse<Arr extends unknown[]> =
	Arr extends [infer one, ...infer args]
	? [...Reverse<args>, one]
	: Arr

type reverseArr = Reverse<[1, 2, 3, 4, 5]>

// includes
type Includes<Arr extends unknown[], includeVal> =
	Arr extends [infer among, ...infer args]
	? IsEqual<among, includeVal> extends true
	? true
	: Includes<args, includeVal>
	: false

type IsEqual<x, y> = (x extends y ? true : false) & (y extends x ? true : false)

type isInclude = Includes<[1, 2, 3, 4, 5], 0> // false
type isInclude1 = Includes<[1, 2, 3, 4, 5], 2> // treu


//  removeItem
type RemoveItem<
	Arr extends unknown[],
	includeVal,
	Result extends unknown[] = []
	> =
	Arr extends [infer first, ...infer args]
	? IsEqual<first, includeVal> extends true
	? RemoveItem<args, includeVal, Result>
	: RemoveItem<args, includeVal, [...Result, first]>
	: Result

type removeItem = RemoveItem<[1, 2, 3, 4, 4, 5, 6, 7], 4>

// buildArr
type BuildArr<
	length extends number,
	e = unknown,
	Arr extends unknown[] = []
	> = Arr["length"] extends length
	? Arr : BuildArr<length, e, [...Arr, e]>

type buildArr = BuildArr<5>


// replaceAll
type ReplaceAll<Str extends string, target extends string, origin extends string> =
	Str extends `${infer first}${target}${infer args}`
	? `${first}${origin}${ReplaceAll<args, target, origin>}` : Str

type replaceAll = ReplaceAll<"day day up!!!!", "!", "！">

// stringToUnion
type StringToUnion<Str extends string> =
	Str extends `${infer first}${infer args}`
	? first | StringToUnion<args>
	: never

type stringToUnion = StringToUnion<"faasdfklhj">

// reverseStr
type ReverseStr<Str extends string, RetStr extends string = ""> =
	Str extends `${infer first}${infer args}`
	? ReverseStr<args, `${first}${RetStr}`>
	: RetStr

type reverseStr = ReverseStr<"asdf">

// deepReadonly
type DeepReadonly<obj extends Record<string, any>> =
	obj extends any
	? {
		readonly [k in keyof obj]: obj[k] extends object
		? obj[k] extends Function ? obj[k]
		: DeepReadonly<obj[k]>
		: obj[k]
	}
	: never
interface t1 {
	a: {
		b: {
			c: {
				f: () => 'dong',
				d: {
					e: {
						guang: string
					}
				}
			}
		}
	}
}
type deepReadonly = DeepReadonly<t1>["a"]["b"]