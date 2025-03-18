/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate, __metadata } from 'tslib';
import React from 'react';
import { importLazyComponent, getPropValue, isPureVariable, resolveVariableAndFilter, autobind, Renderer } from 'amis-core';

var JsonView = React.lazy(function () {
    return import('react-json-view').then(importLazyComponent);
});
var JSONField = /** @class */ (function (_super) {
    __extends(JSONField, _super);
    function JSONField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONField.prototype.emitChange = function (e) {
        var _a = this.props, onChange = _a.onChange, name = _a.name;
        if (!name || !onChange) {
            return false;
        }
        onChange(e.updated_src, name);
        return true;
    };
    JSONField.prototype.shouldExpandNode = function (_a) {
        var namespace = _a.namespace;
        var levelExpand = this.props.levelExpand;
        if (typeof levelExpand !== 'number') {
            return false;
        }
        return namespace.length > levelExpand;
    };
    JSONField.prototype.render = function () {
        var _a;
        var _b;
        var _c = this.props, className = _c.className, style = _c.style, jsonTheme = _c.jsonTheme, cx = _c.classnames, placeholder = _c.placeholder, source = _c.source; _c.levelExpand; var mutable = _c.mutable, displayDataTypes = _c.displayDataTypes, enableClipboard = _c.enableClipboard, iconStyle = _c.iconStyle, quotesOnKeys = _c.quotesOnKeys, sortKeys = _c.sortKeys, name = _c.name, ellipsisThreshold = _c.ellipsisThreshold;
        var value = getPropValue(this.props);
        var data = value;
        if (source !== undefined && isPureVariable(source)) {
            data = resolveVariableAndFilter(source, this.props.data, '| raw');
        }
        else if (typeof value === 'string') {
            // 尝试解析 json
            try {
                data = JSON.parse(value);
            }
            catch (e) { }
        }
        var jsonThemeValue = jsonTheme;
        if (isPureVariable(jsonTheme)) {
            jsonThemeValue = resolveVariableAndFilter(jsonTheme, this.props.data, '| raw');
        }
        // JsonView 只支持对象，所以不是对象格式需要转成对象格式。
        if (~['string', 'number', 'boolean'].indexOf(typeof data)) {
            data = (_a = {},
                _a[typeof data] = data,
                _a);
        }
        return (React.createElement("div", { className: cx('JsonField', className), style: style }, typeof data === 'undefined' || data === null ? (placeholder) : (React.createElement(React.Suspense, { fallback: React.createElement("div", null, "...") },
            React.createElement(JsonView, { name: false, src: data, theme: (_b = jsonThemeValue) !== null && _b !== void 0 ? _b : 'rjv-default', shouldCollapse: this.shouldExpandNode, enableClipboard: enableClipboard, displayDataTypes: displayDataTypes, collapseStringsAfterLength: ellipsisThreshold, iconStyle: iconStyle, quotesOnKeys: quotesOnKeys, sortKeys: sortKeys, onEdit: name && mutable ? this.emitChange : false, onDelete: name && mutable ? this.emitChange : false, onAdd: name && mutable ? this.emitChange : false })))));
    };
    JSONField.defaultProps = {
        placeholder: '-',
        levelExpand: 1,
        source: '',
        displayDataTypes: false,
        enableClipboard: false,
        iconStyle: 'square',
        quotesOnKeys: true,
        sortKeys: false,
        ellipsisThreshold: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], JSONField.prototype, "emitChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], JSONField.prototype, "shouldExpandNode", null);
    return JSONField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(JSONFieldRenderer, _super);
    function JSONFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONFieldRenderer = __decorate([
        Renderer({
            type: 'json'
        })
    ], JSONFieldRenderer);
    return JSONFieldRenderer;
})(JSONField));

export { JSONField, JsonView };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
