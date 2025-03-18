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
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Pagination = /** @class */ (function (_super) {
    tslib.__extends(Pagination, _super);
    function Pagination() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pagination.prototype.formatNumber = function (num, defaultValue) {
        var result = undefined;
        if (typeof num === 'string') {
            num = amisCore.isPureVariable(num)
                ? amisCore.resolveVariableAndFilter(num, this.props.data)
                : num;
            result = typeof num === 'string' ? parseInt(num, 10) : num;
        }
        else if (typeof num === 'number') {
            result = num;
        }
        return typeof result === 'number' && !isNaN(result) ? result : defaultValue;
    };
    Pagination.prototype.onPageChange = function (page, perPage, dir) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onPageChange, dispatchEvent, data, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onPageChange = _a.onPageChange, dispatchEvent = _a.dispatchEvent, data = _a.data;
                        return [4 /*yield*/, (dispatchEvent === null || dispatchEvent === void 0 ? void 0 : dispatchEvent('change', amisCore.createObject(data, {
                                page: page,
                                perPage: perPage
                            })))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(page, perPage, dir);
                        return [2 /*return*/];
                }
            });
        });
    };
    Pagination.prototype.render = function () {
        var _a = this.props, maxButtons = _a.maxButtons, activePage = _a.activePage, total = _a.total, perPage = _a.perPage;
        return (_J$X_(amisUi.Pagination, tslib.__assign({}, this.props, { onPageChange: this.onPageChange, maxButtons: this.formatNumber(maxButtons), activePage: this.formatNumber(activePage), total: this.formatNumber(total), perPage: this.formatNumber(perPage) })));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Number, Number, String]),
        tslib.__metadata("design:returntype", Promise)
    ], Pagination.prototype, "onPageChange", null);
    return Pagination;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(PaginationRenderer, _super);
    function PaginationRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginationRenderer = tslib.__decorate([
        amisCore.Renderer({
            test: /(^|\/)(?:pagination|pager)$/,
            name: 'pagination'
        })
    ], PaginationRenderer);
    return PaginationRenderer;
})(Pagination));

exports["default"] = Pagination;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
