import * as React from 'react';
import { Lang } from '../i18n';
import { Icon } from '../Icon';
import { useDict } from '../i18n/useDict';

type PropsView = {
	name: string | number,
	currentView: string | number,
	langs: Lang[],
	head: React.ReactNode | JSX.Element,
	headRef: React.RefObject<HTMLElement>,
	focusOnShow?: boolean,
	backToParent?: () => void,
	margin?: number,
}

const View: React.FC<PropsView> = (props) => {
	const { name, currentView, langs, head, focusOnShow, backToParent, margin, children, headRef } = props;
	const [id] = React.useState<number>(Math.random() * 2 ** 53);
	const dictSrc = {
		'head.back': {
			'ja': '戻る',
			'en-us': 'Back',
		},
	};
	const dict = useDict<keyof typeof dictSrc, string>({
		fallback: 'en-us',
		preferences: langs,
		src: dictSrc,
	});
	React.useEffect(() => {
		if (focusOnShow && name === currentView) {
			headRef?.current?.focus();
		}
	}, [focusOnShow, name, currentView]);
	const conditionalClassName = React.useMemo(() => {
		return name === currentView
			? ''
			: 'tkhidden';
	}, [name, currentView]);
	return <div className='tkcnt-y'>
		<h2 className={`tkcnt-x tkpx-${margin} tkpy-3 tkrtl-${margin} tkrtr-${margin} tkshadow-1 tkcolor-bg0 tksticky-top ${conditionalClassName}`}>
			{backToParent
				&& <button
					aria-label={dict['head.back']}
					onClick={backToParent}
					className='tkchip-x tkbtn-normal tkm-2 tkp-1'>
					<Icon name='arrow_back' />
				</button>
			}
			{typeof head === 'string'
				? <span
					id={`tkreact-view-${id}`}
					ref={headRef}
					className='tkcnt-x tktxt-heading tkm-2'
					tabIndex={-1}>
					{head}
				</span>
				: head
			}
		</h2>
		<div className={`tkcnt-y tkp-${margin}`}>
			{children}
		</div>
	</div>;
}

View.defaultProps = {
	focusOnShow: true,
	langs: ['en-us'],
	margin: 3,
}

export { View };
