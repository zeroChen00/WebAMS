/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { filterDate, parseDuration, FormItem } from 'amis-core';
import cx from 'classnames';
import DateRangeControl from './InputDateRange.js';
import { DateRangePicker } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var MonthRangeControl = /** @class */ (function (_super) {
    __extends(MonthRangeControl, _super);
    function MonthRangeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthRangeControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, minDate = _a.minDate, maxDate = _a.maxDate, minDuration = _a.minDuration, maxDuration = _a.maxDuration, data = _a.data, format = _a.format, mobileUI = _a.mobileUI, valueFormat = _a.valueFormat, inputFormat = _a.inputFormat, displayFormat = _a.displayFormat, env = _a.env, rest = __rest(_a, ["className", "style", "classPrefix", "minDate", "maxDate", "minDuration", "maxDuration", "data", "format", "mobileUI", "valueFormat", "inputFormat", "displayFormat", "env"]);
        return (React.createElement("div", { className: cx("".concat(ns, "DateRangeControl"), className) },
            React.createElement(DateRangePicker, __assign({ viewMode: "months", mobileUI: mobileUI, valueFormat: valueFormat || format, displayFormat: displayFormat || inputFormat, classPrefix: ns, popOverContainer: mobileUI
                    ? env === null || env === void 0 ? void 0 : env.getModalContainer
                    : rest.popOverContainer || env.getModalContainer, onRef: this.getRef, data: data }, rest, { minDate: minDate
                    ? filterDate(minDate, data, valueFormat || format)
                    : undefined, maxDate: maxDate
                    ? filterDate(maxDate, data, valueFormat || format)
                    : undefined, minDuration: minDuration ? parseDuration(minDuration) : undefined, maxDuration: maxDuration ? parseDuration(maxDuration) : undefined, onChange: this.handleChange, onFocus: this.dispatchEvent, onBlur: this.dispatchEvent }))));
    };
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MonthRangeControl.prototype, "render", null);
    return MonthRangeControl;
}(DateRangeControl));
/** @class */ ((function (_super) {
    __extends(MonthRangeControlRenderer, _super);
    function MonthRangeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthRangeControlRenderer.defaultProps = {
        format: 'X',
        inputFormat: 'YYYY-MM',
        joinValues: true,
        delimiter: ',',
        /** shortcuts的兼容配置 */
        ranges: '',
        shortcuts: 'thismonth,prevmonth',
        animation: true
    };
    MonthRangeControlRenderer = __decorate([
        FormItem({
            type: 'input-month-range'
        })
    ], MonthRangeControlRenderer);
    return MonthRangeControlRenderer;
})(MonthRangeControl));

export { MonthRangeControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
