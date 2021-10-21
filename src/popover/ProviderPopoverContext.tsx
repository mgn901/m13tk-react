import * as React from 'react';

interface ValuesPopoverContext {
	ids: number[],
	setIds: React.Dispatch<React.SetStateAction<ValuesPopoverContext['ids']>>,
};

const PopoverContext = React.createContext<ValuesPopoverContext>({
	ids: [],
	setIds: () => {},
});

export const usePopoverContext = () => {
	return React.useContext(PopoverContext);
}

export const ProviderPopoverContext: React.FC = (props) => {
	const [ids, setIds] = React.useState<ValuesPopoverContext['ids']>([]);
	return <PopoverContext.Provider value={{ ids, setIds }}>
		{props.children}
	</PopoverContext.Provider>
}
