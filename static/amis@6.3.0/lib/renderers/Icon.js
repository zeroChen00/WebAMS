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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Icon = /** @class */ (function (_super) {
    tslib.__extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon.prototype.handleClick = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Icon.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Icon.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Icon.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, data = _a.data, id = _a.id, themeCss = _a.themeCss, env = _a.env, wrapperCustomStyle = _a.wrapperCustomStyle;
        var icon = this.props.icon;
        if (typeof icon === 'string') {
            icon = amisCore.filter(this.props.icon, data);
        }
        return (_J$X_(React__default["default"].Fragment, null,
            _J$X_(amisUi.Icon, tslib.__assign({}, this.props, { icon: icon, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, className: cx(className, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'className', id: id, themeCss: themeCss })), amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))) })),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'className'
                        }
                    ],
                    id: id
                }, env: env }))));
    };
    Icon.defaultProps = {
        icon: '',
        vendor: 'fa'
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Icon.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Icon.prototype, "handleMouseEnter", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Icon.prototype, "handleMouseLeave", null);
    return Icon;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(IconRenderer, _super);
    function IconRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'icon'
        })
        // @ts-ignore 类型没搞定
        ,
        amisUi.withBadge
    ], IconRenderer);
    return IconRenderer;
})(Icon));

exports.Icon = Icon;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
