/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { Renderer, isPureVariable, resolveVariableAndFilter, createObject, filter } from 'amis-core';
import { withRemoteConfig, Timeline } from 'amis-ui';

function TimelineCmpt(props) {
    var items = props.items, mode = props.mode, style = props.style, direction = props.direction, reverse = props.reverse, data = props.data, itemTitleSchema = props.itemTitleSchema, className = props.className, timeClassName = props.timeClassName, titleClassName = props.titleClassName, detailClassName = props.detailClassName, render = props.render;
    // 渲染内容
    var resolveRender = function (region, val) {
        return typeof val === 'string' ? filter(val, data) : val && render(region, val);
    };
    // 处理源数据
    var resolveTimelineItems = (items || []).map(function (timelineItem, index) {
        var icon = timelineItem.icon, iconClassName = timelineItem.iconClassName, title = timelineItem.title, timeClassName = timelineItem.timeClassName, titleClassName = timelineItem.titleClassName, detailClassName = timelineItem.detailClassName;
        return __assign(__assign({}, timelineItem), { iconClassName: iconClassName, timeClassName: timeClassName, titleClassName: titleClassName, detailClassName: detailClassName, icon: isPureVariable(icon)
                ? resolveVariableAndFilter(icon, data, '| raw')
                : icon, title: itemTitleSchema
                ? render("".concat(index, "/body"), itemTitleSchema, {
                    data: createObject(data, timelineItem)
                })
                : resolveRender('title', title) });
    });
    return (React.createElement(Timeline, { items: resolveTimelineItems, direction: direction, reverse: reverse, mode: mode, style: style, className: className, timeClassName: timeClassName, titleClassName: titleClassName, detailClassName: detailClassName }));
}
var TimelineWithRemoteConfig = withRemoteConfig({
    adaptor: function (data) { return data.items || data; }
})(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        var _a = this.props, config = _a.config, items = _a.items; _a.deferLoad; _a.loading; _a.updateConfig; var rest = __rest(_a, ["config", "items", "deferLoad", "loading", "updateConfig"]);
        var sourceItems = config
            ? Array.isArray(config)
                ? config
                : Object.keys(config).map(function (key) { return ({
                    time: key,
                    title: config[key]
                }); })
            : items || [];
        return React.createElement(TimelineCmpt, __assign({ items: sourceItems }, rest));
    };
    return class_1;
}(React.Component)));
/** @class */ ((function (_super) {
    __extends(TimelineRenderer, _super);
    function TimelineRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineRenderer.prototype.render = function () {
        return React.createElement(TimelineWithRemoteConfig, __assign({}, this.props));
    };
    TimelineRenderer = __decorate([
        Renderer({
            type: 'timeline'
        })
    ], TimelineRenderer);
    return TimelineRenderer;
})(React.Component));

export { TimelineCmpt };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
