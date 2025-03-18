import React from 'react';
import { RendererProps } from 'amis-core';
export interface QuickSearchConfig {
    type?: string;
    controls?: any;
    tabs?: any;
    fieldSet?: any;
    [propName: string]: any;
}
export interface HeadCellSearchProps extends RendererProps {
    name: string;
    searchable: boolean | QuickSearchConfig;
    classPrefix: string;
    onQuery: (values: object) => void;
}
export declare function HeadCellSearchDropDown({ searchable, name, label, onQuery, data, dispatchEvent, onAction, classnames: cx, translate: __, classPrefix: ns, popOverContainer, render }: HeadCellSearchProps): React.JSX.Element;
