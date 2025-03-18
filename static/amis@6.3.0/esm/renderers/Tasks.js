/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { isApiOutdated, isEffectiveApi, createObject, ScopedContext, Renderer } from 'amis-core';
import update from 'immutability-helper';
import { Spinner } from 'amis-ui';

var Task = /** @class */ (function (_super) {
    __extends(Task, _super);
    function Task(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            items: props.items ? props.items.concat() : []
        };
        _this.handleLoaded = _this.handleLoaded.bind(_this);
        _this.tick = _this.tick.bind(_this);
        return _this;
    }
    Task.prototype.componentDidMount = function () {
        this.tick(!!this.props.checkApi);
    };
    Task.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (prevProps.items !== props.items) {
            this.setState({
                items: props.items ? props.items.concat() : []
            });
        }
        else if (isApiOutdated(prevProps.checkApi, props.checkApi, prevProps.data, props.data)) {
            this.tick(true);
        }
    };
    Task.prototype.componentWillUnmount = function () {
        clearTimeout(this.timer);
    };
    Task.prototype.reload = function () {
        this.tick(true);
    };
    Task.prototype.tick = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var _a = this.props, loadingStatusCode = _a.loadingStatusCode, data = _a.data, interval = _a.interval, checkApi = _a.checkApi, env = _a.env;
        var items = this.state.items;
        clearTimeout(this.timer);
        // 如果每个 task 都完成了, 则不需要取查看状态.
        if (!force && !items.some(function (item) { return item.status === loadingStatusCode; })) {
            return;
        }
        if (interval && !isEffectiveApi(checkApi)) {
            return env.alert('checkApi 没有设置, 不能及时获取任务状态');
        }
        isEffectiveApi(checkApi, data) &&
            env &&
            env
                .fetcher(checkApi, data)
                .then(this.handleLoaded)
                .catch(function (e) { return _this.setState({ error: e }); });
    };
    Task.prototype.handleLoaded = function (ret) {
        if (!Array.isArray(ret.data)) {
            return this.props.env.alert('返回格式不正确, 期望 response.data 为数组, 包含每个 task 的状态信息');
        }
        this.setState({
            items: ret.data
        });
        var interval = this.props.interval;
        clearTimeout(this.timer);
        this.timer = setTimeout(this.tick, interval);
    };
    Task.prototype.submitTask = function (item, index, retry) {
        var _this = this;
        if (retry === void 0) { retry = false; }
        var _a = this.props, submitApi = _a.submitApi, reSubmitApi = _a.reSubmitApi, loadingStatusCode = _a.loadingStatusCode, errorStatusCode = _a.errorStatusCode, data = _a.data, env = _a.env;
        if (!retry && !isEffectiveApi(submitApi)) {
            return env.alert('submitApi 没有配置');
        }
        else if (retry && !isEffectiveApi(reSubmitApi)) {
            return env.alert('reSubmitApi 没有配置');
        }
        this.setState(update(this.state, {
            items: {
                $splice: [
                    [
                        index,
                        1,
                        __assign(__assign({}, item), { status: loadingStatusCode })
                    ]
                ]
            }
        }));
        var api = retry ? reSubmitApi : submitApi;
        isEffectiveApi(api, data) &&
            env &&
            env
                .fetcher(api, createObject(data, item))
                .then(function (ret) {
                if (ret && ret.data) {
                    if (Array.isArray(ret.data)) {
                        _this.handleLoaded(ret);
                    }
                    else {
                        api && api.replaceData;
                        var items = _this.state.items.map(function (item) {
                            return item.key === ret.data.key
                                ? __assign(__assign({}, (api.replaceData ? {} : item)), ret.data) : item;
                        });
                        _this.handleLoaded(__assign(__assign({}, ret), { data: items }));
                    }
                    return;
                }
                clearTimeout(_this.timer);
                _this.timer = setTimeout(_this.tick, 4);
            })
                .catch(function (e) {
                return _this.setState(update(_this.state, {
                    items: {
                        $splice: [
                            [
                                index,
                                1,
                                __assign(__assign({}, item), { status: errorStatusCode, remark: e.message || e })
                            ]
                        ]
                    }
                }));
            });
    };
    Task.prototype.render = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, className = _a.className, style = _a.style, tableClassName = _a.tableClassName, taskNameLabel = _a.taskNameLabel, operationLabel = _a.operationLabel, statusLabel = _a.statusLabel, remarkLabel = _a.remarkLabel, btnText = _a.btnText, retryBtnText = _a.retryBtnText, btnClassName = _a.btnClassName, retryBtnClassName = _a.retryBtnClassName, statusLabelMap = _a.statusLabelMap, statusTextMap = _a.statusTextMap, readyStatusCode = _a.readyStatusCode, loadingStatusCode = _a.loadingStatusCode, canRetryStatusCode = _a.canRetryStatusCode, __ = _a.translate, render = _a.render, loadingConfig = _a.loadingConfig;
        var items = this.state.items;
        var error = this.state.error;
        return (React.createElement("div", { className: cx('Table-content', className), style: style },
            React.createElement("table", { className: cx('Table-table', tableClassName) },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, taskNameLabel),
                        React.createElement("th", null, __(operationLabel)),
                        React.createElement("th", null, statusLabel),
                        React.createElement("th", null, remarkLabel))),
                React.createElement("tbody", null, error ? (React.createElement("tr", null,
                    React.createElement("td", { colSpan: 4 },
                        React.createElement("div", { className: "text-danger" }, error)))) : (items.map(function (item, key) { return (React.createElement("tr", { key: key },
                    React.createElement("td", null,
                        React.createElement("span", { className: cx('word-break') }, item.label)),
                    React.createElement("td", null, item.status == loadingStatusCode ? (React.createElement(Spinner, { loadingConfig: loadingConfig, show: true, icon: "reload", spinnerClassName: cx('Task-spinner') })) : item.status == canRetryStatusCode ? (React.createElement("a", { onClick: function () { return _this.submitTask(item, key, true); }, className: cx('Button', 'Button--danger', 'Button--size-md', retryBtnClassName || btnClassName) }, retryBtnText || btnText)) : (React.createElement("a", { onClick: function () { return _this.submitTask(item, key); }, className: cx('Button', 'Button--default', 'Button--size-md', btnClassName, {
                            disabled: item.status !== readyStatusCode
                        }) }, btnText))),
                    React.createElement("td", null,
                        React.createElement("span", { className: cx('label', statusLabelMap && statusLabelMap[item.status || 0]) }, statusTextMap && statusTextMap[item.status || 0])),
                    React.createElement("td", null, item.remark ? render("".concat(key, "/remark"), item.remark) : null))); }))))));
    };
    Task.defaultProps = {
        className: '',
        tableClassName: '',
        taskNameLabel: '任务名称',
        operationLabel: 'Table.operation',
        statusLabel: '状态',
        remarkLabel: '备注说明',
        btnText: '上线',
        retryBtnText: '重试',
        btnClassName: '',
        retryBtnClassName: '',
        statusLabelMap: [
            'label-warning',
            'label-info',
            'label-info',
            'label-danger',
            'label-success',
            'label-danger'
        ],
        statusTextMap: ['未开始', '就绪', '进行中', '出错', '已完成', '出错'],
        initialStatusCode: 0,
        readyStatusCode: 1,
        loadingStatusCode: 2,
        errorStatusCode: 3,
        finishStatusCode: 4,
        canRetryStatusCode: 5,
        interval: 3000
    };
    return Task;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TaskRenderer, _super);
    function TaskRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    TaskRenderer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    TaskRenderer.contextType = ScopedContext;
    TaskRenderer = __decorate([
        Renderer({
            type: 'tasks'
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], TaskRenderer);
    return TaskRenderer;
})(Task));

export { Task as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
