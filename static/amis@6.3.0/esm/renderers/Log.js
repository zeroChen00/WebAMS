/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate } from 'tslib';
import React from 'react';
import { resolveVariableAndFilter, isEffectiveApi, isApiOutdated, buildApi, Renderer } from 'amis-core';
import { VirtualList, Icon, SearchBox } from 'amis-ui';

var foregroundColors = {
    '30': 'black',
    '31': 'red',
    '32': 'green',
    '33': 'yellow',
    '34': 'blue',
    '35': 'magenta',
    '36': 'cyan',
    '37': 'white',
    '90': 'grey'
};
var backgroundColors = {
    '40': 'black',
    '41': 'red',
    '42': 'green',
    '43': 'yellow',
    '44': 'blue',
    '45': 'magenta',
    '46': 'cyan',
    '47': 'white'
};
var Log = /** @class */ (function (_super) {
    __extends(Log, _super);
    function Log(props) {
        var _this = _super.call(this, props) || this;
        _this.isDone = false;
        _this.autoScroll = false;
        _this.state = {
            lastLine: '',
            logs: [],
            originLastLine: '',
            originLogs: [],
            refresh: true,
            showLineNumber: false,
            filterWord: ''
        };
        _this.refresh = function (e) {
            var origin = _this.state.refresh;
            _this.setState({
                refresh: !origin
            });
            if (!origin) {
                _this.clear(e);
                _this.loadLogs();
            }
            e.preventDefault();
        };
        _this.clear = function (e) {
            _this.setState({
                logs: (_this.logs = []),
                lastLine: (_this.lastLine = ''),
                originLogs: [],
                originLastLine: ''
            });
            e === null || e === void 0 ? void 0 : e.preventDefault();
        };
        _this.filterWord = function (logs, lastLine, word) {
            var originLogs = logs;
            var originLastLine = lastLine;
            if (word !== '' && word !== undefined && word !== null && word.length > 0) {
                logs = logs.filter(function (line) { return line.includes(word); });
                if (!lastLine.includes(word)) {
                    lastLine = '';
                }
            }
            _this.setState({
                filterWord: word,
                lastLine: (_this.lastLine = lastLine),
                logs: (_this.logs = logs),
                originLogs: originLogs,
                originLastLine: originLastLine
            });
        };
        _this.addLines = function (lines) {
            lines = lines.concat();
            var maxLength = _this.props.maxLength;
            var lastLine = _this.lastLine || '';
            var logs = (_this.logs || []).concat();
            // 如果没有换行符就只更新最后一行
            if (lines.length === 1) {
                lastLine += lines[0];
                _this.setState({
                    lastLine: (_this.lastLine = lastLine)
                });
            }
            else {
                // 将之前的数据补上
                lines[0] = lastLine + (lines[0] || '');
                // 最后一个要么是空，要么是下一行的数据
                lastLine = lines.pop() || '';
                if (maxLength) {
                    if (logs.length + lines.length > maxLength) {
                        logs.splice(0, logs.length + lines.length - maxLength);
                    }
                }
                logs = logs.concat(lines);
                _this.filterWord(logs, lastLine, _this.state.filterWord);
            }
        };
        _this.logRef = React.createRef();
        _this.autoScroll = props.autoScroll || false;
        _this.pauseOrResumeScrolling = _this.pauseOrResumeScrolling.bind(_this);
        return _this;
    }
    Log.prototype.componentWillUnmount = function () {
        if (this.logRef && this.logRef.current) {
            this.logRef.current.removeEventListener('scroll', this.pauseOrResumeScrolling);
        }
    };
    Log.prototype.componentDidMount = function () {
        if (this.autoScroll && this.logRef && this.logRef.current) {
            this.logRef.current.addEventListener('scroll', this.pauseOrResumeScrolling);
        }
        if (this.props.source) {
            var ret = typeof this.props.source === 'string'
                ? resolveVariableAndFilter(this.props.source, this.props.data, '| raw')
                : this.props.source;
            if (ret && isEffectiveApi(ret)) {
                this.loadLogs();
            }
            else if (typeof ret === 'string' ||
                (Array.isArray(ret) && ret.every(function (item) { return typeof item === 'string'; }))) {
                this.clear();
                this.addLines(Array.isArray(ret) ? ret : [ret]);
            }
        }
    };
    Log.prototype.componentDidUpdate = function (prevProps) {
        if (this.autoScroll && this.logRef && this.logRef.current) {
            this.logRef.current.scrollTop = this.logRef.current.scrollHeight;
        }
        if (!this.props.source) {
            return;
        }
        var ret = typeof this.props.source === 'string'
            ? resolveVariableAndFilter(this.props.source, this.props.data, '| raw')
            : this.props.source;
        if (ret && isEffectiveApi(ret)) {
            // todo 如果原来的请求还在，应该先取消
            isApiOutdated(prevProps.source, this.props.source, prevProps.data, this.props.data) && this.loadLogs();
        }
        else if (typeof ret === 'string' ||
            (Array.isArray(ret) && ret.every(function (item) { return typeof item === 'string'; }))) {
            var prevRet = resolveVariableAndFilter(prevProps.source, prevProps.data, '| raw');
            if (prevRet !== ret && ret) {
                this.clear();
                this.addLines(Array.isArray(ret) ? ret : [ret]);
            }
        }
    };
    // 如果向上滚动就停止自动滚动，除非滚到底部
    Log.prototype.pauseOrResumeScrolling = function () {
        if (this.logRef && this.logRef.current) {
            var _a = this.logRef.current, scrollHeight = _a.scrollHeight, scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight;
            this.autoScroll = scrollHeight - (scrollTop + offsetHeight) < 50;
        }
    };
    Log.prototype.loadLogs = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, source, data, env, __, encoding, _e, credentials, api, res, body, reader, _f, done, value, text, lines;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _d = this.props, source = _d.source, data = _d.data, env = _d.env, __ = _d.translate, encoding = _d.encoding, _d.maxLength, _e = _d.credentials, credentials = _e === void 0 ? 'include' : _e;
                        api = buildApi(source, data);
                        if (!api.url) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fetch(api.url, {
                                method: ((_a = api.method) === null || _a === void 0 ? void 0 : _a.toLocaleUpperCase()) || 'GET',
                                headers: api.headers || undefined,
                                body: api.data ? JSON.stringify(api.data) : undefined,
                                credentials: credentials
                            })];
                    case 1:
                        res = _g.sent();
                        if (!(res.status === 200)) return [3 /*break*/, 8];
                        body = res.body;
                        if (!body) {
                            return [2 /*return*/];
                        }
                        reader = body.getReader();
                        _g.label = 2;
                    case 2:
                        if (!!this.state.refresh) return [3 /*break*/, 4];
                        return [4 /*yield*/, reader.cancel('click cancel button').then(function () {
                                _this.props.env.notify('success', '日志已经停止刷新');
                                return;
                            })];
                    case 3:
                        _g.sent();
                        _g.label = 4;
                    case 4: return [4 /*yield*/, reader.read()];
                    case 5:
                        _f = _g.sent(), done = _f.done, value = _f.value;
                        if (value) {
                            text = new TextDecoder(encoding).decode(value, { stream: true });
                            lines = text.split('\n');
                            this.addLines(lines);
                        }
                        if (done) {
                            this.isDone = true;
                            return [2 /*return*/];
                        }
                        _g.label = 6;
                    case 6: return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        !api.silent &&
                            env.notify('error', (_c = (_b = api === null || api === void 0 ? void 0 : api.messages) === null || _b === void 0 ? void 0 : _b.failed) !== null && _c !== void 0 ? _c : __('fetchFailed'));
                        _g.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    // 简单支持 ansi 颜色，只支持一行，不支持嵌套
    Log.prototype.ansiColrToHtml = function (line) {
        var disableColor = this.props.disableColor;
        if (disableColor === true) {
            return line;
        }
        var match = line.match(/\u001b\[([^m]+)m/);
        if (match) {
            var colorNumber = match[1];
            if (colorNumber) {
                line = line.replace(/\u001b[^m]*?m/g, '');
                if (colorNumber in foregroundColors) {
                    return (React.createElement("span", { style: { color: foregroundColors[colorNumber] } }, line));
                }
                else if (colorNumber in backgroundColors) {
                    return (React.createElement("span", { style: { backgroundColor: backgroundColors[colorNumber] } }, line.replace(/\u001b[^m]*?m/g, '')));
                }
            }
        }
        return line;
    };
    Log.prototype.renderHighlightWord = function (line) {
        var _this = this;
        var cx = this.props.classnames;
        var filterWord = this.state.filterWord;
        if (filterWord === '') {
            return this.ansiColrToHtml(line);
        }
        var items = line.split(filterWord);
        return items.map(function (item, index) {
            if (index < items.length - 1) {
                return (React.createElement("span", null,
                    _this.ansiColrToHtml(item),
                    React.createElement("span", { className: cx('Log-line-highlight') }, filterWord)));
            }
            return item;
        });
    };
    /**
     * 渲染某一行
     */
    Log.prototype.renderLine = function (index, line, showLineNumber) {
        var _a = this.props, cx = _a.classnames; _a.disableColor;
        return (React.createElement("div", { className: cx('Log-line'), key: index },
            showLineNumber && (React.createElement("span", { className: cx('Log-line-number') },
                index + 1,
                " ")),
            this.renderHighlightWord(line)));
    };
    Log.prototype.render = function () {
        var _this = this;
        var _a = this.props, source = _a.source, className = _a.className, style = _a.style, cx = _a.classnames, placeholder = _a.placeholder, height = _a.height, rowHeight = _a.rowHeight; _a.disableColor; var __ = _a.translate, operation = _a.operation;
        var _b = this.state, refresh = _b.refresh, showLineNumber = _b.showLineNumber;
        var loading = __(placeholder);
        if (!source) {
            loading = __('Log.mustHaveSource');
        }
        var lines;
        var logs = this.state.lastLine
            ? this.state.logs.concat([this.state.lastLine])
            : this.state.logs;
        // 如果设置 rowHeight 就开启延迟渲染
        var useVirtualRender = rowHeight;
        if (useVirtualRender) {
            lines = (React.createElement(VirtualList, { height: height, itemCount: logs.length, itemSize: rowHeight, renderItem: function (_a) {
                    var index = _a.index, style = _a.style;
                    return (React.createElement("div", { className: cx('Log-line'), key: index, style: __assign(__assign({}, style), { whiteSpace: 'nowrap' }) },
                        showLineNumber && (React.createElement("span", { className: cx('Log-line-number') },
                            index + 1,
                            " ")),
                        _this.renderHighlightWord(logs[index])));
                } }));
        }
        else {
            lines = logs.map(function (line, index) {
                return _this.renderLine(index, line, showLineNumber);
            });
        }
        return (React.createElement("div", { className: cx('Log', className), style: style },
            React.createElement("div", { className: cx('Log-operation') }, operation && (operation === null || operation === void 0 ? void 0 : operation.length) > 0 && (React.createElement(React.Fragment, null,
                operation.includes('stop') && (React.createElement("a", { title: __('stop'), className: !refresh ? 'is-disabled' : '', onClick: this.refresh },
                    React.createElement(Icon, { icon: "pause" }))),
                operation.includes('restart') && (React.createElement("a", { title: __('reload'), className: refresh ? 'is-disabled' : '', onClick: this.refresh },
                    React.createElement(Icon, { icon: "refresh" }))),
                operation.includes('showLineNumber') && (React.createElement("a", { title: showLineNumber
                        ? __('Log.notShowLineNumber')
                        : __('Log.showLineNumber'), onClick: function (e) {
                        _this.setState({ showLineNumber: !showLineNumber });
                        e.preventDefault();
                    } },
                    React.createElement(Icon, { icon: showLineNumber ? 'invisible' : 'view' }))),
                operation.includes('clear') && (React.createElement("a", { onClick: this.clear, title: __('clear') },
                    React.createElement(Icon, { icon: "remove" }))),
                operation && operation.includes('filter') && (React.createElement(SearchBox, { className: cx('Log-filter-box'), placeholder: "\u8FC7\u6EE4\u8BCD", onChange: function (value) {
                        return _this.filterWord(_this.state.originLogs, _this.state.lastLine, value);
                    }, value: this.state.filterWord }))))),
            React.createElement("div", { ref: this.logRef, className: cx('Log-body'), style: { height: useVirtualRender ? 'auto' : height } }, useVirtualRender ? lines : lines.length ? lines : loading)));
    };
    Log.defaultProps = {
        height: 500,
        autoScroll: true,
        placeholder: 'loading',
        encoding: 'utf-8'
    };
    return Log;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(LogRenderer, _super);
    function LogRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogRenderer = __decorate([
        Renderer({
            type: 'log'
        })
    ], LogRenderer);
    return LogRenderer;
})(Log));

export { Log };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
