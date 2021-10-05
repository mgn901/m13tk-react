import * as React from 'react';
import { PropsPopoverContainer } from './PopoverContainer';

type Dict = {
	[K in PropsPopoverContainer['place']]: {
		name: string,
		value: number,
		alternateValue?: number,
	}
}[];

export const computeStyle = (
	triggerRect: DOMRect,
	containerWidth: number,
	containerHeight: number,
	place: PropsPopoverContainer['place'],
	distance: PropsPopoverContainer['distance'],
	margin: PropsPopoverContainer['margin'],
): React.CSSProperties => {
	const vpWidth = document.documentElement.clientWidth;
	const vpHeight = document.documentElement.clientHeight;
	const pageWidth = document.documentElement.offsetWidth;
	const pageHeight = document.documentElement.offsetHeight;
	const adjustPosX = - (pageWidth - vpWidth);
	const adjustPosY = - (pageHeight - vpHeight);
	const adjustAxisX = triggerRect.width / 2 - containerWidth / 2;
	const adjustAxisY = triggerRect.height / 2 - containerHeight / 2;
	const axisLengthSrc = [{
		topBottom: vpHeight - triggerRect.bottom,
		rightLeft: vpWidth - triggerRect.right,
	}, {
		topBottom: triggerRect.top,
		rightLeft: triggerRect.left,
	}];
	const axisLength: Dict = [{
		topBottom: { name: 'maxHeight', value: axisLengthSrc[0].topBottom },
		rightLeft: { name: 'maxWidth', value: axisLengthSrc[0].rightLeft },
	}, {
		topBottom: { name: 'maxHeight', value: axisLengthSrc[1].topBottom },
		rightLeft: { name: 'maxWidth', value: axisLengthSrc[1].rightLeft },
	}];
	const contact: Dict = [{
		topBottom: { name: 'top', value: triggerRect.bottom + scrollY },
		rightLeft: { name: 'left', value: triggerRect.right + scrollX },
	}, {
		topBottom: { name: 'bottom', value: pageHeight - (triggerRect.top + scrollY) + adjustPosY },
		rightLeft: { name: 'right', value: pageWidth - (triggerRect.left + scrollX) + adjustPosX },
	}];
	const axis: Dict = [{
		topBottom: {
			name: 'left',
			value: triggerRect.left + scrollX + adjustAxisX,
			alternateValue: scrollX,
		},
		rightLeft: {
			name: 'top',
			value: triggerRect.top + scrollY + adjustAxisY,
			alternateValue: scrollY,
		},
	}, {
		topBottom: {
			name: 'right',
			value: pageWidth - (triggerRect.right + scrollX) + adjustAxisX + adjustPosX,
			alternateValue: -scrollX,
		},
		rightLeft: {
			name: 'bottom',
			value: pageHeight - (triggerRect.bottom + scrollY) + adjustAxisY + adjustPosY,
			alternateValue: -scrollY,
		},
	}];
	const transformOrigin = [{
		topBottom: {
			value: { x: '50%', y: '0%' },
			alternateValue: { x: triggerRect.left + triggerRect.width / 2 + 'px', y: '0%' },
		},
		rightLeft: {
			value: { x: '0%', y: '50%' },
			alternateValue: { x: '0%', y: triggerRect.top + triggerRect.height / 2 + 'px' },
		},
	}, {
		topBottom: {
			value: { x: '50%', y: '100%' },
			alternateValue: { x: containerWidth - (vpWidth - triggerRect.right) - triggerRect.width / 2 + 'px', y: '100%' },
		},
		rightLeft: {
			value: { x: '100%', y: '50%' },
			alternateValue: { x: '100%', y: containerHeight - (vpHeight - triggerRect.bottom) - triggerRect.height / 2 + 'px' },
		},
	}];
	const inactivePlace = place === 'topBottom' ? 'rightLeft' : 'topBottom';
	const idxC = axisLengthSrc[0][place] > axisLengthSrc[1][place] ? 0 : 1;
	const idxA = axisLengthSrc[0][inactivePlace] > axisLengthSrc[1][inactivePlace] ? 0 : 1;
	const valueToUse = axis[idxA][place].value > axis[idxA][place].alternateValue ? 'value' : 'alternateValue';
	const newStyle = {
		maxWidth: `calc(100% - 2 * (${margin}))`,
		maxHeight: `calc(100% - 2 * (${margin}))`,
		[contact[idxC][place].name]: `calc(${contact[idxC][place].value}px + (${distance}))`,
		[axis[idxA][place].name]: `max(calc(${axis[idxA][place].alternateValue}px + (${margin})),${axis[idxA][place].value}px)`,
		[axisLength[idxC][place].name]: `calc(${axisLength[idxC][place].value}px - (${margin}))`,
		transformOrigin: place === 'topBottom'
			? `calc(${transformOrigin[idxA][place][valueToUse].x} - 1 * ${idxA + 1} * (${margin})) ${transformOrigin[idxC][place][valueToUse].y}`
			: `${transformOrigin[idxC][place][valueToUse].x} calc(${transformOrigin[idxA][place][valueToUse].y} - 1 * ${idxA + 1} * (${margin}))`,
	};
	console.log(newStyle);
	return newStyle;
}
