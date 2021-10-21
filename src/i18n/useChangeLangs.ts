import * as React from 'react';
import { Lang } from '.';

export const useChangeLangs = () => {
	const initLangs: Lang[] = React.useMemo(() => {
		const src = [...window.navigator.languages];
		return src.map((string) => string.toLowerCase()) as Lang[];
	}, []);
	const [langs, setLangs] = React.useState<Lang[]>(initLangs);
	const changeLangs = React.useCallback((lang: Lang) => {
		setLangs((langs) => {
			let newLangs: Lang[] = [...langs];
			if (newLangs.length === initLangs.length) {
				newLangs.splice(0, 0, lang);
			} else {
				newLangs[0] = lang;
			}
			document.documentElement.lang = newLangs[0];
			return newLangs;
		});
	}, []);
	return { langs, changeLangs };
}
