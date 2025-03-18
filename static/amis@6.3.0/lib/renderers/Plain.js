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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Plain = /** @class */ (function (_super) {
    tslib.__extends(Plain, _super);
    function Plain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plain.prototype.handleClick = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent('click', amisCore.createObject(data, {
            nativeEvent: e
        }));
    };
    Plain.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, amisCore.createObject(data, {
            nativeEvent: e
        }));
    };
    Plain.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, amisCore.createObject(data, {
            nativeEvent: e
        }));
    };
    Plain.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, wrapperComponent = _a.wrapperComponent, text = _a.text, data = _a.data, tpl = _a.tpl, inline = _a.inline, placeholder = _a.placeholder, cx = _a.classnames;
        var value = amisCore.getPropValue(this.props);
        var Component = wrapperComponent || (inline ? 'span' : 'div');
        return (_J$X_(Component, { className: cx('PlainField', className), style: style, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, tpl || text ? (amisCore.filter(tpl || text, data)) : typeof value === 'undefined' || value === '' || value === null ? (_J$X_("span", { className: "text-muted" }, placeholder)) : (String(value))));
    };
    Plain.defaultProps = {
        wrapperComponent: '',
        inline: true,
        placeholder: '-'
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Plain.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Plain.prototype, "handleMouseEnter", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Plain.prototype, "handleMouseLeave", null);
    return Plain;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(PlainRenderer, _super);
    function PlainRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlainRenderer = tslib.__decorate([
        amisCore.Renderer({
            test: /(^|\/)(?:plain|text)$/,
            name: 'plain'
        })
    ], PlainRenderer);
    return PlainRenderer;
})(Plain));

exports.Plain = Plain;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
