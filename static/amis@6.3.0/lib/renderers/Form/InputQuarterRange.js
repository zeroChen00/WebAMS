/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
require('react');
var amisCore = require('amis-core');
var cx = require('classnames');
var InputDateRange = require('./InputDateRange.js');
var amisUi = require('amis-ui');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var QuarterRangeControl = /** @class */ (function (_super) {
    tslib.__extends(QuarterRangeControl, _super);
    function QuarterRangeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuarterRangeControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, minDate = _a.minDate, maxDate = _a.maxDate, minDuration = _a.minDuration, maxDuration = _a.maxDuration, data = _a.data, format = _a.format, valueFormat = _a.valueFormat, inputFormat = _a.inputFormat, displayFormat = _a.displayFormat, env = _a.env, mobileUI = _a.mobileUI, rest = tslib.__rest(_a, ["className", "style", "classPrefix", "minDate", "maxDate", "minDuration", "maxDuration", "data", "format", "valueFormat", "inputFormat", "displayFormat", "env", "mobileUI"]);
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "DateRangeControl"), className) },
            _J$X_(amisUi.DateRangePicker, tslib.__assign({ viewMode: "quarters", mobileUI: mobileUI, valueFormat: valueFormat || format, displayFormat: displayFormat || inputFormat, classPrefix: ns, popOverContainer: mobileUI
                    ? env === null || env === void 0 ? void 0 : env.getModalContainer
                    : rest.popOverContainer || env.getModalContainer, onRef: this.getRef, data: data }, rest, { minDate: minDate
                    ? amisCore.filterDate(minDate, data, valueFormat || format)
                    : undefined, maxDate: maxDate
                    ? amisCore.filterDate(maxDate, data, valueFormat || format)
                    : undefined, minDuration: minDuration ? amisCore.parseDuration(minDuration) : undefined, maxDuration: maxDuration ? amisCore.parseDuration(maxDuration) : undefined, onChange: this.handleChange, onFocus: this.dispatchEvent, onBlur: this.dispatchEvent }))));
    };
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], QuarterRangeControl.prototype, "render", null);
    return QuarterRangeControl;
}(InputDateRange["default"]));
/** @class */ ((function (_super) {
    tslib.__extends(QuarterRangeControlRenderer, _super);
    function QuarterRangeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuarterRangeControlRenderer.defaultProps = {
        format: 'X',
        inputFormat: 'YYYY-[Q]Q',
        joinValues: true,
        delimiter: ',',
        /** shortcuts的兼容配置 */
        ranges: 'thisquarter,prevquarter',
        shortcuts: 'thisquarter,prevquarter',
        animation: true
    };
    QuarterRangeControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-quarter-range'
        })
    ], QuarterRangeControlRenderer);
    return QuarterRangeControlRenderer;
})(QuarterRangeControl));

exports["default"] = QuarterRangeControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
