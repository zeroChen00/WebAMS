/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __assign, __rest } from 'tslib';
import { addSchemaFilter, FormRenderer, getLevelFromClassName, isObjectShallowModified } from 'amis-core';
import { CheckboxControlRenderer } from './renderers/Form/Checkbox.js';
import { FieldSetRenderer } from './renderers/Form/FieldSet.js';
import { CardRenderer } from './renderers/Card.js';
import { ListItemRenderer } from './renderers/List.js';
import { ButtonGroupControlRenderer } from './renderers/Form/ButtonGroupSelect.js';
import { FileControlRenderer } from './renderers/Form/InputFile.js';
import { ImageControlRenderer } from './renderers/Form/InputImage.js';
import { RichTextControlRenderer } from './renderers/Form/InputRichText.js';
import { GridRenderer } from './renderers/Grid.js';
import { HBoxRenderer } from './renderers/HBox.js';

// 兼容老的用法，老用法 label 用在 checkbox 的右侧内容，新用法用 option 来代替。
addSchemaFilter(function CheckboxPropsFilter(schema, renderer) {
    if (renderer.component !== CheckboxControlRenderer) {
        return schema;
    }
    if (schema.label && typeof schema.option === 'undefined') {
        schema = __assign({}, schema);
        schema.option = schema.label;
        delete schema.label;
    }
    return schema;
});
function convertFieldSetTabs2Controls(schema) {
    var toUpdate = {};
    var flag = false;
    toUpdate.controls = Array.isArray(schema.controls)
        ? schema.controls.concat()
        : [];
    toUpdate.controls = toUpdate.controls.map(function (control) {
        if (Array.isArray(control)) {
            var converted = convertFieldSetTabs2Controls({
                type: 'group',
                controls: control
            });
            if (converted !== control) {
                flag = true;
            }
            return converted;
        }
        return control;
    });
    schema.fieldSet &&
        (Array.isArray(schema.fieldSet)
            ? schema.fieldSet
            : [schema.fieldSet]).forEach(function (fieldSet) {
            flag = true;
            toUpdate.controls.push(__assign(__assign({}, convertFieldSetTabs2Controls(fieldSet)), { type: 'fieldSet', collapsable: schema.collapsable }));
        });
    schema.tabs &&
        (flag = true) &&
        toUpdate.controls.push({
            type: 'tabs',
            tabs: schema.tabs.map(function (tab) { return convertFieldSetTabs2Controls(tab); })
        });
    if (flag) {
        schema = __assign(__assign({}, schema), toUpdate);
        delete schema.fieldSet;
        delete schema.tabs;
    }
    return schema;
}
// Form 中，把 fieldSet 和 tabs 转成 {type: 'fieldSet', controls: []}
// 同时把数组用法转成 {type: 'group', controls: []}
addSchemaFilter(function FormPropsFilter(schema, renderer) {
    if (renderer.component !== FormRenderer) {
        return schema;
    }
    if (schema.fieldSet || schema.tabs) {
        // console.warn('Form 下面直接用 fieldSet 或者 tabs 将不支持，请改成在 controls 数组中添加。');
        schema = convertFieldSetTabs2Controls(schema);
    }
    else if (Array.isArray(schema.controls)) {
        var flag_1 = false;
        var converted = schema.controls.map(function (control) {
            if (Array.isArray(control)) {
                var converted_1 = convertFieldSetTabs2Controls({
                    type: 'group',
                    controls: control
                });
                if (converted_1 !== control) {
                    flag_1 = true;
                }
                return converted_1;
            }
            return control;
        });
        if (flag_1) {
            schema = __assign(__assign({}, schema), { controls: converted });
        }
    }
    return schema;
});
// FieldSet 中把 controls 里面的数组用法转成 {type: 'group', controls: []}
addSchemaFilter(function FormPropsFilter(schema, renderer) {
    if (renderer.component !== FieldSetRenderer) {
        return schema;
    }
    if (Array.isArray(schema.controls)) {
        var flag_2 = false;
        var converted = schema.controls.map(function (control) {
            if (Array.isArray(control)) {
                var converted_2 = convertFieldSetTabs2Controls({
                    type: 'group',
                    controls: control
                });
                if (converted_2 !== control) {
                    flag_2 = true;
                }
                return converted_2;
            }
            return control;
        });
        if (flag_2) {
            schema = __assign(__assign({}, schema), { controls: converted });
        }
    }
    return schema;
});
// Form 里面的 Tabs 中把 controls 里面的数组用法转成 {type: 'group', controls: []}
function convertArray2Hbox(arr) {
    var flag = false;
    var converted = arr.map(function (item) {
        if (Array.isArray(item)) {
            flag = true;
            return convertArray2Hbox(item);
        }
        return item;
    });
    if (!flag) {
        converted = arr;
    }
    return {
        type: 'hbox',
        columns: converted
    };
}
// CRUD/List  和 CRUD/Card 的 body 中的数组用法转成 hbox
addSchemaFilter(function (schema, renderer) {
    if (renderer.component !== CardRenderer &&
        renderer.component !== ListItemRenderer) {
        return schema;
    }
    if (Array.isArray(schema.body)) {
        var flag_3 = false;
        var converted = schema.body.map(function (item) {
            if (Array.isArray(item)) {
                flag_3 = true;
                return convertArray2Hbox(item);
            }
            return item;
        });
        if (flag_3) {
            schema = __assign(__assign({}, schema), { body: converted });
        }
    }
    return schema;
});
// button group 的 btnClassName 和 btnActiveClassName 改成 btnLevel 和 btnActiveLevel 了
// 2023/7/20 fix：配置面板配置按钮类名预览后失效
addSchemaFilter(function (scheam, renderer) {
    if (renderer.component !== ButtonGroupControlRenderer) {
        return scheam;
    }
    if (scheam.btnClassName || scheam.btnActiveClassName) {
        scheam = __assign(__assign({}, scheam), { btnLevel: getLevelFromClassName(scheam.btnClassName), btnActiveLevel: getLevelFromClassName(scheam.btnActiveClassName) });
    }
    return scheam;
});
// 原 reciever 错别字改为 receiver
addSchemaFilter(function (scheam, renderer) {
    if (renderer.component !== FileControlRenderer &&
        renderer.component !== ImageControlRenderer &&
        renderer.component !== RichTextControlRenderer) {
        return scheam;
    }
    if (scheam.reciever) {
        scheam = __assign(__assign({}, scheam), { receiver: scheam.reciever });
        delete scheam.reciever;
    }
    if (scheam.videoReciever) {
        scheam = __assign(__assign({}, scheam), { videoReceiver: scheam.reciever });
        delete scheam.reciever;
    }
    return scheam;
});
// Grid 一些旧格式的兼容
addSchemaFilter(function (scheam, renderer) {
    if (renderer.component !== GridRenderer) {
        return scheam;
    }
    if (Array.isArray(scheam.columns) &&
        scheam.columns.some(function (item) { return Array.isArray(item) || item.type; })) {
        scheam = __assign(__assign({}, scheam), { columns: scheam.columns.map(function (item) {
                if (Array.isArray(item)) {
                    return {
                        body: [
                            {
                                type: 'grid',
                                columns: item
                            }
                        ]
                    };
                }
                else if (item.type) {
                    var xs = item.xs, sm = item.sm, md = item.md, lg = item.lg, columnClassName = item.columnClassName, rest = __rest(item, ["xs", "sm", "md", "lg", "columnClassName"]);
                    item = {
                        xs: xs,
                        sm: sm,
                        md: md,
                        lg: lg,
                        columnClassName: columnClassName,
                        body: [rest]
                    };
                }
                return item;
            }) });
    }
    return scheam;
});
// Hbox 一些旧格式的兼容
addSchemaFilter(function (scheam, renderer) {
    if (renderer.component !== HBoxRenderer) {
        return scheam;
    }
    if (Array.isArray(scheam.columns) && scheam.columns.some(function (item) { return item.type; })) {
        scheam = __assign(__assign({}, scheam), { columns: scheam.columns.map(function (item) {
                var width = item.width, height = item.height, style = item.style, columnClassName = item.columnClassName, visible = item.visible, visibleOn = item.visibleOn, rest = __rest(item, ["width", "height", "style", "columnClassName", "visible", "visibleOn"]);
                if (item.type) {
                    item = {
                        width: width,
                        height: height,
                        style: style,
                        columnClassName: columnClassName,
                        visible: visible,
                        visibleOn: visibleOn,
                        body: [rest]
                    };
                }
                return item;
            }) });
    }
    return scheam;
});
var controlMapping = {
    'array': 'input-array',
    'button-group': 'button-group-select',
    'city': 'input-city',
    'color': 'input-color',
    'date': 'input-date',
    'datetime': 'input-datetime',
    'time': 'input-time',
    'quarter': 'input-quarter',
    'month': 'input-month',
    'year': 'input-year',
    'date-range': 'input-date-range',
    'datetime-range': 'input-datetime-range',
    'diff': 'diff-editor',
    'file': 'input-file',
    'image': 'input-image',
    'list': 'list-select',
    'location': 'location-picker',
    'matrix': 'matrix-checkboxes',
    'month-range': 'input-month-range',
    'quarter-range': 'input-quarter-range',
    'number': 'input-number',
    'range': 'input-range',
    'rating': 'input-rating',
    'repeat': 'input-repeat',
    'rich-text': 'input-rich-text',
    'form': 'input-sub-form',
    'table': 'input-table',
    'tag': 'input-tag',
    'text': 'input-text',
    'url': 'input-url',
    'password': 'input-password',
    'email': 'input-email',
    'tree': 'input-tree',
    'progress': 'static-progress',
    'mapping': 'static-mapping'
};
var maybeFormItem = [
    'button',
    'submit',
    'reset',
    'button-group',
    'button-toolbar',
    'container',
    'grid',
    'hbox',
    'panel',
    'anchor-nav',
    'qr-code'
];
function wrapControl(item) {
    if (!item || !item.type) {
        return item;
    }
    var label = item.label, description = item.description, name = item.name, required = item.required, remark = item.remark, inputOnly = item.inputOnly, labelClassName = item.labelClassName, caption = item.caption, labelRemark = item.labelRemark, descriptionClassName = item.descriptionClassName, captionClassName = item.captionClassName, hint = item.hint, showErrorMsg = item.showErrorMsg, mode = item.mode, horizontal = item.horizontal, className = item.className, inputClassName = item.inputClassName, columnClassName = item.columnClassName, visibleOn = item.visibleOn, visible = item.visible, rest = __rest(item, ["label", "description", "name", "required", "remark", "inputOnly", "labelClassName", "caption", "labelRemark", "descriptionClassName", "captionClassName", "hint", "showErrorMsg", "mode", "horizontal", "className", "inputClassName", "columnClassName", "visibleOn", "visible"]);
    rest.name = name;
    rest.className = inputClassName;
    // 如果是按钮
    if (~['button', 'submit', 'reset'].indexOf(rest.type)) {
        rest.label = label;
        label = '';
    }
    return {
        type: 'control',
        label: label,
        description: description,
        name: name,
        required: required,
        remark: remark,
        inputOnly: inputOnly,
        labelClassName: labelClassName,
        caption: caption,
        labelRemark: labelRemark,
        descriptionClassName: descriptionClassName,
        captionClassName: captionClassName,
        hint: hint,
        showErrorMsg: showErrorMsg,
        mode: mode,
        horizontal: horizontal,
        className: className,
        columnClassName: columnClassName,
        visibleOn: visibleOn,
        visible: visible,
        body: rest
    };
}
var maybeStatic = [
    'tpl',
    'mapping',
    'progress',
    'status',
    'json',
    'video',
    'qrcode',
    'plain',
    'each',
    'link'
];
function wrapStatic(item) {
    if (!item || !item.type) {
        return item;
    }
    return __assign(__assign({}, item), { type: "static-".concat(item.type) });
}
addSchemaFilter(function (schema, renderer, props) {
    var _a;
    var _b, _c, _d;
    var type = typeof (schema === null || schema === void 0 ? void 0 : schema.type) === 'string' ? schema.type.toLowerCase() : '';
    var newSchema = schema;
    // controls 转成 body
    if (type === 'combo' && Array.isArray(schema.conditions)) {
        newSchema = __assign(__assign({}, schema), { conditions: schema.conditions.map(function (condition) {
                if (Array.isArray(condition.controls)) {
                    condition = __assign(__assign({}, condition), { items: condition.controls.map(controlToNormalRenderer) });
                    delete condition.controls;
                }
                return condition;
            }) });
    }
    if ((schema === null || schema === void 0 ? void 0 : schema.controls) &&
        schema.type !== 'audio' &&
        schema.type !== 'carousel') {
        newSchema = __assign(__assign({}, schema), (_a = {}, _a[schema.type === 'combo' ? "items" : 'body'] = (Array.isArray(schema.controls)
            ? schema.controls
            : [schema.controls]).map(controlToNormalRenderer), _a));
        delete newSchema.controls;
    }
    else if (((_b = schema === null || schema === void 0 ? void 0 : schema.quickEdit) === null || _b === void 0 ? void 0 : _b.controls) &&
        (!schema.quickEdit.type ||
            !~['combo', 'group', 'panel', 'fieldSet', 'fieldset'].indexOf(schema.quickEdit.type))) {
        newSchema = __assign(__assign({}, schema), { quickEdit: __assign(__assign({}, schema.quickEdit), { body: (Array.isArray(schema.quickEdit.controls)
                    ? schema.quickEdit.controls
                    : [schema.quickEdit.controls]).map(controlToNormalRenderer) }) });
        delete newSchema.quickEdit.controls;
    }
    else if ((_c = schema === null || schema === void 0 ? void 0 : schema.quickEdit) === null || _c === void 0 ? void 0 : _c.type) {
        newSchema = __assign(__assign({}, schema), { quickEdit: controlToNormalRenderer(schema.quickEdit) });
    }
    else if (type === 'tabs' && Array.isArray(schema.tabs)) {
        newSchema = __assign(__assign({}, schema), { tabs: schema.tabs.map(function (tab) {
                if (Array.isArray(tab.controls) && !Array.isArray(tab.body)) {
                    tab = __assign(__assign({}, tab), { body: tab.controls.map(controlToNormalRenderer) });
                    delete tab.controls;
                }
                return tab;
            }) });
    }
    else if (type === 'anchor-nav' && Array.isArray(schema.links)) {
        newSchema = __assign(__assign({}, schema), { links: schema.links.map(function (link) {
                if (Array.isArray(link.controls)) {
                    link = __assign(__assign({}, link), { body: link === null || link === void 0 ? void 0 : link.controls.map(controlToNormalRenderer) });
                    delete link.controls;
                }
                return link;
            }) });
    }
    else if (type === 'input-array' && schema.items) {
        newSchema = __assign(__assign({}, schema), { items: Array.isArray(schema.items)
                ? schema.items.map(controlToNormalRenderer)
                : controlToNormalRenderer(schema.items) });
    }
    else if ((type === 'grid' || type === 'hbox') &&
        Array.isArray(schema.columns)) {
        newSchema = __assign(__assign({}, schema), { columns: schema.columns.map(function (column) {
                if (Array.isArray(column.controls)) {
                    column = __assign(__assign({}, column), { body: column === null || column === void 0 ? void 0 : column.controls.map(controlToNormalRenderer) });
                    // 有可能直接外面的grid 或者 bhox 列里面用 form 的。
                    if (column.type !== 'form') {
                        delete column.type;
                    }
                    delete column.controls;
                }
                return column;
            }) });
    }
    else if (type === 'service' && ((_d = schema === null || schema === void 0 ? void 0 : schema.body) === null || _d === void 0 ? void 0 : _d.controls)) {
        newSchema = __assign(__assign({}, schema), { body: (Array.isArray(schema.body.controls)
                ? schema.body.controls
                : [schema.body.controls]).map(controlToNormalRenderer) });
    }
    if (newSchema !== schema &&
        isObjectShallowModified(newSchema, schema, false, false, [], 10)) {
        return newSchema;
    }
    return schema;
    function controlToNormalRenderer(item) {
        if ((item === null || item === void 0 ? void 0 : item.$ref) && props.resolveDefinitions) {
            item = __assign(__assign({}, props.resolveDefinitions(item.$ref)), item);
            delete item.$ref;
        }
        return item && controlMapping[item.type]
            ? __assign(__assign({}, item), { type: controlMapping[item.type] }) : ~maybeFormItem.indexOf(item === null || item === void 0 ? void 0 : item.type)
            ? wrapControl(item)
            : ~maybeStatic.indexOf(item === null || item === void 0 ? void 0 : item.type)
                ? wrapStatic(item)
                : item;
    }
});
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
