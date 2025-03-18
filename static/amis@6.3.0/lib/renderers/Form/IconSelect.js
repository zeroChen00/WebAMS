/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var matchSorter = require('match-sorter');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var debounce = require('lodash/debounce');
var find = require('lodash/find');
var IconSelectStore = require('./IconSelectStore.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
/**
 * 新图标选择器
 */
var IconSelectControl = /** @class */ (function (_super) {
    tslib.__extends(IconSelectControl, _super);
    function IconSelectControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeTypeIndex: 0,
            showModal: false,
            tmpCheckIconId: null,
            searchValue: '',
            isRefreshLoading: false
        };
        _this.handleSearchValueChange = debounce__default["default"](_this.handleSearchValueChange.bind(_this), 300);
        return _this;
    }
    IconSelectControl.prototype.getValueBySvg = function (svg) {
        if (!svg || typeof svg !== 'string') {
            return null;
        }
        var findItem = undefined;
        if (IconSelectStore.svgIcons && IconSelectStore.svgIcons.length) {
            for (var i = 0; i < IconSelectStore.svgIcons.length; i++) {
                findItem = find__default["default"](IconSelectStore.svgIcons[i].children, function (i) { return i.svg === svg; });
                if (findItem) {
                    break;
                }
            }
        }
        return findItem || { name: svg, id: '', svg: '' };
    };
    IconSelectControl.prototype.handleClick = function () {
        if (this.props.disabled) {
            return;
        }
        this.toggleModel(true);
    };
    IconSelectControl.prototype.handleClear = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onChange && this.props.onChange('');
    };
    IconSelectControl.prototype.renderInputArea = function () {
        var _a = this.props, ns = _a.classPrefix, disabled = _a.disabled, valueTemp = _a.value, placeholder = _a.placeholder, clearable = _a.clearable;
        var value = typeof valueTemp === 'string' ? this.getValueBySvg(valueTemp) : valueTemp;
        var SvgStr = typeof valueTemp === 'string' && valueTemp.match(/(<svg.{1,}\/svg>)/);
        var pureValue = ((value === null || value === void 0 ? void 0 : value.id) && String(value.id).replace(/^svg-/, '')) || '';
        var iconName = (value === null || value === void 0 ? void 0 : value.name) || pureValue;
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-input-area")) },
            pureValue ? (_J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-input-icon-show")) },
                _J$X_("svg", null,
                    _J$X_("use", { xlinkHref: "#".concat(pureValue) })))) : valueTemp ? (SvgStr ? (_J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-input-area-str-svg")), dangerouslySetInnerHTML: { __html: SvgStr[0].replace(/\\"/g, '"') } })) : (_J$X_(amisUi.Icon, { icon: valueTemp, className: cx__default["default"]("".concat(ns, "IconSelectControl-input-area-iconfont"), 'icon') }))) : null,
            _J$X_("span", { className: cx__default["default"]("".concat(ns, "IconSelectControl-input-icon-id")) }, iconName),
            clearable && !disabled && (pureValue || valueTemp) ? (_J$X_("a", { onClick: this.handleClear, className: cx__default["default"]("".concat(ns, "IconSelectControl-clear")) },
                _J$X_(amisUi.Icon, { icon: "input-clear", className: "icon" }))) : null,
            (!value && placeholder && (_J$X_("span", { className: cx__default["default"]("".concat(ns, "IconSelectControl-input-icon-placeholder")) }, placeholder))) ||
                null));
    };
    IconSelectControl.prototype.handleIconTypeClick = function (item, index) {
        this.setState({
            activeTypeIndex: index
        });
    };
    IconSelectControl.prototype.renderIconTypes = function () {
        var _this = this;
        var ns = this.props.classPrefix;
        var types = IconSelectStore.svgIcons.map(function (item) { return ({
            id: item.groupId,
            label: item.name
        }); });
        return (_J$X_("ul", { className: cx__default["default"]("".concat(ns, "IconSelectControl-type-list")) }, types.map(function (item, index) { return (_J$X_("li", { key: item.id, onClick: function () { return _this.handleIconTypeClick(item, index); }, className: cx__default["default"]({
                active: index === _this.state.activeTypeIndex
            }) }, item.label)); })));
    };
    IconSelectControl.prototype.handleConfirm = function () {
        var checkedIcon = this.state.tmpCheckIconId;
        if (this.props.returnSvg) {
            this.props.onChange &&
                this.props.onChange((checkedIcon && checkedIcon.svg) || '');
        }
        else {
            this.props.onChange &&
                this.props.onChange(checkedIcon && checkedIcon.id
                    ? tslib.__assign(tslib.__assign({}, checkedIcon), { id: 'svg-' + checkedIcon.id }) : '');
        }
        this.toggleModel(false);
    };
    IconSelectControl.prototype.handleLocalUpload = function (icon) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
                this.props.onChange && this.props.onChange(icon);
                this.toggleModel(false);
                return [2 /*return*/];
            });
        });
    };
    IconSelectControl.prototype.handleClickIconInModal = function (icon) {
        var _a;
        this.setState({
            tmpCheckIconId: (icon === null || icon === void 0 ? void 0 : icon.id) === ((_a = this.state.tmpCheckIconId) === null || _a === void 0 ? void 0 : _a.id) ? null : icon
        });
    };
    IconSelectControl.prototype.renderIconList = function (icons) {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, noDataTip = _a.noDataTip, __ = _a.translate;
        if (!icons || !icons.length) {
            return (_J$X_("p", { className: cx__default["default"]("".concat(ns, "IconSelectControl-icon-list-empty")) }, __(noDataTip)));
        }
        return (_J$X_("ul", { className: cx__default["default"]("".concat(ns, "IconSelectControl-icon-list")) }, icons.map(function (item, index) {
            var _a;
            return (_J$X_("li", { key: item.id },
                _J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-icon-list-item"), {
                        active: ((_a = _this.state.tmpCheckIconId) === null || _a === void 0 ? void 0 : _a.id) === item.id
                    }), onClick: function () { return _this.handleClickIconInModal(item); } },
                    _J$X_("svg", null,
                        _J$X_("use", { xlinkHref: "#".concat(item.id) })),
                    _J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-icon-list-item-info")) },
                        _J$X_("p", { className: cx__default["default"]("".concat(ns, "IconSelectControl-icon-list-item-info-name")) }, item.name)))));
        })));
    };
    IconSelectControl.prototype.handleSearchValueChange = function (e) {
        this.setState({
            searchValue: e
        });
    };
    IconSelectControl.prototype.handleRefreshIconList = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var refreshIconList, e_1;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshIconList = IconSelectStore.refreshIconList;
                        if (!(refreshIconList && typeof refreshIconList === 'function')) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.setState({
                            isRefreshLoading: true
                        });
                        return [4 /*yield*/, Promise.resolve(refreshIconList())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 4:
                        this.setState({
                            isRefreshLoading: false
                        });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    IconSelectControl.prototype.renderModalContent = function () {
        var _a = this.props, render = _a.render, ns = _a.classPrefix, loadingConfig = _a.loadingConfig; _a.funcSchema; var FuncCom = _a.funcCom;
        var icons = this.getIconsByType();
        var inputValue = this.state.searchValue;
        var filteredIcons = inputValue
            ? matchSorter.matchSorter(icons, inputValue, {
                keys: ['name'],
                threshold: matchSorter.matchSorter.rankings.CONTAINS
            })
            : icons;
        return (_J$X_(React__default["default"].Fragment, null,
            _J$X_(amisUi.SearchBox, { className: cx__default["default"]("".concat(ns, "IconSelectControl-Modal-search")), mini: false, clearable: true, onChange: this.handleSearchValueChange }),
            (IconSelectStore.refreshIconList &&
                render('refresh-btn', {
                    type: 'button',
                    icon: 'fa fa-refresh'
                }, {
                    className: cx__default["default"]("".concat(ns, "IconSelectControl-Modal-refresh")),
                    onClick: this.handleRefreshIconList
                })) ||
                null,
            FuncCom ? (_J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-Modal-func")) },
                _J$X_(FuncCom, { onUpload: this.handleLocalUpload }))) : null,
            _J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-Modal-content")) },
                _J$X_(amisUi.Spinner, { size: "lg", loadingConfig: loadingConfig, overlay: true, key: "info", show: this.state.isRefreshLoading }),
                _J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-Modal-content-aside")) }, this.renderIconTypes()),
                _J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-Modal-content-main")) }, this.renderIconList(filteredIcons)))));
    };
    IconSelectControl.prototype.getIconsByType = function () {
        return (((IconSelectStore === null || IconSelectStore === void 0 ? void 0 : IconSelectStore.svgIcons.length) &&
            IconSelectStore.svgIcons[this.state.activeTypeIndex]
                .children) ||
            []);
    };
    IconSelectControl.prototype.toggleModel = function (isShow) {
        var valueTemp = this.props.value;
        var value = typeof valueTemp === 'string' ? this.getValueBySvg(valueTemp) : valueTemp;
        if (isShow === undefined) {
            this.setState({
                showModal: !this.state.showModal,
                searchValue: ''
            });
            return;
        }
        this.setState({
            showModal: isShow,
            // tmpCheckIconId: isShow ? String(value).replace('svg-', '') : '',
            tmpCheckIconId: isShow && (value === null || value === void 0 ? void 0 : value.id)
                ? tslib.__assign(tslib.__assign({}, value), { id: String(value.id).replace(/^svg-/, '') }) : null,
            searchValue: ''
        });
    };
    IconSelectControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, disabled = _a.disabled, __ = _a.translate;
        return (_J$X_("div", { className: cx__default["default"](className, "".concat(ns, "IconSelectControl"), {
                'is-focused': this.state.showModal,
                'is-disabled': disabled
            }) },
            _J$X_("div", { className: cx__default["default"]("".concat(ns, "IconSelectControl-input")), onClick: this.handleClick }, this.renderInputArea()),
            _J$X_(amisUi.Modal, { show: this.state.showModal, closeOnOutside: true, closeOnEsc: true, size: "lg", overlay: true, onHide: function () { return _this.toggleModel(false); } },
                _J$X_(amisUi.Modal.Header, { onClose: function () { return _this.toggleModel(false); } }, __('IconSelect.choice')),
                _J$X_(amisUi.Modal.Body, null, this.renderModalContent()),
                _J$X_(amisUi.Modal.Footer, null,
                    _J$X_(amisUi.Button, { type: "button", className: "m-l", onClick: function () { return _this.toggleModel(false); } }, __('cancel')),
                    _J$X_(amisUi.Button, { type: "button", level: "primary", onClick: this.handleConfirm }, __('confirm'))))));
    };
    IconSelectControl.defaultProps = {
        noDataTip: 'placeholder.noData',
        clearable: true
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "handleClear", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "renderInputArea", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Number]),
        tslib.__metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "handleIconTypeClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "renderIconTypes", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "handleConfirm", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String]),
        tslib.__metadata("design:returntype", Promise)
    ], IconSelectControl.prototype, "handleLocalUpload", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Array]),
        tslib.__metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "renderIconList", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", Promise)
    ], IconSelectControl.prototype, "handleRefreshIconList", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "renderModalContent", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Boolean]),
        tslib.__metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "toggleModel", null);
    return IconSelectControl;
}(React__default["default"].PureComponent));
/** @class */ ((function (_super) {
    tslib.__extends(IconSelectControlRenderer, _super);
    function IconSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconSelectControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'icon-select'
        })
    ], IconSelectControlRenderer);
    return IconSelectControlRenderer;
})(IconSelectControl));

exports["default"] = IconSelectControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
