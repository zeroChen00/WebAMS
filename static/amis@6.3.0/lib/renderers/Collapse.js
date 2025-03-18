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
var Collapse = /** @class */ (function (_super) {
    tslib.__extends(Collapse, _super);
    function Collapse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.basicCollapse = React__default["default"].createRef();
        return _this;
    }
    Collapse.prototype.handleCollapseChange = function (collapsed) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onCollapse, eventData, changeEvent, toggleEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onCollapse = _a.onCollapse;
                        eventData = amisCore.resolveEventData(this.props, {
                            collapsed: collapsed
                        });
                        return [4 /*yield*/, dispatchEvent('change', eventData)];
                    case 1:
                        changeEvent = _b.sent();
                        return [4 /*yield*/, dispatchEvent(collapsed ? 'collapse' : 'expand', eventData)];
                    case 2:
                        toggleEvent = _b.sent();
                        if ((changeEvent === null || changeEvent === void 0 ? void 0 : changeEvent.prevented) || (toggleEvent === null || toggleEvent === void 0 ? void 0 : toggleEvent.prevented)) {
                            return [2 /*return*/];
                        }
                        onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse(collapsed);
                        return [2 /*return*/];
                }
            });
        });
    };
    Collapse.prototype.doAction = function (action, data, throwErrors, args) {
        var _a, _b, _c, _d;
        if (this.props.disabled || this.props.collapsable === false) {
            return;
        }
        if (['expand', 'collapse'].includes(action.actionType)) {
            var targetState = action.actionType === 'collapse';
            /**
             * 说明：changeCollapsedState 会执行 onCollapse 方法（间接执行handleCollapseChange），
             * 所以这里不需要再重复调用。
             */
            // this.handleCollapseChange(targetState);
            var collapseInstance = (_c = (_b = (_a = this.basicCollapse) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.getWrappedInstance) === null || _c === void 0 ? void 0 : _c.call(_b);
            (_d = collapseInstance === null || collapseInstance === void 0 ? void 0 : collapseInstance.changeCollapsedState) === null || _d === void 0 ? void 0 : _d.call(collapseInstance, targetState);
        }
    };
    Collapse.prototype.render = function () {
        var _a = this.props, id = _a.id, ns = _a.classPrefix, cx = _a.classnames, size = _a.size, wrapperComponent = _a.wrapperComponent, headingComponent = _a.headingComponent, className = _a.className, style = _a.style, headingClassName = _a.headingClassName, children = _a.children, titlePosition = _a.titlePosition, headerPosition = _a.headerPosition, title = _a.title, collapseTitle = _a.collapseTitle, collapseHeader = _a.collapseHeader, header = _a.header, body = _a.body, bodyClassName = _a.bodyClassName, render = _a.render, collapsable = _a.collapsable; _a.translate; var mountOnEnter = _a.mountOnEnter, unmountOnExit = _a.unmountOnExit, showArrow = _a.showArrow, expandIcon = _a.expandIcon, disabled = _a.disabled, collapsed = _a.collapsed, propsUpdate = _a.propsUpdate, mobileUI = _a.mobileUI, divideLine = _a.divideLine, enableFieldSetStyle = _a.enableFieldSetStyle;
        var heading = title || header || '';
        return (_J$X_(amisUi.Collapse, { id: id, ref: this.basicCollapse, classnames: cx, classPrefix: ns, mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit, size: size, wrapperComponent: wrapperComponent, headingComponent: headingComponent, className: className, style: style, headingClassName: headingClassName, bodyClassName: bodyClassName, headerPosition: titlePosition || headerPosition, collapsable: collapsable, collapsed: collapsed, showArrow: showArrow, disabled: disabled, propsUpdate: propsUpdate, expandIcon: expandIcon ? (typeof expandIcon.icon === 'object' ? (_J$X_(amisUi.Icon, { cx: cx, icon: expandIcon.icon, className: cx('Collapse-icon-tranform') })) : (render('arrow-icon', expandIcon || '', {
                className: cx('Collapse-icon-tranform')
            }))) : null, collapseHeader: collapseTitle || collapseHeader
                ? render('heading', collapseTitle || collapseHeader)
                : null, header: heading ? render('heading', heading) : null, body: children
                ? typeof children === 'function'
                    ? children(this.props)
                    : children
                : body
                    ? render('body', body)
                    : null, mobileUI: mobileUI, onCollapse: this.handleCollapseChange, divideLine: divideLine, enableFieldSetStyle: enableFieldSetStyle }));
    };
    Collapse.propsList = [
        'collapsable',
        'collapsed',
        'collapseTitle',
        'showArrow',
        'headerPosition',
        'bodyClassName',
        'headingClassName',
        'collapseHeader',
        'size'
    ];
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Boolean]),
        tslib.__metadata("design:returntype", Promise)
    ], Collapse.prototype, "handleCollapseChange", null);
    return Collapse;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(CollapseRenderer, _super);
    function CollapseRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    CollapseRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    CollapseRenderer.contextType = amisCore.ScopedContext;
    CollapseRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'collapse'
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], CollapseRenderer);
    return CollapseRenderer;
})(Collapse));

exports["default"] = Collapse;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
