import * as React from 'react';

interface PropsIcon {
	name: string,
	props?: React.HTMLAttributes<HTMLSpanElement>,
}

export const Icon: React.FC<PropsIcon> = ({ name, props }) => {
	return <span
		{...props}
		className={(props ? props.className : '') + ' tkchip-x tktxt-icon tktxt-large tkx-6'}>
		{name}
	</span>;
}

export const Spinner: React.FC<Pick<PropsIcon, 'props'>> = ({ props }) => {
	return <span
		{...props}
		className={(props ? props.className : '') + ' tkchip-x tktxt-spinner tktxt-large tkx-6'}>
	</span>;
}
