/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var amisCore = require('amis-core');
require('react');
var amisUi = require('amis-ui');
var Transfer = require('./Transfer.js');
var StaticHoc = require('./StaticHoc.js');
var pick = require('lodash/pick');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
/** @class */ ((function (_super) {
    tslib.__extends(TransferPickerRenderer, _super);
    function TransferPickerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransferPickerRenderer.prototype.dispatchEvent = function (name) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, value = _a.value;
        dispatchEvent(name, amisCore.resolveEventData(this.props, { value: value }));
    };
    // 动作
    TransferPickerRenderer.prototype.doAction = function (action) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        switch (action.actionType) {
            case 'clear':
                onChange === null || onChange === void 0 ? void 0 : onChange('');
                break;
            case 'reset':
                onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
                break;
        }
    };
    TransferPickerRenderer.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, className = _b.className; _b.style; var cx = _b.classnames, selectedOptions = _b.selectedOptions, sortable = _b.sortable, loading = _b.loading, searchable = _b.searchable, searchResultMode = _b.searchResultMode, showArrow = _b.showArrow, deferLoad = _b.deferLoad, disabled = _b.disabled, selectTitle = _b.selectTitle, resultTitle = _b.resultTitle, pickerSize = _b.pickerSize, columns = _b.columns, leftMode = _b.leftMode, selectMode = _b.selectMode, borderMode = _b.borderMode, itemHeight = _b.itemHeight, virtualThreshold = _b.virtualThreshold, loadingConfig = _b.loadingConfig, _c = _b.labelField, labelField = _c === void 0 ? 'label' : _c, _d = _b.valueField, valueField = _d === void 0 ? 'value' : _d, _e = _b.deferField, deferField = _e === void 0 ? 'defer' : _e, menuTpl = _b.menuTpl, valueTpl = _b.valueTpl, mobileUI = _b.mobileUI, env = _b.env, maxTagCount = _b.maxTagCount, overflowTagPopover = _b.overflowTagPopover, pagination = _b.pagination, formItem = _b.formItem, data = _b.data, popOverContainer = _b.popOverContainer, placeholder = _b.placeholder, _f = _b.autoCheckChildren, autoCheckChildren = _f === void 0 ? true : _f, _g = _b.initiallyOpen, initiallyOpen = _g === void 0 ? true : _g;
        // 目前 LeftOptions 没有接口可以动态加载
        // 为了方便可以快速实现动态化，让选项的第一个成员携带
        // LeftOptions 信息
        var _h = this.props, options = _h.options, leftOptions = _h.leftOptions, leftDefaultValue = _h.leftDefaultValue;
        if (selectMode === 'associated' &&
            options &&
            options.length &&
            options[0].leftOptions &&
            Array.isArray(options[0].children)) {
            leftOptions = options[0].leftOptions;
            leftDefaultValue = (_a = options[0].leftDefaultValue) !== null && _a !== void 0 ? _a : leftDefaultValue;
            options = options[0].children;
        }
        return (_J$X_("div", { className: cx('TransferControl', className) },
            _J$X_(amisUi.TransferPicker, { placeholder: placeholder, borderMode: borderMode, selectMode: selectMode, value: selectedOptions, disabled: disabled, options: options, onChange: this.handleChange, option2value: this.option2value, sortable: sortable, searchResultMode: searchResultMode, onSearch: searchable ? this.handleSearch : undefined, showArrow: showArrow, onDeferLoad: deferLoad, selectTitle: selectTitle, resultTitle: resultTitle, size: pickerSize, columns: columns, leftMode: leftMode, leftOptions: leftOptions, optionItemRender: menuTpl ? this.optionItemRender : undefined, resultItemRender: valueTpl ? this.resultItemRender : undefined, onFocus: function () { return _this.dispatchEvent('focus'); }, onBlur: function () { return _this.dispatchEvent('blur'); }, labelField: labelField, valueField: valueField, deferField: deferField, itemHeight: amisCore.toNumber(itemHeight) > 0 ? amisCore.toNumber(itemHeight) : undefined, virtualThreshold: virtualThreshold, mobileUI: mobileUI, popOverContainer: env === null || env === void 0 ? void 0 : env.getModalContainer, maxTagCount: maxTagCount, overflowTagPopover: overflowTagPopover, pagination: tslib.__assign(tslib.__assign({}, pick__default["default"](pagination, [
                    'layout',
                    'perPageAvailable',
                    'popOverContainerSelector'
                ])), { className: pagination === null || pagination === void 0 ? void 0 : pagination.className, enable: (pagination && pagination.enable !== undefined
                        ? !!(typeof pagination.enable === 'string'
                            ? amisCore.evalExpression(pagination.enable, data)
                            : pagination.enable)
                        : !!(formItem === null || formItem === void 0 ? void 0 : formItem.enableSourcePagination)) &&
                        (!selectMode ||
                            selectMode === 'list' ||
                            selectMode === 'table') &&
                        options.length > 0, maxButtons: Number.isInteger(pagination === null || pagination === void 0 ? void 0 : pagination.maxButtons)
                        ? pagination === null || pagination === void 0 ? void 0 : pagination.maxButtons
                        : 5, page: formItem === null || formItem === void 0 ? void 0 : formItem.sourcePageNum, perPage: formItem === null || formItem === void 0 ? void 0 : formItem.sourcePerPageNum, total: formItem === null || formItem === void 0 ? void 0 : formItem.sourceTotalNum, popOverContainer: popOverContainer !== null && popOverContainer !== void 0 ? popOverContainer : env === null || env === void 0 ? void 0 : env.getModalContainer }), onPageChange: this.handlePageChange, autoCheckChildren: autoCheckChildren, initiallyOpen: initiallyOpen }),
            _J$X_(amisUi.Spinner, { loadingConfig: loadingConfig, overlay: true, key: "info", show: loading })));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String]),
        tslib.__metadata("design:returntype", void 0)
    ], TransferPickerRenderer.prototype, "dispatchEvent", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], TransferPickerRenderer.prototype, "render", null);
    TransferPickerRenderer = tslib.__decorate([
        amisCore.OptionsControl({
            type: 'transfer-picker'
        })
    ], TransferPickerRenderer);
    return TransferPickerRenderer;
})(Transfer.BaseTransferRenderer));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
