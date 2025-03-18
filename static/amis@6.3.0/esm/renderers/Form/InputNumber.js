/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __values, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { toFixed } from '@rc-component/mini-decimal';
import { normalizeOptions, resolveEventData, filter, setThemeClassName, CustomStyle, formatInputThemeCss, autobind, FormItem, numberFormatter } from 'amis-core';
import cx from 'classnames';
import { NumberInput, Select } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var NumberControl = /** @class */ (function (_super) {
    __extends(NumberControl, _super);
    function NumberControl(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleChangeUnit = _this.handleChangeUnit.bind(_this);
        var unit = _this.getUnit();
        var unitOptions = normalizeOptions(props.unitOptions);
        var formItem = props.formItem, setPrinstineValue = props.setPrinstineValue, precision = props.precision, step = props.step, value = props.value, big = props.big;
        var normalizedPrecision = NumberInput.normalizePrecision(_this.filterNum(precision), _this.filterNum(step));
        /**
         * 如果设置了precision需要处理入参value的精度
         * 如果是带有单位的输入，则不支持精度处理
         */
        if (formItem &&
            value != null &&
            normalizedPrecision != null &&
            (!unit || unitOptions.length === 0) &&
            // 大数下不需要进行精度处理，因为输入输出都是字符串
            big !== true) {
            var normalizedValue = parseFloat(toFixed(value.toString(), '.', normalizedPrecision));
            if (!isNaN(normalizedValue)) {
                setPrinstineValue(normalizedValue);
            }
        }
        _this.state = { unit: unit, unitOptions: unitOptions };
        return _this;
    }
    /**
     * 动作处理
     */
    NumberControl.prototype.doAction = function (action, data, throwErrors, args) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var _a = this.props, min = _a.min, max = _a.max, precision = _a.precision, step = _a.step, resetValue = _a.resetValue, big = _a.big, onChange = _a.onChange, clearValueOnEmpty = _a.clearValueOnEmpty;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange(clearValueOnEmpty ? undefined : '');
        }
        else if (actionType === 'reset') {
            var finalPrecision = NumberInput.normalizePrecision(this.filterNum(precision), this.filterNum(step));
            var value = NumberInput.normalizeValue(resetValue !== null && resetValue !== void 0 ? resetValue : '', this.filterNum(min, big), this.filterNum(max, big), finalPrecision, resetValue !== null && resetValue !== void 0 ? resetValue : '', clearValueOnEmpty, big);
            onChange === null || onChange === void 0 ? void 0 : onChange(clearValueOnEmpty && value === '' ? undefined : value);
        }
    };
    // 解析出单位
    NumberControl.prototype.getUnit = function () {
        var e_1, _a;
        var props = this.props;
        if (props.unitOptions && props.unitOptions.length) {
            var optionValues = normalizeOptions(props.unitOptions).map(function (option) { return option.value; });
            // 如果有值就解析出来作为单位
            if (props.value && typeof props.value === 'string') {
                var unit = optionValues[0];
                // 先找长的字符，这样如果有 ab 和 b 两种后缀相同的也能识别
                optionValues.sort(function (a, b) { return b.length - a.length; });
                try {
                    for (var optionValues_1 = __values(optionValues), optionValues_1_1 = optionValues_1.next(); !optionValues_1_1.done; optionValues_1_1 = optionValues_1.next()) {
                        var optionValue = optionValues_1_1.value;
                        if (props.value.endsWith(optionValue)) {
                            unit = optionValue;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (optionValues_1_1 && !optionValues_1_1.done && (_a = optionValues_1.return)) _a.call(optionValues_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return unit;
            }
            else {
                // 没有值就使用第一个单位
                return optionValues[0];
            }
        }
        return undefined;
    };
    NumberControl.prototype.getValue = function (inputValue) {
        var _a = this.props, resetValue = _a.resetValue, unitOptions = _a.unitOptions;
        if (inputValue &&
            typeof inputValue !== 'number' &&
            typeof inputValue !== 'string') {
            return;
        }
        if (inputValue !== null && unitOptions && this.state.unit) {
            inputValue = inputValue + String(this.state.unit);
        }
        return inputValue === null ? resetValue !== null && resetValue !== void 0 ? resetValue : null : inputValue;
    };
    // 派发有event的事件
    NumberControl.prototype.dispatchEvent = function (eventName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, value;
            return __generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, value = _a.value;
                dispatchEvent(eventName, resolveEventData(this.props, { value: value }));
                return [2 /*return*/];
            });
        });
    };
    NumberControl.prototype.handleChange = function (inputValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, dispatchEvent, clearValueOnEmpty, value, resultValue, rendererEvent;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent, clearValueOnEmpty = _a.clearValueOnEmpty;
                        value = this.getValue(inputValue);
                        resultValue = clearValueOnEmpty && value === '' ? undefined : value;
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: resultValue }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(resultValue);
                        setTimeout(function () {
                            _this.changeCursorPos(+resultValue);
                        }, 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 取真实用户输入的值去改变光标的位置
    NumberControl.prototype.changeCursorPos = function (value) {
        var _a, _b;
        if (isNaN(value)) {
            return;
        }
        var _c = this.props, kilobitSeparator = _c.kilobitSeparator, prefix = _c.prefix;
        var integer = value > 0 ? Math.floor(value) : Math.ceil(value);
        var pos = "".concat(value).length;
        if (prefix) {
            pos += prefix.length;
        }
        if (kilobitSeparator) {
            // 处理有千分符的情况 123,456,789
            var ksLen = Math.floor(("".concat(Math.abs(integer)).length - 1) / 3);
            if (ksLen > 0) {
                pos += ksLen;
            }
        }
        if (this.input && (kilobitSeparator || prefix)) {
            (_b = (_a = this.input).setSelectionRange) === null || _b === void 0 ? void 0 : _b.call(_a, pos, pos);
        }
    };
    /** 处理数字类的props，支持从数据域获取变量值 */
    NumberControl.prototype.filterNum = function (value, isbig) {
        if (isbig === void 0) { isbig = false; }
        if (typeof value === 'undefined') {
            return undefined;
        }
        if (typeof value !== 'number') {
            value = filter(value, this.props.data);
            // 大数模式，不转数字
            value = /^[-]?\d+/.test(value) ? (isbig ? value : +value) : undefined;
        }
        return value;
    };
    // 单位选项的变更
    NumberControl.prototype.handleChangeUnit = function (option) {
        var _this = this;
        var value = this.props.value;
        var prevUnitValue = this.state.unit;
        this.setState({ unit: option.value }, function () {
            if (value) {
                value = value.toString().replace(prevUnitValue, '');
                _this.props.onChange(value + _this.state.unit);
            }
        });
    };
    NumberControl.prototype.componentDidUpdate = function (prevProps) {
        var unit = this.getUnit();
        var _a = this.props, value = _a.value, formInited = _a.formInited, onChange = _a.onChange, setPrinstineValue = _a.setPrinstineValue;
        if (value != null &&
            (typeof value === 'string' || typeof value === 'number') &&
            unit &&
            !String(value).endsWith(unit)) {
            var finalValue = this.getValue(value);
            formInited === false
                ? setPrinstineValue === null || setPrinstineValue === void 0 ? void 0 : setPrinstineValue(finalValue)
                : onChange === null || onChange === void 0 ? void 0 : onChange(finalValue);
        }
        // 匹配 数字 + ?字符
        var reg = /^([-+]?(([1-9]\d*\.?\d*)|(0\.\d*[1-9]))[^\d\.]*)$/;
        if (reg.test(this.props.value) && this.props.value !== prevProps.value) {
            this.setState({ unit: unit });
        }
        if (this.props.unitOptions !== prevProps.unitOptions) {
            this.setState({ unitOptions: normalizeOptions(this.props.unitOptions) });
        }
    };
    NumberControl.prototype.inputRef = function (ref) {
        this.input = ref;
    };
    NumberControl.prototype.focus = function () {
        if (!this.input) {
            return;
        }
        this.input.focus();
    };
    NumberControl.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, className = _b.className; _b.style; var ns = _b.classPrefix, value = _b.value, step = _b.step, precision = _b.precision, max = _b.max, min = _b.min, disabled = _b.disabled, placeholder = _b.placeholder, showSteps = _b.showSteps, borderMode = _b.borderMode, suffix = _b.suffix, prefix = _b.prefix, kilobitSeparator = _b.kilobitSeparator, unitOptions = _b.unitOptions, readOnly = _b.readOnly, keyboard = _b.keyboard, displayMode = _b.displayMode, big = _b.big, resetValue = _b.resetValue, clearValueOnEmpty = _b.clearValueOnEmpty, css = _b.css, themeCss = _b.themeCss, inputControlClassName = _b.inputControlClassName, id = _b.id, env = _b.env, name = _b.name, testIdBuilder = _b.testIdBuilder;
        var unit = this.state.unit;
        var finalPrecision = this.filterNum(precision);
        // 数据格式化
        var formatter = kilobitSeparator || prefix || suffix
            ? function (value) {
                // 增加千分分隔
                if (kilobitSeparator && value) {
                    value = numberFormatter(value, finalPrecision);
                }
                return "".concat(prefix || '').concat(value).concat(suffix || '');
            }
            : undefined;
        // 将数字还原
        var parser = function (value) {
            if (value) {
                prefix && (value = value.replace(prefix, ''));
                suffix && (value = value.replace(suffix, ''));
                kilobitSeparator && (value = value.replace(/,/g, ''));
            }
            return value;
        };
        var finalValue = unit && value && typeof value === 'string'
            ? value.replace(unit, '')
            : value;
        return (React.createElement("div", { className: cx("".concat(ns, "NumberControl"), (_a = {},
                _a["".concat(ns, "NumberControl--withUnit")] = unitOptions,
                _a), className) },
            React.createElement(NumberInput, { name: name, inputControlClassName: cx(inputControlClassName, setThemeClassName(__assign(__assign({}, this.props), { name: 'inputControlClassName', id: id, themeCss: themeCss || css })), setThemeClassName(__assign(__assign({}, this.props), { name: 'inputControlClassName', id: id, themeCss: themeCss || css, extra: 'inner' }))), inputRef: this.inputRef, value: finalValue, resetValue: resetValue, step: step, max: this.filterNum(max, big), min: this.filterNum(min, big), formatter: formatter, parser: parser, onChange: this.handleChange, disabled: disabled, placeholder: placeholder, precision: finalPrecision, showSteps: showSteps, borderMode: borderMode, readOnly: readOnly, onFocus: function () { return _this.dispatchEvent('focus'); }, onBlur: function () { return _this.dispatchEvent('blur'); }, keyboard: keyboard, displayMode: displayMode, big: big, clearValueOnEmpty: clearValueOnEmpty, testIdBuilder: testIdBuilder }),
            Array.isArray(unitOptions) && unitOptions.length !== 0 ? (unitOptions.length > 1 ? (React.createElement(Select, { value: unit, clearable: false, options: this.state.unitOptions || [], onChange: this.handleChangeUnit, className: "".concat(ns, "NumberControl-unit"), disabled: disabled })) : (React.createElement("div", { className: cx("".concat(ns, "NumberControl-unit"), "".concat(ns, "NumberControl-single-unit"), "".concat(ns, "Select")) }, typeof unitOptions[0] === 'string'
                ? unitOptions[0]
                : unitOptions[0].label))) : null,
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    themeCss: themeCss || css,
                    classNames: [
                        {
                            key: 'inputControlClassName',
                            weights: {
                                active: {
                                    pre: "inputControlClassName-".concat(id === null || id === void 0 ? void 0 : id.replace('u:', ''), ".focused, ")
                                }
                            }
                        }
                    ],
                    id: id
                }, env: env })),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    themeCss: formatInputThemeCss(themeCss || css),
                    classNames: [
                        {
                            key: 'inputControlClassName',
                            weights: {
                                default: {
                                    inner: 'input'
                                },
                                hover: {
                                    inner: 'input'
                                },
                                active: {
                                    pre: "inputControlClassName-".concat(id === null || id === void 0 ? void 0 : id.replace('u:', ''), ".focused, "),
                                    inner: 'input'
                                }
                            }
                        }
                    ],
                    id: id && id + '-inner'
                }, env: env }))));
    };
    NumberControl.defaultProps = {
        step: 1,
        resetValue: '',
        clearValueOnEmpty: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], NumberControl.prototype, "dispatchEvent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], NumberControl.prototype, "changeCursorPos", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NumberControl.prototype, "inputRef", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NumberControl.prototype, "render", null);
    return NumberControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(NumberControlRenderer, _super);
    function NumberControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberControlRenderer.defaultProps = __assign({ validations: 'isNumeric' }, NumberControl.defaultProps);
    NumberControlRenderer = __decorate([
        FormItem({
            type: 'input-number',
            detectProps: ['unitOptions']
        })
    ], NumberControlRenderer);
    return NumberControlRenderer;
})(NumberControl));

export { NumberControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
