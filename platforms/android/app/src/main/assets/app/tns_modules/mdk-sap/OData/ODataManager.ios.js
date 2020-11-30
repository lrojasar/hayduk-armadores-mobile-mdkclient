"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorMessage_1 = require("../ErrorHandling/ErrorMessage");
var CommonUtil_1 = require("../ErrorHandling/CommonUtil");
var trace_1 = require("tns-core-modules/trace");
var OData = (function () {
    function OData() {
        this._bridge = DataServiceManager.sharedInstance;
        this._onChangeset = false;
        this._profilingEnabled = trace_1.isCategorySet('mdk.trace.profiling');
    }
    OData.prototype.createService = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_SERVICE_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.createWithParamsResolveReject(params, function (id) {
                resolve(id);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.openService = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_OPEN_SERVICE_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.openWithParamsResolveReject(params, function (id) {
                resolve(id);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.downloadMedia = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_DOWNLOAD_MEDIA_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.downloadMediaWithParamsResolveReject(params, function (result) {
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.isMediaLocal = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_IS_MEDIA_LOCAL_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.isMediaLocalWithParamsResolveReject(params, function (result) {
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.downloadOfflineOData = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_DOWNLOAD_OFFLINE_ODATA_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            _this._bridge.downloadWithParamsResolveReject(params, function (id) {
                resolve(id);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.initializeOfflineStore = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_INITIALIZE_OFFLINE_STORE_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            _this._bridge.initOfflineStoreWithParamsResolveReject(params, function (id) {
                resolve(id);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.closeOfflineStore = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CLOSE_OFFLINE_STORE_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            _this._bridge.closeWithParamsResolveReject(params, function (id) {
                resolve(id);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.clearOfflineStore = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CLEAR_OFFLINE_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            _this._bridge.clearWithParamsResolveReject(params, function (id) {
                resolve(id);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.uploadOfflineOData = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_UPLOAD_OFFLINE_ODATA_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            _this._bridge.uploadWithParamsResolveReject(params, function (id) {
                resolve(id);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.read = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_READ_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            var start = Date.now();
            return _this._bridge.readWithParamsResolveReject(params, function (result) {
                if (_this._profilingEnabled) {
                    var message = "Reading '" + params.entitySet + "' ";
                    message += "with options '" + (params.queryOptions ? params.queryOptions : '') + "'";
                    _this.writeProfilingLog(start, 'OData Read', message);
                }
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.update = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_UPDATE_HAS_NULL_PARAMS);
        }
        if (params.service) {
            this.fixJSMapNullValues(params.service.properties);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.updateWithParamsResolveReject(params, function (entity) {
                resolve(entity);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.create = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_HAS_NULL_PARAMS);
        }
        if (params.service) {
            this.fixJSMapNullValues(params.service.properties);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.createEntityWithParamsResolveReject(params, function (result) {
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.createRelated = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_RELATED_HAS_NULL_PARAMS);
        }
        if (params.service) {
            this.fixJSMapNullValues(params.service.properties);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.createRelatedEntityWithParamsResolveReject(params, function (result) {
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.delete = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_DELETE_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.deleteEntityWithParamsResolveReject(params, function (entity) {
                resolve(entity);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.createMedia = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_MEDIA_HAS_NULL_PARAMS);
        }
        if (params.service) {
            this.fixJSMapNullValues(params.service.properties);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.createMediaWithParamsResolveReject(params, function (mediaEntities) {
                var result = [];
                for (var i = 0; i < mediaEntities.count; i++) {
                    result.push(mediaEntities.objectAtIndex(i));
                }
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.createRelatedMedia = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CREATE_RELATED_MEDIA_HAS_NULL_PARAMS);
        }
        if (params.service) {
            this.fixJSMapNullValues(params.service.properties);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.createRelatedMediaWithParamsResolveReject(params, function (mediaEntities) {
                var result = [];
                for (var i = 0; i < mediaEntities.count; i++) {
                    result.push(mediaEntities.objectAtIndex(i));
                }
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.downloadStream = function (params) {
        var _this = this;
        if (!params || !params.service || !params.service.entitySet ||
            !params.service.properties || Object.keys(params.service.properties).length === 0) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_INVALID_STREAM_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.downloadStreamWithParamsResolveReject(params, function (streams) {
                var result = [];
                for (var i = 0; i < streams.count; i++) {
                    result.push(streams.objectAtIndex(i));
                }
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.uploadStream = function (params) {
        var _this = this;
        if (!params || !params.service || !params.service.entitySet ||
            !params.service.properties || params.service.properties.length === 0) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_INVALID_STREAM_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.uploadStreamWithParamsResolveReject(params, function (result) {
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.beginChangeSet = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_BEGIN_CHANGESET_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.beginChangeSetWithParamsResolveReject(params, function (result) {
                _this._onChangeset = true;
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.cancelChangeSet = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_CANCEL_CHANGESET_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.cancelChangeSetWithParamsResolveReject(params, function (result) {
                _this._onChangeset = false;
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.commitChangeSet = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_COMMIT_CHANGESET_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.commitChangeSetWithParamsResolveReject(params, function (result) {
                _this._onChangeset = false;
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.isOnChangeSet = function () {
        return this._onChangeset;
    };
    OData.prototype.deleteMedia = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_DELETE_MEDIA_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.deleteMediaWithParamsResolveReject(params, function (result) {
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.count = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_COUNT_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            var start = Date.now();
            return _this._bridge.countWithParamsResolveReject(params, function (result) {
                if (_this._profilingEnabled) {
                    var message = "Counting '" + params.entitySet + "' ";
                    message += "with options '" + (params.queryOptions ? params.queryOptions : '') + "'";
                    _this.writeProfilingLog(start, 'OData Count', message);
                }
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.callFunction = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_INVOKE_FUNCTION_HAS_NULL_PARAMS);
        }
        var functionName = params.functionName;
        if (params.functionParameters) {
            this.fixJSMapNullValues(params.functionParameters);
        }
        if (functionName) {
            return new Promise(function (resolve, reject) {
                return _this._bridge.callFunctionWithParamsResolveReject(params, function (result) {
                    resolve(result);
                }, function (code, message, error) {
                    reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
                });
            });
        }
    };
    OData.prototype.undoPendingChanges = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_UNDOPENDINGCHANGES_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.undoPendingChangesWithParamsResolveReject(params, function (result) {
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.getPropertyType = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_GET_PROPERTY_TYPE_HAS_NULL_PARAMS);
        }
        if (params.entitySet && params.propertyName) {
            return this._bridge.getPropertyTypeWithParams(params);
        }
        else {
            return '';
        }
    };
    OData.prototype.getVersion = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_GET_VERSION_HAS_NULL_PARAMS);
        }
        return this._bridge.getVersionWithParams(params);
    };
    OData.prototype.getOfflineStoreStatus = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_GET_OFFLINESTORE_STATUS_TYPE_HAS_NULL_PARAMS);
        }
        return this._bridge.getOfflineStoreStatusWithParams(params);
    };
    OData.prototype.base64StringToBinary = function (params) {
        var _this = this;
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.ODATA_BASE64STRING_TO_BINARY_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            return _this._bridge.base64StringToBinaryWithParamsResolveReject(params, function (result) {
                resolve(result);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    OData.prototype.fixJSMapNullValues = function (map) {
        if (map) {
            for (var key in map) {
                if (map[key] && typeof map[key] === 'object' && map[key].constructor === Object) {
                    this.fixJSMapNullValues(map[key]);
                }
                else {
                    if (map[key] == null) {
                        map[key] = NSNull.null();
                    }
                }
            }
        }
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
