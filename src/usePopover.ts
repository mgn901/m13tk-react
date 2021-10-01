import * as React from 'react';
import { PropsPopoverContainer } from './PopoverContainer';

export const usePopover = () => {
	const [trigger, setTriggerPopover] = React.useState<PropsPopoverContainer['trigger']>(null);
	const [isOpened, setIsPopoverOpened] = React.useState<PropsPopoverContainer['isOpened']>(false);
	const openPopover = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget;
		setTriggerPopover(target);
		setIsPopoverOpened(true);
	}
	const closePopover = () => {
		setIsPopoverOpened(false);
	}
	return { isOpened, trigger, openPopover, closePopover }
}
