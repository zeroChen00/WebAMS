/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');
var cx = require('classnames');
var mobxStateTree = require('mobx-state-tree');
var debounce = require('lodash/debounce');
var pick = require('lodash/pick');
var isString = require('lodash/isString');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
var isString__default = /*#__PURE__*/_interopDefaultLegacy(isString);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var DEFAULT_EVENT_PARAMS = [
    'componentType',
    'seriesType',
    'seriesIndex',
    'seriesName',
    'name',
    'dataIndex',
    'data',
    'dataType',
    'value',
    'color'
];
var EVAL_CACHE = {};
/**
 * ECharts 中有些配置项可以写函数，但 JSON 中无法支持，为了实现这个功能，需要将看起来像函数的字符串转成函数类型
 * 目前 ECharts 中可能有函数的配置项有如下：interval、formatter、color、min、max、labelFormatter、pageFormatter、optionToContent、contentToOption、animationDelay、animationDurationUpdate、animationDelayUpdate、animationDuration、position、sort
 * @param config ECharts 配置
 */
function recoverFunctionType(config) {
    [
        'interval',
        'formatter',
        'color',
        'min',
        'max',
        'labelFormatter',
        'valueFormatter',
        'pageFormatter',
        'optionToContent',
        'contentToOption',
        'animationDelay',
        'animationDurationUpdate',
        'animationDelayUpdate',
        'animationDuration',
        'position',
        'sort',
        'renderItem'
    ].forEach(function (key) {
        var e_1, _a;
        var objects = amisCore.findObjectsWithKey(config, key);
        try {
            for (var objects_1 = tslib.__values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
                var object = objects_1_1.value;
                var code = object[key];
                if (typeof code === 'string' && code.trim().startsWith('function')) {
                    try {
                        if (!(code in EVAL_CACHE)) {
                            EVAL_CACHE[code] = eval('(' + code + ')');
                        }
                        object[key] = EVAL_CACHE[code];
                    }
                    catch (e) {
                        console.warn(code, e);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
var Chart = /** @class */ (function (_super) {
    tslib.__extends(Chart, _super);
    function Chart(props) {
        var _this = _super.call(this, props) || this;
        _this.refFn = _this.refFn.bind(_this);
        _this.reload = _this.reload.bind(_this);
        _this.reloadEcharts = debounce__default["default"](_this.reloadEcharts.bind(_this), 300); //过于频繁更新 ECharts 会报错
        _this.handleClick = _this.handleClick.bind(_this);
        _this.dispatchEvent = _this.dispatchEvent.bind(_this);
        _this.loadChartMapData = _this.loadChartMapData.bind(_this);
        _this.mounted = true;
        props.config && _this.renderChart(props.config);
        return _this;
    }
    Chart.prototype.componentDidMount = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, api, data, initFetch, source, dispatchEvent, rendererEvent, ret;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, api = _a.api, data = _a.data, initFetch = _a.initFetch, source = _a.source, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('init', data, this)];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (source && amisCore.isPureVariable(source)) {
                            ret = amisCore.resolveVariableAndFilter(source, data, '| raw');
                            ret && this.renderChart(ret);
                        }
                        else if (api && initFetch !== false) {
                            this.reload();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Chart.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var props = this.props;
        if (amisCore.isApiOutdated(prevProps.api, props.api, prevProps.data, props.data)) {
            this.reload();
        }
        else if (props.source && amisCore.isPureVariable(props.source)) {
            var prevRet = prevProps.source
                ? amisCore.resolveVariableAndFilter(prevProps.source, prevProps.data, '| raw')
                : null;
            var ret = amisCore.resolveVariableAndFilter(props.source, props.data, '| raw');
            if (prevRet !== ret) {
                this.renderChart(ret || {});
            }
        }
        else if (props.config !== prevProps.config) {
            this.renderChart(props.config || {});
        }
        else if (props.config &&
            props.trackExpression &&
            amisCore.filter(props.trackExpression, props.data) !==
                amisCore.filter(prevProps.trackExpression, prevProps.data)) {
            this.renderChart(props.config || {});
        }
        else if (amisCore.isApiOutdated(prevProps.mapURL, props.mapURL, prevProps.data, props.data)) {
            var source_1 = props.source, data_1 = props.data, api_1 = props.api, config_1 = props.config;
            this.loadChartMapData(function () {
                if (source_1 && amisCore.isPureVariable(source_1)) {
                    var ret = amisCore.resolveVariableAndFilter(source_1, data_1, '| raw');
                    ret && _this.renderChart(ret);
                }
                else if (api_1) {
                    _this.reload();
                }
                else if (config_1) {
                    _this.renderChart(config_1 || {});
                }
            });
        }
    };
    Chart.prototype.componentWillUnmount = function () {
        this.mounted = false;
        this.reloadEcharts.cancel();
        clearTimeout(this.timer);
    };
    Chart.prototype.loadChartMapData = function (callBackFn) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, env, data, _b, mapName, mapURL, mapGeoResult;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, env = _a.env, data = _a.data;
                        _b = this.props, mapName = _b.mapName, mapURL = _b.mapURL;
                        if (!(mapURL && mapName && window.echarts)) return [3 /*break*/, 2];
                        if (amisCore.isPureVariable(mapName)) {
                            mapName = amisCore.resolveVariableAndFilter(mapName, data);
                        }
                        return [4 /*yield*/, env.fetcher(mapURL, data)];
                    case 1:
                        mapGeoResult = _c.sent();
                        if (!mapGeoResult.ok) {
                            console.warn('fetch map geo error ' + mapURL);
                        }
                        window.echarts.registerMap(mapName, mapGeoResult.data);
                        _c.label = 2;
                    case 2:
                        if (callBackFn) {
                            callBackFn();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Chart.prototype.handleClick = function (ctx) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onAction, clickAction, data, dispatchEvent, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onAction = _a.onAction, clickAction = _a.clickAction, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent(ctx.event, amisCore.createObject(data, tslib.__assign({}, pick__default["default"](ctx, DEFAULT_EVENT_PARAMS))))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        clickAction &&
                            onAction &&
                            onAction(null, clickAction, amisCore.createObject(data, ctx));
                        return [2 /*return*/];
                }
            });
        });
    };
    Chart.prototype.dispatchEvent = function (ctx) {
        var _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent;
        dispatchEvent(ctx.event || ctx.type, amisCore.createObject(data, tslib.__assign({}, pick__default["default"](ctx, ctx.type === 'legendselectchanged'
            ? ['name', 'selected']
            : DEFAULT_EVENT_PARAMS))));
    };
    Chart.prototype.refFn = function (ref) {
        var _this = this;
        var chartRef = this.props.chartRef;
        var _a = this.props, chartTheme = _a.chartTheme, onChartWillMount = _a.onChartWillMount, onChartUnMount = _a.onChartUnMount, env = _a.env, loadBaiduMap = _a.loadBaiduMap; _a.data;
        var _b = this.props, mapURL = _b.mapURL, mapName = _b.mapName;
        var onChartMount = this.props.onChartMount || this.onChartMount;
        if (ref) {
            Promise.all([
                Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['echarts'], function(mod) {fullfill(tslib.__importStar(mod))})})}),
                Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['echarts-stat'], function(mod) {fullfill(tslib.__importStar(mod))})})}),
                // @ts-ignore 官方没提供 type
                Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['echarts/extension/dataTool'], function(mod) {fullfill(tslib.__importStar(mod))})})}),
                // @ts-ignore 官方没提供 type
                Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['echarts/extension/bmap/bmap'], function(mod) {fullfill(tslib.__importStar(mod))})})}),
                // @ts-ignore 官方没提供 type
                Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['echarts-wordcloud/dist/echarts-wordcloud'], function(mod) {fullfill(tslib.__importStar(mod))})})})
            ]).then(function (_a) {
                var _b = tslib.__read(_a, 2), echarts = _b[0], ecStat = _b[1];
                return tslib.__awaiter(_this, void 0, void 0, function () {
                    var theme;
                    var _this = this;
                    return tslib.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                window.echarts = echarts;
                                window.ecStat = (ecStat === null || ecStat === void 0 ? void 0 : ecStat.default) || ecStat;
                                if (!(mapURL && mapName)) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.loadChartMapData()];
                            case 1:
                                _c.sent();
                                _c.label = 2;
                            case 2:
                                if (!loadBaiduMap) return [3 /*break*/, 4];
                                return [4 /*yield*/, amisCore.loadScript("//api.map.baidu.com/api?v=3.0&ak=".concat(this.props.ak, "&callback={{callback}}"))];
                            case 3:
                                _c.sent();
                                _c.label = 4;
                            case 4:
                                theme = 'default';
                                if (chartTheme) {
                                    echarts.registerTheme('custom', chartTheme);
                                    theme = 'custom';
                                }
                                if (!onChartWillMount) return [3 /*break*/, 6];
                                return [4 /*yield*/, onChartWillMount(echarts)];
                            case 5:
                                _c.sent();
                                _c.label = 6;
                            case 6:
                                if (ecStat.transform) {
                                    echarts.registerTransform(ecStat.transform.regression);
                                    echarts.registerTransform(ecStat.transform.histogram);
                                    echarts.registerTransform(ecStat.transform.clustering);
                                }
                                if (!env.loadChartExtends) return [3 /*break*/, 8];
                                return [4 /*yield*/, env.loadChartExtends()];
                            case 7:
                                _c.sent();
                                _c.label = 8;
                            case 8:
                                this.echarts = echarts.init(ref, theme);
                                if (typeof onChartMount === 'string') {
                                    onChartMount = new Function('chart', 'echarts');
                                }
                                onChartMount === null || onChartMount === void 0 ? void 0 : onChartMount(this.echarts, echarts);
                                this.echarts.on('click', this.handleClick);
                                this.echarts.on('mouseover', this.dispatchEvent);
                                this.echarts.on('legendselectchanged', this.dispatchEvent);
                                this.unSensor = amisCore.resizeSensor(ref, function () {
                                    var _a;
                                    var width = ref.offsetWidth;
                                    var height = ref.offsetHeight;
                                    (_a = _this.echarts) === null || _a === void 0 ? void 0 : _a.resize({
                                        width: width,
                                        height: height
                                    });
                                });
                                chartRef && chartRef(this.echarts);
                                this.renderChart();
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
        else {
            chartRef && chartRef(null);
            this.unSensor && this.unSensor();
            if (this.echarts) {
                onChartUnMount === null || onChartUnMount === void 0 ? void 0 : onChartUnMount(this.echarts, window.echarts);
                this.echarts.dispose();
                delete this.echarts;
            }
        }
        this.ref = ref;
    };
    Chart.prototype.doAction = function (action, data, throwErrors) {
        var _a, _b;
        return (_b = (_a = this.echarts) === null || _a === void 0 ? void 0 : _a.dispatchAction) === null || _b === void 0 ? void 0 : _b.call(_a, tslib.__assign({ type: action.actionType }, data));
    };
    Chart.prototype.reload = function (subpath, query, ctx, silent, replace) {
        var _this = this;
        var _a, _b;
        var _c = this.props, api = _c.api, env = _c.env, store = _c.store, __ = _c.translate;
        if (query) {
            return this.receive(query, undefined, replace);
        }
        else if (!env || !env.fetcher || !amisCore.isEffectiveApi(api, store.data)) {
            return;
        }
        clearTimeout(this.timer);
        if (this.reloadCancel) {
            this.reloadCancel();
            delete this.reloadCancel;
            (_a = this.echarts) === null || _a === void 0 ? void 0 : _a.hideLoading();
        }
        (_b = this.echarts) === null || _b === void 0 ? void 0 : _b.showLoading();
        store.markFetching(true);
        env
            .fetcher(api, store.data, {
            cancelExecutor: function (executor) { return (_this.reloadCancel = executor); }
        })
            .then(function (result) {
            var _a, _b, _c;
            mobxStateTree.isAlive(store) && store.markFetching(false);
            if (!result.ok) {
                !(api === null || api === void 0 ? void 0 : api.silent) &&
                    env.notify('error', (_b = (_a = api === null || api === void 0 ? void 0 : api.messages) === null || _a === void 0 ? void 0 : _a.failed) !== null && _b !== void 0 ? _b : (result.msg || __('fetchFailed')), result.msgTimeout !== undefined
                        ? {
                            closeButton: true,
                            timeout: result.msgTimeout
                        }
                        : undefined);
                return;
            }
            delete _this.reloadCancel;
            var data = amisCore.normalizeApiResponseData(result.data);
            // 说明返回的是数据接口。
            if (!data.series && _this.props.config) {
                var ctx_1 = amisCore.createObject(_this.props.data, data);
                _this.renderChart(_this.props.config, ctx_1);
            }
            else {
                _this.renderChart(result.data || {});
            }
            (_c = _this.echarts) === null || _c === void 0 ? void 0 : _c.hideLoading();
            var curInterval = _this.props.interval;
            if (curInterval && isString__default["default"](curInterval)) {
                curInterval = Number.parseInt(curInterval);
            }
            curInterval &&
                _this.mounted &&
                (_this.timer = setTimeout(_this.reload, Math.max(curInterval, 1000)));
        })
            .catch(function (reason) {
            var _a;
            if (env.isCancel(reason)) {
                return;
            }
            mobxStateTree.isAlive(store) && store.markFetching(false);
            !(api === null || api === void 0 ? void 0 : api.silent) && env.notify('error', reason);
            (_a = _this.echarts) === null || _a === void 0 ? void 0 : _a.hideLoading();
        });
    };
    Chart.prototype.receive = function (data, subPath, replace) {
        var store = this.props.store;
        store.updateData(data, undefined, replace);
        this.reload();
    };
    Chart.prototype.renderChart = function (config, data) {
        var _a, _b;
        config && (this.pending = config);
        data && (this.pendingCtx = data);
        if (!this.echarts) {
            return;
        }
        var store = this.props.store;
        var onDataFilter = this.props.onDataFilter;
        var dataFilter = this.props.dataFilter;
        if (!onDataFilter && typeof dataFilter === 'string') {
            onDataFilter = new Function('config', 'echarts', 'data', dataFilter);
        }
        config = config || this.pending;
        data = data || this.pendingCtx || this.props.data;
        if (typeof config === 'string') {
            config = new Function('return ' + config)();
        }
        try {
            onDataFilter &&
                (config =
                    onDataFilter(config, window.echarts, data) || config);
        }
        catch (e) {
            console.warn(e);
        }
        if (config) {
            try {
                if (!this.props.disableDataMapping) {
                    config = amisCore.dataMapping(config, data, function (key, value) {
                        return typeof value === 'function' ||
                            (typeof value === 'string' && value.startsWith('function'));
                    });
                }
                recoverFunctionType(config);
                if (mobxStateTree.isAlive(store) && store.loading) {
                    (_a = this.echarts) === null || _a === void 0 ? void 0 : _a.showLoading();
                }
                else {
                    (_b = this.echarts) === null || _b === void 0 ? void 0 : _b.hideLoading();
                }
                this.reloadEcharts(config);
            }
            catch (e) {
                console.warn(e);
            }
        }
    };
    Chart.prototype.reloadEcharts = function (config) {
        var _a;
        (_a = this.echarts) === null || _a === void 0 ? void 0 : _a.setOption(config, this.props.replaceChartOption);
    };
    Chart.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, width = _a.width, height = _a.height, ns = _a.classPrefix, unMountOnHidden = _a.unMountOnHidden, data = _a.data, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss; _a.baseControlClassName;
        var style = this.props.style || {};
        style.width = style.width || width || '100%';
        style.height = style.height || height || '300px';
        var styleVar = amisCore.buildStyle(style, data);
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "Chart"), className, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), style: styleVar },
            _J$X_(amisCore.LazyComponent, { unMountOnHidden: unMountOnHidden, placeholder: "..." // 之前那个 spinner 会导致 sensor 失效
                , component: function () { return (_J$X_("div", { className: "".concat(ns, "Chart-content"), ref: _this.refFn })); } }),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    Chart.defaultProps = {
        replaceChartOption: false,
        unMountOnHidden: false
    };
    Chart.propsList = [];
    return Chart;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(ChartRenderer, _super);
    function ChartRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    ChartRenderer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    ChartRenderer.prototype.setData = function (values, replace) {
        var store = this.props.store;
        store.updateData(values, undefined, replace);
        // 重新渲染
        this.renderChart(this.props.config, store.data);
    };
    ChartRenderer.prototype.getData = function () {
        var store = this.props.store;
        return store.data;
    };
    ChartRenderer.contextType = amisCore.ScopedContext;
    ChartRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'chart',
            storeType: amisCore.ServiceStore.name
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], ChartRenderer);
    return ChartRenderer;
})(Chart));

exports.Chart = Chart;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
