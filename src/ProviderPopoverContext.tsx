import * as React from 'react';

interface ValuesPopoverContext {
	instances: React.ReactNode[],
	setInstances: React.Dispatch<React.SetStateAction<ValuesPopoverContext['instances']>>,
}

const PopoverContext = React.createContext<ValuesPopoverContext>({
	instances: [],
	setInstances: () => {},
});

export const usePopoverContext = () => {
	return React.useContext(PopoverContext);
}

export const ProviderPopoverContext: React.FC = (props) => {
	const [instances, setInstances] = React.useState<ValuesPopoverContext['instances']>([]);
	return <PopoverContext.Provider value={{ instances, setInstances }}>
		{props.children}
	</PopoverContext.Provider>
}
