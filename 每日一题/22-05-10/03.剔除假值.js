/**
 * const data = {
		a: 'zhangsan',
		b: null,
		c: 1234,
		d: '   ',
		e: false,
		f: ['a', ' ', 'b'],
		g: {
			q: false,
			w: 'asdf'
		}
	}

	input
	compactdataect(data)

	output
	{}

*/


const data = {
	a: 'zhangsan',
	b: null,
	c: 1234,
	d: '   ',
	e: false,
	f: ['a', undefined, 'b'],
	g: {
		0: false,
		1: 'asdf'
	}
}

function compactObject(val) {
	const data = Array.isArray(val) ? val.filter(Boolean) : val
	return Object.keys(data).reduce((acc, key) => {
		data[key] && (acc[key] = typeof data[key] === 'object' ? compactObject(data[key]) : data[key])
		return acc
	}, Array.isArray(data) ? [] : {})
}

console.log(compactObject(data));
