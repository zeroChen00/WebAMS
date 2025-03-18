/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { Renderer, PaginationStore } from 'amis-core';

var PaginationWrapper = /** @class */ (function (_super) {
    __extends(PaginationWrapper, _super);
    function PaginationWrapper(props) {
        var _this = _super.call(this, props) || this;
        props.store.syncProps(props, undefined, [
            'perPage',
            'mode',
            'ellipsisPageGap',
            'inputName',
            'outputName'
        ]);
        return _this;
    }
    PaginationWrapper.prototype.componentDidUpdate = function (prevProps) {
        var store = this.props.store;
        store.syncProps(this.props, prevProps, [
            'perPage',
            'mode',
            'ellipsisPageGap',
            'inputName',
            'outputName'
        ]);
    };
    PaginationWrapper.prototype.render = function () {
        var _a = this.props, position = _a.position, render = _a.render, store = _a.store, cx = _a.classnames, style = _a.style, body = _a.body, __ = _a.translate;
        var pagination = position !== 'none'
            ? render('pager', {
                type: 'pagination'
            }, {
                activePage: store.page,
                lastPage: store.lastPage,
                mode: store.mode,
                ellipsisPageGap: store.ellipsisPageGap,
                onPageChange: store.switchTo,
                perPage: store.perPage,
                className: 'PaginationWrapper-pager'
            })
            : null;
        return (React.createElement("div", { className: cx('PaginationWrapper'), style: style },
            position === 'top' ? pagination : null,
            body ? (render('body', body, {
                data: store.locals
            })) : (React.createElement("span", null, __('PaginationWrapper.placeholder'))),
            position === 'bottom' ? pagination : null));
    };
    PaginationWrapper.defaultProps = {
        inputName: 'items',
        outputName: 'items',
        perPage: 10,
        position: 'top'
    };
    return PaginationWrapper;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(PaginationWrapperRenderer, _super);
    function PaginationWrapperRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginationWrapperRenderer = __decorate([
        Renderer({
            type: 'pagination-wrapper',
            storeType: PaginationStore.name
        })
    ], PaginationWrapperRenderer);
    return PaginationWrapperRenderer;
})(PaginationWrapper));

export { PaginationWrapper };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
