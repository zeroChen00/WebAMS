/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import cx from 'classnames';
import { isEffectiveApi, createObject, resolveEventData, autobind, OptionsControl } from 'amis-core';
import { UserTabSelect, UserSelect } from 'amis-ui';
import find from 'lodash/find';
import { supportStatic } from './StaticHoc.js';

var UserSelectControl = /** @class */ (function (_super) {
    __extends(UserSelectControl, _super);
    function UserSelectControl(props) {
        return _super.call(this, props) || this;
    }
    UserSelectControl.prototype.componentWillUnmount = function () {
        this.unHook && this.unHook();
    };
    UserSelectControl.prototype.onSearch = function (input, cancelExecutor, param) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, searchApi, setLoading, env, searchTerm, searchObj, ctx, ret, options;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, searchApi = _a.searchApi, setLoading = _a.setLoading, env = _a.env;
                        searchApi = (param === null || param === void 0 ? void 0 : param.searchApi) || searchApi;
                        searchTerm = (param === null || param === void 0 ? void 0 : param.searchTerm) || this.props.searchTerm || 'term';
                        searchObj = (param === null || param === void 0 ? void 0 : param.searchParam) || this.props.searchParam || {};
                        ctx = __assign((_b = {}, _b[searchTerm] = input, _b), searchObj);
                        if (!isEffectiveApi(searchApi, ctx)) {
                            return [2 /*return*/, Promise.resolve([])];
                        }
                        setLoading(true);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, env.fetcher(searchApi, ctx, {
                                cancelExecutor: cancelExecutor,
                                autoAppend: true
                            })];
                    case 2:
                        ret = _c.sent();
                        options = (ret.data && ret.data.options) || ret.data || [];
                        return [2 /*return*/, options];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserSelectControl.prototype.deferLoad = function (data, isRef, param) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, env, deferApi, setLoading, ctx, ret, options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, env = _a.env, deferApi = _a.deferApi, setLoading = _a.setLoading, _a.formInited, _a.addHook;
                        deferApi = (param === null || param === void 0 ? void 0 : param.deferApi) || deferApi;
                        if (!env || !env.fetcher) {
                            throw new Error('fetcher is required');
                        }
                        ctx = createObject(data, {});
                        if (!isEffectiveApi(deferApi, ctx)) {
                            return [2 /*return*/, Promise.resolve([])];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, env.fetcher(deferApi, ctx)];
                    case 2:
                        ret = _b.sent();
                        options = (ret.data && ret.data.options) || ret.data || [];
                        if (isRef) {
                            options.forEach(function (option) {
                                option.isRef = true;
                            });
                        }
                        return [2 /*return*/, options];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserSelectControl.prototype.changeValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, joinValues, extractValue, delimiter, multiple, valueField, onChange, options, dispatchEvent, newValue, additonalOptions, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, multiple = _a.multiple, valueField = _a.valueField, onChange = _a.onChange, options = _a.options, _a.setOptions, _a.data, dispatchEvent = _a.dispatchEvent;
                        newValue = value;
                        additonalOptions = [];
                        (Array.isArray(value) ? value : value ? [value] : []).forEach(function (option) {
                            var resolved = find(options, function (item) {
                                return item[valueField || 'value'] == option[valueField || 'value'];
                            });
                            resolved || additonalOptions.push(option);
                        });
                        if (joinValues) {
                            if (multiple) {
                                newValue = Array.isArray(value)
                                    ? value
                                        .map(function (item) { return item[valueField || 'value']; })
                                        .join(delimiter)
                                    : value
                                        ? value[valueField || 'value']
                                        : '';
                            }
                            else {
                                newValue = newValue ? newValue[valueField || 'value'] : '';
                            }
                        }
                        else if (extractValue) {
                            if (multiple) {
                                newValue = Array.isArray(value)
                                    ? value.map(function (item) { return item[valueField || 'value']; })
                                    : value
                                        ? [value[valueField || 'value']]
                                        : [];
                            }
                            else {
                                newValue = newValue ? newValue[valueField || 'value'] : '';
                            }
                        }
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, {
                                value: newValue,
                                options: options,
                                items: options // 为了保持名字统一
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserSelectControl.prototype.renderStatic = function () {
        var _a = this.props, selectedOptions = _a.selectedOptions, _b = _a.labelField, labelField = _b === void 0 ? 'label' : _b, cx = _a.classnames;
        if (labelField === 'avatar') {
            return selectedOptions.map(function (item, index) { return (React.createElement("img", { key: index, className: cx('UserSelect-avatar-img'), src: item[labelField], alt: "" })); });
        }
        return selectedOptions.map(function (item) { return item[labelField]; }).join(',');
    };
    UserSelectControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, showNav = _a.showNav, navTitle = _a.navTitle, searchable = _a.searchable, options = _a.options, className = _a.className; _a.style; var selectedOptions = _a.selectedOptions, tabOptions = _a.tabOptions, multi = _a.multi, multiple = _a.multiple, isDep = _a.isDep, isRef = _a.isRef, placeholder = _a.placeholder, searchPlaceholder = _a.searchPlaceholder, tabMode = _a.tabMode, data = _a.data, displayFields = _a.displayFields, labelField = _a.labelField, loadingConfig = _a.loadingConfig;
        tabOptions === null || tabOptions === void 0 ? void 0 : tabOptions.forEach(function (item) {
            item.deferLoad = _this.deferLoad;
            item.onChange = _this.changeValue;
            item.onSearch = _this.onSearch;
        });
        return (React.createElement("div", { className: cx("UserSelectControl", className) }, tabMode ? (React.createElement(UserTabSelect, { selection: selectedOptions, tabOptions: tabOptions, multiple: multiple, onChange: this.changeValue, onSearch: this.onSearch, deferLoad: this.deferLoad, data: data })) : (React.createElement(UserSelect, { loadingConfig: loadingConfig, showNav: showNav, navTitle: navTitle, selection: selectedOptions, options: options, multi: multi, multiple: multiple, searchable: searchable, placeholder: placeholder, searchPlaceholder: searchPlaceholder, deferLoad: this.deferLoad, onChange: this.changeValue, onSearch: this.onSearch, displayFields: displayFields, labelField: labelField, isDep: isDep, isRef: isRef }))));
    };
    UserSelectControl.defaultProps = {
        showNav: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Function, Object]),
        __metadata("design:returntype", Promise)
    ], UserSelectControl.prototype, "onSearch", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Boolean, Object]),
        __metadata("design:returntype", Promise)
    ], UserSelectControl.prototype, "deferLoad", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], UserSelectControl.prototype, "changeValue", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserSelectControl.prototype, "render", null);
    return UserSelectControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(UserSelectControlRenderer, _super);
    function UserSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserSelectControlRenderer = __decorate([
        OptionsControl({
            type: 'users-select'
        })
    ], UserSelectControlRenderer);
    return UserSelectControlRenderer;
})(UserSelectControl));

export { UserSelectControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
