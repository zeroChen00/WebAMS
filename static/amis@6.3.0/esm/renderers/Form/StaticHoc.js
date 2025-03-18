/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __spreadArray, __read, __assign } from 'tslib';
import React from 'react';
import { getPropValue, ErrorBoundary } from 'amis-core';

function renderCommonStatic(props, defaultValue) {
    var type = props.type, render = props.render, staticSchema = props.staticSchema;
    var staticProps = __assign(__assign({}, props), staticSchema);
    switch (type) {
        case 'select':
        case 'checkboxes':
        case 'button-group-select':
        case 'input-tree':
        case 'tree-select':
        case 'nested-select':
        case 'cascader-select':
        case 'radios':
        case 'multi-select':
        case 'transfer':
        case 'transfer-picker':
        case 'tabs-transfer':
        case 'tabs-transfer-picker':
        case 'picker':
            return render('static-select', { type: 'words' }, staticProps);
        case 'input-date':
        case 'input-datetime':
        case 'input-time':
        case 'input-month':
        case 'input-quarter':
        case 'input-year':
            return renderStaticDateTypes(staticProps);
        case 'input-date-range':
        case 'input-datetime-range':
        case 'input-time-range':
        case 'input-month-range':
        case 'input-quarter-range':
        case 'input-year-range':
            return render('static-input-date-range', { type: 'date-range' }, __assign(__assign(__assign({}, props), { valueFormat: props.format, format: props.inputFormat }), staticSchema));
        case 'input-password':
            return render('static-input-password', { type: 'password' }, staticProps);
        case 'input-color':
            return render('static-color', { type: 'color' }, staticProps);
        case 'input-tag':
            return render('static-input-tag', { type: 'tags' }, staticProps);
        case 'input-url':
            return render('static-input-url', { type: 'link', href: defaultValue }, staticProps);
        case 'input-number':
            return render('static-input-number', { type: 'number' }, __assign(__assign({}, props), staticSchema));
        default:
            return defaultValue;
    }
}
/**
 * 表单项类成员render支持静态展示装饰器
 */
function supportStatic() {
    return function (target, name, descriptor) {
        var original = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var props = this.props;
            if (props.static) {
                var render = props.render, staticSchema = props.staticSchema, ns = props.classPrefix, cx = props.classnames, className = props.className, placeholder = props.placeholder, _a = props.staticPlaceholder, staticPlaceholder = _a === void 0 ? (React.createElement("span", { className: "text-muted" }, placeholder || '-')) : _a;
                var body = void 0;
                var displayValue = getPropValue(props);
                var isValueEmpty = displayValue == null || displayValue === '';
                if (staticSchema &&
                    (staticSchema.type ||
                        Array.isArray(staticSchema) ||
                        typeof staticSchema === 'string' ||
                        typeof staticSchema === 'number')) {
                    // 有自定义schema 且schema有type 时，展示schema
                    body = render('form-static-schema', staticSchema, props);
                }
                else if (target.renderStatic) {
                    // 特殊组件，control有 renderStatic 时，特殊处理
                    body = target.renderStatic.apply(this, __spreadArray(__spreadArray([], __read(args), false), [
                        isValueEmpty ? staticPlaceholder : displayValue
                    ], false));
                }
                else if (isValueEmpty) {
                    // 空值时，展示 staticPlaceholder
                    body = staticPlaceholder;
                }
                else {
                    // 可复用组件 统一处理
                    body = renderCommonStatic(props, displayValue);
                }
                return (React.createElement(ErrorBoundary, { customErrorMsg: "\u62E6\u622A\u5230".concat(props.$schema.type, "\u6E32\u67D3\u9519\u8BEF"), fallback: function () {
                        var _a;
                        return (React.createElement("div", { className: "renderer-error-boundary" }, (_a = props.$schema) === null || _a === void 0 ? void 0 :
                            _a.type,
                            "\u6E32\u67D3\u53D1\u751F\u9519\u8BEF\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u8F93\u51FA\u3002"));
                    } },
                    React.createElement("div", { className: cx("".concat(ns, "Form-static"), className) }, body)));
            }
            return original.apply(this, args);
        };
        return descriptor;
    };
}
function renderStaticDateTypes(props) {
    var render = props.render, type = props.type, inputFormat = props.inputFormat, valueFormat = props.valueFormat, timeFormat = props.timeFormat, displayFormat = props.displayFormat, format = props.format, value = props.value;
    return render('static-input-date', {
        type: 'date',
        value: value,
        format: type === 'time' && timeFormat ? timeFormat : displayFormat !== null && displayFormat !== void 0 ? displayFormat : inputFormat,
        valueFormat: valueFormat || format
    });
}

export { supportStatic };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
