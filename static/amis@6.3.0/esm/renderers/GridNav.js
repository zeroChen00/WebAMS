/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { validations, handleAction, getPropValue, isPureVariable, resolveVariableAndFilter, autobind, Renderer } from 'amis-core';
import { GridNav, GridNavItem } from 'amis-ui';

/** @class */ ((function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    List.prototype.handleClick = function (item) {
        var _this = this;
        return function (e) {
            var action;
            if (item.link) {
                action = validations.isUrl({}, item.link)
                    ? {
                        type: 'button',
                        actionType: 'url',
                        url: item.link,
                        blank: item.blank
                    }
                    : {
                        type: 'button',
                        actionType: 'link',
                        link: item.link
                    };
            }
            else {
                action = item.clickAction;
            }
            handleAction(e, action, _this.props, item);
        };
    };
    List.prototype.render = function () {
        var _this = this;
        var _a = this.props, itemClassName = _a.itemClassName; _a.style; var contentClassName = _a.contentClassName, source = _a.source, data = _a.data, options = _a.options, classnames = _a.classnames;
        var value = getPropValue(this.props);
        var list = [];
        if (typeof source === 'string' && isPureVariable(source)) {
            list = resolveVariableAndFilter(source, data, '| raw') || undefined;
        }
        else if (Array.isArray(value)) {
            list = value;
        }
        else if (Array.isArray(options)) {
            list = options;
        }
        if (list && !Array.isArray(list)) {
            list = [list];
        }
        if (!(list === null || list === void 0 ? void 0 : list.length)) {
            return null;
        }
        return (React.createElement(GridNav, __assign({}, this.props), list.map(function (item, index) { return (React.createElement(GridNavItem, { key: index, onClick: item.clickAction || item.link ? _this.handleClick(item) : undefined, className: itemClassName, contentClassName: contentClassName, text: item.text, icon: item.icon, classnames: classnames, badge: item.badge
                ? {
                    badge: item.badge,
                    data: data,
                    classnames: classnames
                }
                : undefined })); })));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], List.prototype, "handleClick", null);
    List = __decorate([
        Renderer({
            type: 'grid-nav'
        })
    ], List);
    return List;
})(React.Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
