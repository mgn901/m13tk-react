import * as React from 'react';
import { Menu, PropsMenu } from '../menu/Menu';
import { useDict } from './useDict';
import { View } from '../view/View';
import { Lang } from '.';

interface PropsSelectLang {
	name: string,
	currentView: string,
	headRef: React.RefObject<HTMLElement>
	langs: Lang[],
	availableLangs: { name: Lang, displayName: string }[],
	changeLangs: (lang: string) => void,
	backToParent?: () => void,
}

export const SelectLang: React.FC<PropsSelectLang> = (props) => {
	const { name, currentView, headRef, langs, availableLangs, backToParent, changeLangs } = props;
	const handleChangeLang = (e: React.ChangeEvent<HTMLInputElement>) => {
		const el = e.currentTarget;
		changeLangs(el.value);
	}
	const dictSrc = {
		'home.head': {
			'ja': '言語の選択',
			'en-us': 'Select Languages',
		},
	};
	const dict = useDict<keyof typeof dictSrc, string>({
		src: dictSrc,
		preferences: langs,
		fallback: 'en-us',
	});
	const menuItems: PropsMenu['menuItems'] = availableLangs.map((lang) => {
		return {
			type: 'menuItemRadio',
			inputProps: {
				name: 'lang',
				defaultValue: lang.name,
				checked: langs.indexOf(lang.name) === 0,
				onChange: handleChangeLang,
			},
			text: lang.displayName,
		};
	});
	return <View
		name={name}
		currentView={currentView}
		headRef={headRef}
		langs={langs}
		backToParent={backToParent}
		head={dict['home.head']}>
		<Menu menuItems={menuItems} />
	</View>;
}
