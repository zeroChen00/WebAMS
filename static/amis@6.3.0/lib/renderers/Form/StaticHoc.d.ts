import { FormControlProps } from 'amis-core';
/**
 * 表单项类成员render支持静态展示装饰器
 */
export declare function supportStatic<T extends FormControlProps>(): (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
