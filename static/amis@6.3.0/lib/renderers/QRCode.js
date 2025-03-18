/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var amisCore = require('amis-core');
var qrcode_react = require('qrcode.react');
var mapValues = require('lodash/mapValues');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var mapValues__default = /*#__PURE__*/_interopDefaultLegacy(mapValues);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
function downloadBlob(blob, filename) {
    var objectUrl = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () { return URL.revokeObjectURL(objectUrl); }, 500);
}
var QRCode = /** @class */ (function (_super) {
    tslib.__extends(QRCode, _super);
    function QRCode(props) {
        var _this = _super.call(this, props) || this;
        _this.ref = React__default["default"].createRef();
        return _this;
    }
    /**
     * 获取图片配置
     */
    QRCode.prototype.getImageSettings = function () {
        var _a = this.props, imageSettings = _a.imageSettings, data = _a.data;
        if (!imageSettings ||
            !amisCore.isObject(imageSettings) ||
            !imageSettings.src ||
            typeof imageSettings.src !== 'string') {
            return undefined;
        }
        if (amisCore.isPureVariable(imageSettings.src)) {
            imageSettings.src = amisCore.resolveVariableAndFilter(imageSettings.src, data, '| raw');
        }
        return mapValues__default["default"](imageSettings, function (value, key) {
            if (!!~['width', 'height', 'x', 'y'].indexOf(key)) {
                /** 处理非数字格式的输入，QRCodeSVG内部会对空值进行默认赋值 */
                return amisCore.isNumeric(value) ? Number(value) : null;
            }
            return value;
        });
    };
    /**
     * 接收动作事件
     */
    QRCode.prototype.doAction = function (action, data, throwErrors, args) {
        var _a;
        var codeSize = this.props.codeSize;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'saveAs') {
            var fileName = (args === null || args === void 0 ? void 0 : args.name) || 'qr-code.svg';
            if ((_a = this.ref) === null || _a === void 0 ? void 0 : _a.current) {
                var svgElement = this.ref.current.querySelector('svg');
                if (svgElement) {
                    var contentWithSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" height=\"".concat(codeSize, "\" width=\"").concat(codeSize, "\" viewBox=\"").concat(svgElement.getAttribute('viewBox') || '0 0 37 37', "\">\n         ").concat(svgElement.innerHTML, "\n         </svg>");
                    var blob = new Blob([contentWithSvg], { type: 'image/svg+xml' });
                    downloadBlob(blob, fileName);
                }
            }
        }
    };
    QRCode.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, qrcodeClassName = _a.qrcodeClassName, codeSize = _a.codeSize, backgroundColor = _a.backgroundColor, foregroundColor = _a.foregroundColor, placeholder = _a.placeholder, level = _a.level, defaultValue = _a.defaultValue, data = _a.data, ns = _a.classPrefix;
        var finalValue = amisCore.getPropValue(this.props, function () { return amisCore.filter(defaultValue, data, '| raw') || undefined; });
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "QrCode"), className), style: style, ref: this.ref }, !finalValue ? (_J$X_("span", { className: "".concat(ns, "QrCode--placeholder") }, placeholder)) : finalValue.length > 2953 ? (
        // https://github.com/zpao/qrcode.react/issues/69
        _J$X_("span", { className: "text-danger" }, "\u4E8C\u7EF4\u7801\u503C\u8FC7\u957F\uFF0C\u8BF7\u8BBE\u7F6E2953\u4E2A\u5B57\u7B26\u4EE5\u4E0B\u7684\u6587\u672C")) : (_J$X_(qrcode_react.QRCodeSVG
        // @ts-ignore 其实是支持的
        , { 
            // @ts-ignore 其实是支持的
            className: qrcodeClassName, value: finalValue, size: codeSize, bgColor: backgroundColor, fgColor: foregroundColor, level: level || 'L', imageSettings: this.getImageSettings() }))));
    };
    QRCode.defaultProps = {
        codeSize: 128,
        qrcodeClassName: '',
        backgroundColor: '#fff',
        foregroundColor: '#000',
        level: 'L',
        placeholder: '-'
    };
    return QRCode;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(QRCodeRenderer, _super);
    function QRCodeRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    QRCodeRenderer.prototype.componentWillUnmount = function () {
        var _a;
        (_a = _super.prototype.componentWillUnmount) === null || _a === void 0 ? void 0 : _a.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    QRCodeRenderer.contextType = amisCore.ScopedContext;
    QRCodeRenderer = tslib.__decorate([
        amisCore.Renderer({
            test: /(^|\/)qr\-?code$/,
            name: 'qrcode'
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], QRCodeRenderer);
    return QRCodeRenderer;
})(QRCode));

exports["default"] = QRCode;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
