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


class SimpleClass {
  constructor(data) {
    this.data = data
  }

  [Symbol.iterator]() {
    // Use a new index for each iterator. This makes multiple
    // iterations over the iterable safe for non-trivial cases,
    // such as use of break or nested looping over the same iterable.
    let index = 0;

    return {
      next: () => {
        if (index < this.data.length) {
          return {value: this.data[index++], done: false}
        } else {
          return {done: true}
        }
      }
    }
  }
}

const simple = new SimpleClass([1,2,3,4,5])

for (const val of simple) {
  console.log(val)   //'1' '2' '3' '4' '5'
}
