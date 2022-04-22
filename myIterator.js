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
		}
	}
}


var iterator = myIterator(['1号选手', '2号选手', '3号选手'])
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
