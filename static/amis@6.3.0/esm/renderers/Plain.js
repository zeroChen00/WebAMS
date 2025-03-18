/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate, __metadata } from 'tslib';
import React from 'react';
import { createObject, getPropValue, filter, autobind, Renderer } from 'amis-core';

var Plain = /** @class */ (function (_super) {
    __extends(Plain, _super);
    function Plain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plain.prototype.handleClick = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent('click', createObject(data, {
            nativeEvent: e
        }));
    };
    Plain.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, createObject(data, {
            nativeEvent: e
        }));
    };
    Plain.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, createObject(data, {
            nativeEvent: e
        }));
    };
    Plain.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, wrapperComponent = _a.wrapperComponent, text = _a.text, data = _a.data, tpl = _a.tpl, inline = _a.inline, placeholder = _a.placeholder, cx = _a.classnames;
        var value = getPropValue(this.props);
        var Component = wrapperComponent || (inline ? 'span' : 'div');
        return (React.createElement(Component, { className: cx('PlainField', className), style: style, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, tpl || text ? (filter(tpl || text, data)) : typeof value === 'undefined' || value === '' || value === null ? (React.createElement("span", { className: "text-muted" }, placeholder)) : (String(value))));
    };
    Plain.defaultProps = {
        wrapperComponent: '',
        inline: true,
        placeholder: '-'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Plain.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Plain.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Plain.prototype, "handleMouseLeave", null);
    return Plain;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(PlainRenderer, _super);
    function PlainRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlainRenderer = __decorate([
        Renderer({
            test: /(^|\/)(?:plain|text)$/,
            name: 'plain'
        })
    ], PlainRenderer);
    return PlainRenderer;
})(Plain));

export { Plain };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
