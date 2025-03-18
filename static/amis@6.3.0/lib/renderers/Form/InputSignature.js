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
var pick = require('lodash/pick');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var InputSignatureComp = /** @class */ (function (_super) {
    tslib.__extends(InputSignatureComp, _super);
    function InputSignatureComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputSignatureComp.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, onChange = _a.onChange;
        var props = pick__default["default"](this.props, [
            'value',
            'width',
            'height',
            'mobileUI',
            'embed',
            'color',
            'bgColor',
            'clearBtnLabel',
            'clearBtnIcon',
            'undoBtnLabel',
            'undoBtnIcon',
            'confirmBtnLabel',
            'confirmBtnIcon',
            'embedConfirmLabel',
            'embedConfirmIcon',
            'ebmedCancelLabel',
            'ebmedCancelIcon',
            'embedBtnIcon',
            'embedBtnLabel'
        ]);
        return (_J$X_(amisUi.Signature, tslib.__assign({ classnames: cx, className: className, onChange: onChange }, props)));
    };
    return InputSignatureComp;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(InputSignatureRenderer, _super);
    function InputSignatureRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    InputSignatureRenderer.prototype.componentWillUnmount = function () {
        var _a;
        (_a = _super.prototype.componentWillUnmount) === null || _a === void 0 ? void 0 : _a.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    InputSignatureRenderer.contextType = amisCore.ScopedContext;
    InputSignatureRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-signature',
            sizeMutable: false
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], InputSignatureRenderer);
    return InputSignatureRenderer;
})(InputSignatureComp));

exports["default"] = InputSignatureComp;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
