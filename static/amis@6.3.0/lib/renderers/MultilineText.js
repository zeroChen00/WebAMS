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
var MultilineTextField = /** @class */ (function (_super) {
    tslib.__extends(MultilineTextField, _super);
    function MultilineTextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultilineTextField.prototype.render = function () {
        var text = amisCore.getPropValue(this.props, function (props) {
            return props.text ? amisCore.filter(props.text, props.data, '| raw') : undefined;
        });
        return _J$X_(amisUi.MultilineText, tslib.__assign({}, this.props, { text: text }));
    };
    return MultilineTextField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(MultilineTextFieldRenderer, _super);
    function MultilineTextFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultilineTextFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'multiline-text'
        })
    ], MultilineTextFieldRenderer);
    return MultilineTextFieldRenderer;
})(MultilineTextField));

exports.MultilineTextField = MultilineTextField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
