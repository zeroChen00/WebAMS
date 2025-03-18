/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __decorate } from 'tslib';
import React from 'react';
import { getPropValue, isPureVariable, resolveVariableAndFilter, isApiOutdated, isEffectiveApi, LazyComponent, Renderer } from 'amis-core';

function loadComponent() {
    return import('amis-ui/lib/components/Markdown').then(function (item) { return item.default; });
}
var Markdown = /** @class */ (function (_super) {
    __extends(Markdown, _super);
    function Markdown(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props, name = _a.name, data = _a.data, src = _a.src;
        if (src) {
            _this.state = { content: '' };
            _this.updateContent();
        }
        else {
            var content = getPropValue(_this.props) ||
                (name && isPureVariable(name)
                    ? resolveVariableAndFilter(name, data, '| raw')
                    : null);
            _this.state = { content: content };
        }
        return _this;
    }
    Markdown.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (props.src) {
            if (isApiOutdated(prevProps.src, props.src, prevProps.data, props.data)) {
                this.updateContent();
            }
        }
        else {
            this.updateContent();
        }
    };
    Markdown.prototype.updateContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, data, src, env, ret, content;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, name = _a.name, data = _a.data, src = _a.src, env = _a.env;
                        if (!(src && isEffectiveApi(src, data))) return [3 /*break*/, 2];
                        return [4 /*yield*/, env.fetcher(src, data)];
                    case 1:
                        ret = _b.sent();
                        if (typeof ret === 'string') {
                            this.setState({ content: ret });
                        }
                        else if (typeof ret === 'object' && ret.data) {
                            this.setState({ content: ret.data });
                        }
                        else {
                            console.error('markdown response error', ret);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        content = getPropValue(this.props) ||
                            (name && isPureVariable(name)
                                ? resolveVariableAndFilter(name, data, '| raw')
                                : null);
                        if (content !== this.state.content) {
                            this.setState({ content: content });
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Markdown.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, cx = _a.classnames, options = _a.options;
        return (React.createElement("div", { className: cx('Markdown', className), style: style },
            React.createElement(LazyComponent, { getComponent: loadComponent, content: this.state.content || '', options: options })));
    };
    return Markdown;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(MarkdownRenderer, _super);
    function MarkdownRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkdownRenderer = __decorate([
        Renderer({
            type: 'markdown'
        })
    ], MarkdownRenderer);
    return MarkdownRenderer;
})(Markdown));

export { Markdown };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
