import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { computeStyle } from './computeStyle';
import { usePopoverContext } from './ProviderPopoverContext';

export interface PropsPopoverContainer {
	children: React.ReactNode,
	isOpened: boolean,
	trigger: Element | null,
	closePopover: () => void,
	className?: HTMLElement['className'],
}

export const PopoverContainer: React.FC<PropsPopoverContainer> = (props) => {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const { instances, setInstances } = usePopoverContext();
	const [idx, setIdx] = React.useState<number | null>(null);
	const [key, setKey] = React.useState(Math.random() * (2 ** 53));
	const [style, setStyle] = React.useState<React.CSSProperties>({});
	const className = props.className === undefined ? '' : ` ${props.className}`;
	const renderedInstance = <div key={key} className='tkreact-popover-instance'>
		{props.isOpened
			&& <button
				className='tkreact-popover-closer'
				onClick={props.closePopover}
				aria-hidden={true}></button>
		}
		<CSSTransition
			in={props.isOpened}
			timeout={100}
			classNames='tkreact-popover-container-transition'>
			<div
				ref={containerRef}
				className={`tkreact-popover-container${className}`}
				style={style}>
				{props.children}
			</div>
		</CSSTransition>
	</div>
	let newIdx: number;
	React.useEffect(() => {
		Promise.resolve().then(() => {
			setInstances((instances) => {
				let newInstances = [...instances];
				newInstances.push(renderedInstance);
				newIdx = newInstances.length - 1;
				return newInstances;
			});
		}).then(() => {
			setIdx(newIdx);
		});
		return () => {
			setInstances((instances) => {
				let newInstances = [...instances];
				newInstances[newIdx] = null;
				return newInstances;
			});
		}
	}, []);
	React.useEffect(() => {
		Promise.resolve().then(() => {
			setInstances((instances) => {
				let newInstances = [...instances];
				newInstances[idx] = renderedInstance;
				return newInstances;
			});
		}).then(() => {
			console.log(props.trigger);
			console.log(containerRef.current !== null ? containerRef.current.getBoundingClientRect() : undefined);
			setStyle(computeStyle(props.trigger, containerRef.current));
		});
	}, [idx, props]);
	return <></>
}
