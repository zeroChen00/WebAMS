/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { FormItem, ComboStore } from 'amis-core';
import ComboControl from './Combo.js';

var InputArrayControl = /** @class */ (function (_super) {
    __extends(InputArrayControl, _super);
    function InputArrayControl(props) {
        var _this = _super.call(this, props) || this;
        _this.comboRef = _this.comboRef.bind(_this);
        return _this;
    }
    InputArrayControl.prototype.comboRef = function (ref) {
        this.comboInstance = ref;
    };
    InputArrayControl.prototype.validate = function (args) {
        return this.comboInstance ? this.comboInstance.validate() : null;
    };
    InputArrayControl.prototype.render = function () {
        var _a = this.props, items = _a.items, scaffold = _a.scaffold, rest = __rest(_a, ["items", "scaffold"]);
        // 传入多个元素时只接受首个元素，因为input-array相当于打平的combo
        var normalizedItems = Array.isArray(items)
            ? items.length > 1
                ? items.slice(0, 1)
                : items
            : items != null
                ? [items]
                : [];
        return (React.createElement(ComboControl, __assign({}, rest, { scaffold: scaffold, items: normalizedItems, flat: true, multiple: true, multiLine: false, ref: this.comboRef })));
    };
    return InputArrayControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ArrayControlRenderer, _super);
    function ArrayControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayControlRenderer = __decorate([
        FormItem({
            type: 'input-array',
            storeType: ComboStore.name
        })
    ], ArrayControlRenderer);
    return ArrayControlRenderer;
})(InputArrayControl));

export { InputArrayControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
