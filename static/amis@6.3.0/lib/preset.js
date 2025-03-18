/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var amisCore = require('amis-core');
var amisUi = require('amis-ui');
require('react');

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
amisCore.extendDefaultEnv({
    alert: amisUi.alert,
    confirm: amisUi.confirm,
    notify: function (type, msg, conf) {
        return amisUi.toast[type] ? amisUi.toast[type](msg, conf) : console.warn('[Notify]', type, msg);
    }
});
amisUi.setRenderSchemaFn(function (controls, value, callback, scopeRef, theme) {
    return amisCore.render({
        name: 'form',
        type: 'form',
        wrapWithPanel: false,
        mode: 'horizontal',
        controls: controls,
        messages: {
            validateFailed: ''
        }
    }, {
        data: value,
        onFinished: callback,
        scopeRef: scopeRef,
        theme: theme
    }, {
        session: 'prompt'
    });
});
amisCore.addRootWrapper(function (props) {
    var env = props.env, children = props.children;
    return (_J$X_(amisUi.ImageGallery, { modalContainer: env.getModalContainer }, children));
});
var SimpleSpinner = amisCore.themeable(function (props) {
    var cx = props.classnames;
    return (_J$X_("div", { "data-testid": "spinner", className: cx("Spinner", 'in', props.className) },
        _J$X_("div", { className: cx("Spinner-icon", 'Spinner-icon--default', props.spinnerClassName) })));
});
amisCore.LazyComponent.defaultProps.placeholder = _J$X_(SimpleSpinner, null);
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
