import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './m13tk-react.scss';
import * as m13TKReact from '.';

export const App: React.FC = () => {
	const { isOpened, trigger, openPopover, closePopover } = m13TKReact.usePopover();
	const [toggle, setToggle] = React.useState(true);
	const [value, setValue] = React.useState('');
	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}
	const togglePopover = () => {
		setToggle(!toggle);
	}
	return <m13TKReact.ProviderPopoverContext>
		<div className='tkcnt-y tkalign-center'>
			<header className='tkcnt-x tksticky-top tkjustify-center tkpy-3 tkshadow-2'>
				<div className='tkcnt-x tkx-120 tkpx-4 tkjustify-between'>
					<h1 className='tkchip-x tktxt-heading'>m13tk-react</h1>
				</div>
			</header>
			<main className='tkcnt-y tkx-120 tkm-6 tkpx-4 tkpy-6 tkalign-center'>
				<div className='tkcnt-y tkm-4 tkp-3'>
					<button className='tkbtn-normal tkchip-x' onClick={togglePopover}>
						トグル1
					</button>
					{toggle &&
						<>
							<button
								className='tkbtn-normal tkchip-x'
								onClick={openPopover}>
								<span className='tktxt'>ボタン1</span>
							</button>
							<m13TKReact.PopoverContainer
							isOpened={isOpened}
							trigger={trigger}
							closePopover={closePopover}>
								<div className='tkcnt-x tkp-3 tkcolor-pr'>
									ほげほげ1
									<input type='text' value={value} onChange={handleChangeValue} />
								</div>
							</m13TKReact.PopoverContainer>
						</>}
				</div>
			</main>
			<m13TKReact.PopoverRenderer />
		</div>
	</m13TKReact.ProviderPopoverContext>
}

ReactDOM.render(<App />, document.getElementById('m13tk-react'));
