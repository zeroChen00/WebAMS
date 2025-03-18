/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __rest, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveEventData, autobind, FormItem } from 'amis-core';
import { Textarea } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var TextAreaControl = /** @class */ (function (_super) {
    __extends(TextAreaControl, _super);
    function TextAreaControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputRef = React.createRef();
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
        dispatchEvent('change', resolveEventData(this.props, { value: e }));
        onChange && onChange(e);
    };
    TextAreaControl.prototype.handleFocus = function (e) {
        var _this = this;
        var _a = this.props, onFocus = _a.onFocus, dispatchEvent = _a.dispatchEvent, value = _a.value;
        this.setState({
            focused: true
        }, function () { return __awaiter(_this, void 0, void 0, function () {
            var rendererEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dispatchEvent('focus', resolveEventData(this.props, { value: value }))];
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
        }, function () { return __awaiter(_this, void 0, void 0, function () {
            var rendererEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (trimContents && value && typeof value === 'string') {
                            onChange(value.trim());
                        }
                        return [4 /*yield*/, dispatchEvent('blur', resolveEventData(this.props, { value: value }))];
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
        return render('static-textarea', __assign({ type: 'multiline-text', maxRows: staticSchema.limit || 5 }, staticSchema), {
            value: displayValue
        });
    };
    TextAreaControl.prototype.render = function () {
        var rest = __rest(this.props, []);
        return (React.createElement(Textarea, __assign({}, rest, { forwardRef: this.inputRef, onFocus: this.handleFocus, onBlur: this.handleBlur, onChange: this.handleChange })));
    };
    TextAreaControl.defaultProps = {
        minRows: 3,
        maxRows: 20,
        trimContents: true,
        resetValue: '',
        clearable: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "handleFocus", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "handleBlur", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "render", null);
    return TextAreaControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TextAreaControlRenderer, _super);
    function TextAreaControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaControlRenderer = __decorate([
        FormItem({
            type: 'textarea'
        })
    ], TextAreaControlRenderer);
    return TextAreaControlRenderer;
})(TextAreaControl));

export { TextAreaControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
