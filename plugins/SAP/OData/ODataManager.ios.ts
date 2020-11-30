import { ErrorMessage } from '../ErrorHandling/ErrorMessage';
import { CommonUtil } from '../ErrorHandling/CommonUtil';
import { messageType, write, isCategorySet } from 'tns-core-modules/trace';

declare var DataServiceManager: any;

export class OData {
  private _bridge = DataServiceManager.sharedInstance;
  private _onChangeset = false;
  private _profilingEnabled = isCategorySet('mdk.trace.profiling');

  public createService(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_CREATE_SERVICE_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      return this._bridge.createWithParamsResolveReject(params, (id) => {
        resolve(id);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public openService(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_OPEN_SERVICE_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      return this._bridge.openWithParamsResolveReject(params, (id) => {
        resolve(id);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public downloadMedia(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_DOWNLOAD_MEDIA_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      return this._bridge.downloadMediaWithParamsResolveReject(params, result => {
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public isMediaLocal(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_IS_MEDIA_LOCAL_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      return this._bridge.isMediaLocalWithParamsResolveReject(params, result => {
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public downloadOfflineOData(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_DOWNLOAD_OFFLINE_ODATA_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      this._bridge.downloadWithParamsResolveReject(params, (id) => {
        resolve(id);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public initializeOfflineStore(params): Promise<any> { 
    if (!params) {
      throw new Error(ErrorMessage.ODATA_INITIALIZE_OFFLINE_STORE_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      this._bridge.initOfflineStoreWithParamsResolveReject(params, (id) => {
        resolve(id);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public closeOfflineStore(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_CLOSE_OFFLINE_STORE_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      this._bridge.closeWithParamsResolveReject(params, (id) => {
        resolve(id);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public clearOfflineStore(params): Promise<any> {
    if (!params) { 
      throw new Error(ErrorMessage.ODATA_CLEAR_OFFLINE_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      this._bridge.clearWithParamsResolveReject(params, (id) => {
        resolve(id);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public uploadOfflineOData(params): Promise<any> {
    if (!params) { 
       throw new Error(ErrorMessage.ODATA_UPLOAD_OFFLINE_ODATA_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      this._bridge.uploadWithParamsResolveReject(params, (id) => {
        resolve(id);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public read(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_READ_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      const start = Date.now();
      return this._bridge.readWithParamsResolveReject(params, result => {
        if (this._profilingEnabled) {
          let message = `Reading '${params.entitySet}' `;
          message += `with options '${params.queryOptions ? params.queryOptions : ''}'`;
          this.writeProfilingLog(start, 'OData Read', message);
        }
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public update(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_UPDATE_HAS_NULL_PARAMS);
    }

    if (params.service) {
      this.fixJSMapNullValues(params.service.properties);
    }

    return new Promise((resolve, reject) => {
      return this._bridge.updateWithParamsResolveReject(params, entity => {
        resolve(entity);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public create(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_CREATE_HAS_NULL_PARAMS);
    }

    if (params.service) {
      this.fixJSMapNullValues(params.service.properties);
    }

    return new Promise((resolve, reject) => {
      return this._bridge.createEntityWithParamsResolveReject(params, result => {
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public createRelated(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_CREATE_RELATED_HAS_NULL_PARAMS);
    }

    if (params.service) {
      this.fixJSMapNullValues(params.service.properties);
    }

    return new Promise((resolve, reject) => {
      return this._bridge.createRelatedEntityWithParamsResolveReject(params, result => {
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public delete(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_DELETE_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      return this._bridge.deleteEntityWithParamsResolveReject(params, entity => {
        resolve(entity);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public createMedia(params): Promise<any> {
    if (!params) { 
      throw new Error(ErrorMessage.ODATA_CREATE_MEDIA_HAS_NULL_PARAMS);
    }

    if (params.service) {
      this.fixJSMapNullValues(params.service.properties);
    }

    return new Promise((resolve, reject) => {
      return this._bridge.createMediaWithParamsResolveReject(params, mediaEntities => {
        let result = [];
        // convert to TypeScript array
        for (let i = 0; i < mediaEntities.count; i++) {
          result.push(mediaEntities.objectAtIndex(i));
        }
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public createRelatedMedia(params): Promise<any> {
    if (!params) { 
      throw new Error(ErrorMessage.ODATA_CREATE_RELATED_MEDIA_HAS_NULL_PARAMS);
    }

    if (params.service) {
      this.fixJSMapNullValues(params.service.properties);
    }

    return new Promise((resolve, reject) => {
      return this._bridge.createRelatedMediaWithParamsResolveReject(params, mediaEntities => {
        let result = [];
        // convert to TypeScript array
        for (let i = 0; i < mediaEntities.count; i++) {
          result.push(mediaEntities.objectAtIndex(i));
        }
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public downloadStream(params: any): Promise<any> {
    if (!params || !params.service || !params.service.entitySet || 
      !params.service.properties || Object.keys(params.service.properties).length === 0) {
      throw new Error(ErrorMessage.ODATA_INVALID_STREAM_PARAMS);
    }

    return new Promise((resolve, reject) => {
      return this._bridge.downloadStreamWithParamsResolveReject(params, streams => {
        let result = [];
        // convert to TypeScript array
        for (let i = 0; i < streams.count; i++) {
          result.push(streams.objectAtIndex(i));
        }
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public uploadStream(params: any): Promise<any> {
    if (!params || !params.service || !params.service.entitySet || 
      !params.service.properties || params.service.properties.length === 0) {
      throw new Error(ErrorMessage.ODATA_INVALID_STREAM_PARAMS);
    }
    return new Promise((resolve, reject) => {
      return this._bridge.uploadStreamWithParamsResolveReject(params, result => {
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public beginChangeSet(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_BEGIN_CHANGESET_HAS_NULL_PARAMS);
    }

    return new Promise((resolve, reject) => {
      return this._bridge.beginChangeSetWithParamsResolveReject(params, result => {
        this._onChangeset = true;
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public cancelChangeSet(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_CANCEL_CHANGESET_HAS_NULL_PARAMS);
    }

    return new Promise((resolve, reject) => {
      return this._bridge.cancelChangeSetWithParamsResolveReject(params, result => {
        this._onChangeset = false;
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public commitChangeSet(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_COMMIT_CHANGESET_HAS_NULL_PARAMS);
    }
    
    return new Promise((resolve, reject) => {
      return this._bridge.commitChangeSetWithParamsResolveReject(params, result => {
        this._onChangeset = false;
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public isOnChangeSet(): boolean {
    return this._onChangeset;
  }

  public deleteMedia(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_DELETE_MEDIA_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      return this._bridge.deleteMediaWithParamsResolveReject(params, result => {
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public count(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_COUNT_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      const start = Date.now();
      return this._bridge.countWithParamsResolveReject(params, result => {
        if (this._profilingEnabled) {
          let message = `Counting '${params.entitySet}' `;
          message += `with options '${params.queryOptions ? params.queryOptions : ''}'`;
          this.writeProfilingLog(start, 'OData Count', message);
        }
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public callFunction(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_INVOKE_FUNCTION_HAS_NULL_PARAMS);
    }
    let functionName = params.functionName;
    if (params.functionParameters) {
      this.fixJSMapNullValues(params.functionParameters);
    }
    if (functionName) {
      return new Promise((resolve, reject) => {
        return this._bridge.callFunctionWithParamsResolveReject(params, result => {
          resolve(result);
        }, (code, message, error) => {
          reject(CommonUtil.toJSError(code, message, error));
        });
      });
    }
  }

  public undoPendingChanges(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_UNDOPENDINGCHANGES_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      return this._bridge.undoPendingChangesWithParamsResolveReject(params, result => {
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  public getPropertyType(params): string {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_GET_PROPERTY_TYPE_HAS_NULL_PARAMS);
    }
    if (params.entitySet && params.propertyName) {
      return this._bridge.getPropertyTypeWithParams(params);
    } else {
      return '';
    }
  }

  public getVersion(params): number {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_GET_VERSION_HAS_NULL_PARAMS);
    }
    return this._bridge.getVersionWithParams(params);
  }

  public getOfflineStoreStatus(params): string {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_GET_OFFLINESTORE_STATUS_TYPE_HAS_NULL_PARAMS);
    }
    return this._bridge.getOfflineStoreStatusWithParams(params);
  }

  public base64StringToBinary(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.ODATA_BASE64STRING_TO_BINARY_HAS_NULL_PARAMS);
    }
    return new Promise((resolve, reject) => {
      return this._bridge.base64StringToBinaryWithParamsResolveReject(params, result => {
        resolve(result);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }

  private fixJSMapNullValues(map) {
    if (map) {
      for (let key in map) {
        if (map[key] && typeof map[key] === 'object' && map[key].constructor === Object) {
          this.fixJSMapNullValues(map[key]);
        } else {
          if (map[key] == null) {
            map[key] = NSNull.null();
          } 
        }
      }
    }
  }

  private writeProfilingLog(start, category, message) {
    const end = Date.now();
    const durationInMS = end - start;

    let logMessage = category + ' - ';
    logMessage += `${start} - ${end} - ${durationInMS} ms - ${message}`;

    write(logMessage, 'mdk.trace.profiling', messageType.log);
  }
};
