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
var OperationField = /** @class */ (function (_super) {
    tslib.__extends(OperationField, _super);
    function OperationField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OperationField.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, buttons = _a.buttons, render = _a.render, cx = _a.classnames;
        return (_J$X_("div", { className: cx('OperationField', className), style: style }, Array.isArray(buttons)
            ? buttons.map(function (button, index) {
                return render("".concat(index), tslib.__assign({ type: 'button', size: button.size || 'sm', level: button.level ||
                        (button.icon && !button.label ? 'link' : '') }, button), {
                    key: index
                });
            })
            : null));
    };
    OperationField.propsList = ['buttons', 'label'];
    OperationField.defaultProps = {};
    return OperationField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(OperationFieldRenderer, _super);
    function OperationFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OperationFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'operation'
        })
    ], OperationFieldRenderer);
    return OperationFieldRenderer;
})(OperationField));

exports.OperationField = OperationField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
