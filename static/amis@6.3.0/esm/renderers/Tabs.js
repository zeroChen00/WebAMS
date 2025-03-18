/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __read, __spreadArray, __assign, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveVariableAndFilter, getVariable, isObjectShallowModified, isVisible, resolveEventData, filter, createObject, isObject, isDisabled, autobind, ScopedContext, Renderer, str2AsyncFunction } from 'amis-core';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { Tab, Tabs as Tabs$1 } from 'amis-ui';
import isNaN from 'lodash/isNaN';

var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs(props) {
        var _this = _super.call(this, props) || this;
        _this.newTabDefaultId = 3;
        var location = props.location || window.location;
        var tabs = props.tabs, source = props.source, data = props.data;
        var activeKey = 0;
        if (typeof props.activeKey !== 'undefined') {
            activeKey = props.activeKey;
        }
        else if (location && Array.isArray(tabs)) {
            var hash_1 = location.hash.substring(1);
            var tab = find(tabs, function (tab) { return tab.hash === hash_1; });
            if (tab) {
                activeKey = tab.hash;
            }
            else if (props.defaultKey !== undefined) {
                activeKey =
                    typeof props.defaultKey === 'string'
                        ? resolveVariableAndFilter(props.defaultKey, props.data)
                        : props.defaultKey;
            }
            else if (props.defaultActiveKey) {
                activeKey = resolveVariableAndFilter(props.defaultActiveKey, props.data);
            }
            activeKey = activeKey || (tabs[0] && tabs[0].hash) || 0;
        }
        var _a = __read(_this.initTabArray(tabs, source, data), 2), localTabs = _a[0], isFromSource = _a[1];
        _this.state = {
            prevKey: undefined,
            activeKey: (_this.activeKey = activeKey),
            localTabs: localTabs,
            isFromSource: isFromSource
        };
        return _this;
    }
    // 初始化 tabs 数组，当从 source 获取数据源时
    Tabs.prototype.initTabArray = function (tabs, source, data) {
        if (!tabs) {
            return [[], false];
        }
        var arr = resolveVariableAndFilter(source, data, '| raw');
        if (!Array.isArray(arr)) {
            return [tabs, false];
        }
        tabs = Array.isArray(tabs) ? tabs : [tabs];
        var sourceTabs = [];
        arr.forEach(function (value) {
            sourceTabs.push.apply(sourceTabs, __spreadArray([], __read(tabs.map(function (tab) { return (__assign(__assign({}, tab), { data: value })); })), false));
        });
        return [sourceTabs, true];
    };
    Tabs.prototype.componentDidMount = function () {
        var _a, _b;
        this.autoJumpToNeighbour(this.activeKey);
        var _c = this.props, name = _c.name, value = _c.value, onChange = _c.onChange, source = _c.source; _c.tabs; var data = _c.data;
        var localTabs = this.state.localTabs;
        // 如果没有配置 name ，说明不需要同步表单值
        if (!name ||
            typeof onChange !== 'function' ||
            // 如果关联某个变量数据，则不启用
            source) {
            return;
        }
        value = value !== null && value !== void 0 ? value : getVariable(data, name);
        //  如果有值，切到对应的 tab
        if (value && Array.isArray(localTabs)) {
            var key = this.resolveKeyByValue(value);
            key !== undefined && this.handleSelect(key);
        }
        else {
            var tab = this.resolveTabByKey(this.activeKey);
            if (tab && value !== ((_a = tab.value) !== null && _a !== void 0 ? _a : tab.title)) {
                onChange((_b = tab.value) !== null && _b !== void 0 ? _b : tab.title, name);
            }
        }
    };
    Tabs.prototype.componentDidUpdate = function (preProps, prevState) {
        var _a, _b, _c;
        var props = this.props;
        var localTabs = this.state.localTabs;
        var prevActiveKey = resolveVariableAndFilter(preProps.defaultActiveKey, preProps.data);
        var activeKey = resolveVariableAndFilter(props.defaultActiveKey, props.data);
        // 响应外部修改 tabs
        var isTabsModified = isObjectShallowModified({
            tabs: props.tabs,
            source: resolveVariableAndFilter(props.source, props.data, '| raw')
        }, {
            tabs: preProps.tabs,
            source: resolveVariableAndFilter(preProps.source, preProps.data, '| raw')
        }, false);
        if (isTabsModified) {
            var _d = __read(this.initTabArray(props.tabs, props.source, props.data), 2), newLocalTabs = _d[0], isFromSource = _d[1];
            this.setState({
                localTabs: newLocalTabs,
                isFromSource: isFromSource
            });
            localTabs = newLocalTabs;
        }
        if (props.location &&
            preProps.location &&
            props.location.hash !== preProps.location.hash) {
            var hash_2 = props.location.hash.substring(1);
            if (!hash_2) {
                return;
            }
            var tab = find(localTabs, function (tab) { return tab.hash === hash_2; });
            if (tab && tab.hash && tab.hash !== this.state.activeKey) {
                this.setState({
                    activeKey: (this.activeKey = tab.hash),
                    prevKey: this.state.activeKey
                });
            }
        }
        else if (Array.isArray(localTabs) &&
            Array.isArray(prevState.localTabs) &&
            JSON.stringify(localTabs.map(function (item) { return item.hash; })) !==
                JSON.stringify(prevState.localTabs.map(function (item) { return item.hash; }))) {
            var activeKey_1 = this.state.activeKey;
            var location_1 = props.location;
            var tab = null;
            if (location_1 && Array.isArray(localTabs)) {
                var hash_3 = location_1.hash.substring(1);
                tab = find(localTabs, function (tab) { return tab.hash === hash_3; });
            }
            if (tab) {
                activeKey_1 = tab.hash;
            }
            else if (!localTabs ||
                !localTabs.some(function (item, index) {
                    return item.hash ? item.hash === activeKey_1 : index === activeKey_1;
                })) {
                activeKey_1 = (localTabs && localTabs[0] && localTabs[0].hash) || 0;
            }
            this.setState({
                prevKey: undefined,
                activeKey: (this.activeKey = activeKey_1)
            });
        }
        else if (prevActiveKey !== activeKey) {
            if (activeKey == null) {
                return;
            }
            var newActivedKey = null;
            var tab = find(localTabs, function (item) { return item.hash === activeKey; });
            if (tab) {
                newActivedKey = tab.hash;
            }
            else if (typeof activeKey === 'number' && localTabs[activeKey]) {
                newActivedKey = activeKey;
            }
            // newActivedKey 可以为 0
            if (newActivedKey !== null) {
                this.setState({
                    prevKey: prevActiveKey,
                    activeKey: (this.activeKey = newActivedKey)
                });
            }
        }
        this.autoJumpToNeighbour(this.activeKey);
        var _e = this.props, name = _e.name, value = _e.value, onChange = _e.onChange, source = _e.source, data = _e.data;
        // 如果没有配置 name ，说明不需要同步表单值
        if (!name ||
            typeof onChange !== 'function' ||
            // 如果关联某个变量数据，则不启用
            source) {
            return;
        }
        var key;
        value = value !== null && value !== void 0 ? value : getVariable(data, name);
        var prevValue = (_a = preProps.value) !== null && _a !== void 0 ? _a : getVariable(preProps.data, preProps.name);
        if (value !== prevValue &&
            (key = this.resolveKeyByValue(value)) !== undefined &&
            key !== this.activeKey) {
            this.handleSelect(key);
        }
        else if (this.activeKey !== prevState.activeKey) {
            var tab = this.resolveTabByKey(this.activeKey);
            if (tab && value !== ((_b = tab.value) !== null && _b !== void 0 ? _b : tab.title)) {
                onChange((_c = tab.value) !== null && _c !== void 0 ? _c : tab.title, name);
            }
        }
    };
    Tabs.prototype.resolveTabByKey = function (key) {
        var localTabs = this.state.localTabs;
        if (!Array.isArray(localTabs)) {
            return;
        }
        return find(localTabs, function (tab, index) {
            return tab.hash ? tab.hash === key : index === key;
        });
    };
    Tabs.prototype.resolveKeyByValue = function (value) {
        var localTabs = this.state.localTabs;
        if (!Array.isArray(localTabs)) {
            return;
        }
        var tab = find(localTabs, function (tab) { var _a; return ((_a = tab.value) !== null && _a !== void 0 ? _a : tab.title) === value; });
        return tab && tab.hash ? tab.hash : localTabs.indexOf(tab);
    };
    Tabs.prototype.autoJumpToNeighbour = function (key) {
        var _a = this.props; _a.tabs; var data = _a.data;
        var localTabs = this.state.localTabs;
        if (!Array.isArray(localTabs)) {
            return;
        }
        // 当前 tab 可能不可见，所以需要自动切到一个可见的 tab, 左右左右找， 直到找到一个可见的 tab
        var tabIndex = findIndex(localTabs, function (tab, index) {
            return tab.hash ? tab.hash === key : index === key;
        });
        if (localTabs[tabIndex] &&
            !isVisible(localTabs[tabIndex], this.props.data)) {
            var len = localTabs.length;
            var left = tabIndex;
            var right = tabIndex;
            while (left-- >= 0 || right++ < len) {
                var activeKey = null;
                if (left >= 0 && isVisible(localTabs[left], data)) {
                    activeKey = localTabs[left].hash || left;
                }
                else if (right < len && isVisible(localTabs[right], data)) {
                    activeKey = localTabs[right].hash || right;
                }
                if (activeKey !== null) {
                    this.setState({
                        activeKey: (this.activeKey = activeKey)
                    });
                    break;
                }
            }
        }
    };
    Tabs.prototype.handleAdd = function () {
        var _this = this;
        var localTabs = this.state.localTabs.concat();
        localTabs.push({
            title: "tab".concat(this.newTabDefaultId++),
            body: 'tab'
        });
        this.setState({
            localTabs: localTabs
        }, function () {
            _this.switchTo(_this.state.localTabs.length - 1);
        });
    };
    Tabs.prototype.handleClose = function (index, key) {
        var originTabs = this.state.localTabs.concat();
        originTabs.splice(index, 1);
        this.setState({
            localTabs: originTabs
        });
    };
    Tabs.prototype.handleEdit = function (index, text) {
        var originTabs = this.state.localTabs.concat();
        originTabs[index].title = text;
        this.setState({
            localTabs: originTabs
        });
    };
    Tabs.prototype.handleDragChange = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var activeTab, originTabs;
            var _this = this;
            return __generator(this, function (_a) {
                activeTab = this.resolveTabByKey(this.activeKey);
                originTabs = this.state.localTabs.concat();
                originTabs.splice(e.newIndex, 0, originTabs.splice(e.oldIndex, 1)[0]);
                this.setState({
                    localTabs: originTabs
                }, function () {
                    if (activeTab) {
                        var newActiveTabIndex = originTabs.indexOf(activeTab);
                        _this.switchTo(newActiveTabIndex);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    Tabs.prototype.handleSelect = function (key) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, dispatchEvent, env, onSelect, id, localTabs, tab, rendererEvent, selectFunc;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, dispatchEvent = _b.dispatchEvent, _b.data, env = _b.env, onSelect = _b.onSelect, id = _b.id;
                        localTabs = this.state.localTabs;
                        tab = localTabs === null || localTabs === void 0 ? void 0 : localTabs.find(function (item, index) { return key === (item.hash ? item.hash : index); });
                        if (!tab) {
                            return [2 /*return*/];
                        }
                        (_a = env.tracker) === null || _a === void 0 ? void 0 : _a.call(env, {
                            eventType: 'tabChange',
                            eventData: {
                                id: id,
                                key: key
                            }
                        });
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, {
                                value: (tab === null || tab === void 0 ? void 0 : tab.hash) ? tab === null || tab === void 0 ? void 0 : tab.hash : key + 1
                            }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        // 是 hash，需要更新到地址栏
                        if (typeof key === 'string' && env) {
                            env.updateLocation("#".concat(key));
                        }
                        else if (typeof this.state.activeKey === 'string' && env) {
                            env.updateLocation("#");
                        }
                        this.setState({
                            activeKey: (this.activeKey = key),
                            prevKey: this.state.activeKey
                        });
                        if (typeof onSelect === 'string') {
                            selectFunc = str2AsyncFunction(onSelect, 'key', 'props');
                            selectFunc && selectFunc(key, this.props);
                        }
                        else if (typeof onSelect === 'function') {
                            onSelect(key, this.props);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 动作处理
     */
    Tabs.prototype.doAction = function (action, data, throwErrors, args) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var tmpKey = Number(args === null || args === void 0 ? void 0 : args.activeKey);
        var activeKey = isNaN(tmpKey) ? args === null || args === void 0 ? void 0 : args.activeKey : tmpKey;
        if (actionType === 'changeActiveKey') {
            this.handleSelect(typeof activeKey === 'number' ? activeKey - 1 : activeKey);
        }
    };
    Tabs.prototype.switchTo = function (index) {
        var localTabs = this.state.localTabs;
        Array.isArray(localTabs) &&
            localTabs[index] &&
            this.setState({
                activeKey: (this.activeKey = localTabs[index].hash || index)
            });
    };
    Tabs.prototype.currentIndex = function () {
        var _this = this;
        // const {tabs} = this.props;
        var localTabs = this.state.localTabs;
        return Array.isArray(localTabs)
            ? findIndex(localTabs, function (tab, index) {
                return tab.hash
                    ? tab.hash === _this.state.activeKey
                    : index === _this.state.activeKey;
            })
            : -1;
    };
    // 渲染tabs的title
    Tabs.prototype.renderTabTitle = function (title, index, data) {
        var render = this.props.render;
        return typeof title === 'string' || !title
            ? filter(title, data)
            : render("tab-title/".concat(index), title, __assign(__assign({}, data), { index: index }));
    };
    Tabs.prototype.renderToolbar = function () {
        var _a = this.props, toolbar = _a.toolbar, render = _a.render, cx = _a.classnames, toolbarClassName = _a.toolbarClassName;
        return toolbar ? (React.createElement("div", { className: cx("Tabs-toolbar", toolbarClassName) }, render('toolbar', toolbar))) : null;
    };
    Tabs.prototype.renderTabs = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, ns = _a.classPrefix, contentClassName = _a.contentClassName, linksClassName = _a.linksClassName, tabRender = _a.tabRender, className = _a.className, style = _a.style, render = _a.render, data = _a.data, dMode = _a.mode, tabsMode = _a.tabsMode, unmountOnExit = _a.unmountOnExit; _a.source; var formStore = _a.formStore, formMode = _a.formMode, formHorizontal = _a.formHorizontal, subFormMode = _a.subFormMode, subFormHorizontal = _a.subFormHorizontal, addable = _a.addable, closable = _a.closable, draggable = _a.draggable, showTip = _a.showTip, showTipClassName = _a.showTipClassName, editable = _a.editable, sidePosition = _a.sidePosition, __ = _a.translate, addBtnText = _a.addBtnText, collapseOnExceed = _a.collapseOnExceed, collapseBtnLabel = _a.collapseBtnLabel, disabled = _a.disabled, mobileUI = _a.mobileUI, swipeable = _a.swipeable, testIdBuilder = _a.testIdBuilder;
        var mode = tabsMode || dMode;
        var mountOnEnter = this.props.mountOnEnter;
        // 如果在form下面，其他tabs默认需要渲染出来
        // 否则在其他 tab 下面的必填项检测不到
        if (formStore) {
            mountOnEnter = false;
        }
        var _b = this.state, tabs = _b.localTabs, isFromSource = _b.isFromSource;
        var children = [];
        // 是否从 source 数据中生成
        if (isFromSource) {
            children = tabs.map(function (tab, index) {
                var _a, _b;
                var ctx = createObject(data, isObject(tab.data) ? __assign({ index: index }, tab.data) : { item: tab.data, index: index });
                return isVisible(tab, ctx) ? (React.createElement(Tab, __assign({}, tab, { title: _this.renderTabTitle(tab.title, index, ctx), disabled: disabled || isDisabled(tab, ctx), key: index, eventKey: filter(tab.hash, ctx) || index, prevKey: index > 0 ? ((_a = tabs[index - 1]) === null || _a === void 0 ? void 0 : _a.hash) || index - 1 : 0, nextKey: index < tabs.length - 1
                        ? ((_b = tabs[index + 1]) === null || _b === void 0 ? void 0 : _b.hash) || index + 1
                        : tabs.length - 1, swipeable: swipeable, mobileUI: mobileUI, mountOnEnter: mountOnEnter, unmountOnExit: typeof tab.reload === 'boolean'
                        ? tab.reload
                        : typeof tab.unmountOnExit === 'boolean'
                            ? tab.unmountOnExit
                            : unmountOnExit, onSelect: _this.handleSelect, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("tab-".concat(typeof tab.title === 'string' ? tab.title : index)) }), render("item/".concat(index), (tab === null || tab === void 0 ? void 0 : tab.type) ? tab : tab.tab || tab.body, {
                    disabled: disabled || isDisabled(tab, ctx) || undefined,
                    data: ctx,
                    formMode: tab.mode || subFormMode || formMode,
                    formHorizontal: tab.horizontal || subFormHorizontal || formHorizontal
                }))) : null;
            });
        }
        else {
            children = tabs.map(function (tab, index) {
                var _a, _b;
                return isVisible(tab, data) ? (React.createElement(Tab, __assign({}, tab, { title: _this.renderTabTitle(tab.title, index, data), disabled: disabled || isDisabled(tab, data), key: index, eventKey: tab.hash || index, prevKey: index > 0 ? ((_a = tabs[index - 1]) === null || _a === void 0 ? void 0 : _a.hash) || index - 1 : 0, nextKey: index < tabs.length - 1
                        ? ((_b = tabs[index + 1]) === null || _b === void 0 ? void 0 : _b.hash) || index + 1
                        : tabs.length - 1, swipeable: swipeable, mobileUI: mobileUI, mountOnEnter: mountOnEnter, unmountOnExit: typeof tab.reload === 'boolean'
                        ? tab.reload
                        : typeof tab.unmountOnExit === 'boolean'
                            ? tab.unmountOnExit
                            : unmountOnExit, onSelect: _this.handleSelect, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("tab-".concat(typeof tab.title === 'string' ? tab.title : index)) }), _this.renderTab
                    ? _this.renderTab(tab, _this.props, index)
                    : tabRender
                        ? tabRender(tab, _this.props, index)
                        : render("tab/".concat(index), (tab === null || tab === void 0 ? void 0 : tab.type) ? tab : tab.tab || tab.body, {
                            disabled: disabled || isDisabled(tab, data) || undefined,
                            formMode: tab.mode || subFormMode || formMode,
                            formHorizontal: tab.horizontal || subFormHorizontal || formHorizontal
                        }))) : null;
            });
        }
        return (React.createElement(Tabs$1, { addBtnText: __(addBtnText || 'add'), classPrefix: ns, classnames: cx, mode: mode, closable: closable, className: className, style: style, contentClassName: contentClassName, linksClassName: linksClassName, onSelect: this.handleSelect, activeKey: this.state.activeKey, toolbar: this.renderToolbar(), addable: addable, onAdd: this.handleAdd, onClose: this.handleClose, draggable: draggable, onDragChange: this.handleDragChange, showTip: showTip, showTipClassName: showTipClassName, editable: editable, onEdit: this.handleEdit, sidePosition: sidePosition, collapseOnExceed: collapseOnExceed, collapseBtnLabel: collapseBtnLabel, mobileUI: mobileUI, testIdBuilder: testIdBuilder }, children));
    };
    Tabs.prototype.render = function () {
        return this.renderTabs();
    };
    Tabs.defaultProps = {
        className: '',
        mode: '',
        mountOnEnter: true,
        unmountOnExit: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, String, Object]),
        __metadata("design:returntype", Array)
    ], Tabs.prototype, "initTabArray", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Tabs.prototype, "autoJumpToNeighbour", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tabs.prototype, "handleAdd", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", void 0)
    ], Tabs.prototype, "handleClose", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String]),
        __metadata("design:returntype", void 0)
    ], Tabs.prototype, "handleEdit", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Tabs.prototype, "handleDragChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Tabs.prototype, "handleSelect", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], Tabs.prototype, "switchTo", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Number)
    ], Tabs.prototype, "currentIndex", null);
    return Tabs;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TabsRenderer, _super);
    function TabsRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    TabsRenderer.prototype.componentWillUnmount = function () {
        var _a;
        (_a = _super.prototype.componentWillUnmount) === null || _a === void 0 ? void 0 : _a.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    TabsRenderer.contextType = ScopedContext;
    TabsRenderer = __decorate([
        Renderer({
            type: 'tabs'
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], TabsRenderer);
    return TabsRenderer;
})(Tabs));

export { Tabs as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
