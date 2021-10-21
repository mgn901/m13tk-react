import * as React from 'react';

export type PropsMenuItem = {
	iconLeft?: string,
	text: React.ReactNode,
	iconRight?: string,
	buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & { [key: string]: any },
	anchorProps?: undefined,
} | {
	iconLeft?: string,
	text: React.ReactNode,
	iconRight?: string,
	buttonProps?: undefined,
	anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> & { [key: string]: any },
}

export type MenuItemSrc = { type: 'menuItem' } & PropsMenuItem;

export const MenuItem: React.FC<PropsMenuItem> = (props) => {
	const { iconLeft, text, iconRight } = props;
	if (props.buttonProps) {
		return <li className='tkcnt-y' role='presentation'>
			<button
				{...props.buttonProps}
				className={props.buttonProps.className + ' tkcnt-x tkbtn-flat tkp-2 tkr-2'}
				role='menuitem'>
				<span
					className='tkchip-x tktxt-icon tktxt-large tkx-6 tkm-2'
					aria-hidden={true}>
					{iconLeft}
				</span>
				<span className='tkcnt-x tktxt tkm-2'>{text}</span>
				<span
					className='tkchip-x tktxt-icon tktxt-large tkx-6 tkm-2 tkcolor-fg2'
					aria-hidden={true}>
					{iconRight}
				</span>
			</button>
		</li>;
	} else if (props.anchorProps) {
		return <li className='tkcnt-y' role='presentation'>
			<a
				{...props.anchorProps}
				className={props.anchorProps.className + ' tkcnt-x tkbtn-flat tkp-2 tkr-2'}
				role='menuitem'>
				<span
					className='tkchip-x tktxt-icon tktxt-large tkx-6 tkm-2'
					aria-hidden={true}>
					{iconLeft}
				</span>
				<span className='tkcnt-x tktxt tkm-2'>{text}</span>
				<span
					className='tkchip-x tktxt-icon tktxt-large tkx-6 tkm-2 tkcolor-fg2'
					aria-hidden={true}>
					{iconRight}
				</span>
			</a>
		</li>;
	}
}
