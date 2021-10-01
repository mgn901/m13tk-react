import * as React from 'react';
import { usePopoverContext } from './ProviderPopoverContext';

export const PopoverRenderer: React.FC = () => {
	const { instances } = usePopoverContext();
	return <div className='tkreact-popover-renderer'>
		{instances}
	</div>
}
