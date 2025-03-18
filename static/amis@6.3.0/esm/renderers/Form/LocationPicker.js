/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveEventData, isMobile, filter, autobind, FormItem } from 'amis-core';
import { LocationPicker } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var LocationControl = /** @class */ (function (_super) {
    __extends(LocationControl, _super);
    function LocationControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.domRef = React.createRef();
        _this.state = {
            isOpened: false
        };
        return _this;
    }
    LocationControl.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    LocationControl.prototype.open = function () {
        this.setState({
            isOpened: true
        });
    };
    LocationControl.prototype.handleClick = function () {
        this.state.isOpened ? this.close() : this.open();
    };
    LocationControl.prototype.handleChange = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onChange, dispatcher;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onChange = _a.onChange;
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: value }))];
                    case 1:
                        dispatcher = _b.sent();
                        if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocationControl.prototype.getParent = function () {
        var _a;
        return (_a = this.domRef.current) === null || _a === void 0 ? void 0 : _a.parentElement;
    };
    LocationControl.prototype.getTarget = function () {
        return this.domRef.current;
    };
    LocationControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        switch (actionType) {
            case 'clear':
                onChange('');
                break;
            case 'reset':
                onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : {});
                break;
        }
    };
    LocationControl.prototype.renderStatic = function (displayValue) {
        if (displayValue === void 0) { displayValue = '-'; }
        var _a = this.props; _a.classnames; var value = _a.value;
        this.props.translate;
        if (!value) {
            return React.createElement(React.Fragment, null, displayValue);
        }
        return (React.createElement("div", { className: this.props.classnames('LocationControl', {
                'is-mobile': isMobile()
            }), ref: this.domRef },
            React.createElement("span", null, value.address)));
    };
    LocationControl.prototype.render = function () {
        var _a = this.props; _a.style; var env = _a.env;
        filter(this.props.ak, this.props.data) || env.locationPickerAK;
        return (React.createElement("div", { className: this.props.classnames('LocationControl', {
                'is-mobile': isMobile()
            }) },
            React.createElement(LocationPicker, __assign({}, this.props, { ak: filter(this.props.ak, this.props.data), onChange: this.handleChange }))));
    };
    LocationControl.defaultProps = {
        vendor: 'baidu',
        coordinatesType: 'bd09'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LocationControl.prototype, "close", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LocationControl.prototype, "open", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LocationControl.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], LocationControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LocationControl.prototype, "getParent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LocationControl.prototype, "getTarget", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LocationControl.prototype, "render", null);
    return LocationControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(LocationRenderer, _super);
    function LocationRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocationRenderer = __decorate([
        FormItem({
            type: 'location-picker'
        })
    ], LocationRenderer);
    return LocationRenderer;
})(LocationControl));

export { LocationControl };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
