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
var mobxStateTree = require('mobx-state-tree');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var _a;
var Store = amisCore.StoreNode.named('MappingStore')
    .props({
    fetching: false,
    errorMsg: '',
    valueField: 'value',
    map: mobxStateTree.types.frozen({})
})
    .actions(function (self) {
    var load = mobxStateTree.flow(function (env, api, data) {
        var ret, data_1, e_1;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    self.fetching = true;
                    return [4 /*yield*/, env.fetcher(api, data)];
                case 1:
                    ret = _a.sent();
                    if (ret.ok) {
                        data_1 = amisCore.normalizeApiResponseData(ret.data);
                        self.setMap(Array.isArray(data_1.options)
                            ? data_1.options
                            : Array.isArray(data_1.items)
                                ? data_1.items
                                : data_1);
                    }
                    else {
                        throw new Error(ret.msg || 'fetch error');
                    }
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    self.errorMsg = e_1.message;
                    return [3 /*break*/, 4];
                case 3:
                    self.fetching = false;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
    return {
        load: load,
        setMap: function (options) {
            if (Array.isArray(options)) {
                options = options.reduce(function (res, now) {
                    if (now == null) {
                        return res;
                    }
                    else if (amisCore.isObject(now)) {
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
                            res[now[self.valueField]] = now;
                        }
                    }
                    return res;
                }, {});
            }
            if (amisCore.isObject(options)) {
                self.map = tslib.__assign({}, options);
            }
        }
    };
});
var MappingField = amisUi.withStore(function (props) {
    return Store.create({
        id: amisCore.guid(),
        storeType: Store.name
    }, props.env);
})((_a = /** @class */ (function (_super) {
        tslib.__extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            props.store.syncProps(props, undefined, ['valueField', 'map']);
            return _this;
        }
        class_1.prototype.componentDidMount = function () {
            this.reload();
        };
        class_1.prototype.componentDidUpdate = function (prevProps) {
            var props = this.props;
            var _a = this.props, store = _a.store, source = _a.source, data = _a.data;
            store.syncProps(props, prevProps, source ? ['valueField'] : ['valueField', 'map']);
            if (amisCore.isPureVariable(source)) {
                var prev = amisCore.resolveVariableAndFilter(prevProps.source, prevProps.data, '| raw');
                var curr = amisCore.resolveVariableAndFilter(source, data, '| raw');
                if (prev !== curr) {
                    store.setMap(curr);
                }
            }
            else if (amisCore.isApiOutdated(prevProps.source, props.source, prevProps.data, props.data)) {
                this.reload();
            }
        };
        class_1.prototype.reload = function () {
            var _a;
            var _b = this.props, source = _b.source, data = _b.data, env = _b.env;
            var store = this.props.store;
            if (amisCore.isPureVariable(source)) {
                store.setMap(amisCore.resolveVariableAndFilter(source, data, '| raw'));
            }
            else if (amisCore.isEffectiveApi(source, data)) {
                var api = amisCore.normalizeApi(source, 'get');
                api.cache = (_a = api.cache) !== null && _a !== void 0 ? _a : 30 * 1000;
                store.load(env, api, data);
            }
        };
        class_1.prototype.renderSingleValue = function (key, reactKey, needStyle) {
            var _a;
            var _b = this.props, className = _b.className, style = _b.style, placeholder = _b.placeholder, cx = _b.classnames, store = _b.store;
            var viewValue = (_J$X_("span", { className: "text-muted" }, placeholder));
            var map = store.map;
            var value = undefined;
            // trim 一下，干掉一些空白字符。
            key = typeof key === 'string' ? key.trim() : key;
            var curStyle = needStyle ? style : undefined;
            if (typeof key !== 'undefined' &&
                map &&
                (value =
                    (_a = map[key]) !== null && _a !== void 0 ? _a : (key === true && map['1']
                        ? map['1']
                        : key === false && map['0']
                            ? map['0']
                            : map['*'])) !== undefined) {
                viewValue = this.renderViewValue(value);
            }
            return (_J$X_("span", { key: "map-".concat(reactKey), className: cx('MappingField', className), style: curStyle }, viewValue));
        };
        class_1.prototype.renderViewValue = function (value) {
            var _a = this.props, render = _a.render, itemSchema = _a.itemSchema, data = _a.data, labelField = _a.labelField, name = _a.name;
            if (!itemSchema) {
                var label = value;
                if (amisCore.isObject(value)) {
                    if (labelField === undefined || labelField === '') {
                        if (!value.hasOwnProperty('type')) {
                            // 映射值是object
                            // 没配置labelField
                            // object 也没有 type，不能作为schema渲染
                            // 默认取 label 字段
                            label = value['label'];
                        }
                        else {
                            // 不会下发 value 了，所以要把 name 下发一下
                            label = tslib.__assign({ name: name }, label);
                        }
                    }
                    else {
                        label = value[labelField || 'label'];
                    }
                }
                // 处理 table column 渲染 mapping 的值是 tagSchema 不正常渲染的情况
                if (amisCore.isObject(label) &&
                    label.type === 'tag' &&
                    !amisCore.isObject(label.label) &&
                    label.label != null) {
                    return render('mapping-tag', label, {
                        // 避免渲染tag时从 props.value 取值而无法渲染 label
                        value: null
                    });
                }
                return render('tpl', label);
            }
            return render('mappingItemSchema', itemSchema, tslib.__assign({ data: amisCore.createObject(data, amisCore.isObject(value) ? value : { item: value }) }, ((itemSchema === null || itemSchema === void 0 ? void 0 : itemSchema.type) === 'tag' ? { value: null } : {})));
        };
        class_1.prototype.render = function () {
            var _this = this;
            var _a = this.props, style = _a.style, defaultValue = _a.defaultValue, data = _a.data;
            var mapKey = amisCore.getPropValue(this.props);
            // 让默认值支持表达式
            if (defaultValue &&
                amisCore.isPureVariable(defaultValue) &&
                defaultValue === mapKey) {
                mapKey = amisCore.resolveVariableAndFilter(defaultValue, data, '| raw');
            }
            if (Array.isArray(mapKey)) {
                return (_J$X_("span", { style: style }, mapKey.map(function (singleKey, index) {
                    return _this.renderSingleValue(singleKey, index);
                })));
            }
            else {
                return this.renderSingleValue(mapKey, 0, true);
            }
        };
        return class_1;
    }(React__default["default"].Component)),
    _a.defaultProps = {
        placeholder: '-',
        map: {
            '*': '通配值'
        }
    },
    _a));
/** @class */ ((function (_super) {
    tslib.__extends(MappingFieldRenderer, _super);
    function MappingFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MappingFieldRenderer.prototype.render = function () {
        return _J$X_(MappingField, tslib.__assign({}, this.props));
    };
    MappingFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            test: /(^|\/)(?:map|mapping)$/,
            name: 'mapping'
        })
    ], MappingFieldRenderer);
    return MappingFieldRenderer;
})(React__default["default"].Component));

exports.MappingField = MappingField;
exports.Store = Store;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
