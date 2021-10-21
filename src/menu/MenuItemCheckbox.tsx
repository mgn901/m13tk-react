import * as React from 'react';

export type PropsMenuItemCheckbox = {
	text: React.ReactNode,
	iconRight?: string,
	inputProps: React.InputHTMLAttributes<HTMLInputElement> & { [key: string]: any },
	labelProps?: React.ButtonHTMLAttributes<HTMLLabelElement> & { [key: string]: any },
}

export type MenuItemCheckboxSrc = { type: 'menuItemCheckbox' } & PropsMenuItemCheckbox;

export const MenuItemCheckbox: React.FC<PropsMenuItemCheckbox> = (props) => {
	const { text, iconRight, labelProps, inputProps } = props;
	return <li className='tkcnt-y' role='presentation'>
		<label
			{...labelProps}
			className={(labelProps ? labelProps.className : '') + ' tkcnt-x tkbtn-flat tkp-2 tkr-2'}
			role='menuitemcheckbox'>
			<input
				{...inputProps}
				className={inputProps.className + ' tkinput-checkbox tkm-2'}
				type='checkbox' />
			<span className='tkcnt-x tktxt tkm-2'>{text}</span>
			<span
				className='tkchip-x tktxt-icon tktxt-large tkx-6 tkm-2 tkcolor-fg2'
				aria-hidden={true}>
				{iconRight}
			</span>
		</label>
	</li>;
}
