/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveEventData, isPureVariable, resolveVariableAndFilter, LazyComponent, autobind, FormItem } from 'amis-core';

function loadComponent() {
    return import('amis-ui/lib/components/Editor').then(function (item) { return item.default; });
}
function normalizeValue(value, language) {
    if (value && typeof value !== 'string') {
        value = JSON.stringify(value, null, 2);
    }
    if (language && language === 'json') {
        try {
            value = JSON.stringify(typeof value === 'string' ? JSON.parse(value) : value, null, 2);
        }
        catch (e) { }
    }
    return value;
}
var DiffEditor = /** @class */ (function (_super) {
    __extends(DiffEditor, _super);
    function DiffEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            focused: false
        };
        _this.toDispose = [];
        _this.divRef = React.createRef();
        _this.prevHeight = 0;
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.editorFactory = _this.editorFactory.bind(_this);
        _this.handleEditorMounted = _this.handleEditorMounted.bind(_this);
        _this.handleModifiedEditorChange =
            _this.handleModifiedEditorChange.bind(_this);
        return _this;
    }
    DiffEditor.prototype.componentWillUnmount = function () {
        this.toDispose.forEach(function (fn) { return fn(); });
    };
    DiffEditor.prototype.doAction = function (action, data, throwErrors, args) {
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
    DiffEditor.prototype.focus = function () {
        var _a, _b;
        this.editor.focus();
        this.setState({ focused: true });
        // 最近一次光标位置
        var position = (_a = this.editor) === null || _a === void 0 ? void 0 : _a.getPosition();
        (_b = this.editor) === null || _b === void 0 ? void 0 : _b.setPosition(position);
    };
    DiffEditor.prototype.handleFocus = function (e) {
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
    DiffEditor.prototype.handleBlur = function (e) {
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
    DiffEditor.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, data = _a.data, value = _a.value, diffValue = _a.diffValue, language = _a.language;
        if (this.originalEditor &&
            (diffValue !== prevProps.diffValue || data !== prevProps.data)) {
            this.originalEditor.getModel().setValue(isPureVariable(diffValue)
                ? normalizeValue(resolveVariableAndFilter(diffValue || '', data, '| raw', function () { return ''; }), language)
                : normalizeValue(diffValue, language));
        }
        if (this.modifiedEditor &&
            value !== prevProps.value &&
            !this.state.focused) {
            this.modifiedEditor.getModel().setValue(isPureVariable(value)
                ? normalizeValue(resolveVariableAndFilter(value || '', data, '| raw', function () { return ''; }), language)
                : normalizeValue(value, language));
        }
    };
    DiffEditor.prototype.editorFactory = function (containerElement, monaco, options) {
        return monaco.editor.createDiffEditor(containerElement, options);
    };
    DiffEditor.prototype.handleEditorMounted = function (editor, monaco) {
        var _this = this;
        var _a = this.props, value = _a.value, data = _a.data, language = _a.language, diffValue = _a.diffValue;
        this.monaco = monaco;
        this.editor = editor;
        this.modifiedEditor = editor.getModifiedEditor();
        this.originalEditor = editor.getOriginalEditor();
        this.toDispose.push(this.modifiedEditor.onDidFocusEditorWidget(this.handleFocus).dispose);
        this.toDispose.push(this.modifiedEditor.onDidBlurEditorWidget(this.handleBlur).dispose);
        this.toDispose.push(this.modifiedEditor.onDidChangeModelContent(this.handleModifiedEditorChange).dispose);
        this.toDispose.push(this.modifiedEditor.onDidChangeModelDecorations(function () {
            _this.updateContainerSize(_this.modifiedEditor, monaco); // typing
            requestAnimationFrame(_this.updateContainerSize.bind(_this, _this.modifiedEditor, monaco)); // folding
        }).dispose);
        this.editor.setModel({
            original: this.monaco.editor.createModel(isPureVariable(diffValue)
                ? normalizeValue(resolveVariableAndFilter(diffValue || '', data, '| raw'), language)
                : normalizeValue(diffValue, language), language),
            modified: this.monaco.editor.createModel(normalizeValue(value, language), language)
        });
    };
    DiffEditor.prototype.handleModifiedEditorChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, dispatchEvent, value, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, dispatchEvent = _a.dispatchEvent;
                        value = this.modifiedEditor.getModel().getValue();
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: value }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange && onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    DiffEditor.prototype.updateContainerSize = function (editor, monaco) {
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
    DiffEditor.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var value = _a.value, onChange = _a.onChange, disabled = _a.disabled, size = _a.size, options = _a.options, language = _a.language, editorTheme = _a.editorTheme, cx = _a.classnames;
        return (React.createElement("div", { ref: this.divRef, className: cx('EditorControl', size ? "EditorControl--".concat(size) : '', className, {
                'is-focused': this.state.focused
            }) },
            React.createElement(LazyComponent, { getComponent: loadComponent, value: value, onChange: onChange, disabled: disabled, language: language, editorTheme: editorTheme, editorDidMount: this.handleEditorMounted, editorFactory: this.editorFactory, options: __assign(__assign({}, options), { readOnly: disabled }), isDiffEditor: true })));
    };
    DiffEditor.defaultProps = {
        language: 'javascript',
        editorTheme: 'vs',
        options: {
            automaticLayout: false,
            selectOnLineNumbers: true,
            scrollBeyondLastLine: false,
            folding: true,
            minimap: {
                enabled: false
            }
        },
        diffValue: ''
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], DiffEditor.prototype, "updateContainerSize", null);
    return DiffEditor;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(DiffEditorControlRenderer, _super);
    function DiffEditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiffEditorControlRenderer.defaultProps = __assign({}, DiffEditor.defaultProps);
    DiffEditorControlRenderer = __decorate([
        FormItem({
            type: "diff-editor",
            sizeMutable: false
        })
    ], DiffEditorControlRenderer);
    return DiffEditorControlRenderer;
})(DiffEditor));
// @Renderer({
//   test: /(^|\/)diff-editor$/,
//   name: 'diff-editor'
// })
// export class DiffEditorRenderer extends DiffEditor {
//   static defaultProps = {
//     ...DiffEditor.defaultProps,
//     disabled: true
//   };
// }

export { DiffEditor };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
