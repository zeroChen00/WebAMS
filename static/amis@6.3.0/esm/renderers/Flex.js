/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { buildStyle, setThemeClassName, CustomStyle, Renderer } from 'amis-core';

/**
 * @file 简化版 Flex 布局，主要用于不熟悉 CSS 的开发者
 */
var Flex = /** @class */ (function (_super) {
    __extends(Flex, _super);
    function Flex(props) {
        return _super.call(this, props) || this;
    }
    Flex.prototype.render = function () {
        var _a = this.props, items = _a.items, direction = _a.direction, justify = _a.justify, alignItems = _a.alignItems, alignContent = _a.alignContent, style = _a.style, className = _a.className, render = _a.render, disabled = _a.disabled, data = _a.data, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, env = _a.env, themeCss = _a.themeCss, cx = _a.classnames; _a.testid;
        var styleVar = buildStyle(style, data);
        var flexStyle = __assign({ display: 'flex', flexDirection: direction, justifyContent: justify, alignItems: alignItems, alignContent: alignContent }, styleVar);
        if (flexStyle.flexBasis !== undefined && flexStyle.flex) {
            // 合并flex和flexBasis，并优先使用flexBasis
            var flexValArr = flexStyle.flex.split(' ');
            flexStyle.flex = "".concat(flexValArr[0], " ").concat(flexValArr[1] || flexValArr[0], " ").concat(flexStyle.flexBasis);
        }
        return (React.createElement("div", { style: flexStyle, className: cx('Flex', className, setThemeClassName(__assign(__assign({}, this.props), { name: 'baseControlClassName', id: id, themeCss: themeCss })), setThemeClassName(__assign(__assign({}, this.props), { name: 'wrapperCustomStyle', id: id, themeCss: wrapperCustomStyle }))) },
            (Array.isArray(items) ? items : items ? [items] : []).map(function (item, key) {
                var _a;
                return render("flexItem/".concat(key), item, {
                    key: "flexItem/".concat(key),
                    disabled: (_a = item === null || item === void 0 ? void 0 : item.disabled) !== null && _a !== void 0 ? _a : disabled
                });
            }),
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
    Flex.defaultProps = {
        direction: 'row',
        justify: 'center',
        alignItems: 'stretch',
        alignContent: 'center'
    };
    return Flex;
}(React.Component));
var FlexItem = /** @class */ (function (_super) {
    __extends(FlexItem, _super);
    function FlexItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlexItem.prototype.renderBody = function () {
        var _a = this.props, children = _a.children, body = _a.body, render = _a.render, disabled = _a.disabled;
        return children
            ? typeof children === 'function'
                ? children(this.props)
                : children
            : body
                ? render('body', body, { disabled: disabled })
                : null;
    };
    FlexItem.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.size; _a.classnames; var style = _a.style;
        return (React.createElement("div", { className: className, style: style }, this.renderBody()));
    };
    FlexItem.propsList = ['body', 'className', 'children'];
    return FlexItem;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(FlexRenderer, _super);
    function FlexRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlexRenderer = __decorate([
        Renderer({
            type: 'flex'
        })
    ], FlexRenderer);
    return FlexRenderer;
})(Flex));
/** @class */ ((function (_super) {
    __extends(FlexItemRenderer, _super);
    function FlexItemRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlexItemRenderer = __decorate([
        Renderer({
            type: 'flex-item'
        })
    ], FlexItemRenderer);
    return FlexItemRenderer;
})(FlexItem));

export { FlexItem, Flex as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
