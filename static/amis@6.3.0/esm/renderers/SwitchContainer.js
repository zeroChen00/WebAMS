/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { isVisible, setThemeClassName, buildStyle, CustomStyle, autobind, Renderer } from 'amis-core';

var SwitchContainer = /** @class */ (function (_super) {
    __extends(SwitchContainer, _super);
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
        return React.createElement("div", { style: { display: 'inline' } }, containerBody);
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
        var activeItem = (_a = items[this.state.activeIndex]) !== null && _a !== void 0 ? _a : items.find(function (item) { return isVisible(item, data); });
        var contentDom = (React.createElement("div", { className: cx('SwitchContainer', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, style: buildStyle(style, data) },
            activeItem && this.renderBody(activeItem),
            React.createElement(CustomStyle, { config: {
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
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SwitchContainer.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SwitchContainer.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SwitchContainer.prototype, "handleMouseLeave", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], SwitchContainer.prototype, "renderBody", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], SwitchContainer.prototype, "switchTo", null);
    return SwitchContainer;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(SwitchContainerRenderer, _super);
    function SwitchContainerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchContainerRenderer = __decorate([
        Renderer({
            type: 'switch-container'
        })
    ], SwitchContainerRenderer);
    return SwitchContainerRenderer;
})(SwitchContainer));

export { SwitchContainer as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
