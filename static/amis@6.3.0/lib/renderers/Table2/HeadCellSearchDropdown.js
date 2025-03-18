/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var ReactDOM = require('react-dom');
var mobxReact = require('mobx-react');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var HeadCellSearchDropDown = /** @class */ (function (_super) {
    tslib.__extends(HeadCellSearchDropDown, _super);
    function HeadCellSearchDropDown(props) {
        var _this = _super.call(this, props) || this;
        _this.formItems = [];
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        return _this;
    }
    HeadCellSearchDropDown.prototype.buildSchema = function () {
        var _a = this.props, searchable = _a.searchable, sortable = _a.sortable, name = _a.name, label = _a.label, __ = _a.translate;
        var schema;
        if (searchable === true) {
            schema = {
                title: '',
                controls: [
                    {
                        type: 'text',
                        name: name,
                        placeholder: label,
                        clearable: true
                    }
                ]
            };
        }
        else if (searchable) {
            if (searchable.controls || searchable.tabs || searchable.fieldSet) {
                schema = tslib.__assign(tslib.__assign({ title: '' }, searchable), { controls: Array.isArray(searchable.controls)
                        ? searchable.controls.concat()
                        : undefined });
            }
            else if ((searchable === null || searchable === void 0 ? void 0 : searchable.type) === 'form') {
                schema = searchable;
            }
            else {
                schema = {
                    title: '',
                    className: searchable.formClassName,
                    controls: [
                        tslib.__assign({ type: searchable.type || 'text', name: searchable.name || name, placeholder: label }, searchable)
                    ]
                };
            }
        }
        if (schema && schema.controls && sortable) {
            schema.controls.unshift({
                type: 'hidden',
                name: 'orderBy',
                value: name
            }, {
                type: 'button-group',
                name: 'order',
                label: __('sort'),
                options: [
                    {
                        label: __('asc'),
                        value: 'asc'
                    },
                    {
                        label: __('desc'),
                        value: 'desc'
                    }
                ]
            });
        }
        if (schema) {
            // 如果schema是直接配置的{type: 'form', body: []}
            var formItems_1 = [];
            (schema.controls || schema.body || []).forEach(function (item) {
                return item.name &&
                    item.name !== 'orderBy' &&
                    item.name !== 'order' &&
                    formItems_1.push(item.name);
            });
            this.formItems = formItems_1;
            schema = tslib.__assign(tslib.__assign({}, schema), { type: 'form', wrapperComponent: 'div', wrapWithPanel: true, title: false, actions: [
                    {
                        type: 'button',
                        label: __('reset'),
                        actionType: 'clear-and-submit'
                    },
                    {
                        type: 'button',
                        label: __('cancel'),
                        actionType: 'cancel'
                    },
                    {
                        label: __('search'),
                        type: 'submit',
                        primary: true
                    }
                ] });
        }
        return schema || 'error';
    };
    HeadCellSearchDropDown.prototype.handleAction = function (e, action, ctx, confirm) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onAction, data, dispatchEvent, name, values, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onAction = _a.onAction, data = _a.data, dispatchEvent = _a.dispatchEvent, name = _a.name;
                        if (action.actionType === 'cancel' || action.actionType === 'close') {
                            confirm();
                            return [2 /*return*/];
                        }
                        if (action.actionType === 'reset') {
                            confirm();
                            this.handleReset();
                            return [2 /*return*/];
                        }
                        values = tslib.__assign({}, data);
                        this.formItems.forEach(function (key) { return amisCore.setVariable(values, key, undefined); });
                        return [4 /*yield*/, dispatchEvent('columnSearch', amisCore.createObject(data, {
                                searchName: name,
                                searchValue: values
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onAction && onAction(e, action, ctx);
                        return [2 /*return*/];
                }
            });
        });
    };
    HeadCellSearchDropDown.prototype.handleReset = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onSearch, data, name, values, _b;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, onSearch = _a.onSearch, data = _a.data, name = _a.name;
                        values = tslib.__assign({}, data);
                        this.formItems.forEach(function (key) { return amisCore.setVariable(values, key, undefined); });
                        if (values.orderBy === name) {
                            values.orderBy = '';
                            values.order = 'asc';
                        }
                        _b = onSearch;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, onSearch(name, values)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        onSearch && onSearch(values);
                        return [2 /*return*/];
                }
            });
        });
    };
    HeadCellSearchDropDown.prototype.handleSubmit = function (values, confirm) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onSearch, name, _b;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, onSearch = _a.onSearch, name = _a.name;
                        if (values.order) {
                            values = tslib.__assign(tslib.__assign({}, values), { orderBy: name });
                        }
                        _b = onSearch;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, onSearch(name, values)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        confirm();
                        return [2 /*return*/];
                }
            });
        });
    };
    HeadCellSearchDropDown.prototype.isActive = function () {
        var _a = this.props, data = _a.data, name = _a.name, orderBy = _a.orderBy;
        return ((orderBy && orderBy === name) || this.formItems.some(function (key) { return data === null || data === void 0 ? void 0 : data[key]; }));
    };
    HeadCellSearchDropDown.prototype.render = function () {
        var _this = this;
        var _a = this.props, render = _a.render, name = _a.name, data = _a.data, searchable = _a.searchable, order = _a.order, orderBy = _a.orderBy, popOverContainer = _a.popOverContainer, ns = _a.classPrefix, cx = _a.classnames;
        var formSchema = this.buildSchema();
        var isActive = this.isActive();
        return (_J$X_(amisUi.HeadCellDropDown, { className: "".concat(ns, "TableCell-searchBtn"), layerClassName: cx("".concat(ns, "TableCell-searchPopOver"), searchable.className), active: isActive, filterIcon: _J$X_(amisUi.Icon, { icon: "search", className: "icon", iconContent: "table-search-icon" }), popOverContainer: popOverContainer ? popOverContainer : function () { return ReactDOM.findDOMNode(_this); }, filterDropdown: function (_a) {
                _a.setSelectedKeys; _a.selectedKeys; var confirm = _a.confirm; _a.clearFilters;
                return render('quick-search-form', formSchema, {
                    data: tslib.__assign(tslib.__assign({}, data), { orderBy: orderBy, order: orderBy && orderBy === name ? order : '' }),
                    onSubmit: function (values) { return _this.handleSubmit(values, confirm); },
                    onAction: function (e, action, ctx) {
                        _this.handleAction(e, action, ctx, confirm);
                    }
                });
            } }));
    };
    return HeadCellSearchDropDown;
}(React__default["default"].Component));
var HeadCellSearchDropDown$1 = mobxReact.observer(function (props) {
    var store = props.store;
    return (_J$X_(HeadCellSearchDropDown, tslib.__assign({}, props, { data: store.query, orderBy: store.orderBy, order: store.order })));
});

exports.HeadCellSearchDropDown = HeadCellSearchDropDown;
exports["default"] = HeadCellSearchDropDown$1;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
