/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __awaiter, __generator, __read, __spreadArray, __decorate, __metadata } from 'tslib';
import React from 'react';
import cx from 'classnames';
import omit from 'lodash/omit';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import findIndex from 'lodash/findIndex';
import merge from 'lodash/merge';
import { isApiOutdated, createObject, isPureVariable, resolveVariableAndFilter, isEffectiveApi, resolveEventData, setThemeClassName, filter, getVariable, isIntegerInRange, noop, CustomStyle, autobind, OptionsControl } from 'amis-core';
import { Html, TooltipWrapper, Icon } from 'amis-ui';
import intersectionWith from 'lodash/intersectionWith';
import { supportStatic } from './StaticHoc.js';
import { reaction } from 'mobx';

var PickerControl = /** @class */ (function (_super) {
    __extends(PickerControl, _super);
    function PickerControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpened: false,
            schema: _this.buildSchema(_this.props),
            isFocused: false
        };
        _this.input = React.createRef();
        _this.toDispose = [];
        _this.mounted = false;
        var formInited = props.formInited, addHook = props.addHook, formItem = props.formItem;
        var onIninted = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchOptions()];
                    case 1:
                        _a.sent();
                        this.mounted &&
                            this.toDispose.push(reaction(function () { return JSON.stringify(formItem === null || formItem === void 0 ? void 0 : formItem.tmpValue); }, function () { return _this.fetchOptions(); }));
                        return [2 /*return*/];
                }
            });
        }); };
        formItem &&
            _this.toDispose.push(formInited || !addHook
                ? formItem.addInitHook(onIninted)
                : addHook(onIninted, 'init'));
        return _this;
    }
    PickerControl.prototype.componentDidMount = function () {
        this.mounted = true;
    };
    PickerControl.prototype.componentDidUpdate = function (prevProps) {
        var _a;
        var props = this.props;
        var detectedProps = ['multiple', 'source', 'pickerSchema'];
        if (detectedProps.some(function (key) { return !isEqual(prevProps[key], props[key]); })) {
            this.setState({
                schema: this.buildSchema(props)
            });
        }
        else if (isApiOutdated(prevProps.source, props.source, prevProps.data, props.data)) {
            ((_a = props.formItem) === null || _a === void 0 ? void 0 : _a.inited) && this.fetchOptions();
        }
    };
    PickerControl.prototype.componentWillUnmount = function () {
        this.toDispose.forEach(function (fn) { return fn(); });
        this.toDispose = [];
        this.mounted = false;
    };
    PickerControl.prototype.fetchOptions = function () {
        var _a;
        var _b = this.props, value = _b.value, formItem = _b.formItem, valueField = _b.valueField, labelField = _b.labelField, source = _b.source, data = _b.data;
        var selectedOptions;
        if (!source ||
            !formItem ||
            (valueField || 'value') === (labelField || 'label') ||
            ((selectedOptions = formItem.getSelectedOptions(value)) &&
                (!selectedOptions.length ||
                    selectedOptions[0][valueField || 'value'] !==
                        selectedOptions[0][labelField || 'label']))) {
            return;
        }
        var ctx = createObject(data, (_a = {
                value: value
            },
            _a[valueField || 'value'] = value,
            _a.op = 'loadOptions',
            _a));
        if (isPureVariable(source)) {
            formItem.setOptions(resolveVariableAndFilter(source, data, '| raw'));
        }
        else if (isEffectiveApi(source, ctx)) {
            return formItem.loadOptions(source, ctx, {
                autoAppend: true
            });
        }
    };
    PickerControl.prototype.buildSchema = function (props) {
        var _a, _b;
        var isScopeData = isPureVariable(props.source);
        return __assign(__assign({ checkOnItemClick: true }, props.pickerSchema), { labelTpl: (_b = (_a = props.pickerSchema) === null || _a === void 0 ? void 0 : _a.labelTpl) !== null && _b !== void 0 ? _b : props.labelTpl, type: 'crud', pickerMode: true, syncLocation: false, api: isScopeData ? null : props.source, source: isScopeData ? props.source : null, keepItemSelectionOnPageChange: true, valueField: props.valueField, labelField: props.labelField, 
            // 不支持批量操作，会乱套
            bulkActions: props.multiple
                ? props.pickerSchema.bulkActions
                : [] });
    };
    PickerControl.prototype.crudRef = function (ref) {
        while (ref && ref.getWrappedInstance) {
            ref = ref.getWrappedInstance();
        }
        this.crud = ref;
    };
    PickerControl.prototype.reload = function () {
        if (this.crud) {
            this.crud.search();
        }
        else {
            var reload = this.props.reloadOptions;
            reload && reload();
        }
    };
    PickerControl.prototype.open = function () {
        this.setState({
            isOpened: true
        });
    };
    PickerControl.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    PickerControl.prototype.handleModalConfirm = function (values, action, ctx, components) {
        return __awaiter(this, void 0, void 0, function () {
            var idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idx = findIndex(components, function (item) { return item.props.type === 'crud'; });
                        return [4 /*yield*/, this.handleChange(values[idx].items)];
                    case 1:
                        _a.sent();
                        this.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    PickerControl.prototype.handleChange = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, joinValues, valueField, delimiter, extractValue, multiple, options, dispatchEvent, setOptions, onChange, value, additionalOptions, option, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, joinValues = _a.joinValues, valueField = _a.valueField, delimiter = _a.delimiter, extractValue = _a.extractValue, multiple = _a.multiple, options = _a.options, _a.data, dispatchEvent = _a.dispatchEvent, _a.selectedOptions, setOptions = _a.setOptions, onChange = _a.onChange;
                        value = items;
                        if (joinValues) {
                            value = items
                                .map(function (item) { return item[valueField || 'value']; })
                                .join(delimiter || ',');
                        }
                        else if (extractValue) {
                            value = multiple
                                ? items.map(function (item) { return item[valueField || 'value']; })
                                : (items[0] && items[0][valueField || 'value']) || '';
                        }
                        else {
                            value = multiple ? items : items[0];
                        }
                        additionalOptions = [];
                        items.forEach(function (item) {
                            if (!find(options, function (option) { return item[valueField || 'value'] == option[valueField || 'value']; })) {
                                additionalOptions.push(item);
                            }
                        });
                        additionalOptions.length && setOptions(options.concat(additionalOptions));
                        option = multiple ? items : items[0];
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: value, option: option, selectedItems: option }))];
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
    PickerControl.prototype.handleItemClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, dispatchEvent, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('itemClick', createObject(data, { item: item }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PickerControl.prototype.removeItem = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, selectedOptions, joinValues, extractValue, delimiter, valueField, onChange, multiple, dispatchEvent, items, _b, option, value, rendererEvent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, selectedOptions = _a.selectedOptions, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField, onChange = _a.onChange, multiple = _a.multiple, dispatchEvent = _a.dispatchEvent;
                        items = selectedOptions.concat();
                        _b = __read(items.splice(index, 1), 1), option = _b[0];
                        value = items;
                        if (joinValues) {
                            value = items
                                .map(function (item) { return item[valueField || 'value']; })
                                .join(delimiter || ',');
                        }
                        else if (extractValue) {
                            value = multiple
                                ? items.map(function (item) { return item[valueField || 'value']; })
                                : (items[0] && items[0][valueField || 'value']) || '';
                        }
                        else {
                            value = multiple ? items : items[0];
                        }
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: value, option: option, selectedItems: option }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    PickerControl.prototype.handleKeyDown = function (e) {
        var selectedOptions = this.props.selectedOptions;
        if (e.key === ' ') {
            this.open();
            e.preventDefault();
        }
        else if (selectedOptions.length && e.key == 'Backspace') {
            this.removeItem(selectedOptions.length - 1);
        }
    };
    PickerControl.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    PickerControl.prototype.handleBlur = function () {
        this.setState({
            isFocused: false
        });
    };
    PickerControl.prototype.handleClick = function () {
        this.input.current && this.input.current.focus();
        this.open();
    };
    PickerControl.prototype.clearValue = function () {
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        onChange(resetValue !== void 0 ? resetValue : '');
    };
    PickerControl.prototype.getOverflowConfig = function () {
        var overflowConfig = this.props.overflowConfig;
        return merge(PickerControl.defaultProps.overflowConfig, overflowConfig);
    };
    PickerControl.prototype.handleSelect = function (selectedItems, unSelectedItems) {
        var _a = this.props, selectedOptions = _a.selectedOptions, valueField = _a.valueField;
        // 选择行后，crud 会给出连续多次事件，且selectedItems会变化，会导致初始化和点击无效
        // 过滤掉一些无用事件，否则会导致 value 错误
        if (!Array.isArray(selectedItems) ||
            !Array.isArray(unSelectedItems) ||
            (!selectedItems.length && !unSelectedItems.length)) {
            return;
        }
        // 取交集，判断是否是无效事件，需要考虑顺序问题
        var intersections = intersectionWith(selectedItems, selectedOptions, function (a, b) {
            // 需要考虑没有配置 valueField，而且值里面又没有 value 字段的情况
            var aValue = a[valueField || 'value'];
            var bValue = b[valueField || 'value'];
            return aValue || bValue
                ? aValue === bValue
                : // selectedOptions 中有 Options 自动添加的 value 字段，所以去掉后才能比较
                    isEqual(omit(a, 'value'), omit(b, 'value'));
        });
        if (
        // 前后数量都一样说明是重复事件
        intersections.length === selectedItems.length &&
            intersections.length === selectedOptions.length) {
            return;
        }
        this.handleChange(selectedItems);
    };
    PickerControl.prototype.renderTag = function (item, index) {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, cx = _a.classnames, labelField = _a.labelField, labelTpl = _a.labelTpl; _a.translate; var disabled = _a.disabled, env = _a.env, id = _a.id, themeCss = _a.themeCss, css = _a.css;
        return (React.createElement("div", { key: index, className: cx("".concat(ns, "Picker-value"), setThemeClassName(__assign(__assign({}, this.props), { name: 'pickValueWrapClassName', id: id, themeCss: themeCss || css })), {
                'is-disabled': disabled
            }) },
            React.createElement("span", { className: cx("".concat(ns, "Picker-valueIcon"), setThemeClassName(__assign(__assign({}, this.props), { name: 'pickValueIconClassName', id: id, themeCss: themeCss || css }))), onClick: function (e) {
                    e.stopPropagation();
                    _this.removeItem(index);
                } }, "\u00D7"),
            React.createElement("span", { className: cx("".concat(ns, "Picker-valueLabel"), setThemeClassName(__assign(__assign({}, this.props), { name: 'pickFontClassName', id: id, themeCss: themeCss || css }))), onClick: function (e) {
                    e.stopPropagation();
                    _this.handleItemClick(item);
                } }, labelTpl ? (React.createElement(Html, { html: filter(labelTpl, item), filterHtml: env.filterHtml })) : ("".concat(getVariable(item, labelField || 'label') ||
                getVariable(item, 'id'))))));
    };
    PickerControl.prototype.renderValues = function () {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, selectedOptions = _a.selectedOptions, __ = _a.translate, disabled = _a.disabled, multiple = _a.multiple, popOverContainer = _a.popOverContainer, id = _a.id, themeCss = _a.themeCss, css = _a.css;
        var _b = this.getOverflowConfig(), maxTagCount = _b.maxTagCount, overflowTagPopover = _b.overflowTagPopover;
        var totalCount = selectedOptions.length;
        var tags = selectedOptions;
        var enableOverflow = multiple !== false &&
            isIntegerInRange(maxTagCount, {
                start: 0,
                end: totalCount,
                left: 'inclusive',
                right: 'exclusive'
            });
        /** 多选且开启限制标签数量 */
        if (enableOverflow) {
            tags = __spreadArray(__spreadArray([], __read(selectedOptions.slice(0, maxTagCount)), false), [
                { label: "+ ".concat(totalCount - maxTagCount, " ..."), value: '__overflow_tag__' }
            ], false);
        }
        return (React.createElement("div", { className: "".concat(ns, "Picker-values") }, tags.map(function (item, index) {
            if (enableOverflow && index === maxTagCount) {
                return (React.createElement(TooltipWrapper, { key: index, container: popOverContainer, tooltip: __assign(__assign({ tooltipClassName: cx('Picker-overflow', overflowTagPopover === null || overflowTagPopover === void 0 ? void 0 : overflowTagPopover.tooltipClassName), title: __('已选项') }, omit(overflowTagPopover, [
                        'children',
                        'content',
                        'tooltipClassName'
                    ])), { children: function () {
                            return (React.createElement("div", { className: cx("".concat(ns, "Picker-overflow-wrapper")) }, selectedOptions
                                .slice(maxTagCount, totalCount)
                                .map(function (overflowItem, rawIndex) {
                                var key = rawIndex + maxTagCount;
                                return _this.renderTag(overflowItem, key);
                            })));
                        } }) },
                    React.createElement("div", { key: index, className: cx("".concat(ns, "Picker-value"), {
                            'is-disabled': disabled
                        }) },
                        React.createElement("span", { className: "".concat(ns, "Picker-valueLabel ").concat(setThemeClassName(__assign(__assign({}, _this.props), { name: 'pickFontClassName', id: id, themeCss: themeCss || css }))) }, item.label))));
            }
            return _this.renderTag(item, index);
        })));
    };
    PickerControl.prototype.renderBody = function (_a) {
        var _b = _a === void 0 ? {} : _a, popOverContainer = _b.popOverContainer;
        var _c = this.props, render = _c.render, selectedOptions = _c.selectedOptions, options = _c.options, multiple = _c.multiple, valueField = _c.valueField, embed = _c.embed, source = _c.source, strictMode = _c.strictMode, testIdBuilder = _c.testIdBuilder;
        var _d = this.getOverflowConfig(), maxTagCount = _d.maxTagCount, overflowTagPopoverInCRUD = _d.overflowTagPopoverInCRUD, displayPosition = _d.displayPosition;
        return render('modal-body', this.state.schema, __assign({ value: selectedOptions, valueField: valueField, primaryField: valueField, options: source ? [] : options, multiple: multiple, strictMode: strictMode, onSelect: embed ? this.handleSelect : undefined, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('body-schema'), ref: this.crudRef, popOverContainer: popOverContainer }, (embed ||
            (Array.isArray(displayPosition) && displayPosition.includes('crud'))
            ? { maxTagCount: maxTagCount, overflowTagPopover: overflowTagPopoverInCRUD }
            : {})));
    };
    PickerControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var modalClassName = _a.modalClassName, cx = _a.classnames, disabled = _a.disabled, render = _a.render, modalMode = _a.modalMode, source = _a.source, size = _a.size, clearable = _a.clearable, multiple = _a.multiple, placeholder = _a.placeholder, embed = _a.embed, selectedOptions = _a.selectedOptions, __ = _a.translate, popOverContainer = _a.popOverContainer, modalTitle = _a.modalTitle, data = _a.data, mobileUI = _a.mobileUI, env = _a.env, themeCss = _a.themeCss, css = _a.css, id = _a.id, ns = _a.classPrefix, testIdBuilder = _a.testIdBuilder;
        return (React.createElement("div", { className: cx("PickerControl", { 'is-mobile': mobileUI }, className) },
            embed ? (React.createElement("div", { className: cx('Picker') }, this.renderBody({ popOverContainer: popOverContainer }))) : (React.createElement("div", { className: cx("Picker", {
                    'Picker--single': !multiple,
                    'Picker--multi': multiple,
                    'is-focused': this.state.isFocused,
                    'is-disabled': disabled
                }) },
                React.createElement("div", { onClick: this.handleClick, className: cx('Picker-input', setThemeClassName(__assign(__assign({}, this.props), { name: 'pickControlClassName', id: id, themeCss: themeCss || css })), setThemeClassName(__assign(__assign({}, this.props), { name: 'pickControlDisabledClassName', id: id, themeCss: themeCss || css }))) },
                    !selectedOptions.length && placeholder ? (React.createElement("div", { className: cx('Picker-placeholder') }, __(placeholder))) : null,
                    React.createElement("div", __assign({ className: cx('Picker-valueWrap') }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getTestId()),
                        this.renderValues(),
                        React.createElement("input", { onChange: noop, value: '', ref: this.input, onKeyDown: this.handleKeyDown, onFocus: this.handleFocus, onBlur: this.handleBlur, readOnly: mobileUI })),
                    clearable && !disabled && selectedOptions.length ? (React.createElement("a", { onClick: this.clearValue, className: cx('Picker-clear') },
                        React.createElement(Icon, { icon: "input-clear", className: "icon" }))) : null,
                    React.createElement("span", __assign({ onClick: this.open, className: cx('Picker-btn') }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('picker-open-btn').getTestId()),
                        React.createElement(Icon, { icon: "window-restore", className: cx('icon', setThemeClassName(__assign(__assign({}, this.props), { name: 'pickIconClassName', id: id, themeCss: themeCss || css }))), iconContent: "Picker-icon" }))),
                render('modal', {
                    title: modalTitle && typeof modalTitle === 'string'
                        ? filter(modalTitle, data)
                        : __('Select.placeholder'),
                    size: size,
                    type: modalMode,
                    className: modalClassName,
                    body: {
                        children: this.renderBody
                    },
                    testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('modal')
                }, {
                    key: 'modal',
                    lazyRender: !!source,
                    onConfirm: this.handleModalConfirm,
                    onClose: this.close,
                    show: this.state.isOpened
                }))),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    themeCss: themeCss || css,
                    classNames: [
                        {
                            key: 'pickControlClassName',
                            weights: {
                                default: {
                                    important: true
                                },
                                hover: {
                                    important: true
                                },
                                active: {
                                    important: true
                                },
                                disabled: {
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'pickControlDisabledClassName',
                            weights: {
                                default: {
                                    pre: "".concat(ns, "Picker.is-disabled> .").concat(setThemeClassName(__assign(__assign({}, this.props), { name: 'pickControlDisabledClassName', id: id, themeCss: themeCss || css })), ", ")
                                }
                            }
                        },
                        {
                            key: 'pickFontClassName'
                        },
                        {
                            key: 'pickValueWrapClassName',
                            weights: {
                                default: {
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'pickValueIconClassName',
                            weights: {
                                default: {
                                    important: true
                                },
                                hover: {
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'pickIconClassName',
                            weights: {
                                default: {
                                    suf: ' svg'
                                }
                            }
                        }
                    ],
                    id: id
                }, env: env }))));
    };
    PickerControl.propsList = [
        'modalTitle',
        'modalMode',
        'pickerSchema',
        'labelField',
        'onChange',
        'options',
        'value',
        'inline',
        'multiple',
        'embed',
        'resetValue',
        'placeholder',
        'onQuery' // 防止 Form 的 onQuery 事件透传下去，不然会导致 table 先后触发 Form 和 Crud 的 onQuery
    ];
    PickerControl.defaultProps = {
        modalMode: 'dialog',
        multiple: false,
        placeholder: 'Picker.placeholder',
        labelField: 'label',
        valueField: 'value',
        pickerSchema: {
            mode: 'list',
            listItem: {
                title: '${label|raw}'
            }
        },
        embed: false,
        overflowConfig: {
            /** 默认值为-1，不开启 */
            maxTagCount: -1,
            displayPosition: ['select', 'crud'],
            overflowTagPopover: {
                placement: 'top',
                trigger: 'hover',
                showArrow: false,
                offset: [0, -10]
            },
            overflowTagPopoverInCRUD: {
                placement: 'bottom',
                trigger: 'hover',
                showArrow: false,
                offset: [0, 10]
            }
        }
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], PickerControl.prototype, "fetchOptions", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "crudRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "open", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "close", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object, Object, Array]),
        __metadata("design:returntype", Promise)
    ], PickerControl.prototype, "handleModalConfirm", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], PickerControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PickerControl.prototype, "handleItemClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleKeyDown", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleFocus", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleBlur", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "clearValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Array]),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleSelect", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "renderBody", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PickerControl.prototype, "render", null);
    return PickerControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(PickerControlRenderer, _super);
    function PickerControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PickerControlRenderer = __decorate([
        OptionsControl({
            type: 'picker',
            autoLoadOptionsFromSource: false,
            sizeMutable: false
        })
    ], PickerControlRenderer);
    return PickerControlRenderer;
})(PickerControl));

export { PickerControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
