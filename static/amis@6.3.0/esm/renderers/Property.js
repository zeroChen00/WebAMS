/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __values, __decorate } from 'tslib';
import React from 'react';
import { visibilityFilter, buildStyle, Renderer } from 'amis-core';

/**
 * @file 表格的方式显示只读信息，比如产品详情
 */
var Property = /** @class */ (function (_super) {
    __extends(Property, _super);
    function Property(props) {
        return _super.call(this, props) || this;
    }
    /**
     * 算好每行的分布情况，方便后续渲染
     */
    Property.prototype.prepareRows = function () {
        var e_1, _a;
        var _b = this.props, _c = _b.column, column = _c === void 0 ? 3 : _c, items = _b.items, source = _b.source, data = _b.data;
        var propertyItems = items ? items : source || [];
        var rows = [];
        var row = [];
        var columnLeft = column;
        var index = 0;
        var filteredItems = visibilityFilter(propertyItems, data);
        try {
            for (var filteredItems_1 = __values(filteredItems), filteredItems_1_1 = filteredItems_1.next(); !filteredItems_1_1.done; filteredItems_1_1 = filteredItems_1.next()) {
                var item = filteredItems_1_1.value;
                index = index + 1;
                var span = Math.min(item.span || 1, column);
                columnLeft = columnLeft - span;
                var rowItem = {
                    label: item.label,
                    content: item.content,
                    span: span
                };
                // 如果还能放得下就放这一行
                if (columnLeft >= 0) {
                    row.push(rowItem);
                }
                else {
                    rows.push(row);
                    columnLeft = column - span;
                    row = [rowItem];
                }
                // 最后一行将最后的数据 push
                if (index === filteredItems.length) {
                    rows.push(row);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (filteredItems_1_1 && !filteredItems_1_1.done && (_a = filteredItems_1.return)) _a.call(filteredItems_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return rows;
    };
    Property.prototype.renderRow = function (rows) {
        var _a = this.props, render = _a.render, contentStyle = _a.contentStyle, labelStyle = _a.labelStyle, _b = _a.separator, separator = _b === void 0 ? ': ' : _b, _c = _a.mode, mode = _c === void 0 ? 'table' : _c, data = _a.data;
        return rows.map(function (row, key) {
            return (React.createElement("tr", { key: key }, row.map(function (property, index) {
                return mode === 'table' ? (React.createElement(React.Fragment, { key: "item-".concat(index) },
                    React.createElement("th", { style: buildStyle(labelStyle, data) }, render('label', property.label)),
                    React.createElement("td", { colSpan: property.span + property.span - 1, style: buildStyle(contentStyle, data) }, render('content', property.content)))) : (React.createElement("td", { colSpan: property.span, style: buildStyle(contentStyle, data), key: "item-".concat(index) },
                    React.createElement("span", { style: buildStyle(labelStyle, data) }, render('label', property.label)),
                    separator,
                    render('content', property.content)));
            })));
        });
    };
    Property.prototype.render = function () {
        var _a = this.props, style = _a.style, title = _a.title, _b = _a.column, column = _b === void 0 ? 3 : _b, cx = _a.classnames, className = _a.className, titleStyle = _a.titleStyle, data = _a.data, _c = _a.mode, mode = _c === void 0 ? 'table' : _c;
        var rows = this.prepareRows();
        return (React.createElement("div", { className: cx('Property', "Property--".concat(mode), className), style: buildStyle(style, data) },
            React.createElement("table", null,
                title ? (React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", { colSpan: mode === 'table' ? column + column : column, style: buildStyle(titleStyle, data) }, title)))) : null,
                React.createElement("tbody", null, this.renderRow(rows)))));
    };
    return Property;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(PropertyRenderer, _super);
    function PropertyRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyRenderer = __decorate([
        Renderer({
            type: 'property',
            autoVar: true
        })
    ], PropertyRenderer);
    return PropertyRenderer;
})(Property));

export { Property as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
