/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __spreadArray, __read, __decorate } from 'tslib';
import React from 'react';
import { isPureVariable, resolveVariableAndFilter, ColorScale, Renderer } from 'amis-core';
import { HocQuickEdit } from '../QuickEdit.js';
import { HocCopyable } from '../Copyable.js';
import { HocPopOver } from '../PopOver.js';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import { Badge } from 'amis-ui';

var TableCell = /** @class */ (function (_super) {
    __extends(TableCell, _super);
    function TableCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propsNeedRemove = [];
        return _this;
    }
    TableCell.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className; _a.classNameExpr; var render = _a.render, _b = _a.style, style = _b === void 0 ? {} : _b, Component = _a.wrapperComponent, contentsOnly = _a.contentsOnly, column = _a.column, value = _a.value, data = _a.data, children = _a.children, width = _a.width, align = _a.align, innerClassName = _a.innerClassName; _a.label; var tabIndex = _a.tabIndex, onKeyUp = _a.onKeyUp, rowSpan = _a.rowSpan; _a.body; _a.tpl; _a.remark; var cellPrefix = _a.cellPrefix, cellAffix = _a.cellAffix, isHead = _a.isHead; _a.colIndex; var row = _a.row, showBadge = _a.showBadge, itemBadge = _a.itemBadge, testIdBuilder = _a.testIdBuilder, rest = __rest(_a, ["classnames", "className", "classNameExpr", "render", "style", "wrapperComponent", "contentsOnly", "column", "value", "data", "children", "width", "align", "innerClassName", "label", "tabIndex", "onKeyUp", "rowSpan", "body", "tpl", "remark", "cellPrefix", "cellAffix", "isHead", "colIndex", "row", "showBadge", "itemBadge", "testIdBuilder"]);
        if (isHead) {
            Component = 'th';
        }
        else {
            Component = Component || 'td';
        }
        var isTableCell = Component === 'td' || Component === 'th';
        var schema = __assign(__assign({}, column), { style: column.innerStyle, className: innerClassName, type: (column && column.type) || 'plain' });
        // 如果本来就是 type 为 button，不要删除，其他情况下都应该删除。
        if (schema.type !== 'button' && schema.type !== 'dropdown-button') {
            delete schema.label;
        }
        var body = children
            ? children
            : render('field', schema, __assign(__assign({}, omit(rest, Object.keys(schema), this.propsNeedRemove)), { 
                // inputOnly 属性不能传递给子组件，在 SchemaRenderer.renderChild 中处理掉了
                inputOnly: true, value: value, data: data }));
        if (isTableCell) {
            // table Cell 会用 colGroup 来设置宽度，这里不需要再设置
            // 同时剔除style中的定位相关样式，避免表格样式异常
            style = omit(style, ['width', 'position', 'display']);
        }
        else if (width) {
            style = __assign(__assign({}, style), { width: (style && style.width) || width });
        }
        if (align) {
            style = __assign(__assign({}, style), { textAlign: align });
        }
        if (column.backgroundScale) {
            var backgroundScale = column.backgroundScale;
            var min = backgroundScale.min;
            var max = backgroundScale.max;
            if (isPureVariable(min)) {
                min = resolveVariableAndFilter(min, data, '| raw');
            }
            if (isPureVariable(max)) {
                max = resolveVariableAndFilter(max, data, '| raw');
            }
            if (typeof min === 'undefined') {
                min = Math.min.apply(Math, __spreadArray([], __read(data.rows.map(function (r) { return r[column.name]; })), false));
            }
            if (typeof max === 'undefined') {
                max = Math.max.apply(Math, __spreadArray([], __read(data.rows.map(function (r) { return r[column.name]; })), false));
            }
            var colorScale = new ColorScale(min, max, backgroundScale.colors || ['#FFEF9C', '#FF7127']);
            var value_1 = data[column.name];
            if (isPureVariable(backgroundScale.source)) {
                value_1 = resolveVariableAndFilter(backgroundScale.source, data, '| raw');
            }
            var color = colorScale.getColor(Number(value_1)).toHexString();
            style.background = color;
        }
        if (contentsOnly) {
            return body;
        }
        return (React.createElement(Component, __assign({ rowSpan: rowSpan > 1 ? rowSpan : undefined, style: style, className: cx(className), tabIndex: tabIndex, onKeyUp: onKeyUp }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('cell').getTestId()),
            showBadge ? (React.createElement(Badge, { classnames: cx, badge: __assign(__assign({}, itemBadge), { className: cx("Table-badge", itemBadge === null || itemBadge === void 0 ? void 0 : itemBadge.className) }), data: row.data })) : null,
            cellPrefix,
            body,
            cellAffix));
    };
    TableCell.defaultProps = {
        wrapperComponent: 'td'
    };
    TableCell.propsList = [
        'type',
        'label',
        'column',
        'body',
        'tpl',
        'rowSpan',
        'remark',
        'contentsOnly'
    ];
    return TableCell;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TableCellRenderer, _super);
    function TableCellRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableCellRenderer.propsList = __spreadArray([
        'quickEdit',
        'quickEditEnabledOn',
        'popOver',
        'copyable',
        'inline'
    ], __read(TableCell.propsList), false);
    TableCellRenderer = __decorate([
        Renderer({
            test: /(^|\/)table\/(?:.*\/)?cell$/,
            name: 'table-cell'
        }),
        HocQuickEdit(),
        HocPopOver({
            targetOutter: true
        }),
        HocCopyable(),
        observer
    ], TableCellRenderer);
    return TableCellRenderer;
})(TableCell));
/** @class */ ((function (_super) {
    __extends(FieldRenderer, _super);
    function FieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldRenderer.defaultProps = __assign(__assign({}, TableCell.defaultProps), { wrapperComponent: 'div' });
    FieldRenderer = __decorate([
        Renderer({
            type: 'field',
            name: 'field'
        }),
        HocPopOver(),
        HocCopyable()
    ], FieldRenderer);
    return FieldRenderer;
})(TableCell));

export { TableCell };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
