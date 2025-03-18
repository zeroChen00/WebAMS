/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __read, __assign } from 'tslib';
import React from 'react';
import { TableBody } from './TableBody.js';
import { observer } from 'mobx-react';
import ItemActionsWrapper from './ItemActionsWrapper.js';
import { Icon } from 'amis-ui';
import ColGroup from './ColGroup.js';

function renderItemActions(props) {
    var itemActions = props.itemActions, render = props.render, store = props.store, cx = props.classnames;
    if (!store.hoverRow) {
        return null;
    }
    var finalActions = Array.isArray(itemActions)
        ? itemActions.filter(function (action) { return !action.hiddenOnHover; })
        : [];
    if (!finalActions.length) {
        return null;
    }
    return (React.createElement(ItemActionsWrapper, { store: store, classnames: cx },
        React.createElement("div", { className: cx('Table-itemActions') }, finalActions.map(function (action, index) {
            return render("itemAction/".concat(index), __assign(__assign({}, action), { isMenuItem: true }), {
                key: index,
                item: store.hoverRow,
                data: store.hoverRow.locals,
                rowIndex: store.hoverRow.index
            });
        }))));
}
var TableContent = /** @class */ (function (_super) {
    __extends(TableContent, _super);
    function TableContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableContent.prototype.render = function () {
        var _a = this.props, placeholder = _a.placeholder, cx = _a.classnames, render = _a.render, className = _a.className, columns = _a.columns, columnsGroup = _a.columnsGroup, onMouseMove = _a.onMouseMove, onScroll = _a.onScroll, tableRef = _a.tableRef, rows = _a.rows, renderHeadCell = _a.renderHeadCell, renderCell = _a.renderCell, onCheck = _a.onCheck, onRowClick = _a.onRowClick, onRowDbClick = _a.onRowDbClick, onRowMouseEnter = _a.onRowMouseEnter, onRowMouseLeave = _a.onRowMouseLeave, rowClassName = _a.rowClassName, onQuickChange = _a.onQuickChange, footable = _a.footable, footableColumns = _a.footableColumns, checkOnItemClick = _a.checkOnItemClick, buildItemProps = _a.buildItemProps, onAction = _a.onAction, rowClassNameExpr = _a.rowClassNameExpr, affixRowClassName = _a.affixRowClassName, prefixRowClassName = _a.prefixRowClassName, data = _a.data, prefixRow = _a.prefixRow, locale = _a.locale, translate = _a.translate, itemAction = _a.itemAction, affixRow = _a.affixRow, store = _a.store, dispatchEvent = _a.dispatchEvent, onEvent = _a.onEvent, loading = _a.loading, testIdBuilder = _a.testIdBuilder, children = _a.children;
        var tableClassName = cx('Table-table', this.props.tableClassName);
        var hideHeader = columns.every(function (column) { return !column.label; });
        return (React.createElement("div", { onMouseMove: onMouseMove, className: cx('Table-content', className), onScroll: onScroll },
            React.createElement("table", { ref: tableRef, className: cx(tableClassName, store.tableLayout === 'fixed' ? 'is-layout-fixed' : undefined) },
                React.createElement(ColGroup, { columns: columns, store: store }),
                React.createElement("thead", null,
                    columnsGroup.length ? (React.createElement("tr", null, columnsGroup.map(function (item, index) {
                        var _a = __read(store.getStickyStyles(item, columnsGroup), 2), stickyStyle = _a[0], stickyClassName = _a[1];
                        /**
                         * 勾选列和展开列的表头单独成列
                         * 如果分组列只有一个元素且未分组时，也要执行表头合并
                         */
                        return !!~['__checkme', '__expandme'].indexOf(item.has[0].type) ||
                            (item.has.length === 1 &&
                                !/^__/.test(item.has[0].type) &&
                                !item.has[0].groupName) ? (renderHeadCell(item.has[0], {
                            'data-index': item.has[0].index,
                            'key': index,
                            'colSpan': item.colSpan,
                            'rowSpan': item.rowSpan,
                            'style': stickyStyle,
                            'className': stickyClassName
                        })) : (React.createElement("th", { key: index, "data-index": item.index, colSpan: item.colSpan, rowSpan: item.rowSpan, style: stickyStyle, className: stickyClassName }, item.label ? render('tpl', item.label) : null));
                    }))) : null,
                    React.createElement("tr", { className: hideHeader ? 'fake-hide' : '' }, columns.map(function (column) {
                        var _a;
                        return ((_a = columnsGroup.find(function (group) { return ~group.has.indexOf(column); })) === null || _a === void 0 ? void 0 : _a.rowSpan) === 2
                            ? null
                            : renderHeadCell(column, {
                                'data-index': column.index,
                                'key': column.index
                            });
                    }))),
                !rows.length ? (React.createElement("tbody", null,
                    React.createElement("tr", { className: cx('Table-placeholder') }, !loading ? (React.createElement("td", { colSpan: columns.length }, typeof placeholder === 'string' ? (React.createElement(React.Fragment, null,
                        React.createElement(Icon, { icon: "desk-empty", className: cx('Table-placeholder-empty-icon', 'icon') }),
                        translate(placeholder || 'placeholder.noData'))) : (render('placeholder', translate(placeholder || 'placeholder.noData'))))) : null))) : (React.createElement(TableBody, { store: store, itemAction: itemAction, classnames: cx, render: render, renderCell: renderCell, onCheck: onCheck, onRowClick: onRowClick, onRowDbClick: onRowDbClick, onRowMouseEnter: onRowMouseEnter, onRowMouseLeave: onRowMouseLeave, onQuickChange: onQuickChange, footable: footable, footableColumns: footableColumns, checkOnItemClick: checkOnItemClick, buildItemProps: buildItemProps, onAction: onAction, rowClassNameExpr: rowClassNameExpr, rowClassName: rowClassName, prefixRowClassName: prefixRowClassName, affixRowClassName: affixRowClassName, rows: rows, columns: columns, locale: locale, translate: translate, prefixRow: prefixRow, affixRow: affixRow, data: data, testIdBuilder: testIdBuilder, rowsProps: {
                        dispatchEvent: dispatchEvent,
                        onEvent: onEvent
                    } }))),
            children));
    };
    return TableContent;
}(React.PureComponent));
var TableContent$1 = observer(function (props) {
    var store = props.store;
    // 分析 table/index.tsx 中的 renderHeadCell 依赖了以下属性
    // store.someChecked;
    // store.allChecked;
    // store.isSelectionThresholdReached;
    // store.allExpanded;
    // store.orderBy
    // store.orderDir
    return (React.createElement(TableContent, __assign({}, props, { columnWidthReady: store.columnWidthReady, someChecked: store.someChecked, allChecked: store.allChecked, isSelectionThresholdReached: store.isSelectionThresholdReached, orderBy: store.orderBy, orderDir: store.orderDir })));
});

export { TableContent, TableContent$1 as default, renderItemActions };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
