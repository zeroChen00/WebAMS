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
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var CollapseGroupRender = /** @class */ (function (_super) {
    tslib.__extends(CollapseGroupRender, _super);
    function CollapseGroupRender(props) {
        return _super.call(this, props) || this;
    }
    CollapseGroupRender.prototype.handleCollapseChange = function (activeKeys, collapseId, collapsed) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onCollapse, renderEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onCollapse = _a.onCollapse;
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, {
                                activeKeys: activeKeys,
                                collapseId: collapseId,
                                collapsed: collapsed
                            }))];
                    case 1:
                        renderEvent = _b.sent();
                        if (renderEvent === null || renderEvent === void 0 ? void 0 : renderEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse(activeKeys, collapseId, collapsed);
                        return [2 /*return*/];
                }
            });
        });
    };
    CollapseGroupRender.prototype.render = function () {
        var _a = this.props, defaultActiveKey = _a.defaultActiveKey, accordion = _a.accordion, expandIcon = _a.expandIcon, expandIconPosition = _a.expandIconPosition, body = _a.body, className = _a.className, style = _a.style, render = _a.render, mobileUI = _a.mobileUI, data = _a.data;
        var enableFieldSetStyle = this.props.enableFieldSetStyle;
        if (amisCore.isPureVariable(enableFieldSetStyle)) {
            enableFieldSetStyle = amisCore.resolveVariableAndFilter(enableFieldSetStyle, data, '| raw');
        }
        return (_J$X_(amisUi.CollapseGroup, { defaultActiveKey: defaultActiveKey, accordion: accordion, expandIcon: expandIcon, expandIconPosition: expandIconPosition, className: className, style: style, mobileUI: mobileUI, onCollapseChange: this.handleCollapseChange }, render('body', body || '', { enableFieldSetStyle: enableFieldSetStyle })));
    };
    CollapseGroupRender.defaultProps = {
        enableFieldSetStyle: true
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Array, Object, Boolean]),
        tslib.__metadata("design:returntype", Promise)
    ], CollapseGroupRender.prototype, "handleCollapseChange", null);
    return CollapseGroupRender;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(CollapseGroupRenderer, _super);
    function CollapseGroupRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollapseGroupRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'collapse-group'
        })
    ], CollapseGroupRenderer);
    return CollapseGroupRenderer;
})(CollapseGroupRender));

exports.CollapseGroupRender = CollapseGroupRender;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
