/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __decorate, __metadata } from 'tslib';
import React from 'react';
import { Checkbox } from 'amis-ui';
import { buildStyle, autobind, Renderer } from 'amis-core';

var Card2 = /** @class */ (function (_super) {
    __extends(Card2, _super);
    function Card2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Card2.prototype.handleClick = function (e) {
        var _a = this.props, checkOnItemClick = _a.checkOnItemClick, selectable = _a.selectable;
        // 控制选中
        if (checkOnItemClick && selectable) {
            this.handleCheck();
        }
        // TODO 触发事件动作
    };
    Card2.prototype.handleCheck = function () {
        var _a, _b;
        (_b = (_a = this.props).onCheck) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    Card2.prototype.renderCheckbox = function () {
        var _a = this.props, selectable = _a.selectable, cx = _a.classnames, multiple = _a.multiple, disabled = _a.disabled, selected = _a.selected, hideCheckToggler = _a.hideCheckToggler, checkOnItemClick = _a.checkOnItemClick, checkboxClassname = _a.checkboxClassname;
        if (!selectable || (checkOnItemClick && hideCheckToggler)) {
            return null;
        }
        return (React.createElement(Checkbox, { className: cx('Card2-checkbox', checkboxClassname), type: multiple ? 'checkbox' : 'radio', disabled: disabled, checked: selected, onChange: this.handleCheck }));
    };
    /**
     * 渲染内容区
     */
    Card2.prototype.renderBody = function () {
        var _a = this.props, body = _a.body, render = _a.render, cx = _a.classnames, bodyClassName = _a.bodyClassName, rest = __rest(_a, ["body", "render", "classnames", "bodyClassName"]);
        return (React.createElement("div", { className: cx('Card2-body', bodyClassName), onClick: this.handleClick }, body ? render('body', body, rest) : null));
    };
    Card2.prototype.render = function () {
        var _a = this.props, className = _a.className, wrapperComponent = _a.wrapperComponent, cx = _a.classnames, style = _a.style, item = _a.item, selected = _a.selected, checkOnItemClick = _a.checkOnItemClick;
        var Component = wrapperComponent || 'div';
        return (React.createElement(Component, { className: cx('Card2', className, {
                'checkOnItem': checkOnItemClick,
                'is-checked': selected
            }), style: buildStyle(style, item) },
            this.renderBody(),
            this.renderCheckbox()));
    };
    Card2.propsList = ['body', 'className'];
    Card2.defaultProps = {
        className: ''
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Card2.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Card2.prototype, "handleCheck", null);
    return Card2;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(Card2Renderer, _super);
    function Card2Renderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Card2Renderer = __decorate([
        Renderer({
            type: 'card2'
        })
    ], Card2Renderer);
    return Card2Renderer;
})(Card2));

export { Card2 as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
