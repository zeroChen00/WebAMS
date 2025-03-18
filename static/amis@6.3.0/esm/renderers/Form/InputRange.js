/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __awaiter, __generator, __decorate, __metadata, __read } from 'tslib';
import React from 'react';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isEqual from 'lodash/isEqual';
import forEach from 'lodash/forEach';
import { filter, resolveEventData, autobind, stripNumber, isNumeric, FormItem, isPureVariable, resolveVariableAndFilter } from 'amis-core';
import { NumberInput, Range, Icon } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var resolveNumVariable = function (value, data, fallback) {
    if (data === void 0) { data = {}; }
    if (typeof value === 'string') {
        value = isPureVariable(value)
            ? resolveVariableAndFilter(value, data)
            : value;
        if (typeof value === 'string') {
            var result = parseFloat(value);
            return isNaN(result) ? fallback : result;
        }
        else if (typeof value === 'number') {
            return value;
        }
    }
    else if (typeof value === 'number') {
        return value;
    }
    return value !== null && value !== void 0 ? value : fallback;
};
/**
 * 格式化初始value值
 * @param value 初始value值 Value
 * @param props RangeProps
 * @returns number | {min: number, max: number}
 */
function formatValue(value, props) {
    var _a, _b;
    if (props.multiple) {
        var min = props.min, max = props.max;
        // value是字符串
        if (typeof value === 'string') {
            _a = __read(value.split(props.delimiter || ',').map(function (v) { return Number(v); }), 2), min = _a[0], max = _a[1];
        }
        // value是数组
        else if (Array.isArray(value)) {
            _b = __read(value, 2), min = _b[0], max = _b[1];
        }
        // value是对象
        else if (typeof value === 'object') {
            min = value.min;
            max = value.max;
        }
        return {
            min: min === undefined || min < props.min ? props.min : min,
            max: max === undefined || max > props.max ? props.max : max
        };
    }
    return +value < props.min ? props.min : Math.min(+value, props.max);
}
/**
 * 输入框
 */
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * onChange事件，只能输入数字
     * @param e React.ChangeEvent
     */
    Input.prototype.handleInputNumberChange = function (value) {
        var _a;
        var _b = this.props, multiple = _b.multiple, originValue = _b.value, type = _b.type, min = _b.min, max = _b.max, onChange = _b.onChange;
        var _value = this.getValue(value, type);
        onChange === null || onChange === void 0 ? void 0 : onChange(multiple
            ? __assign(__assign({}, originValue), (_a = {}, _a[type] = _value, _a)) : Math.max(Math.min(value, max), min));
    };
    /**
     * 双滑块 更新value
     * @param value 输入的value值
     */
    Input.prototype.onUpdateValue = function (value) {
        var _a;
        var _b = this.props, multiple = _b.multiple, originValue = _b.value, type = _b.type;
        var _value = this.getValue(value, type);
        this.props.onChange(multiple ? __assign(__assign({}, originValue), (_a = {}, _a[type] = _value, _a)) : value);
    };
    Input.prototype.checkNum = function (value) {
        if (typeof value !== 'number') {
            value = filter(value, this.props.data);
            value = /^[-]?\d+/.test(value) ? +value : undefined;
        }
        return value;
    };
    /**
     * 获取步长小数精度
     * @returns
     */
    Input.prototype.getStepPrecision = function () {
        var _a;
        var _b = this.props, rawStep = _b.step, data = _b.data;
        var step = resolveNumVariable(rawStep, data, 1);
        var stepIsDecimal = /^\d+\.\d+$/.test(step.toString());
        return !stepIsDecimal || step < 0
            ? 0
            : (_a = step.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length;
    };
    /**
     * 处理数据
     * @param value input数据
     * @param type min | max 双滑块
     * @returns 处理之后数据
     */
    Input.prototype.getValue = function (value, type) {
        var _a = this.props, min = _a.min, max = _a.max, step = _a.step, stateValue = _a.value;
        // value为null、undefined时，取对应的min/max
        value = value !== null && value !== void 0 ? value : (type === 'min' ? min : max);
        // 校正value为step的倍数
        var _value = Math.round(parseFloat(value + '') / step) * step;
        // 同步value与步长小数位数
        _value = parseFloat(_value.toFixed(this.getStepPrecision()));
        // 单滑块只用考虑 轨道边界 ，双滑块需要考虑 两端滑块边界
        switch (type) {
            case 'min': {
                if (isObject(stateValue) && isNumber(stateValue.max)) {
                    // 如果 大于当前双滑块最大值 取 当前双滑块max值 - 步长
                    if (_value >= stateValue.max) {
                        return stateValue.max - step;
                    }
                    return _value;
                }
                return min;
            }
            case 'max':
                if (isObject(stateValue) && isNumber(stateValue.min)) {
                    // 如果 小于当前双滑块最大值 取 当前双滑块min值 + 步长
                    if (_value <= stateValue.min) {
                        return stateValue.min + step;
                    }
                    return _value;
                }
                return max;
            default:
                // 轨道边界
                return (_value < min && min) || (_value > max && max) || _value;
        }
    };
    /**
     * 失焦事件
     */
    Input.prototype.onBlur = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, value, onBlur, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, value = _a.value, onBlur = _a.onBlur;
                        return [4 /*yield*/, dispatchEvent('blur', resolveEventData(this.props, {
                                value: value
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 聚焦事件
     */
    Input.prototype.onFocus = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, value, onFocus, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, value = _a.value, onFocus = _a.onFocus;
                        return [4 /*yield*/, dispatchEvent('focus', resolveEventData(this.props, {
                                value: value
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
                        return [2 /*return*/];
                }
            });
        });
    };
    Input.prototype.render = function () {
        var _a;
        var _b = this.props, cx = _b.classnames; _b.style; var value = _b.value, multiple = _b.multiple, type = _b.type, step = _b.step, ns = _b.classPrefix, disabled = _b.disabled, max = _b.max, min = _b.min, mobileUI = _b.mobileUI, unit = _b.unit, showInputUnit = _b.showInputUnit;
        var _value = multiple
            ? type === 'min'
                ? Math.min(value.min, value.max)
                : Math.max(value.min, value.max)
            : value;
        return (React.createElement("div", { className: cx("".concat(ns, "InputRange-input"), (_a = {},
                _a["".concat(ns, "InputRange-input-with-unit")] = unit && showInputUnit,
                _a)) },
            React.createElement(NumberInput, { value: +_value, step: step, max: this.checkNum(max), min: this.checkNum(min), onChange: this.handleInputNumberChange, disabled: disabled, onBlur: this.onBlur, onFocus: this.onFocus, mobileUI: mobileUI }),
            unit && showInputUnit && (React.createElement("div", { className: cx("".concat(ns, "InputRange-unit"), "".concat(ns, "Select")) }, unit))));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], Input.prototype, "handleInputNumberChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], Input.prototype, "onUpdateValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Input.prototype, "onBlur", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Input.prototype, "onFocus", null);
    return Input;
}(React.Component));
var RangeControl = /** @class */ (function (_super) {
    __extends(RangeControl, _super);
    function RangeControl(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props, propsValue = _a.value, multiple = _a.multiple, delimiter = _a.delimiter, min = _a.min, max = _a.max, data = _a.data;
        var value = formatValue(propsValue, {
            multiple: multiple,
            delimiter: delimiter,
            min: resolveNumVariable(min, data, 0),
            max: resolveNumVariable(max, data, 0)
        });
        _this.state = {
            value: _this.getValue(value)
        };
        return _this;
    }
    RangeControl.prototype.componentDidUpdate = function (prevProps) {
        var value = prevProps.value, min = prevProps.min, max = prevProps.max, prevData = prevProps.data;
        var _a = this.props, nextPropsValue = _a.value, multiple = _a.multiple, delimiter = _a.delimiter, nextPropsMin = _a.min, nextPropsMax = _a.max, data = _a.data; _a.onChange;
        var prevMin = resolveNumVariable(min, prevData, 0);
        var prevMax = resolveNumVariable(max, prevData, 100);
        var nextMin = resolveNumVariable(nextPropsMin, data, 0);
        var nextMax = resolveNumVariable(nextPropsMax, data, 100);
        if (value !== nextPropsValue ||
            prevMin !== nextMin ||
            prevMax !== nextMax) {
            var value_1 = formatValue(nextPropsValue, {
                multiple: multiple,
                delimiter: delimiter,
                min: nextMin,
                max: nextMax
            });
            this.setState({
                value: this.getValue(value_1)
            });
        }
    };
    RangeControl.prototype.doAction = function (action, data, throwErrors) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (!!~['clear', 'reset'].indexOf(actionType)) {
            this.clearValue(actionType);
        }
    };
    RangeControl.prototype.clearValue = function (type) {
        if (type === void 0) { type = 'clear'; }
        var _a = this.props, multiple = _a.multiple, rawMin = _a.min, rawMax = _a.max, data = _a.data, onChange = _a.onChange;
        var min = resolveNumVariable(rawMin, data, 0);
        var max = resolveNumVariable(rawMax, data, 100);
        var resetValue = this.props.resetValue;
        if (type === 'clear') {
            resetValue = undefined;
        }
        var value = this.getFormatValue(resetValue !== null && resetValue !== void 0 ? resetValue : (multiple ? { min: min, max: max } : min));
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
    };
    /**
     * 获取步长小数精度
     * @returns
     */
    RangeControl.prototype.getStepPrecision = function () {
        var _a;
        var _b = this.props, rawStep = _b.step, data = _b.data;
        var step = resolveNumVariable(rawStep, data, 1);
        var stepIsDecimal = /^\d+\.\d+$/.test(step.toString());
        return !stepIsDecimal || step < 0
            ? 0
            : (_a = step.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length;
    };
    RangeControl.prototype.getValue = function (value) {
        var multiple = this.props.multiple;
        var precision = this.getStepPrecision();
        return multiple
            ? {
                max: stripNumber(value.max, precision),
                min: stripNumber(value.min, precision)
            }
            : stripNumber(value, precision);
    };
    /**
     * 所有触发value变换 -> onChange
     * @param value
     */
    RangeControl.prototype.handleChange = function (_value) {
        return __awaiter(this, void 0, void 0, function () {
            var value, _a, onChange, dispatchEvent, result, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        value = this.getValue(_value);
                        this.setState({ value: value });
                        _a = this.props, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent;
                        result = this.getFormatValue(value);
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, {
                                value: result
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange === null || onChange === void 0 ? void 0 : onChange(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 鼠标松开事件
     */
    RangeControl.prototype.onAfterChange = function () {
        var value = this.state.value;
        var onAfterChange = this.props.onAfterChange;
        var result = this.getFormatValue(this.getValue(value));
        onAfterChange && onAfterChange(result);
    };
    /**
     * 获取导出格式数据
     */
    RangeControl.prototype.getFormatValue = function (value) {
        var _a = this.props, multiple = _a.multiple, joinValues = _a.joinValues, delimiter = _a.delimiter, extraName = _a.extraName;
        return multiple
            ? extraName
                ? [value.min, value.max]
                : joinValues
                    ? [value.min, value.max].join(delimiter || ',')
                    : {
                        min: value.min,
                        max: value.max
                    }
            : value;
    };
    RangeControl.prototype.render = function () {
        var _this = this;
        var value = this.state.value;
        var props = __assign(__assign({}, this.props), { 
            /** 解析变量，下面组件透传属性时使用 props 即可 */
            min: resolveNumVariable(this.props.min, this.props.data, 0), max: resolveNumVariable(this.props.max, this.props.data, 0), step: resolveNumVariable(this.props.step, this.props.data, 1), value: value, onChange: this.handleChange, onAfterChange: this.onAfterChange });
        var ns = props.classPrefix, multiple = props.multiple; props.parts; var showInput = props.showInput, cx = props.classnames, className = props.className, disabled = props.disabled, clearable = props.clearable, min = props.min, max = props.max, render = props.render, marks = props.marks, region = props.region, mobileUI = props.mobileUI;
        // 处理自定义json配置
        var renderMarks = marks ? __assign({}, marks) : marks;
        marks &&
            forEach(marks, function (item, key) {
                if (isObject(item) && item.type) {
                    renderMarks &&
                        (renderMarks[key] = render(region, item));
                }
                /** 过滤掉不合法的值（合法的值是数字 & 百分数） */
                if (renderMarks && !isNumeric(key.replace(/%$/, ''))) {
                    delete renderMarks[key];
                }
            });
        return (React.createElement("div", { className: cx('RangeControl', "".concat(ns, "InputRange"), { 'is-disabled': disabled }, { 'is-mobile': mobileUI }, className) },
            showInput && multiple && React.createElement(Input, __assign({}, props, { type: "min" })),
            React.createElement(Range, __assign({}, props, { marks: renderMarks })),
            showInput && React.createElement(Input, __assign({}, props, { type: "max" })),
            clearable && !disabled && showInput ? (React.createElement("a", { onClick: function () { return _this.clearValue(); }, className: cx('InputRange-clear', {
                    'is-active': multiple
                        ? isEqual(this.state.value, { min: min, max: max })
                        : this.state.value !== min
                }) },
                React.createElement(Icon, { icon: "close", className: "icon" }))) : null));
    };
    RangeControl.defaultProps = {
        value: 0,
        max: 100,
        min: 0,
        step: 1,
        unit: '',
        clearable: true,
        disabled: false,
        showInput: false,
        showInputUnit: false,
        multiple: false,
        joinValues: true,
        delimiter: ',',
        showSteps: false,
        parts: 1,
        tooltipPlacement: 'auto'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], RangeControl.prototype, "clearValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], RangeControl.prototype, "getValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], RangeControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RangeControl.prototype, "onAfterChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], RangeControl.prototype, "getFormatValue", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RangeControl.prototype, "render", null);
    return RangeControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(RangeControlRenderer, _super);
    function RangeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeControlRenderer = __decorate([
        FormItem({
            type: 'input-range'
        })
    ], RangeControlRenderer);
    return RangeControlRenderer;
})(RangeControl));

export { Input, RangeControl as default, formatValue };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
