/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { isPureVariable, resolveVariableAndFilter, Renderer } from 'amis-core';
import { Alert2 } from 'amis-ui';

/** @class */ ((function (_super) {
    __extends(AlertRenderer, _super);
    function AlertRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertRenderer.prototype.render = function () {
        var _a = this.props, render = _a.render, body = _a.body, level = _a.level, icon = _a.icon, showIcon = _a.showIcon, actions = _a.actions, rest = __rest(_a, ["render", "body", "level", "icon", "showIcon", "actions"]);
        if (isPureVariable(level)) {
            level = resolveVariableAndFilter(level, this.props.data);
        }
        if (isPureVariable(icon)) {
            icon = resolveVariableAndFilter(icon, this.props.data);
        }
        if (isPureVariable(showIcon)) {
            showIcon = resolveVariableAndFilter(showIcon, this.props.data);
        }
        var actionsDom = actions
            ? React.isValidElement(actions)
                ? actions
                : render('alert-actions', actions)
            : null;
        return (React.createElement(Alert2, __assign({}, rest, { level: level, icon: icon, showIcon: showIcon, actions: actionsDom }), render('body', body)));
    };
    AlertRenderer = __decorate([
        Renderer({
            type: 'alert'
        })
    ], AlertRenderer);
    return AlertRenderer;
})(React.Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
