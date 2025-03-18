/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var mobxReact = require('mobx-react');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
function AutoFilterForm(_a) {
    var autoGenerateFilter = _a.autoGenerateFilter, searchFormExpanded = _a.searchFormExpanded, activedSearchableColumns = _a.activedSearchableColumns, searchableColumns = _a.searchableColumns, onItemToggleExpanded = _a.onItemToggleExpanded, onToggleExpanded = _a.onToggleExpanded, cx = _a.classnames, __ = _a.translate, render = _a.render, data = _a.data, onSearchableFromReset = _a.onSearchableFromReset, onSearchableFromSubmit = _a.onSearchableFromSubmit, onSearchableFromInit = _a.onSearchableFromInit, popOverContainer = _a.popOverContainer, testIdBuilder = _a.testIdBuilder;
    var schema = React__default["default"].useMemo(function () {
        var _a = typeof autoGenerateFilter === 'boolean'
            ? {
                columnsNum: 3,
                showBtnToolbar: true
            }
            : autoGenerateFilter, columnsNum = _a.columnsNum, showBtnToolbar = _a.showBtnToolbar;
        var body = amisCore.padArr(activedSearchableColumns, columnsNum).map(function (group) { return ({
            type: 'group',
            body: group.map(function (column) {
                var _a, _b, _c, _d;
                return (tslib.__assign(tslib.__assign({}, (column.searchable === true
                    ? {
                        type: 'input-text',
                        name: column.name,
                        label: column.label,
                        testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild(column.name)
                    }
                    : tslib.__assign({ type: 'input-text', name: column.name, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild(column.name) }, column.searchable))), { name: (_b = (_a = column.searchable) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : column.name, label: (_d = (_c = column.searchable) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : column.label }));
            })
        }); });
        var showExpander = activedSearchableColumns.length >= columnsNum;
        // todo 以后做动画
        if (!searchFormExpanded && body.length) {
            body.splice(1, body.length - 1);
            body[0].body.splice(columnsNum - 1, body[0].body.length - columnsNum + 1);
        }
        var lastGroup = body[body.length - 1];
        if (!Array.isArray(lastGroup === null || lastGroup === void 0 ? void 0 : lastGroup.body) ||
            lastGroup.body.length >= columnsNum) {
            lastGroup = {
                type: 'group',
                body: []
            };
            body.push(lastGroup);
        }
        var count = Math.max(columnsNum - lastGroup.body.length - 1);
        while (count-- > 0) {
            lastGroup.body.push({
                type: 'tpl',
                tpl: ''
            });
        }
        var moreTestIdBuilder = testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('more');
        lastGroup.body.push({
            type: 'container',
            className: 'AutoFilterToolbar',
            wrapperBody: false,
            body: [
                {
                    type: 'dropdown-button',
                    label: __('Table.searchFields'),
                    className: cx('Table-searchableForm-dropdown', 'mr-2'),
                    level: 'link',
                    trigger: 'click',
                    size: 'sm',
                    align: 'right',
                    visible: showBtnToolbar,
                    testIdBuilder: moreTestIdBuilder,
                    buttons: searchableColumns.map(function (column) {
                        return {
                            children: function (_a) {
                                var _b, _c;
                                var render = _a.render;
                                return render("column-search-toggler-".concat(column.id), {
                                    type: 'checkbox',
                                    label: false,
                                    className: cx('Table-searchableForm-checkbox'),
                                    inputClassName: cx('Table-searchableForm-checkbox-inner'),
                                    name: "__whatever_name",
                                    option: (_c = (_b = column.searchable) === null || _b === void 0 ? void 0 : _b.label) !== null && _c !== void 0 ? _c : column.label,
                                    testIdBuilder: moreTestIdBuilder === null || moreTestIdBuilder === void 0 ? void 0 : moreTestIdBuilder.getChild(column.name + ''),
                                    badge: {
                                        offset: [-10, 5],
                                        visibleOn: "".concat(column.toggable &&
                                            !column.toggled &&
                                            column.enableSearch)
                                    }
                                }, {
                                    value: activedSearchableColumns.includes(column),
                                    onChange: function (value) {
                                        return onItemToggleExpanded === null || onItemToggleExpanded === void 0 ? void 0 : onItemToggleExpanded(column, value);
                                    }
                                });
                            }
                        };
                    })
                },
                {
                    type: 'submit',
                    label: __('search'),
                    size: 'sm',
                    level: 'primary',
                    className: 'w-18 mr-2'
                },
                {
                    type: 'reset',
                    label: __('reset'),
                    size: 'sm',
                    className: 'w-18'
                },
                {
                    children: function () {
                        return showExpander ? (_J$X_("a", { className: cx('Table-SFToggler', searchFormExpanded ? 'is-expanded' : ''), onClick: onToggleExpanded },
                            __(searchFormExpanded ? 'collapse' : 'expand'),
                            _J$X_("span", { className: cx('Table-SFToggler-arrow') },
                                _J$X_(amisUi.Icon, { icon: "right-arrow-bold", className: "icon" })))) : null;
                    }
                }
            ]
        });
        return {
            type: 'form',
            api: null,
            title: '',
            mode: 'horizontal',
            submitText: __('search'),
            body: body,
            actions: [],
            canAccessSuperData: false
        };
    }, [
        autoGenerateFilter,
        activedSearchableColumns,
        searchableColumns,
        searchFormExpanded,
        __ // 保证语言更新后能重新渲染
    ]);
    return render('searchable-form', schema, {
        key: 'searchable-form',
        panelClassName: cx('Table-searchableForm'),
        actionsClassName: cx('Table-searchableForm-footer'),
        onReset: onSearchableFromReset,
        onSubmit: onSearchableFromSubmit,
        onInit: onSearchableFromInit,
        formStore: undefined,
        data: data,
        popOverContainer: popOverContainer
    });
}
var AutoFilterForm$1 = mobxReact.observer(function (_a) {
    var store = _a.store, query = _a.query, data = _a.data, rest = tslib.__rest(_a, ["store", "query", "data"]);
    var onItemToggleExpanded = React__default["default"].useCallback(function (column, value) {
        column.setEnableSearch(value);
        value && store.setSearchFormExpanded(true);
    }, []);
    var onToggleExpanded = React__default["default"].useCallback(function () {
        store.toggleSearchFormExpanded();
    }, []);
    var ctx = React__default["default"].useMemo(function () { return (query ? amisCore.createObject(data, query) : data); }, [query, data]);
    return (_J$X_(AutoFilterForm, tslib.__assign({}, rest, { activedSearchableColumns: store.activedSearchableColumns, searchableColumns: store.searchableColumns, searchFormExpanded: store.searchFormExpanded, onItemToggleExpanded: onItemToggleExpanded, onToggleExpanded: onToggleExpanded, data: ctx })));
});

exports.AutoFilterForm = AutoFilterForm;
exports["default"] = AutoFilterForm$1;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
