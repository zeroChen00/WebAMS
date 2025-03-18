/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import cx from 'classnames';
import { matchSorter } from 'match-sorter';
import keycode from 'keycode';
import Downshift from 'downshift';
import { autobind, FormItem } from 'amis-core';
import { ICONS } from './IconPickerIcons.js';
import { Icon } from 'amis-ui';

var IconPickerControl = /** @class */ (function (_super) {
    __extends(IconPickerControl, _super);
    function IconPickerControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
            inputValue: '',
            isFocused: false,
            vendorIndex: 0
        };
        return _this;
    }
    IconPickerControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (prevProps.value !== props.value) {
            this.setState({
                inputValue: ''
            });
        }
    };
    IconPickerControl.prototype.changeVendor = function (index) {
        this.setState({
            vendorIndex: index
        }, this.formatOptions);
    };
    IconPickerControl.prototype.formatOptions = function () {
        var vendorIndex = this.state.vendorIndex || 0;
        var _a = ICONS[vendorIndex], prefix = _a.prefix, icons = _a.icons;
        return icons.map(function (icon) { return ({
            label: prefix + icon,
            value: prefix + icon
        }); });
    };
    IconPickerControl.prototype.getVendors = function () {
        return ICONS.map(function (icons) { return icons.name; });
    };
    IconPickerControl.prototype.inputRef = function (ref) {
        this.input = ref;
    };
    IconPickerControl.prototype.focus = function () {
        if (!this.input) {
            return;
        }
        this.input.focus();
        var len = this.input.value.length;
        len && this.input.setSelectionRange(len, len);
    };
    IconPickerControl.prototype.handleClick = function () {
        if (this.props.disabled) {
            return;
        }
        this.focus();
        this.setState({
            isOpen: true
        });
    };
    IconPickerControl.prototype.handleFocus = function (e) {
        this.setState({
            isOpen: true,
            isFocused: true
        });
        this.props.onFocus && this.props.onFocus(e);
    };
    IconPickerControl.prototype.handleBlur = function (e) {
        var _a = this.props, onBlur = _a.onBlur, trimContents = _a.trimContents, value = _a.value, onChange = _a.onChange;
        this.setState({
            isFocused: false
        }, function () {
            if (trimContents && value && typeof value === 'string') {
                onChange(value.trim());
            }
        });
        onBlur && onBlur(e);
    };
    IconPickerControl.prototype.handleInputChange = function (evt) {
        var value = evt.currentTarget.value;
        this.setState({
            inputValue: value
        });
    };
    IconPickerControl.prototype.handleKeyDown = function (evt) {
        var code = keycode(evt.keyCode);
        if (code !== 'backspace') {
            return;
        }
        var onChange = this.props.onChange;
        if (!this.state.inputValue) {
            onChange('');
            this.setState({
                inputValue: ''
            });
        }
    };
    IconPickerControl.prototype.handleChange = function (value) {
        var _a = this.props, onChange = _a.onChange, disabled = _a.disabled;
        if (disabled) {
            return;
        }
        onChange(value);
        this.setState({
            isFocused: false,
            inputValue: ''
        });
    };
    IconPickerControl.prototype.handleStateChange = function (changes) {
        switch (changes.type) {
            case Downshift.stateChangeTypes.itemMouseEnter:
            case Downshift.stateChangeTypes.changeInput:
                this.setState({
                    isOpen: true
                });
                break;
            default:
                var state = {};
                if (typeof changes.isOpen !== 'undefined') {
                    state.isOpen = changes.isOpen;
                }
                if (this.state.isOpen && changes.isOpen === false) {
                    state.inputValue = '';
                }
                this.setState(state);
                break;
        }
    };
    IconPickerControl.prototype.handleClear = function () {
        var _this = this;
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        onChange === null || onChange === void 0 ? void 0 : onChange(resetValue);
        this.setState({
            inputValue: resetValue,
            isFocused: true
        }, function () {
            _this.focus();
        });
    };
    IconPickerControl.prototype.renderFontIcons = function () {
        var _this = this;
        var _a = this.props, className = _a.className, inputOnly = _a.inputOnly, placeholder = _a.placeholder, cx = _a.classnames, name = _a.name, value = _a.value, noDataTip = _a.noDataTip, disabled = _a.disabled, clearable = _a.clearable, __ = _a.translate;
        var options = this.formatOptions();
        var vendors = this.getVendors();
        return (React.createElement(Downshift, { isOpen: this.state.isOpen, inputValue: this.state.inputValue, onChange: this.handleChange, onOuterClick: this.handleBlur, onStateChange: this.handleStateChange, selectedItem: [value] }, function (_a) {
            var getInputProps = _a.getInputProps, getItemProps = _a.getItemProps, isOpen = _a.isOpen, inputValue = _a.inputValue;
            var filteredOptions = inputValue && isOpen
                ? matchSorter(options, inputValue, {
                    keys: ['label', 'value'],
                    threshold: matchSorter.rankings.CONTAINS
                })
                : options;
            return (React.createElement("div", { className: cx("IconPickerControl-input IconPickerControl-input--withAC", inputOnly ? className : '', {
                    'is-opened': isOpen
                }), onClick: _this.handleClick },
                React.createElement("div", { className: cx('IconPickerControl-valueWrap') },
                    placeholder && !value && !_this.state.inputValue ? (React.createElement("div", { className: cx('IconPickerControl-placeholder') }, placeholder)) : null,
                    !value || (inputValue && isOpen) ? null : (React.createElement("div", { className: cx('IconPickerControl-value') },
                        React.createElement("i", { className: cx(value) }),
                        typeof value === 'string' ? value : '')),
                    React.createElement("input", __assign({}, getInputProps({
                        name: name,
                        ref: _this.inputRef,
                        onFocus: _this.handleFocus,
                        onChange: _this.handleInputChange,
                        onKeyDown: _this.handleKeyDown,
                        value: _this.state.inputValue
                    }), { autoComplete: "off", disabled: disabled, size: 10 })),
                    clearable && !disabled && value ? (React.createElement("a", { onClick: _this.handleClear, className: cx('IconPickerControl-clear') },
                        React.createElement(Icon, { icon: "input-clear", className: "icon" }))) : null),
                isOpen ? (React.createElement("div", { className: cx('IconPickerControl-sugsPanel') },
                    vendors.length > 1 ? (React.createElement("div", { className: cx('IconPickerControl-tabs') }, vendors.map(function (vendor, index) { return (React.createElement("div", { className: cx('IconPickerControl-tab', {
                            active: _this.state.vendorIndex === index
                        }), onClick: function () { return _this.changeVendor(index); }, key: index }, vendor)); }))) : null,
                    filteredOptions.length ? (React.createElement("div", { className: cx('IconPickerControl-sugs', vendors.length > 1
                            ? 'IconPickerControl-multiVendor'
                            : 'IconPickerControl-singleVendor') }, filteredOptions.map(function (option, index) { return (React.createElement("div", __assign({}, getItemProps({
                        item: option.value,
                        className: cx("IconPickerControl-sugItem", {
                            'is-active': value === option.value
                        })
                    }), { key: index }),
                        React.createElement("i", { className: cx("".concat(option.value)), title: "".concat(option.value) }))); }))) : (React.createElement("div", { className: cx(vendors.length > 1
                            ? 'IconPickerControl-multiVendor'
                            : 'IconPickerControl-singleVendor') }, __(noDataTip))))) : null));
        }));
    };
    IconPickerControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, inputOnly = _a.inputOnly, disabled = _a.disabled;
        var input = this.renderFontIcons();
        if (inputOnly) {
            return input;
        }
        return (React.createElement("div", { className: cx(className, "".concat(ns, "IconPickerControl"), {
                'is-focused': this.state.isFocused,
                'is-disabled': disabled
            }) }, input));
    };
    IconPickerControl.defaultProps = {
        resetValue: '',
        placeholder: '',
        noDataTip: 'placeholder.noData'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "changeVendor", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "formatOptions", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "getVendors", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "inputRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "focus", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "handleFocus", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "handleBlur", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "handleInputChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "handleKeyDown", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "handleStateChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconPickerControl.prototype, "handleClear", null);
    return IconPickerControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(IconPickerControlRenderer, _super);
    function IconPickerControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconPickerControlRenderer = __decorate([
        FormItem({
            type: 'icon-picker'
        })
    ], IconPickerControlRenderer);
    return IconPickerControlRenderer;
})(IconPickerControl));

export { IconPickerControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
