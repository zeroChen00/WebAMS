/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Wrapper = /** @class */ (function (_super) {
    tslib.__extends(Wrapper, _super);
    function Wrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.renderBody = function () {
        var _a = this.props, children = _a.children, body = _a.body, render = _a.render, disabled = _a.disabled;
        return children
            ? typeof children === 'function'
                ? children(this.props)
                : children
            : body
                ? render('body', body, { disabled: disabled })
                : null;
    };
    Wrapper.prototype.render = function () {
        var _a = this.props, className = _a.className, size = _a.size, cx = _a.classnames, style = _a.style, data = _a.data, wrap = _a.wrap; _a.testid;
        // 期望不要使用，给 form controls 用法自动转换时使用的。
        if (wrap === false) {
            return this.renderBody();
        }
        return (_J$X_("div", { className: cx('Wrapper', size && size !== 'none' ? "Wrapper--".concat(size) : '', className), style: amisCore.buildStyle(style, data) }, this.renderBody()));
    };
    Wrapper.propsList = ['body', 'className', 'children', 'size'];
    Wrapper.defaultProps = {
        className: '',
        size: 'md'
    };
    return Wrapper;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(WrapperRenderer, _super);
    function WrapperRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WrapperRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'wrapper'
        })
    ], WrapperRenderer);
    return WrapperRenderer;
})(Wrapper));

exports["default"] = Wrapper;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
