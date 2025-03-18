/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var ReactDOM = require('react-dom');
var matchSorter = require('match-sorter');
var isEqual = require('lodash/isEqual');
var isString = require('lodash/isString');
var cloneDeep = require('lodash/cloneDeep');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var isString__default = /*#__PURE__*/_interopDefaultLegacy(isString);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Navigation = /** @class */ (function (_super) {
    tslib.__extends(Navigation, _super);
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, env, onSelect;
            return tslib.__generator(this, function (_b) {
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var onChange;
            return tslib.__generator(this, function (_a) {
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
        var ul = ReactDOM.findDOMNode(this).firstChild;
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
                    !isEqual__default["default"](this.state.dropIndicator, dropIndicator))) {
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
                    !isEqual__default["default"](this.state.dropIndicator, dropIndicator))) {
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
                    if (React__default["default"].isValidElement(item)) {
                        beforeIcon.push(item);
                    }
                    else if (isString__default["default"](item)) {
                        beforeIcon.push(_J$X_(amisUi.Icon, { key: "icon-".concat(i), cx: cx, icon: item, className: isCollapsedNode ? '' : 'mr-2' }));
                    }
                    else if (item && amisCore.isObject(item)) {
                        var isAfter = item['position'] === 'after';
                        var icon = (_J$X_(amisUi.Icon, { key: "icon-".concat(i), cx: cx, icon: item['icon'], className: isCollapsedNode ? '' : isAfter ? 'ml-2' : 'mr-2' }));
                        if (isAfter) {
                            afterIcon.push(icon);
                        }
                        else {
                            beforeIcon.push(icon);
                        }
                    }
                });
            var label = typeof link.label === 'string'
                ? amisCore.filter(link.label, data)
                : React__default["default"].isValidElement(link.label)
                    ? React__default["default"].cloneElement(link.label)
                    : render('inline', link.label);
            // 仅垂直内联模式支持
            var isOverflow = stacked &&
                mode !== 'float' &&
                !link.expanded &&
                link.overflow &&
                amisCore.isObject(link.overflow) &&
                link.overflow.enable;
            var children = link.children;
            if (isOverflow) {
                var _a = link.overflow, maxVisibleCount = _a.maxVisibleCount, _b = _a.overflowIndicator, overflowIndicator_1 = _b === void 0 ? 'fa fa-ellipsis-h' : _b, overflowLabel_1 = _a.overflowLabel, overflowClassName_1 = _a.overflowClassName;
                // 默认展示5个
                var maxCount_1 = maxVisibleCount || 2;
                if (maxCount_1 < ((children === null || children === void 0 ? void 0 : children.length) || 0)) {
                    children = children === null || children === void 0 ? void 0 : children.map(function (child, index) {
                        return tslib.__assign(tslib.__assign({}, child), { label: index === maxCount_1 ? (_J$X_("span", { className: cx(overflowClassName_1) },
                                _J$X_(amisUi.Icon, { icon: overflowIndicator_1, className: "icon Nav-item-icon" }),
                                overflowLabel_1 && amisCore.isObject(overflowLabel_1)
                                    ? render('nav-overflow-label', overflowLabel_1)
                                    : overflowLabel_1)) : (child.label), hidden: index > maxCount_1 ? true : link.hidden, expandMore: index === maxCount_1 });
                    });
                }
            }
            return {
                link: link,
                label: label,
                labelExtra: afterIcon.length ? (_J$X_("i", { className: cx('Nav-Menu-item-icon-after') }, afterIcon)) : null,
                icon: beforeIcon.length ? _J$X_("i", null, beforeIcon) : null,
                children: children
                    ? _this.normalizeNavigations(children, link.mode === 'group' ? depth : depth + 1)
                    : [],
                path: link.to,
                open: link.unfolded,
                extra: itemActions
                    ? render('inline', itemActions, {
                        data: amisCore.createObject(data, link),
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, links, _b, searchConfig, originLinks, matchFunc, filterLinks;
            return tslib.__generator(this, function (_c) {
                _a = this.props, links = _a.links, _b = _a.searchConfig, searchConfig = _b === void 0 ? {} : _b;
                originLinks = cloneDeep__default["default"](links !== null && links !== void 0 ? links : []);
                matchFunc = searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.matchFunc;
                if (!keyword) {
                    this.setState({ keyword: '', filteredLinks: [] });
                    return [2 /*return*/];
                }
                if (matchFunc && typeof matchFunc === 'string') {
                    matchFunc = amisCore.str2function(matchFunc, 'link', 'keyword');
                }
                else if (typeof matchFunc === 'function') ;
                else {
                    matchFunc = function (link, keyword) {
                        var _a, _b;
                        var matched = (_a = matchSorter.matchSorter([link], keyword, {
                            keys: ['label', 'title', 'key'],
                            threshold: matchSorter.matchSorter.rankings.CONTAINS
                        })) === null || _a === void 0 ? void 0 : _a.length;
                        return matched || ((link === null || link === void 0 ? void 0 : link.children) && ((_b = link.children) === null || _b === void 0 ? void 0 : _b.length) > 0);
                    };
                }
                filterLinks = function (root, text) {
                    var filterChildren = function (result, link) {
                        if (matchFunc(link, text)) {
                            result.push(tslib.__assign(tslib.__assign({}, link), { unfolded: true }));
                            return result;
                        }
                        if (Array.isArray(link.children)) {
                            var children = link.children.reduce(filterChildren, []);
                            if (children.length) {
                                result.push(tslib.__assign(tslib.__assign({}, link), { unfolded: true, children: children }));
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
        return (_J$X_(React__default["default"].Fragment, null, searchable ? (_J$X_(amisUi.SearchBox, { className: cx('Nav-SearchBox', searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.className), mini: (_a = searchConfig.mini) !== null && _a !== void 0 ? _a : false, enhance: (_b = searchConfig.enhance) !== null && _b !== void 0 ? _b : false, clearable: (_c = searchConfig.clearable) !== null && _c !== void 0 ? _c : true, searchImediately: searchConfig.searchImediately, placeholder: searchConfig.placeholder, defaultValue: '', value: keyword !== null && keyword !== void 0 ? keyword : '', onSearch: this.handleSearch, onChange: /** 为了消除react报错 */ amisCore.noop })) : null));
    };
    Navigation.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, style = _b.style, stacked = _b.stacked, mode = _b.mode, cx = _b.classnames, links = _b.links, loading = _b.loading, overflow = _b.overflow, loadingConfig = _b.loadingConfig, itemBadge = _b.itemBadge, badge = _b.badge, data = _b.data, location = _b.location, collapsed = _b.collapsed, expandIcon = _b.expandIcon, indentSize = _b.indentSize, accordion = _b.accordion, draggable = _b.draggable, themeColor = _b.themeColor, expandPosition = _b.expandPosition, popupClassName = _b.popupClassName, disabled = _b.disabled, id = _b.id, render = _b.render, popOverContainer = _b.popOverContainer, env = _b.env, searchable = _b.searchable, testIdBuilder = _b.testIdBuilder;
        var _c = this.state, dropIndicator = _c.dropIndicator, filteredLinks = _c.filteredLinks;
        var overflowedIndicator = null;
        if (overflow && amisCore.isObject(overflow) && overflow.enable) {
            var _d = overflow.overflowIndicator, overflowIndicator = _d === void 0 ? 'fa fa-ellipsis-h' : _d, overflowLabel = overflow.overflowLabel, overflowClassName = overflow.overflowClassName;
            overflowedIndicator = (_J$X_("span", { className: cx(overflowClassName) },
                _J$X_(React__default["default"].Fragment, null,
                    _J$X_(amisUi.Icon, { icon: overflowIndicator, className: "icon Nav-item-icon" }),
                    overflowLabel && amisCore.isObject(overflowLabel)
                        ? render('nav-overflow-label', overflowLabel)
                        : overflowLabel)));
        }
        var styleConfig = null;
        var classNameId = '';
        if (style) {
            try {
                styleConfig = amisCore.buildStyle(style, data);
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
                    amisCore.insertStyle({
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
        var menuDom = (_J$X_(React__default["default"].Fragment, null,
            Array.isArray(navigations) ? (_J$X_(amisUi.Menu, { navigations: this.normalizeNavigations(navigations, 1), isActive: function (link, prefix) {
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
            _J$X_(amisUi.Spinner, { show: !!loading, overlay: true, loadingConfig: loadingConfig })));
        return (_J$X_("div", { className: cx('Nav', className, (_a = {},
                _a['Nav-horizontal'] = !stacked,
                _a['Nav--searchable'] = !!searchable,
                _a)), style: styleConfig },
            searchable ? (_J$X_(React__default["default"].Fragment, null,
                this.renderSearchBox(),
                menuDom)) : (menuDom),
            dropIndicator ? (_J$X_("div", { className: cx('Nav-dropIndicator'), style: dropIndicator })) : null));
    };
    Navigation.defaultProps = {
        indentSize: 16
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Number]),
        tslib.__metadata("design:returntype", Promise)
    ], Navigation.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Array]),
        tslib.__metadata("design:returntype", Promise)
    ], Navigation.prototype, "handleChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Number, Boolean]),
        tslib.__metadata("design:returntype", void 0)
    ], Navigation.prototype, "toggleLink", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [DragEvent, String, Number]),
        tslib.__metadata("design:returntype", Object)
    ], Navigation.prototype, "getDropInfo", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [DragEvent]),
        tslib.__metadata("design:returntype", void 0)
    ], Navigation.prototype, "updateDropIndicator", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Navigation.prototype, "handleDragStart", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [DragEvent]),
        tslib.__metadata("design:returntype", void 0)
    ], Navigation.prototype, "handleDragOver", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [DragEvent]),
        tslib.__metadata("design:returntype", void 0)
    ], Navigation.prototype, "handleDragEnd", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String]),
        tslib.__metadata("design:returntype", Promise)
    ], Navigation.prototype, "handleSearch", null);
    return Navigation;
}(React__default["default"].Component));
var ThemedNavigation = amisCore.themeable(Navigation);
var ConditionBuilderWithRemoteOptions = amisUi.withRemoteConfig({
    adaptor: function (config, props) {
        var links = Array.isArray(config)
            ? config
            : config.links || config.options || config.items || config.rows;
        if (!Array.isArray(links)) {
            throw new Error('payload.data.options is not array.');
        }
        return links;
    },
    afterLoad: function (response, config, props) { return tslib.__awaiter(void 0, void 0, void 0, function () {
        var dispatchEvent, data, rendererEvent, env;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatchEvent = props.dispatchEvent, data = props.data;
                    return [4 /*yield*/, dispatchEvent('loaded', amisCore.createObject(data, {
                            data: response.value,
                            items: response.links
                        }))];
                case 1:
                    rendererEvent = _a.sent();
                    if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                        return [2 /*return*/];
                    }
                    if (response.value && !amisCore.someTree(config, function (item) { return item.active; })) {
                        env = props.env;
                        env.jumpTo(amisCore.filter(response.value, props.data), undefined, props.data);
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
                        ? !!amisCore.findTree(link.children || [], function (l) {
                            return !!(l.hasOwnProperty('to') &&
                                env_1 &&
                                env_1.isCurrentUrl(amisCore.filter(l.to, data_1), link));
                        })
                        : false) ||
                        (link.activeOn
                            ? amisCore.evalExpression(link.activeOn, data_1) ||
                                amisCore.evalExpression(link.activeOn, location_1)
                            : !!(link.hasOwnProperty('to') &&
                                link.to !== null && // 也可能出现{to: null}的情况（独立应用）filter会把null处理成'' 那默认首页会选中很多菜单项 {to: ''}认为是有效配置
                                env_1 &&
                                env_1.isCurrentUrl(amisCore.filter(link.to, data_1), link)));
            };
            links = amisCore.mapTree(links, function (link, index, depth) {
                var _a;
                var item = tslib.__assign(tslib.__assign(tslib.__assign({}, link), amisCore.getExprProperties(link, data_1)), { active: isActive_1(link, depth), __id: (_a = link.__id) !== null && _a !== void 0 ? _a : amisCore.guid() });
                var originLink = null;
                // 懒加载的菜单项不保留展开状态
                if (!link.defer && valueField_1 && link[valueField_1]) {
                    originLink = amisCore.findTree(origin || [], function (originItem) { return originItem[valueField_1] === link[valueField_1]; });
                }
                // defaultOpenLevel depth <= defaultOpenLevel的默认全部展开
                // 优先级比unfolded属性低 如果用户配置了unfolded为false 那么默认不展开
                // 如果defer菜单项，unfolded默认设置了true，那么会有问题
                // 先前相同菜单做了展开收起操作的话 优先级最高
                item.unfolded = originLink
                    ? amisCore.isUnfolded(originLink, { unfoldedField: unfoldedField_1, foldedField: foldedField_1 })
                    : typeof link.unfolded !== 'undefined'
                        ? amisCore.isUnfolded(item, { unfoldedField: unfoldedField_1, foldedField: foldedField_1 })
                        : defaultOpenLevel_1 && depth <= defaultOpenLevel_1
                            ? true
                            : link.children &&
                                !!amisCore.findTree(link.children, function (child, i, d) {
                                    return isActive_1(child, depth + d);
                                });
                return item;
            }, 1, true);
        }
        return links;
    },
    beforeDeferLoad: function (item, indexes, links) {
        return amisCore.spliceTree(links, indexes, 1, tslib.__assign(tslib.__assign({}, item), { loading: true }));
    },
    afterDeferLoad: function (item, indexes, ret, links, props) {
        var _a, _b, _c, _d;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var dispatchEvent, data, rendererEvent, newItem, children;
            return tslib.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        dispatchEvent = props.dispatchEvent, data = props.data;
                        return [4 /*yield*/, dispatchEvent('loaded', amisCore.createObject(data, {
                                data: ret.data,
                                item: tslib.__assign({}, item)
                            }))];
                    case 1:
                        rendererEvent = _e.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        newItem = tslib.__assign(tslib.__assign({}, item), { loading: false, loaded: true, error: ret.ok ? undefined : ret.msg });
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
                        return [2 /*return*/, amisCore.spliceTree(links, indexes, 1, newItem)];
                }
            });
        });
    }
})(/** @class */ (function (_super) {
    tslib.__extends(class_1, _super);
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
        if (!isEqual__default["default"](this.props.location, prevProps.location)) {
            this.props.updateConfig(this.props.config, 'location-change');
        }
        else if (!isEqual__default["default"](this.props.links, prevProps.links)) {
            this.props.updateConfig(this.props.links, 'update');
        }
        else if (!isEqual__default["default"](this.props.data, prevProps.data)) {
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
            this.props.dispatchEvent('collapsed', amisCore.createObject(this.props.data, {
                collapsed: this.state.collapsed
            }));
        }
    };
    class_1.prototype.getCurrentLink = function (key) {
        var link = null;
        var _a = this.props, config = _a.config, data = _a.data, valueField = _a.valueField;
        var id = amisCore.resolveVariableAndFilter(key, data, '| raw');
        if (key) {
            link = amisCore.findTree(config, function (item) {
                return valueField
                    ? item[valueField] === id
                    : item.label == id || item.key == id;
            });
        }
        return link;
    };
    class_1.prototype.toggleLink = function (target, depth, forceFold) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, config, updateConfig, deferLoad, dispatchEvent, stacked, mode, accordion, data, isAccordion, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, config = _a.config, updateConfig = _a.updateConfig, deferLoad = _a.deferLoad, dispatchEvent = _a.dispatchEvent, stacked = _a.stacked, mode = _a.mode, accordion = _a.accordion, data = _a.data;
                        isAccordion = stacked && mode !== 'float' && accordion;
                        return [4 /*yield*/, dispatchEvent('toggled', amisCore.createObject(data, {
                                item: tslib.__assign({}, target),
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
                            updateConfig(amisCore.mapTree(config, function (link) {
                                return target.__id === link.__id
                                    ? tslib.__assign(tslib.__assign({}, link), { unfolded: typeof forceFold !== 'undefined'
                                            ? !forceFold
                                            : !link.unfolded }) : tslib.__assign(tslib.__assign({}, link), { unfolded: isAccordion
                                        ? !!amisCore.findTree(link.children || [], function (item) { return item === target; })
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var links, nodeId, dragLink, position, sourceIdx, idx;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        links = this.props.config;
                        nodeId = dropInfo.nodeId, dragLink = dropInfo.dragLink, position = dropInfo.position;
                        if (dragLink) {
                            sourceIdx = amisCore.findTreeIndex(links, function (link) { return link.__id === dragLink.__id; });
                            links = amisCore.spliceTree(links, sourceIdx, 1);
                            if (position === 'self') {
                                // 插入到对应节点的children中
                                amisCore.mapTree(links, function (link) {
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
                                idx = amisCore.findTreeIndex(links, function (link) { return link.__id === nodeId; });
                                // 插入节点之后
                                if (position === 'bottom') {
                                    idx && idx.push(idx.pop() + 1);
                                }
                                links = amisCore.spliceTree(links, idx, 0, dragLink);
                            }
                        }
                        this.props.updateConfig(links, 'update');
                        (_b = (_a = this.props).onOrderChange) === null || _b === void 0 ? void 0 : _b.call(_a, links);
                        return [4 /*yield*/, this.saveOrder(amisCore.mapTree(links, function (link) {
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, saveOrderApi, env, data, reload;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, saveOrderApi = _a.saveOrderApi, env = _a.env, data = _a.data, reload = _a.reload;
                        if (!(saveOrderApi && amisCore.isEffectiveApi(saveOrderApi))) return [3 /*break*/, 2];
                        return [4 /*yield*/, (env === null || env === void 0 ? void 0 : env.fetcher(saveOrderApi, amisCore.createObject(data, { data: links }), { method: 'post' }))];
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
        updateConfig(amisCore.mapTree(config, function (link) {
            if (amisCore.findTree((link === null || link === void 0 ? void 0 : link.children) || [], function (item) { return item.__id === target.__id; })) {
                return tslib.__assign(tslib.__assign({}, link), { expanded: true });
            }
            return tslib.__assign({}, link);
        }), 'expand');
    };
    class_1.prototype.handleChange = function (links) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        // 如果同时2个nav nav1选中，通过动作更新nav2的数据源，需要异步处理一下，才能执行
        setTimeout(function () {
            dispatchEvent('change', amisCore.createObject(data, { value: links }));
        });
    };
    class_1.prototype.handleSelect = function (link, depth) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onSelect, env, data, level, dispatchEvent, updateConfig, config, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onSelect = _a.onSelect, env = _a.env, data = _a.data, level = _a.level, dispatchEvent = _a.dispatchEvent, updateConfig = _a.updateConfig, config = _a.config;
                        return [4 /*yield*/, dispatchEvent('click', amisCore.createObject(data, {
                                item: tslib.__assign({}, link)
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
                            updateConfig(amisCore.mapTree(config, function (target) {
                                return tslib.__assign(tslib.__assign({}, target), { active: target.__id === link.__id });
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
                        env === null || env === void 0 ? void 0 : env.jumpTo(amisCore.filter(link.to, data), link, data);
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, loading = _a.loading, config = _a.config; _a.deferLoad; _a.updateConfig; var rest = tslib.__rest(_a, ["disabled", "loading", "config", "deferLoad", "updateConfig"]);
        var currentLink = this.getCurrentLink(this.state.currentKey);
        return (_J$X_(ThemedNavigation, tslib.__assign({}, rest, { loading: loading, links: (currentLink === null || currentLink === void 0 ? void 0 : currentLink.children) || config, collapsed: this.state.collapsed, disabled: disabled || loading, onSelect: this.handleSelect, onToggle: this.toggleLink, onChange: this.handleChange, onDragUpdate: this.dragUpdate })));
    };
    return class_1;
}(React__default["default"].Component)));
/** @class */ ((function (_super) {
    tslib.__extends(NavigationRenderer, _super);
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
                var child = amisCore.findTree(children, function (item) { return env_2 && env_2.isCurrentUrl(amisCore.filter(item.to, data_2), item); });
                env_2 === null || env_2 === void 0 ? void 0 : env_2.jumpTo(amisCore.filter(child ? child.to : children[0].to, data_2), undefined, data_2);
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
        var finalData = values ? amisCore.createObject(data, values) : data;
        (_a = this.remoteRef) === null || _a === void 0 ? void 0 : _a.loadConfig(finalData);
    };
    NavigationRenderer.prototype.receive = function (values) {
        this.reload(undefined, undefined, values);
    };
    NavigationRenderer.prototype.render = function () {
        var _a = this.props, id = _a.id, rest = tslib.__rest(_a, ["id"]);
        return (_J$X_(ConditionBuilderWithRemoteOptions, tslib.__assign({}, rest, { id: id || amisCore.guid(), onRef: this.getRef, reload: this.reload, remoteConfigRef: this.remoteConfigRef })));
    };
    NavigationRenderer.contextType = amisCore.ScopedContext;
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], NavigationRenderer.prototype, "remoteConfigRef", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], NavigationRenderer.prototype, "getRef", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String, Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], NavigationRenderer.prototype, "reload", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], NavigationRenderer.prototype, "receive", null);
    NavigationRenderer = tslib.__decorate([
        amisCore.Renderer({
            test: /(^|\/)(?:nav|navigation)$/,
            name: 'nav'
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], NavigationRenderer);
    return NavigationRenderer;
})(React__default["default"].Component));

exports.Navigation = Navigation;
exports["default"] = ThemedNavigation;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
