/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate, __metadata } from 'tslib';
import React from 'react';
import { filter, getPropValue, autobind, Renderer } from 'amis-core';
import { Link, withBadge } from 'amis-ui';

var LinkCmpt = /** @class */ (function (_super) {
    __extends(LinkCmpt, _super);
    function LinkCmpt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinkCmpt.prototype.handleClick = function (e) {
        var _a = this.props, env = _a.env, href = _a.href, blank = _a.blank, body = _a.body;
        env === null || env === void 0 ? void 0 : env.tracker({
            eventType: 'url',
            // 需要和 action 里命名一致方便后续分析
            eventData: { url: href, blank: blank, label: body }
        }, this.props);
    };
    LinkCmpt.prototype.getHref = function () { };
    LinkCmpt.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, body = _a.body, href = _a.href; _a.classnames; var blank = _a.blank, disabled = _a.disabled, htmlTarget = _a.htmlTarget, data = _a.data, render = _a.render, __ = _a.translate, title = _a.title, icon = _a.icon, rightIcon = _a.rightIcon;
        var value = (typeof href === 'string' && href
            ? filter(href, data, '| raw')
            : undefined) || getPropValue(this.props);
        return (React.createElement(Link, { className: className, style: style, href: value, disabled: disabled, title: title, htmlTarget: htmlTarget || (blank ? '_blank' : '_self'), icon: icon, rightIcon: rightIcon, onClick: this.handleClick }, body ? render('body', body) : value || __('link')));
    };
    LinkCmpt.defaultProps = {
        blank: true,
        disabled: false,
        htmlTarget: ''
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], LinkCmpt.prototype, "handleClick", null);
    return LinkCmpt;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(LinkFieldRenderer, _super);
    function LinkFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinkFieldRenderer = __decorate([
        Renderer({
            type: 'link'
        })
        // @ts-ignore 类型没搞定
        ,
        withBadge
    ], LinkFieldRenderer);
    return LinkFieldRenderer;
})(LinkCmpt));

export { LinkCmpt };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
