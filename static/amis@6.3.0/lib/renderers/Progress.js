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
var isEqual = require('lodash/isEqual');
var pick = require('lodash/pick');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var COMPARE_KEYS = ['name', 'value', 'data', 'defaultValue'];
var ProgressField = /** @class */ (function (_super) {
    tslib.__extends(ProgressField, _super);
    function ProgressField(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: _this.getValue()
        };
        return _this;
    }
    ProgressField.prototype.componentDidUpdate = function (prevProps) {
        if (!isEqual__default["default"](pick__default["default"](prevProps, COMPARE_KEYS), pick__default["default"](this.props, COMPARE_KEYS))) {
            this.setState({ value: this.getValue() });
        }
    };
    ProgressField.prototype.getValue = function () {
        var value = amisCore.getPropValue(this.props);
        value = typeof value === 'number' ? value : amisCore.filter(value, this.props.data);
        if (/^\d*\.?\d+$/.test(value)) {
            value = parseFloat(value);
        }
        return value;
    };
    ProgressField.prototype.format = function (value) {
        var _a = this.props, valueTpl = _a.valueTpl, render = _a.render, data = _a.data;
        return render("progress-value", valueTpl || '${value}%', {
            data: amisCore.createObject(data, { value: value })
        });
    };
    ProgressField.prototype.render = function () {
        var _a = this.props, data = _a.data, mode = _a.mode, className = _a.className, style = _a.style, placeholder = _a.placeholder, progressClassName = _a.progressClassName, map = _a.map, stripe = _a.stripe, animate = _a.animate, showLabel = _a.showLabel, strokeWidth = _a.strokeWidth, gapDegree = _a.gapDegree, gapPosition = _a.gapPosition; _a.classnames; var threshold = _a.threshold, showThresholdText = _a.showThresholdText;
        var value = this.state.value;
        if (threshold) {
            if (Array.isArray(threshold)) {
                threshold.forEach(function (item) {
                    item.value =
                        typeof item.value === 'string'
                            ? amisCore.filter(item.value, data)
                            : item.value;
                    item.color && (item.color = amisCore.filter(item.color, data));
                });
            }
            else {
                threshold.value = amisCore.filter(threshold.value, data);
                threshold.color && (threshold.color = amisCore.filter(threshold.color, data));
            }
        }
        return (_J$X_(amisUi.Progress, { value: value, type: mode, map: map, stripe: stripe, animate: animate, showLabel: showLabel, placeholder: placeholder, format: this.format, strokeWidth: strokeWidth, gapDegree: gapDegree, gapPosition: gapPosition, className: className, style: style, progressClassName: progressClassName, threshold: threshold, showThresholdText: showThresholdText }));
    };
    ProgressField.defaultProps = {
        placeholder: '-',
        progressClassName: '',
        progressBarClassName: '',
        map: ['bg-danger', 'bg-warning', 'bg-info', 'bg-success', 'bg-success'],
        valueTpl: '${value}%',
        showLabel: true,
        stripe: false,
        animate: false
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Number]),
        tslib.__metadata("design:returntype", void 0)
    ], ProgressField.prototype, "format", null);
    return ProgressField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(ProgressFieldRenderer, _super);
    function ProgressFieldRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    ProgressFieldRenderer.prototype.componentWillUnmount = function () {
        var _a;
        (_a = _super.prototype.componentWillUnmount) === null || _a === void 0 ? void 0 : _a.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    ProgressFieldRenderer.prototype.doAction = function (action, data, throwErrors, args) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'reset') {
            this.setState({ value: 0 });
        }
    };
    ProgressFieldRenderer.prototype.setData = function (value) {
        if (typeof value === 'number' || typeof +value === 'number') {
            this.setState({ value: +value });
        }
    };
    ProgressFieldRenderer.contextType = amisCore.ScopedContext;
    ProgressFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'progress'
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], ProgressFieldRenderer);
    return ProgressFieldRenderer;
})(ProgressField));

exports.ProgressField = ProgressField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
