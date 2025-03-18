/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __awaiter, __generator, __spreadArray, __read, __rest, __decorate, __metadata } from 'tslib';
import React from 'react';
import cx from 'classnames';
import { isEffectiveApi, resolveEventData, OptionsControl } from 'amis-core';
import { Select, Spinner } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';

var ChainedSelectControl = /** @class */ (function (_super) {
    __extends(ChainedSelectControl, _super);
    function ChainedSelectControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            stack: []
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.loadMore = _this.loadMore.bind(_this);
        return _this;
    }
    ChainedSelectControl.prototype.componentDidMount = function () {
        var _a, _b;
        var formInited = this.props.formInited;
        formInited || !this.props.addHook
            ? this.loadMore()
            : (_b = (_a = this.props).addHook) === null || _b === void 0 ? void 0 : _b.call(_a, this.loadMore, 'init');
    };
    ChainedSelectControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (prevProps.options !== props.options) {
            this.setState({
                stack: []
            });
        }
        else if (props.formInited && props.value !== prevProps.value) {
            this.loadMore();
        }
    };
    ChainedSelectControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange('');
        }
        else if (actionType === 'reset') {
            onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    ChainedSelectControl.prototype.array2value = function (arr, isExtracted) {
        if (isExtracted === void 0) { isExtracted = false; }
        var _a = this.props, delimiter = _a.delimiter, joinValues = _a.joinValues, extractValue = _a.extractValue;
        // 判断arr的项是否已抽取
        return isExtracted
            ? joinValues
                ? arr.join(delimiter || ',')
                : arr
            : joinValues
                ? arr.join(delimiter || ',')
                : extractValue
                    ? arr.map(function (item) { return item.value || item; })
                    : arr;
    };
    ChainedSelectControl.prototype.loadMore = function () {
        var _this = this;
        var _a = this.props, value = _a.value, delimiter = _a.delimiter, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, source = _a.source, data = _a.data, env = _a.env, dispatchEvent = _a.dispatchEvent;
        var arr = Array.isArray(value)
            ? value.concat()
            : value && typeof value === 'string'
                ? value.split(delimiter || ',')
                : [];
        var idx = 0;
        var len = this.state.stack.length;
        while (idx < len &&
            arr[idx] &&
            this.state.stack[idx].parentId ==
                (joinValues || extractValue ? arr[idx] : arr[idx].value)) {
            idx++;
        }
        if (!arr[idx] || !env || !isEffectiveApi(source, data)) {
            return;
        }
        var parentId = joinValues || extractValue ? arr[idx] : arr[idx].value;
        var stack = this.state.stack.concat();
        stack.splice(idx, stack.length - idx);
        stack.push({
            parentId: parentId,
            loading: true,
            options: []
        });
        this.setState({
            stack: stack
        }, function () {
            env
                .fetcher(source, __assign(__assign({}, data), { value: arr, level: idx + 1, parentId: parentId, parent: arr[idx] }))
                .then(function (ret) { return __awaiter(_this, void 0, void 0, function () {
                var stack, remoteValue, options, valueRes, rendererEvent;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            stack = this.state.stack.concat();
                            remoteValue = ret.data ? ret.data.value : undefined;
                            options = ((_a = ret === null || ret === void 0 ? void 0 : ret.data) === null || _a === void 0 ? void 0 : _a.options) ||
                                ((_b = ret === null || ret === void 0 ? void 0 : ret.data) === null || _b === void 0 ? void 0 : _b.items) ||
                                ((_c = ret === null || ret === void 0 ? void 0 : ret.data) === null || _c === void 0 ? void 0 : _c.rows) ||
                                ret.data ||
                                [];
                            stack.splice(idx, stack.length - idx);
                            if (!(typeof remoteValue !== 'undefined')) return [3 /*break*/, 2];
                            arr.splice(idx + 1, value.length - idx - 1);
                            arr.push(remoteValue);
                            valueRes = this.array2value(arr, true);
                            return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: valueRes }))];
                        case 1:
                            rendererEvent = _d.sent();
                            if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                                return [2 /*return*/];
                            }
                            onChange(valueRes);
                            _d.label = 2;
                        case 2:
                            stack.push({
                                options: options,
                                parentId: parentId,
                                loading: false,
                                visible: Array.isArray(options) && !isEmpty(options)
                            });
                            this.setState({
                                stack: stack
                            }, this.loadMore);
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (e) {
                !(source === null || source === void 0 ? void 0 : source.silent) && env.notify('error', e.message);
            });
        });
    };
    ChainedSelectControl.prototype.handleChange = function (index, currentValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, value, delimiter, onChange, joinValues, dispatchEvent, arr, valueRes, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, value = _a.value, delimiter = _a.delimiter, onChange = _a.onChange, joinValues = _a.joinValues, _a.extractValue, dispatchEvent = _a.dispatchEvent, _a.data;
                        arr = Array.isArray(value)
                            ? value.concat()
                            : value && typeof value === 'string'
                                ? value.split(delimiter || ',')
                                : [];
                        arr.splice(index, arr.length - index);
                        arr.push(joinValues ? currentValue.value : currentValue);
                        valueRes = this.array2value(arr);
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: valueRes }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(valueRes);
                        return [2 /*return*/];
                }
            });
        });
    };
    ChainedSelectControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    ChainedSelectControl.prototype.renderStatic = function (displayValue) {
        if (displayValue === void 0) { displayValue = '-'; }
        var _a = this.props, _b = _a.options, options = _b === void 0 ? [] : _b, _c = _a.labelField, labelField = _c === void 0 ? 'label' : _c, _d = _a.valueField, valueField = _d === void 0 ? 'value' : _d, classPrefix = _a.classPrefix, cx = _a.classnames, className = _a.className, value = _a.value, delimiter = _a.delimiter;
        var allOptions = __spreadArray([{ options: options, visible: true }], __read((this.state.stack || [])), false);
        var valueArr = Array.isArray(value)
            ? value.concat()
            : value && typeof value === 'string'
                ? value.split(delimiter || ',')
                : [];
        if ((valueArr === null || valueArr === void 0 ? void 0 : valueArr.length) > 0) {
            displayValue = valueArr
                .map(function (value, index) {
                var _a;
                var _b = allOptions[index] || {}, options = _b.options, visible = _b.visible;
                if (visible === false) {
                    return null;
                }
                if (!options || !options.length) {
                    return value;
                }
                var selectedOption = find(options, function (o) { return value === o[valueField]; }) || {};
                return (_a = selectedOption[labelField]) !== null && _a !== void 0 ? _a : value;
            })
                .filter(function (v) { return v != null; })
                .join(' > ');
        }
        return (React.createElement("div", { className: cx("".concat(classPrefix, "SelectStaticControl"), className) }, displayValue));
    };
    ChainedSelectControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, options = _a.options, ns = _a.classPrefix, className = _a.className; _a.style; _a.inline; var loading = _a.loading, value = _a.value, delimiter = _a.delimiter; _a.joinValues; _a.extractValue; _a.multiple; var mobileUI = _a.mobileUI, env = _a.env, testIdBuilder = _a.testIdBuilder, rest = __rest(_a, ["options", "classPrefix", "className", "style", "inline", "loading", "value", "delimiter", "joinValues", "extractValue", "multiple", "mobileUI", "env", "testIdBuilder"]);
        var arr = Array.isArray(value)
            ? value.concat()
            : value && typeof value === 'string'
                ? value.split(delimiter || ',')
                : [];
        var hasStackLoading = this.state.stack.find(function (a) { return a.loading; });
        return (React.createElement("div", { className: cx("".concat(ns, "ChainedSelectControl"), className) },
            React.createElement(Select, __assign({}, rest, { mobileUI: mobileUI, popOverContainer: mobileUI
                    ? env === null || env === void 0 ? void 0 : env.getModalContainer
                    : rest.popOverContainer || (env === null || env === void 0 ? void 0 : env.getModalContainer), classPrefix: ns, key: "base", testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('base'), options: Array.isArray(options) ? options : [], value: arr[0], onChange: this.handleChange.bind(this, 0), loading: loading, inline: true })),
            this.state.stack.map(function (_a, index) {
                var options = _a.options, loading = _a.loading, visible = _a.visible;
                // loading 中的选项不展示，避免没值再隐藏造成的闪烁，改用一个 Spinner 来展示 loading 状态
                return visible === false || loading ? null : (React.createElement(Select, __assign({}, rest, { mobileUI: mobileUI, popOverContainer: mobileUI
                        ? env.getModalContainer
                        : rest.popOverContainer || (env === null || env === void 0 ? void 0 : env.getModalContainer), classPrefix: ns, key: "x-".concat(index + 1), testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("x-".concat(index + 1)), options: Array.isArray(options) ? options : [], value: arr[index + 1], onChange: _this.handleChange.bind(_this, index + 1), inline: true })));
            }),
            hasStackLoading && (React.createElement(Spinner, { size: "sm", className: cx("".concat(ns, "ChainedSelectControl-spinner")) }))));
    };
    ChainedSelectControl.defaultProps = {
        clearable: false,
        searchable: false,
        multiple: true
    };
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ChainedSelectControl.prototype, "render", null);
    return ChainedSelectControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ChainedSelectControlRenderer, _super);
    function ChainedSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChainedSelectControlRenderer = __decorate([
        OptionsControl({
            type: 'chained-select',
            sizeMutable: false
        })
    ], ChainedSelectControlRenderer);
    return ChainedSelectControlRenderer;
})(ChainedSelectControl));

export { ChainedSelectControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
