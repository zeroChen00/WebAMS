/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __awaiter, __generator, __values, __assign } from 'tslib';
import { createObject, removeHTMLTag, decodeEntity, filter, isObject, getImageDimensions, toDataURL, getVariable, isPureVariable, resolveVariableAndFilter, arraySlice, flattenTree, TableStore, isEffectiveApi } from 'amis-core';
import './ColumnToggler.js';
import { saveAs } from 'file-saver';
import memoize from 'lodash/memoize';
import { getSnapshot } from 'mobx-state-tree';
import moment from 'moment';

/**
 * 导出 Excel 功能
 */
var loadDb = function () {
    // @ts-ignore
    return import('amis-ui/lib/components/CityDB');
};
/**
 * 将 url 转成绝对地址
 */
var getAbsoluteUrl = (function () {
    var link;
    return function (url) {
        if (!link)
            link = document.createElement('a');
        link.href = url;
        return link.href;
    };
})();
/**
 * 将 computedStyle 的 rgba 转成 argb hex
 */
var rgba2argb = memoize(function (rgba) {
    var color = "".concat(rgba
        .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
        .slice(1)
        .map(function (n, i) {
        return (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
            .toString(16)
            .padStart(2, '0')
            .replace('NaN', '');
    })
        .join(''));
    if (color.length === 6) {
        return 'FF' + color;
    }
    return color;
});
/**
 * 将 classname 转成对应的 excel 样式，只支持字体颜色、粗细、背景色
 */
var getCellStyleByClassName = memoize(function (className) {
    if (!className)
        return {};
    var classNameElm = document.getElementsByClassName(className).item(0);
    if (classNameElm) {
        var computedStyle = getComputedStyle(classNameElm);
        var font = {};
        var fill = {};
        if (computedStyle.color && computedStyle.color.indexOf('rgb') !== -1) {
            var color = rgba2argb(computedStyle.color);
            // 似乎不支持完全透明的情况，所以就不设置
            if (!color.startsWith('00')) {
                font['color'] = { argb: color };
            }
        }
        if (computedStyle.fontWeight && parseInt(computedStyle.fontWeight) >= 700) {
            font['bold'] = true;
        }
        if (computedStyle.backgroundColor &&
            computedStyle.backgroundColor.indexOf('rgb') !== -1) {
            var color = rgba2argb(computedStyle.backgroundColor);
            if (!color.startsWith('00')) {
                fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: color }
                };
            }
        }
        return { font: font, fill: fill };
    }
    return {};
});
/**
 * 设置单元格样式
 */
var applyCellStyle = function (sheetRow, columIndex, schema, data) {
    var e_1, _a, e_2, _b;
    var cellStyle = {};
    if (schema.className) {
        try {
            for (var _c = __values(schema.className.split(/\s+/)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var className = _d.value;
                var style = getCellStyleByClassName(className);
                if (style) {
                    cellStyle = __assign(__assign({}, cellStyle), style);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    if (schema.classNameExpr) {
        var classNames = filter(schema.classNameExpr, data);
        if (classNames) {
            try {
                for (var _e = __values(classNames.split(/\s+/)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var className = _f.value;
                    var style = getCellStyleByClassName(className);
                    if (style) {
                        cellStyle = __assign(__assign({}, cellStyle), style);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    if (cellStyle.font && Object.keys(cellStyle.font).length > 0) {
        sheetRow.getCell(columIndex).font = cellStyle.font;
    }
    if (cellStyle.fill && Object.keys(cellStyle.fill).length > 0) {
        sheetRow.getCell(columIndex).fill = cellStyle.fill;
    }
};
/**
 * 输出总结行
 */
var renderSummary = function (worksheet, data, summarySchema, rowIndex) {
    var e_3, _a, e_4, _b;
    if (summarySchema && summarySchema.length > 0) {
        var firstSchema = summarySchema[0];
        // 总结行支持二维数组，所以统一转成二维数组来方便操作
        var affixRows = summarySchema;
        if (!Array.isArray(firstSchema)) {
            affixRows = [summarySchema];
        }
        try {
            for (var affixRows_1 = __values(affixRows), affixRows_1_1 = affixRows_1.next(); !affixRows_1_1.done; affixRows_1_1 = affixRows_1.next()) {
                var affix = affixRows_1_1.value;
                rowIndex += 1;
                var sheetRow = worksheet.getRow(rowIndex);
                var columIndex = 0;
                try {
                    for (var affix_1 = (e_4 = void 0, __values(affix)), affix_1_1 = affix_1.next(); !affix_1_1.done; affix_1_1 = affix_1.next()) {
                        var col = affix_1_1.value;
                        columIndex += 1;
                        // 文档示例中只有这两种，所以主要支持这两种，没法支持太多，因为没法用 react 渲染结果
                        if (col.text) {
                            sheetRow.getCell(columIndex).value = col.text;
                        }
                        if (col.tpl) {
                            sheetRow.getCell(columIndex).value = removeHTMLTag(decodeEntity(filter(col.tpl, data)));
                        }
                        // 处理合并行
                        if (col.colSpan) {
                            worksheet.mergeCells(rowIndex, columIndex, rowIndex, columIndex + col.colSpan - 1);
                            columIndex += col.colSpan - 1;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (affix_1_1 && !affix_1_1.done && (_b = affix_1.return)) _b.call(affix_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (affixRows_1_1 && !affixRows_1_1.done && (_a = affixRows_1.return)) _a.call(affixRows_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    return rowIndex;
};
/**
 * 获取 map 的映射数据
 * @param remoteMappingCache 缓存
 * @param env mobx env
 * @param column 列配置
 * @param data 上下文数据
 * @param rowData 当前行数据
 * @returns
 */
function getMap(remoteMappingCache, env, column, data, rowData) {
    return __awaiter(this, void 0, void 0, function () {
        var map, source, sourceValue, mapKey, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map = column.pristine.map;
                    source = column.pristine.source;
                    if (!source) return [3 /*break*/, 4];
                    sourceValue = source;
                    if (!isPureVariable(source)) return [3 /*break*/, 1];
                    map = resolveVariableAndFilter(source, rowData, '| raw');
                    return [3 /*break*/, 4];
                case 1:
                    if (!isEffectiveApi(source, data)) return [3 /*break*/, 4];
                    mapKey = JSON.stringify(source);
                    if (!(mapKey in remoteMappingCache)) return [3 /*break*/, 2];
                    map = remoteMappingCache[mapKey];
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, env.fetcher(sourceValue, rowData)];
                case 3:
                    res = _a.sent();
                    if (res.data) {
                        remoteMappingCache[mapKey] = res.data;
                        map = res.data;
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/, map];
            }
        });
    });
}
/**
 * 导出 Excel
 * @param ExcelJS ExcelJS 对象
 * @param props Table 组件的 props
 * @param toolbar 导出 Excel 的 toolbar 配置
 * @param withoutData 如果为 true 就不导出数据，只导出表头
 */
function exportExcel(ExcelJS, props, toolbar, withoutData) {
    var _a, _b, _c, _d;
    if (withoutData === void 0) { withoutData = false; }
    return __awaiter(this, void 0, void 0, function () {
        var store, env, __, data, prefixRow, affixRow, columns, rows, tmpStore, filename, pageField, perPageField, ctx, res, _e, _f, key, workbook, worksheet, exportColumnNames, hasCustomExportColumns, columns_1, columns_1_1, column, filteredColumns, firstRowLabels, firstRow, remoteMappingCache, rowIndex, rows_1, rows_1_1, row, rowData, sheetRow, columIndex, _loop_1, filteredColumns_1, filteredColumns_1_1, column, e_5_1, e_6_1;
        var _g, e_7, _h, e_8, _j, e_6, _k, e_5, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    store = props.store, env = props.env, props.classnames, __ = props.translate, data = props.data, prefixRow = props.prefixRow, affixRow = props.affixRow;
                    columns = store.exportColumns || [];
                    rows = [];
                    filename = 'data';
                    if (!(typeof toolbar === 'object' && toolbar.api)) return [3 /*break*/, 2];
                    pageField = toolbar.pageField || 'page';
                    perPageField = toolbar.perPageField || 'perPage';
                    ctx = createObject(data, __assign(__assign({}, props.query), (_g = {}, _g[pageField] = data.page || 1, _g[perPageField] = data.perPage || 10, _g)));
                    return [4 /*yield*/, env.fetcher(toolbar.api, ctx, {
                            autoAppend: true,
                            pageField: pageField,
                            perPageField: perPageField
                        })];
                case 1:
                    res = _m.sent();
                    if (!res.data) {
                        env.notify('warning', __('placeholder.noData'));
                        return [2 /*return*/];
                    }
                    /**
                     * 优先找items和rows，找不到就拿第一个值为数组的字段
                     * 和CRUD中的处理逻辑保持一致，避免能渲染和导出的不一致
                     */
                    if (Array.isArray(res.data)) {
                        rows = res.data;
                    }
                    else if (Array.isArray((_a = res.data) === null || _a === void 0 ? void 0 : _a.rows)) {
                        rows = res.data.rows;
                    }
                    else if (Array.isArray((_b = res.data) === null || _b === void 0 ? void 0 : _b.items)) {
                        rows = res.data.items;
                    }
                    else {
                        try {
                            for (_e = __values(Object.keys(res.data)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                key = _f.value;
                                if (res.data.hasOwnProperty(key) && Array.isArray(res.data[key])) {
                                    rows = res.data[key];
                                    break;
                                }
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_h = _e.return)) _h.call(_e);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                    }
                    // 因为很多方法是 store 里的，所以需要构建 store 来处理
                    tmpStore = TableStore.create(getSnapshot(store));
                    tmpStore.initRows(rows);
                    rows = tmpStore.rows;
                    return [3 /*break*/, 3];
                case 2:
                    rows = store.rows;
                    _m.label = 3;
                case 3:
                    if (typeof toolbar === 'object' && toolbar.filename) {
                        filename = filter(toolbar.filename, data, '| raw');
                    }
                    if (rows.length === 0) {
                        env.notify('warning', __('placeholder.noData'));
                        return [2 /*return*/];
                    }
                    workbook = new ExcelJS.Workbook();
                    worksheet = workbook.addWorksheet('sheet', {
                        properties: { defaultColWidth: 15 }
                    });
                    worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
                    exportColumnNames = toolbar.columns;
                    if (isPureVariable(exportColumnNames)) {
                        exportColumnNames = resolveVariableAndFilter(exportColumnNames, data, '| raw');
                    }
                    hasCustomExportColumns = toolbar.exportColumns && Array.isArray(toolbar.exportColumns);
                    if (hasCustomExportColumns) {
                        columns = toolbar.exportColumns;
                        try {
                            // 因为后面列 props 都是从 pristine 里获取，所以这里归一一下
                            for (columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                                column = columns_1_1.value;
                                column.pristine = column;
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (columns_1_1 && !columns_1_1.done && (_j = columns_1.return)) _j.call(columns_1);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                    }
                    filteredColumns = exportColumnNames
                        ? columns.filter(function (column) {
                            var filterColumnsNames = exportColumnNames;
                            if (column.name && filterColumnsNames.indexOf(column.name) !== -1) {
                                return hasCustomExportColumns ? true : (column === null || column === void 0 ? void 0 : column.type) !== 'operation';
                            }
                            return false;
                        })
                        : columns.filter(function (column) { return (column === null || column === void 0 ? void 0 : column.type) !== 'operation'; });
                    firstRowLabels = filteredColumns.map(function (column) {
                        return filter(column.label, data);
                    });
                    firstRow = worksheet.getRow(1);
                    firstRow.values = firstRowLabels;
                    worksheet.autoFilter = {
                        from: {
                            row: 1,
                            column: 1
                        },
                        to: {
                            row: 1,
                            column: firstRowLabels.length
                        }
                    };
                    if (withoutData) {
                        return [2 /*return*/, exportExcelWithoutData(workbook, worksheet, filteredColumns, filename, env, data)];
                    }
                    remoteMappingCache = {};
                    rowIndex = 1;
                    if (toolbar.rowSlice) {
                        rows = arraySlice(rows, toolbar.rowSlice);
                    }
                    // 前置总结行
                    rowIndex = renderSummary(worksheet, data, prefixRow, rowIndex);
                    // children 展开
                    rows = flattenTree(rows, function (item) { return item; });
                    _m.label = 4;
                case 4:
                    _m.trys.push([4, 15, 16, 17]);
                    rows_1 = __values(rows), rows_1_1 = rows_1.next();
                    _m.label = 5;
                case 5:
                    if (!!rows_1_1.done) return [3 /*break*/, 14];
                    row = rows_1_1.value;
                    rowData = createObject(data, row.data);
                    rowIndex += 1;
                    sheetRow = worksheet.getRow(rowIndex);
                    columIndex = 0;
                    _loop_1 = function (column) {
                        var name_1, value, type, imageData, imageDimensions, imageWidth, imageHeight, imageMaxSize, imageMatch, imageExt, imageId, linkURL, e_9, href, linkURL, body, text, absoluteURL, map, valueField_1, labelField, viewValue, label, text, viewValue, _o, fromNow, _p, format, _q, valueFormat, ISODate, NormalDate, db, cellValue;
                        return __generator(this, function (_r) {
                            switch (_r.label) {
                                case 0:
                                    columIndex += 1;
                                    name_1 = column.name;
                                    value = getVariable(rowData, name_1);
                                    if (typeof value === 'undefined' && !column.pristine.tpl) {
                                        return [2 /*return*/, "continue"];
                                    }
                                    // 处理合并单元格
                                    if (name_1 in row.rowSpans) {
                                        if (row.rowSpans[name_1] === 0) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        else {
                                            // start row, start column, end row, end column
                                            worksheet.mergeCells(rowIndex, columIndex, rowIndex + row.rowSpans[name_1] - 1, columIndex);
                                        }
                                    }
                                    applyCellStyle(sheetRow, columIndex, column.pristine, rowData);
                                    type = column.type || 'plain';
                                    if (!((type === 'image' || type === 'static-image') && value)) return [3 /*break*/, 6];
                                    _r.label = 1;
                                case 1:
                                    _r.trys.push([1, 4, , 5]);
                                    return [4 /*yield*/, toDataURL(value)];
                                case 2:
                                    imageData = _r.sent();
                                    return [4 /*yield*/, getImageDimensions(imageData)];
                                case 3:
                                    imageDimensions = _r.sent();
                                    imageWidth = imageDimensions.width;
                                    imageHeight = imageDimensions.height;
                                    imageMaxSize = 100;
                                    if (imageWidth > imageHeight) {
                                        if (imageWidth > imageMaxSize) {
                                            imageHeight = (imageMaxSize * imageHeight) / imageWidth;
                                            imageWidth = imageMaxSize;
                                        }
                                    }
                                    else {
                                        if (imageHeight > imageMaxSize) {
                                            imageWidth = (imageMaxSize * imageWidth) / imageHeight;
                                            imageHeight = imageMaxSize;
                                        }
                                    }
                                    imageMatch = imageData.match(/data:image\/(.*);/);
                                    imageExt = 'png';
                                    if (imageMatch) {
                                        imageExt = imageMatch[1];
                                    }
                                    // 目前 excel 只支持这些格式，所以其它格式直接输出 url
                                    if (imageExt != 'png' && imageExt != 'jpeg' && imageExt != 'gif') {
                                        sheetRow.getCell(columIndex).value = value;
                                        return [2 /*return*/, "continue"];
                                    }
                                    imageId = workbook.addImage({
                                        base64: imageData,
                                        extension: imageExt
                                    });
                                    linkURL = getAbsoluteUrl(value);
                                    worksheet.addImage(imageId, {
                                        // 这里坐标位置是从 0 开始的，所以要减一
                                        tl: { col: columIndex - 1, row: rowIndex - 1 },
                                        ext: {
                                            width: imageWidth,
                                            height: imageHeight
                                        },
                                        hyperlinks: {
                                            tooltip: linkURL
                                        }
                                    });
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_9 = _r.sent();
                                    console.warn(e_9);
                                    return [3 /*break*/, 5];
                                case 5: return [3 /*break*/, 13];
                                case 6:
                                    if (!(type == 'link' || type === 'static-link')) return [3 /*break*/, 7];
                                    href = column.pristine.href;
                                    linkURL = (typeof href === 'string' && href
                                        ? filter(href, rowData, '| raw')
                                        : undefined) || value;
                                    body = column.pristine.body;
                                    text = typeof body === 'string' && body
                                        ? filter(body, rowData, '| raw')
                                        : undefined;
                                    absoluteURL = getAbsoluteUrl(linkURL);
                                    sheetRow.getCell(columIndex).value = {
                                        text: text || absoluteURL,
                                        hyperlink: absoluteURL
                                    };
                                    return [3 /*break*/, 13];
                                case 7:
                                    if (!(type === 'mapping' || type === 'static-mapping')) return [3 /*break*/, 9];
                                    return [4 /*yield*/, getMap(remoteMappingCache, env, column, data, rowData)];
                                case 8:
                                    map = _r.sent();
                                    valueField_1 = column.pristine.valueField || 'value';
                                    labelField = column.pristine.labelField || 'label';
                                    if (Array.isArray(map)) {
                                        map = map.reduce(function (res, now) {
                                            if (now == null) {
                                                return res;
                                            }
                                            else if (isObject(now)) {
                                                var keys = Object.keys(now);
                                                if (keys.length === 1 ||
                                                    (keys.length == 2 && keys.includes('$$id'))) {
                                                    // 针对amis-editor的特殊处理
                                                    keys = keys.filter(function (key) { return key !== '$$id'; });
                                                    // 单key 数组对象
                                                    res[keys[0]] = now[keys[0]];
                                                }
                                                else if (keys.length > 1) {
                                                    // 多key 数组对象
                                                    res[now[valueField_1]] = now;
                                                }
                                            }
                                            return res;
                                        }, {});
                                    }
                                    if (typeof value !== 'undefined' && map && ((_c = map[value]) !== null && _c !== void 0 ? _c : map['*'])) {
                                        viewValue = (_d = map[value]) !== null && _d !== void 0 ? _d : (value === true && map['1']
                                            ? map['1']
                                            : value === false && map['0']
                                                ? map['0']
                                                : map['*']);
                                        label = viewValue;
                                        if (isObject(viewValue)) {
                                            if (labelField === undefined || labelField === '') {
                                                if (!viewValue.hasOwnProperty('type')) {
                                                    // 映射值是object
                                                    // 没配置labelField
                                                    // object 也没有 type，不能作为schema渲染
                                                    // 默认取 label 字段
                                                    label = viewValue['label'];
                                                }
                                            }
                                            else {
                                                label = viewValue[labelField || 'label'];
                                            }
                                        }
                                        text = removeHTMLTag(label);
                                        /** map可能会使用比较复杂的html结构，富文本也无法完全支持，直接把里面的变量解析出来即可 */
                                        if (isPureVariable(text)) {
                                            text = resolveVariableAndFilter(text, rowData, '| raw');
                                        }
                                        else {
                                            text = filter(text, rowData);
                                        }
                                        sheetRow.getCell(columIndex).value = text;
                                    }
                                    else {
                                        sheetRow.getCell(columIndex).value = removeHTMLTag(value);
                                    }
                                    return [3 /*break*/, 13];
                                case 9:
                                    if (!(type === 'date' || type === 'static-date')) return [3 /*break*/, 10];
                                    viewValue = void 0;
                                    _o = column.pristine, fromNow = _o.fromNow, _p = _o.format, format = _p === void 0 ? 'YYYY-MM-DD' : _p, _q = _o.valueFormat, valueFormat = _q === void 0 ? 'X' : _q;
                                    if (value) {
                                        ISODate = moment(value, moment.ISO_8601);
                                        NormalDate = moment(value, valueFormat);
                                        viewValue = ISODate.isValid()
                                            ? ISODate.format(format)
                                            : NormalDate.isValid()
                                                ? NormalDate.format(format)
                                                : false;
                                    }
                                    if (fromNow) {
                                        viewValue = moment(value).fromNow();
                                    }
                                    if (viewValue) {
                                        sheetRow.getCell(columIndex).value = viewValue;
                                    }
                                    return [3 /*break*/, 13];
                                case 10:
                                    if (!(type === 'input-city')) return [3 /*break*/, 12];
                                    return [4 /*yield*/, loadDb()];
                                case 11:
                                    db = _r.sent();
                                    if (db.default && value && value in db.default) {
                                        sheetRow.getCell(columIndex).value = db.default[value];
                                    }
                                    return [3 /*break*/, 13];
                                case 12:
                                    if (column.pristine.tpl) {
                                        sheetRow.getCell(columIndex).value = removeHTMLTag(decodeEntity(filter(column.pristine.tpl, rowData)));
                                    }
                                    else {
                                        sheetRow.getCell(columIndex).value = value;
                                    }
                                    _r.label = 13;
                                case 13:
                                    cellValue = sheetRow.getCell(columIndex).value;
                                    if (Number.isInteger(cellValue)) {
                                        sheetRow.getCell(columIndex).numFmt = '0';
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _m.label = 6;
                case 6:
                    _m.trys.push([6, 11, 12, 13]);
                    filteredColumns_1 = (e_5 = void 0, __values(filteredColumns)), filteredColumns_1_1 = filteredColumns_1.next();
                    _m.label = 7;
                case 7:
                    if (!!filteredColumns_1_1.done) return [3 /*break*/, 10];
                    column = filteredColumns_1_1.value;
                    return [5 /*yield**/, _loop_1(column)];
                case 8:
                    _m.sent();
                    _m.label = 9;
                case 9:
                    filteredColumns_1_1 = filteredColumns_1.next();
                    return [3 /*break*/, 7];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_5_1 = _m.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (filteredColumns_1_1 && !filteredColumns_1_1.done && (_l = filteredColumns_1.return)) _l.call(filteredColumns_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 13:
                    rows_1_1 = rows_1.next();
                    return [3 /*break*/, 5];
                case 14: return [3 /*break*/, 17];
                case 15:
                    e_6_1 = _m.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 17];
                case 16:
                    try {
                        if (rows_1_1 && !rows_1_1.done && (_k = rows_1.return)) _k.call(rows_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 17:
                    // 后置总结行
                    renderSummary(worksheet, data, affixRow, rowIndex);
                    downloadFile(workbook, filename);
                    return [2 /*return*/];
            }
        });
    });
}
function downloadFile(workbook, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var buffer, blob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, workbook.xlsx.writeBuffer()];
                case 1:
                    buffer = _a.sent();
                    if (buffer) {
                        blob = new Blob([buffer], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        });
                        saveAs(blob, filename + '.xlsx');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function numberToLetters(num) {
    var letters = '';
    while (num >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters;
        num = Math.floor(num / 26) - 1;
    }
    return letters;
}
/**
 * 只导出表头
 */
function exportExcelWithoutData(workbook, worksheet, filteredColumns, filename, env, data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var index, rowNumber, mapCache, filteredColumns_2, filteredColumns_2_1, column, map, keys, rowIndex, e_10_1;
        var e_10, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    index = 0;
                    rowNumber = 100;
                    mapCache = {};
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    filteredColumns_2 = __values(filteredColumns), filteredColumns_2_1 = filteredColumns_2.next();
                    _c.label = 2;
                case 2:
                    if (!!filteredColumns_2_1.done) return [3 /*break*/, 5];
                    column = filteredColumns_2_1.value;
                    index += 1;
                    if (!(((_a = column.pristine) === null || _a === void 0 ? void 0 : _a.type) === 'mapping')) return [3 /*break*/, 4];
                    return [4 /*yield*/, getMap(mapCache, env, column, data, {})];
                case 3:
                    map = _c.sent();
                    if (map && isObject(map)) {
                        keys = Object.keys(map);
                        for (rowIndex = 1; rowIndex < rowNumber; rowIndex++) {
                            worksheet.getCell(numberToLetters(index) + rowIndex).dataValidation =
                                {
                                    type: 'list',
                                    allowBlank: true,
                                    formulae: ["\"".concat(keys.join(','), "\"")]
                                };
                        }
                    }
                    _c.label = 4;
                case 4:
                    filteredColumns_2_1 = filteredColumns_2.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_10_1 = _c.sent();
                    e_10 = { error: e_10_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (filteredColumns_2_1 && !filteredColumns_2_1.done && (_b = filteredColumns_2.return)) _b.call(filteredColumns_2);
                    }
                    finally { if (e_10) throw e_10.error; }
                    return [7 /*endfinally*/];
                case 8:
                    downloadFile(workbook, filename);
                    return [2 /*return*/];
            }
        });
    });
}

export { exportExcel };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
