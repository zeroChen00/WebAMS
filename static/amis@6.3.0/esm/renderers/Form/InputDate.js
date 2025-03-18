/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __rest, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { filterDate, normalizeDate, resolveVariableAndFilter, anyChanged, isPureVariable, createObject, resolveEventData, str2function, autobind, FormItem } from 'amis-core';
import moment from 'moment';
import { DatePicker } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var DateControl = /** @class */ (function (_super) {
    __extends(DateControl, _super);
    function DateControl(props) {
        var _this = _super.call(this, props) || this;
        _this.placeholder = '';
        var minDate = props.minDate, maxDate = props.maxDate, value = props.value, defaultValue = props.defaultValue, setPrinstineValue = props.setPrinstineValue, data = props.data, format = props.format, valueFormat = props.valueFormat, utc = props.utc, changeMotivation = props.changeMotivation;
        if (defaultValue && value === defaultValue) {
            var date = filterDate(defaultValue, data, valueFormat || format);
            setPrinstineValue((utc ? moment.utc(date) : date).format(valueFormat || format));
        }
        else if (changeMotivation === 'formulaChanged' && defaultValue && value) {
            var date = normalizeDate(value, valueFormat || format);
            if (date && date.format(valueFormat || format) !== value) {
                setPrinstineValue(date.format(valueFormat || format));
            }
        }
        var schedulesData = props.schedules;
        if (typeof schedulesData === 'string') {
            var resolved = resolveVariableAndFilter(schedulesData, data, '| raw');
            if (Array.isArray(resolved)) {
                schedulesData = resolved;
            }
        }
        _this.state = {
            minDate: minDate
                ? filterDate(minDate, data, valueFormat || format)
                : undefined,
            maxDate: maxDate
                ? filterDate(maxDate, data, valueFormat || format)
                : undefined,
            schedules: schedulesData
        };
        return _this;
    }
    DateControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (prevProps.defaultValue !== props.defaultValue) {
            var date = filterDate(props.defaultValue, props.data, props.valueFormat || props.format);
            props.setPrinstineValue((props.utc ? moment.utc(date) : date).format(props.valueFormat || props.format));
        }
        if (prevProps.minDate !== props.minDate ||
            prevProps.maxDate !== props.maxDate ||
            prevProps.data !== props.data) {
            this.setState({
                minDate: props.minDate
                    ? filterDate(props.minDate, props.data, this.props.valueFormat || this.props.format)
                    : undefined,
                maxDate: props.maxDate
                    ? filterDate(props.maxDate, props.data, this.props.valueFormat || this.props.format)
                    : undefined
            });
        }
        if (anyChanged(['schedules', 'data'], prevProps, props) &&
            typeof props.schedules === 'string' &&
            isPureVariable(props.schedules)) {
            var schedulesData = resolveVariableAndFilter(props.schedules, props.data, '| raw');
            var preSchedulesData = resolveVariableAndFilter(prevProps.schedules, prevProps.data, '| raw');
            if (Array.isArray(schedulesData) && preSchedulesData !== schedulesData) {
                this.setState({
                    schedules: schedulesData
                });
            }
        }
    };
    // 日程点击事件
    DateControl.prototype.onScheduleClick = function (scheduleData) {
        var _a = this.props, scheduleAction = _a.scheduleAction, onAction = _a.onAction, data = _a.data, __ = _a.translate;
        var defaultscheduleAction = {
            actionType: 'dialog',
            dialog: {
                title: __('Schedule'),
                actions: [],
                closeOnEsc: true,
                body: {
                    type: 'table',
                    columns: [
                        {
                            name: 'time',
                            label: __('Time')
                        },
                        {
                            name: 'content',
                            label: __('Content')
                        }
                    ],
                    data: '${scheduleData}'
                }
            }
        };
        onAction &&
            onAction(null, scheduleAction || defaultscheduleAction, createObject(data, scheduleData));
    };
    DateControl.prototype.getRef = function (ref) {
        while (ref && ref.getWrappedInstance) {
            ref = ref.getWrappedInstance();
        }
        this.dateRef = ref;
    };
    // 派发有event的事件
    DateControl.prototype.dispatchEvent = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, value = _a.value;
        dispatchEvent(e, resolveEventData(this.props, { value: value }));
    };
    // 动作
    DateControl.prototype.doAction = function (action, data, throwErrors) {
        var _a, _b;
        var resetValue = this.props.resetValue;
        if (action.actionType === 'clear') {
            (_a = this.dateRef) === null || _a === void 0 ? void 0 : _a.clear();
            return;
        }
        if (action.actionType === 'reset' && resetValue) {
            (_b = this.dateRef) === null || _b === void 0 ? void 0 : _b.reset(resetValue);
        }
    };
    DateControl.prototype.setData = function (value) {
        var _a = this.props, data = _a.data, valueFormat = _a.valueFormat, format = _a.format, utc = _a.utc, onChange = _a.onChange;
        if (typeof value === 'string' ||
            typeof value === 'number' ||
            value instanceof Date) {
            var date = filterDate(value, data, valueFormat || format);
            value = (utc ? moment.utc(date) : date).format(valueFormat || format);
        }
        onChange(value);
    };
    // 值的变化
    DateControl.prototype.handleChange = function (nextValue) {
        return __awaiter(this, void 0, void 0, function () {
            var dispatchEvent, dispatcher;
            return __generator(this, function (_a) {
                dispatchEvent = this.props.dispatchEvent;
                dispatcher = dispatchEvent('change', resolveEventData(this.props, { value: nextValue }));
                if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                    return [2 /*return*/];
                }
                this.props.onChange(nextValue);
                return [2 /*return*/];
            });
        });
    };
    // 点击日期事件
    DateControl.prototype.handleClick = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, utc, valueFormat, format;
            return __generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, utc = _a.utc, valueFormat = _a.valueFormat, format = _a.format;
                dispatchEvent('click', resolveEventData(this.props, {
                    value: (utc ? moment.utc(date) : date).format(valueFormat || format)
                }));
                return [2 /*return*/];
            });
        });
    };
    // 鼠标移入日期事件
    DateControl.prototype.handleMouseEnter = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, utc, valueFormat, format;
            return __generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, utc = _a.utc, valueFormat = _a.valueFormat, format = _a.format;
                dispatchEvent('mouseenter', resolveEventData(this.props, {
                    value: (utc ? moment.utc(date) : date).format(valueFormat || format)
                }));
                return [2 /*return*/];
            });
        });
    };
    // 鼠标移出日期事件
    DateControl.prototype.handleMouseLeave = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, utc, valueFormat, format;
            return __generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, utc = _a.utc, valueFormat = _a.valueFormat, format = _a.format;
                dispatchEvent('mouseleave', resolveEventData(this.props, {
                    value: (utc ? moment.utc(date) : date).format(valueFormat || format)
                }));
                return [2 /*return*/];
            });
        });
    };
    DateControl.prototype.isDisabledDate = function (currentDate) {
        var disabledDate = this.props.disabledDate;
        var fn = typeof disabledDate === 'string'
            ? str2function(disabledDate, 'currentDate', 'props')
            : disabledDate;
        if (typeof fn === 'function') {
            return fn(currentDate, this.props);
        }
        return false;
    };
    DateControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; _a.defaultValue; _a.defaultData; var cx = _a.classnames; _a.minDate; _a.maxDate; var type = _a.type, format = _a.format, timeFormat = _a.timeFormat, valueFormat = _a.valueFormat, env = _a.env, largeMode = _a.largeMode; _a.render; var mobileUI = _a.mobileUI, placeholder = _a.placeholder, rest = __rest(_a, ["className", "style", "defaultValue", "defaultData", "classnames", "minDate", "maxDate", "type", "format", "timeFormat", "valueFormat", "env", "largeMode", "render", "mobileUI", "placeholder"]);
        if (type === 'time' && timeFormat) {
            valueFormat = format = timeFormat;
        }
        return (React.createElement("div", { className: cx("DateControl", {
                'is-date': /date$/.test(type),
                'is-datetime': /datetime$/.test(type)
            }, className) },
            React.createElement(DatePicker, __assign({}, rest, { env: env, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : this.placeholder, mobileUI: mobileUI, popOverContainer: mobileUI
                    ? env === null || env === void 0 ? void 0 : env.getModalContainer
                    : rest.popOverContainer || env.getModalContainer }, this.state, { valueFormat: valueFormat || format, minDateRaw: this.props.minDate, maxDateRaw: this.props.maxDate, classnames: cx, onRef: this.getRef, schedules: this.state.schedules, largeMode: largeMode, onScheduleClick: this.onScheduleClick.bind(this), onChange: this.handleChange, onFocus: this.dispatchEvent, onBlur: this.dispatchEvent, disabledDate: this.isDisabledDate, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }))));
    };
    DateControl.defaultProps = {
        format: 'X',
        viewMode: 'days',
        inputFormat: 'YYYY-MM-DD',
        timeConstraints: {
            minutes: {
                step: 1
            }
        },
        clearable: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DateControl.prototype, "getRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DateControl.prototype, "dispatchEvent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], DateControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], DateControl.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], DateControl.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], DateControl.prototype, "handleMouseLeave", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DateControl.prototype, "isDisabledDate", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DateControl.prototype, "render", null);
    return DateControl;
}(React.PureComponent));
var DateControlRenderer = /** @class */ (function (_super) {
    __extends(DateControlRenderer, _super);
    function DateControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Date.placeholder');
        return _this;
    }
    DateControlRenderer.defaultProps = __assign(__assign({}, DateControl.defaultProps), { strictMode: false });
    DateControlRenderer = __decorate([
        FormItem({
            type: 'input-date',
            weight: -150
        })
    ], DateControlRenderer);
    return DateControlRenderer;
}(DateControl));
/** @class */ ((function (_super) {
    __extends(DatetimeControlRenderer, _super);
    function DatetimeControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('DateTime.placeholder');
        return _this;
    }
    DatetimeControlRenderer.defaultProps = __assign(__assign({}, DateControl.defaultProps), { inputFormat: 'YYYY-MM-DD HH:mm:ss', closeOnSelect: true, strictMode: false });
    DatetimeControlRenderer = __decorate([
        FormItem({
            type: 'input-datetime'
        })
    ], DatetimeControlRenderer);
    return DatetimeControlRenderer;
})(DateControl));
/** @class */ ((function (_super) {
    __extends(TimeControlRenderer, _super);
    function TimeControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Time.placeholder');
        return _this;
    }
    TimeControlRenderer.defaultProps = __assign(__assign({}, DateControl.defaultProps), { inputFormat: 'HH:mm', viewMode: 'time', closeOnSelect: true });
    TimeControlRenderer = __decorate([
        FormItem({
            type: 'input-time'
        })
    ], TimeControlRenderer);
    return TimeControlRenderer;
})(DateControl));
/** @class */ ((function (_super) {
    __extends(MonthControlRenderer, _super);
    function MonthControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Month.placeholder');
        return _this;
    }
    MonthControlRenderer.defaultProps = __assign(__assign({}, DateControl.defaultProps), { inputFormat: 'YYYY-MM', viewMode: 'months', closeOnSelect: true, strictMode: false });
    MonthControlRenderer = __decorate([
        FormItem({
            type: 'input-month'
        })
    ], MonthControlRenderer);
    return MonthControlRenderer;
})(DateControl));
/** @class */ ((function (_super) {
    __extends(QuarterControlRenderer, _super);
    function QuarterControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Quarter.placeholder');
        return _this;
    }
    QuarterControlRenderer.defaultProps = __assign(__assign({}, DateControl.defaultProps), { inputFormat: 'YYYY [Q]Q', viewMode: 'quarters', closeOnSelect: true, strictMode: false });
    QuarterControlRenderer = __decorate([
        FormItem({
            type: 'input-quarter'
        })
    ], QuarterControlRenderer);
    return QuarterControlRenderer;
})(DateControl));
/** @class */ ((function (_super) {
    __extends(YearControlRenderer, _super);
    function YearControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Year.placeholder');
        return _this;
    }
    YearControlRenderer.defaultProps = __assign(__assign({}, DateControl.defaultProps), { inputFormat: 'YYYY', viewMode: 'years', closeOnSelect: true, strictMode: false });
    YearControlRenderer = __decorate([
        FormItem({
            type: 'input-year'
        })
    ], YearControlRenderer);
    return YearControlRenderer;
})(DateControl));

export { DateControlRenderer, DateControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
