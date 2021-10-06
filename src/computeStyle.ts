import * as React from 'react';
import { PropsPopoverContainer } from './PopoverContainer';

export const computeStyle = (
	triggerRect: DOMRect,
	wrapperWidth: number,
	wrapperHeight: number,
	place: PropsPopoverContainer['place'],
	distance: PropsPopoverContainer['distance'],
	margin: PropsPopoverContainer['margin'],
) => {
	const posCandidates = [
		['left', 'right'],
		['top', 'bottom'],
	];
	const sizeCandidates = ['width', 'height'];
	const scCandidates = [scrollX, scrollY];
	const placeIndex = place === 'topBottom' ? 0 : 1;
	const posX = posCandidates[placeIndex];
	const posY = posCandidates[(placeIndex + 1) % 2];
	const sizeX = sizeCandidates[placeIndex];
	const sizeY = sizeCandidates[(placeIndex + 1) % 2];
	const sizeXCC = sizeX[0].toUpperCase() + sizeX.slice(1);
	const sizeYCC = sizeY[0].toUpperCase() + sizeY.slice(1);
	// X軸方向のスクロール量
	const scX = scCandidates[placeIndex];
	// Y軸方向のスクロール量
	const scY = scCandidates[(placeIndex + 1) % 2];
	// 画面のサイズ
	const vpSizeX = document.documentElement[`client${sizeXCC}`];
	const vpSizeY = document.documentElement[`client${sizeYCC}`];
	// ページのサイズ
	const pgSizeX = document.documentElement[`offset${sizeXCC}`];
	const pgSizeY = document.documentElement[`offset${sizeYCC}`];
	// トリガーの左上の座標
	const trPosX = triggerRect[posX[0]];
	const trPosY = triggerRect[posY[0]];
	// トリガーのサイズ
	const trSizeX = triggerRect[sizeX];
	const trSizeY = triggerRect[sizeY];
	// アニメーション起点の座標
	const arPosX = trPosX + trSizeX / 2;
	const arPosY = trPosY + trSizeY / 2 < vpSizeY / 2
		? trPosY + trSizeY
		: trPosY - trSizeY;
	// コンテナのサイズ
	const wrSizeX = place === 'topBottom' ? wrapperWidth : wrapperHeight;
	const wrSizeY = place === 'topBottom' ? wrapperHeight : wrapperWidth;
	// コンテナの左上の座標
	const wrPosX = arPosX - wrSizeX / 2;
	const wrPosY = arPosY;
	// コンテナの座標のCSSでの表現
	const wrPosXProperty = arPosX < vpSizeX / 2
		? posX[0]
		: posX[1];
	const wrPosXValue = arPosX < vpSizeX / 2
		? wrPosX
		: vpSizeX - wrPosX - wrSizeX;
	const adjustWrPosXValue = trPosX + trSizeX / 2 < vpSizeX / 2
		? scX
		: -scX;
	const wrPosYProperty = trPosY + trSizeY / 2 < vpSizeY / 2
		? posY[0]
		: posY[1];
	const wrPosYValue = trPosY + trSizeY / 2 < vpSizeY / 2
		? wrPosY
		: vpSizeY - wrPosY - trSizeY;
	const adjustWrPosYValue = trPosY + trSizeY / 2 < vpSizeY / 2
		? scY
		: -scY;
	// コンテナの制限サイズのCSSでの表現
	const wrSizeXProperty = `max${sizeXCC}`;
	const wrSizeXValue = vpSizeX;
	const wrSizeYProperty = `max${sizeYCC}`;
	const wrSizeYValue = vpSizeY - wrPosYValue;
	// アニメーション起点のCSSでの表現
	const toPosX = arPosX < vpSizeX / 2
		? `calc(${arPosX}px - max(${wrPosX}px,${margin}))`
		: `calc(100% + ${arPosX}px - min(${wrPosX + wrSizeX}px,calc(${vpSizeX}px - (${margin}))))`;
	const toPosY = trPosY + trSizeY / 2 < vpSizeY / 2
		? '0%'
		: '100%';
	// スタイルシート
	const newWrapperStyle: React.CSSProperties = {
		[wrPosXProperty]: `max(${wrPosXValue + adjustWrPosXValue}px,calc(${margin} + ${adjustWrPosXValue}px))`,
		[wrPosYProperty]: `calc(${wrPosYValue + adjustWrPosYValue}px + (${distance}))`,
		[wrSizeXProperty]: `calc(${wrSizeXValue}px - 2 * (${margin}))`,
		[wrSizeYProperty]: `calc(${wrSizeYValue}px - (${margin}) - (${distance}))`,
		transformOrigin: place === 'topBottom'
			? `${toPosX} ${toPosY}`
			: `${toPosY} ${toPosX}`,
	};
	console.log({
		vpSizeX,
		vpSizeY,
		pgSizeX,
		pgSizeY,
		trPosX,
		trPosY,
		trSizeX,
		trSizeY,
		arPosX,
		arPosY,
		wrPosX,
		wrPosY,
		wrSizeX,
		wrSizeY,
		wrPosXProperty,
		wrPosXValue,
		adjustWrPosXValue,
		wrPosYProperty,
		wrPosYValue,
		adjustWrPosYValue,
		wrSizeXProperty,
		wrSizeYValue,
		toPosX,
		toPosY,
		});
		console.log(newWrapperStyle);
	return { newWrapperStyle };
}
