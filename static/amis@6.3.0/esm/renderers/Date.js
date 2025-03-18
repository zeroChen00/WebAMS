/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { getPropValue, normalizeDate, setThemeClassName, CustomStyle, Renderer } from 'amis-core';
import 'moment-timezone';

var DateField = /** @class */ (function (_super) {
    __extends(DateField, _super);
    function DateField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 动态显示相对时间时，用来触发视图更新
        _this.state = {
            random: 0
        };
        return _this;
    }
    DateField.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, fromNow = _a.fromNow, updateFrequency = _a.updateFrequency;
        if (fromNow && updateFrequency) {
            this.refreshInterval = setInterval(function () {
                _this.setState({
                    random: Math.random()
                });
            }, updateFrequency);
        }
    };
    DateField.prototype.componentWillUnmount = function () {
        clearInterval(this.refreshInterval);
    };
    DateField.prototype.render = function () {
        var _a = this.props, valueFormat = _a.valueFormat, format = _a.format, displayFormat = _a.displayFormat, placeholder = _a.placeholder, fromNow = _a.fromNow, className = _a.className, style = _a.style, cx = _a.classnames, locale = _a.locale, __ = _a.translate, displayTimeZone = _a.displayTimeZone; _a.data; var id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss; _a.baseControlClassName;
        var viewValue = (React.createElement("span", { className: "text-muted" }, placeholder));
        var value = getPropValue(this.props);
        // 主要是给 fromNow 用的
        var date = null;
        if (value && (date = normalizeDate(value, valueFormat))) {
            var normalizeDate_1 = date;
            if (displayTimeZone) {
                normalizeDate_1 = normalizeDate_1.clone().tz(displayTimeZone);
            }
            viewValue = normalizeDate_1.format(displayFormat || format);
            if (viewValue) {
                date = viewValue;
            }
            if (fromNow) {
                viewValue = normalizeDate_1.locale(locale).fromNow();
            }
        }
        viewValue = !viewValue ? (React.createElement("span", { className: "text-danger" }, __('Date.invalid'))) : (viewValue);
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { style: style, title: fromNow && date ? date : undefined, className: cx('DateField', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))) }, viewValue),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    DateField.defaultProps = {
        placeholder: '-',
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        fromNow: false,
        updateFrequency: 60000
    };
    return DateField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(DateFieldRenderer, _super);
    function DateFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateFieldRenderer.defaultProps = __assign(__assign({}, DateField.defaultProps), { format: 'YYYY-MM-DD' });
    DateFieldRenderer = __decorate([
        Renderer({
            type: 'date'
        })
    ], DateFieldRenderer);
    return DateFieldRenderer;
})(DateField));
/** @class */ ((function (_super) {
    __extends(DateTimeFieldRenderer, _super);
    function DateTimeFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeFieldRenderer.defaultProps = __assign(__assign({}, DateField.defaultProps), { format: 'YYYY-MM-DD HH:mm:ss' });
    DateTimeFieldRenderer = __decorate([
        Renderer({
            type: 'datetime'
        })
    ], DateTimeFieldRenderer);
    return DateTimeFieldRenderer;
})(DateField));
/** @class */ ((function (_super) {
    __extends(TimeFieldRenderer, _super);
    function TimeFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeFieldRenderer.defaultProps = __assign(__assign({}, DateField.defaultProps), { format: 'HH:mm' });
    TimeFieldRenderer = __decorate([
        Renderer({
            type: 'time'
        })
    ], TimeFieldRenderer);
    return TimeFieldRenderer;
})(DateField));
/** @class */ ((function (_super) {
    __extends(MonthFieldRenderer, _super);
    function MonthFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthFieldRenderer.defaultProps = __assign(__assign({}, DateField.defaultProps), { format: 'YYYY-MM' });
    MonthFieldRenderer = __decorate([
        Renderer({
            type: 'month'
        })
    ], MonthFieldRenderer);
    return MonthFieldRenderer;
})(DateField));

export { DateField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
