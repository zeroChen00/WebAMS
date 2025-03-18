/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { getPropValue, resolveVariableAndFilter, isObject, isPureVariable, setThemeClassName, buildStyle, CustomStyle, Renderer, createObject } from 'amis-core';

function EachItem(props) {
    var render = props.render, data = props.data, items = props.items, item = props.item, name = props.name, index = props.index, itemKeyName = props.itemKeyName, indexKeyName = props.indexKeyName;
    var ctx = React.useMemo(function () {
        var _a, _b;
        return createObject(data, __assign(__assign({}, (isObject(item) ? __assign({ index: index }, item) : (_a = {}, _a[name] = item, _a))), (_b = {}, _b[itemKeyName || 'item'] = item, _b[indexKeyName || 'index'] = index, _b)));
    }, [item, data, name, index, itemKeyName, indexKeyName]);
    return render("item/".concat(index), items, {
        data: ctx
    });
}
var Each = /** @class */ (function (_super) {
    __extends(Each, _super);
    function Each() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Each.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, name = _a.name, className = _a.className, style = _a.style, render = _a.render, items = _a.items, itemKeyName = _a.itemKeyName, indexKeyName = _a.indexKeyName, placeholder = _a.placeholder, cx = _a.classnames, __ = _a.translate, env = _a.env, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, themeCss = _a.themeCss;
        var value = getPropValue(this.props, function (props) {
            return props.source
                ? resolveVariableAndFilter(props.source, props.data, '| raw')
                : undefined;
        });
        var arr = isObject(value)
            ? Object.keys(value).map(function (key) { return ({
                key: key,
                value: value[key]
            }); })
            : Array.isArray(value)
                ? value
                : [];
        // 最大循环次数支持
        var maxLength = isPureVariable(this.props.maxLength)
            ? resolveVariableAndFilter(this.props.maxLength, this.props.data) || 0
            : this.props.maxLength;
        if (Array.isArray(arr) && maxLength >= 1 && arr.length > maxLength) {
            arr = arr.slice(0, maxLength);
        }
        return (React.createElement("div", { className: cx('Each', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss }))), style: buildStyle(style, data) },
            Array.isArray(arr) && arr.length && items ? (arr.map(function (item, index) { return (React.createElement(EachItem, __assign({}, _this.props, { items: items, key: index, index: index, data: data, item: item, name: name, itemKeyName: itemKeyName, indexKeyName: indexKeyName }))); })) : (React.createElement("div", { className: cx('Each-placeholder') }, render('placeholder', __(placeholder)))),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    Each.propsList = ['name', 'items', 'value'];
    Each.defaultProps = {
        className: '',
        placeholder: 'placeholder.noData'
    };
    return Each;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(EachRenderer, _super);
    function EachRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EachRenderer = __decorate([
        Renderer({
            type: 'each'
        })
    ], EachRenderer);
    return EachRenderer;
})(Each));

export { Each as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
