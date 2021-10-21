import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { computeStyle } from './computeStyle';
import { usePopoverContext } from './ProviderPopoverContext';
import * as ReactDOM from 'react-dom';

export interface PropsPopoverContainer {
	// isOpened: PopoverContainerを開いているときはtrue、閉じているときはfalse
	isOpened: boolean,
	// trigger: PopoverContainerを開くときに押下された要素
	trigger: HTMLElement | null,
	// close: PopoverContainerを閉じる関数。usePopoverの返り値のものをそのまま使う。
	close: () => void,
	// headRef: PopoverContainerが開いたらフォーカスされてほしい要素の参照
	headRef: React.RefObject<HTMLElement>,
	timeout?: number,
	place?: 'topBottom' | 'rightLeft',
	distance?: string,
	margin?: string,
	// wrapperClassName: PopoverContainerの要素の親要素（wrapper）に対するクラス名
	wrapperClassName?: string,
	arrowClassName?: string,
	// props: PopoverContainerの要素（childrenの親）に対するprops
	props?: React.HTMLAttributes<HTMLDivElement>,
	debug?: boolean,
};

const PopoverContainer: React.FC<PropsPopoverContainer> = (props) => {
	// wrapperRef: PopoverContainerの要素に対する参照
	const wrapperRef = React.useRef<HTMLDivElement | null>(null);
	// id: PopoverContainerのID
	const id = React.useState<number>(Math.random() * (2 ** 53))[0];
	// ids: すべてのPopoverContainerのID。PopoverContextで管理されている。
	// setIds: その情報を変更するための関数
	const setIds = usePopoverContext().setIds;
	// ready: PopoverRendererが描画先の要素を用意できていればtrue
	const [ready, setReady] = React.useState<boolean | number>(false);
	// element: 描画先の要素
	const [element, setElement] = React.useState<HTMLElement>(null);
	// initialRect: triggerRectの初期値
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
	// triggerRect: トリガーのDOMRect
	const [triggerRect, setTriggerRect] = React.useState<DOMRect>(initialRect);
	// *style: PopoverContainerの要素のスタイル
	const [wrapperStyle, setWrapperStyle] = React.useState<React.CSSProperties>({});
	const [arrowStyle, setArrowStyle] = React.useState<React.CSSProperties>({});
	const [arrowClassNameSuffix, setArrowClassNameSuffix] = React.useState<string>('');
	// conditionalClassName: isOpenedによって変わるクラス名の一部
	const conditionalClassName = props.isOpened ? '' : 'tkreact-popover-wrapper-transition-exit-done';

	// Escapeキー押下時にPopoverContainerを閉じる。
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && props.isOpened) {
			props.close();
		}
	};

	// マウント後に自身のIDをPopoverContextに反映する。
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
				newIds.splice(idx, 1);
				return newIds;
			});
		};
	}, []);

	// PopoverRendererが描画先の要素を用意できているか確認する。
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

	// PopoverContainerが開いたらレイアウトを計算して、閉じるホットキーのためのイベントリスナーを張る。
	React.useEffect(() => {
		const newTriggerRect = props.trigger !== null
			? props.trigger.getBoundingClientRect()
			: triggerRect;
		const wrapperWidth = wrapperRef.current !== null
			? wrapperRef.current.offsetWidth
			: 0;
		const wrapperHeight = wrapperRef.current !== null
			? wrapperRef.current.offsetHeight
			: 0;
		setTriggerRect(newTriggerRect);
		if (props.isOpened) {
			const { newWrapperStyle, newArrowStyle, newArrowClassNameSuffix } = computeStyle(newTriggerRect, wrapperWidth, wrapperHeight, props.place, props.distance, props.margin, props.debug);
			setWrapperStyle(newWrapperStyle);
			setArrowStyle(newArrowStyle);
			setArrowClassNameSuffix(newArrowClassNameSuffix);
			document.body.addEventListener('keydown', handleKeydown);
		}
		return () => {
			document.body.removeEventListener('keydown', handleKeydown);
		}
	}, [props.isOpened, props.children]);

	// ポップオーバーが開いたらheadRefにフォーカスを当てる。
	React.useLayoutEffect(() => {
		if (props.isOpened) {
			props?.headRef?.current?.focus();
		}
	}, [props.isOpened]);

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
			timeout={props.timeout}
			classNames='tkreact-popover-wrapper-transition'>
			<div
				role='dialog'
				aria-modal={true}
				ref={wrapperRef}
				className={`tkreact-popover-wrapper ${props.wrapperClassName} ${conditionalClassName}`}
				style={wrapperStyle}>
				<div
					className='tkreact-popover-wrapper-inner'
					style={{ maxWidth: wrapperStyle.maxWidth, maxHeight: wrapperStyle.maxHeight }}>
					<div {...props.props}>
						{props.children}
					</div>
				</div>
				<div
					className={`tkreact-popover-arrow${arrowClassNameSuffix} ${props.arrowClassName}`}
					style={arrowStyle}>
				</div>
			</div>
		</CSSTransition>
	</>;

	if (ready === true) {
		return ReactDOM.createPortal(renderedInstance, element);
	} else {
		return null;
	}
}

PopoverContainer.defaultProps = {
	timeout: 100,
	place: 'topBottom',
	distance: '.5rem',
	margin: '.5rem',
	wrapperClassName: 'tkb-normal tkr-3 tkshadow-4 tkcolor-bg0',
	arrowClassName: '',
	debug: false,
};

export { PopoverContainer };
