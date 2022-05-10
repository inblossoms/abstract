/**
 * input
 * [ 'foo.txt', '.bar' , '','baz.js']
 * output
 e ['~/每日一练/foo.txt','~/每日一练/.bar'],'~/每日一练/baz.js']]
*/


const files = [' foo.txt', '.bar ', '   ', ' baz.js ']

//  way 1
function chain(files) {
	const filesPath = files.map(f => f.trim())
		.filter(Boolean)// 过滤虚值
		.map(filesName => `~/每日一练/${filesName}`)
	return filesPath
}

console.log(chain(files));

// way 2
function reduceWay(files) {
	const filesPath = files.reduce((prev, cur) => {
		if (cur.trim()) {
			const fileName = `~/每日一练/${cur}`
			prev.push(fileName)
		}
		return prev
	}, [])
	return filesPath
}

console.log(reduceWay(files));