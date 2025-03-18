/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React from 'react';
import cx from 'classnames';
import { matchSorter } from 'match-sorter';
import { autobind, FormItem } from 'amis-core';
import { Icon, SearchBox, Spinner, Modal, Button } from 'amis-ui';
import debounce from 'lodash/debounce';
import find from 'lodash/find';
import * as IconSelectStore from './IconSelectStore.js';
import { svgIcons, refreshIconList } from './IconSelectStore.js';

/**
 * 新图标选择器
 */
var IconSelectControl = /** @class */ (function (_super) {
    __extends(IconSelectControl, _super);
    function IconSelectControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeTypeIndex: 0,
            showModal: false,
            tmpCheckIconId: null,
            searchValue: '',
            isRefreshLoading: false
        };
        _this.handleSearchValueChange = debounce(_this.handleSearchValueChange.bind(_this), 300);
        return _this;
    }
    IconSelectControl.prototype.getValueBySvg = function (svg) {
        if (!svg || typeof svg !== 'string') {
            return null;
        }
        var findItem = undefined;
        if (svgIcons && svgIcons.length) {
            for (var i = 0; i < svgIcons.length; i++) {
                findItem = find(svgIcons[i].children, function (i) { return i.svg === svg; });
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
        return (React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-input-area")) },
            pureValue ? (React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-input-icon-show")) },
                React.createElement("svg", null,
                    React.createElement("use", { xlinkHref: "#".concat(pureValue) })))) : valueTemp ? (SvgStr ? (React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-input-area-str-svg")), dangerouslySetInnerHTML: { __html: SvgStr[0].replace(/\\"/g, '"') } })) : (React.createElement(Icon, { icon: valueTemp, className: cx("".concat(ns, "IconSelectControl-input-area-iconfont"), 'icon') }))) : null,
            React.createElement("span", { className: cx("".concat(ns, "IconSelectControl-input-icon-id")) }, iconName),
            clearable && !disabled && (pureValue || valueTemp) ? (React.createElement("a", { onClick: this.handleClear, className: cx("".concat(ns, "IconSelectControl-clear")) },
                React.createElement(Icon, { icon: "input-clear", className: "icon" }))) : null,
            (!value && placeholder && (React.createElement("span", { className: cx("".concat(ns, "IconSelectControl-input-icon-placeholder")) }, placeholder))) ||
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
        var types = svgIcons.map(function (item) { return ({
            id: item.groupId,
            label: item.name
        }); });
        return (React.createElement("ul", { className: cx("".concat(ns, "IconSelectControl-type-list")) }, types.map(function (item, index) { return (React.createElement("li", { key: item.id, onClick: function () { return _this.handleIconTypeClick(item, index); }, className: cx({
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
                    ? __assign(__assign({}, checkedIcon), { id: 'svg-' + checkedIcon.id }) : '');
        }
        this.toggleModel(false);
    };
    IconSelectControl.prototype.handleLocalUpload = function (icon) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
            return (React.createElement("p", { className: cx("".concat(ns, "IconSelectControl-icon-list-empty")) }, __(noDataTip)));
        }
        return (React.createElement("ul", { className: cx("".concat(ns, "IconSelectControl-icon-list")) }, icons.map(function (item, index) {
            var _a;
            return (React.createElement("li", { key: item.id },
                React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-icon-list-item"), {
                        active: ((_a = _this.state.tmpCheckIconId) === null || _a === void 0 ? void 0 : _a.id) === item.id
                    }), onClick: function () { return _this.handleClickIconInModal(item); } },
                    React.createElement("svg", null,
                        React.createElement("use", { xlinkHref: "#".concat(item.id) })),
                    React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-icon-list-item-info")) },
                        React.createElement("p", { className: cx("".concat(ns, "IconSelectControl-icon-list-item-info-name")) }, item.name)))));
        })));
    };
    IconSelectControl.prototype.handleSearchValueChange = function (e) {
        this.setState({
            searchValue: e
        });
    };
    IconSelectControl.prototype.handleRefreshIconList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshIconList$1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshIconList$1 = refreshIconList;
                        if (!(refreshIconList$1 && typeof refreshIconList$1 === 'function')) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.setState({
                            isRefreshLoading: true
                        });
                        return [4 /*yield*/, Promise.resolve(refreshIconList$1())];
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
            ? matchSorter(icons, inputValue, {
                keys: ['name'],
                threshold: matchSorter.rankings.CONTAINS
            })
            : icons;
        return (React.createElement(React.Fragment, null,
            React.createElement(SearchBox, { className: cx("".concat(ns, "IconSelectControl-Modal-search")), mini: false, clearable: true, onChange: this.handleSearchValueChange }),
            (refreshIconList &&
                render('refresh-btn', {
                    type: 'button',
                    icon: 'fa fa-refresh'
                }, {
                    className: cx("".concat(ns, "IconSelectControl-Modal-refresh")),
                    onClick: this.handleRefreshIconList
                })) ||
                null,
            FuncCom ? (React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-Modal-func")) },
                React.createElement(FuncCom, { onUpload: this.handleLocalUpload }))) : null,
            React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-Modal-content")) },
                React.createElement(Spinner, { size: "lg", loadingConfig: loadingConfig, overlay: true, key: "info", show: this.state.isRefreshLoading }),
                React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-Modal-content-aside")) }, this.renderIconTypes()),
                React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-Modal-content-main")) }, this.renderIconList(filteredIcons)))));
    };
    IconSelectControl.prototype.getIconsByType = function () {
        return (((IconSelectStore === null || IconSelectStore === void 0 ? void 0 : svgIcons.length) &&
            svgIcons[this.state.activeTypeIndex]
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
                ? __assign(__assign({}, value), { id: String(value.id).replace(/^svg-/, '') }) : null,
            searchValue: ''
        });
    };
    IconSelectControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, disabled = _a.disabled, __ = _a.translate;
        return (React.createElement("div", { className: cx(className, "".concat(ns, "IconSelectControl"), {
                'is-focused': this.state.showModal,
                'is-disabled': disabled
            }) },
            React.createElement("div", { className: cx("".concat(ns, "IconSelectControl-input")), onClick: this.handleClick }, this.renderInputArea()),
            React.createElement(Modal, { show: this.state.showModal, closeOnOutside: true, closeOnEsc: true, size: "lg", overlay: true, onHide: function () { return _this.toggleModel(false); } },
                React.createElement(Modal.Header, { onClose: function () { return _this.toggleModel(false); } }, __('IconSelect.choice')),
                React.createElement(Modal.Body, null, this.renderModalContent()),
                React.createElement(Modal.Footer, null,
                    React.createElement(Button, { type: "button", className: "m-l", onClick: function () { return _this.toggleModel(false); } }, __('cancel')),
                    React.createElement(Button, { type: "button", level: "primary", onClick: this.handleConfirm }, __('confirm'))))));
    };
    IconSelectControl.defaultProps = {
        noDataTip: 'placeholder.noData',
        clearable: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "handleClear", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "renderInputArea", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number]),
        __metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "handleIconTypeClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "renderIconTypes", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "handleConfirm", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], IconSelectControl.prototype, "handleLocalUpload", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "renderIconList", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], IconSelectControl.prototype, "handleRefreshIconList", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "renderModalContent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], IconSelectControl.prototype, "toggleModel", null);
    return IconSelectControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(IconSelectControlRenderer, _super);
    function IconSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconSelectControlRenderer = __decorate([
        FormItem({
            type: 'icon-select'
        })
    ], IconSelectControlRenderer);
    return IconSelectControlRenderer;
})(IconSelectControl));

export { IconSelectControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
