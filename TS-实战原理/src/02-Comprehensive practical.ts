// 函数重载的三种方法:
// 1. 声明两个同名函数达到重载的目的 也就是说同名的函数可以有多种类型的定义。

declare function func(name: string): string;
declare function func(name: any): any;

// func()// Test

// 2. 函数可以用interface的方式声明，同样也可以用interface的方式声明函数重载
interface Func {
  (name: any): any;
  (name: string): string;
}
declare const func1: Func;
// func1() // Test

// 3. 函数可以去交叉类型，也就是多种类型都可以；可用于函数重载
type Func2 = ((name: string) => string) & ((name: any) => any);

declare const func2: Func2;
// func2() // Test

// 复杂类型实例：
// NOTICE 取重载函数的ReturnType返回的是最后一个重载的返回值类型
// UnionToTuple : 联合类型转元组 'a'|'b"|'c'  => ['a','b','c']

type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToFuncIntersection<T> = UnionToIntersection<
  T extends any ? () => T : never
>;
// 返回交叉类型 达到函数重载的目的
type UnionToFuncIntersectionRes = UnionToFuncIntersection<'zhang' | 'san'>;
// 通过 ReturnType 取返回值类型
type ReturnTypeRes = ReturnType<UnionToFuncIntersectionRes>;
// 获取到最后一个类型，通过Exclude从联合类型中将其去掉，然后通过同样的方式获取‘最后一个值’，构成元组类型返回。
type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer ReturnType
  ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
  : [];
type UnionToTupleRes = UnionToTuple<'a' | 'b' | 'c'>;

// join
// jion 返回值是一个函数，同样也具有类型参数；类型参数Items是返回的函数的参数类型
declare function join<Delimiter extends string>(
  delimiter: Delimiter,
): <Items extends string[]>(...parts: Items) => JoinType<Items, Delimiter>;

// joinType 的实现是根据字符串元组构造字符串，用到提取和构造。因为数量不确定需要递归
// 类型参数分别是：item 字符串元组和delimiter 分割符类型。
type JoinType<
  Item extends any[],
  Delimiter extends string,
  Result extends string = '', // 保存结果
> = Item extends [infer cur, ...infer Res]
  ? JoinType<Res, Delimiter, `${Result}${Delimiter}${cur & string}`>
  : RemoveFiestDelimiter<Result>;

type RemoveFiestDelimiter<Str extends string> =
  Str extends `${infer _}${infer Res}` ? Res : Str;

let res = join('-')('zhang', 'san');

// DeepCamelize 递归的把索引类型的key转成CamelCase的
type DeepCamelize<Obj extends Record<string, any>> = Obj extends unknown[]
  ? CamelizeAry<Obj>
  : {
      [key in keyof Obj as key extends `${infer first}_${infer res}`
        ? `${first}${Capitalize<res>}`
        : key]: DeepCamelize<Obj[key]>;
    };

// camelizeAry 递归处理每一个元素
type CamelizeAry<Ary> = Ary extends [infer first, ...infer res]
  ? [DeepCamelize<first>, ...CamelizeAry<res>]
  : [];

type obj = {
  aaa_bbb: string;
  bbb_ccc: [
    {
      ccc_ddd: string;
    },
    {
      ddd_eee: string;
      eee_fff: {
        fff_ggg: string;
      };
    },
  ];
};
type DeepCamelizeRes = DeepCamelize<obj>;

// Defaultize
type Defaultize<x, y> = Pick<x, Exclude<keyof x, keyof y>> &
  Partial<Pick<x, Extract<keyof x, keyof y>>> &
  Partial<Pick<y, Exclude<keyof y, keyof x>>>;

type computed<Obj extends Record<string, any>> = {
  [key in keyof Obj]: Obj[key];
};

type o = {
  name: 'zhangsan';
  age: 21;
};

type p = {
  name: 'lisi';
  sex: 'male';
};
type DefaultizeRes = computed<Defaultize<o, p>>;
