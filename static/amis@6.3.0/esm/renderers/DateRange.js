/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __read, __decorate } from 'tslib';
import React from 'react';
import { Renderer } from 'amis-core';
import moment from 'moment';

var DateRangeField = /** @class */ (function (_super) {
    __extends(DateRangeField, _super);
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
        var _e = __read(value, 2), _f = _e[0], startTime = _f === void 0 ? '' : _f, _g = _e[1], endTime = _g === void 0 ? '' : _g;
        if (valueFormat) {
            startTime = moment(startTime, valueFormat);
            endTime = moment(endTime, valueFormat);
        }
        else {
            startTime = moment(startTime * 1000);
            endTime = moment(endTime * 1000);
        }
        startTime = startTime.isValid()
            ? startTime.format(displayFormat || format)
            : '';
        endTime = endTime.isValid() ? endTime.format(displayFormat || format) : '';
        return (React.createElement("span", { className: cx('DateRangeField', className), style: style }, [startTime, endTime].join(" ".concat(connector, " "))));
    };
    DateRangeField.defaultProps = {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        connector: '~'
    };
    return DateRangeField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(DateRangeFieldRenderer, _super);
    function DateRangeFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateRangeFieldRenderer = __decorate([
        Renderer({
            type: 'date-range'
        })
    ], DateRangeFieldRenderer);
    return DateRangeFieldRenderer;
})(DateRangeField));

export { DateRangeField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
