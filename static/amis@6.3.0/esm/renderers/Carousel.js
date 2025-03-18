/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __read, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import Transition, { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';
import { getPropValue, isArrayChildrenModified, resolveVariableAndFilter, createObject, setThemeClassName, CustomStyle, autobind, ScopedContext, Renderer, isObject } from 'amis-core';
import { Icon, Html } from 'amis-ui';
import ThemedImageThumb from './Image.js';

var _a;
var animationStyles = (_a = {},
    _a[ENTERING] = 'in',
    _a[ENTERED] = 'in',
    _a[EXITING] = 'out',
    _a);
var defaultSchema = {
    component: function (props) {
        var _a, _b;
        var data = props.data || {};
        var thumbMode = props.thumbMode;
        var cx = props.classnames;
        return (React.createElement(React.Fragment, null, data.hasOwnProperty('image') ? (React.createElement(ThemedImageThumb, { src: data.image, title: data.title, href: data.href, blank: data.blank, htmlTarget: data.htmlTarget, caption: data.description, thumbMode: (_b = (_a = data.thumbMode) !== null && _a !== void 0 ? _a : thumbMode) !== null && _b !== void 0 ? _b : 'contain', imageMode: "original", className: cx('Carousel-image') })) : data.hasOwnProperty('html') ? (React.createElement(Html, { html: data.html, filterHtml: props.env.filterHtml })) : data.hasOwnProperty('item') ? (React.createElement("span", null, data.item)) : (React.createElement("p", null))));
    }
};
var Carousel = /** @class */ (function (_super) {
    __extends(Carousel, _super);
    function Carousel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wrapperRef = React.createRef();
        _this.state = {
            current: 0,
            options: _this.props.options || getPropValue(_this.props) || [],
            nextAnimation: ''
        };
        _this.loading = false;
        return _this;
    }
    Carousel.prototype.componentDidMount = function () {
        this.prepareAutoSlide();
    };
    Carousel.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var nextOptions = props.options || getPropValue(props) || [];
        var prevOptions = prevProps.options || getPropValue(prevProps) || [];
        if (isArrayChildrenModified(prevOptions, nextOptions)) {
            this.setState({
                options: nextOptions
            });
        }
    };
    Carousel.prototype.componentWillUnmount = function () {
        this.clearAutoTimeout();
    };
    Carousel.prototype.doAction = function (action, ctx, throwErrors, args) {
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (!!~['next', 'prev'].indexOf(actionType)) {
            this.autoSlide(actionType);
        }
        else if (actionType === 'goto-image') {
            this.changeSlide((args === null || args === void 0 ? void 0 : args.activeIndex) - 1);
        }
    };
    Carousel.prototype.prepareAutoSlide = function () {
        if (this.state.options.length < 2) {
            return;
        }
        this.clearAutoTimeout();
        if (this.props.auto) {
            var interval = this.props.interval;
            this.intervalTimeout = setTimeout(this.autoSlide, typeof interval === 'string'
                ? resolveVariableAndFilter(interval, this.props.data) || 5000
                : interval);
        }
    };
    Carousel.prototype.autoSlide = function (rel) {
        this.clearAutoTimeout();
        var animation = this.props.animation;
        var nextAnimation = this.state.nextAnimation;
        switch (rel) {
            case 'prev':
                animation === 'slide'
                    ? (nextAnimation = 'slideRight')
                    : (nextAnimation = '');
                this.transitFramesTowards('right', nextAnimation);
                break;
            case 'next':
            default:
                nextAnimation = '';
                this.transitFramesTowards('left', nextAnimation);
                break;
        }
        this.durationTimeout = setTimeout(this.prepareAutoSlide, this.props.duration);
    };
    Carousel.prototype.transitFramesTowards = function (direction, nextAnimation) {
        return __awaiter(this, void 0, void 0, function () {
            var current, prevIndex, _a, dispatchEvent, data, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        current = this.state.current;
                        prevIndex = current;
                        switch (direction) {
                            case 'left':
                                current = this.getFrameId('next');
                                break;
                            case 'right':
                                current = this.getFrameId('prev');
                                break;
                        }
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
                        return [4 /*yield*/, dispatchEvent('change', createObject(data, {
                                activeIndex: current + 1,
                                prevIndex: prevIndex
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            current: current,
                            nextAnimation: nextAnimation
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Carousel.prototype.getFrameId = function (pos) {
        var _a = this.state, options = _a.options, current = _a.current;
        var total = options.length;
        switch (pos) {
            case 'prev':
                return (current - 1 + total) % total;
            case 'next':
                return (current + 1) % total;
            default:
                return current;
        }
    };
    Carousel.prototype.next = function () {
        var multiple = this.props.multiple;
        if (this.loading && multiple && multiple.count > 1) {
            return;
        }
        this.autoSlide('next');
    };
    Carousel.prototype.prev = function () {
        var multiple = this.props.multiple;
        if (this.loading && multiple && multiple.count > 1) {
            return;
        }
        this.autoSlide('prev');
    };
    Carousel.prototype.clearAutoTimeout = function () {
        clearTimeout(this.intervalTimeout);
        clearTimeout(this.durationTimeout);
    };
    Carousel.prototype.changeSlide = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var current, _a, dispatchEvent, data, multiple, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        current = this.state.current;
                        _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data, multiple = _a.multiple;
                        if (this.loading && multiple && multiple.count > 1) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, dispatchEvent('change', createObject(data, {
                                activeIndex: index,
                                prevIndex: current
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            current: index
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Carousel.prototype.renderDots = function () {
        var _this = this;
        var cx = this.props.classnames;
        var _a = this.state, current = _a.current, options = _a.options;
        return (React.createElement("div", { className: cx('Carousel-dotsControl'), onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, Array.from({ length: options.length }).map(function (_, i) { return (React.createElement("span", { key: i, onClick: function () { return _this.changeSlide(i); }, className: cx('Carousel-dot', current === i ? 'is-active' : '') })); })));
    };
    Carousel.prototype.renderArrows = function () {
        var cx = this.props.classnames;
        return (React.createElement("div", { className: cx('Carousel-arrowsControl'), onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
            React.createElement("div", { className: cx('Carousel-leftArrow'), onClick: this.prev },
                React.createElement(Icon, { icon: "left-arrow", className: "icon" })),
            React.createElement("div", { className: cx('Carousel-rightArrow'), onClick: this.next },
                React.createElement(Icon, { icon: "right-arrow", className: "icon" }))));
    };
    Carousel.prototype.handleMouseEnter = function () {
        var multiple = this.props.multiple;
        if (multiple && multiple.count > 1) {
            return;
        }
        this.clearAutoTimeout();
    };
    Carousel.prototype.handleMouseLeave = function () {
        var multiple = this.props.multiple;
        if (multiple && multiple.count > 1) {
            return;
        }
        this.prepareAutoSlide();
    };
    // 处理options
    Carousel.prototype.getNewOptions = function (options, count) {
        if (count === void 0) { count = 1; }
        var newOptions = options;
        if (Array.isArray(options) && options.length) {
            newOptions = new Array(options.length);
            for (var i = 0; i < options.length; i++) {
                newOptions[i] = new Array(count);
                for (var j = 0; j < count; j++) {
                    newOptions[i][j] = options[(i + j) % options.length];
                }
            }
        }
        return newOptions;
    };
    Carousel.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, render = _b.render, className = _b.className, style = _b.style, cx = _b.classnames, itemSchema = _b.itemSchema, animation = _b.animation, width = _b.width, height = _b.height, controls = _b.controls, controlsTheme = _b.controlsTheme, placeholder = _b.placeholder, data = _b.data, name = _b.name, duration = _b.duration, multiple = _b.multiple, alwaysShowArrow = _b.alwaysShowArrow, icons = _b.icons, id = _b.id, wrapperCustomStyle = _b.wrapperCustomStyle, env = _b.env, themeCss = _b.themeCss;
        var _c = this.state, options = _c.options, current = _c.current, nextAnimation = _c.nextAnimation;
        var body = null;
        var carouselStyles = style || {};
        width ? (carouselStyles.width = width + 'px') : '';
        height ? (carouselStyles.height = height + 'px') : '';
        var _d = __read([
            controls.indexOf('dots') > -1,
            controls.indexOf('arrows') > -1
        ], 2), dots = _d[0], arrows = _d[1];
        var animationName = nextAnimation || animation;
        if (Array.isArray(options) && options.length) {
            var multipleCount_1 = 1;
            if (multiple &&
                typeof multiple.count === 'number' &&
                multiple.count >= 2) {
                multipleCount_1 =
                    Math.floor(multiple.count) < options.length
                        ? Math.floor(multiple.count)
                        : options.length;
            }
            var newOptions_1 = this.getNewOptions(options, multipleCount_1);
            var transitionDuration_1 = multipleCount_1 > 1 && typeof duration === 'number'
                ? "".concat(duration, "ms")
                : duration || '500ms';
            var timeout_1 = multipleCount_1 > 1 && typeof duration === 'number' ? duration : 500;
            body = (React.createElement("div", { ref: this.wrapperRef, className: cx('Carousel-container'), onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, options.map(function (option, key) { return (React.createElement(Transition, { mountOnEnter: true, unmountOnExit: true, in: key === current, timeout: timeout_1, key: key }, function (status) {
                var _a;
                if (status === ENTERING) {
                    _this.wrapperRef.current &&
                        _this.wrapperRef.current.childNodes.forEach(function (item) { return item.offsetHeight; });
                }
                if (multipleCount_1 > 1) {
                    if ((status === ENTERING || status === EXITING) &&
                        !_this.loading) {
                        _this.loading = true;
                    }
                    else if ((status === ENTERED || status === EXITED) &&
                        _this.loading) {
                        _this.loading = false;
                    }
                }
                var transformStyles = (_a = {},
                    _a[ENTERING] = 0,
                    _a[ENTERED] = 0,
                    _a[EXITING] = animationName === 'slideRight'
                        ? 100 / multipleCount_1
                        : -100 / multipleCount_1,
                    _a[EXITED] = animationName === 'slideRight'
                        ? -100 / multipleCount_1
                        : 100 / multipleCount_1,
                    _a);
                var itemStyle = multipleCount_1 > 1
                    ? __assign({ transitionTimingFunction: 'linear', transitionDuration: transitionDuration_1 }, (animation === 'slide'
                        ? {
                            transform: "translateX(".concat(transformStyles[status], "%)")
                        }
                        : {})) : {};
                var itemRender = function (option) {
                    var _a;
                    return render("".concat(current, "/body"), itemSchema ? itemSchema : defaultSchema, {
                        thumbMode: _this.props.thumbMode,
                        data: createObject(data, isObject(option)
                            ? option
                            : (_a = { item: option }, _a[name] = option, _a))
                    });
                };
                return (React.createElement("div", { className: cx('Carousel-item', animationName, animationStyles[status]), style: itemStyle },
                    multipleCount_1 === 1 ? itemRender(option) : null,
                    multipleCount_1 > 1
                        ? newOptions_1[key].map(function (option, index) { return (React.createElement("div", { key: index, style: {
                                width: 100 / multipleCount_1 + '%',
                                height: '100%',
                                float: 'left'
                            } }, itemRender(option))); })
                        : null));
            })); })));
        }
        return (React.createElement("div", { className: cx("Carousel Carousel--".concat(controlsTheme), (_a = {}, _a['Carousel-arrow--always'] = !!alwaysShowArrow, _a), className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), style: carouselStyles },
            body ? body : placeholder,
            dots ? this.renderDots() : null,
            arrows ? (React.createElement("div", { className: cx('Carousel-leftArrow', setThemeClassName(__assign(__assign({}, this.props), { name: 'galleryControlClassName', id: id, themeCss: themeCss }))), onClick: this.prev }, icons && icons.prev ? (React.isValidElement(icons.prev) ? (icons.prev) : (render('arrow-prev', icons.prev))) : (React.createElement(Icon, { icon: "left-arrow", className: "icon", iconContent: "ImageGallery-prevBtn" })))) : null,
            arrows ? (React.createElement("div", { className: cx('Carousel-rightArrow', setThemeClassName(__assign(__assign({}, this.props), { name: 'galleryControlClassName', id: id, themeCss: themeCss }))), onClick: this.next }, icons && icons.next ? (React.isValidElement(icons.next) ? (icons.next) : (render('arrow-next', icons.next))) : (React.createElement(Icon, { icon: "right-arrow", className: "icon", iconContent: "ImageGallery-nextBtn" })))) : null,
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        },
                        {
                            key: 'galleryControlClassName',
                            weights: {
                                default: {
                                    suf: ' svg',
                                    important: true
                                }
                            }
                        }
                    ]
                }, env: env }))));
    };
    Carousel.defaultProps = {
        auto: true,
        interval: 5000,
        duration: 500,
        controlsTheme: 'light',
        animation: 'fade',
        controls: ['dots', 'arrows'],
        placeholder: '-',
        multiple: { count: 1 },
        alwaysShowArrow: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Carousel.prototype, "prepareAutoSlide", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Carousel.prototype, "autoSlide", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], Carousel.prototype, "transitFramesTowards", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Carousel.prototype, "getFrameId", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Carousel.prototype, "next", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Carousel.prototype, "prev", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Carousel.prototype, "clearAutoTimeout", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], Carousel.prototype, "changeSlide", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Carousel.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Carousel.prototype, "handleMouseLeave", null);
    return Carousel;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(CarouselRenderer, _super);
    function CarouselRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    CarouselRenderer.prototype.componentWillUnmount = function () {
        var _a;
        (_a = _super.prototype.componentWillUnmount) === null || _a === void 0 ? void 0 : _a.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    CarouselRenderer.contextType = ScopedContext;
    CarouselRenderer = __decorate([
        Renderer({
            type: 'carousel'
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], CarouselRenderer);
    return CarouselRenderer;
})(Carousel));

export { Carousel };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
