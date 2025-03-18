/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate, __metadata, __rest, __assign } from 'tslib';
import React from 'react';
import { autobind, themeable, Renderer, filter } from 'amis-core';
import { Icon, TooltipWrapper } from 'amis-ui';

function filterContents(tooltip, data) {
    if (typeof tooltip === 'string') {
        return filter(tooltip, data);
    }
    else if (tooltip) {
        var title = tooltip.title, content = tooltip.content, body = tooltip.body, rest = __rest(tooltip, ["title", "content", "body"]);
        return title || content || body
            ? __assign(__assign({}, rest), { title: filter(title, data), content: content || body ? filter(content || body || '', data) : undefined }) : undefined;
    }
    return tooltip;
}
var Remark = /** @class */ (function (_super) {
    __extends(Remark, _super);
    function Remark() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Remark.prototype.showModalTip = function (tooltip) {
        var _a = this.props, onAction = _a.onAction, data = _a.data;
        return function (e) {
            onAction &&
                onAction(e, {
                    actionType: 'dialog',
                    dialog: {
                        title: tooltip && typeof tooltip !== 'string' ? tooltip.title : '',
                        body: tooltip && typeof tooltip !== 'string'
                            ? tooltip.content
                            : tooltip,
                        actions: []
                    }
                }, data);
        };
    };
    Remark.prototype.renderLabel = function (finalIcon, finalLabel, cx, shape) {
        var shapeClass = shape ? "Remark-icon--".concat(shape) : undefined;
        return (React.createElement(React.Fragment, null,
            finalLabel ? React.createElement("span", null, finalLabel) : null,
            React.createElement("span", { className: cx('Remark-icon', shapeClass) },
                React.createElement(Icon, { cx: cx, icon: finalIcon || 'question-mark' }))));
    };
    Remark.prototype.render = function () {
        var _a, _b, _c;
        var _d = this.props, className = _d.className, style = _d.style, icon = _d.icon, label = _d.label, shape = _d.shape, tooltip = _d.tooltip, placement = _d.placement, rootClose = _d.rootClose, trigger = _d.trigger, container = _d.container, popOverContainer = _d.popOverContainer, ns = _d.classPrefix, cx = _d.classnames, content = _d.content, data = _d.data, env = _d.env, tooltipClassName = _d.tooltipClassName, mobileUI = _d.mobileUI;
        var finalIcon = (_a = tooltip === null || tooltip === void 0 ? void 0 : tooltip.icon) !== null && _a !== void 0 ? _a : icon;
        var finalLabel = (_b = tooltip === null || tooltip === void 0 ? void 0 : tooltip.label) !== null && _b !== void 0 ? _b : label;
        var finalShape = (_c = tooltip === null || tooltip === void 0 ? void 0 : tooltip.shape) !== null && _c !== void 0 ? _c : shape;
        var parsedTip = filterContents(tooltip || content, data);
        // 移动端使用弹框提示
        if (mobileUI) {
            return (React.createElement("div", { className: cx("Remark", (tooltip && tooltip.className) || className || "Remark--warning"), style: style, onClick: this.showModalTip(parsedTip) }, this.renderLabel(finalIcon, finalLabel, cx, finalShape)));
        }
        return (React.createElement(TooltipWrapper, { classPrefix: ns, classnames: cx, tooltip: parsedTip, tooltipClassName: (tooltip && tooltip.tooltipClassName) || tooltipClassName, placement: (tooltip && tooltip.placement) || placement, rootClose: (tooltip && tooltip.rootClose) || rootClose, trigger: (tooltip && tooltip.trigger) || trigger, container: container || popOverContainer || env.getModalContainer, delay: tooltip && tooltip.delay },
            React.createElement("div", { className: cx("Remark", (tooltip && tooltip.className) || className || "Remark--warning"), style: style }, this.renderLabel(finalIcon, finalLabel, cx, finalShape))));
    };
    Remark.propsList = [];
    Remark.defaultProps = {
        icon: '',
        trigger: ['hover', 'focus']
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Remark.prototype, "showModalTip", null);
    return Remark;
}(React.Component));
themeable(Remark);
/** @class */ ((function (_super) {
    __extends(RemarkRenderer, _super);
    function RemarkRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemarkRenderer = __decorate([
        Renderer({
            type: 'remark'
        })
    ], RemarkRenderer);
    return RemarkRenderer;
})(Remark));

export { filterContents };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
