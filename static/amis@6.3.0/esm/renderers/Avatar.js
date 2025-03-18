/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate, __metadata } from 'tslib';
import React from 'react';
import { isPureVariable, resolveVariableAndFilter, autobind, Renderer } from 'amis-core';
import { Avatar, withBadge } from 'amis-ui';

var AvatarField = /** @class */ (function (_super) {
    __extends(AvatarField, _super);
    function AvatarField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvatarField.prototype.handleClick = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    AvatarField.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    AvatarField.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    AvatarField.prototype.render = function () {
        var _a = this.props, _b = _a.style, style = _b === void 0 ? {} : _b, className = _a.className, cx = _a.classnames, src = _a.src, defaultAvatar = _a.defaultAvatar, _c = _a.icon, icon = _c === void 0 ? 'fa fa-user' : _c, fit = _a.fit, shape = _a.shape, size = _a.size, text = _a.text, gap = _a.gap, alt = _a.alt, draggable = _a.draggable, crossOrigin = _a.crossOrigin, onError = _a.onError, data = _a.data;
        var errHandler = function () { return false; };
        if (typeof onError === 'string') {
            try {
                errHandler = new Function('event', onError);
            }
            catch (e) {
                console.warn(onError, e);
            }
        }
        if (isPureVariable(src)) {
            src = resolveVariableAndFilter(src, data, '| raw');
        }
        if (isPureVariable(text)) {
            text = resolveVariableAndFilter(text, data);
        }
        if (isPureVariable(icon)) {
            icon = resolveVariableAndFilter(icon, data);
        }
        return (React.createElement(Avatar, { style: style, className: className, classnames: cx, src: src || defaultAvatar, icon: icon, fit: fit, shape: shape, size: size, text: text, gap: gap, alt: alt, draggable: draggable, crossOrigin: crossOrigin, onError: errHandler, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AvatarField.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AvatarField.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AvatarField.prototype, "handleMouseLeave", null);
    return AvatarField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(AvatarFieldRenderer, _super);
    function AvatarFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvatarFieldRenderer = __decorate([
        Renderer({
            type: 'avatar'
        })
        // @ts-ignore
        ,
        withBadge
    ], AvatarFieldRenderer);
    return AvatarFieldRenderer;
})(AvatarField));

export { AvatarField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
