/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { RENDERER_TRANSMISSION_OMIT_PROPS, Renderer } from 'amis-core';
import omit from 'lodash/omit';

var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Panel.prototype.renderBody = function () {
        var _a = this.props; _a.type; _a.className; _a.style; var data = _a.data; _a.header; var body = _a.body, render = _a.render; _a.bodyClassName; _a.headerClassName; _a.actionsClassName; _a.footerClassName; var children = _a.children; _a.title; _a.actions; _a.footer; _a.classPrefix; var formMode = _a.formMode, formHorizontal = _a.formHorizontal, subFormMode = _a.subFormMode, subFormHorizontal = _a.subFormHorizontal; _a.id; var rest = __rest(_a, ["type", "className", "style", "data", "header", "body", "render", "bodyClassName", "headerClassName", "actionsClassName", "footerClassName", "children", "title", "actions", "footer", "classPrefix", "formMode", "formHorizontal", "subFormMode", "subFormHorizontal", "id"]);
        var subProps = __assign(__assign({ data: data }, omit(rest, RENDERER_TRANSMISSION_OMIT_PROPS)), { formMode: subFormMode || formMode, formHorizontal: subFormHorizontal || formHorizontal });
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
        var _a = this.props; _a.type; var className = _a.className, style = _a.style, data = _a.data, header = _a.header; _a.body; var render = _a.render, bodyClassName = _a.bodyClassName, headerClassName = _a.headerClassName, actionsClassName = _a.actionsClassName, footerClassName = _a.footerClassName, footerWrapClassName = _a.footerWrapClassName; _a.children; var title = _a.title, footer = _a.footer, affixFooter = _a.affixFooter, ns = _a.classPrefix, cx = _a.classnames; _a.id; var rest = __rest(_a, ["type", "className", "style", "data", "header", "body", "render", "bodyClassName", "headerClassName", "actionsClassName", "footerClassName", "footerWrapClassName", "children", "title", "footer", "affixFooter", "classPrefix", "classnames", "id"]);
        var subProps = __assign({ data: data }, rest);
        var footerDoms = [];
        var actions = this.renderActions();
        actions &&
            footerDoms.push(React.createElement("div", { key: "actions", className: cx("Panel-btnToolbar", actionsClassName || "Panel-footer") }, actions));
        footer &&
            footerDoms.push(React.createElement("div", { key: "footer", className: cx(footerClassName || "Panel-footer") }, render('footer', footer, subProps)));
        var footerDom = footerDoms.length ? (React.createElement("div", { className: cx('Panel-footerWrap', footerWrapClassName, affixFooter ? 'Panel-fixedBottom' : '') }, footerDoms)) : null;
        return (React.createElement("div", { className: cx("Panel", className || "Panel--default"), style: style },
            header ? (React.createElement("div", { className: cx(headerClassName || "Panel-heading") }, render('header', header, subProps))) : title ? (React.createElement("div", { className: cx(headerClassName || "Panel-heading") },
                React.createElement("h3", { className: cx("Panel-title") }, render('title', title, subProps)))) : null,
            React.createElement("div", { className: bodyClassName || "".concat(ns, "Panel-body") }, this.renderBody()),
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
}(React.Component));
/** @class */ ((function (_super) {
    __extends(PanelRenderer, _super);
    function PanelRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelRenderer = __decorate([
        Renderer({
            type: 'panel'
        })
    ], PanelRenderer);
    return PanelRenderer;
})(Panel));

export { Panel as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
