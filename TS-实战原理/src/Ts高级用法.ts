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

