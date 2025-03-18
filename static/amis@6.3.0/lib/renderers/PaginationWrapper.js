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
var PaginationWrapper = /** @class */ (function (_super) {
    tslib.__extends(PaginationWrapper, _super);
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
        return (_J$X_("div", { className: cx('PaginationWrapper'), style: style },
            position === 'top' ? pagination : null,
            body ? (render('body', body, {
                data: store.locals
            })) : (_J$X_("span", null, __('PaginationWrapper.placeholder'))),
            position === 'bottom' ? pagination : null));
    };
    PaginationWrapper.defaultProps = {
        inputName: 'items',
        outputName: 'items',
        perPage: 10,
        position: 'top'
    };
    return PaginationWrapper;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(PaginationWrapperRenderer, _super);
    function PaginationWrapperRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginationWrapperRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'pagination-wrapper',
            storeType: amisCore.PaginationStore.name
        })
    ], PaginationWrapperRenderer);
    return PaginationWrapperRenderer;
})(PaginationWrapper));

exports.PaginationWrapper = PaginationWrapper;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
