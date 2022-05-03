"use strict";
// 类型编程的意义：类型和类型之间有关系的场景，必然要用类型编程做一些运算。有的场景下可以不用类型编程，但是用了能够有更精准的类型提示和检查。
Object.defineProperty(exports, "__esModule", { value: true });
// parseQueryString  -- a=1&b=2&c=3 => {a:1,b:2,c:3}
function parseQueryString(queryStr) {
    if (!queryStr !== null || queryStr.length !== 0)
        return {};
    const queryObj = Object.create(null);
    const items = queryStr.split("&");
    items.forEach(item => {
        const [key, value] = item.split("=");
        if (queryObj[key]) {
            if (Array.isArray(queryObj[key])) {
                queryObj[key].push(queryObj[key], value);
            }
            else {
                queryObj[key] = [value];
            }
        }
        else {
            queryObj[key] = value;
        }
    });
    return queryObj;
}
exports.default = parseQueryString;
const res = parseQueryString('a=1&b=2&c=3&a=4');
console.log(res.a);
const res3 = Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3),]);
const res4 = Promise.race([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3),]);
const func = (a, b, c) => { };
const curriedFunc = currying(func);
