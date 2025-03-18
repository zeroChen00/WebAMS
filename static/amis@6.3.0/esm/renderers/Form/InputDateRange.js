/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __rest, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { filterDate, resolveEventData, parseDuration, autobind, FormItem } from 'amis-core';
import cx from 'classnames';
import { DateRangePicker } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var DateRangeControl = /** @class */ (function (_super) {
    __extends(DateRangeControl, _super);
    function DateRangeControl(props) {
        var _this = _super.call(this, props) || this;
        var defaultValue = props.defaultValue, setPrinstineValue = props.setPrinstineValue, delimiter = props.delimiter, format = props.format, valueFormat = props.valueFormat, data = props.data, value = props.value, joinValues = props.joinValues, utc = props.utc;
        if (defaultValue && value === defaultValue) {
            var arr = typeof defaultValue === 'string'
                ? defaultValue.split(delimiter)
                : defaultValue;
            setPrinstineValue(DateRangePicker.formatValue({
                startDate: filterDate(arr[0], data, valueFormat || format),
                endDate: filterDate(arr[1], data, valueFormat || format)
            }, valueFormat || format, joinValues, delimiter, utc));
        }
        return _this;
        // todo 支持值格式的自动纠正
    }
    DateRangeControl.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, defaultValue = _a.defaultValue, delimiter = _a.delimiter, joinValues = _a.joinValues, setPrinstineValue = _a.setPrinstineValue, data = _a.data, utc = _a.utc, format = _a.format, valueFormat = _a.valueFormat;
        if (prevProps.defaultValue !== defaultValue) {
            var arr = typeof defaultValue === 'string'
                ? defaultValue.split(delimiter)
                : defaultValue;
            setPrinstineValue(arr
                ? DateRangePicker.formatValue({
                    startDate: filterDate(arr[0], data, valueFormat || format),
                    endDate: filterDate(arr[1], data, valueFormat || format)
                }, valueFormat || format, joinValues, delimiter, utc)
                : undefined);
        }
    };
    DateRangeControl.prototype.getRef = function (ref) {
        while (ref && ref.getWrappedInstance) {
            ref = ref.getWrappedInstance();
        }
        this.dateRef = ref;
    };
    // 派发有event的事件
    DateRangeControl.prototype.dispatchEvent = function (eventName) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent; _a.data; var value = _a.value;
        dispatchEvent(eventName, resolveEventData(this.props, { value: value }));
    };
    // 动作
    DateRangeControl.prototype.doAction = function (action, data, throwErrors) {
        var _a, _b;
        var resetValue = this.props.resetValue;
        if (action.actionType === 'clear') {
            (_a = this.dateRef) === null || _a === void 0 ? void 0 : _a.clear();
            return;
        }
        if (action.actionType === 'reset' && resetValue) {
            (_b = this.dateRef) === null || _b === void 0 ? void 0 : _b.reset();
        }
    };
    DateRangeControl.prototype.setData = function (value) {
        var _a = this.props, data = _a.data, delimiter = _a.delimiter, valueFormat = _a.valueFormat, format = _a.format, joinValues = _a.joinValues, utc = _a.utc, onChange = _a.onChange;
        if (typeof value === 'string') {
            var arr = typeof value === 'string' ? value.split(delimiter) : value;
            value = DateRangePicker.formatValue({
                startDate: filterDate(arr[0], data, valueFormat || format),
                endDate: filterDate(arr[1], data, valueFormat || format)
            }, valueFormat || format, joinValues, delimiter, utc);
        }
        onChange(value);
    };
    // 值的变化
    DateRangeControl.prototype.handleChange = function (nextValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, dispatcher;
            return __generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, _a.data;
                dispatcher = dispatchEvent('change', resolveEventData(this.props, { value: nextValue }));
                if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                    return [2 /*return*/];
                }
                this.props.onChange(nextValue);
                return [2 /*return*/];
            });
        });
    };
    DateRangeControl.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, className = _b.className; _b.style; var ns = _b.classPrefix; _b.defaultValue; _b.defaultData; var minDate = _b.minDate, maxDate = _b.maxDate, minDuration = _b.minDuration, maxDuration = _b.maxDuration, data = _b.data, format = _b.format, valueFormat = _b.valueFormat, inputFormat = _b.inputFormat, displayFormat = _b.displayFormat, env = _b.env, mobileUI = _b.mobileUI, rest = __rest(_b, ["className", "style", "classPrefix", "defaultValue", "defaultData", "minDate", "maxDate", "minDuration", "maxDuration", "data", "format", "valueFormat", "inputFormat", "displayFormat", "env", "mobileUI"]);
        var comptType = (_a = this.props) === null || _a === void 0 ? void 0 : _a.type;
        return (React.createElement("div", { className: cx("".concat(ns, "DateRangeControl"), {
                'is-date': /date-/.test(comptType),
                'is-datetime': /datetime-/.test(comptType)
            }, className) },
            React.createElement(DateRangePicker, __assign({}, rest, { mobileUI: mobileUI, classPrefix: ns, popOverContainer: mobileUI
                    ? env === null || env === void 0 ? void 0 : env.getModalContainer
                    : rest.popOverContainer || env.getModalContainer, onRef: this.getRef, data: data, valueFormat: valueFormat || format, displayFormat: displayFormat || inputFormat, minDate: minDate
                    ? filterDate(minDate, data, valueFormat || format)
                    : undefined, maxDate: maxDate
                    ? filterDate(maxDate, data, valueFormat || format)
                    : undefined, minDateRaw: minDate, maxDateRaw: maxDate, minDuration: minDuration ? parseDuration(minDuration) : undefined, maxDuration: maxDuration ? parseDuration(maxDuration) : undefined, onChange: this.handleChange, onFocus: function () { return _this.dispatchEvent('focus'); }, onBlur: function () { return _this.dispatchEvent('blur'); } }))));
    };
    DateRangeControl.defaultProps = {
        format: 'X',
        joinValues: true,
        delimiter: ',',
        animation: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DateRangeControl.prototype, "getRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DateRangeControl.prototype, "dispatchEvent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], DateRangeControl.prototype, "handleChange", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DateRangeControl.prototype, "render", null);
    return DateRangeControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(DateRangeControlRenderer, _super);
    function DateRangeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateRangeControlRenderer.defaultProps = __assign({}, DateRangeControl.defaultProps);
    DateRangeControlRenderer = __decorate([
        FormItem({
            type: 'input-date-range'
        })
    ], DateRangeControlRenderer);
    return DateRangeControlRenderer;
})(DateRangeControl));
/** @class */ ((function (_super) {
    __extends(DateTimeRangeControlRenderer, _super);
    function DateTimeRangeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeRangeControlRenderer.defaultProps = __assign(__assign({}, DateRangeControl.defaultProps), { inputFormat: 'YYYY-MM-DD HH:mm' });
    DateTimeRangeControlRenderer = __decorate([
        FormItem({
            type: 'input-datetime-range',
            sizeMutable: false
        })
    ], DateTimeRangeControlRenderer);
    return DateTimeRangeControlRenderer;
})(DateRangeControl));
/** @class */ ((function (_super) {
    __extends(TimeRangeControlRenderer, _super);
    function TimeRangeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeRangeControlRenderer.defaultProps = __assign(__assign({}, DateRangeControl.defaultProps), { format: 'HH:mm', inputFormat: 'HH:mm', viewMode: 'time', 
        /** shortcuts的兼容配置 */
        ranges: '', shortcuts: '' });
    TimeRangeControlRenderer = __decorate([
        FormItem({
            type: 'input-time-range',
            sizeMutable: false
        })
    ], TimeRangeControlRenderer);
    return TimeRangeControlRenderer;
})(DateRangeControl));

export { DateRangeControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
