"use strict";
// let isDone: boolean = false;
// interface Person {
// 	readonly id: string
// 	name: string
// 	// age?: number
// 	[propName: string]: any
// }
// let person: Person = {
// 	id: "162848",
// 	name: "zhangsan",
// 	age: 99,
// 	wife: "lisi"
// }
// let arr = [1, 2, 3, "s"]
// let Arr: number[] = [12, 3, 34, 54]
// interface res {
// 	suit: string;
// 	card: number;
// }
// interface fn_this {
// 	suits: string[]
// 	cards: number[]
// 	createCardPicker(this: fn_this): () => res
// }
// let deck: fn_this = {
// 	suits: ["hearts", "spades", "clubs", "diamonds"],
// 	cards: Array(52),
// 	createCardPicker: function () {
// 		return function (this: fn_this) {
// 			let pickedCard = Math.floor(Math.random() * 52);
// 			let pickedSuit = Math.floor(pickedCard / 13);
// 			return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
// 		}
// 	}
// }
// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();
// alert("card: " + pickedCard.card + " of " + pickedCard.suit);
// function reverse(x: string): string;
// function reverse(x: number): number;
// function reverse(x: string | number) {
// 	if (typeof x === "string") { return x.split("").reverse().join("") }
// 	if (typeof x === "number") { return Number(x.toString().split("").reverse().join("")) }
// }
// console.log(reverse(1231));
// // class Anamal {
// // 	name: string;
// // 	constructor(theName: string) { this.name = theName; }
// // 	move(distanceInmeters: number = 0) {
// // 		console.log(`${this.name} moved ${distanceInmeters}m`);
// // 	}
// // }
// // class Snake extends Anamal {
// // 	constructor(name: string) {
// // 		super(name) //在构造函数内部 super 是函数引用
// // 	}
// // 	move(distanceInmeters: number = 3) {
// // 		console.log("Slithering...");
// // 		super.move(distanceInmeters) // 在构造函数外部 super 是函数调用
// // 	}
// // }
// // let sam = new Snake("asdfasdfadsf")
// // console.log(sam);
// class Fun {
// 	private name: string;
// 	constructor(name: string) { this.name = name; }
// 	move(distanceInmeters: number = 0) {
// 		console.log(`${this.name} moved ${distanceInmeters}m`);
// 	}
// }
// class fun {
// 	constructor(private name: string) { }
// 	move(distanceInmeters: number = 0) {
// 		console.log(`${this.name} moved ${distanceInmeters}m`);
// 	}
// }
// let passcode = "secret passcode"
// class Employee {
// 	private _fullName: string;
// 	constructor() { }
// 	get fullName(): string {
// 		return this._fullName
// 	}
// 	set fullName(newName: string) {
// 		if (passcode && passcode == "secret passcode") {
// 			this._fullName = newName;
// 		} else {
// 			console.log("Error:Unauthorized update of employee!!")
// 		}
// 	}
// }
// let employee = new Employee();
// employee.fullName = "Bob"
// console.log(employee);
// abstract class Anamal {
// 	private name: string;
// 	public constructor(theName: string) { this.name = theName; }
// 	protected move(distanceInmeters: number = 0) {
// 		console.log(`${this.name} moved ${distanceInmeters}m`);
// 	}
// 	abstract makeSound(): void //
// }
// class Snake extends Anamal {
// 	constructor(name: string) {
// 		super(name) //在构造函数内部 super 是函数引用
// 	}
// 	move(distanceInmeters: number = 3) {
// 		console.log("Slithering...");
// 		super.move(distanceInmeters) // 在构造函数外部 super 是函数调用
// 	}
// 	makeSound() {
// 		console.log("sisiisisisi~~")
// 	}
// }
// let sam = new Snake("asdfasdfadsf")
// console.log(sam);
// class Greeter {
// 	constructor() { }
// 	static standardGreeting = "hello"
// 	greeting: string
// 	greet() {
// 		if (this.greeting) {
// 			return "hi" + this.greeting
// 		}
// 	}
// }
// let greeter1 = Greeter;
// // greeter1 = new Greeter()
// // console.log(greeter1.greet());
// let greeterMarker: typeof Greeter = Greeter;
// greeterMarker.standardGreeting = "hey there"
// let greeter2: Greeter = new greeterMarker();
// console.log(greeter2.greet());
// // 元组 tuple
// type Tuple = [number, string]
// // Interface 描述函数、对象、构造器的结构
// interface IPerson {
// 	name: string;
// 	age: number;
// }
// class Person implements IPerson {
// 	name: string;
// 	age: number;
// }
// const obj: IPerson = {
// 	name: 'guang',
// 	age: 18
// }
// // 函数
// interface SayHello {
// 	(name: string): string
// }
// const say: SayHello = (name: string) => {
// 	return "hi" + name;
// }
// // 构造器
// interface PersonConstructor {
// 	new(name: string, age: number): IPerson
// }
// function createPreson(ctor: PersonConstructor): IPerson {
// 	return new ctor("zhangsan", 99)
// }
// let ary: (number | string)[] = [1, 2, 3]
// let Ary: Array<number | string> = [1, 2, 3, 'a']
// // console.log(Ary);
// function test(obj: { name: string, sex?: string }) {
// 	console.log(obj.sex?.toUpperCase());
// // }
// interface Animal {
// 	name: string,
// 	wight: number
// }
// interface Bear extends Animal {
// 	sex: string,
// 	hobby: string
// }
// const bear: Bear = {
// 	name: "winie"
// 	,wight: 99
// 	,sex: "male"
// 	,hobby: "honey"
// }
// console.log(bear);
// type count = {
// }
// function text(name: string, sxe: "male" | "female") {
// 	return {
// 		a: String
// 	}
// }
// text("zhagnsan", "female")
// function numText(a: string, b: string): -1 | 0 | 1 {
// 	return a === b ? 0 : a > b ? 1 : -1
// }
// function handleRequest(url: string, method: "GET" | "POST") {
// }
// const req = {
// 	url: "https://baidu.com",
// 	method: "GET"
// 	// method: "GET" as "GET"
// } as const
// handleRequest(req.url, req.method)
// type num = Number & {
// }
// type Fish = {
// 	name: string,
// 	swim: () => void
// }
// type Bird = {
// 	name: string,
// 	fly: () => void
// }
// function isFish(pet: Fish | Bird): pet is Fish {
// 	return (pet as Fish).swim !== undefined
// }
// function getSmallPet(): Fish | Bird {
// 	let fish: Fish = {
// 		name: "sharkey",
// 		swim: () => {
// 		}
// 	}
// 	let bird: Bird = {
// 		name: "sparrow",
// 		fly: () => {
// 		}
// 	}
// 	return true ? bird : fish;
// function greeter(fn: (a: string) => void) {
// 	fn("hello world")
// }// 参数fn：限定传进来的函数
// function printToConsole(s: string) {
// 	console.log(s);
// }
// greeter(printToConsole)
// class Ctor {
// 	s: string
// 	constructor(s: string) {
// 		this.s = s
// 	}
// }
// type SomeConstructor = {
// 	new(s: string): Ctor
// }
// function fn(ctor: SomeConstructor) {
// 	return new ctor("hello")
// }
// interface CallOrConstructor {
// 	new(s: string): Date
// 	(n?: number): number
// }
// function fun(date: CallOrConstructor) {
// 	let d = new date("2021-12-12")
// 	let n = date(2000)
// }
// function map<I, O>(arr: I[], fun: (arg: I) => O): O[] {
// 	return arr.map(fun)
// }
// const parsed = map(["1", "2", "3"], n => parseInt(n))
// function longest<Type extends { length: number }>(a: Type, b: Type) {
// 	a.length >= b.length ? a : b
// }
// const longerArr = longest([1, 2, 3], [1, 2, 3, 3])
// const longerStr = longest("asdf", "oiu")
// const bad = longest(1, 2)
// type vfun = () => void;
// const f: vfun = () => true;
// const v = f()
// console.log(v);
// interface i {
// 	[prop: string]: string | number
// }
// const n: i = { n: "dd"}
// const s = n ;a'
// interface a {
// 	name: string
// }
// interface b extends a {
// 	sex: string
// }
// const c: b = {
// 	name: "zhangsan"
// 	, sex: "male"
// }
// function identity<type>(arg: Array<type>): type[] {
// 	return arg
// } // 对泛型类型约束
// // const myIdentity = identity
// // console.log(myIdentity([1, 2]))
// // 
// interface GenericIdentityFn<Type> {
// 	(arg: Array<Type>): Type[]
// }
// let myIntentity: GenericIdentityFn<string> = identity
// myIntentity(["aaa"])
// const b = identity
// b([1])
// class GenericNumber<NumType>{
// 	zeroValue: NumType;
// 	add: (x: NumType, y: NumType) => NumType;
// }
// const generic = new GenericNumber<string>()
// generic.zeroValue = "aaaa"
// generic.add = (a, b) => {
// 	return a + b
// }
// function getProp<T, K extends keyof T>(obj: T, key: K) {
// 	return obj[key]
// }
// let obj = {
// 	name: "zhangsan",
// 	sex: "male",
// 	age: 99
// }
// getProp(obj, "age")
// getProp(obj, "name")
// class BeeKeeper {
// 	hasMask: boolean = true
// }
// class ZooKeeper {
// 	nameTag: string = "zhan"
// }
// class Animal {
// 	numlegs: number = 4
// }
// class Bee extends Animal {
// 	keeper: BeeKeeper = new BeeKeeper()
// }
// class Lion extends Animal {
// 	keeper: ZooKeeper = new ZooKeeper()
// }
// function createInstance<T extends Animal>(c: new () => T): T {
// 	return new c()
// }
// createInstance(Lion).keeper.nameTag
// createInstance(Bee).keeper.hasMask
// createInstance(Bee).numlegs
// type Arrayish = {
// 	[n: string]: unknown
// }
// type n = keyof Arrayish;
// const a: n = "s";
// const b: n = 1;
// // const c: n = true;
// type obj = { a: string, b: string, c: string }
// type N = keyof obj;
// const q: N = "a"
// const w: N = "c"
// type P = (s: string) => string
// type x = ReturnType<P>
// type OBJ = {
// 	name: string,
// 	age: number,
// 	sex: string
// }
// type Obj = OBJ[keyof OBJ]
// const z: Obj = 1;
// const x: Obj = "s"
// const arr = [
// 	{ name: "zhangsan", age: 22 }
// 	, { name: "lisi", age: 24 }
// ]
// type T = typeof arr[number] // 通过number获取对应索引的类型
// const o: T = {
// 	name: "wangwu",
// 	age: 11
// }
// interface A {
// 	a: string
// }
// interface B {
// 	b: number
// }
// type Tp<T extends number | string> = T extends number ? B : A
// function selectFn<T extends number | string>(prop: T): Tp<T> {
// 	throw ""
// }
// let n = selectFn(Math.random() > 0.5 ? "string" : 1234)
// type Message<T> = T extends { message: unknown } ? T["message"] : never
// interface Email {
// 	message: string
// }
// interface Animal {
// 	name: string
// }
// type e = Message<Email>
// type a = Message<Animal>
// const x: e = "adsf"
// const y: a = 123 // 不能将类型“number”分配给类型“never”
// type GetReturnType<T> = T extends (...args: never) => infer Return
// 	? Return
// 	: never
// type Num = GetReturnType<() => number>
// const num: Num = 1
// function strOrNum(x: string): string
// function strOrNum(x: number): number
// function strOrNum(x: string | number): string | number
// function strOrNum(x: string | number): string | number {
// 	return Math.random() > 0.5 ? "string" : 1
// }
// // infer Return :  对于函数声明只会对解析最后一个重载签名
// type T = GetReturnType<typeof strOrNum>
// const t: T = true
// class P<T>{
// 	readonly name: string = "zhangsan";
// 	constructor(name?: string) {
// 		if (name !== undefined) {
// 			this.name = name
// 		}
// 	}
// }
// let p = new P<number>("lisi")
// console.log(p.name);
// let p2 = new P<string>()
// console.log(p2.name);
class P {
    constructor(prop = {}) {
        this.x = prop.x;
        this.y = prop.y;
    }
    count(x, y) {
        let c = x + y;
        return c;
    }
}
let p = new P();
console.log(p.count(1, 2));
