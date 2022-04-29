// NOTICE TS中没有加减乘除运算符


// 数组长度实现 加减乘除
// add
type num = [number]["length"]
type CreateArr<
	Length extends number,
	e = unknown,
	Arr extends unknown[] = [],
	> =
	Arr["length"] extends Length
	? Arr
	: CreateArr<Length, e, [...Arr, e]>

type Add<x extends number, y extends number> =
	[...CreateArr<x>, ...CreateArr<y>]['length']

type add = Add<12, 12>


// subtract
type Subtract<x extends number, y extends number> =
	CreateArr<x> extends [...Y: CreateArr<y>, ...ret: infer Rest]
	? Rest["length"]
	: never

type subtract = Subtract<30, 11>

// multiply
type Multiply<
	x extends number,
	y extends number,
	RetArr extends unknown[] = []
	>
	= y extends 0 ? RetArr["length"]
	: Multiply<x, Subtract<y, 1>,
		[...CreateArr<x>, ...RetArr]
	>

type multiply = Multiply<3, 5>

// divide
type Divide<x extends number,
	y extends number,
	RetCount extends unknown[] = []
	> =
	x extends 0 ? RetCount["length"]
	: Divide<Subtract<x, y>, y, [unknown, ...RetCount]>


type divide = Divide<9, 3>

// 数组长度实现计数 StrLen
type StrLen<Str extends string,
	CountArr extends unknown[] = []
	> =
	Str extends `${infer first}${infer args}`
	? StrLen<args, [first, ...CountArr]>
	: CountArr["length"]

type strLen = StrLen<"2134 1324">

// isGreaterThan
type IsGreaterThan<
	x extends number,
	y extends number,
	countArr extends unknown[] = []
	> =
	x extends y ? false
	: countArr["length"] extends y ? true
	: countArr["length"] extends x ? false
	: IsGreaterThan<x, y, [...countArr, unknown]>

type isGreaterThan = IsGreaterThan<22, 22>


// fibonacci
type FibonacciLoop<
	prevArr extends unknown[],
	currArr extends unknown[],
	index extends unknown[] = [],
	num extends number = 1
	> =
	index["length"] extends num ? currArr["length"] :
	FibonacciLoop<currArr, [...prevArr, ...currArr], [...index, unknown], num>

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;
type fibonacci = Fibonacci<8>