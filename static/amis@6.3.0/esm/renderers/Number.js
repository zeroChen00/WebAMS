/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { getPropValue, normalizeOptions, stripNumber, numberFormatter, Renderer } from 'amis-core';

var NumberField = /** @class */ (function (_super) {
    __extends(NumberField, _super);
    function NumberField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberField.prototype.render = function () {
        var _a = this.props, placeholder = _a.placeholder, kilobitSeparator = _a.kilobitSeparator, precision = _a.precision, prefix = _a.prefix, affix = _a.affix, suffix = _a.suffix, percent = _a.percent, unitOptions = _a.unitOptions, className = _a.className, style = _a.style, cx = _a.classnames, __ = _a.translate;
        var viewValue = (React.createElement("span", { className: "text-muted" }, placeholder));
        var value = getPropValue(this.props);
        var unit = '';
        if (typeof value === 'string' && unitOptions && unitOptions.length) {
            var units = normalizeOptions(unitOptions).map(function (v) { return v.value; });
            unit = units.find(function (item) { return value.endsWith(item); }) || '';
            if (unit) {
                value = value.replace(unit, '');
            }
        }
        if (typeof value === 'number' || typeof value === 'string') {
            // 设置了精度，但是原始数据是字符串，需要转成 float 之后再处理
            if (typeof value === 'string' && precision) {
                value = stripNumber(parseFloat(value));
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
                viewValue = React.createElement("span", null, value);
            }
            else {
                if (typeof value === 'number' && precision) {
                    value = value.toFixed(precision);
                }
                if (kilobitSeparator) {
                    value = numberFormatter(value, precision);
                }
                viewValue = React.createElement("span", null, value);
            }
        }
        viewValue = !viewValue ? (React.createElement("span", { className: "text-danger" }, __('Number.invalid'))) : (React.createElement(React.Fragment, null,
            prefix,
            viewValue,
            unit, affix !== null && affix !== void 0 ? affix : suffix));
        return (React.createElement("span", { className: cx('NumberField', className), style: style }, viewValue));
    };
    NumberField.defaultProps = {
        placeholder: '-',
        kilobitSeparator: true
    };
    return NumberField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(NumberFieldRenderer, _super);
    function NumberFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberFieldRenderer = __decorate([
        Renderer({
            type: 'number'
        })
    ], NumberFieldRenderer);
    return NumberFieldRenderer;
})(NumberField));

export { NumberField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
