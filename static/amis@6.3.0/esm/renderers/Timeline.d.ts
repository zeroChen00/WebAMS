import React from 'react';
import { RendererProps } from 'amis-core';
import type { BaseSchema, SchemaApi, SchemaCollection, SchemaTokenizeableString } from '../Schema';
import type { IconCheckedSchema } from 'amis-ui';
export interface TimelineItemSchema extends Omit<BaseSchema, 'type'> {
    /**
     * 时间点
     */
    time: string;
    /**
     * 时间节点标题
     */
    title?: SchemaCollection;
    /**
     * 详细内容
     */
    detail?: string;
    /**
     * detail折叠时文案
     */
    detailCollapsedText?: string;
    /**
     * detail展开时文案
     */
    detailExpandedText?: string;
    /**
     * 时间点圆圈颜色
     */
    color?: string;
    /**
     * 图标
     */
    icon?: string | IconCheckedSchema;
    /**
     * 图标的CSS类名
     */
    iconClassName?: string;
    /**
     * 节点时间的CSS类名（优先级高于统一配置的timeClassName）
     */
    timeClassName?: string;
    /**
     * 节点标题的CSS类名（优先级高于统一配置的titleClassName）
     */
    titleClassName?: string;
    /**
     * 节点详情的CSS类名（优先级高于统一配置的detailClassName）
     */
    detailClassName?: string;
}
export interface TimelineSchema extends BaseSchema {
    /**
     * 指定为 Timeline 时间轴渲染器
     */
    type: 'timeline';
    /**
     * 节点数据
     */
    items?: Array<TimelineItemSchema>;
    /**
     * API 或 数据映射
     */
    source?: SchemaApi | SchemaTokenizeableString;
    /**
     * 文字相对于时间轴展示方向
     */
    mode?: 'left' | 'right' | 'alternate';
    /**
     * 展示方向
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * 节点倒序
     */
    reverse?: boolean;
    /**
     * 节点title自定一展示模板
     */
    itemTitleSchema?: SchemaCollection;
    /**
     * 图标的CSS类名
     */
    iconClassName?: string;
    /**
     * 节点时间的CSS类名
     */
    timeClassName?: string;
    /**
     * 节点标题的CSS类名
     */
    titleClassName?: string;
    /**
     * 节点详情的CSS类名
     */
    detailClassName?: string;
}
export interface TimelineProps extends RendererProps, Omit<TimelineSchema, 'className'> {
}
export declare function TimelineCmpt(props: TimelineProps): React.JSX.Element;
export declare class TimelineRenderer extends React.Component<TimelineProps> {
    render(): React.JSX.Element;
}
