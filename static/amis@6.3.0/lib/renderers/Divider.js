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

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Divider = /** @class */ (function (_super) {
    tslib.__extends(Divider, _super);
    function Divider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Divider.prototype.render = function () {
        var _a = this.props, render = _a.render, cx = _a.classnames, className = _a.className, _b = _a.style, style = _b === void 0 ? {} : _b, lineStyle = _a.lineStyle, direction = _a.direction, color = _a.color, rotate = _a.rotate, title = _a.title, titleClassName = _a.titleClassName, titlePosition = _a.titlePosition, id = _a.id, themeCss = _a.themeCss, env = _a.env, data = _a.data;
        var borderColor = {};
        if (color) {
            // 处理渐变色的情况
            if (~(color === null || color === void 0 ? void 0 : color.indexOf('linear-gradient'))) {
                borderColor.borderImage = color + ' 10';
            }
            else {
                borderColor.borderColor = color;
            }
        }
        var transform = (style === null || style === void 0 ? void 0 : style.transform) || '';
        if (rotate) {
            transform += " rotate(".concat(rotate, "deg)");
        }
        if (amisCore.isPureVariable(title)) {
            title = amisCore.resolveVariableAndFilter(title, data);
        }
        var classNames = cx('Divider', lineStyle ? "Divider--".concat(lineStyle) : '', direction === 'vertical' ? 'Divider--vertical' : 'Divider--horizontal', title && direction !== 'vertical' ? 'Divider--with-text' : '', title && direction !== 'vertical' && titlePosition
            ? "Divider--with-text-".concat(titlePosition)
            : '', title && direction !== 'vertical'
            ? amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'titleWrapperControlClassName', id: id, themeCss: themeCss }))
            : '', className);
        return (_J$X_("div", { className: classNames, style: tslib.__assign(tslib.__assign(tslib.__assign({}, style), borderColor), { transform: transform }) },
            title && direction !== 'vertical' ? (_J$X_("span", { className: cx("Divider-text Divider-text-".concat(titlePosition, " ").concat(titleClassName), amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'titleControlClassName', id: id, themeCss: themeCss }))) }, render('title', title))) : null,
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'titleWrapperControlClassName',
                            weights: {
                                default: {
                                    suf: '::before',
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'titleWrapperControlClassName',
                            weights: {
                                default: {
                                    suf: '::after',
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'titleControlClassName',
                            weights: {
                                default: {
                                    important: true
                                }
                            }
                        }
                    ],
                    id: id
                }, env: env }))));
    };
    Divider.defaultProps = {
        className: '',
        lineStyle: 'solid',
        titleClassName: '',
        titlePosition: 'center'
    };
    return Divider;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(DividerRenderer, _super);
    function DividerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DividerRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'divider'
        })
    ], DividerRenderer);
    return DividerRenderer;
})(Divider));

exports["default"] = Divider;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
