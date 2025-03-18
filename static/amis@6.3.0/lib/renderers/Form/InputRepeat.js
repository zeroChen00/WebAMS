/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var LANG = {
    secondly: '秒',
    minutely: '分',
    hourly: '时',
    daily: '天',
    weekdays: '周中',
    weekly: '周',
    monthly: '月',
    yearly: '年'
};
var RepeatControl = /** @class */ (function (_super) {
    tslib.__extends(RepeatControl, _super);
    function RepeatControl(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOptionChange = _this.handleOptionChange.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    RepeatControl.prototype.handleOptionChange = function (option) {
        this.props.onChange(option.value);
    };
    RepeatControl.prototype.handleChange = function (value) {
        var option = this.props.value;
        var parts = option ? option.split(':') : [];
        this.props.onChange("".concat(parts[0], ":").concat(value));
    };
    RepeatControl.prototype.renderInput = function () {
        var _this = this;
        var value = this.props.value;
        var parts = value ? value.split(':') : [];
        var _a = this.props, options = _a.options, placeholder = _a.placeholder, disabled = _a.disabled, ns = _a.classPrefix, mobileUI = _a.mobileUI, popOverContainer = _a.popOverContainer, env = _a.env, __ = _a.translate;
        var optionsArray = [];
        optionsArray = options.split(',').map(function (key) { return ({
            label: LANG[key] || '不支持',
            value: key
        }); });
        optionsArray.unshift({
            label: __(placeholder),
            value: ''
        });
        var input;
        parts[1] = parseInt(parts[1], 10) || 1;
        switch (parts[0]) {
            case 'secondly':
                input = (_J$X_(amisUi.Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 5, max: 60, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'minutely':
                input = (_J$X_(amisUi.Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 5, max: 60, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'hourly':
                input = (_J$X_(amisUi.Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 24, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'daily':
                input = (_J$X_(amisUi.Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 30, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'weekly':
                input = (_J$X_(amisUi.Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 12, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'monthly':
                input = (_J$X_(amisUi.Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 12, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'yearly':
                input = (_J$X_(amisUi.Range, { classPrefix: ns, key: "input", className: "v-middle", value: parts[1], min: 1, step: 1, max: 20, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
        }
        return (_J$X_("div", { className: "repeat-control hbox" },
            input ? (_J$X_("div", { className: "col v-middle", style: { width: 30 } },
                _J$X_("span", null, __('Repeat.pre')))) : null,
            input ? _J$X_("div", { className: "col v-middle" }, input) : null,
            _J$X_("div", { className: "col v-middle repeat-btn" },
                _J$X_(amisUi.Select, { classPrefix: ns, className: input ? 'pull-right' : '', options: optionsArray, placeholder: __(placeholder), onChange: this.handleOptionChange, value: parts[0], clearable: false, searchable: false, disabled: disabled, joinValues: false, mobileUI: mobileUI, popOverContainer: mobileUI
                        ? env === null || env === void 0 ? void 0 : env.getModalContainer
                        : popOverContainer || env.getModalContainer }))));
    };
    RepeatControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix;
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "RepeatControl"), className) }, this.renderInput()));
    };
    RepeatControl.defaultProps = {
        // options: 'secondly,minutely,hourly,daily,weekdays,weekly,monthly,yearly'
        options: 'hourly,daily,weekly,monthly',
        placeholder: '不重复'
    };
    return RepeatControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(RepeatControlRenderer, _super);
    function RepeatControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-repeat',
            sizeMutable: false
        })
    ], RepeatControlRenderer);
    return RepeatControlRenderer;
})(RepeatControl));

exports["default"] = RepeatControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
