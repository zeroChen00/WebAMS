/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign } from 'tslib';
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { filter } from 'amis-core';
import { TooltipWrapper, Icon } from 'amis-ui';

/**
 * @file scoped.jsx.
 * @author fex
 */
var HocCopyable = function () {
    return function (Component) {
        var QuickEditComponent = /** @class */ (function (_super) {
            __extends(QuickEditComponent, _super);
            function QuickEditComponent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            QuickEditComponent.prototype.handleClick = function (content) {
                var _a = this.props, env = _a.env, copyFormat = _a.copyFormat;
                env.copy && env.copy(content, { format: copyFormat });
            };
            QuickEditComponent.prototype.render = function () {
                var _a = this.props, name = _a.name, className = _a.className, data = _a.data, noHoc = _a.noHoc, cx = _a.classnames, __ = _a.translate, env = _a.env, tooltipContainer = _a.tooltipContainer;
                var copyable = this.props.copyable;
                if (copyable && !noHoc) {
                    var content = filter(copyable.content || '${' + name + ' | raw }', data);
                    var tooltip = (copyable === null || copyable === void 0 ? void 0 : copyable.tooltip) != null
                        ? filter(copyable.tooltip, data)
                        : copyable === null || copyable === void 0 ? void 0 : copyable.tooltip;
                    if (content) {
                        return (React.createElement(Component, __assign({}, this.props, { className: cx("Field--copyable", className) }),
                            React.createElement(Component, __assign({}, this.props, { contentsOnly: true, noHoc: true })),
                            React.createElement(TooltipWrapper, { placement: "right", tooltip: tooltip !== null && tooltip !== void 0 ? tooltip : __('Copyable.tip'), trigger: "hover", container: tooltipContainer || (env === null || env === void 0 ? void 0 : env.getModalContainer) },
                                React.createElement("a", { key: "edit-btn", className: cx('Field-copyBtn'), onClick: this.handleClick.bind(this, content) },
                                    React.createElement(Icon, { icon: "copy", className: "icon" })))));
                    }
                }
                return React.createElement(Component, __assign({}, this.props));
            };
            QuickEditComponent.ComposedComponent = Component;
            return QuickEditComponent;
        }(React.PureComponent));
        hoistNonReactStatic(QuickEditComponent, Component);
        return QuickEditComponent;
    };
};

export { HocCopyable, HocCopyable as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
