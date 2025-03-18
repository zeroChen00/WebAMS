/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __decorate, __metadata } from 'tslib';
import React, { Suspense } from 'react';
import { isApiOutdated, getVariable, resolveVariableAndFilter, autobind, ScopedContext, Renderer } from 'amis-core';

/**
 * @file PdfViewer.tsx PDF 预览
 *
 * @created: 2024/02/26
 */
var PdfView = React.lazy(function () { return import('amis-ui/lib/components/PdfViewer'); });
var PdfViewer = /** @class */ (function (_super) {
    __extends(PdfViewer, _super);
    function PdfViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.wrapper = React.createRef();
        _this.state = {
            inited: false,
            loading: false,
            error: false
        };
        return _this;
    }
    PdfViewer.prototype.componentDidMount = function () {
        if (this.wrapper.current) {
            this.setState({
                width: this.wrapper.current.clientWidth - 100
            });
        }
        this.renderPdf();
    };
    PdfViewer.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (isApiOutdated(prevProps.src, props.src, prevProps.data, props.data)) {
            this.abortLoad();
            this.fetchPdf();
        }
        if (getVariable(props.data, props.name)) {
            if (getVariable(prevProps.data, prevProps.name) !==
                getVariable(props.data, props.name)) {
                this.abortLoad();
                this.renderPdf();
            }
        }
    };
    PdfViewer.prototype.componentWillUnmount = function () {
        this.abortLoad();
    };
    PdfViewer.prototype.abortLoad = function () {
        if (this.fetchCancel) {
            this.fetchCancel('load canceled');
            this.fetchCancel = undefined;
        }
        if (this.reader) {
            this.reader.abort();
            this.reader = undefined;
        }
    };
    PdfViewer.prototype.renderPdf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, src, name, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, src = _a.src, name = _a.name, data = _a.data;
                        this.setState({ error: false });
                        if (!src) return [3 /*break*/, 3];
                        if (!!this.file) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchPdf()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        if (!getVariable(data, name)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.renderFormFile()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PdfViewer.prototype.fetchPdf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, env, src, data, finalSrc, res, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, env = _a.env, src = _a.src, data = _a.data, _a.translate;
                        finalSrc = src
                            ? resolveVariableAndFilter(src, data, '| raw')
                            : undefined;
                        if (!finalSrc) {
                            console.warn('file src is empty');
                            return [2 /*return*/];
                        }
                        this.setState({
                            inited: true,
                            loading: true
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, env.fetcher(finalSrc, data, {
                                responseType: 'arraybuffer',
                                cancelExecutor: function (executor) { return (_this.fetchCancel = executor); }
                            })];
                    case 2:
                        res = _b.sent();
                        this.file = res.data;
                        this.forceUpdate();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _b.sent();
                        this.setState({ error: true });
                        console.error(error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        this.setState({
                            loading: false
                        });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PdfViewer.prototype.renderFormFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, data, file, reader_1;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this.props, name = _a.name, data = _a.data;
                file = getVariable(data, name);
                this.setState({
                    inited: true,
                    loading: true
                });
                if (file instanceof File) {
                    reader_1 = new FileReader();
                    reader_1.onload = function (_e) {
                        var data = reader_1.result;
                        _this.file = data;
                        _this.setState({
                            loading: false
                        });
                        _this.forceUpdate();
                    };
                    reader_1.onerror = function (_e) {
                        _this.setState({ error: true });
                    };
                    reader_1.readAsArrayBuffer(file);
                    this.reader = reader_1;
                }
                return [2 /*return*/];
            });
        });
    };
    PdfViewer.prototype.renderEmpty = function () {
        var _a = this.props, src = _a.src, name = _a.name;
        if (!src && !name) {
            return (React.createElement("svg", { width: "100%", height: "100", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("rect", { x: "0", y: "0", width: "100%", height: "100", style: { fill: '#F7F7F9' } }),
                React.createElement("text", { x: "50%", y: "50%", fontSize: "18", textAnchor: "middle", alignmentBaseline: "middle", fontFamily: "monospace, sans-serif", fill: "#555555" }, "PDF viewer")));
        }
        return null;
    };
    PdfViewer.prototype.renderError = function () {
        var _a = this.props, src = _a.src, __ = _a.translate;
        var error = this.state.error;
        if (error && src) {
            return React.createElement("div", null, __('loadingFailed') + ' url:' + src);
        }
        return null;
    };
    PdfViewer.prototype.render = function () {
        var _a = this.props, className = _a.className, cx = _a.classnames; _a.translate; var height = _a.height, background = _a.background; _a.src;
        var _b = this.state, loading = _b.loading, inited = _b.inited, error = _b.error;
        var width = Math.max(this.props.width || this.state.width, 300);
        return (React.createElement("div", { ref: this.wrapper },
            this.renderEmpty(),
            React.createElement(Suspense, { fallback: React.createElement("div", null, "...") }, inited && !error ? (React.createElement(PdfView, { file: this.file, loading: loading, className: className, classnames: cx, width: width, height: height, background: background })) : null),
            this.renderError()));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PdfViewer.prototype, "abortLoad", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PdfViewer.prototype, "renderPdf", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PdfViewer.prototype, "fetchPdf", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PdfViewer.prototype, "renderFormFile", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PdfViewer.prototype, "renderEmpty", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PdfViewer.prototype, "renderError", null);
    return PdfViewer;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(PdfViewerRenderer, _super);
    function PdfViewerRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    PdfViewerRenderer.prototype.componentWillUnmount = function () {
        var _a;
        (_a = _super.prototype.componentWillUnmount) === null || _a === void 0 ? void 0 : _a.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    PdfViewerRenderer.contextType = ScopedContext;
    PdfViewerRenderer = __decorate([
        Renderer({
            type: 'pdf-viewer'
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], PdfViewerRenderer);
    return PdfViewerRenderer;
})(PdfViewer));

export { PdfView, PdfViewer as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
