/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __spreadArray, __read, __decorate, __metadata } from 'tslib';
import React from 'react';
import mapValues from 'lodash/mapValues';
import { Tab, Tabs } from 'amis-ui';
import { str2AsyncFunction, filter, resolveVariable, createObject, isObject, isVisible, isDisabled, autobind, Renderer } from 'amis-core';

var Portlet = /** @class */ (function (_super) {
    __extends(Portlet, _super);
    function Portlet(props) {
        var _this = _super.call(this, props) || this;
        var activeKey = props.activeKey || 0;
        _this.state = {
            activeKey: activeKey
        };
        return _this;
    }
    Portlet.prototype.handleSelect = function (key) {
        var _a = this.props, onSelect = _a.onSelect, tabs = _a.tabs;
        if (typeof key === 'number' && key < tabs.length) {
            this.setState({
                activeKey: key
            });
        }
        if (typeof onSelect === 'string') {
            var selectFunc = str2AsyncFunction(onSelect, 'key', 'props');
            selectFunc && selectFunc(key, this.props);
        }
        else if (typeof onSelect === 'function') {
            onSelect(key, this.props);
        }
    };
    Portlet.prototype.renderToolbarItem = function (toolbar) {
        var render = this.props.render;
        var actions = [];
        if (Array.isArray(toolbar)) {
            toolbar.forEach(function (action, index) {
                return actions.push(render("toolbar/".concat(index), __assign({ type: 'button', level: 'link', size: 'sm' }, action), {
                    key: index
                }));
            });
        }
        return actions;
    };
    Portlet.prototype.renderToolbar = function () {
        var _a = this.props, toolbar = _a.toolbar, cx = _a.classnames, ns = _a.classPrefix, tabs = _a.tabs;
        var activeKey = this.state.activeKey;
        var tabToolbar = null;
        var tabToolbarTpl = null;
        // tabs里的toolbar
        var toolbarTpl = toolbar ? (React.createElement("div", { className: cx("".concat(ns, "toolbar")) }, this.renderToolbarItem(toolbar))) : null;
        // tab里的toolbar
        if (typeof activeKey !== 'undefined') {
            tabToolbar = tabs[activeKey].toolbar;
            tabToolbarTpl = tabToolbar ? (React.createElement("div", { className: cx("".concat(ns, "tab-toolbar")) }, this.renderToolbarItem(tabToolbar))) : null;
        }
        return toolbarTpl || tabToolbarTpl ? (React.createElement("div", { className: cx("".concat(ns, "Portlet-toolbar")) },
            toolbarTpl,
            tabToolbarTpl)) : null;
    };
    Portlet.prototype.renderDesc = function () {
        var _a = this.props, descTpl = _a.description; _a.render; var cx = _a.classnames, ns = _a.classPrefix, data = _a.data;
        var desc = filter(descTpl, data);
        return desc ? (React.createElement("span", { className: cx("".concat(ns, "Portlet-header-desc")) }, desc)) : null;
    };
    Portlet.prototype.renderTabs = function () {
        var _a;
        var _this = this;
        var _b = this.props, cx = _b.classnames, ns = _b.classPrefix, tabsClassName = _b.tabsClassName, contentClassName = _b.contentClassName, linksClassName = _b.linksClassName, tabRender = _b.tabRender, render = _b.render, data = _b.data, dMode = _b.mode, tabsMode = _b.tabsMode, unmountOnExit = _b.unmountOnExit, source = _b.source, mountOnEnter = _b.mountOnEnter, scrollable = _b.scrollable, __ = _b.translate, addBtnText = _b.addBtnText, divider = _b.divider;
        var mode = tabsMode || dMode;
        var arr = resolveVariable(source, data);
        var tabs = this.props.tabs;
        if (!tabs) {
            return null;
        }
        tabs = Array.isArray(tabs) ? tabs : [tabs];
        var children = [];
        var tabClassname = cx("".concat(ns, "Portlet-tab"), tabsClassName, (_a = {},
            _a['unactive-select'] = tabs.length <= 1,
            _a['no-divider'] = !divider,
            _a));
        if (Array.isArray(arr)) {
            arr.forEach(function (value, index) {
                var ctx = createObject(data, isObject(value) ? __assign({ index: index }, value) : { item: value, index: index });
                children.push.apply(children, __spreadArray([], __read(tabs.map(function (tab, tabIndex) {
                    return isVisible(tab, ctx) ? (React.createElement(Tab, __assign({}, tab, { title: filter(tab.title, ctx), disabled: isDisabled(tab, ctx), key: "".concat(index * 1000 + tabIndex), eventKey: index * 1000 + tabIndex, mountOnEnter: mountOnEnter, unmountOnExit: typeof tab.reload === 'boolean'
                            ? tab.reload
                            : typeof tab.unmountOnExit === 'boolean'
                                ? tab.unmountOnExit
                                : unmountOnExit }), render("item/".concat(index, "/").concat(tabIndex), (tab === null || tab === void 0 ? void 0 : tab.type) ? tab : tab.tab || tab.body, {
                        data: ctx
                    }))) : null;
                })), false));
            });
        }
        else {
            children = tabs.map(function (tab, index) {
                return isVisible(tab, data) ? (React.createElement(Tab, __assign({}, tab, { title: filter(tab.title, data), disabled: isDisabled(tab, data), key: index, eventKey: index, mountOnEnter: mountOnEnter, unmountOnExit: typeof tab.reload === 'boolean'
                        ? tab.reload
                        : typeof tab.unmountOnExit === 'boolean'
                            ? tab.unmountOnExit
                            : unmountOnExit }), _this.renderTab
                    ? _this.renderTab(tab, _this.props, index)
                    : tabRender
                        ? tabRender(tab, _this.props, index)
                        : render("tab/".concat(index), (tab === null || tab === void 0 ? void 0 : tab.type) ? tab : tab.tab || tab.body))) : null;
            });
        }
        return (React.createElement(Tabs, { addBtnText: __(addBtnText || 'add'), classPrefix: ns, classnames: cx, mode: mode, className: tabClassname, contentClassName: contentClassName, linksClassName: linksClassName, activeKey: this.state.activeKey, onSelect: this.handleSelect, toolbar: this.renderToolbar(), additionBtns: this.renderDesc(), scrollable: scrollable }, children));
    };
    Portlet.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, data = _b.data, cx = _b.classnames, ns = _b.classPrefix, style = _b.style, hideHeader = _b.hideHeader;
        var portletClassname = cx("".concat(ns, "Portlet"), className, (_a = {},
            _a['no-header'] = hideHeader,
            _a));
        var styleVar = typeof style === 'string'
            ? resolveVariable(style, data) || {}
            : mapValues(style, function (s) { return resolveVariable(s, data) || s; });
        return (React.createElement("div", { className: portletClassname, style: styleVar }, this.renderTabs()));
    };
    Portlet.defaultProps = {
        className: '',
        mode: 'line',
        divider: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], Portlet.prototype, "handleSelect", null);
    return Portlet;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(PortletRenderer, _super);
    function PortletRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PortletRenderer = __decorate([
        Renderer({
            type: 'portlet'
        })
    ], PortletRenderer);
    return PortletRenderer;
})(Portlet));

export { Portlet };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
