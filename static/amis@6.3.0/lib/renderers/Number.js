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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var NumberField = /** @class */ (function (_super) {
    tslib.__extends(NumberField, _super);
    function NumberField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberField.prototype.render = function () {
        var _a = this.props, placeholder = _a.placeholder, kilobitSeparator = _a.kilobitSeparator, precision = _a.precision, prefix = _a.prefix, affix = _a.affix, suffix = _a.suffix, percent = _a.percent, unitOptions = _a.unitOptions, className = _a.className, style = _a.style, cx = _a.classnames, __ = _a.translate;
        var viewValue = (_J$X_("span", { className: "text-muted" }, placeholder));
        var value = amisCore.getPropValue(this.props);
        var unit = '';
        if (typeof value === 'string' && unitOptions && unitOptions.length) {
            var units = amisCore.normalizeOptions(unitOptions).map(function (v) { return v.value; });
            unit = units.find(function (item) { return value.endsWith(item); }) || '';
            if (unit) {
                value = value.replace(unit, '');
            }
        }
        if (typeof value === 'number' || typeof value === 'string') {
            // 设置了精度，但是原始数据是字符串，需要转成 float 之后再处理
            if (typeof value === 'string' && precision) {
                value = amisCore.stripNumber(parseFloat(value));
            }
            if (isNaN(value)) {
                viewValue = false;
            }
            else if (percent) {
                // 如果是百分比展示
                value = parseFloat(value) || 0;
                var decimals = typeof percent === 'number' ? percent : 0;
                var whole = value * 100;
                var multiplier = Math.pow(10, decimals);
                value =
                    (Math.round(whole * multiplier) / multiplier).toFixed(decimals) + '%';
                viewValue = _J$X_("span", null, value);
            }
            else {
                if (typeof value === 'number' && precision) {
                    value = value.toFixed(precision);
                }
                if (kilobitSeparator) {
                    value = amisCore.numberFormatter(value, precision);
                }
                viewValue = _J$X_("span", null, value);
            }
        }
        viewValue = !viewValue ? (_J$X_("span", { className: "text-danger" }, __('Number.invalid'))) : (_J$X_(React__default["default"].Fragment, null,
            prefix,
            viewValue,
            unit, affix !== null && affix !== void 0 ? affix : suffix));
        return (_J$X_("span", { className: cx('NumberField', className), style: style }, viewValue));
    };
    NumberField.defaultProps = {
        placeholder: '-',
        kilobitSeparator: true
    };
    return NumberField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(NumberFieldRenderer, _super);
    function NumberFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'number'
        })
    ], NumberFieldRenderer);
    return NumberFieldRenderer;
})(NumberField));

exports.NumberField = NumberField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
