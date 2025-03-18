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

var UUIDControl = /** @class */ (function (_super) {
    tslib.__extends(UUIDControl, _super);
    function UUIDControl(props) {
        var _this = _super.call(this, props) || this;
        if (!props.value) {
            _this.setValue();
        }
        return _this;
    }
    UUIDControl.prototype.componentDidUpdate = function (props) {
        if (!props.value && props.formInited !== false) {
            this.setValue();
        }
    };
    UUIDControl.prototype.setValue = function () {
        var props = this.props;
        var uuid = amisCore.uuidv4();
        if (props.length) {
            uuid = uuid.substring(0, props.length);
        }
        props.onChange(uuid);
    };
    UUIDControl.prototype.render = function () {
        return null;
    };
    return UUIDControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(UUIDControlRenderer, _super);
    function UUIDControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UUIDControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'uuid',
            wrap: false,
            sizeMutable: false
        })
    ], UUIDControlRenderer);
    return UUIDControlRenderer;
})(UUIDControl));

exports["default"] = UUIDControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
