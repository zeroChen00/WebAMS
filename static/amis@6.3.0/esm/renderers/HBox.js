/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { isVisible, ucFirst, Renderer } from 'amis-core';

var HBox = /** @class */ (function (_super) {
    __extends(HBox, _super);
    function HBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HBox.prototype.renderChild = function (region, node, props) {
        if (props === void 0) { props = {}; }
        var render = this.props.render;
        return render(region, node, props);
    };
    HBox.prototype.renderColumn = function (column, key, length) {
        var _a;
        var _b = this.props, itemRender = _b.itemRender, data = _b.data, cx = _b.classnames, subFormMode = _b.subFormMode, subFormHorizontal = _b.subFormHorizontal, formMode = _b.formMode, formHorizontal = _b.formHorizontal;
        if (!isVisible(column, data) || !column) {
            return null;
        }
        var style = __assign({ width: column.width, height: column.height }, column.style);
        return (React.createElement("div", { key: key, className: cx("Hbox-col", style.width === 'auto'
                ? 'Hbox-col--auto'
                : style.width
                    ? 'Hbox-col--customWidth'
                    : '', (_a = {},
                _a["Hbox-col--v".concat(ucFirst(column.valign))] = column.valign,
                _a), column.columnClassName), style: style }, itemRender
            ? itemRender(column, key, length, this.props)
            : this.renderChild("column/".concat(key), column.body, {
                formMode: column.mode || subFormMode || formMode,
                formHorizontal: column.horizontal || subFormHorizontal || formHorizontal
            })));
    };
    HBox.prototype.renderColumns = function () {
        var _this = this;
        var columns = this.props.columns;
        return columns.map(function (column, key) {
            return _this.renderColumn(column, key, columns.length);
        });
    };
    HBox.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, style = _b.style, cx = _b.classnames, gap = _b.gap, vAlign = _b.valign, hAlign = _b.align;
        return (React.createElement("div", { className: cx("Hbox", className, (_a = {},
                _a["Hbox--".concat(gap)] = gap,
                _a["Hbox--v".concat(ucFirst(vAlign))] = vAlign,
                _a["Hbox--h".concat(ucFirst(hAlign))] = hAlign,
                _a)), style: style }, this.renderColumns()));
    };
    HBox.propsList = ['columns'];
    HBox.defaultProps = {
        gap: 'xs'
    };
    return HBox;
}(React.Component));
var HBoxRenderer = /** @class */ (function (_super) {
    __extends(HBoxRenderer, _super);
    function HBoxRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HBoxRenderer = __decorate([
        Renderer({
            type: 'hbox'
        })
    ], HBoxRenderer);
    return HBoxRenderer;
}(HBox));

export { HBoxRenderer, HBox as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
