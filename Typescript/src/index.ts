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

function greeter(fn: (a: string) => void) {
	fn("hello world")
}// 参数fn：限定传进来的函数

function printToConsole(s: string) {
	console.log(s);
}

greeter(printToConsole)


class Ctor {
	s: string
	constructor(s: string) {
		this.s = s
	}
}
type SomeConstructor = {
	new(s: string): Ctor
}

function fn(ctor: SomeConstructor) {
	return new ctor("hello")
}

interface CallOrConstructor {
	new(s: string): Date
	(n?: number): number
}
function fun(date: CallOrConstructor) {
	let d = new date("2021-12-12")
	let n = date(2000)
}