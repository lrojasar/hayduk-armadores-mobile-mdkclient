import { CommonUtil } from '../ErrorHandling/CommonUtil';
import { ErrorMessage } from '../ErrorHandling/ErrorMessage';
import * as http from 'tns-core-modules/http';
import * as fsModule from 'tns-core-modules/file-system';
import { DataConverter } from '../Common/DataConverter';
import { RestServiceUtil } from '../RestService/RestServiceUtil';

// ios native class
declare var CpmsSessionSwift: any;
declare var NSUUID: any;

/**
 * Sends requests which can respond to OAuth challenges.
 * The normal http.request API in NativeScript can't be used for OAuth 
 * because it uses its own NSURLSession instead of an SAPURLSession.
 */
export class CpmsSession {
  public static getInstance(): CpmsSession {
    if (!CpmsSession._instance) {
      CpmsSession._instance = new CpmsSession();
    }
    return CpmsSession._instance;
  }
  private static _instance;
  
  private _bridge = CpmsSessionSwift.sharedInstance;

  public initialize(params): void {
    return this._bridge.initializeWithParams(params);
  }

  public updateConnectionParams(params): void {
    return this._bridge.updateWithParams(params);
  }

  public sendRequest(url: string, params?: object): Promise<any> {

    return new Promise((resolve, reject) => {
      let urlKey = 'url';
      let methodKey = 'method';
      let bodyKey = 'body';
      let headerKey = 'header';
      let reqParams = {};
      reqParams[urlKey] = url;
      let header = {}
      let isFormData = false;

      if (params) {
        if (params.hasOwnProperty(methodKey)) {
          reqParams[methodKey] = params[methodKey];
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
            let boundry = 'R_' + NSUUID.alloc().init().UUIDString;
            header['Content-Type'] = 'multipart/form-data; boundary=' + boundry;
            body = RestServiceUtil.getIOSFormData(boundry, body);
          } else if (body && body.constructor === Object) {
            header['Content-Type'] = 'application/json';
            body = JSON.stringify(body);
          }
          reqParams[bodyKey] = body;
        }
      }
      reqParams[headerKey] = header;

      return this._bridge.sendRequestWithParamsResolveReject(reqParams, (responseAndData: NSDictionary<string, any>) => {
        // responseAndData is an object with NSHTTPURLResponse and NSData.
        // Create an object similar to NativeScript's
        // HttpResponse from this response so that it has the same API.
        // This adapts code from http-request.ios.ts.
        const response = responseAndData.valueForKey('response');
        const data = responseAndData.valueForKey('data');
        const headersObj = DataConverter.fromNSDictToJavascriptObject(responseAndData.valueForKey('headers'));
        const httpResponse = {
          content: {
            toFile: (destinationFilePath?: string) => {
              const fs: typeof fsModule = require('tns-core-modules/file-system');
              const fileName = url;
              if (!destinationFilePath) {
                destinationFilePath = fs.path.join(fs.knownFolders.documents().path,
                                                   fileName.substring(fileName.lastIndexOf('/') + 1));
              }
              if (data instanceof NSData) {
                data.writeToFileAtomically(destinationFilePath, true);
                return fs.File.fromPath(destinationFilePath);
              } else {
                reject(new Error(ErrorMessage.format(ErrorMessage.FILE_SAVE_FAILED, destinationFilePath)));
              }
            },
            toImage: () => {
              if (data instanceof NSData) {
                let uiImage = UIImage.imageWithData(data);
                return uiImage;
              }
            },
            toString: (encoding?: http.HttpResponseEncoding) => { return NSDataToString(data, encoding); },
            getData: () => {
              return data;
            },
          },
          headers: headersObj,
          mimeType: response.MIMEType,
          statusCode: response.statusCode,
        };
        resolve(httpResponse);
      }, (code, message, error) => {
        reject(CommonUtil.toJSError(code, message, error));
      });
    });
  }
};

// Taken from http-request.ios.ts. See comment above.
function NSDataToString(data: any, encoding?: http.HttpResponseEncoding): string {
  let code = 4; // UTF8
  if (encoding === http.HttpResponseEncoding.GBK) {
    code = 1586;
  }
  return NSString.alloc().initWithDataEncoding(data, code).toString();
}
