import * as React from 'react';
import { PropsPopoverContainer } from './PopoverContainer';

export const usePopover = () => {
	const [trigger, setTrigger] = React.useState<PropsPopoverContainer['trigger']>(null);
	const [isOpened, setIsOpened] = React.useState<PropsPopoverContainer['isOpened']>(false);
	const open = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget;
		setTrigger(target);
		setIsOpened(true);
	}
	const close = () => {
		setIsOpened(false);
	}
	return { isOpened, trigger, open, close };
}
