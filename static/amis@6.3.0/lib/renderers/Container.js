/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var merge = require('lodash/merge');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Container = /** @class */ (function (_super) {
    tslib.__extends(Container, _super);
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
            return (_J$X_("div", { className: cx('Container-body', bodyClassName) }, containerBody));
        }
        else {
            return containerBody;
        }
    };
    Container.prototype.render = function () {
        var _a = this.props, className = _a.className, wrapperComponent = _a.wrapperComponent, size = _a.size, cx = _a.classnames, style = _a.style, data = _a.data, draggable = _a.draggable, draggableConfig = _a.draggableConfig, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss; _a.baseControlClassName; _a.testid;
        var finalDraggable = amisCore.isPureVariable(draggable)
            ? amisCore.resolveVariableAndFilter(draggable, data, '| raw')
            : draggable;
        var finalDraggableConfig = merge__default["default"](Container.defaultProps.draggableConfig, amisCore.isPureVariable(draggableConfig)
            ? amisCore.resolveVariableAndFilter(draggableConfig, data, '| raw')
            : draggableConfig);
        var Component = wrapperComponent || 'div';
        var contentDom = (_J$X_(Component, { className: cx('Container', size && size !== 'none' ? "Container--".concat(size) : '', className, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, style: amisCore.buildStyle(style, data) },
            this.renderBody(),
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
        return finalDraggable ? (_J$X_(amisUi.DndContainer, tslib.__assign({}, finalDraggableConfig, { draggable: true }), contentDom)) : (contentDom);
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
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Container.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Container.prototype, "handleMouseEnter", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Container.prototype, "handleMouseLeave", null);
    return Container;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(ContainerRenderer, _super);
    function ContainerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContainerRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'container'
        })
    ], ContainerRenderer);
    return ContainerRenderer;
})(Container));

exports["default"] = Container;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
