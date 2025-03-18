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
var PasswordField = /** @class */ (function (_super) {
    tslib.__extends(PasswordField, _super);
    function PasswordField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: false
        };
        return _this;
    }
    PasswordField.prototype.toggleVisible = function () {
        this.setState({
            visible: !this.state.visible
        });
    };
    PasswordField.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, style = _a.style, _b = _a.mosaicText, mosaicText = _b === void 0 ? '********' : _b, value = _a.value;
        return (_J$X_("span", { className: cx('Password-field', className), style: style },
            this.state.visible ? value : mosaicText,
            this.state.visible
                ? _J$X_(amisUi.Icon, { icon: "view", className: "icon", onClick: this.toggleVisible })
                : _J$X_(amisUi.Icon, { icon: "invisible", className: "icon", onClick: this.toggleVisible })));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], PasswordField.prototype, "toggleVisible", null);
    return PasswordField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(PasswordFieldRenderer, _super);
    function PasswordFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'password'
        })
    ], PasswordFieldRenderer);
    return PasswordFieldRenderer;
})(PasswordField));

exports.PasswordField = PasswordField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
