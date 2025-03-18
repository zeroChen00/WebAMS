/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React, { Suspense } from 'react';
import { getPropValue, Renderer } from 'amis-core';

var BarCode = React.lazy(function () { return import('amis-ui/lib/components/BarCode'); });
var BarCodeField = /** @class */ (function (_super) {
    __extends(BarCodeField, _super);
    function BarCodeField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarCodeField.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style; _a.width; _a.height; var cx = _a.classnames, options = _a.options;
        var value = getPropValue(this.props);
        return (React.createElement(Suspense, { fallback: React.createElement("div", null, "...") },
            React.createElement("div", { "data-testid": "barcode", className: cx('BarCode', className), style: style },
                React.createElement(BarCode, { value: value, options: options }))));
    };
    return BarCodeField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(BarCodeFieldRenderer, _super);
    function BarCodeFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarCodeFieldRenderer = __decorate([
        Renderer({
            type: 'barcode'
        })
    ], BarCodeFieldRenderer);
    return BarCodeFieldRenderer;
})(BarCodeField));

export { BarCodeField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
