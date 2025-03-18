/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var hotkeys = require('hotkeys-js');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var pick = require('lodash/pick');
var omit = require('lodash/omit');
var Remark = require('./Remark.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var hotkeys__default = /*#__PURE__*/_interopDefaultLegacy(hotkeys);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var ActionProps = [
    'id',
    'dialog',
    'drawer',
    'toast',
    'url',
    'link',
    'confirmText',
    'confirmTitle',
    'tooltip',
    'disabledTip',
    'className',
    'asyncApi',
    'redirect',
    'size',
    'level',
    'primary',
    'feedback',
    'api',
    'blank',
    'tooltipPlacement',
    'to',
    'cc',
    'bcc',
    'subject',
    'body',
    'content',
    'required',
    'type',
    'actionType',
    'label',
    'icon',
    'rightIcon',
    'reload',
    'target',
    'close',
    'messages',
    'mergeData',
    'index',
    'copy',
    'copyFormat',
    'payload',
    'requireSelected',
    'countDown',
    'fileName',
    'isolateScope',
    'downloadFileName'
];
// 构造一个假的 React 事件避免可能的报错，主要用于快捷键功能
// 来自 https://stackoverflow.com/questions/27062455/reactjs-can-i-create-my-own-syntheticevent
var createSyntheticEvent = function (event) {
    var isDefaultPrevented = false;
    var isPropagationStopped = false;
    var preventDefault = function () {
        isDefaultPrevented = true;
        event.preventDefault();
    };
    var stopPropagation = function () {
        isPropagationStopped = true;
        event.stopPropagation();
    };
    return {
        nativeEvent: event,
        currentTarget: event.currentTarget,
        target: event.target,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        defaultPrevented: event.defaultPrevented,
        eventPhase: event.eventPhase,
        isTrusted: event.isTrusted,
        preventDefault: preventDefault,
        isDefaultPrevented: function () { return isDefaultPrevented; },
        stopPropagation: stopPropagation,
        isPropagationStopped: function () { return isPropagationStopped; },
        persist: function () { },
        timeStamp: event.timeStamp,
        type: event.type
    };
};
var allowedType = ['button', 'submit', 'reset'];
var Action = /** @class */ (function (_super) {
    tslib.__extends(Action, _super);
    function Action(props) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, props) || this;
        _this.state = {
            inCountDown: false,
            countDownEnd: 0,
            timeLeft: 0
        };
        _this.localStorageKey =
            'amis-countdownend-' +
                (_this.props.name || '') +
                (((_b = (_a = _this.props) === null || _a === void 0 ? void 0 : _a.$schema) === null || _b === void 0 ? void 0 : _b.id) || amisCore.uuid());
        var countDownEnd = parseInt(localStorage.getItem(_this.localStorageKey) || '0');
        if (countDownEnd && _this.props.countDown) {
            if (Date.now() < countDownEnd) {
                _this.state = {
                    inCountDown: true,
                    countDownEnd: countDownEnd,
                    timeLeft: Math.floor((countDownEnd - Date.now()) / 1000)
                };
                _this.handleCountDown();
            }
        }
        return _this;
    }
    Action.prototype.handleAction = function (e) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onAction, onActionSensor, disabled, countDown, env, onClick, result, _b, action, actionType, api, sensor, countDownEnd;
            var _this = this;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, onAction = _a.onAction, onActionSensor = _a.onActionSensor, disabled = _a.disabled, countDown = _a.countDown, env = _a.env;
                        // https://reactjs.org/docs/legacy-event-pooling.html
                        e.persist(); // 等 react 17之后去掉 event pooling 了，这个应该就没用了
                        onClick = this.props.onClick;
                        if (typeof onClick === 'string') {
                            onClick = amisCore.str2AsyncFunction(onClick, 'event', 'props');
                        }
                        _b = onClick;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, onClick(e, this.props)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        result = _b;
                        if (disabled ||
                            e.isDefaultPrevented() ||
                            result === false ||
                            !onAction ||
                            this.state.inCountDown) {
                            return [2 /*return*/];
                        }
                        e.preventDefault();
                        action = pick__default["default"](this.props, ActionProps);
                        actionType = action.actionType;
                        // ajax 会在 wrapFetcher 里记录，这里再处理就重复了，因此去掉
                        // add 一般是 input-table 之类的，会触发 formItemChange，为了避免重复也去掉
                        if (actionType !== 'ajax' &&
                            actionType !== 'download' &&
                            actionType !== 'add') {
                            env === null || env === void 0 ? void 0 : env.tracker({
                                eventType: actionType || this.props.type || 'click',
                                eventData: omit__default["default"](action, ['type', 'actionType', 'tooltipPlacement'])
                            }, this.props);
                        }
                        // download 是一种 ajax 的简写
                        if (actionType === 'download') {
                            action.actionType = 'ajax';
                            api = amisCore.normalizeApi(action.api);
                            api.responseType = 'blob';
                            api.downloadFileName = action.downloadFileName;
                            action.api = api;
                        }
                        sensor = onAction(e, action);
                        if (!(sensor === null || sensor === void 0 ? void 0 : sensor.then)) return [3 /*break*/, 4];
                        onActionSensor === null || onActionSensor === void 0 ? void 0 : onActionSensor(sensor);
                        return [4 /*yield*/, sensor];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (countDown) {
                            countDownEnd = Date.now() + countDown * 1000;
                            this.setState({
                                countDownEnd: countDownEnd,
                                inCountDown: true,
                                timeLeft: countDown
                            });
                            localStorage.setItem(this.localStorageKey, String(countDownEnd));
                            setTimeout(function () {
                                _this.handleCountDown();
                            }, 1000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Action.prototype.handleCountDown = function () {
        var _this = this;
        // setTimeout 一般会晚于 1s，经过几十次后就不准了，所以使用真实时间进行 diff
        var timeLeft = Math.floor((this.state.countDownEnd - Date.now()) / 1000);
        if (timeLeft <= 0) {
            this.setState({
                inCountDown: false,
                timeLeft: timeLeft
            });
        }
        else {
            this.setState({
                timeLeft: timeLeft
            });
            setTimeout(function () {
                _this.handleCountDown();
            }, 1000);
        }
    };
    Action.prototype.componentDidMount = function () {
        var _this = this;
        var hotKey = this.props.hotKey;
        if (hotKey) {
            hotkeys__default["default"](hotKey, function (event) {
                event.preventDefault();
                var click = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true
                });
                _this.handleAction(createSyntheticEvent(click));
            });
        }
    };
    Action.prototype.componentWillUnmount = function () {
        var hotKey = this.props.hotKey;
        if (hotKey) {
            hotkeys__default["default"].unbind(hotKey);
        }
    };
    Action.prototype.render = function () {
        var _a;
        var _b = this.props, type = _b.type, icon = _b.icon, iconClassName = _b.iconClassName, rightIcon = _b.rightIcon, rightIconClassName = _b.rightIconClassName, loadingClassName = _b.loadingClassName, primary = _b.primary, size = _b.size, level = _b.level, countDownTpl = _b.countDownTpl, block = _b.block, className = _b.className, style = _b.style, componentClass = _b.componentClass, tooltip = _b.tooltip, disabledTip = _b.disabledTip, tooltipPlacement = _b.tooltipPlacement, actionType = _b.actionType, link = _b.link, data = _b.data, __ = _b.translate, activeClassName = _b.activeClassName, isCurrentUrl = _b.isCurrentUrl, isMenuItem = _b.isMenuItem, active = _b.active, activeLevel = _b.activeLevel, tooltipTrigger = _b.tooltipTrigger, tooltipContainer = _b.tooltipContainer, tooltipRootClose = _b.tooltipRootClose, loading = _b.loading, body = _b.body, render = _b.render, onMouseEnter = _b.onMouseEnter, onMouseLeave = _b.onMouseLeave, cx = _b.classnames, ns = _b.classPrefix, loadingConfig = _b.loadingConfig, themeCss = _b.themeCss, wrapperCustomStyle = _b.wrapperCustomStyle, css = _b.css, id = _b.id, testIdBuilder = _b.testIdBuilder, env = _b.env;
        if (actionType !== 'email' && body) {
            return (_J$X_(amisUi.TooltipWrapper, { classPrefix: ns, classnames: cx, placement: tooltipPlacement, tooltip: tooltip, container: tooltipContainer, trigger: tooltipTrigger, rootClose: tooltipRootClose },
                _J$X_("div", { className: cx('Action', className), style: style, onClick: this.handleAction, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave }, render('body', body))));
        }
        var label = this.props.label;
        var disabled = this.props.disabled;
        var isActive = !!active;
        if (actionType === 'link' && !isActive && link && isCurrentUrl) {
            isActive = isCurrentUrl(link);
        }
        // 倒计时
        if (this.state.inCountDown) {
            label = Remark.filterContents(__(countDownTpl), tslib.__assign(tslib.__assign({}, data), { timeLeft: this.state.timeLeft }));
            disabled = true;
        }
        var iconElement = (_J$X_(amisUi.Icon, { cx: cx, icon: icon, className: "Button-icon", classNameProp: cx(iconClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'iconClassName', id: id, themeCss: themeCss || css }))) }));
        var rightIconElement = (_J$X_(amisUi.Icon, { cx: cx, icon: rightIcon, className: "Button-icon", classNameProp: cx(rightIconClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'iconClassName', id: id, themeCss: themeCss || css }))) }));
        return (_J$X_(React__default["default"].Fragment, null,
            _J$X_(amisUi.Button, { loadingConfig: loadingConfig, className: cx(className, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle })), amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'className', id: id, themeCss: themeCss || css })), (_a = {},
                    _a[activeClassName || 'is-active'] = isActive,
                    _a)), testIdBuilder: testIdBuilder, style: style, size: size, level: activeLevel && isActive
                    ? activeLevel
                    : amisCore.filter(level, data) || (primary ? 'primary' : undefined), loadingClassName: loadingClassName, loading: loading, onClick: this.handleAction, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, type: type && ~allowedType.indexOf(type) ? type : 'button', disabled: disabled, componentClass: isMenuItem ? 'a' : componentClass, overrideClassName: isMenuItem, tooltip: Remark.filterContents(tooltip, data), disabledTip: Remark.filterContents(disabledTip, data), tooltipPlacement: tooltipPlacement, tooltipContainer: tooltipContainer, tooltipTrigger: tooltipTrigger, tooltipRootClose: tooltipRootClose, block: block, iconOnly: !!(icon && !label && level !== 'link') },
                !loading ? iconElement : '',
                label ? _J$X_("span", null, amisCore.filter(String(label), data)) : null,
                rightIconElement),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                    themeCss: themeCss || css,
                    classNames: [
                        {
                            key: 'className',
                            weights: {
                                hover: {
                                    suf: ':not(:disabled):not(.is-disabled)'
                                },
                                active: { suf: ':not(:disabled):not(.is-disabled)' }
                            }
                        },
                        {
                            key: 'iconClassName',
                            weights: {
                                default: {
                                    important: true
                                },
                                hover: {
                                    important: true,
                                    suf: ':not(:disabled):not(.is-disabled)'
                                },
                                active: {
                                    important: true,
                                    suf: ':not(:disabled):not(.is-disabled)'
                                }
                            }
                        }
                    ],
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id
                }, env: env }))));
    };
    Action.defaultProps = {
        type: 'button',
        componentClass: 'button',
        tooltipPlacement: 'bottom',
        activeClassName: 'is-active',
        countDownTpl: 'Action.countDown',
        countDown: 0
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], Action.prototype, "handleAction", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], Action.prototype, "handleCountDown", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], Action.prototype, "componentDidMount", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], Action.prototype, "componentWillUnmount", null);
    return Action;
}(React__default["default"].Component));
amisCore.themeable(Action);
var ActionRenderer = /** @class */ (function (_super) {
    tslib.__extends(ActionRenderer, _super);
    function ActionRenderer(props, scoped) {
        var _this = _super.call(this, props) || this;
        scoped.registerComponent(_this);
        return _this;
    }
    ActionRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    /**
     * 动作处理
     */
    ActionRenderer.prototype.doAction = function (action, args) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'click') {
            this.handleAction(actionType, action);
        }
    };
    ActionRenderer.prototype.handleAction = function (e, action) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, env, onAction, data, ignoreConfirm, dispatchEvent, $schema, mergedData, hasOnEvent, confirmText, confirmed, rendererEvent, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, env = _a.env, onAction = _a.onAction, data = _a.data, ignoreConfirm = _a.ignoreConfirm, dispatchEvent = _a.dispatchEvent, $schema = _a.$schema;
                        mergedData = data;
                        if ((action === null || action === void 0 ? void 0 : action.actionType) === 'click' && amisCore.isObject(action === null || action === void 0 ? void 0 : action.args)) {
                            mergedData = amisCore.createObject(data, action.args);
                        }
                        hasOnEvent = $schema.onEvent && Object.keys($schema.onEvent).length;
                        confirmText = '';
                        if (!((!ignoreConfirm || hasOnEvent) &&
                            action.confirmText &&
                            env.confirm &&
                            (confirmText = amisCore.filter(action.confirmText, mergedData)))) return [3 /*break*/, 5];
                        return [4 /*yield*/, env.confirm(confirmText, amisCore.filter(action.confirmTitle, mergedData) || undefined)];
                    case 1:
                        confirmed = _b.sent();
                        if (!confirmed) return [3 /*break*/, 3];
                        return [4 /*yield*/, dispatchEvent(e, mergedData, this // 保证renderer可以拿到，避免因交互设计导致的清空情况，例如crud内itemAction
                            )];
                    case 2:
                        rendererEvent = _b.sent();
                        // 阻止原有动作执行
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        // 因为crud里面也会处理二次确认，所以如果按钮处理过了就跳过crud的二次确认
                        onAction(e, tslib.__assign(tslib.__assign({}, action), { ignoreConfirm: !!hasOnEvent }), mergedData);
                        return [3 /*break*/, 4];
                    case 3:
                        if (action.countDown) {
                            throw new Error('cancel');
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, dispatchEvent(e, mergedData)];
                    case 6:
                        rendererEvent = _b.sent();
                        // 阻止原有动作执行
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onAction(e, action, mergedData);
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ActionRenderer.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, amisCore.createObject(data, {
            nativeEvent: e
        }));
    };
    ActionRenderer.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, amisCore.createObject(data, {
            nativeEvent: e
        }));
    };
    ActionRenderer.prototype.isCurrentAction = function (link) {
        var _a = this.props, env = _a.env, data = _a.data;
        return env.isCurrentUrl(amisCore.filter(link, data));
    };
    ActionRenderer.prototype.render = function () {
        var _a = this.props, env = _a.env, disabled = _a.disabled, btnDisabled = _a.btnDisabled, loading = _a.loading, rest = tslib.__rest(_a, ["env", "disabled", "btnDisabled", "loading"]);
        return (_J$X_(Action, tslib.__assign({}, rest, { env: env, disabled: disabled || btnDisabled, onAction: this.handleAction, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, loading: loading, isCurrentUrl: this.isCurrentAction, tooltipContainer: rest.popOverContainer || env.getModalContainer })));
    };
    ActionRenderer.contextType = amisCore.ScopedContext;
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", Promise)
    ], ActionRenderer.prototype, "handleAction", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], ActionRenderer.prototype, "handleMouseEnter", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], ActionRenderer.prototype, "handleMouseLeave", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String]),
        tslib.__metadata("design:returntype", void 0)
    ], ActionRenderer.prototype, "isCurrentAction", null);
    ActionRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'action'
        })
        // @ts-ignore 类型没搞定
        ,
        amisUi.withBadge,
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], ActionRenderer);
    return ActionRenderer;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(ButtonRenderer, _super);
    function ButtonRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'button'
        })
    ], ButtonRenderer);
    return ButtonRenderer;
})(ActionRenderer));
/** @class */ ((function (_super) {
    tslib.__extends(SubmitRenderer, _super);
    function SubmitRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubmitRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'submit'
        })
    ], SubmitRenderer);
    return SubmitRenderer;
})(ActionRenderer));
/** @class */ ((function (_super) {
    tslib.__extends(ResetRenderer, _super);
    function ResetRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResetRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'reset'
        })
    ], ResetRenderer);
    return ResetRenderer;
})(ActionRenderer));

exports.Action = Action;
exports.ActionRenderer = ActionRenderer;
exports.createSyntheticEvent = createSyntheticEvent;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
