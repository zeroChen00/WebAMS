/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');
var QuickEdit = require('../QuickEdit.js');
var Copyable = require('../Copyable.js');
var PopOver = require('../PopOver.js');
var mobxReact = require('mobx-react');
var omit = require('lodash/omit');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var TableCell = /** @class */ (function (_super) {
    tslib.__extends(TableCell, _super);
    function TableCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propsNeedRemove = [];
        return _this;
    }
    TableCell.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className; _a.classNameExpr; var render = _a.render, _b = _a.style, style = _b === void 0 ? {} : _b, Component = _a.wrapperComponent, contentsOnly = _a.contentsOnly, column = _a.column, value = _a.value, data = _a.data, children = _a.children, width = _a.width, align = _a.align, innerClassName = _a.innerClassName; _a.label; var tabIndex = _a.tabIndex, onKeyUp = _a.onKeyUp, rowSpan = _a.rowSpan; _a.body; _a.tpl; _a.remark; var cellPrefix = _a.cellPrefix, cellAffix = _a.cellAffix, isHead = _a.isHead; _a.colIndex; var row = _a.row, showBadge = _a.showBadge, itemBadge = _a.itemBadge, testIdBuilder = _a.testIdBuilder, rest = tslib.__rest(_a, ["classnames", "className", "classNameExpr", "render", "style", "wrapperComponent", "contentsOnly", "column", "value", "data", "children", "width", "align", "innerClassName", "label", "tabIndex", "onKeyUp", "rowSpan", "body", "tpl", "remark", "cellPrefix", "cellAffix", "isHead", "colIndex", "row", "showBadge", "itemBadge", "testIdBuilder"]);
        if (isHead) {
            Component = 'th';
        }
        else {
            Component = Component || 'td';
        }
        var isTableCell = Component === 'td' || Component === 'th';
        var schema = tslib.__assign(tslib.__assign({}, column), { style: column.innerStyle, className: innerClassName, type: (column && column.type) || 'plain' });
        // 如果本来就是 type 为 button，不要删除，其他情况下都应该删除。
        if (schema.type !== 'button' && schema.type !== 'dropdown-button') {
            delete schema.label;
        }
        var body = children
            ? children
            : render('field', schema, tslib.__assign(tslib.__assign({}, omit__default["default"](rest, Object.keys(schema), this.propsNeedRemove)), { 
                // inputOnly 属性不能传递给子组件，在 SchemaRenderer.renderChild 中处理掉了
                inputOnly: true, value: value, data: data }));
        if (isTableCell) {
            // table Cell 会用 colGroup 来设置宽度，这里不需要再设置
            // 同时剔除style中的定位相关样式，避免表格样式异常
            style = omit__default["default"](style, ['width', 'position', 'display']);
        }
        else if (width) {
            style = tslib.__assign(tslib.__assign({}, style), { width: (style && style.width) || width });
        }
        if (align) {
            style = tslib.__assign(tslib.__assign({}, style), { textAlign: align });
        }
        if (column.backgroundScale) {
            var backgroundScale = column.backgroundScale;
            var min = backgroundScale.min;
            var max = backgroundScale.max;
            if (amisCore.isPureVariable(min)) {
                min = amisCore.resolveVariableAndFilter(min, data, '| raw');
            }
            if (amisCore.isPureVariable(max)) {
                max = amisCore.resolveVariableAndFilter(max, data, '| raw');
            }
            if (typeof min === 'undefined') {
                min = Math.min.apply(Math, tslib.__spreadArray([], tslib.__read(data.rows.map(function (r) { return r[column.name]; })), false));
            }
            if (typeof max === 'undefined') {
                max = Math.max.apply(Math, tslib.__spreadArray([], tslib.__read(data.rows.map(function (r) { return r[column.name]; })), false));
            }
            var colorScale = new amisCore.ColorScale(min, max, backgroundScale.colors || ['#FFEF9C', '#FF7127']);
            var value_1 = data[column.name];
            if (amisCore.isPureVariable(backgroundScale.source)) {
                value_1 = amisCore.resolveVariableAndFilter(backgroundScale.source, data, '| raw');
            }
            var color = colorScale.getColor(Number(value_1)).toHexString();
            style.background = color;
        }
        if (contentsOnly) {
            return body;
        }
        return (_J$X_(Component, tslib.__assign({ rowSpan: rowSpan > 1 ? rowSpan : undefined, style: style, className: cx(className), tabIndex: tabIndex, onKeyUp: onKeyUp }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('cell').getTestId()),
            showBadge ? (_J$X_(amisUi.Badge, { classnames: cx, badge: tslib.__assign(tslib.__assign({}, itemBadge), { className: cx("Table-badge", itemBadge === null || itemBadge === void 0 ? void 0 : itemBadge.className) }), data: row.data })) : null,
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
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(TableCellRenderer, _super);
    function TableCellRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableCellRenderer.propsList = tslib.__spreadArray([
        'quickEdit',
        'quickEditEnabledOn',
        'popOver',
        'copyable',
        'inline'
    ], tslib.__read(TableCell.propsList), false);
    TableCellRenderer = tslib.__decorate([
        amisCore.Renderer({
            test: /(^|\/)table\/(?:.*\/)?cell$/,
            name: 'table-cell'
        }),
        QuickEdit.HocQuickEdit(),
        PopOver.HocPopOver({
            targetOutter: true
        }),
        Copyable.HocCopyable(),
        mobxReact.observer
    ], TableCellRenderer);
    return TableCellRenderer;
})(TableCell));
/** @class */ ((function (_super) {
    tslib.__extends(FieldRenderer, _super);
    function FieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldRenderer.defaultProps = tslib.__assign(tslib.__assign({}, TableCell.defaultProps), { wrapperComponent: 'div' });
    FieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'field',
            name: 'field'
        }),
        PopOver.HocPopOver(),
        Copyable.HocCopyable()
    ], FieldRenderer);
    return FieldRenderer;
})(TableCell));

exports.TableCell = TableCell;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
