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
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var ListControl = /** @class */ (function (_super) {
    tslib.__extends(ListControl, _super);
    function ListControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    ListControl.prototype.handleDBClick = function (option, e) {
        this.props.onToggle(option, false, true);
        this.props.onAction(null, {
            type: 'submit'
        });
    };
    ListControl.prototype.handleClick = function (option, e) {
        if (e.target && e.target.closest('a,button')) {
            return;
        }
        var onToggle = this.props.onToggle;
        onToggle(option);
    };
    ListControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    ListControl.prototype.renderStatic = function (displayValue) {
        if (displayValue === void 0) { displayValue = '-'; }
        var _a = this.props, itemSchema = _a.itemSchema, labelField = _a.labelField; _a.valueField; var imageClassName = _a.imageClassName, itemClassName = _a.itemClassName, selectedOptions = _a.selectedOptions, cx = _a.classnames, render = _a.render, data = _a.data;
        if (!selectedOptions.length) {
            return displayValue;
        }
        var itemRender = function (option, key) {
            var label = option[labelField || 'label'];
            label = label || "\u9009\u9879".concat(key + 1);
            if (itemSchema || option.body || option.image) {
                return (_J$X_("div", { key: key, className: cx('ListControl-static-item', itemClassName) }, itemSchema
                    ? render("".concat(key, "/body"), itemSchema, {
                        data: amisCore.createObject(data, option)
                    })
                    : option.body
                        ? render("".concat(key, "/body"), option.body)
                        : [
                            option.image ? (_J$X_("div", { key: "image", className: cx('ListControl-itemImage', imageClassName) },
                                _J$X_("img", { src: option.image, alt: label }))) : null,
                            _J$X_("div", { key: "label", className: cx('ListControl-itemLabel') }, label)
                        ]));
            }
            return (_J$X_("div", { key: key, className: cx("ListControl-static-item") }, label));
        };
        return (_J$X_("div", { className: cx('StaticList') }, selectedOptions.map(itemRender)));
    };
    ListControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, render = _a.render, itemClassName = _a.itemClassName, cx = _a.classnames, className = _a.className; _a.style; var disabled = _a.disabled, options = _a.options, placeholder = _a.placeholder, selectedOptions = _a.selectedOptions, imageClassName = _a.imageClassName, submitOnDBClick = _a.submitOnDBClick, itemSchema = _a.itemSchema, activeItemSchema = _a.activeItemSchema, data = _a.data, labelField = _a.labelField, listClassName = _a.listClassName, __ = _a.translate, testIdBuilder = _a.testIdBuilder;
        var body = null;
        if (options && options.length) {
            body = (_J$X_("div", { className: cx('ListControl-items', listClassName) }, options.map(function (option, key) { return (_J$X_("div", tslib.__assign({ key: key, className: cx("ListControl-item", itemClassName, {
                    'is-active': ~selectedOptions.indexOf(option),
                    'is-disabled': option.disabled || disabled,
                    'is-custom': !!itemSchema
                }), onClick: _this.handleClick.bind(_this, option), onDoubleClick: submitOnDBClick
                    ? _this.handleDBClick.bind(_this, option)
                    : undefined }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("options-".concat(option.value || key)).getTestId()), itemSchema
                ? render("".concat(key, "/body"), ~selectedOptions.indexOf(option)
                    ? activeItemSchema !== null && activeItemSchema !== void 0 ? activeItemSchema : itemSchema
                    : itemSchema, {
                    data: amisCore.createObject(data, option)
                })
                : option.body
                    ? render("".concat(key, "/body"), option.body)
                    : [
                        option.image ? (_J$X_("div", { key: "image", className: cx('ListControl-itemImage', imageClassName) },
                            _J$X_("img", { src: option.image, alt: option[labelField || 'label'] }))) : null,
                        option[labelField || 'label'] ? (_J$X_("div", { key: "label", className: cx('ListControl-itemLabel') }, String(option[labelField || 'label']))) : null
                        // {/* {option.tip ? (<div className={`${ns}ListControl-tip`}>{option.tip}</div>) : null} */}
                    ])); })));
        }
        return (_J$X_("div", { className: cx('ListControl', className) }, body ? (body) : (_J$X_("span", { className: cx('ListControl-placeholder') }, __(placeholder)))));
    };
    ListControl.propsList = ['itemSchema', 'value', 'renderFormItems'];
    ListControl.defaultProps = {
        clearable: false,
        imageClassName: '',
        submitOnDBClick: false
    };
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], ListControl.prototype, "render", null);
    return ListControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(ListControlRenderer, _super);
    function ListControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListControlRenderer = tslib.__decorate([
        amisCore.OptionsControl({
            type: 'list-select',
            sizeMutable: false
        })
    ], ListControlRenderer);
    return ListControlRenderer;
})(ListControl));

exports["default"] = ListControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
