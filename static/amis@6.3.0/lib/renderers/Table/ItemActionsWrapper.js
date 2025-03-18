/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobxReact = require('mobx-react');
var React = require('react');

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
function ItemActionsWrapper(props) {
    var _a;
    var cx = props.classnames;
    var children = props.children;
    var store = props.store;
    var divRef = React.useRef(null);
    React.useEffect(function () {
        var _a;
        var row = store.hoverRow;
        if (!row) {
            return;
        }
        var frame = (_a = divRef.current.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('table');
        var dom = frame === null || frame === void 0 ? void 0 : frame.querySelector("tr[data-id=\"".concat(row.id, "\"]"));
        if (!dom) {
            return;
        }
        var rect = dom.getBoundingClientRect();
        var height = rect.height;
        var top = rect.top -
            frame.getBoundingClientRect().top +
            parseInt(getComputedStyle(frame)['marginTop'], 10);
        divRef.current.style.cssText += "top: ".concat(top, "px;height: ").concat(height, "px;");
    }, [(_a = store.hoverRow) === null || _a === void 0 ? void 0 : _a.id]);
    return (_J$X_("div", { className: cx('Table-itemActions-wrap'), ref: divRef }, children));
}
var ItemActionsWrapper$1 = mobxReact.observer(ItemActionsWrapper);

exports["default"] = ItemActionsWrapper$1;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
