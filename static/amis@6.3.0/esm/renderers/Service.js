/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import extend from 'lodash/extend';
import cloneDeep from 'lodash/cloneDeep';
import { isApiOutdated, isEffectiveApi, isObjectShallowModified, str2AsyncFunction, buildApi, createObject, isEmpty, evalExpression, filter, filterTarget, isVisible, autobind, qsstringify, ScopedContext, Renderer, ServiceStore } from 'amis-core';
import { Alert2, Spinner } from 'amis-ui';
import isPlainObject from 'lodash/isPlainObject';

var eventTypes = [
    /* 初始化时执行，默认 */
    'inited',
    /* API请求调用成功之后执行 */
    'onApiFetched',
    /* Schema API请求调用成功之后执行 */
    'onSchemaApiFetched',
    /* WebSocket调用成功后执行 */
    'onWsFetched'
];
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service(props) {
        var _this = _super.call(this, props) || this;
        _this.dataProviders = _this.initDataProviders(props.dataProvider);
        _this.handleQuery = _this.handleQuery.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.reload = _this.reload.bind(_this);
        _this.silentReload = _this.silentReload.bind(_this);
        _this.initInterval = _this.initInterval.bind(_this);
        _this.afterDataFetch = _this.afterDataFetch.bind(_this);
        _this.afterSchemaFetch = _this.afterSchemaFetch.bind(_this);
        _this.runDataProvider = _this.runDataProvider.bind(_this);
        _this.dataProviderSetData = _this.dataProviderSetData.bind(_this);
        return _this;
    }
    Service.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, dispatchEvent, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        this.mounted = true;
                        return [4 /*yield*/, dispatchEvent('init', data, this)];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.initFetch();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var _a;
        var props = this.props;
        var store = props.store;
        var _b = props.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed;
        if (props.dataProvider !== prevProps.dataProvider) {
            /* 重新构建provider函数 */
            this.dataProviders = this.initDataProviders(props.dataProvider);
            if (this.dataProviders && ((_a = this.dataProviders) === null || _a === void 0 ? void 0 : _a.inited)) {
                this.runDataProvider('inited');
            }
        }
        if (isApiOutdated(prevProps.api, props.api, prevProps.data, props.data) &&
            isEffectiveApi(props.api, store.data)) {
            store
                .fetchData(props.api, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(function (res) {
                _this.runDataProvider('onApiFetched');
                _this.afterDataFetch(res);
            });
        }
        if (isApiOutdated(prevProps.schemaApi, props.schemaApi, prevProps.data, props.data) &&
            isEffectiveApi(props.schemaApi, store.data)) {
            store
                .fetchSchema(props.schemaApi, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(function (res) {
                _this.runDataProvider('onSchemaApiFetched');
                _this.afterSchemaFetch(res);
            });
        }
        if (props.ws && prevProps.ws !== props.ws) {
            if (this.socket) {
                this.socket.close();
            }
            this.socket = this.fetchWSData(props.ws, store.data);
        }
        if (isObjectShallowModified(prevProps.defaultData, props.defaultData)) {
            store.reInitData(props.defaultData);
        }
    };
    Service.prototype.componentWillUnmount = function () {
        this.mounted = false;
        this.runDataProviderUnsubscribe();
        clearTimeout(this.timer);
        if (this.socket && this.socket.close) {
            this.socket.close();
        }
    };
    Service.prototype.doAction = function (action, data, throwErrors, args) {
        if ((action === null || action === void 0 ? void 0 : action.actionType) === 'rebuild') {
            var _a = this.props, schemaApi = _a.schemaApi, store = _a.store, dataProvider = _a.dataProvider, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed;
            store.updateData(args);
            clearTimeout(this.timer);
            if (isEffectiveApi(schemaApi, store.data)) {
                store
                    .fetchSchema(schemaApi, store.data, {
                    successMessage: fetchSuccess,
                    errorMessage: fetchFailed
                })
                    .then(this.afterSchemaFetch);
            }
            if (dataProvider) {
                this.runDataProvider('inited');
            }
        }
    };
    Service.prototype.initFetch = function () {
        var _this = this;
        var _a = this.props, schemaApi = _a.schemaApi, initFetchSchema = _a.initFetchSchema, api = _a.api, ws = _a.ws, initFetch = _a.initFetch, initFetchOn = _a.initFetchOn, dataProvider = _a.dataProvider, store = _a.store, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed;
        if (isEffectiveApi(schemaApi, store.data, initFetchSchema)) {
            store
                .fetchSchema(schemaApi, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(function (res) {
                _this.runDataProvider('onSchemaApiFetched');
                _this.afterSchemaFetch(res);
            });
        }
        if (isEffectiveApi(api, store.data, initFetch, initFetchOn)) {
            store
                .fetchInitData(api, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(function (res) {
                _this.runDataProvider('onApiFetched');
                _this.afterDataFetch(res);
            });
        }
        if (ws) {
            this.socket = this.fetchWSData(ws, store.data);
        }
        if (dataProvider) {
            this.runDataProvider('inited');
        }
    };
    /**
     * 初始化Provider函数集，将Schema配置统一转化为DataProviderCollection格式
     */
    Service.prototype.initDataProviders = function (provider) {
        var _this = this;
        var dataProvider = isPlainObject(provider)
            ? cloneDeep(provider)
            : provider;
        var fnCollection = {};
        if (dataProvider) {
            if (isPlainObject(dataProvider)) {
                Object.keys(dataProvider).forEach(function (event) {
                    var normalizedProvider = _this.normalizeProvider(dataProvider[event], event);
                    fnCollection = extend(fnCollection, normalizedProvider || {});
                });
            }
            else {
                var normalizedProvider = this.normalizeProvider(dataProvider, 'inited');
                fnCollection = extend(fnCollection, normalizedProvider || {});
            }
        }
        return fnCollection;
    };
    /**
     * 标准化处理Provider函数
     */
    Service.prototype.normalizeProvider = function (provider, event) {
        var _a, _b;
        if (event === void 0) { event = 'inited'; }
        if (!~eventTypes.indexOf(event)) {
            return null;
        }
        if (typeof provider === 'function') {
            return _a = {}, _a[event] = provider, _a;
        }
        else if (typeof provider === 'string') {
            var asyncFn = str2AsyncFunction(provider, 'data', 'setData', 'env');
            return asyncFn
                ? (_b = {},
                    _b[event] = asyncFn,
                    _b) : null;
        }
        return null;
    };
    /**
     * 使用外部函数获取数据
     *
     * @param {ProviderEventType} event 触发provider函数执行的事件，默认初始时执行
     */
    Service.prototype.runDataProvider = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var store, dataProviders, fn, unsubscribe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.runDataProviderUnsubscribe(event);
                        store = this.props.store;
                        dataProviders = this.dataProviders;
                        if (!(dataProviders && ~eventTypes.indexOf(event))) return [3 /*break*/, 2];
                        fn = dataProviders[event];
                        if (!(fn && typeof fn === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, fn(store.data, this.dataProviderSetData, this.props.env)];
                    case 1:
                        unsubscribe = _a.sent();
                        if (typeof unsubscribe === 'function') {
                            if (!this.dataProviderUnsubscribe) {
                                this.dataProviderUnsubscribe = {};
                            }
                            this.dataProviderUnsubscribe[event] = unsubscribe;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 运行销毁外部函数的方法
     *
     * @param {ProviderEventType} event 事件名称，不传参数即执行所有销毁函数
     */
    Service.prototype.runDataProviderUnsubscribe = function (event) {
        var _a;
        var dataProviderUnsubscribe = this.dataProviderUnsubscribe;
        if (!dataProviderUnsubscribe) {
            return;
        }
        if (event) {
            var disposedFn = dataProviderUnsubscribe[event];
            try {
                if (disposedFn && typeof disposedFn === 'function') {
                    disposedFn();
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            (_a = Object.keys(dataProviderUnsubscribe)) === null || _a === void 0 ? void 0 : _a.forEach(function (event) {
                var disposedFn = dataProviderUnsubscribe[event];
                try {
                    if (disposedFn && typeof disposedFn === 'function') {
                        disposedFn();
                    }
                }
                catch (error) {
                    console.error(error);
                }
            });
        }
    };
    // 外部函数回调更新数据
    Service.prototype.dataProviderSetData = function (data) {
        if (!this.mounted) {
            return;
        }
        var store = this.props.store;
        store.updateData(data, undefined, false);
        store.setHasRemoteData();
    };
    // 使用 websocket 获取使用，因为有异步所以放这里而不是 store 实现
    Service.prototype.fetchWSData = function (ws, data) {
        var _this = this;
        var _a = this.props, env = _a.env, store = _a.store;
        var wsApi = buildApi(ws, data);
        env.wsFetcher(wsApi, function (data) {
            var _a, _b, _c, _d;
            var returndata = data;
            if ('status' in data && 'data' in data) {
                returndata = data.data;
                if (data.status !== 0) {
                    store.updateMessage((_b = (_a = wsApi === null || wsApi === void 0 ? void 0 : wsApi.messages) === null || _a === void 0 ? void 0 : _a.failed) !== null && _b !== void 0 ? _b : data.msg, true);
                    env.notify('error', (_d = (_c = wsApi === null || wsApi === void 0 ? void 0 : wsApi.messages) === null || _c === void 0 ? void 0 : _c.failed) !== null && _d !== void 0 ? _d : data.msg);
                    return;
                }
            }
            store.updateData(returndata, undefined, false, wsApi.concatDataFields);
            store.setHasRemoteData();
            _this.runDataProvider('onWsFetched');
            // 因为 WebSocket 只会获取纯数据，所以没有 msg 之类的
            _this.afterDataFetch({ ok: true, data: returndata });
        }, function (error) {
            store.updateMessage(error, true);
            env.notify('error', error);
        });
    };
    Service.prototype.afterDataFetch = function (result) {
        var _a;
        // todo 应该统一这块
        // 初始化接口返回的是整个 response，
        // 保存 ajax 请求的时候返回时数据部分。
        var data = (result === null || result === void 0 ? void 0 : result.hasOwnProperty('ok')) ? (_a = result.data) !== null && _a !== void 0 ? _a : {} : result;
        var _b = this.props, onBulkChange = _b.onBulkChange, dispatchEvent = _b.dispatchEvent, store = _b.store, formStore = _b.formStore;
        dispatchEvent === null || dispatchEvent === void 0 ? void 0 : dispatchEvent('fetchInited', createObject(this.props.data, __assign(__assign({}, data), { __response: { msg: store.msg, error: store.error }, responseData: data, responseStatus: (result === null || result === void 0 ? void 0 : result.status) === undefined ? (store.error ? 1 : 0) : result === null || result === void 0 ? void 0 : result.status, responseMsg: store.msg })));
        if (!isEmpty(data) && onBulkChange && formStore) {
            onBulkChange(data);
        }
        (result === null || result === void 0 ? void 0 : result.ok) && this.initInterval(data);
    };
    Service.prototype.afterSchemaFetch = function (schema) {
        var _a = this.props, onBulkChange = _a.onBulkChange, formStore = _a.formStore, dispatchEvent = _a.dispatchEvent, store = _a.store;
        dispatchEvent === null || dispatchEvent === void 0 ? void 0 : dispatchEvent('fetchSchemaInited', __assign(__assign({}, schema), { __response: { msg: store.msg, error: store.error }, responseData: schema, responseStatus: (schema === null || schema === void 0 ? void 0 : schema.status) === undefined ? (store.error ? 1 : 0) : schema === null || schema === void 0 ? void 0 : schema.status, responseMsg: store.msg }));
        if (formStore && (schema === null || schema === void 0 ? void 0 : schema.data) && onBulkChange) {
            onBulkChange && onBulkChange(schema.data);
        }
        this.initInterval(schema);
    };
    Service.prototype.initInterval = function (value) {
        var _a = this.props, interval = _a.interval, silentPolling = _a.silentPolling, stopAutoRefreshWhen = _a.stopAutoRefreshWhen, data = _a.data;
        clearTimeout(this.timer);
        interval &&
            this.mounted &&
            (!stopAutoRefreshWhen ||
                /** 接口返回值需要同步到数据域中再判断，否则会多请求一轮 */
                !evalExpression(stopAutoRefreshWhen, createObject(data, value))) &&
            (this.timer = setTimeout(silentPolling ? this.silentReload : this.reload, Math.max(interval, 1000)));
        return value;
    };
    Service.prototype.reload = function (subpath, query, ctx, silent, replace) {
        var _this = this;
        if (query) {
            return this.receive(query, undefined, replace);
        }
        var _a = this.props, schemaApi = _a.schemaApi; _a.initFetchSchema; var api = _a.api; _a.initFetch; _a.initFetchOn; var store = _a.store, dataProvider = _a.dataProvider, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed;
        clearTimeout(this.timer);
        if (isEffectiveApi(schemaApi, store.data)) {
            store
                .fetchSchema(schemaApi, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(function (res) {
                _this.runDataProvider('onApiFetched');
                _this.afterSchemaFetch(res);
            });
        }
        if (isEffectiveApi(api, store.data)) {
            store
                .fetchData(api, store.data, {
                silent: silent,
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(function (res) {
                _this.runDataProvider('onSchemaApiFetched');
                _this.afterDataFetch(res);
            });
        }
        if (dataProvider) {
            this.runDataProvider('inited');
        }
    };
    Service.prototype.silentReload = function (target, query) {
        this.reload(target, query, undefined, true);
    };
    Service.prototype.receive = function (values, subPath, replace) {
        var store = this.props.store;
        store.updateData(values, undefined, replace);
        this.reload();
    };
    Service.prototype.handleQuery = function (query) {
        var _this = this;
        if (this.props.api || this.props.schemaApi) {
            // 如果是分页动作，则看接口里面有没有用，没用则  return false
            // 让组件自己去排序
            if ((query === null || query === void 0 ? void 0 : query.hasOwnProperty('orderBy')) &&
                [this.props.api, this.props.schemaApi].every(function (api) {
                    return !api ||
                        !isApiOutdated(api, api, _this.props.store.data, createObject(_this.props.store.data, query));
                })) {
                return false;
            }
            this.receive(query);
            return;
        }
        if (this.props.onQuery) {
            return this.props.onQuery(query);
        }
        else {
            return false;
        }
    };
    Service.prototype.reloadTarget = function (target, data) {
        // 会被覆写
    };
    Service.prototype.handleDialogConfirm = function (values, action, ctx, targets) {
        var store = this.props.store;
        store.closeDialog(true, values);
    };
    Service.prototype.handleDialogClose = function (confirmed) {
        if (confirmed === void 0) { confirmed = false; }
        var store = this.props.store;
        store.closeDialog(confirmed);
    };
    Service.prototype.openFeedback = function (dialog, ctx) {
        var _this = this;
        return new Promise(function (resolve) {
            var store = _this.props.store;
            store.setCurrentAction({
                type: 'button',
                actionType: 'dialog',
                dialog: dialog
            }, _this.props.resolveDefinitions);
            store.openDialog(ctx, undefined, function (confirmed) {
                resolve(confirmed);
            }, _this.context);
        });
    };
    Service.prototype.handleAction = function (e, action, data, throwErrors, delegate) {
        var _this = this;
        if (throwErrors === void 0) { throwErrors = false; }
        var _a = this.props, onAction = _a.onAction, store = _a.store, env = _a.env, api = _a.api, __ = _a.translate;
        if (api && action.actionType === 'ajax') {
            store.setCurrentAction(action, this.props.resolveDefinitions);
            store
                .saveRemote(action.api, data, {
                successMessage: __(action.messages && action.messages.success),
                errorMessage: __(action.messages && action.messages.failed)
            })
                .then(function (payload) { return __awaiter(_this, void 0, void 0, function () {
                var redirect;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.afterDataFetch(payload);
                            if (!(action.feedback && isVisible(action.feedback, store.data))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.openFeedback(action.feedback, store.data)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            redirect = action.redirect && filter(action.redirect, store.data);
                            redirect && env.jumpTo(redirect, action, store.data);
                            action.reload &&
                                this.reloadTarget(filterTarget(action.reload, store.data), store.data);
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (e) {
                if (throwErrors || action.countDown) {
                    throw e;
                }
            });
        }
        else {
            onAction(e, action, data, throwErrors, delegate || this.context);
        }
    };
    Service.prototype.handleChange = function (value, name, submit, changePristine) {
        var _a, _b;
        var _c = this.props, store = _c.store, formStore = _c.formStore, onChange = _c.onChange;
        // form 触发的 onChange,直接忽略
        if (typeof name !== 'string') {
            return;
        }
        (_b = (_a = store).changeValue) === null || _b === void 0 ? void 0 : _b.call(_a, name, value);
        // 如果在form底下，则继续向上派送。
        formStore && (onChange === null || onChange === void 0 ? void 0 : onChange(value, name, submit, changePristine));
    };
    Service.prototype.renderBody = function () {
        var _a = this.props, render = _a.render, store = _a.store, schema = _a.body; _a.classnames;
        return render('body', store.schema || schema, {
            key: store.schemaKey || 'body',
            loading: store.loading,
            onQuery: this.handleQuery,
            onAction: this.handleAction,
            onChange: this.handleChange
        });
    };
    Service.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, store = _a.store, render = _a.render, env = _a.env, ns = _a.classPrefix, cx = _a.classnames, loadingConfig = _a.loadingConfig, showErrorMsg = _a.showErrorMsg, testIdBuilder = _a.testIdBuilder;
        return (React.createElement("div", __assign({ className: cx("".concat(ns, "Service"), className), style: style }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getTestId()),
            !env.forceSilenceInsideError &&
                store.error &&
                showErrorMsg !== false ? (React.createElement(Alert2, { level: "danger", showCloseButton: true, onClose: function () { return store.updateMessage(''); } }, store.msg)) : null,
            this.renderBody(),
            React.createElement(Spinner, { size: "lg", overlay: true, key: "info", show: store.loading, loadingConfig: loadingConfig }),
            render(
            // 单独给 feedback 服务的，handleAction 里面先不要处理弹窗
            'modal', __assign(__assign({}, (store.action &&
                store.action.dialog)), { type: 'dialog' }), {
                key: 'dialog',
                data: store.dialogData,
                onConfirm: this.handleDialogConfirm,
                onClose: this.handleDialogClose,
                show: store.dialogOpen
            })));
    };
    Service.defaultProps = {
        messages: {
            fetchFailed: 'fetchFailed'
        },
        showErrorMsg: true
    };
    Service.propsList = [];
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Service.prototype, "initFetch", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Service.prototype, "initDataProviders", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Object)
    ], Service.prototype, "normalizeProvider", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object, Object, Array]),
        __metadata("design:returntype", void 0)
    ], Service.prototype, "handleDialogConfirm", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Service.prototype, "handleDialogClose", null);
    return Service;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ServiceRenderer, _super);
    function ServiceRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    ServiceRenderer.prototype.reload = function (subpath, query, ctx, silent, replace) {
        var scoped = this.context;
        if (subpath) {
            return scoped.reload(query ? "".concat(subpath, "?").concat(qsstringify(query)) : subpath, ctx);
        }
        return _super.prototype.reload.call(this, subpath, query, ctx, silent, replace);
    };
    ServiceRenderer.prototype.receive = function (values, subPath, replace) {
        var scoped = this.context;
        if (subPath) {
            return scoped.send(subPath, values);
        }
        return _super.prototype.receive.call(this, values, subPath, replace);
    };
    ServiceRenderer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    ServiceRenderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    ServiceRenderer.prototype.setData = function (values, replace) {
        return this.props.store.updateData(values, undefined, replace);
    };
    ServiceRenderer.prototype.getData = function () {
        var store = this.props.store;
        return store.data;
    };
    ServiceRenderer.contextType = ScopedContext;
    ServiceRenderer = __decorate([
        Renderer({
            type: 'service',
            storeType: ServiceStore.name,
            isolateScope: true,
            storeExtendsData: function (props) { return (props.formStore ? false : true); }
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], ServiceRenderer);
    return ServiceRenderer;
})(Service));

export { Service as default, eventTypes };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
