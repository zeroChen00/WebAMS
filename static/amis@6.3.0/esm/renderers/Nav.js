/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata, __rest } from 'tslib';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { matchSorter } from 'match-sorter';
import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';
import cloneDeep from 'lodash/cloneDeep';
import { isObject, filter, createObject, str2function, noop, buildStyle, insertStyle, autobind, themeable, someTree, mapTree, getExprProperties, guid, findTree, isUnfolded, spliceTree, resolveVariableAndFilter, findTreeIndex, isEffectiveApi, ScopedContext, Renderer, evalExpression } from 'amis-core';
import { Icon, SearchBox, Menu, Spinner, withRemoteConfig } from 'amis-ui';

var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startPoint = {
            y: 0,
            x: 0
        };
        _this.state = {
            keyword: '',
            filteredLinks: []
        };
        return _this;
    }
    Navigation.prototype.handleClick = function (link, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, env, onSelect;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, env = _a.env, onSelect = _a.onSelect;
                        // 和 action 里命名一致方便分析
                        if (link && link.to) {
                            env === null || env === void 0 ? void 0 : env.tracker({
                                eventType: 'link',
                                eventData: {
                                    label: link.label,
                                    link: link.to
                                }
                            });
                        }
                        return [4 /*yield*/, (onSelect === null || onSelect === void 0 ? void 0 : onSelect(link, depth))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Navigation.prototype.handleChange = function (links) {
        return __awaiter(this, void 0, void 0, function () {
            var onChange;
            return __generator(this, function (_a) {
                onChange = this.props.onChange;
                onChange && onChange(links);
                return [2 /*return*/];
            });
        });
    };
    Navigation.prototype.toggleLink = function (target, depth, forceFold) {
        var _a, _b;
        (_b = (_a = this.props).onToggle) === null || _b === void 0 ? void 0 : _b.call(_a, target, depth, forceFold);
    };
    Navigation.prototype.getDropInfo = function (e, id, depth) {
        var _a, _b;
        var _c = this.props, dragOnSameLevel = _c.dragOnSameLevel, indentSize = _c.indentSize;
        var rect = e.target.getBoundingClientRect();
        var dragLink = (_a = this.dragNode) === null || _a === void 0 ? void 0 : _a.link;
        var top = rect.top, height = rect.height, width = rect.width;
        var clientY = e.clientY, clientX = e.clientX;
        var left = depth * ((_b = parseInt(indentSize, 10)) !== null && _b !== void 0 ? _b : 16);
        var deltaX = left + width * 0.2;
        var position;
        if (clientY >= top + height / 2) {
            position = 'bottom';
        }
        else {
            position = 'top';
        }
        if (!dragOnSameLevel &&
            position === 'bottom' &&
            clientX >= this.startPoint.x + deltaX) {
            position = 'self';
        }
        return {
            nodeId: id,
            dragLink: dragLink,
            position: position,
            rect: rect,
            height: height,
            left: left
        };
    };
    Navigation.prototype.updateDropIndicator = function (e) {
        var _a;
        var _b = this.props, dragOnSameLevel = _b.dragOnSameLevel, overflow = _b.overflow;
        // 因为使用了rc-menu 因此拖拽事件拿到的rc-menu的li
        // id和depth在li里的a标签上
        var target = e.target.querySelector('a');
        var targetId = target === null || target === void 0 ? void 0 : target.getAttribute('data-id');
        var targetDepth = Number(target === null || target === void 0 ? void 0 : target.getAttribute('data-depth'));
        var wrapperComponent = overflow && overflow.enable ? overflow.wrapperComponent || 'ul' : 'ul';
        if (dragOnSameLevel &&
            // menu里原来menuItem套了一层div 后来改成了ul 这里的判断条件需要加限制
            // 否则始终不相等
            ((_a = this.dragNode) === null || _a === void 0 ? void 0 : _a.node.closest("".concat(wrapperComponent, "[role=\"menu\"]"))) !==
                (target === null || target === void 0 ? void 0 : target.closest("".concat(wrapperComponent, "[role=\"menu\"]")))) {
            this.setState({ dropIndicator: undefined });
            this.dropInfo = null;
            return;
        }
        this.dropInfo = this.getDropInfo(e, targetId, targetDepth);
        var _c = this.dropInfo, position = _c.position, rect = _c.rect, dragLink = _c.dragLink, height = _c.height, left = _c.left;
        if (targetId === (dragLink === null || dragLink === void 0 ? void 0 : dragLink.__id)) {
            this.setState({ dropIndicator: undefined });
            this.dropInfo = null;
            return;
        }
        var ul = findDOMNode(this).firstChild;
        if (position === 'self') {
            var dropIndicator = {
                top: rect.top - ul.getBoundingClientRect().top,
                left: left,
                width: ul.getBoundingClientRect().width - left,
                height: height,
                opacity: 0.2
            };
            // 尽量减少dropIndicator的更新 否则到saas里会比较卡
            if (!this.state.dropIndicator ||
                (this.state.dropIndicator &&
                    !isEqual(this.state.dropIndicator, dropIndicator))) {
                this.setState({
                    dropIndicator: dropIndicator
                });
            }
        }
        else {
            var dropIndicator = {
                top: (position === 'bottom' ? rect.top + rect.height : rect.top) -
                    ul.getBoundingClientRect().top,
                left: left,
                width: ul.getBoundingClientRect().width - left
            };
            if (!this.state.dropIndicator ||
                (this.state.dropIndicator &&
                    !isEqual(this.state.dropIndicator, dropIndicator))) {
                this.setState({
                    dropIndicator: dropIndicator
                });
            }
        }
    };
    Navigation.prototype.handleDragStart = function (link) {
        var _this = this;
        return function (e) {
            e.stopPropagation();
            var currentTarget = e.currentTarget;
            e.dataTransfer.effectAllowed = 'copyMove';
            e.dataTransfer.setDragImage(currentTarget, 0, 0);
            _this.dragNode = {
                node: currentTarget,
                link: link
            };
            _this.dropInfo = null;
            _this.startPoint = {
                x: e.clientX,
                y: e.clientY
            };
            currentTarget.addEventListener('dragend', _this.handleDragEnd);
            document.body.addEventListener('dragover', _this.handleDragOver);
        };
    };
    Navigation.prototype.handleDragOver = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.dragNode) {
            return;
        }
        var target = e.target.querySelector('a');
        var id = target === null || target === void 0 ? void 0 : target.getAttribute('data-id');
        if (!id) {
            return;
        }
        this.updateDropIndicator(e);
    };
    Navigation.prototype.handleDragEnd = function (e) {
        var _a, _b, _c;
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            dropIndicator: undefined
        });
        var currentTarget = e.currentTarget;
        var id = currentTarget.getAttribute('data-id');
        if (!id) {
            var a = currentTarget.querySelector('a');
            if (a) {
                id = a.getAttribute('data-id');
            }
        }
        var nodeId = (_a = this.dropInfo) === null || _a === void 0 ? void 0 : _a.nodeId;
        if (!this.dropInfo || !nodeId || id === nodeId) {
            return;
        }
        currentTarget.removeEventListener('dragend', this.handleDragEnd);
        document.body.removeEventListener('dragover', this.handleDragOver);
        (_c = (_b = this.props).onDragUpdate) === null || _c === void 0 ? void 0 : _c.call(_b, this.dropInfo);
        this.dragNode = null;
        this.dropInfo = null;
    };
    Navigation.prototype.normalizeNavigations = function (links, depth) {
        var _this = this;
        var _a = this.props, level = _a.level, stacked = _a.stacked, mode = _a.mode, itemActions = _a.itemActions, render = _a.render, popOverContainer = _a.popOverContainer, env = _a.env, cx = _a.classnames, data = _a.data, collapsed = _a.collapsed;
        if (!links) {
            return [];
        }
        if (level && depth > level) {
            return [];
        }
        var isCollapsedNode = collapsed && depth === 1;
        return links
            .filter(function (link) { return !(link.hidden === true || link.visible === false); })
            .map(function (link) {
            var beforeIcon = [];
            var afterIcon = [];
            link.icon &&
                (Array.isArray(link.icon) ? link.icon : [link.icon]).forEach(function (item, i) {
                    if (React.isValidElement(item)) {
                        beforeIcon.push(item);
                    }
                    else if (isString(item)) {
                        beforeIcon.push(React.createElement(Icon, { key: "icon-".concat(i), cx: cx, icon: item, className: isCollapsedNode ? '' : 'mr-2' }));
                    }
                    else if (item && isObject(item)) {
                        var isAfter = item['position'] === 'after';
                        var icon = (React.createElement(Icon, { key: "icon-".concat(i), cx: cx, icon: item['icon'], className: isCollapsedNode ? '' : isAfter ? 'ml-2' : 'mr-2' }));
                        if (isAfter) {
                            afterIcon.push(icon);
                        }
                        else {
                            beforeIcon.push(icon);
                        }
                    }
                });
            var label = typeof link.label === 'string'
                ? filter(link.label, data)
                : React.isValidElement(link.label)
                    ? React.cloneElement(link.label)
                    : render('inline', link.label);
            // 仅垂直内联模式支持
            var isOverflow = stacked &&
                mode !== 'float' &&
                !link.expanded &&
                link.overflow &&
                isObject(link.overflow) &&
                link.overflow.enable;
            var children = link.children;
            if (isOverflow) {
                var _a = link.overflow, maxVisibleCount = _a.maxVisibleCount, _b = _a.overflowIndicator, overflowIndicator_1 = _b === void 0 ? 'fa fa-ellipsis-h' : _b, overflowLabel_1 = _a.overflowLabel, overflowClassName_1 = _a.overflowClassName;
                // 默认展示5个
                var maxCount_1 = maxVisibleCount || 2;
                if (maxCount_1 < ((children === null || children === void 0 ? void 0 : children.length) || 0)) {
                    children = children === null || children === void 0 ? void 0 : children.map(function (child, index) {
                        return __assign(__assign({}, child), { label: index === maxCount_1 ? (React.createElement("span", { className: cx(overflowClassName_1) },
                                React.createElement(Icon, { icon: overflowIndicator_1, className: "icon Nav-item-icon" }),
                                overflowLabel_1 && isObject(overflowLabel_1)
                                    ? render('nav-overflow-label', overflowLabel_1)
                                    : overflowLabel_1)) : (child.label), hidden: index > maxCount_1 ? true : link.hidden, expandMore: index === maxCount_1 });
                    });
                }
            }
            return {
                link: link,
                label: label,
                labelExtra: afterIcon.length ? (React.createElement("i", { className: cx('Nav-Menu-item-icon-after') }, afterIcon)) : null,
                icon: beforeIcon.length ? React.createElement("i", null, beforeIcon) : null,
                children: children
                    ? _this.normalizeNavigations(children, link.mode === 'group' ? depth : depth + 1)
                    : [],
                path: link.to,
                open: link.unfolded,
                extra: itemActions
                    ? render('inline', itemActions, {
                        data: createObject(data, link),
                        popOverContainer: popOverContainer
                            ? popOverContainer
                            : env && env.getModalContainer
                                ? env.getModalContainer
                                : function () { return document.body; },
                        // 点击操作之后 就关闭 因为close方法里执行了preventDefault
                        closeOnClick: true
                    })
                    : null,
                disabled: !!link.disabled,
                disabledTip: link.disabledTip,
                hidden: link.hidden,
                className: link.className,
                mode: link.mode
            };
        });
    };
    Navigation.prototype.handleSearch = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, links, _b, searchConfig, originLinks, matchFunc, filterLinks;
            return __generator(this, function (_c) {
                _a = this.props, links = _a.links, _b = _a.searchConfig, searchConfig = _b === void 0 ? {} : _b;
                originLinks = cloneDeep(links !== null && links !== void 0 ? links : []);
                matchFunc = searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.matchFunc;
                if (!keyword) {
                    this.setState({ keyword: '', filteredLinks: [] });
                    return [2 /*return*/];
                }
                if (matchFunc && typeof matchFunc === 'string') {
                    matchFunc = str2function(matchFunc, 'link', 'keyword');
                }
                else if (typeof matchFunc === 'function') ;
                else {
                    matchFunc = function (link, keyword) {
                        var _a, _b;
                        var matched = (_a = matchSorter([link], keyword, {
                            keys: ['label', 'title', 'key'],
                            threshold: matchSorter.rankings.CONTAINS
                        })) === null || _a === void 0 ? void 0 : _a.length;
                        return matched || ((link === null || link === void 0 ? void 0 : link.children) && ((_b = link.children) === null || _b === void 0 ? void 0 : _b.length) > 0);
                    };
                }
                filterLinks = function (root, text) {
                    var filterChildren = function (result, link) {
                        if (matchFunc(link, text)) {
                            result.push(__assign(__assign({}, link), { unfolded: true }));
                            return result;
                        }
                        if (Array.isArray(link.children)) {
                            var children = link.children.reduce(filterChildren, []);
                            if (children.length) {
                                result.push(__assign(__assign({}, link), { unfolded: true, children: children }));
                            }
                        }
                        return result;
                    };
                    return root.reduce(filterChildren, []);
                };
                this.setState({ keyword: keyword, filteredLinks: filterLinks(originLinks, keyword) });
                return [2 /*return*/];
            });
        });
    };
    Navigation.prototype.renderSearchBox = function () {
        var _a, _b, _c;
        var _d = this.props, cx = _d.classnames, searchable = _d.searchable, _e = _d.searchConfig, searchConfig = _e === void 0 ? {} : _e;
        var keyword = this.state.keyword;
        return (React.createElement(React.Fragment, null, searchable ? (React.createElement(SearchBox, { className: cx('Nav-SearchBox', searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.className), mini: (_a = searchConfig.mini) !== null && _a !== void 0 ? _a : false, enhance: (_b = searchConfig.enhance) !== null && _b !== void 0 ? _b : false, clearable: (_c = searchConfig.clearable) !== null && _c !== void 0 ? _c : true, searchImediately: searchConfig.searchImediately, placeholder: searchConfig.placeholder, defaultValue: '', value: keyword !== null && keyword !== void 0 ? keyword : '', onSearch: this.handleSearch, onChange: /** 为了消除react报错 */ noop })) : null));
    };
    Navigation.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, style = _b.style, stacked = _b.stacked, mode = _b.mode, cx = _b.classnames, links = _b.links, loading = _b.loading, overflow = _b.overflow, loadingConfig = _b.loadingConfig, itemBadge = _b.itemBadge, badge = _b.badge, data = _b.data, location = _b.location, collapsed = _b.collapsed, expandIcon = _b.expandIcon, indentSize = _b.indentSize, accordion = _b.accordion, draggable = _b.draggable, themeColor = _b.themeColor, expandPosition = _b.expandPosition, popupClassName = _b.popupClassName, disabled = _b.disabled, id = _b.id, render = _b.render, popOverContainer = _b.popOverContainer, env = _b.env, searchable = _b.searchable, testIdBuilder = _b.testIdBuilder;
        var _c = this.state, dropIndicator = _c.dropIndicator, filteredLinks = _c.filteredLinks;
        var overflowedIndicator = null;
        if (overflow && isObject(overflow) && overflow.enable) {
            var _d = overflow.overflowIndicator, overflowIndicator = _d === void 0 ? 'fa fa-ellipsis-h' : _d, overflowLabel = overflow.overflowLabel, overflowClassName = overflow.overflowClassName;
            overflowedIndicator = (React.createElement("span", { className: cx(overflowClassName) },
                React.createElement(React.Fragment, null,
                    React.createElement(Icon, { icon: overflowIndicator, className: "icon Nav-item-icon" }),
                    overflowLabel && isObject(overflowLabel)
                        ? render('nav-overflow-label', overflowLabel)
                        : overflowLabel)));
        }
        var styleConfig = null;
        var classNameId = '';
        if (style) {
            try {
                styleConfig = buildStyle(style, data);
                // 格式转换
                // {"color": "red", "lineHeight": "52px"}
                var styleText = JSON.stringify(styleConfig)
                    .replace(/\,/g, ';')
                    .replace(/\"/g, '')
                    .replace(/[A-Z]/g, function (s) { return '-' + s.toLowerCase(); });
                // 一个nav对应一个classNameId 避免重复
                classNameId = cx("Nav-PopupClassName-".concat(id));
                if (!document.getElementById(classNameId)) {
                    // rc-menu的浮层只支持配置popupClassName 因此需要将配置的style插入到页面 然后将className赋值给浮层
                    insertStyle({
                        style: ".".concat(classNameId, " ").concat(styleText),
                        classId: classNameId
                    });
                }
            }
            catch (e) { }
        }
        var navigations = Array.isArray(filteredLinks) && filteredLinks.length > 0
            ? filteredLinks
            : links;
        var menuDom = (React.createElement(React.Fragment, null,
            Array.isArray(navigations) ? (React.createElement(Menu, { navigations: this.normalizeNavigations(navigations, 1), isActive: function (link, prefix) {
                    if (link.link && typeof link.link.active !== 'undefined') {
                        return link.link.active;
                    }
                    var path = link.path;
                    var ret = location.pathname === path;
                    return !!ret;
                }, isOpen: function (item) { return !!item.open; }, stacked: !!stacked, mode: mode, testIdBuilder: testIdBuilder, themeColor: themeColor, onSelect: this.handleClick, onToggle: this.toggleLink, onChange: this.handleChange, renderLink: function (link) { return link.link; }, badge: itemBadge || badge, collapsed: collapsed, overflowedIndicator: overflowedIndicator, overflowMaxCount: overflow === null || overflow === void 0 ? void 0 : overflow.maxVisibleCount, overflowedIndicatorPopupClassName: cx(overflow === null || overflow === void 0 ? void 0 : overflow.overflowPopoverClassName), overflowSuffix: (overflow === null || overflow === void 0 ? void 0 : overflow.overflowSuffix)
                    ? render('nav-overflow-suffix', overflow === null || overflow === void 0 ? void 0 : overflow.overflowSuffix)
                    : null, overflowItemWidth: overflow === null || overflow === void 0 ? void 0 : overflow.itemWidth, overflowComponent: overflow === null || overflow === void 0 ? void 0 : overflow.wrapperComponent, overflowStyle: overflow === null || overflow === void 0 ? void 0 : overflow.style, popupClassName: "".concat(popupClassName || '').concat(classNameId ? " ".concat(classNameId) : ''), expandIcon: expandIcon
                    ? typeof expandIcon === 'string'
                        ? expandIcon
                        : render('expand-icon', expandIcon)
                    : null, expandBefore: expandPosition === 'after' ? false : true, inlineIndent: indentSize, accordion: accordion, draggable: draggable, data: data, disabled: disabled, onDragStart: this.handleDragStart, popOverContainer: popOverContainer
                    ? popOverContainer
                    : env && env.getModalContainer
                        ? env.getModalContainer
                        : function () { return document.body; } })) : null,
            React.createElement(Spinner, { show: !!loading, overlay: true, loadingConfig: loadingConfig })));
        return (React.createElement("div", { className: cx('Nav', className, (_a = {},
                _a['Nav-horizontal'] = !stacked,
                _a['Nav--searchable'] = !!searchable,
                _a)), style: styleConfig },
            searchable ? (React.createElement(React.Fragment, null,
                this.renderSearchBox(),
                menuDom)) : (menuDom),
            dropIndicator ? (React.createElement("div", { className: cx('Nav-dropIndicator'), style: dropIndicator })) : null));
    };
    Navigation.defaultProps = {
        indentSize: 16
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number]),
        __metadata("design:returntype", Promise)
    ], Navigation.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], Navigation.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, Boolean]),
        __metadata("design:returntype", void 0)
    ], Navigation.prototype, "toggleLink", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent, String, Number]),
        __metadata("design:returntype", Object)
    ], Navigation.prototype, "getDropInfo", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], Navigation.prototype, "updateDropIndicator", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Navigation.prototype, "handleDragStart", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], Navigation.prototype, "handleDragOver", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], Navigation.prototype, "handleDragEnd", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], Navigation.prototype, "handleSearch", null);
    return Navigation;
}(React.Component));
var ThemedNavigation = themeable(Navigation);
var ConditionBuilderWithRemoteOptions = withRemoteConfig({
    adaptor: function (config, props) {
        var links = Array.isArray(config)
            ? config
            : config.links || config.options || config.items || config.rows;
        if (!Array.isArray(links)) {
            throw new Error('payload.data.options is not array.');
        }
        return links;
    },
    afterLoad: function (response, config, props) { return __awaiter(void 0, void 0, void 0, function () {
        var dispatchEvent, data, rendererEvent, env;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatchEvent = props.dispatchEvent, data = props.data;
                    return [4 /*yield*/, dispatchEvent('loaded', createObject(data, {
                            data: response.value,
                            items: response.links
                        }))];
                case 1:
                    rendererEvent = _a.sent();
                    if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                        return [2 /*return*/];
                    }
                    if (response.value && !someTree(config, function (item) { return item.active; })) {
                        env = props.env;
                        env.jumpTo(filter(response.value, props.data), undefined, props.data);
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    normalizeConfig: function (links, origin, props, motivation) {
        if (Array.isArray(links) && motivation !== 'toggle') {
            var data_1 = props.data, env_1 = props.env, unfoldedField_1 = props.unfoldedField, foldedField_1 = props.foldedField, location_1 = props.location, level_1 = props.level, defaultOpenLevel_1 = props.defaultOpenLevel, disabled_1 = props.disabled, valueField_1 = props.valueField;
            var isActive_1 = function (link, depth) {
                if (disabled_1) {
                    return false;
                }
                if (!!link.disabled) {
                    return false;
                }
                return motivation &&
                    !['location-change', 'data-change'].includes(motivation) &&
                    typeof link.active !== 'undefined'
                    ? link.active
                    : (depth === level_1
                        ? !!findTree(link.children || [], function (l) {
                            return !!(l.hasOwnProperty('to') &&
                                env_1 &&
                                env_1.isCurrentUrl(filter(l.to, data_1), link));
                        })
                        : false) ||
                        (link.activeOn
                            ? evalExpression(link.activeOn, data_1) ||
                                evalExpression(link.activeOn, location_1)
                            : !!(link.hasOwnProperty('to') &&
                                link.to !== null && // 也可能出现{to: null}的情况（独立应用）filter会把null处理成'' 那默认首页会选中很多菜单项 {to: ''}认为是有效配置
                                env_1 &&
                                env_1.isCurrentUrl(filter(link.to, data_1), link)));
            };
            links = mapTree(links, function (link, index, depth) {
                var _a;
                var item = __assign(__assign(__assign({}, link), getExprProperties(link, data_1)), { active: isActive_1(link, depth), __id: (_a = link.__id) !== null && _a !== void 0 ? _a : guid() });
                var originLink = null;
                // 懒加载的菜单项不保留展开状态
                if (!link.defer && valueField_1 && link[valueField_1]) {
                    originLink = findTree(origin || [], function (originItem) { return originItem[valueField_1] === link[valueField_1]; });
                }
                // defaultOpenLevel depth <= defaultOpenLevel的默认全部展开
                // 优先级比unfolded属性低 如果用户配置了unfolded为false 那么默认不展开
                // 如果defer菜单项，unfolded默认设置了true，那么会有问题
                // 先前相同菜单做了展开收起操作的话 优先级最高
                item.unfolded = originLink
                    ? isUnfolded(originLink, { unfoldedField: unfoldedField_1, foldedField: foldedField_1 })
                    : typeof link.unfolded !== 'undefined'
                        ? isUnfolded(item, { unfoldedField: unfoldedField_1, foldedField: foldedField_1 })
                        : defaultOpenLevel_1 && depth <= defaultOpenLevel_1
                            ? true
                            : link.children &&
                                !!findTree(link.children, function (child, i, d) {
                                    return isActive_1(child, depth + d);
                                });
                return item;
            }, 1, true);
        }
        return links;
    },
    beforeDeferLoad: function (item, indexes, links) {
        return spliceTree(links, indexes, 1, __assign(__assign({}, item), { loading: true }));
    },
    afterDeferLoad: function (item, indexes, ret, links, props) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var dispatchEvent, data, rendererEvent, newItem, children;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        dispatchEvent = props.dispatchEvent, data = props.data;
                        return [4 /*yield*/, dispatchEvent('loaded', createObject(data, {
                                data: ret.data,
                                item: __assign({}, item)
                            }))];
                    case 1:
                        rendererEvent = _e.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        newItem = __assign(__assign({}, item), { loading: false, loaded: true, error: ret.ok ? undefined : ret.msg });
                        children = Array.isArray(ret.data)
                            ? ret.data
                            : ((_a = ret.data) === null || _a === void 0 ? void 0 : _a.links) ||
                                ((_b = ret.data) === null || _b === void 0 ? void 0 : _b.options) ||
                                ((_c = ret.data) === null || _c === void 0 ? void 0 : _c.items) ||
                                ((_d = ret.data) === null || _d === void 0 ? void 0 : _d.rows);
                        if (Array.isArray(children)) {
                            newItem.children = children.concat();
                            newItem.unfolded = true;
                        }
                        return [2 /*return*/, spliceTree(links, indexes, 1, newItem)];
                }
            });
        });
    }
})(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentKey: props.showKey || '',
            collapsed: props.collapsed || false
        };
        _this.toggleLink = _this.toggleLink.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.dragUpdate = _this.dragUpdate.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        props === null || props === void 0 ? void 0 : props.onRef(_this);
        return _this;
    }
    class_1.prototype.componentDidMount = function () {
        if (Array.isArray(this.props.links)) {
            this.props.updateConfig(this.props.links, 'mount');
        }
    };
    class_1.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (!isEqual(this.props.location, prevProps.location)) {
            this.props.updateConfig(this.props.config, 'location-change');
        }
        else if (!isEqual(this.props.links, prevProps.links)) {
            this.props.updateConfig(this.props.links, 'update');
        }
        else if (!isEqual(this.props.data, prevProps.data)) {
            this.props.updateConfig(this.props.config, 'data-change');
        }
        // 外部修改defaultOpenLevel 会影响菜单的unfolded属性
        if (prevProps.defaultOpenLevel !== this.props.defaultOpenLevel) {
            this.props.updateConfig(this.props.config, 'update');
        }
        if (prevProps.collapsed !== this.props.collapsed) {
            this.setState({ collapsed: this.props.collapsed });
        }
        if (prevState.collapsed !== this.state.collapsed) {
            this.props.dispatchEvent('collapsed', createObject(this.props.data, {
                collapsed: this.state.collapsed
            }));
        }
    };
    class_1.prototype.getCurrentLink = function (key) {
        var link = null;
        var _a = this.props, config = _a.config, data = _a.data, valueField = _a.valueField;
        var id = resolveVariableAndFilter(key, data, '| raw');
        if (key) {
            link = findTree(config, function (item) {
                return valueField
                    ? item[valueField] === id
                    : item.label == id || item.key == id;
            });
        }
        return link;
    };
    class_1.prototype.toggleLink = function (target, depth, forceFold) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, config, updateConfig, deferLoad, dispatchEvent, stacked, mode, accordion, data, isAccordion, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, config = _a.config, updateConfig = _a.updateConfig, deferLoad = _a.deferLoad, dispatchEvent = _a.dispatchEvent, stacked = _a.stacked, mode = _a.mode, accordion = _a.accordion, data = _a.data;
                        isAccordion = stacked && mode !== 'float' && accordion;
                        return [4 /*yield*/, dispatchEvent('toggled', createObject(data, {
                                item: __assign({}, target),
                                open: typeof forceFold !== 'undefined' ? !forceFold : !target.unfolded
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (target.defer && !target.loaded) {
                            deferLoad(target);
                        }
                        else {
                            updateConfig(mapTree(config, function (link) {
                                return target.__id === link.__id
                                    ? __assign(__assign({}, link), { unfolded: typeof forceFold !== 'undefined'
                                            ? !forceFold
                                            : !link.unfolded }) : __assign(__assign({}, link), { unfolded: isAccordion
                                        ? !!findTree(link.children || [], function (item) { return item === target; })
                                        : link.unfolded });
                            }), 'toggle');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.dragUpdate = function (dropInfo) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var links, nodeId, dragLink, position, sourceIdx, idx;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        links = this.props.config;
                        nodeId = dropInfo.nodeId, dragLink = dropInfo.dragLink, position = dropInfo.position;
                        if (dragLink) {
                            sourceIdx = findTreeIndex(links, function (link) { return link.__id === dragLink.__id; });
                            links = spliceTree(links, sourceIdx, 1);
                            if (position === 'self') {
                                // 插入到对应节点的children中
                                mapTree(links, function (link) {
                                    if (link.__id === nodeId) {
                                        if (!link.children) {
                                            link.children = [];
                                        }
                                        link.children.push(dragLink);
                                    }
                                    return link;
                                });
                            }
                            else {
                                idx = findTreeIndex(links, function (link) { return link.__id === nodeId; });
                                // 插入节点之后
                                if (position === 'bottom') {
                                    idx && idx.push(idx.pop() + 1);
                                }
                                links = spliceTree(links, idx, 0, dragLink);
                            }
                        }
                        this.props.updateConfig(links, 'update');
                        (_b = (_a = this.props).onOrderChange) === null || _b === void 0 ? void 0 : _b.call(_a, links);
                        return [4 /*yield*/, this.saveOrder(mapTree(links, function (link) {
                                // 清除内部加的字段
                                for (var key in link) {
                                    if (/^__.*$/.test(key)) {
                                        delete link[key];
                                    }
                                }
                                return link;
                            }))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 在接口存在的时候，调用接口保存排序结果
     * @param links 排序后的结果
     */
    class_1.prototype.saveOrder = function (links) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, saveOrderApi, env, data, reload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, saveOrderApi = _a.saveOrderApi, env = _a.env, data = _a.data, reload = _a.reload;
                        if (!(saveOrderApi && isEffectiveApi(saveOrderApi))) return [3 /*break*/, 2];
                        return [4 /*yield*/, (env === null || env === void 0 ? void 0 : env.fetcher(saveOrderApi, createObject(data, { data: links }), { method: 'post' }))];
                    case 1:
                        _b.sent();
                        reload();
                        return [3 /*break*/, 3];
                    case 2:
                        if (!this.props.onOrderChange) {
                            env === null || env === void 0 ? void 0 : env.alert('NAV saveOrderApi is required!');
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.expandLink = function (target) {
        var _a = this.props, config = _a.config, updateConfig = _a.updateConfig;
        updateConfig(mapTree(config, function (link) {
            if (findTree((link === null || link === void 0 ? void 0 : link.children) || [], function (item) { return item.__id === target.__id; })) {
                return __assign(__assign({}, link), { expanded: true });
            }
            return __assign({}, link);
        }), 'expand');
    };
    class_1.prototype.handleChange = function (links) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        // 如果同时2个nav nav1选中，通过动作更新nav2的数据源，需要异步处理一下，才能执行
        setTimeout(function () {
            dispatchEvent('change', createObject(data, { value: links }));
        });
    };
    class_1.prototype.handleSelect = function (link, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onSelect, env, data, level, dispatchEvent, updateConfig, config, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onSelect = _a.onSelect, env = _a.env, data = _a.data, level = _a.level, dispatchEvent = _a.dispatchEvent, updateConfig = _a.updateConfig, config = _a.config;
                        return [4 /*yield*/, dispatchEvent('click', createObject(data, {
                                item: __assign({}, link)
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (onSelect && onSelect(link) === false) {
                            return [2 /*return*/];
                        }
                        // 叶子节点点击也会默认选中
                        if (depth === level) {
                            updateConfig(mapTree(config, function (target) {
                                return __assign(__assign({}, target), { active: target.__id === link.__id });
                            }), 'select');
                            return [2 /*return*/];
                        }
                        if (link.expandMore) {
                            this.expandLink(link);
                            return [2 /*return*/];
                        }
                        if (!link.to) {
                            return [2 /*return*/];
                        }
                        env === null || env === void 0 ? void 0 : env.jumpTo(filter(link.to, data), link, data);
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, loading = _a.loading, config = _a.config; _a.deferLoad; _a.updateConfig; var rest = __rest(_a, ["disabled", "loading", "config", "deferLoad", "updateConfig"]);
        var currentLink = this.getCurrentLink(this.state.currentKey);
        return (React.createElement(ThemedNavigation, __assign({}, rest, { loading: loading, links: (currentLink === null || currentLink === void 0 ? void 0 : currentLink.children) || config, collapsed: this.state.collapsed, disabled: disabled || loading, onSelect: this.handleSelect, onToggle: this.toggleLink, onChange: this.handleChange, onDragUpdate: this.dragUpdate })));
    };
    return class_1;
}(React.Component)));
/** @class */ ((function (_super) {
    __extends(NavigationRenderer, _super);
    function NavigationRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        _this.remoteRef = undefined;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    NavigationRenderer.prototype.remoteConfigRef = function (ref) {
        this.remoteRef = ref;
    };
    NavigationRenderer.prototype.getRef = function (ref) {
        this.navRef = ref;
    };
    NavigationRenderer.prototype.componentDidUpdate = function (prevProps) {
        // 在saas中 source可能切换 需要实时更新source数据源
        // 仅支持source为变量情况下自动更新 如果source配置了api 需要配置trackExpression
        if (this.remoteRef && this.props.source !== prevProps.source) {
            this.remoteRef.syncConfig();
        }
    };
    NavigationRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    NavigationRenderer.prototype.doAction = function (action, data, throwErrors, args) {
        var _a;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var value = (args === null || args === void 0 ? void 0 : args.value) || ((_a = action === null || action === void 0 ? void 0 : action.data) === null || _a === void 0 ? void 0 : _a.value);
        if (actionType === 'updateItems') {
            var valueField = this.props.valueField;
            var children = [];
            if (value) {
                if (Array.isArray(value)) {
                    // 只展示触发项的children属性
                    // 多个的话 默认只展示第一个
                    if (value.length > 0) {
                        var item = value.find(function (item) { return item.children && item.children.length; });
                        if (item) {
                            var key = valueField
                                ? item[valueField]
                                : (item === null || item === void 0 ? void 0 : item.key) || (item === null || item === void 0 ? void 0 : item.label);
                            if (this.navRef.state.currentKey !== key) {
                                this.navRef.setState({ currentKey: key });
                                children = item.children;
                            }
                        }
                        else {
                            this.navRef.setState({ currentKey: '' });
                        }
                    }
                }
                else if (typeof value === 'string') {
                    if (this.navRef.state.currentKey !== value) {
                        this.navRef.setState({
                            currentKey: value
                        });
                        var currentLink = this.navRef.getCurrentLink(value);
                        children = currentLink === null || currentLink === void 0 ? void 0 : currentLink.children;
                    }
                }
            }
            if (children.length > 0) {
                var _b = this.props, env_2 = _b.env, data_2 = _b.data;
                var child = findTree(children, function (item) { return env_2 && env_2.isCurrentUrl(filter(item.to, data_2), item); });
                env_2 === null || env_2 === void 0 ? void 0 : env_2.jumpTo(filter(child ? child.to : children[0].to, data_2), undefined, data_2);
            }
        }
        else if (actionType === 'collapse') {
            var collapsed = typeof value !== 'undefined' ? value : !this.navRef.state.collapsed;
            this.navRef.setState({ collapsed: collapsed });
        }
        else if (actionType === 'reset') {
            this.navRef.setState({ currentKey: '' });
        }
    };
    NavigationRenderer.prototype.reload = function (target, query, values) {
        var _a;
        if (query) {
            return this.receive(query);
        }
        var _b = this.props, data = _b.data; _b.translate;
        var finalData = values ? createObject(data, values) : data;
        (_a = this.remoteRef) === null || _a === void 0 ? void 0 : _a.loadConfig(finalData);
    };
    NavigationRenderer.prototype.receive = function (values) {
        this.reload(undefined, undefined, values);
    };
    NavigationRenderer.prototype.render = function () {
        var _a = this.props, id = _a.id, rest = __rest(_a, ["id"]);
        return (React.createElement(ConditionBuilderWithRemoteOptions, __assign({}, rest, { id: id || guid(), onRef: this.getRef, reload: this.reload, remoteConfigRef: this.remoteConfigRef })));
    };
    NavigationRenderer.contextType = ScopedContext;
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavigationRenderer.prototype, "remoteConfigRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavigationRenderer.prototype, "getRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", void 0)
    ], NavigationRenderer.prototype, "reload", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavigationRenderer.prototype, "receive", null);
    NavigationRenderer = __decorate([
        Renderer({
            test: /(^|\/)(?:nav|navigation)$/,
            name: 'nav'
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], NavigationRenderer);
    return NavigationRenderer;
})(React.Component));

export { Navigation, ThemedNavigation as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
