/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { resolveVariableAndFilter, Renderer } from 'amis-core';
import mapValues from 'lodash/mapValues';

var WebComponent = /** @class */ (function (_super) {
    __extends(WebComponent, _super);
    function WebComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebComponent.prototype.renderBody = function () {
        var _a = this.props, body = _a.body, render = _a.render;
        return body ? render('body', body) : null;
    };
    WebComponent.prototype.render = function () {
        var _a = this.props, tag = _a.tag, props = _a.props, data = _a.data, style = _a.style;
        var propsValues = mapValues(props, function (s) {
            if (typeof s === 'string') {
                return resolveVariableAndFilter(s, data, '| raw') || s;
            }
            else {
                return s;
            }
        });
        var Component = tag || 'div';
        return (React.createElement(Component, __assign({}, propsValues, { style: style }), this.renderBody()));
    };
    return WebComponent;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(WebComponentRenderer, _super);
    function WebComponentRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebComponentRenderer = __decorate([
        Renderer({
            type: 'web-component'
        })
    ], WebComponentRenderer);
    return WebComponentRenderer;
})(WebComponent));

export { WebComponent as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
