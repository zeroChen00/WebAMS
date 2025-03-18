/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var isEqual = require('lodash/isEqual');
var amisCore = require('amis-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

// input-kv 实际上是 combo 的一种扩展
amisCore.addSchemaFilter(function (schema, renderer, props) {
    var _a, _b, _c, _d;
    if (schema && schema.type === 'input-kv') {
        var autoParseJSON_1 = (_a = schema.autoParseJSON) !== null && _a !== void 0 ? _a : true;
        return tslib.__assign(tslib.__assign({ draggable: true }, schema), { multiple: true, pipeIn: function (value) {
                if (!amisCore.isObject(value)) {
                    return [];
                }
                if (isEqual__default["default"](value, this.cachedValue)) {
                    return this.cachedValueArray;
                }
                var arr = [];
                Object.keys(value).forEach(function (key) {
                    var valueType = typeof value[key];
                    arr.push({
                        key: key || '',
                        value: valueType === 'string' ||
                            valueType === 'number' ||
                            valueType === 'boolean'
                            ? value[key]
                            : JSON.stringify(value[key])
                    });
                });
                return arr;
            }, pipeOut: function (value) {
                if (!Array.isArray(value)) {
                    return value;
                }
                var obj = {};
                value.forEach(function (item) {
                    var _a, _b, _c;
                    var key = (_a = item.key) !== null && _a !== void 0 ? _a : '';
                    var value = (_c = (_b = item.value) !== null && _b !== void 0 ? _b : schema.defaultValue) !== null && _c !== void 0 ? _c : '';
                    if (autoParseJSON_1 &&
                        typeof value === 'string' &&
                        value.startsWith('{')) {
                        try {
                            value = JSON.parse(value);
                        }
                        catch (e) { }
                    }
                    obj[key] = value;
                });
                this.cachedValue = obj;
                this.cachedValueArray = value;
                return obj;
            }, items: [
                schema.keySchema
                    ? tslib.__assign(tslib.__assign({}, schema.keySchema), { unique: true, name: 'key', required: true, validateOnChange: true }) : {
                    placeholder: (_b = schema.keyPlaceholder) !== null && _b !== void 0 ? _b : 'Key',
                    type: 'input-text',
                    unique: true,
                    name: 'key',
                    required: true,
                    validateOnChange: true
                },
                schema.valueSchema
                    ? tslib.__assign(tslib.__assign({}, schema.valueSchema), { name: 'value' }) : schema.valueComponent
                    ? {
                        placeholder: (_c = schema.valuePlaceholder) !== null && _c !== void 0 ? _c : 'Value',
                        component: schema.valueComponent,
                        asFormItem: true,
                        name: 'value'
                    }
                    : {
                        placeholder: (_d = schema.valuePlaceholder) !== null && _d !== void 0 ? _d : 'Value',
                        type: schema.valueType || 'input-text',
                        name: 'value'
                    }
            ] });
    }
    return schema;
});
/**
 * 之前 input-kv 的 value 值不支持对象或数组
 * 很多属性是给单个值设置的，比如 valuePlaceholder 导致
 * 耦合在一起会导致配置项混乱，所以新增了这个组件专门支持 value 是对象或数组的场景
 */
amisCore.addSchemaFilter(function (schema, renderer, props) {
    if (schema && schema.type === 'input-kvs') {
        var keyItem = schema.keyItem || {};
        var valueItems = schema.valueItems || [];
        // value 直接放在 key 下的情况
        var flatValue_1 = false;
        if (valueItems.length == 1) {
            if (valueItems[0].name === '_value') {
                flatValue_1 = true;
            }
        }
        var newSchema = tslib.__assign(tslib.__assign({ draggable: true, multiple: true, multiLine: true }, schema), { pipeIn: function (data) {
                if (!amisCore.isObject(data)) {
                    return [];
                }
                var arr = [];
                Object.keys(data).forEach(function (key) {
                    var value = data[key];
                    if (flatValue_1) {
                        arr.push({
                            _key: key || '',
                            _value: value
                        });
                    }
                    else if (typeof value === 'object') {
                        arr.push(tslib.__assign(tslib.__assign({}, value), { _key: key || '' }));
                    }
                });
                return arr;
            }, pipeOut: function (value) {
                if (!Array.isArray(value)) {
                    return value;
                }
                var obj = {};
                value.forEach(function (item) {
                    var _key = item._key, rest = tslib.__rest(item, ["_key"]);
                    _key = _key !== null && _key !== void 0 ? _key : '';
                    if (flatValue_1) {
                        if (schema.valueIsArray) {
                            obj[_key] = item['_value'] || [];
                        }
                        else {
                            obj[_key] = item['_value'] || {};
                        }
                        // 数组的时候初始化会生成 [{}]，还不确定是哪生成的，先修正为 []
                        if (isEqual__default["default"](obj[_key], [{}])) {
                            obj[_key] = [];
                        }
                    }
                    else {
                        if (schema.valueIsArray) {
                            obj[_key] = rest || [];
                        }
                        else {
                            obj[_key] = rest || {};
                        }
                    }
                });
                return obj;
            }, items: tslib.__spreadArray([
                tslib.__assign({ type: 'input-text', unique: true, name: '_key', required: true, validateOnChange: true }, keyItem)
            ], tslib.__read(valueItems), false) });
        return newSchema;
    }
    return schema;
});
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
