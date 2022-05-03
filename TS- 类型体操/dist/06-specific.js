"use strict";
/**
 * 特殊类型的特性：
 * 1. any never union
 * 2. 类的public、protected、private
 * 3. 具体索引：可选和非可选索引
 * 		索引签名：
*/
class instance1 {
    constructor() {
        this.name = "zhangsan";
        this.age = 99;
        this.hobbies = ["study", "watch the move"];
    }
}
// NOTICE
// any 类型与任何类型的交叉都是any，例如：1 & any结果是any，可以用这个特性判断any类型.
// 联合类型作为类型参数出现在条件类型左侧时，会被分散成单个类型传入，最后合并
// never 作为类型参数出现在条件类型左侧时，会直接返回never
// any 作为类型参数出现在条件类型左侧时，会直接返回trueType 和 falseType的联合类型
// 元组类型也是数组类型，但每个元素都是只读的，并且length是数字字面量，而数组的length是number。可以用来判断元组类型。
// 函数参数处会发生逆变，可以用来实现联合类型转交叉类型。
// 可选索引的值为 undefined 和 值类型的联合类型。可以用来过滤可选索引，反过来也可以过滤非可选索引。
// 索引类型的索引位字符串字面量类型，而可索引签名不是。可以利用这个特性过滤掉可索引签名。
// keyof 只能拿到class的public的索引，可以用来过滤出public的属性。
