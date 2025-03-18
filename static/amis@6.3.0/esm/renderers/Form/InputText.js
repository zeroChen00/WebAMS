/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import debounce from 'lodash/debounce';
import find from 'lodash/find';
import { isEffectiveApi, createObject, setVariable, resolveEventData, filter, setThemeClassName, ucFirst, Overlay, PopOver, highlight, CustomStyle, formatInputThemeCss, autobind, OptionsControl } from 'amis-core';
import { OverflowTpl, Icon, Input, Spinner } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var TextControl = /** @class */ (function (_super) {
    __extends(TextControl, _super);
    function TextControl(props) {
        var _this = _super.call(this, props) || this;
        var value = props.value;
        _this.state = {
            isOpen: false,
            inputValue: props.multiple || props.creatable === false
                ? ''
                : _this.valueToString(value),
            isFocused: false,
            revealPassword: false
        };
        _this.focus = _this.focus.bind(_this);
        _this.clearValue = _this.clearValue.bind(_this);
        _this.toggleRevealPassword = _this.toggleRevealPassword.bind(_this);
        _this.inputRef = _this.inputRef.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleStateChange = _this.handleStateChange.bind(_this);
        _this.loadAutoComplete = debounce(_this.loadAutoComplete.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        return _this;
    }
    TextControl.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, formItem = _a.formItem, autoComplete = _a.autoComplete, addHook = _a.addHook, formInited = _a.formInited, data = _a.data, name = _a.name;
        if (isEffectiveApi(autoComplete, data) && formItem) {
            if (formInited) {
                formItem.loadOptions(autoComplete, createObject(data, {
                    term: ''
                }));
            }
            else if (addHook) {
                this.unHook = addHook(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, formItem.loadOptions(autoComplete, createObject(data, {
                                    term: ''
                                }))];
                            case 1:
                                _a.sent();
                                if (formItem.value) {
                                    setVariable(data, name, formItem.value);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, 'init');
            }
        }
    };
    TextControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (prevProps.value !== props.value) {
            this.setState({
                inputValue: props.multiple || props.creatable === false
                    ? ''
                    : this.valueToString(props.value)
            });
        }
        if (prevProps.revealPassword !== props.revealPassword) {
            /** 隐藏按钮的同时将密码设置为隐藏态 */
            !props.revealPassword && this.setState({ revealPassword: false });
        }
    };
    TextControl.prototype.componentWillUnmount = function () {
        this.unHook && this.unHook();
    };
    TextControl.prototype.inputRef = function (ref) {
        this.input = ref;
    };
    TextControl.prototype.doAction = function (action, data, throwErrors, args) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (!!~['clear', 'reset'].indexOf(actionType)) {
            this.clearValue();
        }
        else if (actionType === 'focus') {
            this.focus();
        }
    };
    TextControl.prototype.focus = function () {
        if (!this.input) {
            return;
        }
        this.input.focus();
        // 光标放到最后
        var len = this.input.value.length;
        if (len) {
            // type为email的input元素不支持setSelectionRange，先改为text
            if (this.input.type === 'email') {
                this.input.type = 'text';
                this.input.setSelectionRange(len, len);
                this.input.type = 'email';
            }
            else {
                this.input.setSelectionRange(len, len);
            }
        }
    };
    TextControl.prototype.clearValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, dispatchEvent, clearValueOnEmpty, resetValue, clearEvent, changeEvent;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent, clearValueOnEmpty = _a.clearValueOnEmpty;
                        resetValue = this.props.resetValue;
                        if (clearValueOnEmpty && resetValue === '') {
                            resetValue = undefined;
                        }
                        return [4 /*yield*/, dispatchEvent('clear', resolveEventData(this.props, { value: resetValue }))];
                    case 1:
                        clearEvent = _b.sent();
                        if (clearEvent === null || clearEvent === void 0 ? void 0 : clearEvent.prevented) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { resetValue: resetValue }))];
                    case 2:
                        changeEvent = _b.sent();
                        if (changeEvent === null || changeEvent === void 0 ? void 0 : changeEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(resetValue);
                        this.setState({
                            inputValue: resetValue
                        }, function () {
                            _this.focus();
                            _this.loadAutoComplete();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TextControl.prototype.removeItem = function (index) {
        var _a = this.props, selectedOptions = _a.selectedOptions, onChange = _a.onChange;
        var newValue = selectedOptions.concat();
        newValue.splice(index, 1);
        onChange(this.normalizeValue(newValue));
    };
    TextControl.prototype.handleClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, value, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, value = _a.value;
                        return [4 /*yield*/, dispatchEvent('click', resolveEventData(this.props, {
                                value: value
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        // 已经 focus 的就不重复执行，否则总重新定位光标
                        this.state.isFocused || this.focus();
                        this.setState({
                            isOpen: true
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TextControl.prototype.handleFocus = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onFocus, value, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onFocus = _a.onFocus, value = _a.value;
                        this.setState({
                            isOpen: true,
                            isFocused: true
                        });
                        return [4 /*yield*/, dispatchEvent('focus', resolveEventData(this.props, {
                                value: value
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
                        return [2 /*return*/];
                }
            });
        });
    };
    TextControl.prototype.handleBlur = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onBlur, trimContents, value, onChange, dispatchEvent, rendererEvent;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onBlur = _a.onBlur, trimContents = _a.trimContents, value = _a.value, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent;
                        this.setState({
                            isFocused: false
                        }, function () {
                            if (trimContents && value && typeof value === 'string') {
                                var trimedValue = value.trim();
                                // 因为下发给 Input 的 value 可能不会变，所以这里需要手动同步一下
                                if (_this.input) {
                                    _this.input.value = trimedValue;
                                }
                                onChange(trimedValue);
                            }
                        });
                        return [4 /*yield*/, dispatchEvent('blur', resolveEventData(this.props, {
                                value: value
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onBlur && onBlur(e);
                        return [2 /*return*/];
                }
            });
        });
    };
    TextControl.prototype.close = function () {
        this.setState({
            isFocused: false
        });
    };
    TextControl.prototype.handleInputChange = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var value, _a, creatable, multiple, onChange, dispatchEvent, rendererEvent;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        value = this.transformValue(evt.currentTarget.value);
                        _a = this.props, creatable = _a.creatable, multiple = _a.multiple, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: value }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            inputValue: value
                        }, function () {
                            if (creatable !== false && !multiple) {
                                onChange === null || onChange === void 0 ? void 0 : onChange(value);
                            }
                            _this.loadAutoComplete();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TextControl.prototype.handleKeyDown = function (evt) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, selectedOptions, onChange, multiple, creatable, dispatchEvent, valueField, newValue, value_1, newValue, rendererEvent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, selectedOptions = _b.selectedOptions, onChange = _b.onChange, multiple = _b.multiple, creatable = _b.creatable, dispatchEvent = _b.dispatchEvent;
                        valueField = ((_a = this.props) === null || _a === void 0 ? void 0 : _a.valueField) || 'value';
                        if (!(selectedOptions.length && !this.state.inputValue && evt.keyCode === 8)) return [3 /*break*/, 1];
                        evt.preventDefault();
                        newValue = selectedOptions.concat();
                        newValue.pop();
                        onChange(this.normalizeValue(newValue));
                        this.setState({
                            inputValue: ''
                        }, this.loadAutoComplete);
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(evt.key === 'Enter' &&
                            this.state.inputValue &&
                            typeof this.highlightedIndex !== 'number' &&
                            creatable !== false)) return [3 /*break*/, 3];
                        evt.preventDefault();
                        value_1 = this.state.inputValue;
                        if (multiple && value_1) {
                            if (!find(selectedOptions, function (item) { return item[valueField] == value_1; })) {
                                newValue = selectedOptions.concat();
                                newValue.push({
                                    label: value_1,
                                    value: value_1
                                });
                                value_1 = this.normalizeValue(newValue).concat();
                            }
                            else {
                                value_1 = this.normalizeValue(selectedOptions).concat();
                            }
                        }
                        return [4 /*yield*/, dispatchEvent('enter', resolveEventData(this.props, { value: value_1 }))];
                    case 2:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(value_1);
                        this.setState({
                            inputValue: multiple ? '' : value_1,
                            isOpen: false
                        }, this.loadAutoComplete);
                        return [3 /*break*/, 4];
                    case 3:
                        if (evt.key === 'Enter' &&
                            this.state.isOpen &&
                            typeof this.highlightedIndex !== 'number') {
                            this.setState({
                                isOpen: false
                            });
                        }
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TextControl.prototype.handleChange = function (value) {
        var _a = this.props, onChange = _a.onChange, multiple = _a.multiple, options = _a.options, selectedOptions = _a.selectedOptions, creatable = _a.creatable, valueField = _a.valueField;
        // Downshift传入的selectedItem是valueField字段，需要取回选项
        var toggledOption = options.find(function (item) { return item[valueField || 'value'] === value; });
        if (multiple) {
            var newValue = selectedOptions.concat();
            toggledOption && newValue.push(toggledOption);
            onChange(this.normalizeValue(newValue));
        }
        else {
            onChange(toggledOption ? this.normalizeValue(toggledOption) : value);
        }
        if (multiple || creatable === false) {
            this.setState({
                inputValue: ''
            }, this.loadAutoComplete);
        }
    };
    TextControl.prototype.handleStateChange = function (changes) {
        var creatable = this.props.creatable;
        var multiple = this.props.multiple || this.props.multi;
        switch (changes.type) {
            case Downshift.stateChangeTypes.itemMouseEnter:
                this.setState({
                    isOpen: true
                });
                break;
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
                if (typeof changes.highlightedIndex !== 'undefined') {
                    this.highlightedIndex = changes.highlightedIndex;
                }
                // 输入框清空
                if (!multiple &&
                    creatable === false &&
                    this.state.isOpen &&
                    changes.isOpen === false) {
                    state.inputValue = '';
                }
                this.setState(state);
                break;
        }
    };
    TextControl.prototype.handleNormalInputChange = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, dispatchEvent, trimContents, clearValueOnEmpty, value, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent, trimContents = _a.trimContents, clearValueOnEmpty = _a.clearValueOnEmpty;
                        value = this.transformValue(e.currentTarget.value);
                        if (typeof value === 'string') {
                            if (trimContents) {
                                value = value.trim();
                            }
                            if (clearValueOnEmpty && value === '') {
                                value = undefined;
                            }
                        }
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: value }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    TextControl.prototype.normalizeValue = function (value) {
        var _a = this.props, multiple = _a.multiple, delimiter = _a.delimiter, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField;
        var selectedOptions = Array.isArray(value) ? value : value ? [value] : [];
        if (joinValues) {
            return selectedOptions
                .map(function (item) { return item[valueField || 'value']; })
                .join(delimiter || ',');
        }
        else if (extractValue) {
            var mappedValue = selectedOptions.map(function (item) { return item[valueField || 'value']; });
            return multiple ? mappedValue : mappedValue[0];
        }
        else {
            return multiple ? selectedOptions : selectedOptions[0];
        }
    };
    TextControl.prototype.transformValue = function (value) {
        var transform = this.props.transform;
        if (!transform) {
            return value;
        }
        Object.keys(transform).forEach(function (key) {
            var propValue = transform[key];
            switch (key) {
                case 'lowerCase':
                    propValue && (value = value.toLowerCase());
                    break;
                case 'upperCase':
                    propValue && (value = value.toUpperCase());
                    break;
            }
        });
        return value;
    };
    TextControl.prototype.loadAutoComplete = function () {
        var _a = this.props, formItem = _a.formItem, autoComplete = _a.autoComplete, data = _a.data;
        if (isEffectiveApi(autoComplete, data) && formItem) {
            formItem.loadOptions(autoComplete, createObject(data, {
                term: this.state.inputValue || '' // (multiple ? '' : selectedOptions[selectedOptions.length - 1]?.value)
            }), {
                extendsOptions: true
            });
        }
    };
    TextControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    TextControl.prototype.valueToString = function (value) {
        return typeof value === 'undefined' || value === null
            ? ''
            : typeof value === 'string'
                ? value
                : value instanceof Date
                    ? value.toISOString()
                    : JSON.stringify(value);
    };
    TextControl.prototype.getTarget = function () {
        var _a;
        return (_a = this.input) === null || _a === void 0 ? void 0 : _a.parentElement;
    };
    TextControl.prototype.renderSugestMode = function () {
        var _this = this;
        var _a;
        var _b = this.props, className = _b.className; _b.style; var inputControlClassName = _b.inputControlClassName, nativeInputClassName = _b.nativeInputClassName, inputOnly = _b.inputOnly, value = _b.value, placeholder = _b.placeholder, cx = _b.classnames, disabled = _b.disabled, readOnly = _b.readOnly, name = _b.name, loading = _b.loading, clearable = _b.clearable, options = _b.options, selectedOptions = _b.selectedOptions, autoComplete = _b.autoComplete, labelField = _b.labelField, valueField = _b.valueField, multiple = _b.multiple, creatable = _b.creatable, borderMode = _b.borderMode, showCounter = _b.showCounter, data = _b.data, maxLength = _b.maxLength, minLength = _b.minLength, __ = _b.translate, loadingConfig = _b.loadingConfig, popOverContainer = _b.popOverContainer, themeCss = _b.themeCss, css = _b.css, id = _b.id, nativeAutoComplete = _b.nativeAutoComplete, testIdBuilder = _b.testIdBuilder;
        var type = (_a = this.props.type) === null || _a === void 0 ? void 0 : _a.replace(/^(?:native|input)\-/, '');
        return (React.createElement(Downshift, { isOpen: this.state.isOpen && !disabled && !readOnly, inputValue: this.state.inputValue, onChange: this.handleChange, onStateChange: this.handleStateChange, selectedItem: selectedOptions.map(function (item) { return item[valueField || 'value']; }) }, function (_a) {
            var _b, _c;
            var _d;
            var getInputProps = _a.getInputProps, getItemProps = _a.getItemProps, isOpen = _a.isOpen, inputValue = _a.inputValue, selectedItem = _a.selectedItem, highlightedIndex = _a.highlightedIndex;
            var filtedOptions = inputValue && isOpen && !autoComplete
                ? matchSorter(options, inputValue, {
                    keys: [labelField || 'label', valueField || 'value'],
                    threshold: matchSorter.rankings.CONTAINS
                })
                : options;
            var indices = isOpen
                ? mapItemIndex(filtedOptions, selectedItem)
                : {};
            filtedOptions = filtedOptions.filter(function (option) { return !~selectedItem.indexOf(option.value); });
            if (_this.state.inputValue &&
                creatable !== false &&
                multiple &&
                !filtedOptions.some(function (option) { return option.value === _this.state.inputValue; }) &&
                !~selectedItem.indexOf(_this.state.inputValue)) {
                filtedOptions.push((_b = {},
                    _b[labelField || 'label'] = _this.state.inputValue,
                    _b[valueField || 'value'] = _this.state.inputValue,
                    _b.isNew = true,
                    _b));
            }
            var filteredPlaceholder = filter(placeholder, data);
            return (React.createElement("div", __assign({ className: cx("TextControl-input TextControl-input--withAC", inputControlClassName, setThemeClassName(__assign(__assign({}, _this.props), { name: 'inputControlClassName', id: id, themeCss: themeCss || css })), setThemeClassName(__assign(__assign({}, _this.props), { name: 'inputControlClassName', id: id, themeCss: themeCss || css, extra: 'inner' })), inputOnly ? className : '', (_c = {
                        'is-opened': isOpen,
                        'TextControl-input--multiple': multiple
                    },
                    _c["TextControl-input--border".concat(ucFirst(borderMode))] = borderMode,
                    _c)), onClick: _this.handleClick }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getTestId()),
                React.createElement(React.Fragment, null,
                    filteredPlaceholder &&
                        !selectedOptions.length &&
                        !_this.state.inputValue &&
                        !_this.state.isFocused ? (React.createElement("div", { className: cx('TextControl-placeholder') }, filteredPlaceholder)) : null,
                    selectedOptions.map(function (item, index) {
                        return multiple ? (React.createElement("div", { className: cx('TextControl-value'), key: index },
                            React.createElement(OverflowTpl, { className: cx('TextControl-valueLabel'), tooltip: "".concat(item[labelField || 'label']) }, "".concat(item[labelField || 'label'])),
                            React.createElement(Icon, { icon: "close", className: cx('TextControl-valueIcon', 'icon'), onClick: _this.removeItem.bind(_this, index) }))) : (inputValue && isOpen) || creatable !== false ? null : (React.createElement("div", { className: cx('TextControl-value'), key: index }, item.label));
                    }),
                    React.createElement(Input, __assign({}, getInputProps({
                        name: name,
                        ref: _this.inputRef,
                        disabled: disabled,
                        readOnly: readOnly,
                        type: type,
                        onFocus: _this.handleFocus,
                        onBlur: _this.handleBlur,
                        onChange: _this.handleInputChange,
                        onKeyDown: _this.handleKeyDown,
                        maxLength: maxLength,
                        minLength: minLength
                    }), { autoComplete: nativeAutoComplete, size: 10, className: cx(nativeInputClassName) }))),
                clearable && !disabled && !readOnly && value ? (React.createElement("a", { onClick: _this.clearValue, className: cx('TextControl-clear') },
                    React.createElement(Icon, { icon: "input-clear", className: "icon", iconContent: "InputText-clear" }))) : null,
                showCounter ? (React.createElement("span", { className: cx('TextControl-counter') }, "".concat((_d = _this.valueToString(value)) === null || _d === void 0 ? void 0 : _d.length).concat(typeof maxLength === 'number' && maxLength
                    ? "/".concat(maxLength)
                    : ''))) : null,
                loading ? (React.createElement(Spinner, { show: true, icon: "reload", size: "sm", spinnerClassName: cx('TextControl-spinner'), loadingConfig: loadingConfig })) : null,
                React.createElement(Overlay, { container: popOverContainer || _this.getTarget, target: _this.getTarget, show: !!(isOpen && filtedOptions.length) },
                    React.createElement(PopOver, { className: cx('TextControl-popover'), style: {
                            width: _this.input
                                ? _this.input.parentElement.offsetWidth
                                : 'auto'
                        } },
                        React.createElement("div", { className: cx('TextControl-sugs') }, filtedOptions.map(function (option) {
                            var label = option[labelField || 'label'];
                            var value = option[valueField || 'value'];
                            return (React.createElement("div", __assign({}, getItemProps({
                                item: value,
                                disabled: option.disabled,
                                className: cx("TextControl-sugItem", {
                                    'is-highlight': highlightedIndex === indices[value],
                                    'is-disabled': option.disabled || option.readOnly
                                })
                            }), { key: value }), option.isNew ? (React.createElement("span", null,
                                __('Text.add', { label: label }),
                                React.createElement(Icon, { icon: "enter", className: "icon" }))) : (React.createElement("span", null,
                                option.disabled
                                    ? label
                                    : highlight(label, inputValue),
                                option.tip))));
                        }))))));
        }));
    };
    TextControl.prototype.toggleRevealPassword = function () {
        this.setState({ revealPassword: !this.state.revealPassword });
    };
    TextControl.prototype.renderNormal = function () {
        var _a;
        var _b, _c;
        var _d = this.props; _d.classPrefix; var cx = _d.classnames, className = _d.className; _d.style; var inputControlClassName = _d.inputControlClassName, nativeInputClassName = _d.nativeInputClassName, inputOnly = _d.inputOnly, value = _d.value, placeholder = _d.placeholder; _d.onChange; var disabled = _d.disabled, readOnly = _d.readOnly, max = _d.max, min = _d.min, step = _d.step, clearable = _d.clearable, _e = _d.revealPassword, revealPassword = _e === void 0 ? true : _e, name = _d.name, borderMode = _d.borderMode, prefix = _d.prefix, suffix = _d.suffix, data = _d.data, showCounter = _d.showCounter, maxLength = _d.maxLength, minLength = _d.minLength, themeCss = _d.themeCss, css = _d.css, id = _d.id, nativeAutoComplete = _d.nativeAutoComplete, testIdBuilder = _d.testIdBuilder;
        var type = (_b = this.props.type) === null || _b === void 0 ? void 0 : _b.replace(/^(?:native|input)\-/, '');
        return (React.createElement("div", __assign({ className: cx('TextControl-input', (_a = {},
                _a["TextControl-input--border".concat(ucFirst(borderMode))] = borderMode,
                _a), setThemeClassName(__assign(__assign({}, this.props), { name: 'inputControlClassName', id: id, themeCss: themeCss || css })), setThemeClassName(__assign(__assign({}, this.props), { name: 'inputControlClassName', id: id, themeCss: themeCss || css, extra: 'inner' })), inputControlClassName, inputOnly ? className : '') }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getTestId()),
            prefix ? (React.createElement("span", { className: cx('TextControl-inputPrefix') }, filter(prefix, data))) : null,
            React.createElement(Input, __assign({ name: name, placeholder: filter(placeholder, data), ref: this.inputRef, disabled: disabled, readOnly: readOnly, type: this.state.revealPassword ? 'text' : type, onFocus: this.handleFocus, onBlur: this.handleBlur, max: max, min: min, maxLength: maxLength, minLength: minLength, autoComplete: nativeAutoComplete, size: 10, step: step, onChange: this.handleNormalInputChange, value: this.valueToString(value), className: cx(nativeInputClassName, {
                    'TextControl-input-password': type === 'password' && revealPassword
                }) }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('input').getTestId())),
            clearable && !disabled && !readOnly && value ? (React.createElement("a", { onClick: this.clearValue, className: cx('TextControl-clear') },
                React.createElement(Icon, { icon: "input-clear", className: "icon", iconContent: "InputText-clear" }))) : null,
            type === 'password' && revealPassword && !disabled ? (React.createElement("a", { onClick: this.toggleRevealPassword, className: cx('TextControl-revealPassword') }, this.state.revealPassword ? (React.createElement(Icon, { icon: "view", className: cx('TextControl-icon-view'), classNameProp: cx('TextControl-icon-view'), iconContent: "InputText-view" })) : (React.createElement(Icon, { icon: "invisible", className: cx('TextControl-icon-invisible'), classNameProp: cx('TextControl-icon-invisible'), iconContent: "InputText-invisible" })))) : null,
            showCounter ? (React.createElement("span", { className: cx('TextControl-counter') }, "".concat((_c = this.valueToString(value)) === null || _c === void 0 ? void 0 : _c.length).concat(typeof maxLength === 'number' && maxLength ? "/".concat(maxLength) : ''))) : null,
            suffix ? (React.createElement("span", { className: cx('TextControl-inputSuffix') }, filter(suffix, data))) : null));
    };
    TextControl.prototype.renderBody = function (body) {
        var _a, _b;
        var _c = this.props, cx = _c.classnames, className = _c.className; _c.style; var ns = _c.classPrefix, addOnRaw = _c.addOn, render = _c.render, data = _c.data, disabled = _c.disabled, readOnly = _c.readOnly, inputOnly = _c.inputOnly, isStatic = _c.static, addOnClassName = _c.addOnClassName, themeCss = _c.themeCss, css = _c.css, id = _c.id;
        var addOn = typeof addOnRaw === 'string'
            ? {
                label: addOnRaw,
                type: 'plain'
            }
            : addOnRaw;
        var iconElement = React.createElement(Icon, { cx: cx, icon: addOn === null || addOn === void 0 ? void 0 : addOn.icon, className: "Icon" });
        var addOnDom = addOn && !isStatic ? (addOn.actionType ||
            ~['button', 'submit', 'reset', 'action'].indexOf(addOn.type) ? (React.createElement("div", { className: cx("".concat(ns, "TextControl-button"), addOnClassName, setThemeClassName(__assign(__assign({}, this.props), { name: 'addOnClassName', id: id, themeCss: themeCss || css, extra: 'addOn' }))) }, render('addOn', addOn, {
            disabled: disabled
        }))) : (React.createElement("div", { className: cx("".concat(ns, "TextControl-addOn"), addOnClassName, setThemeClassName(__assign(__assign({}, this.props), { name: 'addOnClassName', id: id, themeCss: themeCss || css, extra: 'addOn' }))) },
            iconElement,
            addOn.label ? filter(addOn.label, data) : null))) : null;
        if (inputOnly) {
            return body;
        }
        var classNames = !isStatic
            ? cx(className, "".concat(ns, "TextControl"), (_a = {},
                _a["".concat(ns, "TextControl--withAddOn")] = !!addOnDom,
                _a['is-focused'] = this.state.isFocused,
                _a['is-disabled'] = disabled || readOnly,
                _a))
            : cx("".concat(ns, "TextControl"), (_b = {},
                _b["".concat(ns, "TextControl--withAddOn")] = !!addOnDom,
                _b));
        return (React.createElement("div", { className: classNames },
            addOn && addOn.position === 'left' ? addOnDom : null,
            body,
            addOn && addOn.position !== 'left' ? addOnDom : null));
    };
    /**
     * 处理input的自定义样式
     */
    TextControl.prototype.render = function () {
        var _a = this.props, options = _a.options, source = _a.source, autoComplete = _a.autoComplete, themeCss = _a.themeCss, css = _a.css, id = _a.id, env = _a.env, ns = _a.classPrefix;
        var input = autoComplete !== false && (source || (options === null || options === void 0 ? void 0 : options.length) || autoComplete)
            ? this.renderSugestMode()
            : this.renderNormal();
        return (React.createElement(React.Fragment, null,
            this.renderBody(input),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    themeCss: themeCss || css,
                    classNames: [
                        {
                            key: 'inputControlClassName',
                            weights: {
                                active: {
                                    pre: "".concat(ns, "TextControl.is-focused > .inputControlClassName-").concat(id === null || id === void 0 ? void 0 : id.replace('u:', ''), ", ")
                                }
                            }
                        }
                    ],
                    id: id
                }, env: env })),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    themeCss: formatInputThemeCss(themeCss || css),
                    classNames: [
                        {
                            key: 'inputControlClassName',
                            weights: {
                                default: {
                                    inner: 'input'
                                },
                                hover: {
                                    inner: 'input'
                                },
                                active: {
                                    pre: "".concat(ns, "TextControl.is-focused > .inputControlClassName-").concat(id === null || id === void 0 ? void 0 : id.replace('u:', ''), ", "),
                                    inner: 'input'
                                }
                            }
                        }
                    ],
                    id: id && id + '-inner'
                }, env: env })),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    themeCss: themeCss || css,
                    classNames: [
                        {
                            key: 'addOnClassName'
                        }
                    ],
                    id: id && id + '-addOn'
                }, env: env }))));
    };
    TextControl.defaultProps = {
        resetValue: '',
        labelField: 'label',
        valueField: 'value',
        placeholder: '',
        allowInputText: true,
        trimContents: true,
        nativeAutoComplete: 'off'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TextControl.prototype, "close", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TextControl.prototype, "handleNormalInputChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TextControl.prototype, "getTarget", null);
    __decorate([
        autobind,
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], TextControl.prototype, "render", null);
    return TextControl;
}(React.PureComponent));
function mapItemIndex(items, values, valueField) {
    if (valueField === void 0) { valueField = 'value'; }
    return items
        .filter(function (item) { return values.indexOf(item[valueField || 'value']) === -1; })
        .reduce(function (prev, next, i) {
        prev[next[valueField || 'value']] = i;
        return prev;
    }, {});
}
/** @class */ ((function (_super) {
    __extends(TextControlRenderer, _super);
    function TextControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextControlRenderer = __decorate([
        OptionsControl({
            type: 'input-text'
        })
    ], TextControlRenderer);
    return TextControlRenderer;
})(TextControl));
/** @class */ ((function (_super) {
    __extends(PasswordControlRenderer, _super);
    function PasswordControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordControlRenderer = __decorate([
        OptionsControl({
            type: 'input-password'
        })
    ], PasswordControlRenderer);
    return PasswordControlRenderer;
})(TextControl));
/** @class */ ((function (_super) {
    __extends(EmailControlRenderer, _super);
    function EmailControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailControlRenderer = __decorate([
        OptionsControl({
            type: 'input-email',
            validations: 'isEmail'
        })
    ], EmailControlRenderer);
    return EmailControlRenderer;
})(TextControl));
/** @class */ ((function (_super) {
    __extends(UrlControlRenderer, _super);
    function UrlControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlControlRenderer = __decorate([
        OptionsControl({
            type: 'input-url',
            validations: 'isUrl'
        })
    ], UrlControlRenderer);
    return UrlControlRenderer;
})(TextControl));
/** @class */ ((function (_super) {
    __extends(NativeDateControlRenderer, _super);
    function NativeDateControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeDateControlRenderer = __decorate([
        OptionsControl({
            type: 'native-date'
        })
    ], NativeDateControlRenderer);
    return NativeDateControlRenderer;
})(TextControl));
/** @class */ ((function (_super) {
    __extends(NativeTimeControlRenderer, _super);
    function NativeTimeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeTimeControlRenderer = __decorate([
        OptionsControl({
            type: 'native-time'
        })
    ], NativeTimeControlRenderer);
    return NativeTimeControlRenderer;
})(TextControl));
/** @class */ ((function (_super) {
    __extends(NativeNumberControlRenderer, _super);
    function NativeNumberControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeNumberControlRenderer = __decorate([
        OptionsControl({
            type: 'native-number'
        })
    ], NativeNumberControlRenderer);
    return NativeNumberControlRenderer;
})(TextControl));

export { TextControl as default, mapItemIndex };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
