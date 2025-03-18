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
var DropDownButton = /** @class */ (function (_super) {
    tslib.__extends(DropDownButton, _super);
    function DropDownButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpened: false
        };
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.toogle = _this.toogle.bind(_this);
        _this.keepOpen = _this.keepOpen.bind(_this);
        _this.domRef = _this.domRef.bind(_this);
        return _this;
    }
    DropDownButton.prototype.componentDidMount = function () {
        if (this.props.defaultIsOpened) {
            this.setState({
                isOpened: true
            });
        }
    };
    DropDownButton.prototype.domRef = function (ref) {
        this.target = ref;
    };
    DropDownButton.prototype.toogle = function (e) {
        e.preventDefault();
        this.setState({
            isOpened: !this.state.isOpened
        });
    };
    DropDownButton.prototype.open = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, data, _buttons, disabled, btnDisabled, buttons;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data, _buttons = _a.buttons, disabled = _a.disabled, btnDisabled = _a.btnDisabled;
                        if (disabled || btnDisabled) {
                            return [2 /*return*/];
                        }
                        buttons = typeof _buttons === 'string'
                            ? amisCore.resolveVariableAndFilter(_buttons, data, '| raw')
                            : _buttons;
                        return [4 /*yield*/, dispatchEvent('mouseenter', amisCore.createObject(data, {
                                items: buttons // 为了保持名字统一
                            }))];
                    case 1:
                        _b.sent();
                        this.setState({
                            isOpened: true
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DropDownButton.prototype.close = function (e) {
        var _this = this;
        var _a, _b;
        var _c = this.props, _buttons = _c.buttons, data = _c.data;
        var buttons = typeof _buttons === 'string'
            ? amisCore.resolveVariableAndFilter(_buttons, data, '| raw')
            : _buttons;
        this.timer = setTimeout(function () {
            _this.props.dispatchEvent('mouseleave', amisCore.createObject(_this.props.data, { items: buttons }));
            _this.setState({
                isOpened: false
            });
        }, 200);
        // 如果是下拉菜单，并且是下载链接，则不阻止默认事件
        if (!((_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.getAttribute) === null || _b === void 0 ? void 0 : _b.call(_a, 'download'))) {
            // PopOver hide会直接调用close方法
            e && e.preventDefault();
        }
    };
    DropDownButton.prototype.keepOpen = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    DropDownButton.prototype.renderButton = function (button, index) {
        var _a;
        var _this = this;
        var _b = this.props, render = _b.render, cx = _b.classnames, data = _b.data, ignoreConfirm = _b.ignoreConfirm, testIdBuilder = _b.testIdBuilder;
        index = typeof index === 'number' ? index.toString() : index;
        if (typeof button !== 'string' && Array.isArray(button === null || button === void 0 ? void 0 : button.children)) {
            return (_J$X_("div", { key: index, className: cx('DropDown-menu', { 'is-mobile': amisCore.isMobile() }) },
                _J$X_("li", { key: "".concat(index, "/0"), className: cx('DropDown-groupTitle') },
                    button.icon ? (_J$X_(amisUi.Icon, { cx: cx, icon: button.icon, className: "m-r-xs" })) : null,
                    _J$X_("span", null, button.label)),
                button.children.map(function (child, childIndex) {
                    return _this.renderButton(child, "".concat(index, "/").concat(childIndex + 1));
                })));
        }
        if (typeof button !== 'string' && !amisCore.isVisible(button, data)) {
            return null;
        }
        else if (button === 'divider' || button.type === 'divider') {
            return _J$X_("li", { key: index, className: cx('DropDown-divider') });
        }
        else {
            return (_J$X_("li", { key: index, className: cx('DropDown-button', (_a = {},
                    _a['is-disabled'] = amisCore.isDisabled(button, data),
                    _a), typeof button.level === 'undefined'
                    ? ''
                    : button.level
                        ? "Button--".concat(button.level)
                        : '', amisCore.filterClassNameObject(button.className, data)) }, render("button/".concat(index), tslib.__assign(tslib.__assign({ type: 'button' }, button), { className: '', 
                // 防止dropdown中button没有 testid或者id
                testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild(button.label || index, data) }), {
                isMenuItem: true,
                ignoreConfirm: ignoreConfirm
            })));
        }
    };
    DropDownButton.prototype.renderOuter = function () {
        var _this = this;
        var _a;
        var _b = this.props, render = _b.render, _buttons = _b.buttons, data = _b.data, popOverContainer = _b.popOverContainer, cx = _b.classnames, ns = _b.classPrefix, children = _b.children, body = _b.body; _b.align; var closeOnClick = _b.closeOnClick, closeOnOutside = _b.closeOnOutside, menuClassName = _b.menuClassName, overlayPlacement = _b.overlayPlacement, trigger = _b.trigger;
        var buttons = typeof _buttons === 'string'
            ? amisCore.resolveVariableAndFilter(_buttons, data, '| raw')
            : _buttons;
        var popOverBody = (_J$X_(amisCore.RootClose, { disabled: !this.state.isOpened, onRootClose: closeOnOutside !== false ? this.close : amisCore.noop }, function (ref) {
            return (_J$X_("ul", { className: cx('DropDown-menu-root', 'DropDown-menu', {
                    'is-mobile': amisCore.isMobile()
                }, menuClassName), onClick: closeOnClick ? _this.close : amisCore.noop, onMouseEnter: _this.keepOpen, ref: ref }, children
                ? children
                : body
                    ? render('body', body)
                    : Array.isArray(buttons)
                        ? buttons.map(function (button, index) {
                            return _this.renderButton(button, index);
                        })
                        : null));
        }));
        if (popOverContainer) {
            return (_J$X_(amisCore.Overlay, { container: popOverContainer, target: function () { return _this.target; }, placement: overlayPlacement, show: true },
                _J$X_(amisCore.PopOver, { overlay: trigger !== 'hover', onHide: this.close, classPrefix: ns, className: cx('DropDown-popover', menuClassName), style: { minWidth: (_a = this.target) === null || _a === void 0 ? void 0 : _a.offsetWidth } }, popOverBody)));
        }
        return popOverBody;
    };
    DropDownButton.prototype.render = function () {
        var _a = this.props, tooltip = _a.tooltip, placement = _a.placement, tooltipContainer = _a.tooltipContainer, tooltipTrigger = _a.tooltipTrigger, tooltipRootClose = _a.tooltipRootClose, disabledTip = _a.disabledTip, block = _a.block, disabled = _a.disabled, btnDisabled = _a.btnDisabled, btnClassName = _a.btnClassName, _b = _a.size, size = _b === void 0 ? 'default' : _b, label = _a.label, level = _a.level, primary = _a.primary, className = _a.className, style = _a.style, cx = _a.classnames, align = _a.align, iconOnly = _a.iconOnly, icon = _a.icon, rightIcon = _a.rightIcon, isActived = _a.isActived, trigger = _a.trigger, data = _a.data, hideCaret = _a.hideCaret, env = _a.env, testIdBuilder = _a.testIdBuilder;
        return (_J$X_("div", { className: cx('DropDown ', {
                'DropDown--block': block,
                'DropDown--alignRight': align === 'right',
                'is-opened': this.state.isOpened,
                'is-actived': isActived,
                'is-mobile': amisCore.isMobile()
            }, className), style: style, onMouseEnter: trigger === 'hover' ? this.open : function () { }, onMouseLeave: trigger === 'hover' ? this.close : function () { }, ref: this.domRef },
            _J$X_(amisUi.TooltipWrapper, { placement: placement, tooltip: disabled ? disabledTip : tooltip, container: tooltipContainer || (env === null || env === void 0 ? void 0 : env.getModalContainer), trigger: tooltipTrigger, rootClose: tooltipRootClose },
                _J$X_("button", tslib.__assign({ onClick: this.toogle, disabled: disabled || btnDisabled }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getTestId(data), { className: cx('Button', btnClassName, typeof level === 'undefined'
                        ? 'Button--default'
                        : level
                            ? "Button--".concat(level)
                            : '', {
                        'Button--block': block,
                        'Button--primary': primary,
                        'Button--iconOnly': iconOnly
                    }, "Button--size-".concat(size)) }),
                    _J$X_(amisUi.Icon, { c: cx, icon: icon, className: "icon m-r-xs" }),
                    typeof label === 'string' ? amisCore.filter(label, data) : label,
                    rightIcon && (_J$X_(amisUi.Icon, { cx: cx, icon: rightIcon, className: "icon m-l-xs" })),
                    !hideCaret ? (_J$X_("span", { className: cx('DropDown-caret') },
                        _J$X_(amisUi.Icon, { icon: "right-arrow-bold", className: "icon" }))) : null)),
            this.state.isOpened ? this.renderOuter() : null));
    };
    DropDownButton.defaultProps = {
        placement: 'top',
        tooltipTrigger: ['hover', 'focus'],
        tooltipRootClose: false,
        overlayPlacement: 'auto'
    };
    return DropDownButton;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(DropDownButtonRenderer, _super);
    function DropDownButtonRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropDownButtonRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'dropdown-button'
        })
    ], DropDownButtonRenderer);
    return DropDownButtonRenderer;
})(DropDownButton));

exports["default"] = DropDownButton;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
