/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React from 'react';
import { getPropValue, resolveEventData, setVariable, createObject, ScopedContext, autobind, Renderer } from 'amis-core';
import { SearchBox } from 'amis-ui';

/** @class */ ((function (_super) {
    __extends(SearchBoxRenderer, _super);
    function SearchBoxRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: getPropValue(props) || ''
        };
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    SearchBoxRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    SearchBoxRenderer.prototype.handleChange = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, dispatchEvent, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent;
                        this.setState({ value: value });
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, {
                                value: value
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange === null || onChange === void 0 ? void 0 : onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchBoxRenderer.prototype.handleCancel = function () {
        var name = this.props.name;
        var onQuery = this.props.onQuery;
        var value = getPropValue(this.props);
        if (value !== '') {
            var data = {};
            setVariable(data, name, '');
            onQuery === null || onQuery === void 0 ? void 0 : onQuery(data);
        }
    };
    SearchBoxRenderer.prototype.handleSearch = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, onQuery, dispatchEvent, data, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, name = _a.name, onQuery = _a.onQuery, dispatchEvent = _a.dispatchEvent;
                        data = {};
                        setVariable(data, name, text);
                        return [4 /*yield*/, dispatchEvent('search', createObject(this.props.data, data))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onQuery === null || onQuery === void 0 ? void 0 : onQuery(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchBoxRenderer.prototype.dispatchEvent = function (name) {
        var dispatchEvent = this.props.dispatchEvent;
        dispatchEvent(name, resolveEventData(this.props, { value: this.state.value }));
    };
    SearchBoxRenderer.prototype.doAction = function (action, data, throwErrors, args) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            this.setState({ value: '' });
        }
    };
    SearchBoxRenderer.prototype.setData = function (value) {
        if (typeof value === 'string') {
            this.handleChange(value);
        }
    };
    SearchBoxRenderer.prototype.render = function () {
        var _this = this;
        var _a = this.props; _a.data; var name = _a.name, disabled = _a.disabled, onQuery = _a.onQuery, mini = _a.mini, enhance = _a.enhance, clearable = _a.clearable, searchImediately = _a.searchImediately, clearAndSubmit = _a.clearAndSubmit, placeholder = _a.placeholder, onChange = _a.onChange, className = _a.className, style = _a.style, mobileUI = _a.mobileUI, loading = _a.loading, loadingConfig = _a.loadingConfig, onEvent = _a.onEvent, testIdBuilder = _a.testIdBuilder;
        var value = this.state.value;
        /** 有可能通过Search事件处理 */
        var isDisabled = (!onQuery && !(onEvent === null || onEvent === void 0 ? void 0 : onEvent.search)) || disabled;
        return (React.createElement(SearchBox, { className: className, style: style, name: name, disabled: isDisabled, loading: loading, loadingConfig: loadingConfig, defaultActive: !!value, defaultValue: onChange ? undefined : value, value: value, mini: mini, enhance: enhance, clearable: clearable, searchImediately: searchImediately, clearAndSubmit: clearAndSubmit, onSearch: this.handleSearch, onCancel: this.handleCancel, placeholder: placeholder, onChange: this.handleChange, onFocus: function () { return _this.dispatchEvent('focus'); }, onBlur: function () { return _this.dispatchEvent('blur'); }, mobileUI: mobileUI, testIdBuilder: testIdBuilder }));
    };
    SearchBoxRenderer.defaultProps = {
        name: 'keywords',
        mini: false,
        enhance: false,
        clearable: false,
        searchImediately: false,
        clearAndSubmit: false
    };
    SearchBoxRenderer.contextType = ScopedContext;
    SearchBoxRenderer.propsList = ['mini', 'searchImediately'];
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SearchBoxRenderer.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SearchBoxRenderer.prototype, "handleCancel", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SearchBoxRenderer.prototype, "handleSearch", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], SearchBoxRenderer.prototype, "dispatchEvent", null);
    SearchBoxRenderer = __decorate([
        Renderer({
            type: 'search-box'
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], SearchBoxRenderer);
    return SearchBoxRenderer;
})(React.Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
