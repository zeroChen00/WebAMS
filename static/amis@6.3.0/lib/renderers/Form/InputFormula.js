/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
/** @class */ ((function (_super) {
    tslib.__extends(InputFormulaRenderer, _super);
    function InputFormulaRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputFormulaRenderer.prototype.formulaRef = function (ref) {
        if (ref) {
            while (ref && ref.getWrappedInstance) {
                ref = ref.getWrappedInstance();
            }
            this.ref = ref;
        }
        else {
            this.ref = undefined;
        }
    };
    InputFormulaRenderer.prototype.validate = function () {
        var _a;
        var _b = this.props, __ = _b.translate, value = _b.value;
        if (((_a = this.ref) === null || _a === void 0 ? void 0 : _a.validate) && value) {
            var res = this.ref.validate(value);
            if (res !== true) {
                return __('FormulaEditor.invalidData', { err: res });
            }
        }
    };
    InputFormulaRenderer.prototype.render = function () {
        var _a = this.props; _a.selectedOptions; var disabled = _a.disabled, onChange = _a.onChange, evalMode = _a.evalMode, mixedMode = _a.mixedMode, variableMode = _a.variableMode, header = _a.header, label = _a.label, value = _a.value, clearable = _a.clearable, className = _a.className; _a.style; _a.classPrefix; _a.classnames; _a.allowInput; var borderMode = _a.borderMode, placeholder = _a.placeholder, inputMode = _a.inputMode, btnLabel = _a.btnLabel, level = _a.level, btnSize = _a.btnSize, icon = _a.icon, title = _a.title, variableClassName = _a.variableClassName, functionClassName = _a.functionClassName, data = _a.data, onPickerOpen = _a.onPickerOpen, selfVariableName = _a.selfVariableName; _a.popOverContainer; var env = _a.env, inputSettings = _a.inputSettings, mobileUI = _a.mobileUI;
        var _c = this.props, variables = _c.variables, functions = _c.functions;
        if (amisCore.isPureVariable(variables)) {
            // 如果 variables 是 ${xxx} 这种形式，将其处理成实际的值
            variables = amisCore.resolveVariableAndFilter(variables, this.props.data, '| raw');
        }
        if (amisCore.isPureVariable(functions)) {
            // 如果 functions 是 ${xxx} 这种形式，将其处理成实际的值
            functions = amisCore.resolveVariableAndFilter(functions, this.props.data, '| raw');
        }
        return (_J$X_(amisUi.FormulaPicker, { popOverContainer: env.getModalContainer, ref: this.formulaRef, className: className, value: value, disabled: disabled, onChange: onChange, evalMode: evalMode, variables: variables, variableMode: variableMode, functions: functions, header: header || label || '', borderMode: borderMode, placeholder: placeholder, mode: inputMode, inputSettings: inputSettings, btnLabel: btnLabel, level: level, btnSize: btnSize, icon: icon, title: title, clearable: clearable, variableClassName: variableClassName, functionClassName: functionClassName, data: data, onPickerOpen: onPickerOpen, selfVariableName: selfVariableName, mixedMode: mixedMode, mobileUI: mobileUI }));
    };
    InputFormulaRenderer.defaultProps = {
        inputMode: 'input-button',
        borderMode: 'full',
        evalMode: true
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], InputFormulaRenderer.prototype, "formulaRef", null);
    InputFormulaRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-formula'
        })
    ], InputFormulaRenderer);
    return InputFormulaRenderer;
})(React__default["default"].Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
