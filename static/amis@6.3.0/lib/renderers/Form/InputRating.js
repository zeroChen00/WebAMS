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
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var RatingControl = /** @class */ (function (_super) {
    tslib.__extends(RatingControl, _super);
    function RatingControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RatingControl.prototype.doAction = function (action, data, throwErrors) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    RatingControl.prototype.handleChange = function (value) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onChange, dispatchEvent, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, { value: value }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange === null || onChange === void 0 ? void 0 : onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    RatingControl.prototype.renderStatic = function () {
        var _a = this.props, className = _a.className; _a.style; var value = _a.value, count = _a.count, half = _a.half, char = _a.char, inactiveColor = _a.inactiveColor, colors = _a.colors, texts = _a.texts, charClassName = _a.charClassName, textClassName = _a.textClassName, textPosition = _a.textPosition, cx = _a.classnames;
        return (_J$X_("div", { className: cx('RatingControl', className) },
            _J$X_(amisUi.Rating, { classnames: cx, value: value, disabled: true, count: count, half: half, char: char, inactiveColor: inactiveColor, colors: colors, texts: texts, charClassName: charClassName, textClassName: textClassName, textPosition: textPosition })));
    };
    RatingControl.prototype.render = function () {
        var _a = this.props, className = _a.className, value = _a.value, count = _a.count, half = _a.half, readOnly = _a.readOnly, disabled = _a.disabled, onHoverChange = _a.onHoverChange, allowClear = _a.allowClear, char = _a.char, inactiveColor = _a.inactiveColor, colors = _a.colors, texts = _a.texts, charClassName = _a.charClassName, textClassName = _a.textClassName, textPosition = _a.textPosition, cx = _a.classnames;
        var finalCount = getFinalCount(count, this.props.data);
        // 限制最大 100 星，避免渲染卡死问题
        finalCount > 100 && (finalCount = 100);
        return (_J$X_("div", { className: cx('RatingControl', className) },
            _J$X_(amisUi.Rating, { classnames: cx, value: value, disabled: disabled, count: finalCount, half: half, allowClear: allowClear, readOnly: readOnly, char: char, inactiveColor: inactiveColor, colors: colors, texts: texts, charClassName: charClassName, textClassName: textClassName, textPosition: textPosition, onChange: this.handleChange, onHoverChange: function (value) {
                    onHoverChange && onHoverChange(value);
                } })));
    };
    RatingControl.defaultProps = {
        value: 0,
        count: 5,
        half: false,
        readOnly: false
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], RatingControl.prototype, "handleChange", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], RatingControl.prototype, "render", null);
    return RatingControl;
}(React__default["default"].Component));
function getFinalCount(name, data) {
    if (typeof name === 'number') {
        return name;
    }
    return amisCore.toNumber(amisCore.filter(name, data));
}
/** @class */ ((function (_super) {
    tslib.__extends(RatingControlRenderer, _super);
    function RatingControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RatingControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-rating',
            sizeMutable: false,
            shouldComponentUpdate: function (props, prevProps) {
                return getFinalCount(props.count, props.data) !==
                    getFinalCount(prevProps.count, prevProps.data);
            },
            detectProps: [
                'half',
                'allowClear',
                'colors',
                'inactiveColor',
                'texts',
                'textPosition',
                'char'
            ]
        })
    ], RatingControlRenderer);
    return RatingControlRenderer;
})(RatingControl));

exports["default"] = RatingControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
