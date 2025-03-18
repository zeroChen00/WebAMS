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
var cx = require('classnames');
var omit = require('lodash/omit');
var pick = require('lodash/pick');
var amisUi = require('amis-ui');
var Sortable = require('sortablejs');
var ReactDOM = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
var Sortable__default = /*#__PURE__*/_interopDefaultLegacy(Sortable);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var dom;
var stripTag = function (value) {
    if (!value) {
        return value;
    }
    dom = dom || document.createElement('div');
    dom.innerHTML = value;
    return dom.innerText;
};
var SubFormControl = /** @class */ (function (_super) {
    tslib.__extends(SubFormControl, _super);
    function SubFormControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.id = amisCore.guid();
        _this.addItem = _this.addItem.bind(_this);
        _this.removeItem = _this.removeItem.bind(_this);
        _this.editSingle = _this.editSingle.bind(_this);
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.dragTipRef = _this.dragTipRef.bind(_this);
        _this.handleDialogConfirm = _this.handleDialogConfirm.bind(_this);
        return _this;
    }
    SubFormControl.prototype.addItem = function () {
        this.setState({
            dialogData: amisCore.createObject(this.props.data, this.props.scaffold || {}),
            dialogCtx: {
                mode: 'add'
            }
        });
    };
    SubFormControl.prototype.removeItem = function (e) {
        e.stopPropagation();
        e.preventDefault();
        var index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        var value = this.props.value;
        if (!Array.isArray(value)) {
            return;
        }
        value = value.concat();
        value.splice(index, 1);
        this.props.onChange(value);
    };
    SubFormControl.prototype.editSingle = function () {
        var value = this.props.value;
        if (value) {
            this.setState({
                dialogData: amisCore.createObject(this.props.data, this.props.value),
                dialogCtx: {
                    mode: 'edit'
                }
            });
        }
        else {
            this.addItem();
        }
    };
    SubFormControl.prototype.open = function (e) {
        var index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        var value = this.props.value;
        if (!Array.isArray(value) || !value[index]) {
            return;
        }
        this.tempValue = value[index];
        this.setState({
            dialogData: amisCore.createObject(this.props.data, value[index]),
            dialogCtx: {
                mode: 'edit',
                index: index
            }
        });
    };
    SubFormControl.prototype.close = function () {
        this.setState({
            dialogData: undefined,
            dialogCtx: undefined
        });
    };
    SubFormControl.prototype.handleDialogConfirm = function (values) {
        var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, value = _a.value;
        var ctx = this.state.dialogCtx;
        if (multiple) {
            var newValue = Array.isArray(value) ? value.concat() : [];
            if ((ctx === null || ctx === void 0 ? void 0 : ctx.mode) === 'add') {
                newValue.push(tslib.__assign({}, values[0]));
            }
            else {
                newValue[ctx.index] = tslib.__assign(tslib.__assign({}, newValue[ctx.index]), values[0]);
            }
            onChange(newValue);
        }
        else {
            onChange(tslib.__assign(tslib.__assign({}, value), values[0]));
        }
        this.close();
    };
    SubFormControl.prototype.handlePopupConfirm = function () {
        var values = this.tempValue;
        var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, value = _a.value;
        var ctx = this.state.dialogCtx;
        if (multiple) {
            var newValue = Array.isArray(value) ? value.concat() : [];
            if ((ctx === null || ctx === void 0 ? void 0 : ctx.mode) === 'add') {
                newValue.push(tslib.__assign({}, values));
            }
            else {
                newValue[ctx.index] = tslib.__assign(tslib.__assign({}, newValue[ctx.index]), values);
            }
            onChange(newValue);
        }
        else {
            onChange(tslib.__assign(tslib.__assign({}, value), values));
        }
        this.close();
    };
    SubFormControl.prototype.dragTipRef = function (ref) {
        if (!this.dragTip && ref) {
            this.initDragging();
        }
        else if (this.dragTip && !ref) {
            this.destroyDragging();
        }
        this.dragTip = ref;
    };
    SubFormControl.prototype.initDragging = function () {
        var _this = this;
        var ns = this.props.classPrefix;
        var submitOnChange = this.props.submitOnChange;
        var dom = ReactDOM.findDOMNode(this);
        this.sortable = new Sortable__default["default"](dom.querySelector(".".concat(ns, "SubForm-values")), {
            group: "SubForm-".concat(this.id),
            animation: 150,
            handle: ".".concat(ns, "SubForm-valueDragBar"),
            ghostClass: "".concat(ns, "SubForm-value--dragging"),
            onEnd: function (e) {
                // 没有移动
                if (e.newIndex === e.oldIndex) {
                    return;
                }
                // 换回来
                var parent = e.to;
                if (e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex > e.newIndex ? e.oldIndex + 1 : e.oldIndex]);
                }
                else {
                    parent.appendChild(e.item);
                }
                var value = _this.props.value;
                if (!Array.isArray(value)) {
                    return;
                }
                var newValue = value.concat();
                newValue.splice(e.newIndex, 0, newValue.splice(e.oldIndex, 1)[0]);
                _this.props.onChange(newValue, submitOnChange, true);
            }
        });
    };
    SubFormControl.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    SubFormControl.prototype.buildDialogSchema = function () {
        var form = this.props.form;
        var dialogProps = [
            'title',
            'actions',
            'name',
            'size',
            'closeOnEsc',
            'closeOnOutside',
            'showErrorMsg',
            'showCloseButton',
            'bodyClassName',
            'type'
        ];
        return tslib.__assign(tslib.__assign({}, pick__default["default"](form, dialogProps)), { type: 'dialog', body: tslib.__assign(tslib.__assign({ type: 'form', canAccessSuperData: false }, omit__default["default"](form, dialogProps)), { inheritData: false }) });
    };
    SubFormControl.prototype.buildFormSchema = function () {
        var form = this.props.form;
        var dialogProps = [
            'title',
            'actions',
            'name',
            'size',
            'closeOnEsc',
            'closeOnOutside',
            'showErrorMsg',
            'showCloseButton',
            'bodyClassName',
            'type'
        ];
        return tslib.__assign(tslib.__assign({ type: 'form', canAccessSuperData: false }, omit__default["default"](form, dialogProps)), { inheritData: false });
    };
    SubFormControl.prototype.renderMultipe = function () {
        var _this = this;
        var _a = this.props, addButtonClassName = _a.addButtonClassName, itemClassName = _a.itemClassName, itemsClassName = _a.itemsClassName, disabled = _a.disabled, maxLength = _a.maxLength, labelField = _a.labelField, defaultLabel = _a.defaultLabel, value = _a.value, btnLabel = _a.btnLabel, render = _a.render, data = _a.data, __ = _a.translate, cx = _a.classnames, placeholder = _a.placeholder, draggable = _a.draggable, draggableTip = _a.draggableTip, addable = _a.addable, removable = _a.removable, minLength = _a.minLength, addButtonText = _a.addButtonText, testIdBuilder = _a.testIdBuilder;
        return (_J$X_(React__default["default"].Fragment, null,
            Array.isArray(value) && value.length ? (_J$X_("div", { className: cx('SubForm-values', itemsClassName), key: "values" }, value.map(function (item, key) { return (_J$X_("div", tslib.__assign({ className: cx("SubForm-value", {
                    'is-disabled': disabled
                }, itemClassName), key: key }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild("item-".concat(key)).getTestId()),
                draggable && value.length > 1 ? (_J$X_("a", { className: cx('SubForm-valueDragBar') },
                    _J$X_(amisUi.Icon, { icon: "drag-bar", className: cx('icon') }))) : null,
                _J$X_("span", { className: cx('SubForm-valueLabel') },
                    btnLabel &&
                        render('label', {
                            type: 'tpl',
                            tpl: __(btnLabel)
                        }, {
                            data: amisCore.createObject(data, item)
                        }),
                    !btnLabel &&
                        ((item &&
                            labelField &&
                            item[labelField] &&
                            stripTag(item[labelField])) ||
                            __(defaultLabel))),
                _J$X_("a", { "data-index": key, onClick: _this.open, className: cx('SubForm-valueEdit') },
                    _J$X_(amisUi.Icon, { icon: "pencil", className: "icon" })),
                !disabled &&
                    removable !== false &&
                    (!minLength || value.length > minLength) ? (_J$X_("a", { "data-index": key, className: cx('SubForm-valueDel'), onClick: _this.removeItem },
                    _J$X_(amisUi.Icon, { icon: "close", className: "icon" }))) : null)); }))) : (_J$X_("div", { className: cx('SubForm-placeholder'), key: "placeholder" }, __(placeholder || 'placeholder.empty'))),
            _J$X_("div", { key: "toolbar", className: cx('SubForm-toolbar') },
                addable !== false ? (_J$X_("button", tslib.__assign({ type: "button", onClick: this.addItem, className: cx("Button SubForm-addBtn", addButtonClassName), disabled: disabled ||
                        !!(maxLength &&
                            Array.isArray(value) &&
                            value.length >= maxLength) }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('add-button').getTestId()),
                    _J$X_(amisUi.Icon, { icon: "plus", className: "icon" }),
                    _J$X_("span", null, __(addButtonText || 'SubForm.add')))) : null,
                draggable && Array.isArray(value) && value.length > 1 ? (_J$X_("span", { className: cx("Combo-dragableTip"), ref: this.dragTipRef }, Array.isArray(value) && value.length > 1 ? __(draggableTip) : '')) : null)));
    };
    SubFormControl.prototype.renderSingle = function () {
        var _a = this.props, cx = _a.classnames, itemsClassName = _a.itemsClassName, itemClassName = _a.itemClassName, disabled = _a.disabled, value = _a.value, labelField = _a.labelField, defaultLabel = _a.defaultLabel, btnLabel = _a.btnLabel, render = _a.render, data = _a.data, __ = _a.translate, testIdBuilder = _a.testIdBuilder;
        var tIdBuilder = testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('edit-single');
        return (_J$X_("div", { className: cx('SubForm-values', itemsClassName), key: "values" },
            _J$X_("div", tslib.__assign({ className: cx("SubForm-value", {
                    'is-disabled': disabled
                }, itemClassName), onClick: this.editSingle, "data-tooltip": __('SubForm.editDetail'), "data-position": "bottom" }, tIdBuilder === null || tIdBuilder === void 0 ? void 0 : tIdBuilder.getTestId()),
                _J$X_("span", { className: cx('SubForm-valueLabel') },
                    btnLabel &&
                        render('label', {
                            type: 'tpl',
                            tpl: __(btnLabel)
                        }, {
                            data: amisCore.createObject(data, value)
                        }),
                    !btnLabel &&
                        ((value &&
                            labelField &&
                            value[labelField] &&
                            stripTag(value[labelField])) ||
                            __(defaultLabel))),
                _J$X_("a", tslib.__assign({ className: cx('SubForm-valueEdit') }, tIdBuilder === null || tIdBuilder === void 0 ? void 0 : tIdBuilder.getChild('icon').getTestId()),
                    _J$X_(amisUi.Icon, { icon: "pencil", className: "icon" })))));
    };
    SubFormControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, multiple = _a.multiple, ns = _a.classPrefix, className = _a.className; _a.style; var render = _a.render, mobileUI = _a.mobileUI, env = _a.env, popOverContainer = _a.popOverContainer;
        var dialogData = this.state.dialogData;
        var dialogCtx = this.state.dialogCtx;
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "SubFormControl"), className) },
            multiple ? this.renderMultipe() : this.renderSingle(),
            !mobileUI ? (render("modal", this.buildDialogSchema(), {
                show: !!dialogCtx,
                onClose: this.close,
                onConfirm: this.handleDialogConfirm,
                data: dialogData,
                formStore: undefined
            })) : (_J$X_(amisUi.PopUp, { isShow: !!dialogCtx, showConfirm: true, onConfirm: this.handlePopupConfirm, onHide: this.close, container: mobileUI
                    ? env === null || env === void 0 ? void 0 : env.getModalContainer
                    : popOverContainer || env.getModalContainer },
                _J$X_("div", { className: "flex-1 pl-10 pr-10" }, render('form', this.buildFormSchema(), {
                    data: dialogData,
                    formStore: undefined,
                    wrapWithPanel: false,
                    onChange: function (val) {
                        _this.tempValue = val;
                    }
                }))))));
    };
    SubFormControl.defaultProps = {
        minLength: 0,
        maxLength: 0,
        multiple: false,
        btnClassName: '',
        addButtonClassName: '',
        itemClassName: '',
        labelField: 'label',
        defaultLabel: 'SubForm.button',
        placeholder: 'placeholder.empty'
    };
    SubFormControl.propsList = ['form', 'formStore'];
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], SubFormControl.prototype, "handlePopupConfirm", null);
    return SubFormControl;
}(React__default["default"].PureComponent));
/** @class */ ((function (_super) {
    tslib.__extends(SubFormControlRenderer, _super);
    function SubFormControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubFormControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-sub-form',
            sizeMutable: false,
            strictMode: false
        })
    ], SubFormControlRenderer);
    return SubFormControlRenderer;
})(SubFormControl));

exports["default"] = SubFormControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
