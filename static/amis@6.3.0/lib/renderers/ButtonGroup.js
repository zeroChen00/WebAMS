/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var ButtonGroupSelect = require('./Form/ButtonGroupSelect.js');
var amisCore = require('amis-core');

/** @class */ ((function (_super) {
    tslib.__extends(ButtonGroupRenderer, _super);
    function ButtonGroupRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'button-group'
        })
    ], ButtonGroupRenderer);
    return ButtonGroupRenderer;
})(ButtonGroupSelect["default"]));

exports["default"] = ButtonGroupSelect["default"];
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
