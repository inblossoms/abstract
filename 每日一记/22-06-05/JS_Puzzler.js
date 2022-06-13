// parseInt 遇上 map
console.log(["1", "2", "3"].map(parseInt));
// parseInt作为map的回调 输出：[1, NAN, NAN]

// 神奇的null
console.log([typeof null, null instanceof Object]);
// typeof null: object 是历史遗留问题；null 的原型链上没有 Object 的原型。输出：["object", false]

// 愤怒的reduce
[[3, 2, 1].reduce(Math.pow), [].reduce(Math.pow)];
// reduce 不能将empty 作为参数，输出：error

// 该死的优先级
var val = "smta";
console.log("Value is" + (val === "smtg") ? "Something" : "Noting");
// + 的优先级高于三目 Value is false作为三目的条件判断，输出：Something

// 神鬼莫测的变量提升
var name = "World!";
(function () {
  if (typeof name === "undefined") {
    var name = "Jack";
    console.log("Goodbye " + name);
  } else {
    console.log("Hello " + name);
  }
})();
// IIFE 的独立作用域，输出：Goodbye Jack

// 死循环陷阱
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
  count++;
}
console.log(count);
// 2^53 是Js中的最大值，2^53+1 == 2^53；输出：error 栈溢出

// 过滤器
var ary = [0, 1, 2];
ary[10] = 10;
ary.filter(function (x) {
  return x === undefined;
});
// 输出：[]

// 警惕IEEE 754标准: 双精度浮点数
var two = 0.2;
var one = 0.1;
var eight = 0.8;
var six = 0.6;
[two - one == one, eight - six == two];
// [true, false]

// 字符串陷阱
function showCase(value) {
  switch (value) {
    case "A":
      console.log("Case A");
      break;
    case "B":
      console.log("Case B");
      break;
    case undefined:
      console.log("undefined");
      break;
    default:
      console.log("Do not know!");
  }
}
showCase(new String("A"));
// new String 会将 'A' 转换成 { 'A' }，switch内部使用 === 严格判断；输出：Do not know!

function showCase(value) {
  switch (value) {
    case "A":
      console.log("Case A");
      break;
    case "B":
      console.log("Case B");
      break;
    case undefined:
      console.log("undefined");
      break;
    default:
      console.log("Do not know!");
  }
}
showCase(String("A"));
// Case A

// 并非都是奇偶
function isOdd(num) {
  return num % 2 == 1;
}

function isEven(num) {
  return num % 2 == 0;
}

function isSane(num) {
  return isEven(num) || isOdd(num);
}

var values = [7, 4, "13", -9, Infinity];
values.map(isSane);
// [true, true, true, false, false]

// parseInt小贼
parseInt(3, 8);
parseInt(3, 2);
parseInt(3, 0);
// 3 NAN 3

// 数组原型是数组
Array.isArray(Array.prototype);
// true

// 一言难尽的强制转换
var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}
// 0 != 1, 输出：false

// 撒旦之子“==”
[] == []; // false

// 加号 VS 减号
"5" + 3;
"5" - 3;
// '53' 2

// 打死那个疯子
1 + -+(+(+-+1));
// 2

// 淘气的map
var ary = Array(3);
ary[0] = 2;
let arr = ary.map(function (elem) {
  return "1";
});
console.log(arr);
// ['1', undefined * 2]

// 统统算我的
function sidEffecting(ary) {
  ary[0] = ary[2];
}

function bar(a, b, c) {
  c = 10;
  sidEffecting(arguments);
  return a + b + c;
}

bar(1, 1, 1);
// 输出：21

// 损失精度的IEEE 754
var a = 111111111111111110000;
var b = 1111;
console.log(a + b);
// a 的值致使精度丢失，输出：111111111111111110000

// 反转世界
var x = [].reverse;
x();
//

// 最小的正值
Number.MIN_VALUE > 0;

// 谨记优先级
[1 < 2 < 3, 3 < 2 < 1];
// [true, true]

// 坑爹中的战斗机
// the most classic wtf
2 == [[[2]]];
// 根据ES5规范，如果比较的两个值中有一个是数字类型，就会尝试将另外一个值强制转换成数字，再进行比较。
// true

// 小数点魔术
// 3.toString();
(3).toString();
// 3...toString();
// 点运算符会被优先识别为数字常量的一部分，然后才是对象属性访问符。
// error '3' error

// 自动提升为全局变量
(function () {
  var x = (y = 1);
})();
console.log(y);
console.log(x);
// 1, undefined

// 正则表达式实例
var a = /123/;
var b = /123/;
a == b;
a === b;
// 每一个正则都是单独的实例；输出：false false

// 数组也爱比大小
var a = [1, 2, 3];
var b = [1, 2, 3];
var c = [1, 2, 4];

a == b; // false
a === b; // false
a > c; // false
a < c; // true

// 原型把戏
var a = {};
var b = Object.prototype;

[a.prototype === b, Object.getPrototypeOf(a) == b];
// Object.getPrototypeOf 获取一个对象的原型； [false, true]

// 构造函数的函数
function f() {}
var a = f.prototype;
var b = Object.getPrototypeOf(f);
a === b;
// false

// 禁止修改函数名
function foo() {}
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name];
// 函数名无法被修改； [foo, foo]

// 替换陷阱: 字符串空格
"1 2 3".replace(/\d/g, parseInt);
// 1 NAN 3

// Function的名字
function f() {}
var parent = Object.getPrototypeOf(f);
console.log(f.name); // f
console.log(parent.name); // empty => Function.prototype
console.log(typeof eval(f.name)); // function
console.log(typeof eval(parent.name)); // undefined
// eval('') 返回值是undefined

// 正则测试陷阱
var lowerCaseOnly = /^[a-z]+$/;
[lowerCaseOnly.test(null), lowerCaseOnly.test()];
// test 方法的参数如果不是字符串，会经过抽象 ToString操作强制转成字符串，因此实际上测试的是字符串 "null" 和 "undefined"。

// A. [true, false]
// B. error
C: [(true, true)];
// D. [false, true]

// 逗号定义数组
[, , ,].join(", ");
//

// 保留字 class
var a = { class: "Animal", name: "Fido" };
console.log(a.class);

// 无效日期
var a = new Date("epoch");

// 神鬼莫测的函数长度
var a = Function.length; // 1
var b = new Function().length; // 0
console.log(a === b);
// false

// Date的面具;
var a = Date(0);
var b = new Date(0);
var c = new Date();
[a === b, b === c, a === c];
// false false false

// min与max共舞
var min = Math.min(); // infinity
var max = Math.max(); // -infinity
console.log(min < max);
// false

// 警惕全局匹配
function captureOne(re, str) {
  var match = re.exec(str);
  return match && match[1];
}

var numRe = /num=(\d+)/gi,
  wordRe = /word=(\w+)/i,
  a1 = captureOne(numRe, "num=1"),
  a2 = captureOne(wordRe, "word=1"),
  a3 = captureOne(numRe, "NUM=1"),
  a4 = captureOne(wordRe, "WORD=1");

[a1 === a2, a3 === a4];
// MDN关于 exec 方法的描述：当正则表达式使用 "g" 标志时，可以多次执行 exec 方法来查找同一个字符串中的成功匹配。当你这样做时，查找将从正则表达式的  lastIndex 属性指定的位置开始。
// [true, false]

// 最熟悉的陌生人
var a = new Date("2014-03-19");
var b = new Date(2014, 03, 19);
[a.getDay() == b.getDay(), a.getMonth() == b.getMonth()];
// 月份是从 0 开始的；.getDay()返回的是指定日期对象中一周中的第几天
// [false, false]

//  匹配隐式转换
if ("http://giftwrapped.com/picture.jpg".match(".gif")) {
  console.log("a gif file");
} else {
  console.log("not a gif file");
}
// MDN对 match 方法的描述：如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj)将其转换为正则表达式对象。
// 'a gif file'

// 重复声明变量
function foo(a) {
  var a;
  return a;
}

function bar(a) {
  var a = "bye";
  return a;
}

[foo("hello"), bar("hello")];
// ['hello', 'bye']
