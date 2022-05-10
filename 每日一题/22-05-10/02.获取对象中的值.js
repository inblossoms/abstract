/**
 * 需求：
 * input
 * const obj = {
 * 		selector: { to: { val: 'asdf' }},
 * 		target: [1, 2, { name: 'zhangsan'}]
 * }
 * 
 * get(obj, 'selector.to.val', 'target[2]')
 * output
 * [ 'adsf', 'zhangsan' ]  
*/
const obj = {
	person: {
		male: {
			name: 'zhangsan'
		},

		female: {
			name: 'xiaohong'
		}
	},

	address: [{ add: 'beijing' }, { add: 'tianjing' }]
}

function get(form, ...selectors) {
	return selectors.map((o) => {
		return res = o.replace(/\[(\w+)\]/g, '.$1')
			.split('.')
			.reduce((prev, cur) => {
				return cur && prev[cur]
			}, form)
	})
}

console.log(
get(obj, 'person.male.name', 'person.female.name', 'address[0].add')
);
