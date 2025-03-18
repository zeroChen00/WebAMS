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
var cx = require('classnames');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var VBox = /** @class */ (function (_super) {
    tslib.__extends(VBox, _super);
    function VBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VBox.prototype.renderChild = function (region, node) {
        var render = this.props.render;
        return render(region, node);
    };
    VBox.prototype.renderCell = function (row, key) {
        var ns = this.props.classPrefix;
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "Vbox-cell"), row.cellClassName) }, this.renderChild("row/".concat(key), row)));
    };
    VBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, rows = _a.rows, ns = _a.classPrefix;
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "Vbox"), className), style: style }, Array.isArray(rows)
            ? rows.map(function (row, key) { return (_J$X_("div", { className: cx__default["default"]('row-row', row.rowClassName), key: key }, _this.renderCell(row, key))); })
            : null));
    };
    VBox.propsList = ['rows'];
    VBox.defaultProps = {};
    return VBox;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(VBoxRenderer, _super);
    function VBoxRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VBoxRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'vbox'
        })
    ], VBoxRenderer);
    return VBoxRenderer;
})(VBox));

exports["default"] = VBox;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
