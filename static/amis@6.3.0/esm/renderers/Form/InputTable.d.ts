import React from 'react';
import { FormControlProps, FormBaseControl, SimpleMap, RendererData, ActionObject, ListenerAction } from 'amis-core';
import { TableSchema } from '../Table';
import { SchemaApi, SchemaCollection, SchemaClassName } from '../../Schema';
import type { SchemaTokenizeableString } from '../../Schema';
export interface TableControlSchema extends FormBaseControl, Omit<TableSchema, 'type'> {
    type: 'input-table';
    /**
     * 可新增
     */
    addable?: boolean;
    /**
     * 是否可以新增子项
     */
    childrenAddable?: boolean;
    /**
     * 可复制新增
     */
    copyable?: boolean;
    /**
     * 复制按钮文字
     */
    copyBtnLabel?: string;
    /**
     * 复制按钮图标
     */
    copyBtnIcon?: string;
    /**
     * 是否显示复制按钮
     */
    copyAddBtn?: boolean;
    /**
     * 是否可以拖拽排序
     */
    draggable?: boolean;
    /**
     * 新增 API
     */
    addApi?: SchemaApi;
    /**
     * 新增按钮文字
     */
    addBtnLabel?: string;
    /**
     * 新增按钮图标
     */
    addBtnIcon?: string;
    /**
     * 孩子新增按钮文字
     */
    subAddBtnLabel?: string;
    /**
     * 孩子新增按钮图标
     */
    subAddBtnIcon?: string;
    /**
     * 可否删除
     */
    removable?: boolean;
    /**
     * 删除的 API
     */
    deleteApi?: SchemaApi;
    /**
     * 可否编辑
     */
    editable?: boolean;
    /**
     * 更新按钮名称
     */
    editBtnLabel?: string;
    /**
     * 更新按钮图标
     */
    editBtnIcon?: string;
    /**
     * 确认按钮文字
     */
    confirmBtnLabel?: string;
    /**
     * 确认按钮图标
     */
    confirmBtnIcon?: string;
    /**
     * 取消按钮文字
     */
    cancelBtnLabel?: string;
    /**
     * 取消按钮图标
     */
    cancelBtnIcon?: string;
    /**
     * 删除按钮文字
     */
    deleteBtnLabel?: string;
    /**
     * 删除按钮图标
     */
    deleteBtnIcon?: string;
    /**
     * 更新 API
     */
    updateApi?: SchemaApi;
    /**
     * 初始值，新增的时候
     */
    scaffold?: any;
    /**
     * 删除确认文字
     */
    deleteConfirmText?: string;
    /**
     * 值字段
     */
    valueField?: string;
    /**
     * 是否为确认的编辑模式。
     */
    needConfirm?: boolean;
    /**
     * 是否可以访问父级数据，正常 combo 已经关联到数组成员，是不能访问父级数据的。
     */
    canAccessSuperData?: boolean;
    /**
     * 是否显示序号
     */
    showIndex?: boolean;
    /**
     * 分页个数，默认不分页
     */
    perPage?: number;
    /**
     * 限制最大个数
     */
    maxLength?: number | SchemaTokenizeableString;
    /**
     * 限制最小个数
     */
    minLength?: number | SchemaTokenizeableString;
    /**
     * 是否显示底部新增按钮
     */
    showFooterAddBtn?: boolean;
    /**
     * 是否显示表格操作栏新增按钮
     */
    showTableAddBtn?: boolean;
    /**
     * 底部新增按钮配置
     */
    footerAddBtn?: SchemaCollection;
    /**
     * 是否开启 static 状态切换
     */
    enableStaticTransform?: boolean;
    /**
     * 底部工具栏CSS样式类
     */
    toolbarClassName?: SchemaClassName;
}
export interface TableProps extends FormControlProps, Omit<TableControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
}
export interface TableState {
    items: Array<any>;
    columns: Array<any>;
    editIndex: string;
    isCreateMode?: boolean;
    page?: number;
    lastModifiedRow?: {
        index: string;
        data: Record<string, any>;
    };
}
export type FormTableRendererEvent = 'add' | 'addConfirm' | 'addSuccess' | 'addFail' | 'edit' | 'editConfirm' | 'editSuccess' | 'editFail' | 'delete' | 'deleteSuccess' | 'deleteFail';
export type FormTableRendererAction = 'add' | 'delete' | 'reset' | 'clear';
export default class FormTable extends React.Component<TableProps, TableState> {
    static defaultProps: {
        placeholder: string;
        scaffold: {};
        addBtnIcon: string;
        subAddBtnIcon: string;
        copyBtnIcon: string;
        editBtnIcon: string;
        deleteBtnIcon: string;
        confirmBtnIcon: string;
        cancelBtnIcon: string;
        valueField: string;
        minLength: number;
        maxLength: number;
        showFooterAddBtn: boolean;
        showTableAddBtn: boolean;
    };
    static propsList: Array<string>;
    entries: SimpleMap<any, number>;
    entityId: number;
    subForms: any;
    subFormItems: any;
    rowPrinstine: Array<any>;
    editting: any;
    table: any;
    constructor(props: TableProps);
    componentDidUpdate(prevProps: TableProps, prevState: TableState): void;
    componentWillUnmount(): void;
    resolveVariableProps(props: TableProps, key: 'minLength' | 'maxLength'): number;
    subFormRef(form: any, x: number, y: number): void;
    subFormItemRef(form: any, x: number, y: number): void;
    validate(): Promise<string | void>;
    emitValue(): Promise<boolean>;
    doAction(action: ActionObject, ctx: RendererData, ...rest: Array<any>): Promise<any>;
    copyItem(index: string): Promise<void>;
    addItem(index?: string, isDispatch?: boolean, callback?: () => void): Promise<boolean>;
    subAddItem(index?: string, isDispatch?: boolean, item?: any): Promise<boolean>;
    /**
     * 点击“编辑”按钮
     * @param index 编辑的行索引
     */
    editItem(index: string): Promise<void>;
    /**
     * 派发事件
     * @param eventName 事件名称
     * @param eventData 事件数据
     * @returns
     */
    dispatchEvent(eventName: string, eventData?: any): Promise<boolean>;
    startEdit(index: string, isCreate?: boolean): void;
    confirmEdit(): Promise<void>;
    cancelEdit(): void;
    removeItem(index: string): Promise<void>;
    rowPathPlusOffset(path: string, offset?: number): string;
    reUseRowId(items: Array<any>, originItems: Array<any>, indexes: Array<number>): void;
    buildItemProps(item: any, index: number): {
        quickEditEnabled: boolean;
    } | null;
    buildColumns(props: TableProps, isCreateMode?: boolean, editRowIndex?: string): Array<any>;
    columnToQuickEdit(column: any): any;
    handleTableSave(rows: Array<object> | object, diff: Array<object> | object, rowIndexes: Array<string> | string): void;
    handleRadioChange(cxt: any, { name, row, trueValue, falseValue }: any): boolean;
    handleSaveTableOrder(moved: Array<object>, rows: Array<object>): void;
    handlePageChange(page: number): void;
    /**
     * Table Row中数据更新到InputTable中
     * 解决columns形如[{name: 'a'}, {name: 'c', value: '${a}'}]时，使用默认值的列数据无法更新到数据域的问题
     *
     * @param data 行数据
     * @param rowIndex 行索引值
     */
    handlePristineChange(data: Record<string, any>, rowIndex: string): void;
    removeEntry(entry: any): void;
    getEntryId(entry: any): string;
    tableRef(ref: any): void;
    computedAddBtnDisabled(): boolean;
    render(): React.JSX.Element | null;
}
export declare class TableControlRenderer extends FormTable {
    setData(value: any, replace?: boolean, index?: number | string, condition?: any): Promise<void>;
    doAction(action: ListenerAction | ActionObject, data: any, throwErrors?: boolean, args?: any): Promise<any>;
}
