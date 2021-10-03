import * as React from 'react';
import { PropsPopoverContainer } from './PopoverContainer';

export const computeStyle = (
	triggerRect: DOMRect,
	containerWidth: number,
	containerHeight: number,
	place: PropsPopoverContainer['place'] = 'topBottom',
) => {
	const vpWidth = document.documentElement.clientWidth;
	const vpHeight = document.documentElement.clientHeight;
	const pageWidth = document.documentElement.offsetWidth;
	const pageHeight = document.documentElement.offsetHeight;
	let newStyle: React.CSSProperties = {};
	let transformOrigin = [0, 0];
	if (place === 'topBottom') {
		// 上: ページ上からトリガー下までの距離
		const top = triggerRect.bottom + scrollY;
		// 左: ページ左からトリガー左までの距離+移動
		const left = triggerRect.left + scrollX + triggerRect.width / 2 - containerWidth / 2;
		// 右: ページ右からトリガー右までの距離+移動-調整
		const right = pageWidth - (triggerRect.left + scrollX) + triggerRect.width / 2 - containerWidth / 2 - (pageWidth - vpWidth);
		// 下: ページ下からトリガー上までの距離-調整
		const bottom = pageHeight - (triggerRect.top + scrollY) - (pageHeight - vpHeight);
		// 画面上からトリガー上までの距離 < 画面下からトリガー下までの距離
		if (triggerRect.top < vpHeight - triggerRect.bottom) {
			newStyle.top = top;
			newStyle.maxHeight = vpHeight - triggerRect.bottom;
		} else {
			newStyle.bottom = bottom;
			newStyle.maxHeight = triggerRect.top;
		}
		// 画面左からトリガー左までの距離 < 画面右からトリガー右までの距離
		if (triggerRect.left < vpWidth - triggerRect.right) {
			// 左0はscrollX
			newStyle.left = left > scrollX ? left : scrollX;
		} else {
			// 右0は-scrollX
			newStyle.right = right > -scrollX ? right : -scrollX;
		}
	} else {
		const left = triggerRect.right + scrollX;
		const top = triggerRect.top + scrollY + triggerRect.height / 2 - containerHeight / 2;
		const bottom = pageHeight - (triggerRect.bottom + scrollY) + triggerRect.height / 2 - containerHeight / 2 - (pageHeight - vpHeight);
		const right = pageWidth - (triggerRect.left + scrollX) - (pageWidth - vpWidth);
		if (triggerRect.left < vpWidth - triggerRect.right) {
			newStyle.left = left;
			newStyle.maxWidth = vpWidth - triggerRect.right;
		} else {
			newStyle.right = right;
			newStyle.maxWidth = triggerRect.left;
		}
		if (triggerRect.top < vpHeight - triggerRect.bottom) {
			newStyle.top = top > scrollY ? top : scrollY;
		} else {
			newStyle.bottom = bottom > -scrollY ? bottom : -scrollY;
		}
		newStyle.maxHeight = vpHeight;
	}
	return newStyle;
}
