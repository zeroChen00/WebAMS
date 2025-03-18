/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { resolveVariableAndFilter, filter, Renderer } from 'amis-core';
import { Breadcrumb } from 'amis-ui';

var BreadcrumbField = /** @class */ (function (_super) {
    __extends(BreadcrumbField, _super);
    function BreadcrumbField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreadcrumbField.prototype.render = function () {
        var _a = this.props, items = _a.items, source = _a.source, data = _a.data, env = _a.env, restProps = __rest(_a, ["items", "source", "data", "env"]);
        var crumbItems = items
            ? items
            : resolveVariableAndFilter(source, data, '| raw');
        crumbItems = crumbItems.map(function (item) {
            if (item.label) {
                item.label = filter(item.label, data);
            }
            if (item.href) {
                item.href = resolveVariableAndFilter(item.href, data, '| raw');
            }
            if (item.dropdown) {
                item.dropdown = item.dropdown.map(function (dropdownItem) {
                    if (dropdownItem.label) {
                        dropdownItem.label = filter(dropdownItem.label, data);
                    }
                    if (dropdownItem.href) {
                        dropdownItem.href = resolveVariableAndFilter(dropdownItem.href, data, '| raw');
                    }
                    return dropdownItem;
                });
            }
            return item;
        });
        return (React.createElement(Breadcrumb, __assign({ items: crumbItems, tooltipContainer: env === null || env === void 0 ? void 0 : env.getModalContainer }, restProps)));
    };
    return BreadcrumbField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(BreadcrumbFieldRenderer, _super);
    function BreadcrumbFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreadcrumbFieldRenderer = __decorate([
        Renderer({
            type: 'breadcrumb'
        })
    ], BreadcrumbFieldRenderer);
    return BreadcrumbFieldRenderer;
})(BreadcrumbField));

export { BreadcrumbField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
