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
var mobxStateTree = require('mobx-state-tree');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Page = /** @class */ (function (_super) {
    tslib.__extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        // autobind 会让继承里面的 super 指向有问题，所以先这样！
        amisCore.bulkBindFunctions(_this, [
            'handleAction',
            'handleChange',
            'handleBulkChange',
            'handleQuery',
            'handleDialogConfirm',
            'handleDialogClose',
            'handleDrawerConfirm',
            'handleDrawerClose',
            'handleClick',
            'reload',
            'silentReload',
            'initInterval'
        ]);
        _this.style = document.createElement('style');
        _this.style.setAttribute('data-page', '');
        document.getElementsByTagName('head')[0].appendChild(_this.style);
        _this.updateStyle();
        _this.varStyle = document.createElement('style');
        _this.varStyle.setAttribute('data-vars', '');
        document.getElementsByTagName('head')[0].appendChild(_this.varStyle);
        _this.updateVarStyle();
        return _this;
    }
    /**
     * 构建 css
     */
    Page.prototype.updateStyle = function () {
        if (this.props.css || this.props.mobileCSS) {
            this.style.innerHTML = "\n      ".concat(this.buildCSS(this.props.css), "\n\n      @media (max-width: 768px) {\n        ").concat(this.buildCSS(this.props.mobileCSS), "\n      }\n      ");
        }
        else {
            this.style.innerHTML = '';
        }
    };
    Page.prototype.buildCSS = function (cssRules) {
        if (!cssRules) {
            return '';
        }
        var css = '';
        for (var selector in cssRules) {
            var declaration = cssRules[selector];
            var declarationStr = '';
            for (var property in declaration) {
                var innerstr = '';
                var innerValue = declaration[property];
                if (typeof innerValue === 'string') {
                    declarationStr += "  ".concat(property, ": ").concat(innerValue, ";\n");
                }
                else {
                    for (var propsName in innerValue) {
                        innerstr += " ".concat(propsName, ":").concat(innerValue[propsName], ";");
                    }
                    declarationStr += "  ".concat(property, " {").concat(innerstr, "}\n");
                }
            }
            css += "\n      ".concat(selector, " {\n        ").concat(declarationStr, "\n      }\n      ");
        }
        return css;
    };
    /**
     * 构建用于 css 变量的内联样式
     */
    Page.prototype.updateVarStyle = function () {
        var cssVars = this.props.cssVars;
        var cssVarsContent = '';
        if (cssVars) {
            for (var key in cssVars) {
                if (key.startsWith('--')) {
                    if (key.indexOf(':') !== -1) {
                        continue;
                    }
                    var value = cssVars[key];
                    // 这是为了防止 xss，可能还有别的
                    if (typeof value === 'string' &&
                        (value.indexOf('expression(') !== -1 || value.indexOf(';') !== -1)) {
                        continue;
                    }
                    cssVarsContent += "".concat(key, ": ").concat(value, "; \n");
                }
            }
            this.varStyle.innerHTML = "\n      :root {\n        ".concat(cssVarsContent, "\n      }\n      ");
        }
    };
    Page.prototype.componentDidMount = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, initApi, initFetch, initFetchOn, store, messages, data, dispatchEvent, env, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, initApi = _a.initApi, initFetch = _a.initFetch, initFetchOn = _a.initFetchOn, store = _a.store, messages = _a.messages, data = _a.data, dispatchEvent = _a.dispatchEvent, env = _a.env;
                        this.mounted = true;
                        return [4 /*yield*/, dispatchEvent('init', data, this)];
                    case 1:
                        rendererEvent = _b.sent();
                        // Page加载完成时触发 pageLoaded 事件
                        if (env === null || env === void 0 ? void 0 : env.tracker) {
                            env.tracker({ eventType: 'pageLoaded' }, this.props);
                        }
                        if ((rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) || !mobxStateTree.isAlive(store)) {
                            return [2 /*return*/];
                        }
                        if (amisCore.isEffectiveApi(initApi, store.data, initFetch, initFetchOn)) {
                            store
                                .fetchInitData(initApi, store.data, {
                                successMessage: messages && messages.fetchSuccess,
                                errorMessage: messages && messages.fetchFailed
                            })
                                .then(this.initInterval);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var store = props.store;
        var initApi = props.initApi;
        if (
        // 前一次不构成条件，这次更新构成了条件，则需要重新拉取
        (props.initFetchOn && props.initFetch && !prevProps.initFetch) ||
            // 构成了条件，同时 url 里面有变量，且上次和这次还不一样，则需要重新拉取。
            (props.initFetch !== false &&
                amisCore.isApiOutdated(prevProps.initApi, initApi, prevProps.data, props.data))) {
            var messages = props.messages;
            amisCore.isEffectiveApi(initApi, store.data) &&
                store
                    .fetchData(initApi, store.data, {
                    successMessage: messages && messages.fetchSuccess,
                    errorMessage: messages && messages.fetchFailed
                })
                    .then(this.initInterval);
        }
        if (JSON.stringify(props.css) !== JSON.stringify(prevProps.css) ||
            JSON.stringify(props.mobileCSS) !== JSON.stringify(prevProps.mobileCSS)) {
            this.updateStyle();
        }
        if (JSON.stringify(props.cssVars) !== JSON.stringify(prevProps.cssVars)) {
            this.updateVarStyle();
        }
        if (amisCore.isObjectShallowModified(prevProps.defaultData, props.defaultData)) {
            store.reInitData(props.defaultData);
        }
    };
    Page.prototype.componentWillUnmount = function () {
        var _a, _b;
        this.mounted = false;
        clearTimeout(this.timer);
        if (this.style) {
            (_a = this.style.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.style);
        }
        if (this.varStyle) {
            (_b = this.varStyle.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(this.varStyle);
        }
    };
    Page.prototype.reloadTarget = function (target, data) {
        // 会被覆写
    };
    Page.prototype.handleAction = function (e, action, ctx, throwErrors, delegate) {
        var _this = this;
        if (throwErrors === void 0) { throwErrors = false; }
        var _a = this.props, env = _a.env, store = _a.store, messages = _a.messages, onAction = _a.onAction;
        if (action.actionType === 'dialog') {
            store.setCurrentAction(action, this.props.resolveDefinitions);
            return new Promise(function (resolve) {
                store.openDialog(ctx, undefined, function (confirmed, value) {
                    var _a;
                    (_a = action.callback) === null || _a === void 0 ? void 0 : _a.call(action, confirmed, value);
                    resolve({
                        confirmed: confirmed,
                        value: value
                    });
                }, delegate || _this.context);
            });
        }
        else if (action.actionType === 'drawer') {
            store.setCurrentAction(action, this.props.resolveDefinitions);
            return new Promise(function (resolve) {
                store.openDrawer(ctx, undefined, function (confirmed, value) {
                    var _a;
                    (_a = action.callback) === null || _a === void 0 ? void 0 : _a.call(action, confirmed, value);
                    resolve({
                        confirmed: confirmed,
                        value: value
                    });
                }, delegate);
            });
        }
        else if (action.actionType === 'ajax') {
            store.setCurrentAction(action, this.props.resolveDefinitions);
            if (!amisCore.isEffectiveApi(action.api, ctx)) {
                return;
            }
            return store
                .saveRemote(action.api, ctx, {
                successMessage: (action.messages && action.messages.success) ||
                    (messages && messages.saveSuccess),
                errorMessage: (action.messages && action.messages.failed) ||
                    (messages && messages.saveSuccess)
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
            return onAction(e, action, ctx, throwErrors, delegate || this.context);
        }
    };
    Page.prototype.handleQuery = function (query) {
        if (this.props.initApi) {
            // 如果是分页动作，则看接口里面有没有用，没用则  return false
            // 让组件自己去排序
            if ((query === null || query === void 0 ? void 0 : query.hasOwnProperty('orderBy')) &&
                !amisCore.isApiOutdated(this.props.initApi, this.props.initApi, this.props.store.data, amisCore.createObject(this.props.store.data, query))) {
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
    Page.prototype.handleDialogConfirm = function (values, action) {
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
    Page.prototype.handleDialogClose = function (confirmed) {
        if (confirmed === void 0) { confirmed = false; }
        var store = this.props.store;
        store.closeDialog(confirmed);
    };
    Page.prototype.handleDrawerConfirm = function (values, action) {
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
        store.closeDrawer(true, values);
    };
    Page.prototype.handleDrawerClose = function () {
        var store = this.props.store;
        store.closeDrawer(false);
    };
    Page.prototype.handleClick = function (e) {
        var _a;
        var target = e.target;
        var env = this.props.env;
        var link = target.tagName === 'A' && target.hasAttribute('data-link')
            ? target.getAttribute('data-link')
            : (_a = target.closest('a[data-link]')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-link');
        if (env && link) {
            env.jumpTo(link, undefined, this.props.data);
            e.preventDefault();
        }
    };
    Page.prototype.handleResizeMouseDown = function (e) {
        // todo 可能 ie 不正确
        var isRightMB = e.nativeEvent.which == 3;
        if (isRightMB) {
            return;
        }
        this.codeWrap = e.currentTarget.parentElement;
        document.addEventListener('mousemove', this.handleResizeMouseMove);
        document.addEventListener('mouseup', this.handleResizeMouseUp);
        this.startX = e.clientX;
        this.startWidth = this.codeWrap.offsetWidth;
    };
    Page.prototype.handleResizeMouseMove = function (e) {
        var _a = this.props, _b = _a.asideMinWidth, asideMinWidth = _b === void 0 ? 160 : _b, _c = _a.asideMaxWidth, asideMaxWidth = _c === void 0 ? 350 : _c;
        var dx = e.clientX - this.startX;
        var mx = this.startWidth + dx;
        var width = Math.min(Math.max(mx, asideMinWidth), asideMaxWidth);
        this.codeWrap.style.cssText += "width: ".concat(width, "px");
    };
    Page.prototype.handleResizeMouseUp = function () {
        document.removeEventListener('mousemove', this.handleResizeMouseMove);
        document.removeEventListener('mouseup', this.handleResizeMouseUp);
    };
    Page.prototype.openFeedback = function (dialog, ctx) {
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
    Page.prototype.reload = function (subpath, query, ctx, silent, replace) {
        if (query) {
            return this.receive(query, undefined, replace);
        }
        var _a = this.props, store = _a.store, initApi = _a.initApi;
        clearTimeout(this.timer);
        amisCore.isEffectiveApi(initApi, store.data) &&
            store
                .fetchData(initApi, store.data, {
                silent: silent
            })
                .then(this.initInterval);
    };
    Page.prototype.receive = function (values, subPath, replace) {
        var store = this.props.store;
        store.updateData(values, undefined, replace);
        this.reload();
    };
    Page.prototype.silentReload = function (target, query) {
        this.reload(query, undefined, undefined, true);
    };
    Page.prototype.initInterval = function (value) {
        var _a;
        var _b = this.props, interval = _b.interval, silentPolling = _b.silentPolling, stopAutoRefreshWhen = _b.stopAutoRefreshWhen, data = _b.data, dispatchEvent = _b.dispatchEvent, store = _b.store;
        dispatchEvent('inited', amisCore.createObject(data, tslib.__assign(tslib.__assign({}, value === null || value === void 0 ? void 0 : value.data), { responseData: (value === null || value === void 0 ? void 0 : value.ok) ? (_a = value === null || value === void 0 ? void 0 : value.data) !== null && _a !== void 0 ? _a : {} : value, responseStatus: (value === null || value === void 0 ? void 0 : value.status) === undefined ? ((store === null || store === void 0 ? void 0 : store.error) ? 1 : 0) : value === null || value === void 0 ? void 0 : value.status, responseMsg: (value === null || value === void 0 ? void 0 : value.msg) || (store === null || store === void 0 ? void 0 : store.msg) })));
        (value === null || value === void 0 ? void 0 : value.ok) && // 接口正常返回才继续轮训
            interval &&
            this.mounted &&
            (!stopAutoRefreshWhen || !amisCore.evalExpression(stopAutoRefreshWhen, data)) &&
            (this.timer = setTimeout(silentPolling ? this.silentReload : this.reload, Math.max(interval, 1000)));
        return value;
    };
    Page.prototype.handleRefresh = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, data, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
                        return [4 /*yield*/, dispatchEvent('pullRefresh', data)];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.reload();
                        return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.handleChange = function (value, name, submit, changePristine) {
        var _a = this.props, store = _a.store, onChange = _a.onChange;
        if (typeof name === 'string' && name) {
            store.changeValue(name, value, changePristine);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange.apply(null, arguments);
    };
    Page.prototype.handleBulkChange = function (values) {
        var _a, _b;
        (_b = (_a = this.props.store) === null || _a === void 0 ? void 0 : _a.updateData) === null || _b === void 0 ? void 0 : _b.call(_a, values);
    };
    Page.prototype.renderHeader = function () {
        var _a = this.props, title = _a.title, subTitle = _a.subTitle, remark = _a.remark, remarkPlacement = _a.remarkPlacement, headerClassName = _a.headerClassName, toolbarClassName = _a.toolbarClassName, toolbar = _a.toolbar, render = _a.render; _a.store; var initApi = _a.initApi, popOverContainer = _a.popOverContainer, env = _a.env, cx = _a.classnames, regions = _a.regions; _a.translate; var id = _a.id, themeCss = _a.themeCss;
        var subProps = {
            onAction: this.handleAction,
            onQuery: initApi ? this.handleQuery : undefined
        };
        var header, right;
        if (Array.isArray(regions) ? ~regions.indexOf('header') : title || subTitle) {
            header = (_J$X_("div", { className: cx("Page-header", headerClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'headerControlClassName', id: id, themeCss: themeCss }))) },
                title ? (_J$X_("h2", { className: cx('Page-title', amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'titleControlClassName', id: id, themeCss: themeCss }))) },
                    render('title', title, subProps),
                    remark
                        ? render('remark', {
                            type: 'remark',
                            tooltip: remark,
                            placement: remarkPlacement || 'bottom',
                            container: popOverContainer || env.getModalContainer
                        })
                        : null)) : null,
                subTitle && (_J$X_("small", { className: cx('Page-subTitle') }, render('subTitle', subTitle, subProps)))));
        }
        if (Array.isArray(regions) ? ~regions.indexOf('toolbar') : toolbar) {
            right = (_J$X_("div", { className: cx("Page-toolbar", toolbarClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'toolbarControlClassName', id: id, themeCss: themeCss }))) }, render('toolbar', toolbar || '', subProps)));
        }
        if (header && right) {
            return (_J$X_("div", { className: cx('Page-headerRow') },
                header,
                right));
        }
        return header || right;
    };
    Page.prototype.render = function () {
        var _a = this.props, className = _a.className, store = _a.store, body = _a.body, bodyClassName = _a.bodyClassName, render = _a.render, aside = _a.aside, asideClassName = _a.asideClassName, cx = _a.classnames, showErrorMsg = _a.showErrorMsg, initApi = _a.initApi, regions = _a.regions, style = _a.style, data = _a.data, asideResizor = _a.asideResizor, asideSticky = _a.asideSticky, pullRefresh = _a.pullRefresh, mobileUI = _a.mobileUI, __ = _a.translate, loadingConfig = _a.loadingConfig, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss;
        var subProps = {
            onAction: this.handleAction,
            onQuery: initApi ? this.handleQuery : undefined,
            onChange: this.handleChange,
            onBulkChange: this.handleBulkChange,
            pageLoading: store.loading
        };
        var hasAside = Array.isArray(regions)
            ? ~regions.indexOf('aside')
            : aside && (!Array.isArray(aside) || aside.length);
        var styleVar = amisCore.buildStyle(style, data);
        var pageContent = (_J$X_("div", { className: cx('Page-content') },
            _J$X_("div", { className: cx('Page-main') },
                this.renderHeader(),
                _J$X_("div", { className: cx("Page-body", bodyClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'bodyControlClassName', id: id, themeCss: themeCss }))), role: "page-body" },
                    _J$X_(amisUi.Spinner, { size: "lg", overlay: true, key: "info", show: store.loading, loadingConfig: loadingConfig }),
                    !env.forceSilenceInsideError &&
                        store.error &&
                        showErrorMsg !== false ? (_J$X_(amisUi.Alert2, { level: "danger", showCloseButton: true, onClose: store.clearMessage }, store.msg)) : null,
                    (Array.isArray(regions) ? ~regions.indexOf('body') : body)
                        ? render('body', body || '', subProps)
                        : null))));
        return (_J$X_("div", { className: cx("Page", hasAside ? "Page--withSidebar" : '', hasAside && asideSticky ? "Page--asideSticky" : '', className, amisCore.setThemeClassName(tslib.__assign({ name: 'baseControlClassName', id: id, themeCss: themeCss }, this.props)), amisCore.setThemeClassName(tslib.__assign({ name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }, this.props))), onClick: this.handleClick, style: styleVar },
            hasAside ? (_J$X_("div", { className: cx("Page-aside", asideResizor ? 'relative' : 'Page-aside--withWidth', asideClassName, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'asideControlClassName', id: id, themeCss: themeCss }))) },
                render('aside', aside || '', tslib.__assign(tslib.__assign({}, subProps), (typeof aside === 'string'
                    ? {
                        inline: false,
                        className: "Page-asideTplWrapper"
                    }
                    : null))),
                asideResizor ? (_J$X_("div", { onMouseDown: this.handleResizeMouseDown, className: cx("Page-asideResizor") })) : null)) : null,
            mobileUI && pullRefresh && !pullRefresh.disabled ? (_J$X_(amisUi.PullRefresh, tslib.__assign({}, pullRefresh, { translate: __, onRefresh: this.handleRefresh }), pageContent)) : (pageContent),
            render('dialog', tslib.__assign(tslib.__assign({}, (store.action &&
                store.action.dialog)), { type: 'dialog' }), {
                key: 'dialog',
                data: store.dialogData,
                onConfirm: this.handleDialogConfirm,
                onClose: this.handleDialogClose,
                show: store.dialogOpen,
                onAction: this.handleAction,
                onQuery: initApi ? this.handleQuery : undefined
            }),
            render('drawer', tslib.__assign(tslib.__assign({}, (store.action &&
                store.action.drawer)), { type: 'drawer' }), {
                key: 'drawer',
                data: store.drawerData,
                onConfirm: this.handleDrawerConfirm,
                onClose: this.handleDrawerClose,
                show: store.drawerOpen,
                onAction: this.handleAction,
                onQuery: initApi ? this.handleQuery : undefined
            }),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName',
                            weights: {
                                default: {
                                    important: true
                                },
                                hover: {
                                    important: true
                                },
                                active: {
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'bodyControlClassName'
                        },
                        {
                            key: 'headerControlClassName'
                        },
                        {
                            key: 'titleControlClassName'
                        },
                        {
                            key: 'toolbarControlClassName'
                        },
                        {
                            key: 'asideControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    Page.defaultProps = {
        asideClassName: '',
        bodyClassName: '',
        headerClassName: '',
        initFetch: true,
        // primaryField: 'id',
        toolbarClassName: '',
        messages: {},
        asideSticky: true,
        pullRefresh: {
            disabled: true
        }
    };
    Page.propsList = [
        'title',
        'subTitle',
        'initApi',
        'initFetchOn',
        'initFetch',
        'headerClassName',
        'bodyClassName',
        'asideClassName',
        'toolbarClassName',
        'toolbar',
        'body',
        'aside',
        'messages',
        'style',
        'showErrorMsg'
    ];
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Page.prototype, "handleResizeMouseDown", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [MouseEvent]),
        tslib.__metadata("design:returntype", void 0)
    ], Page.prototype, "handleResizeMouseMove", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], Page.prototype, "handleResizeMouseUp", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", Promise)
    ], Page.prototype, "handleRefresh", null);
    return Page;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(PageRenderer, _super);
    function PageRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    PageRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
        _super.prototype.componentWillUnmount.call(this);
    };
    PageRenderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    PageRenderer.prototype.handleAction = function (e, action, ctx, throwErrors, delegate) {
        if (throwErrors === void 0) { throwErrors = false; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var scoped, ret;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scoped = delegate || this.context;
                        if (!(action.actionType === 'reload')) return [3 /*break*/, 1];
                        action.target && scoped.reload(action.target, ctx);
                        return [3 /*break*/, 4];
                    case 1:
                        if (!action.target) return [3 /*break*/, 2];
                        action.target.split(',').forEach(function (name) {
                            var target = scoped.getComponentByName(name);
                            target &&
                                target.doAction &&
                                target.doAction(tslib.__assign(tslib.__assign({}, action), { target: undefined }), ctx);
                        });
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, _super.prototype.handleAction.call(this, e, action, ctx, throwErrors, delegate)];
                    case 3:
                        ret = _a.sent();
                        if (action.reload &&
                            ~['url', 'link', 'jump'].indexOf(action.actionType)) {
                            scoped.reload(action.reload, ctx);
                        }
                        return [2 /*return*/, ret];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PageRenderer.prototype.handleDialogConfirm = function (values, action) {
        var _a, _b;
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        var store = this.props.store;
        var dialogAction = store.action;
        var reload = (_a = action.reload) !== null && _a !== void 0 ? _a : dialogAction.reload;
        var scoped = store.getDialogScoped() || this.context;
        _super.prototype.handleDialogConfirm.apply(this, tslib.__spreadArray([values, action], tslib.__read(rest), false));
        if (reload) {
            scoped.reload(reload, store.data);
        }
        else if ((scoped === null || scoped === void 0 ? void 0 : scoped.component) !== this && ((_b = scoped.component) === null || _b === void 0 ? void 0 : _b.reload)) {
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
    PageRenderer.prototype.handleDrawerConfirm = function (values, action) {
        var _this = this;
        var _a;
        var store = this.props.store;
        var drawerAction = store.action;
        var reload = (_a = action.reload) !== null && _a !== void 0 ? _a : drawerAction.reload;
        var scoped = store.getDrawerScoped() || this.context;
        _super.prototype.handleDrawerConfirm.call(this, values, action);
        // 稍等会，等动画结束。
        setTimeout(function () {
            var _a;
            if (reload) {
                scoped.reload(reload, store.data);
            }
            else if (scoped.component !== _this && ((_a = scoped === null || scoped === void 0 ? void 0 : scoped.component) === null || _a === void 0 ? void 0 : _a.reload)) {
                scoped.component.reload();
            }
            else {
                _this.context
                    .getComponents()
                    .filter(function (item) { return item.props.type === 'crud'; })
                    .forEach(function (item) { return item.reload && item.reload(); });
            }
        }, 300);
    };
    PageRenderer.prototype.setData = function (values, replace) {
        return this.props.store.updateData(values, undefined, replace);
    };
    PageRenderer.prototype.getData = function () {
        var store = this.props.store;
        return store.data;
    };
    PageRenderer.contextType = amisCore.ScopedContext;
    PageRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'page',
            storeType: amisCore.ServiceStore.name,
            isolateScope: true
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], PageRenderer);
    return PageRenderer;
})(Page));

exports["default"] = Page;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
