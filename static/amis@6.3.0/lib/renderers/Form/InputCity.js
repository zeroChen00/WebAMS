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
var getCityFromCode = function (_a) {
    var _b;
    var value = _a.value, db = _a.db, _c = _a.delimiter, delimiter = _c === void 0 ? ',' : _c;
    var result = {
        code: 0,
        province: '',
        provinceCode: 0,
        city: '',
        cityCode: 0,
        district: '',
        districtCode: 0,
        street: ''
    };
    if (!db || !value) {
        return result;
    }
    var code = (value && value.code) ||
        (typeof value === 'number' && value) ||
        (typeof value === 'string' && /(\d{6})/.test(value) && RegExp.$1);
    if (code && db[code]) {
        code = parseInt(code, 10);
        result.code = code;
        var provinceCode = code - (code % 10000);
        if (db[provinceCode]) {
            result.provinceCode = provinceCode;
            result.province = db[provinceCode];
        }
        var cityCode = code - (code % 100);
        if (cityCode !== provinceCode && db[cityCode]) {
            result.cityCode = cityCode;
            result.city = db[cityCode];
        }
        else if (~((_b = db.city[provinceCode]) === null || _b === void 0 ? void 0 : _b.indexOf(code))) {
            result.cityCode = code;
            result.city = db[code];
        }
        if (code % 100) {
            result.district = db[code];
            result.districtCode = code;
        }
    }
    if (value && value.street) {
        result.street = value.street;
    }
    else if (typeof value === 'string' && ~value.indexOf(delimiter)) {
        result.street = value.slice(value.indexOf(delimiter) + delimiter.length);
    }
    return result;
};
var loadDb = function (callback) {
    Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['amis-ui/lib/components/CityDB'], function(mod) {fullfill(tslib.__importStar(mod))})})}).then(callback);
};
var CityPicker = /** @class */ (function (_super) {
    tslib.__extends(CityPicker, _super);
    function CityPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            code: 0,
            province: '',
            provinceCode: 0,
            city: '',
            cityCode: 0,
            district: '',
            districtCode: 0,
            street: ''
        };
        return _this;
    }
    CityPicker.prototype.componentDidMount = function () {
        var _this = this;
        this.loadDb(function () { return _this.syncIn(); });
    };
    CityPicker.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var props = this.props;
        if (props.value !== prevProps.value) {
            this.loadDb(function () { return _this.syncIn(props); });
        }
    };
    CityPicker.prototype.loadDb = function (callback) {
        var _this = this;
        if (this.state.db) {
            callback === null || callback === void 0 ? void 0 : callback();
            return;
        }
        loadDb(function (db) {
            _this.setState({
                db: tslib.__assign(tslib.__assign({}, db.default), { province: db.province, city: db.city, district: db.district })
            }, callback);
        });
        // require.ensure(['./CityDB'], (db: any) =>
        //   this.setState(
        //     {
        //       db: {
        //         ...db.default,
        //         province: db.province,
        //         city: db.city,
        //         district: db.district
        //       }
        //     },
        //     callback
        //   )
        // );
    };
    CityPicker.prototype.handleProvinceChange = function (option) {
        this.setState(option
            ? {
                province: option.label,
                provinceCode: option.value,
                city: '',
                cityCode: 0,
                district: '',
                districtCode: 0,
                street: '',
                code: option ? option.value : 0
            }
            : {
                code: 0,
                province: '',
                provinceCode: 0,
                city: '',
                cityCode: 0,
                district: '',
                districtCode: 0,
                street: ''
            }, this.syncOut);
    };
    CityPicker.prototype.handleCityChange = function (option) {
        if (option.value % 100) {
            return this.handleDistrictChange(option, {
                cityCode: option.value
            });
        }
        this.setState(option
            ? {
                city: option.label,
                cityCode: option.value,
                district: '',
                districtCode: 0,
                street: '',
                code: option.value
            }
            : {
                city: '',
                cityCode: 0,
                district: '',
                districtCode: 0,
                street: '',
                code: this.state.provinceCode
            }, this.syncOut);
    };
    CityPicker.prototype.handleDistrictChange = function (option, otherStates) {
        if (otherStates === void 0) { otherStates = {}; }
        this.setState(option
            ? tslib.__assign(tslib.__assign({}, otherStates), { district: option.label, districtCode: option.value, street: '', code: option.value }) : tslib.__assign(tslib.__assign({}, otherStates), { district: '', districtCode: 0, street: '', code: this.state.cityCode }), this.syncOut);
    };
    CityPicker.prototype.handleStreetChange = function (e) {
        this.setState({
            street: e.currentTarget.value
        });
    };
    CityPicker.prototype.handleStreetEnd = function () {
        this.syncOut();
    };
    CityPicker.prototype.syncIn = function (props) {
        if (props === void 0) { props = this.props; }
        var db = this.state.db;
        var value = props.value, delimiter = props.delimiter;
        if (!db) {
            return;
        }
        this.setState(getCityFromCode({
            value: value,
            delimiter: delimiter,
            db: db
        }));
    };
    CityPicker.prototype.syncOut = function () {
        var _a = this.props, onChange = _a.onChange, allowStreet = _a.allowStreet, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter;
        var _b = this.state, code = _b.code, province = _b.province, city = _b.city, district = _b.district, street = _b.street, provinceCode = _b.provinceCode, cityCode = _b.cityCode, districtCode = _b.districtCode;
        if (typeof extractValue === 'undefined' ? joinValues : extractValue) {
            code
                ? onChange(allowStreet && street
                    ? [code, street].join(delimiter)
                    : String(code))
                : onChange('');
        }
        else {
            onChange({
                code: code,
                provinceCode: provinceCode,
                province: province,
                cityCode: cityCode,
                city: city,
                districtCode: districtCode,
                district: district,
                street: street
            });
        }
    };
    CityPicker.prototype.render = function () {
        var _a, _b;
        var _c = this.props, cx = _c.classnames, className = _c.className; _c.style; var disabled = _c.disabled, allowCity = _c.allowCity, allowDistrict = _c.allowDistrict, allowStreet = _c.allowStreet, searchable = _c.searchable, __ = _c.translate, loadingConfig = _c.loadingConfig, popOverContainer = _c.popOverContainer, itemClassName = _c.itemClassName, testIdBuilder = _c.testIdBuilder;
        var _d = this.state, provinceCode = _d.provinceCode, cityCode = _d.cityCode, districtCode = _d.districtCode, street = _d.street, db = _d.db;
        return db ? (_J$X_("div", { className: cx('CityPicker', className) },
            _J$X_(amisUi.Select, { className: cx(itemClassName), searchable: searchable, disabled: disabled, options: db.province.map(function (item) { return ({
                    label: db[item],
                    value: item
                }); }), value: provinceCode || '', onChange: this.handleProvinceChange, popOverContainer: popOverContainer, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('province') }),
            allowCity && db.city[provinceCode] && db.city[provinceCode].length ? (_J$X_(amisUi.Select, { className: cx(itemClassName), searchable: searchable, disabled: disabled, options: db.city[provinceCode].map(function (item) { return ({
                    label: db[item],
                    value: item
                }); }), value: cityCode || '', onChange: this.handleCityChange, popOverContainer: popOverContainer, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('city') })) : null,
            cityCode &&
                allowDistrict &&
                ((_b = (_a = db.district[provinceCode]) === null || _a === void 0 ? void 0 : _a[cityCode]) === null || _b === void 0 ? void 0 : _b.length) ? (_J$X_(amisUi.Select, { className: cx(itemClassName), searchable: searchable, disabled: disabled, options: db.district[provinceCode][cityCode].map(function (item) { return ({
                    label: db[item],
                    value: item
                }); }), value: districtCode || '', onChange: this.handleDistrictChange, popOverContainer: popOverContainer, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('district') })) : null,
            allowStreet && provinceCode ? (_J$X_("input", tslib.__assign({ className: cx('CityPicker-input'), value: street || '', onChange: this.handleStreetChange, onBlur: this.handleStreetEnd, placeholder: __('City.street'), disabled: disabled }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('street').getTestId()))) : null)) : (_J$X_(amisUi.Spinner, { show: true, size: "sm", loadingConfig: loadingConfig }));
    };
    CityPicker.defaultProps = {
        joinValues: true,
        extractValue: true,
        delimiter: ',',
        allowCity: true,
        allowDistrict: true,
        allowStreet: false
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleProvinceChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleCityChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleDistrictChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleStreetChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleStreetEnd", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "syncIn", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "syncOut", null);
    return CityPicker;
}(React__default["default"].Component));
var ThemedCity = amisCore.themeable(amisCore.localeable(CityPicker));
var LocationControl = /** @class */ (function (_super) {
    tslib.__extends(LocationControl, _super);
    function LocationControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            db: null
        };
        return _this;
    }
    LocationControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange('');
        }
        else if (actionType === 'reset') {
            onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    LocationControl.prototype.handleChange = function (value) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onChange, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onChange = _a.onChange;
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, { value: value }, 'value'))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocationControl.prototype.renderStatic = function (displayValue) {
        var _this = this;
        if (displayValue === void 0) { displayValue = ''; }
        var _a = this.props, value = _a.value, delimiter = _a.delimiter, loadingConfig = _a.loadingConfig;
        if (!this.state.db) {
            loadDb(function (db) {
                _this.setState({
                    db: tslib.__assign(tslib.__assign({}, db.default), { province: db.province, city: db.city, district: db.district })
                });
            });
            return _J$X_(amisUi.Spinner, { size: "sm", show: true, loadingConfig: loadingConfig });
        }
        if (!value) {
            return _J$X_(React__default["default"].Fragment, null, displayValue);
        }
        var _b = getCityFromCode({
            value: value,
            delimiter: delimiter,
            db: this.state.db
        }), province = _b.province, city = _b.city, district = _b.district, street = _b.street;
        return (_J$X_(React__default["default"].Fragment, null, [province, city, district, street].filter(function (v) { return !!v; }).join(delimiter)));
    };
    LocationControl.prototype.render = function () {
        var _a = this.props, value = _a.value, allowCity = _a.allowCity, allowDistrict = _a.allowDistrict, extractValue = _a.extractValue, joinValues = _a.joinValues, allowStreet = _a.allowStreet, disabled = _a.disabled, searchable = _a.searchable, env = _a.env, mobileUI = _a.mobileUI, popOverContainer = _a.popOverContainer, itemClassName = _a.itemClassName, testIdBuilder = _a.testIdBuilder;
        return mobileUI ? (_J$X_(amisUi.CityArea, { value: value, popOverContainer: env === null || env === void 0 ? void 0 : env.getModalContainer, onChange: this.handleChange, allowCity: allowCity, allowDistrict: allowDistrict, extractValue: extractValue, joinValues: joinValues, allowStreet: allowStreet, disabled: disabled, mobileUI: mobileUI })) : (_J$X_(ThemedCity, { itemClassName: itemClassName, popOverContainer: popOverContainer || (env === null || env === void 0 ? void 0 : env.getModalContainer), searchable: searchable, value: value, onChange: this.handleChange, allowCity: allowCity, allowDistrict: allowDistrict, extractValue: extractValue, joinValues: joinValues, allowStreet: allowStreet, disabled: disabled, testIdBuilder: testIdBuilder }));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object, Boolean]),
        tslib.__metadata("design:returntype", void 0)
    ], LocationControl.prototype, "doAction", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], LocationControl.prototype, "handleChange", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], LocationControl.prototype, "render", null);
    return LocationControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(CheckboxControlRenderer, _super);
    function CheckboxControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-city',
            sizeMutable: false
        })
    ], CheckboxControlRenderer);
    return CheckboxControlRenderer;
})(LocationControl));

exports.CityPicker = CityPicker;
exports.LocationControl = LocationControl;
exports["default"] = ThemedCity;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
