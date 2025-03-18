/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var find = require('lodash/find');
var pick = require('lodash/pick');
var mobxStateTree = require('mobx-state-tree');
var matchSorter = require('match-sorter');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var getCustomFilterOption = function (filterOption) {
    switch (typeof filterOption) {
        case 'string':
            return amisCore.str2function(filterOption, 'options', 'inputValue', 'option');
        case 'function':
            return filterOption;
        default:
            return null;
    }
};
var BaseTransferRenderer = /** @class */ (function (_super) {
    tslib.__extends(BaseTransferRenderer, _super);
    function BaseTransferRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseTransferRenderer.prototype.reload = function () {
        var reloadOptions = this.props.reloadOptions;
        reloadOptions === null || reloadOptions === void 0 ? void 0 : reloadOptions();
    };
    BaseTransferRenderer.prototype.handleChange = function (value, optionModified) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onChange, joinValues, delimiter, valueField, extractValue, options, dispatchEvent, setOptions, selectMode, deferApi, _b, deferField, newValue, newOptions, indexes, origin_1, isTreeDefer, rendererEvent;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, joinValues = _a.joinValues, delimiter = _a.delimiter, valueField = _a.valueField, extractValue = _a.extractValue, options = _a.options, dispatchEvent = _a.dispatchEvent, setOptions = _a.setOptions, selectMode = _a.selectMode, deferApi = _a.deferApi, _b = _a.deferField, deferField = _b === void 0 ? 'defer' : _b;
                        newValue = value;
                        newOptions = options.concat();
                        if (Array.isArray(value)) {
                            newValue = value.map(function (item) {
                                var indexes = amisCore.findTreeIndex(options, amisCore.optionValueCompare(item[valueField || 'value'], valueField || 'value'), {
                                    resolve: amisCore.getOptionValueBindField(valueField),
                                    value: item[valueField] || 'value'
                                });
                                if (!indexes) {
                                    newOptions.push(tslib.__assign(tslib.__assign({}, item), { visible: false }));
                                }
                                else if (optionModified) {
                                    var origin_2 = amisCore.getTree(newOptions, indexes);
                                    newOptions = amisCore.spliceTree(newOptions, indexes, 1, tslib.__assign(tslib.__assign({}, origin_2), item));
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
                            indexes = amisCore.findTreeIndex(options, amisCore.optionValueCompare(value[valueField || 'value'], valueField || 'value'));
                            if (!indexes) {
                                newOptions.push(tslib.__assign(tslib.__assign({}, value), { visible: false }));
                            }
                            else if (optionModified) {
                                origin_1 = amisCore.getTree(newOptions, indexes);
                                newOptions = amisCore.spliceTree(newOptions, indexes, 1, tslib.__assign(tslib.__assign({}, origin_1), value));
                            }
                        }
                        isTreeDefer = selectMode === 'tree' &&
                            (!!deferApi ||
                                !!amisCore.findTree(options, function (option) { return option.deferApi || option[deferField]; }));
                        if (isTreeDefer === true ||
                            newOptions.length > options.length ||
                            optionModified) {
                            setOptions(newOptions, true);
                        }
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, {
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, searchApi, options, labelField, valueField, env, data, __, filterOption, payload, result, currentPage, e_1, labelKey, valueKey, option, customFilterOption;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, searchApi = _a.searchApi, options = _a.options, labelField = _a.labelField, valueField = _a.valueField, env = _a.env, data = _a.data, __ = _a.translate, filterOption = _a.filterOption;
                        if (!searchApi) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, env.fetcher(searchApi, amisCore.createObject(data, tslib.__assign({ term: term }, (targetPage ? targetPage : {}))), {
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
                        return [2 /*return*/, tslib.__assign({ items: amisCore.mapTree(result, function (item) {
                                    var resolved = null;
                                    var value = item[valueField || 'value'];
                                    // 只有 value 值有意义的时候，再去找；否则直接返回
                                    if (Array.isArray(options) &&
                                        value !== null &&
                                        value !== undefined) {
                                        resolved = find__default["default"](options, amisCore.optionValueCompare(value, valueField));
                                        if (item === null || item === void 0 ? void 0 : item.children) {
                                            resolved = tslib.__assign(tslib.__assign({}, resolved), { children: item.children });
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
                                    items: amisCore.filterTree(options, function (option, key, level, paths) {
                                        return !!((Array.isArray(option.children) && option.children.length) ||
                                            !!matchSorter.matchSorter([option].concat(paths), term, {
                                                keys: [labelField || 'label', valueField || 'value'],
                                                threshold: matchSorter.matchSorter.rankings.CONTAINS
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
        var regexp = amisCore.string2regExp(term);
        var labelTest = item[labelField || 'label'];
        var valueTest = item[valueField || 'value'];
        return regexp.test(labelTest) || regexp.test(valueTest);
    };
    BaseTransferRenderer.prototype.handlePageChange = function (page, perPage, direction) {
        var _a = this.props, source = _a.source, data = _a.data, formItem = _a.formItem, onChange = _a.onChange;
        var ctx = amisCore.createObject(data, tslib.__assign({ page: page !== null && page !== void 0 ? page : 1, perPage: perPage !== null && perPage !== void 0 ? perPage : 10 }, (direction ? { pageDir: direction } : {})));
        if (!formItem || !mobxStateTree.isAlive(formItem)) {
            return;
        }
        if (amisCore.isPureVariable(source)) {
            formItem.loadOptionsFromDataScope(source, ctx, onChange);
        }
        else if (amisCore.isEffectiveApi(source, ctx)) {
            formItem.loadOptions(source, ctx, undefined, false, onChange, false);
        }
    };
    BaseTransferRenderer.prototype.optionItemRender = function (option, states) {
        var _a = this.props, menuTpl = _a.menuTpl, render = _a.render, data = _a.data;
        return render("item/".concat(states.index), menuTpl, {
            data: amisCore.createObject(amisCore.createObject(data, states), option)
        });
    };
    BaseTransferRenderer.prototype.resultItemRender = function (option, states) {
        var _a = this.props, valueTpl = _a.valueTpl, render = _a.render, data = _a.data;
        return render("value/".concat(states.index), valueTpl, {
            onChange: states.onChange,
            data: amisCore.createObject(amisCore.createObject(data, states), option)
        });
    };
    BaseTransferRenderer.prototype.renderCell = function (column, option, colIndex, rowIndex) {
        var _a = this.props, render = _a.render, data = _a.data, cx = _a.classnames, showInvalidMatch = _a.showInvalidMatch;
        return render("cell/".concat(colIndex, "/").concat(rowIndex), tslib.__assign({ type: 'text', className: cx({
                'is-invalid': showInvalidMatch ? option === null || option === void 0 ? void 0 : option.__unmatched : false
            }) }, column), {
            value: amisCore.resolveVariable(column.name, option),
            data: amisCore.createObject(data, option)
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
        dispatchEvent('selectAll', amisCore.createObject(data, { items: options }));
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
        return (_J$X_("div", { className: cx('TransferControl', className) },
            _J$X_(amisUi.Transfer, { onlyChildren: onlyChildren, value: selectedOptions, options: options, accumulatedOptions: (_b = formItem === null || formItem === void 0 ? void 0 : formItem.accumulatedOptions) !== null && _b !== void 0 ? _b : [], disabled: disabled, onChange: this.handleChange, option2value: this.option2value, sortable: sortable, showArrow: showArrow, selectMode: selectMode, searchResultMode: searchResultMode, searchResultColumns: searchResultColumns, columns: columns, onSearch: searchable ? this.handleSearch : undefined, onDeferLoad: deferLoad, leftOptions: leftOptions, leftMode: leftMode, rightMode: rightMode, cellRender: this.renderCell, selectTitle: selectTitle, resultTitle: resultTitle, resultListModeFollowSelect: resultListModeFollowSelect, onResultSearch: this.handleResultSearch, searchPlaceholder: searchPlaceholder, resultSearchable: resultSearchable, resultSearchPlaceholder: resultSearchPlaceholder, statistics: statistics, labelField: labelField, valueField: valueField, optionItemRender: menuTpl ? this.optionItemRender : undefined, resultItemRender: valueTpl ? this.resultItemRender : undefined, onSelectAll: this.onSelectAll, onRef: this.getRef, virtualThreshold: virtualThreshold, itemHeight: amisCore.toNumber(itemHeight) > 0 ? amisCore.toNumber(itemHeight) : undefined, loadingConfig: loadingConfig, showInvalidMatch: showInvalidMatch, mobileUI: mobileUI, noResultsText: noResultsText, pagination: tslib.__assign(tslib.__assign({}, pick__default["default"](pagination, [
                    'className',
                    'layout',
                    'perPageAvailable',
                    'popOverContainerSelector'
                ])), { enable: (pagination && pagination.enable !== undefined
                        ? !!(typeof pagination.enable === 'string'
                            ? amisCore.evalExpression(pagination.enable, data)
                            : pagination.enable)
                        : !!(formItem === null || formItem === void 0 ? void 0 : formItem.enableSourcePagination)) &&
                        (!selectMode ||
                            selectMode === 'list' ||
                            selectMode === 'table') &&
                        options.length > 0, maxButtons: Number.isInteger(pagination === null || pagination === void 0 ? void 0 : pagination.maxButtons)
                        ? pagination.maxButtons
                        : 5, page: formItem === null || formItem === void 0 ? void 0 : formItem.sourcePageNum, perPage: formItem === null || formItem === void 0 ? void 0 : formItem.sourcePerPageNum, total: formItem === null || formItem === void 0 ? void 0 : formItem.sourceTotalNum, popOverContainer: popOverContainer !== null && popOverContainer !== void 0 ? popOverContainer : env === null || env === void 0 ? void 0 : env.getModalContainer }), onPageChange: this.handlePageChange, initiallyOpen: initiallyOpen, autoCheckChildren: autoCheckChildren, testIdBuilder: testIdBuilder }),
            _J$X_(amisUi.Spinner, { overlay: true, key: "info", loadingConfig: loadingConfig, show: loading })));
    };
    BaseTransferRenderer.defaultProps = {
        multiple: true
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Boolean]),
        tslib.__metadata("design:returntype", Promise)
    ], BaseTransferRenderer.prototype, "handleChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "option2value", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String, Function, Object]),
        tslib.__metadata("design:returntype", Promise)
    ], BaseTransferRenderer.prototype, "handleSearch", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "handleResultSearch", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Number, Number, String]),
        tslib.__metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "handlePageChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "optionItemRender", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "resultItemRender", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object, Number, Number]),
        tslib.__metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "renderCell", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "getRef", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Array]),
        tslib.__metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "onSelectAll", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], BaseTransferRenderer.prototype, "render", null);
    return BaseTransferRenderer;
}(React__default["default"].Component));
// ts 3.9 里面非得这样才不报错，鬼知道为何。
var TransferRender = /** @class */ (function (_super) {
    tslib.__extends(TransferRender, _super);
    function TransferRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransferRender;
}(BaseTransferRenderer));
amisCore.OptionsControl({
    type: 'transfer'
})(TransferRender);

exports.BaseTransferRenderer = BaseTransferRenderer;
exports.TransferRender = TransferRender;
exports.getCustomFilterOption = getCustomFilterOption;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
