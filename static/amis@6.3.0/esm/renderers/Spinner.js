/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import { Spinner } from 'amis-ui';
import { Renderer } from 'amis-core';
import React from 'react';

/** @class */ ((function (_super) {
    __extends(SpinnerRenderer, _super);
    function SpinnerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpinnerRenderer.prototype.renderBody = function () {
        var _a = this.props, body = _a.body, render = _a.render;
        return body ? render('body', body) : null;
    };
    SpinnerRenderer.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, spinnerWrapClassName = _a.spinnerWrapClassName, body = _a.body, rest = __rest(_a, ["classnames", "spinnerWrapClassName", "body"]);
        return body ? (React.createElement("div", { className: cx("Spinner-wrap", spinnerWrapClassName) },
            React.createElement(Spinner, __assign({}, rest)),
            this.renderBody())) : (React.createElement(Spinner, __assign({}, rest)));
    };
    SpinnerRenderer = __decorate([
        Renderer({
            type: 'spinner'
        })
    ], SpinnerRenderer);
    return SpinnerRenderer;
})(React.Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
