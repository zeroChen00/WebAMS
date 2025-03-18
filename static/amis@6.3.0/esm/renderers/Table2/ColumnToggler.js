/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { isVisible, Renderer } from 'amis-core';
import { Checkbox } from 'amis-ui';
import ColumnToggler from '../Table/ColumnToggler.js';

/** @class */ ((function (_super) {
    __extends(ColumnTogglerRenderer, _super);
    function ColumnTogglerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnTogglerRenderer.prototype.render = function () {
        var _a = this.props; _a.className; _a.store; var render = _a.render, ns = _a.classPrefix, cx = _a.classnames, tooltip = _a.tooltip, align = _a.align, cols = _a.cols, toggleAllColumns = _a.toggleAllColumns, toggleToggle = _a.toggleToggle, data = _a.data, size = _a.size, popOverContainer = _a.popOverContainer, rest = __rest(_a, ["className", "store", "render", "classPrefix", "classnames", "tooltip", "align", "cols", "toggleAllColumns", "toggleToggle", "data", "size", "popOverContainer"]);
        var __ = rest.translate;
        var env = rest.env;
        if (!cols) {
            return null;
        }
        var toggableColumns = cols.filter(function (item) {
            return isVisible(item.pristine || item, data) && item.toggable !== false;
        });
        var activeToggaleColumns = toggableColumns.filter(function (item) { return item.toggled !== false; });
        return (React.createElement(ColumnToggler, __assign({}, rest, { render: render, tooltip: tooltip || __('Table.columnsVisibility'), tooltipContainer: popOverContainer || env.getModalContainer, isActived: cols.findIndex(function (column) { return !column.toggled; }) !== -1, align: align !== null && align !== void 0 ? align : 'right', size: size || 'sm', classnames: cx, classPrefix: ns, key: "columns-toggable", columns: cols, activeToggaleColumns: activeToggaleColumns, data: data }),
            (toggableColumns === null || toggableColumns === void 0 ? void 0 : toggableColumns.length) ? (React.createElement("li", { className: cx('ColumnToggler-menuItem'), key: 'selectAll', onClick: function () {
                    toggleAllColumns &&
                        toggleAllColumns((activeToggaleColumns === null || activeToggaleColumns === void 0 ? void 0 : activeToggaleColumns.length) <= 0);
                } },
                React.createElement(Checkbox, { size: "sm", classPrefix: ns, key: "checkall", checked: !!(activeToggaleColumns === null || activeToggaleColumns === void 0 ? void 0 : activeToggaleColumns.length), partial: !!((activeToggaleColumns === null || activeToggaleColumns === void 0 ? void 0 : activeToggaleColumns.length) &&
                        (activeToggaleColumns === null || activeToggaleColumns === void 0 ? void 0 : activeToggaleColumns.length) !== (toggableColumns === null || toggableColumns === void 0 ? void 0 : toggableColumns.length)) }, __('Checkboxes.selectAll')))) : null, toggableColumns === null || toggableColumns === void 0 ? void 0 :
            toggableColumns.map(function (column, index) { return (React.createElement("li", { className: cx('ColumnToggler-menuItem'), key: 'item' + (column.index || index), onClick: function () {
                    toggleToggle && toggleToggle(index);
                } },
                React.createElement(Checkbox, { size: "sm", classPrefix: ns, checked: column.toggled !== false }, column.title
                    ? render('tpl', column.title)
                    : column.label || null))); })));
    };
    ColumnTogglerRenderer = __decorate([
        Renderer({
            type: 'column-toggler',
            name: 'column-toggler'
        })
    ], ColumnTogglerRenderer);
    return ColumnTogglerRenderer;
})(React.Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
