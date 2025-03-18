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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var TagField = /** @class */ (function (_super) {
    tslib.__extends(TagField, _super);
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
        dispatchEvent(tslib.__assign(tslib.__assign({}, nativeEvent), { type: 'close' }), params);
        onClose === null || onClose === void 0 ? void 0 : onClose(params);
    };
    TagField.prototype.render = function () {
        var _a = this.props, icon = _a.icon, displayMode = _a.displayMode, color = _a.color, className = _a.className, closable = _a.closable, data = _a.data, _b = _a.style, style = _b === void 0 ? {} : _b;
        var label = this.resolveLabel();
        if (amisCore.isPureVariable(icon)) {
            icon = amisCore.resolveVariableAndFilter(icon, data);
        }
        if (amisCore.isPureVariable(displayMode)) {
            displayMode = amisCore.resolveVariableAndFilter(displayMode, data);
        }
        if (amisCore.isPureVariable(color)) {
            color = amisCore.resolveVariableAndFilter(color, data);
        }
        return (_J$X_(amisUi.Tag, { className: className, displayMode: displayMode, color: color, icon: icon, closable: closable, style: style, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onClose: this.handleClose }, label));
    };
    TagField.prototype.resolveLabel = function () {
        var _a = this.props, label = _a.label, data = _a.data;
        return (amisCore.getPropValue(this.props) ||
            (label ? amisCore.resolveVariableAndFilter(label, data, '| raw') : null));
    };
    TagField.prototype.getResolvedEventParams = function () {
        var data = this.props.data;
        return amisCore.createObject(data, {
            label: this.resolveLabel()
        });
    };
    TagField.defaultProps = {
        displayMode: 'normal'
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TagField.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TagField.prototype, "handleMouseEnter", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TagField.prototype, "handleMouseLeave", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TagField.prototype, "handleClose", null);
    return TagField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(TagFieldRenderer, _super);
    function TagFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TagFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'tag'
        })
    ], TagFieldRenderer);
    return TagFieldRenderer;
})(TagField));

exports.TagField = TagField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
