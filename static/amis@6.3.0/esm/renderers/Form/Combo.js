/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __awaiter, __generator, __values, __decorate, __metadata, __spreadArray, __read } from 'tslib';
import React from 'react';
import { findDOMNode } from 'react-dom';
import cloneDeep from 'lodash/cloneDeep';
import { guid, createObject, extendObject, anyChanged, isPureVariable, resolveVariableAndFilter, resolveEventData, isEffectiveApi, deleteVariable, isObjectShallowModified, getVariable, evalExpression, dataMapping, filter, isObject, str2AsyncFunction, autobind, evalExpressionWithConditionBuilder, FormItem, ComboStore, resolveVariable } from 'amis-core';
import { Tabs, Icon, Tab, Select, Alert2, Button } from 'amis-ui';
import Sortable from 'sortablejs';
import find from 'lodash/find';
import memoize from 'lodash/memoize';
import { isAlive, destroy, clone } from 'mobx-state-tree';
import isPlainObject from 'lodash/isPlainObject';
import isEqual from 'lodash/isEqual';

function pickVars(vars, fields) {
    return fields.reduce(function (data, key) {
        data[key] = resolveVariable(key, vars);
        return data;
    }, {});
}
var ComboControl = /** @class */ (function (_super) {
    __extends(ComboControl, _super);
    function ComboControl(props) {
        var _this = _super.call(this, props) || this;
        _this.subForms = [];
        _this.subFormDefaultValues = [];
        _this.keys = [];
        _this.toDispose = [];
        _this.id = guid();
        _this.refsMap = {};
        _this.makeFormRef = memoize(function (index) { return function (ref) { return _this.formRef(ref, index); }; });
        _this.memoizedFormatValue = memoize(function (strictMode, syncFields, value, index, data) {
            return createObject(extendObject(data, __assign({ index: index, __index: index }, data)), __assign(__assign({}, value), (Array.isArray(syncFields) ? pickVars(data, syncFields) : null)));
        }, function (strictMode, syncFields, value, index, data) {
            return Array.isArray(syncFields)
                ? JSON.stringify([value, index, data, pickVars(data, syncFields)])
                : strictMode
                    ? JSON.stringify([value, index])
                    : JSON.stringify([value, index, data]);
        });
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleRadioChange = _this.handleRadioChange.bind(_this);
        _this.handleSingleFormChange = _this.handleSingleFormChange.bind(_this);
        _this.handleSingleFormInit = _this.handleSingleFormInit.bind(_this);
        _this.handleFormInit = _this.handleFormInit.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.addItem = _this.addItem.bind(_this);
        _this.deleteItem = _this.deleteItem.bind(_this);
        _this.dragTipRef = _this.dragTipRef.bind(_this);
        _this.flush = _this.flush.bind(_this);
        _this.handleComboTypeChange = _this.handleComboTypeChange.bind(_this);
        _this.handleSubFormValid = _this.handleSubFormValid.bind(_this);
        _this.defaultValue = __assign({}, props.scaffold);
        var store = props.store; props.value; var multiple = props.multiple, formItem = props.formItem, addHook = props.addHook;
        store.config({
            multiple: multiple,
            minLength: _this.resolveVariableProps(props, 'minLength'),
            maxLength: _this.resolveVariableProps(props, 'maxLength'),
            length: _this.getValueAsArray(props).length
        });
        formItem && isAlive(formItem) && formItem.setSubStore(store);
        addHook && _this.toDispose.push(addHook(_this.flush, 'flush'));
        return _this;
    }
    ComboControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (anyChanged(['minLength', 'maxLength', 'value'], prevProps, props) ||
            this.resolveVariableProps(prevProps, 'minLength') !==
                this.resolveVariableProps(props, 'minLength') ||
            this.resolveVariableProps(prevProps, 'maxLength') !==
                this.resolveVariableProps(props, 'maxLength')) {
            var store = props.store, multiple = props.multiple;
            var values_1 = this.getValueAsArray(props);
            store.config({
                multiple: multiple,
                minLength: this.resolveVariableProps(props, 'minLength'),
                maxLength: this.resolveVariableProps(props, 'maxLength'),
                length: values_1.length
            });
            if (store.activeKey >= values_1.length) {
                store.setActiveKey(Math.max(0, values_1.length - 1));
            }
            // combo 进来了新的值，且这次 form 初始化时带来的新值变化，但是之前的值已经 onInit 过了
            // 所以，之前 onInit 设置进去的初始值是过时了的。这个时候修复一下。
            if (props.value !== prevProps.value &&
                !prevProps.formInited &&
                this.subFormDefaultValues.length) {
                this.subFormDefaultValues = this.subFormDefaultValues.map(function (item, index) {
                    return __assign(__assign({}, item), { values: values_1[index] });
                });
            }
        }
    };
    ComboControl.prototype.componentWillUnmount = function () {
        var _a, _b, _c, _d;
        var formItem = this.props.formItem;
        formItem && isAlive(formItem) && formItem.setSubStore(null);
        this.toDispose.forEach(function (fn) { return fn(); });
        this.toDispose = [];
        (_b = (_a = this.memoizedFormatValue.cache).clear) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_d = (_c = this.makeFormRef.cache).clear) === null || _d === void 0 ? void 0 : _d.call(_c);
    };
    /** 解析props中的变量，目前支持'minLength' | 'maxLength' */
    ComboControl.prototype.resolveVariableProps = function (props, key) {
        var defaultMap = {
            minLength: 0,
            maxLength: Infinity
        };
        var value = props[key];
        if (!value) {
            return defaultMap[key];
        }
        if (typeof value === 'string') {
            if (isPureVariable(value)) {
                var resolved = resolveVariableAndFilter(value, props.data, '| raw');
                value = (typeof resolved === 'number' && resolved >= 0
                    ? resolved
                    : defaultMap[key]);
            }
            else {
                var parsed = parseInt(value, 10);
                value = (isNaN(parsed) ? defaultMap[key] : parsed);
            }
        }
        return value;
    };
    ComboControl.prototype.doAction = function (action, data, throwErrors, args) {
        var _a;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var _b = this.props, onChange = _b.onChange, resetValue = _b.resetValue;
        if (actionType === 'addItem') {
            this.addItemValue((_a = args === null || args === void 0 ? void 0 : args.item) !== null && _a !== void 0 ? _a : {});
        }
        else if (actionType === 'clear') {
            onChange('');
        }
        else if (actionType === 'reset') {
            onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    ComboControl.prototype.addItemValue = function (itemValue) {
        var _a = this.props, flat = _a.flat, joinValues = _a.joinValues, addattop = _a.addattop, delimiter = _a.delimiter, disabled = _a.disabled, submitOnChange = _a.submitOnChange;
        if (disabled) {
            return;
        }
        var value = this.getValueAsArray();
        if (addattop === true) {
            this.keys.unshift(guid());
            value.unshift(itemValue);
        }
        else {
            value.push(itemValue);
            this.keys.push(guid());
        }
        if (flat && joinValues) {
            value = value.join(delimiter || ',');
        }
        this.props.onChange(value, submitOnChange, true);
    };
    ComboControl.prototype.getValueAsArray = function (props) {
        if (props === void 0) { props = this.props; }
        var flat = props.flat, joinValues = props.joinValues, delimiter = props.delimiter; props.type; props.formItem;
        // 因为 combo 多个子表单可能同时发生变化。
        // onChagne 触发多次，上次变更还没应用到 props.value 上来，这次触发变更就会包含历史数据，把上次触发的数据给重置成旧的了。
        // 通过 props.getValue() 拿到的是最新的
        var value = props.getValue();
        if (joinValues && flat && typeof value === 'string') {
            value = value.split(delimiter || ',');
        }
        else if (!Array.isArray(value)) {
            value = [];
        }
        else {
            value = value.concat();
        }
        return value;
    };
    ComboControl.prototype.addItemWith = function (condition) {
        var _a, _b;
        var _c = this.props, flat = _c.flat, joinValues = _c.joinValues, addattop = _c.addattop, delimiter = _c.delimiter, scaffold = _c.scaffold, disabled = _c.disabled, submitOnChange = _c.submitOnChange;
        if (disabled) {
            return;
        }
        var value = this.getValueAsArray();
        value.push(flat
            ? (_b = (_a = condition.scaffold) !== null && _a !== void 0 ? _a : scaffold) !== null && _b !== void 0 ? _b : ''
            : __assign({}, (condition.scaffold || scaffold)));
        this.keys.push(guid());
        if (flat && joinValues) {
            value = value.join(delimiter || ',');
        }
        if (addattop === true) {
            this.keys.unshift(this.keys.pop());
            value.unshift(value.pop());
        }
        this.props.onChange(value, submitOnChange, true);
    };
    ComboControl.prototype.addItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, flat, joinValues, addattop, delimiter, scaffold, disabled, submitOnChange, dispatchEvent, value, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, flat = _a.flat, joinValues = _a.joinValues, addattop = _a.addattop, delimiter = _a.delimiter, scaffold = _a.scaffold, disabled = _a.disabled, submitOnChange = _a.submitOnChange, dispatchEvent = _a.dispatchEvent;
                        if (disabled) {
                            return [2 /*return*/];
                        }
                        value = this.getValueAsArray();
                        return [4 /*yield*/, dispatchEvent('add', resolveEventData(this.props, {
                                value: flat && joinValues ? value.join(delimiter || ',') : cloneDeep(value)
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        value.push(flat
                            ? scaffold !== null && scaffold !== void 0 ? scaffold : ''
                            : __assign({}, scaffold));
                        this.keys.push(guid());
                        if (flat && joinValues) {
                            value = value.join(delimiter || ',');
                        }
                        if (addattop === true) {
                            this.keys.unshift(this.keys.pop());
                            value.unshift(value.pop());
                        }
                        this.props.onChange(value, submitOnChange, true);
                        return [2 /*return*/];
                }
            });
        });
    };
    ComboControl.prototype.deleteItem = function (key) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, flat, joinValues, delimiter, disabled, deleteApi, deleteConfirmText, data, env, __, dispatchEvent, submitOnChange, value, ctx, rendererEvent, confirmed, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.props, flat = _c.flat, joinValues = _c.joinValues, delimiter = _c.delimiter, disabled = _c.disabled, deleteApi = _c.deleteApi, deleteConfirmText = _c.deleteConfirmText, data = _c.data, env = _c.env, __ = _c.translate, dispatchEvent = _c.dispatchEvent, submitOnChange = _c.submitOnChange;
                        if (disabled) {
                            return [2 /*return*/];
                        }
                        value = this.getValueAsArray();
                        ctx = createObject(data, value[key]);
                        return [4 /*yield*/, dispatchEvent('delete', resolveEventData(this.props, {
                                key: key,
                                value: flat && joinValues ? value.join(delimiter || ',') : cloneDeep(value),
                                item: value[key]
                            }))];
                    case 1:
                        rendererEvent = _d.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (!isEffectiveApi(deleteApi, ctx)) return [3 /*break*/, 4];
                        return [4 /*yield*/, env.confirm(deleteConfirmText ? filter(deleteConfirmText, ctx) : __('deleteConfirm'))];
                    case 2:
                        confirmed = _d.sent();
                        if (!confirmed) {
                            // 如果不确认，则跳过！
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, env.fetcher(deleteApi, ctx)];
                    case 3:
                        result = _d.sent();
                        if (!result.ok) {
                            !(deleteApi === null || deleteApi === void 0 ? void 0 : deleteApi.silent) &&
                                env.notify('error', (_b = (_a = deleteApi === null || deleteApi === void 0 ? void 0 : deleteApi.messages) === null || _a === void 0 ? void 0 : _a.failed) !== null && _b !== void 0 ? _b : __('deleteFailed'));
                            return [2 /*return*/];
                        }
                        _d.label = 4;
                    case 4:
                        this.keys.splice(key, 1);
                        value.splice(key, 1);
                        if (flat && joinValues) {
                            value = value.join(delimiter || ',');
                        }
                        this.props.onChange(value, submitOnChange, true);
                        return [2 /*return*/];
                }
            });
        });
    };
    ComboControl.prototype.handleChange = function (values, diff, _a) {
        var e_1, _b, e_2, _c;
        var index = _a.index;
        var _d = this.props, flat = _d.flat, store = _d.store, joinValues = _d.joinValues, delimiter = _d.delimiter, disabled = _d.disabled, submitOnChange = _d.submitOnChange, type = _d.type, syncFields = _d.syncFields, name = _d.name;
        if (disabled) {
            return;
        }
        // 不要递归更新自己
        if (Array.isArray(syncFields)) {
            syncFields.forEach(function (field) {
                if (name === null || name === void 0 ? void 0 : name.startsWith(field)) {
                    values = __assign({}, values);
                    deleteVariable(values, name);
                }
            });
        }
        var value = this.getValueAsArray();
        value[index] = flat ? values.flat : __assign({}, values);
        if (flat && joinValues) {
            value = value.join(delimiter || ',');
        }
        if (type === 'input-kv') {
            var hasDuplicateKey = false;
            var keys = {};
            try {
                for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                    var item = value_1_1.value;
                    if (keys[item.key]) {
                        hasDuplicateKey = true;
                    }
                    else {
                        keys[item.key] = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (value_1_1 && !value_1_1.done && (_b = value_1.return)) _b.call(value_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // 有重复值就不触发修改，因为 KV 模式下无法支持重复值
            if (!hasDuplicateKey) {
                this.props.onChange(value, submitOnChange, true);
            }
        }
        else if (type === 'input-kvs') {
            // input-kvs 为了避免冲突 key 改成了 _key
            var hasDuplicateKey = false;
            var keys = {};
            try {
                for (var value_2 = __values(value), value_2_1 = value_2.next(); !value_2_1.done; value_2_1 = value_2.next()) {
                    var item = value_2_1.value;
                    if ('_key' in item) {
                        if (keys[item._key]) {
                            hasDuplicateKey = true;
                        }
                        else {
                            keys[item._key] = true;
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (value_2_1 && !value_2_1.done && (_c = value_2.return)) _c.call(value_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            // 有重复值就不触发修改，因为 KV 模式下无法支持重复值
            if (!hasDuplicateKey) {
                this.props.onChange(value, submitOnChange, true);
            }
        }
        else {
            this.props.onChange(value, submitOnChange, true);
        }
        store.forms.forEach(function (form) {
            return isAlive(form) &&
                form.items.forEach(function (item) { return item.unique && item.syncOptions(undefined, form.data); });
        });
    };
    ComboControl.prototype.handleRadioChange = function (ctx, _a) {
        var index = _a.index, name = _a.name, _b = _a.trueValue, trueValue = _b === void 0 ? true : _b, _c = _a.falseValue, falseValue = _c === void 0 ? false : _c;
        var _d = this.props, onChange = _d.onChange, submitOnChange = _d.submitOnChange, multiple = _d.multiple, disabled = _d.disabled;
        if (!multiple || disabled || !name) {
            return;
        }
        var value = this.getValueAsArray();
        if (!Array.isArray(value) || value.length < 2 || !isPlainObject(value[0])) {
            return;
        }
        value = value.map(function (item, i) {
            var _a;
            return (__assign(__assign({}, item), (_a = {}, _a[name] = i === index ? trueValue : falseValue, _a)));
        });
        onChange(value, submitOnChange, true);
        return false;
    };
    ComboControl.prototype.handleSingleFormChange = function (values) {
        if (this.props.value === null && isEqual(this.defaultValue, values)) {
            // 由清空触发，忽略
            return;
        }
        this.props.onChange(__assign({}, values), this.props.submitOnChange, true);
    };
    ComboControl.prototype.handleSubFormValid = function (valid, _a) {
        var index = _a.index;
        var store = this.props.store;
        store.setMemberValid(valid, index);
    };
    ComboControl.prototype.handleFormInit = function (values, _a) {
        var _b;
        var index = _a.index;
        var _c = this.props, syncDefaultValue = _c.syncDefaultValue, flat = _c.flat, joinValues = _c.joinValues, delimiter = _c.delimiter, formInited = _c.formInited, onChange = _c.onChange, submitOnChange = _c.submitOnChange, setPrinstineValue = _c.setPrinstineValue, formItem = _c.formItem, name = _c.name, syncFields = _c.syncFields;
        // 不要递归更新自己
        if (Array.isArray(syncFields)) {
            syncFields.forEach(function (field) {
                if (name === null || name === void 0 ? void 0 : name.startsWith(field)) {
                    values = __assign({}, values);
                    deleteVariable(values, name);
                }
            });
        }
        // 已经开始验证了，那么打开成员的时候，就要验证一下。
        if (formItem === null || formItem === void 0 ? void 0 : formItem.validated) {
            (_b = this.subForms[index]) === null || _b === void 0 ? void 0 : _b.validate(true, false, false);
        }
        this.subFormDefaultValues.push({
            index: index,
            values: values,
            setted: false
        });
        if (syncDefaultValue === false ||
            this.subFormDefaultValues.length !==
                this.subForms.filter(function (item) { return item !== undefined; }).length) {
            return;
        }
        var value = this.getValueAsArray();
        var isModified = false;
        this.subFormDefaultValues = this.subFormDefaultValues.map(function (_a) {
            var index = _a.index, values = _a.values, setted = _a.setted;
            var newValue = flat ? values.flat : __assign({}, values);
            if (!setted && isObjectShallowModified(value[index], newValue)) {
                value[index] = flat ? values.flat : __assign({}, values);
                isModified = true;
            }
            return {
                index: index,
                values: values,
                setted: true
            };
        });
        if (!isModified) {
            return;
        }
        if (flat && joinValues) {
            value = value.join(delimiter || ',');
        }
        formInited
            ? onChange(value, submitOnChange, true)
            : setPrinstineValue(value);
    };
    ComboControl.prototype.handleSingleFormInit = function (values) {
        var _a = this.props, syncDefaultValue = _a.syncDefaultValue, setPrinstineValue = _a.setPrinstineValue, value = _a.value, nullable = _a.nullable;
        if (syncDefaultValue !== false &&
            !nullable &&
            isObjectShallowModified(value, values)) {
            setPrinstineValue(__assign({}, values));
        }
    };
    ComboControl.prototype.handleAction = function (e, action) {
        var onAction = this.props.onAction;
        if (action.actionType === 'delete') {
            action.index !== void 0 && this.deleteItem(action.index);
            return;
        }
        onAction && onAction.apply(null, arguments);
    };
    ComboControl.prototype.validate = function () {
        var _this = this;
        var _a = this.props, messages = _a.messages, nullable = _a.nullable, rawValue = _a.value, __ = _a.translate, store = _a.store, flat = _a.flat;
        var value = this.getValueAsArray();
        var minLength = this.resolveVariableProps(this.props, 'minLength');
        var maxLength = this.resolveVariableProps(this.props, 'maxLength');
        if (minLength && (!Array.isArray(value) || value.length < minLength)) {
            return __((messages && messages.minLengthValidateFailed) || 'Combo.minLength', { minLength: minLength });
        }
        else if (maxLength && Array.isArray(value) && value.length > maxLength) {
            return __((messages && messages.maxLengthValidateFailed) || 'Combo.maxLength', { maxLength: maxLength });
        }
        else if (nullable && !rawValue) {
            return; // 不校验
        }
        else if (value.length) {
            return Promise.all(value.map(function (values, index) { return __awaiter(_this, void 0, void 0, function () {
                var subForm, subForm_1, form, valid, _a, _b, formitem, cloned, derivedValue, e_3_1;
                var e_3, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            subForm = this.subForms[index];
                            if (!subForm) return [3 /*break*/, 1];
                            return [2 /*return*/, subForm.validate(true, false, false)];
                        case 1:
                            subForm_1 = this.subForms[Object.keys(this.subForms)[0]];
                            if (!subForm_1) return [3 /*break*/, 10];
                            form = subForm_1.props.store;
                            valid = false;
                            _d.label = 2;
                        case 2:
                            _d.trys.push([2, 7, 8, 9]);
                            _a = __values(form.items), _b = _a.next();
                            _d.label = 3;
                        case 3:
                            if (!!_b.done) return [3 /*break*/, 6];
                            formitem = _b.value;
                            cloned = clone(formitem);
                            derivedValue = flat
                                ? values
                                : getVariable(values, formitem.name, false);
                            if (formitem.extraName && !flat) {
                                derivedValue = [
                                    getVariable(values, formitem.name, false),
                                    getVariable(values, formitem.extraName, false)
                                ];
                            }
                            cloned.changeTmpValue(derivedValue, 'dataChanged');
                            return [4 /*yield*/, cloned.validate(values)];
                        case 4:
                            valid = _d.sent();
                            destroy(cloned);
                            if (valid === false) {
                                return [3 /*break*/, 6];
                            }
                            _d.label = 5;
                        case 5:
                            _b = _a.next();
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_3_1 = _d.sent();
                            e_3 = { error: e_3_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                            return [7 /*endfinally*/];
                        case 9:
                            store.setMemberValid(valid, index);
                            return [2 /*return*/, valid];
                        case 10: return [2 /*return*/];
                    }
                });
            }); })).then(function (values) {
                if (~values.indexOf(false)) {
                    return __((messages && messages.validateFailed) || 'validateFailed');
                }
                return;
            });
        }
        else if (this.subForms.length) {
            return Promise.all(this.subForms.map(function (item) { return item.validate(true, false, false); })).then(function (values) {
                if (~values.indexOf(false)) {
                    return __((messages && messages.validateFailed) || 'validateFailed');
                }
                return;
            });
        }
    };
    ComboControl.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.subForms.map(function (form) { return form.flush(); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComboControl.prototype.dragTipRef = function (ref) {
        if (!this.dragTip && ref) {
            this.initDragging();
        }
        else if (this.dragTip && !ref) {
            this.destroyDragging();
        }
        this.dragTip = ref;
    };
    ComboControl.prototype.initDragging = function () {
        var _this = this;
        var ns = this.props.classPrefix;
        var submitOnChange = this.props.submitOnChange;
        var dom = findDOMNode(this);
        this.sortable = new Sortable(dom.querySelector(".".concat(ns, "Combo-items")), {
            group: "combo-".concat(this.id),
            animation: 150,
            handle: ".".concat(ns, "Combo-itemDrager"),
            ghostClass: "".concat(ns, "Combo-item--dragging"),
            onEnd: function (e) {
                // 没有移动
                if (e.newIndex === e.oldIndex) {
                    return;
                }
                // 换回来
                var parent = e.to;
                if (e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex > e.newIndex ? e.oldIndex + 1 : e.oldIndex]);
                }
                else {
                    parent.appendChild(e.item);
                }
                var value = _this.props.value;
                if (!Array.isArray(value)) {
                    return;
                }
                var newValue = value.concat();
                newValue.splice(e.newIndex, 0, newValue.splice(e.oldIndex, 1)[0]);
                _this.keys.splice(e.newIndex, 0, _this.keys.splice(e.oldIndex, 1)[0]);
                _this.props.onChange(newValue, submitOnChange, true);
                _this.props.dispatchEvent('dragEnd', resolveEventData(_this.props, {
                    item: newValue[e.newIndex],
                    value: newValue,
                    index: e.newIndex,
                    oldValue: value,
                    oldIndex: e.oldIndex
                }));
            }
        });
    };
    ComboControl.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    ComboControl.prototype.formRef = function (ref, index) {
        if (index === void 0) { index = 0; }
        if (ref) {
            while (ref && ref.getWrappedInstance) {
                ref = ref.getWrappedInstance();
            }
            this.subForms[index] = ref;
            this.refsMap[index] = ref;
        }
        else {
            var form_1 = this.refsMap[index];
            this.subForms = this.subForms.filter(function (item) { return item !== form_1; });
            this.subFormDefaultValues = this.subFormDefaultValues.filter(function (_a) {
                var dIndex = _a.index;
                return dIndex !== index;
            });
            delete this.refsMap[index];
        }
    };
    ComboControl.prototype.formatValue = function (value, index) {
        if (index === void 0) { index = -1; }
        var _a = this.props, flat = _a.flat, data = _a.data, strictMode = _a.strictMode, syncFields = _a.syncFields;
        if (flat) {
            value = {
                flat: value
            };
        }
        value = value || this.defaultValue;
        return this.memoizedFormatValue(strictMode !== false, syncFields, value, index, data);
    };
    ComboControl.prototype.pickCondition = function (value) {
        var conditions = this.props.conditions;
        return find(conditions, function (item) { return item.test && evalExpression(item.test, value); });
    };
    ComboControl.prototype.handleComboTypeChange = function (index, selection) {
        var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, value = _a.value; _a.flat; var submitOnChange = _a.submitOnChange;
        var conditions = this.props
            .conditions;
        var condition = find(conditions, function (item) { return item.label === selection.label; });
        if (!condition) {
            return;
        }
        if (multiple) {
            var newValue = this.getValueAsArray();
            newValue.splice(index, 1, __assign({}, dataMapping(condition.scaffold || {}, newValue[index])));
            // todo 支持 flat
            onChange(newValue, submitOnChange, true);
        }
        else {
            onChange(__assign({}, dataMapping(condition.scaffold || {}, value)), submitOnChange, true);
        }
    };
    ComboControl.prototype.handleTabSelect = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, data, name, value, dispatchEvent, eventData, rendererEvent;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, store = _a.store, data = _a.data, name = _a.name, value = _a.value, dispatchEvent = _a.dispatchEvent;
                        eventData = {
                            key: key,
                            item: value[key]
                        };
                        return [4 /*yield*/, dispatchEvent('tabsChange', createObject(data, name
                                ? __assign(__assign({}, eventData), (_b = {}, _b[name] = value, _b)) : eventData))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        store.setActiveKey(key);
                        return [2 /*return*/];
                }
            });
        });
    };
    ComboControl.prototype.setNull = function (e) {
        e.preventDefault();
        var onChange = this.props.onChange;
        onChange(null);
        Array.isArray(this.subForms) &&
            this.subForms.forEach(function (subForm) {
                subForm.clearErrors();
            });
    };
    ComboControl.prototype.renderPlaceholder = function () {
        var _a = this.props, placeholder = _a.placeholder, __ = _a.translate;
        return (React.createElement("span", { className: "text-muted" }, __(placeholder || 'placeholder.noData')));
    };
    ComboControl.prototype.renderTabsMode = function () {
        var _this = this;
        var _a = this.props; _a.classPrefix; var cx = _a.classnames, tabsStyle = _a.tabsStyle; _a.formClassName; _a.render; var disabled = _a.disabled, store = _a.store, flat = _a.flat; _a.subFormMode; _a.addButtonText; var addable = _a.addable, removable = _a.removable, typeSwitchable = _a.typeSwitchable, itemRemovableOn = _a.itemRemovableOn, delimiter = _a.delimiter; _a.canAccessSuperData; _a.addIcon; var deleteIcon = _a.deleteIcon, tabsLabelTpl = _a.tabsLabelTpl, conditions = _a.conditions; _a.changeImmediately; var addBtnText = _a.addBtnText; _a.static; var __ = _a.translate;
        var items = this.props.items;
        var value = this.props.value;
        if (flat && typeof value === 'string') {
            value = value.split(delimiter || ',');
        }
        var finnalRemovable = store.removable !== false && // minLength ?
            !disabled && // 控件自身是否禁用
            removable !== false; // 是否可以删除
        if (!Array.isArray(value)) {
            value = []; // 让 tabs 输出，否则会没有新增按钮。
        }
        // todo 支持拖拽排序。
        return (React.createElement(Tabs, { addBtnText: __(addBtnText || 'add'), className: 'ComboTabs', mode: tabsStyle, activeKey: store.activeKey, onSelect: this.handleTabSelect, additionBtns: !disabled && addable !== false && store.addable ? (React.createElement("li", { className: cx("Tabs-link ComboTabs-addLink") }, this.renderAddBtn())) : null }, value.map(function (value, index) {
            var data = _this.formatValue(value, index);
            var condition = null;
            var toolbar = undefined;
            if (finnalRemovable && // 表达式判断单条是否可删除
                (!itemRemovableOn ||
                    evalExpression(itemRemovableOn, value) !== false)) {
                toolbar = (React.createElement("div", { onClick: _this.deleteItem.bind(_this, index), key: "delete", className: cx("Combo-tab-delBtn ".concat(!store.removable ? 'is-disabled' : '')), "data-tooltip": __('delete'), "data-position": "bottom" }, deleteIcon ? (React.createElement("i", { className: deleteIcon })) : (React.createElement(Icon, { icon: "status-close", className: "icon" }))));
            }
            if (Array.isArray(conditions) && conditions.length) {
                condition = _this.pickCondition(data);
                items = condition ? condition.items : undefined;
            }
            var finnalControls = flat && items
                ? [
                    __assign(__assign({}, (items && items[0])), { name: 'flat' })
                ]
                : items;
            var hasUnique = Array.isArray(finnalControls) &&
                finnalControls.some(function (item) { return item.unique; });
            if (!_this.keys[index]) {
                _this.keys.splice(index, 0, guid());
            }
            return (React.createElement(Tab, { title: filter(tabsLabelTpl ||
                    __('{{index}}', { index: data.index + 1 }), data), key: _this.keys[index], toolbar: toolbar, eventKey: index, 
                // 不能按需渲染，因为 unique 会失效。
                mountOnEnter: !hasUnique, unmountOnExit: false, className: store.memberValidMap[index] === false ? 'has-error' : '', tabClassName: store.memberValidMap[index] === false ? 'has-error' : '' },
                condition && typeSwitchable !== false ? (React.createElement("div", { className: cx('Combo-itemTag') },
                    React.createElement("label", null, __('Combo.type')),
                    React.createElement(Select, { onChange: _this.handleComboTypeChange.bind(_this, index), options: conditions.map(function (item) { return ({
                            label: item.label,
                            value: item.label
                        }); }), value: condition.label, clearable: false }))) : null,
                React.createElement("div", { className: cx("Combo-itemInner") }, finnalControls ? (_this.renderItems(finnalControls, data, index)) : (React.createElement(Alert2, { level: "warning", className: "m-b-none" }, __('Combo.invalidData'))))));
        })));
    };
    ComboControl.prototype.renderDelBtn = function (value, index) {
        var _this = this;
        if (this.props.static) {
            return null;
        }
        var _a = this.props; _a.classPrefix; var cx = _a.classnames, render = _a.render, store = _a.store, deleteIcon = _a.deleteIcon, __ = _a.translate, itemRemovableOn = _a.itemRemovableOn, disabled = _a.disabled, removable = _a.removable, deleteBtn = _a.deleteBtn, mobileUI = _a.mobileUI, data = _a.data, testIdBuilder = _a.testIdBuilder;
        var delTestIdBuilder = testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("delete-btn-".concat(index));
        var finnalRemovable = store.removable !== false && // minLength ?
            !disabled && // 控件自身是否禁用
            removable !== false; // 是否可以删除
        if (!(finnalRemovable && // 表达式判断单条是否可删除
            (!itemRemovableOn || evalExpression(itemRemovableOn, value) !== false))) {
            // 不符合删除条件，则不渲染删除按钮
            return null;
        }
        // deleteBtn是对象，则根据自定义配置渲染按钮
        if (isObject(deleteBtn)) {
            return render('delete-btn', __assign(__assign({}, deleteBtn), { type: 'button', className: cx('Combo-delController', deleteBtn ? deleteBtn.className : ''), testIdBuilder: delTestIdBuilder, onClick: function (e) {
                    if (!deleteBtn.onClick) {
                        _this.deleteItem(index);
                        return;
                    }
                    var originClickHandler = deleteBtn.onClick;
                    if (typeof originClickHandler === 'string') {
                        originClickHandler = str2AsyncFunction(deleteBtn.onClick, 'e', 'index', 'props');
                    }
                    var result = originClickHandler(e, index, _this.props);
                    if (result && result.then) {
                        result.then(function () {
                            _this.deleteItem(index);
                        });
                    }
                    else {
                        _this.deleteItem(index);
                    }
                } }), {
                data: extendObject(data, { index: index })
            });
        }
        // deleteBtn是string，则渲染按钮文本
        if (typeof deleteBtn === 'string') {
            return render('delete-btn', {
                type: 'button',
                className: cx('Combo-delController'),
                label: deleteBtn,
                onClick: this.deleteItem.bind(this, index),
                testIdBuilder: delTestIdBuilder
            });
        }
        // 如果上述按钮不满足，则渲染默认按钮
        return (React.createElement("a", __assign({ onClick: this.deleteItem.bind(this, index), key: "delete", className: cx("Combo-delBtn ".concat(!store.removable ? 'is-disabled' : '')), "data-tooltip": !mobileUI ? __('delete') : null, "data-position": "bottom" }, delTestIdBuilder === null || delTestIdBuilder === void 0 ? void 0 : delTestIdBuilder.getTestId()), deleteIcon ? (React.createElement("i", { className: deleteIcon })) : (React.createElement(Icon, { icon: "status-close", className: "icon" }))));
    };
    ComboControl.prototype.renderAddBtn = function () {
        var _this = this;
        if (this.props.static) {
            return null;
        }
        var _a = this.props; _a.classPrefix; var cx = _a.classnames, render = _a.render, addButtonClassName = _a.addButtonClassName, store = _a.store, addButtonText = _a.addButtonText, addBtn = _a.addBtn, addable = _a.addable, addIcon = _a.addIcon, conditions = _a.conditions, __ = _a.translate, tabsMode = _a.tabsMode, testIdBuilder = _a.testIdBuilder;
        var hasConditions = Array.isArray(conditions) && conditions.length;
        var addBtnTestIdBuilder = testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('add-button');
        return (React.createElement(React.Fragment, null, store.addable &&
            addable !== false &&
            (hasConditions ? (render('add-button', {
                type: 'dropdown-button',
                icon: addIcon ? React.createElement(Icon, { icon: "plus-fine", className: "icon" }) : '',
                label: __(addButtonText || 'add'),
                level: 'info',
                size: 'sm',
                closeOnClick: true,
                btnClassName: addButtonClassName,
                testIdBuilder: addBtnTestIdBuilder
            }, {
                buttons: conditions === null || conditions === void 0 ? void 0 : conditions.map(function (item) { return ({
                    label: item.label,
                    onClick: function (e) {
                        _this.addItemWith(item);
                        return false;
                    }
                }); })
            })) : tabsMode ? (React.createElement("a", { onClick: this.addItem },
                addIcon ? React.createElement(Icon, { icon: "plus-fine", className: "icon" }) : null,
                React.createElement("span", null, __(addButtonText || 'add')))) : isObject(addBtn) ? (render('add-button', __assign(__assign({}, addBtn), { type: 'button', testIdBuilder: addBtnTestIdBuilder, onClick: function () { return _this.addItem(); } }))) : (React.createElement(Button, { className: cx("Combo-addBtn", addButtonClassName), onClick: this.addItem, testIdBuilder: addBtnTestIdBuilder },
                addIcon ? React.createElement(Icon, { icon: "plus-fine", className: "icon" }) : null,
                React.createElement("span", null, __(addButtonText || 'add')))))));
    };
    ComboControl.prototype.renderMultipe = function () {
        var _this = this;
        if (this.props.tabsMode) {
            return this.renderTabsMode();
        }
        var _a = this.props; _a.classPrefix; var cx = _a.classnames, multiLine = _a.multiLine, disabled = _a.disabled, flat = _a.flat, draggable = _a.draggable, draggableTip = _a.draggableTip, typeSwitchable = _a.typeSwitchable, delimiter = _a.delimiter, dragIcon = _a.dragIcon, noBorder = _a.noBorder, conditions = _a.conditions, placeholder = _a.placeholder, __ = _a.translate, itemClassName = _a.itemClassName, itemsWrapperClassName = _a.itemsWrapperClassName, isStatic = _a.static, mobileUI = _a.mobileUI, store = _a.store;
        var items = this.props.items;
        var value = this.props.value;
        if (flat && typeof value === 'string') {
            value = value.split(delimiter || ',');
        }
        return (React.createElement("div", { className: cx("Combo Combo--multi", {
                'is-mobile': mobileUI
            }, multiLine ? "Combo--ver" : "Combo--hor", noBorder ? "Combo--noBorder" : '', disabled ? 'is-disabled' : '', !isStatic &&
                !disabled &&
                draggable &&
                Array.isArray(value) &&
                value.length > 1
                ? 'is-draggable'
                : '') },
            React.createElement("div", { className: cx("Combo-items", itemsWrapperClassName) }, Array.isArray(value) && value.length ? (value.map(function (value, index, thelist) {
                var delBtn = _this.renderDelBtn(value, index);
                var data = _this.formatValue(value, index);
                var condition = null;
                if (Array.isArray(conditions) && conditions.length) {
                    condition = _this.pickCondition(data);
                    items = condition ? condition.items : undefined;
                }
                var finnalControls = flat && items
                    ? [
                        __assign(__assign({}, (items && items[0])), { name: 'flat' })
                    ]
                    : items;
                if (!_this.keys[index]) {
                    _this.keys.splice(index, 1, guid());
                }
                return (React.createElement("div", { className: cx("Combo-item", itemClassName, store.memberValidMap[index] === false ? 'has-error' : ''), key: _this.keys[index] },
                    !isStatic && !disabled && draggable && thelist.length > 1 ? (React.createElement("div", { className: cx('Combo-itemDrager') },
                        React.createElement("a", { key: "drag", "data-tooltip": __('Combo.dragDropSort'), "data-position": "bottom" }, dragIcon ? (React.createElement("i", { className: dragIcon })) : (React.createElement(Icon, { icon: "drag-bar", className: "icon" }))))) : null,
                    condition && typeSwitchable !== false ? (React.createElement("div", { className: cx('Combo-itemTag') },
                        React.createElement("label", null, __('Combo.type')),
                        React.createElement(Select, { onChange: _this.handleComboTypeChange.bind(_this, index), options: conditions.map(function (item) { return ({
                                label: item.label,
                                value: item.label
                            }); }), value: condition.label, clearable: false }))) : null,
                    React.createElement("div", { className: cx("Combo-itemInner") }, finnalControls ? (_this.renderItems(finnalControls, data, index)) : (React.createElement(Alert2, { level: "warning", className: "m-b-none" }, __('Combo.invalidData')))),
                    delBtn));
            })) : placeholder ? (React.createElement("div", { className: cx("Combo-placeholder") }, __(placeholder))) : null),
            !isStatic && !disabled ? (React.createElement("div", { className: cx("Combo-toolbar") },
                this.renderAddBtn(),
                draggable ? (React.createElement("span", { className: cx("Combo-dragableTip"), ref: this.dragTipRef }, Array.isArray(value) && value.length > 1
                    ? __(draggableTip)
                    : '')) : null)) : null));
    };
    ComboControl.prototype.renderSingle = function () {
        var _a = this.props, conditions = _a.conditions, cx = _a.classnames, value = _a.value, multiLine = _a.multiLine, noBorder = _a.noBorder, disabled = _a.disabled, typeSwitchable = _a.typeSwitchable, nullable = _a.nullable, __ = _a.translate, itemClassName = _a.itemClassName, mobileUI = _a.mobileUI, store = _a.store;
        var items = this.props.items;
        var data = isObject(value)
            ? this.formatValue(value)
            : this.formatValue(this.defaultValue);
        var condition = null;
        if (Array.isArray(conditions) && conditions.length) {
            condition = this.pickCondition(data);
            items = condition ? condition.items : undefined;
        }
        return (React.createElement("div", { className: cx("Combo Combo--single", {
                'is-mobile': mobileUI
            }, multiLine ? "Combo--ver" : "Combo--hor", noBorder ? "Combo--noBorder" : '', disabled ? 'is-disabled' : '') },
            React.createElement("div", { className: cx("Combo-item", itemClassName, store.memberValidMap[0] === false ? 'has-error' : '') },
                condition && typeSwitchable !== false ? (React.createElement("div", { className: cx('Combo-itemTag') },
                    React.createElement("label", null, __('Combo.type')),
                    React.createElement(Select, { onChange: this.handleComboTypeChange.bind(this, 0), options: conditions.map(function (item) { return ({
                            label: item.label,
                            value: item.label
                        }); }), value: condition.label, clearable: false }))) : null,
                React.createElement("div", { className: cx("Combo-itemInner") }, items ? (this.renderItems(items, data)) : (React.createElement(Alert2, { level: "warning", className: "m-b-none" }, __('Combo.invalidData'))))),
            value && nullable ? (React.createElement("a", { className: cx('Combo-setNullBtn'), href: "#", onClick: this.setNull }, __('clear'))) : null));
    };
    // 为了给 editor 重写使用
    ComboControl.prototype.renderItems = function (finnalControls, data, index) {
        var _a = this.props, cx = _a.classnames, formClassName = _a.formClassName, render = _a.render, multiLine = _a.multiLine, disabled = _a.disabled, canAccessSuperData = _a.canAccessSuperData, multiple = _a.multiple, tabsMode = _a.tabsMode, subFormMode = _a.subFormMode, subFormHorizontal = _a.subFormHorizontal, changeImmediately = _a.changeImmediately, lazyLoad = _a.lazyLoad; _a.translate; var isStatic = _a.static, testIdBuilder = _a.testIdBuilder, updatePristineAfterStoreDataReInit = _a.updatePristineAfterStoreDataReInit;
        var finnalItems = Array.isArray(finnalControls)
            ? finnalControls.map(function (item, itemIndex) {
                var indexKey = index !== undefined && index >= 0 ? "-".concat(index) : '';
                var key = "item-".concat(item.testid || item.id || itemIndex) + indexKey;
                return __assign(__assign({}, item), { testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild(key) });
            })
            : finnalControls;
        // 单个
        if (!multiple) {
            return render('single', {
                type: 'form',
                body: finnalItems,
                wrapperComponent: 'div',
                wrapWithPanel: false,
                mode: multiLine ? subFormMode || 'normal' : 'row',
                horizontal: subFormHorizontal,
                className: cx("Combo-form", formClassName)
            }, {
                index: 0,
                disabled: disabled,
                static: isStatic,
                data: data,
                onChange: this.handleSingleFormChange,
                ref: this.makeFormRef(0),
                onValidChange: this.handleSubFormValid,
                onInit: this.handleSingleFormInit,
                canAccessSuperData: canAccessSuperData,
                formStore: undefined,
                updatePristineAfterStoreDataReInit: updatePristineAfterStoreDataReInit !== null && updatePristineAfterStoreDataReInit !== void 0 ? updatePristineAfterStoreDataReInit : false
            });
        }
        else if (multiple && index !== undefined && index >= 0) {
            return render("multiple/".concat(index), {
                type: 'form',
                body: finnalItems,
                wrapperComponent: 'div',
                wrapWithPanel: false,
                mode: tabsMode ? subFormMode : multiLine ? subFormMode : 'row',
                horizontal: subFormHorizontal,
                className: cx("Combo-form", formClassName)
            }, __assign(__assign({ index: index, disabled: disabled, static: isStatic, data: data, onChange: this.handleChange, onInit: this.handleFormInit, onAction: this.handleAction, onRadioChange: this.handleRadioChange, ref: this.makeFormRef(index), onValidChange: this.handleSubFormValid, canAccessSuperData: canAccessSuperData, lazyChange: changeImmediately ? false : true, formLazyChange: false, value: undefined, formItemValue: undefined, formStore: undefined }, (tabsMode ? {} : { lazyLoad: lazyLoad })), { updatePristineAfterStoreDataReInit: updatePristineAfterStoreDataReInit !== null && updatePristineAfterStoreDataReInit !== void 0 ? updatePristineAfterStoreDataReInit : false }));
        }
        return React.createElement(React.Fragment, null);
    };
    ComboControl.prototype.renderStatic = function (displayValue) {
        // 如有 staticSchema 会被拦截渲染schema, 不会走到这里
        return this.props.render('static-input-kv', {
            type: 'json'
        }, this.props);
    };
    ComboControl.prototype.render = function () {
        var _a = this.props, type = _a.type, formInited = _a.formInited, multiple = _a.multiple, className = _a.className; _a.style; _a.classPrefix; var cx = _a.classnames, isStatic = _a.static, staticSchema = _a.staticSchema;
        // 静态展示时
        // 当有staticSchema 或 type = input-kv | input-kvs
        // 才拦截处理，其他情况交给子表单项处理即可
        if (isStatic &&
            (staticSchema || ['input-kv', 'input-kvs'].includes(type))) {
            return this.renderStatic();
        }
        return formInited || typeof formInited === 'undefined' ? (React.createElement("div", { className: cx("ComboControl", className) }, multiple ? this.renderMultipe() : this.renderSingle())) : null;
    };
    ComboControl.defaultProps = {
        minLength: 0,
        maxLength: Infinity,
        multiple: false,
        multiLine: false,
        addButtonClassName: '',
        formClassName: '',
        subFormMode: 'normal',
        draggableTip: '',
        addButtonText: 'add',
        canAccessSuperData: false,
        addIcon: true,
        dragIcon: '',
        deleteIcon: '',
        tabsMode: false,
        tabsStyle: '',
        placeholder: 'placeholder.empty',
        itemClassName: '',
        itemsWrapperClassName: ''
    };
    ComboControl.propsList = [
        'minLength',
        'maxLength',
        'multiple',
        'multiLine',
        'addButtonClassName',
        'subFormMode',
        'draggableTip',
        'addButtonText',
        'draggable',
        'scaffold',
        'canAccessSuperData',
        'addIcon',
        'dragIcon',
        'deleteIcon',
        'noBorder',
        'conditions',
        'tabsMode',
        'tabsStyle',
        'lazyLoad',
        'changeImmediately',
        'strictMode',
        'items',
        'conditions',
        'messages',
        'formStore',
        'itemClassName',
        'itemsWrapperClassName'
    ];
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], ComboControl.prototype, "handleTabSelect", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ComboControl.prototype, "setNull", null);
    return ComboControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ComboControlRenderer, _super);
    function ComboControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 支持更新指定索引的值
    ComboControlRenderer.prototype.setData = function (value, replace, index, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, multiple, onChange, submitOnChange, items_1, len, indexs, i, item, isUpdate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, multiple = _a.multiple, onChange = _a.onChange, submitOnChange = _a.submitOnChange;
                        if (!multiple) return [3 /*break*/, 8];
                        items_1 = __spreadArray([], __read(this.getValueAsArray()), false);
                        len = items_1.length;
                        if (!(index !== undefined)) return [3 /*break*/, 1];
                        indexs = String(index).split(',');
                        indexs.forEach(function (i) {
                            var intIndex = Number(i);
                            items_1.splice(intIndex, 1, __assign(__assign({}, items_1[intIndex]), value)); // 默认merge
                        });
                        onChange === null || onChange === void 0 ? void 0 : onChange(items_1, submitOnChange, true);
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(condition !== undefined)) return [3 /*break*/, 6];
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < len)) return [3 /*break*/, 5];
                        item = items_1[i];
                        return [4 /*yield*/, evalExpressionWithConditionBuilder(condition, item)];
                    case 3:
                        isUpdate = _b.sent();
                        if (isUpdate) {
                            items_1.splice(i, 1, __assign(__assign({}, items_1[i]), value)); // 默认merge
                        }
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        onChange === null || onChange === void 0 ? void 0 : onChange(items_1, submitOnChange, true);
                        return [3 /*break*/, 7];
                    case 6:
                        onChange === null || onChange === void 0 ? void 0 : onChange(value, submitOnChange, true);
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        onChange === null || onChange === void 0 ? void 0 : onChange(value, submitOnChange, true);
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ComboControlRenderer = __decorate([
        FormItem({
            type: 'combo',
            storeType: ComboStore.name,
            extendsData: false,
            shouldComponentUpdate: function (props, prevProps) {
                return (isPureVariable(props.maxLength) &&
                    resolveVariableAndFilter(prevProps.maxLength, prevProps.data) !==
                        resolveVariableAndFilter(props.maxLength, props.data)) ||
                    (isPureVariable(props.minLength) &&
                        resolveVariableAndFilter(prevProps.minLength, prevProps.data) !==
                            resolveVariableAndFilter(props.minLength, props.data));
            }
        })
    ], ComboControlRenderer);
    return ComboControlRenderer;
})(ComboControl));
/** @class */ ((function (_super) {
    __extends(KVControlRenderer, _super);
    function KVControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KVControlRenderer = __decorate([
        FormItem({
            type: 'input-kv',
            storeType: ComboStore.name,
            extendsData: false
        })
    ], KVControlRenderer);
    return KVControlRenderer;
})(ComboControl));
/** @class */ ((function (_super) {
    __extends(KVSControlRenderer, _super);
    function KVSControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KVSControlRenderer = __decorate([
        FormItem({
            type: 'input-kvs',
            storeType: ComboStore.name,
            extendsData: false
        })
    ], KVSControlRenderer);
    return KVSControlRenderer;
})(ComboControl));

export { ComboControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
