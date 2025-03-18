/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __rest, __decorate, __metadata, __spreadArray, __read } from 'tslib';
import React from 'react';
import omit from 'lodash/omit';
import { filter, evalExpression, padArr, isVisible, isDisabled, filterClassNameObject, hashCode, resolveVariableAndFilter, Renderer } from 'amis-core';
import { Checkbox, Icon, Card } from 'amis-ui';
import { HocQuickEdit } from './QuickEdit.js';
import { HocPopOver } from './PopOver.js';
import './Table/index.js';
import { HocCopyable } from './Copyable.js';
import { findDOMNode } from 'react-dom';
import { TableCell } from './Table/TableCell.js';

var CardRenderer = /** @class */ (function (_super) {
    __extends(CardRenderer, _super);
    function CardRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleCheck = _this.handleCheck.bind(_this);
        _this.getPopOverContainer = _this.getPopOverContainer.bind(_this);
        _this.handleQuickChange = _this.handleQuickChange.bind(_this);
        return _this;
    }
    CardRenderer.prototype.isHaveLink = function () {
        var _a = this.props, href = _a.href, itemAction = _a.itemAction, onCheck = _a.onCheck, checkOnItemClick = _a.checkOnItemClick, checkable = _a.checkable;
        return href || itemAction || onCheck || (checkOnItemClick && checkable);
    };
    CardRenderer.prototype.handleClick = function (e) {
        var _a = this.props, item = _a.item, href = _a.href, data = _a.data, env = _a.env, blank = _a.blank, itemAction = _a.itemAction, onAction = _a.onAction, onCheck = _a.onCheck, selectable = _a.selectable, checkOnItemClick = _a.checkOnItemClick;
        if (href) {
            env.jumpTo(filter(href, data), {
                type: 'button',
                actionType: 'url',
                blank: blank
            }, data);
            return;
        }
        if (itemAction) {
            onAction && onAction(e, itemAction, (item === null || item === void 0 ? void 0 : item.data) || data);
            return;
        }
        selectable && checkOnItemClick && (onCheck === null || onCheck === void 0 ? void 0 : onCheck(item));
    };
    CardRenderer.prototype.handleAction = function (e, action, ctx) {
        var _a = this.props, onAction = _a.onAction, item = _a.item;
        onAction && onAction(e, action, ctx || item.data);
    };
    CardRenderer.prototype.handleCheck = function () {
        var item = this.props.item;
        this.props.onCheck && this.props.onCheck(item);
    };
    CardRenderer.prototype.getPopOverContainer = function () {
        return findDOMNode(this);
    };
    CardRenderer.prototype.handleQuickChange = function (values, saveImmediately, savePristine, options) {
        var _a = this.props, onQuickChange = _a.onQuickChange, item = _a.item;
        onQuickChange &&
            onQuickChange(item, values, saveImmediately, savePristine, options);
    };
    CardRenderer.prototype.renderToolbar = function () {
        var _a = this.props, selectable = _a.selectable, checkable = _a.checkable, selected = _a.selected, multiple = _a.multiple, hideCheckToggler = _a.hideCheckToggler, cx = _a.classnames, toolbar = _a.toolbar, render = _a.render, dragging = _a.dragging, data = _a.data, header = _a.header;
        var toolbars = [];
        if (header) {
            var highlightClassName = header.highlightClassName, highlight = header.highlight;
            if (typeof highlight === 'string'
                ? evalExpression(highlight, data)
                : highlight) {
                toolbars.push(React.createElement("i", { key: "highlight", className: cx('Card-highlight', highlightClassName) }));
            }
        }
        if (selectable && !hideCheckToggler) {
            toolbars.push(React.createElement(Checkbox, { key: "check", className: cx('Card-checkbox'), type: multiple !== false ? 'checkbox' : 'radio', disabled: !checkable, checked: selected, onChange: this.handleCheck }));
        }
        if (Array.isArray(toolbar)) {
            toolbar.forEach(function (action, index) {
                return toolbars.push(render("toolbar/".concat(index), __assign({ type: 'button', level: 'link', size: 'sm' }, action), {
                    key: index
                }));
            });
        }
        if (dragging) {
            toolbars.push(React.createElement("div", { className: cx('Card-dragBtn') },
                React.createElement(Icon, { icon: "drag-bar", className: "icon" })));
        }
        return toolbars.length ? (React.createElement("div", { className: cx('Card-toolbar') }, toolbars)) : null;
    };
    CardRenderer.prototype.renderActions = function () {
        var _this = this;
        var _a = this.props, actions = _a.actions, render = _a.render, dragging = _a.dragging, actionsCount = _a.actionsCount, data = _a.data, cx = _a.classnames;
        if (Array.isArray(actions)) {
            var group = padArr(actions.filter(function (item) { return isVisible(item, data); }), actionsCount);
            return group.map(function (actions, groupIndex) { return (React.createElement("div", { key: groupIndex, className: cx('Card-actions') }, actions.map(function (action, index) {
                var size = action.size || 'sm';
                return render("action/".concat(index), __assign(__assign({ level: 'link', type: 'button' }, action), { testid: action.testid ? filter(action.testid, data) : index, size: size }), {
                    isMenuItem: true,
                    key: index,
                    index: index,
                    disabled: dragging || isDisabled(action, data),
                    className: cx('Card-action', filterClassNameObject(action.className || "".concat(size ? "Card-action--".concat(size) : ''), data), {
                        'is-disabled': isDisabled(action, data)
                    }),
                    componentClass: 'a',
                    onAction: _this.handleAction
                });
            }))); });
        }
        return;
    };
    CardRenderer.prototype.renderChild = function (node, region, key) {
        if (region === void 0) { region = 'body'; }
        if (key === void 0) { key = 0; }
        var render = this.props.render;
        if (typeof node === 'string' || typeof node === 'number') {
            return render(region, node, { key: key });
        }
        var childNode = node;
        if (childNode.type === 'hbox' || childNode.type === 'grid') {
            return render(region, node, {
                key: key,
                itemRender: this.itemRender.bind(this)
            });
        }
        return this.renderFeild(region, childNode, key, this.props);
    };
    CardRenderer.prototype.itemRender = function (field, index, props) {
        return this.renderFeild("column/".concat(index), field, index, props);
    };
    CardRenderer.prototype.renderFeild = function (region, field, key, props) {
        var render = props.render, cx = props.classnames, itemIndex = props.itemIndex;
        var useCardLabel = (props === null || props === void 0 ? void 0 : props.useCardLabel) !== false;
        var data = this.props.data;
        if (!field || !isVisible(field, data)) {
            return;
        }
        var $$id = field.$$id ? "".concat(field.$$id, "-field") : '';
        return (React.createElement("div", { className: cx('Card-field'), key: key },
            useCardLabel && field.label ? (React.createElement("label", { className: cx('Card-fieldLabel', field.labelClassName) }, field.label)) : null,
            render(region, __assign(__assign({}, field), { field: field, $$id: $$id, type: 'card-item-field' }), {
                useCardLabel: useCardLabel,
                className: cx('Card-fieldValue', filterClassNameObject(field.className, data)),
                rowIndex: itemIndex,
                colIndex: key,
                // 同 cell 里面逻辑一样，不要下发 value
                // value: field.name ? resolveVariable(field.name, data) : undefined,
                popOverContainer: this.getPopOverContainer,
                onAction: this.handleAction,
                onQuickChange: this.handleQuickChange
            })));
    };
    CardRenderer.prototype.renderBody = function () {
        var _this = this;
        var body = this.props.body;
        if (!body) {
            return null;
        }
        if (Array.isArray(body)) {
            return body.map(function (child, index) {
                return _this.renderChild(child, "body/".concat(index), index);
            });
        }
        return this.renderChild(body, 'body');
    };
    CardRenderer.prototype.rederTitle = function () {
        var _a = this.props, render = _a.render, data = _a.data, header = _a.header;
        if (header) {
            var titleTpl = (header || {}).title;
            var title = filter(titleTpl, data);
            return title ? render('title', titleTpl) : undefined;
        }
        return;
    };
    CardRenderer.prototype.renderSubTitle = function () {
        var _a = this.props, render = _a.render, data = _a.data, header = _a.header;
        if (header) {
            var subTitleTpl = (header || {}).subTitle;
            var subTitle = filter(subTitleTpl, data);
            return subTitle ? render('sub-title', subTitleTpl) : undefined;
        }
        return;
    };
    CardRenderer.prototype.renderSubTitlePlaceholder = function () {
        var _a = this.props, render = _a.render, header = _a.header, cx = _a.classnames;
        if (header) {
            var subTitlePlaceholder = (header || {}).subTitlePlaceholder;
            return subTitlePlaceholder
                ? render('sub-title', subTitlePlaceholder, {
                    className: cx('Card-placeholder')
                })
                : undefined;
        }
        return;
    };
    CardRenderer.prototype.renderDesc = function () {
        var _a = this.props, render = _a.render, data = _a.data, header = _a.header;
        if (header) {
            var _b = header || {}, descTpl = _b.desc, descriptionTpl = _b.description;
            var desc = filter(descriptionTpl || descTpl, data);
            return desc
                ? render('desc', descriptionTpl || descTpl, {
                    className: !desc ? 'text-muted' : null
                })
                : undefined;
        }
        return;
    };
    CardRenderer.prototype.renderDescPlaceholder = function () {
        var _a = this.props, render = _a.render, header = _a.header;
        if (header) {
            var descPlaceholder = header.descriptionPlaceholder || header.descPlaceholder;
            return descPlaceholder
                ? render('desc', descPlaceholder, {
                    className: !descPlaceholder ? 'text-muted' : null
                })
                : undefined;
        }
        return;
    };
    CardRenderer.prototype.renderAvatar = function () {
        var _a = this.props, data = _a.data, header = _a.header;
        if (header) {
            var avatarTpl = (header || {}).avatar;
            var avatar = filter(avatarTpl, data, '| raw');
            return avatar ? avatar : undefined;
        }
        return;
    };
    CardRenderer.prototype.renderAvatarText = function () {
        var _a = this.props, render = _a.render, data = _a.data, header = _a.header;
        if (header) {
            var avatarTextTpl = (header || {}).avatarText;
            var avatarText = filter(avatarTextTpl, data);
            return avatarText ? render('avatarText', avatarTextTpl) : undefined;
        }
        return;
    };
    CardRenderer.prototype.renderSecondary = function () {
        var _a = this.props, render = _a.render, data = _a.data, secondaryTextTpl = _a.secondary;
        var secondary = filter(secondaryTextTpl, data);
        return secondary ? render('secondary', secondaryTextTpl) : undefined;
    };
    CardRenderer.prototype.renderAvatarTextStyle = function () {
        var _a = this.props, header = _a.header, data = _a.data;
        if (header) {
            var avatarTextTpl = header.avatarText, avatarTextBackground = header.avatarTextBackground;
            var avatarText = filter(avatarTextTpl, data);
            var avatarTextStyle = {};
            if (avatarText && avatarTextBackground && avatarTextBackground.length) {
                avatarTextStyle['background'] =
                    avatarTextBackground[Math.abs(hashCode(avatarText)) % avatarTextBackground.length];
            }
            return avatarTextStyle;
        }
        return;
    };
    CardRenderer.prototype.renderMedia = function () {
        var _a = this.props, media = _a.media, cx = _a.classnames, render = _a.render, region = _a.region, data = _a.data;
        if (media) {
            var type = media.type, url = media.url, className = media.className, autoPlay = media.autoPlay, isLive = media.isLive, poster = media.poster;
            var mediaUrl = resolveVariableAndFilter(url, data, '| raw');
            if (type === 'image' && mediaUrl) {
                return (React.createElement("img", { className: cx('Card-multiMedia-img', className), src: mediaUrl }));
            }
            else if (type === 'video' && mediaUrl) {
                return (React.createElement("div", { className: cx('Card-multiMedia-video', className) }, render(region, {
                    type: type,
                    autoPlay: autoPlay,
                    poster: poster,
                    src: mediaUrl,
                    isLive: isLive
                })));
            }
        }
        return;
    };
    CardRenderer.prototype.render = function () {
        var _a = this.props, header = _a.header, className = _a.className, avatarClassName = _a.avatarClassName, avatarTextClassName = _a.avatarTextClassName, descClassName = _a.descClassName, descriptionClassName = _a.descriptionClassName, titleClassName = _a.titleClassName, subTitleClassName = _a.subTitleClassName, bodyClassName = _a.bodyClassName, imageClassName = _a.imageClassName, headerClassName = _a.headerClassName, secondaryClassName = _a.secondaryClassName, footerClassName = _a.footerClassName; _a.mediaClassName; var media = _a.media, rest = __rest(_a, ["header", "className", "avatarClassName", "avatarTextClassName", "descClassName", "descriptionClassName", "titleClassName", "subTitleClassName", "bodyClassName", "imageClassName", "headerClassName", "secondaryClassName", "footerClassName", "mediaClassName", "media"]);
        var ctx = this.props.data;
        var headerCn = filterClassNameObject(header === null || header === void 0 ? void 0 : header.className, ctx) || headerClassName;
        var titleCn = filterClassNameObject(header === null || header === void 0 ? void 0 : header.titleClassName, ctx) || titleClassName;
        var subTitleCn = filterClassNameObject(header === null || header === void 0 ? void 0 : header.subTitleClassName, ctx) ||
            subTitleClassName;
        var descCn = filterClassNameObject(header === null || header === void 0 ? void 0 : header.descClassName, ctx) || descClassName;
        var descriptionCn = filterClassNameObject(header === null || header === void 0 ? void 0 : header.descriptionClassName, ctx) ||
            descriptionClassName ||
            descCn;
        var avatarTextCn = filterClassNameObject(header === null || header === void 0 ? void 0 : header.avatarTextClassName, ctx) ||
            avatarTextClassName;
        var avatarCn = filterClassNameObject(header === null || header === void 0 ? void 0 : header.avatarClassName, ctx) || avatarClassName;
        var imageCn = filterClassNameObject(header === null || header === void 0 ? void 0 : header.imageClassName, ctx) || imageClassName;
        var mediaPosition = media === null || media === void 0 ? void 0 : media.position;
        return (React.createElement(Card, __assign({}, rest, { title: this.rederTitle(), subTitle: this.renderSubTitle(), subTitlePlaceholder: this.renderSubTitlePlaceholder(), description: this.renderDesc(), descriptionPlaceholder: this.renderDescPlaceholder(), children: this.renderBody(), actions: this.renderActions(), avatar: this.renderAvatar(), avatarText: this.renderAvatarText(), secondary: this.renderSecondary(), toolbar: this.renderToolbar(), avatarClassName: avatarCn, avatarTextStyle: this.renderAvatarTextStyle(), avatarTextClassName: avatarTextCn, className: className, titleClassName: titleCn, media: this.renderMedia(), subTitleClassName: subTitleCn, mediaPosition: mediaPosition, descriptionClassName: descriptionCn, imageClassName: imageCn, headerClassName: headerCn, footerClassName: footerClassName, secondaryClassName: secondaryClassName, bodyClassName: bodyClassName, onClick: this.isHaveLink() ? this.handleClick : this.handleCheck })));
    };
    CardRenderer.defaultProps = {
        className: '',
        avatarClassName: '',
        headerClassName: '',
        footerClassName: '',
        secondaryClassName: '',
        avatarTextClassName: '',
        bodyClassName: '',
        actionsCount: 4,
        titleClassName: '',
        highlightClassName: '',
        subTitleClassName: '',
        descClassName: '',
        descriptionClassName: '',
        imageClassName: '',
        highlight: false,
        blank: true,
        dragging: false,
        selectable: false,
        checkable: true,
        selected: false,
        hideCheckToggler: false,
        useCardLabel: true
    };
    CardRenderer.propsList = [
        'avatarClassName',
        'avatarTextClassName',
        'bodyClassName',
        'actionsCount',
        'titleClassName',
        'highlightClassName',
        'subTitleClassName',
        'descClassName',
        'descriptionClassName',
        'imageClassName',
        'hideCheckToggler'
    ];
    CardRenderer = __decorate([
        Renderer({
            type: 'card'
        }),
        __metadata("design:paramtypes", [Object])
    ], CardRenderer);
    return CardRenderer;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(CardItemFieldRenderer, _super);
    function CardItemFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardItemFieldRenderer.prototype.render = function () {
        var _a = this.props; _a.type; var className = _a.className, render = _a.render, style = _a.style, Component = _a.wrapperComponent, contentsOnly = _a.contentsOnly; _a.labelClassName; var value = _a.value, data = _a.data, children = _a.children, width = _a.width, innerClassName = _a.innerClassName; _a.label; var tabIndex = _a.tabIndex, onKeyUp = _a.onKeyUp, field = _a.field, useCardLabel = _a.useCardLabel, rest = __rest(_a, ["type", "className", "render", "style", "wrapperComponent", "contentsOnly", "labelClassName", "value", "data", "children", "width", "innerClassName", "label", "tabIndex", "onKeyUp", "field", "useCardLabel"]);
        var schema = __assign(__assign({}, field), { 
            /** 针对带有label的表单项组件，默认不渲染组件自带的label，否则会出现重复的label */
            renderLabel: !useCardLabel, className: innerClassName, type: (field && field.type) || 'plain' });
        var body = children
            ? children
            : render('field', schema, __assign(__assign({}, omit(rest, Object.keys(schema))), { value: value, data: data }));
        if (width) {
            style = style || {};
            style.width = style.width || width;
            body = (React.createElement("div", { style: { width: !/%/.test(String(width)) ? width : '' } }, body));
        }
        if (contentsOnly) {
            return body;
        }
        Component = Component || 'div';
        return (React.createElement(Component, { style: style, className: className, tabIndex: tabIndex, onKeyUp: onKeyUp }, body));
    };
    CardItemFieldRenderer.defaultProps = __assign(__assign({}, TableCell.defaultProps), { wrapperComponent: 'div' });
    CardItemFieldRenderer.propsList = __spreadArray([
        'quickEdit',
        'quickEditEnabledOn',
        'popOver',
        'copyable',
        'inline'
    ], __read(TableCell.propsList), false);
    CardItemFieldRenderer = __decorate([
        Renderer({
            type: 'card-item-field'
        }),
        HocQuickEdit(),
        HocPopOver(),
        HocCopyable()
    ], CardItemFieldRenderer);
    return CardItemFieldRenderer;
})(TableCell));

export { CardRenderer };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
