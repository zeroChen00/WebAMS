/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __spreadArray, __read, __rest, __assign, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { reaction } from 'mobx';
import { isAlive } from 'mobx-state-tree';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import { getPropValue, resolveVariableAndFilter, evalExpression, changedEffect, anyChanged, isPureVariable, isArrayChildrenModified, isObject, filter, isEffectiveApi, normalizeApi, resolveVariable, difference, createObject, filterTarget, ScopedContext, autobind, evalExpressionWithConditionBuilder, Renderer, TableStore2 } from 'amis-core';
import { Table, Icon } from 'amis-ui';
import HeadCellSearchDropDown from './HeadCellSearchDropdown.js';
import './TableCell.js';
import './ColumnToggler.js';

var Table2 = /** @class */ (function (_super) {
    __extends(Table2, _super);
    function Table2(props, context) {
        var _this = _super.call(this, props) || this;
        _this.renderedToolbars = [];
        _this.subForms = {};
        _this.columns = [];
        _this.reactions = [];
        var scoped = context;
        scoped.registerComponent(_this);
        var store = props.store, columnsTogglable = props.columnsTogglable, columns = props.columns, rowSelection = props.rowSelection, keyField = props.keyField, primaryField = props.primaryField, canAccessSuperData = props.canAccessSuperData;
        store.update({
            columnsTogglable: columnsTogglable,
            columns: columns,
            canAccessSuperData: canAccessSuperData,
            rowSelectionKeyField: primaryField || (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.keyField) || keyField
        });
        Table2.syncRows(store, props, undefined) && _this.syncSelected();
        _this.columns = _this.buildColumns(store.filteredColumns, [], []);
        _this.rowSelection = _this.buildRowSelection();
        _this.expandable = _this.buildExpandable();
        _this.reactions.push(reaction(function () { return store.currentSelectedRowKeys.join(','); }, function () {
            _this.rowSelection = _this.buildRowSelection();
            _this.forceUpdate();
        }));
        _this.reactions.push(reaction(function () { return store.currentExpandedKeys.join(','); }, function () {
            _this.expandable = _this.buildExpandable();
            _this.forceUpdate();
        }));
        _this.reactions.push(reaction(function () { return store.filteredColumns; }, function () {
            _this.columns = _this.buildColumns(store.filteredColumns, [], []);
            _this.forceUpdate();
        }));
        return _this;
    }
    Table2.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
        this.reactions && this.reactions.forEach(function (reaction) { return reaction(); });
    };
    Table2.prototype.syncSelected = function () {
        var _a = this.props, store = _a.store, onSelect = _a.onSelect;
        onSelect &&
            onSelect(store.selectedRows.map(function (item) { return item.data; }), store.unSelectedRows.map(function (item) { return item.data; }));
    };
    Table2.syncRows = function (store, props, prevProps) {
        var _a;
        var source = props.source;
        var value = getPropValue(props, function (props) { return props.items; });
        var rows = [];
        var updateRows = false;
        if (Array.isArray(value) &&
            (!prevProps ||
                getPropValue(prevProps, function (props) { return props.items; }) !== value)) {
            updateRows = true;
            rows = value;
        }
        else if (typeof source === 'string') {
            var resolved = resolveVariableAndFilter(source, props.data, '| raw');
            var prev = prevProps
                ? resolveVariableAndFilter(source, prevProps.data, '| raw')
                : null;
            if (prev && prev === resolved) {
                updateRows = false;
            }
            else if (Array.isArray(resolved)) {
                updateRows = true;
                rows = resolved;
            }
        }
        updateRows &&
            store.initRows(rows, props.getEntryId, props.reUseRow, props.childrenColumnName);
        var selectedRowKeys = [];
        var keyField = store.keyField;
        // selectedRowKeysExpr比selectedRowKeys优先级高
        if (Array.isArray(props.selected)) {
            selectedRowKeys = props.selected.map(function (item) { return item[keyField]; }) || [];
        }
        else {
            if (props.rowSelection && props.rowSelection.selectedRowKeysExpr) {
                rows.forEach(function (row, index) {
                    var _a;
                    var flag = evalExpression(((_a = props.rowSelection) === null || _a === void 0 ? void 0 : _a.selectedRowKeysExpr) || '', {
                        record: row,
                        rowIndex: index
                    });
                    if (flag) {
                        selectedRowKeys.push(row[keyField]);
                    }
                });
            }
            else if (props.rowSelection && props.rowSelection.selectedRowKeys) {
                selectedRowKeys = __spreadArray([], __read(props.rowSelection.selectedRowKeys), false);
            }
        }
        if (updateRows && selectedRowKeys.length > 0) {
            store.updateSelected(selectedRowKeys);
        }
        var expandedRowKeys = [];
        var expandableKeyField = props.primaryField || ((_a = props.expandable) === null || _a === void 0 ? void 0 : _a.keyField) || props.keyField;
        if (props.expandable && props.expandable.expandedRowKeysExpr) {
            rows.forEach(function (row, index) {
                var _a;
                var flag = evalExpression(((_a = props.expandable) === null || _a === void 0 ? void 0 : _a.expandedRowKeysExpr) || '', {
                    record: row,
                    rowIndex: index
                });
                if (flag) {
                    expandedRowKeys.push(row[expandableKeyField]);
                }
            });
        }
        else if (props.expandable && props.expandable.expandedRowKeys) {
            expandedRowKeys = __spreadArray([], __read(props.expandable.expandedRowKeys), false);
        }
        if (updateRows && expandedRowKeys.length > 0) {
            store.updateExpanded(expandedRowKeys, expandableKeyField);
        }
        return updateRows;
    };
    Table2.prototype.componentDidUpdate = function (prevProps) {
        var _a, _b, _c;
        var props = this.props;
        var store = props.store;
        changedEffect(['orderBy', 'columnsTogglable', 'canAccessSuperData'], prevProps, props, function (changes) {
            if (changes.orderBy && !props.onQuery) {
                delete changes.orderBy;
            }
            store.update(changes, {
                resolveDefinitions: props.resolveDefinitions
            });
        });
        if (anyChanged(['source', 'value', 'items'], prevProps, props) ||
            (!props.value &&
                !props.items &&
                (props.data !== prevProps.data ||
                    (typeof props.source === 'string' && isPureVariable(props.source))))) {
            Table2.syncRows(store, props, prevProps) && this.syncSelected();
        }
        else if (isArrayChildrenModified(prevProps.selected, props.selected)) {
            var keyField_1 = store.keyField;
            var prevSelectedRows = store.selectedRows
                .map(function (item) { return item[keyField_1]; })
                .join(',');
            store.updateSelected(props.selected.map(function (item) { return item[keyField_1]; }) || []);
            var selectedRows = store.selectedRows
                .map(function (item) { return item[keyField_1]; })
                .join(',');
            prevSelectedRows !== selectedRows && this.syncSelected();
        }
        if (anyChanged(['columns'], prevProps, props)) {
            store.update({
                columns: props.columns
            });
        }
        if (anyChanged([
            'rowSelection',
            'selectable',
            'multiple',
            'maxKeepItemSelectionLength'
        ], prevProps, props)) {
            this.rowSelection = this.buildRowSelection();
        }
        if (anyChanged(['query', 'pageField', 'perPageField'], prevProps, props)) {
            store.updateQuery(props.query, undefined, props.pageField, props.perPageField, true);
        }
        if (!isEqual((_a = prevProps === null || prevProps === void 0 ? void 0 : prevProps.rowSelection) === null || _a === void 0 ? void 0 : _a.keyField, (_b = props.rowSelection) === null || _b === void 0 ? void 0 : _b.keyField) ||
            !isEqual(prevProps.keyField, props.keyField)) {
            store.update({
                rowSelectionKeyField: props.primaryField || ((_c = props.rowSelection) === null || _c === void 0 ? void 0 : _c.keyField) || props.keyField
            });
        }
    };
    Table2.prototype.getPopOverContainer = function () {
        return findDOMNode(this);
    };
    Table2.prototype.subFormRef = function (form, x, y) {
        var quickEditFormRef = this.props.quickEditFormRef;
        quickEditFormRef && quickEditFormRef(form, x, y);
        this.subForms["".concat(x, "-").concat(y)] = form;
        form && this.props.store.addForm(form.props.store, y);
    };
    Table2.prototype.reset = function () {
        var _this = this;
        var store = this.props.store;
        store.reset();
        var subForms = [];
        Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms.push(_this.subForms[key]); });
        subForms.forEach(function (item) { return item.clearErrors(); });
    };
    Table2.prototype.renderCellSchema = function (schema, props) {
        var render = this.props.render;
        // Table Cell SchemaObject转化成ReactNode
        if (schema && isObject(schema)) {
            // 在TableCell里会根据width设置div的width
            // 原来的table td/th是最外层标签 设置width没问题
            // table2的拆开了 就不需要再设置div的width了
            // 否则加上padding 就超出单元格的区域了
            // children属性在schema里是一个关键字 在渲染器schema中 自定义的children没有用 去掉
            // title 不应该传递到 cell-field 的 column 中，否则部分组件会将其渲染出来
            // 但是 cell-field 需要这个字段，展示列的名称
            schema.width; schema.children; var title = schema.title, rest = __rest(schema, ["width", "children", "title"]);
            return render('cell-field', __assign(__assign({}, rest), { title: title || rest.label, type: 'cell-field', column: rest, data: props.data, name: schema.name }), props);
        }
        return schema;
    };
    Table2.prototype.renderSchema = function (key, schema, props) {
        var render = this.props.render;
        // Header、Footer等SchemaObject转化成ReactNode
        if (schema && isObject(schema)) {
            return render(key || 'field', __assign(__assign({}, schema), { data: props === null || props === void 0 ? void 0 : props.data }), props);
        }
        else if (Array.isArray(schema)) {
            var renderers_1 = [];
            schema.forEach(function (s, i) {
                return renderers_1.push(render(key || 'field', __assign(__assign({}, s), { data: props === null || props === void 0 ? void 0 : props.data }), __assign(__assign({}, props), { key: i })));
            });
            return renderers_1;
        }
        if (typeof schema === 'string') {
            return filter(schema, props === null || props === void 0 ? void 0 : props.data);
        }
        return schema;
    };
    // editor传来的处理过的column 还可能包含其他字段
    Table2.prototype.buildColumns = function (columns, rowSpans, colSpans) {
        var _this = this;
        var _a = this.props, render = _a.render, store = _a.store, popOverContainer = _a.popOverContainer, canAccessSuperData = _a.canAccessSuperData, showBadge = _a.showBadge, itemBadge = _a.itemBadge, data = _a.data, cx = _a.classnames, env = _a.env;
        var cols = [];
        rowSpans = rowSpans;
        colSpans = colSpans;
        Array.isArray(columns) &&
            columns.forEach(function (column, col) { return __awaiter(_this, void 0, void 0, function () {
                var clone, titleSchema, titleProps, titleRender, isGroupColumn, finalCanAccessSuperData, source, datasource, api, ret, options;
                var _this = this;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            clone = __assign({}, column);
                            titleSchema = null;
                            titleProps = {
                                popOverContainer: popOverContainer || this.getPopOverContainer,
                                value: column.title || column.label
                            };
                            if (isObject(column.title)) {
                                titleSchema = cloneDeep(column.title);
                            }
                            else if (typeof column.title === 'string' ||
                                typeof column.label === 'string') {
                                titleSchema = { type: 'plain' };
                            }
                            titleRender = function (children) {
                                var _a;
                                var content = _this.renderCellSchema(titleSchema, titleProps);
                                var remark = null;
                                if (column.remark) {
                                    remark = render('remark', {
                                        type: 'remark',
                                        tooltip: column.remark,
                                        container: _this.getPopOverContainer
                                    });
                                }
                                return (React.createElement("div", { key: col, className: cx('Table-head-cell-wrapper', (_a = {},
                                        _a["".concat(column.className)] = !!column.className,
                                        _a["".concat(column.titleClassName)] = !!column.titleClassName,
                                        _a)) },
                                    content,
                                    remark,
                                    children));
                            };
                            Object.assign(clone, {
                                title: titleRender
                            });
                            isGroupColumn = !!((_a = column.children) === null || _a === void 0 ? void 0 : _a.length);
                            finalCanAccessSuperData = (_b = column.canAccessSuperData) !== null && _b !== void 0 ? _b : canAccessSuperData;
                            // 设置了type值 就完全按渲染器处理了
                            if (column.type) {
                                Object.assign(clone, {
                                    render: function (text, record, rowIndex, colIndex, levels) {
                                        var props = {};
                                        var item = store.getRowByIndex(rowIndex, __spreadArray([], __read((levels || [])), false)) || {};
                                        var obj = {
                                            children: _this.renderCellSchema(column, {
                                                data: item.locals,
                                                value: column.name
                                                    ? resolveVariable(column.name, finalCanAccessSuperData ? item.locals : item.data)
                                                    : column.name,
                                                popOverContainer: popOverContainer || _this.getPopOverContainer,
                                                quickEditFormRef: _this.subFormRef,
                                                onQuickChange: function (values, saveImmediately, savePristine, options) {
                                                    _this.handleQuickChange(item, values, saveImmediately, savePristine, options);
                                                },
                                                row: item,
                                                showBadge: showBadge,
                                                itemBadge: itemBadge
                                            }),
                                            props: props
                                        };
                                        // 分组表头配置了合并行或者列也不生效
                                        if (!isGroupColumn && column.rowSpanExpr) {
                                            var rowSpan = +filter(column.rowSpanExpr, {
                                                record: record,
                                                rowIndex: rowIndex,
                                                colIndex: colIndex
                                            });
                                            if (rowSpan) {
                                                obj.props.rowSpan = rowSpan;
                                                rowSpans.push({ colIndex: colIndex, rowIndex: rowIndex, rowSpan: rowSpan });
                                            }
                                        }
                                        if (!isGroupColumn && column.colSpanExpr) {
                                            var colSpan = +filter(column.colSpanExpr, {
                                                record: record,
                                                rowIndex: rowIndex,
                                                colIndex: colIndex
                                            });
                                            if (colSpan) {
                                                obj.props.colSpan = colSpan;
                                                colSpans.push({ colIndex: colIndex, rowIndex: rowIndex, colSpan: colSpan });
                                            }
                                        }
                                        rowSpans.forEach(function (item) {
                                            if (colIndex === item.colIndex &&
                                                rowIndex > item.rowIndex &&
                                                rowIndex < item.rowIndex + (item.rowSpan || 0)) {
                                                obj.props.rowSpan = 0;
                                            }
                                        });
                                        colSpans.forEach(function (item) {
                                            if (rowIndex === item.rowIndex &&
                                                colIndex > item.colIndex &&
                                                colIndex < item.colIndex + (item.colSpan || 0)) {
                                                obj.props.colSpan = 0;
                                            }
                                        });
                                        return obj;
                                    }
                                });
                            }
                            // 设置了列搜索
                            if (column.searchable) {
                                clone.filterDropdown = (React.createElement(HeadCellSearchDropDown, __assign({}, this.props, { popOverContainer: this.getPopOverContainer, name: column.name, searchable: column.searchable, onSearch: this.handleSearch, key: 'th-search-' + col })));
                            }
                            // 设置了列排序
                            if (column.sortable) {
                                clone.sorter = true;
                            }
                            if (!column.filterable) return [3 /*break*/, 4];
                            if (!column.filterable.options) return [3 /*break*/, 1];
                            clone.filters = column.filterable.options.map(function (option) {
                                if (typeof option === 'string') {
                                    return {
                                        text: option,
                                        value: option
                                    };
                                }
                                return {
                                    text: option.label,
                                    value: option.value
                                };
                            });
                            return [3 /*break*/, 4];
                        case 1:
                            if (!column.filterable.source) return [3 /*break*/, 4];
                            source = column.filterable.source;
                            if (!isPureVariable(source)) return [3 /*break*/, 2];
                            datasource = resolveVariableAndFilter(source, data, '| raw');
                            clone.filters = datasource;
                            return [3 /*break*/, 4];
                        case 2:
                            if (!isEffectiveApi(source, data)) return [3 /*break*/, 4];
                            api = normalizeApi(source);
                            api.cache = 3000; // 开启 3s 缓存，因为固顶位置渲染1次会额外多次请求。
                            return [4 /*yield*/, env.fetcher(api, data)];
                        case 3:
                            ret = _c.sent();
                            options = (ret.data && ret.data.options) || [];
                            clone.filters = options;
                            _c.label = 4;
                        case 4:
                            if (isGroupColumn) {
                                clone.children = this.buildColumns(column.children, rowSpans, colSpans);
                            }
                            cols.push(clone);
                            return [2 /*return*/];
                    }
                });
            }); });
        return cols;
    };
    Table2.prototype.buildSummary = function (key, summary) {
        var _this = this;
        var result = [];
        if (Array.isArray(summary)) {
            summary.forEach(function (s, index) {
                if (isObject(s)) {
                    result.push({
                        colSpan: s.colSpan,
                        fixed: s.fixed,
                        cellClassName: s.cellClassName,
                        render: function (dataSouce) {
                            return _this.renderSchema(key, s, {
                                data: dataSouce
                            });
                        }
                    });
                }
                else if (Array.isArray(s)) {
                    if (!result[index]) {
                        result.push([]);
                    }
                    s.forEach(function (d) {
                        result[index].push({
                            colSpan: d.colSpan,
                            fixed: d.fixed,
                            cellClassName: d.cellClassName,
                            render: function (dataSouce) {
                                return _this.renderSchema(key, d, {
                                    data: dataSouce
                                });
                            }
                        });
                    });
                }
            });
        }
        return result.length ? result : null;
    };
    Table2.prototype.rowClassName = function (record, rowIndex) {
        var _a = this.props, rowClassNameExpr = _a.rowClassNameExpr, store = _a.store;
        var classnames = [];
        if (rowClassNameExpr) {
            classnames.push(filter(rowClassNameExpr, { record: record, rowIndex: rowIndex }));
        }
        // row可能不存在
        // 比如初始化给了10条数据，异步接口又替换成4条
        var row = store.getRowByIndex(rowIndex);
        if (row === null || row === void 0 ? void 0 : row.modified) {
            classnames.push('is-modified');
        }
        if (row === null || row === void 0 ? void 0 : row.moved) {
            classnames.push('is-moved');
        }
        return classnames.join(' ');
    };
    Table2.prototype.buildRowSelection = function () {
        var _this = this;
        var _a = this.props, selectable = _a.selectable, multiple = _a.multiple, maxKeepItemSelectionLength = _a.maxKeepItemSelectionLength, rowSelection = _a.rowSelection, store = _a.store;
        var rowSelectionConfig = null;
        if (selectable) {
            rowSelectionConfig = {
                type: multiple === false ? 'radio' : '',
                selectedRowKeys: store.currentSelectedRowKeys,
                maxSelectedLength: maxKeepItemSelectionLength
            };
        }
        else if (rowSelection) {
            rowSelection.selectedRowKeys; var selections = rowSelection.selections, rest = __rest(rowSelection, ["selectedRowKeys", "selections"]);
            rowSelectionConfig = __assign({ selectedRowKeys: store.currentSelectedRowKeys, maxSelectedLength: maxKeepItemSelectionLength }, rest);
            rowSelectionConfig.getCheckboxProps = function (record, rowIndex) {
                var _a = _this.props, rowSelection = _a.rowSelection, maxKeepItemSelectionLength = _a.maxKeepItemSelectionLength, store = _a.store;
                var disableOn = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.disableOn;
                return {
                    disabled: (disableOn
                        ? evalExpression(disableOn, { record: record, rowIndex: rowIndex })
                        : false) ||
                        (maxKeepItemSelectionLength &&
                            store.currentSelectedRowKeys.length >=
                                maxKeepItemSelectionLength &&
                            !store.currentSelectedRowKeys.includes(record[store.keyField]))
                };
            };
            rowSelection.disableOn && delete rowSelectionConfig.disableOn;
            if (selections && Array.isArray(selections)) {
                rowSelectionConfig.selections = [];
                selections.forEach(function (item) {
                    rowSelectionConfig.selections.push({
                        key: item.key,
                        text: item.text,
                        onSelect: function (changableRowKeys) {
                            var newSelectedRowKeys = [];
                            newSelectedRowKeys = changableRowKeys.filter(function (key, index) {
                                if (item.key === 'all') {
                                    return true;
                                }
                                if (item.key === 'none') {
                                    return false;
                                }
                                if (item.key === 'invert') {
                                    return !store.currentSelectedRowKeys.includes(key);
                                }
                                // 奇数行
                                if (item.key === 'odd') {
                                    if (index % 2 !== 0) {
                                        return false;
                                    }
                                    return true;
                                }
                                // 偶数行
                                if (item.key === 'even') {
                                    if (index % 2 !== 0) {
                                        return true;
                                    }
                                    return false;
                                }
                                return true;
                            });
                            store.updateSelected(newSelectedRowKeys);
                        }
                    });
                });
            }
        }
        return rowSelectionConfig;
    };
    Table2.prototype.expandedRowClassName = function (record, rowIndex) {
        var expandable = this.props.expandable;
        return filter(expandable === null || expandable === void 0 ? void 0 : expandable.expandedRowClassNameExpr, { record: record, rowIndex: rowIndex });
    };
    Table2.prototype.expandedRowRender = function (record, rowIndex) {
        var expandable = this.props.expandable;
        return this.renderSchema('expandableBody', __assign({}, expandable), {
            data: __assign(__assign({}, this.props.data), { record: record, rowIndex: rowIndex })
        });
    };
    Table2.prototype.rowExpandable = function (record, rowIndex, rowIndexes) {
        var expandable = this.props.expandable;
        if (expandable === null || expandable === void 0 ? void 0 : expandable.expandableOn) {
            return evalExpression(expandable.expandableOn, { record: record, rowIndex: rowIndex });
        }
        return false;
    };
    Table2.prototype.buildExpandable = function () {
        var _a = this.props, expandable = _a.expandable, store = _a.store;
        var expandableConfig = null;
        if (expandable) {
            expandable.expandedRowKeys; var rest = __rest(expandable, ["expandedRowKeys"]);
            expandableConfig = __assign({ expandedRowKeys: store.currentExpandedKeys }, rest);
            if (expandable.expandableOn) {
                expandableConfig.rowExpandable = this.rowExpandable;
                delete expandableConfig.expandableOn;
            }
            if (expandable && expandable.type) {
                expandableConfig.expandedRowRender = this.expandedRowRender;
            }
            if (expandable.expandedRowClassNameExpr) {
                expandableConfig.expandedRowClassName = this.expandedRowClassName;
                delete expandableConfig.expandedRowClassNameExpr;
            }
        }
        return expandableConfig;
    };
    Table2.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    Table2.prototype.handleSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, onSave, primaryField, keyField, subForms, result, rows, rowIndexes, diff, unModifiedRows;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, store = _a.store, onSave = _a.onSave, primaryField = _a.primaryField, keyField = _a.keyField;
                        if (!store.modifiedRows.length) {
                            return [2 /*return*/];
                        }
                        subForms = [];
                        Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms.push(_this.subForms[key]); });
                        if (!subForms.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(subForms.map(function (item) { return item.validate(); }))];
                    case 1:
                        result = _b.sent();
                        if (~result.indexOf(false)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        rows = store.modifiedRows.map(function (item) { return item.data; });
                        rowIndexes = store.modifiedRows.map(function (item) { return item.path; });
                        diff = store.modifiedRows.map(function (item) {
                            return difference(item.data, item.pristine, [keyField, primaryField]);
                        });
                        unModifiedRows = store.rows
                            .filter(function (item) { return !item.modified; })
                            .map(function (item) { return item.data; });
                        if (!onSave) {
                            this.handleQuickSave(rows, diff, rowIndexes, unModifiedRows, store.modifiedRows.map(function (item) { return item.pristine; }));
                            return [2 /*return*/];
                        }
                        onSave(rows, diff, rowIndexes, unModifiedRows, store.modifiedRows.map(function (item) { return item.pristine; }));
                        return [2 /*return*/];
                }
            });
        });
    };
    // 方法同CRUD2里的handleSave
    // 目的是为了让table2不依赖crud2可以支持快速编辑
    Table2.prototype.handleQuickSave = function (rows, diff, indexes, unModifiedItems, rowsOrigin, options) {
        var _this = this;
        var _a = this.props, store = _a.store, quickSaveApi = _a.quickSaveApi, quickSaveItemApi = _a.quickSaveItemApi, primaryField = _a.primaryField, keyField = _a.keyField, env = _a.env, messages = _a.messages, reload = _a.reload;
        if (Array.isArray(rows)) {
            if (!isEffectiveApi(quickSaveApi)) {
                env && env.alert('Table2 quickSaveApi is required');
                return;
            }
            var key_1 = primaryField || keyField;
            var data_1 = createObject(store.data, {
                rows: rows,
                rowsDiff: diff,
                indexes: indexes,
                rowsOrigin: rowsOrigin
            });
            if (rows.length && rows[0].hasOwnProperty(key_1)) {
                data_1.ids = rows.map(function (item) { return item[key_1]; }).join(',');
            }
            if (unModifiedItems) {
                data_1.unModifiedItems = unModifiedItems;
            }
            store
                .saveRemote(quickSaveApi, data_1, {
                successMessage: messages && messages.saveFailed,
                errorMessage: messages && messages.saveSuccess
            })
                .then(function () {
                reload && _this.reloadTarget(filterTarget(reload, data_1), data_1);
            })
                .catch(function () { });
        }
        else {
            if (!isEffectiveApi(quickSaveItemApi)) {
                env && env.alert('Table2 quickSaveItemApi is required!');
                return;
            }
            var data_2 = createObject(store.data, {
                item: rows,
                modified: diff,
                origin: rowsOrigin
            });
            var sendData = createObject(data_2, rows);
            store
                .saveRemote(quickSaveItemApi, sendData)
                .then(function () {
                reload && _this.reloadTarget(filterTarget(reload, data_2), data_2);
            })
                .catch(function () {
                (options === null || options === void 0 ? void 0 : options.resetOnFailed) && _this.reset();
            });
        }
    };
    Table2.prototype.handleQuickChange = function (item, values, saveImmediately, savePristine, options) {
        if (!isAlive(item)) {
            return;
        }
        var _a = this.props, onSave = _a.onSave, onPristineChange = _a.onPristineChange, propsSaveImmediately = _a.saveImmediately, primaryField = _a.primaryField, keyField = _a.keyField, quickSaveItemApi = _a.quickSaveItemApi;
        item.change(values, savePristine);
        // 值发生变化了，需要通过 onSelect 通知到外面，否则会出现数据不同步的问题
        item.modified && this.syncSelected();
        if (savePristine) {
            onPristineChange === null || onPristineChange === void 0 ? void 0 : onPristineChange(item.data, item.path);
            return;
        }
        if (!saveImmediately && !propsSaveImmediately) {
            return;
        }
        if (saveImmediately && saveImmediately.api) {
            this.props.onAction &&
                this.props.onAction(null, {
                    actionType: 'ajax',
                    api: saveImmediately.api,
                    reload: options === null || options === void 0 ? void 0 : options.reload
                }, item.locals);
            return;
        }
        if (!onSave) {
            this.handleQuickSave(quickSaveItemApi ? item.data : [item.data], difference(item.data, item.pristine, [keyField, primaryField]), [item.path], undefined, item.pristine, options);
            return;
        }
        onSave(item.data, difference(item.data, item.pristine, [keyField, primaryField]), item.path, undefined, item.pristine, options);
    };
    Table2.prototype.handleAction = function (e, action, ctx) {
        var onAction = this.props.onAction;
        // todo
        onAction && onAction(e, action, ctx);
    };
    Table2.prototype.renderActions = function (region) {
        var _this = this;
        var _a = this.props, actions = _a.actions, render = _a.render, store = _a.store, cx = _a.classnames, data = _a.data, columnsTogglable = _a.columnsTogglable, dispatchEvent = _a.dispatchEvent;
        actions = Array.isArray(actions) ? actions.concat() : [];
        var config = isObject(columnsTogglable) ? columnsTogglable : {};
        // 现在默认从crud里传进来的columnsTogglable是boolean类型
        // table单独配置的是SchemaNode类型
        // 如果是在crud里 配置了columnsTogglable相关配置 那么还是在这里渲染
        // 用户也可以在crud2的grid里配置 那么crud2里就不要再写了 否则就重复了
        if (store.toggable &&
            region === 'header' &&
            !~this.renderedToolbars.indexOf('columns-toggler')) {
            actions.push({
                type: 'button',
                children: render('column-toggler', __assign(__assign({}, config), { type: 'column-toggler' }), {
                    cols: store.columnsData,
                    toggleAllColumns: function () {
                        store.toggleAllColumns();
                        dispatchEvent('columnToggled', createObject(data, {
                            columns: store.columnsData.filter(function (column) { return column.toggled; })
                        }));
                    },
                    toggleToggle: function (index) {
                        var column = store.columnsData[index];
                        column.toggleToggle();
                        dispatchEvent('columnToggled', createObject(data, {
                            columns: store.columnsData.filter(function (column) { return column.toggled; })
                        }));
                    }
                })
            });
        }
        return Array.isArray(actions) && actions.length ? (React.createElement("div", { className: cx('Table-toolbar') }, actions.map(function (action, key) {
            return render("action/".concat(key), __assign({ type: 'button' }, action), {
                onAction: _this.handleAction,
                key: key,
                btnDisabled: store.dragging,
                data: store.getData(data)
            });
        }))) : null;
    };
    Table2.prototype.handleSelected = function (selectedRows, selectedRowKeys, unSelectedRows) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, data, store, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data, store = _a.store;
                        return [4 /*yield*/, dispatchEvent('selectedChange', createObject(data, {
                                selectedItems: selectedRows,
                                unSelectedItems: unSelectedRows
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/, rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented];
                        }
                        store.updateSelected(selectedRowKeys);
                        this.syncSelected();
                        return [2 /*return*/];
                }
            });
        });
    };
    Table2.prototype.handleSort = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, data, onSort, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data, onSort = _a.onSort;
                        return [4 /*yield*/, dispatchEvent('columnSort', createObject(data, {
                                orderBy: payload.orderBy,
                                orderDir: payload.orderDir
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/, rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented];
                        }
                        onSort && onSort(payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    Table2.prototype.handleFilter = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, data, onSearch, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data, onSearch = _a.onSearch;
                        return [4 /*yield*/, dispatchEvent('columnFilter', createObject(data, payload))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/, rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented];
                        }
                        onSearch && onSearch(payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    Table2.prototype.handleSearch = function (name, values) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, dispatchEvent, store, onSearch, rendererEvent;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent, store = _a.store, onSearch = _a.onSearch;
                        return [4 /*yield*/, dispatchEvent('columnSearch', createObject(data, {
                                searchName: name,
                                searchValue: values
                            }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        store.updateQuery(values);
                        onSearch && onSearch((_b = {}, _b[name] = values[name], _b));
                        return [2 /*return*/];
                }
            });
        });
    };
    Table2.prototype.handleRowClick = function (event, rowItem, rowIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, data, onRow, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data, onRow = _a.onRow;
                        return [4 /*yield*/, dispatchEvent('rowClick', createObject(data, { item: rowItem, index: rowIndex }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (rowItem && onRow) {
                            onRow.onRowClick && onRow.onRowClick(event, rowItem, rowIndex);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Table2.prototype.handleRowDbClick = function (event, rowItem, rowIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, data, onRow, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data, onRow = _a.onRow;
                        return [4 /*yield*/, dispatchEvent('rowDbClick', createObject(data, { item: rowItem, index: rowIndex }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/, false];
                        }
                        if (rowItem && onRow) {
                            onRow.onRowDbClick && onRow.onRowDbClick(event, rowItem, rowIndex);
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Table2.prototype.handleRowMouseEnter = function (event, rowItem, rowIndex) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, dispatchEvent, data, onRow, rendererEvent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (_a = event === null || event === void 0 ? void 0 : event.persist) === null || _a === void 0 ? void 0 : _a.call(event);
                        _b = this.props, dispatchEvent = _b.dispatchEvent, data = _b.data, onRow = _b.onRow;
                        return [4 /*yield*/, dispatchEvent('rowMouseEnter', createObject(data, { item: rowItem, index: rowIndex }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (rowItem && onRow) {
                            onRow.onRowMouseEnter && onRow.onRowMouseEnter(event, rowItem, rowIndex);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Table2.prototype.handleRowMouseLeave = function (event, rowItem, rowIndex) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, dispatchEvent, data, onRow, rendererEvent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (_a = event === null || event === void 0 ? void 0 : event.persist) === null || _a === void 0 ? void 0 : _a.call(event);
                        _b = this.props, dispatchEvent = _b.dispatchEvent, data = _b.data, onRow = _b.onRow;
                        return [4 /*yield*/, dispatchEvent('rowMouseLeave', createObject(data, { item: rowItem, index: rowIndex }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (rowItem && onRow) {
                            onRow.onRowMouseLeave && onRow.onRowMouseLeave(event, rowItem, rowIndex);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Table2.prototype.handleOrderChange = function (oldIndex, newIndex, levels) {
        return __awaiter(this, void 0, void 0, function () {
            var store, rowItem;
            return __generator(this, function (_a) {
                store = this.props.store;
                rowItem = store.getRowByIndex(oldIndex, levels);
                store.exchange(oldIndex, newIndex, rowItem);
                return [2 /*return*/];
            });
        });
    };
    Table2.prototype.handleSaveOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, onSaveOrder, data, dispatchEvent, movedItems, items, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, store = _a.store, onSaveOrder = _a.onSaveOrder, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        movedItems = store.movedRows.map(function (item) { return item.data; });
                        items = store.rows.map(function (item) {
                            return item.getDataWithModifiedChilden();
                        });
                        return [4 /*yield*/, dispatchEvent('orderChange', createObject(data, { movedItems: movedItems }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (!onSaveOrder || !store.movedRows.length) {
                            return [2 /*return*/];
                        }
                        onSaveOrder(movedItems, items);
                        return [2 /*return*/];
                }
            });
        });
    };
    Table2.prototype.doAction = function (action, ctx, throwErrors, args) {
        var _this = this;
        var _a = this.props, store = _a.store, data = _a.data, key = _a.keyField, expandable = _a.expandable, primaryField = _a.primaryField;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var keyField = store.keyField;
        var dataSource = store.getData(data).items || [];
        switch (actionType) {
            case 'selectAll':
                store.updateSelectedAll();
                break;
            case 'clearAll':
                store.updateSelected([]);
                break;
            case 'select':
                var selected_1 = [];
                dataSource.forEach(function (item, rowIndex) {
                    var flag = evalExpression((args === null || args === void 0 ? void 0 : args.selected) || (args === null || args === void 0 ? void 0 : args.selectedRowKeysExpr), {
                        record: item,
                        rowIndex: rowIndex
                    });
                    if (flag) {
                        selected_1.push(item[keyField]);
                    }
                });
                store.updateSelected(selected_1);
                break;
            case 'expand':
                var expandableKey_1 = primaryField || (expandable === null || expandable === void 0 ? void 0 : expandable.keyField) || key;
                var expanded_1 = [];
                var collapse_1 = [];
                // value值控制展开1个
                if (args === null || args === void 0 ? void 0 : args.value) {
                    var rowIndex = dataSource.findIndex(function (d) { return d[expandableKey_1] === args.value; });
                    var item = dataSource[rowIndex];
                    if (this.tableRef && this.tableRef.isExpandableRow(item, rowIndex)) {
                        if (this.tableRef.isExpanded(item)) {
                            collapse_1.push(item);
                        }
                        else {
                            expanded_1.push(item);
                        }
                    }
                }
                else if (args === null || args === void 0 ? void 0 : args.expandedRowsExpr) {
                    dataSource.forEach(function (item, rowIndex) {
                        var flag = evalExpression(args === null || args === void 0 ? void 0 : args.expandedRowsExpr, {
                            record: item,
                            rowIndex: rowIndex
                        });
                        if (flag &&
                            _this.tableRef &&
                            _this.tableRef.isExpandableRow(item, rowIndex)) {
                            if (_this.tableRef.isExpanded(item)) {
                                collapse_1.push(item);
                            }
                            else {
                                expanded_1.push(item);
                            }
                        }
                    });
                }
                if (expanded_1.length > 0) {
                    this.tableRef && this.tableRef.onExpandRows(expanded_1);
                }
                if (collapse_1.length > 0) {
                    this.tableRef && this.tableRef.onCollapseRows(collapse_1);
                }
                break;
            default:
                this.handleAction(undefined, action, data);
                break;
        }
    };
    Table2.prototype.getRef = function (ref) {
        this.tableRef = ref;
    };
    Table2.prototype.renderTable = function () {
        var _a = this.props, render = _a.render, title = _a.title, footer = _a.footer; _a.rowSelection; _a.selectable; _a.multiple; _a.columns; _a.expandable; var footSummary = _a.footSummary, headSummary = _a.headSummary, loading = _a.loading, cx = _a.classnames, placeholder = _a.placeholder; _a.rowClassNameExpr; var itemActions = _a.itemActions, keyField = _a.keyField, primaryField = _a.primaryField; _a.maxKeepItemSelectionLength; var onRow = _a.onRow, store = _a.store, rest = __rest(_a, ["render", "title", "footer", "rowSelection", "selectable", "multiple", "columns", "expandable", "footSummary", "headSummary", "loading", "classnames", "placeholder", "rowClassNameExpr", "itemActions", "keyField", "primaryField", "maxKeepItemSelectionLength", "onRow", "store"]);
        var itemActionsConfig = undefined;
        if (itemActions) {
            var finalActions_1 = Array.isArray(itemActions)
                ? itemActions.filter(function (action) { return !action.hiddenOnHover; })
                : [];
            if (!finalActions_1.length) {
                return null;
            }
            itemActionsConfig = function (record, rowIndex) {
                return (React.createElement("div", { className: cx('Table-itemActions') }, finalActions_1.map(function (action, index) {
                    return render("itemAction/".concat(index), __assign(__assign({}, action), { isMenuItem: true }), {
                        key: index,
                        item: record,
                        data: record,
                        rowIndex: rowIndex
                    });
                })));
            };
        }
        var schemaProps = { data: this.props.data };
        return (React.createElement(Table, __assign({}, rest, { onRef: this.getRef, title: this.renderSchema('title', title, schemaProps), footer: this.renderSchema('footer', footer, schemaProps), columns: this.columns, dataSource: store.dataSource, rowSelection: this.rowSelection, rowClassName: this.rowClassName, expandable: this.expandable, footSummary: this.buildSummary('footSummary', footSummary), headSummary: this.buildSummary('headSummary', headSummary), loading: this.renderSchema('loading', loading, schemaProps), placeholder: this.renderSchema('placeholder', placeholder, schemaProps), onSelect: this.handleSelected, onSelectAll: this.handleSelected, onSort: this.handleSort, onFilter: this.handleFilter, onDrag: this.handleOrderChange, itemActions: itemActionsConfig, keyField: primaryField || keyField, onRow: __assign(__assign({}, onRow), { onRowClick: this.handleRowClick, onRowDbClick: this.handleRowDbClick, onRowMouseEnter: this.handleRowMouseEnter, onRowMouseLeave: this.handleRowMouseLeave }) })));
    };
    Table2.prototype.renderHeading = function () {
        var _a = this.props, store = _a.store, hideQuickSaveBtn = _a.hideQuickSaveBtn, cx = _a.classnames, headingClassName = _a.headingClassName, saveImmediately = _a.saveImmediately, quickSaveApi = _a.quickSaveApi, __ = _a.translate, columns = _a.columns;
        // 当被修改列的 column 开启 quickEdit.saveImmediately 时，不展示提交、放弃按钮
        var isModifiedColumnSaveImmediately = false;
        if (store.modifiedRows.length === 1) {
            var saveImmediatelyColumnNames = (columns === null || columns === void 0 ? void 0 : columns.map(function (column) { var _a; return ((_a = column === null || column === void 0 ? void 0 : column.quickEdit) === null || _a === void 0 ? void 0 : _a.saveImmediately) ? column === null || column === void 0 ? void 0 : column.name : ''; }).filter(function (a) { return a; })) || [];
            var item = store.modifiedRows[0];
            var diff = difference(item.data, item.pristine);
            if (intersection(saveImmediatelyColumnNames, Object.keys(diff)).length) {
                isModifiedColumnSaveImmediately = true;
            }
        }
        if ((quickSaveApi &&
            !saveImmediately &&
            !isModifiedColumnSaveImmediately &&
            store.modified &&
            !hideQuickSaveBtn) ||
            store.moved) {
            return (React.createElement("div", { className: cx('Table-heading', headingClassName), key: "heading" }, !saveImmediately &&
                store.modified &&
                !hideQuickSaveBtn &&
                !isModifiedColumnSaveImmediately ? (React.createElement("span", null,
                __('Table.modified', {
                    modified: store.modified
                }),
                React.createElement("button", { type: "button", className: cx('Button Button--size-xs Button--success m-l-sm'), onClick: this.handleSave },
                    React.createElement(Icon, { icon: "check", className: "icon m-r-xs" }),
                    __('Form.submit')),
                React.createElement("button", { type: "button", className: cx('Button Button--size-xs Button--danger m-l-sm'), onClick: this.reset },
                    React.createElement(Icon, { icon: "close", className: "icon m-r-xs" }),
                    __('Table.discard')))) : store.moved ? (React.createElement("span", null,
                __('Table.moved', {
                    moved: store.moved
                }),
                React.createElement("button", { type: "button", className: cx('Button Button--size-xs Button--success m-l-sm'), onClick: this.handleSaveOrder },
                    React.createElement(Icon, { icon: "check", className: "icon m-r-xs" }),
                    __('Form.submit')),
                React.createElement("button", { type: "button", className: cx('Button Button--size-xs Button--danger m-l-sm'), onClick: this.reset },
                    React.createElement(Icon, { icon: "close", className: "icon m-r-xs" }),
                    __('Table.discard')))) : ('')));
        }
        return null;
    };
    Table2.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, style = _a.style, store = _a.store;
        this.renderedToolbars = []; // 用来记录哪些 toolbar 已经渲染了
        var heading = this.renderHeading();
        return (React.createElement("div", { className: cx('Table-render-wrapper', {
                'Table--unsaved': !!store.modified || !!store.moved
            }), style: style },
            this.renderActions('header'),
            heading,
            this.renderTable()));
    };
    Table2.contextType = ScopedContext;
    Table2.propsList = [
        'source',
        'columnsTogglable',
        'columns',
        'items',
        'rowSelection',
        'expandable',
        'sticky',
        'itemBadge',
        'popOverContainer',
        'keyField',
        'childrenColumnName',
        'rowClassNameExpr',
        'lineHeight',
        'bordered',
        'footer',
        'maxKeepItemSelectionLength',
        'keepItemSelectionOnPageChange',
        'itemActions',
        'headingClassName',
        'footSummary',
        'headSummary',
        'saveImmediately',
        'selectable',
        'multiple',
        'primaryField',
        'hideQuickSaveBtn',
        'selected',
        'placeholder',
        'autoFillHeight'
    ];
    Table2.defaultProps = {
        keyField: 'id',
        canAccessSuperData: false,
        lazyRenderAfter: 100
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "getPopOverContainer", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, Number]),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "subFormRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "reset", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number]),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "rowClassName", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number]),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "expandedRowClassName", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number]),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "expandedRowRender", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, Array]),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "rowExpandable", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleSave", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Array,
            Array, Object, Object]),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "handleQuickSave", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object, Boolean, Object]),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "handleQuickChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "handleAction", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array,
            Array,
            Array]),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleSelected", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleSort", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleFilter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleSearch", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Number]),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleRowClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Number]),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleRowDbClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Number]),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleRowMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Number]),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleRowMouseLeave", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Array]),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleOrderChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Table2.prototype, "handleSaveOrder", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Table2.prototype, "getRef", null);
    return Table2;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TableRenderer, _super);
    function TableRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableRenderer.prototype.receive = function (values, subPath) {
        var _this = this;
        var _a, _b;
        var scoped = this.context;
        var parents = (_a = scoped === null || scoped === void 0 ? void 0 : scoped.parent) === null || _a === void 0 ? void 0 : _a.getComponents();
        /**
         * 因为Table在scope上注册，导致getComponentByName查询组件时会优先找到Table，和CRUD联动的动作都会失效
         * 这里先做兼容处理，把动作交给上层的CRUD处理
         */
        if (Array.isArray(parents) && parents.length) {
            // CRUD的name会透传给Table，这样可以保证找到CRUD
            var crud = parents.find(function (cmpt) { var _a, _b; return ((_a = cmpt === null || cmpt === void 0 ? void 0 : cmpt.props) === null || _a === void 0 ? void 0 : _a.name) === ((_b = _this.props) === null || _b === void 0 ? void 0 : _b.name); });
            return (_b = crud === null || crud === void 0 ? void 0 : crud.receive) === null || _b === void 0 ? void 0 : _b.call(crud, values, subPath);
        }
        if (subPath) {
            return scoped.send(subPath, values);
        }
    };
    TableRenderer.prototype.reload = function (subPath, query, ctx) {
        var _this = this;
        var _a, _b;
        var scoped = this.context;
        var parents = (_a = scoped === null || scoped === void 0 ? void 0 : scoped.parent) === null || _a === void 0 ? void 0 : _a.getComponents();
        if (Array.isArray(parents) && parents.length) {
            // CRUD的name会透传给Table，这样可以保证找到CRUD
            var crud = parents.find(function (cmpt) { var _a, _b; return ((_a = cmpt === null || cmpt === void 0 ? void 0 : cmpt.props) === null || _a === void 0 ? void 0 : _a.name) === ((_b = _this.props) === null || _b === void 0 ? void 0 : _b.name); });
            return (_b = crud === null || crud === void 0 ? void 0 : crud.reload) === null || _b === void 0 ? void 0 : _b.call(crud, subPath, query, ctx);
        }
        if (subPath) {
            return scoped.reload(subPath, ctx);
        }
    };
    TableRenderer.prototype.setData = function (values, replace, index, condition) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var store, len, items_1, indexs, items, i, item, isUpdate, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        store = this.props.store;
                        len = store.data.rows.length;
                        if (!(index !== undefined)) return [3 /*break*/, 1];
                        items_1 = __spreadArray([], __read(store.data.rows), false);
                        indexs = String(index).split(',');
                        indexs.forEach(function (i) {
                            var intIndex = Number(i);
                            items_1.splice(intIndex, 1, values);
                        });
                        // 更新指定行记录，只需要提供行记录即可
                        return [2 /*return*/, store.updateData({ rows: items_1 }, undefined, replace)];
                    case 1:
                        if (!(condition !== undefined)) return [3 /*break*/, 6];
                        items = __spreadArray([], __read(store.data.rows), false);
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < len)) return [3 /*break*/, 5];
                        item = items[i];
                        return [4 /*yield*/, evalExpressionWithConditionBuilder(condition, item)];
                    case 3:
                        isUpdate = _b.sent();
                        if (isUpdate) {
                            items.splice(i, 1, values);
                        }
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: 
                    // 更新指定行记录，只需要提供行记录即可
                    return [2 /*return*/, store.updateData({ rows: items }, undefined, replace)];
                    case 6:
                        data = __assign(__assign({}, values), { rows: (_a = values.rows) !== null && _a !== void 0 ? _a : values.items // 做个兼容
                         });
                        return [2 /*return*/, store.updateData(data, undefined, replace)];
                }
            });
        });
    };
    TableRenderer.prototype.getData = function () {
        var _a = this.props, store = _a.store, data = _a.data;
        return store.getData(data);
    };
    TableRenderer = __decorate([
        Renderer({
            type: 'table2',
            storeType: TableStore2.name,
            name: 'table2',
            isolateScope: true
        })
    ], TableRenderer);
    return TableRenderer;
})(Table2));

export { Table2 as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
