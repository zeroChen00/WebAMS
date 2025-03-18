/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
/** @class */ ((function (_super) {
    tslib.__extends(AlertRenderer, _super);
    function AlertRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertRenderer.prototype.render = function () {
        var _a = this.props, render = _a.render, body = _a.body, level = _a.level, icon = _a.icon, showIcon = _a.showIcon, actions = _a.actions, rest = tslib.__rest(_a, ["render", "body", "level", "icon", "showIcon", "actions"]);
        if (amisCore.isPureVariable(level)) {
            level = amisCore.resolveVariableAndFilter(level, this.props.data);
        }
        if (amisCore.isPureVariable(icon)) {
            icon = amisCore.resolveVariableAndFilter(icon, this.props.data);
        }
        if (amisCore.isPureVariable(showIcon)) {
            showIcon = amisCore.resolveVariableAndFilter(showIcon, this.props.data);
        }
        var actionsDom = actions
            ? React__default["default"].isValidElement(actions)
                ? actions
                : render('alert-actions', actions)
            : null;
        return (_J$X_(amisUi.Alert2, tslib.__assign({}, rest, { level: level, icon: icon, showIcon: showIcon, actions: actionsDom }), render('body', body)));
    };
    AlertRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'alert'
        })
    ], AlertRenderer);
    return AlertRenderer;
})(React__default["default"].Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
