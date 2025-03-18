/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import cx from 'classnames';
import { FormItem } from 'amis-core';
import { Range, Select } from 'amis-ui';

/**
 * @file filter
 * @author fex
 *
 * 不建议用，以后可能会删除。可以直接用组合出来，不需要新建一个组件。
 */
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
    __extends(RepeatControl, _super);
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
                input = (React.createElement(Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 5, max: 60, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'minutely':
                input = (React.createElement(Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 5, max: 60, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'hourly':
                input = (React.createElement(Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 24, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'daily':
                input = (React.createElement(Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 30, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'weekly':
                input = (React.createElement(Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 12, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'monthly':
                input = (React.createElement(Range, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 12, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
            case 'yearly':
                input = (React.createElement(Range, { classPrefix: ns, key: "input", className: "v-middle", value: parts[1], min: 1, step: 1, max: 20, disabled: disabled, onChange: function (value) { return _this.handleChange(value); } }));
                break;
        }
        return (React.createElement("div", { className: "repeat-control hbox" },
            input ? (React.createElement("div", { className: "col v-middle", style: { width: 30 } },
                React.createElement("span", null, __('Repeat.pre')))) : null,
            input ? React.createElement("div", { className: "col v-middle" }, input) : null,
            React.createElement("div", { className: "col v-middle repeat-btn" },
                React.createElement(Select, { classPrefix: ns, className: input ? 'pull-right' : '', options: optionsArray, placeholder: __(placeholder), onChange: this.handleOptionChange, value: parts[0], clearable: false, searchable: false, disabled: disabled, joinValues: false, mobileUI: mobileUI, popOverContainer: mobileUI
                        ? env === null || env === void 0 ? void 0 : env.getModalContainer
                        : popOverContainer || env.getModalContainer }))));
    };
    RepeatControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix;
        return (React.createElement("div", { className: cx("".concat(ns, "RepeatControl"), className) }, this.renderInput()));
    };
    RepeatControl.defaultProps = {
        // options: 'secondly,minutely,hourly,daily,weekdays,weekly,monthly,yearly'
        options: 'hourly,daily,weekly,monthly',
        placeholder: '不重复'
    };
    return RepeatControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(RepeatControlRenderer, _super);
    function RepeatControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatControlRenderer = __decorate([
        FormItem({
            type: 'input-repeat',
            sizeMutable: false
        })
    ], RepeatControlRenderer);
    return RepeatControlRenderer;
})(RepeatControl));

export { RepeatControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
