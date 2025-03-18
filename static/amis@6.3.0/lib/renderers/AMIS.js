/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var amisCore = require('amis-core');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/** @class */ ((function (_super) {
    tslib.__extends(AMISRenderer, _super);
    function AMISRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AMISRenderer.prototype.render = function () {
        var _a = this.props, render = _a.render, props = _a.props, schema = _a.schema;
        var value = amisCore.getPropValue(this.props) || schema;
        if (typeof value === 'string') {
            try {
                value = JSON.parse(value);
            }
            catch (e) {
                console.warn('amis value must be json string', e);
                value = null;
            }
        }
        return render('amis', value, props);
    };
    AMISRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'amis'
        })
    ], AMISRenderer);
    return AMISRenderer;
})(React__default["default"].Component));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
