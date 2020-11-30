"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("tns-core-modules/application");
var CommonUtil = (function () {
    function CommonUtil() {
    }
    CommonUtil.toJSError = function (code, message, error) {
        if (app.ios) {
            if (error && error instanceof NSError) {
                var jsError = new Error(error.userInfo.valueForKey('message') ? error.userInfo.valueForKey('message') : message);
                return CommonUtil.formatJSError(jsError);
            }
            else {
                return new Error(message);
            }
        }
        else {
            if (error && error instanceof java.lang.Exception) {
                return new Error(error.getMessage());
            }
            else {
                return new Error(message);
            }
        }
    };
    CommonUtil.formatJSError = function (jsError) {
        if (jsError.message && jsError.message.indexOf('Error ') >= 0) {
            var idx = jsError.message.indexOf('Error ');
            var errCode = parseInt(jsError.message.slice(idx + 6, idx + 9), 10);
            if (errCode > 0) {
                jsError['responseCode'] = errCode;
                var idx1 = jsError.message.indexOf('{');
                var idx2 = jsError.message.lastIndexOf('}');
                if (idx2 > idx1) {
                    jsError['responseBody'] = jsError.message.slice(idx1, idx2 + 1);
                }
            }
        }
        return jsError;
    };
    return CommonUtil;
}());
exports.CommonUtil = CommonUtil;
;
