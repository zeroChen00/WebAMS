/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import { Renderer } from 'amis-core';
import '../Table/index.js';
import { HocQuickEdit } from '../QuickEdit.js';
import { HocCopyable } from '../Copyable.js';
import { HocPopOver } from '../PopOver.js';
import { TableCell } from '../Table/TableCell.js';

/** @class */ ((function (_super) {
    __extends(CellFieldRenderer, _super);
    function CellFieldRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // title 需要去掉，否则部分组件会将其渲染出来
        _this.propsNeedRemove = ['title'];
        return _this;
    }
    CellFieldRenderer.defaultProps = __assign(__assign({}, TableCell.defaultProps), { wrapperComponent: 'div' });
    CellFieldRenderer = __decorate([
        Renderer({
            type: 'cell-field',
            name: 'cell-field'
        }),
        HocPopOver(),
        HocCopyable(),
        HocQuickEdit()
    ], CellFieldRenderer);
    return CellFieldRenderer;
})(TableCell));
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
