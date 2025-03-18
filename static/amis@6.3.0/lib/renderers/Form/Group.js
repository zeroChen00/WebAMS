/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
/** @class */ ((function (_super) {
    tslib.__extends(ControlGroupRenderer, _super);
    function ControlGroupRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.renderInput = _this.renderInput.bind(_this);
        return _this;
    }
    ControlGroupRenderer.prototype.renderControl = function (control, index, otherProps) {
        var _a = this.props, render = _a.render, disabled = _a.disabled; _a.data; var mode = _a.mode, horizontal = _a.horizontal, formMode = _a.formMode, formHorizontal = _a.formHorizontal, subFormMode = _a.subFormMode, subFormHorizontal = _a.subFormHorizontal;
        if (!control) {
            return null;
        }
        var subSchema = control;
        return render("".concat(index), subSchema, tslib.__assign({ disabled: control.disabled || disabled, formMode: subFormMode || mode || formMode, formHorizontal: subFormHorizontal || horizontal || formHorizontal }, otherProps));
    };
    ControlGroupRenderer.prototype.renderVertical = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        var body = props.body, className = props.className; props.style; var cx = props.classnames, mode = props.mode, formMode = props.formMode, data = props.data;
        formMode = mode || formMode;
        if (!Array.isArray(body)) {
            return null;
        }
        return (_J$X_("div", { className: cx("Form-group Form-group--ver Form-group--".concat(formMode), className) }, body.map(function (control, index) {
            var _a;
            if (!amisCore.isVisible(control, data)) {
                return null;
            }
            return _this.renderControl(control, index, {
                key: "".concat((_a = control.name) !== null && _a !== void 0 ? _a : '', "-").concat(index)
            });
        })));
    };
    ControlGroupRenderer.prototype.renderHorizontal = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        var body = props.body, className = props.className; props.style; var ns = props.classPrefix, cx = props.classnames, mode = props.mode, horizontal = props.horizontal, formMode = props.formMode, formHorizontal = props.formHorizontal, subFormMode = props.subFormMode, subFormHorizontal = props.subFormHorizontal, data = props.data, gap = props.gap;
        if (!Array.isArray(body)) {
            return null;
        }
        formMode = subFormMode || mode || formMode;
        var horizontalDeeper = subFormHorizontal ||
            horizontal ||
            (formHorizontal
                ? amisCore.makeHorizontalDeeper(formHorizontal, body.filter(function (item) {
                    return (item === null || item === void 0 ? void 0 : item.mode) !== 'inline' &&
                        amisCore.isVisible(item, data);
                }).length)
                : undefined);
        return (_J$X_("div", { className: cx("Form-group Form-group--hor Form-group--".concat(formMode), gap ? "Form-group--".concat(gap) : '', className) }, body.map(function (control, index) {
            var _a, _b;
            if (!amisCore.isVisible(control, data)) {
                return null;
            }
            var controlMode = (control === null || control === void 0 ? void 0 : control.mode) || formMode;
            if (controlMode === 'inline' ||
                // hidden 直接渲染，否则会有个空 Form-groupColumn 层
                ((control === null || control === void 0 ? void 0 : control.type) &&
                    ['formula', 'hidden'].includes(control.type))) {
                return _this.renderControl(control, index, {
                    key: "".concat((_a = control.name) !== null && _a !== void 0 ? _a : '', "-").concat(index),
                    className: cx(control.className, control.columnClassName)
                });
            }
            var columnWidth = control.columnRatio ||
                amisCore.getWidthRate(control && control.columnClassName, true);
            return (_J$X_("div", { key: index, className: cx("".concat(ns, "Form-groupColumn"), columnWidth ? "".concat(ns, "Form-groupColumn--").concat(columnWidth) : '', control && control.columnClassName) }, _this.renderControl(control, index, {
                key: "".concat((_b = control.name) !== null && _b !== void 0 ? _b : '', "-").concat(index),
                formHorizontal: horizontalDeeper,
                formMode: controlMode
            })));
        })));
    };
    ControlGroupRenderer.prototype.renderInput = function (props) {
        if (props === void 0) { props = this.props; }
        var direction = props.direction;
        return direction === 'vertical'
            ? this.renderVertical(props)
            : this.renderHorizontal(props);
    };
    ControlGroupRenderer.prototype.render = function () {
        var _a = this.props, label = _a.label, rest = tslib.__rest(_a, ["label"]);
        if (typeof label !== 'undefined') {
            return (_J$X_(amisCore.FormItemWrap, tslib.__assign({}, rest, { sizeMutable: false, label: label, renderControl: this.renderInput })));
        }
        return this.renderInput();
    };
    ControlGroupRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'group'
        }),
        tslib.__metadata("design:paramtypes", [Object])
    ], ControlGroupRenderer);
    return ControlGroupRenderer;
})(React__default["default"].Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
