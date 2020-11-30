"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorMessage_1 = require("../ErrorHandling/ErrorMessage");
var ODataServiceUtils_1 = require("./ODataServiceUtils");
var ODataServiceProvider_1 = require("./ODataServiceProvider");
var ODataCreator_1 = require("./crud/ODataCreator");
var ODataRelatedCreator_1 = require("./crud/ODataRelatedCreator");
var ODataUpdater_1 = require("./crud/ODataUpdater");
var ODataDeleter_1 = require("./crud/ODataDeleter");
var CrudParams_1 = require("./crud/CrudParams");
var BaseODataCruder_1 = require("./crud/BaseODataCruder");
var application = require("tns-core-modules/application");
var trace_1 = require("tns-core-modules/trace");
var OData = (function () {
    function OData() {
        this.dataProviders = [];
        this.offlineDataProviders = [];
        this.onChangeset = false;
        this.profilingEnabled = trace_1.isCategorySet('mdk.trace.profiling');
    }
    OData.prototype.createService = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_SERVICE_HAS_NULL_PARAMS);
        }
        var serviceUrl = params.serviceUrl;
        var provider = new ODataServiceProvider_1.ODataServiceProvider();
        if (typeof serviceUrl === 'string') {
            return new Promise(function (resolve, reject) {
                provider.create(params).then(function (result) {
                    var serviceName = ODataServiceUtils_1.ODataServiceUtils.getServiceName(serviceUrl);
                    if (serviceName !== null) {
                        _this.dataProviders[serviceName] = provider;
                        resolve(result);
                    }
                    else {
                        reject(ErrorMessage_1.ErrorMessage.ODATA_INVALID_SERVICE_NAME);
                    }
                }).catch(function (error) {
                    reject(error);
                });
            });
        }
        else {
            return Promise.reject(new Error(ErrorMessage_1.ErrorMessage.ODATA_SERVICE_URL_NOT_A_STRING));
        }
    };
    OData.prototype.openService = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_OPEN_SERVICE_HAS_NULL_PARAMS);
        }
        try {
            var provider_1 = this.getDataProvider({ serviceUrl: params.serviceUrl, offlineEnabled: false });
            return new Promise(function (resolve, reject) {
                provider_1.open(application.android.context, params).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                });
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.downloadMedia = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_DOWNLOAD_MEDIA_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            var crudParams = new CrudParams_1.CrudParams(params, BaseODataCruder_1.ODataCrudOperation.Read);
            return provider.downloadMedia(crudParams.getEntitySetName(), crudParams.getQueryString(), crudParams.getReadLink(), crudParams.getHeaders(), crudParams.getRequestOptions());
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.isMediaLocal = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_IS_MEDIA_LOCAL_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            if (typeof params.entitySet !== 'string' || params.entitySet.length === 0) {
                return Promise.reject(new Error(ErrorMessage_1.ErrorMessage.ODATA_ENTITY_PROP_NOT_FOUND));
            }
            return provider.isMediaLocal(params.entitySet, params.readLink);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.downloadOfflineOData = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_DOWNLOAD_OFFLINE_ODATA_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.download(params);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.initializeOfflineStore = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_INITIALIZE_OFFLINE_STORE_HAS_NULL_PARAMS);
        }
        try {
            var serviceName_1 = ODataServiceUtils_1.ODataServiceUtils.getServiceName(params.serviceUrl);
            if (serviceName_1 != null) {
                var offlineProvider = this.offlineDataProviders[serviceName_1];
                if (offlineProvider != null && offlineProvider.getOfflineStoreStatus() === 'initialized') {
                    return Promise.resolve(null);
                }
                else {
                    var provider_2 = new ODataServiceProvider_1.ODataServiceProvider();
                    return provider_2.initOfflineStore(application.android.context, params).then(function (result) {
                        _this.offlineDataProviders[serviceName_1] = provider_2;
                        return Promise.resolve(result);
                    });
                }
            }
            else {
                return Promise.reject(new Error(ErrorMessage_1.ErrorMessage.ODATA_SERVICE_NAME_MISSING));
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.closeOfflineStore = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CLOSE_OFFLINE_STORE_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.close(params);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.clearOfflineStore = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CLEAR_OFFLINE_HAS_NULL_PARAMS);
        }
        try {
            var serviceName_2 = ODataServiceUtils_1.ODataServiceUtils.getServiceName(params.serviceUrl);
            if (serviceName_2 == null) {
                throw new Error(ErrorMessage_1.ErrorMessage.ODATA_SERVICE_NAME_MISSING);
            }
            var provider = this.offlineDataProviders[serviceName_2];
            if (provider) {
                return provider.clear(params).then(function (result) {
                    _this.offlineDataProviders[serviceName_2] = null;
                    return result;
                });
            }
            else {
                var isForce = (typeof params.force === 'boolean') ? params.force : false;
                if (!isForce) {
                    var errorMsg = ErrorMessage_1.ErrorMessage.ODATA_SERVICE_PROVIDER_NOT_INITIALIZED;
                    return Promise.reject(new Error(errorMsg));
                }
                return ODataServiceProvider_1.ODataServiceProvider.clear(application.android.context, params.serviceUrl);
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.uploadOfflineOData = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_UPLOAD_OFFLINE_ODATA_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.upload(params);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.read = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_READ_HAS_NULL_PARAMS);
        }
        try {
            var start_1 = Date.now();
            var provider = this.getDataProvider(params);
            var entitySet = params.entitySet;
            var properties = params.properties;
            var headers = params.headers;
            var requestOptions = params.requestOptions;
            if (typeof entitySet !== 'string' || entitySet.length === 0 || !Array.isArray(properties)) {
                return Promise.reject(new Error(ErrorMessage_1.ErrorMessage.ODATA_ENTITY_PROP_NOT_FOUND));
            }
            var pageSize = params.PageSize;
            var queryString = (typeof params.queryOptions === 'string' && params.queryOptions.length !== 0) ?
                params.queryOptions : null;
            return provider.read(entitySet, properties, queryString, headers, requestOptions, pageSize).then(function (jsonString) {
                if (_this.profilingEnabled) {
                    var message = "Reading '" + params.entitySet + "' ";
                    message += "with options '" + (params.queryOptions ? params.queryOptions : '') + "'";
                    _this.writeProfilingLog(start_1, 'OData Read', message);
                }
                return Promise.resolve(jsonString);
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.update = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_UPDATE_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            try {
                var updater = new ODataUpdater_1.ODataUpdater(params);
                var provider = _this.getDataProvider(params.service);
                resolve(provider.updateEntity(updater));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    OData.prototype.create = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            try {
                var creator = new ODataCreator_1.ODataCreator(params);
                var provider = _this.getDataProvider(params.service);
                resolve(provider.createEntity(creator));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    OData.prototype.createRelated = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_RELATED_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            try {
                var creator = new ODataRelatedCreator_1.ODataRelatedCreator(params);
                var provider = _this.getDataProvider(params.service);
                resolve(provider.createRelatedEntity(creator));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    OData.prototype.delete = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_DELETE_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            try {
                var deleter = new ODataDeleter_1.ODataDeleter(params);
                var provider = _this.getDataProvider(params.service);
                resolve(provider.deleteEntity(deleter));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    OData.prototype.createMedia = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_MEDIA_HAS_NULL_PARAMS);
        }
        if (!params.entitySet || !params.properties || !params.headers || !params.media || params.media.length === 0) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_MEDIA_ENTITY_FAILED);
        }
        try {
            var provider = this.getDataProvider(params);
            var flagKey = 'CreateEntityFirst';
            if (params.headers && params.headers[flagKey] && params.headers[flagKey] === 'true') {
                return provider.createMediaEntity1(params.entitySet, params.properties, params.headers, params.media);
            }
            else {
                return provider.createMediaEntity(params.entitySet, params.properties, params.headers, params.requestOptions, params.media);
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.createRelatedMedia = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_RELATED_MEDIA_HAS_NULL_PARAMS);
        }
        if (!params.entitySet || !params.properties || !params.parent || !params.parent.entitySet ||
            !params.parent.property || !params.headers || !params.media || params.media.length === 0) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_RELATED_MEDIA_ENTITY_FAILED);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.createRelatedMediaEntity(params.entitySet, params.properties, params.parent, params.headers, params.requestOptions, params.media);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.beginChangeSet = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_BEGIN_CHANGESET_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.beginChangeSet(params);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.cancelChangeSet = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CANCEL_CHANGESET_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.cancelChangeSet(params);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.commitChangeSet = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_COMMIT_CHANGESET_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.commitChangeSet(params);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.isOnChangeSet = function () {
        return this.onChangeset;
    };
    OData.prototype.deleteMedia = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_DELETE_MEDIA_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            var crudParams = new CrudParams_1.CrudParams(params, BaseODataCruder_1.ODataCrudOperation.Delete);
            return provider.deleteMediaEntity(crudParams.getEntitySetName(), crudParams.getQueryString(), crudParams.getReadLink(), crudParams.getHeaders(), crudParams.getRequestOptions());
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.downloadStream = function (params) {
        if (!params || !params.service || !params.service.entitySet ||
            !params.service.properties || params.service.properties.length === 0) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_INVALID_STREAM_PARAMS);
        }
        try {
            var service = params.service;
            var provider = this.getDataProvider(service);
            return provider.downloadStream(service.entitySet, service.properties, service.queryOptions, service.readLink, service.headers, service.requestOptions);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.uploadStream = function (params) {
        if (!params || !params.service || !params.service.entitySet ||
            !params.service.properties || Object.keys(params.service.properties).length === 0) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_INVALID_STREAM_PARAMS);
        }
        try {
            var service = params.service;
            var provider = this.getDataProvider(service);
            return provider.uploadStream(service.entitySet, service.properties, service.queryOptions, service.readLink, service.headers, service.requestOptions);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.count = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_COUNT_HAS_NULL_PARAMS);
        }
        try {
            var start_2 = Date.now();
            var provider = this.getDataProvider(params);
            var entitySet = params.entitySet;
            var properties = params.properties;
            var headers = params.headers;
            var requestOptions = params.requestOptions;
            if (typeof entitySet !== 'string' || entitySet.length === 0 || !Array.isArray(properties)) {
                return Promise.reject(new Error(ErrorMessage_1.ErrorMessage.ODATA_ENTITY_PROP_NOT_FOUND));
            }
            var queryString = (typeof params.queryOptions === 'string' && params.queryOptions.length !== 0)
                ? params.queryOptions : null;
            return provider.count(entitySet, properties, queryString, headers, requestOptions).then(function (result) {
                if (_this.profilingEnabled) {
                    var message = "Counting '" + params.entitySet + "' ";
                    message += "with options '" + (params.queryOptions ? params.queryOptions : '') + "'";
                    _this.writeProfilingLog(start_2, 'OData Count', message);
                }
                return Promise.resolve(result);
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.callFunction = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_INVOKE_FUNCTION_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            var functionName = params.functionName;
            if (functionName == null) {
                return Promise.reject(new Error(ErrorMessage_1.ErrorMessage.ODATA_MISSING_FUNCTION_NAME_FOR_FUNCTION_IMPORT));
            }
            var functionParameters = params.functionParameters;
            var functionHeaders = params.functionHeaders;
            var functionOptions = params.functionOptions;
            return provider.callFunction(functionName, functionParameters, functionHeaders, functionOptions);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.undoPendingChanges = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_UNDOPENDINGCHANGES_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.undoPendingChanges(params.entitySet, params.queryOptions, params.editLink);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    OData.prototype.base64StringToBinary = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_BASE64STRING_TO_BINARY_HAS_NULL_PARAMS);
        }
        return Promise.resolve(ODataServiceUtils_1.ODataServiceUtils.base64StringToBinary(params));
    };
    OData.prototype.getPropertyType = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_GET_PROPERTY_TYPE_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            if (params.entitySet && params.propertyName) {
                return provider.getPropertyType(params.entitySet, params.propertyName);
            }
        }
        catch (error) {
            trace_1.write(error.message, 'mdk.trace.odata', trace_1.messageType.log);
        }
        return '';
    };
    OData.prototype.getVersion = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_GET_VERSION_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.getVersion();
        }
        catch (error) {
            trace_1.write(error.message, 'mdk.trace.odata', trace_1.messageType.log);
        }
        return 0;
    };
    OData.prototype.getOfflineStoreStatus = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_GET_OFFLINESTORE_STATUS_TYPE_HAS_NULL_PARAMS);
        }
        try {
            var provider = this.getDataProvider(params);
            return provider.getOfflineStoreStatus();
        }
        catch (error) {
            trace_1.write(error.message, 'mdk.trace.odata', trace_1.messageType.log);
        }
        return '';
    };
    OData.prototype.getDataProvider = function (params) {
        if (params.serviceUrl == null) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_SERVICE_URL_MISSING);
        }
        var offlineEnabled = true;
        if (typeof params.offlineEnabled === 'boolean' && !params.offlineEnabled) {
            offlineEnabled = false;
        }
        return this.getProvider(params.serviceUrl, offlineEnabled);
    };
    OData.prototype.getProvider = function (serviceUrl, offlineEnabled) {
        var serviceName = ODataServiceUtils_1.ODataServiceUtils.getServiceName(serviceUrl);
        if (serviceName == null) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_SERVICE_NAME_MISSING);
        }
        var provider = offlineEnabled ? this.offlineDataProviders[serviceName] : this.dataProviders[serviceName];
        if (provider == null) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_SERVICE_PROVIDER_NOT_FOUND);
        }
        return provider;
    };
    OData.prototype.writeProfilingLog = function (start, category, message) {
        var end = Date.now();
        var durationInMS = end - start;
        var logMessage = category + ' - ';
        logMessage += start + " - " + end + " - " + durationInMS + " ms - " + message;
        trace_1.write(logMessage, 'mdk.trace.profiling', trace_1.messageType.log);
    };
    return OData;
}());
exports.OData = OData;
;
