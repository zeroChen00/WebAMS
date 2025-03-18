/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __values, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import DropZone from 'react-dropzone';
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import { isObject, dataMapping, resolveEventData, autobind, FormItem } from 'amis-core';

var ExcelControl = /** @class */ (function (_super) {
    __extends(ExcelControl, _super);
    function ExcelControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            filename: ''
        };
        return _this;
    }
    ExcelControl.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.value !== this.props.value && !this.props.value) {
            this.setState({ filename: '' });
        }
    };
    ExcelControl.prototype.syncAutoFill = function (filename) {
        var _a = this.props, autoFill = _a.autoFill, onBulkChange = _a.onBulkChange, data = _a.data, name = _a.name;
        if ((autoFill === null || autoFill === void 0 ? void 0 : autoFill.hasOwnProperty('api')) || !isObject(autoFill)) {
            return;
        }
        var excludeSelfAutoFill = name ? omit(autoFill, name) : autoFill;
        if (!isEmpty(excludeSelfAutoFill) && onBulkChange) {
            var toSync_1 = dataMapping(excludeSelfAutoFill, { filename: filename });
            Object.keys(toSync_1).forEach(function (key) {
                if (isPlainObject(toSync_1[key]) && isPlainObject(data[key])) {
                    toSync_1[key] = merge({}, data[key], toSync_1[key]);
                }
            });
            onBulkChange(toSync_1);
        }
    };
    ExcelControl.prototype.handleDrop = function (files) {
        var _this = this;
        var excel = files[0];
        var fileName = excel.name;
        var reader = new FileReader();
        reader.readAsArrayBuffer(excel);
        reader.onload = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (reader.result) {
                    // 如果是 xls 就用 xlsx 解析一下转成 xlsx 然后用 exceljs 解析
                    // 为啥不直接用 xlsx 解析内容？因为它的社区版本不支持读图片，只有收费版才支持
                    if (fileName.toLowerCase().endsWith('.xls')) {
                        import('xlsx').then(function (XLSX) {
                            var workbook = XLSX.read(new Uint8Array(reader.result), {
                                cellDates: true
                            });
                            var xlsxFile = XLSX.writeXLSX(workbook, { type: 'array' });
                            _this.processExcelFile(xlsxFile, fileName);
                        });
                    }
                    else {
                        this.processExcelFile(reader.result, fileName);
                    }
                }
                return [2 /*return*/];
            });
        }); };
    };
    ExcelControl.prototype.processExcelFile = function (excelData, fileName) {
        var _this = this;
        var _a = this.props, allSheets = _a.allSheets, onChange = _a.onChange, parseImage = _a.parseImage, autoFill = _a.autoFill;
        import('exceljs').then(function (ExcelJS) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, sheetsResult, worksheet, images, dispatcher;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ExcelJS = ExcelJS;
                        workbook = new ExcelJS.Workbook();
                        return [4 /*yield*/, workbook.xlsx.load(excelData)];
                    case 1:
                        _a.sent();
                        sheetsResult = [];
                        if (allSheets) {
                            workbook.eachSheet(function (worksheet) {
                                var sheetState = worksheet.state || 'visible';
                                // hidden 的不处理
                                if (sheetState === 'hidden') {
                                    return;
                                }
                                if (parseImage) {
                                    sheetsResult.push({
                                        sheetName: worksheet.name,
                                        data: _this.readWorksheet(worksheet),
                                        images: _this.readImages(worksheet, workbook)
                                    });
                                }
                                else {
                                    sheetsResult.push({
                                        sheetName: worksheet.name,
                                        data: _this.readWorksheet(worksheet)
                                    });
                                }
                            });
                        }
                        else {
                            worksheet = workbook.worksheets.find(function (sheet) { return sheet.state !== 'hidden'; });
                            if (parseImage) {
                                images = this.readImages(worksheet, workbook);
                                sheetsResult = {
                                    data: this.readWorksheet(worksheet),
                                    images: images
                                };
                            }
                            else {
                                sheetsResult = this.readWorksheet(worksheet);
                            }
                        }
                        return [4 /*yield*/, this.dispatchEvent('change', sheetsResult)];
                    case 2:
                        dispatcher = _a.sent();
                        if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(sheetsResult);
                        if (autoFill) {
                            this.syncAutoFill(fileName);
                        }
                        this.setState({ filename: fileName });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /** 读取工作表里的图片 */
    ExcelControl.prototype.readImages = function (worksheet, workbook) {
        var e_1, _a;
        var imageDataURI = this.props.imageDataURI;
        var images = worksheet.getImages();
        var imgResult = [];
        try {
            for (var images_1 = __values(images), images_1_1 = images_1.next(); !images_1_1.done; images_1_1 = images_1.next()) {
                var image = images_1_1.value;
                var img = workbook.getImage(+image.imageId);
                var imgBase64 = this.encodeBase64Bytes(img.buffer);
                if (imageDataURI) {
                    var extension = img.extension || 'png';
                    imgResult.push("data:image/".concat(extension, ";base64,") + imgBase64);
                }
                else {
                    imgResult.push(imgBase64);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (images_1_1 && !images_1_1.done && (_a = images_1.return)) _a.call(images_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return imgResult;
    };
    /** 将 buffer 转成 base64 */
    ExcelControl.prototype.encodeBase64Bytes = function (bytes) {
        return btoa(bytes.reduce(function (acc, current) { return acc + String.fromCharCode(current); }, ''));
    };
    ExcelControl.prototype.dispatchEvent = function (eventName, eventData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, _a.data;
                        return [4 /*yield*/, dispatchEvent(eventName, resolveEventData(this.props, { value: eventData }))];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * 检查当前单元格数据是否为富文本
     *
     * @reference https://github.com/exceljs/exceljs#rich-text
     */
    ExcelControl.prototype.isRichTextValue = function (value) {
        return !!(value &&
            isObject(value) &&
            value.hasOwnProperty('richText') &&
            Array.isArray(value === null || value === void 0 ? void 0 : value.richText));
    };
    /**
     * 将富文本类型的单元格内容转化为Plain Text
     *
     * @param {CellRichTextValue} cellValue 单元格值
     * @param {Boolean} html 是否输出为html格式
     */
    ExcelControl.prototype.richText2PlainString = function (cellValue, html) {
        if (html === void 0) { html = false; }
        var result = cellValue.richText.map(function (_a) {
            var text = _a.text, _b = _a.font, font = _b === void 0 ? {} : _b;
            var outputStr = text;
            /* 如果以HTML格式输出，简单处理一下样式 */
            if (html) {
                var styles = '';
                var htmlTag = (font === null || font === void 0 ? void 0 : font.bold)
                    ? 'strong'
                    : (font === null || font === void 0 ? void 0 : font.italic)
                        ? 'em'
                        : (font === null || font === void 0 ? void 0 : font.vertAlign) === 'superscript'
                            ? 'sup'
                            : (font === null || font === void 0 ? void 0 : font.vertAlign) === 'subscript'
                                ? 'sub'
                                : 'span';
                if (font === null || font === void 0 ? void 0 : font.strike) {
                    styles += 'text-decoration: line-through;';
                }
                else if (font === null || font === void 0 ? void 0 : font.underline) {
                    styles += 'text-decoration: underline;';
                }
                if (font === null || font === void 0 ? void 0 : font.outline) {
                    styles += 'outline: solid;';
                }
                if (font === null || font === void 0 ? void 0 : font.size) {
                    styles += "font-size: ".concat(font.size, "px;");
                }
                outputStr = "<".concat(htmlTag, " ").concat(styles ? "style=".concat(styles) : '', ">").concat(text, "</").concat(htmlTag, ">");
            }
            return outputStr;
        });
        return result.join('');
    };
    /**
     * 读取单个 sheet 的内容
     */
    ExcelControl.prototype.readWorksheet = function (worksheet) {
        var _this = this;
        var result = [];
        var _a = this.props, parseMode = _a.parseMode, plainText = _a.plainText, includeEmpty = _a.includeEmpty;
        if (parseMode === 'array') {
            worksheet.eachRow(function (row, rowNumber) {
                var values = row.values;
                values.shift(); // excel 返回的值是从 1 开始的，0 节点永远是 null
                if (plainText) {
                    values = values.map(function (item) {
                        if (item instanceof Object) {
                            if (item.hyperlink) {
                                if (item.hyperlink.startsWith('mailto:')) {
                                    return item.hyperlink.substring(7);
                                }
                                return item.hyperlink;
                            }
                            else if (item.result) {
                                return item.result;
                            }
                            else if (item.richText) {
                                return _this.richText2PlainString(item);
                            }
                        }
                        return item;
                    });
                }
                result.push(values);
            });
            return result;
        }
        else {
            var firstRowValues_1 = [];
            worksheet.eachRow(function (row, rowNumber) {
                var _a;
                // 将第一列作为字段名
                if (rowNumber == 1) {
                    firstRowValues_1 = ((_a = row.values) !== null && _a !== void 0 ? _a : []).map(function (item) {
                        return _this.isRichTextValue(item)
                            ? _this.richText2PlainString(item)
                            : item;
                    });
                }
                else {
                    var data_1 = {};
                    if (includeEmpty) {
                        firstRowValues_1.forEach(function (item) {
                            data_1[item] = '';
                        });
                    }
                    row.eachCell(function (cell, colNumber) {
                        if (firstRowValues_1[colNumber]) {
                            var value = cell.value;
                            if (plainText) {
                                var ExcelValueType = _this.ExcelJS.ValueType;
                                if (cell.type === ExcelValueType.Hyperlink) {
                                    value = cell.value.hyperlink;
                                    if (value.startsWith('mailto:')) {
                                        value = value.substring(7);
                                    }
                                }
                                else if (cell.type === ExcelValueType.Formula) {
                                    value = cell.value.result;
                                }
                                else if (cell.type === ExcelValueType.RichText) {
                                    value = _this.richText2PlainString(cell.value);
                                }
                                else if (cell.type === ExcelValueType.Error) {
                                    value = '';
                                }
                            }
                            data_1[firstRowValues_1[colNumber]] = value;
                        }
                    });
                    result.push(data_1);
                }
            });
            return result;
        }
    };
    ExcelControl.prototype.doAction = function (action, data, throwErrors) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        if (actionType === 'clear') {
            onChange('');
        }
        else if (actionType === 'reset') {
            onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    ExcelControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, cx = _a.classnames; _a.classPrefix; var disabled = _a.disabled, __ = _a.translate, placeholder = _a.placeholder, testIdBuilder = _a.testIdBuilder;
        return (React.createElement("div", { className: cx('ExcelControl', className) },
            React.createElement(DropZone, { key: "drop-zone", onDrop: this.handleDrop, accept: ".xlsx,.xls", multiple: false, disabled: disabled }, function (_a) {
                var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps;
                return (React.createElement("section", { className: cx('ExcelControl-container', className) },
                    React.createElement("div", __assign({}, getRootProps({ className: cx('ExcelControl-dropzone') }), testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getTestId()),
                        React.createElement("input", __assign({}, getInputProps(), testIdBuilder === null || testIdBuilder === void 0 ? void 0 : testIdBuilder.getChild('input').getTestId())),
                        _this.state.filename ? (__('Excel.parsed', {
                            filename: _this.state.filename
                        })) : (React.createElement("p", null, placeholder !== null && placeholder !== void 0 ? placeholder : __('Excel.placeholder'))))));
            })));
    };
    ExcelControl.defaultProps = {
        allSheets: false,
        parseMode: 'object',
        includeEmpty: true,
        plainText: true,
        parseImage: false,
        imageDataURI: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ExcelControl.prototype, "syncAutoFill", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], ExcelControl.prototype, "handleDrop", null);
    return ExcelControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(ExcelControlRenderer, _super);
    function ExcelControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExcelControlRenderer = __decorate([
        FormItem({
            type: 'input-excel'
        })
    ], ExcelControlRenderer);
    return ExcelControlRenderer;
})(ExcelControl));

export { ExcelControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
