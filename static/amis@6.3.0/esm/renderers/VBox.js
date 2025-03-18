/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { Renderer } from 'amis-core';
import cx from 'classnames';

var VBox = /** @class */ (function (_super) {
    __extends(VBox, _super);
    function VBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VBox.prototype.renderChild = function (region, node) {
        var render = this.props.render;
        return render(region, node);
    };
    VBox.prototype.renderCell = function (row, key) {
        var ns = this.props.classPrefix;
        return (React.createElement("div", { className: cx("".concat(ns, "Vbox-cell"), row.cellClassName) }, this.renderChild("row/".concat(key), row)));
    };
    VBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, rows = _a.rows, ns = _a.classPrefix;
        return (React.createElement("div", { className: cx("".concat(ns, "Vbox"), className), style: style }, Array.isArray(rows)
            ? rows.map(function (row, key) { return (React.createElement("div", { className: cx('row-row', row.rowClassName), key: key }, _this.renderCell(row, key))); })
            : null));
    };
    VBox.propsList = ['rows'];
    VBox.defaultProps = {};
    return VBox;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(VBoxRenderer, _super);
    function VBoxRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VBoxRenderer = __decorate([
        Renderer({
            type: 'vbox'
        })
    ], VBoxRenderer);
    return VBoxRenderer;
})(VBox));

export { VBox as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
