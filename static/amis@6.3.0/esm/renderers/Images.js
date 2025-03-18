/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { filter, isPureVariable, resolveVariableAndFilter, getPropValue, setThemeClassName, CustomStyle, autobind, Renderer } from 'amis-core';
import ThemedImageThumb, { imagePlaceholder } from './Image.js';

var ImagesField = /** @class */ (function (_super) {
    __extends(ImagesField, _super);
    function ImagesField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = [];
        return _this;
    }
    ImagesField.prototype.handleEnlarge = function (info) {
        var _a = this.props, onImageEnlarge = _a.onImageEnlarge, src = _a.src, originalSrc = _a.originalSrc;
        onImageEnlarge &&
            onImageEnlarge(__assign(__assign({}, info), { originalSrc: info.originalSrc || info.src, list: this.list.map(function (item) { return ({
                    src: src
                        ? filter(src, item, '| raw')
                        : (item && item.image) || item,
                    originalSrc: originalSrc
                        ? filter(originalSrc, item, '| raw')
                        : (item === null || item === void 0 ? void 0 : item.src) || filter(src, item, '| raw') || (item === null || item === void 0 ? void 0 : item.image) || item,
                    title: item && (item.enlargeTitle || item.title),
                    caption: item && (item.enlargeCaption || item.description || item.caption)
                }); }) }), this.props);
    };
    ImagesField.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, defaultImage = _a.defaultImage, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio, data = _a.data; _a.name; var placeholder = _a.placeholder, cx = _a.classnames, source = _a.source, delimiter = _a.delimiter, enlargeAble = _a.enlargeAble, enlargeWithGallary = _a.enlargeWithGallary, src = _a.src, originalSrc = _a.originalSrc, listClassName = _a.listClassName, options = _a.options, showToolbar = _a.showToolbar, toolbarActions = _a.toolbarActions, imageGallaryClassName = _a.imageGallaryClassName; _a.galleryControlClassName; var id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss; _a.imagesControlClassName;
        var value;
        var list;
        if (typeof source === 'string' && isPureVariable(source)) {
            list = resolveVariableAndFilter(source, data, '| raw') || undefined;
        }
        else if (Array.isArray((value = getPropValue(this.props))) ||
            typeof value === 'string') {
            list = value;
        }
        else if (Array.isArray(options)) {
            list = options;
        }
        if (typeof list === 'string') {
            list = list.split(delimiter);
        }
        else if (list && !Array.isArray(list)) {
            list = [list];
        }
        this.list = list;
        return (React.createElement("div", { className: cx('ImagesField', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'imagesControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), style: style },
            Array.isArray(list) ? (React.createElement("div", { className: cx('Images', listClassName) }, list.map(function (item, index) { return (React.createElement(ThemedImageThumb, { index: index, className: cx('Images-item'), key: index, src: (src ? filter(src, item, '| raw') : item && item.image) ||
                    item, originalSrc: (originalSrc
                    ? filter(originalSrc, item, '| raw')
                    : item && item.src) || item, title: item && item.title, caption: item && (item.description || item.caption), thumbMode: thumbMode, thumbRatio: thumbRatio, enlargeAble: enlargeAble, enlargeWithGallary: enlargeWithGallary, onEnlarge: _this.handleEnlarge, showToolbar: showToolbar, imageGallaryClassName: "".concat(imageGallaryClassName, " ").concat(setThemeClassName(__assign(__assign({}, _this.props), { name: 'imageGallaryClassName', id: id, themeCss: themeCss })), " ").concat(setThemeClassName(__assign(__assign({}, _this.props), { name: 'galleryControlClassName', id: id, themeCss: themeCss }))), toolbarActions: toolbarActions })); }))) : defaultImage ? (React.createElement("div", { className: cx('Images', listClassName) },
                React.createElement(ThemedImageThumb, { className: cx('Images-item'), src: defaultImage, thumbMode: thumbMode, thumbRatio: thumbRatio }))) : (placeholder),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'imagesControlClassName'
                        },
                        {
                            key: 'galleryControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    ImagesField.defaultProps = {
        className: '',
        delimiter: ',',
        defaultImage: imagePlaceholder,
        placehoder: '-',
        thumbMode: 'contain',
        thumbRatio: '1:1'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImagesField.prototype, "handleEnlarge", null);
    return ImagesField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ImagesFieldRenderer, _super);
    function ImagesFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImagesFieldRenderer = __decorate([
        Renderer({
            type: 'images'
        })
    ], ImagesFieldRenderer);
    return ImagesFieldRenderer;
})(ImagesField));

export { ImagesField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
