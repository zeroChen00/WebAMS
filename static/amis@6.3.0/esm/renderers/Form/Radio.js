/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveEventData, autobind, FormItem } from 'amis-core';
import cx from 'classnames';
import { Checkbox, withBadge } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var RadioControl = /** @class */ (function (_super) {
    __extends(RadioControl, _super);
    function RadioControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange('');
        }
        else if (actionType === 'reset') {
            onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    RadioControl.prototype.dispatchChangeEvent = function (eventData) {
        if (eventData === void 0) { eventData = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onChange, submitOnChange, onRadioChange, ctx, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onChange = _a.onChange, submitOnChange = _a.submitOnChange, onRadioChange = _a.onRadioChange;
                        ctx = resolveEventData(this.props, { value: eventData });
                        if ((onRadioChange === null || onRadioChange === void 0 ? void 0 : onRadioChange(ctx, this.props)) === false) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, dispatchEvent('change', ctx)];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange && onChange(eventData, submitOnChange, true);
                        return [2 /*return*/];
                }
            });
        });
    };
    RadioControl.prototype.renderStatic = function () {
        var _a = this.props, value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue, option = _a.option, render = _a.render, partial = _a.partial, optionType = _a.optionType, checked = _a.checked, labelClassName = _a.labelClassName;
        return (React.createElement(Checkbox, { type: "radio", inline: true, value: value || '', trueValue: trueValue, falseValue: falseValue, disabled: true, partial: partial, optionType: optionType, checked: checked, labelClassName: labelClassName }, option ? render('option', option) : null));
    };
    RadioControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className; _a.style; var value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue, option = _a.option; _a.onChange; var disabled = _a.disabled, render = _a.render, partial = _a.partial, optionType = _a.optionType, checked = _a.checked, labelClassName = _a.labelClassName, ns = _a.classPrefix;
        return (React.createElement("div", { className: cx("".concat(ns, "CheckboxControl"), className) },
            React.createElement(Checkbox, { type: "radio", inline: true, value: value || '', trueValue: trueValue, falseValue: falseValue, disabled: disabled, onChange: function (value) { return _this.dispatchChangeEvent(value); }, partial: partial, optionType: optionType, checked: checked, labelClassName: labelClassName }, option ? render('option', option) : null)));
    };
    RadioControl.defaultProps = {
        trueValue: true,
        falseValue: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], RadioControl.prototype, "dispatchChangeEvent", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RadioControl.prototype, "render", null);
    return RadioControl;
}(React.Component));
// @ts-ignore
/** @class */ ((function (_super) {
    __extends(RadioControlRenderer, _super);
    function RadioControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioControlRenderer = __decorate([
        withBadge,
        FormItem({
            type: 'radio',
            sizeMutable: false
        })
    ], RadioControlRenderer);
    return RadioControlRenderer;
})(RadioControl));

export { RadioControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
