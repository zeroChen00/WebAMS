/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { getPropValue, filter, Renderer } from 'amis-core';
import { MultilineText } from 'amis-ui';

var MultilineTextField = /** @class */ (function (_super) {
    __extends(MultilineTextField, _super);
    function MultilineTextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultilineTextField.prototype.render = function () {
        var text = getPropValue(this.props, function (props) {
            return props.text ? filter(props.text, props.data, '| raw') : undefined;
        });
        return React.createElement(MultilineText, __assign({}, this.props, { text: text }));
    };
    return MultilineTextField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(MultilineTextFieldRenderer, _super);
    function MultilineTextFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultilineTextFieldRenderer = __decorate([
        Renderer({
            type: 'multiline-text'
        })
    ], MultilineTextFieldRenderer);
    return MultilineTextFieldRenderer;
})(MultilineTextField));

export { MultilineTextField };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
