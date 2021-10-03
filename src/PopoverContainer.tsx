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
	timeout?: number;
	className?: HTMLElement['className'],
};

export const PopoverContainer: React.FC<PropsPopoverContainer> = (props) => {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const { ids, setIds } = usePopoverContext();
	const [id, setId] = React.useState<number>(Math.random() * (2 ** 53));
	const [ready, setReady] = React.useState<boolean | number>(false);
	const [element, setElement] = React.useState<HTMLElement>(null);
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
	const className = props.className !== undefined ? ` ${props.className}` : '';
	const conditionalClassName = props.isOpened ? '' : 'tkreact-popover-container-transition-exit-done';
	const timeout = props.timeout !== undefined ? props.timeout : 100;
	React.useEffect(() => {
		setIds((ids) => {
			let newIds = [...ids];
			newIds.push(id);
			return newIds;
		});
		const id_ = id;
		return () => {
			setIds((ids) => {
				let newIds = [...ids];
				const idx = ids.indexOf(id_);
				newIds.splice(idx);
				return newIds;
			});
		};
	}, []);
	React.useEffect(() => {
		const newElement = document.getElementById('tkreact-popover-instance-' + id);
		setElement(newElement);
		if (ready !== true && newElement !== null) {
			setReady(true);
		} else if (newElement === null) {
			setReady((ready) => {
				if (typeof ready === 'number') {
					return ready + 1;
				}
				return 0;
			});
		}
	}, [ready]);
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
			appear={true}
			timeout={timeout}
			classNames='tkreact-popover-container-transition'>
			<div
				ref={containerRef}
				className={`tkreact-popover-container${className} ${conditionalClassName}`}
				style={style}>
				{props.children}
			</div>
		</CSSTransition>
	</>;
	if (ready === true) {
		return ReactDOM.createPortal(renderedInstance, element);
	} else {
		return null;
	}
}