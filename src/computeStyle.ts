import * as React from 'react';
import { PropsPopoverContainer } from './PopoverContainer';

export const computeStyle = (
	triggerRect: DOMRect,
	containerWidth: number,
	containerHeight: number,
	place: PropsPopoverContainer['place'],
	distance: PropsPopoverContainer['distance'],
	margin: PropsPopoverContainer['margin'],
): React.CSSProperties => {
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
	const ctSizeX = place === 'topBottom' ? containerWidth : containerHeight;
	const ctSizeY = place === 'topBottom' ? containerHeight : containerWidth;
	// コンテナの左上の座標
	const ctPosX = arPosX - ctSizeX / 2;
	const ctPosY = arPosY;
	// コンテナの座標のCSSでの表現
	const ctPosXProperty = arPosX < vpSizeX / 2
		? posX[0]
		: posX[1];
	const ctPosXValue = arPosX < vpSizeX / 2
		? ctPosX
		: vpSizeX - ctPosX - ctSizeX;
	const adjustCtPosXValue = trPosX + trSizeX / 2 < vpSizeX / 2
		? scX
		: -scX;
	const ctPosYProperty = trPosY + trSizeY / 2 < vpSizeY / 2
		? posY[0]
		: posY[1];
	const ctPosYValue = trPosY + trSizeY / 2 < vpSizeY / 2
		? ctPosY
		: vpSizeY - ctPosY - trSizeY;
	const adjustCtPosYValue = trPosY + trSizeY / 2 < vpSizeY / 2
		? scY
		: -scY;
	// コンテナの制限サイズのCSSでの表現
	const ctSizeXProperty = `max${sizeXCC}`;
	const ctSizeXValue = vpSizeX;
	const ctSizeYProperty = `max${sizeYCC}`;
	const ctSizeYValue = vpSizeY - ctPosYValue;
	// アニメーション起点のCSSでの表現
	const toPosX = arPosX < vpSizeX / 2
		? `calc(${arPosX}px - max(${ctPosX}px,${margin}))`
		: `calc(100% + ${arPosX}px - min(${ctPosX + ctSizeX}px,calc(${vpSizeX}px - (${margin}))))`;
	const toPosY = trPosY + trSizeY / 2 < vpSizeY / 2
		? '0%'
		: '100%';
	// スタイルシート
	const newStyle = {
		[ctPosXProperty]: `max(${ctPosXValue + adjustCtPosXValue}px,calc(${margin} + ${adjustCtPosXValue}px))`,
		[ctPosYProperty]: `calc(${ctPosYValue + adjustCtPosYValue}px + (${distance}))`,
		[ctSizeXProperty]: `calc(${ctSizeXValue}px - 2 * (${margin}))`,
		[ctSizeYProperty]: `calc(${ctSizeYValue}px - (${margin}) - (${distance}))`,
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
		ctPosX,
		ctPosY,
		ctSizeX,
		ctSizeY,
		ctPosXProperty,
		ctPosXValue,
		adjustCtPosXValue,
		ctPosYProperty,
		ctPosYValue,
		adjustCtPosYValue,
		ctSizeXProperty,
		ctSizeYValue,
		toPosX,
		toPosY,
	})
	console.log(newStyle);
	return newStyle;
}
