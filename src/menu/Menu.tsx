import * as React from 'react';
import { MenuItemRadio, MenuItemRadioSrc } from './MenuItemRadio';
import { MenuItem, MenuItemSrc } from './MenuItem';
import { MenuItemCheckbox, MenuItemCheckboxSrc } from './MenuItemCheckbox';

export interface PropsMenu {
	menuItems: (MenuItemSrc | MenuItemCheckboxSrc | MenuItemRadioSrc)[];
}

export const Menu: React.FC<PropsMenu> = ({ menuItems }) => {
	const renderedMenuItems = menuItems.map((item) => {
		switch (item.type) {
			case 'menuItem':
				if (item.buttonProps) {
					return <MenuItem
						key={item.text.toString()}
						buttonProps={item.buttonProps}
						iconLeft={item.iconLeft}
						text={item.text}
						iconRight={item.iconRight} />
				} else {
					return <MenuItem
						key={item.text.toString()}
						anchorProps={item.anchorProps}
						iconLeft={item.iconLeft}
						text={item.text}
						iconRight={item.iconRight} />
				}
			case 'menuItemCheckbox':
				return <MenuItemCheckbox
					key={item.text.toString()}
					inputProps={item.inputProps}
					text={item.text}
					iconRight={item.iconRight}
					labelProps={item.labelProps} />
			case 'menuItemRadio':
				return <MenuItemRadio
					key={item.text.toString()}
					inputProps={item.inputProps}
					text={item.text}
					iconRight={item.iconRight}
					labelProps={item.labelProps} />
		}
	});
	return <ul className='tkcnt-y tkm-3 tkb-normal tkr-2' role='menu'>
		{renderedMenuItems}
	</ul>;
}
