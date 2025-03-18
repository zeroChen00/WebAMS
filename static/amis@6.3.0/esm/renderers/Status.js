/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __read, __assign, __decorate } from 'tslib';
import React from 'react';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import { isPureVariable, resolveVariableAndFilter, getPropValue, filter, Renderer } from 'amis-core';
import { Icon } from 'amis-ui';

var StatusField = /** @class */ (function (_super) {
    __extends(StatusField, _super);
    function StatusField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusField.prototype.render = function () {
        var _a, _b;
        var _c = this.props, defaultValue = _c.defaultValue, className = _c.className, style = _c.style, placeholder = _c.placeholder, cx = _c.classnames, data = _c.data;
        var map = merge(StatusField.defaultProps.map, (_a = this.props) === null || _a === void 0 ? void 0 : _a.map);
        var labelMap = merge(StatusField.defaultProps.labelMap, (_b = this.props) === null || _b === void 0 ? void 0 : _b.labelMap);
        // 兼容旧版
        var oldSource = {};
        map &&
            Object.entries(map).forEach(function (_a) {
                var _b = __read(_a, 2), value = _b[0], icon = _b[1];
                if (!oldSource[value]) {
                    oldSource[value] = { icon: icon };
                }
                else {
                    oldSource[value] = __assign(__assign({}, oldSource[value]), { icon: icon });
                }
            });
        labelMap &&
            Object.entries(labelMap).forEach(function (_a) {
                var _b = __read(_a, 2), value = _b[0], label = _b[1];
                if (!oldSource[value]) {
                    oldSource[value] = { label: label };
                }
                else {
                    oldSource[value] = __assign(__assign({}, oldSource[value]), { label: label });
                }
            });
        // 合并source
        var source = this.props.source || {};
        if (isPureVariable(source)) {
            source = resolveVariableAndFilter(source, data, '| raw');
        }
        source = assign(oldSource, source);
        // 获取默认值，支持表达式
        var value = getPropValue(this.props);
        if (defaultValue && isPureVariable(defaultValue)) {
            value = resolveVariableAndFilter(defaultValue, data, '| raw');
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
            return (React.createElement("span", { className: cx('StatusField', className), style: style },
                React.createElement("span", { className: "text-muted", key: "status-value" }, placeholder)));
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
                icon = filter(icon, data) || '';
                itemClassName = icon.replace(/\bsvg-([^\s|$]+)\b/g, function (_, svgName) {
                    svgIcon_1 = svgName;
                    return 'icon';
                });
            }
            iconElement = (React.createElement(Icon, { cx: cx, icon: svgIcon_1 || icon, className: "Status-icon icon", classNameProp: itemClassName, key: "icon" }));
        }
        var labelElement = null;
        if (status.label !== '' && status.label != null) {
            labelElement = (React.createElement("span", { className: cx('StatusField-label'), key: "label" }, filter('' + status.label, data)));
        }
        return (React.createElement("span", { className: cx('StatusField', classNameProp, className, status.className), style: __assign(__assign({}, style), (status.color ? { color: filter(status.color, data) } : {})) },
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
}(React.Component));
/** @class */ ((function (_super) {
    __extends(StatusFieldRenderer, _super);
    function StatusFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusFieldRenderer = __decorate([
        Renderer({
            type: 'status'
        })
    ], StatusFieldRenderer);
    return StatusFieldRenderer;
})(StatusField));

export { StatusField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
