/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveEventData, isObject, autobind, FormItem } from 'amis-core';
import { Icon, Switch } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var SwitchControl = /** @class */ (function (_super) {
    __extends(SwitchControl, _super);
    function SwitchControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchControl.prototype.handleChange = function (checked) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onChange, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onChange = _a.onChange;
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: checked }))];
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
        if (isObject(onText) && onText.icon && !onText.type) {
            onComp = React.createElement(Icon, { cx: cx, icon: onText.icon, className: "Switch-icon" });
        }
        else if (onText != null && typeof onText !== 'string') {
            /** 兼容原来的DOM接口，string类型直接渲染 */
            onComp = render('switch-on-text', onText);
        }
        if (isObject(offText) && offText.icon && !offText.type) {
            offComp = React.createElement(Icon, { cx: cx, icon: offText.icon, className: "Switch-icon" });
        }
        else if (offText != null && typeof offText !== 'string') {
            offComp = render('switch-off-text', offText);
        }
        return { on: onComp, off: offComp };
    };
    SwitchControl.prototype.renderBody = function (children) {
        var _a = this.props, cx = _a.classnames, option = _a.option, optionAtLeft = _a.optionAtLeft;
        var Option = React.createElement("span", { className: cx('Switch-option') }, option);
        return (React.createElement(React.Fragment, null,
            optionAtLeft ? Option : null,
            children,
            optionAtLeft ? null : Option));
    };
    SwitchControl.prototype.renderStatic = function () {
        var _a = this.props, value = _a.value, trueValue = _a.trueValue;
        var _b = this.getResult(), _c = _b.on, on = _c === void 0 ? '开' : _c, _d = _b.off, off = _d === void 0 ? '关' : _d;
        var body = React.createElement("span", null, value === trueValue ? on : off);
        return this.renderBody(body);
    };
    SwitchControl.prototype.render = function () {
        var _a = this.props, size = _a.size, className = _a.className; _a.style; var ns = _a.classPrefix, cx = _a.classnames, value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue; _a.onChange; var disabled = _a.disabled, loading = _a.loading, loadingConfig = _a.loadingConfig, testIdBuilder = _a.testIdBuilder;
        var _b = this.getResult(), on = _b.on, off = _b.off;
        return (React.createElement("div", { className: cx("SwitchControl", className) }, this.renderBody(React.createElement(Switch, { classPrefix: ns, value: value, trueValue: trueValue, falseValue: falseValue, onText: on, offText: off, disabled: disabled, onChange: this.handleChange, size: size, loading: loading, loadingConfig: loadingConfig, testIdBuilder: testIdBuilder }))));
    };
    SwitchControl.defaultProps = {
        trueValue: true,
        falseValue: false,
        optionAtLeft: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], SwitchControl.prototype, "handleChange", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SwitchControl.prototype, "render", null);
    return SwitchControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(SwitchControlRenderer, _super);
    function SwitchControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchControlRenderer = __decorate([
        FormItem({
            type: 'switch',
            sizeMutable: false
        })
    ], SwitchControlRenderer);
    return SwitchControlRenderer;
})(SwitchControl));

export { SwitchControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
