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
var omit = require('lodash/omit');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Panel = /** @class */ (function (_super) {
    tslib.__extends(Panel, _super);
    function Panel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Panel.prototype.renderBody = function () {
        var _a = this.props; _a.type; _a.className; _a.style; var data = _a.data; _a.header; var body = _a.body, render = _a.render; _a.bodyClassName; _a.headerClassName; _a.actionsClassName; _a.footerClassName; var children = _a.children; _a.title; _a.actions; _a.footer; _a.classPrefix; var formMode = _a.formMode, formHorizontal = _a.formHorizontal, subFormMode = _a.subFormMode, subFormHorizontal = _a.subFormHorizontal; _a.id; var rest = tslib.__rest(_a, ["type", "className", "style", "data", "header", "body", "render", "bodyClassName", "headerClassName", "actionsClassName", "footerClassName", "children", "title", "actions", "footer", "classPrefix", "formMode", "formHorizontal", "subFormMode", "subFormHorizontal", "id"]);
        var subProps = tslib.__assign(tslib.__assign({ data: data }, omit__default["default"](rest, amisCore.RENDERER_TRANSMISSION_OMIT_PROPS)), { formMode: subFormMode || formMode, formHorizontal: subFormHorizontal || formHorizontal });
        return children
            ? typeof children === 'function'
                ? children(this.props)
                : children
            : body
                ? render('body', body, subProps)
                : null;
    };
    Panel.prototype.renderActions = function () {
        var _a = this.props, actions = _a.actions, render = _a.render;
        if (Array.isArray(actions) && actions.length) {
            return actions.map(function (action, key) {
                return render('action', action, {
                    type: action.type || 'button',
                    key: key
                });
            });
        }
        return null;
    };
    Panel.prototype.render = function () {
        var _a = this.props; _a.type; var className = _a.className, style = _a.style, data = _a.data, header = _a.header; _a.body; var render = _a.render, bodyClassName = _a.bodyClassName, headerClassName = _a.headerClassName, actionsClassName = _a.actionsClassName, footerClassName = _a.footerClassName, footerWrapClassName = _a.footerWrapClassName; _a.children; var title = _a.title, footer = _a.footer, affixFooter = _a.affixFooter, ns = _a.classPrefix, cx = _a.classnames; _a.id; var rest = tslib.__rest(_a, ["type", "className", "style", "data", "header", "body", "render", "bodyClassName", "headerClassName", "actionsClassName", "footerClassName", "footerWrapClassName", "children", "title", "footer", "affixFooter", "classPrefix", "classnames", "id"]);
        var subProps = tslib.__assign({ data: data }, rest);
        var footerDoms = [];
        var actions = this.renderActions();
        actions &&
            footerDoms.push(_J$X_("div", { key: "actions", className: cx("Panel-btnToolbar", actionsClassName || "Panel-footer") }, actions));
        footer &&
            footerDoms.push(_J$X_("div", { key: "footer", className: cx(footerClassName || "Panel-footer") }, render('footer', footer, subProps)));
        var footerDom = footerDoms.length ? (_J$X_("div", { className: cx('Panel-footerWrap', footerWrapClassName, affixFooter ? 'Panel-fixedBottom' : '') }, footerDoms)) : null;
        return (_J$X_("div", { className: cx("Panel", className || "Panel--default"), style: style },
            header ? (_J$X_("div", { className: cx(headerClassName || "Panel-heading") }, render('header', header, subProps))) : title ? (_J$X_("div", { className: cx(headerClassName || "Panel-heading") },
                _J$X_("h3", { className: cx("Panel-title") }, render('title', title, subProps)))) : null,
            _J$X_("div", { className: bodyClassName || "".concat(ns, "Panel-body") }, this.renderBody()),
            footerDom));
    };
    Panel.propsList = [
        'header',
        'actions',
        'children',
        'headerClassName',
        'footerClassName',
        'footerWrapClassName',
        'actionsClassName',
        'bodyClassName'
    ];
    Panel.defaultProps = {
    // className: 'Panel--default',
    // headerClassName: 'Panel-heading',
    // footerClassName: 'Panel-footer bg-light lter Wrapper',
    // actionsClassName: 'Panel-footer',
    // bodyClassName: 'Panel-body'
    };
    return Panel;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(PanelRenderer, _super);
    function PanelRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'panel'
        })
    ], PanelRenderer);
    return PanelRenderer;
})(Panel));

exports["default"] = Panel;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
