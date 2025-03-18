/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveEventData, isPureVariable, resolveVariableAndFilter, LazyComponent, autobind, FormItem } from 'amis-core';
import { Editor } from 'amis-ui';

var EditorControl = /** @class */ (function (_super) {
    __extends(EditorControl, _super);
    function EditorControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            focused: false
        };
        _this.toDispose = [];
        _this.divRef = React.createRef();
        _this.prevHeight = 0;
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleEditorMounted = _this.handleEditorMounted.bind(_this);
        return _this;
    }
    EditorControl.prototype.componentWillUnmount = function () {
        this.toDispose.forEach(function (fn) { return fn(); });
    };
    EditorControl.prototype.doAction = function (action, data, throwErrors, args) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        if (actionType === 'clear') {
            onChange('');
        }
        else if (actionType === 'reset') {
            onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
        else if (actionType === 'focus') {
            this.focus();
        }
    };
    EditorControl.prototype.focus = function () {
        var _a, _b;
        this.editor.focus();
        this.setState({ focused: true });
        // 最近一次光标位置
        var position = (_a = this.editor) === null || _a === void 0 ? void 0 : _a.getPosition();
        (_b = this.editor) === null || _b === void 0 ? void 0 : _b.setPosition(position);
    };
    EditorControl.prototype.handleFocus = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, value, onFocus, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, value = _a.value, onFocus = _a.onFocus;
                        this.setState({
                            focused: true
                        });
                        return [4 /*yield*/, dispatchEvent('focus', resolveEventData(this.props, { value: value }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditorControl.prototype.handleBlur = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, value, onBlur, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, value = _a.value, onBlur = _a.onBlur;
                        this.setState({
                            focused: false
                        });
                        return [4 /*yield*/, dispatchEvent('blur', resolveEventData(this.props, { value: value }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditorControl.prototype.handleChange = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onChange, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onChange = _a.onChange;
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: e }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange === null || onChange === void 0 ? void 0 : onChange(e);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditorControl.prototype.handleEditorMounted = function (editor, monaco) {
        var _this = this;
        this.editor = editor;
        this.toDispose.push(editor.onDidChangeModelDecorations(function () {
            _this.updateContainerSize(editor, monaco); // typing
            requestAnimationFrame(_this.updateContainerSize.bind(_this, editor, monaco)); // folding
        }).dispose);
        if (this.props.editorDidMount) {
            var editorDidMount = this.props.editorDidMount;
            if (typeof editorDidMount === 'string') {
                editorDidMount = new Function('editor', 'monaco', editorDidMount);
            }
            var dispose = editorDidMount(editor, monaco);
            if (typeof dispose === 'function') {
                this.toDispose.push(dispose);
            }
        }
    };
    EditorControl.prototype.updateContainerSize = function (editor, monaco) {
        var _a;
        if (!this.divRef.current) {
            return;
        }
        var lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
        var lineCount = ((_a = editor.getModel()) === null || _a === void 0 ? void 0 : _a.getLineCount()) || 1;
        var height = editor.getTopForLineNumber(lineCount + 1) + lineHeight;
        if (this.prevHeight !== height) {
            this.prevHeight = height;
            this.divRef.current.style.height = "".concat(height, "px");
            editor.layout();
        }
    };
    EditorControl.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className; _b.style; var ns = _b.classPrefix, cx = _b.classnames, value = _b.value; _b.onChange; var disabled = _b.disabled, options = _b.options, editorTheme = _b.editorTheme, theme = _b.theme, size = _b.size, data = _b.data, allowFullscreen = _b.allowFullscreen, placeholder = _b.placeholder;
        var language = this.props.language;
        var finnalValue = value;
        if (finnalValue && typeof finnalValue !== 'string') {
            finnalValue = JSON.stringify(finnalValue, null, 2);
        }
        if (isPureVariable(language)) {
            language = resolveVariableAndFilter(language, data);
        }
        return (React.createElement("div", { ref: this.divRef, className: cx("EditorControl", (_a = {
                    'is-focused': this.state.focused
                },
                _a["EditorControl--".concat(size)] = size,
                _a), className) },
            React.createElement(LazyComponent, { classPrefix: ns, component: Editor, allowFullscreen: allowFullscreen, value: finnalValue, onChange: this.handleChange, disabled: disabled, onFocus: this.handleFocus, onBlur: this.handleBlur, language: language, editorTheme: editorTheme || (theme === 'dark' ? 'vs-dark' : 'vs'), editorDidMount: this.handleEditorMounted, childProps: {
                    placeholder: placeholder
                }, options: __assign(__assign({}, options), { readOnly: disabled }) })));
    };
    EditorControl.defaultProps = {
        language: 'javascript',
        editorTheme: '',
        allowFullscreen: true,
        options: {
            automaticLayout: true,
            selectOnLineNumbers: true,
            scrollBeyondLastLine: false,
            folding: true,
            minimap: {
                enabled: false
            }
        }
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], EditorControl.prototype, "updateContainerSize", null);
    return EditorControl;
}(React.Component));
var availableLanguages = [
    'bat',
    'c',
    'coffeescript',
    'cpp',
    'csharp',
    'css',
    'dockerfile',
    'fsharp',
    'go',
    'handlebars',
    'html',
    'ini',
    'java',
    'javascript',
    'json',
    'less',
    'lua',
    'markdown',
    'msdax',
    'objective-c',
    'php',
    'plaintext',
    'postiats',
    'powershell',
    'pug',
    'python',
    'r',
    'razor',
    'ruby',
    'sb',
    'scss',
    'sol',
    'shell',
    'sql',
    'swift',
    'typescript',
    'vb',
    'xml',
    'yaml'
];
availableLanguages.map(function (lang) {
    var EditorControlRenderer = /** @class */ (function (_super) {
        __extends(EditorControlRenderer, _super);
        function EditorControlRenderer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EditorControlRenderer.lang = lang;
        EditorControlRenderer.displayName = "".concat(lang[0].toUpperCase()).concat(lang.substring(1), "EditorControlRenderer");
        EditorControlRenderer.defaultProps = __assign(__assign({}, EditorControl.defaultProps), { language: lang });
        EditorControlRenderer = __decorate([
            FormItem({
                type: "".concat(lang, "-editor"),
                sizeMutable: false
            })
        ], EditorControlRenderer);
        return EditorControlRenderer;
    }(EditorControl));
    return EditorControlRenderer;
});
/** @class */ ((function (_super) {
    __extends(JavascriptEditorControlRenderer, _super);
    function JavascriptEditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JavascriptEditorControlRenderer.defaultProps = __assign(__assign({}, EditorControl.defaultProps), { language: 'javascript' });
    JavascriptEditorControlRenderer = __decorate([
        FormItem({
            type: 'js-editor',
            sizeMutable: false
        })
    ], JavascriptEditorControlRenderer);
    return JavascriptEditorControlRenderer;
})(EditorControl));
/** @class */ ((function (_super) {
    __extends(TypescriptEditorControlRenderer, _super);
    function TypescriptEditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypescriptEditorControlRenderer.defaultProps = __assign(__assign({}, EditorControl.defaultProps), { language: 'typescript' });
    TypescriptEditorControlRenderer = __decorate([
        FormItem({
            type: 'ts-editor',
            sizeMutable: false
        })
    ], TypescriptEditorControlRenderer);
    return TypescriptEditorControlRenderer;
})(EditorControl));
/** @class */ ((function (_super) {
    __extends(EditorControlRenderer, _super);
    function EditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorControlRenderer.defaultProps = __assign(__assign({}, EditorControl.defaultProps), { language: 'javascript' });
    EditorControlRenderer = __decorate([
        FormItem({
            type: "editor",
            sizeMutable: false
        })
    ], EditorControlRenderer);
    return EditorControlRenderer;
})(EditorControl));

export { availableLanguages, EditorControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
