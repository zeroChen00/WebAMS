/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __spreadArray, __read, __decorate, __metadata } from 'tslib';
import React from 'react';
import { isVisible, filter, autobind, Renderer } from 'amis-core';
import { AnchorNavSection, AnchorNav as AnchorNav$1 } from 'amis-ui';

var AnchorNav = /** @class */ (function (_super) {
    __extends(AnchorNav, _super);
    function AnchorNav(props) {
        var _this = _super.call(this, props) || this;
        // 设置默认激活项
        var links = props.links;
        var active = 0;
        if (typeof props.active !== 'undefined') {
            active = props.active;
        }
        else {
            var section = _this.getActiveSection(links, props.active, null);
            active =
                section && section.href
                    ? section.href
                    : (links[0] && links[0].href) || 0;
        }
        _this.state = {
            active: active
        };
        return _this;
    }
    // 获取激活的内容区
    AnchorNav.prototype.getActiveSection = function (links, active, section) {
        var _this = this;
        if (section) {
            return section;
        }
        links.forEach(function (link) {
            if (link.href === active) {
                section = link;
            }
            else {
                if (link.children) {
                    _this.getActiveSection(link.children, active, section);
                }
            }
        });
        return section;
    };
    AnchorNav.prototype.handleSelect = function (key) {
        this.setState({
            active: key
        });
    };
    AnchorNav.prototype.locateTo = function (index) {
        var links = this.props.links;
        Array.isArray(links) &&
            links[index] &&
            this.setState({
                active: links[index].href || index
            });
    };
    AnchorNav.prototype.renderSections = function (links, parentIdx) {
        var _this = this;
        var _a = this.props; _a.classnames; _a.classPrefix; var sectionRender = _a.sectionRender, render = _a.render, data = _a.data;
        links = Array.isArray(links) ? links : [links];
        var children = [];
        links.forEach(function (section, index) {
            if (isVisible(section, data)) {
                // 若有子节点，key为parentIdx-index
                var curIdx = (parentIdx ? parentIdx + '-' : '') + index;
                children.push(
                /** 内容区 */
                React.createElement(AnchorNavSection, __assign({}, section, { title: filter(section.title, data), key: curIdx, name: section.href || curIdx }), _this.renderSection
                    ? _this.renderSection(section, _this.props, curIdx)
                    : sectionRender
                        ? sectionRender(section, _this.props, curIdx)
                        : render("section/".concat(curIdx), section.body || '')));
                if (section.children) {
                    children.push.apply(children, __spreadArray([], __read(_this.renderSections(section.children, curIdx)), false));
                }
            }
        });
        return children.filter(function (item) { return !!item; });
    };
    AnchorNav.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, ns = _a.classPrefix, className = _a.className, style = _a.style, linkClassName = _a.linkClassName, sectionClassName = _a.sectionClassName, direction = _a.direction; _a.sectionRender; _a.render; _a.data;
        var links = this.props.links;
        if (!links) {
            return null;
        }
        var children = this.renderSections(links);
        return (React.createElement(AnchorNav$1, { classPrefix: ns, classnames: cx, className: className, style: style, linkClassName: linkClassName, sectionClassName: sectionClassName, onSelect: this.handleSelect, active: this.state.active, direction: direction }, children));
    };
    AnchorNav.defaultProps = {
        className: '',
        linkClassName: '',
        sectionClassName: ''
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AnchorNav.prototype, "handleSelect", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], AnchorNav.prototype, "locateTo", null);
    return AnchorNav;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(AnchorNavRenderer, _super);
    function AnchorNavRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnchorNavRenderer = __decorate([
        Renderer({
            type: 'anchor-nav'
        })
    ], AnchorNavRenderer);
    return AnchorNavRenderer;
})(AnchorNav));

export { AnchorNav as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
