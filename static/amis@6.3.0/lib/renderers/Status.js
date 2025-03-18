/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var merge = require('lodash/merge');
var assign = require('lodash/assign');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var assign__default = /*#__PURE__*/_interopDefaultLegacy(assign);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var StatusField = /** @class */ (function (_super) {
    tslib.__extends(StatusField, _super);
    function StatusField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusField.prototype.render = function () {
        var _a, _b;
        var _c = this.props, defaultValue = _c.defaultValue, className = _c.className, style = _c.style, placeholder = _c.placeholder, cx = _c.classnames, data = _c.data;
        var map = merge__default["default"](StatusField.defaultProps.map, (_a = this.props) === null || _a === void 0 ? void 0 : _a.map);
        var labelMap = merge__default["default"](StatusField.defaultProps.labelMap, (_b = this.props) === null || _b === void 0 ? void 0 : _b.labelMap);
        // 兼容旧版
        var oldSource = {};
        map &&
            Object.entries(map).forEach(function (_a) {
                var _b = tslib.__read(_a, 2), value = _b[0], icon = _b[1];
                if (!oldSource[value]) {
                    oldSource[value] = { icon: icon };
                }
                else {
                    oldSource[value] = tslib.__assign(tslib.__assign({}, oldSource[value]), { icon: icon });
                }
            });
        labelMap &&
            Object.entries(labelMap).forEach(function (_a) {
                var _b = tslib.__read(_a, 2), value = _b[0], label = _b[1];
                if (!oldSource[value]) {
                    oldSource[value] = { label: label };
                }
                else {
                    oldSource[value] = tslib.__assign(tslib.__assign({}, oldSource[value]), { label: label });
                }
            });
        // 合并source
        var source = this.props.source || {};
        if (amisCore.isPureVariable(source)) {
            source = amisCore.resolveVariableAndFilter(source, data, '| raw');
        }
        source = assign__default["default"](oldSource, source);
        // 获取默认值，支持表达式
        var value = amisCore.getPropValue(this.props);
        if (defaultValue && amisCore.isPureVariable(defaultValue)) {
            value = amisCore.resolveVariableAndFilter(defaultValue, data, '| raw');
        }
        if (value != undefined && value !== '') {
            if (typeof value === 'boolean') {
                value = value ? 1 : 0;
            }
            else if (/^\d+$/.test(value)) {
                value = parseInt(value, 10) || 0;
            }
        }
        var status = source[value] || {};
        if (!status.icon && !status.label) {
            return (_J$X_("span", { className: cx('StatusField', className), style: style },
                _J$X_("span", { className: "text-muted", key: "status-value" }, placeholder)));
        }
        var classNameProp = '';
        // icon element
        var iconElement = null;
        if (status.icon) {
            classNameProp = "StatusField--".concat(value);
            var icon = status.icon;
            var svgIcon_1 = '';
            var itemClassName = '';
            if (typeof icon === 'string') {
                icon = amisCore.filter(icon, data) || '';
                itemClassName = icon.replace(/\bsvg-([^\s|$]+)\b/g, function (_, svgName) {
                    svgIcon_1 = svgName;
                    return 'icon';
                });
            }
            iconElement = (_J$X_(amisUi.Icon, { cx: cx, icon: svgIcon_1 || icon, className: "Status-icon icon", classNameProp: itemClassName, key: "icon" }));
        }
        var labelElement = null;
        if (status.label !== '' && status.label != null) {
            labelElement = (_J$X_("span", { className: cx('StatusField-label'), key: "label" }, amisCore.filter('' + status.label, data)));
        }
        return (_J$X_("span", { className: cx('StatusField', classNameProp, className, status.className), style: tslib.__assign(tslib.__assign({}, style), (status.color ? { color: amisCore.filter(status.color, data) } : {})) },
            iconElement,
            labelElement));
    };
    StatusField.defaultProps = {
        placeholder: '-',
        map: {
            0: 'svg-fail',
            1: 'svg-success',
            success: 'svg-success',
            pending: 'rolling',
            fail: 'svg-fail',
            queue: 'svg-warning',
            schedule: 'svg-schedule'
        },
        labelMap: {
            success: '成功',
            pending: '运行中',
            fail: '失败',
            queue: '排队中',
            schedule: '调度中'
        }
    };
    return StatusField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(StatusFieldRenderer, _super);
    function StatusFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'status'
        })
    ], StatusFieldRenderer);
    return StatusFieldRenderer;
})(StatusField));

exports.StatusField = StatusField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
