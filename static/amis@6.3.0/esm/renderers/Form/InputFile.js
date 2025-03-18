/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __awaiter, __generator, __decorate } from 'tslib';
import React from 'react';
import { guid, createObject, normalizeApi, buildApi, isEmpty, dataMapping, qsstringify, resolveEventData, prettyBytes, filter, FormItem, isEffectiveApi, isApiOutdated, isApiOutdatedWithData } from 'amis-core';
import find from 'lodash/find';
import isPlainObject from 'lodash/isPlainObject';
import { Icon, Button, TooltipWrapper } from 'amis-ui';
import DropZone from 'react-dropzone';
import merge from 'lodash/merge';
import omit from 'lodash/omit';

var preventEvent = function (e) { return e.stopPropagation(); };
function getNameFromUrl(url) {
    if (/(?:\/|^)([^\/]+?)$/.test(url)) {
        return decodeURIComponent(RegExp.$1);
    }
    return url;
}
var FileControl = /** @class */ (function (_super) {
    __extends(FileControl, _super);
    function FileControl(props) {
        var _this = _super.call(this, props) || this;
        _this.fileUploadCancelExecutors = [];
        _this.initedFilled = false;
        _this.toDispose = [];
        _this.dropzone = React.createRef();
        var value = props.value;
        var valueField = props.valueField || 'value';
        var joinValues = props.joinValues;
        var delimiter = props.delimiter;
        var files = [];
        if (value && value instanceof Blob) {
            files = [value];
        }
        else if (value) {
            files = (Array.isArray(value)
                ? value
                : joinValues
                    ? "".concat(value[valueField] || value).split(delimiter)
                    : [value])
                .map(function (item) { return FileControl.valueToFile(item, props); })
                .filter(function (item) { return item; });
        }
        _this.state = {
            files: files,
            uploading: false
        };
        _this.sendFile = _this.sendFile.bind(_this);
        _this.removeFile = _this.removeFile.bind(_this);
        _this.clearError = _this.clearError.bind(_this);
        _this.handleDrop = _this.handleDrop.bind(_this);
        _this.handleDropRejected = _this.handleDropRejected.bind(_this);
        _this.startUpload = _this.startUpload.bind(_this);
        _this.stopUpload = _this.stopUpload.bind(_this);
        _this.retry = _this.retry.bind(_this);
        _this.toggleUpload = _this.toggleUpload.bind(_this);
        _this.tick = _this.tick.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.uploadFile = _this.uploadFile.bind(_this);
        _this.uploadBigFile = _this.uploadBigFile.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.syncAutoFill = _this.syncAutoFill.bind(_this);
        _this.downloadTpl = _this.downloadTpl.bind(_this);
        return _this;
    }
    FileControl.valueToFile = function (value, props, files) {
        var _a, _b;
        var file = files && typeof value === 'string'
            ? find(files, function (item) { return item.value === value; })
            : undefined;
        var valueField = props.valueField || 'value';
        var urlField = props.urlField || 'url';
        var nameField = props.nameField || 'name';
        return value
            ? value instanceof File
                ? (_a = {
                        state: 'ready'
                    },
                    _a[valueField] = value,
                    _a[urlField] = value,
                    _a[nameField] = value.name,
                    _a.id = guid(),
                    _a) : __assign({}, (typeof value === 'string'
                ? (_b = {
                        state: file && file.state ? file.state : 'init'
                    },
                    _b[valueField] = value,
                    _b[urlField] = value,
                    _b[nameField] = (file && file.name) ||
                        (/^data:/.test(value)
                            ? 'base64数据'
                            : getNameFromUrl(value)),
                    _b.id = guid(),
                    _b) : value))
            : undefined;
    };
    FileControl.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, formInited = _a.formInited, addHook = _a.addHook, formItem = _a.formItem;
        var onInited = function () {
            _this.initedFilled = true;
            _this.props.initAutoFill && _this.syncAutoFill();
        };
        formItem &&
            this.toDispose.push(formInited || !addHook
                ? formItem.addInitHook(onInited)
                : addHook(onInited, 'init'));
    };
    FileControl.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var props = this.props;
        if (prevProps.value !== props.value && this.emitValue !== props.value) {
            var value = props.value;
            var joinValues = props.joinValues;
            var delimiter = props.delimiter;
            var files = [];
            if (value) {
                files = (Array.isArray(value)
                    ? value
                    : joinValues && typeof value === 'string'
                        ? value.split(delimiter)
                        : [value])
                    .map(function (item) {
                    var obj = FileControl.valueToFile(item, props, _this.state.files);
                    var org;
                    if (obj &&
                        (org = find(_this.state.files, function (item) { return item.value === obj.value; }))) {
                        obj = __assign(__assign(__assign({}, org), obj), { id: obj.id || org.id });
                    }
                    return obj;
                })
                    .filter(function (item) { return item; });
            }
            this.setState({
                files: files
            }, props.changeMotivation !== 'formInited' && this.initedFilled
                ? this.syncAutoFill
                : undefined);
        }
    };
    FileControl.prototype.componentWillUnmount = function () {
        this.toDispose.forEach(function (fn) { return fn(); });
        this.toDispose = [];
        this.fileUploadCancelExecutors.forEach(function (item) { return item.executor(); });
        this.fileUploadCancelExecutors = [];
    };
    FileControl.prototype.handleDrop = function (files) {
        var _this = this;
        if (!files.length) {
            return;
        }
        var _a = this.props, maxSize = _a.maxSize, multiple = _a.multiple, maxLength = _a.maxLength; _a.translate;
        this.props.nameField || 'name';
        var allowed = multiple && maxLength
            ? maxLength - this.state.files.length
            : files.length;
        var inputFiles = [];
        [].slice.call(files, 0, allowed).forEach(function (file) {
            if (maxSize && file.size > maxSize) {
                // this.props.env.alert(
                //   __('File.maxSize', {
                //     filename: file[nameField as keyof typeof file] || file.name,
                //     actualSize: prettyBytes(file.size),
                //     maxSize: prettyBytes(maxSize)
                //   })
                // );
                file.state = 'invalid';
            }
            else {
                file.state = 'pending';
            }
            file.id = guid();
            inputFiles.push(file);
        });
        if (!inputFiles.length) {
            return;
        }
        this.setState({
            error: null,
            files: multiple ? this.state.files.concat(inputFiles) : inputFiles
        }, function () {
            var autoUpload = _this.props.autoUpload;
            if (autoUpload) {
                _this.startUpload();
            }
        });
    };
    FileControl.prototype.handleDropRejected = function (rejectedFiles, evt) {
        if (evt.type !== 'change' && evt.type !== 'drop') {
            return;
        }
        var _a = this.props; _a.multiple; var env = _a.env, accept = _a.accept, __ = _a.translate;
        var nameField = this.props.nameField || 'name';
        var files = rejectedFiles.map(function (fileRejection) {
            var _a;
            return (__assign(__assign({}, fileRejection.file), (_a = { state: 'invalid', id: guid() }, _a[nameField] = fileRejection.file.name, _a)));
        });
        // this.setState({
        //   files: multiple
        //     ? this.state.files.concat(files)
        //     : this.state.files.length
        //     ? this.state.files
        //     : files.slice(0, 1)
        // });
        env.alert(__('File.invalidType', {
            files: files.map(function (item) { return "\u300C".concat(item[nameField], "\u300D"); }).join(' '),
            accept: accept
        }));
    };
    FileControl.prototype.handleClickFile = function (file, e) {
        e.preventDefault();
        e.stopPropagation();
        var downloadUrl = this.props.downloadUrl;
        var urlField = this.props.urlField || 'url';
        var valueField = this.props.valueField || 'value';
        var fileUrl = file[urlField] ||
            file[valueField];
        var api = typeof downloadUrl === 'string' &&
            !~downloadUrl.indexOf('$') &&
            typeof fileUrl === 'string'
            ? "".concat(downloadUrl).concat(fileUrl)
            : downloadUrl
                ? downloadUrl
                : undefined;
        api && this.handleApi(api, file);
    };
    FileControl.prototype.downloadTpl = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.handleApi(this.props.templateUrl || '');
    };
    FileControl.prototype.handleApi = function (api, payload) {
        var _a, _b;
        var _c = this.props, data = _c.data, env = _c.env;
        if (api) {
            var ctx = createObject(data, __assign({}, payload));
            var apiObject = normalizeApi(api);
            if (((_a = apiObject.method) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'get' && !apiObject.data) {
                window.open(buildApi(apiObject, ctx).url);
            }
            else {
                apiObject.responseType = (_b = apiObject.responseType) !== null && _b !== void 0 ? _b : 'blob';
                env.fetcher(apiObject, ctx, {
                    responseType: 'blob'
                });
            }
        }
    };
    FileControl.prototype.handleSelect = function () {
        var _a = this.props, disabled = _a.disabled, multiple = _a.multiple, maxLength = _a.maxLength;
        !disabled &&
            !(multiple && maxLength && this.state.files.length >= maxLength) &&
            this.dropzone.current &&
            this.dropzone.current.open();
    };
    FileControl.prototype.startUpload = function (retry) {
        if (retry === void 0) { retry = false; }
        if (this.state.uploading) {
            return;
        }
        this.setState({
            uploading: true,
            files: this.state.files.map(function (file) {
                if (retry && file.state === 'error') {
                    file.state = 'pending';
                    file.progress = 0;
                }
                return file;
            })
        }, this.tick);
    };
    FileControl.prototype.toggleUpload = function (e) {
        e.preventDefault();
        return this.state.uploading ? this.stopUpload() : this.startUpload();
    };
    FileControl.prototype.stopUpload = function () {
        if (!this.state.uploading) {
            return;
        }
        this.setState({
            uploading: false
        });
    };
    FileControl.prototype.retry = function () {
        this.startUpload(true);
    };
    FileControl.prototype.tick = function () {
        var _this = this;
        if (this.current || !this.state.uploading) {
            return;
        }
        var __ = this.props.translate;
        var nameField = this.props.nameField || 'name';
        var file = find(this.state.files, function (item) { return item.state === 'pending'; });
        if (file) {
            this.current = file;
            file.state = 'uploading';
            this.setState({
                files: this.state.files.concat()
            }, function () {
                return _this.sendFile(file, function (error, file, obj) {
                    var files = _this.state.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    var newFile = file;
                    if (error) {
                        newFile.state = 'error';
                        newFile.error = error;
                    }
                    else {
                        newFile = obj;
                        newFile[nameField] = newFile[nameField] || file.name;
                    }
                    files.splice(idx, 1, newFile);
                    _this.current = null;
                    _this.setState({
                        error: error ? error : null,
                        files: files
                    }, _this.tick);
                }, function (progress) {
                    var files = _this.state.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    // file 是个非 File 对象，先不copy了直接改。
                    file.progress = progress;
                    _this.setState({
                        files: files
                    });
                });
            });
        }
        else {
            this.setState({
                uploading: false
            }, function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.onChange(!!this.resolve)];
                        case 1:
                            _a.sent();
                            if (this.resolve) {
                                this.resolve(this.state.files.some(function (file) { return file.state === 'error'; })
                                    ? __('File.errorRetry')
                                    : null);
                                this.resolve = undefined;
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    FileControl.prototype.sendFile = function (file, cb, onProgress) {
        var _this = this;
        var _a = this.props, receiver = _a.receiver, fileField = _a.fileField, useChunk = _a.useChunk, chunkSize = _a.chunkSize, startChunkApi = _a.startChunkApi, chunkApi = _a.chunkApi, finishChunkApi = _a.finishChunkApi, asBase64 = _a.asBase64, asBlob = _a.asBlob, data = _a.data, __ = _a.translate;
        var nameField = this.props.nameField || 'name';
        var valueField = this.props.valueField || 'value';
        if (asBase64) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(file);
            reader_1.onload = function () {
                var _a;
                file.state = 'ready';
                cb(null, file, (_a = {},
                    _a[valueField] = reader_1.result,
                    _a[nameField] = file.name,
                    _a.state = 'ready',
                    _a.id = file.id,
                    _a));
            };
            reader_1.onerror = function (error) { return cb(error.message); };
            return;
        }
        else if (asBlob) {
            file.state = 'ready';
            setTimeout(function () {
                var _a;
                return cb(null, file, (_a = {},
                    _a[nameField] = file.name,
                    _a[valueField] = file,
                    _a.state = 'ready',
                    _a.id = file.id,
                    _a));
            }, 4);
            return;
        }
        var fn = (useChunk === 'auto' && chunkSize && file.size > chunkSize) ||
            useChunk === true
            ? this.uploadBigFile
            : this.uploadFile;
        fn(file, receiver, {}, {
            fieldName: fileField,
            chunkSize: chunkSize,
            startChunkApi: startChunkApi,
            chunkApi: chunkApi,
            finishChunkApi: finishChunkApi,
            data: data
        }, onProgress)
            .then(function (ret) { return __awaiter(_this, void 0, void 0, function () {
            var value, dispatcher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((ret.status && ret.status !== '0') || !ret.data) {
                            throw new Error(ret.msg || __('File.errorRetry'));
                        }
                        onProgress(1);
                        value = ret.data.value || ret.data.url || ret.data;
                        return [4 /*yield*/, this.dispatchEvent('success', __assign(__assign({}, file), { item: file, result: ret.data, value: value }))];
                    case 1:
                        dispatcher = _a.sent();
                        if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                            return [2 /*return*/];
                        }
                        cb(null, file, __assign(__assign({}, (isPlainObject(ret.data) ? ret.data : null)), { value: value, state: 'uploaded', id: file.id }));
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
            var dispatcher;
            return __generator(this, function (_a) {
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
                        cb(error.message || __('File.errorRetry'), file);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    FileControl.prototype.removeFile = function (file, index) {
        return __awaiter(this, void 0, void 0, function () {
            var files, removeFile, dispatcher, isUploading;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = this.state.files.concat();
                        removeFile = files[index];
                        return [4 /*yield*/, this.dispatchEvent('remove', __assign(__assign({}, removeFile), { item: removeFile }))];
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
                            files: files
                        }, isUploading ? this.tick : this.onChange);
                        return [2 /*return*/];
                }
            });
        });
    };
    FileControl.prototype.clearError = function () {
        this.setState({
            error: null
        });
    };
    FileControl.prototype.onChange = function (changeImmediately) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, multiple, onChange, joinValues, extractValue, valueField, delimiter, resetValue, asBlob, files, value, dispatcher;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, multiple = _a.multiple, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, delimiter = _a.delimiter, resetValue = _a.resetValue, asBlob = _a.asBlob, _a.autoFill, _a.onBulkChange;
                        files = this.state.files.filter(function (file) { return ~['uploaded', 'init', 'ready'].indexOf(file.state); });
                        value = multiple ? files : files[0];
                        if (value) {
                            if (extractValue || asBlob) {
                                value = Array.isArray(value)
                                    ? value.map(function (item) { return item[valueField || 'value']; })
                                    : value[valueField || 'value'];
                            }
                            else if (joinValues) {
                                value = Array.isArray(value)
                                    ? value
                                        .map(function (item) { return item[valueField || 'value']; })
                                        .join(delimiter || ',')
                                    : value[valueField || 'value'];
                            }
                        }
                        else {
                            value = typeof resetValue === 'undefined' ? '' : resetValue;
                        }
                        return [4 /*yield*/, this.dispatchEvent('change')];
                    case 1:
                        dispatcher = _b.sent();
                        if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                            return [2 /*return*/];
                        }
                        onChange((this.emitValue = value), undefined, changeImmediately);
                        this.syncAutoFill();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileControl.prototype.syncAutoFill = function () {
        var _a = this.props, autoFill = _a.autoFill, multiple = _a.multiple, onBulkChange = _a.onBulkChange, data = _a.data, name = _a.name;
        // 参照录入｜自动填充
        if (autoFill === null || autoFill === void 0 ? void 0 : autoFill.hasOwnProperty('api')) {
            return;
        }
        // 排除自身的字段，否则会无限更新state
        var excludeSelfAutoFill = omit(autoFill, name || '');
        if (!isEmpty(excludeSelfAutoFill) && onBulkChange) {
            var files = this.state.files.filter(function (file) { return ~['uploaded', 'init', 'ready'].indexOf(file.state); });
            var toSync_1 = dataMapping(excludeSelfAutoFill, createObject(data, multiple
                ? {
                    items: files
                }
                : files[0]));
            Object.keys(toSync_1).forEach(function (key) {
                if (isPlainObject(toSync_1[key]) && isPlainObject(data[key])) {
                    toSync_1[key] = merge({}, data[key], toSync_1[key]);
                }
            });
            onBulkChange(toSync_1);
        }
    };
    FileControl.prototype.uploadFile = function (file, receiver, params, config, onProgress) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var fd, api;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fd = new FormData();
                        api = buildApi(receiver, createObject(config.data, params), {
                            method: 'post'
                        });
                        qsstringify(__assign(__assign({}, api.data), params))
                            .split('&')
                            .filter(function (i) { return !!i; })
                            .forEach(function (item) {
                            var parts = item.split('=');
                            fd.append(parts[0], decodeURIComponent(parts[1]));
                        });
                        // Note: File类型字段放在后面，可以支持第三方云存储鉴权
                        fd.append(config.fieldName || 'file', file);
                        api.data = fd;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, this._send(file, api, {}, onProgress)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        this.removeFileCanelExecutor(file);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileControl.prototype.uploadBigFile = function (file, receiver, params, config, onProgress) {
        if (config === void 0) { config = {}; }
        var chunkSize = config.chunkSize || 5 * 1024 * 1024;
        var concurrency = this.props.concurrency;
        var self = this;
        var startProgress = 0.2;
        var endProgress = 0.9;
        var progressArr;
        var __ = this.props.translate;
        var nameField = this.props.nameField || 'name';
        return new Promise(function (resolve, reject) {
            var _a;
            var state;
            var startApi = buildApi(config.startChunkApi, createObject(config.data, __assign(__assign({}, params), (_a = { filename: file.name }, _a[nameField] = file.name, _a))), {
                method: 'post',
                autoAppend: true
            });
            self._send(file, startApi).then(startChunk).catch(reject);
            function startChunk(ret) {
                return __awaiter(this, void 0, void 0, function () {
                    var tasks, results, res;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                onProgress(startProgress);
                                tasks = getTasks(file);
                                progressArr = tasks.map(function () { return 0; });
                                if (!ret.data) {
                                    throw new Error(__('File.uploadFailed'));
                                }
                                state = {
                                    key: ret.data.key,
                                    uploadId: ret.data.uploadId,
                                    loaded: 0,
                                    total: tasks.length
                                };
                                results = [];
                                _a.label = 1;
                            case 1:
                                if (!tasks.length) return [3 /*break*/, 3];
                                return [4 /*yield*/, Promise.all(tasks.splice(0, concurrency).map(function (task) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, uploadPartFile(state, config)(task)];
                                                case 1: return [2 /*return*/, _a.sent()];
                                            }
                                        });
                                    }); }))];
                            case 2:
                                res = _a.sent();
                                results = results.concat(res);
                                return [3 /*break*/, 1];
                            case 3:
                                finishChunk(results, state);
                                return [2 /*return*/];
                        }
                    });
                });
            }
            function updateProgress(partNumber, progress) {
                progressArr[partNumber - 1] = progress;
                onProgress(startProgress +
                    (endProgress - startProgress) *
                        (progressArr.reduce(function (count, progress) { return count + progress; }, 0) /
                            progressArr.length));
            }
            function finishChunk(partList, state) {
                return __awaiter(this, void 0, void 0, function () {
                    var endApi, ret, err_1;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                onProgress(endProgress);
                                endApi = buildApi(config.finishChunkApi, createObject(config.data, __assign(__assign({}, params), (_a = { uploadId: state.uploadId, key: state.key }, _a[nameField] = file.name, _a.filename = file.name, _a.partList = partList, _a))), {
                                    method: 'post',
                                    autoAppend: true
                                });
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, 4, 5]);
                                return [4 /*yield*/, self._send(file, endApi)];
                            case 2:
                                ret = _b.sent();
                                resolve(ret);
                                return [3 /*break*/, 5];
                            case 3:
                                err_1 = _b.sent();
                                reject(err_1);
                                return [3 /*break*/, 5];
                            case 4:
                                self.removeFileCanelExecutor(file);
                                return [7 /*endfinally*/];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            }
            function uploadPartFile(state, conf) {
                return function (task) {
                    var api = buildApi(conf.chunkApi, createObject(config.data, params), {
                        method: 'post'
                    });
                    var fd = new FormData();
                    var blob = task.file.slice(task.start, task.stop + 1);
                    qsstringify(__assign(__assign({}, api.data), params))
                        .split('&')
                        .forEach(function (item) {
                        var parts = item.split('=');
                        fd.append(parts[0], decodeURIComponent(parts[1]));
                    });
                    fd.append('key', state.key);
                    fd.append('uploadId', state.uploadId);
                    fd.append('partNumber', task.partNumber.toString());
                    fd.append('partSize', task.partSize.toString());
                    // Note: File类型字段放在后面，可以支持第三方云存储鉴权
                    fd.append(config.fieldName || 'file', blob, file.name);
                    api.data = fd;
                    return self
                        ._send(file, api, {}, function (progress) { return updateProgress(task.partNumber, progress); }, 3)
                        .then(function (ret) {
                        state.loaded++;
                        return {
                            partNumber: task.partNumber,
                            eTag: ret.data.eTag
                        };
                    });
                };
            }
            function getTasks(file) {
                var leftSize = file.size;
                var offset = 0;
                var partNumber = 1;
                var tasks = [];
                while (leftSize > 0) {
                    var partSize = Math.min(leftSize, chunkSize);
                    tasks.push({
                        file: file,
                        partNumber: partNumber,
                        partSize: partSize,
                        start: offset,
                        stop: offset + partSize - 1
                    });
                    leftSize -= partSize;
                    offset += partSize;
                    partNumber += 1;
                }
                return tasks;
            }
        });
    };
    FileControl.prototype._send = function (file, api, options, onProgress, maxRetryLimit) {
        if (maxRetryLimit === void 0) { maxRetryLimit = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var env, __, result, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        env = this.props.env;
                        __ = this.props.translate;
                        if (!env || !env.fetcher) {
                            throw new Error('fetcher is required');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, env.fetcher(api, this.props.data, __assign(__assign({ method: 'post' }, options), { withCredentials: true, cancelExecutor: function (cancelExecutor) {
                                    // 记录取消器，取消的时候要调用
                                    _this.fileUploadCancelExecutors.push({
                                        file: file,
                                        executor: cancelExecutor
                                    });
                                }, onUploadProgress: onProgress
                                    ? function (event) {
                                        return onProgress(event.loaded / event.total);
                                    }
                                    : undefined }))];
                    case 2:
                        result = _a.sent();
                        if (!result.ok) {
                            throw new Error(result.msg || __('File.errorRetry'));
                        }
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        if (maxRetryLimit > 0) {
                            return [2 /*return*/, this._send(file, api, options, onProgress, maxRetryLimit - 1)];
                        }
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileControl.prototype.removeFileCanelExecutor = function (file, execute) {
        if (execute === void 0) { execute = false; }
        this.fileUploadCancelExecutors = this.fileUploadCancelExecutors.filter(function (item) {
            if (execute && item.file === file) {
                item.executor();
            }
            return item.file !== file;
        });
    };
    FileControl.prototype.validate = function () {
        var _this = this;
        var __ = this.props.translate;
        if (this.state.uploading ||
            this.state.files.some(function (item) { return item.state === 'pending'; })) {
            return new Promise(function (resolve) {
                _this.resolve = resolve;
                _this.startUpload();
            });
        }
        else if (this.state.files.some(function (item) { return item.state === 'error'; })) {
            return __('File.errorRetry');
        }
    };
    FileControl.prototype.dispatchEvent = function (e, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, multiple, getEventData, value;
            return __generator(this, function (_b) {
                _a = this.props, dispatchEvent = _a.dispatchEvent, multiple = _a.multiple;
                getEventData = function (item) { return ({
                    name: item.path || item.name,
                    value: item.value,
                    state: item.state,
                    error: item.error
                }); };
                value = data
                    ? getEventData(data)
                    : this.state.files.map(function (item) { return getEventData(item); });
                return [2 /*return*/, dispatchEvent(e, resolveEventData(this.props, __assign(__assign({}, data), { file: multiple ? value : value === null || value === void 0 ? void 0 : value[0] }), 'file'))];
            });
        });
    };
    // 动作
    FileControl.prototype.doAction = function (action, data, throwErrors) {
        var onChange = this.props.onChange;
        if (action.actionType === 'clear') {
            this.setState({ files: [] }, function () {
                onChange('');
            });
        }
    };
    FileControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, btnLabel = _a.btnLabel, accept = _a.accept, capture = _a.capture, disabled = _a.disabled, maxLength = _a.maxLength, maxSize = _a.maxSize, multiple = _a.multiple, autoUpload = _a.autoUpload, description = _a.description, descriptionClassName = _a.descriptionClassName, hideUploadButton = _a.hideUploadButton, className = _a.className; _a.style; var btnClassName = _a.btnClassName, btnUploadClassName = _a.btnUploadClassName, cx = _a.classnames, __ = _a.translate, render = _a.render, downloadUrl = _a.downloadUrl, templateUrl = _a.templateUrl, drag = _a.drag, data = _a.data, documentation = _a.documentation, documentLink = _a.documentLink, env = _a.env, container = _a.container, testIdBuilder = _a.testIdBuilder;
        var _b = this.state, files = _b.files, uploading = _b.uploading; _b.error;
        var nameField = this.props.nameField || 'name';
        var valueField = this.props.valueField || 'value';
        var urlField = this.props.urlField || 'url';
        var hasPending = files.some(function (file) { return file.state == 'pending'; });
        var uploaded = 0;
        var failed = 0;
        this.state.uploading ||
            this.state.files.forEach(function (item) {
                if (item.state === 'error') {
                    failed++;
                }
                else if (item.state === 'uploaded') {
                    uploaded++;
                }
            });
        return (React.createElement("div", { className: cx('FileControl', className) },
            templateUrl ? (React.createElement("a", { className: cx('FileControl-templateInfo'), onClick: this.downloadTpl.bind(this) },
                React.createElement(Icon, { icon: "download", className: "icon" }),
                React.createElement("span", null, __('File.downloadTpl')))) : null,
            React.createElement(DropZone, { disabled: disabled, key: "drop-zone", ref: this.dropzone, onDrop: this.handleDrop, onDropRejected: this.handleDropRejected, accept: accept === '*' ? '' : accept, multiple: multiple }, function (_a) {
                var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps, isDragActive = _a.isDragActive;
                return (React.createElement("div", __assign({}, getRootProps({
                    onClick: preventEvent
                }), { className: cx('FileControl-dropzone', {
                        'disabled': disabled ||
                            (multiple && !!maxLength && files.length >= maxLength),
                        'is-empty': !files.length,
                        'is-active': isDragActive
                    }) }),
                    React.createElement("input", __assign({ disabled: disabled }, getInputProps(), { capture: capture }, testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('input').getTestId())),
                    drag || isDragActive ? (React.createElement("div", { className: cx('FileControl-acceptTip'), onClick: _this.handleSelect },
                        React.createElement(Icon, { icon: "cloud-upload", className: "icon" }),
                        React.createElement("span", null,
                            __('File.dragDrop'),
                            React.createElement("span", { className: cx('FileControl-acceptTip-click') }, __('File.clickUpload'))),
                        React.createElement("div", { className: cx('FileControl-acceptTip-help', 'TplField') }, documentLink ? (React.createElement("a", { href: documentLink, onClick: function (e) { return e.stopPropagation(); } }, documentation ? documentation : __('File.helpText'))) : null),
                        maxSize ? (React.createElement("div", { className: cx('FileControl-sizeTip') }, __('File.sizeLimit', {
                            maxSize: prettyBytes(maxSize, 1024)
                        }))) : null)) : (React.createElement(React.Fragment, null,
                        React.createElement(Button, { level: "enhance", disabled: disabled, className: cx('FileControl-selectBtn', btnClassName, {
                                'is-disabled': multiple && !!maxLength && files.length >= maxLength
                            }), tooltip: multiple && maxLength && files.length >= maxLength
                                ? __('File.maxLength', { maxLength: maxLength })
                                : '', onClick: _this.handleSelect, testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('select') },
                            React.createElement(Icon, { icon: "upload", className: "icon" }),
                            React.createElement("span", null, !multiple && files.length
                                ? __('File.repick')
                                : multiple && files.length
                                    ? __('File.continueAdd')
                                    : filter(btnLabel, data) || __('File.upload')))))));
            }),
            description
                ? render('desc', description, {
                    className: cx('FileControl-description', descriptionClassName)
                })
                : null,
            maxSize && !drag ? (React.createElement("div", { className: cx('FileControl-sizeTip') }, __('File.sizeLimit', { maxSize: prettyBytes(maxSize, 1024) }))) : null,
            Array.isArray(files) ? (React.createElement("ul", { className: cx('FileControl-list') }, files.map(function (file, index) {
                var filename = file[nameField] ||
                    file.filename ||
                    file.name;
                return (React.createElement("li", { key: file.id },
                    React.createElement(TooltipWrapper, { placement: "top", container: container || (env === null || env === void 0 ? void 0 : env.getModalContainer), tooltipClassName: cx('FileControl-list-tooltip', (file.state === 'invalid' || file.state === 'error') &&
                            'is-invalid'), tooltip: file.state === 'invalid' || file.state === 'error'
                            ? file.error ||
                                (maxSize && file.size > maxSize
                                    ? __('File.maxSize', {
                                        filename: file.name,
                                        actualSize: prettyBytes(file.size, 1024),
                                        maxSize: prettyBytes(maxSize, 1024)
                                    })
                                    : '')
                            : filename },
                        React.createElement("div", { className: cx('FileControl-itemInfo', {
                                'is-invalid': file.state === 'invalid' || file.state === 'error'
                            }) },
                            React.createElement("span", { className: cx('FileControl-itemInfoIcon') },
                                React.createElement(Icon, { icon: "file", className: "icon" })),
                            file[urlField] ||
                                file[valueField] ||
                                downloadUrl ? (React.createElement("a", { className: cx('FileControl-itemInfoText'), target: "_blank", rel: "noopener", href: "#", onClick: _this.handleClickFile.bind(_this, file) }, filename)) : (React.createElement("span", { className: cx('FileControl-itemInfoText') }, filename)),
                            !disabled ? (React.createElement("a", { "data-tooltip": __('Select.clear'), "data-position": "left", className: cx('FileControl-clear'), onClick: function () { return _this.removeFile(file, index); } },
                                React.createElement(Icon, { icon: "close", className: "icon" }))) : null)),
                    file.state === 'uploading' ? (React.createElement("div", { className: cx('FileControl-progressInfo') },
                        React.createElement("div", { className: cx('FileControl-progress') },
                            React.createElement("span", { style: { width: "".concat((file.progress || 0) * 100, "%") } })),
                        React.createElement("span", null,
                            Math.round((file.progress || 0) * 100),
                            "%"))) : null));
            }))) : null,
            failed ? (React.createElement("div", { className: cx('FileControl-sum') },
                __('File.result', {
                    uploaded: uploaded,
                    failed: failed
                }),
                React.createElement("a", { onClick: this.retry }, __('File.retry')),
                __('File.failed'))) : null,
            !autoUpload && !hideUploadButton && files.length ? (React.createElement(Button, { level: "default", testIdBuilder: testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('upload'), disabled: !hasPending, className: cx('FileControl-uploadBtn', btnUploadClassName), onClick: this.toggleUpload }, __(uploading ? 'File.pause' : 'File.start'))) : null));
    };
    FileControl.defaultProps = {
        maxSize: 0,
        maxLength: 0,
        placeholder: '',
        receiver: '/api/upload/file',
        fileField: 'file',
        joinValues: true,
        extractValue: false,
        delimiter: ',',
        downloadUrl: '',
        templateUrl: '',
        useChunk: 'auto',
        chunkSize: 5 * 1024 * 1024,
        startChunkApi: '/api/upload/startChunk',
        chunkApi: '/api/upload/chunk',
        finishChunkApi: '/api/upload/finishChunk',
        concurrency: 3,
        accept: '',
        multiple: false,
        autoUpload: true,
        hideUploadButton: false,
        initAutoFill: true,
        stateTextMap: {
            init: '',
            pending: '等待上传',
            uploading: '上传中',
            error: '上传出错',
            uploaded: '已上传',
            ready: ''
        },
        asBase64: false,
        drag: false
    };
    return FileControl;
}(React.Component));
var FileControlRenderer = /** @class */ (function (_super) {
    __extends(FileControlRenderer, _super);
    function FileControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileControlRenderer = __decorate([
        FormItem({
            type: 'input-file',
            sizeMutable: false,
            renderDescription: false,
            shouldComponentUpdate: function (props, prevProps) {
                return !!isEffectiveApi(props.receiver, props.data) &&
                    (isApiOutdated(props.receiver, prevProps.receiver, props.data, prevProps.data) ||
                        isApiOutdatedWithData(props.receiver, prevProps.receiver, props.data, prevProps.data));
            }
        })
    ], FileControlRenderer);
    return FileControlRenderer;
}(FileControl));

export { FileControlRenderer, FileControl as default, getNameFromUrl };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
