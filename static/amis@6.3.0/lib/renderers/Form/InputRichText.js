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
var isEqual = require('lodash/isEqual');
var cx = require('classnames');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
function loadRichText(type) {
    if (type === void 0) { type = 'froala'; }
    return function () {
        return type === 'tinymce'
            ? Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['amis-ui/lib/components/Tinymce'], function(mod) {fullfill(tslib.__importStar(mod))})})}).then(function (item) { return item.default; })
            : Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['amis-ui/lib/components/RichText'], function(mod) {fullfill(tslib.__importStar(mod))})})}).then(function (item) { return item.default; });
    };
}
var RichTextControl = /** @class */ (function (_super) {
    tslib.__extends(RichTextControl, _super);
    function RichTextControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            config: null,
            focused: false
        };
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.state.config = _this.getConfig(props);
        return _this;
    }
    RichTextControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var finnalVendor = props.vendor || (props.env.richTextToken ? 'froala' : 'tinymce');
        if (finnalVendor === 'froala') {
            if (!isEqual__default["default"](prevProps.options, props.options) ||
                !isEqual__default["default"](prevProps.editorClass, props.editorClass) ||
                !isEqual__default["default"](prevProps.placeholder, props.placeholder) ||
                !isEqual__default["default"](prevProps.buttons, props.buttons)) {
                this.setState({
                    config: this.getConfig(props)
                });
            }
        }
        else if (finnalVendor === 'tinymce') {
            if (!isEqual__default["default"](prevProps.options, props.options) ||
                !isEqual__default["default"](prevProps.fileField, props.fileField)) {
                this.setState({
                    config: this.getConfig(props)
                });
            }
        }
    };
    RichTextControl.prototype.getConfig = function (props) {
        var _this = this;
        var _a;
        var finnalVendor = props.vendor || (props.env.richTextToken ? 'froala' : 'tinymce');
        var imageReceiver = amisCore.normalizeApi(props.receiver, ((_a = props.receiver) === null || _a === void 0 ? void 0 : _a.method) || 'post');
        imageReceiver.data = imageReceiver.data || {};
        var imageApi = amisCore.buildApi(imageReceiver, props.data, {
            method: props.receiver.method || 'post'
        });
        if (finnalVendor === 'froala') {
            var videoReceiver = amisCore.normalizeApi(props.videoReceiver, props.videoReceiver.method || 'post');
            videoReceiver.data = videoReceiver.data || {};
            var videoApi = amisCore.buildApi(videoReceiver, props.data, {
                method: props.videoReceiver.method || 'post'
            });
            return tslib.__assign(tslib.__assign(tslib.__assign({ imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'], imageDefaultAlign: 'left', imageEditButtons: props.imageEditable
                    ? [
                        'imageReplace',
                        'imageAlign',
                        'imageRemove',
                        '|',
                        'imageLink',
                        'linkOpen',
                        'linkEdit',
                        'linkRemove',
                        '-',
                        'imageDisplay',
                        'imageStyle',
                        'imageAlt',
                        'imageSize'
                    ]
                    : [], key: props.env.richTextToken, attribution: false }, props.options), { editorClass: props.editorClass, placeholderText: props.translate(props.placeholder), imageUploadURL: imageApi.url, imageUploadParams: tslib.__assign({ from: 'rich-text' }, imageApi.data), videoUploadURL: videoApi.url, videoUploadParams: tslib.__assign({ from: 'rich-text' }, videoApi.data), events: tslib.__assign(tslib.__assign({}, (props.options && props.options.events)), { focus: this.handleFocus, blur: this.handleBlur }), language: !this.props.locale || this.props.locale === 'zh-CN' ? 'zh_cn' : '' }), (props.buttons ? { toolbarButtons: props.buttons } : {}));
        }
        else {
            var fetcher_1 = props.env.fetcher;
            return tslib.__assign(tslib.__assign({}, props.options), { onLoaded: this.handleTinyMceLoaded, images_upload_handler: function (blobInfo, progress) {
                    return new Promise(function (resolve, reject) { return tslib.__awaiter(_this, void 0, void 0, function () {
                        var formData, reader, receiver, response, location_1, e_1;
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        return tslib.__generator(this, function (_k) {
                            switch (_k.label) {
                                case 0:
                                    formData = new FormData();
                                    if (imageApi.data) {
                                        amisCore.qsstringify(imageApi.data)
                                            .split('&')
                                            .filter(function (item) { return item !== ''; })
                                            .forEach(function (item) {
                                            var parts = item.split('=');
                                            formData.append(parts[0], decodeURIComponent(parts[1]));
                                        });
                                    }
                                    formData.append(props.fileField || 'file', blobInfo.blob(), blobInfo.filename());
                                    _k.label = 1;
                                case 1:
                                    _k.trys.push([1, 3, , 4]);
                                    if (!imageApi.url) {
                                        reader = new FileReader();
                                        reader.readAsDataURL(blobInfo.blob());
                                        reader.onloadend = function () {
                                            var base64data = reader.result;
                                            resolve(base64data);
                                        };
                                        return [2 /*return*/];
                                    }
                                    receiver = tslib.__assign({ adaptor: function (payload) {
                                            return tslib.__assign(tslib.__assign({}, payload), { data: payload });
                                        } }, imageApi);
                                    return [4 /*yield*/, fetcher_1(receiver, formData, {
                                            method: 'post'
                                        })];
                                case 2:
                                    response = _k.sent();
                                    if (response.ok) {
                                        location_1 = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.link) ||
                                            ((_b = response.data) === null || _b === void 0 ? void 0 : _b.url) ||
                                            ((_c = response.data) === null || _c === void 0 ? void 0 : _c.value) ||
                                            ((_e = (_d = response.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.link) ||
                                            ((_g = (_f = response.data) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.url) ||
                                            ((_j = (_h = response.data) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.value);
                                        if (location_1) {
                                            resolve(location_1);
                                        }
                                        else {
                                            console.warn('must have return value');
                                        }
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _k.sent();
                                    reject(e_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                } });
        }
    };
    RichTextControl.prototype.handleFocus = function () {
        this.setState({
            focused: true
        });
    };
    RichTextControl.prototype.handleBlur = function () {
        this.setState({
            focused: false
        });
    };
    RichTextControl.prototype.handleChange = function (value, submitOnChange, changeImmediately) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onChange, disabled, dispatchEvent, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, disabled = _a.disabled, dispatchEvent = _a.dispatchEvent;
                        if (disabled) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, { value: value }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange === null || onChange === void 0 ? void 0 : onChange(value, submitOnChange, changeImmediately);
                        return [2 /*return*/];
                }
            });
        });
    };
    RichTextControl.prototype.handleTinyMceLoaded = function (tinymce) {
        var _a;
        var env = this.props.env;
        return (_a = env === null || env === void 0 ? void 0 : env.loadTinymcePlugin) === null || _a === void 0 ? void 0 : _a.call(env, tinymce);
    };
    RichTextControl.prototype.render = function () {
        var _a, _b;
        var _c = this.props, className = _c.className; _c.style; var ns = _c.classPrefix, value = _c.value; _c.onChange; var disabled = _c.disabled, isStatic = _c.static; _c.size; var vendor = _c.vendor, env = _c.env, locale = _c.locale, translate = _c.translate, borderMode = _c.borderMode;
        var finnalVendor = vendor || (env.richTextToken ? 'froala' : 'tinymce');
        if (isStatic) {
            return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "RichTextControl"), className, (_a = {
                        'is-focused': this.state.focused,
                        'is-disabled': disabled
                    },
                    _a["".concat(ns, "RichTextControl--border").concat(amisCore.ucFirst(borderMode))] = borderMode,
                    _a)), dangerouslySetInnerHTML: { __html: env.filterHtml(value) } }));
        }
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "RichTextControl"), className, (_b = {
                    'is-focused': this.state.focused,
                    'is-disabled': disabled
                },
                _b["".concat(ns, "RichTextControl--border").concat(amisCore.ucFirst(borderMode))] = borderMode,
                _b)) },
            _J$X_(amisCore.LazyComponent, { getComponent: loadRichText(finnalVendor), model: value, onModelChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur, config: this.state.config, disabled: disabled, locale: locale, translate: translate })));
    };
    RichTextControl.defaultProps = {
        imageEditable: true,
        receiver: '/api/upload/image',
        videoReceiver: '/api/upload/video',
        fileField: 'file',
        placeholder: 'placeholder.enter',
        options: {
            toolbarButtons: [
                'undo',
                'redo',
                'paragraphFormat',
                'textColor',
                'backgroundColor',
                'bold',
                'underline',
                'strikeThrough',
                'formatOL',
                'formatUL',
                'align',
                'quote',
                'insertLink',
                'insertImage',
                'insertEmotion',
                'insertTable',
                'html'
            ]
        }
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], RichTextControl.prototype, "handleTinyMceLoaded", null);
    return RichTextControl;
}(React__default["default"].Component));
var RichTextControlRenderer = /** @class */ (function (_super) {
    tslib.__extends(RichTextControlRenderer, _super);
    function RichTextControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RichTextControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-rich-text',
            sizeMutable: false,
            detectProps: ['options', 'buttons']
        })
    ], RichTextControlRenderer);
    return RichTextControlRenderer;
}(RichTextControl));

exports.RichTextControlRenderer = RichTextControlRenderer;
exports["default"] = RichTextControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
