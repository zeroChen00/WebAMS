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
var isEmpty = require('lodash/isEmpty');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isEmpty__default = /*#__PURE__*/_interopDefaultLegacy(isEmpty);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Tpl = /** @class */ (function (_super) {
    tslib.__extends(Tpl, _super);
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
            amisCore.getPropValue(prevProps) !== amisCore.getPropValue(this.props)) {
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var content;
            return tslib.__generator(this, function (_a) {
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
        var value = amisCore.getPropValue(this.props);
        if (raw) {
            return raw;
        }
        else if (html) {
            return amisCore.filter(html, data);
        }
        else if (tpl) {
            return amisCore.filter(tpl, data);
        }
        else if (text) {
            return amisCore.escapeHtml(amisCore.filter(text, data));
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
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, tpl, html, text, data, raw, placeholder, value, _b;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, tpl = _a.tpl, html = _a.html, text = _a.text, data = _a.data, raw = _a.raw, placeholder = _a.placeholder;
                        value = amisCore.getPropValue(this.props);
                        if (!raw) return [3 /*break*/, 1];
                        return [2 /*return*/, raw];
                    case 1:
                        if (!html) return [3 /*break*/, 2];
                        return [2 /*return*/, amisCore.asyncFilter(html, data)];
                    case 2:
                        if (!tpl) return [3 /*break*/, 3];
                        return [2 /*return*/, amisCore.asyncFilter(tpl, data)];
                    case 3:
                        if (!text) return [3 /*break*/, 5];
                        _b = amisCore.escapeHtml;
                        return [4 /*yield*/, amisCore.asyncFilter(text, data)];
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
        return (_J$X_(Component, tslib.__assign({ className: cx('TplField', className, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), style: amisCore.buildStyle(style, data) }, (showNativeTitle ? { title: this.getTitle(content) } : {}), { onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, (_a = testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('tpl')) === null || _a === void 0 ? void 0 : _a.getTestId()),
            _J$X_("span", { className: cln ? cx(cln) : undefined, style: !isEmpty__default["default"](styles) ? styles : undefined, dangerouslySetInnerHTML: { __html: env.filterHtml(content) } }),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
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
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", Promise)
    ], Tpl.prototype, "updateContent", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], Tpl.prototype, "getContent", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", Promise)
    ], Tpl.prototype, "getAsyncContent", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String]),
        tslib.__metadata("design:returntype", void 0)
    ], Tpl.prototype, "getTitle", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Tpl.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Tpl.prototype, "handleMouseEnter", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], Tpl.prototype, "handleMouseLeave", null);
    return Tpl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(TplRenderer, _super);
    function TplRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TplRenderer = tslib.__decorate([
        amisCore.Renderer({
            test: /(^|\/)(?:tpl|html)$/,
            name: 'tpl'
        })
        // @ts-ignore 类型没搞定
        ,
        amisUi.withBadge
    ], TplRenderer);
    return TplRenderer;
})(Tpl));

exports.Tpl = Tpl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
