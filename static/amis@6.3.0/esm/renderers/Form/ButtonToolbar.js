/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { FormItem } from 'amis-core';

var ButtonToolbar = /** @class */ (function (_super) {
    __extends(ButtonToolbar, _super);
    function ButtonToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 这个方法editor里要用作hack，所以不能删掉这个方法
     * @returns
     */
    ButtonToolbar.prototype.renderButtons = function () {
        var _a = this.props, render = _a.render; _a.classPrefix; var buttons = _a.buttons;
        return Array.isArray(buttons)
            ? buttons.map(function (button, key) {
                return render("button/".concat(key), button, {
                    key: key
                });
            })
            : null;
    };
    ButtonToolbar.prototype.render = function () {
        var _a = this.props; _a.buttons; var className = _a.className, cx = _a.classnames; _a.render; _a.style;
        return (React.createElement("div", { className: cx('ButtonToolbar', className) }, this.renderButtons()));
    };
    ButtonToolbar.propsList = ['buttons', 'className'];
    return ButtonToolbar;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ButtonToolbarRenderer, _super);
    function ButtonToolbarRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonToolbarRenderer = __decorate([
        FormItem({
            type: 'button-toolbar',
            strictMode: false
        })
    ], ButtonToolbarRenderer);
    return ButtonToolbarRenderer;
})(ButtonToolbar));

export { ButtonToolbar as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
