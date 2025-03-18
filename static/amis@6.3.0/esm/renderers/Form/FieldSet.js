/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { Renderer } from 'amis-core';
import Collapse from '../Collapse.js';

var FieldSetControl = /** @class */ (function (_super) {
    __extends(FieldSetControl, _super);
    function FieldSetControl(props) {
        var _this = _super.call(this, props) || this;
        _this.renderBody = _this.renderBody.bind(_this);
        return _this;
    }
    FieldSetControl.prototype.renderBody = function () {
        var _a = this.props, body = _a.body; _a.collapsable; var horizontal = _a.horizontal, render = _a.render, mode = _a.mode, formMode = _a.formMode, cx = _a.classnames, store = _a.store, formClassName = _a.formClassName, disabled = _a.disabled, formHorizontal = _a.formHorizontal, subFormMode = _a.subFormMode, subFormHorizontal = _a.subFormHorizontal;
        var props = {
            store: store,
            data: store === null || store === void 0 ? void 0 : store.data,
            render: render,
            disabled: disabled,
            formMode: subFormMode || formMode,
            formHorizontal: subFormHorizontal || formHorizontal
        };
        mode && (props.mode = mode);
        horizontal && (props.horizontal = horizontal);
        return (React.createElement("div", { className: cx("Form--".concat(props.mode || formMode || 'normal'), formClassName) }, body ? render('body', body, props) : null));
    };
    FieldSetControl.prototype.render = function () {
        var _a = this.props; _a.controls; var className = _a.className; _a.mode; var body = _a.body, rest = __rest(_a, ["controls", "className", "mode", "body"]);
        return (React.createElement(Collapse, __assign({}, rest, { body: body, className: className, children: this.renderBody, wrapperComponent: "fieldset", headingComponent: rest.titlePosition === 'bottom' ? 'div' : 'legend' })));
    };
    FieldSetControl.defaultProps = {
        titlePosition: 'top',
        headingClassName: '',
        collapsable: false
    };
    FieldSetControl.propsList = [
        'collapsable',
        'collapsed',
        'collapseTitle',
        'titlePosition',
        'collapseTitle'
    ];
    return FieldSetControl;
}(React.Component));
var FieldSetRenderer = /** @class */ (function (_super) {
    __extends(FieldSetRenderer, _super);
    function FieldSetRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldSetRenderer = __decorate([
        Renderer({
            type: 'fieldset',
            weight: -100,
            name: 'fieldset'
        })
    ], FieldSetRenderer);
    return FieldSetRenderer;
}(FieldSetControl));

export { FieldSetRenderer, FieldSetControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
