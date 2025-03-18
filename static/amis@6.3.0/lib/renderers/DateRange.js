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
var moment = require('moment');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var DateRangeField = /** @class */ (function (_super) {
    tslib.__extends(DateRangeField, _super);
    function DateRangeField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateRangeField.prototype.render = function () {
        var _a = this.props, _b = _a.delimiter, delimiter = _b === void 0 ? ',' : _b, _c = _a.connector, connector = _c === void 0 ? '~' : _c, value = _a.value, valueFormat = _a.valueFormat, _d = _a.format, format = _d === void 0 ? 'YYYY-MM-DD' : _d, displayFormat = _a.displayFormat, cx = _a.classnames, className = _a.className, style = _a.style;
        if (!value) {
            return null;
        }
        if (typeof value === 'string') {
            value = value.split(delimiter);
        }
        var _e = tslib.__read(value, 2), _f = _e[0], startTime = _f === void 0 ? '' : _f, _g = _e[1], endTime = _g === void 0 ? '' : _g;
        if (valueFormat) {
            startTime = moment__default["default"](startTime, valueFormat);
            endTime = moment__default["default"](endTime, valueFormat);
        }
        else {
            startTime = moment__default["default"](startTime * 1000);
            endTime = moment__default["default"](endTime * 1000);
        }
        startTime = startTime.isValid()
            ? startTime.format(displayFormat || format)
            : '';
        endTime = endTime.isValid() ? endTime.format(displayFormat || format) : '';
        return (_J$X_("span", { className: cx('DateRangeField', className), style: style }, [startTime, endTime].join(" ".concat(connector, " "))));
    };
    DateRangeField.defaultProps = {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        connector: '~'
    };
    return DateRangeField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(DateRangeFieldRenderer, _super);
    function DateRangeFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateRangeFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'date-range'
        })
    ], DateRangeFieldRenderer);
    return DateRangeFieldRenderer;
})(DateRangeField));

exports.DateRangeField = DateRangeField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
