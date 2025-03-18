/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __read, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { createRendererEvent, createObject, runActions, resolveVariableAndFilter, isApiOutdated, setThemeClassName, CustomStyle, autobind, ScopedContext, Renderer } from 'amis-core';

var IFrame = /** @class */ (function (_super) {
    __extends(IFrame, _super);
    function IFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.IFrameRef = React.createRef();
        _this.state = {
            width: _this.props.width || '100%',
            height: _this.props.height || '100%'
        };
        return _this;
    }
    IFrame.prototype.componentDidMount = function () {
        window.addEventListener('message', this.onMessage);
    };
    IFrame.prototype.componentDidUpdate = function (prevProps) {
        var data = this.props.data;
        if (data !== prevProps.data) {
            this.postMessage('update', data);
        }
        else if (this.props.width !== prevProps.width ||
            this.props.height !== prevProps.height) {
            this.setState({
                width: this.props.width || '100%',
                height: this.props.height || '100%'
            });
        }
    };
    IFrame.prototype.componentWillUnmount = function () {
        window.removeEventListener('message', this.onMessage);
    };
    /** 校验URL是否合法 */
    IFrame.prototype.validateURL = function (url) {
        // base64编码格式
        if (url &&
            typeof url === 'string' &&
            /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9]+);base64,.*/.test(url)) {
            return true;
        }
        // HTTP[S]协议
        if (url &&
            typeof url === 'string' &&
            !/^(\.\/|\.\.\/|\/|(blob\:)?https?\:\/\/|\/\/)/.test(url)) {
            return false;
        }
        return true;
    };
    IFrame.prototype.onMessage = function (e) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, events, onEvent, onAction, data, _e, prefix, type, eventConfig, rendererEvent, action;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _d = this.props, events = _d.events, onEvent = _d.onEvent, onAction = _d.onAction, data = _d.data;
                        if (typeof ((_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.type) !== 'string') {
                            return [2 /*return*/];
                        }
                        _e = __read(e.data.type.split(':'), 2), prefix = _e[0], type = _e[1];
                        if (prefix !== 'amis' || !type) {
                            return [2 /*return*/];
                        }
                        if (!(type === 'resize' && e.data.data)) return [3 /*break*/, 1];
                        this.setState({
                            width: e.data.data.width || '100%',
                            height: e.data.data.height || '100%'
                        });
                        return [3 /*break*/, 4];
                    case 1:
                        eventConfig = onEvent === null || onEvent === void 0 ? void 0 : onEvent[type];
                        if (!(eventConfig && ((_b = eventConfig.actions) === null || _b === void 0 ? void 0 : _b.length))) return [3 /*break*/, 3];
                        rendererEvent = createRendererEvent(type, {
                            env: (_c = this.props) === null || _c === void 0 ? void 0 : _c.env,
                            nativeEvent: e,
                            data: createObject(data, e.data.data),
                            scoped: this.context
                        });
                        return [4 /*yield*/, runActions(eventConfig.actions, this, rendererEvent)];
                    case 2:
                        _f.sent();
                        if (rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        _f.label = 3;
                    case 3:
                        if (events) {
                            action = events[type];
                            action && onAction(e, action, createObject(data, e.data.data));
                        }
                        _f.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IFrame.prototype.onLoad = function () {
        var _a = this.props, src = _a.src, data = _a.data;
        src && this.postMessage('init', data);
    };
    // 当别的组件通知 iframe reload 的时候执行。
    IFrame.prototype.reload = function (subpath, query) {
        if (query) {
            return this.receive(query);
        }
        var _a = this.props, src = _a.src, data = _a.data;
        if (src) {
            this.IFrameRef.current.src =
                resolveVariableAndFilter(src, data, '| raw');
        }
    };
    // 当别的组件把数据发给 iframe 里面的时候执行。
    IFrame.prototype.receive = function (values) {
        var _a = this.props, src = _a.src, data = _a.data;
        var newData = createObject(data, values);
        this.postMessage('receive', newData);
        if (isApiOutdated(src, src, data, newData)) {
            this.IFrameRef.current.src =
                resolveVariableAndFilter(src, newData, '| raw');
        }
    };
    IFrame.prototype.postMessage = function (type, data) {
        var _a, _b;
        (_b = (_a = this.IFrameRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
            type: "amis:".concat(type),
            data: JSON.parse(JSON.stringify(data))
        }, '*');
    };
    IFrame.prototype.render = function () {
        var _a = this.state, width = _a.width, height = _a.height;
        var _b = this.props, className = _b.className, src = _b.src, name = _b.name, frameBorder = _b.frameBorder, data = _b.data, style = _b.style, allow = _b.allow, sandbox = _b.sandbox, referrerpolicy = _b.referrerpolicy, __ = _b.translate, id = _b.id, wrapperCustomStyle = _b.wrapperCustomStyle, env = _b.env, themeCss = _b.themeCss; _b.baseControlClassName; var cx = _b.classnames;
        var tempStyle = {};
        width !== void 0 && (tempStyle.width = width);
        height !== void 0 && (tempStyle.height = height);
        style = __assign(__assign({}, tempStyle), style);
        var finalSrc = src
            ? resolveVariableAndFilter(src, data, '| raw')
            : undefined;
        if (!this.validateURL(finalSrc)) {
            return React.createElement("p", null, __('Iframe.invalid'));
        }
        if (location.protocol === 'https:' &&
            finalSrc &&
            finalSrc.startsWith('http://')) {
            env.notify('error', __('Iframe.invalidProtocol'));
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("iframe", { name: name, className: cx('IFrame', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))), frameBorder: frameBorder, style: style, ref: this.IFrameRef, onLoad: this.onLoad, src: finalSrc, allow: allow, referrerPolicy: referrerpolicy, sandbox: sandbox }),
            React.createElement(CustomStyle, __assign({}, this.props, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env }))));
    };
    IFrame.propsList = ['src', 'className'];
    IFrame.defaultProps = {
        className: '',
        frameBorder: 0
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MessageEvent]),
        __metadata("design:returntype", Promise)
    ], IFrame.prototype, "onMessage", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IFrame.prototype, "onLoad", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], IFrame.prototype, "reload", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IFrame.prototype, "receive", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], IFrame.prototype, "postMessage", null);
    return IFrame;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(IFrameRenderer, _super);
    function IFrameRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    IFrameRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    IFrameRenderer.contextType = ScopedContext;
    IFrameRenderer = __decorate([
        Renderer({
            type: 'iframe'
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], IFrameRenderer);
    return IFrameRenderer;
})(IFrame));

export { IFrame as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
