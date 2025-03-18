/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __read, __assign } from 'tslib';
import { buildTrackExpression, evalTrackExpression } from 'amis-core';
import { Checkbox, Icon, Spinner } from 'amis-ui';
import React from 'react';

function Cell(_a) {
    var _b;
    var region = _a.region, column = _a.column, item = _a.item, props = _a.props, ignoreDrag = _a.ignoreDrag, render = _a.render, store = _a.store, multiple = _a.multiple, itemBadge = _a.itemBadge, cx = _a.classnames, ns = _a.classPrefix, canAccessSuperData = _a.canAccessSuperData, onCheck = _a.onCheck, onDragStart = _a.onDragStart, popOverContainer = _a.popOverContainer, quickEditFormRef = _a.quickEditFormRef, onImageEnlarge = _a.onImageEnlarge, __ = _a.translate, testIdBuilder = _a.testIdBuilder;
    if (column.name && item.rowSpans[column.name] === 0) {
        return null;
    }
    var _c = __read(React.useMemo(function () {
        var style = __assign({}, column.pristine.style);
        var _a = __read(store.getStickyStyles(column, store.filteredColumns), 2), stickyStyle = _a[0], stickyClassName = _a[1];
        return [Object.assign(style, stickyStyle), stickyClassName];
    }, []), 2), style = _c[0], stickyClassName = _c[1];
    var onCheckboxChange = React.useCallback(function () {
        onCheck === null || onCheck === void 0 ? void 0 : onCheck(item);
    }, []);
    if (column.type === '__checkme') {
        return (React.createElement("td", __assign({ style: style, className: cx(column.pristine.className, stickyClassName) }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getTestId()),
            React.createElement(Checkbox, { classPrefix: ns, type: multiple ? 'checkbox' : 'radio', partial: item.partial, checked: item.checked || item.partial, disabled: item.checkdisable || !item.checkable, onChange: onCheckboxChange, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('chekbx') })));
    }
    else if (column.type === '__dragme') {
        return (React.createElement("td", __assign({ style: style, className: cx(column.pristine.className, stickyClassName, {
                'is-dragDisabled': !item.draggable
            }) }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('drag').getTestId()), item.draggable ? React.createElement(Icon, { icon: "drag", className: "icon" }) : null));
    }
    else if (column.type === '__expandme') {
        return (React.createElement("td", { style: style, className: cx(column.pristine.className, stickyClassName) }, item.expandable ? (React.createElement("a", __assign({ className: cx('Table-expandBtn', item.expanded ? 'is-active' : ''), 
            // data-tooltip="展开/收起"
            // data-position="top"
            onClick: item.toggleExpanded }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild(item.expanded ? 'fold' : 'expand').getTestId()),
            React.createElement(Icon, { icon: "right-arrow-bold", className: "icon" }))) : null));
    }
    var _d = __read(React.useMemo(function () {
        var prefix = [];
        var affix = [];
        var addtionalClassName = '';
        if (column.isPrimary && store.isNested) {
            addtionalClassName = 'Table-primayCell';
            prefix.push(React.createElement("span", { key: "indent", className: cx('Table-indent'), style: item.indentStyle }));
            prefix.push(item.loading ? (React.createElement(Spinner, { key: "loading", size: "sm", show: true })) : item.error ? (React.createElement("a", __assign({ className: cx('Table-retryBtn'), key: "retryBtn", onClick: item.resetDefered, "data-tooltip": __('Options.retry', { reason: item.error }) }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('retry').getTestId()),
                React.createElement(Icon, { icon: "retry", className: "icon" }))) : item.expandable ? (React.createElement("a", __assign({ key: "expandBtn2", className: cx('Table-expandBtn2', item.expanded ? 'is-active' : ''), 
                // data-tooltip="展开/收起"
                // data-position="top"
                onClick: item.toggleExpanded }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild(item.expanded ? 'fold' : 'expand').getTestId()),
                React.createElement(Icon, { icon: "right-arrow-bold", className: "icon" }))) : (React.createElement("span", { key: "expandSpace", className: cx('Table-expandSpace') })));
        }
        if (!ignoreDrag &&
            column.isPrimary &&
            store.isNested &&
            store.draggable &&
            item.draggable) {
            affix.push(React.createElement("a", __assign({ key: "dragBtn", draggable: true, onDragStart: onDragStart, className: cx('Table-dragBtn') }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('drag').getTestId()),
                React.createElement(Icon, { icon: "drag", className: "icon" })));
        }
        return [prefix, affix, addtionalClassName];
    }, [
        item.expandable,
        item.expanded,
        item.error,
        item.loading,
        column.isPrimary,
        store.isNested
    ]), 3), prefix = _d[0], affix = _d[1], addtionalClassName = _d[2];
    // 根据条件缓存 data，避免孩子重复渲染
    var hasCustomTrackExpression = typeof column.pristine.trackExpression !== 'undefined';
    var trackExpression = hasCustomTrackExpression
        ? column.pristine.trackExpression
        : React.useMemo(function () { return buildTrackExpression(column.pristine); }, []);
    var data = React.useMemo(function () { return item.locals; }, [
        hasCustomTrackExpression ? '' : JSON.stringify(item.locals),
        evalTrackExpression(trackExpression, item.locals)
    ]);
    var finalCanAccessSuperData = (_b = column.pristine.canAccessSuperData) !== null && _b !== void 0 ? _b : canAccessSuperData;
    var subProps = __assign(__assign({}, props), { 
        // 操作列不下发loading，否则会导致操作栏里面的所有按钮都出现loading
        loading: column.type === 'operation' ? false : props.loading, btnDisabled: store.dragging, data: data, 
        // 不要下发 value，组件基本上都会自己取
        // 如果下发了表单项会认为是 controlled value
        // 就不会去跑 extraName 之类的逻辑了
        // value: column.name
        //   ? resolveVariable(
        //       column.name,
        //       finalCanAccessSuperData ? item.locals : item.data
        //     )
        //   : column.value,
        popOverContainer: popOverContainer, rowSpan: item.rowSpans[column.name], quickEditFormRef: quickEditFormRef, cellPrefix: prefix, cellAffix: affix, onImageEnlarge: onImageEnlarge, canAccessSuperData: finalCanAccessSuperData, row: item, itemBadge: itemBadge, showBadge: !props.isHead &&
            itemBadge &&
            store.firstToggledColumnIndex === props.colIndex, onQuery: undefined, style: style, className: cx(column.pristine.className, stickyClassName, addtionalClassName), testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild(column.name || column.value) });
    delete subProps.label;
    return render(region, __assign(__assign({}, column.pristine), { column: column.pristine, type: 'cell' }), subProps);
}

export { Cell as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
