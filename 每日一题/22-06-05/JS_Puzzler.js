// parseInt 遇上 map
["1", "2", "3"].map(parseInt);

// 神奇的null
[typeof null, null instanceof Object];

// 愤怒的reduce
[[3, 2, 1].reduce(Math.pow), [].reduce(Math.pow)];

// 该死的优先级
var val = "smtg";
console.log("Value is" + (val === "smtg") ? "Something" : "Noting");

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

// 死循环陷阱
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
  count++;
}
console.log(count);

// 过滤器
var ary = [0, 1, 2];
ary[10] = 10;
ary.filter(function (x) {
  return x === undefined;
});

// 警惕IEEE 754标准
var two = 0.2;
var one = 0.1;
var eight = 0.8;
var six = 0.6;
[two - one == one, eight - six == two];

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

// parseInt小贼
parseInt(3, 8);
parseInt(3, 2);
parseInt(3, 0);

// 数组原型是数组
Array.isArray(Array.prototype);

// 一言难尽的强制转换
var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}

// 撒旦之子“==”
[] == [];

// 加号 VS 减号
"5" + 3;
"5" - 3;

// 打死那个疯子
1 + -+(+(+-+1));

// 淘气的map
var ary = Array(3);
ary[0] = 2;
ary.map(function (elem) {
  return "1";
});

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

// 损失精度的IEEE 754
var a = 111111111111111110000;
var b = 1111;
console.log(a + b);

// 反转世界
var x = [].reverse;
x();

// 最小的正值
Number.MIN_VALUE > 0;

// 谨记优先级
[1 < 2 < 3, 3 < 2 < 1];

// 坑爹中的战斗机
// the most classic wtf
2 == [[[2]]];

// 小数点魔术
// 3.toString();
(3).toString();
// 3...toString();

// 自动提升为全局变量
(function () {
  var x = (y = 1);
})();
console.log(y);
console.log(x);

// 正则表达式实例
var a = /123/;
var b = /123/;
a == b;
a === b;

// 数组也爱比大小
var a = [1, 2, 3];
var b = [1, 2, 3];
var c = [1, 2, 4];

a == b;
a === b;
a > c;
a < c;

// 原型把戏
var a = {};
var b = Object.prototype;

[a.prototype === b, Object.getPrototypeOf(a) == b];

// 构造函数的函数
function f() {}
var a = f.prototype;
var b = Object.getPrototypeOf(f);
a === b;

// 禁止修改函数名
function foo() {}
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name];

// 替换陷阱
"1 2 3".replace(/\d/g, parseInt);

// Function的名字
function f() {}
var parent = Object.getPrototypeOf(f);
console.log(f.name);
console.log(parent.name);
console.log(typeof eval(f.name));
console.log(typeof eval(parent.name));

// 正则测试陷阱
var lowerCaseOnly = /^[a-z]+$/;
[lowerCaseOnly.test(null), lowerCaseOnly.test()];

// A. [true, false]
// B. error
// C. [true, true]
// D. [false, true]

// 逗号定义数组
[, , ,].join(", ");

// 保留字 class
var a = { class: "Animal", name: "Fido" };
console.log(a.class);

// 无效日期
var a = new Date("epoch");

// 神鬼莫测的函数长度
var a = Function.length;
var b = new Function().length;
console.log(a === b);

// Date的面具;
var a = Date(0);
var b = new Date(0);
var c = new Date();
[a === b, b === c, a === c];

// min与max共舞
var min = Math.min();
var max = Math.max();
console.log(min < max);

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

// 最熟悉的陌生人
var a = new Date("2014-03-19");
var b = new Date(2014, 03, 19);
[a.getDay() == b.getDay(), a.getMonth() == b.getMonth()];

//  匹配隐式转换
if ("http://giftwrapped.com/picture.jpg".match(".gif")) {
  console.log("a gif file");
} else {
  console.log("not a gif file");
}

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
