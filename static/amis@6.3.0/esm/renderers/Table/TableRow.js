/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __rest, __assign, __decorate, __metadata } from 'tslib';
import { observer } from 'mobx-react';
import React from 'react';
import { isClickOnInput, setVariable, autobind } from 'amis-core';
import { Action } from '../Action.js';
import { useInView } from 'react-intersection-observer';

var TableRow = /** @class */ (function (_super) {
    __extends(TableRow, _super);
    function TableRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableRow.prototype.handleMouseEnter = function (e) {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, onRowMouseEnter = _a.onRowMouseEnter;
        onRowMouseEnter === null || onRowMouseEnter === void 0 ? void 0 : onRowMouseEnter(item, itemIndex);
    };
    TableRow.prototype.handleMouseLeave = function (e) {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, onRowMouseLeave = _a.onRowMouseLeave;
        onRowMouseLeave === null || onRowMouseLeave === void 0 ? void 0 : onRowMouseLeave(item, itemIndex);
    };
    // 定义点击一行的行为，通过 itemAction配置
    TableRow.prototype.handleItemClick = function (e) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var shiftKey, _b, itemAction, onAction, item, itemIndex, onCheck, onRowClick, checkOnItemClick, rendererEvent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (isClickOnInput(e)) {
                            return [2 /*return*/];
                        }
                        shiftKey = (_a = e.nativeEvent) === null || _a === void 0 ? void 0 : _a.shiftKey;
                        e.preventDefault();
                        e.stopPropagation();
                        _b = this.props, itemAction = _b.itemAction, onAction = _b.onAction, item = _b.item, itemIndex = _b.itemIndex, onCheck = _b.onCheck, onRowClick = _b.onRowClick, checkOnItemClick = _b.checkOnItemClick;
                        return [4 /*yield*/, (onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(item, itemIndex))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (itemAction) {
                            onAction && onAction(e, itemAction, item === null || item === void 0 ? void 0 : item.locals);
                            // item.toggle();
                        }
                        else {
                            if (item.checkable && item.isCheckAvaiableOnClick && checkOnItemClick) {
                                onCheck === null || onCheck === void 0 ? void 0 : onCheck(item, !item.checked, shiftKey);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TableRow.prototype.handleDbClick = function (e) {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, onRowDbClick = _a.onRowDbClick;
        onRowDbClick === null || onRowDbClick === void 0 ? void 0 : onRowDbClick(item, itemIndex);
    };
    TableRow.prototype.handleAction = function (e, action, ctx) {
        var _a = this.props, onAction = _a.onAction, item = _a.item;
        onAction && onAction(e, action, ctx || item.locals);
    };
    TableRow.prototype.handleQuickChange = function (values, saveImmediately, savePristine, options) {
        var _a = this.props, onQuickChange = _a.onQuickChange, item = _a.item;
        onQuickChange &&
            onQuickChange(item, values, saveImmediately, savePristine, options);
    };
    TableRow.prototype.handleChange = function (value, name, submit, changePristine) {
        if (!name || typeof name !== 'string') {
            return;
        }
        var _a = this.props, item = _a.item, onQuickChange = _a.onQuickChange;
        var data = {};
        setVariable(data, name, value);
        onQuickChange === null || onQuickChange === void 0 ? void 0 : onQuickChange(item, data, submit, changePristine);
    };
    TableRow.prototype.render = function () {
        var _a, _b;
        var _this = this;
        var _c;
        var _d = this.props, itemClassName = _d.itemClassName, itemIndex = _d.itemIndex, item = _d.item, columns = _d.columns, renderCell = _d.renderCell; _d.children; var footableMode = _d.footableMode, ignoreFootableContent = _d.ignoreFootableContent, footableColSpan = _d.footableColSpan, regionPrefix = _d.regionPrefix, checkOnItemClick = _d.checkOnItemClick; _d.classPrefix; var render = _d.render, cx = _d.classnames, parent = _d.parent, itemAction = _d.itemAction, onEvent = _d.onEvent, expanded = _d.expanded; _d.parentExpanded; var id = _d.id, newIndex = _d.newIndex, isHover = _d.isHover, checked = _d.checked, modified = _d.modified, moved = _d.moved, depth = _d.depth, expandable = _d.expandable, appeard = _d.appeard; _d.checkdisable; var trRef = _d.trRef; _d.isNested; var testIdBuilder = _d.testIdBuilder, rowPath = _d.rowPath, rest = __rest(_d, ["itemClassName", "itemIndex", "item", "columns", "renderCell", "children", "footableMode", "ignoreFootableContent", "footableColSpan", "regionPrefix", "checkOnItemClick", "classPrefix", "render", "classnames", "parent", "itemAction", "onEvent", "expanded", "parentExpanded", "id", "newIndex", "isHover", "checked", "modified", "moved", "depth", "expandable", "appeard", "checkdisable", "trRef", "isNested", "testIdBuilder", "rowPath"]);
        if (footableMode) {
            if (!expanded) {
                return null;
            }
            return (React.createElement("tr", { ref: trRef, "data-id": id, "data-index": newIndex, onClick: checkOnItemClick || itemAction || (onEvent === null || onEvent === void 0 ? void 0 : onEvent.rowClick)
                    ? this.handleItemClick
                    : undefined, onDoubleClick: this.handleDbClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, className: cx('Table-table-tr', itemClassName, (_a = {
                        'is-hovered': isHover,
                        'is-checked': checked,
                        'is-modified': modified,
                        'is-moved': moved
                    },
                    _a["Table-tr--hasItemAction"] = itemAction,
                    _a["Table-tr--odd"] = itemIndex % 2 === 0,
                    _a["Table-tr--even"] = itemIndex % 2 === 1,
                    _a)) },
                React.createElement("td", { className: cx("Table-foot"), colSpan: footableColSpan },
                    React.createElement("table", { className: cx("Table-footTable") },
                        React.createElement("tbody", null, ignoreFootableContent
                            ? columns.map(function (column) { return (React.createElement("tr", { key: column.index },
                                column.label !== false ? React.createElement("th", null) : null,
                                React.createElement("td", null))); })
                            : columns.map(function (column) { return (React.createElement("tr", { key: column.index },
                                column.label !== false ? (React.createElement("th", null, render("".concat(regionPrefix).concat(itemIndex, "/").concat(column.index, "/tpl"), column.label))) : null,
                                appeard ? (renderCell("".concat(regionPrefix).concat(itemIndex, "/").concat(column.index), column, item, __assign(__assign({}, rest), { width: null, rowIndex: itemIndex, rowIndexPath: item.path, colIndex: column.index, rowPath: rowPath, key: column.index, onAction: _this.handleAction, onQuickChange: _this.handleQuickChange, onChange: _this.handleChange }))) : (React.createElement("td", { key: column.index },
                                    React.createElement("div", { className: cx('Table-emptyBlock') }, "\u00A0"))))); }))))));
        }
        if (parent && !parent.expanded) {
            return null;
        }
        return (React.createElement("tr", __assign({ ref: trRef, onClick: checkOnItemClick || itemAction || (onEvent === null || onEvent === void 0 ? void 0 : onEvent.rowClick)
                ? this.handleItemClick
                : undefined, onDoubleClick: this.handleDbClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, "data-index": depth === 1 ? newIndex : undefined, "data-id": id, className: cx('Table-table-tr', itemClassName, (_b = {
                    'is-hovered': isHover,
                    'is-checked': checked,
                    'is-modified': modified,
                    'is-moved': moved,
                    'is-expanded': expanded && expandable,
                    'is-expandable': expandable
                },
                _b["Table-tr--hasItemAction"] = itemAction,
                _b["Table-tr--odd"] = itemIndex % 2 === 0,
                _b["Table-tr--even"] = itemIndex % 2 === 1,
                _b), "Table-tr--".concat(depth, "th")) }, (_c = testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder(rowPath)) === null || _c === void 0 ? void 0 : _c.getTestId()), columns.map(function (column) {
            return appeard ? (renderCell("".concat(itemIndex, "/").concat(column.index), column, item, __assign(__assign({}, rest), { rowIndex: itemIndex, colIndex: column.index, rowIndexPath: item.path, rowPath: rowPath, key: column.id, onAction: _this.handleAction, onQuickChange: _this.handleQuickChange, onChange: _this.handleChange }))) : column.name && item.rowSpans[column.name] === 0 ? null : (React.createElement("td", { key: column.id },
                React.createElement("div", { className: cx('Table-emptyBlock') }, "\u00A0")));
        })));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleMouseLeave", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TableRow.prototype, "handleItemClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleDbClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Action, Object]),
        __metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleAction", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Boolean, Boolean, Object]),
        __metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleQuickChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Boolean, Boolean]),
        __metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleChange", null);
    return TableRow;
}(React.PureComponent));
// 换成 mobx-react-lite 模式
var TableRow$1 = observer(function (props) {
    var item = props.item;
    var parent = props.parent;
    var store = props.store;
    var columns = props.columns;
    var canAccessSuperData = store.canAccessSuperData ||
        columns.some(function (item) { return item.pristine.canAccessSuperData; });
    var _a = useInView({
        threshold: 0,
        onChange: item.markAppeared,
        skip: !item.lazyRender
    }), ref = _a.ref, inView = _a.inView;
    return (React.createElement(TableRow, __assign({}, props, { trRef: ref, expanded: item.expanded, parentExpanded: parent === null || parent === void 0 ? void 0 : parent.expanded, id: item.id, newIndex: item.newIndex, isHover: item.isHover, partial: item.partial, checked: item.checked, modified: item.modified, moved: item.moved, depth: item.depth, expandable: item.expandable, checkdisable: item.checkdisable, loading: item.loading, error: item.error, 
        // data 在 TableRow 里面没有使用，这里写上是为了当列数据变化的时候 TableRow 重新渲染，
        // 不是 item.locals 的原因是 item.locals 会变化多次，比如父级上下文变化也会进来，但是 item.data 只会变化一次。
        data: canAccessSuperData ? item.locals : item.data, appeard: item.lazyRender ? item.appeared || inView : true, isNested: store.isNested })));
});

export { TableRow, TableRow$1 as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
