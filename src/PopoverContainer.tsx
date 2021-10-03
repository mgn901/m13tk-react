import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { computeStyle } from './computeStyle';
import { usePopoverContext } from './ProviderPopoverContext';
import * as ReactDOM from 'react-dom';

export interface PropsPopoverContainer {
	children: React.ReactNode,
	isOpened: boolean,
	trigger: Element | null,
	close: () => void,
	place?: 'topBottom' | 'rightLeft',
	className?: HTMLElement['className'],
};

export const PopoverContainer: React.FC<PropsPopoverContainer> = (props) => {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const { ids, setIds } = usePopoverContext();
	const [id, setId] = React.useState(Math.random() * (2 ** 53));
	const [ready, setReady] = React.useState<boolean>(false);
	const initialRect = {
		x: 0,
		y: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: 0,
		height: 0,
		toJSON: () => { },
	};
	const [triggerRect, setTriggerRect] = React.useState<DOMRect>(initialRect);
	const [style, setStyle] = React.useState<React.CSSProperties>({});
	const className = props.className === undefined ? '' : ` ${props.className}`;
	const elementId = 'tkreact-popover-instance-' + id;
	if (ids.indexOf(id) === -1) {
		setIds((ids) => {
			ids.push(id);
			return ids;
		});
	}
	React.useEffect(() => {
		const id_ = id;
		setReady(true);
		return () => {
			setIds((ids) => {
				const idx = ids.indexOf(id_);
				ids.splice(idx);
				return ids;
			});
		};
	}, []);
	React.useEffect(() => {
		const newTriggerRect = props.trigger !== null
			? props.trigger.getBoundingClientRect()
			: triggerRect;
		const containerWidth = containerRef.current !== null
			? containerRef.current.offsetWidth
			: 0
		const containerHeight = containerRef.current !== null
			? containerRef.current.offsetHeight
			: 0
		setTriggerRect(newTriggerRect);
		if (props.isOpened) {
			const newStyle = computeStyle(newTriggerRect, containerWidth, containerHeight, props.place);
			setStyle(newStyle);
		}
	}, [props.isOpened, props.children]);
	const renderedInstance = <>
		{props.isOpened
			&& <button
				className='tkreact-popover-closer'
				onClick={props.close}
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
	</>;
	if (ready) {
		return ReactDOM.createPortal(renderedInstance, document.getElementById(elementId));
	} else {
		return null;
	}
}
