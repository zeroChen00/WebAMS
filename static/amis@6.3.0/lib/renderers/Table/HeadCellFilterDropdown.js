/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var xor = require('lodash/xor');
var ReactDOM = require('react-dom');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var matchSorter = require('match-sorter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var xor__default = /*#__PURE__*/_interopDefaultLegacy(xor);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var HeadCellFilterDropDown = /** @class */ (function (_super) {
    tslib.__extends(HeadCellFilterDropDown, _super);
    function HeadCellFilterDropDown(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpened: false,
            keyword: '',
            filterOptions: []
        };
        _this.sourceInvalid = false;
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleCheck = _this.handleCheck.bind(_this);
        return _this;
    }
    HeadCellFilterDropDown.prototype.componentDidMount = function () {
        var _a = this.props, filterable = _a.filterable, data = _a.data;
        var _b = filterable || {}, source = _b.source, options = _b.options;
        if (source && amisCore.isPureVariable(source)) {
            var datasource = amisCore.resolveVariableAndFilter(source, this.props.superData, '| raw');
            this.setState({
                filterOptions: this.alterOptions(datasource)
            });
        }
        else if (source && amisCore.isEffectiveApi(source, data)) {
            this.fetchOptions();
        }
        else if ((options === null || options === void 0 ? void 0 : options.length) > 0) {
            this.setState({
                filterOptions: this.alterOptions(filterable.options)
            });
        }
    };
    HeadCellFilterDropDown.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b, _c, _d;
        var name = this.props.name;
        var props = this.props;
        this.sourceInvalid = false;
        if (prevProps.name !== props.name ||
            prevProps.filterable !== props.filterable ||
            prevProps.data !== props.data) {
            if (props.filterable.source) {
                this.sourceInvalid = amisCore.isApiOutdated(prevProps.filterable.source, props.filterable.source, prevProps.data, props.data);
            }
            else if (props.filterable.options) {
                this.setState({
                    filterOptions: this.alterOptions(props.filterable.options || [])
                });
            }
            else if (name &&
                !this.state.filterOptions.length &&
                (Array.isArray((_a = props.store) === null || _a === void 0 ? void 0 : _a.data.itemsRaw) ||
                    Array.isArray((_b = props.store) === null || _b === void 0 ? void 0 : _b.data.items))) {
                var itemsRaw = ((_c = props.store) === null || _c === void 0 ? void 0 : _c.data.itemsRaw) || ((_d = props.store) === null || _d === void 0 ? void 0 : _d.data.items);
                var values_1 = [];
                itemsRaw.forEach(function (item) {
                    var value = amisCore.getVariable(item, name);
                    if (!~values_1.indexOf(value)) {
                        values_1.push(value);
                    }
                });
                if (values_1.length) {
                    this.setState({
                        filterOptions: this.alterOptions(values_1)
                    });
                }
            }
        }
        var value = this.props.data ? this.props.data[name] : undefined;
        var prevValue = prevProps.data ? prevProps.data[name] : undefined;
        if (value !== prevValue &&
            this.state.filterOptions.length &&
            prevState.filterOptions !== this.props.filterOptions) {
            this.setState({
                filterOptions: this.alterOptions(this.state.filterOptions)
            });
        }
        this.sourceInvalid && this.fetchOptions();
    };
    HeadCellFilterDropDown.prototype.fetchOptions = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, env, filterable, data, api, ret, options;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, env = _a.env, filterable = _a.filterable, data = _a.data;
                        if (!amisCore.isEffectiveApi(filterable.source, data)) {
                            return [2 /*return*/];
                        }
                        api = amisCore.normalizeApi(filterable.source);
                        api.cache = 3000; // 开启 3s 缓存，因为固顶位置渲染1次会额外多次请求。
                        return [4 /*yield*/, env.fetcher(api, data)];
                    case 1:
                        ret = _b.sent();
                        options = (ret.data && ret.data.options) || [];
                        this.setState({
                            filterOptions: ret && ret.data && this.alterOptions(options)
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HeadCellFilterDropDown.prototype.alterOptions = function (options, keyword) {
        var _this = this;
        if (keyword === void 0) { keyword = ''; }
        var _a = this.props, data = _a.data, filterable = _a.filterable, name = _a.name;
        var labelField = filterable.labelField, valueField = filterable.valueField;
        var filterValue = data && typeof data[name] !== 'undefined' ? data[name] : '';
        options = amisCore.normalizeOptions(options);
        //增加搜索功能
        options = options.map(function (option) {
            option.visible = !!matchSorter.matchSorter([option], keyword, {
                keys: [labelField || 'label', valueField || 'value'],
                threshold: matchSorter.matchSorter.rankings.CONTAINS
            }).length;
            return option;
        });
        if (filterable.multiple) {
            options = options.map(function (option) { return (tslib.__assign(tslib.__assign({}, option), { selected: filterValue.split(',').indexOf(option.value) > -1 })); });
        }
        else {
            options = options.map(function (option) { return (tslib.__assign(tslib.__assign({}, option), { selected: _this.optionComparator(option, filterValue) })); });
        }
        return options;
    };
    HeadCellFilterDropDown.prototype.optionComparator = function (option, selected) {
        var filterable = this.props.filterable;
        /**
         * 无论是否严格模式，需要考虑CRUD开启syncLocation后，参数值会被转化为string的情况：
         * 数字类需要特殊处理，如果两边都为数字类时才进行比较，否则不相等，排除 1 == true 这种情况
         */
        if (amisCore.isNumeric(option.value)) {
            return amisCore.isNumeric(selected) ? option.value == selected : false;
        }
        return (filterable === null || filterable === void 0 ? void 0 : filterable.strictMode) === true
            ? option.value === selected
            : option.value == selected;
    };
    HeadCellFilterDropDown.prototype.handleClickOutside = function () {
        this.close();
    };
    HeadCellFilterDropDown.prototype.open = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, filterable, source, datasource;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, filterable = _a.filterable, source = _a.source;
                        if (!(filterable.refreshOnOpen && filterable.source)) return [3 /*break*/, 3];
                        if (!(source && amisCore.isPureVariable(source))) return [3 /*break*/, 1];
                        datasource = amisCore.resolveVariableAndFilter(source, this.props.superData, '| raw');
                        this.setState({
                            filterOptions: this.alterOptions(datasource)
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.fetchOptions()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        this.setState({
                            isOpened: true
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HeadCellFilterDropDown.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    HeadCellFilterDropDown.prototype.handleClick = function (value) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onQuery, name, data, dispatchEvent, rendererEvent;
            var _b;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, onQuery = _a.onQuery, name = _a.name, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('columnFilter', amisCore.createObject(data, {
                                filterName: name,
                                filterValue: value
                            }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onQuery((_b = {},
                            _b[name] = value,
                            _b), false, false, true);
                        this.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    HeadCellFilterDropDown.prototype.handleCheck = function (value) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, data, name, onQuery, dispatchEvent, query, rendererEvent;
            var _b;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, data = _a.data, name = _a.name, onQuery = _a.onQuery, dispatchEvent = _a.dispatchEvent;
                        if (data[name] && data[name] === value) {
                            query = '';
                        }
                        else {
                            query =
                                (data[name] && xor__default["default"](data[name].split(','), [value]).join(',')) || value;
                        }
                        return [4 /*yield*/, dispatchEvent('columnFilter', amisCore.createObject(data, {
                                filterName: name,
                                filterValue: query
                            }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onQuery((_b = {},
                            _b[name] = query,
                            _b));
                        return [2 /*return*/];
                }
            });
        });
    };
    HeadCellFilterDropDown.prototype.handleReset = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, name, dispatchEvent, data, onQuery, rendererEvent;
            var _b;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, name = _a.name, dispatchEvent = _a.dispatchEvent, data = _a.data, onQuery = _a.onQuery;
                        return [4 /*yield*/, dispatchEvent('columnFilter', amisCore.createObject(data, {
                                filterName: name,
                                filterValue: undefined
                            }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onQuery((_b = {},
                            _b[name] = undefined,
                            _b), false, false, true);
                        this.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    HeadCellFilterDropDown.prototype.handleSearch = function (keyword) {
        var filterOptions = this.state.filterOptions;
        this.setState({
            keyword: keyword,
            filterOptions: this.alterOptions(filterOptions, keyword)
        });
    };
    HeadCellFilterDropDown.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var _e = this.state, isOpened = _e.isOpened, filterOptions = _e.filterOptions;
        var _f = this.props, data = _f.data, name = _f.name, filterable = _f.filterable, popOverContainer = _f.popOverContainer, ns = _f.classPrefix, cx = _f.classnames, __ = _f.translate;
        var searchConfig = (filterable === null || filterable === void 0 ? void 0 : filterable.searchConfig) || {};
        return (_J$X_("span", { className: cx("".concat(ns, "TableCell-filterBtn"), data && typeof data[name] !== 'undefined' ? 'is-active' : '') },
            _J$X_("span", { onClick: this.open },
                _J$X_(amisUi.Icon, { icon: "column-filter", className: "icon" })),
            isOpened ? (_J$X_(amisCore.Overlay, { container: popOverContainer || (function () { return ReactDOM.findDOMNode(_this); }), placement: "left-bottom-left-top right-bottom-right-top", target: popOverContainer ? function () { return ReactDOM.findDOMNode(_this).parentNode; } : null, show: true },
                _J$X_(amisCore.PopOver, { classPrefix: ns, onHide: this.close, className: cx("".concat(ns, "TableCell-filterPopOver"), filterable.className), overlay: true }, filterOptions && filterOptions.length > 0 ? (_J$X_(React__default["default"].Fragment, null,
                    (filterable === null || filterable === void 0 ? void 0 : filterable.searchable) ? (_J$X_(amisUi.SearchBox, { className: cx('TableCell-filterPopOver-SearchBox', searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.className), mini: (_a = searchConfig.mini) !== null && _a !== void 0 ? _a : false, enhance: (_b = searchConfig.enhance) !== null && _b !== void 0 ? _b : false, clearable: (_c = searchConfig.clearable) !== null && _c !== void 0 ? _c : true, searchImediately: searchConfig.searchImediately, placeholder: searchConfig.placeholder, defaultValue: '', value: (_d = this.state.keyword) !== null && _d !== void 0 ? _d : '', onSearch: this.handleSearch, onChange: /** 为了消除react报错 */ amisCore.noop })) : null,
                    _J$X_("ul", { className: cx('DropDown-menu') },
                        !filterable.multiple
                            ? filterOptions.map(function (option, index) {
                                return option.visible && (_J$X_("li", { key: index, className: cx({
                                        'is-active': option.selected
                                    }), onClick: _this.handleClick.bind(_this, option.value) }, option.label));
                            })
                            : filterOptions.map(function (option, index) {
                                return option.visible && (_J$X_("li", { key: index },
                                    _J$X_(amisUi.Checkbox, { classPrefix: ns, onChange: _this.handleCheck.bind(_this, option.value), checked: option.selected }, option.label)));
                            }),
                        filterOptions.some(function (item) { return item.selected; }) ? (_J$X_("li", { key: "DropDown-menu-reset", onClick: this.handleReset.bind(this) }, __('reset'))) : null))) : null))) : null));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String]),
        tslib.__metadata("design:returntype", void 0)
    ], HeadCellFilterDropDown.prototype, "handleSearch", null);
    return HeadCellFilterDropDown;
}(React__default["default"].Component));

exports.HeadCellFilterDropDown = HeadCellFilterDropDown;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
