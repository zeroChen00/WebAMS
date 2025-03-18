/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React from 'react';
import cx from 'classnames';
import { Radios } from 'amis-ui';
import { resolveEventData, filter, autobind, OptionsControl } from 'amis-core';
import { supportStatic } from './StaticHoc.js';

var RadiosControl = /** @class */ (function (_super) {
    __extends(RadiosControl, _super);
    function RadiosControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadiosControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    RadiosControl.prototype.handleChange = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, joinValues, extractValue, valueField, onChange, dispatchEvent, options, value, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent, options = _a.options, _a.selectedOptions;
                        value = option;
                        if (option && (joinValues || extractValue)) {
                            value = option[valueField || 'value'];
                        }
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, {
                                value: value,
                                options: options,
                                items: options,
                                selectedItems: option
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange && onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    RadiosControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    RadiosControl.prototype.renderLabel = function (option, _a) {
        var labelField = _a.labelField;
        var data = this.props.data;
        var label = option[labelField || 'label'];
        return React.createElement(React.Fragment, null, typeof label === 'string' ? filter(label, data) : "".concat(label));
    };
    RadiosControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, value = _a.value; _a.onChange; var disabled = _a.disabled, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, placeholder = _a.placeholder, options = _a.options, _b = _a.inline, inline = _b === void 0 ? true : _b, formMode = _a.formMode, columnsCount = _a.columnsCount, classPrefix = _a.classPrefix, itemClassName = _a.itemClassName, labelClassName = _a.labelClassName, optionClassName = _a.optionClassName, labelField = _a.labelField, valueField = _a.valueField; _a.data; var __ = _a.translate, optionType = _a.optionType, level = _a.level, testIdBuilder = _a.testIdBuilder;
        return (React.createElement(Radios, { inline: inline || formMode === 'inline', className: cx("".concat(ns, "RadiosControl"), className), value: typeof value === 'undefined' || value === null ? '' : value, disabled: disabled, onChange: this.handleChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, 
            /** 兼容一下错误的用法 */
            labelClassName: optionClassName !== null && optionClassName !== void 0 ? optionClassName : labelClassName, labelField: labelField, valueField: valueField, placeholder: __(placeholder), options: options, renderLabel: this.renderLabel, columnsCount: columnsCount, classPrefix: classPrefix, itemClassName: itemClassName, optionType: optionType, level: level, testIdBuilder: testIdBuilder }));
    };
    RadiosControl.defaultProps = {
        columnsCount: 1
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], RadiosControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], RadiosControl.prototype, "renderLabel", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RadiosControl.prototype, "render", null);
    return RadiosControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(RadiosControlRenderer, _super);
    function RadiosControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadiosControlRenderer.defaultProps = {
        multiple: false,
        inline: true
    };
    RadiosControlRenderer = __decorate([
        OptionsControl({
            type: 'radios',
            sizeMutable: false
        })
    ], RadiosControlRenderer);
    return RadiosControlRenderer;
})(RadiosControl));

export { RadiosControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
