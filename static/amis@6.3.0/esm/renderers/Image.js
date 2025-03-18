/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __decorate, __metadata, __assign, __awaiter, __generator } from 'tslib';
import React from 'react';
import { autobind, themeable, localeable, setThemeClassName, createObject, isPureVariable, resolveVariableAndFilter, filter, getPropValue, CustomStyle, ScopedContext, Renderer, handleAction } from 'amis-core';
import { Icon } from 'amis-ui';

var ImageThumb = /** @class */ (function (_super) {
    __extends(ImageThumb, _super);
    function ImageThumb(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            imageLoading: false
        };
        return _this;
    }
    ImageThumb.prototype.componentDidUpdate = function (preProps) {
        if (preProps.src !== this.props.src) {
            this.setState({
                imageLoading: true
            });
        }
    };
    ImageThumb.prototype.handleImgLoaded = function (e) {
        var _a, _b;
        this.setState({
            imageLoading: false
        });
        (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onLoad) === null || _b === void 0 ? void 0 : _b.call(_a, e);
    };
    ImageThumb.prototype.handleImgError = function (e) {
        this.setState({
            imageLoading: false
        });
    };
    ImageThumb.prototype.handleEnlarge = function () {
        var _a = this.props, onEnlarge = _a.onEnlarge, rest = __rest(_a, ["onEnlarge"]);
        onEnlarge && onEnlarge(rest);
    };
    ImageThumb.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, style = _a.style, imageClassName = _a.imageClassName, thumbClassName = _a.thumbClassName, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio, height = _a.height, width = _a.width, src = _a.src, alt = _a.alt, title = _a.title, caption = _a.caption, href = _a.href, _b = _a.blank, blank = _b === void 0 ? true : _b, htmlTarget = _a.htmlTarget; _a.onLoad; var enlargeAble = _a.enlargeAble, __ = _a.translate, overlays = _a.overlays, imageMode = _a.imageMode, titleControlClassName = _a.titleControlClassName, iconControlClassName = _a.iconControlClassName, imageControlClassName = _a.imageControlClassName, desControlClassName = _a.desControlClassName;
        var imageLoading = this.state.imageLoading;
        var imageContent = (React.createElement(React.Fragment, null,
            imageLoading ? (React.createElement("img", { className: cx('Image-image', imageClassName), src: imagePlaceholder, alt: alt })) : null,
            React.createElement("img", { onLoad: this.handleImgLoaded, onError: this.handleImgError, className: cx('Image-image', imageClassName, {
                    'Image-image--loading': imageLoading
                }), src: src, alt: alt })));
        var enlarge = enlargeAble || overlays ? (React.createElement("div", { key: "overlay", className: cx('Image-overlay') },
            enlargeAble ? (React.createElement("a", { "data-tooltip": __('Image.zoomIn'), "data-position": "bottom", target: "_blank", onClick: this.handleEnlarge, className: cx('Image-overlay-view-icon', iconControlClassName) },
                React.createElement(Icon, { icon: "view", className: "icon", iconContent: "Image-view-icon" }))) : null,
            overlays)) : null;
        var image = (React.createElement("div", { className: cx('Image', imageMode === 'original' ? 'Image--original' : 'Image--thumb', className, imageControlClassName), style: href ? undefined : style },
            imageMode === 'original' ? (React.createElement("div", { className: cx('Image-origin', thumbMode ? "Image-origin--".concat(thumbMode) : ''), style: { height: height, width: width } },
                imageContent,
                enlarge)) : (React.createElement("div", { className: cx('Image-thumbWrap') },
                React.createElement("div", { className: cx('Image-thumb', thumbClassName, thumbMode ? "Image-thumb--".concat(thumbMode) : '', thumbRatio
                        ? "Image-thumb--".concat(thumbRatio.replace(/:/g, '-'))
                        : ''), style: { height: height, width: width } }, imageContent),
                enlarge)),
            title || caption ? (React.createElement("div", { key: "caption", className: cx('Image-info') },
                title ? (React.createElement("div", { className: cx('Image-title', titleControlClassName), title: title }, title)) : null,
                caption ? (React.createElement("div", { className: cx('Image-caption', desControlClassName), title: caption }, caption)) : null)) : null));
        if (href) {
            image = (React.createElement("a", { href: href, target: htmlTarget || (blank ? '_blank' : '_self'), className: cx('Link', className), style: style, title: title }, image));
        }
        return image;
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImageThumb.prototype, "handleImgLoaded", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImageThumb.prototype, "handleImgError", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ImageThumb.prototype, "handleEnlarge", null);
    return ImageThumb;
}(React.Component));
var ThemedImageThumb = themeable(localeable(ImageThumb));
var imagePlaceholder = "data:image/svg+xml,%3C%3Fxml version='1.0' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg t='1631083237695' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2420' xmlns:xlink='http://www.w3.org/1999/xlink' width='1024' height='1024'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%3C/style%3E%3C/defs%3E%3Cpath d='M959.872 128c0.032 0.032 0.096 0.064 0.128 0.128v767.776c-0.032 0.032-0.064 0.096-0.128 0.128H64.096c-0.032-0.032-0.096-0.064-0.128-0.128V128.128c0.032-0.032 0.064-0.096 0.128-0.128h895.776zM960 64H64C28.8 64 0 92.8 0 128v768c0 35.2 28.8 64 64 64h896c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z' p-id='2421' fill='%23bfbfbf'%3E%3C/path%3E%3Cpath d='M832 288c0 53.024-42.976 96-96 96s-96-42.976-96-96 42.976-96 96-96 96 42.976 96 96zM896 832H128V704l224-384 256 320h64l224-192z' p-id='2422' fill='%23bfbfbf'%3E%3C/path%3E%3C/svg%3E";
var ImageField = /** @class */ (function (_super) {
    __extends(ImageField, _super);
    function ImageField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            scale: 1
        };
        return _this;
    }
    ImageField.prototype.handleEnlarge = function (_a) {
        var src = _a.src, originalSrc = _a.originalSrc, title = _a.title, caption = _a.caption, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio;
        var _b = this.props, onImageEnlarge = _b.onImageEnlarge, enlargeTitle = _b.enlargeTitle, enlargeCaption = _b.enlargeCaption, showToolbar = _b.showToolbar, toolbarActions = _b.toolbarActions, imageGallaryClassName = _b.imageGallaryClassName, id = _b.id, themeCss = _b.themeCss, enlargeWithGallary = _b.enlargeWithGallary;
        onImageEnlarge &&
            onImageEnlarge({
                src: src,
                originalSrc: originalSrc || src,
                title: enlargeTitle || title,
                caption: enlargeCaption || caption,
                thumbMode: thumbMode,
                thumbRatio: thumbRatio,
                showToolbar: showToolbar,
                toolbarActions: toolbarActions,
                enlargeWithGallary: enlargeWithGallary,
                imageGallaryClassName: "".concat(imageGallaryClassName, " ").concat(setThemeClassName(__assign(__assign({}, this.props), { name: 'imageGallaryClassName', id: id, themeCss: themeCss })), " ").concat(setThemeClassName(__assign(__assign({}, this.props), { name: 'galleryControlClassName', id: id, themeCss: themeCss })))
            }, this.props);
    };
    ImageField.prototype.handleClick = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, data, clickAction, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
                        clickAction = this.props.clickAction;
                        return [4 /*yield*/, dispatchEvent(e, createObject(data, {
                                nativeEvent: e
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (clickAction) {
                            handleAction(e, clickAction, this.props);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageField.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    ImageField.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    ImageField.prototype.handleSelfAction = function (actionType, action) {
        var _a = this.props, data = _a.data, _b = _a.maxScale, maxScale = _b === void 0 ? 200 : _b, _c = _a.minScale, minScale = _c === void 0 ? 50 : _c;
        var _d = action.args.scale, scale = _d === void 0 ? 50 : _d;
        if (actionType === 'zoom') {
            if (isPureVariable(maxScale)) {
                maxScale = isNaN(resolveVariableAndFilter(maxScale, createObject(action.data, data)))
                    ? 200
                    : resolveVariableAndFilter(maxScale, createObject(action.data, data));
            }
            if (isPureVariable(minScale)) {
                minScale = isNaN(resolveVariableAndFilter(minScale, createObject(action.data, data)))
                    ? 50
                    : resolveVariableAndFilter(minScale, createObject(action.data, data));
            }
            if (scale >= 0) {
                this.setState({
                    scale: this.state.scale + scale / 100 < maxScale / 100
                        ? this.state.scale + scale / 100
                        : maxScale / 100
                });
            }
            else {
                this.setState({
                    scale: this.state.scale + scale / 100 > minScale / 100
                        ? this.state.scale + scale / 100
                        : minScale / 100
                });
            }
        }
    };
    ImageField.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, style = _b.style, innerClassName = _b.innerClassName, defaultImage = _b.defaultImage, imageCaption = _b.imageCaption, title = _b.title, data = _b.data, imageClassName = _b.imageClassName, thumbClassName = _b.thumbClassName, height = _b.height, width = _b.width, cx = _b.classnames, src = _b.src, href = _b.href, thumbMode = _b.thumbMode, thumbRatio = _b.thumbRatio, placeholder = _b.placeholder, originalSrc = _b.originalSrc, enlargeAble = _b.enlargeAble, enlargeWithGallary = _b.enlargeWithGallary, imageMode = _b.imageMode, wrapperCustomStyle = _b.wrapperCustomStyle, id = _b.id, themeCss = _b.themeCss, env = _b.env;
        var finnalSrc = src ? filter(src, data, '| raw') : '';
        var value = finnalSrc || getPropValue(this.props);
        var finnalHref = href ? filter(href, data, '| raw') : '';
        var defaultValue = defaultImage && !value
            ? filter(defaultImage, data, '| raw')
            : imagePlaceholder;
        return (React.createElement("div", { className: cx('ImageField', imageMode === 'original'
                ? 'ImageField--original'
                : 'ImageField--thumb', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), style: __assign(__assign({}, style), { transform: "scale(".concat(this.state.scale, ")") }), onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
            value || (!value && !placeholder) ? (React.createElement(ThemedImageThumb, { className: innerClassName, imageClassName: imageClassName, thumbClassName: thumbClassName, height: height, width: width, src: value ? value : defaultValue, href: finnalHref, title: filter(title, data), caption: filter(imageCaption, data), thumbMode: thumbMode, thumbRatio: thumbRatio, originalSrc: (_a = filter(originalSrc, data, '| raw')) !== null && _a !== void 0 ? _a : value, enlargeAble: enlargeAble && value && value !== defaultValue, enlargeWithGallary: enlargeWithGallary, onEnlarge: this.handleEnlarge, imageMode: imageMode, imageControlClassName: setThemeClassName(__assign(__assign({}, this.props), { name: 'imageControlClassName', id: id, themeCss: themeCss })), titleControlClassName: setThemeClassName(__assign(__assign({}, this.props), { name: 'titleControlClassName', id: id, themeCss: themeCss })), desControlClassName: setThemeClassName(__assign(__assign({}, this.props), { name: 'desControlClassName', id: id, themeCss: themeCss })), iconControlClassName: setThemeClassName(__assign(__assign({}, this.props), { name: 'iconControlClassName', id: id, themeCss: themeCss })) })) : (React.createElement("span", { className: "text-muted" }, placeholder)),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'imageControlClassName'
                        },
                        {
                            key: 'titleControlClassName'
                        },
                        {
                            key: 'desControlClassName'
                        },
                        {
                            key: 'iconControlClassName'
                        },
                        {
                            key: 'galleryControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    ImageField.defaultProps = {
        defaultImage: imagePlaceholder,
        thumbMode: 'contain',
        thumbRatio: '1:1'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImageField.prototype, "handleEnlarge", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ImageField.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImageField.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImageField.prototype, "handleMouseLeave", null);
    return ImageField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ImageFieldRenderer, _super);
    function ImageFieldRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    ImageFieldRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    ImageFieldRenderer.prototype.doAction = function (action) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'preview') {
            this.handleEnlarge(this.props);
        }
        else {
            this.handleSelfAction(actionType, action);
        }
    };
    ImageFieldRenderer.contextType = ScopedContext;
    ImageFieldRenderer = __decorate([
        Renderer({
            type: 'image'
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], ImageFieldRenderer);
    return ImageFieldRenderer;
})(ImageField));

export { ImageField, ImageThumb, ThemedImageThumb as default, imagePlaceholder };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
