/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { extendObject, ucFirst, FormItem } from 'amis-core';
import '../Table/index.js';
import { HocPopOver } from '../PopOver.js';
import { HocQuickEdit } from '../QuickEdit.js';
import { HocCopyable } from '../Copyable.js';
import omit from 'lodash/omit';
import { TableCell } from '../Table/TableCell.js';

var StaticControl = /** @class */ (function (_super) {
    __extends(StaticControl, _super);
    function StaticControl(props) {
        var _this = _super.call(this, props) || this;
        _this.handleQuickChange = _this.handleQuickChange.bind(_this);
        return _this;
    }
    StaticControl.prototype.handleQuickChange = function (values, saveImmediately, savePristine, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onBulkChange, onAction, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onBulkChange = _a.onBulkChange, onAction = _a.onAction, data = _a.data;
                        if (!(saveImmediately && saveImmediately.api)) return [3 /*break*/, 2];
                        return [4 /*yield*/, onAction(null, {
                                actionType: 'ajax',
                                api: saveImmediately.api,
                                reload: options === null || options === void 0 ? void 0 : options.reload
                            }, extendObject(data, values), true)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        onBulkChange && onBulkChange(values, saveImmediately === true);
                        return [2 /*return*/];
                }
            });
        });
    };
    StaticControl.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className; _b.style; var value = _b.value, label = _b.label, type = _b.type, render = _b.render; _b.children; var data = _b.data, cx = _b.classnames, name = _b.name, disabled = _b.disabled, $schema = _b.$schema, defaultValue = _b.defaultValue, borderMode = _b.borderMode, rest = __rest(_b, ["className", "style", "value", "label", "type", "render", "children", "data", "classnames", "name", "disabled", "$schema", "defaultValue", "borderMode"]);
        var subType = /^static/.test(type)
            ? type.substring(7) || (rest.tpl ? 'tpl' : 'plain')
            : type;
        var field = __assign(__assign({ label: label, name: name }, $schema), { style: $schema.innerStyle, type: subType });
        return (React.createElement("div", { className: cx('Form-static', (_a = {},
                _a["Form-static--border".concat(ucFirst(borderMode))] = borderMode,
                _a)) },
            React.createElement(StaticFieldRenderer, __assign({}, __assign(__assign({}, rest), { name: name, render: render, field: field, value: value === defaultValue ? undefined : value, className: className, onQuickChange: this.handleQuickChange, data: data, disabled: disabled, classnames: cx })))));
    };
    StaticControl.defaultProps = {
        placeholder: '-'
    };
    return StaticControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(StaticControlRenderer, _super);
    function StaticControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StaticControlRenderer = __decorate([
        FormItem({
            test: /(^|\/)static(\-[^\/]+)?$/,
            weight: -90,
            strictMode: false,
            sizeMutable: false,
            name: 'static'
        })
    ], StaticControlRenderer);
    return StaticControlRenderer;
})(StaticControl));
var StaticFieldRenderer = /** @class */ (function (_super) {
    __extends(StaticFieldRenderer, _super);
    function StaticFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StaticFieldRenderer.prototype.render = function () {
        var _a = this.props; _a.type; var className = _a.className, render = _a.render, style = _a.style, Component = _a.wrapperComponent, contentsOnly = _a.contentsOnly; _a.labelClassName; var value = _a.value, data = _a.data, children = _a.children, width = _a.width, inputClassName = _a.inputClassName; _a.label; var tabIndex = _a.tabIndex, onKeyUp = _a.onKeyUp, field = _a.field, rest = __rest(_a, ["type", "className", "render", "style", "wrapperComponent", "contentsOnly", "labelClassName", "value", "data", "children", "width", "inputClassName", "label", "tabIndex", "onKeyUp", "field"]);
        var schema = __assign(__assign({}, field), { className: inputClassName, type: (field && field.type) || 'plain' });
        var body = children
            ? children
            : render('field', schema, __assign(__assign({}, omit(rest, Object.keys(schema))), { value: value, data: data }));
        if (width) {
            style = style || {};
            style.width = style.width || width;
        }
        if (contentsOnly) {
            return body;
        }
        Component = Component || 'div';
        return (React.createElement(Component, { className: className, tabIndex: tabIndex, onKeyUp: onKeyUp }, body));
    };
    StaticFieldRenderer.defaultProps = __assign(__assign({}, TableCell.defaultProps), { wrapperComponent: 'div' });
    StaticFieldRenderer = __decorate([
        HocQuickEdit(),
        HocPopOver({
            position: 'right'
        }),
        HocCopyable()
    ], StaticFieldRenderer);
    return StaticFieldRenderer;
}(TableCell));

export { StaticFieldRenderer, StaticControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
