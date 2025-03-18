/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate, __metadata } from 'tslib';
import React, { Suspense } from 'react';
import cx from 'classnames';
import { FormItem } from 'amis-core';
import { supportStatic } from './StaticHoc.js';

// todo amis-ui 里面组件直接改成按需加载
var ColorPicker = React.lazy(function () { return import('amis-ui/lib/components/ColorPicker'); });
var ColorControl = /** @class */ (function (_super) {
    __extends(ColorControl, _super);
    function ColorControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false
        };
        return _this;
    }
    ColorControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, value = _a.value, env = _a.env; _a.static; var mobileUI = _a.mobileUI, rest = __rest(_a, ["className", "style", "classPrefix", "value", "env", "static", "mobileUI"]);
        return (React.createElement("div", { className: cx("".concat(ns, "ColorControl"), className) },
            React.createElement(Suspense, { fallback: React.createElement("div", null, "...") },
                React.createElement(ColorPicker, __assign({ classPrefix: ns }, rest, { mobileUI: mobileUI, popOverContainer: mobileUI
                        ? env === null || env === void 0 ? void 0 : env.getModalContainer
                        : rest.popOverContainer || env.getModalContainer, value: value || '' })))));
    };
    ColorControl.defaultProps = {
        format: 'hex',
        clearable: true
    };
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ColorControl.prototype, "render", null);
    return ColorControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(ColorControlRenderer, _super);
    function ColorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorControlRenderer = __decorate([
        FormItem({
            type: 'input-color'
        })
    ], ColorControlRenderer);
    return ColorControlRenderer;
})(ColorControl));

export { ColorPicker, ColorControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
