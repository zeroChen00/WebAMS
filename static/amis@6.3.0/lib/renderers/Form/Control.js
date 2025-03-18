/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
/** @class */ ((function (_super) {
    tslib.__extends(ControlRenderer, _super);
    function ControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlRenderer.prototype.renderInput = function () {
        var _a = this.props, render = _a.render, body = _a.body, name = _a.name, data = _a.data;
        return render('inner', body, {
            value: typeof name === 'string' ? amisCore.resolveVariable(name, data) : undefined
        });
    };
    ControlRenderer.prototype.render = function () {
        var _a;
        var _b = this.props, render = _b.render, label = _b.label; _b.control; var rest = tslib.__rest(_b, ["render", "label", "control"]);
        return (_J$X_(amisCore.FormItemWrap, tslib.__assign({}, rest, { formMode: (_a = rest.mode) !== null && _a !== void 0 ? _a : rest.formMode, render: render, sizeMutable: false, label: label, renderControl: this.renderInput })));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], ControlRenderer.prototype, "renderInput", null);
    ControlRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'control'
        })
    ], ControlRenderer);
    return ControlRenderer;
})(React__default["default"].Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
