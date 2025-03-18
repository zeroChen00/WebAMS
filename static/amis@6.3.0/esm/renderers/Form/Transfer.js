/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import find from 'lodash/find';
import pick from 'lodash/pick';
import { isAlive } from 'mobx-state-tree';
import { matchSorter } from 'match-sorter';
import { findTreeIndex, optionValueCompare, getOptionValueBindField, getTree, spliceTree, findTree, resolveEventData, filterTree, mapTree, createObject, string2regExp, isPureVariable, isEffectiveApi, resolveVariable, toNumber, evalExpression, autobind, OptionsControl, str2function } from 'amis-core';
import { Transfer, Spinner } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var getCustomFilterOption = function (filterOption) {
    switch (typeof filterOption) {
        case 'string':
            return str2function(filterOption, 'options', 'inputValue', 'option');
        case 'function':
            return filterOption;
        default:
            return null;
    }
};
var BaseTransferRenderer = /** @class */ (function (_super) {
    __extends(BaseTransferRenderer, _super);
    function BaseTransferRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseTransferRenderer.prototype.reload = function () {
        var reloadOptions = this.props.reloadOptions;
        reloadOptions === null || reloadOptions === void 0 ? void 0 : reloadOptions();
    };
    BaseTransferRenderer.prototype.handleChange = function (value, optionModified) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, joinValues, delimiter, valueField, extractValue, options, dispatchEvent, setOptions, selectMode, deferApi, _b, deferField, newValue, newOptions, indexes, origin_1, isTreeDefer, rendererEvent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, joinValues = _a.joinValues, delimiter = _a.delimiter, valueField = _a.valueField, extractValue = _a.extractValue, options = _a.options, dispatchEvent = _a.dispatchEvent, setOptions = _a.setOptions, selectMode = _a.selectMode, deferApi = _a.deferApi, _b = _a.deferField, deferField = _b === void 0 ? 'defer' : _b;
                        newValue = value;
                        newOptions = options.concat();
                        if (Array.isArray(value)) {
                            newValue = value.map(function (item) {
                                var indexes = findTreeIndex(options, optionValueCompare(item[valueField || 'value'], valueField || 'value'), {
                                    resolve: getOptionValueBindField(valueField),
                                    value: item[valueField] || 'value'
                                });
                                if (!indexes) {
                                    newOptions.push(__assign(__assign({}, item), { visible: false }));
                                }
                                else if (optionModified) {
                                    var origin_2 = getTree(newOptions, indexes);
                                    newOptions = spliceTree(newOptions, indexes, 1, __assign(__assign({}, origin_2), item));
                                }
                                return joinValues || extractValue
                                    ? item[valueField || 'value']
                                    : item;
                            });
                            if (joinValues) {
                                newValue = newValue.join(delimiter || ',');
                            }
                        }
                        else if (value) {
                            newValue =
                                joinValues || extractValue
                                    ? value[valueField || 'value']
                                    : value;
                            indexes = findTreeIndex(options, optionValueCompare(value[valueField || 'value'], valueField || 'value'));
                            if (!indexes) {
                                newOptions.push(__assign(__assign({}, value), { visible: false }));
                            }
                            else if (optionModified) {
                                origin_1 = getTree(newOptions, indexes);
                                newOptions = spliceTree(newOptions, indexes, 1, __assign(__assign({}, origin_1), value));
                            }
                        }
                        isTreeDefer = selectMode === 'tree' &&
                            (!!deferApi ||
                                !!findTree(options, function (option) { return option.deferApi || option[deferField]; }));
                        if (isTreeDefer === true ||
                            newOptions.length > options.length ||
                            optionModified) {
                            setOptions(newOptions, true);
                        }
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, {
                                value: newValue,
                                options: options,
                                items: options // 为了保持名字统一
                            }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseTransferRenderer.prototype.option2value = function (option) {
        return option;
    };
    BaseTransferRenderer.prototype.handleSearch = function (term, cancelExecutor, targetPage) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, searchApi, options, labelField, valueField, env, data, __, filterOption, payload, result, currentPage, e_1, labelKey, valueKey, option, customFilterOption;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, searchApi = _a.searchApi, options = _a.options, labelField = _a.labelField, valueField = _a.valueField, env = _a.env, data = _a.data, __ = _a.translate, filterOption = _a.filterOption;
                        if (!searchApi) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, env.fetcher(searchApi, createObject(data, __assign({ term: term }, (targetPage ? targetPage : {}))), {
                                cancelExecutor: cancelExecutor
                            })];
                    case 2:
                        payload = _b.sent();
                        if (!payload.ok) {
                            throw new Error(__(payload.msg || 'networkError'));
                        }
                        result = payload.data.options || payload.data.items || payload.data;
                        if (!Array.isArray(result)) {
                            throw new Error(__('CRUD.invalidArray'));
                        }
                        currentPage = {};
                        if (targetPage) {
                            currentPage = {
                                page: payload.data.page,
                                perPage: targetPage.perPage,
                                total: payload.data.count
                            };
                        }
                        return [2 /*return*/, __assign({ items: mapTree(result, function (item) {
                                    var resolved = null;
                                    var value = item[valueField || 'value'];
                                    // 只有 value 值有意义的时候，再去找；否则直接返回
                                    if (Array.isArray(options) &&
                                        value !== null &&
                                        value !== undefined) {
                                        resolved = find(options, optionValueCompare(value, valueField));
                                        if (item === null || item === void 0 ? void 0 : item.children) {
                                            resolved = __assign(__assign({}, resolved), { children: item.children });
                                        }
                                    }
                                    return resolved || item;
                                }) }, currentPage)];
                    case 3:
                        e_1 = _b.sent();
                        if (!env.isCancel(e_1) && !searchApi.silent) {
                            env.notify('error', e_1.message);
                        }
                        return [2 /*return*/, {
                                items: []
                            }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (term) {
                            labelKey = labelField || 'label';
                            valueKey = valueField || 'value';
                            option = { keys: [labelKey, valueKey] };
                            if (filterOption) {
                                customFilterOption = getCustomFilterOption(filterOption);
                                if (customFilterOption) {
                                    return [2 /*return*/, { items: customFilterOption(options, term, option) }];
                                }
                                else {
                                    env.notify('error', '自定义检索函数不符合要求');
                                    return [2 /*return*/, { items: [] }];
                                }
                            }
                            return [2 /*return*/, {
                                    items: filterTree(options, function (option, key, level, paths) {
                                        return !!((Array.isArray(option.children) && option.children.length) ||
                                            !!matchSorter([option].concat(paths), term, {
                                                keys: [labelField || 'label', valueField || 'value'],
                                                threshold: matchSorter.rankings.CONTAINS
                                            }).length);
                                    }, 0, true)
                                }];
                        }
                        else {
                            return [2 /*return*/, { items: options }];
                        }
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BaseTransferRenderer.prototype.handleResultSearch = function (term, item) {
        var _a = this.props, valueField = _a.valueField, labelField = _a.labelField;
        var regexp = string2regExp(term);
        var labelTest = item[labelField || 'label'];
        var valueTest = item[valueField || 'value'];
        return regexp.test(labelTest) || regexp.test(valueTest);
    };
    BaseTransferRenderer.prototype.handlePageChange = function (page, perPage, direction) {
        var _a = this.props, source = _a.source, data = _a.data, formItem = _a.formItem, onChange = _a.onChange;
        var ctx = createObject(data, __assign({ page: page !== null && page !== void 0 ? page : 1, perPage: perPage !== null && perPage !== void 0 ? perPage : 10 }, (direction ? { pageDir: direction } : {})));
        if (!formItem || !isAlive(formItem)) {
            return;
        }
        if (isPureVariable(source)) {
            formItem.loadOptionsFromDataScope(source, ctx, onChange);
        }
        else if (isEffectiveApi(source, ctx)) {
            formItem.loadOptions(source, ctx, undefined, false, onChange, false);
        }
    };
    BaseTransferRenderer.prototype.optionItemRender = function (option, states) {
        var _a = this.props, menuTpl = _a.menuTpl, render = _a.render, data = _a.data;
        return render("item/".concat(states.index), menuTpl, {
            data: createObject(createObject(data, states), option)
        });
    };
    BaseTransferRenderer.prototype.resultItemRender = function (option, states) {
        var _a = this.props, valueTpl = _a.valueTpl, render = _a.render, data = _a.data;
        return render("value/".concat(states.index), valueTpl, {
            onChange: states.onChange,
            data: createObject(createObject(data, states), option)
        });
    };
    BaseTransferRenderer.prototype.renderCell = function (column, option, colIndex, rowIndex) {
        var _a = this.props, render = _a.render, data = _a.data, cx = _a.classnames, showInvalidMatch = _a.showInvalidMatch;
        return render("cell/".concat(colIndex, "/").concat(rowIndex), __assign({ type: 'text', className: cx({
                'is-invalid': showInvalidMatch ? option === null || option === void 0 ? void 0 : option.__unmatched : false
            }) }, column), {
            value: resolveVariable(column.name, option),
            data: createObject(data, option)
        });
    };
    BaseTransferRenderer.prototype.getRef = function (ref) {
        while (ref && ref.getWrappedInstance) {
            ref = ref.getWrappedInstance();
        }
        this.tranferRef = ref;
    };
    BaseTransferRenderer.prototype.onSelectAll = function (options) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent('selectAll', createObject(data, { items: options }));
    };
    // 动作
    BaseTransferRenderer.prototype.doAction = function (action, data, throwErrors) {
        var _a, _b;
        var _c = this.props, resetValue = _c.resetValue, onChange = _c.onChange;
        switch (action.actionType) {
            case 'clear':
                onChange === null || onChange === void 0 ? void 0 : onChange('');
                break;
            case 'reset':
                onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
                break;
            case 'selectAll':
                (_a = this.tranferRef) === null || _a === void 0 ? void 0 : _a.selectAll();
                break;
            case 'clearSearch': {
                (_b = this.tranferRef) === null || _b === void 0 ? void 0 : _b.clearSearch(data);
                break;
            }
        }
    };
    BaseTransferRenderer.prototype.render = function () {
        var _a, _b;
        var _c = this.props, className = _c.className; _c.style; var cx = _c.classnames, selectedOptions = _c.selectedOptions, showArrow = _c.showArrow, sortable = _c.sortable, selectMode = _c.selectMode, columns = _c.columns, loading = _c.loading, searchable = _c.searchable, searchResultMode = _c.searchResultMode, searchResultColumns = _c.searchResultColumns, deferLoad = _c.deferLoad, leftMode = _c.leftMode, rightMode = _c.rightMode, disabled = _c.disabled, selectTitle = _c.selectTitle, resultTitle = _c.resultTitle, menuTpl = _c.menuTpl, valueTpl = _c.valueTpl, searchPlaceholder = _c.searchPlaceholder, _d = _c.resultListModeFollowSelect, resultListModeFollowSelect = _d === void 0 ? false : _d, resultSearchPlaceholder = _c.resultSearchPlaceholder, _e = _c.resultSearchable, resultSearchable = _e === void 0 ? false : _e, statistics = _c.statistics, labelField = _c.labelField, valueField = _c.valueField, virtualThreshold = _c.virtualThreshold, itemHeight = _c.itemHeight, loadingConfig = _c.loadingConfig, showInvalidMatch = _c.showInvalidMatch, onlyChildren = _c.onlyChildren, mobileUI = _c.mobileUI, noResultsText = _c.noResultsText, pagination = _c.pagination, formItem = _c.formItem, env = _c.env, popOverContainer = _c.popOverContainer, data = _c.data, _f = _c.autoCheckChildren, autoCheckChildren = _f === void 0 ? true : _f, _g = _c.initiallyOpen, initiallyOpen = _g === void 0 ? true : _g, testIdBuilder = _c.testIdBuilder;
        // 目前 LeftOptions 没有接口可以动态加载
        // 为了方便可以快速实现动态化，让选项的第一个成员携带
        // LeftOptions 信息
        var _h = this.props, options = _h.options, leftOptions = _h.leftOptions, leftDefaultValue = _h.leftDefaultValue;
        if (selectMode === 'associated' &&
            options &&
            options.length &&
            options[0].leftOptions &&
            Array.isArray(options[0].children)) {
            leftOptions = options[0].leftOptions;
            leftDefaultValue = (_a = options[0].leftDefaultValue) !== null && _a !== void 0 ? _a : leftDefaultValue;
            options = options[0].children;
        }
        return (React.createElement("div", { className: cx('TransferControl', className) },
            React.createElement(Transfer, { onlyChildren: onlyChildren, value: selectedOptions, options: options, accumulatedOptions: (_b = formItem === null || formItem === void 0 ? void 0 : formItem.accumulatedOptions) !== null && _b !== void 0 ? _b : [], disabled: disabled, onChange: this.handleChange, option2value: this.option2value, sortable: sortable, showArrow: showArrow, selectMode: selectMode, searchResultMode: searchResultMode, searchResultColumns: searchResultColumns, columns: columns, onSearch: searchable ? this.handleSearch : undefined, onDeferLoad: deferLoad, leftOptions: leftOptions, leftMode: leftMode, rightMode: rightMode, cellRender: this.renderCell, selectTitle: selectTitle, resultTitle: resultTitle, resultListModeFollowSelect: resultListModeFollowSelect, onResultSearch: this.handleResultSearch, searchPlaceholder: searchPlaceholder, resultSearchable: resultSearchable, resultSearchPlaceholder: resultSearchPlaceholder, statistics: statistics, labelField: labelField, valueField: valueField, optionItemRender: menuTpl ? this.optionItemRender : undefined, resultItemRender: valueTpl ? this.resultItemRender : undefined, onSelectAll: this.onSelectAll, onRef: this.getRef, virtualThreshold: virtualThreshold, itemHeight: toNumber(itemHeight) > 0 ? toNumber(itemHeight) : undefined, loadingConfig: loadingConfig, showInvalidMatch: showInvalidMatch, mobileUI: mobileUI, noResultsText: noResultsText, pagination: __assign(__assign({}, pick(pagination, [
                    'className',
                    'layout',
                    'perPageAvailable',
                    'popOverContainerSelector'
                ])), { enable: (pagination && pagination.enable !== undefined
                        ? !!(typeof pagination.enable === 'string'
                            ? evalExpression(pagination.enable, data)
                            : pagination.enable)
                        : !!(formItem === null || formItem === void 0 ? void 0 : formItem.enableSourcePagination)) &&
                        (!selectMode ||
                            selectMode === 'list' ||
                            selectMode === 'table') &&
                        options.length > 0, maxButtons: Number.isInteger(pagination === null || pagination === void 0 ? void 0 : pagination.maxButtons)
                        ? pagination.maxButtons
                        : 5, page: formItem === null || formItem === void 0 ? void 0 : formItem.sourcePageNum, perPage: formItem === null || formItem === void 0 ? void 0 : formItem.sourcePerPageNum, total: formItem === null || formItem === void 0 ? void 0 : formItem.sourceTotalNum, popOverContainer: popOverContainer !== null && popOverContainer !== void 0 ? popOverContainer : env === null || env === void 0 ? void 0 : env.getModalContainer }), onPageChange: this.handlePageChange, initiallyOpen: initiallyOpen, autoCheckChildren: autoCheckChildren, testIdBuilder: testIdBuilder }),
            React.createElement(Spinner, { overlay: true, key: "info", loadingConfig: loadingConfig, show: loading })));
    };
    BaseTransferRenderer.defaultProps = {
        multiple: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Boolean]),
        __metadata("design:returntype", Promise)
    ], BaseTransferRenderer.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "option2value", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Function, Object]),
        __metadata("design:returntype", Promise)
    ], BaseTransferRenderer.prototype, "handleSearch", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "handleResultSearch", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, String]),
        __metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "handlePageChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "optionItemRender", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "resultItemRender", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Number, Number]),
        __metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "renderCell", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "getRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "onSelectAll", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "render", null);
    return BaseTransferRenderer;
}(React.Component));
// ts 3.9 里面非得这样才不报错，鬼知道为何。
var TransferRender = /** @class */ (function (_super) {
    __extends(TransferRender, _super);
    function TransferRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransferRender;
}(BaseTransferRenderer));
OptionsControl({
    type: 'transfer'
})(TransferRender);

export { BaseTransferRenderer, TransferRender, getCustomFilterOption };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
