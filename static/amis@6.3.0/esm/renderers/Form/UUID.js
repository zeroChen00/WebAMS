/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { uuidv4, FormItem } from 'amis-core';

var UUIDControl = /** @class */ (function (_super) {
    __extends(UUIDControl, _super);
    function UUIDControl(props) {
        var _this = _super.call(this, props) || this;
        if (!props.value) {
            _this.setValue();
        }
        return _this;
    }
    UUIDControl.prototype.componentDidUpdate = function (props) {
        if (!props.value && props.formInited !== false) {
            this.setValue();
        }
    };
    UUIDControl.prototype.setValue = function () {
        var props = this.props;
        var uuid = uuidv4();
        if (props.length) {
            uuid = uuid.substring(0, props.length);
        }
        props.onChange(uuid);
    };
    UUIDControl.prototype.render = function () {
        return null;
    };
    return UUIDControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(UUIDControlRenderer, _super);
    function UUIDControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UUIDControlRenderer = __decorate([
        FormItem({
            type: 'uuid',
            wrap: false,
            sizeMutable: false
        })
    ], UUIDControlRenderer);
    return UUIDControlRenderer;
})(UUIDControl));

export { UUIDControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
