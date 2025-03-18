/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import { SparkLine } from 'amis-ui';
import { createObject, getPropValue, CustomStyle, autobind, Renderer } from 'amis-core';
import React from 'react';

/** @class */ ((function (_super) {
    __extends(SparkLineRenderer, _super);
    function SparkLineRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SparkLineRenderer.prototype.handleClick = function (e, ctx) {
        var _a = this.props, disabled = _a.disabled, onAction = _a.onAction, clickAction = _a.clickAction, data = _a.data;
        if (e.defaultPrevented || !clickAction || disabled) {
            return;
        }
        onAction === null || onAction === void 0 ? void 0 : onAction(null, clickAction, ctx ? createObject(data, ctx) : data);
    };
    SparkLineRenderer.prototype.render = function () {
        var _a = this.props; _a.value; _a.name; var clickAction = _a.clickAction, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss;
        var finalValue = getPropValue(this.props) || [1, 1];
        return (React.createElement(React.Fragment, null,
            React.createElement(SparkLine, __assign({ onClick: clickAction ? this.handleClick : undefined }, this.props, { value: finalValue })),
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
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], SparkLineRenderer.prototype, "handleClick", null);
    SparkLineRenderer = __decorate([
        Renderer({
            type: 'sparkline'
        })
    ], SparkLineRenderer);
    return SparkLineRenderer;
})(React.Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
