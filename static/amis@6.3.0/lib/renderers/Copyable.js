/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var hoistNonReactStatic = require('hoist-non-react-statics');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var hoistNonReactStatic__default = /*#__PURE__*/_interopDefaultLegacy(hoistNonReactStatic);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var HocCopyable = function () {
    return function (Component) {
        var QuickEditComponent = /** @class */ (function (_super) {
            tslib.__extends(QuickEditComponent, _super);
            function QuickEditComponent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            QuickEditComponent.prototype.handleClick = function (content) {
                var _a = this.props, env = _a.env, copyFormat = _a.copyFormat;
                env.copy && env.copy(content, { format: copyFormat });
            };
            QuickEditComponent.prototype.render = function () {
                var _a = this.props, name = _a.name, className = _a.className, data = _a.data, noHoc = _a.noHoc, cx = _a.classnames, __ = _a.translate, env = _a.env, tooltipContainer = _a.tooltipContainer;
                var copyable = this.props.copyable;
                if (copyable && !noHoc) {
                    var content = amisCore.filter(copyable.content || '${' + name + ' | raw }', data);
                    var tooltip = (copyable === null || copyable === void 0 ? void 0 : copyable.tooltip) != null
                        ? amisCore.filter(copyable.tooltip, data)
                        : copyable === null || copyable === void 0 ? void 0 : copyable.tooltip;
                    if (content) {
                        return (_J$X_(Component, tslib.__assign({}, this.props, { className: cx("Field--copyable", className) }),
                            _J$X_(Component, tslib.__assign({}, this.props, { contentsOnly: true, noHoc: true })),
                            _J$X_(amisUi.TooltipWrapper, { placement: "right", tooltip: tooltip !== null && tooltip !== void 0 ? tooltip : __('Copyable.tip'), trigger: "hover", container: tooltipContainer || (env === null || env === void 0 ? void 0 : env.getModalContainer) },
                                _J$X_("a", { key: "edit-btn", className: cx('Field-copyBtn'), onClick: this.handleClick.bind(this, content) },
                                    _J$X_(amisUi.Icon, { icon: "copy", className: "icon" })))));
                    }
                }
                return _J$X_(Component, tslib.__assign({}, this.props));
            };
            QuickEditComponent.ComposedComponent = Component;
            return QuickEditComponent;
        }(React__default["default"].PureComponent));
        hoistNonReactStatic__default["default"](QuickEditComponent, Component);
        return QuickEditComponent;
    };
};

exports.HocCopyable = HocCopyable;
exports["default"] = HocCopyable;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
