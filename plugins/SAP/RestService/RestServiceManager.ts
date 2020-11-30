import { ErrorMessage } from '../ErrorHandling/ErrorMessage';
import { CpmsSession } from '../Cpms/CpmsSession';
import { RestServiceUtil } from './RestServiceUtil';

declare var java: any;
declare var NSUUID: any;

export class RestServiceManager {
  public sendRequest(params): Promise<any> {
    if (!params) {
      throw new Error(ErrorMessage.RESTSERVICE_SEND_REQUEST_HAS_NULL_PARAMS);
    }

    return new Promise((resolve, reject) => {
      let url = params.serviceUrl + params.path;
      let requestProperties = params.requestProperties;
      let method = requestProperties.Method;
      let apiHeaders = requestProperties.Headers;
      let body = requestProperties.Body;
      let serviceHeaders = params.headers;

      let header = {};
      if (apiHeaders) {
        Object.assign(header, apiHeaders);
      }
      if (serviceHeaders) {
        Object.assign(header, serviceHeaders);
      }

      return CpmsSession.getInstance().sendRequest(url, {method, header, body}).then((response) => {
        if (response.statusCode >= 300) {
          let error = new Error(response.content.toString());
          // tslint:disable-next-line:no-string-literal
          error['responseCode'] = response.statusCode;
          // tslint:disable-next-line:no-string-literal
          error['responseBody'] = error.message;
          return reject(error);
        } else {
          if (RestServiceUtil.isTextContent(response.mimeType)) {
            return resolve(response.content.toString());
          } else {
            return resolve(response.content.getData());
          }
        }
      }).catch(error => {
        return reject(error);
      });
    });
  }
};