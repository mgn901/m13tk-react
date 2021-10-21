import { isInUnion } from './isInUnion';
import * as React from 'react';

export const useView = (availableViews: { [x: string]: React.RefObject<HTMLElement> }, home: string = 'home') => {
	const [view, setView] = React.useState<keyof typeof availableViews>(home);
	const changeView = (e: React.MouseEvent<HTMLButtonElement>) => {
		const el = e.currentTarget;
		const dest = el.dataset.dest;
		if (isInUnion(dest, Object.keys(availableViews))) {
			setView(dest);
		}
	}
	const backHome = () => {
		setView(home);
	}
	return { view, changeView, backHome }
}
