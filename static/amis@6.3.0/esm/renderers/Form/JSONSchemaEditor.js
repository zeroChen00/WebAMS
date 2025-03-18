/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __rest, __decorate, __metadata } from 'tslib';
import React from 'react';
import pick from 'lodash/pick';
import { isObject, autobind, FormItem } from 'amis-core';
import { schemaEditorItemPlaceholder, JSONSchemaEditor } from 'amis-ui';

var JSONSchemaEditorControl = /** @class */ (function (_super) {
    __extends(JSONSchemaEditorControl, _super);
    function JSONSchemaEditorControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONSchemaEditorControl.prototype.normalizePlaceholder = function () {
        var placeholder = this.props.placeholder;
        if (isObject(placeholder)) {
            return __assign(__assign({}, schemaEditorItemPlaceholder), pick(placeholder, [
                'key',
                'title',
                'description',
                'default',
                'empty'
            ]));
        }
        return schemaEditorItemPlaceholder;
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
        var _a = this.props, enableAdvancedSetting = _a.enableAdvancedSetting, mobileUI = _a.mobileUI, env = _a.env, rest = __rest(_a, ["enableAdvancedSetting", "mobileUI", "env"]);
        return (React.createElement(JSONSchemaEditor, __assign({}, rest, { mobileUI: mobileUI, placeholder: this.normalizePlaceholder(), enableAdvancedSetting: enableAdvancedSetting, renderModalProps: this.renderModalProps, popOverContainer: mobileUI
                ? env === null || env === void 0 ? void 0 : env.getModalContainer
                : rest.popOverContainer || env.getModalContainer })));
    };
    JSONSchemaEditorControl.defaultProps = {
        enableAdvancedSetting: false,
        placeholder: schemaEditorItemPlaceholder
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Function]),
        __metadata("design:returntype", void 0)
    ], JSONSchemaEditorControl.prototype, "renderModalProps", null);
    return JSONSchemaEditorControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(JSONSchemaEditorRenderer, _super);
    function JSONSchemaEditorRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONSchemaEditorRenderer = __decorate([
        FormItem({
            type: 'json-schema-editor'
        })
    ], JSONSchemaEditorRenderer);
    return JSONSchemaEditorRenderer;
})(JSONSchemaEditorControl));

export { JSONSchemaEditorControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
