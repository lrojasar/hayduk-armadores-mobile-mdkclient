"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonUtil_1 = require("../ErrorHandling/CommonUtil");
var ErrorMessage_1 = require("../ErrorHandling/ErrorMessage");
var http = require("tns-core-modules/http");
var DataConverter_1 = require("../Common/DataConverter");
var RestServiceUtil_1 = require("../RestService/RestServiceUtil");
var CpmsSession = (function () {
    function CpmsSession() {
        this._bridge = CpmsSessionSwift.sharedInstance;
    }
    CpmsSession.getInstance = function () {
        if (!CpmsSession._instance) {
            CpmsSession._instance = new CpmsSession();
        }
        return CpmsSession._instance;
    };
    CpmsSession.prototype.initialize = function (params) {
        return this._bridge.initializeWithParams(params);
    };
    CpmsSession.prototype.updateConnectionParams = function (params) {
        return this._bridge.updateWithParams(params);
    };
    CpmsSession.prototype.sendRequest = function (url, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var urlKey = 'url';
            var methodKey = 'method';
            var bodyKey = 'body';
            var headerKey = 'header';
            var reqParams = {};
            reqParams[urlKey] = url;
            var header = {};
            var isFormData = false;
            if (params) {
                if (params.hasOwnProperty(methodKey)) {
                    reqParams[methodKey] = params[methodKey];
                }
                if (params.hasOwnProperty(headerKey)) {
                    for (var key in params[headerKey]) {
                        if (key.toLowerCase() === 'content-type' && params[headerKey][key] === 'multipart/form-data') {
                            isFormData = true;
                        }
                        else {
                            header[key] = params[headerKey][key];
                        }
                    }
                }
                if (params.hasOwnProperty(bodyKey)) {
                    var body = params[bodyKey];
                    if (Array.isArray(body) && isFormData) {
                        var boundry = 'R_' + NSUUID.alloc().init().UUIDString;
                        header['Content-Type'] = 'multipart/form-data; boundary=' + boundry;
                        body = RestServiceUtil_1.RestServiceUtil.getIOSFormData(boundry, body);
                    }
                    else if (body && body.constructor === Object) {
                        header['Content-Type'] = 'application/json';
                        body = JSON.stringify(body);
                    }
                    reqParams[bodyKey] = body;
                }
            }
            reqParams[headerKey] = header;
            return _this._bridge.sendRequestWithParamsResolveReject(reqParams, function (responseAndData) {
                var response = responseAndData.valueForKey('response');
                var data = responseAndData.valueForKey('data');
                var headersObj = DataConverter_1.DataConverter.fromNSDictToJavascriptObject(responseAndData.valueForKey('headers'));
                var httpResponse = {
                    content: {
                        toFile: function (destinationFilePath) {
                            var fs = require('tns-core-modules/file-system');
                            var fileName = url;
                            if (!destinationFilePath) {
                                destinationFilePath = fs.path.join(fs.knownFolders.documents().path, fileName.substring(fileName.lastIndexOf('/') + 1));
                            }
                            if (data instanceof NSData) {
                                data.writeToFileAtomically(destinationFilePath, true);
                                return fs.File.fromPath(destinationFilePath);
                            }
                            else {
                                reject(new Error(ErrorMessage_1.ErrorMessage.format(ErrorMessage_1.ErrorMessage.FILE_SAVE_FAILED, destinationFilePath)));
                            }
                        },
                        toImage: function () {
                            if (data instanceof NSData) {
                                var uiImage = UIImage.imageWithData(data);
                                return uiImage;
                            }
                        },
                        toString: function (encoding) { return NSDataToString(data, encoding); },
                        getData: function () {
                            return data;
                        },
                    },
                    headers: headersObj,
                    mimeType: response.MIMEType,
                    statusCode: response.statusCode,
                };
                resolve(httpResponse);
            }, function (code, message, error) {
                reject(CommonUtil_1.CommonUtil.toJSError(code, message, error));
            });
        });
    };
    return CpmsSession;
}());
exports.CpmsSession = CpmsSession;
;
function NSDataToString(data, encoding) {
    var code = 4;
    if (encoding === http.HttpResponseEncoding.GBK) {
        code = 1586;
    }
    return NSString.alloc().initWithDataEncoding(data, code).toString();
}
