import * as React from 'react';
import { PropsPopoverContainer } from './PopoverContainer';

export const usePopover = () => {
	const [trigger, setTrigger] = React.useState<PropsPopoverContainer['trigger']>(null);
	const [isOpened, setIsOpened] = React.useState<PropsPopoverContainer['isOpened']>(false);
	const open = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget;
		setTrigger(target);
		setIsOpened(true);
	}, []);
	const close = React.useCallback(() => {
		setIsOpened(false);
	}, [trigger]);
	React.useEffect(() => {
		if (!isOpened) {
			trigger?.focus();
		}
	}, [isOpened, trigger]);
	return { isOpened, trigger, open, close };
}
