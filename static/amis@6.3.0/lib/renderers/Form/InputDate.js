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
var amisUi = require('amis-ui');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var DateControl = /** @class */ (function (_super) {
    tslib.__extends(DateControl, _super);
    function DateControl(props) {
        var _this = _super.call(this, props) || this;
        _this.placeholder = '';
        var minDate = props.minDate, maxDate = props.maxDate, value = props.value, defaultValue = props.defaultValue, setPrinstineValue = props.setPrinstineValue, data = props.data, format = props.format, valueFormat = props.valueFormat, utc = props.utc, changeMotivation = props.changeMotivation;
        if (defaultValue && value === defaultValue) {
            var date = amisCore.filterDate(defaultValue, data, valueFormat || format);
            setPrinstineValue((utc ? moment__default["default"].utc(date) : date).format(valueFormat || format));
        }
        else if (changeMotivation === 'formulaChanged' && defaultValue && value) {
            var date = amisCore.normalizeDate(value, valueFormat || format);
            if (date && date.format(valueFormat || format) !== value) {
                setPrinstineValue(date.format(valueFormat || format));
            }
        }
        var schedulesData = props.schedules;
        if (typeof schedulesData === 'string') {
            var resolved = amisCore.resolveVariableAndFilter(schedulesData, data, '| raw');
            if (Array.isArray(resolved)) {
                schedulesData = resolved;
            }
        }
        _this.state = {
            minDate: minDate
                ? amisCore.filterDate(minDate, data, valueFormat || format)
                : undefined,
            maxDate: maxDate
                ? amisCore.filterDate(maxDate, data, valueFormat || format)
                : undefined,
            schedules: schedulesData
        };
        return _this;
    }
    DateControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (prevProps.defaultValue !== props.defaultValue) {
            var date = amisCore.filterDate(props.defaultValue, props.data, props.valueFormat || props.format);
            props.setPrinstineValue((props.utc ? moment__default["default"].utc(date) : date).format(props.valueFormat || props.format));
        }
        if (prevProps.minDate !== props.minDate ||
            prevProps.maxDate !== props.maxDate ||
            prevProps.data !== props.data) {
            this.setState({
                minDate: props.minDate
                    ? amisCore.filterDate(props.minDate, props.data, this.props.valueFormat || this.props.format)
                    : undefined,
                maxDate: props.maxDate
                    ? amisCore.filterDate(props.maxDate, props.data, this.props.valueFormat || this.props.format)
                    : undefined
            });
        }
        if (amisCore.anyChanged(['schedules', 'data'], prevProps, props) &&
            typeof props.schedules === 'string' &&
            amisCore.isPureVariable(props.schedules)) {
            var schedulesData = amisCore.resolveVariableAndFilter(props.schedules, props.data, '| raw');
            var preSchedulesData = amisCore.resolveVariableAndFilter(prevProps.schedules, prevProps.data, '| raw');
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
            onAction(null, scheduleAction || defaultscheduleAction, amisCore.createObject(data, scheduleData));
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
        dispatchEvent(e, amisCore.resolveEventData(this.props, { value: value }));
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
            var date = amisCore.filterDate(value, data, valueFormat || format);
            value = (utc ? moment__default["default"].utc(date) : date).format(valueFormat || format);
        }
        onChange(value);
    };
    // 值的变化
    DateControl.prototype.handleChange = function (nextValue) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var dispatchEvent, dispatcher;
            return tslib.__generator(this, function (_a) {
                dispatchEvent = this.props.dispatchEvent;
                dispatcher = dispatchEvent('change', amisCore.resolveEventData(this.props, { value: nextValue }));
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, utc, valueFormat, format;
            return tslib.__generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, utc = _a.utc, valueFormat = _a.valueFormat, format = _a.format;
                dispatchEvent('click', amisCore.resolveEventData(this.props, {
                    value: (utc ? moment__default["default"].utc(date) : date).format(valueFormat || format)
                }));
                return [2 /*return*/];
            });
        });
    };
    // 鼠标移入日期事件
    DateControl.prototype.handleMouseEnter = function (date) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, utc, valueFormat, format;
            return tslib.__generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, utc = _a.utc, valueFormat = _a.valueFormat, format = _a.format;
                dispatchEvent('mouseenter', amisCore.resolveEventData(this.props, {
                    value: (utc ? moment__default["default"].utc(date) : date).format(valueFormat || format)
                }));
                return [2 /*return*/];
            });
        });
    };
    // 鼠标移出日期事件
    DateControl.prototype.handleMouseLeave = function (date) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, utc, valueFormat, format;
            return tslib.__generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, utc = _a.utc, valueFormat = _a.valueFormat, format = _a.format;
                dispatchEvent('mouseleave', amisCore.resolveEventData(this.props, {
                    value: (utc ? moment__default["default"].utc(date) : date).format(valueFormat || format)
                }));
                return [2 /*return*/];
            });
        });
    };
    DateControl.prototype.isDisabledDate = function (currentDate) {
        var disabledDate = this.props.disabledDate;
        var fn = typeof disabledDate === 'string'
            ? amisCore.str2function(disabledDate, 'currentDate', 'props')
            : disabledDate;
        if (typeof fn === 'function') {
            return fn(currentDate, this.props);
        }
        return false;
    };
    DateControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; _a.defaultValue; _a.defaultData; var cx = _a.classnames; _a.minDate; _a.maxDate; var type = _a.type, format = _a.format, timeFormat = _a.timeFormat, valueFormat = _a.valueFormat, env = _a.env, largeMode = _a.largeMode; _a.render; var mobileUI = _a.mobileUI, placeholder = _a.placeholder, rest = tslib.__rest(_a, ["className", "style", "defaultValue", "defaultData", "classnames", "minDate", "maxDate", "type", "format", "timeFormat", "valueFormat", "env", "largeMode", "render", "mobileUI", "placeholder"]);
        if (type === 'time' && timeFormat) {
            valueFormat = format = timeFormat;
        }
        return (_J$X_("div", { className: cx("DateControl", {
                'is-date': /date$/.test(type),
                'is-datetime': /datetime$/.test(type)
            }, className) },
            _J$X_(amisUi.DatePicker, tslib.__assign({}, rest, { env: env, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : this.placeholder, mobileUI: mobileUI, popOverContainer: mobileUI
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
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], DateControl.prototype, "getRef", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], DateControl.prototype, "dispatchEvent", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], DateControl.prototype, "handleChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], DateControl.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], DateControl.prototype, "handleMouseEnter", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], DateControl.prototype, "handleMouseLeave", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], DateControl.prototype, "isDisabledDate", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], DateControl.prototype, "render", null);
    return DateControl;
}(React__default["default"].PureComponent));
var DateControlRenderer = /** @class */ (function (_super) {
    tslib.__extends(DateControlRenderer, _super);
    function DateControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Date.placeholder');
        return _this;
    }
    DateControlRenderer.defaultProps = tslib.__assign(tslib.__assign({}, DateControl.defaultProps), { strictMode: false });
    DateControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-date',
            weight: -150
        })
    ], DateControlRenderer);
    return DateControlRenderer;
}(DateControl));
/** @class */ ((function (_super) {
    tslib.__extends(DatetimeControlRenderer, _super);
    function DatetimeControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('DateTime.placeholder');
        return _this;
    }
    DatetimeControlRenderer.defaultProps = tslib.__assign(tslib.__assign({}, DateControl.defaultProps), { inputFormat: 'YYYY-MM-DD HH:mm:ss', closeOnSelect: true, strictMode: false });
    DatetimeControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-datetime'
        })
    ], DatetimeControlRenderer);
    return DatetimeControlRenderer;
})(DateControl));
/** @class */ ((function (_super) {
    tslib.__extends(TimeControlRenderer, _super);
    function TimeControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Time.placeholder');
        return _this;
    }
    TimeControlRenderer.defaultProps = tslib.__assign(tslib.__assign({}, DateControl.defaultProps), { inputFormat: 'HH:mm', viewMode: 'time', closeOnSelect: true });
    TimeControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-time'
        })
    ], TimeControlRenderer);
    return TimeControlRenderer;
})(DateControl));
/** @class */ ((function (_super) {
    tslib.__extends(MonthControlRenderer, _super);
    function MonthControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Month.placeholder');
        return _this;
    }
    MonthControlRenderer.defaultProps = tslib.__assign(tslib.__assign({}, DateControl.defaultProps), { inputFormat: 'YYYY-MM', viewMode: 'months', closeOnSelect: true, strictMode: false });
    MonthControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-month'
        })
    ], MonthControlRenderer);
    return MonthControlRenderer;
})(DateControl));
/** @class */ ((function (_super) {
    tslib.__extends(QuarterControlRenderer, _super);
    function QuarterControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Quarter.placeholder');
        return _this;
    }
    QuarterControlRenderer.defaultProps = tslib.__assign(tslib.__assign({}, DateControl.defaultProps), { inputFormat: 'YYYY [Q]Q', viewMode: 'quarters', closeOnSelect: true, strictMode: false });
    QuarterControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-quarter'
        })
    ], QuarterControlRenderer);
    return QuarterControlRenderer;
})(DateControl));
/** @class */ ((function (_super) {
    tslib.__extends(YearControlRenderer, _super);
    function YearControlRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = _this.props.translate('Year.placeholder');
        return _this;
    }
    YearControlRenderer.defaultProps = tslib.__assign(tslib.__assign({}, DateControl.defaultProps), { inputFormat: 'YYYY', viewMode: 'years', closeOnSelect: true, strictMode: false });
    YearControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-year'
        })
    ], YearControlRenderer);
    return YearControlRenderer;
})(DateControl));

exports.DateControlRenderer = DateControlRenderer;
exports["default"] = DateControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
