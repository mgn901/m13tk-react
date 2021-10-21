import * as React from 'react';
import { Dict, DictSrc } from '.';

const generateDict = <T extends string, U = React.ReactNode>(dictSrc: DictSrc<U>): Dict<T, U> => {
	const { src, preferences, fallback } = dictSrc;
	const preferencesLC = preferences.map((str) => str.toLowerCase());
	const dict = {} as Dict<T, U>;
	const srcKeys = Object.keys(src);
	for (let i = 0; i < srcKeys.length; i++) {
		const srcItem = src[srcKeys[i]];
		let intersection: string[] = [];
		const srcItemKeys = Object.keys(srcItem);
		for (let i = 0; i < preferencesLC.length; i++) {
			if (srcItemKeys.indexOf(preferencesLC[i]) !== -1) {
				intersection.push(preferencesLC[i]);
			}
		}
		if (intersection.length === 0) {
			dict[srcKeys[i]] = srcItem[fallback];
		} else {
			dict[srcKeys[i]] = srcItem[intersection[0]];
		}
	}
	return dict;
}

export const useDict = <T extends string, U = React.ReactNode>(dictSrc: DictSrc<U>): Dict<T, U> => {
	return React.useMemo(() => generateDict<T, U>(dictSrc), [dictSrc]);
}
