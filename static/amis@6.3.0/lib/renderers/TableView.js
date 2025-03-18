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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var defaultPadding = 'var(--TableCell-paddingY) var(--TableCell-paddingX)';
var TableView = /** @class */ (function (_super) {
    tslib.__extends(TableView, _super);
    function TableView(props) {
        return _super.call(this, props) || this;
    }
    TableView.prototype.renderTd = function (td, colIndex, rowIndex) {
        var _a = this.props, border = _a.border, borderColor = _a.borderColor; _a.render; _a.style; var padding = _a.padding;
        var key = "td-".concat(colIndex);
        var styleBorder;
        if (border) {
            styleBorder = "1px solid ".concat(borderColor);
        }
        return (_J$X_("td", { style: tslib.__assign({ border: styleBorder, color: td.color, fontWeight: td.bold ? 'bold' : 'normal', background: td.background, padding: td.padding || padding, width: td.width || 'auto', textAlign: td.align || 'left', verticalAlign: td.valign || 'center' }, td.style), align: td.align, valign: td.valign, rowSpan: td.rowspan, colSpan: td.colspan, key: key }, this.renderTdBody(td.body)));
    };
    TableView.prototype.renderTdBody = function (body) {
        var render = this.props.render;
        return render('td', body || '');
    };
    TableView.prototype.renderTds = function (tds, rowIndex) {
        var _this = this;
        var data = this.props.data;
        return tds.map(function (td, colIndex) {
            return _this.renderTd(amisCore.resolveMappingObject(td, data), colIndex, rowIndex);
        });
    };
    TableView.prototype.renderTr = function (tr, rowIndex) {
        var key = "tr-".concat(rowIndex);
        return (_J$X_("tr", { style: tslib.__assign({ height: tr.height, background: tr.background }, tr.style), key: key }, this.renderTds(tr.tds || [], rowIndex)));
    };
    TableView.prototype.renderTrs = function (trs) {
        var _this = this;
        var data = this.props.data;
        var tr = trs.map(function (tr, rowIndex) {
            return _this.renderTr(amisCore.resolveMappingObject(tr, data), rowIndex);
        });
        return tr;
    };
    TableView.prototype.renderCols = function () {
        var _a = this.props, cols = _a.cols, data = _a.data;
        if (cols) {
            var colsElement = cols.map(function (col) {
                col = amisCore.resolveMappingObject(col, data);
                return _J$X_("col", { span: col.span, style: col.style });
            });
            return _J$X_("colgroup", null, colsElement);
        }
        return null;
    };
    TableView.prototype.renderCaption = function () {
        if (this.props.caption) {
            return (_J$X_("caption", { style: {
                    captionSide: this.props.captionSide === 'bottom' ? 'bottom' : 'top'
                } }, this.props.caption));
        }
        return null;
    };
    TableView.prototype.render = function () {
        var _a = this.props, width = _a.width, _b = _a.trs, trs = _b === void 0 ? [] : _b, cx = _a.classnames, className = _a.className, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss; _a.testid; _a.baseControlClassName;
        return (_J$X_("table", { className: cx('TableView', className, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), style: { width: width, borderCollapse: 'collapse' } },
            this.renderCaption(),
            this.renderCols(),
            _J$X_("tbody", null, this.renderTrs(trs)),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
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
    TableView.defaultProps = {
        padding: defaultPadding,
        width: '100%',
        border: true,
        borderColor: 'var(--borderColor)'
    };
    return TableView;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(TableViewRenderer, _super);
    function TableViewRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableViewRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'table-view',
            autoVar: true
        })
    ], TableViewRenderer);
    return TableViewRenderer;
})(TableView));

exports["default"] = TableView;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
