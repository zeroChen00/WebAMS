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
var Dialog = /** @class */ (function (_super) {
    tslib.__extends(Dialog, _super);
    function Dialog(props) {
        var _this = _super.call(this, props) || this;
        _this.isDead = false;
        _this.$$id = amisCore.guid();
        props.store.setEntered(!!props.show);
        _this.handleSelfClose = _this.handleSelfClose.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleActionSensor = _this.handleActionSensor.bind(_this);
        _this.handleDialogConfirm = _this.handleDialogConfirm.bind(_this);
        _this.handleDialogClose = _this.handleDialogClose.bind(_this);
        _this.handleDrawerConfirm = _this.handleDrawerConfirm.bind(_this);
        _this.handleDrawerClose = _this.handleDrawerClose.bind(_this);
        _this.handleEntered = _this.handleEntered.bind(_this);
        _this.handleExited = _this.handleExited.bind(_this);
        _this.handleFormInit = _this.handleFormInit.bind(_this);
        _this.handleFormSaved = _this.handleFormSaved.bind(_this);
        _this.handleFormChange = _this.handleFormChange.bind(_this);
        _this.handleChildFinished = _this.handleChildFinished.bind(_this);
        var store = props.store;
        _this.reaction = mobx.reaction(function () { return "".concat(store.loading).concat(store.error); }, function () { return _this.forceUpdate(); });
        return _this;
    }
    // shouldComponentUpdate(nextProps:DialogProps, nextState:DialogState) {
    //     const props = this.props;
    //     if (this.state.entered !== nextState.entered) {
    //         return true;
    //     } else if (props.show === nextProps.show && !nextProps.show) {
    //         return false;
    //     }
    //     return isObjectShallowModified(this.props, nextProps);
    // }
    Dialog.prototype.componentWillUnmount = function () {
        this.reaction && this.reaction();
        this.isDead = true;
    };
    Dialog.prototype.buildActions = function () {
        var _a = this.props, actions = _a.actions, confirm = _a.confirm, __ = _a.translate, testIdBuilder = _a.testIdBuilder;
        if (typeof actions !== 'undefined') {
            return actions;
        }
        var ret = [];
        ret.push({
            type: 'button',
            testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('cancel'),
            actionType: 'cancel',
            label: __('cancel')
        });
        if (confirm) {
            ret.push({
                type: 'button',
                testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('confirm'),
                actionType: 'confirm',
                label: __('confirm'),
                primary: true
            });
        }
        return ret;
    };
    Dialog.prototype.handleSelfClose = function (e, confirmed) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onClose, store, dispatchEvent, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onClose = _a.onClose, store = _a.store, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('cancel', this.props.data)];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        // clear error
                        store.updateMessage();
                        onClose(confirmed);
                        return [2 /*return*/];
                }
            });
        });
    };
    Dialog.prototype.handleActionSensor = function (p) {
        var _this = this;
        var store = this.props.store;
        var origin = store.busying;
        store.markBusying(true);
        // clear error
        store.updateMessage();
        p.then(function () {
            store.markBusying(origin);
        }).catch(function (e) {
            if (_this.isDead) {
                return;
            }
            store.updateMessage(e.message, true);
            store.markBusying(origin);
        });
    };
    Dialog.prototype.handleAction = function (e, action, data) {
        var _a = this.props, store = _a.store, onAction = _a.onAction;
        if (action.type === 'reset') {
            store.reset();
        }
        else if (action.actionType === 'cancel') {
            this.handleSelfClose();
        }
        else if (onAction) {
            onAction(e, action, data);
        }
    };
    Dialog.prototype.handleDialogConfirm = function (values, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var store = this.props.store;
        if (action.mergeData && values.length === 1 && values[0]) {
            store.updateData(values[0]);
        }
        var dialog = store.action.dialog;
        if (dialog &&
            dialog.onConfirm &&
            dialog.onConfirm.apply(dialog, tslib.__spreadArray([values, action], tslib.__read(args), false)) === false) {
            return;
        }
        store.closeDialog(true, values);
    };
    Dialog.prototype.handleDialogClose = function () {
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
    Dialog.prototype.handleDrawerConfirm = function (values, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var store = this.props.store;
        if (action.mergeData && values.length === 1 && values[0]) {
            store.updateData(values[0]);
        }
        var drawer = store.action.drawer;
        if (drawer &&
            drawer.onConfirm &&
            drawer.onConfirm.apply(drawer, tslib.__spreadArray([values, action], tslib.__read(args), false)) === false) {
            return;
        }
        store.closeDrawer(true, values);
    };
    Dialog.prototype.handleDrawerClose = function () {
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
    Dialog.prototype.handleEntered = function () {
        var _a = this.props, lazySchema = _a.lazySchema, store = _a.store;
        store.setEntered(true);
        if (typeof lazySchema === 'function') {
            store.setSchema(lazySchema(this.props));
        }
        var activeElem = document.activeElement;
        if (activeElem) {
            var dom = ReactDOM.findDOMNode(this);
            dom && !dom.contains(activeElem) && activeElem.blur();
        }
    };
    Dialog.prototype.handleExited = function () {
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
    Dialog.prototype.handleFormInit = function (data) {
        var store = this.props.store;
        store.setFormData(data);
    };
    Dialog.prototype.handleFormChange = function (data, name) {
        var store = this.props.store;
        // 如果 dialog 里面不放 form，而是直接放表单项就会进到这里来。
        if (typeof name === 'string') {
            var mergedData = tslib.__assign({}, store.form);
            amisCore.setVariable(mergedData, name, data);
            data = mergedData;
        }
        store.setFormData(data);
    };
    Dialog.prototype.handleFormSaved = function (data, response) {
        var store = this.props.store;
        store.setFormData(tslib.__assign(tslib.__assign({}, data), response));
    };
    Dialog.prototype.handleChildFinished = function (value, action) {
        // 下面会覆盖
    };
    Dialog.prototype.openFeedback = function (dialog, ctx) {
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
    Dialog.prototype.getPopOverContainer = function () {
        return ReactDOM.findDOMNode(this).querySelector(".".concat(this.props.classPrefix, "Modal-content"));
    };
    Dialog.prototype.renderBody = function (body, key) {
        var _this = this;
        var _a = this.props, render = _a.render, store = _a.store;
        if (Array.isArray(body)) {
            return body.map(function (body, key) { return _this.renderBody(body, key); });
        }
        var subProps = {
            key: key,
            disabled: (body && body.disabled) || store.loading,
            onAction: this.handleAction,
            onFinished: this.handleChildFinished,
            popOverContainer: this.getPopOverContainer,
            onChange: this.handleFormChange,
            onInit: this.handleFormInit,
            onSaved: this.handleFormSaved,
            onActionSensor: this.handleActionSensor,
            syncLocation: false // 弹框中的 crud 一般不需要同步地址栏
        };
        if (!body.type) {
            return render("body".concat(key ? "/".concat(key) : ''), body, subProps);
        }
        var schema = body;
        if (schema.type === 'form') {
            schema = tslib.__assign({ mode: 'horizontal', wrapWithPanel: false, submitText: null }, schema);
        }
        return render("body".concat(key ? "/".concat(key) : ''), schema, subProps);
    };
    Dialog.prototype.renderFooter = function () {
        var _this = this;
        var actions = this.buildActions();
        var hideActions = this.props.hideActions;
        if (!actions || !actions.length || hideActions) {
            return null;
        }
        var _a = this.props, store = _a.store, render = _a.render, env = _a.env, cx = _a.classnames, showErrorMsg = _a.showErrorMsg, showLoading = _a.showLoading, show = _a.show, dialogFooterClassName = _a.dialogFooterClassName;
        return (_J$X_("div", { className: cx('Modal-footer', dialogFooterClassName) },
            (showLoading !== false && store.loading) ||
                (showErrorMsg !== false && store.error) ? (_J$X_("div", { className: cx('Dialog-info'), key: "info" },
                showLoading !== false ? (_J$X_(amisUi.Spinner, { size: "sm", key: "info", show: store.loading })) : null,
                !env.forceSilenceInsideError &&
                    store.error &&
                    showErrorMsg !== false ? (_J$X_("span", { className: cx('Dialog-error') }, store.msg)) : null)) : null,
            actions.map(function (action, key) {
                return render("action/".concat(key), action, {
                    data: store.formData,
                    onAction: _this.handleAction,
                    key: key,
                    disabled: action.disabled || store.loading || !show
                });
            })));
    };
    Dialog.prototype.render = function () {
        var store = this.props.store;
        var _a = tslib.__assign(tslib.__assign({}, this.props), store.schema), className = _a.className, style = _a.style, size = _a.size, height = _a.height, width = _a.width, closeOnEsc = _a.closeOnEsc, closeOnOutside = _a.closeOnOutside, title = _a.title, render = _a.render, header = _a.header, body = _a.body, bodyClassName = _a.bodyClassName, headerClassName = _a.headerClassName, show = _a.show, lazyRender = _a.lazyRender, lazySchema = _a.lazySchema, wrapperComponent = _a.wrapperComponent, showCloseButton = _a.showCloseButton, env = _a.env, cx = _a.classnames, classPrefix = _a.classPrefix, __ = _a.translate, loadingConfig = _a.loadingConfig, overlay = _a.overlay, dialogType = _a.dialogType, cancelText = _a.cancelText, confirmText = _a.confirmText, confirmBtnLevel = _a.confirmBtnLevel, cancelBtnLevel = _a.cancelBtnLevel; _a.popOverContainer; _a.inDesign; var themeCss = _a.themeCss, id = _a.id, rest = tslib.__rest(_a, ["className", "style", "size", "height", "width", "closeOnEsc", "closeOnOutside", "title", "render", "header", "body", "bodyClassName", "headerClassName", "show", "lazyRender", "lazySchema", "wrapperComponent", "showCloseButton", "env", "classnames", "classPrefix", "translate", "loadingConfig", "overlay", "dialogType", "cancelText", "confirmText", "confirmBtnLevel", "cancelBtnLevel", "popOverContainer", "inDesign", "themeCss", "id"]);
        var Wrapper = wrapperComponent || amisUi.Modal;
        return (_J$X_(Wrapper, tslib.__assign({}, rest, { classPrefix: classPrefix, className: cx(className), style: style, size: size, height: height, width: width, modalClassName: amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'dialogClassName', id: id, themeCss: themeCss })), modalMaskClassName: amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'dialogMaskClassName', id: id, themeCss: themeCss })), backdrop: "static", onHide: this.handleSelfClose, keyboard: closeOnEsc && !store.loading, closeOnEsc: closeOnEsc, closeOnOutside: !store.dialogOpen && closeOnOutside, show: show, onEntered: this.handleEntered, onExited: this.handleExited, container: env === null || env === void 0 ? void 0 : env.getModalContainer, enforceFocus: false, disabled: store.loading, overlay: overlay, dialogType: dialogType, cancelText: cancelText, confirmText: confirmText, confirmBtnLevel: confirmBtnLevel, cancelBtnLevel: cancelBtnLevel }),
            title && typeof title === 'string' ? (_J$X_("div", { className: cx('Modal-header', headerClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'dialogHeaderClassName', id: id, themeCss: themeCss }))) },
                showCloseButton !== false && !store.loading ? (_J$X_("a", { "data-tooltip": __('Dialog.close'), "data-position": "left", onClick: this.handleSelfClose, className: cx('Modal-close') },
                    _J$X_(amisUi.Icon, { icon: "close", className: "icon", iconContent: "Dialog-close" }))) : null,
                _J$X_("div", { className: cx('Modal-title', amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'dialogTitleClassName', id: id, themeCss: themeCss }))) }, amisCore.filter(__(title), store.formData)))) : title ? (_J$X_("div", { className: cx('Modal-header', headerClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'dialogHeaderClassName', id: id, themeCss: themeCss }))) },
                showCloseButton !== false && !store.loading ? (_J$X_("a", { "data-tooltip": __('Dialog.close'), onClick: this.handleSelfClose, className: cx('Modal-close') },
                    _J$X_(amisUi.Icon, { icon: "close", className: "icon", iconContent: "Dialog-close" }))) : null,
                render('title', title, {
                    data: store.formData,
                    onAction: this.handleAction
                }))) : showCloseButton !== false && !store.loading ? (_J$X_("a", { "data-tooltip": __('Dialog.close'), onClick: this.handleSelfClose, className: cx('Modal-close') },
                _J$X_(amisUi.Icon, { icon: "close", className: "icon", iconContent: "Dialog-close" }))) : null,
            header
                ? render('header', header, {
                    data: store.formData,
                    onAction: this.handleAction
                })
                : null,
            (!store.entered && lazyRender) || (lazySchema && !body) ? (_J$X_("div", { className: cx('Modal-body', bodyClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'dialogBodyClassName', id: id, themeCss: themeCss }))), role: "dialog-body" },
                _J$X_(amisUi.Spinner, { overlay: true, show: true, size: "lg", loadingConfig: loadingConfig }))) : body ? (
            // dialog-body 用于在 editor 中定位元素
            _J$X_("div", { className: cx('Modal-body', bodyClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'dialogBodyClassName', id: id, themeCss: themeCss }))), role: "dialog-body" },
                this.renderBody(body, 'body'),
                _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                        themeCss: themeCss,
                        classNames: [
                            {
                                key: 'dialogClassName'
                            },
                            {
                                key: 'dialogMaskClassName'
                            },
                            {
                                key: 'dialogHeaderClassName'
                            },
                            {
                                key: 'dialogTitleClassName'
                            },
                            {
                                key: 'dialogBodyClassName'
                            },
                            {
                                key: 'dialogFooterClassName'
                            }
                        ],
                        id: id
                    }, env: env })))) : null,
            this.renderFooter(),
            body
                ? render('drawer', tslib.__assign(tslib.__assign({}, (store.action &&
                    store.action.drawer)), { type: 'drawer' }), {
                    key: 'drawer',
                    data: store.drawerData,
                    onConfirm: this.handleDrawerConfirm,
                    onClose: this.handleDrawerClose,
                    show: store.drawerOpen,
                    onAction: this.handleAction
                })
                : null,
            body
                ? render('dialog', tslib.__assign(tslib.__assign({}, (store.action &&
                    store.action.dialog)), { type: 'dialog' }), {
                    key: 'dialog',
                    data: store.dialogData,
                    onConfirm: this.handleDialogConfirm,
                    onClose: this.handleDialogClose,
                    show: store.dialogOpen,
                    onAction: this.handleAction
                })
                : null));
    };
    Dialog.propsList = [
        'title',
        'size',
        'closeOnEsc',
        'closeOnOutside',
        'children',
        'bodyClassName',
        'headerClassName',
        'confirm',
        'onClose',
        'onConfirm',
        'show',
        'body',
        'showCloseButton',
        'showErrorMsg',
        'actions',
        'popOverContainer',
        'overlay',
        'draggable'
    ];
    Dialog.defaultProps = {
        title: 'Dialog.title',
        bodyClassName: '',
        confirm: true,
        show: false,
        lazyRender: false,
        showCloseButton: true,
        wrapperComponent: amisUi.Modal,
        closeOnEsc: false,
        closeOnOutside: false,
        showErrorMsg: true
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], Dialog.prototype, "getPopOverContainer", null);
    return Dialog;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(DialogRenderer, _super);
    function DialogRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    DialogRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
        _super.prototype.componentWillUnmount.call(this);
        clearTimeout(this.clearErrorTimer);
    };
    DialogRenderer.prototype.tryChildrenToHandle = function (action, ctx, rawAction) {
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
                    action.close !== false &&
                    !targets.some(function (item) { return item.props.closeDialogOnSubmit === false; })) {
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
                if (_this.isDead) {
                    return;
                }
                store.updateMessage(reason.message, true);
                store.markBusying(false);
                // 通常都是数据错误，过 3 秒自动清理错误信息
                // if (reason.constructor?.name === ValidateError.name) {
                clearTimeout(_this.clearErrorTimer);
                _this.clearErrorTimer = setTimeout(function () {
                    if (_this.isDead) {
                        return;
                    }
                    store.updateMessage('');
                }, 3000);
                // }
            });
            return true;
        }
        return false;
    };
    DialogRenderer.prototype.doAction = function (action, data, throwErrors) {
        this.handleAction(undefined, action, data);
    };
    DialogRenderer.prototype.handleAction = function (e, action, data, throwErrors, delegate) {
        if (throwErrors === void 0) { throwErrors = false; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onAction, store, onConfirm, env, dispatchEvent, onClose, scoped, rendererEvent, rendererEvent, handleResult;
            var _this = this;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onAction = _a.onAction, store = _a.store, onConfirm = _a.onConfirm, env = _a.env, dispatchEvent = _a.dispatchEvent, onClose = _a.onClose;
                        if (action.from === this.$$id) {
                            // 如果是从 children 里面委托过来的，那就直接向上冒泡。
                            return [2 /*return*/, onAction
                                    ? onAction(e, action, data, throwErrors, delegate || this.context)
                                    : false];
                        }
                        scoped = this.context;
                        if (!(action.type === 'reset')) return [3 /*break*/, 1];
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        store.reset();
                        return [3 /*break*/, 13];
                    case 1:
                        if (!(action.actionType === 'close' ||
                            action.actionType === 'cancel')) return [3 /*break*/, 3];
                        return [4 /*yield*/, dispatchEvent('cancel', amisCore.createObject(this.props.data, data))];
                    case 2:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        // clear error
                        store.updateMessage();
                        onClose();
                        if (action.close) {
                            action.close === true
                                ? this.handleSelfClose()
                                : this.closeTarget(action.close);
                        }
                        return [3 /*break*/, 13];
                    case 3:
                        if (!(action.actionType === 'confirm')) return [3 /*break*/, 5];
                        return [4 /*yield*/, dispatchEvent('confirm', amisCore.createObject(this.props.data, data))];
                    case 4:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        handleResult = this.tryChildrenToHandle(tslib.__assign(tslib.__assign({}, action), { actionType: 'submit' }), data, action);
                        if (!handleResult) {
                            // clear error
                            store.updateMessage();
                            onClose(true);
                        }
                        return [3 /*break*/, 13];
                    case 5:
                        if (!(action.actionType === 'next' || action.actionType === 'prev')) return [3 /*break*/, 6];
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        if (action.type === 'submit') {
                            this.tryChildrenToHandle(tslib.__assign(tslib.__assign({}, action), { actionType: 'submit', close: true }), data, action) || this.handleSelfClose(undefined, true);
                        }
                        else {
                            onConfirm([data], action, data, []);
                        }
                        return [3 /*break*/, 13];
                    case 6:
                        if (!(action.actionType === 'dialog')) return [3 /*break*/, 7];
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
                    case 7:
                        if (!(action.actionType === 'drawer')) return [3 /*break*/, 8];
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
                    case 8:
                        if (!(action.actionType === 'reload')) return [3 /*break*/, 9];
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        action.target && scoped.reload(action.target, data);
                        if (action.close || action.type === 'submit') {
                            this.handleSelfClose(undefined, action.type === 'submit');
                            action.close &&
                                typeof action.close === 'string' &&
                                this.closeTarget(action.close);
                        }
                        return [3 /*break*/, 13];
                    case 9:
                        if (!(!action.from && this.tryChildrenToHandle(action, data))) return [3 /*break*/, 10];
                        return [3 /*break*/, 13];
                    case 10:
                        if (!(action.actionType === 'ajax')) return [3 /*break*/, 11];
                        store.setCurrentAction(action, this.props.resolveDefinitions);
                        store
                            .saveRemote(action.api, data, {
                            successMessage: action.messages && action.messages.success,
                            errorMessage: action.messages && action.messages.failed
                        })
                            .then(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                            var reidrect;
                            return tslib.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(action.feedback && amisCore.isVisible(action.feedback, store.data))) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.openFeedback(action.feedback, store.data)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        reidrect = action.redirect && amisCore.filter(action.redirect, store.data);
                                        reidrect && env.jumpTo(reidrect, action, store.data);
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
                        return [3 /*break*/, 13];
                    case 11:
                        if (!onAction) return [3 /*break*/, 13];
                        return [4 /*yield*/, onAction(e, tslib.__assign(tslib.__assign({}, action), { close: false }), data, throwErrors, delegate || this.context)];
                    case 12:
                        _b.sent();
                        if (action.close) {
                            action.close === true
                                ? this.handleSelfClose()
                                : this.closeTarget(action.close);
                        }
                        _b.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    DialogRenderer.prototype.handleChildFinished = function (value, action) {
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
        var onClose = this.props.onClose;
        if (components.length === 1 &&
            (components[0].props.type === 'form' ||
                components[0].props.type === 'wizard') &&
            (action.close === true ||
                components[0].props.closeDialogOnSubmit !== false)) {
            onConfirm && onConfirm([value], action, {}, components);
        }
        else if (action.close === true) {
            onClose();
        }
    };
    DialogRenderer.prototype.handleDialogConfirm = function (values, action) {
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
    DialogRenderer.prototype.handleDrawerConfirm = function (values, action) {
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
    DialogRenderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    DialogRenderer.prototype.closeTarget = function (target) {
        var scoped = this.context;
        scoped.close(target);
    };
    DialogRenderer.prototype.setData = function (values, replace) {
        return this.props.store.updateData(values, undefined, replace);
    };
    DialogRenderer.prototype.getData = function () {
        var store = this.props.store;
        return store.data;
    };
    DialogRenderer.contextType = amisCore.ScopedContext;
    DialogRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'dialog',
            storeType: amisCore.ModalStore.name,
            storeExtendsData: false,
            isolateScope: true,
            shouldSyncSuperStore: function (store, props, prevProps) {
                return !!((store.dialogOpen || props.show) &&
                    (props.show !== prevProps.show ||
                        amisCore.isObjectShallowModified(prevProps.data, props.data)));
            }
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], DialogRenderer);
    return DialogRenderer;
})(Dialog));

exports["default"] = Dialog;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
