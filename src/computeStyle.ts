import * as React from 'react'
import { PropsPopoverContainer } from './PopoverContainer'

export const computeStyle = (
	trigger: PropsPopoverContainer['trigger'],
	container: HTMLDivElement,
) => {
	let newStyle: React.CSSProperties = {};
	// triggerやcontainerがnullのとき
	return newStyle;
}
