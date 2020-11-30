export declare class ODataServiceProvider {
    static clear(context: any, serviceUrl: string): Promise<unknown>;
    static getServiceTimeZoneAbbreviation(): string;
    private static _wakeLock;
    private static demoDBPath;
    private static serviceTimeZoneAbbreviation;
    private static readonly extraStreamParameters;
    private static offlineODataDirectory;
    private static toJSError;
    private static releaseWakeLock;
    private dataService;
    private changeSetManager;
    private isOnlineServiceOpen;
    private storeStates;
    constructor();
    download(params: any): Promise<any>;
    initOfflineStore(context: any, params: any): Promise<any>;
    upload(params: any): Promise<any>;
    close(params: any): Promise<any>;
    clear(params: any): Promise<any>;
    create(params: any): Promise<any>;
    open(context: any, params: any): Promise<any>;
    read(entitySet: string, properties: any, queryString: string, headers: Object, requestOptions: Object, pageSize?: number): Promise<any>;
    createEntity(odataCreator: any): Promise<any>;
    createRelatedEntity(odataCreator: any): Promise<any>;
    updateEntity(odataUpdater: any): Promise<any>;
    deleteEntity(odataDeleter: any): Promise<any>;
    deleteMediaEntity(entitySetName: string, queryString: string, readLink: string, headers: Object, requestOptions: Object): Promise<any>;
    createMediaEntity(entitySetName: string, properties: any, headers: any, requestOptions: any, media: any): Promise<any>;
    createRelatedMediaEntity(entitySetName: string, properties: any, parent: any, headers: any, requestOptions: any, media: any): Promise<any>;
    createMediaEntity1(entitySetName: string, properties: any, headers: any, media: any): Promise<any>;
    downloadMedia(entitySet: string, queryString: string, readLink: string, headers: Object, requestOptions: Object): Promise<any>;
    isMediaLocal(entitySet: string, readLink: string): Promise<any>;
    uploadStream(entitySetName: string, properties: any[], query: string, readLink: string, headers: any, requestOptions: any): Promise<any>;
    downloadStream(entitySetName: string, properties: string[], query: string, readLink: string, headers: any, requestOptions: any): Promise<any>;
    beginChangeSet(): Promise<any>;
    cancelChangeSet(): Promise<any>;
    commitChangeSet(): Promise<any>;
    count(entitySet: string, properties: any, queryString: string, headers: Object, requestOptions: Object): Promise<number>;
    callFunction(functionName: any, functionParameters: any, functionHeaders: any, functionOptions: any): Promise<unknown>;
    undoPendingChanges(entitySetName: string, queryOptions: string, editLink: string): Promise<any>;
    getOfflineStoreStatus(): string;
    getPropertyType(entitySetName: string, propertyName: string): string;
    getVersion(): number;
    private downloadStreamData;
    private getOptionalProperty;
    private getChangeSetManager;
    private initDemoDatabase;
    private filterQueryOptions;
    private getQuery;
    private getEntityUsingQueryOptions;
    private getEntityUsingReadLink;
    private isOnline;
    private getOfflineODataProvider;
    private offlineStateChange;
    private endCreateMediaEntity;
    private getEntityValue;
    private getEntityValueWithQueryOptionOrEditLink;
    private getHttpHeaders;
    private getRequestOptions;
    private getHeadersMap;
    private applyServiceOptions;
    private applyOfflineServiceOptions;
    private applyCsdlOptions;
}