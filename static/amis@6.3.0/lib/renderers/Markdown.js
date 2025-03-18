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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
function loadComponent() {
    return Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['amis-ui/lib/components/Markdown'], function(mod) {fullfill(tslib.__importStar(mod))})})}).then(function (item) { return item.default; });
}
var Markdown = /** @class */ (function (_super) {
    tslib.__extends(Markdown, _super);
    function Markdown(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props, name = _a.name, data = _a.data, src = _a.src;
        if (src) {
            _this.state = { content: '' };
            _this.updateContent();
        }
        else {
            var content = amisCore.getPropValue(_this.props) ||
                (name && amisCore.isPureVariable(name)
                    ? amisCore.resolveVariableAndFilter(name, data, '| raw')
                    : null);
            _this.state = { content: content };
        }
        return _this;
    }
    Markdown.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (props.src) {
            if (amisCore.isApiOutdated(prevProps.src, props.src, prevProps.data, props.data)) {
                this.updateContent();
            }
        }
        else {
            this.updateContent();
        }
    };
    Markdown.prototype.updateContent = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, name, data, src, env, ret, content;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, name = _a.name, data = _a.data, src = _a.src, env = _a.env;
                        if (!(src && amisCore.isEffectiveApi(src, data))) return [3 /*break*/, 2];
                        return [4 /*yield*/, env.fetcher(src, data)];
                    case 1:
                        ret = _b.sent();
                        if (typeof ret === 'string') {
                            this.setState({ content: ret });
                        }
                        else if (typeof ret === 'object' && ret.data) {
                            this.setState({ content: ret.data });
                        }
                        else {
                            console.error('markdown response error', ret);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        content = amisCore.getPropValue(this.props) ||
                            (name && amisCore.isPureVariable(name)
                                ? amisCore.resolveVariableAndFilter(name, data, '| raw')
                                : null);
                        if (content !== this.state.content) {
                            this.setState({ content: content });
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Markdown.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, cx = _a.classnames, options = _a.options;
        return (_J$X_("div", { className: cx('Markdown', className), style: style },
            _J$X_(amisCore.LazyComponent, { getComponent: loadComponent, content: this.state.content || '', options: options })));
    };
    return Markdown;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(MarkdownRenderer, _super);
    function MarkdownRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkdownRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'markdown'
        })
    ], MarkdownRenderer);
    return MarkdownRenderer;
})(Markdown));

exports.Markdown = Markdown;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
