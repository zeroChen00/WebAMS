/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var amisCore = require('amis-core');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
// todo amis-ui 里面组件直接改成按需加载
var ColorPicker = React__default["default"].lazy(function () { return Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['amis-ui/lib/components/ColorPicker'], function(mod) {fullfill(tslib.__importStar(mod))})})}); });
var ColorControl = /** @class */ (function (_super) {
    tslib.__extends(ColorControl, _super);
    function ColorControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false
        };
        return _this;
    }
    ColorControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, value = _a.value, env = _a.env; _a.static; var mobileUI = _a.mobileUI, rest = tslib.__rest(_a, ["className", "style", "classPrefix", "value", "env", "static", "mobileUI"]);
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "ColorControl"), className) },
            _J$X_(React.Suspense, { fallback: _J$X_("div", null, "...") },
                _J$X_(ColorPicker, tslib.__assign({ classPrefix: ns }, rest, { mobileUI: mobileUI, popOverContainer: mobileUI
                        ? env === null || env === void 0 ? void 0 : env.getModalContainer
                        : rest.popOverContainer || env.getModalContainer, value: value || '' })))));
    };
    ColorControl.defaultProps = {
        format: 'hex',
        clearable: true
    };
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], ColorControl.prototype, "render", null);
    return ColorControl;
}(React__default["default"].PureComponent));
/** @class */ ((function (_super) {
    tslib.__extends(ColorControlRenderer, _super);
    function ColorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-color'
        })
    ], ColorControlRenderer);
    return ColorControlRenderer;
})(ColorControl));

exports.ColorPicker = ColorPicker;
exports["default"] = ColorControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
