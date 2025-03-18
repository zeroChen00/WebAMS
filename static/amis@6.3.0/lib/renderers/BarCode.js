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
var BarCode = React__default["default"].lazy(function () { return Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['amis-ui/lib/components/BarCode'], function(mod) {fullfill(tslib.__importStar(mod))})})}); });
var BarCodeField = /** @class */ (function (_super) {
    tslib.__extends(BarCodeField, _super);
    function BarCodeField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarCodeField.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style; _a.width; _a.height; var cx = _a.classnames, options = _a.options;
        var value = amisCore.getPropValue(this.props);
        return (_J$X_(React.Suspense, { fallback: _J$X_("div", null, "...") },
            _J$X_("div", { "data-testid": "barcode", className: cx('BarCode', className), style: style },
                _J$X_(BarCode, { value: value, options: options }))));
    };
    return BarCodeField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(BarCodeFieldRenderer, _super);
    function BarCodeFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarCodeFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'barcode'
        })
    ], BarCodeFieldRenderer);
    return BarCodeFieldRenderer;
})(BarCodeField));

exports.BarCodeField = BarCodeField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
