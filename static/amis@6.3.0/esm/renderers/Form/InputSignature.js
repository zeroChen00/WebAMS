/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { ScopedContext, FormItem } from 'amis-core';
import { Signature } from 'amis-ui';
import pick from 'lodash/pick';

/**
 * @file Signature.tsx 签名组件
 *
 * @created: 2024/03/04
 */
var InputSignatureComp = /** @class */ (function (_super) {
    __extends(InputSignatureComp, _super);
    function InputSignatureComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputSignatureComp.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, onChange = _a.onChange;
        var props = pick(this.props, [
            'value',
            'width',
            'height',
            'mobileUI',
            'embed',
            'color',
            'bgColor',
            'clearBtnLabel',
            'clearBtnIcon',
            'undoBtnLabel',
            'undoBtnIcon',
            'confirmBtnLabel',
            'confirmBtnIcon',
            'embedConfirmLabel',
            'embedConfirmIcon',
            'ebmedCancelLabel',
            'ebmedCancelIcon',
            'embedBtnIcon',
            'embedBtnLabel'
        ]);
        return (React.createElement(Signature, __assign({ classnames: cx, className: className, onChange: onChange }, props)));
    };
    return InputSignatureComp;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(InputSignatureRenderer, _super);
    function InputSignatureRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    InputSignatureRenderer.prototype.componentWillUnmount = function () {
        var _a;
        (_a = _super.prototype.componentWillUnmount) === null || _a === void 0 ? void 0 : _a.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    InputSignatureRenderer.contextType = ScopedContext;
    InputSignatureRenderer = __decorate([
        FormItem({
            type: 'input-signature',
            sizeMutable: false
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], InputSignatureRenderer);
    return InputSignatureRenderer;
})(InputSignatureComp));

export { InputSignatureComp as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
