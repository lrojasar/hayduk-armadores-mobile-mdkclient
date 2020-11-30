import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { ITargetServiceSpecifier } from '../data/ITargetSpecifier';
import { IContext } from '../context/IContext';
interface IDataLoader {
    data: ObservableArray<any>;
    loadMoreItems(context: IContext): Promise<ObservableArray<any>>;
}
export declare class ServiceDataLoader implements IDataLoader {
    private _pageSize;
    private _data;
    private _readPages;
    private _service;
    private _allDataIsRead;
    private _skipToken;
    constructor(service: ITargetServiceSpecifier, _pageSize: number);
    readonly data: ObservableArray<any>;
    isAllDataRead(): boolean;
    loadMoreItems(context: IContext): Promise<any>;
    private _getPageForItem;
    private _readPage;
    private _newServiceWithPagingQueryOptionsForPage;
    private updateData;
}
export {};
