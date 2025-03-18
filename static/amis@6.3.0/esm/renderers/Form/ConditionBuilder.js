/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { evalExpression, createObject, isPureVariable, resolveVariableAndFilter, isMobile, autobind, FormItem } from 'amis-core';
import { withRemoteConfig, ConditionBuilder } from 'amis-ui';

var ConditionBuilderControl = /** @class */ (function (_super) {
    __extends(ConditionBuilderControl, _super);
    function ConditionBuilderControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConditionBuilderControl.prototype.renderEtrValue = function (schema, props) {
        return this.props.render('inline', Object.assign({}, schema, {
            label: false,
            inputOnly: true,
            changeImmediately: true
        }), props);
    };
    ConditionBuilderControl.prototype.renderPickerIcon = function () {
        var _a = this.props, render = _a.render, pickerIcon = _a.pickerIcon;
        return pickerIcon ? render('picker-icon', pickerIcon) : undefined;
    };
    ConditionBuilderControl.prototype.getAddBtnVisible = function (param) {
        var _a = this.props, data = _a.data, addBtnVisibleOn = _a.addBtnVisibleOn;
        if (typeof addBtnVisibleOn === 'string' && addBtnVisibleOn) {
            return evalExpression(addBtnVisibleOn, createObject(data, param));
        }
        return true;
    };
    ConditionBuilderControl.prototype.getAddGroupBtnVisible = function (param) {
        var _a = this.props, data = _a.data, addGroupBtnVisibleOn = _a.addGroupBtnVisibleOn;
        if (typeof addGroupBtnVisibleOn === 'string' && addGroupBtnVisibleOn) {
            return evalExpression(addGroupBtnVisibleOn, createObject(data, param));
        }
        return true;
    };
    ConditionBuilderControl.prototype.validate = function () {
        var _a;
        var _b = this.props, value = _b.value, required = _b.required, __ = _b.translate;
        // 校验必填
        // 只要存在不为空条件即可通过校验
        if (required) {
            if (!value || !value.children) {
                return __('Condition.isRequired');
            }
            var isEmpty_1 = true;
            var allowRightEmpty_1 = ['is_empty', 'is_not_empty'];
            (_a = value === null || value === void 0 ? void 0 : value.children) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                // 如果左侧、操作符为空，必填不通过
                if (item.op &&
                    (item.right || !!~allowRightEmpty_1.indexOf(item.op))) {
                    isEmpty_1 = false;
                    return;
                }
            });
            return isEmpty_1 ? __('Condition.isRequired') : null;
        }
        return;
    };
    ConditionBuilderControl.prototype.render = function () {
        var _a = this.props, className = _a.className, cx = _a.classnames; _a.style; _a.pickerIcon; var env = _a.env, popOverContainer = _a.popOverContainer, rest = __rest(_a, ["className", "classnames", "style", "pickerIcon", "env", "popOverContainer"]);
        // 处理一下formula类型值的变量列表
        var formula = this.props.formula ? __assign({}, this.props.formula) : undefined;
        if (formula && formula.variables && isPureVariable(formula.variables)) {
            // 如果 variables 是 ${xxx} 这种形式，将其处理成实际的值
            formula.variables = resolveVariableAndFilter(formula.variables, this.props.data, '| raw');
        }
        return (React.createElement("div", { className: cx("ConditionBuilderControl", { 'is-mobile': isMobile() }, className) },
            React.createElement(ConditionBuilderWithRemoteOptions, __assign({ renderEtrValue: this.renderEtrValue, pickerIcon: this.renderPickerIcon(), isAddBtnVisibleOn: this.getAddBtnVisible, isAddGroupBtnVisibleOn: this.getAddGroupBtnVisible, popOverContainer: popOverContainer || env.getModalContainer }, rest, { formula: formula }))));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ConditionBuilderControl.prototype, "renderEtrValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ConditionBuilderControl.prototype, "getAddBtnVisible", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ConditionBuilderControl.prototype, "getAddGroupBtnVisible", null);
    return ConditionBuilderControl;
}(React.PureComponent));
var ConditionBuilderWithRemoteOptions = withRemoteConfig({
    adaptor: function (data) { return data.fields || data; }
})(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        var _a = this.props, loading = _a.loading, config = _a.config; _a.deferLoad; var disabled = _a.disabled, renderEtrValue = _a.renderEtrValue, rest = __rest(_a, ["loading", "config", "deferLoad", "disabled", "renderEtrValue"]);
        return (React.createElement(ConditionBuilder, __assign({}, rest, { fields: config || rest.fields || [], disabled: disabled || loading, renderEtrValue: renderEtrValue })));
    };
    return class_1;
}(React.Component)));
/** @class */ ((function (_super) {
    __extends(ConditionBuilderRenderer, _super);
    function ConditionBuilderRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConditionBuilderRenderer = __decorate([
        FormItem({
            type: 'condition-builder',
            strictMode: false
        })
    ], ConditionBuilderRenderer);
    return ConditionBuilderRenderer;
})(ConditionBuilderControl));

export { ConditionBuilderControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
