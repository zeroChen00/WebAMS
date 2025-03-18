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
function TimelineCmpt(props) {
    var items = props.items, mode = props.mode, style = props.style, direction = props.direction, reverse = props.reverse, data = props.data, itemTitleSchema = props.itemTitleSchema, className = props.className, timeClassName = props.timeClassName, titleClassName = props.titleClassName, detailClassName = props.detailClassName, render = props.render;
    // 渲染内容
    var resolveRender = function (region, val) {
        return typeof val === 'string' ? amisCore.filter(val, data) : val && render(region, val);
    };
    // 处理源数据
    var resolveTimelineItems = (items || []).map(function (timelineItem, index) {
        var icon = timelineItem.icon, iconClassName = timelineItem.iconClassName, title = timelineItem.title, timeClassName = timelineItem.timeClassName, titleClassName = timelineItem.titleClassName, detailClassName = timelineItem.detailClassName;
        return tslib.__assign(tslib.__assign({}, timelineItem), { iconClassName: iconClassName, timeClassName: timeClassName, titleClassName: titleClassName, detailClassName: detailClassName, icon: amisCore.isPureVariable(icon)
                ? amisCore.resolveVariableAndFilter(icon, data, '| raw')
                : icon, title: itemTitleSchema
                ? render("".concat(index, "/body"), itemTitleSchema, {
                    data: amisCore.createObject(data, timelineItem)
                })
                : resolveRender('title', title) });
    });
    return (_J$X_(amisUi.Timeline, { items: resolveTimelineItems, direction: direction, reverse: reverse, mode: mode, style: style, className: className, timeClassName: timeClassName, titleClassName: titleClassName, detailClassName: detailClassName }));
}
var TimelineWithRemoteConfig = amisUi.withRemoteConfig({
    adaptor: function (data) { return data.items || data; }
})(/** @class */ (function (_super) {
    tslib.__extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        var _a = this.props, config = _a.config, items = _a.items; _a.deferLoad; _a.loading; _a.updateConfig; var rest = tslib.__rest(_a, ["config", "items", "deferLoad", "loading", "updateConfig"]);
        var sourceItems = config
            ? Array.isArray(config)
                ? config
                : Object.keys(config).map(function (key) { return ({
                    time: key,
                    title: config[key]
                }); })
            : items || [];
        return _J$X_(TimelineCmpt, tslib.__assign({ items: sourceItems }, rest));
    };
    return class_1;
}(React__default["default"].Component)));
/** @class */ ((function (_super) {
    tslib.__extends(TimelineRenderer, _super);
    function TimelineRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineRenderer.prototype.render = function () {
        return _J$X_(TimelineWithRemoteConfig, tslib.__assign({}, this.props));
    };
    TimelineRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'timeline'
        })
    ], TimelineRenderer);
    return TimelineRenderer;
})(React__default["default"].Component));

exports.TimelineCmpt = TimelineCmpt;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
