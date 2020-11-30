import * as fsModule from 'tns-core-modules/file-system';
import { ErrorMessage } from '../ErrorHandling/ErrorMessage';
import { messageType, write } from 'tns-core-modules/trace';
import { DataConverter } from '../Common/DataConverter';
import { RestServiceUtil } from '../RestService/RestServiceUtil';

declare var com: any;
declare var org: any;
declare var android;
const foundationPkg = com.sap.mdk.client.foundation;

/**
 * Sends requests which can respond to OAuth challenges.
 * The normal http.request API in NativeScript can't be used for OAuth 
 * because it uses its own NSURLSession instead of an SAPURLSession.
 */
export class CpmsSession {

  public static createIPromiseCallback(args): any {
    return new foundationPkg.IPromiseCallback(args);
  }

  public static getInstance(): CpmsSession {
    if (!CpmsSession._instance) {
      CpmsSession._instance = new CpmsSession();
    }
    return CpmsSession._instance;
  }
  private static _instance;
  
  private _bridge = foundationPkg.CPmsSession.getInstance();

  public initialize(params): void {
    // do nothing
  }

  public updateConnectionParams(params): void {
        // do nothing
  }

  public sendRequest(url: string, params?: object): Promise<any> {

    return new Promise((resolve, reject) => {
      let urlKey = 'url';
      let methodKey = 'method';
      let bodyKey = 'body';
      let headerKey = 'header';
      let reqParams = new org.json.JSONObject();
      reqParams.put(urlKey, url);
      let header = {}
      let isFormData = false;

      if (params) {
        if (params.hasOwnProperty(methodKey)) {
          reqParams.put(methodKey, params[methodKey]);
        }
        if (params.hasOwnProperty(headerKey)) {
          for (var key in params[headerKey]) {
            if (key.toLowerCase() === 'content-type' && params[headerKey][key] === 'multipart/form-data') {
              isFormData = true;
            } else {
              header[key] = params[headerKey][key];
            }
          }
        }
        if (params.hasOwnProperty(bodyKey)) {
          let body = params[bodyKey];
          if (Array.isArray(body) && isFormData) {
            body = RestServiceUtil.getAndroidFormData(body);
          } else if (body && (Array.isArray(body) || body.constructor === Object)) {
            header['Content-Type'] = 'application/json';
            body = JSON.stringify(body);
          }
          reqParams.put(bodyKey, body);
        }
        
        if (Object.keys(header).length > 0) {
          let headerParams = new org.json.JSONObject();
          Object.keys(header).forEach((key) => {
            headerParams.put(key, header[key]);
          });

          reqParams.put(headerKey, headerParams);
        }
      }

      let successHandler = CpmsSession.createIPromiseCallback({
        onResolve(responseAndData) {
          const code = parseInt(responseAndData.get('statusCode'), 10);
          const data = responseAndData.get('data');
          const headersObj = DataConverter.toJavaScriptObject(responseAndData.get('headers'));
          const httpResponse = {
            content: {
              toFile: (destinationFilePath?: string) => {
                const fs: typeof fsModule = require('tns-core-modules/file-system');
                const fileName = url;
                if (!destinationFilePath) {
                  destinationFilePath = fs.path.join(fs.knownFolders.documents().path,
                                                     fileName.substring(fileName.lastIndexOf('/') + 1));
                }
                let file = fs.File.fromPath(destinationFilePath);
                try {
                  file.writeSync(data, (err) => {
                    write(err, 'mdk.trace.core', messageType.error);
                    reject(new Error(ErrorMessage.format(ErrorMessage.FILE_SAVE_FAILED, destinationFilePath)));
                  });
                } catch (err) {
                  reject(new Error(ErrorMessage.format(ErrorMessage.FILE_SAVE_FAILED, destinationFilePath)));
                }
                return file;
              },
              toImage: () => {
                let imageBitmap = android.graphics.BitmapFactory.decodeByteArray(data, 0, data.length);
                return imageBitmap;
              },
              toString: () => { return data; },
              getData: () => {
                return data;
              },
            },
            headers: headersObj,
            mimeType: responseAndData.get('contentType'),
            statusCode: code,
          };
          resolve(httpResponse);
        }});

      let failureHandler = CpmsSession.createIPromiseCallback({
          onRejected(code, message, error) {
              reject(error);
      }});

      return this._bridge.sendRequest(reqParams, successHandler, failureHandler);
    });
  }
};
