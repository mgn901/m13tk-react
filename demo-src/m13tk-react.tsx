import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './m13tk-react.scss';
import * as m13TKReact from '../src';

export const App: React.FC = () => {
	const { isOpened: isOpened0, trigger: trigger0, open: open0, close: close0 } = m13TKReact.usePopover();
	const { isOpened: isOpened1, trigger: trigger1, open: open1, close: close1 } = m13TKReact.usePopover();
	const { isOpened: isOpened2, trigger: trigger2, open: open2, close: close2 } = m13TKReact.usePopover();
	const { isOpened: isOpened3, trigger: trigger3, open: open3, close: close3 } = m13TKReact.usePopover();
	const { isOpened: isOpened4, trigger: trigger4, open: open4, close: close4 } = m13TKReact.usePopover();
	const [value, setValue] = React.useState('');
	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}
	const hoge = <div className='tkcnt-txt tkm-4 tkp-3 tkb-normal tkr-2'>
		<p className='tkpage-p'>ほげほげ</p>
		<p className='tkpage-p'>ほげほげ</p>
		<p className='tkpage-p'>ほげほげ</p>
		<p className='tkpage-p'>ほげほげ</p>
		<p className='tkpage-p'>ほげほげ</p>
	</div>;
	const inner = <>
		<label className='tkcnt-y tkinputwrapper-text tkm-3 tkpx-2'>
			<span className='tkcnt-x tktxt-small'>ラベル</span>
			<input className='tkcnt-x tkinput-text' type='text' value={value} onChange={handleChangeValue} />
		</label>
		{hoge}
		{/* {hoge} */}
	</>;
	return <m13TKReact.ProviderPopoverContext>
		<div className='tkcnt-y tkalign-center'>
			<header className='tkcnt-x tksticky-top tkjustify-center tkpy-3 tkshadow-2'>
				<div className='tkcnt-x tkx-120 tkpx-4 tkjustify-between'>
					<h1 className='tkchip-x tktxt-heading'>m13tk-react</h1>
				</div>
			</header>
			<main className='tkcnt-y tkx-120 tkm-6 tkpx-4 tkpy-6 tkalign-center'>
				{hoge}
				{hoge}
				<div className='tkcnt-x tkm-4 tkp-3 tkb-normal tkr-2 tkjustify-between'>
					<button
						className='tkbtn-normal tkchip-x tkm-2 tkpx-2'
						onClick={open0}>
						<span className='tktxt'>開く</span>
					</button>
					<button
						className='tkbtn-normal tkchip-x tkm-2 tkpx-2'
						onClick={open1}>
						<span className='tktxt'>開く</span>
					</button>
					<button
						className='tkbtn-normal tkchip-x tkm-2 tkpx-2'
						onClick={open2}>
						<span className='tktxt'>開く</span>
					</button>
					<button
						className='tkbtn-normal tkchip-x tkm-2 tkpx-2'
						onClick={open3}>
						<span className='tktxt'>開く</span>
					</button>
					<m13TKReact.PopoverContainer
						isOpened={isOpened0}
						trigger={trigger0}
						close={close0}
						place={'rightLeft'}
						className='tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light'>
						{inner}
						<button
							className='tkbtn-normal tkchip-x tkm-2 tkpx-2'
							onClick={open4}>
							<span className='tktxt'>開く</span>
						</button>
						<m13TKReact.PopoverContainer
							isOpened={isOpened4}
							trigger={trigger4}
							close={close4}
							place={'rightLeft'}
							className='tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light'>
							{inner}
						</m13TKReact.PopoverContainer>
					</m13TKReact.PopoverContainer>
					<m13TKReact.PopoverContainer
						isOpened={isOpened1}
						trigger={trigger1}
						close={close1}
						place={'topBottom'}
						className='tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light'>
						{inner}
					</m13TKReact.PopoverContainer>
					<m13TKReact.PopoverContainer
						isOpened={isOpened2}
						trigger={trigger2}
						close={close2}
						place={'topBottom'}
						className='tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light'>
						{inner}
					</m13TKReact.PopoverContainer>
					<m13TKReact.PopoverContainer
						isOpened={isOpened3}
						trigger={trigger3}
						close={close3}
						place={'rightLeft'}
						className='tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light'>
						{inner}
					</m13TKReact.PopoverContainer>
				</div>
				{hoge}
				{hoge}
			</main>
		</div>
		<m13TKReact.PopoverRenderer />
	</m13TKReact.ProviderPopoverContext>;
}

ReactDOM.render(<App />, document.getElementById('m13tk-react'));
