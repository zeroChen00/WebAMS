/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var isPlainObject = require('lodash/isPlainObject');
var amisCore = require('amis-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var Code = /** @class */ (function (_super) {
    tslib.__extends(Code, _super);
    function Code(props) {
        var _this = _super.call(this, props) || this;
        _this.toDispose = [];
        _this.codeRef = React__default["default"].createRef();
        return _this;
    }
    Code.prototype.shouldComponentUpdate = function (nextProps) {
        return (amisCore.anyChanged(Code.propsList, this.props, nextProps) ||
            this.resolveLanguage(this.props) !== this.resolveLanguage(nextProps) ||
            amisCore.getPropValue(this.props) !== amisCore.getPropValue(nextProps));
    };
    Code.prototype.componentDidMount = function () {
        var _this = this;
        Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['monaco-editor'], function(mod) {fullfill(tslib.__importStar(mod))})})}).then(function (monaco) { return _this.handleMonaco(monaco); });
    };
    Code.prototype.componentDidUpdate = function (preProps) {
        var _a;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var props, dom, tabSize, sourceCode, language, theme, colorizedHtml;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        props = this.props;
                        dom = this.codeRef.current;
                        if (!(((_a = this === null || this === void 0 ? void 0 : this.monaco) === null || _a === void 0 ? void 0 : _a.editor) && dom)) return [3 /*break*/, 2];
                        tabSize = props.tabSize;
                        sourceCode = amisCore.getPropValue(this.props);
                        language = this.resolveLanguage();
                        theme = this.registerAndGetTheme();
                        /**
                         * FIXME: https://github.com/microsoft/monaco-editor/issues/338
                         * 已知问题：变量的样式存储在顶层，所以同页面中存在多个editor时，切换主题对所有editor生效
                         * 每个组件单独实例化一个editor可以处理，但是成本较高，目前官方的处理方式是iframe嵌套隔离
                         */
                        this.monaco.editor.setTheme(theme);
                        return [4 /*yield*/, this.monaco.editor.colorize(sourceCode, language, {
                                tabSize: tabSize
                            })];
                    case 1:
                        colorizedHtml = _b.sent();
                        dom.innerHTML = colorizedHtml;
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Code.prototype.handleMonaco = function (monaco) {
        var _a;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var tabSize, sourceCode, language, dom, theme, colorizedHtml;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!monaco) {
                            return [2 /*return*/];
                        }
                        this.monaco = monaco;
                        tabSize = this.props.tabSize;
                        sourceCode = amisCore.getPropValue(this.props);
                        language = this.resolveLanguage();
                        dom = this.codeRef.current;
                        if (!(dom && ((_a = this.monaco) === null || _a === void 0 ? void 0 : _a.editor))) return [3 /*break*/, 2];
                        theme = this.registerAndGetTheme();
                        // 这里必须是异步才能准确，可能是因为 monaco 里注册主题是异步的
                        this.monaco.editor.setTheme(theme);
                        return [4 /*yield*/, this.monaco.editor.colorize(sourceCode, language, {
                                tabSize: tabSize
                            })];
                    case 1:
                        colorizedHtml = _b.sent();
                        dom.innerHTML = colorizedHtml;
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Code.prototype.resolveLanguage = function (props) {
        var currentProps = props !== null && props !== void 0 ? props : this.props;
        var customLang = currentProps.customLang, data = currentProps.data;
        var _a = currentProps.language, language = _a === void 0 ? 'plaintext' : _a;
        if (amisCore.isPureVariable(language)) {
            language = amisCore.resolveVariableAndFilter(language, data);
        }
        if (customLang) {
            if (customLang.name) {
                language = customLang.name;
            }
        }
        return language;
    };
    /** 注册并返回当前主题名称，如果未自定义主题，则范围editorTheme值，默认为'vs' */
    Code.prototype.registerAndGetTheme = function () {
        var e_1, _a;
        var _b, _c;
        var monaco = this.monaco;
        var _d = this.props, theme = _d.theme, editorTheme = _d.editorTheme;
        editorTheme = editorTheme || (theme === 'dark' ? 'vs-dark' : 'vs');
        if (!monaco) {
            return editorTheme;
        }
        if (this.customLang &&
            this.customLang.name &&
            Array.isArray(this.customLang.tokens) &&
            this.customLang.tokens.length) {
            var langName = this.customLang.name;
            var colors = ((_b = this.customLang) === null || _b === void 0 ? void 0 : _b.colors) && isPlainObject__default["default"]((_c = this.customLang) === null || _c === void 0 ? void 0 : _c.colors)
                ? this.customLang.colors
                : {};
            monaco.languages.register({ id: langName });
            var tokenizers = [];
            var rules = [];
            try {
                for (var _e = tslib.__values(this.customLang.tokens), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var token = _f.value;
                    var regex = new RegExp(token.regex, token.regexFlags || undefined);
                    tokenizers.push([regex, token.name]);
                    rules.push({
                        token: token.name,
                        foreground: token.color,
                        background: token.background,
                        fontStyle: token.fontStyle
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            monaco.languages.setMonarchTokensProvider(langName, {
                tokenizer: {
                    root: tokenizers
                }
            });
            monaco.editor.defineTheme(langName, {
                base: 'vs',
                inherit: false,
                rules: rules,
                colors: colors
            });
            return langName;
        }
        return editorTheme;
    };
    Code.prototype.render = function () {
        var sourceCode = amisCore.getPropValue(this.props);
        var _a = this.props, className = _a.className, maxHeight = _a.maxHeight, _b = _a.style, style = _b === void 0 ? {} : _b, cx = _a.classnames, editorTheme = _a.editorTheme, customLang = _a.customLang, wordWrap = _a.wordWrap, wrapperComponent = _a.wrapperComponent;
        var language = this.resolveLanguage();
        var isMultiLine = typeof sourceCode === 'string' && sourceCode.split(/\r?\n/).length > 1;
        var Component = wrapperComponent || (isMultiLine ? 'pre' : 'code');
        if (customLang) {
            this.customLang = customLang;
        }
        if (maxHeight) {
            style.maxHeight = style.maxHeight || maxHeight;
            style.overflow = 'auto';
        }
        return (_J$X_(Component, { ref: this.codeRef, className: cx('Code', {
                // 使用内置暗色主题时设置一下背景，避免看不清
                'Code--dark': editorTheme && ['vs-dark', 'hc-black'].includes(editorTheme),
                'Code-pre-wrap': Component === 'pre',
                'word-break': wordWrap
            }, className), style: style, "data-lang": language }, sourceCode));
    };
    Code.propsList = [
        'language',
        'editorTheme',
        'tabSize',
        'wordWrap',
        'customLang',
        'style'
    ];
    Code.defaultProps = {
        language: 'plaintext',
        tabSize: 4,
        wordWrap: true
    };
    return Code;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(CodeRenderer, _super);
    function CodeRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CodeRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'code'
        })
    ], CodeRenderer);
    return CodeRenderer;
})(Code));

exports["default"] = Code;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
