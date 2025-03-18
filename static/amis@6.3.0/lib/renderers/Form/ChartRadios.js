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
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var ChartRadiosControl = /** @class */ (function (_super) {
    tslib.__extends(ChartRadiosControl, _super);
    function ChartRadiosControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.highlightIndex = -1;
        _this.prevIndex = -1;
        return _this;
    }
    ChartRadiosControl.prototype.chartRef = function (chart) {
        var _this = this;
        var _a;
        this.chart = chart;
        (_a = this.chart) === null || _a === void 0 ? void 0 : _a.on('click', 'series', function (params) {
            _this.props.onToggle(_this.props.options[params.dataIndex]);
        });
        // 因为会要先 setOptions 再来。
        setTimeout(function () { return _this.highlight(); });
    };
    ChartRadiosControl.prototype.highlight = function (index) {
        if (index === void 0) { index = this.highlightIndex; }
        if (this.props.static) {
            return;
        }
        this.highlightIndex = index;
        if (!this.chart || this.prevIndex === index) {
            return;
        }
        if (~this.prevIndex) {
            this.chart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: this.prevIndex
            });
        }
        if (~index) {
            this.chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: index
            });
            // 显示 tooltip
            if (this.props.showTooltipOnHighlight) {
                this.chart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: index
                });
            }
        }
        this.prevIndex = index;
    };
    ChartRadiosControl.prototype.componentDidMount = function () {
        // to do 初始化有值的情况暂时无法生效
        if (this.props.selectedOptions.length) {
            this.highlight(this.props.options.indexOf(this.props.selectedOptions[0]));
        }
    };
    ChartRadiosControl.prototype.componentDidUpdate = function () {
        if (this.props.selectedOptions.length) {
            this.highlight(this.props.options.indexOf(this.props.selectedOptions[0]));
        }
    };
    ChartRadiosControl.prototype.renderStatic = function (displayValue) {
        if (displayValue === void 0) { displayValue = '-'; }
        this.prevIndex = -1;
        this.highlightIndex = -1;
        var _a = this.props, _b = _a.options, options = _b === void 0 ? [] : _b, selectedOptions = _a.selectedOptions, _c = _a.labelField, labelField = _c === void 0 ? 'label' : _c, _d = _a.valueField, valueField = _d === void 0 ? 'value' : _d, chartValueField = _a.chartValueField;
        if (options.length && selectedOptions.length) {
            var count = options.reduce(function (all, cur) {
                return all + cur[chartValueField || valueField];
            }, 0);
            if (count > 0) {
                var percent = ((+selectedOptions[0][chartValueField || valueField] / count) *
                    100).toFixed(2);
                displayValue = "".concat(selectedOptions[0][labelField], "\uFF1A").concat(percent, "%");
            }
        }
        return _J$X_(React__default["default"].Fragment, null, displayValue);
    };
    ChartRadiosControl.prototype.render = function () {
        var _a = this.props, options = _a.options, labelField = _a.labelField, chartValueField = _a.chartValueField, valueField = _a.valueField, render = _a.render;
        var config = tslib.__assign(tslib.__assign({ legend: {
                top: 10
            }, tooltip: {
                formatter: function (params) {
                    return "".concat(params.name, "\uFF1A").concat(params.value[chartValueField || valueField || 'value'], "\uFF08").concat(params.percent, "%\uFF09");
                }
            }, series: [
                {
                    type: 'pie',
                    top: 30,
                    bottom: 0
                }
            ] }, this.props.config), { dataset: {
                dimensions: [
                    labelField || 'label',
                    chartValueField || valueField || 'value'
                ],
                source: options
            } });
        return render('chart', {
            type: 'chart'
        }, {
            config: config,
            chartRef: this.chartRef
        });
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], ChartRadiosControl.prototype, "chartRef", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], ChartRadiosControl.prototype, "render", null);
    return ChartRadiosControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(RadiosControlRenderer, _super);
    function RadiosControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadiosControlRenderer.defaultProps = {
        multiple: false
    };
    RadiosControlRenderer = tslib.__decorate([
        amisCore.OptionsControl({
            type: 'chart-radios',
            sizeMutable: false
        })
    ], RadiosControlRenderer);
    return RadiosControlRenderer;
})(ChartRadiosControl));

exports["default"] = ChartRadiosControl;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
