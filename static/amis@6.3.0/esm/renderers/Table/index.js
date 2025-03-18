/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __read, __rest, __decorate, __metadata } from 'tslib';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { isAlive } from 'mobx-state-tree';
import { reaction } from 'mobx';
import Sortable from 'sortablejs';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import debounce from 'lodash/debounce';
import intersection from 'lodash/intersection';
import isPlainObject from 'lodash/isPlainObject';
import { resolveVariableAndFilter, getPropValue, resizeSensor, isEffectiveApi, offset, getScrollParent, position, getStyleNumber, isObject, changedEffect, anyChanged, isPureVariable, isArrayChildrenModified, createObject, difference, eachTree, animation, resolveVariable, filter, noop, ScopedContext, autobind, getMatchedEventTargets, Renderer, TableStore } from 'amis-core';
import { Icon, Checkbox, Button, Spinner } from 'amis-ui';
export { TableCell } from './TableCell.js';
import { HeadCellFilterDropDown } from './HeadCellFilterDropdown.js';
import { HeadCellSearchDropDown } from './HeadCellSearchDropdown.js';
import TableContent, { renderItemActions } from './TableContent.js';
import ColumnToggler from './ColumnToggler.js';
import { exportExcel } from './exportExcel.js';
import AutoFilterForm from './AutoFilterForm.js';
import Cell from './Cell.js';

var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props, context) {
        var _this = _super.call(this, props) || this;
        _this.renderedToolbars = [];
        _this.subForms = {};
        _this.toDispose = [];
        _this.updateTableInfoLazy = debounce(_this.updateTableInfo.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        _this.updateAutoFillHeightLazy = debounce(_this.updateAutoFillHeight.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        var scoped = context;
        scoped.registerComponent(_this);
        _this.handleOutterScroll = _this.handleOutterScroll.bind(_this);
        _this.tableRef = _this.tableRef.bind(_this);
        _this.affixedTableRef = _this.affixedTableRef.bind(_this);
        _this.updateTableInfo = _this.updateTableInfo.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleCheck = _this.handleCheck.bind(_this);
        _this.handleCheckAll = _this.handleCheckAll.bind(_this);
        _this.handleQuickChange = _this.handleQuickChange.bind(_this);
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleSaveOrder = _this.handleSaveOrder.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.dragTipRef = _this.dragTipRef.bind(_this);
        _this.getPopOverContainer = _this.getPopOverContainer.bind(_this);
        _this.renderCell = _this.renderCell.bind(_this);
        _this.renderHeadCell = _this.renderHeadCell.bind(_this);
        _this.renderToolbar = _this.renderToolbar.bind(_this);
        _this.handleMouseMove = _this.handleMouseMove.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        _this.subFormRef = _this.subFormRef.bind(_this);
        _this.handleColumnToggle = _this.handleColumnToggle.bind(_this);
        _this.handleRowClick = _this.handleRowClick.bind(_this);
        _this.handleRowDbClick = _this.handleRowDbClick.bind(_this);
        _this.handleRowMouseEnter = _this.handleRowMouseEnter.bind(_this);
        _this.handleRowMouseLeave = _this.handleRowMouseLeave.bind(_this);
        _this.updateAutoFillHeight = _this.updateAutoFillHeight.bind(_this);
        var store = props.store, columns = props.columns, selectable = props.selectable, columnsTogglable = props.columnsTogglable, draggable = props.draggable, orderBy = props.orderBy, orderDir = props.orderDir, multiple = props.multiple, footable = props.footable, primaryField = props.primaryField, itemCheckableOn = props.itemCheckableOn, itemDraggableOn = props.itemDraggableOn, hideCheckToggler = props.hideCheckToggler, combineFromIndex = props.combineFromIndex, expandConfig = props.expandConfig, formItem = props.formItem, keepItemSelectionOnPageChange = props.keepItemSelectionOnPageChange, maxKeepItemSelectionLength = props.maxKeepItemSelectionLength, maxItemSelectionLength = props.maxItemSelectionLength, onQuery = props.onQuery, autoGenerateFilter = props.autoGenerateFilter, loading = props.loading, canAccessSuperData = props.canAccessSuperData, lazyRenderAfter = props.lazyRenderAfter, tableLayout = props.tableLayout, resolveDefinitions = props.resolveDefinitions;
        var combineNum = props.combineNum;
        if (typeof combineNum === 'string') {
            combineNum = parseInt(resolveVariableAndFilter(combineNum, props.data, '| raw'), 10);
        }
        store.update({
            selectable: selectable,
            draggable: draggable,
            columns: columns,
            columnsTogglable: columnsTogglable,
            orderBy: onQuery ? orderBy : undefined,
            orderDir: orderDir,
            multiple: multiple,
            footable: footable,
            expandConfig: expandConfig,
            primaryField: primaryField,
            itemCheckableOn: itemCheckableOn,
            itemDraggableOn: itemDraggableOn,
            hideCheckToggler: hideCheckToggler,
            combineNum: combineNum,
            combineFromIndex: combineFromIndex,
            keepItemSelectionOnPageChange: keepItemSelectionOnPageChange,
            maxKeepItemSelectionLength: maxKeepItemSelectionLength,
            maxItemSelectionLength: maxItemSelectionLength,
            loading: loading,
            canAccessSuperData: canAccessSuperData,
            lazyRenderAfter: lazyRenderAfter,
            tableLayout: tableLayout
        }, {
            resolveDefinitions: resolveDefinitions
        });
        if (isPlainObject(autoGenerateFilter) &&
            autoGenerateFilter.defaultCollapsed === false) {
            store.setSearchFormExpanded(true);
        }
        formItem && isAlive(formItem) && formItem.setSubStore(store);
        Table.syncRows(store, _this.props, undefined) && _this.syncSelected();
        _this.toDispose.push(reaction(function () {
            return store
                .getExpandedRows()
                .filter(function (row) { return row.defer && !row.loaded && !row.loading && !row.error; });
        }, function (rows) { return rows.forEach(_this.loadDeferredRow); }));
        return _this;
    }
    Table.syncRows = function (store, props, prevProps) {
        var source = props.source;
        var value = getPropValue(props, function (props) { return props.items; });
        var rows = [];
        var updateRows = false;
        // 要严格比较前后的value值，否则某些情况下会导致循环update无限渲染
        if (Array.isArray(value) &&
            (!prevProps ||
                !isEqual(getPropValue(prevProps, function (props) { return props.items; }), value))) {
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
        if (updateRows) {
            store.initRows(rows, props.getEntryId, props.reUseRow);
        }
        else if (props.reUseRow === false) {
            /**
             * 在reUseRow为false情况下，支持强制刷新表格行状态
             * 适用的情况：用户每次刷新，调用接口，返回的数据都是一样的，导致updateRows为false，故针对每次返回数据一致的情况，需要强制表格更新
             */
            updateRows = true;
            store.initRows(value, props.getEntryId, props.reUseRow);
        }
        Array.isArray(props.selected) &&
            store.updateSelected(props.selected, props.valueField);
        return updateRows;
    };
    Table.prototype.componentDidMount = function () {
        var currentNode = findDOMNode(this);
        if (this.props.autoFillHeight) {
            this.toDispose.push(resizeSensor(currentNode.parentElement, this.updateAutoFillHeightLazy, false, 'height'));
            this.updateAutoFillHeight();
        }
        this.toDispose.push(resizeSensor(currentNode, this.updateTableInfoLazy, false, 'width'));
        var _a = this.props, store = _a.store, autoGenerateFilter = _a.autoGenerateFilter, onSearchableFromInit = _a.onSearchableFromInit;
        // autoGenerateFilter 开启后
        // 如果没有一个 searchable 的 column crud 就不会初始化加载
        // 所以这里加个判断默认初始加载一次
        if (autoGenerateFilter &&
            !store.searchableColumns.length &&
            onSearchableFromInit) {
            onSearchableFromInit({});
        }
    };
    Table.prototype.loadDeferredRow = function (row) {
        return __awaiter(this, void 0, void 0, function () {
            var env, deferApi, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        env = this.props.env;
                        deferApi = row.data.deferApi || this.props.deferApi;
                        if (!isEffectiveApi(deferApi)) {
                            throw new Error('deferApi is required');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        row.markLoading(true);
                        return [4 /*yield*/, env.fetcher(deferApi, row.locals)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error(response.msg);
                        }
                        row.updateData(response.data);
                        row.markLoaded(true);
                        row.setError('');
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        row.setError(e_1.message);
                        env.notify('error', e_1.message);
                        return [3 /*break*/, 5];
                    case 4:
                        row.markLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 自动设置表格高度占满界面剩余区域
     * 用 css 实现有点麻烦，要改很多结构，所以先用 dom hack 了，避免对之前的功能有影响
     */
    Table.prototype.updateAutoFillHeight = function () {
        var _this = this;
        var _a = this.props, autoFillHeight = _a.autoFillHeight; _a.footerToolbar; _a.classPrefix;
        if (!autoFillHeight) {
            return;
        }
        var table = this.table;
        var tableContent = table.parentElement;
        if (!tableContent) {
            return;
        }
        // 可能数据还没到，没有渲染 footer
        // 也可能是弹窗中，弹窗还在动画中，等一下再执行
        if (!tableContent.offsetHeight ||
            tableContent.getBoundingClientRect().height / tableContent.offsetHeight <
                0.8) {
            this.timer = setTimeout(function () {
                _this.updateAutoFillHeight();
            }, 100);
            return;
        }
        // 计算 table-content 在 dom 中的位置
        var viewportHeight = window.innerHeight;
        var tableContentTop = offset(tableContent).top;
        var parent = getScrollParent(tableContent.parentElement);
        if (parent && parent !== document.body) {
            viewportHeight = parent.clientHeight - 1;
            tableContentTop = position(tableContent, parent).top;
        }
        var tableContentBottom = 0;
        var selfNode = tableContent;
        var parentNode = selfNode.parentElement;
        while (parentNode) {
            var paddingBottom = getStyleNumber(parentNode, 'padding-bottom');
            var borderBottom = getStyleNumber(parentNode, 'border-bottom-width');
            var nextSiblingHeight = 0;
            var nextSibling = selfNode.nextElementSibling;
            while (nextSibling) {
                var positon = getComputedStyle(nextSibling).position;
                if (positon !== 'absolute' && positon !== 'fixed') {
                    nextSiblingHeight +=
                        nextSibling.offsetHeight +
                            getStyleNumber(nextSibling, 'margin-bottom');
                }
                nextSibling = nextSibling.nextElementSibling;
            }
            var marginBottom = getStyleNumber(selfNode, 'margin-bottom');
            tableContentBottom +=
                paddingBottom + borderBottom + marginBottom + nextSiblingHeight;
            selfNode = parentNode;
            parentNode = selfNode.parentElement;
            if (parent && parent !== document.body && parent === selfNode) {
                break;
            }
        }
        var heightField = autoFillHeight && autoFillHeight.maxHeight
            ? 'maxHeight'
            : 'height';
        var heightValue = isObject(autoFillHeight)
            ? autoFillHeight[heightField]
            : 0;
        var tableContentHeight = heightValue
            ? "".concat(heightValue, "px")
            : "".concat(Math.round(viewportHeight - tableContentTop - tableContentBottom), "px");
        tableContent.style[heightField] = tableContentHeight;
    };
    Table.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var store = props.store;
        changedEffect([
            'selectable',
            'columnsTogglable',
            'draggable',
            'orderBy',
            'orderDir',
            'multiple',
            'footable',
            'primaryField',
            'itemCheckableOn',
            'itemDraggableOn',
            'hideCheckToggler',
            'combineNum',
            'combineFromIndex',
            'expandConfig',
            'columns',
            'loading',
            'canAccessSuperData',
            'lazyRenderAfter',
            'tableLayout'
        ], prevProps, props, function (changes) {
            if (changes.hasOwnProperty('combineNum') &&
                typeof changes.combineNum === 'string') {
                changes.combineNum = parseInt(resolveVariableAndFilter(changes.combineNum, props.data, '| raw'), 10);
            }
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
            Table.syncRows(store, props, prevProps) && this.syncSelected();
        }
        else if (isArrayChildrenModified(prevProps.selected, props.selected)) {
            var prevSelectedRows = store.selectedRows
                .map(function (item) { return item.id; })
                .join(',');
            store.updateSelected(props.selected || [], props.valueField);
            if (Array.isArray(props.selected) &&
                Array.isArray(prevProps.selected) &&
                props.selected.length === prevProps.selected.length) {
                // 只有长度一样才检测具体的值是否变了
                var selectedRows = store.selectedRows.map(function (item) { return item.id; }).join(',');
                prevSelectedRows !== selectedRows && this.syncSelected();
            }
            else {
                this.syncSelected();
            }
        }
    };
    Table.prototype.componentWillUnmount = function () {
        var formItem = this.props.formItem;
        this.toDispose.forEach(function (fn) { return fn(); });
        this.toDispose = [];
        this.updateTableInfoLazy.cancel();
        this.updateAutoFillHeightLazy.cancel();
        formItem && isAlive(formItem) && formItem.setSubStore(null);
        clearTimeout(this.timer);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    Table.prototype.rowPathPlusOffset = function (path, offset) {
        if (offset === void 0) { offset = 0; }
        var list = path.split('.').map(function (item) { return parseInt(item, 10); });
        list[0] += offset;
        return list.join('.');
    };
    Table.prototype.subFormRef = function (form, x, y) {
        var quickEditFormRef = this.props.quickEditFormRef;
        quickEditFormRef && quickEditFormRef(form, x, y);
        this.subForms["".concat(x, "-").concat(y)] = form;
        form && this.props.store.addForm(form.props.store, y);
    };
    Table.prototype.handleAction = function (e, action, ctx) {
        var onAction = this.props.onAction;
        // todo
        onAction(e, action, ctx);
    };
    Table.prototype.handleCheck = function (item, value, shift) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, data, dispatchEvent, selectable, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, store = _a.store, data = _a.data, dispatchEvent = _a.dispatchEvent, selectable = _a.selectable;
                        if (!selectable) {
                            return [2 /*return*/];
                        }
                        value = value !== undefined ? value : !item.checked;
                        if (shift) {
                            store.toggleShift(item, value);
                        }
                        else {
                            // 如果picker的value是绑定的上层数量变量
                            // 那么用户只能通过事件动作来更新上层变量来实现选中
                            item.toggle(value);
                        }
                        return [4 /*yield*/, dispatchEvent('selectedChange', createObject(data, {
                                selectedItems: store.selectedRows.map(function (row) { return row.data; }),
                                unSelectedItems: store.unSelectedRows.map(function (row) { return row.data; }),
                                item: item.data
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.syncSelected();
                        return [2 /*return*/];
                }
            });
        });
    };
    Table.prototype.handleRowClick = function (item, index) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, _b = _a.offset, offset = _b === void 0 ? 0 : _b; _a.store; var data = _a.data;
        return dispatchEvent('rowClick', createObject(data, {
            rowItem: item.data,
            item: item.data,
            index: index + offset,
            indexPath: this.rowPathPlusOffset(item.path, offset)
        }));
    };
    Table.prototype.handleRowDbClick = function (item, index) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, _b = _a.offset, offset = _b === void 0 ? 0 : _b; _a.store; var data = _a.data;
        return dispatchEvent('rowDbClick', createObject(data, {
            item: item.data,
            index: index + offset,
            indexPath: this.rowPathPlusOffset(item.path, offset)
        }));
    };
    Table.prototype.handleRowMouseEnter = function (item, index) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, _b = _a.offset, offset = _b === void 0 ? 0 : _b; _a.store; var data = _a.data;
        return dispatchEvent('rowMouseEnter', createObject(data, {
            item: item.data,
            index: index + offset,
            indexPath: this.rowPathPlusOffset(item.path, offset)
        }));
    };
    Table.prototype.handleRowMouseLeave = function (item, index) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, _b = _a.offset, offset = _b === void 0 ? 0 : _b; _a.store; var data = _a.data;
        return dispatchEvent('rowMouseLeave', createObject(data, {
            item: item.data,
            index: index + offset,
            indexPath: this.rowPathPlusOffset(item.path, offset)
        }));
    };
    Table.prototype.handleCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, data, dispatchEvent, items, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, store = _a.store, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        items = store.rows.map(function (row) { return row.data; });
                        store.toggleAll();
                        return [4 /*yield*/, dispatchEvent('selectedChange', createObject(data, {
                                selectedItems: store.selectedRows.map(function (row) { return row.data; }),
                                unSelectedItems: store.unSelectedRows.map(function (row) { return row.data; }),
                                items: items
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.syncSelected();
                        return [2 /*return*/];
                }
            });
        });
    };
    Table.prototype.handleQuickChange = function (item, values, saveImmediately, savePristine, options) {
        if (!isAlive(item)) {
            return;
        }
        var _a = this.props, onSave = _a.onSave, onPristineChange = _a.onPristineChange, propsSaveImmediately = _a.saveImmediately, primaryField = _a.primaryField;
        item.change(values, savePristine);
        // 依然解决不了问题，所以先注释掉
        // 预期是，这个表党项修改的时候，把其他还没运算公式的表单更新最新值
        // 好让公式计算触发的值是最新的
        // 但是事与愿违，应该是修改了 store.data 但是 props.data 还没变过来
        // 即便如此，但是最终还是会算正确，只是会多触发几次 onChange :(
        // const y = item.index;
        // const str = `-${y}`;
        // Object.keys(this.subForms).forEach(key => {
        //   if (key.endsWith(str)) {
        //     this.subForms[key].props.store.updateData(values);
        //   }
        // });
        // 值发生变化了，需要通过 onSelect 通知到外面，否则会出现数据不同步的问题
        item.modified && this.syncSelected();
        if (savePristine) {
            onPristineChange === null || onPristineChange === void 0 ? void 0 : onPristineChange(item.data, item.path);
            return;
        }
        else if (!saveImmediately && !propsSaveImmediately) {
            return;
        }
        if (saveImmediately && saveImmediately.api) {
            this.props.onAction(null, {
                actionType: 'ajax',
                api: saveImmediately.api,
                reload: options === null || options === void 0 ? void 0 : options.reload
            }, item.locals);
            return;
        }
        if (!onSave) {
            return;
        }
        onSave(item.data, difference(item.data, item.pristine, ['id', primaryField]), item.path, undefined, item.pristine, options);
    };
    Table.prototype.handleSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, onSave, primaryField, subForms, result, subFormItems, result, rows, rowIndexes, diff, unModifiedRows;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, store = _a.store, onSave = _a.onSave, primaryField = _a.primaryField;
                        if (!onSave || !store.modifiedRows.length) {
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
                        subFormItems = store.children.filter(function (item) { return (item === null || item === void 0 ? void 0 : item.storeType) === 'FormItemStore'; });
                        if (!subFormItems.length) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(subFormItems.map(function (item) {
                                var ctx = {};
                                if (item.rowIndex && store.rows[item.rowIndex]) {
                                    ctx = store.rows[item.rowIndex].data;
                                }
                                return item.validate(ctx);
                            }))];
                    case 3:
                        result = _b.sent();
                        if (~result.indexOf(false)) {
                            return [2 /*return*/];
                        }
                        _b.label = 4;
                    case 4:
                        rows = store.modifiedRows.map(function (item) { return item.data; });
                        rowIndexes = store.modifiedRows.map(function (item) { return item.path; });
                        diff = store.modifiedRows.map(function (item) {
                            return difference(item.data, item.pristine, ['id', primaryField]);
                        });
                        unModifiedRows = store.rows
                            .filter(function (item) { return !item.modified; })
                            .map(function (item) { return item.data; });
                        onSave(rows, diff, rowIndexes, unModifiedRows, store.modifiedRows.map(function (item) { return item.pristine; }));
                        return [2 /*return*/];
                }
            });
        });
    };
    Table.prototype.handleSaveOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, onSaveOrder, data, dispatchEvent, movedItems, items, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, store = _a.store, onSaveOrder = _a.onSaveOrder, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        movedItems = store.movedRows.map(function (item) { return item.data; });
                        items = store.rows.map(function (item) { return item.getDataWithModifiedChilden(); });
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
    Table.prototype.syncSelected = function () {
        var _a = this.props, store = _a.store, onSelect = _a.onSelect;
        onSelect &&
            onSelect(store.selectedRows.map(function (item) { return item.data; }), store.unSelectedRows.map(function (item) { return item.data; }));
    };
    Table.prototype.reset = function () {
        var _this = this;
        var store = this.props.store;
        store.reset();
        var subForms = [];
        Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms.push(_this.subForms[key]); });
        subForms.forEach(function (item) { return item.clearErrors(); });
        // 去掉错误提示
        var subFormItems = store.children.filter(function (item) { return (item === null || item === void 0 ? void 0 : item.storeType) === 'FormItemStore'; });
        if (subFormItems.length) {
            subFormItems.map(function (item) { return item.reset(); });
        }
    };
    Table.prototype.bulkUpdate = function (value, items) {
        var _a = this.props, store = _a.store, primaryField = _a.primaryField;
        if (primaryField && value.ids) {
            var ids_1 = value.ids.split(',');
            var rows = store.rows.filter(function (item) {
                return find(ids_1, function (id) { return id && id == item.data[primaryField]; });
            });
            var newValue_1 = __assign(__assign({}, value), { ids: undefined });
            rows.forEach(function (row) { return row.change(newValue_1); });
        }
        else if (Array.isArray(items)) {
            var rows = store.rows.filter(function (item) { return ~items.indexOf(item.pristine); });
            rows.forEach(function (row) { return row.change(value); });
        }
    };
    Table.prototype.getSelected = function () {
        var store = this.props.store;
        return store.selectedRows.map(function (item) { return item.data; });
    };
    Table.prototype.updateTableInfo = function (callback) {
        if (this.resizeLine) {
            return;
        }
        this.props.store.initTableWidth();
        this.props.store.syncTableWidth();
        this.handleOutterScroll();
        callback && setTimeout(callback, 20);
    };
    // 当表格滚动是，需要让 affixHeader 部分的表格也滚动
    Table.prototype.handleOutterScroll = function () {
        var table = this.table;
        if (!table) {
            return;
        }
        var outter = table === null || table === void 0 ? void 0 : table.parentNode;
        var scrollLeft = outter.scrollLeft;
        if (this.affixedTable) {
            this.affixedTable.parentElement.scrollLeft = scrollLeft;
        }
        if (this.props.store.filteredColumns.some(function (column) { return column.fixed; })) {
            var leading_1 = scrollLeft === 0;
            var trailing_1 = Math.ceil(scrollLeft) + outter.offsetWidth >= table.scrollWidth;
            [table, this.affixedTable]
                .filter(function (item) { return item; })
                .forEach(function (table) {
                table.classList.remove('table-fixed-left', 'table-fixed-right');
                leading_1 || table.classList.add('table-fixed-left');
                trailing_1 || table.classList.add('table-fixed-right');
            });
        }
    };
    Table.prototype.tableRef = function (ref) {
        this.table = ref;
        isAlive(this.props.store) && this.props.store.setTable(ref);
        ref && this.handleOutterScroll();
    };
    Table.prototype.dragTipRef = function (ref) {
        if (!this.dragTip && ref) {
            this.initDragging();
        }
        else if (this.dragTip && !ref) {
            this.destroyDragging();
        }
        this.dragTip = ref;
    };
    Table.prototype.affixedTableRef = function (ref) {
        this.affixedTable = ref;
        ref && this.handleOutterScroll();
    };
    Table.prototype.initDragging = function () {
        var _this = this;
        var _a = this.props, store = _a.store, ns = _a.classPrefix;
        this.sortable = new Sortable(this.table.querySelector(':scope>tbody'), {
            group: 'table',
            animation: 150,
            handle: ".".concat(ns, "Table-dragCell"),
            filter: ".".concat(ns, "Table-dragCell.is-dragDisabled"),
            ghostClass: 'is-dragging',
            onEnd: function (e) { return __awaiter(_this, void 0, void 0, function () {
                var parent;
                return __generator(this, function (_a) {
                    // 没有移动
                    if (e.newIndex === e.oldIndex) {
                        return [2 /*return*/];
                    }
                    parent = e.to;
                    if (e.oldIndex < parent.childNodes.length - 1) {
                        parent.insertBefore(e.item, parent.childNodes[e.oldIndex > e.newIndex ? e.oldIndex + 1 : e.oldIndex]);
                    }
                    else {
                        parent.appendChild(e.item);
                    }
                    store.exchange(e.oldIndex, e.newIndex);
                    return [2 /*return*/];
                });
            }); }
        });
    };
    Table.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    Table.prototype.getPopOverContainer = function () {
        return findDOMNode(this);
    };
    Table.prototype.handleMouseMove = function (e) {
        var tr = e.target.closest('tr[data-id]');
        if (!tr) {
            return;
        }
        var _a = this.props, store = _a.store; _a.affixColumns; _a.itemActions;
        // if (
        //   (affixColumns === false ||
        //     (store.leftFixedColumns.length === 0 &&
        //       store.rightFixedColumns.length === 0)) &&
        //   (!itemActions || !itemActions.filter(item => !item.hiddenOnHover).length)
        // ) {
        //   return;
        // }
        var id = tr.getAttribute('data-id');
        var row = store.hoverRow;
        if ((row === null || row === void 0 ? void 0 : row.id) === id) {
            return;
        }
        eachTree(store.rows, function (item) { return item.setIsHover(item.id === id); });
    };
    Table.prototype.handleMouseLeave = function () {
        var store = this.props.store;
        var row = store.hoverRow;
        row === null || row === void 0 ? void 0 : row.setIsHover(false);
    };
    Table.prototype.handleDragStart = function (e) {
        var store = this.props.store;
        var target = e.currentTarget;
        var tr = (this.draggingTr = target.closest('tr'));
        var id = tr.getAttribute('data-id');
        var tbody = tr.parentNode;
        this.originIndex = Array.prototype.indexOf.call(tbody.childNodes, tr);
        tbody.classList.add('is-dragging');
        tr.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.setDragImage(tr, 0, 0);
        var item = store.getRowById(id);
        store.collapseAllAtDepth(item.depth);
        var siblings = store.rows;
        if (item.parentId) {
            var parent_1 = store.getRowById(item.parentId);
            siblings = parent_1.children;
        }
        siblings = siblings.filter(function (sibling) { return sibling !== item; });
        tbody.addEventListener('dragover', this.handleDragOver);
        tbody.addEventListener('drop', this.handleDrop);
        this.draggingSibling = siblings.map(function (item) {
            var tr = tbody.querySelector(":scope>tr[data-id=\"".concat(item.id, "\"]"));
            tr.classList.add('is-drop-allowed');
            return tr;
        });
        tr.addEventListener('dragend', this.handleDragEnd);
    };
    Table.prototype.handleDragOver = function (e) {
        if (!e.target) {
            return;
        }
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        var overTr = e.target.closest('tr');
        if (!overTr ||
            !~overTr.className.indexOf('is-drop-allowed') ||
            overTr === this.draggingTr ||
            animation.animating) {
            return;
        }
        var tbody = overTr.parentElement;
        var tRect = overTr.getBoundingClientRect();
        var next = (e.clientY - tRect.top) / (tRect.bottom - tRect.top) > 0.5;
        animation.capture(tbody);
        var before = next ? overTr.nextSibling : overTr;
        before
            ? tbody.insertBefore(this.draggingTr, before)
            : tbody.appendChild(this.draggingTr);
        animation.animateAll();
    };
    Table.prototype.handleDrop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var store, tr, tbody, index, item;
            return __generator(this, function (_a) {
                store = this.props.store;
                tr = this.draggingTr;
                tbody = tr.parentElement;
                index = Array.prototype.indexOf.call(tbody.childNodes, tr);
                item = store.getRowById(tr.getAttribute('data-id'));
                // destroy
                this.handleDragEnd();
                store.exchange(this.originIndex, index, item);
                return [2 /*return*/];
            });
        });
    };
    Table.prototype.handleDragEnd = function () {
        var tr = this.draggingTr;
        var tbody = tr.parentElement;
        var index = Array.prototype.indexOf.call(tbody.childNodes, tr);
        tbody.insertBefore(tr, tbody.childNodes[index < this.originIndex ? this.originIndex + 1 : this.originIndex]);
        tr.classList.remove('is-dragging');
        tbody.classList.remove('is-dragging');
        tr.removeEventListener('dragend', this.handleDragEnd);
        tbody.removeEventListener('dragover', this.handleDragOver);
        tbody.removeEventListener('drop', this.handleDrop);
        this.draggingSibling.forEach(function (item) {
            return item.classList.remove('is-drop-allowed');
        });
    };
    Table.prototype.handleImageEnlarge = function (info, target) {
        var onImageEnlarge = this.props.onImageEnlarge;
        // 如果已经是多张了，直接跳过
        if ((Array.isArray(info.list) && info.enlargeWithGallary !== true) ||
            info.enlargeWithGallary === false) {
            return onImageEnlarge && onImageEnlarge(info, target);
        }
        // 从列表中收集所有图片，然后作为一个图片集合派送出去。
        var store = this.props.store;
        var column = store.columns[target.colIndex].pristine;
        var index = target.rowIndex;
        var list = [];
        store.rows.forEach(function (row, i) {
            var src = resolveVariable(column.name, row.data);
            if (!src) {
                if (i < target.rowIndex) {
                    index--;
                }
                return;
            }
            var images = Array.isArray(src) ? src : [src];
            list = list.concat(images.map(function (item) { return ({
                src: item,
                originalSrc: column.originalSrc
                    ? filter(column.originalSrc, row.data)
                    : item,
                title: column.enlargeTitle
                    ? filter(column.enlargeTitle, row.data)
                    : column.title
                        ? filter(column.title, row.data)
                        : undefined,
                caption: column.enlargeCaption
                    ? filter(column.enlargeCaption, row.data)
                    : column.caption
                        ? filter(column.caption, row.data)
                        : undefined
            }); }));
        });
        if (list.length > 1) {
            onImageEnlarge &&
                onImageEnlarge(__assign(__assign({}, info), { list: list, index: index }), target);
        }
        else {
            onImageEnlarge && onImageEnlarge(info, target);
        }
    };
    // 开始列宽度调整
    Table.prototype.handleColResizeMouseDown = function (e) {
        this.lineStartX = e.clientX;
        var currentTarget = e.currentTarget;
        this.resizeLine = currentTarget;
        var store = this.props.store;
        var index = parseInt(this.resizeLine.getAttribute('data-index'), 10);
        var column = store.columns[index];
        this.lineStartWidth = column.realWidth || column.width;
        this.resizeLine.classList.add('is-resizing');
        document.addEventListener('mousemove', this.handleColResizeMouseMove);
        document.addEventListener('mouseup', this.handleColResizeMouseUp);
        // 防止选中文本
        e.preventDefault();
        e.stopPropagation();
    };
    // 垂直线拖拽移动
    Table.prototype.handleColResizeMouseMove = function (e) {
        var moveX = e.clientX - this.lineStartX;
        var store = this.props.store;
        var index = parseInt(this.resizeLine.getAttribute('data-index'), 10);
        var column = store.columns[index];
        column.setWidth(Math.max(this.lineStartWidth + moveX, 30, column.minWidth));
    };
    // 垂直线拖拽结束
    Table.prototype.handleColResizeMouseUp = function (e) {
        this.resizeLine.classList.remove('is-resizing');
        delete this.resizeLine;
        document.removeEventListener('mousemove', this.handleColResizeMouseMove);
        document.removeEventListener('mouseup', this.handleColResizeMouseUp);
    };
    Table.prototype.handleColumnToggle = function (columns) {
        var store = this.props.store;
        store.updateColumns(columns);
        store.persistSaveToggledColumns();
    };
    Table.prototype.renderAutoFilterForm = function () {
        var _a = this.props, render = _a.render, store = _a.store, onSearchableFromReset = _a.onSearchableFromReset, onSearchableFromSubmit = _a.onSearchableFromSubmit, onSearchableFromInit = _a.onSearchableFromInit, cx = _a.classnames, __ = _a.translate, query = _a.query, data = _a.data, autoGenerateFilter = _a.autoGenerateFilter, testIdBuilder = _a.testIdBuilder;
        var searchableColumns = store.searchableColumns;
        if (!searchableColumns.length) {
            return null;
        }
        return (React.createElement(AutoFilterForm, { store: store, query: query, data: data, translate: __, classnames: cx, render: render, autoGenerateFilter: autoGenerateFilter, onSearchableFromReset: onSearchableFromReset, onSearchableFromSubmit: onSearchableFromSubmit, onSearchableFromInit: onSearchableFromInit, popOverContainer: this.getPopOverContainer, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('filter') }));
    };
    Table.prototype.renderHeading = function () {
        var _a = this.props, title = _a.title, store = _a.store, hideQuickSaveBtn = _a.hideQuickSaveBtn, data = _a.data, cx = _a.classnames, saveImmediately = _a.saveImmediately, headingClassName = _a.headingClassName, quickSaveApi = _a.quickSaveApi, __ = _a.translate, columns = _a.columns;
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
        if (title ||
            (quickSaveApi &&
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
                React.createElement("button", { type: "button", className: cx('Button Button--xs Button--success m-l-sm'), onClick: this.handleSaveOrder },
                    React.createElement(Icon, { icon: "check", className: "icon m-r-xs" }),
                    __('Form.submit')),
                React.createElement("button", { type: "button", className: cx('Button Button--xs Button--danger m-l-sm'), onClick: this.reset },
                    React.createElement(Icon, { icon: "close", className: "icon m-r-xs" }),
                    __('Table.discard')))) : title ? (filter(title, data)) : ('')));
        }
        return null;
    };
    Table.prototype.renderHeadCell = function (column, props) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        var _f = this.props, store = _f.store, query = _f.query, onQuery = _f.onQuery, render = _f.render, ns = _f.classPrefix, resizable = _f.resizable, cx = _f.classnames, autoGenerateFilter = _f.autoGenerateFilter, dispatchEvent = _f.dispatchEvent, data = _f.data;
        // 注意，这里用关了哪些 store 里面的东西，TableContent 里面得也用一下
        // 因为 renderHeadCell 是 TableContent 回调的，tableContent 不重新渲染，这里面也不会重新渲染
        var style = __assign({}, props.style);
        var _g = __read(store.getStickyStyles(column, store.filteredColumns), 2), stickyStyle = _g[0], stickyClassName = _g[1];
        Object.assign(style, stickyStyle);
        /** 如果当前列定宽，则不能操作drag bar */
        var pristineWidth = (_c = (_b = (_a = store.columns) === null || _a === void 0 ? void 0 : _a[column.index]) === null || _b === void 0 ? void 0 : _b.pristine) === null || _c === void 0 ? void 0 : _c.width;
        var disableColDrag = '__' !== column.type.substring(0, 2) &&
            typeof pristineWidth === 'number' &&
            pristineWidth > 0;
        var resizeLine = (React.createElement("div", { className: cx('Table-content-colDragLine', {
                'Table-content-colDragLine--disabled': disableColDrag
            }), key: "resize-".concat(column.id), "data-index": column.index, onMouseDown: disableColDrag ? noop : this.handleColResizeMouseDown }));
        // th 里面不应该设置
        if (style === null || style === void 0 ? void 0 : style.width) {
            delete style.width;
        }
        if (column.pristine.align) {
            style.textAlign = column.pristine.align;
        }
        if (column.type === '__checkme') {
            return (React.createElement("th", __assign({}, props, { style: style, className: cx(column.pristine.className, stickyClassName) }),
                store.rows.length && store.multiple ? (React.createElement(Checkbox, { classPrefix: ns, partial: store.someChecked && !store.allChecked, checked: store.someChecked, disabled: store.isSelectionThresholdReached && !store.someChecked, onChange: this.handleCheckAll })) : ('\u00A0'),
                resizable === false ? null : resizeLine));
        }
        else if (column.type === '__dragme') {
            return (React.createElement("th", __assign({}, props, { style: style, className: cx(column.pristine.className, stickyClassName) })));
        }
        else if (column.type === '__expandme') {
            return (React.createElement("th", __assign({}, props, { style: style, className: cx(column.pristine.className, stickyClassName) }),
                (store.footable &&
                    (store.footable.expandAll === false || store.footable.accordion)) ||
                    (store.expandConfig &&
                        (store.expandConfig.expandAll === false ||
                            store.expandConfig.accordion)) ? null : (React.createElement("a", { className: cx('Table-expandBtn', store.allExpanded ? 'is-active' : ''), 
                    // data-tooltip="展开/收起全部"
                    // data-position="top"
                    onClick: store.toggleExpandAll },
                    React.createElement(Icon, { icon: "right-arrow-bold", className: "icon" }))),
                resizable === false ? null : resizeLine));
        }
        var prefix = [];
        var affix = [];
        if (column.isPrimary && store.isNested) {
            (store.footable &&
                (store.footable.expandAll === false || store.footable.accordion)) ||
                (store.expandConfig &&
                    (store.expandConfig.expandAll === false ||
                        store.expandConfig.accordion)) ||
                prefix.push(React.createElement("a", { key: "expandBtn", className: cx('Table-expandBtn2', store.allExpanded ? 'is-active' : ''), 
                    // data-tooltip="展开/收起全部"
                    // data-position="top"
                    onClick: store.toggleExpandAll },
                    React.createElement(Icon, { icon: "right-arrow-bold", className: "icon" })));
        }
        if (column.searchable && column.name && !autoGenerateFilter) {
            affix.push(React.createElement(HeadCellSearchDropDown, __assign({}, props, { key: "table-head-search" }, this.props, { onQuery: onQuery, name: column.name, searchable: column.searchable, type: column.type, data: query, popOverContainer: this.getPopOverContainer })));
        }
        if (column.sortable && column.name) {
            affix.push(React.createElement("span", __assign({}, props, { key: "table-head-sort", className: cx('TableCell-sortBtn'), onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    var orderBy, orderDir, order, rendererEvent;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                orderBy = '';
                                orderDir = '';
                                if (column.name === store.orderBy) {
                                    if (store.orderDir !== 'desc') {
                                        // 升序之后降序
                                        orderBy = column.name;
                                        orderDir = 'desc';
                                    }
                                }
                                else {
                                    orderBy = column.name;
                                }
                                order = orderBy ? (orderDir ? 'desc' : 'asc') : '';
                                return [4 /*yield*/, dispatchEvent('columnSort', createObject(data, {
                                        orderBy: orderBy,
                                        orderDir: order
                                    }))];
                            case 1:
                                rendererEvent = _a.sent();
                                if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                                    return [2 /*return*/];
                                }
                                if (!onQuery ||
                                    onQuery({
                                        orderBy: orderBy,
                                        orderDir: order
                                    }) === false) {
                                    store.changeOrder(orderBy, order);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); } }),
                React.createElement("i", { className: cx('TableCell-sortBtn--down', store.orderBy === column.name && store.orderDir === 'desc'
                        ? 'is-active'
                        : '') },
                    React.createElement(Icon, { icon: "sort-desc", className: "icon" })),
                React.createElement("i", { className: cx('TableCell-sortBtn--up', store.orderBy === column.name && store.orderDir === 'asc'
                        ? 'is-active'
                        : '') },
                    React.createElement(Icon, { icon: "sort-asc", className: "icon" })),
                React.createElement("i", { className: cx('TableCell-sortBtn--default', store.orderBy === column.name ? '' : 'is-active') },
                    React.createElement(Icon, { icon: "sort-default", className: "icon" }))));
        }
        if (!column.searchable && column.filterable && column.name && onQuery) {
            affix.push(React.createElement(HeadCellFilterDropDown, __assign({ key: "table-head-filter" }, this.props, { onQuery: onQuery, name: column.name, type: column.type, data: query, superData: createObject(data, query), filterable: column.filterable, popOverContainer: this.getPopOverContainer })));
        }
        return (React.createElement("th", __assign({}, props, { style: style, className: cx(props ? props.className : '', stickyClassName, {
                'TableCell--sortable': column.sortable,
                'TableCell--searchable': column.searchable,
                'TableCell--filterable': column.filterable,
                'Table-operationCell': column.type === 'operation'
            }) }),
            prefix,
            React.createElement("div", { key: "content", className: cx("TableCell--title", column.pristine.className, column.pristine.labelClassName), style: props.style },
                ((_d = props.label) !== null && _d !== void 0 ? _d : column.label)
                    ? render('tpl', (_e = props.label) !== null && _e !== void 0 ? _e : column.label)
                    : null,
                column.remark
                    ? render('remark', {
                        type: 'remark',
                        tooltip: column.remark,
                        container: this.getPopOverContainer
                    })
                    : null),
            affix,
            resizable === false ? null : resizeLine));
    };
    Table.prototype.renderCell = function (region, column, item, props, ignoreDrag) {
        if (ignoreDrag === void 0) { ignoreDrag = false; }
        var _a = this.props, render = _a.render, store = _a.store, ns = _a.classPrefix, cx = _a.classnames, canAccessSuperData = _a.canAccessSuperData, itemBadge = _a.itemBadge, translate = _a.translate, testIdBuilder = _a.testIdBuilder;
        return (React.createElement(Cell, { key: props.key, region: region, column: column, item: item, props: props, ignoreDrag: ignoreDrag, render: render, store: store, multiple: store.multiple, canAccessSuperData: canAccessSuperData, classnames: cx, classPrefix: ns, itemBadge: itemBadge, onCheck: this.handleCheck, onDragStart: this.handleDragStart, popOverContainer: this.getPopOverContainer, quickEditFormRef: this.subFormRef, onImageEnlarge: this.handleImageEnlarge, translate: translate, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("cell-".concat(props.rowPath, "-").concat(column.index)) }));
    };
    Table.prototype.renderAffixHeader = function (tableClassName) {
        var _this = this;
        var _a = this.props, store = _a.store, affixHeader = _a.affixHeader, render = _a.render, cx = _a.classnames, autoFillHeight = _a.autoFillHeight; _a.env;
        var hideHeader = store.filteredColumns.every(function (column) { return !column.label; });
        var columnsGroup = store.columnGroup;
        return affixHeader && !autoFillHeight ? (React.createElement(React.Fragment, null,
            React.createElement("div", { className: cx('Table-fixedTop', {
                    'is-fakeHide': hideHeader
                }) },
                this.renderHeader(false),
                this.renderHeading(),
                store.columnWidthReady ? (React.createElement("div", { className: cx('Table-wrapper') },
                    React.createElement("table", { ref: this.affixedTableRef, className: cx(tableClassName, store.tableLayout === 'fixed' ? 'is-layout-fixed' : '') },
                        React.createElement("colgroup", null, store.filteredColumns.map(function (column) {
                            var style = {
                                width: "var(--Table-column-".concat(column.index, "-width)")
                            };
                            if (store.tableLayout === 'auto') {
                                style.minWidth = style.width;
                            }
                            return (React.createElement("col", { "data-index": column.index, style: style, key: column.id }));
                        })),
                        React.createElement("thead", null,
                            columnsGroup.length ? (React.createElement("tr", null, columnsGroup.map(function (item, index) {
                                var _a = __read(store.getStickyStyles(item, columnsGroup), 2), stickyStyle = _a[0], stickyClassName = _a[1];
                                return item.rowSpan === 1 ? ( // 如果是分组自己，则用 th 渲染
                                React.createElement("th", { key: index, "data-index": item.index, colSpan: item.colSpan, rowSpan: item.rowSpan, style: stickyStyle, className: stickyClassName }, item.label ? render('tpl', item.label) : null)) : (
                                // 否则走 renderCell 因为不走的话，排序按钮不会渲染
                                _this.renderHeadCell(item.has[0], {
                                    'label': item.label,
                                    'key': index,
                                    'data-index': item.index,
                                    'colSpan': item.colSpan,
                                    'rowSpan': item.rowSpan,
                                    'style': stickyStyle,
                                    'className': stickyClassName
                                }));
                            }))) : null,
                            React.createElement("tr", null, store.filteredColumns.map(function (column) {
                                var _a;
                                return ((_a = columnsGroup.find(function (group) { return ~group.has.indexOf(column); })) === null || _a === void 0 ? void 0 : _a.rowSpan) === 2
                                    ? null
                                    : _this.renderHeadCell(column, {
                                        'key': column.index,
                                        'data-index': column.index
                                    });
                            })))))) : null))) : null;
    };
    Table.prototype.renderToolbar = function (toolbar) {
        var type = toolbar.type || toolbar;
        if (type === 'columns-toggler') {
            this.renderedToolbars.push(type);
            return this.renderColumnsToggler(toolbar);
        }
        else if (type === 'drag-toggler') {
            this.renderedToolbars.push(type);
            return this.renderDragToggler();
        }
        else if (type === 'export-excel') {
            this.renderedToolbars.push(type);
            return this.renderExportExcel(toolbar);
        }
        else if (type === 'export-excel-template') {
            this.renderedToolbars.push(type);
            return this.renderExportExcelTemplate(toolbar);
        }
        return void 0;
    };
    Table.prototype.renderColumnsToggler = function (config) {
        var _this = this;
        var _a;
        var _b = this.props; _b.className; var store = _b.store, ns = _b.classPrefix, cx = _b.classnames; _b.affixRow; var rest = __rest(_b, ["className", "store", "classPrefix", "classnames", "affixRow"]);
        var __ = rest.translate;
        var env = rest.env;
        var render = this.props.render;
        if (!store.columnsTogglable) {
            return null;
        }
        return (React.createElement(ColumnToggler, __assign({}, rest, (isObject(config) ? config : {}), { tooltip: {
                content: (config === null || config === void 0 ? void 0 : config.tooltip) || __('Table.columnsVisibility'),
                placement: 'bottom'
            }, tooltipContainer: rest.popOverContainer || env.getModalContainer, align: (_a = config === null || config === void 0 ? void 0 : config.align) !== null && _a !== void 0 ? _a : 'left', isActived: store.hasColumnHidden(), classnames: cx, classPrefix: ns, key: "columns-toggable", size: (config === null || config === void 0 ? void 0 : config.size) || 'sm', icon: config === null || config === void 0 ? void 0 : config.icon, label: config === null || config === void 0 ? void 0 : config.label, draggable: config === null || config === void 0 ? void 0 : config.draggable, columns: store.columnsData, activeToggaleColumns: store.activeToggaleColumns, onColumnToggle: this.handleColumnToggle }),
            store.toggableColumns.length ? (React.createElement("li", { className: cx('ColumnToggler-menuItem'), key: 'selectAll', onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, data, dispatchEvent, allToggled, rendererEvent;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent;
                                allToggled = !(store.activeToggaleColumns.length ===
                                    store.toggableColumns.length);
                                return [4 /*yield*/, dispatchEvent('columnToggled', createObject(data, {
                                        columns: allToggled
                                            ? store.toggableColumns.map(function (column) { return column.pristine; })
                                            : []
                                    }))];
                            case 1:
                                rendererEvent = _b.sent();
                                if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                                    return [2 /*return*/];
                                }
                                store.toggleAllColumns();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Checkbox, { size: "sm", classPrefix: ns, key: "checkall", checked: !!store.activeToggaleColumns.length, partial: !!(store.activeToggaleColumns.length &&
                        store.activeToggaleColumns.length !==
                            store.toggableColumns.length) }, __('Checkboxes.selectAll')))) : null,
            store.toggableColumns.map(function (column) { return (React.createElement("li", { className: cx('ColumnToggler-menuItem'), key: column.index, onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, data, dispatchEvent, columns, rendererEvent;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent;
                                columns = store.activeToggaleColumns.map(function (item) { return item.pristine; });
                                if (!column.toggled) {
                                    columns.push(column.pristine);
                                }
                                else {
                                    columns = columns.filter(function (c) { return c.name !== column.pristine.name; });
                                }
                                return [4 /*yield*/, dispatchEvent('columnToggled', createObject(data, {
                                        columns: columns
                                    }))];
                            case 1:
                                rendererEvent = _b.sent();
                                if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                                    return [2 /*return*/];
                                }
                                column.toggleToggle();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Checkbox, { size: "sm", classPrefix: ns, checked: column.toggled }, column.label ? render('tpl', column.label) : null))); })));
    };
    Table.prototype.renderDragToggler = function () {
        var _a = this.props, store = _a.store, env = _a.env, draggable = _a.draggable, ns = _a.classPrefix, __ = _a.translate, popOverContainer = _a.popOverContainer;
        if (!draggable || store.isNested) {
            return null;
        }
        return (React.createElement(Button, { disabled: !!store.modified, classPrefix: ns, key: "dragging-toggle", tooltip: { content: __('Table.startSort'), placement: 'bottom' }, tooltipContainer: popOverContainer || env.getModalContainer, size: "sm", active: store.dragging, onClick: function (e) {
                e.preventDefault();
                store.toggleDragging();
                store.dragging && store.clear();
            }, iconOnly: true },
            React.createElement(Icon, { icon: "exchange", className: "icon" })));
    };
    Table.prototype.renderExportExcel = function (toolbar) {
        var _this = this;
        var _a = this.props, store = _a.store, __ = _a.translate, render = _a.render;
        var columns = store.filteredColumns || [];
        if (!columns) {
            return null;
        }
        return render('exportExcel', __assign(__assign({ label: __('CRUD.exportExcel') }, toolbar), { type: 'button' }), {
            loading: store.exportExcelLoading,
            onAction: function () {
                store.update({ exportExcelLoading: true });
                import('exceljs').then(function (ExcelJS) { return __awaiter(_this, void 0, void 0, function () {
                    var error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, 3, 4]);
                                return [4 /*yield*/, exportExcel(ExcelJS, this.props, toolbar)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 2:
                                error_1 = _a.sent();
                                console.error(error_1);
                                return [3 /*break*/, 4];
                            case 3:
                                store.update({ exportExcelLoading: false });
                                return [7 /*endfinally*/];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            }
        });
    };
    /**
     * 导出 Excel 模板
     */
    Table.prototype.renderExportExcelTemplate = function (toolbar) {
        var _this = this;
        var _a = this.props, store = _a.store, __ = _a.translate, render = _a.render;
        var columns = store.filteredColumns || [];
        if (!columns) {
            return null;
        }
        return render('exportExcelTemplate', __assign(__assign({ label: __('CRUD.exportExcelTemplate') }, toolbar), { type: 'button' }), {
            onAction: function () {
                import('exceljs').then(function (ExcelJS) { return __awaiter(_this, void 0, void 0, function () {
                    var error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, exportExcel(ExcelJS, this.props, toolbar, true)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_2 = _a.sent();
                                console.error(error_2);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        });
    };
    Table.prototype.renderActions = function (region) {
        var _this = this;
        var _a = this.props, actions = _a.actions, render = _a.render, store = _a.store, cx = _a.classnames, data = _a.data;
        actions = Array.isArray(actions) ? actions.concat() : [];
        if (store.toggable &&
            region === 'header' &&
            !~this.renderedToolbars.indexOf('columns-toggler')) {
            actions.push({
                type: 'button',
                children: this.renderColumnsToggler()
            });
        }
        if (store.draggable &&
            !store.isNested &&
            region === 'header' &&
            store.rows.length > 1 &&
            !~this.renderedToolbars.indexOf('drag-toggler')) {
            actions.push({
                type: 'button',
                children: this.renderDragToggler()
            });
        }
        return Array.isArray(actions) && actions.length ? (React.createElement("div", { className: cx('Table-actions') }, actions.map(function (action, key) {
            return render("action/".concat(key), __assign({ type: 'button' }, action), {
                onAction: _this.handleAction,
                key: key,
                btnDisabled: store.dragging,
                data: store.getData(data)
            });
        }))) : null;
    };
    Table.prototype.renderHeader = function (editable) {
        var _a = this.props, header = _a.header, headerClassName = _a.headerClassName, toolbarClassName = _a.toolbarClassName, headerToolbarClassName = _a.headerToolbarClassName, headerToolbarRender = _a.headerToolbarRender, render = _a.render, showHeader = _a.showHeader, store = _a.store, cx = _a.classnames, data = _a.data, __ = _a.translate;
        if (showHeader === false) {
            return null;
        }
        var otherProps = {};
        // editable === false && (otherProps.$$editable = false);
        var child = headerToolbarRender
            ? headerToolbarRender(__assign(__assign(__assign({}, this.props), { selectedItems: store.selectedRows.map(function (item) { return item.data; }), items: store.rows.map(function (item) { return item.data; }), unSelectedItems: store.unSelectedRows.map(function (item) { return item.data; }) }), otherProps), this.renderToolbar)
            : null;
        var actions = this.renderActions('header');
        var toolbarNode = actions || child || store.dragging ? (React.createElement("div", { className: cx('Table-toolbar Table-headToolbar', toolbarClassName, headerToolbarClassName), key: "header-toolbar" },
            actions,
            child,
            store.dragging ? (React.createElement("div", { className: cx('Table-dragTip'), ref: this.dragTipRef }, __('Table.dragTip'))) : null)) : null;
        var headerNode = header && (!Array.isArray(header) || header.length) ? (React.createElement("div", { className: cx('Table-header', headerClassName), key: "header" }, render('header', header, __assign(__assign({}, (editable === false ? otherProps : null)), { data: store.getData(data) })))) : null;
        return headerNode && toolbarNode
            ? [headerNode, toolbarNode]
            : headerNode || toolbarNode || null;
    };
    Table.prototype.renderFooter = function () {
        var _a = this.props, footer = _a.footer, toolbarClassName = _a.toolbarClassName, footerToolbarClassName = _a.footerToolbarClassName, footerClassName = _a.footerClassName, footerToolbarRender = _a.footerToolbarRender, render = _a.render, showFooter = _a.showFooter, store = _a.store, data = _a.data, cx = _a.classnames, affixFooter = _a.affixFooter;
        if (showFooter === false) {
            return null;
        }
        var child = footerToolbarRender
            ? footerToolbarRender(__assign(__assign({}, this.props), { selectedItems: store.selectedRows.map(function (item) { return item.data; }), unSelectedItems: store.unSelectedRows.map(function (item) { return item.data; }), items: store.rows.map(function (item) { return item.data; }) }), this.renderToolbar)
            : null;
        var actions = this.renderActions('footer');
        var footerNode = footer && (!Array.isArray(footer) || footer.length) ? (React.createElement("div", { className: cx('Table-footer', footerClassName, affixFooter ? 'Table-footer--affix' : ''), key: "footer" }, render('footer', footer, {
            data: store.getData(data)
        }))) : null;
        var toolbarNode = actions || child ? (React.createElement("div", { className: cx('Table-toolbar Table-footToolbar', toolbarClassName, footerToolbarClassName, !footerNode && affixFooter ? 'Table-footToolbar--affix' : ''), key: "footer-toolbar" },
            actions,
            child)) : null;
        return footerNode && toolbarNode
            ? [toolbarNode, footerNode]
            : footerNode || toolbarNode || null;
    };
    Table.prototype.renderTableContent = function () {
        var _a = this.props, cx = _a.classnames, tableClassName = _a.tableClassName, store = _a.store, placeholder = _a.placeholder, render = _a.render, checkOnItemClick = _a.checkOnItemClick, buildItemProps = _a.buildItemProps, rowClassNameExpr = _a.rowClassNameExpr, rowClassName = _a.rowClassName, prefixRow = _a.prefixRow, locale = _a.locale, affixRow = _a.affixRow, tableContentClassName = _a.tableContentClassName, translate = _a.translate, itemAction = _a.itemAction; _a.affixRowClassNameExpr; var affixRowClassName = _a.affixRowClassName; _a.prefixRowClassNameExpr; var prefixRowClassName = _a.prefixRowClassName, autoFillHeight = _a.autoFillHeight, affixHeader = _a.affixHeader, itemActions = _a.itemActions, dispatchEvent = _a.dispatchEvent, onEvent = _a.onEvent, loadingConfig = _a.loadingConfig, testIdBuilder = _a.testIdBuilder; _a.data;
        // 理论上来说 store.rows 应该也行啊
        // 不过目前看来只有这样写它才会重新更新视图
        store.rows.length;
        return (React.createElement(React.Fragment, null,
            React.createElement(TableContent, { testIdBuilder: testIdBuilder, tableClassName: cx({
                    'Table-table--checkOnItemClick': checkOnItemClick,
                    'Table-table--withCombine': store.combineNum > 0,
                    'Table-table--affixHeader': affixHeader && !autoFillHeight && store.columnWidthReady
                }, tableClassName), className: tableContentClassName, itemActions: itemActions, itemAction: itemAction, store: store, classnames: cx, columns: store.filteredColumns, columnsGroup: store.columnGroup, rows: store.items, placeholder: placeholder, render: render, onMouseMove: 
                // 如果没有 itemActions, 那么就不需要处理了。
                Array.isArray(itemActions) && itemActions.length
                    ? this.handleMouseMove
                    : undefined, onScroll: this.handleOutterScroll, tableRef: this.tableRef, renderHeadCell: this.renderHeadCell, renderCell: this.renderCell, onCheck: this.handleCheck, onRowClick: this.handleRowClick, onRowDbClick: this.handleRowDbClick, onRowMouseEnter: this.handleRowMouseEnter, onRowMouseLeave: this.handleRowMouseLeave, onQuickChange: store.dragging ? undefined : this.handleQuickChange, footable: store.footable, footableColumns: store.footableColumns, checkOnItemClick: checkOnItemClick, buildItemProps: buildItemProps, onAction: this.handleAction, rowClassNameExpr: rowClassNameExpr, rowClassName: rowClassName, data: store.data, prefixRow: prefixRow, affixRow: affixRow, prefixRowClassName: prefixRowClassName, affixRowClassName: affixRowClassName, locale: locale, translate: translate, dispatchEvent: dispatchEvent, onEvent: onEvent, loading: store.loading }, renderItemActions({
                store: store,
                classnames: cx,
                render: render,
                itemActions: itemActions
            })),
            React.createElement(Spinner, { loadingConfig: loadingConfig, overlay: true, show: store.loading })));
    };
    Table.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, store = _a.store, cx = _a.classnames; _a.affixColumns; var affixHeader = _a.affixHeader, autoFillHeight = _a.autoFillHeight, autoGenerateFilter = _a.autoGenerateFilter, mobileUI = _a.mobileUI, testIdBuilder = _a.testIdBuilder;
        this.renderedToolbars = []; // 用来记录哪些 toolbar 已经渲染了，已经渲染了就不重复渲染了。
        var heading = affixHeader && !autoFillHeight ? null : this.renderHeading();
        var header = affixHeader && !autoFillHeight ? null : this.renderHeader();
        var footer = this.renderFooter();
        var tableClassName = cx('Table-table', this.props.tableClassName, {
            'Table-table--withCombine': store.combineNum > 0
        });
        return (React.createElement("div", __assign({ className: cx('Table', { 'is-mobile': mobileUI }, className, {
                'Table--unsaved': !!store.modified || !!store.moved,
                'Table--autoFillHeight': autoFillHeight
            }), style: store.buildStyles(style) }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getTestId()),
            autoGenerateFilter ? this.renderAutoFilterForm() : null,
            this.renderAffixHeader(tableClassName),
            header,
            heading,
            React.createElement("div", { className: cx('Table-contentWrap'), onMouseLeave: this.handleMouseLeave }, this.renderTableContent()),
            footer));
    };
    Table.contextType = ScopedContext;
    Table.propsList = [
        'header',
        'headerToolbarRender',
        'footer',
        'footerToolbarRender',
        'footable',
        'expandConfig',
        'placeholder',
        'tableClassName',
        'headingClassName',
        'source',
        'selectable',
        'columnsTogglable',
        'affixHeader',
        'affixColumns',
        'headerClassName',
        'footerClassName',
        'selected',
        'multiple',
        'primaryField',
        'hideQuickSaveBtn',
        'itemCheckableOn',
        'itemDraggableOn',
        'checkOnItemClick',
        'hideCheckToggler',
        'itemAction',
        'itemActions',
        'combineNum',
        'combineFromIndex',
        'items',
        'columns',
        'valueField',
        'saveImmediately',
        'rowClassName',
        'rowClassNameExpr',
        'affixRowClassNameExpr',
        'prefixRowClassNameExpr',
        'popOverContainer',
        'headerToolbarClassName',
        'toolbarClassName',
        'footerToolbarClassName',
        'itemBadge',
        'autoFillHeight',
        'onSelect',
        'keepItemSelectionOnPageChange',
        'maxKeepItemSelectionLength',
        'maxItemSelectionLength',
        'autoGenerateFilter'
    ];
    Table.defaultProps = {
        className: '',
        placeholder: 'placeholder.noData',
        tableClassName: '',
        source: '$items',
        selectable: false,
        columnsTogglable: 'auto',
        affixHeader: true,
        headerClassName: '',
        footerClassName: '',
        toolbarClassName: '',
        headerToolbarClassName: '',
        footerToolbarClassName: '',
        primaryField: 'id',
        itemCheckableOn: '',
        itemDraggableOn: '',
        hideCheckToggler: false,
        canAccessSuperData: false,
        resizable: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Table.prototype, "loadDeferredRow", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Table.prototype, "handleDragStart", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Table.prototype, "handleDragOver", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Table.prototype, "handleDrop", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Table.prototype, "handleDragEnd", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Table.prototype, "handleImageEnlarge", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Table.prototype, "handleColResizeMouseDown", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], Table.prototype, "handleColResizeMouseMove", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], Table.prototype, "handleColResizeMouseUp", null);
    return Table;
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
    /**
     * 通过 index 或者 condition 获取需要处理的目标
     *
     * - index 支持数字
     * - index 支持逗号分隔的数字列表
     * - index 支持路径比如 0.1.2,0.1.3
     * - index 支持表达式，比如 0.1.2,${index}
     *
     * - condition 上下文为当前行的数据
     *
     * @param ctx
     * @param index
     * @param condition
     * @returns
     */
    TableRenderer.prototype.getEventTargets = function (ctx, index, condition, oldCondition) {
        return __awaiter(this, void 0, void 0, function () {
            var store;
            return __generator(this, function (_a) {
                store = this.props.store;
                return [2 /*return*/, getMatchedEventTargets(store.rows, ctx || this.props.data, index, condition, oldCondition)];
            });
        });
    };
    TableRenderer.prototype.reload = function (subPath, query, ctx, args) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var targets, scoped, parents, crud;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((args === null || args === void 0 ? void 0 : args.index) || (args === null || args === void 0 ? void 0 : args.condition))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getEventTargets(ctx || this.props.data, args.index, args === null || args === void 0 ? void 0 : args.condition)];
                    case 1:
                        targets = _c.sent();
                        return [4 /*yield*/, Promise.all(targets.map(function (target) { return _this.loadDeferredRow(target); }))];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                    case 3:
                        scoped = this.context;
                        parents = (_a = scoped === null || scoped === void 0 ? void 0 : scoped.parent) === null || _a === void 0 ? void 0 : _a.getComponents();
                        if (Array.isArray(parents) && parents.length) {
                            crud = parents.find(function (cmpt) { var _a, _b; return ((_a = cmpt === null || cmpt === void 0 ? void 0 : cmpt.props) === null || _a === void 0 ? void 0 : _a.name) === ((_b = _this.props) === null || _b === void 0 ? void 0 : _b.name); });
                            return [2 /*return*/, (_b = crud === null || crud === void 0 ? void 0 : crud.reload) === null || _b === void 0 ? void 0 : _b.call(crud, subPath, query, ctx)];
                        }
                        if (subPath) {
                            return [2 /*return*/, scoped.reload(subPath, ctx)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TableRenderer.prototype.setData = function (values, replace, index, condition) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var store, targets, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        store = this.props.store;
                        if (!(index !== undefined || condition !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getEventTargets(this.props.data, index, condition)];
                    case 1:
                        targets = _b.sent();
                        targets.forEach(function (target) {
                            target.updateData(values);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        data = __assign(__assign({}, values), { rows: (_a = values.rows) !== null && _a !== void 0 ? _a : values.items // 做个兼容
                         });
                        return [2 /*return*/, store.updateData(data, undefined, replace)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TableRenderer.prototype.getData = function () {
        var _a = this.props, store = _a.store, data = _a.data;
        return store.getData(data);
    };
    TableRenderer.prototype.doAction = function (action, ctx, throwErrors, args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, valueField, data, actionType, _b, rows, targets, targets2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, store = _a.store, valueField = _a.valueField, data = _a.data;
                        actionType = action === null || action === void 0 ? void 0 : action.actionType;
                        _b = actionType;
                        switch (_b) {
                            case 'selectAll': return [3 /*break*/, 1];
                            case 'clearAll': return [3 /*break*/, 2];
                            case 'select': return [3 /*break*/, 3];
                            case 'initDrag': return [3 /*break*/, 5];
                            case 'submitQuickEdit': return [3 /*break*/, 6];
                            case 'toggleExpanded': return [3 /*break*/, 7];
                            case 'setExpanded': return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 1:
                        store.clear();
                        store.toggleAll();
                        return [3 /*break*/, 12];
                    case 2:
                        store.clear();
                        return [3 /*break*/, 12];
                    case 3: return [4 /*yield*/, this.getEventTargets(ctx, args.index, args.condition, args.selected)];
                    case 4:
                        rows = _c.sent();
                        store.updateSelected(rows.map(function (item) { return item.data; }), valueField);
                        return [3 /*break*/, 12];
                    case 5:
                        store.stopDragging();
                        store.toggleDragging();
                        return [3 /*break*/, 12];
                    case 6:
                        this.handleSave();
                        return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.getEventTargets(ctx, args.index, args.condition)];
                    case 8:
                        targets = _c.sent();
                        targets.forEach(function (target) {
                            store.toggleExpanded(target);
                        });
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, this.getEventTargets(ctx, args.index, args.condition)];
                    case 10:
                        targets2 = _c.sent();
                        targets2.forEach(function (target) {
                            store.setExpanded(target, !!args.value);
                        });
                        return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, this.handleAction(undefined, action, data)];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    TableRenderer = __decorate([
        Renderer({
            type: 'table',
            storeType: TableStore.name,
            name: 'table'
        })
    ], TableRenderer);
    return TableRenderer;
})(Table));

export { Table as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
