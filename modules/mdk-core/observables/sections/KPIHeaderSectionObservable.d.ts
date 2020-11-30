import { BaseSectionObservable } from './BaseSectionObservable';
export declare class KPIHeaderSectionObservable extends BaseSectionObservable {
    private static readonly ITEMS_PARAM_KEY;
    private static _kpiItemsKey;
    bind(): Promise<Object>;
    protected _resolveData(definition: any): Promise<Object>;
}
