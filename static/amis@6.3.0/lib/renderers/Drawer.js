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
var amisUi = require('amis-ui');
var mobx = require('mobx');
var ReactDOM = require('react-dom');
var mobxStateTree = require('mobx-state-tree');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Drawer = /** @class */ (function (_super) {
    tslib.__extends(Drawer, _super);
    function Drawer(props) {
        var _this = _super.call(this, props) || this;
        _this.$$id = amisCore.guid();
        props.store.setEntered(!!props.show);
        _this.handleSelfClose = _this.handleSelfClose.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleActionSensor = _this.handleActionSensor.bind(_this);
        _this.handleDrawerConfirm = _this.handleDrawerConfirm.bind(_this);
        _this.handleDrawerClose = _this.handleDrawerClose.bind(_this);
        _this.handleDialogConfirm = _this.handleDialogConfirm.bind(_this);
        _this.handleDialogClose = _this.handleDialogClose.bind(_this);
        _this.handleChildFinished = _this.handleChildFinished.bind(_this);
        _this.handleEntered = _this.handleEntered.bind(_this);
        _this.handleExited = _this.handleExited.bind(_this);
        _this.handleFormInit = _this.handleFormInit.bind(_this);
        _this.handleFormChange = _this.handleFormChange.bind(_this);
        _this.handleFormSaved = _this.handleFormSaved.bind(_this);
        var store = props.store;
        _this.reaction = mobx.reaction(function () { return "".concat(store.loading).concat(store.error); }, function () { return _this.forceUpdate(); });
        return _this;
    }
    // shouldComponentUpdate(nextProps:DrawerProps) {
    //     const props = this.props;
    //     if (props.show === nextProps.show && !nextProps.show) {
    //         return false;
    //     }
    //     return isObjectShallowModified(this.props, nextProps);
    // }
    Drawer.prototype.componentWillUnmount = function () {
        this.reaction && this.reaction();
        clearTimeout(this.clearErrorTimer);
    };
    Drawer.prototype.buildActions = function () {
        var _a = this.props, actions = _a.actions, confirm = _a.confirm, __ = _a.translate, testIdBuilder = _a.testIdBuilder;
        if (typeof actions !== 'undefined') {
            return actions;
        }
        var ret = [];
        ret.push({
            type: 'button',
            testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('cancel'),
            actionType: 'close',
            label: __('cancel')
        });
        if (confirm) {
            ret.push({
                type: 'button',
                actionType: 'confirm',
                testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('confirm'),
                label: __('confirm'),
                primary: true
            });
        }
        return ret;
    };
    Drawer.prototype.handleSelfClose = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onClose, store, dispatchEvent, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onClose = _a.onClose, store = _a.store, dispatchEvent = _a.dispatchEvent;
                        // 如果有子弹框，那么就先不隐藏自己
                        if (store.dialogOpen !== false || store.drawerOpen !== false) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, dispatchEvent('cancel', this.props.data)];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        // clear error
                        store.updateMessage();
                        onClose();
                        return [2 /*return*/];
                }
            });
        });
    };
    Drawer.prototype.handleActionSensor = function (p) {
        var store = this.props.store;
        var origin = store.busying;
        store.markBusying(true);
        // clear error
        store.updateMessage();
        p.then(function () {
            store.markBusying(origin);
        }).catch(function (e) {
            store.updateMessage(e.message, true);
            store.markBusying(origin);
        });
    };
    Drawer.prototype.handleAction = function (e, action, data) {
        var _a = this.props, onClose = _a.onClose, onAction = _a.onAction;
        if (action.actionType === 'close' || action.actionType === 'cancel') {
            onClose();
        }
        else if (onAction) {
            onAction(e, action, data);
        }
    };
    Drawer.prototype.handleDrawerConfirm = function (values, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var store = this.props.store;
        if (action.mergeData && values.length === 1 && values[0]) {
            store.updateData(values[0]);
        }
        var drawerAction = store.action;
        var drawer = drawerAction.drawer;
        if (drawer.onConfirm &&
            drawer.onConfirm.apply(drawer, tslib.__spreadArray([values, action], tslib.__read(args), false)) === false) {
            return;
        }
        store.closeDrawer(true, values);
    };
    Drawer.prototype.handleDrawerClose = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var store = this.props.store;
        var action = store.action;
        var drawer = action.drawer;
        if (drawer.onClose && drawer.onClose.apply(drawer, tslib.__spreadArray([], tslib.__read(args), false)) === false) {
            return;
        }
        store.closeDrawer.apply(store, tslib.__spreadArray([], tslib.__read(args), false));
    };
    Drawer.prototype.handleDialogConfirm = function (values, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var store = this.props.store;
        if (action.mergeData && values.length === 1 && values[0]) {
            store.updateData(values[0]);
        }
        var dialogAction = store.action;
        var dialog = dialogAction.dialog;
        if (dialog.onConfirm &&
            dialog.onConfirm.apply(dialog, tslib.__spreadArray([values, action], tslib.__read(args), false)) === false) {
            return;
        }
        store.closeDialog(true, values);
    };
    Drawer.prototype.handleDialogClose = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var store = this.props.store;
        var action = store.action;
        var dialog = action.dialog;
        if (dialog.onClose && dialog.onClose.apply(dialog, tslib.__spreadArray([], tslib.__read(args), false)) === false) {
            return;
        }
        store.closeDialog(args[1]);
    };
    Drawer.prototype.handleChildFinished = function (value, action) {
        // 下面会覆盖
    };
    Drawer.prototype.handleFormInit = function (data) {
        var store = this.props.store;
        store.setFormData(data);
    };
    Drawer.prototype.handleFormChange = function (data, name) {
        var _a;
        var store = this.props.store;
        if (typeof name === 'string') {
            data = (_a = {},
                _a[name] = data,
                _a);
        }
        store.setFormData(data);
    };
    Drawer.prototype.handleFormSaved = function (data, response) {
        var store = this.props.store;
        store.setFormData(tslib.__assign(tslib.__assign({}, data), response));
    };
    Drawer.prototype.handleEntered = function () {
        var _a = this.props, lazySchema = _a.lazySchema, store = _a.store;
        store.setEntered(true);
        if (typeof lazySchema === 'function') {
            store.setSchema(lazySchema(this.props));
        }
    };
    Drawer.prototype.handleExited = function () {
        var _a = this.props, lazySchema = _a.lazySchema, store = _a.store, statusStore = _a.statusStore;
        statusStore && mobxStateTree.isAlive(statusStore) && statusStore.resetAll();
        if (mobxStateTree.isAlive(store)) {
            store.reset();
            store.clearMessage();
            store.setEntered(false);
            if (typeof lazySchema === 'function') {
                store.setSchema('');
            }
        }
    };
    Drawer.prototype.getPopOverContainer = function () {
        return ReactDOM.findDOMNode(this).querySelector(".".concat(this.props.classPrefix, "Drawer-content"));
    };
    Drawer.prototype.renderBody = function (body, key) {
        var _this = this;
        var _a = this.props, render = _a.render, store = _a.store;
        if (Array.isArray(body)) {
            return body.map(function (body, key) { return _this.renderBody(body, key); });
        }
        var schema = body;
        var subProps = {
            key: key,
            disabled: store.loading,
            onAction: this.handleAction,
            onFinished: this.handleChildFinished,
            popOverContainer: this.getPopOverContainer,
            onChange: this.handleFormChange,
            onInit: this.handleFormInit,
            onSaved: this.handleFormSaved,
            onActionSensor: this.handleActionSensor,
            syncLocation: false
        };
        if (schema.type === 'form') {
            schema = tslib.__assign({ mode: 'horizontal', wrapWithPanel: false, submitText: null }, schema);
        }
        return render("body".concat(key ? "/".concat(key) : ''), schema, subProps);
    };
    Drawer.prototype.renderFooter = function () {
        var _this = this;
        var actions = this.buildActions();
        var hideActions = this.props.hideActions;
        if (!actions || !actions.length || hideActions) {
            return null;
        }
        var _a = this.props, store = _a.store, render = _a.render, env = _a.env, cx = _a.classnames, showErrorMsg = _a.showErrorMsg, footerClassName = _a.footerClassName, id = _a.id, themeCss = _a.themeCss;
        return (_J$X_("div", { className: cx('Drawer-footer', footerClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'drawerFooterClassName', id: id, themeCss: themeCss }))) },
            store.loading || store.error ? (_J$X_("div", { className: cx('Drawer-info') },
                _J$X_(amisUi.Spinner, { size: "sm", key: "info", show: store.loading }),
                !env.forceSilenceInsideError && showErrorMsg && store.error ? (_J$X_("span", { className: cx('Drawer-error') }, store.msg)) : null)) : null,
            actions.map(function (action, key) {
                return render("action/".concat(key), action, {
                    onAction: _this.handleAction,
                    data: store.formData,
                    key: key,
                    disabled: action.disabled || store.loading
                });
            })));
    };
    Drawer.prototype.openFeedback = function (dialog, ctx) {
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
    Drawer.prototype.render = function () {
        var store = this.props.store;
        var _a = tslib.__assign(tslib.__assign({}, this.props), store.schema), className = _a.className, style = _a.style, size = _a.size, closeOnEsc = _a.closeOnEsc, position = _a.position, title = _a.title, render = _a.render, header = _a.header, body = _a.body, bodyClassName = _a.bodyClassName, headerClassName = _a.headerClassName, show = _a.show, showCloseButton = _a.showCloseButton, width = _a.width, height = _a.height, wrapperComponent = _a.wrapperComponent, env = _a.env, resizable = _a.resizable, overlay = _a.overlay, closeOnOutside = _a.closeOnOutside, ns = _a.classPrefix, cx = _a.classnames, drawerContainer = _a.drawerContainer, loadingConfig = _a.loadingConfig; _a.popOverContainer; var themeCss = _a.themeCss, id = _a.id, rest = tslib.__rest(_a, ["className", "style", "size", "closeOnEsc", "position", "title", "render", "header", "body", "bodyClassName", "headerClassName", "show", "showCloseButton", "width", "height", "wrapperComponent", "env", "resizable", "overlay", "closeOnOutside", "classPrefix", "classnames", "drawerContainer", "loadingConfig", "popOverContainer", "themeCss", "id"]);
        var Container = wrapperComponent || amisUi.Drawer;
        return (_J$X_(Container, tslib.__assign({}, rest, { resizable: resizable, classPrefix: ns, className: className, style: style, drawerClassName: amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'drawerClassName', id: id, themeCss: themeCss })), drawerMaskClassName: amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'drawerMaskClassName', id: id, themeCss: themeCss })), size: size, onHide: this.handleSelfClose, disabled: store.loading, show: show, showCloseButton: showCloseButton, width: width, height: height, position: position, overlay: overlay, onEntered: this.handleEntered, onExited: this.handleExited, closeOnEsc: closeOnEsc, closeOnOutside: !store.drawerOpen && !store.dialogOpen && closeOnOutside, container: drawerContainer ? drawerContainer : env === null || env === void 0 ? void 0 : env.getModalContainer }),
            title || header ? (_J$X_("div", { className: cx('Drawer-header', headerClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'drawerHeaderClassName', id: id, themeCss: themeCss }))) },
                title ? (_J$X_("div", { className: cx('Drawer-title', amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'drawerTitleClassName', id: id, themeCss: themeCss }))) }, render('title', title, {
                    data: store.formData,
                    onConfirm: this.handleDrawerConfirm,
                    onClose: this.handleDrawerClose,
                    onAction: this.handleAction
                }))) : null,
                header
                    ? render('header', header, {
                        data: store.formData,
                        onConfirm: this.handleDrawerConfirm,
                        onClose: this.handleDrawerClose,
                        onAction: this.handleAction
                    })
                    : null)) : null,
            !store.entered ? (_J$X_("div", { className: cx('Drawer-body', bodyClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'drawerBodyClassName', id: id, themeCss: themeCss }))) },
                _J$X_(amisUi.Spinner, { overlay: true, show: true, size: "lg", loadingConfig: loadingConfig }))) : body ? (
            // dialog-body 用于在 editor 中定位元素
            _J$X_("div", { className: cx('Drawer-body', bodyClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'drawerBodyClassName', id: id, themeCss: themeCss }))), role: "dialog-body" },
                this.renderBody(body, 'body'),
                _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                        themeCss: themeCss,
                        classNames: [
                            {
                                key: 'drawerClassName'
                            },
                            {
                                key: 'drawerMaskClassName'
                            },
                            {
                                key: 'drawerHeaderClassName'
                            },
                            {
                                key: 'drawerTitleClassName'
                            },
                            {
                                key: 'drawerBodyClassName'
                            },
                            {
                                key: 'drawerFooterClassName'
                            }
                        ],
                        id: id
                    }, env: env })))) : null,
            this.renderFooter(),
            body
                ? render('dialog', tslib.__assign(tslib.__assign({}, (store.action &&
                    store.action.dialog)), { type: 'dialog' }), {
                    key: 'dialog',
                    data: store.dialogData,
                    onConfirm: this.handleDialogConfirm,
                    onClose: this.handleDialogClose,
                    onAction: this.handleAction,
                    show: store.dialogOpen
                })
                : null,
            body
                ? render('drawer', tslib.__assign(tslib.__assign({}, (store.action &&
                    store.action.drawer)), { type: 'drawer' }), {
                    key: 'drawer',
                    data: store.drawerData,
                    onConfirm: this.handleDrawerConfirm,
                    onClose: this.handleDrawerClose,
                    onAction: this.handleAction,
                    show: store.drawerOpen
                })
                : null));
    };
    Drawer.propsList = [
        'title',
        'size',
        'closeOnEsc',
        'closeOnOutside',
        'children',
        'className',
        'bodyClassName',
        'headerClassName',
        'footerClassName',
        'confirm',
        'position',
        'onClose',
        'onConfirm',
        'show',
        'showCloseButton',
        'width',
        'height',
        'resizable',
        'overlay',
        'body',
        'popOverContainer',
        'showErrorMsg'
    ];
    Drawer.defaultProps = {
        title: '',
        className: '',
        bodyClassName: '',
        headerClassName: '',
        footerClassName: '',
        confirm: true,
        position: 'right',
        resizable: false,
        showCloseButton: true,
        overlay: true,
        closeOnEsc: false,
        closeOnOutside: false,
        showErrorMsg: true
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], Drawer.prototype, "getPopOverContainer", null);
    return Drawer;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(DrawerRenderer, _super);
    function DrawerRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    DrawerRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
        _super.prototype.componentWillUnmount.call(this);
    };
    DrawerRenderer.prototype.tryChildrenToHandle = function (action, ctx, rawAction) {
        var _this = this;
        var scoped = this.context;
        var targets = [];
        var _a = this.props, onConfirm = _a.onConfirm, store = _a.store;
        if (action.target) {
            targets.push.apply(targets, tslib.__spreadArray([], tslib.__read(action.target
                .split(',')
                .map(function (name) { return scoped.getComponentByName(name); })
                .filter(function (item) { return item && item.doAction; })), false));
        }
        /** 如果为隔离动作, 则不做联动处理, 继续交给handleAction */
        if ((action === null || action === void 0 ? void 0 : action.isolateScope) !== true && !targets.length) {
            var components = scoped
                .getComponents()
                .filter(function (item) { return !~['drawer', 'dialog'].indexOf(item.props.type); });
            var pool = components.concat();
            while (pool.length) {
                var item = pool.pop();
                if (~['crud', 'form', 'wizard'].indexOf(item.props.type)) {
                    targets.push(item);
                    break;
                }
                else if (~['drawer', 'dialog'].indexOf(item.props.type)) {
                    continue;
                }
                else if (~['page', 'service'].indexOf(item.props.type)) {
                    pool.unshift.apply(pool, item.context.getComponents());
                }
            }
        }
        if (targets.length) {
            store.markBusying(true);
            store.updateMessage();
            Promise.all(targets.map(function (target) {
                return target.doAction(tslib.__assign(tslib.__assign({}, action), { from: _this.$$id }), ctx, true);
            }))
                .then(function (values) {
                if ((action.type === 'submit' ||
                    action.actionType === 'submit' ||
                    action.actionType === 'confirm') &&
                    action.close !== false) {
                    onConfirm && onConfirm(values, rawAction || action, ctx, targets);
                }
                else if (action.close) {
                    action.close === true
                        ? _this.handleSelfClose()
                        : _this.closeTarget(action.close);
                }
                store.markBusying(false);
            })
                .catch(function (reason) {
                store.updateMessage(reason.message, true);
                store.markBusying(false);
                // 通常都是数据错误，过 3 秒自动清理错误信息
                // if (reason.constructor?.name === ValidateError.name) {
                clearTimeout(_this.clearErrorTimer);
                _this.clearErrorTimer = setTimeout(function () {
                    store.updateMessage('');
                }, 3000);
                // }
            });
            return true;
        }
        return false;
    };
    DrawerRenderer.prototype.doAction = function (action, data, throwErrors) {
        this.handleAction(undefined, action, data);
    };
    DrawerRenderer.prototype.handleAction = function (e, action, data, throwErrors, delegate) {
        if (throwErrors === void 0) { throwErrors = false; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onClose, onAction, store, env, dispatchEvent, scoped, rendererEvent, rendererEvent;
            var _this = this;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onClose = _a.onClose, onAction = _a.onAction, store = _a.store, env = _a.env, dispatchEvent = _a.dispatchEvent;
                        if (action.from === this.$$id) {
                            // 如果是从 children 里面委托过来的，那就直接向上冒泡。
                            return [2 /*return*/, onAction
                                    ? onAction(e, action, data, throwErrors, delegate || this.context)
                                    : false];
                        }
                        scoped = this.context;
                        if (!(action.actionType === 'close' || action.actionType === 'cancel')) return [3 /*break*/, 2];
                        return [4 /*yield*/, dispatchEvent('cancel', amisCore.createObject(this.props.data, data))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        onClose();
                        if (action.close) {
                            action.close === true
                                ? this.handleSelfClose()
                                : this.closeTarget(action.close);
                        }
                        return [3 /*break*/, 11];
                    case 2:
                        if (!(action.actionType === 'confirm')) return [3 /*break*/, 4];
                        return [4 /*yield*/, dispatchEvent('confirm', amisCore.createObject(this.props.data, data))];
                    case 3:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        this.tryChildrenToHandle(action, data) || onClose();
                        return [3 /*break*/, 11];
                    case 4:
                        if (!(action.actionType === 'drawer')) return [3 /*break*/, 5];
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        return [2 /*return*/, new Promise(function (resolve) {
                                store.openDrawer(data, undefined, function (confirmed, value) {
                                    var _a;
                                    (_a = action.callback) === null || _a === void 0 ? void 0 : _a.call(action, confirmed, value);
                                    resolve({
                                        confirmed: confirmed,
                                        value: value
                                    });
                                });
                            })];
                    case 5:
                        if (!(action.actionType === 'dialog')) return [3 /*break*/, 6];
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        return [2 /*return*/, new Promise(function (resolve) {
                                store.openDialog(data, undefined, function (confirmed, value) {
                                    var _a;
                                    (_a = action.callback) === null || _a === void 0 ? void 0 : _a.call(action, confirmed, value);
                                    resolve({
                                        confirmed: confirmed,
                                        value: value
                                    });
                                }, delegate || _this.context);
                            })];
                    case 6:
                        if (!(action.actionType === 'reload')) return [3 /*break*/, 7];
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        action.target && scoped.reload(action.target, data);
                        if (action.close) {
                            action.close === true
                                ? this.handleSelfClose()
                                : this.closeTarget(action.close);
                        }
                        return [3 /*break*/, 11];
                    case 7:
                        if (!(!action.from && this.tryChildrenToHandle(action, data))) return [3 /*break*/, 8];
                        return [3 /*break*/, 11];
                    case 8:
                        if (!(action.actionType === 'ajax')) return [3 /*break*/, 9];
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        store
                            .saveRemote(action.api, data, {
                            successMessage: action.messages && action.messages.success,
                            errorMessage: action.messages && action.messages.failed
                        })
                            .then(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                            var redirect;
                            return tslib.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(action.feedback && amisCore.isVisible(action.feedback, store.data))) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.openFeedback(action.feedback, store.data)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        redirect = action.redirect && amisCore.filter(action.redirect, store.data);
                                        redirect && env.jumpTo(redirect, action, store.data);
                                        action.reload &&
                                            this.reloadTarget(amisCore.filterTarget(action.reload, store.data), store.data);
                                        if (action.close) {
                                            action.close === true
                                                ? this.handleSelfClose()
                                                : this.closeTarget(action.close);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (e) {
                            if (throwErrors || action.countDown) {
                                throw e;
                            }
                        });
                        return [3 /*break*/, 11];
                    case 9:
                        if (!onAction) return [3 /*break*/, 11];
                        return [4 /*yield*/, onAction(e, action, data, throwErrors, delegate || this.context)];
                    case 10:
                        _b.sent();
                        if (action.close) {
                            action.close === true
                                ? this.handleSelfClose()
                                : this.closeTarget(action.close);
                        }
                        _b.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    DrawerRenderer.prototype.handleChildFinished = function (value, action) {
        if ((action && action.from === this.$$id) || action.close === false) {
            return;
        }
        var scoped = this.context;
        var components = scoped
            .getComponents()
            .filter(function (item) {
            return !~['drawer', 'dialog', 'action', 'button', 'submit', 'reset'].indexOf(item.props.type);
        });
        var onConfirm = this.props.onConfirm;
        if (components.length === 1 &&
            (components[0].props.type === 'form' ||
                components[0].props.type === 'wizard')) {
            onConfirm([value], action, {}, components);
        }
    };
    DrawerRenderer.prototype.handleDialogConfirm = function (values, action) {
        var _a, _b;
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        _super.prototype.handleDialogConfirm.apply(this, tslib.__spreadArray([values, action], tslib.__read(rest), false));
        var store = this.props.store;
        var scoped = store.getDialogScoped() || this.context;
        var dialogAction = store.action;
        var reload = (_a = action.reload) !== null && _a !== void 0 ? _a : dialogAction.reload;
        if (reload) {
            scoped.reload(reload, store.data);
        }
        else if (scoped.component !== this && ((_b = scoped.component) === null || _b === void 0 ? void 0 : _b.reload)) {
            scoped.component.reload();
        }
        else {
            // 没有设置，则自动让页面中 crud 刷新。
            this.context
                .getComponents()
                .filter(function (item) { return item.props.type === 'crud'; })
                .forEach(function (item) { return item.reload && item.reload(); });
        }
    };
    DrawerRenderer.prototype.handleDrawerConfirm = function (values, action) {
        var _this = this;
        var _a;
        _super.prototype.handleDrawerConfirm.call(this, values, action);
        var store = this.props.store;
        var scoped = store.getDialogScoped() || this.context;
        var drawerAction = store.action;
        var reload = (_a = action.reload) !== null && _a !== void 0 ? _a : drawerAction.reload;
        // 稍等会，等动画结束。
        setTimeout(function () {
            var _a;
            if (reload) {
                scoped.reload(reload, store.data);
            }
            else if (scoped.component !== _this && ((_a = scoped.component) === null || _a === void 0 ? void 0 : _a.reload)) {
                scoped.component.reload();
            }
            else {
                // 没有设置，则自动让页面中 crud 刷新。
                _this.context
                    .getComponents()
                    .filter(function (item) { return item.props.type === 'crud'; })
                    .forEach(function (item) { return item.reload && item.reload(); });
            }
        }, 300);
    };
    DrawerRenderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    DrawerRenderer.prototype.closeTarget = function (target) {
        var scoped = this.context;
        scoped.close(target);
    };
    DrawerRenderer.prototype.setData = function (values, replace) {
        return this.props.store.updateData(values, undefined, replace);
    };
    DrawerRenderer.prototype.getData = function () {
        var store = this.props.store;
        return store.data;
    };
    DrawerRenderer.contextType = amisCore.ScopedContext;
    DrawerRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'drawer',
            storeType: amisCore.ModalStore.name,
            storeExtendsData: false,
            isolateScope: true,
            shouldSyncSuperStore: function (store, props, prevProps) {
                return !!((store.drawerOpen || props.show) &&
                    (props.show !== prevProps.show ||
                        amisCore.isObjectShallowModified(prevProps.data, props.data)));
            }
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], DrawerRenderer);
    return DrawerRenderer;
})(Drawer));

exports["default"] = Drawer;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
