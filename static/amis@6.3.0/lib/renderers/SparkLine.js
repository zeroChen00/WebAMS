/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var amisUi = require('amis-ui');
var amisCore = require('amis-core');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
/** @class */ ((function (_super) {
    tslib.__extends(SparkLineRenderer, _super);
    function SparkLineRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SparkLineRenderer.prototype.handleClick = function (e, ctx) {
        var _a = this.props, disabled = _a.disabled, onAction = _a.onAction, clickAction = _a.clickAction, data = _a.data;
        if (e.defaultPrevented || !clickAction || disabled) {
            return;
        }
        onAction === null || onAction === void 0 ? void 0 : onAction(null, clickAction, ctx ? amisCore.createObject(data, ctx) : data);
    };
    SparkLineRenderer.prototype.render = function () {
        var _a = this.props; _a.value; _a.name; var clickAction = _a.clickAction, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss;
        var finalValue = amisCore.getPropValue(this.props) || [1, 1];
        return (_J$X_(React__default["default"].Fragment, null,
            _J$X_(amisUi.SparkLine, tslib.__assign({ onClick: clickAction ? this.handleClick : undefined }, this.props, { value: finalValue })),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], SparkLineRenderer.prototype, "handleClick", null);
    SparkLineRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'sparkline'
        })
    ], SparkLineRenderer);
    return SparkLineRenderer;
})(React__default["default"].Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
