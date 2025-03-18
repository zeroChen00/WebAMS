/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { isPureVariable, resolveVariableAndFilter, createObject, autobind, Renderer } from 'amis-core';
import { Pagination as Pagination$1 } from 'amis-ui';

var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pagination.prototype.formatNumber = function (num, defaultValue) {
        var result = undefined;
        if (typeof num === 'string') {
            num = isPureVariable(num)
                ? resolveVariableAndFilter(num, this.props.data)
                : num;
            result = typeof num === 'string' ? parseInt(num, 10) : num;
        }
        else if (typeof num === 'number') {
            result = num;
        }
        return typeof result === 'number' && !isNaN(result) ? result : defaultValue;
    };
    Pagination.prototype.onPageChange = function (page, perPage, dir) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onPageChange, dispatchEvent, data, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onPageChange = _a.onPageChange, dispatchEvent = _a.dispatchEvent, data = _a.data;
                        return [4 /*yield*/, (dispatchEvent === null || dispatchEvent === void 0 ? void 0 : dispatchEvent('change', createObject(data, {
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
        return (React.createElement(Pagination$1, __assign({}, this.props, { onPageChange: this.onPageChange, maxButtons: this.formatNumber(maxButtons), activePage: this.formatNumber(activePage), total: this.formatNumber(total), perPage: this.formatNumber(perPage) })));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, String]),
        __metadata("design:returntype", Promise)
    ], Pagination.prototype, "onPageChange", null);
    return Pagination;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(PaginationRenderer, _super);
    function PaginationRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginationRenderer = __decorate([
        Renderer({
            test: /(^|\/)(?:pagination|pager)$/,
            name: 'pagination'
        })
    ], PaginationRenderer);
    return PaginationRenderer;
})(Pagination));

export { Pagination as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
