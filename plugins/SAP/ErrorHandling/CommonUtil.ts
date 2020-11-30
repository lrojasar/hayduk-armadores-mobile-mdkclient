import * as app from 'tns-core-modules/application';

declare var NSError: any;
declare var java;

export class CommonUtil {
  public static toJSError(code: string, message: string, error: any): any {
    if (app.ios) {
      if (error && error instanceof NSError) {
        let jsError =  new Error(error.userInfo.valueForKey('message') ? error.userInfo.valueForKey('message') : message);
        return CommonUtil.formatJSError(jsError);
      } else {
        return new Error(message);
      }
    } else {
      if (error && error instanceof java.lang.Exception) {
        return new Error(error.getMessage());
      } else {
        return new Error(message);
      }
    }
  }

  public static formatJSError(jsError: any): any {
    if (jsError.message && jsError.message.indexOf('Error ') >= 0) {
      let idx = jsError.message.indexOf('Error ');
      let errCode: number = parseInt(jsError.message.slice(idx + 6, idx + 9), 10);
      if (errCode > 0) {
        // tslint:disable-next-line:no-string-literal
        jsError['responseCode'] = errCode;
        let idx1 = jsError.message.indexOf('{');
        let idx2 = jsError.message.lastIndexOf('}');
        if (idx2 > idx1) {
          // tslint:disable-next-line:no-string-literal
          jsError['responseBody'] = jsError.message.slice(idx1, idx2 + 1);
        }
      }
    }
    return jsError;
  }
};
