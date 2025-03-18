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
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var TextAreaControl = /** @class */ (function (_super) {
    tslib.__extends(TextAreaControl, _super);
    function TextAreaControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputRef = React__default["default"].createRef();
        return _this;
    }
    TextAreaControl.prototype.doAction = function (action, data, throwErrors, args) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var onChange = this.props.onChange;
        if (!!~['clear', 'reset'].indexOf(actionType)) {
            onChange === null || onChange === void 0 ? void 0 : onChange(this.props.resetValue);
            this.focus();
        }
        else if (actionType === 'focus') {
            this.focus();
        }
    };
    TextAreaControl.prototype.focus = function () {
        var _a;
        (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    TextAreaControl.prototype.handleChange = function (e) {
        var _a = this.props, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent;
        dispatchEvent('change', amisCore.resolveEventData(this.props, { value: e }));
        onChange && onChange(e);
    };
    TextAreaControl.prototype.handleFocus = function (e) {
        var _this = this;
        var _a = this.props, onFocus = _a.onFocus, dispatchEvent = _a.dispatchEvent, value = _a.value;
        this.setState({
            focused: true
        }, function () { return tslib.__awaiter(_this, void 0, void 0, function () {
            var rendererEvent;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dispatchEvent('focus', amisCore.resolveEventData(this.props, { value: value }))];
                    case 1:
                        rendererEvent = _a.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onFocus && onFocus(e);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    TextAreaControl.prototype.handleBlur = function (e) {
        var _this = this;
        var _a = this.props, onBlur = _a.onBlur, trimContents = _a.trimContents, value = _a.value, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent;
        this.setState({
            focused: false
        }, function () { return tslib.__awaiter(_this, void 0, void 0, function () {
            var rendererEvent;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (trimContents && value && typeof value === 'string') {
                            onChange(value.trim());
                        }
                        return [4 /*yield*/, dispatchEvent('blur', amisCore.resolveEventData(this.props, { value: value }))];
                    case 1:
                        rendererEvent = _a.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onBlur && onBlur(e);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    TextAreaControl.prototype.renderStatic = function (displayValue) {
        if (displayValue === void 0) { displayValue = '-'; }
        var _a = this.props, render = _a.render, _b = _a.staticSchema, staticSchema = _b === void 0 ? {} : _b;
        return render('static-textarea', tslib.__assign({ type: 'multiline-text', maxRows: staticSchema.limit || 5 }, staticSchema), {
            value: displayValue
        });
    };
    TextAreaControl.prototype.render = function () {
        var rest = tslib.__rest(this.props, []);
        return (_J$X_(amisUi.Textarea, tslib.__assign({}, rest, { forwardRef: this.inputRef, onFocus: this.handleFocus, onBlur: this.handleBlur, onChange: this.handleChange })));
    };
    TextAreaControl.defaultProps = {
        minRows: 3,
        maxRows: 20,
        trimContents: true,
        resetValue: '',
        clearable: false
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "handleChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "handleFocus", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "handleBlur", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "render", null);
    return TextAreaControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(TextAreaControlRenderer, _super);
    function TextAreaControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'textarea'
        })
    ], TextAreaControlRenderer);
    return TextAreaControlRenderer;
})(TextAreaControl));

exports["default"] = TextAreaControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
