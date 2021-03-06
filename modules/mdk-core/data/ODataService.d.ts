import { IDataService } from './IDataService';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { ITargetServiceSpecifier, ITargetLinkSpecifier, IMediaSpecifier, IParentLinkSpecifier } from './ITargetSpecifier';
import { IContext } from '../context/IContext';
export declare class ODataService extends IDataService {
    private readonly _oDataBridge;
    private _dataReadPageSize;
    private _resolvedServiceInfo;
    constructor();
    createService(serviceUrl: string, online: boolean, csdlOptions: string[], serviceOptions: any): Promise<any>;
    count(service: ITargetServiceSpecifier, context: IContext): Promise<number>;
    openService(params: any): Promise<any>;
    downloadMedia(service: ITargetServiceSpecifier): Promise<any>;
    isMediaLocal(service: ITargetServiceSpecifier): Promise<boolean>;
    downloadOfflineOData(params: any): Promise<any>;
    initializeOfflineStore(params: any): Promise<any>;
    closeOfflineStore(params: any): Promise<any>;
    clearOfflineStore(params: any): Promise<any>;
    uploadOfflineOData(params: any): Promise<any>;
    read(service: ITargetServiceSpecifier): Promise<ObservableArray<any>>;
    readWithPageSize(service: ITargetServiceSpecifier, pageSize?: number): Promise<{
        Value: ObservableArray<any>;
        nextLink: string;
    }>;
    update(service: ITargetServiceSpecifier, createLinks: ITargetLinkSpecifier[], updateLinks: ITargetLinkSpecifier[], deleteLinks: ITargetLinkSpecifier[], headers: Object): Promise<any>;
    create(service: ITargetServiceSpecifier, createLinks: ITargetLinkSpecifier[], headers: Object): Promise<any>;
    createRelated(service: ITargetServiceSpecifier, parent: IParentLinkSpecifier, headers: Object): Promise<any>;
    delete(service: ITargetServiceSpecifier, headers: Object): Promise<any>;
    createMedia(service: ITargetServiceSpecifier, headers: Object, media: IMediaSpecifier[]): Promise<any>;
    createRelatedMedia(service: ITargetServiceSpecifier, parent: IParentLinkSpecifier, headers: Object, media: IMediaSpecifier[]): Promise<any>;
    beginChangeSet(service: ITargetServiceSpecifier): Promise<any>;
    cancelChangeSet(service: ITargetServiceSpecifier): Promise<any>;
    commitChangeSet(service: ITargetServiceSpecifier): Promise<any>;
    isOnChangeSet(): boolean;
    deleteMedia(service: ITargetServiceSpecifier): Promise<any>;
    urlForServiceName(serviceName: string): string;
    applicationIDForServiceName(serviceName: string): string;
    offlineEnabled(serviceName: string): boolean;
    callFunction(service: ITargetServiceSpecifier, headers: Object): Promise<ObservableArray<any>>;
    undoPendingChanges(service: ITargetServiceSpecifier): Promise<any>;
    base64StringToBinary(base64: string): Promise<any>;
    getPropertyType(serviceName: string, entitySet: string, propertyName: string): string;
    getVersion(serviceName: string): number;
    getOfflineStoreStatus(serviceName: string): string;
    downloadStream(service: ITargetServiceSpecifier, headers: Object): Promise<any>;
    uploadStream(service: ITargetServiceSpecifier, headers: Object): Promise<any>;
    getServiceHeaders(serviceName: string): any;
    saveResolvedServiceInfo(serviceName: string, params: any): void;
    clearResolvedServiceInfo(): void;
    private _adjustedServiceForCount;
    private validateServiceName;
    private _adjustedServiceForRead;
    private _saveHistoricalODataServicePath;
}
