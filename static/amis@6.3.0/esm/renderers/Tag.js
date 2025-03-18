/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { isPureVariable, resolveVariableAndFilter, getPropValue, createObject, autobind, Renderer } from 'amis-core';
import { Tag } from 'amis-ui';

var TagField = /** @class */ (function (_super) {
    __extends(TagField, _super);
    function TagField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TagField.prototype.handleClick = function (nativeEvent) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, onClick = _a.onClick;
        var params = this.getResolvedEventParams();
        dispatchEvent(nativeEvent, params);
        onClick === null || onClick === void 0 ? void 0 : onClick(params);
    };
    TagField.prototype.handleMouseEnter = function (e) {
        var dispatchEvent = this.props.dispatchEvent;
        var params = this.getResolvedEventParams();
        dispatchEvent(e, params);
    };
    TagField.prototype.handleMouseLeave = function (e) {
        var dispatchEvent = this.props.dispatchEvent;
        var params = this.getResolvedEventParams();
        dispatchEvent(e, params);
    };
    TagField.prototype.handleClose = function (nativeEvent) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, onClose = _a.onClose;
        var params = this.getResolvedEventParams();
        dispatchEvent(__assign(__assign({}, nativeEvent), { type: 'close' }), params);
        onClose === null || onClose === void 0 ? void 0 : onClose(params);
    };
    TagField.prototype.render = function () {
        var _a = this.props, icon = _a.icon, displayMode = _a.displayMode, color = _a.color, className = _a.className, closable = _a.closable, data = _a.data, _b = _a.style, style = _b === void 0 ? {} : _b;
        var label = this.resolveLabel();
        if (isPureVariable(icon)) {
            icon = resolveVariableAndFilter(icon, data);
        }
        if (isPureVariable(displayMode)) {
            displayMode = resolveVariableAndFilter(displayMode, data);
        }
        if (isPureVariable(color)) {
            color = resolveVariableAndFilter(color, data);
        }
        return (React.createElement(Tag, { className: className, displayMode: displayMode, color: color, icon: icon, closable: closable, style: style, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onClose: this.handleClose }, label));
    };
    TagField.prototype.resolveLabel = function () {
        var _a = this.props, label = _a.label, data = _a.data;
        return (getPropValue(this.props) ||
            (label ? resolveVariableAndFilter(label, data, '| raw') : null));
    };
    TagField.prototype.getResolvedEventParams = function () {
        var data = this.props.data;
        return createObject(data, {
            label: this.resolveLabel()
        });
    };
    TagField.defaultProps = {
        displayMode: 'normal'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TagField.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TagField.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TagField.prototype, "handleMouseLeave", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TagField.prototype, "handleClose", null);
    return TagField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TagFieldRenderer, _super);
    function TagFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TagFieldRenderer = __decorate([
        Renderer({
            type: 'tag'
        })
    ], TagFieldRenderer);
    return TagFieldRenderer;
})(TagField));

export { TagField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
