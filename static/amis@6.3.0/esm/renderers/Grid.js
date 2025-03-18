/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { buildStyle, ucFirst, setThemeClassName, CustomStyle, Renderer } from 'amis-core';
import pick from 'lodash/pick';
import { Spinner } from 'amis-ui';

var ColProps = ['lg', 'md', 'sm', 'xs'];
function fromBsClass(cn) {
    if (typeof cn === 'string' && cn) {
        return cn.replace(/\bcol-(xs|sm|md|lg)-(\d+)\b/g, function (_, bp, size) { return "Grid-col--".concat(bp).concat(size); });
    }
    return cn;
}
function copProps2Class(props) {
    var cns = [];
    var modifiers = ColProps;
    modifiers.forEach(function (modifier) {
        return props &&
            props[modifier] &&
            cns.push("Grid-col--".concat(modifier).concat(ucFirst(props[modifier])));
    });
    cns.length || cns.push('Grid-col--md');
    return cns.join(' ');
}
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.renderChild = function (region, node, length, props) {
        if (props === void 0) { props = {}; }
        var _a = this.props, render = _a.render, itemRender = _a.itemRender;
        return itemRender
            ? itemRender(node, length, this.props)
            : render(region, node, props);
    };
    Grid.prototype.renderColumn = function (column, key, length) {
        var _a;
        var colProps = pick(column, ColProps);
        colProps = __assign({}, colProps);
        var _b = this.props, cx = _b.classnames, formMode = _b.formMode, subFormMode = _b.subFormMode, subFormHorizontal = _b.subFormHorizontal, formHorizontal = _b.formHorizontal; _b.translate; var disabled = _b.disabled, data = _b.data;
        var styleVar = buildStyle(column.style, data);
        return (React.createElement("div", { key: key, className: cx(copProps2Class(colProps), fromBsClass(column.columnClassName), (_a = {},
                _a["Grid-col--v".concat(ucFirst(column.valign))] = column.valign,
                _a)), style: styleVar }, this.renderChild("column/".concat(key), column.body || '', length, {
            disabled: disabled,
            formMode: column.mode || subFormMode || formMode,
            formHorizontal: column.horizontal || subFormHorizontal || formHorizontal
        })));
    };
    Grid.prototype.renderColumns = function (columns) {
        var _this = this;
        return Array.isArray(columns)
            ? columns.map(function (column, key) {
                return _this.renderColumn(column, key, columns.length);
            })
            : null;
    };
    Grid.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, style = _b.style, cx = _b.classnames, gap = _b.gap, vAlign = _b.valign, hAlign = _b.align, _c = _b.loading, loading = _c === void 0 ? false : _c, loadingConfig = _b.loadingConfig, data = _b.data, id = _b.id, wrapperCustomStyle = _b.wrapperCustomStyle, env = _b.env, themeCss = _b.themeCss; _b.testid;
        var styleVar = buildStyle(style, data);
        return (React.createElement("div", { className: cx('Grid', (_a = {},
                _a["Grid--".concat(gap)] = gap,
                _a["Grid--v".concat(ucFirst(vAlign))] = vAlign,
                _a["Grid--h".concat(ucFirst(hAlign))] = hAlign,
                _a), className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), style: styleVar },
            this.renderColumns(this.props.columns),
            React.createElement(Spinner, { loadingConfig: loadingConfig, overlay: true, show: loading }),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    Grid.propsList = ['columns'];
    Grid.defaultProps = {};
    return Grid;
}(React.Component));
var GridRenderer = /** @class */ (function (_super) {
    __extends(GridRenderer, _super);
    function GridRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridRenderer = __decorate([
        Renderer({
            type: 'grid'
        })
    ], GridRenderer);
    return GridRenderer;
}(Grid));

export { ColProps, GridRenderer, Grid as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
