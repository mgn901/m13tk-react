export const isInUnion = (el: any, array: any[]): el is typeof array[number] => {
	return array.indexOf(el) !== -1;
}
