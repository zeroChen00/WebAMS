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
var SwitchContainer = /** @class */ (function (_super) {
    tslib.__extends(SwitchContainer, _super);
    function SwitchContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeIndex: -1
        };
        return _this;
    }
    SwitchContainer.prototype.componentDidUpdate = function (preProps) {
        var items = this.props.items || [];
        if (this.state.activeIndex > 0 && !items[this.state.activeIndex]) {
            this.setState({
                activeIndex: 0
            });
        }
    };
    SwitchContainer.prototype.handleClick = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    SwitchContainer.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    SwitchContainer.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    SwitchContainer.prototype.renderBody = function (item) {
        var _a = this.props, children = _a.children, render = _a.render, disabled = _a.disabled;
        var body = item === null || item === void 0 ? void 0 : item.body;
        var containerBody = children
            ? typeof children === 'function'
                ? children(this.props)
                : children
            : body
                ? render('body', body, { disabled: disabled })
                : null;
        return _J$X_("div", { style: { display: 'inline' } }, containerBody);
    };
    SwitchContainer.prototype.switchTo = function (index) {
        var items = this.props.items || [];
        if (index >= 0 && index < items.length) {
            this.setState({ activeIndex: index });
        }
    };
    SwitchContainer.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, _c = _b.items, items = _c === void 0 ? [] : _c, cx = _b.classnames, style = _b.style, data = _b.data, id = _b.id, wrapperCustomStyle = _b.wrapperCustomStyle, env = _b.env, themeCss = _b.themeCss;
        var activeItem = (_a = items[this.state.activeIndex]) !== null && _a !== void 0 ? _a : items.find(function (item) { return amisCore.isVisible(item, data); });
        var contentDom = (_J$X_("div", { className: cx('SwitchContainer', className, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, style: amisCore.buildStyle(style, data) },
            activeItem && this.renderBody(activeItem),
            _J$X_(amisCore.CustomStyle, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env })));
        return contentDom;
    };
    SwitchContainer.propsList = ['body', 'className'];
    SwitchContainer.defaultProps = {
        className: ''
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], SwitchContainer.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], SwitchContainer.prototype, "handleMouseEnter", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], SwitchContainer.prototype, "handleMouseLeave", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Object)
    ], SwitchContainer.prototype, "renderBody", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Number]),
        tslib.__metadata("design:returntype", void 0)
    ], SwitchContainer.prototype, "switchTo", null);
    return SwitchContainer;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(SwitchContainerRenderer, _super);
    function SwitchContainerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchContainerRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'switch-container'
        })
    ], SwitchContainerRenderer);
    return SwitchContainerRenderer;
})(SwitchContainer));

exports["default"] = SwitchContainer;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
