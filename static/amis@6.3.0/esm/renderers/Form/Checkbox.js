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

var CheckboxControl = /** @class */ (function (_super) {
    __extends(CheckboxControl, _super);
    function CheckboxControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange('');
        }
        else if (actionType === 'reset') {
            onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    CheckboxControl.prototype.dispatchChangeEvent = function (eventData) {
        if (eventData === void 0) { eventData = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onChange, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onChange = _a.onChange;
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: eventData }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange && onChange(eventData);
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckboxControl.prototype.renderStatic = function () {
        var _a = this.props, value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue, option = _a.option, render = _a.render, partial = _a.partial, optionType = _a.optionType, checked = _a.checked, labelClassName = _a.labelClassName;
        return (React.createElement(Checkbox, { inline: true, value: value || '', trueValue: trueValue, falseValue: falseValue, disabled: true, partial: partial, optionType: optionType, checked: checked, labelClassName: labelClassName }, option ? render('option', option) : null));
    };
    CheckboxControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className; _a.style; var value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue, option = _a.option; _a.onChange; var disabled = _a.disabled, render = _a.render, partial = _a.partial, optionType = _a.optionType, checked = _a.checked, labelClassName = _a.labelClassName, testIdBuilder = _a.testIdBuilder, ns = _a.classPrefix;
        return (React.createElement("div", { className: cx("".concat(ns, "CheckboxControl"), className) },
            React.createElement(Checkbox, { inline: true, value: value || '', trueValue: trueValue, falseValue: falseValue, disabled: disabled, onChange: function (value) { return _this.dispatchChangeEvent(value); }, partial: partial, optionType: optionType, checked: checked, labelClassName: labelClassName, testIdBuilder: testIdBuilder }, option ? render('option', option) : null)));
    };
    CheckboxControl.defaultProps = {
        trueValue: true,
        falseValue: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], CheckboxControl.prototype, "dispatchChangeEvent", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CheckboxControl.prototype, "render", null);
    return CheckboxControl;
}(React.Component));
// @ts-ignore
var CheckboxControlRenderer = /** @class */ (function (_super) {
    __extends(CheckboxControlRenderer, _super);
    function CheckboxControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxControlRenderer = __decorate([
        withBadge,
        FormItem({
            type: 'checkbox',
            sizeMutable: false
        })
    ], CheckboxControlRenderer);
    return CheckboxControlRenderer;
}(CheckboxControl));

export { CheckboxControlRenderer, CheckboxControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
