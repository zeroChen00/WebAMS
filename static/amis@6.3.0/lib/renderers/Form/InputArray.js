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
var Combo = require('./Combo.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var InputArrayControl = /** @class */ (function (_super) {
    tslib.__extends(InputArrayControl, _super);
    function InputArrayControl(props) {
        var _this = _super.call(this, props) || this;
        _this.comboRef = _this.comboRef.bind(_this);
        return _this;
    }
    InputArrayControl.prototype.comboRef = function (ref) {
        this.comboInstance = ref;
    };
    InputArrayControl.prototype.validate = function (args) {
        return this.comboInstance ? this.comboInstance.validate() : null;
    };
    InputArrayControl.prototype.render = function () {
        var _a = this.props, items = _a.items, scaffold = _a.scaffold, rest = tslib.__rest(_a, ["items", "scaffold"]);
        // 传入多个元素时只接受首个元素，因为input-array相当于打平的combo
        var normalizedItems = Array.isArray(items)
            ? items.length > 1
                ? items.slice(0, 1)
                : items
            : items != null
                ? [items]
                : [];
        return (_J$X_(Combo["default"], tslib.__assign({}, rest, { scaffold: scaffold, items: normalizedItems, flat: true, multiple: true, multiLine: false, ref: this.comboRef })));
    };
    return InputArrayControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(ArrayControlRenderer, _super);
    function ArrayControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-array',
            storeType: amisCore.ComboStore.name
        })
    ], ArrayControlRenderer);
    return ArrayControlRenderer;
})(InputArrayControl));

exports["default"] = InputArrayControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
