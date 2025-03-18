/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import { resolveEventData, createObject, toNumber, autobind, OptionsControl } from 'amis-core';
import React from 'react';
import { Selection, TabsTransferPicker, Spinner } from 'amis-ui';
import { BaseTabsTransferRenderer } from './TabsTransfer.js';
import { supportStatic } from './StaticHoc.js';

/** @class */ ((function (_super) {
    __extends(TabsTransferPickerRenderer, _super);
    function TabsTransferPickerRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            activeKey: 0
        };
        return _this;
    }
    TabsTransferPickerRenderer.prototype.dispatchEvent = function (name) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, value = _a.value;
        dispatchEvent(name, resolveEventData(this.props, { value: value }));
    };
    TabsTransferPickerRenderer.prototype.optionItemRender = function (option, states) {
        var _a = this.props, menuTpl = _a.menuTpl, render = _a.render, data = _a.data, classnames = _a.classnames;
        var ctx = arguments[2] || {};
        if (menuTpl) {
            return render("item/".concat(states.index), menuTpl, {
                data: createObject(createObject(data, __assign(__assign({}, states), ctx)), option)
            });
        }
        return Selection.itemRender(option, __assign(__assign({}, states), { classnames: classnames }));
    };
    // 动作
    TabsTransferPickerRenderer.prototype.doAction = function (action) {
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
    TabsTransferPickerRenderer.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className; _a.style; var cx = _a.classnames, options = _a.options, selectedOptions = _a.selectedOptions, sortable = _a.sortable, loading = _a.loading, searchResultMode = _a.searchResultMode, showArrow = _a.showArrow, deferLoad = _a.deferLoad, disabled = _a.disabled, selectTitle = _a.selectTitle, resultTitle = _a.resultTitle, pickerSize = _a.pickerSize, leftMode = _a.leftMode, leftOptions = _a.leftOptions, itemHeight = _a.itemHeight, virtualThreshold = _a.virtualThreshold, loadingConfig = _a.loadingConfig, _b = _a.labelField, labelField = _b === void 0 ? 'label' : _b, _c = _a.valueField, valueField = _c === void 0 ? 'value' : _c, _d = _a.deferField, deferField = _d === void 0 ? 'defer' : _d, mobileUI = _a.mobileUI, env = _a.env, maxTagCount = _a.maxTagCount, overflowTagPopover = _a.overflowTagPopover, placeholder = _a.placeholder, _e = _a.initiallyOpen, initiallyOpen = _e === void 0 ? true : _e;
        return (React.createElement("div", { className: cx('TabsTransferControl', className) },
            React.createElement(TabsTransferPicker, { activeKey: this.state.activeKey, onTabChange: this.onTabChange, placeholder: placeholder, value: selectedOptions, disabled: disabled, options: options, onChange: this.handleChange, option2value: this.option2value, sortable: sortable, searchResultMode: searchResultMode, onSearch: this.handleTabSearch, showArrow: showArrow, onDeferLoad: deferLoad, selectTitle: selectTitle, resultTitle: resultTitle, size: pickerSize, leftMode: leftMode, leftOptions: leftOptions, optionItemRender: this.optionItemRender, resultItemRender: this.resultItemRender, onFocus: function () { return _this.dispatchEvent('focus'); }, onBlur: function () { return _this.dispatchEvent('blur'); }, itemHeight: toNumber(itemHeight) > 0 ? toNumber(itemHeight) : undefined, virtualThreshold: virtualThreshold, labelField: labelField, valueField: valueField, deferField: deferField, mobileUI: mobileUI, popOverContainer: env === null || env === void 0 ? void 0 : env.getModalContainer, maxTagCount: maxTagCount, overflowTagPopover: overflowTagPopover, initiallyOpen: initiallyOpen }),
            React.createElement(Spinner, { loadingConfig: loadingConfig, overlay: true, key: "info", show: loading })));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TabsTransferPickerRenderer.prototype, "dispatchEvent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TabsTransferPickerRenderer.prototype, "optionItemRender", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TabsTransferPickerRenderer.prototype, "render", null);
    TabsTransferPickerRenderer = __decorate([
        OptionsControl({
            type: 'tabs-transfer-picker'
        })
    ], TabsTransferPickerRenderer);
    return TabsTransferPickerRenderer;
})(BaseTabsTransferRenderer));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
