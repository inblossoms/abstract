// NOTICE 一、类型

// unknown ：指的是不可预先定义的类型，在大多数场景下它可以代替any的功能同时保留静态检查的能力。
const Num: number = 1234;
(Num as unknown as string).split(''); // 这里和any一样完全可以通过静态检查，此时他的作用和any高度类似可以转换成任何类型。但any可以调用任何方法
const foo: unknown = 'string';
// foo.substr(1); // Error: 静态类型检查不通过，会报错
const any: any = 'asdf';
any.substr(1); // Pass: any类型相当于放弃了静态检查
// 替代any作为函数的参数类型，而导致静态类型检查bug
function unknownFn(input: unknown) {
  if (Array.isArray(input)) {
    return input.length;
    // Pass: 这个代码块中，类型守卫已经将input识别为array类型
  }
  // return input.length;
  // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
}

// void ：在TS中void和undefined功能高度相似,可以在逻辑上避免不小心使用了空指针导致的错误.
function voidFn() {}
const a = voidFn(); // 由于函数返回类型缺省为void，a的类型就定义为了void，你不可以调用a的任何属性方法

// void和undefined类型最大的区别就是，可以将undefined理解为void的一个子集，当你对函数返回值并不在意的时候，使用void而不是undefined。举个例子：
// parent.vue

interface pinia {
  Element: any;
}

function Parent(this: any): pinia['Element'] {
  const getValue = (): number => 2;
  return getValue;
}

// mounted(){
// 	// 这里由于我们只是一个例子 没有vue的语法环境，忽略报错
// 	this.$bus.$emit('Parent', this.Parent)
// }

// Childs.vue
type Props = {
  getValue: () => void; // 这里void，表示逻辑上不关系具体的返回值类型
};
// function Childs({ getValue }:Props) => this.$bus.$on('Parent', {type: 'Ts'})

// never ：是指没办法正常结束返回的类型，一个必定会报错或者死循环的函数会返回这样的类型。
function neverFn(): never {
  throw new Error('this is a test');
}
// declare function neverFn():never {while(true) {}}
// declare function neverFn():never {let count = 1; while(count){ count++ }}
// 永远不相交的类型：
type human = 'girl' & 'boy';
// 任何类型联合上never类型，还是原来的类型
type language = 'ts' | never;
// never 特性：
// 在一个函数中调用了返回never的函数后，之后的代码都会变成deadcode
function deadCode() {
  neverFn();
  console.log('asdf'); // Error: 此行代码永远不会被执行到
}
// 无法把其他类型赋值给never
let x: never;
let y: any = {};
// x = y;  // 不能将非never的类型赋值给never类型，包括any

// 关于never的这一特性的hack用法：
interface Foo {
  type: 'Foo';
}
interface Bar {
  type: 'Bar';
}
type All = Foo | Bar;
// 在switch当中判断type，TS是可以收窄类型的（discriminated union）
function handleValue(val: All) {
  switch (val.type) {
    case 'Foo':
      // 这里 val 被收窄为 Foo
      break;
    case 'Bar':
      //  这里 val 被收窄为 Bar
      break;
    default:
      const exhaustiveCheck: never = val;
      break;
  }
}
// 注意在 default 里面我们把被收窄为 never 的 val 赋值给一个显式声明为 never 的变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事改了 All 的类型：
interface Baz {
  type: 'Baz';
}
type All2 = Foo | Bar | Baz;
// 然而他忘记了在 handleValue 里面加上针对 Baz 的处理逻辑，这个时候在 default branch 里面 val 会被收窄为 Baz，导致无法赋值给 never，产生一个编译错误。所以通过这个办法，你可以确保 handleValue 总是穷尽 (exhaust) 了所有 All 的可能类型。

// NOTICE 运算符
// as 类型断言
/**
 * 开发过程中，有时候你会遇到这种情况：
 * 	你会比Ts更加了解某个值的详细信息。通常这会发生在你清楚的知道一个实体具体有比他现有类型更加准确的类型。
 * 	通过类型断言这种方式告诉编译器：‘ 我知道我要做什么 ’。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和结构。他没有运行时的影响，只是在编译阶段起作用。TS会假设你，程序员已经进行了必须的检查。
 **/
// 0. 尖括号语法：
let someValue: any = 'this is a strihang';
let strLength: number = (<string>someValue).length;
// 1. as
let someVal: any = 'this is a grammer for as';
let strLen: number = (someVal as string).length;
// 两种形式是等价的。至于使用哪种方式大多数是凭个人喜好的；然而当你在TS中使用jsx时，只有as是被允许的。
// 实际场景：
// TS不允许直接把确定的数据类型断言成另一个具体数据类型, 而是需要你首先去把这个类型断言成为一个unknown或者any这种不具体的,再把不具体的类型断言成另一个具体类型,这种规则可以防止不可能的强制转换;
// 0.
let num: number = 1323;
let str: string = num as unknown as string;
// 1.

class Person {
  sayHello() {
    console.log('hello');
  }
}
class Child extends Person {
  sayWorld() {
    console.log('世界');
  }
}
// child.sayHello
let c = new Child();
c.sayHello(); //父类
c.sayWorld();

function fn(p: Person) {
  p.sayHello();
  (p as Child).sayWorld();
}

// 非空断言运算符 !
// 这个运算符可以用在变量名或函数名之后，用来强调对应的元素是非 null | undefined
function onClick(callback?: () => void) {
  callback!(); // 参数是可选入参，铜鼓感叹号 ！ 之后，编译不会报错（es5没有非空判断）
}
// 这个符号的场景，特别适用于我们已经明确知道不会返回空值的场景，从而减少冗余的代码判断，如 React 的 Ref
// function Demo(): JSX.Elememt {
//   const divRef = useRef<HTMLDivElement>();
//   useEffect(() => {
//     divRef.current!.scrollIntoView();	 // 当组件Mount后才会触发useEffect，故current一定是有值的
//   }, []);
//   return <div ref={divRef}>Demo</div>
// }

// 可选链运算符  ?.
// 相对于非断言运算符!，可选运算符作是开发者最需要的运行时（编译时同样有效）的非空判断
let Obj = {
  prop: 'arg',
  index: 0,
};
Obj?.prop; // 编译器会生成=> Obj === null || Obj === void 0 ? void 0 : Obj.prop
// undefined非严格模式下会被重新赋值，使用void 0必定返真正的undefined
Obj?.['index'];
// Obj?.(args);

const orderId1 = response.result.data.orderId;
// 上面这种写法，很容易出现这种问题 orderId is undefined，稍微有些经验的我们立马就能想到，肯定是代码中 response.result.data 为 null 或者 undefined ，这样，你肯定获取不到 orderId。所以经验丰富的我们在遇到获取层级比较多的对象的时候，一般都是像下面这样写。

// 正确的写法
const orderId2 =
  (response &&
    response.result &&
    response.result.data &&
    response.result.data.orderId) ||
  '';

// 我们可以使用 ?. 来简化上面的代码。
const orderId3 = response?.result?.data?.orderId || '';

// 空值合并运算符 ??
// ?? 与 || 的功能相似，区别在于 ??在左侧表达式结果为null 或者undefined时，才会返回右侧表达式。
// || 表达式对false、''、 NaN、 0等逻辑空值也会生效，不适于我们做对参数的合并。
let n, m;
n = m ?? 10; // => let n = m !== null && void 0 ? n : 10

// 数字分割符 _  : 设计主要是为了便于阅读，编译结果不会有_
let number: number = 123_234_345;

// NOTICE ThisType<> 的用法
type ObjectConfigDesc<D, M> = {
  data: D;
  methods: M & ThisType<D & M>;
};

function makeObject<D, M>(config: ObjectConfigDesc<D, M>): D & M {
  let data = config?.data || {};
  let methods = config?.methods || {};
  return {
    ...data,
    ...methods,
  } as D & M;
}

let obj = makeObject({
  data: { x: -1, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

let options = makeObject({
  data: {
    x: -1,
    y: -1,
  },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;
      this.y += dy;
    },
  },
});

options.x;
options.y;
options.moveBy(0, 1);

// NOTICE 操作符
// 键值的获取 keyof
// keyof 可以获取一个类型所有键值，返回一个联合类型：
type Animal = {
  cat: '猫';
  dog: '狗';
  duck: '鸭';
};

type animal = keyof Animal; // animal 得到的类型为 'cat' | 'dog' | 'duck'
// 利用keyof访问对象的key合法化，因为any做索引是不被接受的
function getValue(params: Person, k: keyof Person) {
  // return p[k];
  // 如果 k 不如此定义，则无法以p[k]的代码格式通过编译
}

// 实例类型获取 typeof
// typeof 是获取一个对象|实例的类型：
const me: Persons = { name: 'zhangsan', age: 20 };
type per = typeof me;
const you: typeof me = { name: 'lisi', age: 21 };
// typeof 只能用于具体的对象上，这与js中的typeof是一致的，并且他会根据左侧值自动决定应该执行那种行为
const typeStr = {} as typeof me as object;
// typeof 和 keyof 一起使用
type perKey = keyof typeof typeStr;
type perKey1 = keyof typeof me;

// 遍历属性 in 只能用在类型定义中，可以对枚举类型进行遍历。

// NOTICE 实战测试
// NOTICE Q: 偏好使用 interface 还是 type 来定义类型？
// A: 从用法上来说两者本质上没有区别，大家使用 React 项目做业务开发的话，主要就是用来定义 Props 以及接口数据类型。

// 但是从扩展的角度来说，type 比 interface 更方便拓展一些，假如有以下两个定义：

type Name = { name: string };
interface IName {
  name: string;
}
// 想要做类型的扩展的话，type 只需要一个&，而 interface 要多写不少代码。

type Person1 = Name & { age: number };
interface IPerson extends IName {
  age: number;
}
// 另外 type 有一些 interface 做不到的事情，比如使用|进行枚举类型的组合，使用typeof获取定义的类型等等。

// 不过 interface 有一个比较强大的地方就是可以重复定义添加属性，比如我们需要给window对象添加一个自定义的属性或者方法，那么我们直接基于其 Interface 新增属性就可以了。

// declare global {
//   interface Window {
//     MyNamespace: any;
//   }
// }
// 总体来说，大家知道 TS 是类型兼容而不是类型名称匹配的，所以一般不需用面向对象的场景或者不需要修改全局类型的场合，我一般都是用 type 来定义类型。

// NOTICE Q: 是否允许 any 类型的出现
// A: 说实话，刚开始使用 TS 的时候还是挺喜欢用 any 的，毕竟大家都是从 JS 过渡过来的，对这种影响效率的代码开发方式并不能完全接受，因此不管是出于偷懒还是找不到合适定义的情况，使用 any 的情况都比较多。

// 随着使用时间的增加和对 TS 学习理解的加深，逐步离不开了 TS 带来的类型定义红利，不希望代码中出现 any，所有类型都必须要一个一个找到对应的定义，甚至已经丧失了裸写 JS 的勇气。

// 这是一个目前没有正确答案的问题，总是要在效率和时间等等因素中找一个最适合自己的平衡。不过我还是推荐使用 TS，随着前端工程化演进和地位的提高，强类型语言一定是多人协作和代码健壮最可靠的保障之一，多用 TS，少用 any，也是前端界的一个普遍共识。

// NOTICE Q: 类型定义文件(.d.ts)如何放置
// A: 这个好像业界也没有特别统一的规范，我的想法如下：

// 临时的类型，直接在使用时定义
// 如自己写了一个组件内部的 Helper，函数的入参和出参只供内部使用也不存在复用的可能，可以直接在定义函数的时候就在后面定义。

function format(input: { k: string }[]): number[] {
  /***/
}
// 组件个性化类型，直接定义在 ts(x)文件中
// 如 AntD 组件设计，每个单独组件的 Props、State 等专门定义了类型并 export 出去。

// Table.tsx
export type TableProps = {
  /***/
};
export type ColumnProps = {
  /***/
};
export default function Table() {
  /***/
}
// 这样使用者如果需要这些类型可以通过 import type 的方式引入来使用。

// 范围/全局数据，定义在.d.ts 文件中
// 全局类型数据，这个大家毫无异议，一般根目录下有个 typings 文件夹，里面会存放一些全局类型定义。

// 假如我们使用了 css module，那么我们需要让 TS 识别.less 文件(或者.scss)引入后是一个对象，可以如此定义：

declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}
// 而对于一些全局的数据类型，如后端返回的通用的数据类型，我也习惯将其放在 typings 文件夹下，使用 Namespace 的方式来避免名字冲突，如此可以节省组件 import 类型定义的语句。

declare namespace EdgeApi {
  interface Department {
    description: string;
    gmt_create: string;
    gmt_modify: string;
    id: number;
    name: string;
  }
}
// 这样，每次使用的时候，只需要const department: EdgeApi.Department即可，节省了不少导入的精力。开发者只要能约定规范，避免命名冲突即可。
