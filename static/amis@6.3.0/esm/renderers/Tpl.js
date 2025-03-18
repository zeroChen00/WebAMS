/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { getPropValue, filter, escapeHtml, setThemeClassName, buildStyle, CustomStyle, autobind, Renderer, asyncFilter } from 'amis-core';
import isEmpty from 'lodash/isEmpty';
import { withBadge } from 'amis-ui';

var Tpl = /** @class */ (function (_super) {
    __extends(Tpl, _super);
    function Tpl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            content: _this.getContent()
        };
        _this.mounted = true;
        return _this;
    }
    Tpl.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var checkProps = ['tpl', 'html', 'text', 'raw', 'data', 'placeholder'];
        if (checkProps.some(function (key) { return prevProps[key] !== _this.props[key]; }) ||
            getPropValue(prevProps) !== getPropValue(this.props)) {
            this.updateContent();
        }
    };
    Tpl.prototype.componentDidMount = function () {
        this.updateContent();
    };
    Tpl.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    Tpl.prototype.updateContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAsyncContent()];
                    case 1:
                        content = _a.sent();
                        this.mounted && this.setState({ content: content });
                        return [2 /*return*/];
                }
            });
        });
    };
    Tpl.prototype.getContent = function () {
        var _a = this.props, tpl = _a.tpl, html = _a.html, text = _a.text, raw = _a.raw, data = _a.data, placeholder = _a.placeholder;
        var value = getPropValue(this.props);
        if (raw) {
            return raw;
        }
        else if (html) {
            return filter(html, data);
        }
        else if (tpl) {
            return filter(tpl, data);
        }
        else if (text) {
            return escapeHtml(filter(text, data));
        }
        else {
            return value == null || value === ''
                ? "<span class=\"text-muted\">".concat(placeholder, "</span>")
                : typeof value === 'string'
                    ? value
                    : JSON.stringify(value);
        }
    };
    Tpl.prototype.getAsyncContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tpl, html, text, data, raw, placeholder, value, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, tpl = _a.tpl, html = _a.html, text = _a.text, data = _a.data, raw = _a.raw, placeholder = _a.placeholder;
                        value = getPropValue(this.props);
                        if (!raw) return [3 /*break*/, 1];
                        return [2 /*return*/, raw];
                    case 1:
                        if (!html) return [3 /*break*/, 2];
                        return [2 /*return*/, asyncFilter(html, data)];
                    case 2:
                        if (!tpl) return [3 /*break*/, 3];
                        return [2 /*return*/, asyncFilter(tpl, data)];
                    case 3:
                        if (!text) return [3 /*break*/, 5];
                        _b = escapeHtml;
                        return [4 /*yield*/, asyncFilter(text, data)];
                    case 4: return [2 /*return*/, _b.apply(void 0, [_c.sent()])];
                    case 5: return [2 /*return*/, value == null || value === ''
                            ? "<span class=\"text-muted\">".concat(placeholder, "</span>")
                            : typeof value === 'string'
                                ? value
                                : JSON.stringify(value)];
                }
            });
        });
    };
    /**
     * 过滤掉HTML标签, 仅提取文本内容, 用于HTML标签的title属性
     */
    Tpl.prototype.getTitle = function (content) {
        var _a;
        var showNativeTitle = this.props.showNativeTitle;
        if (!showNativeTitle) {
            return '';
        }
        var title = typeof content === 'string' ? content : '';
        var tempDom = new DOMParser().parseFromString(content, 'text/html');
        if ((_a = tempDom === null || tempDom === void 0 ? void 0 : tempDom.body) === null || _a === void 0 ? void 0 : _a.textContent) {
            title = tempDom.body.textContent;
        }
        return title;
    };
    Tpl.prototype.handleClick = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Tpl.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Tpl.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Tpl.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, wrapperComponent = _b.wrapperComponent, inline = _b.inline, cx = _b.classnames, style = _b.style, maxLine = _b.maxLine, showNativeTitle = _b.showNativeTitle, data = _b.data, id = _b.id, wrapperCustomStyle = _b.wrapperCustomStyle, env = _b.env, themeCss = _b.themeCss, testIdBuilder = _b.testIdBuilder;
        var Component = wrapperComponent || (inline ? 'span' : 'div');
        var content = this.state.content;
        // 显示行数处理
        var styles = {};
        var cln = '';
        if (maxLine > 0) {
            cln = 'max-line';
            styles.WebkitLineClamp = +maxLine;
        }
        return (React.createElement(Component, __assign({ className: cx('TplField', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), style: buildStyle(style, data) }, (showNativeTitle ? { title: this.getTitle(content) } : {}), { onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, (_a = testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('tpl')) === null || _a === void 0 ? void 0 : _a.getTestId()),
            React.createElement("span", { className: cln ? cx(cln) : undefined, style: !isEmpty(styles) ? styles : undefined, dangerouslySetInnerHTML: { __html: env.filterHtml(content) } }),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    Tpl.defaultProps = {
        inline: true,
        placeholder: ''
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Tpl.prototype, "updateContent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tpl.prototype, "getContent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Tpl.prototype, "getAsyncContent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Tpl.prototype, "getTitle", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Tpl.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Tpl.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Tpl.prototype, "handleMouseLeave", null);
    return Tpl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TplRenderer, _super);
    function TplRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TplRenderer = __decorate([
        Renderer({
            test: /(^|\/)(?:tpl|html)$/,
            name: 'tpl'
        })
        // @ts-ignore 类型没搞定
        ,
        withBadge
    ], TplRenderer);
    return TplRenderer;
})(Tpl));

export { Tpl };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
