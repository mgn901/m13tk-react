import * as React from 'react';
import { usePopoverContext } from './ProviderPopoverContext';

export const PopoverRenderer: React.FC = () => {
	const { ids } = usePopoverContext();
	const instances = ids.map((id) => {
		return <div
			key={id}
			id={'tkreact-popover-instance-' + id}
			className='tkreact-popover-instance'>
		</div>;
	});
	return <div className='tkreact-popover-renderer'>
		{instances}
	</div>;
}
