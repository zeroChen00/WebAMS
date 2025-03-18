/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var amisUi = require('amis-ui');
var amisCore = require('amis-core');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var RadiosControl = /** @class */ (function (_super) {
    tslib.__extends(RadiosControl, _super);
    function RadiosControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadiosControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    RadiosControl.prototype.handleChange = function (option) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, joinValues, extractValue, valueField, onChange, dispatchEvent, options, value, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent, options = _a.options, _a.selectedOptions;
                        value = option;
                        if (option && (joinValues || extractValue)) {
                            value = option[valueField || 'value'];
                        }
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, {
                                value: value,
                                options: options,
                                items: options,
                                selectedItems: option
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange && onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    RadiosControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    RadiosControl.prototype.renderLabel = function (option, _a) {
        var labelField = _a.labelField;
        var data = this.props.data;
        var label = option[labelField || 'label'];
        return _J$X_(React__default["default"].Fragment, null, typeof label === 'string' ? amisCore.filter(label, data) : "".concat(label));
    };
    RadiosControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, value = _a.value; _a.onChange; var disabled = _a.disabled, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, placeholder = _a.placeholder, options = _a.options, _b = _a.inline, inline = _b === void 0 ? true : _b, formMode = _a.formMode, columnsCount = _a.columnsCount, classPrefix = _a.classPrefix, itemClassName = _a.itemClassName, labelClassName = _a.labelClassName, optionClassName = _a.optionClassName, labelField = _a.labelField, valueField = _a.valueField; _a.data; var __ = _a.translate, optionType = _a.optionType, level = _a.level, testIdBuilder = _a.testIdBuilder;
        return (_J$X_(amisUi.Radios, { inline: inline || formMode === 'inline', className: cx__default["default"]("".concat(ns, "RadiosControl"), className), value: typeof value === 'undefined' || value === null ? '' : value, disabled: disabled, onChange: this.handleChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, 
            /** 兼容一下错误的用法 */
            labelClassName: optionClassName !== null && optionClassName !== void 0 ? optionClassName : labelClassName, labelField: labelField, valueField: valueField, placeholder: __(placeholder), options: options, renderLabel: this.renderLabel, columnsCount: columnsCount, classPrefix: classPrefix, itemClassName: itemClassName, optionType: optionType, level: level, testIdBuilder: testIdBuilder }));
    };
    RadiosControl.defaultProps = {
        columnsCount: 1
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], RadiosControl.prototype, "handleChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], RadiosControl.prototype, "renderLabel", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], RadiosControl.prototype, "render", null);
    return RadiosControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(RadiosControlRenderer, _super);
    function RadiosControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadiosControlRenderer.defaultProps = {
        multiple: false,
        inline: true
    };
    RadiosControlRenderer = tslib.__decorate([
        amisCore.OptionsControl({
            type: 'radios',
            sizeMutable: false
        })
    ], RadiosControlRenderer);
    return RadiosControlRenderer;
})(RadiosControl));

exports["default"] = RadiosControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
