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
var DropZone = require('react-dropzone');
require('blueimp-canvastoblob');
var find = require('lodash/find');
var amisUi = require('amis-ui');
var accepts = require('attr-accept');
var InputFile = require('./InputFile.js');
var Image$1 = require('../Image.js');
var isPlainObject = require('lodash/isPlainObject');
var merge = require('lodash/merge');
var omit = require('lodash/omit');
var isNil = require('lodash/isNil');
var Sortable = require('sortablejs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var DropZone__default = /*#__PURE__*/_interopDefaultLegacy(DropZone);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);
var accepts__default = /*#__PURE__*/_interopDefaultLegacy(accepts);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);
var isNil__default = /*#__PURE__*/_interopDefaultLegacy(isNil);
var Sortable__default = /*#__PURE__*/_interopDefaultLegacy(Sortable);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
// import 'cropperjs/dist/cropper.css';
var Cropper = React__default["default"].lazy(function () { return Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['react-cropper'], function(mod) {fullfill(tslib.__importStar(mod))})})}); });
var preventEvent = function (e) { return e.stopPropagation(); };
function formatIconThemeCss(themeCss) {
    var addBtnControlClassName = {};
    ['default', 'hover', 'active'].forEach(function (key) {
        var _a;
        addBtnControlClassName["color:".concat(key)] =
            (_a = themeCss === null || themeCss === void 0 ? void 0 : themeCss.addBtnControlClassName) === null || _a === void 0 ? void 0 : _a["icon-color:".concat(key)];
    });
    Object.keys(addBtnControlClassName).forEach(function (key) {
        if (!addBtnControlClassName[key]) {
            delete addBtnControlClassName[key];
        }
    });
    if (!amisCore.isEmpty(addBtnControlClassName)) {
        return { addBtnControlClassName: addBtnControlClassName };
    }
    return;
}
var ImageControl = /** @class */ (function (_super) {
    tslib.__extends(ImageControl, _super);
    function ImageControl(props) {
        var _this_1 = _super.call(this, props) || this;
        _this_1.state = {
            uploading: false,
            locked: false,
            files: [],
            dropMultiple: false
        };
        _this_1.files = [];
        _this_1.fileKeys = new WeakMap();
        _this_1.fileUploadCancelExecutors = [];
        _this_1.dropzone = React__default["default"].createRef();
        _this_1.frameImageRef = React__default["default"].createRef();
        _this_1.current = null;
        _this_1.unmounted = false;
        _this_1.initedFilled = false;
        // 文件重新上传的位置标记，用以定位替换
        _this_1.reuploadIndex = undefined;
        _this_1.toDispose = [];
        _this_1.id = amisCore.guid();
        var value = props.value;
        var multiple = props.multiple;
        var joinValues = props.joinValues;
        var delimiter = props.delimiter;
        var files = [];
        if (value) {
            // files = (multiple && Array.isArray(value) ? value : joinValues ? (value as string).split(delimiter) : [value])
            files = (Array.isArray(value)
                ? value
                : joinValues && typeof value === 'string' && multiple
                    ? value.split(delimiter)
                    : [value])
                .map(function (item) { return ImageControl.valueToFile(item); })
                .filter(function (item) { return item; });
        }
        _this_1.state = tslib.__assign(tslib.__assign({}, _this_1.state), { files: (_this_1.files = files), crop: _this_1.buildCrop(props), dropMultiple: props.multiple, frameImageWidth: 0 });
        _this_1.sendFile = _this_1.sendFile.bind(_this_1);
        _this_1.removeFile = _this_1.removeFile.bind(_this_1);
        _this_1.handleDrop = _this_1.handleDrop.bind(_this_1);
        _this_1.handleClick = _this_1.handleClick.bind(_this_1);
        _this_1.handleClick = _this_1.handleClick.bind(_this_1);
        _this_1.handleCrop = _this_1.handleCrop.bind(_this_1);
        _this_1.handleDropRejected = _this_1.handleDropRejected.bind(_this_1);
        _this_1.cancelCrop = _this_1.cancelCrop.bind(_this_1);
        _this_1.rotatableCrop = _this_1.rotatableCrop.bind(_this_1);
        _this_1.handleImageLoaded = _this_1.handleImageLoaded.bind(_this_1);
        _this_1.handleFrameImageLoaded = _this_1.handleFrameImageLoaded.bind(_this_1);
        _this_1.startUpload = _this_1.startUpload.bind(_this_1);
        _this_1.stopUpload = _this_1.stopUpload.bind(_this_1);
        _this_1.toggleUpload = _this_1.toggleUpload.bind(_this_1);
        _this_1.tick = _this_1.tick.bind(_this_1);
        _this_1.onChange = _this_1.onChange.bind(_this_1);
        _this_1.addFiles = _this_1.addFiles.bind(_this_1);
        _this_1.handleSelect = _this_1.handleSelect.bind(_this_1);
        _this_1.handlePaste = _this_1.handlePaste.bind(_this_1);
        _this_1.syncAutoFill = _this_1.syncAutoFill.bind(_this_1);
        _this_1.handleReSelect = _this_1.handleReSelect.bind(_this_1);
        _this_1.handleFileCancel = _this_1.handleFileCancel.bind(_this_1);
        _this_1.dragTipRef = _this_1.dragTipRef.bind(_this_1);
        return _this_1;
    }
    ImageControl.valueToFile = function (value, props) {
        return value
            ? tslib.__assign(tslib.__assign({}, (typeof value === 'string'
                ? {
                    value: value,
                    url: value,
                    id: amisCore.guid()
                }
                : value)), { state: 'init' }) : undefined;
    };
    ImageControl.sizeInfo = function (width, height, __) {
        if (!width) {
            return __('Image.height', { height: height });
        }
        else if (!height) {
            return __('Image.width', { width: width });
        }
        return __('Image.size', { width: width, height: height });
    };
    ImageControl.prototype.componentDidMount = function () {
        var _this_1 = this;
        var _a = this.props, formInited = _a.formInited, addHook = _a.addHook, formItem = _a.formItem;
        var onInited = function () {
            _this_1.initedFilled = true;
            _this_1.props.initAutoFill && _this_1.syncAutoFill();
        };
        formItem &&
            this.toDispose.push(formInited || !addHook
                ? formItem.addInitHook(onInited)
                : addHook(onInited, 'init'));
        if (this.props.initCrop && this.files.length) {
            this.editImage(0);
        }
    };
    ImageControl.prototype.componentDidUpdate = function (prevProps) {
        var _this_1 = this;
        var props = this.props;
        if (prevProps.value !== props.value) {
            var value = props.value;
            var multiple = props.multiple;
            var joinValues = props.joinValues;
            var delimiter = props.delimiter;
            var files = [];
            if (value) {
                files = (Array.isArray(value)
                    ? value
                    : joinValues && typeof value === 'string' && multiple
                        ? value.split(delimiter)
                        : [value])
                    .map(function (item) {
                    var obj = ImageControl.valueToFile(item, props);
                    var org;
                    if (obj &&
                        (org = find__default["default"](_this_1.files, function (item) { return item.value === obj.value; }))) {
                        obj = tslib.__assign(tslib.__assign(tslib.__assign({}, org), obj), { id: org.id || obj.id || amisCore.guid() });
                    }
                    return obj;
                })
                    .filter(function (item) { return item; });
            }
            this.setState({
                files: (this.files = files)
            }, props.changeMotivation !== 'formInited' && this.initedFilled
                ? this.syncAutoFill
                : undefined);
        }
        if (prevProps.multiple !== props.multiple) {
            this.setState({
                dropMultiple: props.multiple
            });
        }
        if (prevProps.crop !== props.crop) {
            this.setState({
                crop: this.buildCrop(props)
            });
        }
    };
    ImageControl.prototype.componentWillUnmount = function () {
        this.unmounted = true;
        this.fileKeys = new WeakMap();
        this.toDispose.forEach(function (fn) { return fn(); });
        this.toDispose = [];
    };
    ImageControl.prototype.getFileKey = function (file) {
        if (file.id) {
            return file.id;
        }
        if (this.fileKeys.has(file)) {
            return this.fileKeys.get(file);
        }
        var key = amisCore.guid();
        this.fileKeys.set(file, key);
        return key;
    };
    ImageControl.prototype.buildCrop = function (props) {
        var crop = props.crop;
        var __ = this.props.translate;
        if (crop && props.multiple) {
            props.env && props.env.alert && props.env.alert(__('Image.configError'));
            return null;
        }
        if (crop === true) {
            crop = {};
        }
        if (crop) {
            crop = tslib.__assign({ aspectRatio: undefined, guides: true, dragMode: 'move', viewMode: 1, rotatable: true, scalable: true }, crop);
        }
        return crop;
    };
    ImageControl.prototype.handleDropRejected = function (rejectedFiles, evt) {
        var _a;
        if (evt.type !== 'change' && evt.type !== 'drop') {
            return;
        }
        var _b = this.props, accept = _b.accept, multiple = _b.multiple, onChange = _b.onChange, maxLength = _b.maxLength, maxSize = _b.maxSize, __ = _b.translate;
        var reFiles = rejectedFiles.map(function (item) { return item.file; });
        var currentFiles = this.files;
        if (!multiple && currentFiles.length) {
            currentFiles = [];
        }
        var allowed = !isNil__default["default"](this.reuploadIndex)
            ? reFiles.length
            : (multiple
                ? maxLength
                    ? maxLength
                    : reFiles.length + currentFiles.length
                : 1) - currentFiles.length;
        // 限制过多的错误文件
        if (allowed <= 0) {
            return;
        }
        var errorFiles = [].slice.call(reFiles, 0, allowed);
        var formatFile = function (file) {
            var _a;
            file.id = amisCore.guid();
            var errors = (_a = rejectedFiles.find(function (i) { return i.file === file; })) === null || _a === void 0 ? void 0 : _a.errors;
            if (errors) {
                file.error = errors
                    .map(function (err) {
                    // 类型错误
                    if (err.code === DropZone.ErrorCode.FileInvalidType) {
                        return __('File.invalidType', {
                            files: file.name,
                            accept: accept
                        });
                    }
                    // 文件太大
                    else if (err.code === DropZone.ErrorCode.FileTooLarge) {
                        return __('File.sizeLimit', {
                            maxSize: amisCore.prettyBytes(maxSize, 1024)
                        });
                    }
                })
                    .join('; ');
            }
            file.state = 'invalid';
            return file;
        };
        if (multiple) {
            if (this.reuploadIndex !== undefined) {
                currentFiles.splice(this.reuploadIndex, 1, formatFile(errorFiles[0]));
                this.reuploadIndex = undefined;
            }
            else {
                errorFiles.forEach(function (item) {
                    currentFiles.push(formatFile(item));
                });
            }
            this.setState({
                files: (this.files = currentFiles),
                dropMultiple: multiple
            });
        }
        else {
            var file = formatFile(errorFiles[0]);
            this.setState({
                error: (_a = file === null || file === void 0 ? void 0 : file.error) !== null && _a !== void 0 ? _a : '',
                files: (this.files = []),
                dropMultiple: multiple
            }, function () { return onChange(undefined); });
        }
    };
    ImageControl.prototype.handleFileCancel = function () {
        this.setState({
            dropMultiple: this.props.multiple
        });
    };
    ImageControl.prototype.startUpload = function (retry) {
        if (retry === void 0) { retry = false; }
        if (this.state.uploading) {
            return;
        }
        this.setState({
            uploading: true,
            locked: true,
            files: (this.files = this.files.map(function (file) {
                if (retry && file.state === 'error') {
                    file.state = 'pending';
                    file.progress = 0;
                }
                return file;
            }))
        }, this.tick);
    };
    ImageControl.prototype.toggleUpload = function () {
        return this.state.uploading ? this.stopUpload() : this.startUpload();
    };
    ImageControl.prototype.stopUpload = function () {
        if (!this.state.uploading) {
            return;
        }
        this.setState({
            uploading: false
        });
    };
    ImageControl.prototype.tick = function () {
        var _this_1 = this;
        if (this.current || !this.state.uploading) {
            return;
        }
        var _a = this.props, __ = _a.translate; _a.multiple;
        var file = find__default["default"](this.files, function (item) { return item.state === 'pending'; });
        if (file) {
            this.current = file;
            file.state = 'uploading';
            this.setState({
                files: (this.files = this.files.concat())
            }, function () {
                return _this_1.sendFile(file, function (error, file, obj) {
                    var files = _this_1.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    var newFile = file;
                    if (error) {
                        newFile.state =
                            file.state !== 'uploading' ? file.state : 'error';
                        newFile.error = error;
                        _this_1.current = null;
                        files.splice(idx, 1);
                        return _this_1.setState({
                            files: (_this_1.files = files),
                            error: error
                        }, _this_1.tick);
                    }
                    else {
                        newFile = tslib.__assign(tslib.__assign({ name: file.name || _this_1.state.cropFileName }, obj), { preview: file.preview });
                    }
                    files.splice(idx, 1, newFile);
                    _this_1.current = null;
                    return _this_1.setState({
                        files: (_this_1.files = files)
                    }, _this_1.tick);
                }, function (progress) {
                    var files = _this_1.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    // file 是个非 File 对象，先不copy了直接改。
                    file.progress = progress;
                    _this_1.setState({
                        files: (_this_1.files = files)
                    });
                });
            });
        }
        else {
            this.setState({
                uploading: false,
                locked: false
            }, function () { return tslib.__awaiter(_this_1, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.onChange(!!this.resolve, false)];
                        case 1:
                            _a.sent();
                            if (this.resolve) {
                                this.resolve(this.files.some(function (file) { return file.state === 'error'; })
                                    ? __('Image.errorRetry')
                                    : null);
                                this.resolve = undefined;
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    ImageControl.prototype.removeFile = function (file, index) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var files, dispatcher, isUploading;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = this.files.concat();
                        return [4 /*yield*/, this.dispatchEvent('remove', tslib.__assign(tslib.__assign({}, file), { item: file }))];
                    case 1:
                        dispatcher = _a.sent();
                        if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                            return [2 /*return*/];
                        }
                        this.removeFileCanelExecutor(file, true);
                        files.splice(index, 1);
                        isUploading = this.current === file;
                        if (isUploading) {
                            this.current = null;
                        }
                        this.setState({
                            files: (this.files = files)
                        }, isUploading ? this.tick : this.onChange);
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageControl.prototype.previewImage = function (file, index, e) {
        var onImageEnlarge = this.props.onImageEnlarge;
        if (onImageEnlarge) {
            var files = this.files;
            e.preventDefault();
            onImageEnlarge({
                src: (file.preview || file.url),
                originalSrc: (file.preview || file.url),
                index: index,
                list: files.map(function (file) { return ({
                    src: (file.preview || file.url),
                    originalSrc: (file.preview || file.url),
                    title: file.name || InputFile.getNameFromUrl(file.value || file.url)
                }); })
            });
        }
    };
    ImageControl.prototype.editImage = function (index) {
        var files = this.files;
        this.setState({
            cropFile: {
                preview: files[index].preview || files[index].url,
                name: files[index].name,
                state: 'init'
            },
            cropFileName: files[index].name
        });
    };
    ImageControl.prototype.onChange = function (changeImmediately, changeEvent, initAutoFill) {
        if (changeEvent === void 0) { changeEvent = true; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, multiple, onChange, joinValues, extractValue, delimiter, valueField, curInitAutoFill, files, newValue, dispatcher;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, multiple = _a.multiple, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
                        curInitAutoFill = initAutoFill !== null && initAutoFill !== void 0 ? initAutoFill : true;
                        files = this.files.filter(function (file) { return file.state == 'uploaded' || file.state == 'init'; });
                        newValue = files.length
                            ? joinValues
                                ? files[0].value
                                : files[0]
                            : '';
                        if (multiple) {
                            newValue = joinValues
                                ? files.map(function (item) { return item.value; }).join(delimiter)
                                : extractValue
                                    ? files.map(function (item) { return item.value; })
                                    : files;
                        }
                        else {
                            newValue = joinValues
                                ? newValue.value || newValue
                                : extractValue
                                    ? newValue[valueField || 'value']
                                    : newValue;
                        }
                        if (!changeEvent) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dispatchEvent('change')];
                    case 1:
                        dispatcher = _b.sent();
                        if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        onChange((this.emitValue = newValue || ''), undefined, changeImmediately);
                        curInitAutoFill && this.syncAutoFill();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageControl.prototype.syncAutoFill = function () {
        var _a = this.props, autoFill = _a.autoFill, multiple = _a.multiple, onBulkChange = _a.onBulkChange, data = _a.data, name = _a.name;
        // 参照录入｜自动填充
        if (autoFill === null || autoFill === void 0 ? void 0 : autoFill.hasOwnProperty('api')) {
            return;
        }
        // 排除自身的字段，否则会无限更新state
        var excludeSelfAutoFill = omit__default["default"](autoFill, name || '');
        if (!amisCore.isEmpty(excludeSelfAutoFill) && onBulkChange) {
            var files = this.state.files.filter(function (file) { return ~['uploaded', 'init', 'ready'].indexOf(file.state); });
            var toSync_1 = amisCore.dataMapping(excludeSelfAutoFill, multiple
                ? {
                    items: files
                }
                : files[0]);
            Object.keys(toSync_1).forEach(function (key) {
                if (isPlainObject__default["default"](toSync_1[key]) && isPlainObject__default["default"](data[key])) {
                    toSync_1[key] = merge__default["default"]({}, data[key], toSync_1[key]);
                }
            });
            onBulkChange(toSync_1);
        }
    };
    ImageControl.prototype.handleSelect = function () {
        // 清除标记，以免影响正常上传
        this.reuploadIndex = undefined;
        this.dropzone.current && this.dropzone.current.open();
    };
    ImageControl.prototype.handleRetry = function (index) {
        var files = this.files.concat();
        var file = files[index];
        if (file.state !== 'invalid' && file.state !== 'error') {
            return;
        }
        file.state = 'pending';
        file.progress = 0;
        this.setState({
            files: files
        }, this.startUpload);
    };
    ImageControl.prototype.handleDrop = function (files, e, event) {
        var _this_1 = this;
        var _a = this.props, multiple = _a.multiple, crop = _a.crop, dropCrop = _a.dropCrop;
        if (!files.length && Array.isArray(e)) {
            var error = e
                .reduce(function (errors, item) {
                errors = errors.concat(item.errors.map(function (e) { return e.message; }));
                return errors;
            }, [])
                .join('\n');
            this.props.env.alert(error);
            return;
        }
        if (crop && !multiple && dropCrop) {
            var file = files[0];
            if (!file.preview || !file.url) {
                file.preview = window.URL.createObjectURL(file);
            }
            return this.setState({
                cropFile: file,
                cropFileName: file.name
            });
        }
        // 拖拽的情况，没有比他更靠前的方法，只能在这里判断
        if (event && event.type === 'drop' && this.reuploadIndex !== undefined) {
            this.reuploadIndex = undefined;
        }
        this.setState({
            dropMultiple: multiple
        }, function () { return _this_1.addFiles(files); });
    };
    ImageControl.prototype.handlePaste = function (e) {
        var event = e.nativeEvent;
        var files = [];
        var items = event.clipboardData.items;
        var accept = this.props.accept || '*';
        [].slice.call(items).forEach(function (item) {
            var blob;
            if (item.kind !== 'file' ||
                !(blob = item.getAsFile()) ||
                !accepts__default["default"](blob, accept)) {
                return;
            }
            blob.id = amisCore.guid();
            files.push(blob);
        });
        // 清除标记，以免影响正常上传
        this.reuploadIndex = undefined;
        this.handleDrop(files);
    };
    ImageControl.prototype.handleCrop = function () {
        var _this_1 = this;
        var _a = this.props, cropFormat = _a.cropFormat, cropQuality = _a.cropQuality;
        this.cropper.getCroppedCanvas().toBlob(function (file) {
            _this_1.addFiles([file]);
            _this_1.setState({
                cropFile: undefined,
                locked: false,
                lockedReason: ''
            });
        }, cropFormat || 'image/png', cropQuality || 1);
    };
    ImageControl.prototype.cancelCrop = function () {
        this.setState({
            cropFile: undefined,
            cropFileName: undefined,
            locked: false,
            lockedReason: ''
        }, this.onChange);
    };
    ImageControl.prototype.rotatableCrop = function () {
        this.cropper.rotate(45);
    };
    ImageControl.prototype.addFiles = function (files) {
        var _this_1 = this;
        if (!files.length) {
            return;
        }
        var _a = this.props, multiple = _a.multiple, maxLength = _a.maxLength, maxSize = _a.maxSize, __ = _a.translate;
        var currentFiles = this.files;
        if (!multiple && currentFiles.length) {
            currentFiles = [];
        }
        var allowed = !isNil__default["default"](this.reuploadIndex)
            ? files.length
            : (multiple
                ? maxLength
                    ? maxLength
                    : files.length + currentFiles.length
                : 1) - currentFiles.length;
        var inputFiles = [];
        [].slice.call(files, 0, allowed).forEach(function (file) {
            if (maxSize && file.size > maxSize) {
                _this_1.props.env.alert(__('File.maxSize', {
                    filename: file.name || __('File.imageAfterCrop'),
                    actualSize: amisCore.prettyBytes(file.size, 1024),
                    maxSize: amisCore.prettyBytes(maxSize, 1024)
                }));
                return;
            }
            file.state = 'pending';
            file.id = amisCore.guid();
            if (!file.preview || !file.url) {
                file.preview = URL.createObjectURL(file);
            }
            inputFiles.push(file);
        });
        if (!inputFiles.length) {
            return;
        }
        var finalFiles = [];
        // 替换
        if (this.reuploadIndex !== undefined) {
            finalFiles = currentFiles.concat();
            // 因为单个文件重新上传也能选择多个，都插到一起
            finalFiles.splice.apply(finalFiles, tslib.__spreadArray([this.reuploadIndex, 1], tslib.__read(inputFiles), false));
            this.reuploadIndex = undefined;
        }
        else {
            finalFiles = currentFiles.concat(inputFiles);
        }
        this.setState({
            error: undefined,
            files: (this.files = finalFiles),
            locked: true
        }, function () {
            var autoUpload = _this_1.props.autoUpload;
            if (autoUpload) {
                _this_1.startUpload();
            }
        });
    };
    ImageControl.prototype.sendFile = function (file, cb, onProgress) {
        var _this_1 = this;
        var _a = this.props, limit = _a.limit, __ = _a.translate;
        if (!limit) {
            return this._upload(file, cb, onProgress);
        }
        var image = new Image();
        image.onload = function () { return tslib.__awaiter(_this_1, void 0, void 0, function () {
            var width, height, error, dispatcher;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        width = image.width;
                        height = image.height;
                        error = '';
                        if ((limit.width && limit.width != width) ||
                            (limit.height && limit.height != height)) {
                            error = __('Image.sizeNotEqual', {
                                info: ImageControl.sizeInfo(limit.width, limit.height, __)
                            });
                        }
                        else if ((limit.maxWidth && limit.maxWidth < width) ||
                            (limit.maxHeight && limit.maxHeight < height)) {
                            error = __('Image.limitMax', {
                                info: ImageControl.sizeInfo(limit.maxWidth, limit.maxHeight, __)
                            });
                        }
                        else if ((limit.minWidth && limit.minWidth > width) ||
                            (limit.minHeight && limit.minHeight > height)) {
                            error = __('Image.limitMin', {
                                info: ImageControl.sizeInfo(limit.minWidth, limit.minHeight, __)
                            });
                        }
                        else if (limit.aspectRatio &&
                            Math.abs(width / height - limit.aspectRatio) > 0.01) {
                            error = __(limit.aspectRatioLabel || 'Image.limitRatio', {
                                ratio: (+limit.aspectRatio).toFixed(2)
                            });
                        }
                        if (!error) return [3 /*break*/, 2];
                        file.state = 'invalid';
                        return [4 /*yield*/, this.dispatchEvent('fail', {
                                item: file,
                                error: error
                            })];
                    case 1:
                        dispatcher = _a.sent();
                        if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                            return [2 /*return*/];
                        }
                        cb(error, file);
                        return [3 /*break*/, 3];
                    case 2:
                        this._upload(file, cb, onProgress);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        image.src = (file.preview || file.url);
    };
    ImageControl.prototype._upload = function (file, cb, onProgress) {
        var _this_1 = this;
        var __ = this.props.translate;
        this._send(file, this.props.receiver, {}, onProgress)
            .then(function (ret) { return tslib.__awaiter(_this_1, void 0, void 0, function () {
            var obj, dispatcher;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (ret.status && ret.status !== '0') {
                            throw new Error(ret.msg || __('Image.errorRetry'));
                        }
                        obj = tslib.__assign(tslib.__assign({}, ret.data), { state: 'uploaded' });
                        obj.value = obj.value || obj.url;
                        return [4 /*yield*/, this.dispatchEvent('success', tslib.__assign(tslib.__assign({}, file), { item: file, result: ret.data, value: obj.value }))];
                    case 1:
                        dispatcher = _a.sent();
                        if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                            return [2 /*return*/];
                        }
                        cb(null, file, obj);
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (error) { return tslib.__awaiter(_this_1, void 0, void 0, function () {
            var dispatcher;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dispatchEvent('fail', {
                            item: file,
                            error: error
                        })];
                    case 1:
                        dispatcher = _a.sent();
                        if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                            return [2 /*return*/];
                        }
                        cb(error.message || __('Image.errorRetry'), file);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ImageControl.prototype._send = function (file, receiver, params, onProgress) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var fd, data, api, fileField, idx, env;
            var _this_1 = this;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fd = new FormData();
                        data = this.props.data;
                        api = amisCore.buildApi(receiver, amisCore.createObject(data, params), {
                            method: 'post'
                        });
                        fileField = this.props.fileField || 'file';
                        idx = api.url.indexOf('?');
                        if (~idx && params) {
                            params = tslib.__assign(tslib.__assign({}, amisCore.qsparse(api.url.substring(idx + 1))), params);
                            api.url = api.url.substring(0, idx) + '?' + amisCore.qsstringify(params);
                        }
                        else if (params) {
                            api.url += '?' + amisCore.qsstringify(params);
                        }
                        if (api.data) {
                            amisCore.qsstringify(api.data)
                                .split('&')
                                .filter(function (item) { return item !== ''; })
                                .forEach(function (item) {
                                var parts = item.split('=');
                                fd.append(parts[0], decodeURIComponent(parts[1]));
                            });
                        }
                        // Note: File类型字段放在后面，可以支持第三方云存储鉴权
                        fd.append(fileField, file, file.name || this.state.cropFileName);
                        api.data = fd;
                        env = this.props.env;
                        if (!env || !env.fetcher) {
                            throw new Error('fetcher is required');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, env.fetcher(api, this.props.data, {
                                method: 'post',
                                cancelExecutor: function (cancelExecutor) {
                                    // 记录取消器，取消的时候要调用
                                    _this_1.fileUploadCancelExecutors.push({
                                        file: file,
                                        executor: cancelExecutor
                                    });
                                },
                                onUploadProgress: function (event) {
                                    return onProgress(event.loaded / event.total);
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        this.removeFileCanelExecutor(file);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ImageControl.prototype.removeFileCanelExecutor = function (file, execute) {
        if (execute === void 0) { execute = false; }
        this.fileUploadCancelExecutors = this.fileUploadCancelExecutors.filter(function (item) {
            if (execute && item.file === file) {
                item.executor();
            }
            return item.file !== file;
        });
    };
    ImageControl.prototype.handleClick = function () {
        this.refs.dropzone.open();
    };
    ImageControl.prototype.handleImageLoaded = function (index, e) {
        var _this_1 = this;
        var imgDom = e.currentTarget;
        var img = new Image();
        img.onload = function () {
            delete img.onload;
            var files = _this_1.files.concat();
            var file = files[index];
            if (!file) {
                return;
            }
            file.info = tslib.__assign(tslib.__assign({}, file.info), { width: img.width, height: img.height });
            files.splice(index, 1, file);
            var needUploading = !!(_this_1.current || find__default["default"](files, function (file) { return file.state === 'pending'; }));
            _this_1.unmounted ||
                _this_1.setState({
                    files: (_this_1.files = files)
                }, function () {
                    if (!needUploading) {
                        _this_1.onChange(false, true, _this_1.props.initAutoFill);
                    }
                });
        };
        img.src = imgDom.src;
    };
    ImageControl.prototype.handleFrameImageLoaded = function (e) {
        var imgDom = e.currentTarget;
        var img = new Image();
        var clientHeight = this.frameImageRef.current.clientHeight;
        var _this = this;
        img.onload = function () {
            var ratio = this.width / this.height;
            var finalWidth = (ratio * (clientHeight - 2)).toFixed(2);
            _this.setState({
                frameImageWidth: +finalWidth
            });
        };
        img.src = imgDom.src;
    };
    ImageControl.prototype.validate = function () {
        var _this_1 = this;
        var _a = this.props; _a.translate; var multiple = _a.multiple;
        if (this.state.error) {
            this.setState({
                error: ''
            });
        }
        if (this.state.locked && this.state.lockedReason) {
            return this.state.lockedReason;
        }
        else if (this.state.cropFile) {
            return new Promise(function (resolve) {
                _this_1.resolve = resolve;
                _this_1.handleCrop();
            });
        }
        else if (this.state.uploading ||
            this.files.some(function (item) { return item.state === 'pending'; })) {
            return new Promise(function (resolve) {
                _this_1.resolve = resolve;
                _this_1.startUpload();
            });
        }
        else if (multiple &&
            this.files.some(function (i) { return i.state && ['error', 'invalid'].includes(i.state); })) {
            return ' ';
        }
    };
    ImageControl.prototype.dispatchEvent = function (e, data) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, multiple, getEventData, value;
            return tslib.__generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, multiple = _a.multiple;
                getEventData = function (item) { return ({
                    name: item.path || item.name,
                    value: item.value,
                    state: item.state,
                    error: item.error
                }); };
                value = data
                    ? getEventData(data)
                    : this.files.map(function (item) { return getEventData(item); });
                return [2 /*return*/, dispatchEvent(e, amisCore.resolveEventData(this.props, tslib.__assign(tslib.__assign({}, data), { file: multiple ? value : value === null || value === void 0 ? void 0 : value[0] }), 'file'))];
            });
        });
    };
    // 动作
    ImageControl.prototype.doAction = function (action, data, throwErrors) {
        var onChange = this.props.onChange;
        if (action.actionType === 'clear') {
            this.files = [];
            onChange('');
        }
    };
    // 重新上传
    ImageControl.prototype.handleReSelect = function (index) {
        var _this_1 = this;
        this.reuploadIndex = index;
        this.setState({
            dropMultiple: false
        }, function () {
            _this_1.dropzone.current && _this_1.dropzone.current.open();
        });
    };
    ImageControl.prototype.dragTipRef = function (ref) {
        if (!this.dragTip && ref) {
            this.initDragging(ref.parentNode);
        }
        else if (this.dragTip && !ref) {
            this.destroyDragging();
        }
        this.dragTip = ref;
    };
    ImageControl.prototype.initDragging = function (dom) {
        var _this_1 = this;
        var ns = this.props.classPrefix;
        this.sortable = new Sortable__default["default"](dom, {
            group: "inputimages-".concat(this.id),
            animation: 150,
            handle: ".".concat(ns, "ImageControl-item [data-role=\"dragBar\"]"),
            ghostClass: "".concat(ns, "ImageControl-item--dragging"),
            onEnd: function (e) {
                // 没有移动
                if (e.newIndex === e.oldIndex) {
                    return;
                }
                // 换回来
                var parent = e.to;
                if (e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex > e.newIndex ? e.oldIndex + 1 : e.oldIndex]);
                }
                else {
                    parent.appendChild(e.item);
                }
                var files = _this_1.files.concat();
                files.splice(e.newIndex, 0, files.splice(e.oldIndex, 1)[0]);
                _this_1.setState({
                    files: (_this_1.files = files)
                }, function () { return _this_1.onChange(true); });
            }
        });
    };
    ImageControl.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    ImageControl.prototype.render = function () {
        var _this_1 = this;
        var _a = this.props, className = _a.className, cx = _a.classnames, disabled = _a.disabled, multiple = _a.multiple, capture = _a.capture, accept = _a.accept, maxLength = _a.maxLength, autoUpload = _a.autoUpload, hideUploadButton = _a.hideUploadButton, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio, reCropable = _a.reCropable, frameImage = _a.frameImage, fixedSize = _a.fixedSize, fixedSizeClassName = _a.fixedSizeClassName, uploadBtnText = _a.uploadBtnText; _a.maxSize; var render = _a.render, themeCss = _a.themeCss, id = _a.id, __ = _a.translate, draggable = _a.draggable, draggableTip = _a.draggableTip, env = _a.env;
        var _b = this.state, files = _b.files, error = _b.error, crop = _b.crop, uploading = _b.uploading, cropFile = _b.cropFile, frameImageWidth = _b.frameImageWidth, dropMultiple = _b.dropMultiple;
        var frameImageStyle = {};
        if (fixedSizeClassName && frameImageWidth && fixedSize) {
            frameImageStyle.width = frameImageWidth;
        }
        var filterFrameImage = amisCore.filter(frameImage, this.props.data, '| raw');
        var hasPending = files.some(function (file) { return file.state == 'pending'; });
        var enableDraggable = !!multiple && draggable && !disabled && !hasPending && files.length > 1;
        return (_J$X_("div", { className: cx("ImageControl", className, amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, this.props), { name: 'inputImageControlClassName', id: id, themeCss: themeCss }))) },
            cropFile ? (_J$X_("div", { className: cx('ImageControl-cropperWrapper') },
                _J$X_(React.Suspense, { fallback: _J$X_("div", null, "...") },
                    _J$X_(Cropper, tslib.__assign({}, crop, { onInitialized: function (instance) {
                            _this_1.cropper = instance;
                        }, src: cropFile.preview }))),
                _J$X_("div", { className: cx('ImageControl-croperToolbar') },
                    crop.rotatable && (_J$X_("a", { className: cx('ImageControl-cropRotatable'), onClick: this.rotatableCrop, "data-tooltip": __('rotate'), "data-position": "left" },
                        _J$X_(amisUi.Icon, { icon: "retry", className: "icon" }))),
                    _J$X_("a", { className: cx('ImageControl-cropCancel'), onClick: this.cancelCrop, "data-tooltip": __('cancel'), "data-position": "left" },
                        _J$X_(amisUi.Icon, { icon: "close", className: "icon" })),
                    _J$X_("a", { className: cx('ImageControl-cropConfirm'), onClick: this.handleCrop, "data-tooltip": __('confirm'), "data-position": "left" },
                        _J$X_(amisUi.Icon, { icon: "check", className: "icon" }))))) : (_J$X_(DropZone__default["default"], { key: "drop-zone", ref: this.dropzone, onDrop: this.handleDrop, onDropRejected: this.handleDropRejected, onFileDialogCancel: this.handleFileCancel, accept: accept, multiple: dropMultiple, disabled: disabled }, function (_a) {
                var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps, isDragActive = _a.isDragActive, isDragAccept = _a.isDragAccept, isDragReject = _a.isDragReject;
                return (_J$X_("div", tslib.__assign({}, getRootProps({
                    onClick: preventEvent,
                    onPaste: _this_1.handlePaste,
                    className: cx('ImageControl-dropzone', {
                        'is-disabled': disabled,
                        'is-empty': !files.length,
                        'is-active': isDragActive
                    })
                })),
                    _J$X_("input", tslib.__assign({}, getInputProps(), { capture: capture })),
                    isDragActive || isDragAccept || isDragReject ? (_J$X_("div", { className: cx('ImageControl-acceptTip', {
                            'is-accept': isDragAccept,
                            'is-reject': isDragReject
                        }) }, __('Image.dragDrop'))) : (_J$X_(React__default["default"].Fragment, null,
                        files && files.length ? (_J$X_("div", { className: cx('ImageControl-itemList') },
                            files.map(function (file, key) { return (_J$X_("div", { key: "".concat(_this_1.getFileKey(file), "-").concat(key), className: cx('ImageControl-item', {
                                    'is-uploaded': file.state !== 'uploading',
                                    'is-invalid': file.state === 'error' ||
                                        file.state === 'invalid'
                                }, fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : ''), style: frameImageStyle }, file.state === 'invalid' ||
                                file.state === 'error' ? (_J$X_(amisUi.TooltipWrapper, { placement: "top", tooltip: {
                                    content: file.error,
                                    disabled: !multiple && files.length === 1,
                                    tooltipBodyClassName: cx('ImageControl-item-errorTip')
                                }, trigger: "hover" },
                                _J$X_("div", { className: cx('Image--thumb') },
                                    _J$X_("div", { className: cx('Image-thumbWrap') },
                                        _J$X_("div", { className: cx('Image-thumb', 'ImageControl-filename') },
                                            _J$X_(amisUi.Icon, { icon: "image", className: "icon" }),
                                            _J$X_("span", { title: file.name ||
                                                    InputFile.getNameFromUrl(file.value || file.url) }, file.name ||
                                                InputFile.getNameFromUrl(file.value || file.url))),
                                        _J$X_("div", { className: cx('Image-overlay') },
                                            _J$X_("a", { "data-tooltip": __('File.repick'), "data-position": "bottom", onClick: _this_1.handleReSelect.bind(_this_1, key) },
                                                _J$X_(amisUi.Icon, { icon: "upload", className: "icon" })),
                                            !disabled ? (_J$X_("a", { "data-tooltip": __('Select.clear'), "data-position": "bottom", onClick: _this_1.removeFile.bind(_this_1, file, key) },
                                                _J$X_(amisUi.Icon, { icon: "remove", className: "icon" }))) : null))))) : file.state === 'uploading' ? (_J$X_(React__default["default"].Fragment, null,
                                _J$X_("a", { onClick: _this_1.removeFile.bind(_this_1, file, key), key: "clear", className: cx('ImageControl-itemClear'), "data-tooltip": __('Select.clear') },
                                    _J$X_(amisUi.Icon, { icon: "close", className: "icon" })),
                                _J$X_("div", { key: "info", className: cx('ImageControl-itemInfo', fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : '') },
                                    _J$X_("div", { className: cx('ImageControl-progress') },
                                        _J$X_("span", { style: {
                                                width: "".concat(Math.round(file.progress * 100), "%")
                                            }, className: cx('ImageControl-progressValue') })),
                                    _J$X_("p", null, __('File.uploading'))))) : (_J$X_(React__default["default"].Fragment, null,
                                _J$X_(Image$1["default"], { key: "image", className: cx('ImageControl-image', fixedSize ? 'Image-thumb--fixed-size' : ''), onLoad: _this_1.handleImageLoaded.bind(_this_1, key), src: file.preview || file.url, alt: file.name, thumbMode: thumbMode, thumbRatio: thumbRatio, overlays: _J$X_(React__default["default"].Fragment, null,
                                        enableDraggable ? (_J$X_("a", { "data-role": "dragBar", "data-tooltip": __(draggableTip || 'Image.dragTip'), "data-position": "bottom", target: "_blank", rel: "noopener" },
                                            _J$X_(amisUi.Icon, { icon: "drag-bar", className: "icon" }))) : null,
                                        _J$X_("a", { "data-tooltip": __('Image.zoomIn'), "data-position": "bottom", target: "_blank", rel: "noopener", href: file.url || file.preview, onClick: _this_1.previewImage.bind(_this_1, file, key) },
                                            _J$X_(amisUi.Icon, { icon: "view", className: "icon" })),
                                        !!crop &&
                                            reCropable !== false &&
                                            !disabled ? (_J$X_("a", { "data-tooltip": __('Image.crop'), "data-position": "bottom", onClick: _this_1.editImage.bind(_this_1, key) },
                                            _J$X_(amisUi.Icon, { icon: "pencil", className: "icon" }))) : null,
                                        !disabled ? (_J$X_("a", { "data-tooltip": __('Select.upload'), "data-position": "bottom", onClick: function () {
                                                return _this_1.handleReSelect(key);
                                            } },
                                            _J$X_(amisUi.Icon, { icon: "upload", className: "icon" }))) : null,
                                        !disabled ? (_J$X_("a", { "data-tooltip": __('Select.clear'), "data-position": "bottom", onClick: _this_1.removeFile.bind(_this_1, file, key) },
                                            _J$X_(amisUi.Icon, { icon: "remove", className: "icon" }))) : null) }))))); }),
                            enableDraggable ? (_J$X_("span", { ref: _this_1.dragTipRef })) : null)) : null,
                        (multiple && (!maxLength || files.length < maxLength)) ||
                            (!multiple && !files.length) ? (_J$X_(amisUi.TooltipWrapper, { placement: "top", trigger: "hover", tooltip: {
                                content: error,
                                disabled: !multiple || !error
                            } },
                            _J$X_("label", { className: cx('ImageControl-addBtn', {
                                    'is-disabled': disabled
                                }, fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : '', amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, _this_1.props), { name: 'addBtnControlClassName', id: id, themeCss: themeCss })), amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, _this_1.props), { name: 'addBtnControlClassName', id: id, themeCss: formatIconThemeCss(themeCss), extra: 'icon' })), error ? 'is-invalid' : ''), style: frameImageStyle, onClick: _this_1.handleSelect, ref: _this_1.frameImageRef },
                                _J$X_(amisUi.Icon, { icon: "plus-fine", className: "icon", iconContent: cx(':ImageControl-addBtn-icon', amisCore.setThemeClassName(tslib.__assign(tslib.__assign({}, _this_1.props), { name: 'iconControlClassName', id: id, themeCss: themeCss }))) }),
                                _J$X_("span", { className: cx('ImageControl-addBtn-text') }, !uploadBtnText
                                    ? __('Image.upload')
                                    : render("btn-upload-text", uploadBtnText, {})),
                                filterFrameImage ? (_J$X_("div", { className: cx('ImageControl-addBtn-bg') },
                                    _J$X_(Image$1["default"], { key: "upload-default-image", src: filterFrameImage, className: cx(fixedSize ? 'Image-thumb--fixed-size' : ''), onLoad: _this_1.handleFrameImageLoaded.bind(_this_1), thumbMode: thumbMode, thumbRatio: thumbRatio }))) : null))) : null,
                        !autoUpload && !hideUploadButton && files.length ? (_J$X_(amisUi.Button, { level: "default", className: cx('ImageControl-uploadBtn'), disabled: !hasPending, onClick: _this_1.toggleUpload }, __(uploading ? 'File.pause' : 'File.start'))) : null,
                        error ? (_J$X_("div", { className: cx('ImageControl-errorMsg') }, error)) : null))));
            })),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'inputImageControlClassName'
                        },
                        {
                            key: 'addBtnControlClassName',
                            weights: {
                                hover: {
                                    suf: ':not(:disabled):not(.is-disabled)'
                                },
                                active: {
                                    suf: ':not(:disabled):not(.is-disabled)'
                                }
                            }
                        },
                        {
                            key: 'iconControlClassName',
                            weights: {
                                default: {
                                    suf: ' svg'
                                }
                            }
                        }
                    ],
                    id: id
                }, env: env })),
            _J$X_(amisCore.CustomStyle, tslib.__assign({}, this.props, { config: {
                    themeCss: formatIconThemeCss(themeCss),
                    classNames: [
                        {
                            key: 'addBtnControlClassName',
                            weights: {
                                default: {
                                    inner: 'svg'
                                },
                                hover: {
                                    suf: ':not(:disabled):not(.is-disabled)',
                                    inner: 'svg'
                                },
                                active: {
                                    suf: ':not(:disabled):not(.is-disabled)',
                                    inner: 'svg'
                                }
                            }
                        }
                    ],
                    id: id && id + '-icon'
                }, env: env }))));
    };
    ImageControl.defaultProps = {
        limit: undefined,
        accept: 'image/jpeg, image/jpg, image/png, image/gif',
        receiver: '/api/upload',
        hideUploadButton: false,
        placeholder: 'Image.placeholder',
        placeholderPlacement: 'top',
        joinValues: true,
        extractValue: false,
        delimiter: ',',
        autoUpload: true,
        multiple: false,
        capture: undefined,
        dropCrop: true,
        initAutoFill: true
    };
    return ImageControl;
}(React__default["default"].Component));
var ImageControlRenderer = /** @class */ (function (_super) {
    tslib.__extends(ImageControlRenderer, _super);
    function ImageControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageControlRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'input-image',
            sizeMutable: false,
            shouldComponentUpdate: function (props, prevProps) {
                return !!amisCore.isEffectiveApi(props.receiver, props.data) &&
                    (amisCore.isApiOutdated(props.receiver, prevProps.receiver, props.data, prevProps.data) ||
                        amisCore.isApiOutdatedWithData(props.receiver, prevProps.receiver, props.data, prevProps.data));
            }
        })
    ], ImageControlRenderer);
    return ImageControlRenderer;
}(ImageControl));

exports.ImageControlRenderer = ImageControlRenderer;
exports["default"] = ImageControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
