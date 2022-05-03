// 类型编程的意义：类型和类型之间有关系的场景，必然要用类型编程做一些运算。有的场景下可以不用类型编程，但是用了能够有更精准的类型提示和检查。

// parseQueryString  -- a=1&b=2&c=3 => {a:1,b:2,c:3}
export default function parseQueryString<Str extends string>(queryStr: Str): ParsequeryString<Str> {
	if (!queryStr !== null || queryStr.length !== 0) return {} as any;

	const queryObj = Object.create(null)
	const items = queryStr.split("&")

	items.forEach(item => {
		const [key, value] = item.split("=")
		if (queryObj[key]) {
			if (Array.isArray(queryObj[key])) {
				queryObj[key].push(queryObj[key], value)
			} else {
				queryObj[key] = [value]
			}
		} else {
			queryObj[key] = value
		}
	})


	return queryObj;
}



const res = parseQueryString('a=1&b=2&c=3&a=4')
console.log(res.a);

// promise.all race 的类型声明
interface PromiseConstructor {
	all<T extends readonly unknown[] | []>
		(values: T): Promise<{
			-readonly [P in keyof T]: awaited<T[P]>
		}>;

	race<T extends readonly unknown[] | []>
		(values: T): Promise<awaited<T[number]>>
}

const res3 = Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3),])

const res4 = Promise.race([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3),])


// currying  接收一个函数返回柯里化后的函数
// const func = (a: string, b: string, c: string) => {}
// 返回 (a: string) => (b: number) => (c: boolean) => void


//  currying 函数类型的定义：declare function currying(fn: xxx): xxx;
type CurriedFunc<Params, Return> =
	Params extends [infer Arg, ...infer Rest]
	? (args: Arg) => CurriedFunc<Rest, Return>
	: never;

declare function currying<Func>(fn: Func):
	Func extends (...args: infer Params) => infer Result
	? CurriedFunc<Params, Result>
	: never;


const func = (a: string, b: boolean, c: number) => { }
const curriedFunc = currying(func);
