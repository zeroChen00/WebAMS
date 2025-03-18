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
var amisUi = require('amis-ui');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var SwitchControl = /** @class */ (function (_super) {
    tslib.__extends(SwitchControl, _super);
    function SwitchControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchControl.prototype.handleChange = function (checked) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onChange, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onChange = _a.onChange;
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, { value: checked }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange && onChange(checked);
                        return [2 /*return*/];
                }
            });
        });
    };
    SwitchControl.prototype.getResult = function () {
        var _a = this.props, cx = _a.classnames, render = _a.render, onText = _a.onText, offText = _a.offText;
        var onComp = onText;
        var offComp = offText;
        /** 兼容单独使用Icon的场景 */
        if (amisCore.isObject(onText) && onText.icon && !onText.type) {
            onComp = _J$X_(amisUi.Icon, { cx: cx, icon: onText.icon, className: "Switch-icon" });
        }
        else if (onText != null && typeof onText !== 'string') {
            /** 兼容原来的DOM接口，string类型直接渲染 */
            onComp = render('switch-on-text', onText);
        }
        if (amisCore.isObject(offText) && offText.icon && !offText.type) {
            offComp = _J$X_(amisUi.Icon, { cx: cx, icon: offText.icon, className: "Switch-icon" });
        }
        else if (offText != null && typeof offText !== 'string') {
            offComp = render('switch-off-text', offText);
        }
        return { on: onComp, off: offComp };
    };
    SwitchControl.prototype.renderBody = function (children) {
        var _a = this.props, cx = _a.classnames, option = _a.option, optionAtLeft = _a.optionAtLeft;
        var Option = _J$X_("span", { className: cx('Switch-option') }, option);
        return (_J$X_(React__default["default"].Fragment, null,
            optionAtLeft ? Option : null,
            children,
            optionAtLeft ? null : Option));
    };
    SwitchControl.prototype.renderStatic = function () {
        var _a = this.props, value = _a.value, trueValue = _a.trueValue;
        var _b = this.getResult(), _c = _b.on, on = _c === void 0 ? '开' : _c, _d = _b.off, off = _d === void 0 ? '关' : _d;
        var body = _J$X_("span", null, value === trueValue ? on : off);
        return this.renderBody(body);
    };
    SwitchControl.prototype.render = function () {
        var _a = this.props, size = _a.size, className = _a.className; _a.style; var ns = _a.classPrefix, cx = _a.classnames, value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue; _a.onChange; var disabled = _a.disabled, loading = _a.loading, loadingConfig = _a.loadingConfig, testIdBuilder = _a.testIdBuilder;
        var _b = this.getResult(), on = _b.on, off = _b.off;
        return (_J$X_("div", { className: cx("SwitchControl", className) }, this.renderBody(_J$X_(amisUi.Switch, { classPrefix: ns, value: value, trueValue: trueValue, falseValue: falseValue, onText: on, offText: off, disabled: disabled, onChange: this.handleChange, size: size, loading: loading, loadingConfig: loadingConfig, testIdBuilder: testIdBuilder }))));
    };
    SwitchControl.defaultProps = {
        trueValue: true,
        falseValue: false,
        optionAtLeft: false
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], SwitchControl.prototype, "handleChange", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], SwitchControl.prototype, "render", null);
    return SwitchControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(SwitchControlRenderer, _super);
    function SwitchControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'switch',
            sizeMutable: false
        })
    ], SwitchControlRenderer);
    return SwitchControlRenderer;
})(SwitchControl));

exports["default"] = SwitchControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
