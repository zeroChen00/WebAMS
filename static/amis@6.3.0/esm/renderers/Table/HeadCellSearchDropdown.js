/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __read, __assign, __awaiter, __generator } from 'tslib';
import React from 'react';
import { Icon } from 'amis-ui';
import { createObject, setVariable, Overlay, PopOver } from 'amis-core';

function HeadCellSearchDropDown(_a) {
    var _this = this;
    var searchable = _a.searchable, name = _a.name, label = _a.label, onQuery = _a.onQuery, data = _a.data, dispatchEvent = _a.dispatchEvent, onAction = _a.onAction, cx = _a.classnames, __ = _a.translate, ns = _a.classPrefix, popOverContainer = _a.popOverContainer, render = _a.render;
    var ref = React.createRef();
    var _b = __read(React.useMemo(function () {
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
                schema = __assign(__assign({ title: '' }, searchable), { body: Array.isArray(searchable.body)
                        ? searchable.body.concat()
                        : undefined });
            }
            else {
                schema = {
                    title: '',
                    className: searchable.formClassName,
                    body: [
                        __assign({ type: searchable.type || 'input-text', name: searchable.name || name, placeholder: label }, searchable)
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
            schema = __assign(__assign({}, schema), { type: 'form', wrapperComponent: 'div', actions: [
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
    var _c = __read(React.useState(false), 2), isOpened = _c[0], setIsOpened = _c[1];
    var open = React.useCallback(function () { return setIsOpened(true); }, []);
    var close = React.useCallback(function () { return setIsOpened(false); }, []);
    var handleSubmit = React.useCallback(function (values) { return __awaiter(_this, void 0, void 0, function () {
        var rendererEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dispatchEvent('columnSearch', createObject(data, {
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
    var handleAction = React.useCallback(function (e, action, ctx) {
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
    var handleReset = React.useCallback(function () {
        var values = __assign({}, data);
        // todo 这里不精准，如果表单项有容器嵌套，这里将不正确
        formItems.forEach(function (key) { return setVariable(values, key, undefined); });
        onQuery(values);
    }, [data]);
    var isActive = React.useMemo(function () {
        // todo 这里不精准，如果表单项有容器嵌套，这里将不正确
        return formItems.some(function (key) { return data === null || data === void 0 ? void 0 : data[key]; });
    }, [data]);
    return (React.createElement("span", { ref: ref, className: cx("".concat(ns, "TableCell-searchBtn"), isActive ? 'is-active' : '', isOpened ? 'is-opened' : '') },
        React.createElement("span", { onClick: open },
            React.createElement(Icon, { icon: "search", className: "icon" })),
        isOpened ? (React.createElement(Overlay, { container: popOverContainer || (function () { return ref.current; }), placement: "left-bottom-left-top right-bottom-right-top", target: popOverContainer ? function () { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.parentNode; } : null, show: true },
            React.createElement(PopOver, { classPrefix: ns, onHide: close, className: cx("".concat(ns, "TableCell-searchPopOver"), searchable.className), overlay: true }, render('quick-search-form', formSchema, {
                popOverContainer: popOverContainer,
                data: __assign({}, data),
                onSubmit: handleSubmit,
                onAction: handleAction
            })))) : null));
}

export { HeadCellSearchDropDown };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
