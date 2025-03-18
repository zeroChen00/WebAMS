/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveEventData, isPureVariable, resolveVariableAndFilter, autobind, Renderer } from 'amis-core';
import { CollapseGroup } from 'amis-ui';

var CollapseGroupRender = /** @class */ (function (_super) {
    __extends(CollapseGroupRender, _super);
    function CollapseGroupRender(props) {
        return _super.call(this, props) || this;
    }
    CollapseGroupRender.prototype.handleCollapseChange = function (activeKeys, collapseId, collapsed) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onCollapse, renderEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onCollapse = _a.onCollapse;
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, {
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
        if (isPureVariable(enableFieldSetStyle)) {
            enableFieldSetStyle = resolveVariableAndFilter(enableFieldSetStyle, data, '| raw');
        }
        return (React.createElement(CollapseGroup, { defaultActiveKey: defaultActiveKey, accordion: accordion, expandIcon: expandIcon, expandIconPosition: expandIconPosition, className: className, style: style, mobileUI: mobileUI, onCollapseChange: this.handleCollapseChange }, render('body', body || '', { enableFieldSetStyle: enableFieldSetStyle })));
    };
    CollapseGroupRender.defaultProps = {
        enableFieldSetStyle: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object, Boolean]),
        __metadata("design:returntype", Promise)
    ], CollapseGroupRender.prototype, "handleCollapseChange", null);
    return CollapseGroupRender;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(CollapseGroupRenderer, _super);
    function CollapseGroupRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollapseGroupRenderer = __decorate([
        Renderer({
            type: 'collapse-group'
        })
    ], CollapseGroupRenderer);
    return CollapseGroupRenderer;
})(CollapseGroupRender));

export { CollapseGroupRender };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
