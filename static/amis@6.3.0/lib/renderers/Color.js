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
var ColorField = /** @class */ (function (_super) {
    tslib.__extends(ColorField, _super);
    function ColorField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorField.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, cx = _a.classnames, defaultColor = _a.defaultColor, showValue = _a.showValue;
        var color = amisCore.getPropValue(this.props) || defaultColor;
        return (_J$X_("div", { className: cx('ColorField', className), style: style },
            _J$X_("i", { className: cx('ColorField-previewIcon'), style: { backgroundColor: color } }),
            showValue && color ? (_J$X_("span", { className: cx('ColorField-value') }, color)) : null));
    };
    ColorField.defaultProps = {
        className: '',
        defaultColor: '',
        showValue: true
    };
    return ColorField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(ColorFieldRenderer, _super);
    function ColorFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'color'
        })
    ], ColorFieldRenderer);
    return ColorFieldRenderer;
})(ColorField));

exports.ColorField = ColorField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
