/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisUi = require('amis-ui');
var amisCore = require('amis-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
function HeadCellSearchDropDown(_a) {
    var _this = this;
    var searchable = _a.searchable, name = _a.name, label = _a.label, onQuery = _a.onQuery, data = _a.data, dispatchEvent = _a.dispatchEvent, onAction = _a.onAction, cx = _a.classnames, __ = _a.translate, ns = _a.classPrefix, popOverContainer = _a.popOverContainer, render = _a.render;
    var ref = React__default["default"].createRef();
    var _b = tslib.__read(React__default["default"].useMemo(function () {
        var schema;
        var formItems = [];
        if (searchable === true) {
            schema = {
                title: '',
                body: [
                    {
                        type: 'input-text',
                        name: name,
                        placeholder: label,
                        clearable: true
                    }
                ]
            };
        }
        else if (searchable) {
            if (!searchable.type &&
                (searchable.body || searchable.tabs || searchable.fieldSet)) {
                // todo 删除此处代码，这些都是不推荐的用法
                schema = tslib.__assign(tslib.__assign({ title: '' }, searchable), { body: Array.isArray(searchable.body)
                        ? searchable.body.concat()
                        : undefined });
            }
            else {
                schema = {
                    title: '',
                    className: searchable.formClassName,
                    body: [
                        tslib.__assign({ type: searchable.type || 'input-text', name: searchable.name || name, placeholder: label }, searchable)
                    ]
                };
            }
        }
        function findFormItems(schema) {
            Array.isArray(schema.body) &&
                schema.body.forEach(function (item) {
                    item.name && formItems.push(item.name);
                    item.extraName &&
                        typeof item.extraName === 'string' &&
                        formItems.push(item.extraName);
                    findFormItems(item);
                });
        }
        if (schema) {
            // schema有可能配置为{type: 'form', body[]} 所以真正的formItem需要到form的body里去找
            findFormItems(schema);
            schema = tslib.__assign(tslib.__assign({}, schema), { type: 'form', wrapperComponent: 'div', actions: [
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
        return [schema || 'error', formItems];
    }, [searchable, name, label]), 2), formSchema = _b[0], formItems = _b[1];
    var _c = tslib.__read(React__default["default"].useState(false), 2), isOpened = _c[0], setIsOpened = _c[1];
    var open = React__default["default"].useCallback(function () { return setIsOpened(true); }, []);
    var close = React__default["default"].useCallback(function () { return setIsOpened(false); }, []);
    var handleSubmit = React__default["default"].useCallback(function (values) { return tslib.__awaiter(_this, void 0, void 0, function () {
        var rendererEvent;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dispatchEvent('columnSearch', amisCore.createObject(data, {
                        searchName: name,
                        searchValue: values
                    }))];
                case 1:
                    rendererEvent = _a.sent();
                    if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                        return [2 /*return*/];
                    }
                    close();
                    onQuery(values);
                    return [2 /*return*/];
            }
        });
    }); }, []);
    var handleAction = React__default["default"].useCallback(function (e, action, ctx) {
        if (action.actionType === 'cancel' || action.actionType === 'close') {
            close();
            return;
        }
        if (action.actionType === 'reset') {
            close();
            handleReset();
            return;
        }
        onAction && onAction(e, action, ctx);
    }, []);
    var handleReset = React__default["default"].useCallback(function () {
        var values = tslib.__assign({}, data);
        // todo 这里不精准，如果表单项有容器嵌套，这里将不正确
        formItems.forEach(function (key) { return amisCore.setVariable(values, key, undefined); });
        onQuery(values);
    }, [data]);
    var isActive = React__default["default"].useMemo(function () {
        // todo 这里不精准，如果表单项有容器嵌套，这里将不正确
        return formItems.some(function (key) { return data === null || data === void 0 ? void 0 : data[key]; });
    }, [data]);
    return (_J$X_("span", { ref: ref, className: cx("".concat(ns, "TableCell-searchBtn"), isActive ? 'is-active' : '', isOpened ? 'is-opened' : '') },
        _J$X_("span", { onClick: open },
            _J$X_(amisUi.Icon, { icon: "search", className: "icon" })),
        isOpened ? (_J$X_(amisCore.Overlay, { container: popOverContainer || (function () { return ref.current; }), placement: "left-bottom-left-top right-bottom-right-top", target: popOverContainer ? function () { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.parentNode; } : null, show: true },
            _J$X_(amisCore.PopOver, { classPrefix: ns, onHide: close, className: cx("".concat(ns, "TableCell-searchPopOver"), searchable.className), overlay: true }, render('quick-search-form', formSchema, {
                popOverContainer: popOverContainer,
                data: tslib.__assign({}, data),
                onSubmit: handleSubmit,
                onAction: handleAction
            })))) : null));
}

exports.HeadCellSearchDropDown = HeadCellSearchDropDown;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
