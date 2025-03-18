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
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var LocationControl = /** @class */ (function (_super) {
    tslib.__extends(LocationControl, _super);
    function LocationControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.domRef = React__default["default"].createRef();
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onChange, dispatcher;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onChange = _a.onChange;
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, { value: value }))];
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
            return _J$X_(React__default["default"].Fragment, null, displayValue);
        }
        return (_J$X_("div", { className: this.props.classnames('LocationControl', {
                'is-mobile': amisCore.isMobile()
            }), ref: this.domRef },
            _J$X_("span", null, value.address)));
    };
    LocationControl.prototype.render = function () {
        var _a = this.props; _a.style; var env = _a.env;
        amisCore.filter(this.props.ak, this.props.data) || env.locationPickerAK;
        return (_J$X_("div", { className: this.props.classnames('LocationControl', {
                'is-mobile': amisCore.isMobile()
            }) },
            _J$X_(amisUi.LocationPicker, tslib.__assign({}, this.props, { ak: amisCore.filter(this.props.ak, this.props.data), onChange: this.handleChange }))));
    };
    LocationControl.defaultProps = {
        vendor: 'baidu',
        coordinatesType: 'bd09'
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], LocationControl.prototype, "close", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], LocationControl.prototype, "open", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], LocationControl.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], LocationControl.prototype, "handleChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], LocationControl.prototype, "getParent", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], LocationControl.prototype, "getTarget", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], LocationControl.prototype, "render", null);
    return LocationControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(LocationRenderer, _super);
    function LocationRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocationRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'location-picker'
        })
    ], LocationRenderer);
    return LocationRenderer;
})(LocationControl));

exports.LocationControl = LocationControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
