function myIterator(props) {
	let idx = 0
		, len = props.length;
	return {
		next: function () {
			let done = idx >= len
				, value = !done ? props[idx++] : undefined;
			return {
				done: done,
				value: value
			}
		},
		[Symbol.iterator]: function() { return this }//允许一个迭代器能被各种需要可迭代对象的语法所使用
	}
}


var iterator = myIterator(['1号选手', '2号选手', '3号选手'])
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
