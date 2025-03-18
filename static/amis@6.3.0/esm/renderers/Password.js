/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate, __metadata } from 'tslib';
import React from 'react';
import { autobind, Renderer } from 'amis-core';
import { Icon } from 'amis-ui';

var PasswordField = /** @class */ (function (_super) {
    __extends(PasswordField, _super);
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
        return (React.createElement("span", { className: cx('Password-field', className), style: style },
            this.state.visible ? value : mosaicText,
            this.state.visible
                ? React.createElement(Icon, { icon: "view", className: "icon", onClick: this.toggleVisible })
                : React.createElement(Icon, { icon: "invisible", className: "icon", onClick: this.toggleVisible })));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PasswordField.prototype, "toggleVisible", null);
    return PasswordField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(PasswordFieldRenderer, _super);
    function PasswordFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordFieldRenderer = __decorate([
        Renderer({
            type: 'password'
        })
    ], PasswordFieldRenderer);
    return PasswordFieldRenderer;
})(PasswordField));

export { PasswordField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
