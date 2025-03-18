/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var amisCore = require('amis-core');
var InputDate = require('./Form/InputDate.js');

/** @class */ ((function (_super) {
    tslib.__extends(CalendarRenderer, _super);
    function CalendarRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRenderer.defaultProps = tslib.__assign(tslib.__assign({}, InputDate.DateControlRenderer.defaultProps), { embed: true });
    CalendarRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'calendar'
        })
    ], CalendarRenderer);
    return CalendarRenderer;
})(InputDate.DateControlRenderer));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
