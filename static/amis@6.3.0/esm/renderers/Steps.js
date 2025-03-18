/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { Renderer, resolveVariableAndFilter, isPureVariable, getPropValue, resolveVariable, filter } from 'amis-core';
import { withRemoteConfig, StepStatus, Steps } from 'amis-ui';
import isPlainObject from 'lodash/isPlainObject';

function StepsCmpt(props) {
    var _a;
    var className = props.className, style = props.style, steps = props.steps, status = props.status, mode = props.mode, labelPlacement = props.labelPlacement, progressDot = props.progressDot, data = props.data, source = props.source, render = props.render, mobileUI = props.mobileUI;
    var sourceResult = resolveVariableAndFilter(source, data, '| raw');
    /** 步骤数据源 */
    var stepsRow = (Array.isArray(sourceResult) ? sourceResult : undefined) || steps || [];
    /** 状态数据源 */
    var statusValue = isPureVariable(status)
        ? resolveVariableAndFilter(status, data, '| raw')
        : status;
    var resolveRender = function (val) {
        return typeof val === 'string' ? filter(val, data) : val && render('inner', val);
    };
    var value = (_a = getPropValue(props)) !== null && _a !== void 0 ? _a : 0;
    var resolveValue = typeof value === 'string' && isNaN(+value)
        ? resolveVariable(value, data) || value
        : +value;
    var valueIndex = stepsRow.findIndex(function (item) { return item.value && item.value === resolveValue; });
    var currentValue = valueIndex !== -1 ? valueIndex : resolveValue;
    var resolveSteps = stepsRow.map(function (step, i) {
        var stepStatus = getStepStatus(step, i);
        return __assign(__assign({}, step), { status: stepStatus, title: resolveRender(step.title), subTitle: resolveRender(step.subTitle), description: resolveRender(step.description) });
    });
    function getStepStatus(step, i) {
        var stepStatus;
        if (typeof statusValue === 'string') {
            if (i === currentValue) {
                stepStatus = statusValue || status || StepStatus.process;
            }
        }
        else if (typeof statusValue === 'object') {
            var key = step.value;
            key && statusValue[key] && (stepStatus = statusValue[key]);
        }
        return stepStatus;
    }
    return (React.createElement(Steps, { current: currentValue, steps: resolveSteps, className: className, style: style, status: statusValue, mode: mode, progressDot: progressDot, labelPlacement: labelPlacement, mobileUI: mobileUI }));
}
var StepsWithRemoteConfig = withRemoteConfig()(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        var _a = this.props, config = _a.config; _a.deferLoad; _a.loading; _a.updateConfig; var rest = __rest(_a, ["config", "deferLoad", "loading", "updateConfig"]);
        var sourceConfig = isPlainObject(config) ? config : null;
        return React.createElement(StepsCmpt, __assign({}, rest, sourceConfig));
    };
    return class_1;
}(React.Component)));
/** @class */ ((function (_super) {
    __extends(StepsRenderer, _super);
    function StepsRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepsRenderer.prototype.render = function () {
        return React.createElement(StepsWithRemoteConfig, __assign({}, this.props));
    };
    StepsRenderer = __decorate([
        Renderer({
            type: 'steps'
        })
    ], StepsRenderer);
    return StepsRenderer;
})(React.Component));

export { StepsCmpt };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
