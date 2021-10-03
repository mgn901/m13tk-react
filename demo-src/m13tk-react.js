import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './m13tk-react.scss';
import * as m13TKReact from '../src';
export var App = function () {
    var _a = m13TKReact.usePopover(), isOpened0 = _a.isOpened, trigger0 = _a.trigger, open0 = _a.open, close0 = _a.close;
    var _b = m13TKReact.usePopover(), isOpened1 = _b.isOpened, trigger1 = _b.trigger, open1 = _b.open, close1 = _b.close;
    var _c = m13TKReact.usePopover(), isOpened2 = _c.isOpened, trigger2 = _c.trigger, open2 = _c.open, close2 = _c.close;
    var _d = m13TKReact.usePopover(), isOpened3 = _d.isOpened, trigger3 = _d.trigger, open3 = _d.open, close3 = _d.close;
    var _e = m13TKReact.usePopover(), isOpened4 = _e.isOpened, trigger4 = _e.trigger, open4 = _e.open, close4 = _e.close;
    var _f = React.useState(''), value = _f[0], setValue = _f[1];
    var handleChangeValue = function (e) {
        setValue(e.target.value);
    };
    var hoge = React.createElement("div", { className: 'tkcnt-txt tkm-4 tkp-3 tkb-normal tkr-2' },
        React.createElement("p", { className: 'tkpage-p' }, "\u307B\u3052\u307B\u3052"),
        React.createElement("p", { className: 'tkpage-p' }, "\u307B\u3052\u307B\u3052"),
        React.createElement("p", { className: 'tkpage-p' }, "\u307B\u3052\u307B\u3052"),
        React.createElement("p", { className: 'tkpage-p' }, "\u307B\u3052\u307B\u3052"),
        React.createElement("p", { className: 'tkpage-p' }, "\u307B\u3052\u307B\u3052"));
    var inner = React.createElement(React.Fragment, null,
        React.createElement("label", { className: 'tkcnt-y tkinputwrapper-text tkm-3 tkpx-2' },
            React.createElement("span", { className: 'tkcnt-x tktxt-small' }, "\u30E9\u30D9\u30EB"),
            React.createElement("input", { className: 'tkcnt-x tkinput-text', type: 'text', value: value, onChange: handleChangeValue })),
        hoge);
    return React.createElement(m13TKReact.ProviderPopoverContext, null,
        React.createElement("div", { className: 'tkcnt-y tkalign-center' },
            React.createElement("header", { className: 'tkcnt-x tksticky-top tkjustify-center tkpy-3 tkshadow-2' },
                React.createElement("div", { className: 'tkcnt-x tkx-120 tkpx-4 tkjustify-between' },
                    React.createElement("h1", { className: 'tkchip-x tktxt-heading' }, "m13tk-react"))),
            React.createElement("main", { className: 'tkcnt-y tkx-120 tkm-6 tkpx-4 tkpy-6 tkalign-center' },
                hoge,
                hoge,
                React.createElement("div", { className: 'tkcnt-x tkm-4 tkp-3 tkb-normal tkr-2 tkjustify-between' },
                    React.createElement("button", { className: 'tkbtn-normal tkchip-x tkm-2 tkpx-2', onClick: open0 },
                        React.createElement("span", { className: 'tktxt' }, "\u958B\u304F")),
                    React.createElement("button", { className: 'tkbtn-normal tkchip-x tkm-2 tkpx-2', onClick: open1 },
                        React.createElement("span", { className: 'tktxt' }, "\u958B\u304F")),
                    React.createElement("button", { className: 'tkbtn-normal tkchip-x tkm-2 tkpx-2', onClick: open2 },
                        React.createElement("span", { className: 'tktxt' }, "\u958B\u304F")),
                    React.createElement("button", { className: 'tkbtn-normal tkchip-x tkm-2 tkpx-2', onClick: open3 },
                        React.createElement("span", { className: 'tktxt' }, "\u958B\u304F")),
                    React.createElement(m13TKReact.PopoverContainer, { isOpened: isOpened0, trigger: trigger0, close: close0, place: 'rightLeft', className: 'tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light' },
                        inner,
                        React.createElement("button", { className: 'tkbtn-normal tkchip-x tkm-2 tkpx-2', onClick: open4 },
                            React.createElement("span", { className: 'tktxt' }, "\u958B\u304F")),
                        React.createElement(m13TKReact.PopoverContainer, { isOpened: isOpened4, trigger: trigger4, close: close4, place: 'rightLeft', className: 'tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light' }, inner)),
                    React.createElement(m13TKReact.PopoverContainer, { isOpened: isOpened1, trigger: trigger1, close: close1, place: 'topBottom', className: 'tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light' }, inner),
                    React.createElement(m13TKReact.PopoverContainer, { isOpened: isOpened2, trigger: trigger2, close: close2, place: 'topBottom', className: 'tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light' }, inner),
                    React.createElement(m13TKReact.PopoverContainer, { isOpened: isOpened3, trigger: trigger3, close: close3, place: 'rightLeft', className: 'tkcnt-y tkx-80 tkp-3 tkb-normal tkshadow-2 tkr-3 tkcolor-light' }, inner)),
                hoge,
                hoge)),
        React.createElement(m13TKReact.PopoverRenderer, null));
};
ReactDOM.render(React.createElement(App, null), document.getElementById('m13tk-react'));
