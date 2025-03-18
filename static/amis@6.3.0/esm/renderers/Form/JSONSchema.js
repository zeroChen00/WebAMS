/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate } from 'tslib';
import React from 'react';
import { FormItem } from 'amis-core';
import { withRemoteConfig, InputJSONSchema } from 'amis-ui';

var EnhancedInputJSONSchema = withRemoteConfig({
    sourceField: 'schema',
    injectedPropsFilter: function (injectedProps, props) {
        return {
            schema: injectedProps.config,
            loading: injectedProps.loading
        };
    }
})(InputJSONSchema);
var JSONSchemaControl = /** @class */ (function (_super) {
    __extends(JSONSchemaControl, _super);
    function JSONSchemaControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONSchemaControl.prototype.render = function () {
        var rest = __rest(this.props, []);
        return React.createElement(EnhancedInputJSONSchema, __assign({}, rest));
    };
    return JSONSchemaControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(JSONSchemaRenderer, _super);
    function JSONSchemaRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONSchemaRenderer = __decorate([
        FormItem({
            type: 'json-schema',
            strictMode: false
        })
    ], JSONSchemaRenderer);
    return JSONSchemaRenderer;
})(JSONSchemaControl));

export { JSONSchemaControl as default };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
