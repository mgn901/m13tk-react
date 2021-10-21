import * as React from 'react';

export type PropsMenuItemRadio = {
	inputProps: React.InputHTMLAttributes<HTMLInputElement> & { [key: string]: any },
	text: React.ReactNode,
	iconRight?: string,
	labelProps?: React.ButtonHTMLAttributes<HTMLLabelElement> & { [key: string]: any },
}

export type MenuItemRadioSrc = { type: 'menuItemRadio' } & PropsMenuItemRadio;

export const MenuItemRadio: React.FC<PropsMenuItemRadio> = (props) => {
	const { text, iconRight, labelProps, inputProps } = props;
	return <li className='tkcnt-y' role='presentation'>
		<label
			{...labelProps}
			className={(labelProps ? labelProps.className : '') + ' tkcnt-x tkbtn-flat tkp-2 tkr-2'}
			role='menuitemradio'>
			<input
				{...inputProps}
				className={(labelProps ? inputProps.className : '') + ' tkinput-radio tkm-2'}
				type='radio' />
			<span className='tkcnt-x tktxt tkm-2'>{text}</span>
			<span
				className='tkchip-x tktxt-icon tktxt-large tkx-6 tkm-2 tkcolor-fg2'
				aria-hidden={true}>
				{iconRight}
			</span>
		</label>
	</li>;
}
