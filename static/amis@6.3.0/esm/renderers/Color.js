/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { getPropValue, Renderer } from 'amis-core';

var ColorField = /** @class */ (function (_super) {
    __extends(ColorField, _super);
    function ColorField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorField.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, cx = _a.classnames, defaultColor = _a.defaultColor, showValue = _a.showValue;
        var color = getPropValue(this.props) || defaultColor;
        return (React.createElement("div", { className: cx('ColorField', className), style: style },
            React.createElement("i", { className: cx('ColorField-previewIcon'), style: { backgroundColor: color } }),
            showValue && color ? (React.createElement("span", { className: cx('ColorField-value') }, color)) : null));
    };
    ColorField.defaultProps = {
        className: '',
        defaultColor: '',
        showValue: true
    };
    return ColorField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ColorFieldRenderer, _super);
    function ColorFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorFieldRenderer = __decorate([
        Renderer({
            type: 'color'
        })
    ], ColorFieldRenderer);
    return ColorFieldRenderer;
})(ColorField));

export { ColorField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
