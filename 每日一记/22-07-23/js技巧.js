// 1. 声明和初始化数组：初始化一个特定大小的二维数组
const ary = Array(5).fill("");

const twoDimensionalArray = ary.map(() => Array(5).fill(0));
console.log(twoDimensionalArray);

// 2. 求数组总和、找出最小值和最大值
const arr = [1, 2, 3, 4, 5, 6, 7];
// 和
arr.reduce((a, b) => a + b);
// 最小值
arr.reduce((a, b) => (a < b ? a : b));
// 最大值
arr.reduce((a, b) => (a > b ? a : b));

// 3. 字符串、数字或对象数组进行排序
const objectArr = [
  { first_name: "Lazslo", last_name: "Jamf" },
  { first_name: "Pig", last_name: "Bodine" },
  { first_name: "Pirate", last_name: "Prentice" },
];
objectArr.sort((a, b) => a.last_name.localeCompare(b.last_name)); // loacaleCompare：用于比较的字符串

// 4. 过滤假值
const array = [0, null, undefined, 1];
console.log(array.filter(Boolean));

// 5. 通过逻辑运算符减少 if-else 或者 switch case 的套用
function doSomething(args) {
  args = args || 10;
  return args;
}
let foo = 10;
foo === 10 && doSomething();
// 或者
foo === 5 || doSomething();

// 6. 数组去重
let uniqueAry = [1, 1, 2, 2, 2, 2, 4, 6, 7, 7, 7];

uniqueAry.filter((item, index, arr) => arr.indexOf(item) === index);

uniqueAry.forEach((item) => {
  let res = [];
  if (!res.includes(item)) res.push(item);
});

// 7. 创建计数器对象或者映射：提取变量出现频率、出现次数做为值进行跟踪。
let str = "adfafdasdfasfddsakkjhkhkh";

const strObj = {};
for (const i of str) {
  strObj[i] = strObj[i] + 1 || 1;
}
console.log(strObj);
//
const countMap = new Map();
for (let i = 0; i < str.length; i++) {
  if (countMap.has(str[i])) {
    countMap.set(str[i], countMap.get(str[i]) + 1);
  } else {
    countMap.set(str[i], 1);
  }
}
console.log(countMap);

// 8. 三元运算符：减少嵌套条件
function Fever(temp) {
  return temp > 50
    ? "Visit Doctor!"
    : temp < 50
    ? "Go Out and Play!!"
    : temp === 50
    ? "Take Some Rest!"
    : "Condition of overflow";
}

// 9. 循环之间的合理使用场景，注意事项
// for 并 for in 默认提供索引，但可以使用 arr[index]
// for in 也接收非数字，所以避免使用现象的出现
// forEach 可以提供索引， 以及for of 两者都可以直接获取元素
// for 并 for of 考虑阵列中的孔，但其他两个不考虑

// 10. 合并多个对象：点运算符
const user = {
  name: "Kapil Raghuwanshi",
  gender: "Male",
};
const college = {
  primary: "Mani Primary School",
  secondary: "Lass Secondary School",
};
const skills = {
  programming: "Extreme",
  swimming: "Average",
  sleeping: "Pro",
};

const summary = { ...user, ...college, ...skills };

// 11. 箭头函数
// 箭头函数表达式是传统函数表达式的紧凑替代品，但有局限性，不能在所有情况下使用。
// 由于它们具有词法范围（父范围）并且没有自己的范围this，arguments因此它们指的是定义它们的环境。

const person = {
  name: "Kapil",
  sayName() {
    return this.name;
  },
};

person.sayName();
// 但
const person = {
  name: "kapil",
  sayName: () => {
    return this.name;
  },
};

let name = "glogal!!";
console.log(person.sayName(), "-----"); // node 环境没有 window： undefined

// 12. 可选链：可选的链接?. 如果值再?之前，则停止评估。为undefined 或 null并返回。
const user = {
  employee: {
    name: "zhangsan",
  },
};

// console.log(user.employee?.name);
console.log(user.employ.name);

// 13. 通过内置的Math.random() 方法打乱数组；
const list = [1, 2, 3, 4, 5, 6, 7];
list.sort(() => {
  return Math.random() - 0.5;
});

console.log(list);

// 14. 空合并运算符 ??：当左侧操作数为空或未定义时返回其右侧操作数，否则返回其左侧操作数。
const foo = null ?? "foo";

const baz = 0 ?? 1;

// 15. 单行回文检查
function checkPalindrome(str) {
  return str == str.split("").reverse().join("");
}

console.log(checkPalindrome("adsfsda"));

// 16. 将 Object 属性转成属性数组
// 使用Object.entries(),Object.keys()和Object.values()
const obj = { a: 1, b: 2, c: 3 };

Object.entries(obj);
(3)[(Array(2), Array(2), Array(2))];

Object.keys(obj);
(3)[("a", "b", "c")];

Object.values(obj);
(3)[(1, 2, 3)];
