/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var pick = require('lodash/pick');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var JSONSchemaEditorControl = /** @class */ (function (_super) {
    tslib.__extends(JSONSchemaEditorControl, _super);
    function JSONSchemaEditorControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONSchemaEditorControl.prototype.normalizePlaceholder = function () {
        var placeholder = this.props.placeholder;
        if (amisCore.isObject(placeholder)) {
            return tslib.__assign(tslib.__assign({}, amisUi.schemaEditorItemPlaceholder), pick__default["default"](placeholder, [
                'key',
                'title',
                'description',
                'default',
                'empty'
            ]));
        }
        return amisUi.schemaEditorItemPlaceholder;
    };
    JSONSchemaEditorControl.prototype.renderModalProps = function (value, onChange) {
        var _a = this.props, render = _a.render, advancedSettings = _a.advancedSettings;
        var fields = (advancedSettings === null || advancedSettings === void 0 ? void 0 : advancedSettings[value === null || value === void 0 ? void 0 : value.type]) || [];
        return render("modal", {
            type: 'form',
            wrapWithPanel: false,
            body: fields,
            submitOnChange: true
        }, {
            data: value,
            onSubmit: function (value) { return onChange(value); }
        });
    };
    JSONSchemaEditorControl.prototype.render = function () {
        var _a = this.props, enableAdvancedSetting = _a.enableAdvancedSetting, mobileUI = _a.mobileUI, env = _a.env, rest = tslib.__rest(_a, ["enableAdvancedSetting", "mobileUI", "env"]);
        return (_J$X_(amisUi.JSONSchemaEditor, tslib.__assign({}, rest, { mobileUI: mobileUI, placeholder: this.normalizePlaceholder(), enableAdvancedSetting: enableAdvancedSetting, renderModalProps: this.renderModalProps, popOverContainer: mobileUI
                ? env === null || env === void 0 ? void 0 : env.getModalContainer
                : rest.popOverContainer || env.getModalContainer })));
    };
    JSONSchemaEditorControl.defaultProps = {
        enableAdvancedSetting: false,
        placeholder: amisUi.schemaEditorItemPlaceholder
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Function]),
        tslib.__metadata("design:returntype", void 0)
    ], JSONSchemaEditorControl.prototype, "renderModalProps", null);
    return JSONSchemaEditorControl;
}(React__default["default"].PureComponent));
/** @class */ ((function (_super) {
    tslib.__extends(JSONSchemaEditorRenderer, _super);
    function JSONSchemaEditorRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONSchemaEditorRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'json-schema-editor'
        })
    ], JSONSchemaEditorRenderer);
    return JSONSchemaEditorRenderer;
})(JSONSchemaEditorControl));

exports["default"] = JSONSchemaEditorControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
