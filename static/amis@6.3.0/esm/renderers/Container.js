/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import merge from 'lodash/merge';
import { isPureVariable, resolveVariableAndFilter, setThemeClassName, buildStyle, CustomStyle, autobind, Renderer } from 'amis-core';
import { DndContainer } from 'amis-ui';

var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Container.prototype.handleClick = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Container.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Container.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Container.prototype.renderBody = function () {
        var _a = this.props, children = _a.children, body = _a.body, render = _a.render, cx = _a.classnames, bodyClassName = _a.bodyClassName, disabled = _a.disabled, wrapperBody = _a.wrapperBody;
        var isWrapperBody = wrapperBody !== null && wrapperBody !== void 0 ? wrapperBody : true;
        var containerBody = children
            ? typeof children === 'function'
                ? children(this.props)
                : children
            : body
                ? render('body', body, { disabled: disabled })
                : null;
        if (isWrapperBody) {
            return (React.createElement("div", { className: cx('Container-body', bodyClassName) }, containerBody));
        }
        else {
            return containerBody;
        }
    };
    Container.prototype.render = function () {
        var _a = this.props, className = _a.className, wrapperComponent = _a.wrapperComponent, size = _a.size, cx = _a.classnames, style = _a.style, data = _a.data, draggable = _a.draggable, draggableConfig = _a.draggableConfig, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss; _a.baseControlClassName; _a.testid;
        var finalDraggable = isPureVariable(draggable)
            ? resolveVariableAndFilter(draggable, data, '| raw')
            : draggable;
        var finalDraggableConfig = merge(Container.defaultProps.draggableConfig, isPureVariable(draggableConfig)
            ? resolveVariableAndFilter(draggableConfig, data, '| raw')
            : draggableConfig);
        var Component = wrapperComponent || 'div';
        var contentDom = (React.createElement(Component, { className: cx('Container', size && size !== 'none' ? "Container--".concat(size) : '', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, style: buildStyle(style, data) },
            this.renderBody(),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
        return finalDraggable ? (React.createElement(DndContainer, __assign({}, finalDraggableConfig, { draggable: true }), contentDom)) : (contentDom);
    };
    Container.propsList = ['body', 'className'];
    Container.defaultProps = {
        className: '',
        draggableConfig: {
            axis: 'both',
            scale: 1,
            enableUserSelect: false
        }
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Container.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Container.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Container.prototype, "handleMouseLeave", null);
    return Container;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ContainerRenderer, _super);
    function ContainerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContainerRenderer = __decorate([
        Renderer({
            type: 'container'
        })
    ], ContainerRenderer);
    return ContainerRenderer;
})(Container));

export { Container as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
