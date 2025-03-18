/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var amisUi = require('amis-ui');
var amisCore = require('amis-core');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
/** @class */ ((function (_super) {
    tslib.__extends(SpinnerRenderer, _super);
    function SpinnerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpinnerRenderer.prototype.renderBody = function () {
        var _a = this.props, body = _a.body, render = _a.render;
        return body ? render('body', body) : null;
    };
    SpinnerRenderer.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, spinnerWrapClassName = _a.spinnerWrapClassName, body = _a.body, rest = tslib.__rest(_a, ["classnames", "spinnerWrapClassName", "body"]);
        return body ? (_J$X_("div", { className: cx("Spinner-wrap", spinnerWrapClassName) },
            _J$X_(amisUi.Spinner, tslib.__assign({}, rest)),
            this.renderBody())) : (_J$X_(amisUi.Spinner, tslib.__assign({}, rest)));
    };
    SpinnerRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'spinner'
        })
    ], SpinnerRenderer);
    return SpinnerRenderer;
})(React__default["default"].Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
