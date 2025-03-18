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
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
function getLabel(item, index, _a) {
    var type = _a.type, _b = _a.labelField, labelField = _b === void 0 ? 'label' : _b, _c = _a.options, options = _c === void 0 ? [] : _c, enableNodePath = _a.enableNodePath, hideNodePathLabel = _a.hideNodePathLabel, _d = _a.pathSeparator, pathSeparator = _d === void 0 ? '/' : _d;
    if (enableNodePath
        || (type === 'nested-select' && !hideNodePathLabel)) {
        // 将所有祖先节点也展现出来
        var ancestors = amisCore.getTreeAncestors(options, item, true);
        return "".concat(ancestors
            ? ancestors.map(function (item) { return "".concat(item[labelField || 'label']); }).join(" ".concat(pathSeparator, " "))
            : item[labelField || 'label']);
    }
    return item[labelField] || "\u9009\u9879".concat(index);
}
var WordsField = /** @class */ (function (_super) {
    tslib.__extends(WordsField, _super);
    function WordsField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isExpend: false
        };
        return _this;
    }
    WordsField.prototype.toggleExpend = function () {
        this.setState({
            isExpend: !this.state.isExpend
        });
    };
    WordsField.prototype.getLimit = function (words) {
        var limit = this.props.limit;
        return limit !== null && limit !== void 0 ? limit : (Array.isArray(words) ? 10 : 200);
    };
    WordsField.prototype.renderContent = function (words) {
        var _a = this.props, delimiter = _a.delimiter, inTag = _a.inTag, cx = _a.classnames;
        // 纯文字展示
        if (!Array.isArray(words)) {
            return words;
        }
        // 不使用tag时，默认用 逗号连接
        if (!inTag) {
            var lastIndex_1 = words.length - 1;
            return words.map(function (item, index) {
                return _J$X_(React.Fragment, { key: index },
                    item,
                    index === lastIndex_1 ? '' : delimiter ? delimiter : '， ');
            });
        }
        return words.map(function (label, key) { return (
        // 使用tag展示时，默认不使用连接符
        _J$X_(amisUi.Tag, tslib.__assign({ key: key, label: label, className: 'mb-1' }, typeof inTag === 'object' ? tslib.__assign(tslib.__assign({}, inTag), { className: cx(inTag.className) }) : undefined))); });
    };
    WordsField.prototype.renderAll = function (words, hasBtn) {
        if (hasBtn === void 0) { hasBtn = false; }
        var _a = this.props, _b = _a.collapseButtonText, collapseButtonText = _b === void 0 ? '收起' : _b, collapseButton = _a.collapseButton, render = _a.render;
        return (_J$X_(React__default["default"].Fragment, null,
            this.renderContent(words),
            !hasBtn ? null :
                render('collapseBtn', {
                    type: 'button',
                    level: 'link',
                    className: 'ml-1 v-baseline'
                }, tslib.__assign(tslib.__assign({ onClick: this.toggleExpend }, collapseButton), { label: collapseButtonText }))));
    };
    WordsField.prototype.renderPart = function (words) {
        var _a = this.props, _b = _a.expendButtonText, expendButtonText = _b === void 0 ? '展开' : _b, expendButton = _a.expendButton, render = _a.render;
        var limit = this.getLimit(words);
        var partContent = Array.isArray(words)
            ? words.slice(0, limit)
            : words.toString().slice(0, limit);
        return (_J$X_(React__default["default"].Fragment, null,
            this.renderContent(partContent),
            "\u00A0...",
            render('collapseBtn', {
                type: 'button',
                level: 'link',
                className: 'ml-1 v-baseline'
            }, tslib.__assign(tslib.__assign({ onClick: this.toggleExpend }, expendButton), { label: expendButtonText }))));
    };
    WordsField.prototype.getWords = function () {
        var _this = this;
        var _a = this.props, _b = _a.selectedOptions, selectedOptions = _b === void 0 ? [] : _b, oldWords = _a.words, data = _a.data;
        var words;
        if (typeof oldWords === 'string') {
            words = amisCore.resolveVariableAndFilter(oldWords, data, '| raw');
        }
        if (words) {
            return words;
        }
        if ((selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.length) > 0) {
            return selectedOptions
                .map(function (option, index) { return getLabel(option, index, _this.props); });
        }
        return null;
    };
    WordsField.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, style = _a.style;
        var words = this.getWords();
        if (!words) {
            return null;
        }
        var limit = this.getLimit(words);
        var body;
        if (!limit
            || (Array.isArray(words) && words.length <= limit)
            || (!Array.isArray(words) && words.toString().length <= limit)) {
            // 渲染全部，且无展开收起按钮
            body = this.renderAll(words);
        }
        else {
            body = this.state.isExpend
                ? this.renderAll(words, true)
                : this.renderPart(words);
        }
        return _J$X_("div", { className: cx('Words-field', className), style: style }, body);
    };
    WordsField.defaultProps = {
        inTag: false
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], WordsField.prototype, "toggleExpend", null);
    return WordsField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(WordsRenderer, _super);
    function WordsRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WordsRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'words'
        })
    ], WordsRenderer);
    return WordsRenderer;
})(WordsField));
/** @class */ ((function (_super) {
    tslib.__extends(TagsRenderer, _super);
    function TagsRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TagsRenderer.defaultProps = {
        inTag: true
    };
    TagsRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'tags'
        })
    ], TagsRenderer);
    return TagsRenderer;
})(WordsField));

exports.WordsField = WordsField;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
